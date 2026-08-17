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

/* ---------------------------------------------------------------------------
   Enrichment. The calendar is authoritative for WHEN Digi2U attends; it carries
   no links and its locations are sometimes a parking entrance rather than the
   venue. This map adds the public-facing detail, matched on title.

   `venue` overrides the calendar's location string for display only — it does
   not change the date. Where the official run differs from the calendar entry,
   that is recorded in `note` rather than silently corrected: Digi2U may be
   attending one day of a longer event, and only Digi2U can say which.

   No third-party event artwork is copied here. Copyright on festival and
   convention imagery sits with the organisers; the pages link out instead and
   use Digi2U's own photography. Add an `img` only for artwork Digi2U owns or
   has written permission to use.
   ------------------------------------------------------------------------- */
const ENRICH = [
  {
    match: /khem\s*fest/i,
    url: 'https://khemfest.com/',
    img: 'assets/event-khemfest-2026.webp',
    credit: 'Artwork © Khem Fest / Black Star Creative Collective',
    venue: 'Express Newark, 54 Halsey St, Newark, NJ',
    blurb: 'The 12th Annual Khem Fest and Khem Animation Film Festival, presented by Black Star Creative Collective — an Afrofuturism festival celebrating Black animation, gaming and comic book creators. Animation film festival, marketplace, comic book workshops, panel discussions, screenings and a STEAM lab.',
    note: 'Official listing gives Saturday 26 September, 11:00–19:00, doors 10:45, free parking. The calendar also holds a 25 September entry — confirm whether Digi2U attends both days.'
  },
  {
    match: /comic\s*con/i,
    url: 'https://www.newyorkcomiccon.com/',
    img: 'https://digi2u.org/wp-content/uploads/2026/08/event-nycc-2026.png',
    credit: 'Artwork © ReedPop',
    venue: 'Jacob K. Javits Center, 429 11th Ave, New York, NY',
    blurb: "New York Comic Con's 20th anniversary edition. Four days of panels, exhibitors, creators, artist alley and cosplay — one of the largest pop-culture gatherings in the United States.",
    note: 'Official run is 8–11 October 2026 (four days). The calendar holds 8–10 — confirm whether Digi2U attends the Sunday.'
  },
  {
    match: /world\s*oddities/i,
    url: 'https://worldodditiesexpo.com/atlanta-ga/',
    img: 'https://digi2u.org/wp-content/uploads/2026/08/event-world-oddities-expo-atlanta.png',
    credit: 'Artwork © World Oddities Expo',
    venue: 'Atlanta Convention Center at AmericasMart, 225 Ted Turner Dr NW, Atlanta, GA',
    blurb: 'A two-day celebration of the strange and the beautifully odd — artists, vendors, performers, educators and speakers, the Lost Curio Marketplace and hands-on workshops.',
    note: 'Official run is 12–13 September 2026, 11:00–19:00. The calendar location reads "Building 2 Parking Garage" — that is the parking entrance, not the venue.'
  },
  {
    match: /biz\s*savvy\s*artist/i,
    url: 'https://bsaacademy.com/',
    venue: 'Johnson STEM Activity Center, 275 Decatur St SE, Atlanta, GA',
    blurb: 'A one-day intensive equipping independent artists and creative entrepreneurs with the business, financial and operational skills to build sustainable careers. The 2026 edition added a Youth Edition track for 9th–12th graders with Artportunity Knocks, plus mini labs on AI tools, digital branding and content monetisation.'
  },
  {
    match: /hope\s*rising/i,
    venue: 'Mary McLeod Bethune Life Center, 140 Martin Luther King Dr, Jersey City, NJ',
    blurb: 'The 6th Annual Hope Rising Gospel Celebration at the historic Bethune Center — the same venue that hosted the "Fighting For Ward F" screening.'
  },
  {
    match: /back\s*to\s*school/i,
    venue: '39 Kearney Ave, Jersey City, NJ 07305',
    blurb: 'Community fair marking the start of the school year — resources, giveaways and hands-on activities for local families.'
  },
  {
    match: /navigating\s*technology/i,
    venue: 'Forest Park Senior Center, 5087 Park Avenue, Forest Park, GA',
    blurb: 'A Digi2U session helping older adults get comfortable with the devices and services they already own — the same digital-skills gap the programmes address, at the other end of the age range.'
  }
];

function enrich(ev) {
  const hit = ENRICH.find(e => e.match.test(ev.title));
  if (!hit) return ev;
  return Object.assign({}, ev, {
    url: hit.url || ev.url || '',
    blurb: hit.blurb || '',
    note: hit.note || '',
    img: hit.img || '',
    credit: hit.credit || '',
    location: hit.venue || ev.location
  });
}

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
    `    where: ${js(ev.venueOverride ? ev.location : shortLoc(ev.location))},\n` +
    `    url: ${js(ev.url || '')},\n` +
    `    blurb: ${js(ev.blurb || '')},\n` +
    `    img: ${js(ev.img || '')},\n` +
    `    credit: ${js(ev.credit || '')},\n` +
    `    iso: ${js(ev.date.toISOString().slice(0, 10))}\n` +
    '  }'
  ).join(',\n');
  return `const ${name} = [\n${rows}\n];\n`;
}

/* The public calendar, so visitors can subscribe rather than copy dates out. */
const CAL_LINKS =
  `const D2U_CAL = {\n` +
  `  html: ${js('https://calendar.google.com/calendar/embed?src=' + encodeURIComponent(CAL_ID) + '&ctz=America/New_York')},\n` +
  `  ics:  ${js('https://calendar.google.com/calendar/ical/' + encodeURIComponent(CAL_ID) + '/public/basic.ics')}\n` +
  `};\n`;

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

  const upcoming = collapse(kept.filter(e => e.date.getTime() >= cutoff)).map(e => {
    const x = enrich(e);
    if (x.location !== e.location) x.venueOverride = true;
    return x;
  });
  const past = collapse(kept.filter(e => e.date.getTime() < cutoff)).reverse().map(enrich);

  const notes = upcoming.concat(past).filter(e => e.note);

  const header =
    '/* ============================================================================\n' +
    '   GENERATED FILE — do not edit by hand.\n' +
    '   Source: the live "D2U Events" Google Calendar.\n' +
    '   Regenerate with:  node sync-events.js\n' +
    `   Last sync: ${new Date().toISOString().slice(0, 10)}\n` +
    '   ========================================================================== */\n\n';

  fs.writeFileSync(OUT, header + CAL_LINKS + '\n' +
    emit('D2U_CAL_UPCOMING', upcoming) + '\n' + emit('D2U_CAL_PAST', past));

  console.log(`Parsed ${all.length} calendar entries.`);
  console.log(`Filtered out ${dropped} internal entr${dropped === 1 ? 'y' : 'ies'} (EXCLUDE rules).`);
  console.log(`Collapsed to ${upcoming.length} upcoming, ${past.length} past.`);
  console.log(`Enriched ${upcoming.concat(past).filter(e => e.blurb).length} with links and detail.`);
  console.log(`Wrote ${path.relative(process.cwd(), OUT)}`);
  if (upcoming.length) {
    console.log('\nNext up:');
    upcoming.slice(0, 6).forEach(e => console.log(`  ${label(e)} — ${e.title}${e.url ? '  ' + e.url : ''}`));
  }
  if (notes.length) {
    console.log('\nCHECK THESE — the calendar disagrees with the official listing:');
    notes.forEach(e => console.log(`  ${e.title}\n    ${e.note}`));
  }
})();
