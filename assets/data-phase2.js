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
    kicker: 'Make something that exists',
    desc: 'Model it on a screen, then hold it in your hand. Printing, prototyping, visual design, and garment construction — the same processes manufacturing and product design run on.',
    img: 'https://digi2u.org/wp-content/uploads/2026/05/d2u-3d-jellybox-build.webp',
    programs: ['3d-design', 'art-design', 'fashion']
  },
  {
    id: 'media-production',
    title: 'Media & Production',
    kicker: 'Get your name in the credits',
    desc: 'Cameras, consoles, microphones, rigging. The tracks that put you on a real crew, on a real shoot, with an audience waiting.',
    img: 'https://digi2u.org/wp-content/uploads/2026/05/d2u-spinoff-newark-07.webp',
    programs: ['film-tv', 'podcast', 'photography', 'audio', 'staging']
  },
  {
    id: 'business-enterprise',
    title: 'Business & Enterprise',
    kicker: 'Own the thing you build',
    desc: 'For people who would rather run it than work it — brand strategy, marketing, and the grant writing that keeps community work funded.',
    /* Purpose-built 16:9 crop: the corrected image is portrait (1080x1920), and
       a plain center-crop into the card's 16:9 frame cuts the subject's head
       off. This crop keeps the face. */
    img: D2U_FIX + 'd2u-ctap-training-1-card.webp',
    programs: ['marketing', 'grants']
  },
  {
    id: 'credentials-careers',
    title: 'Credentials & Careers',
    kicker: 'The line that gets you hired',
    desc: 'OSHA 30, ServSafe, FAA Part 107 — nationally recognized credentials employers screen for by name, taught hands-on and prepped until you pass.',
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
    desc: 'One adult, one full track, start to portfolio. Curriculum, materials, studio time, and the instructor hours that make it stick.'
  },
  {
    icon: '02', title: 'Support certifications', amount: null,
    desc: 'Exam fees and test prep for OSHA 30, ServSafe, or FAA Part 107 — the one line on a résumé that gets it read instead of filtered.'
  },
  {
    icon: '03', title: 'Fund classroom technology', amount: null,
    desc: 'Printers, cameras, consoles, workstations. Our learners train on real equipment because nobody gets hired for practicing on a simulator.'
  },
  {
    icon: '04', title: 'Expand community access', amount: null,
    desc: 'Keeps the mobile media labs on the road, reaching the blocks that do not have a Digi2U building on them yet.'
  }
];

/* --------------------------------------------------------------------------
   OUR STORY — edit freely. `founder` is intentionally left as a prompt until
   Digi2U supplies the real founding account.
   -------------------------------------------------------------------------- */
const D2U_STORY = {
  lead: 'Access was never about ability.<br>It was about who gets a key.',
  body: 'The equipment that turns a skill into a living — the printers, the cameras, the consoles, the software — sits behind a paywall, a campus gate, or a job you cannot get without already having the skill. Digi2U put that equipment in the neighborhood and opened the door. No degree, no portfolio, no entrance test. Adults walk in, and they walk out holding something they made.',
  pillars: [
    { icon: 'M', title: 'Mission',   desc: 'To equip our communities with the tools, training, and opportunities to succeed.' },
    { icon: 'V', title: 'Vision',    desc: 'A world where all individuals, regardless of background, have access to the resources needed to thrive in a technology-driven society.' },
    { icon: 'C', title: 'Community', desc: 'We build with the communities we serve, not for them. Local voices shape every program — and graduates come back to teach the next cohort.' },
    { icon: 'P', title: 'Purpose',   desc: 'So a community stops being the subject of somebody else\'s story and starts telling its own.' }
  ],
  founder: null   // ← Replace with { name, role, img, quote, story } when supplied.
};

/* --------------------------------------------------------------------------
   TESTIMONIALS
   Layout expects: img, name, program, quote.
   The array is intentionally EMPTY. The live Digi2U site currently shows
   placeholder quote text attached to five real people's names; that is not
   reproduced here. Add verified entries and the section renders automatically.
   With this array empty the entire Stories section is removed from the page —
   no placeholder cards, nothing announcing that testimony is missing.
   -------------------------------------------------------------------------- */
const D2U_STORIES = [
  // { img: '…', name: 'Full Name', program: '3D Design & Fabrication', quote: '…' }
];
