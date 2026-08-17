#!/usr/bin/env node
/* ============================================================================
   sync-events.js — pull the live "D2U Events" Google Calendar into the demo.

   Usage:  node sync-events.js
   Writes: assets/data-events.js  (D2U_CAL_UPCOMING / D2U_CAL_PAST)

   Why this exists rather than embedding the calendar directly:

   1. The calendar carries internal entries ("10AM Team Meeting") that must not
      appear on a public page. EXCLUDE filters them out.
   2. Multi-day events are stored as one VEVENT per day. Khem Fest and Comic Con
      would otherwise render as two and three separate cards. collapse() merges
      consecutive same-title days into a single dated range.
   3. Google's .ics endpoint sends no CORS headers, so the browser cannot fetch
      it client-side. The sync has to happen out of band — here, or server-side.

   Re-run whenever the calendar changes. No dependencies; Node's https only.
   ========================================================================== */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CAL_ID = 'e463b714ffcdb72b7595c3f1ea3adbe897febad5fa9a3a4e2da198a95ae20918@group.calendar.google.com';
const ICS = `https://calendar.google.com/calendar/ical/${encodeURIComponent(CAL_ID)}/public/basic.ics`;

/* Titles matching any of these never reach the site. Internal-only entries. */
const EXCLUDE = [/team meeting/i, /\bstandup\b/i, /\binternal\b/i, /\bholiday\b/i];

const OUT = path.join(__dirname, 'assets', 'data-events.js');

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(get(res.headers.location));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Calendar returned HTTP ${res.statusCode}. Is it still shared publicly?`));
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', c => body += c);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

/* RFC 5545 line unfolding — continuation lines start with a space or tab. */
function unfold(s) {
  return s.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '');
}

function unescape(v) {
  return v.replace(/\\n/g, ' ').replace(/\\,/g, ',')
          .replace(/\\;/g, ';').replace(/\\\\/g, '\\').trim();
}

function parse(ics) {
  const out = [];
  const blocks = unfold(ics).match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
  for (const b of blocks) {
    const field = k => {
      const m = b.match(new RegExp('^' + k + '[^:\\n]*:(.*)$', 'm'));
      return m ? unescape(m[1]) : '';
    };
    const dt = field('DTSTART');
    const m = dt.match(/(\d{4})(\d{2})(\d{2})/);
    if (!m) continue;
    out.push({
      date: new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])),
      title: field('SUMMARY'),
      location: field('LOCATION'),
      desc: field('DESCRIPTION'),
      url: field('URL')
    });
  }
  return out.sort((a, b) => a.date - b.date);
}

/* Merge consecutive days that share a title into a single entry with an end date. */
function collapse(list) {
  const out = [];
  for (const ev of list) {
    const prev = out[out.length - 1];
    if (prev && prev.title === ev.title) {
      const gap = (ev.date - (prev.end || prev.date)) / 86400000;
      if (gap <= 1) { prev.end = ev.date; continue; }
    }
    out.push({ ...ev });
  }
  return out;
}

/* "22 August 2026" / "8–10 October 2026" / "25 Sep – 3 Oct 2026" */
function label(ev) {
  const d = ev.date, e = ev.end;
  const day = x => x.getUTCDate();
  const mon = x => MONTHS[x.getUTCMonth()];
  const yr  = x => x.getUTCFullYear();
  if (!e) return `${day(d)} ${mon(d)} ${yr(d)}`;
  if (mon(d) === mon(e) && yr(d) === yr(e)) return `${day(d)}–${day(e)} ${mon(d)} ${yr(d)}`;
  return `${day(d)} ${mon(d)} – ${day(e)} ${mon(e)} ${yr(e)}`;
}

/* Location strings from Google are long postal addresses; keep them readable. */
function shortLoc(loc) {
  if (!loc) return '';
  if (/^https?:/i.test(loc)) return '';
  const parts = loc.split(',').map(s => s.trim()).filter(Boolean);
  if (parts.length <= 2) return parts.join(', ');
  const state = parts.find(p => /^[A-Z]{2}\b/.test(p));
  return [parts[0], parts[parts.length - (state ? 3 : 2)]].filter(Boolean).join(', ');
}

function js(v) { return JSON.stringify(v); }

function emit(name, list) {
  const rows = list.map(ev =>
    '  {\n' +
    `    title: ${js(ev.title)},\n` +
    `    when: ${js(label(ev))},\n` +
    `    where: ${js(shortLoc(ev.location))},\n` +
    `    iso: ${js(ev.date.toISOString().slice(0, 10))}\n` +
    '  }'
  ).join(',\n');
  return `const ${name} = [\n${rows}\n];\n`;
}

(async () => {
  let ics;
  try {
    ics = await get(ICS);
  } catch (err) {
    console.error('FAILED: ' + err.message);
    console.error('Nothing written — assets/data-events.js left as-is.');
    process.exit(1);
  }

  const all = parse(ics);
  const kept = all.filter(e => !EXCLUDE.some(rx => rx.test(e.title)));
  const dropped = all.length - kept.length;

  const today = new Date();
  const cutoff = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

  const upcoming = collapse(kept.filter(e => e.date.getTime() >= cutoff));
  const past = collapse(kept.filter(e => e.date.getTime() < cutoff)).reverse();

  const header =
    '/* ============================================================================\n' +
    '   GENERATED FILE — do not edit by hand.\n' +
    '   Source: the live "D2U Events" Google Calendar.\n' +
    '   Regenerate with:  node sync-events.js\n' +
    `   Last sync: ${new Date().toISOString().slice(0, 10)}\n` +
    '   ========================================================================== */\n\n';

  fs.writeFileSync(OUT, header + emit('D2U_CAL_UPCOMING', upcoming) + '\n' + emit('D2U_CAL_PAST', past));

  console.log(`Parsed ${all.length} calendar entries.`);
  console.log(`Filtered out ${dropped} internal entr${dropped === 1 ? 'y' : 'ies'} (EXCLUDE rules).`);
  console.log(`Collapsed to ${upcoming.length} upcoming, ${past.length} past.`);
  console.log(`Wrote ${path.relative(process.cwd(), OUT)}`);
  if (upcoming.length) {
    console.log('\nNext up:');
    upcoming.slice(0, 5).forEach(e => console.log(`  ${label(e)} — ${e.title}`));
  }
})();
