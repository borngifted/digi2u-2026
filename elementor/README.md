# Digi2U — Elementor Pro Template Kit

28 importable templates generated from the same data the demo runs on.
Regenerate any time with `node build-elementor.js` from the repo root.

```
pages/    5 page templates
popups/   15 program/certification popups + 8 team bio popups
```

Requires **Elementor Pro** (Popup Builder, Form and Price Table widgets are Pro-only).

---

## 1. Set the Global Kit first

Do this before importing — every template references these values, and setting
them first means one place controls the whole site.

**Site Settings → Global Colors**

| Slot | Hex |
|---|---|
| Primary | `#FF0000` |
| Secondary | `#0A0A0A` |
| Text | `#1A1A1A` |
| Accent | `#6E6E73` |

Custom colors worth adding: `#D90000` (red dark), `#FFF4F4` (red tint),
`#FAFAF8` (off-white), `#F2F2EF` (light).

**Site Settings → Global Fonts**

| Slot | Family | Weights |
|---|---|---|
| Primary (headings) | Archivo | 600, 700, 800, 900 |
| Secondary (body) | Inter | 400, 500, 600, 700 |

**Site Settings → Layout** — Content Width `1240`, Widgets Space `0`.

---

## 2. Import

**Templates → Saved Templates → Import Templates**, then upload the `.json`
files. Order does not matter, but import popups first so they exist when you
wire the program cards up.

Pages import as *page* templates: create the page, edit with Elementor, then
**Add Template → My Templates** and insert.

---

## 3. Wire the popups (the one manual step)

Elementor assigns popup IDs at import time, so the links cannot be pre-set in
the JSON — there is no ID to point at until the popup exists on your install.

For each program card and team card:

1. Edit the card's link field.
2. Click the **Dynamic** icon → **Actions → Popup**.
3. Choose the matching popup and set **Action: Open Popup**.

15 program cards + 8 team cards = 23 links. Roughly ten minutes once.

Popups also need display conditions: **Publish → Conditions → Include →
Singular → the page it belongs to**. Scoping them per page keeps any single
page from loading all 23.

---

## 4. Custom CSS

Three list layouts use the HTML widget because no native widget expresses
them. Paste this into **Site Settings → Custom CSS**:

```css
.d2u-cat-list, .d2u-list, .d2u-chips { list-style: none; margin: 0; padding: 0; }
.d2u-cat-list li {
  padding: 14px 2px; border-bottom: 1px solid rgba(10,10,10,.06);
  font-size: 15px; font-weight: 600;
}
.d2u-list li {
  padding: 15px 0 15px 28px; border-bottom: 1px solid rgba(10,10,10,.06);
  position: relative; font-size: 15px; line-height: 1.6;
}
.d2u-list li::before {
  content: ''; position: absolute; left: 0; top: 22px;
  width: 12px; height: 2px; background: #FF0000;
}
.d2u-list li strong { font-family: Archivo, sans-serif; font-size: 16px; }
.d2u-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.d2u-chips li { background: #F2F2EF; padding: 7px 14px; border-radius: 100px; font-size: 14px; }
.d2u-exp-item { padding: 20px 0; border-bottom: 1px solid rgba(10,10,10,.06); }
.d2u-exp-item h4 { font-family: Archivo, sans-serif; font-size: 17px; margin: 0 0 4px; }
.d2u-exp-item .d2u-when {
  font-size: 12px; font-weight: 600; letter-spacing: 1.2px;
  text-transform: uppercase; color: #FF0000; margin-bottom: 10px;
}
.d2u-exp-item p { font-size: 15px; color: #6E6E73; margin: 0; line-height: 1.6; }
```

---

## 5. Images

Every image URL in the kit is absolute and verified reachable (85 unique URLs,
all returning 200 at time of generation). They point at two origins:

- `digi2u.org/wp-content/uploads/…` — already in your media library.
- `borngifted.github.io/digi2u-2026/assets/…` — the demo's own files: the video
  posters, the pitch-deck photography, and the four rotation-corrected images.

Upload that second group to the WP media library and swap the URLs, or change
`DEMO_ORIGIN` in `build-elementor.js` and regenerate. Leaving them pointed at
GitHub Pages works but makes the live site depend on this repo.

---

## What is *not* in the kit

- **Hero video backgrounds.** Set manually: Container → Background → Video,
  with the poster as Background Fallback and "Play on Mobile" off. Sources are
  in `assets/video/`.
- **The scroll-reveal animation.** Use Elementor's Motion Effects → Entrance
  Animation per container.
- **The gallery category filter.** Elementor's Gallery widget does this
  natively — rebuild it with the widget rather than importing 50 Image widgets.
- **Header and footer.** Build once with Theme Builder; the demo's nav is five
  links plus a Donate button.

---

## Honest limitation

Elementor's template JSON schema is version-sensitive and this kit could not be
import-tested from the environment that generated it. Every file is
structurally valid — 1,163 elements, no duplicate IDs, only real Elementor
widget types (`heading`, `text-editor`, `image`, `image-box`, `icon-box`,
`button`, `counter`, `price-table`, `form`, `divider`, `spacer`, `html`) — but
expect a pass for spacing and font assignment on your actual install.

**The static demo, not this JSON, is the authoritative design.** When the two
disagree, the demo is right.
