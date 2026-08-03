/* ==========================================================================
   Digi2U 2026 — Phase 2 configuration
   Everything here is meant to be edited without touching markup.

   HARD RULE, enforced by the layout: industry statistics and Digi2U's own
   numbers never share a container. D2U_INDUSTRY is national workforce data
   with a named source on every figure. D2U_IMPACT is Digi2U only.
   ========================================================================== */

/* --------------------------------------------------------------------------
   THE NEED — national workforce data. NOT Digi2U achievements.
   Every entry must carry a real, checkable source. Do not add a figure here
   without one.
   -------------------------------------------------------------------------- */
const D2U_INDUSTRY = [
  {
    n: '92%',
    label: 'of jobs now require digital skills',
    source: 'National Skills Coalition & Federal Reserve Bank of Atlanta, 2023',
    href: 'https://nationalskillscoalition.org/resource/publications/closing-the-digital-skill-divide/'
  },
  {
    n: '1 in 3',
    label: 'workers lack the foundational digital skills those jobs require',
    source: 'National Skills Coalition, 2023',
    href: 'https://nationalskillscoalition.org/resource/publications/closing-the-digital-skill-divide/'
  },
  {
    n: '317,700',
    label: 'projected annual openings in computer and IT occupations, 2024–2034',
    source: 'U.S. Bureau of Labor Statistics',
    href: 'https://www.bls.gov/ooh/computer-and-information-technology/'
  },
  {
    n: '+$8,000',
    label: 'average annual pay gain for jobs needing at least one digital skill — about 23% more',
    source: 'National Skills Coalition, 2023',
    href: 'https://nationalskillscoalition.org/resource/publications/closing-the-digital-skill-divide/'
  }
];

/* --------------------------------------------------------------------------
   OUR IMPACT — Digi2U's own numbers only.
   `pending: true` renders a visibly empty card labelled "Tracking" so the
   dashboard can grow without anyone inventing a figure to fill a hole.
   -------------------------------------------------------------------------- */
const D2U_IMPACT = [
  { n: '51',    label: 'Graduates',           note: 'Adults who completed a full program track' },
  { n: '8,200', label: 'Teaching Hours',      note: 'Delivered by Digi2U instructors' },
  { n: '35',    label: 'Streamed Events',     note: 'Produced with student crews' },
  { label: 'Certifications Earned', pending: true },
  { label: 'Job Placements',        pending: true },
  { label: 'Businesses Started',    pending: true },
  { label: 'Community Partners',    pending: true },
  { label: 'Volunteer Hours',       pending: true }
];

/* --------------------------------------------------------------------------
   PROGRAM CATEGORIES
   Category titles are placeholders pending final naming. Edit `title`,
   `kicker`, and `desc` freely — `programs` holds the keys from D2U_PROGRAMS
   and D2U_CERTS, so nothing else needs to change when a category is renamed
   or a program moves between categories.
   -------------------------------------------------------------------------- */
const D2U_CATEGORIES = [
  {
    id: 'design-fabrication',
    title: 'Design & Fabrication',
    kicker: 'Bring creative ideas to life',
    desc: 'Design software, prototyping, and production processes used in industries like manufacturing, engineering, and product design.',
    img: 'https://digi2u.org/wp-content/uploads/2026/05/d2u-3d-jellybox-build.webp',
    programs: ['3d-design', 'art-design', 'fashion']
  },
  {
    id: 'media-production',
    title: 'Media & Production',
    kicker: 'Tell stories through media',
    desc: 'Hands-on training in technology, media, and creative industries — cameras, consoles, microphones, and live event staging.',
    img: 'https://digi2u.org/wp-content/uploads/2026/05/d2u-spinoff-newark-07.webp',
    programs: ['film-tv', 'podcast', 'photography', 'audio', 'staging']
  },
  {
    id: 'business-enterprise',
    title: 'Business & Enterprise',
    kicker: 'Grow your brand',
    desc: 'Preparing adult learners for in-demand businesses — brand strategy, marketing, and the grant writing that funds community work.',
    /* Purpose-built 16:9 crop: the corrected image is portrait (1080x1920), and
       a plain center-crop into the card's 16:9 frame cuts the subject's head
       off. This crop keeps the face. */
    img: 'assets/fix/d2u-ctap-training-1-card.webp',
    programs: ['marketing', 'grants']
  },
  {
    id: 'credentials-careers',
    title: 'Credentials & Careers',
    kicker: 'Industry credentials. Real job readiness.',
    desc: 'Earn nationally recognized certifications that employers look for — OSHA 30, ServSafe, and FAA Part 107, delivered hands-on by Digi2U instructors.',
    img: 'https://digi2u.org/wp-content/uploads/2026/05/d2u-njit-makerspace-1.webp',
    programs: ['drone', 'wellness', 'faa-drone', 'osha-30', 'food-safety']
  }
];

/* --------------------------------------------------------------------------
   DONATION IMPACT — what a gift does, not how much we want.
   Set `amount` to a string (e.g. '$500') once figures are confirmed; leave
   null and the card simply omits the price line.
   -------------------------------------------------------------------------- */
const D2U_GIVING = [
  {
    icon: '01', title: 'Sponsor a learner', amount: null,
    desc: 'Puts skills into the hands of adults ready to build what\'s next — curriculum, tools, space, and the people who make it all work.'
  },
  {
    icon: '02', title: 'Support certifications', amount: null,
    desc: 'Helps adult learners earn nationally recognized certifications that employers look for — OSHA 30, ServSafe, and FAA Part 107.'
  },
  {
    icon: '03', title: 'Fund classroom technology', amount: null,
    desc: 'Every dollar funds curriculum, equipment, and the people who make it all work — the tools that make hands-on training possible.'
  },
  {
    icon: '04', title: 'Expand community access', amount: null,
    desc: 'Expands access to technology, education, and creative opportunities across NJ, ATL, Newark, and Houston.'
  }
];

/* --------------------------------------------------------------------------
   OUR STORY — edit freely. `founder` is intentionally left as a prompt until
   Digi2U supplies the real founding account.
   -------------------------------------------------------------------------- */
const D2U_STORY = {
  lead: 'Empowering communities through innovation.',
  body: 'Digi2U is dedicated to providing hands-on training in technology, media, and creative industries to empower individuals and communities. Through innovative programs, we equip students with the skills, tools, and resources needed to succeed in the digital age — fostering growth, creativity, and career advancement.',
  pillars: [
    { icon: 'M', title: 'Mission',   desc: 'To equip our communities with the tools, training, and opportunities to succeed.' },
    { icon: 'V', title: 'Vision',    desc: 'A world where all individuals, regardless of background, have access to the resources needed to thrive in a technology-driven society.' },
    { icon: 'C', title: 'Community', desc: 'We build with the communities we serve, not for them. Local voices shape every program.' },
    { icon: 'P', title: 'Purpose',   desc: 'To unlock well-paid tech jobs and in-demand businesses for adult learners, creatives, and entrepreneurs.' }
  ],
  founder: null   // ← Replace with { name, role, img, quote, story } when supplied.
};

/* --------------------------------------------------------------------------
   TESTIMONIALS
   Layout expects: img, name, program, quote.
   The array is intentionally EMPTY. The live Digi2U site currently shows
   placeholder quote text attached to five real people's names; that is not
   reproduced here. Add verified entries and the section renders automatically.
   `D2U_TESTIMONIAL_SLOTS` controls how many "pending" frames are shown.
   -------------------------------------------------------------------------- */
const D2U_STORIES = [
  // { img: '…', name: 'Full Name', program: '3D Design & Fabrication', quote: '…' }
];
const D2U_TESTIMONIAL_SLOTS = 3;
