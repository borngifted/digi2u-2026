/* ==========================================================================
   Digi2U 2026 — locations, graduate breakdown, student outputs, founder
   Source: DIGI2U BUSINESS PLAN 2026 (Pitch Deck), authored by Pam Timpson,
   shared from Google Drive. Figures below are quoted from that document.
   Internal budget/grant-request figures from the same deck are deliberately
   NOT reproduced here — they are not public-facing.
   ========================================================================== */

/* Where the work actually happens. The poverty rates and HUBZone status are
   the strongest grant-eligibility evidence Digi2U has, and none of it was on
   the site. */
const D2U_SITES = [
  {
    name: 'Studio Way',
    role: 'Flagship Innovation Center',
    place: 'Union City, GA',
    body: 'The flagship campus, anchoring production training in Southwest Metro Atlanta.',
    stats: []
  },
  {
    name: 'King Road Innovation Center',
    role: 'Innovation Center',
    place: 'Riverdale, GA 30274 · Clayton County',
    body: 'A 2,000 sq. ft. facility in Southwest Metro Atlanta with classrooms, studio production suites, and incubation support for entrepreneurs, artists, and tech professionals — focused on podcasting, streaming, AI development, and digital media production.',
    stats: [['Size', '2,000 sq. ft.'], ['Designation', 'HUBZone'], ['Poverty rate', '14.6%']]
  },
  {
    name: 'Morris Canal',
    role: 'Makerspace',
    place: 'Jersey City, NJ 07304',
    body: 'A 1,000 sq. ft. space provided by the Morris Canal Community Development Corporation. Home of the 26 Blocks Project documentary series, plus training in media and 3D printing.',
    stats: [['Size', '1,000 sq. ft.'], ['Partner', 'Morris Canal CDC'], ['Poverty rate', '20.55%']]
  },
  {
    name: 'Digi2U Mobile',
    role: 'Mobile Media Unit',
    place: 'Greater Newark, NJ',
    body: 'Two 18 ft. trailers bringing media, 3D printing, and content creation training on the road — event production, immersive training, and expo exhibits, delivered directly to communities without a fixed site.',
    stats: [['Format', 'Two 18 ft. trailers'], ['Poverty rate', '24%']]
  }
];

/* Why these locations. Quoted from the business plan. */
const D2U_SITE_RATIONALE =
  'Digi2U locations sit in economically challenged Georgia HUBZones and New Jersey areas of hyper-gentrification and displacement — areas that qualify for opportunity zone grant awards. We did not pick easy ground. We picked the ground where the gap is widest.';

/* The 51 graduates, broken out. 6 + 12 + 8 + 25 = 51. */
const D2U_COHORTS = [
  { n: '6',  label: 'Adults in Media Intensive',  note: '2,500 hours' },
  { n: '12', label: 'Youth in 3D Printing',       note: '2,500 hours' },
  { n: '8',  label: 'Adults in Live Production',  note: '2,500 hours' },
  { n: '25', label: 'Adults in 3D Bootcamp',      note: '' }
];

/* What training actually produced — the proof a funder wants. */
const D2U_OUTPUTS = [
  { icon: '01', title: 'Commercial prototypes',
    desc: 'Dining room furniture, jewelry, labeling, automotive parts, and cosmetic packaging — the packaging work judged by L’Oréal.' },
  { icon: '02', title: '35 streamed events',
    desc: 'Live media productions run end to end by trainees, from A/V and staging through streaming and documentation.' },
  { icon: '03', title: 'Three documentaries',
    desc: 'Feature-length films on social issues, produced through the 26 Blocks partnership.' },
  { icon: '04', title: '200+ hours of community events',
    desc: 'Produced by trainees, showcasing local artists and tech talent — plus statues and trophies designed and fabricated for area events.' }
];

/* Founder story — fills the slot that was left empty on the site. */
const D2U_FOUNDER = {
  name: 'Pamela Timpson',
  role: 'Founder & Executive Director, Digi2U · President, Nu Media Corporation',
  img: 'https://digi2u.org/wp-content/uploads/2026/05/d2u-team-pamela-timpson.png',
  quote: 'Teaching tomorrow’s technology today.',
  story: 'An alumna of Rutgers University, Pamela studied under the late Dr. Clement Alexander Price, focusing on the history of urban and suburban economic relations — the long story of how neighborhoods gain and lose ground. That history is not academic to her; it is the ground Digi2U stands on. Her workforce programs include The Choice Is Mine and the Vocational Video Training Program, and through Nu Media Corporation she produced Work: The Struggle for Inclusion and the 26 Blocks series. Her leadership unites history, technology, and storytelling — turning creative education into pathways for economic revitalization.'
};

/* Team members documented in the business plan but missing from the site. */
const D2U_TEAM_EXTRA = [
  {
    "id": "peter-zielyk",
    "group": "leadership",
    "role": "Master Editor / Instructor",
    "name": "Peter Zielyk",
    "tagline": "Master Editor & Instructor · 26 Blocks / Digi2U",
    "img": "assets/team/d2u-team-peter-zielyk.webp",
    "bio": "An award-winning film and video editor, cameraperson, and producer bringing more than twenty years of storytelling to 26 Blocks and Digi2U. Peter oversees final editing of documentaries, training content, and contract projects, and coordinates creative teams across locations and platforms.",
    "experience": [
      {
        "role": "Master Editor & Instructor",
        "company": "26 Blocks / Digi2U",
        "dates": "Present",
        "desc": "Teaches professional editing workflows, guides collaborative production teams, and mentors the next generation of digital storytellers."
      },
      {
        "role": "Editor & Producer",
        "company": "Global brands and media leaders",
        "dates": "20+ years",
        "desc": "Work for META Platforms, IBM, Verizon/Yahoo!, SAP, Pfizer, CNN Films, National Geographic, and ESPN. His work on The Orange Chronicles earned an International Documentary nomination and Best International Documentary at the Garden State Film Festival."
      }
    ],
    "expertise": [
      "Documentary Editing",
      "AVID Certified",
      "Production Team Leadership",
      "Cinematography",
      "Post-Production Workflow"
    ],
    "links": []
  },
  {
    "id": "june-jones",
    "group": "leadership",
    "role": "Morris Canal CDC / Program Partner",
    "name": "June Jones",
    "tagline": "Director · Digi2U Morris Canal Makerspace, Jersey City",
    "img": "assets/team/d2u-team-june-jones.webp",
    "bio": "June leads the Digi2U Morris Canal Makerspace in Jersey City, guiding programs that merge innovation, community development, and hands-on learning — and coordinating partnerships with local organizations, schools, and residents.",
    "experience": [
      {
        "role": "Director",
        "company": "Digi2U Morris Canal Makerspace",
        "dates": "Present",
        "desc": "Transformed the Morris Canal site into a hub for 3D design, media production, fabrication, and digital storytelling. A lifelong advocate for community empowerment, she connects technology education to neighborhood revitalization."
      }
    ],
    "expertise": [
      "Community Development",
      "Program Coordination",
      "Partnership Building",
      "Civic Engagement"
    ],
    "links": []
  }
];

/* Partners named in the business plan but absent from the logo wall. */
const D2U_PARTNERS_EXTRA = [
  'KRS-One — Temple of Hip Hop',
  'Morris Canal Community Development Corporation',
  'Vocation Ventures'
];

/* ==========================================================================
   FOR FUNDERS — what a grantmaker screens for, in one place.
   Every item is verifiable and already documented elsewhere on this site.
   ========================================================================== */
const D2U_FUNDER = [
  { k: 'Tax status',      v: '501(c)(3) tax-exempt',        note: 'EIN 88-3213984 · all gifts tax-deductible' },
  { k: 'Eligibility',     v: 'HUBZone + Opportunity Zone',  note: 'Georgia HUBZones and New Jersey areas of hyper-gentrification' },
  { k: 'Communities',     v: '14.6% – 24% poverty',         note: 'Clayton County GA, Jersey City tract 47, Newark' },
  { k: 'Track record',    v: '51 graduates · 8,200 hours',  note: 'Four cohorts across media, 3D, and live production' },
  { k: 'Capacity',        v: '4 sites + mobile units',      note: 'Two 18 ft. trailers reaching communities without a fixed site' },
  { k: 'Governance',      v: 'Board + Steering Committee',  note: 'Conflict-of-interest policy and bylaws on file' }
];

/* Donor-facing reasons, written to the reader. */
const D2U_WHY_GIVE = [
  { icon: '01', title: 'Your money buys tools, not overhead theater',
    desc: 'Printers, cameras, consoles, exam fees, instructor hours. The things a learner touches. You can see every one of them in the photographs on this site.' },
  { icon: '02', title: 'You are funding a place, not a pilot',
    desc: 'Four sites and a mobile unit already running. Nothing here is a proposal waiting on your check to exist — it exists, and your gift makes it reach further.' },
  { icon: '03', title: 'The people you fund come back',
    desc: 'Graduates return as mentors and instructors. A gift made once keeps working, because the person it trained ends up teaching the next one.' },
  { icon: '04', title: 'You will know what happened',
    desc: 'We publish only our own numbers, we mark the ones we are still building reporting for, and we do not dress up national statistics as our results.' }
];
