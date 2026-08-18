#!/usr/bin/env node
/*
 * Builds assets/site-wp.css — the WordPress-scoped edition of site.css.
 *
 * Why this exists: WordPress loads the Elementor Global Kit stylesheet, whose
 * rules look like `.elementor-kit-21964 h2 { ... }` — specificity (0,1,1).
 * site.css styles headings with a bare `h1, h2, h3, h4` rule at (0,0,1), so the
 * kit wins every element-level property: headings came out red instead of near
 * black, body copy in Poppins instead of Inter.
 *
 * Fighting that rule by rule breaks the design, because our own dark-section
 * overrides (`.sec-dark h2`) also sit at (0,1,1) — any blanket override strong
 * enough to beat the kit is also strong enough to beat those, turning white
 * headings on black sections back to black.
 *
 * So instead of patching, every selector is prefixed with `.entry-content`
 * (the WordPress content wrapper the 2026 markup lives inside). That lifts the
 * whole sheet by exactly one class, preserving every internal relationship:
 *   base headings  (0,0,1) -> (0,1,1)   ties the kit, wins on source order
 *   .sec-dark h2   (0,1,1) -> (0,2,1)   still beats the base rule
 * WordPress loads this file instead of site.css; the demo keeps using site.css
 * unchanged, so there is one source of truth for the design.
 */
const fs = require('fs');

const SRC = 'assets/site.css';
const OUT = 'assets/site-wp.css';
const SCOPE = '.entry-content';

const css = fs.readFileSync(SRC, 'utf8');

/* Split into top-level chunks, tracking brace depth so nested at-rules survive. */
function scopeSelector(sel) {
  return sel.split(',').map(function (part) {
    const s = part.trim();
    if (!s) return part;
    // :root holds the design tokens and must stay on the document root.
    if (s === ':root' || s.startsWith(':root')) return s;
    if (s.startsWith('from') || s.startsWith('to') || /^\d+%$/.test(s)) return s; // keyframe stops
    // `body`/`html` rules describe the page surface — retarget onto the wrapper.
    if (s === 'body' || s === 'html' || s === 'html, body') return SCOPE;
    if (s.startsWith('body ')) return SCOPE + ' ' + s.slice(5);
    if (s.startsWith('html ')) return SCOPE + ' ' + s.slice(5);
    return SCOPE + ' ' + s;
  }).join(', ');
}

let out = '';
let i = 0;
const n = css.length;

function readBlock(start) {          // returns index just past the matching }
  let depth = 0, j = start;
  for (; j < n; j++) {
    if (css[j] === '{') depth++;
    else if (css[j] === '}') { depth--; if (depth === 0) return j + 1; }
  }
  return n;
}

function transform(text) {
  let res = '', k = 0;
  while (k < text.length) {
    const brace = text.indexOf('{', k);
    if (brace === -1) { res += text.slice(k); break; }
    let prelude = text.slice(k, brace);
    const end = readBlockIn(text, brace);
    const body = text.slice(brace + 1, end - 1);
    const trimmed = prelude.trim();

    if (trimmed.startsWith('@keyframes') || trimmed.startsWith('@-webkit-keyframes') ||
        trimmed.startsWith('@font-face') || trimmed.startsWith('@property')) {
      res += prelude + '{' + body + '}';                     // leave contents alone
    } else if (trimmed.startsWith('@media') || trimmed.startsWith('@supports') ||
               trimmed.startsWith('@layer') || trimmed.startsWith('@container')) {
      res += prelude + '{' + transform(body) + '}';          // recurse into the block
    } else {
      /* Preserve any comment that precedes the selector. */
      const cm = prelude.lastIndexOf('*/');
      const lead = cm === -1 ? '' : prelude.slice(0, cm + 2);
      const sel  = cm === -1 ? prelude : prelude.slice(cm + 2);
      res += lead + (sel.match(/^\s*/) || [''])[0] + scopeSelector(sel) + ' {' + body + '}';
    }
    k = end;
  }
  return res;
}

function readBlockIn(text, start) {
  let depth = 0;
  for (let j = start; j < text.length; j++) {
    if (text[j] === '{') depth++;
    else if (text[j] === '}') { depth--; if (depth === 0) return j + 1; }
  }
  return text.length;
}

/*
 * One block that must NOT be scoped.
 *
 * The 2026 pages ship their own nav and footer inside the content, so the
 * theme's Elementor header and footer are duplicate chrome sitting above and
 * below them — the old site's mega menu on top of the new one. The live site
 * was suppressing them through an allow-list in the Customizer's Additional
 * CSS naming ten page IDs one by one, which meant any page added later came
 * out wearing the old chrome. That is exactly what happened to /donate-2/.
 *
 * Scoping cannot express this: .elementor-location-header sits OUTSIDE
 * .entry-content, so a prefixed selector can never reach it. It is appended
 * here instead, after the scoped sheet, and applies to every page that loads
 * site-wp.css — which is only ever a 2026 page. New pages are covered on
 * arrival, with no list to remember to update.
 */
const UNSCOPED = `
/* Theme chrome — see the note in build-wp-css.js */
.elementor-location-header,
.elementor-location-footer { display: none !important; }
`;

out = '/* GENERATED by build-wp-css.js from site.css — do not edit by hand. */\n' +
      transform(css) + '\n' + UNSCOPED;

fs.writeFileSync(OUT, out);
console.log(`${OUT}  ${out.length}b  (from ${css.length}b)`);
