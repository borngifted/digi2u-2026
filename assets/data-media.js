/* ==========================================================================
   Digi2U 2026 — video + photography
   Every asset below is a real Digi2U file already hosted on digi2u.org or
   borngifted.github.io. Captions describe the program or event the file comes
   from; they do not claim visual detail beyond that.
   ========================================================================== */

const D2U_CDN = 'https://digi2u.org/wp-content/uploads/2026/05/';
const D2U_GIT = 'https://borngifted.github.io/digi2u-review/assets/girls-in-tech/';
const D2U_GIT_IMG = 'https://digi2u.org/wp-content/uploads/2026/07/';

/* Hero footage. Cut from Digi2U's own studio recordings, tone-mapped from the
   original HLG/BT.2020 10-bit HEVC to Rec.709 H.264 so it plays everywhere,
   audio stripped, 1280x720, ~1–3 MB each.
   These are LANDSCAPE (16:9) — the two earlier clips on GitHub Pages are
   phone-shot portrait (720x1280 and 540x960) and crop badly in a wide hero, so
   they are kept below for portrait contexts only.
   Gated to wide screens at runtime; phones get the poster image. */
const D2U_VIDEOS = {
  mentorship: {
    src: 'assets/video/hero-mentorship.mp4',
    poster: 'assets/video/hero-mentorship.jpg',
    label: 'A Digi2U instructor working alongside an adult learner'
  },
  design: {
    src: 'assets/video/hero-3d-design.mp4',
    poster: 'assets/video/hero-3d-design.jpg',
    label: 'An adult learner modelling a design in the Digi2U studio'
  },
  studio: {
    src: 'assets/video/studio-wide.mp4',
    poster: 'assets/video/studio-wide.jpg',
    label: 'A working session in the Digi2U studio'
  }
};

/* Portrait phone footage — usable in a vertical frame, not a wide hero. */
const D2U_VIDEOS_PORTRAIT = {
  girlsInTech:   { src: D2U_GIT + 'girls-in-tech-3d-design.mp4',      poster: D2U_GIT_IMG + 'girls-in-tech-3d-lab-wide.jpg', label: 'Girls in Art & Tech — 3D design session' },
  printingPromo: { src: D2U_GIT + 'rico-rich-3d-printing-promo.mp4',  poster: D2U_CDN + 'd2u-3d-jellybox-build.webp',        label: '3D printing and prototyping at Digi2U' }
};

/* Activity photography, grouped by the program or event it came from. */
const D2U_GALLERY = [
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-lab-wide.jpg',            cat: 'Girls in Art & Tech', cap: 'The cohort at work in the Digi2U studio' },
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-instructor-help.jpg',     cat: 'Girls in Art & Tech', cap: 'Hands-on instruction, one seat at a time' },
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-mentor-session-01.jpg',   cat: 'Girls in Art & Tech', cap: '3D design mentor session' },
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-mentor-session-02.jpg',   cat: 'Girls in Art & Tech', cap: 'Exploring 3D models together' },
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-tinkercad-01.jpg',        cat: 'Girls in Art & Tech', cap: 'Modeling in Tinkercad' },
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-tinkercad-02.jpg',        cat: 'Girls in Art & Tech', cap: 'A digital design session' },
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-sketching-01-rotated.jpg',cat: 'Girls in Art & Tech', cap: 'Sketching a design before it gets built' },
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-sketching-02.jpg',        cat: 'Girls in Art & Tech', cap: 'Design planning' },
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-vase-model-01.jpg',       cat: 'Girls in Art & Tech', cap: 'Modeling a 3D vase' },
  { src: D2U_GIT_IMG + 'girls-in-tech-3d-vase-model-02.jpg',       cat: 'Girls in Art & Tech', cap: 'Refining the model' },
  { src: D2U_GIT_IMG + 'girls-in-tech-art-painting-01-rotated.jpg',cat: 'Girls in Art & Tech', cap: 'Painting class' },
  { src: D2U_GIT_IMG + 'girls-in-tech-art-painting-02-rotated.jpg',cat: 'Girls in Art & Tech', cap: 'At their easels' },
  { src: D2U_GIT_IMG + 'girls-in-tech-art-painting-03-rotated.jpg',cat: 'Girls in Art & Tech', cap: 'Color mixing' },
  { src: D2U_GIT_IMG + 'girls-in-tech-art-crafts.jpg',             cat: 'Girls in Art & Tech', cap: 'A hands-on craft build' },
  { src: D2U_GIT_IMG + 'girls-in-tech-audio-dj-01-rotated.jpg',    cat: 'Audio & DJ',          cap: 'DJ and audio production' },
  { src: D2U_GIT_IMG + 'girls-in-tech-audio-dj-02-rotated.jpg',    cat: 'Audio & DJ',          cap: 'A mixing session' },
  { src: D2U_GIT_IMG + 'girls-in-tech-audio-dj-03-rotated.jpg',    cat: 'Audio & DJ',          cap: 'Hands on the decks' },

  { src: D2U_CDN + 'd2u-3d-justice-1.webp',          cat: '3D Design',        cap: '3D fabrication training' },
  { src: D2U_CDN + 'd2u-3d-justice-3.webp',          cat: '3D Design',        cap: 'Prototyping session' },
  { src: D2U_CDN + 'd2u-3d-justice-09.webp',         cat: '3D Design',        cap: 'Build day' },
  { src: D2U_CDN + 'd2u-3d-jellybox-build.webp',     cat: '3D Design',        cap: 'Building a JellyBox printer from the frame up' },
  { src: D2U_CDN + 'd2u-newark-3d-1.webp',           cat: '3D Design',        cap: '3D program in Newark' },
  { src: D2U_CDN + 'd2u-newark-3d-6.webp',           cat: '3D Design',        cap: 'Newark cohort at the printers' },
  { src: D2U_CDN + 'd2u-3d-morris-canal-2.webp',     cat: '3D Design',        cap: 'Morris Canal community session' },

  { src: D2U_CDN + 'd2u-spinoff-newark-2.webp',      cat: 'Live Production',  cap: 'The Spin-Off Open Deck — live showcase' },
  { src: D2U_CDN + 'd2u-spinoff-newark-07.webp',     cat: 'Live Production',  cap: 'Students running the show' },
  { src: D2U_CDN + 'd2u-spinoff-newark-3.webp',      cat: 'Live Production',  cap: 'Multi-camera production, student crew' },
  { src: D2U_CDN + 'd2u-audio-mixing-1.webp',        cat: 'Live Production',  cap: 'On the mixing console' },
  { src: D2U_CDN + 'd2u-audio-mixing-3.webp',        cat: 'Live Production',  cap: 'Sound and recording' },

  { src: D2U_CDN + 'd2u-cherry-xmas-3.webp',         cat: 'Community',        cap: 'Newark Christmas Wonderland, with the C. Cherry Foundation' },
  { src: D2U_CDN + 'd2u-cherry-xmas-5.webp',         cat: 'Community',        cap: 'Families at the Christmas community event' },
  { src: D2U_CDN + 'd2u-cherry-xmas-08.webp',        cat: 'Community',        cap: 'Students built and ran the whole room' },
  { src: D2U_CDN + 'd2u-haunted-51-2.webp',          cat: 'Community',        cap: 'Haunted 51 — a police precinct turned haunted house' },
  { src: D2U_CDN + 'd2u-haunted-51-07.webp',         cat: 'Community',        cap: 'Set design, lighting, and effects by students' },

  { src: D2U_CDN + 'd2u-njit-makerspace-1.webp',     cat: 'Makerspace',       cap: 'In the NJIT makerspace' },
  { src: D2U_CDN + 'd2u-njit-makerspace-3.webp',     cat: 'Makerspace',       cap: 'Shop time' },
  { src: D2U_CDN + 'd2u-ctap-training-1.webp',       cat: 'Training',         cap: 'CTAP training intensive' },
  { src: D2U_CDN + 'd2u-training-pacific-2.webp',    cat: 'Training',         cap: 'Training at the Pacific Avenue studio' },
  { src: D2U_CDN + 'd2u-pacific-extra-01.webp',      cat: 'Training',         cap: 'A session in progress' },
  { src: D2U_CDN + 'd2u-26training-outdoors-2.webp', cat: 'Training',         cap: 'Field production training' }
];

/* Partner and sponsor marks already in the Digi2U media library. */
const D2U_LOGOS = [
  { name: 'C. Cherry Foundation',  src: D2U_CDN + 'd2u-logo-cherry-foundation.webp' },
  { name: 'Art 4 Change',          src: D2U_CDN + 'd2u-logo-art4change.webp' },
  { name: 'NJIT',                  src: D2U_CDN + 'd2u-logo-njit.webp' },
  { name: 'Barat Foundation',      src: D2U_CDN + 'd2u-logo-barat.webp' },
  { name: 'Newark Public Library', src: D2U_CDN + 'd2u-logo-newark-public-library.webp' },
  { name: 'Nu Media',              src: D2U_CDN + 'd2u-logo-nu-media.webp' },
  { name: 'Wise Engineering',      src: D2U_CDN + 'd2u-logo-wise-engineering.webp' },
  { name: 'Better Butter',         src: D2U_CDN + 'd2u-logo-betterbutter.webp' }
];

/* Candid "what a session actually looks like" moments for the day-in-the-life strip. */
const D2U_MOMENTS = [
  { img: D2U_GIT_IMG + 'girls-in-tech-3d-sketching-01-rotated.jpg', when: 'First',  title: 'You sketch it',   desc: 'Before anything gets printed or filmed, you draw it. Every track starts on paper with an instructor next to you.' },
  { img: D2U_GIT_IMG + 'girls-in-tech-3d-tinkercad-01.jpg',         when: 'Then',   title: 'You model it',    desc: 'You learn the same software the industry uses — and you learn it by making something you actually want to make.' },
  { img: D2U_CDN + 'd2u-3d-jellybox-build.webp',                    when: 'Next',   title: 'You build it',    desc: 'Hands on real equipment. In the 3D track you build the printer itself, then print on the machine you assembled.' },
  { img: D2U_CDN + 'd2u-spinoff-newark-07.webp',                    when: 'Finally', title: 'You run it',   desc: 'You work a live show, a real shoot, a community event. Not a simulation — an audience.' }
];

/* Voice reference: ASU / ASU Online — "Access is our mission", "Your momentum
   matters", and the charter's "measured not by whom we exclude, but by whom we
   include and how they succeed." Adults are the norm here, not the exception.
   Copy below is new writing in that register, not lifted from the live site. */
const D2U_CHARTER = {
  lead: 'Access is the mission.',
  body: 'Digi2U is measured not by who we turn away, but by who we bring in and how far they go. You do not need a degree, a portfolio, or prior experience to start here. You need to show up.',
  points: [
    { title: 'You already have momentum', desc: 'Everyone arrives with something — a trade, a hustle, years of work, a good eye. We build on that instead of asking you to start from zero.' },
    { title: 'Adults are the norm here',  desc: 'This is not a program for kids that adults are allowed into. It is built for working people, parents, and career changers from the ground up.' },
    { title: 'You leave with proof',      desc: 'A portfolio, a printed prototype, a finished film, a credential employers screen for. Something you can put in front of someone.' }
  ]
};
