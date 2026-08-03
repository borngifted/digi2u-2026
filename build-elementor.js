/* ==========================================================================
   Digi2U 2026 — Elementor template kit generator
   Reads the same data files the demo uses and emits importable Elementor
   template JSON into elementor/.

   Run:  node build-elementor.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

/* ---- load the demo's data files ---- */
const A = 'assets';
function load(file) { return fs.readFileSync(path.join(A, file), 'utf8'); }
const sandbox = {};
new Function(
  load('data-core.js') + '\n' + load('data-extra.js') + '\n' +
  load('data-media.js') + '\n' + load('data-phase2.js') + '\n' +
  'return {D2U_PROGRAMS,D2U_CERTS,D2U_TEAM,D2U_STATS,D2U_THEORY,D2U_PILLARS,D2U_VALUES,' +
  'D2U_CITIES,D2U_PARTNERS,D2U_DOCS,D2U_ROLES,D2U_ROLE_DUTIES,D2U_TIERS,D2U_ORG,' +
  'D2U_GALLERY,D2U_LOGOS,D2U_MOMENTS,D2U_VIDEOS,D2U_INDUSTRY,D2U_IMPACT,D2U_CATEGORIES,' +
  'D2U_GIVING,D2U_STORY,D2U_STORIES};'
)().constructor; // no-op guard
const D = new Function(
  load('data-core.js') + '\n' + load('data-extra.js') + '\n' +
  load('data-media.js') + '\n' + load('data-phase2.js') + '\n' +
  'return {D2U_PROGRAMS,D2U_CERTS,D2U_TEAM,D2U_STATS,D2U_THEORY,D2U_PILLARS,D2U_VALUES,' +
  'D2U_CITIES,D2U_PARTNERS,D2U_DOCS,D2U_ROLES,D2U_ROLE_DUTIES,D2U_TIERS,D2U_ORG,' +
  'D2U_GALLERY,D2U_LOGOS,D2U_MOMENTS,D2U_VIDEOS,D2U_INDUSTRY,D2U_IMPACT,D2U_CATEGORIES,' +
  'D2U_GIVING,D2U_STORY,D2U_STORIES};'
)();

/* ---- design tokens (mirror of assets/site.css :root) ---- */
const C = {
  red: '#FF0000', redDark: '#D90000', redTint: '#FFF4F4',
  black: '#0A0A0A', charcoal: '#1A1A1A', gray: '#6E6E73',
  white: '#FFFFFF', offWhite: '#FAFAF8', light: '#F2F2EF',
  line: 'rgba(10,10,10,0.10)'
};
const F = { display: 'Archivo', body: 'Inter' };

/* Absolute URLs — relative asset paths in the demo must resolve on the live
   WordPress install, so they are rewritten to the GitHub Pages origin. Replace
   DEMO_ORIGIN once the assets are uploaded to the WP media library. */
const DEMO_ORIGIN = 'https://borngifted.github.io/digi2u-2026/';
function abs(u) {
  if (!u) return '';
  return /^https?:\/\//.test(u) ? u : DEMO_ORIGIN + u.replace(/^\.?\//, '');
}

/* ---- id generator (deterministic, so re-runs produce stable files) ---- */
let seed = 0x2b1d;
function uid() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed.toString(16).padStart(7, '0').slice(-7);
}

/* ---- element helpers ---- */
function px(n) { return { unit: 'px', size: n, sizes: [] }; }
function pad(t, r, b, l) {
  return { unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false };
}

function container(settings, elements) {
  return { id: uid(), elType: 'container', isInner: false, settings: settings || {}, elements: elements || [] };
}
function inner(settings, elements) {
  const c = container(settings, elements);
  c.isInner = true;
  return c;
}
function widget(widgetType, settings) {
  return { id: uid(), elType: 'widget', widgetType, settings: settings || {}, elements: [] };
}

function section(opts, elements) {
  opts = opts || {};
  const s = {
    content_width: 'boxed',
    flex_direction: 'column',
    flex_gap: { unit: 'px', size: 0, column: '0', row: '0' },
    padding: pad(opts.padTop != null ? opts.padTop : 110, 24, opts.padBottom != null ? opts.padBottom : 110, 24),
    padding_tablet: pad(opts.padTop != null ? Math.round(opts.padTop * 0.7) : 76, 20, 76, 20),
    padding_mobile: pad(72, 20, 72, 20)
  };
  if (opts.bg) { s.background_background = 'classic'; s.background_color = opts.bg; }
  if (opts.bgImage) {
    s.background_background = 'classic';
    s.background_image = { url: abs(opts.bgImage), id: '', size: '' };
    s.background_position = 'center center';
    s.background_size = 'cover';
    s.background_overlay_background = 'gradient';
    s.background_overlay_color = 'rgba(10,10,10,0.75)';
    s.background_overlay_color_b = 'rgba(10,10,10,0.25)';
    s.background_overlay_gradient_angle = { unit: 'deg', size: 90 };
    s.min_height = px(opts.minHeight || 520);
    s.flex_justify_content = 'flex-end';
  }
  return container(s, elements);
}

function grid(cols, gap, elements) {
  return inner({
    content_width: 'full',
    flex_direction: 'row',
    flex_wrap: 'wrap',
    flex_gap: { unit: 'px', size: gap, column: String(gap), row: String(gap) },
    padding: pad(0, 0, 0, 0)
  }, elements.map(function (el) {
    return inner({
      content_width: 'full',
      flex_direction: 'column',
      width: { unit: '%', size: Math.floor(10000 / cols) / 100 },
      width_tablet: { unit: '%', size: cols > 2 ? 48 : 100 },
      width_mobile: { unit: '%', size: 100 },
      flex_grow: 0, flex_shrink: 0
    }, Array.isArray(el) ? el : [el]);
  }));
}

/* ---- typed widgets ---- */
function kicker(text) {
  return widget('heading', {
    title: text, header_size: 'div',
    title_color: C.red,
    typography_typography: 'custom',
    typography_font_family: F.body,
    typography_font_size: px(12),
    typography_font_weight: '700',
    typography_letter_spacing: { unit: 'px', size: 2.4 },
    typography_text_transform: 'uppercase',
    _margin: pad(0, 0, 16, 0)
  });
}
function heading(text, opts) {
  opts = opts || {};
  return widget('heading', {
    title: text,
    header_size: opts.tag || 'h2',
    title_color: opts.color || C.black,
    typography_typography: 'custom',
    typography_font_family: F.display,
    typography_font_size: px(opts.size || 46),
    typography_font_size_tablet: px(Math.round((opts.size || 46) * 0.72)),
    typography_font_size_mobile: px(Math.round((opts.size || 46) * 0.58)),
    typography_font_weight: '800',
    typography_line_height: { unit: 'em', size: 1.04 },
    typography_letter_spacing: { unit: 'px', size: -1.4 },
    _margin: pad(0, 0, opts.mb != null ? opts.mb : 18, 0)
  });
}
function text(html, opts) {
  opts = opts || {};
  return widget('text-editor', {
    editor: '<p>' + html + '</p>',
    text_color: opts.color || C.gray,
    typography_typography: 'custom',
    typography_font_family: F.body,
    typography_font_size: px(opts.size || 18),
    typography_line_height: { unit: 'em', size: 1.62 },
    _margin: pad(0, 0, opts.mb != null ? opts.mb : 0, 0)
  });
}
function button(label, url, variant) {
  const primary = variant !== 'ghost';
  return widget('button', {
    text: label,
    link: { url: url, is_external: '', nofollow: '' },
    align: 'left',
    background_color: primary ? C.red : 'rgba(0,0,0,0)',
    button_text_color: primary ? C.white : C.black,
    border_border: primary ? '' : 'solid',
    border_width: pad(1, 1, 1, 1),
    border_color: C.line,
    border_radius: pad(2, 2, 2, 2),
    text_padding: pad(15, 30, 15, 30),
    typography_typography: 'custom',
    typography_font_family: F.body,
    typography_font_size: px(14),
    typography_font_weight: '700'
  });
}
function buttonRow(buttons) {
  return inner({
    content_width: 'full', flex_direction: 'row', flex_wrap: 'wrap',
    flex_gap: { unit: 'px', size: 14, column: '14', row: '14' },
    padding: pad(28, 0, 0, 0)
  }, buttons);
}
function image(url, alt) {
  return widget('image', {
    image: { url: abs(url), id: '', alt: alt || '', source: 'library' },
    image_size: 'full',
    _margin: pad(0, 0, 0, 0)
  });
}
function imageBox(img, title, desc, linkUrl) {
  const s = {
    image: { url: abs(img), id: '', source: 'library' },
    image_size: 'full',
    title_text: title,
    description_text: desc || '',
    position: 'top',
    title_color: C.black,
    description_color: C.gray,
    title_typography_typography: 'custom',
    title_typography_font_family: F.display,
    title_typography_font_size: px(22),
    title_typography_font_weight: '800',
    description_typography_typography: 'custom',
    description_typography_font_family: F.body,
    description_typography_font_size: px(15)
  };
  if (linkUrl) s.link = { url: linkUrl, is_external: '', nofollow: '' };
  return widget('image-box', s);
}
function iconBox(label, title, desc) {
  return widget('icon-box', {
    selected_icon: { value: '', library: '' },
    title_text: title,
    description_text: desc || '',
    position: 'top',
    title_color: C.black,
    description_color: C.gray,
    title_typography_typography: 'custom',
    title_typography_font_family: F.display,
    title_typography_font_size: px(20),
    title_typography_font_weight: '800',
    description_typography_typography: 'custom',
    description_typography_font_family: F.body,
    description_typography_font_size: px(15)
  });
}
function counter(num, label, note) {
  const digits = String(num).replace(/[^0-9]/g, '');
  const m = String(num).match(/^([^0-9]*)[0-9,]*(.*)$/);
  return widget('counter', {
    starting_number: 0,
    ending_number: digits ? parseInt(digits, 10) : 0,
    prefix: m ? m[1] : '',
    suffix: m ? m[2] : '',
    title: label + (note ? ' — ' + note : ''),
    number_color: C.black,
    title_color: C.gray,
    typography_number_typography: 'custom',
    typography_number_font_family: F.display,
    typography_number_font_size: px(44),
    typography_number_font_weight: '800',
    typography_title_typography: 'custom',
    typography_title_font_family: F.body,
    typography_title_font_size: px(13),
    typography_title_text_transform: 'uppercase',
    typography_title_letter_spacing: { unit: 'px', size: 1.8 }
  });
}
function divider() {
  return widget('divider', { color: C.line, weight: px(1), gap: px(24) });
}
function spacer(h) { return widget('spacer', { space: px(h) }); }

/* html widget — used only where an Elementor widget cannot express the layout */
function html(markup) { return widget('html', { html: markup }); }

/* ---- section builders ---- */
function secHead(kickerText, headingText, ledeText, dark) {
  const els = [kicker(kickerText), heading(headingText, { color: dark ? C.white : C.black })];
  if (ledeText) els.push(text(ledeText, { color: dark ? 'rgba(255,255,255,0.66)' : C.gray, size: 19 }));
  els.push(spacer(34));
  return els;
}

function needCells() {
  return grid(4, 2, D.D2U_INDUSTRY.map(function (s) {
    return inner({
      content_width: 'full', flex_direction: 'column',
      background_background: 'classic', background_color: C.white,
      padding: pad(30, 26, 30, 26)
    }, [
      heading(s.n, { tag: 'div', size: 38, mb: 12 }),
      text(s.label, { color: C.charcoal, size: 15, mb: 14 }),
      text('Source: ' + s.source, { color: C.gray, size: 11 })
    ]);
  }));
}

function impactCells() {
  return grid(2, 2, D.D2U_IMPACT.map(function (m) {
    if (m.pending) {
      return inner({
        content_width: 'full', flex_direction: 'column',
        background_background: 'classic', background_color: C.black,
        border_border: 'dashed', border_width: pad(1, 1, 1, 1), border_color: 'rgba(255,255,255,0.18)',
        padding: pad(24, 22, 24, 22)
      }, [
        heading('—', { tag: 'div', size: 30, color: 'rgba(255,255,255,0.22)', mb: 10 }),
        text(m.label, { color: C.gray, size: 13, mb: 8 }),
        text('Tracking', { color: C.gray, size: 11 })
      ]);
    }
    return inner({
      content_width: 'full', flex_direction: 'column',
      background_background: 'classic', background_color: C.black,
      padding: pad(24, 22, 24, 22)
    }, [
      heading(m.n, { tag: 'div', size: 34, color: C.white, mb: 10 }),
      text(m.label, { color: 'rgba(255,255,255,0.85)', size: 13, mb: 8 }),
      m.note ? text(m.note, { color: 'rgba(255,255,255,0.45)', size: 12 }) : spacer(0)
    ]);
  }));
}

function categoryCards(allPrograms) {
  return grid(2, 2, D.D2U_CATEGORIES.map(function (c) {
    const list = c.programs.map(function (k) {
      const p = allPrograms[k];
      return p ? '<li>' + p.title + '</li>' : '';
    }).join('');
    return inner({
      content_width: 'full', flex_direction: 'column',
      background_background: 'classic', background_color: C.white,
      padding: pad(0, 0, 0, 0)
    }, [
      image(c.img, c.title),
      inner({ content_width: 'full', flex_direction: 'column', padding: pad(28, 28, 32, 28) }, [
        kicker(c.kicker),
        heading(c.title, { size: 26, mb: 12 }),
        text(c.desc, { size: 15, mb: 18 }),
        html('<ul class="d2u-cat-list">' + list + '</ul>' +
             '<!-- Link each item to its popup: Elementor link field → Dynamic → Popup -->')
      ])
    ]);
  }));
}

/* ---- popup builder ---- */
function popupTemplate(title, elements) {
  return {
    version: '0.4',
    title: title,
    type: 'popup',
    content: [container({
      content_width: 'boxed',
      flex_direction: 'column',
      background_background: 'classic',
      background_color: C.white,
      padding: pad(44, 44, 48, 44),
      padding_mobile: pad(28, 22, 32, 22)
    }, elements)],
    page_settings: {
      width: px(940),
      a11y_navigation: 'yes',
      prevent_scroll: 'yes',
      close_button: 'yes',
      overlay_background: 'classic',
      overlay_color: 'rgba(10,10,10,0.72)',
      entrance_animation: 'fadeInUp',
      triggers: {},
      timing: {}
    }
  };
}

function programPopup(key, p) {
  const els = [];
  if (p.img) els.push(image(p.img, p.title));
  if (p.tag) els.push(kicker(p.tag));
  if (p.kicker) els.push(text(p.kicker, { color: C.gray, size: 14, mb: 8 }));
  els.push(heading(p.title, { size: 34, mb: 16 }));
  els.push(text(p.desc || p.short, { size: 17, mb: 22 }));
  if (p.meta && p.meta.length) {
    els.push(grid(p.meta.length > 2 ? 3 : 2, 2, p.meta.map(function (m) {
      return inner({
        content_width: 'full', flex_direction: 'column',
        background_background: 'classic', background_color: C.offWhite,
        padding: pad(16, 20, 16, 20)
      }, [
        text(m[0], { color: C.gray, size: 11, mb: 4 }),
        text(m[1], { color: C.black, size: 15 })
      ]);
    })));
    els.push(spacer(26));
  }
  if (p.bullets && p.bullets.length) {
    els.push(divider());
    els.push(heading('What you’ll learn', { tag: 'h3', size: 20, mb: 14 }));
    els.push(html('<ul class="d2u-list">' + p.bullets.map(function (b) {
      return Array.isArray(b) ? '<li><strong>' + b[0] + '</strong><br>' + b[1] + '</li>' : '<li>' + b + '</li>';
    }).join('') + '</ul>'));
  }
  els.push(buttonRow([
    button('Apply / Inquire', '/contact', 'primary'),
    button('Support This Program', '/donate', 'ghost')
  ]));
  return popupTemplate('Digi2U — ' + p.title, els);
}

function personPopup(p) {
  const els = [];
  if (p.img) els.push(image(p.img, p.name));
  if (p.role) els.push(kicker(p.role));
  els.push(heading(p.name, { size: 32, mb: 8 }));
  if (p.tagline) els.push(text(p.tagline, { color: C.gray, size: 15, mb: 18 }));
  if (p.bio) els.push(text(p.bio, { size: 17, mb: 24 }));
  if (p.experience && p.experience.length) {
    els.push(divider());
    els.push(heading('Experience', { tag: 'h3', size: 20, mb: 14 }));
    els.push(html('<div class="d2u-exp">' + p.experience.map(function (e) {
      return '<div class="d2u-exp-item"><h4>' + e.role + (e.company ? ' · ' + e.company : '') + '</h4>' +
        (e.dates ? '<div class="d2u-when">' + e.dates + '</div>' : '') +
        (e.desc ? '<p>' + e.desc + '</p>' : '') + '</div>';
    }).join('') + '</div>'));
  }
  if (p.expertise && p.expertise.length) {
    els.push(heading('Expertise', { tag: 'h3', size: 20, mb: 14 }));
    els.push(html('<ul class="d2u-chips">' + p.expertise.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'));
  }
  return popupTemplate('Digi2U Team — ' + p.name, els);
}

/* ---- page builders ---- */
function pageTemplate(title, content) {
  return { version: '0.4', title: title, type: 'page', content: content, page_settings: {} };
}

const allPrograms = Object.assign({}, D.D2U_PROGRAMS, D.D2U_CERTS);

function homePage() {
  return pageTemplate('Digi2U — Home', [
    /* hero */
    section({ bgImage: D.D2U_VIDEOS.mentorship.poster, minHeight: 640, padTop: 140, padBottom: 90 }, [
      kicker('501(c)(3) · Newark · Jersey City · Atlanta · Houston'),
      heading('STEAM skills.<br>Real-world careers.', { tag: 'h1', size: 82, color: C.white, mb: 22 }),
      text('The equipment that opens doors — the printers, the cameras, the consoles — has always been behind one. Digi2U opens it. Hands-on STEAM training built for working adults, where you learn by making something real and walk out still holding it.',
        { color: 'rgba(255,255,255,0.82)', size: 20 }),
      buttonRow([button('Donate Now', '/donate', 'primary'), button('Explore Programs', '#programs', 'ghost')])
    ]),

    /* 01 opportunity */
    section({}, secHead('The Opportunity', 'Bridging the<br>digital divide.',
      'Ninety-two percent of jobs now ask for digital skills. A third of the workforce has never been handed the chance to build them. That is not a talent gap — it is a door, and in our communities it has been closed a long time.')
      .concat([
        needCells(),
        spacer(20),
        text('These are national workforce figures from the Bureau of Labor Statistics and the National Skills Coalition. They describe the landscape Digi2U operates in — they are not Digi2U’s results.',
          { size: 14 })
      ])),

    /* 02 mission */
    section({ bg: C.black }, secHead('Our Mission', 'Learn by doing.<br>Earn by building.',
      'We do not hand out certificates for sitting through slides. In the 3D track you assemble the printer, then print on the machine you built. On a live production night you are not watching the crew — you are the crew. The work is the teacher.', true)
      .concat([
        grid(4, 2, D.D2U_PILLARS.map(function (p) {
          return inner({ content_width: 'full', flex_direction: 'column', padding: pad(24, 22, 26, 22) }, [
            heading(p.n, { tag: 'div', size: 30, color: C.red, mb: 12 }),
            heading(p.title, { tag: 'h3', size: 19, color: C.white, mb: 8 }),
            text(p.desc, { color: 'rgba(255,255,255,0.6)', size: 14 })
          ]);
        })),
        buttonRow([button('Explore Programs', '#programs', 'primary'), button('About Digi2U', '/mission', 'ghost')])
      ])),

    /* 03 programs */
    section({ bg: C.offWhite }, secHead('Featured Programs', 'Twelve tracks.<br>One goal: marketable skills.',
      'Twelve ways in. Whatever you already know how to do — a trade, a hustle, an eye for color, a good ear — one of these builds on it. Tap any program to read the full course description, what you’ll learn, and how to enroll.')
      .concat([categoryCards(allPrograms)])),

    /* 04 hands on */
    section({}, secHead('Hands On Always', 'Real tools. Real projects.<br>Real outcomes.',
      'Theory matters. But nobody ever learned to run a four-camera shoot from a slide deck. Every track ends in something that exists — a printed prototype, a mastered track, a finished film, a licensed flight.')
      .concat([
        grid(4, 2, D.D2U_MOMENTS.map(function (m) {
          return imageBox(m.img, m.title, m.desc);
        }))
      ])),

    /* why this matters — the throughline */
    section({ bg: C.black }, [
      kicker('Why This Matters'),
      heading('The neighborhood is being rewritten. Ours is learning to write.', { size: 42, color: C.white, mb: 22 }),
      text('Digi2U trains adults in Newark and Jersey City — the same blocks that <em>26 Blocks</em> is spending twenty years documenting.',
        { color: C.white, size: 22, mb: 18 }),
      text('That documentary series is about gentrification: who gets pushed out, who gets to stay, and who gets to decide. Digi2U provides the technical expertise, the infrastructure, and the training in media production and documentary filmmaking that makes the work possible — through makerspaces in Jersey City, Newark, and Atlanta.',
        { color: 'rgba(255,255,255,0.72)', size: 18, mb: 16 }),
      text('<strong>So the people whose neighborhoods are being rewritten are the ones learning to hold the camera.</strong> That is not a nice coincidence. It is the whole argument: skills are how a community stops being the subject of somebody else\u2019s story and starts telling its own.',
        { color: 'rgba(255,255,255,0.72)', size: 18 }),
      buttonRow([button('See The Films', '/impact', 'primary'), button('Train With Us', '/programs', 'ghost')])
    ]),

    /* band */
    section({ bgImage: 'assets/deck/d2u-deck-barat-studio.webp', minHeight: 460, padTop: 120, padBottom: 60 }, [
      kicker('Studio Way'),
      heading('Flagship campus.<br>NJ &amp; ATL.', { size: 44, color: C.white, mb: 14 }),
      text('Makerspaces, mobile media labs, and studio space where adult learners train on the same equipment the industry uses.',
        { color: 'rgba(255,255,255,0.78)', size: 18 })
    ]),

    /* 05 impact dashboard */
    section({ bg: C.black }, secHead('Impact', 'The impact we’ve<br>delivered to date.',
      'Two different things, kept deliberately apart — because a nonprofit that blurs them is telling you something. On the left is the national picture. On the right is only what Digi2U has actually done.', true)
      .concat([
        grid(2, 40, [
          [
            heading('The Need', { tag: 'h3', size: 26, color: C.white, mb: 8 }),
            text('National data. Independent workforce research — not Digi2U figures.', { color: 'rgba(255,255,255,0.55)', size: 14, mb: 18 }),
            needCells()
          ],
          [
            heading('Our Impact', { tag: 'h3', size: 26, color: C.white, mb: 8 }),
            text('Digi2U. Our own numbers only. Cards marked Tracking stay empty until the data is real.', { color: 'rgba(255,255,255,0.55)', size: 14, mb: 18 }),
            impactCells()
          ]
        ])
      ])),

    /* 07 our story */
    section({}, secHead('Mission & Vision', D.D2U_STORY.lead, D.D2U_STORY.body)
      .concat([
        grid(2, 2, D.D2U_STORY.pillars.map(function (p) {
          return inner({
            content_width: 'full', flex_direction: 'column',
            background_background: 'classic', background_color: C.white,
            padding: pad(26, 24, 28, 24)
          }, [
            heading(p.title, { tag: 'h3', size: 20, mb: 8 }),
            text(p.desc, { size: 15 })
          ]);
        }))
      ])),

    /* 08 community */
    section({ bg: C.offWhite }, secHead('Community', 'Community first.<br>Always.',
      'Students turned a police precinct into a haunted house. They turned a community center gym into a Christmas Wonderland for Newark families — tree assembly, sound, lighting, video walls, the whole room. Not as a class exercise. As the crew.')
      .concat([
        grid(4, 2, D.D2U_GALLERY.slice(0, 8).map(function (g) { return image(g.src, g.cap); })),
        spacer(46),
        kicker('In Partnership With'),
        grid(4, 2, D.D2U_LOGOS.map(function (l) { return image(l.src, l.name); }))
      ])),

    /* 09 giving */
    section({ bg: C.black }, secHead('Join The Mission', 'Ready to put skills into the hands of adults ready to build what’s next?',
      'Give once. Give monthly. Give stock. Every gift funds curriculum, tools, space, and the people who make it all work — and somebody walks out with a portfolio and a credential who had neither when they walked in.', true)
      .concat([
        grid(4, 2, D.D2U_GIVING.map(function (g) {
          return inner({ content_width: 'full', flex_direction: 'column', padding: pad(28, 24, 32, 24) }, [
            heading(g.icon, { tag: 'div', size: 16, color: C.red, mb: 16 }),
            heading(g.title, { tag: 'h3', size: 19, color: C.white, mb: 10 }),
            text(g.desc, { color: 'rgba(255,255,255,0.6)', size: 14 })
          ]);
        })),
        buttonRow([button('Donate Now', '/donate', 'primary'), button('Contact Us', '/contact', 'ghost')])
      ]))
  ]);
}

function missionPage() {
  return pageTemplate('Digi2U — Mission', [
    section({ bgImage: 'https://digi2u.org/wp-content/uploads/2026/05/d2u-newark-3d-1.webp', minHeight: 560, padTop: 140, padBottom: 80 }, [
      kicker('About Digi2U · 501(c)(3) Nonprofit'),
      heading('Bridging the<br>digital divide.', { tag: 'h1', size: 76, color: C.white, mb: 20 }),
      text('Digi2U is dedicated to providing hands-on training in technology, media, and creative industries to empower individuals and communities. Through innovative programs, we equip students with the skills, tools, and resources needed to succeed in the digital age — fostering growth, creativity, and career advancement.',
        { color: 'rgba(255,255,255,0.82)', size: 19 }),
      buttonRow([button('Meet The Team', '#team', 'primary'), button('Explore Programs', '/programs', 'ghost')])
    ]),
    section({}, secHead('Mission & Vision', 'Empowering communities through innovation.',
      'Digi2U, a nonprofit 501(c)(3) tax-exempt organization, prepares people for well-paid technology jobs and in-demand businesses through innovative training in STEAM — Science, Technology, Engineering, Arts, and Math.')
      .concat([
        grid(2, 2, [
          inner({ content_width: 'full', flex_direction: 'column', background_background: 'classic', background_color: C.white, padding: pad(30, 28, 34, 28) },
            [heading('Our Mission', { tag: 'h3', size: 22, mb: 10 }), text('To equip our communities with the tools, training, and opportunities to succeed.', { size: 15 })]),
          inner({ content_width: 'full', flex_direction: 'column', background_background: 'classic', background_color: C.white, padding: pad(30, 28, 34, 28) },
            [heading('Our Vision', { tag: 'h3', size: 22, mb: 10 }), text('A world where all individuals, regardless of background, have access to the resources needed to thrive in a technology-driven society.', { size: 15 })])
        ])
      ])),
    section({ bg: C.offWhite }, secHead('Theory Of Change', 'Access. Training.<br>Opportunity.',
      'Every Digi2U program follows the same route — expanding access to technology, pairing instruction with real-life projects, and leaving adult learners with marketable skills, portfolios, and real career paths.')
      .concat([
        grid(5, 2, D.D2U_THEORY.map(function (t) {
          return inner({ content_width: 'full', flex_direction: 'column', background_background: 'classic', background_color: C.white, padding: pad(28, 24, 34, 24) }, [
            heading(t.step, { tag: 'div', size: 14, color: C.red, mb: 14 }),
            heading(t.title, { tag: 'h3', size: 20, mb: 10 }),
            text(t.desc, { size: 14 })
          ]);
        }))
      ])),
    section({ bg: C.black }, secHead('How We Show Up', 'Four values everyone signs.',
      'These aren’t slogans — they’re the criteria we hire, mentor, and promote against.', true)
      .concat([
        grid(4, 2, D.D2U_VALUES.map(function (v) {
          return inner({ content_width: 'full', flex_direction: 'column', padding: pad(24, 22, 28, 22) }, [
            heading(v.n, { tag: 'div', size: 30, color: C.red, mb: 12 }),
            heading(v.title, { tag: 'h3', size: 19, color: C.white, mb: 8 }),
            text(v.desc, { color: 'rgba(255,255,255,0.6)', size: 14 })
          ]);
        }))
      ])),
    section({}, secHead('Team Leadership', 'A passionate team<br>driving the mission.',
      'A passionate team dedicated to innovation and community impact — industry professionals, educators, and creatives committed to empowering individuals through technology, education, and digital media. Tap any team member to read their full bio, experience, and expertise.')
      .concat([
        grid(4, 2, D.D2U_TEAM.map(function (p) {
          return imageBox(p.img, p.name, p.role);
        }))
      ]))
  ]);
}

function programsPage() {
  return pageTemplate('Digi2U — Programs', [
    section({ bgImage: 'https://digi2u.org/wp-content/uploads/2026/07/girls-in-tech-3d-lab-wide.jpg', minHeight: 560, padTop: 140, padBottom: 80 }, [
      kicker('12 Tracks + 3 Certifications'),
      heading('Explore our<br>programs.', { tag: 'h1', size: 76, color: C.white, mb: 20 }),
      text('Hands-on training in technology, media, and creative industries — pairing instruction with real-life projects so adult learners leave with marketable skills, finished products, and portfolios. Tap any program for the full course description.',
        { color: 'rgba(255,255,255,0.82)', size: 19 }),
      buttonRow([button('View All Programs', '#programs', 'primary'), button('Certifications', '#certs', 'ghost')])
    ]),
    section({}, [
      grid(4, 2, D.D2U_STATS.map(function (s) { return counter(s.n, s.label); }))
    ]),
    section({}, secHead('Our Programs', 'Twelve tracks.<br>One goal: marketable skills.',
      'Tap any program to read the full course description, what you’ll learn, and how to enroll.')
      .concat([
        grid(3, 2, Object.keys(D.D2U_PROGRAMS).map(function (k) {
          const p = D.D2U_PROGRAMS[k];
          return imageBox(p.img, p.title, p.short);
        }))
      ])),
    section({ bg: C.offWhite }, secHead('Certification Programs', 'Industry credentials.<br>Real job readiness.',
      'Earn nationally recognized certifications that employers look for. Each certification combines hands-on training with the test-prep work needed to pass on the first try.')
      .concat([
        grid(3, 2, Object.keys(D.D2U_CERTS).map(function (k) {
          const p = D.D2U_CERTS[k];
          return imageBox(p.img, p.title, p.short);
        }))
      ]))
  ]);
}

function impactPage() {
  return pageTemplate('Digi2U — Impact', [
    section({ bgImage: D.D2U_VIDEOS.studio.poster, minHeight: 560, padTop: 140, padBottom: 80 }, [
      kicker('Films · Events · Partners · Field Trips'),
      heading('Capturing stories.<br>Creativity.', { tag: 'h1', size: 76, color: C.white, mb: 20 }),
      text('Discover a collection of powerful stories, creative productions, and digital innovations from Digi2U. From documentaries and podcasts to live streams and behind-the-scenes content, our media platform showcases the voices, experiences, and impact of our community-driven initiatives.',
        { color: 'rgba(255,255,255,0.82)', size: 19 })
    ]),
    section({}, secHead('By The Numbers', 'The impact we’ve<br>delivered to date.',
      'Two different things, kept deliberately apart. On the left is independent national workforce research. On the right is only what Digi2U has done.')
      .concat([
        grid(2, 40, [
          [heading('The Need', { tag: 'h3', size: 24, mb: 14 }), needCells()],
          [heading('Our Impact', { tag: 'h3', size: 24, mb: 14 }), impactCells()]
        ])
      ])),
    section({}, secHead('Documentaries · Produced by 26 Blocks', 'Three feature films.<br>Critical stories.',
      'Long-form documentaries on gentrification, community advocacy, and resilience — produced through Digi2U’s partnership with 26 Blocks, with student crews working alongside the production team.')
      .concat([
        grid(3, 2, Object.keys(D.D2U_DOCS).map(function (k) {
          const d = D.D2U_DOCS[k];
          return iconBox(d.icon, d.title, d.desc);
        }))
      ])),
    section({ bgImage: 'assets/deck/d2u-deck-spinoff-panel.webp', minHeight: 460, padTop: 120, padBottom: 60 }, [
      kicker('Live Production'),
      heading('Students run the room.', { size: 44, color: C.white, mb: 14 }),
      text('Sound mixing, multi-camera recording, streaming and live switching, theatrical lighting, and stage rigging — setup, operation, and breakdown, under instructor supervision.',
        { color: 'rgba(255,255,255,0.78)', size: 18 })
    ]),
    section({ bg: C.offWhite }, secHead('The Gallery', 'Behind the scenes.<br>Inside our productions.',
      'Photographed across our Newark, Jersey City, and Atlanta programs — 3D builds, art classes, audio sessions, live productions, and community events.')
      .concat([
        grid(4, 2, D.D2U_GALLERY.map(function (g) { return image(g.src, g.cap); }))
      ])),
    section({}, secHead('In Partnership With', 'Partnering to create<br>lasting impact.',
      'Empowering communities through collaboration. Foundations, universities, libraries, and businesses that move the work forward.')
      .concat([
        grid(4, 2, D.D2U_LOGOS.map(function (l) { return image(l.src, l.name); }))
      ]))
  ]);
}

function getInvolvedPage() {
  return pageTemplate('Digi2U — Get Involved', [
    section({ bgImage: 'https://digi2u.org/wp-content/uploads/2026/05/d2u-cherry-xmas-3.webp', minHeight: 560, padTop: 140, padBottom: 80 }, [
      kicker('Donate · Sponsor · Volunteer · Teach · Partner'),
      heading('Show up.<br>Skill up.<br>Lift others.', { tag: 'h1', size: 72, color: C.white, mb: 20 }),
      text('Digi2U is looking for passionate individuals who want to contribute to our mission of expanding access to technology, education, and creative opportunities. Volunteer, intern, or teach — whichever role fits, you’ll leave Digi2U more skilled, more connected, and with real impact under your belt.',
        { color: 'rgba(255,255,255,0.82)', size: 19 }),
      buttonRow([button('Donate Now', '#donate', 'primary'), button('Volunteer / Teach', '#roles', 'ghost')])
    ]),
    section({}, secHead('Give', 'Ready to put skills into the hands of adults ready to build what’s next?',
      'Give once. Give monthly. Give stock. Every gift funds curriculum, tools, space, and the people who make it all work.')
      .concat([
        grid(4, 2, D.D2U_GIVING.map(function (g) {
          return inner({ content_width: 'full', flex_direction: 'column', background_background: 'classic', background_color: C.white, padding: pad(28, 24, 32, 24) }, [
            heading(g.icon, { tag: 'div', size: 16, color: C.red, mb: 16 }),
            heading(g.title, { tag: 'h3', size: 19, mb: 10 }),
            text(g.desc, { size: 14 })
          ]);
        })),
        buttonRow([button('Donate Now', 'mailto:' + D.D2U_ORG.email, 'primary')])
      ])),
    section({ bg: C.offWhite }, secHead('Sponsorship Tiers', 'Three ways to show up big.',
      'Custom packages also available. Contact our team to design a sponsorship that fits your goals.')
      .concat([
        grid(3, 2, Object.keys(D.D2U_TIERS).map(function (k) {
          const t = D.D2U_TIERS[k];
          return widget('price-table', {
            heading: t.name,
            sub_heading: t.tag,
            price: t.amount.replace(/[^0-9,]/g, ''),
            currency_symbol: 'dollar',
            period: '',
            features_list: t.benefits.map(function (b) {
              return { _id: uid(), item_text: b, selected_item_icon: { value: '', library: '' } };
            }),
            button_text: 'Talk Sponsorship',
            link: { url: '#contact', is_external: '', nofollow: '' },
            header_bg_color: k === 'strategic' ? C.black : C.white,
            heading_color: k === 'strategic' ? C.white : C.black,
            price_color: C.black
          });
        }))
      ])),
    section({}, secHead('Now Hiring · New Jersey + Atlanta', 'Three roles.<br>One mission.',
      'Digi2U will be hosting Spring and Summer classes, Bootcamps, Online Webinars, Field Trips, and Expos to kick start the season for members of the community in New Jersey and Atlanta. Choose the role that fits and apply — the form below routes directly to our team.')
      .concat([
        grid(3, 2, Object.keys(D.D2U_ROLES).map(function (k) {
          const r = D.D2U_ROLES[k];
          return iconBox(r.icon, r.title, r.desc);
        }))
      ])),
    section({ bg: C.black }, secHead('Get In Touch', 'Have questions?<br>We’re here.',
      'Whether you’re considering joining a program, partnering, or just want to learn more about our work — our team is ready to talk.', true)
      .concat([
        grid(2, 40, [
          [
            text('<strong>Email</strong><br>' + D.D2U_ORG.email, { color: C.white, size: 16, mb: 16 }),
            text('<strong>Phone</strong><br>' + D.D2U_ORG.phone, { color: C.white, size: 16, mb: 16 }),
            text('<strong>Office</strong><br>' + D.D2U_ORG.address, { color: C.white, size: 16, mb: 16 }),
            text('501(c)(3) Nonprofit · EIN ' + D.D2U_ORG.ein + ' · All gifts tax-deductible', { color: 'rgba(255,255,255,0.5)', size: 13 })
          ],
          [
            widget('form', {
              form_name: 'Digi2U Inquiry',
              form_fields: [
                { _id: uid(), custom_id: 'name', field_type: 'text', field_label: 'Full Name', placeholder: 'Full Name', required: 'true', width: '100' },
                { _id: uid(), custom_id: 'email', field_type: 'email', field_label: 'Email', placeholder: 'Email', required: 'true', width: '100' },
                { _id: uid(), custom_id: 'interest', field_type: 'select', field_label: 'I’m Interested In', width: '100',
                  field_options: 'Enrolling in a program\nVolunteering\nAn internship\nTeaching a track\nCorporate sponsorship\nCommunity partnership\nDonating\nSharing my story' },
                { _id: uid(), custom_id: 'message', field_type: 'textarea', field_label: 'Message', placeholder: 'Message', width: '100' }
              ],
              button_text: 'Submit',
              email_to: D.D2U_ORG.email,
              button_background_color: C.red,
              button_text_color: C.white
            })
          ]
        ])
      ]))
  ]);
}

/* ---- write everything ---- */
const OUT = 'elementor';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'pages'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'popups'), { recursive: true });

function write(dir, name, obj) {
  const file = path.join(OUT, dir, name + '.json');
  fs.writeFileSync(file, JSON.stringify(obj, null, 1));
  return file;
}

const written = [];
written.push(write('pages', '01-home', homePage()));
written.push(write('pages', '02-mission', missionPage()));
written.push(write('pages', '03-programs', programsPage()));
written.push(write('pages', '04-impact', impactPage()));
written.push(write('pages', '05-get-involved', getInvolvedPage()));

Object.keys(allPrograms).forEach(function (k) {
  written.push(write('popups', 'program-' + k, programPopup(k, allPrograms[k])));
});
D.D2U_TEAM.forEach(function (p) {
  written.push(write('popups', 'team-' + p.id, personPopup(p)));
});

console.log('wrote ' + written.length + ' templates');
written.forEach(function (f) {
  console.log('  ' + f + '  (' + (fs.statSync(f).size / 1024).toFixed(1) + ' KB)');
});
