#!/usr/bin/env node
/*
 * Converts the demo pages into the HTML stored as WordPress post_content.
 *
 * Two things change on the way in: repo-relative URLs become absolute (the
 * assets are served from GitHub Pages, not from digi2u.org), and links between
 * pages become the WordPress permalinks. Nothing else is rewritten, so the demo
 * stays the single source of truth for the markup.
 *
 * The stylesheet swap matters: WordPress gets site-wp.css (see build-wp-css.js),
 * whose selectors are scoped to .entry-content so they outrank the Elementor
 * Global Kit. The <link> sits in the content — i.e. in <body>, after every
 * stylesheet WordPress prints in <head> — which is what wins the ties.
 */
const fs = require('fs');

const CDN = 'https://borngifted.github.io/digi2u-2026/';
const PAGES = {
  'index':        { id: 25565, slug: '/' },
  'mission':      { id: 25489, slug: '/mission/' },
  'programs':     { id: 25490, slug: '/programs-2026/' },
  'impact':       { id: 25491, slug: '/impact/' },
  'events':       { id: 25504, slug: '/events-2026/' },
  'past-events':  { id: 25505, slug: '/past-events/' },
  'get-involved': { id: 25492, slug: '/get-involved/' },
  /* The /donate/ permalink is held by attachment 23328 (donate.jpg), whose
     attachment page sits there, so WordPress assigned donate-2. Free that
     slug and this becomes '/donate/'. */
  'donate':       { id: 25626, slug: '/donate-2/' },
  'blog':         { id: null,  slug: '/blog-2026/' },
  'rico-rich':    { id: null,  slug: '/rico-rich/' },
};

const HEAD = [
  // fonts.gstatic.com is a third origin the browser cannot discover until it has
  // fetched and parsed the fonts.googleapis.com stylesheet below — preconnecting
  // saves a full DNS/TCP/TLS handshake on the critical font path.
  // (No hint for borngifted.github.io: the link that needs it is the very next
  // line, so the preload scanner reaches both together and a hint buys nothing.)
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap">',
  `<link rel="stylesheet" href="${CDN}assets/site-wp.css">`,
].join('\n');

fs.mkdirSync('build/wp', { recursive: true });

for (const [name, meta] of Object.entries(PAGES)) {
  let body = fs.readFileSync(`${name}.html`, 'utf8')
    .replace(/^[\s\S]*?<body>/, '')
    .replace(/<\/body>[\s\S]*$/, '')
    .trim();

  // Inter-page links -> WordPress permalinks (longest first so index.html#x survives)
  for (const [n, m] of Object.entries(PAGES)) {
    body = body.split(`"${n}.html`).join(`"${m.slug}`).split(`'${n}.html`).join(`'${m.slug}`);
  }
  body = body.replace(/"\/(#[^"]*)"/g, '"/$1"');           // "/#donate" stays root-relative

  // Repo-relative asset URLs -> absolute. Covers both attributes and the few
  // JS string literals that still name a path directly.
  body = body.replace(/(src|href)="assets\//g, `$1="${CDN}assets/`)
             .replace(/(src|href)='assets\//g, `$1='${CDN}assets/`)
             .replace(/'assets\//g, `'${CDN}assets/`);

  // One bundle per page instead of the eight separate files the demo loads.
  body = body.replace(/<script src="[^"]*"><\/script>(\n<script src="[^"]*"><\/script>)*/,
                      `<script src="${CDN}assets/bundle-${name}.js"></script>`);

  const out = HEAD + '\n' + body + '\n';
  fs.writeFileSync(`build/wp/${name}.html`, out);

  const rel = (out.match(/["']assets\//g) || []).length;
  const inline = (out.match(/<script>/g) || []).length;
  console.log(`${name.padEnd(13)} id=${meta.id}  ${String(out.length).padStart(6)}b  relative-left=${rel}  inline-scripts=${inline}`);
  if (rel || inline) { console.error('  ^ FAILED sanity check'); process.exitCode = 1; }
}
