/* Digi2U 2026 — partners, sponsors, media, events, roles, testimonials.
   All copy carried over verbatim from the live digi2u.org pages. */

/* Descriptive facts about the organization. Outcome figures live in
   D2U_IMPACT (data-phase2.js) and are not duplicated here — the two must never
   disagree. Digi2U supplied 51 graduates / 8,200 teaching hours / 35 streamed
   events, which supersede the older 5,000-training-hours and 40+-events
   figures still on the live WordPress site. */
const D2U_STATS = [
  { n: '12', label: 'Learning Pathways' },
  { n: '3',  label: 'Certifications' },
  { n: '4',  label: 'Cities Served' },
  { n: '51', label: 'Graduates' }
];

const D2U_MEDIA_STATS = [
  { n: '3',      label: 'Documentaries' },
  { n: '35',     label: 'Streamed Events' },
  { n: '1,000+', label: 'Mobile Lab Hours' },
  { n: '8,200',  label: 'Teaching Hours' }
];

/* Theory of change — the spine funders look for. Built from existing site content. */
const D2U_THEORY = [
  { step: '01', title: 'Access',       desc: 'The equipment comes to the block. Makerspaces in Jersey City, Newark, and Atlanta, plus mobile labs for the neighborhoods without one.' },
  { step: '02', title: 'Training',     desc: 'Twelve tracks, taught by people who do the work for a living. You are in the room with a professional, not a video.' },
  { step: '03', title: 'Certification',desc: 'OSHA 30, ServSafe, FAA Part 107 — the credentials that get a résumé past the filter instead of into the pile.' },
  { step: '04', title: 'Career',       desc: 'You leave holding proof. A portfolio, a printed prototype, a finished film, a licence — something you can put in front of someone.' },
  { step: '05', title: 'Pay It Forward',desc: 'Mentorship, apprenticeship, volunteerism, sponsorship — everyone who\'s helped is asked to help next.' }
];

const D2U_PILLARS = [
  { n: '01', title: 'Mentorship',   desc: 'Somebody who has done the job, sitting next to somebody who wants it. That is the entire transaction.' },
  { n: '02', title: 'Apprenticeship',desc: 'Real productions, real deadlines, real consequences — classroom knowledge applied where it actually counts.' },
  { n: '03', title: 'Volunteerism', desc: 'Neighbours giving hours so a program can run. Most of them were on the other side of the table first.' },
  { n: '04', title: 'Sponsorship',  desc: 'Companies and foundations funding the curriculum, the equipment, and the people — so the learner is never the one billed.' }
];

const D2U_VALUES = [
  { n: '01', title: 'Community First',        desc: 'We build with the communities we serve, not for them. Local voices shape every program.' },
  { n: '02', title: 'Hands On Always',        desc: 'Real tools. Real projects. Real outcomes. Theory matters — but doing the work is how skills stick.' },
  { n: '03', title: 'Pay It Forward',         desc: 'Mentorship, apprenticeship, volunteerism, sponsorship — everyone who\'s helped is asked to help next.' },
  { n: '04', title: 'Excellence Without Ego', desc: 'High standards, low drama. We push for great work and treat each other with respect along the way.' }
];

const D2U_CITIES = [
  { city: 'Newark',      state: 'NJ' },
  { city: 'Jersey City', state: 'NJ' },
  { city: 'Atlanta',     state: 'GA' },
  { city: 'Houston',     state: 'TX' }
];

const D2U_PARTNERS = {
  'c-cherry': {
    icon: 'CC',
    name: 'C. Cherry Foundation',
    tag: 'Foundation Partner · Newark, NJ',
    short: 'A 501(c)(3) supporting Newark communities.',
    desc: 'The C. Cherry Foundation is a 501(c)(3) tax-exempt nonprofit organization dedicated to providing vital services to communities in Newark, New Jersey. Their mission focuses on supporting underserved populations through essential resources and community-driven initiatives.',
    collab: 'Digi2U proudly partnered with the C. Cherry Foundation in support of their community events and provided hands-on production training for students.',
    sections: [
      {
        title: 'Newark Christmas Wonderland',
        sub: '10K Giveaway · Christmas Community Event · 2023',
        body: 'Digi2U students transformed a community center gym into a Christmas Wonderland for families in Newark, NJ — using their production skill sets, under instructor supervision.',
        bullets: ['Christmas tree assembly', 'Sound and PA equipment setup', 'Video recording and stage setup', 'Video screen setup, decorations, and gift distribution']
      },
      {
        title: 'Haunted 51 Police Precinct',
        sub: 'Halloween Community Event · From police station to haunted house',
        body: 'Hands-on experience designing a full haunted house from beginning to end inside a police station conference room — under instructor supervision.',
        bullets: ['Décor and room setup', 'Sound design and video effects display wall', 'Floating monitor installation with special effects and theatrical lighting']
      }
    ]
  },
  'art-4-change': {
    icon: 'A4C',
    name: 'Art 4 Change',
    tag: 'Cultural Partner · Live Production',
    short: 'A platform for emerging artists.',
    desc: 'Digi2U partnered with Art 4 Change to create The Spin-Off Open Deck — a hands-on production training program paired with a live music showcase, providing students with real-world event production experience.',
    collab: 'A 45-week program featuring a fully produced DJ music showcase. Students gained practical skills across every aspect of live event production.',
    sections: [
      {
        title: 'Skills Developed',
        sub: 'The Spin-Off Open Deck · 45-Week Program',
        body: 'Students handled setup, operation, and breakdown for each event, applying classroom knowledge in a professional, real-world setting, all under instructor supervision.',
        bullets: ['Sound mixing and recording', 'Multi-camera video recording (4 cameras)', 'Streaming and live video switching', 'Theatrical and spot lighting', 'Stage rigging (setup and breakdown)', 'Safety and blocking']
      },
      {
        title: 'Production Specs',
        sub: 'Professional-grade equipment, student-operated',
        body: '',
        bullets: ['2,000 sq. ft. venue setup', '8×16 stage with state-of-the-art equipment', 'Bose F1 L1 Series sound system', 'Multiple Shure wireless microphone systems', 'Yamaha mixing main console', 'Sling Studio & Blackmagic streaming units', 'Sony HD video cameras', 'Interactive video and graphic display wall', 'Theatrical lighting and smoke machines', 'Serato DJ software and Pioneer SRT1000 DJ control unit']
      }
    ]
  }
};

const D2U_DOCS = {
  'wards-f': {
    icon: 'WF',
    title: 'The People’s Ward F',
    status: 'Release Summer 2025',
    credit: 'Produced by 26 Blocks',
    desc: 'From the streets to the council chamber — following Frank "Educational" Gilmore’s transformation into tireless advocate for his community.',
    body: 'A long-form documentary on community advocacy and resilience, produced through Digi2U’s partnership with 26 Blocks, with student crews working alongside the production team.'
  },
  'sarahs-daughters': {
    icon: 'SD',
    title: 'Sarah’s Daughters Dare to Care',
    status: 'Now on Tubi',
    credit: 'Produced by 26 Blocks',
    desc: 'A tribute to domestic violence survivors, told by survivors and the grass-roots organization that empowered them.',
    body: 'A tribute to domestic violence survivors, told by survivors and the grass-roots organization that empowered them. Available to stream now on Tubi.'
  },
  '26-blocks': {
    icon: '26',
    title: '26 Blocks Docuseries',
    status: 'Winter 2025/2026',
    credit: 'Produced by 26 Blocks',
    desc: 'A twenty-year docuseries scrutinizing gentrification of Jersey City through the experiences of community construction groups.',
    body: '26 Blocks Doc is a documentary series that delves into the realities of gentrification and its effects on African American communities. Through in-depth storytelling, interviews, and historical context, it highlights the voices of community leaders, developers, and residents fighting to reclaim their neighborhoods amidst ongoing change. Digi2U provides the technical expertise, infrastructure, and collaborative framework — plus training in media production and documentary filmmaking through our makerspaces.'
  }
};

const D2U_EVENTS = [
  {
    tag: 'New Jersey · Documentary Screening',
    title: '"Fighting For Ward F" Documentary Screening',
    desc: 'Film screening and panel discussion at the historic Bethune Center on Martin Luther King Drive in Jersey City.',
    meta: [['Date', 'Friday, February 27, 2026'], ['Time', '6:00 PM sharp – 8:45 PM'], ['Location', 'Bethune Center, 140 Martin Luther King Drive, Jersey City, NJ']]
  },
  {
    tag: 'Live Webinar Class',
    title: '3D Printing & Prototyping Webinar',
    desc: 'Pre-registration required — only 50 seats available, with a VIP gift giveaway for attendees.',
    meta: [['Date', 'TBA'], ['Time', '7:00 – 8:00 PM'], ['Seats', '50 available'], ['Format', 'Live · Online']]
  }
];

/* Industry events students are sent to — from the Events page. */
const D2U_FIELD_TRIPS = [
  { region: 'New Jersey · New York · Los Angeles · Philadelphia, PA', items: ['Khemfest', 'New York Comic Con', 'AfroAnimation', 'Maker Faire'],
    desc: 'Art, animation, comic books, creative content development, animated films, and business networking.' },
  { region: 'New Jersey · Miami, FL · Atlanta, GA', items: ['Propelify', 'Maker Faire', 'Art Basel', 'BITCON', 'Investfest'],
    desc: 'Technology, entrepreneurship, fine art, blockchain, and investment — putting people in rooms with the leaders living their dreams.' }
];

const D2U_ROLES = {
  volunteer: {
    icon: 'V', title: 'Volunteer',
    desc: 'Lend your time at Digi2U community events, workshops, and live production days. Great for anyone wanting to give back — no prior experience required.',
    meta: [['Time', '2 to 8 hours per day'], ['Locations', 'New Jersey & Atlanta, Georgia'], ['Commitment', 'Ability to travel locally and long distance']]
  },
  internship: {
    icon: 'I', title: 'Internships',
    desc: 'Hands-on experience with our instructors, production team, and program coordinators. Apprentice in 3D, media, audio, drone, or any active program track.',
    meta: [['Time', '2 to 8 hours per day'], ['Locations', 'New Jersey & Atlanta, Georgia'], ['Commitment', 'Ability to travel locally and long distance']]
  },
  teacher: {
    icon: 'T', title: 'Teacher',
    desc: 'Instructors who can lead a program track or workshop. Bring your industry experience and help shape the next cohort of adult learners.',
    meta: [['Time', '2 to 8 hours per day'], ['Locations', 'New Jersey & Atlanta, Georgia'], ['Commitment', 'Ability to travel locally and long distance']]
  }
};

const D2U_ROLE_DUTIES = [
  'Assist with community events, workshops, and training sessions',
  'Support instructors and program coordinators',
  'Help set up and manage equipment for live productions and events',
  'Support community members and help facilitate program activities',
  'Provide general administrative or tech-related support as needed'
];

const D2U_TIERS = {
  community: {
    name: 'Community Sponsor', amount: '$2,500+', tag: 'Community',
    benefits: ['Logo placement on Digi2U sponsors page', 'Recognition in event communications', 'Quarterly impact updates', 'Tax-deductible donation receipt']
  },
  strategic: {
    name: 'Strategic Sponsor', amount: '$10,000+', tag: 'Strategic', featured: true,
    benefits: ['All Community benefits', 'Featured logo placement on home + event pages', 'Co-branded program or workshop', 'Speaking opportunity at a community event', 'Direct staff access for engagement planning']
  },
  founding: {
    name: 'Founding Sponsor', amount: '$25,000+', tag: 'Founding',
    benefits: ['All Strategic benefits', 'Premier branding across all Digi2U properties', 'Named program or studio space', 'Annual impact dinner with Digi2U leadership', 'Custom volunteer engagement for your team']
  }
};

const D2U_SPONSORS = ['Visual Hub', 'Wise'];

/* Testimonial slots. Real names from the live site; quote copy is intentionally
   withheld until Digi2U supplies verified testimony. Do not ship invented quotes. */
const D2U_TESTIMONIALS = [];

const D2U_ORG = {
  name: 'Digi2U',
  ein: '88-3213984',
  email: 'support@digi2u.org',
  phone: '+1 (201) 374-3553',
  address: '317 Pacific Avenue, Jersey City, NJ 07304'
};

/* ============================================================================
   EVENTS — added 2026-08
   D2U_UPDATES powers the "Latest Updates" feed on events.html.
   D2U_PAST_EVENTS powers past-events.html; each entry pulls its photographs
   from D2U_GALLERY by category, so adding a photo to the gallery adds it to
   the matching past event automatically. `cats: []` renders the entry with a
   "photography pending" note instead of an empty grid.
   ========================================================================== */

const D2U_UPDATES = [
  {
    when: 'August 2026',
    title: 'Girls in Art & Tech cohort wraps its 3D design sessions',
    desc: 'Twelve participants completed Tinkercad and 3D printing sessions, with painting and DJ production tracks running alongside.'
  },
  {
    when: 'Spring 2026',
    title: 'Four sites now running — Newark, Jersey City, Riverdale and Union City',
    desc: 'King Road (Riverdale, GA), Morris Canal (Jersey City), Digi2U Mobile (Newark, two 18ft trailers) and Studio Way (Union City, GA) are all operating.'
  },
  {
    when: 'February 2026',
    title: '"Fighting For Ward F" screened at the Bethune Center',
    desc: 'Film screening and panel discussion on Martin Luther King Drive in Jersey City, with the 26 Blocks documentary team.'
  }
];

const D2U_PAST_EVENTS = [
  {
    title: 'Spin-Off Open Deck',
    when: 'Newark, NJ',
    desc: 'Community-produced live event with multi-camera coverage, lighting and full production run by Digi2U participants — part of the 200+ hours of community-produced events delivered to date.',
    cats: ['Live Production']
  },
  {
    title: 'Christmas Wonderland & The Haunted House',
    when: 'Jersey City, NJ · With the Cherry Foundation',
    desc: 'A former precinct turned into a community haunted house, and a Christmas Wonderland built end to end by students — design, fabrication, staging and lighting.',
    cats: ['Community']
  },
  {
    title: '3D Design & Prototyping Cohorts',
    when: 'Newark · Jersey City · Morris Canal',
    desc: 'The 3D bootcamp and youth 3D tracks — 25 bootcamp graduates and 12 youth participants. Printers, benches, and finished parts in hand.',
    cats: ['3D Design']
  },
  {
    title: 'Girls in Art & Tech',
    when: '2026 Cohort',
    desc: 'Tinkercad and 3D printing sessions, painting classes and DJ production, run as a dedicated cohort.',
    cats: ['Girls in Art & Tech']
  },
  {
    title: 'NJIT Makerspace',
    when: 'Newark, NJ · Field Trip',
    desc: 'Participants inside the NJIT makerspace — one of the field trips that puts people alongside working engineers and fabricators.',
    cats: ['Makerspace']
  },
  {
    title: 'Training Sessions & CTAP',
    when: '317 Pacific Avenue, Jersey City',
    desc: 'Day-to-day training at the Jersey City studio and the CTAP programme, indoors and out.',
    cats: ['Training']
  },
  {
    title: 'Studio & Broadcast Sessions',
    when: 'Audio & Media Production',
    desc: 'Broadcast booth, mixing and multi-camera work — the audio production and film tracks in session.',
    cats: ['Audio & DJ', 'Media Production']
  },
  {
    title: '"Fighting For Ward F" Screening',
    when: 'Friday, 27 February 2026 · Jersey City',
    desc: 'Film screening and panel discussion at the historic Bethune Center, 140 Martin Luther King Drive, held with the 26 Blocks documentary team.',
    cats: []
  }
];
