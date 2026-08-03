# Digi2U 2026 — Condensed Site Demo

A simplified, grant-grade rebuild of [digi2u.org](https://digi2u.org): **~20 pages condensed to 5**,
with every piece of detail content preserved and moved into lightboxes.

**Live demo:** https://borngifted.github.io/digi2u-2026/

---

## Phase 2 — narrative redesign

The homepage now runs as a story rather than a list:

`01 The Opportunity → 02 How Digi2U Responds → 03 Learning Pathways → 04 Inside A Session →
05 Impact → 06 Stories → 07 Our Story → 08 Community → 09 Your Support`

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
- **Testimonials.** Visibly pending frames — hatched background, "Awaiting verified story" —
  expecting photo, name, program, and quote. Add entries to `D2U_STORIES` and they render.

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

Impact metrics carry over from the live site unchanged: 2,000+ community hours, 12 programs,
3 certifications, 4 cities, 3 documentaries, 40+ streamed events, 1,000+ mobile lab hours,
5,000 training hours.

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

## Known limitation

The Elementor template JSON is a separate deliverable and is version-sensitive. Expect an imported
build to need a spacing and font-assignment pass on the live WordPress install. **This static demo,
not the JSON, is the authoritative design.**

## Contact

Digi2U · 501(c)(3) · EIN 88-3213984
317 Pacific Avenue, Jersey City, NJ 07304
support@digi2u.org · +1 (201) 374-3553
