# Digi2U 2026 — Condensed Site Demo

A simplified, grant-grade rebuild of [digi2u.org](https://digi2u.org): **~20 pages condensed to 5**,
with every piece of detail content preserved and moved into lightboxes.

**Live demo:** https://borngifted.github.io/digi2u-2026/

---

## Phase 2 — narrative redesign

The homepage now runs as a story rather than a list:

`01 The Opportunity → 02 Our Mission → 03 Featured Programs → 04 Hands On Always →
05 Impact → 06 Voices Of Impact → 07 Mission & Vision → 08 Community → 09 Join The Mission`

Key changes:

- **Video heroes.** Cut from Digi2U's own studio footage, tone-mapped from HLG/BT.2020 10-bit
  HEVC to Rec.709 H.264, audio stripped, 1280×720, 0.9–3 MB. The two clips previously hosted on
  GitHub Pages are phone-shot **portrait** (720×1280, 540×960) and crop badly in a wide hero, so
  they are kept in `D2U_VIDEOS_PORTRAIT` for vertical use only.
- **Impact Dashboard.** Two halves that never mix: *The Need* (national workforce data, every
  figure carrying a named source) and *Our Impact* (Digi2U's own numbers). On dark sections the
  national data deliberately recedes so Digi2U's figures carry the emphasis.
- **Program categories.** The twelve tracks and three certifications are grouped into four
  editable pathways in `D2U_CATEGORIES`. Renaming a category or moving a program between
  categories touches one array and nothing else.
- **Giving impact cards.** What a gift does, not how much is wanted. `amount` is null until
  Digi2U confirms figures; the card simply omits the price line.
- **Testimonials.** No placeholder cards. With `D2U_STORIES` empty the Stories section removes
  itself from the page entirely — nothing advertises that testimony is missing, and the chapter
  numbers renumber themselves so there is no gap in the sequence. Add entries with
  `{ img, name, program, quote }` and the section reappears.

### Pitch-deck photography (October 2024)

Twelve assets from `Pitch Deck 3/` optimised into `assets/deck/` — ten photographs resized to
1600px and re-encoded as WebP (8–42 MB originals down to 94–469 KB, 2.9 MB total), plus two new
partner marks.

Placement is editorial rather than a dump: each page gets one **full-bleed band** — a single large
photograph with a short line of original Digi2U copy — and all ten join the filterable gallery
(now 50 images across 8 categories).

| Page | Band photograph |
|---|---|
| Home | The studio floor — printers, benches, mural wall |
| Mission | Audio mixing session |
| Programs | Prototyping at the workstation |
| Impact | Multi-camera coverage of the Spin-Off Open Deck |
| Get Involved | Digi2U gear |

Impact also gains a two-up production pair (on location / post-production) and the 26 Blocks
brand mark beside its section heading. New logos on the wall: **26 Blocks** and **NU Digi.Tech**.
Nu Media Corp and Sarah's Daughters were already present as identical assets and were not
duplicated.

One caption needs confirmation: `Justice_Khemfest_IMG_6380.png` shows a Best Student Film trophy,
which does not match its filename. It is captioned neutrally as "Student film award" pending
correct attribution.

### Rotation-corrected images

Four photographs in the digi2u.org media library are stored 90° out of true — portrait content
written into a 1919×1080 landscape frame with no orientation flag, so every browser renders them
sideways:

- `d2u-ctap-training-1` — the Business & Enterprise category card ("Grow your brand") and gallery
- `d2u-3d-morris-canal-2` — gallery
- `d2u-audio-mixing-1` — gallery
- `d2u-audio-mixing-3` — gallery

Corrected copies (rotated clockwise, re-encoded WebP) live in `assets/fix/` and the demo points at
those. **The originals on digi2u.org are still sideways and need fixing at the source** — anything
else on the live WordPress site that uses them is still affected.

The two `audio-mixing` frames are near-identical once upright, and show a broadcast booth
(headphones, boom mic, control surface) rather than a mixing console — recategorised to
Audio & DJ with captions to match. Consider dropping one as a near-duplicate.

### Wording

All copy matches the live digi2u.org wording. Headlines, ledes, section kickers, values,
and calls to action are taken from the existing site — "STEAM skills. Real-world careers.",
"Learn by doing. Earn by building.", "Twelve tracks. One goal: marketable skills.",
"Bridging the digital divide.", "Empowering communities through innovation.",
"Ready to put skills into the hands of adults ready to build what's next?", and so on.

Sections that have no counterpart on the live site (the industry-data block, the impact
dashboard, the giving cards, the pathway categories) are written from existing Digi2U phrasing
rather than invented voice.

### Data honesty in Phase 2

Industry statistics and Digi2U's achievements are structurally separated: `D2U_INDUSTRY` and
`D2U_IMPACT` are different arrays rendered by different functions into differently-styled,
separately-labelled containers. No industry figure can appear as a Digi2U result by accident.

Sources used:

- [National Skills Coalition & Federal Reserve Bank of Atlanta, *Closing the Digital Skill Divide*, 2023](https://nationalskillscoalition.org/resource/publications/closing-the-digital-skill-divide/) — 92% of jobs require digital skills; 1 in 3 workers lack them; +23% / ~$8,000 pay premium.
- [U.S. Bureau of Labor Statistics, Occupational Outlook Handbook](https://www.bls.gov/ooh/computer-and-information-technology/) — 317,700 projected annual openings in computer and IT occupations, 2024–2034.

Digi2U's own figures — **51 graduates, 8,200 teaching hours, 35 streamed events** — were supplied
by Digi2U and supersede the older *5,000 training hours* and *40+ streamed events* still shown on
the live WordPress site. `D2U_STATS` and `D2U_MEDIA_STATS` were updated to match so the demo never
contradicts itself.

## What this is

The current Digi2U site spreads its content across roughly twenty pages — including twelve separate
program pages that share a single template. This demo collapses that into five pages a funder can
read end to end, without deleting anything.

| Page | Absorbs | Lightboxes |
|---|---|---|
| **Home** | Homepage, section teasers | 1 |
| **Mission** | About, Team, Values, Master Plan, Theory of Change | 8 team bios |
| **Programs** | Programs index, 12 track pages, Certifications | 12 tracks + 3 certs |
| **Impact** | Media, 26 Blocks, Events, Testimonies, Community Partners, Blog | 3 films, 2 partners, 2 events |
| **Get Involved** | Donate, Job Opportunities, Sponsors, Contact | 3 roles, 3 sponsor tiers |

Navigation is five items plus a Donate button. No dropdowns.

## The grant case

Three additions make this read as a funder-facing site rather than a brochure. All three are built
from content that already exists on digi2u.org — no invented data.

1. **Theory of change** — `Access → Training → Certification → Career → Pay It Forward`.
   Every program plugs into a stage; the four pillars (Mentorship, Apprenticeship, Volunteerism,
   Sponsorship) map onto it.
2. **Direction** — where the work is headed: four cities, mobile media labs, the Studio Way
   flagship campus.
3. **Transparency strip** — 501(c)(3) status, EIN 88-3213984, and deductibility surfaced on every
   page instead of buried in the footer.

## Data honesty

Digi2U's outcome figures are the ones Digi2U supplied — 51 graduates, 8,200 teaching hours,
35 streamed events — and they supersede the older *5,000 training hours* and *40+ streamed events*
still shown on the live WordPress site. Descriptive facts (12 pathways, 3 certifications,
4 cities, 3 documentaries, 1,000+ mobile lab hours) carry over unchanged.

Two deliberate departures from the live site:

- **The GoFundMe progress bar is gone.** It currently reads `$0 raised · 1% Funded`, which reads as
  failure to a program officer. The ask remains; the bar does not.
- **Testimonial quotes are withheld.** The live Testimonies page attaches placeholder quote text to
  five real people's names. Rather than ship invented testimony, the section shows a submission
  prompt. Send verified quotes to support@digi2u.org and they publish.

## Elementor Pro mapping

Built so it can be rebuilt in Elementor Pro using native widgets only.

| Element on this demo | Elementor widget |
|---|---|
| Section / column | Container (flexbox) |
| Headings, body copy | Heading, Text Editor |
| Stat bar | Counter ×4 |
| Program / cert grid | Image Box ×15 → popup links |
| Team grid | Image Box ×8 → bio popups |
| Documentaries, partners, roles | Icon Box |
| Sponsorship tiers | Price Table ×3 |
| Inquiry form | Form (Pro) |
| Every lightbox | Popup template (Pro) |

Design tokens in `assets/site.css` map 1:1 to the Elementor Global Kit:

```
Primary   #FF0000    Display font   Archivo   600/700/800/900
Secondary #0A0A0A    Body font      Inter     400/500/600/700
Text      #1A1A1A
Accent    #6E6E73
```

Lightboxes open via `data-lb="type:key"`, which is the direct analogue of Elementor's
`#elementor-action:action=popup:open&settings=<id>`. Popups are scoped per page so no single page
carries all ~40.

## Structure

```
index.html          Home
mission.html        Mission · Theory of Change · Team
programs.html       12 tracks + 3 certifications
impact.html         Films · Partners · Events · Field trips
get-involved.html   Donate · Sponsor · Volunteer · Contact
assets/
  site.css          Design system + lightbox styles
  site.js           Nav, scroll reveal, lightbox engine
  render.js         Grid renderers (one per Elementor widget type)
  data-core.js      Programs, certifications, team — extracted from the live site
  data-extra.js     Partners, sponsors, films, events, roles, tiers, theory of change
```

All content lives in the two data files. Editing a program or bio means editing one object, not one
page.

## Verified

Checked in Chrome against a local server:

- All five pages render; 15 program/cert images, 8 team images resolve (HTTP 200).
- Every lightbox type opens with correct content — program, bio, partner, film, event, role, tier.
- Focus is trapped while a lightbox is open; Esc and backdrop close it; body scroll locks.
- No console errors from site code.
- No horizontal overflow at 390px; nav collapses to a hamburger; grids stack to one column.

## Elementor Pro template kit

`elementor/` holds 28 importable templates generated from the same data files the demo runs on —
5 pages and 23 popups (15 program/certification, 8 team bios). Regenerate with
`node build-elementor.js`. Import instructions, the Global Kit values, the Custom CSS the HTML
widgets need, and the one manual wiring step are in `elementor/README.md`.

Validated structurally: 1,163 elements, zero duplicate IDs, only real Elementor widget types, and
all 85 unique asset URLs verified reachable.

## Known limitation

The Elementor template JSON is a separate deliverable and is version-sensitive. Expect an imported
build to need a spacing and font-assignment pass on the live WordPress install. **This static demo,
not the JSON, is the authoritative design.**

## Contact

Digi2U · 501(c)(3) · EIN 88-3213984
317 Pacific Avenue, Jersey City, NJ 07304
support@digi2u.org · +1 (201) 374-3553
