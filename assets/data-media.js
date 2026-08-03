/* ==========================================================================
   Digi2U 2026 — video + photography
   Every asset below is a real Digi2U file already hosted on digi2u.org or
   borngifted.github.io. Captions describe the program or event the file comes
   from; they do not claim visual detail beyond that.
   ========================================================================== */

const D2U_CDN = 'https://digi2u.org/wp-content/uploads/2026/05/';
const D2U_DECK = 'assets/deck/';
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
  { src: D2U_CDN + 'd2u-26training-outdoors-2.webp', cat: 'Training',         cap: 'Field production training' },

  /* Pitch-deck photography, October 2024. Higher-resolution stills of the
     studio, the Spin-Off live showcase, and production work on location. */
  { src: D2U_DECK + 'd2u-deck-3d-prototyping.webp', cat: '3D Design',        cap: 'Prototyping at the workstation, filament racked behind' },
  { src: D2U_DECK + 'd2u-deck-barat-studio.webp',   cat: 'Makerspace',       cap: 'The studio floor — printers, benches, and the mural wall' },
  { src: D2U_DECK + 'd2u-deck-barat-edit.webp',     cat: 'Media Production', cap: 'Editing and post-production station' },
  { src: D2U_DECK + 'd2u-deck-videography.webp',    cat: 'Media Production', cap: 'On location with a Digi2U camera operator' },
  { src: D2U_DECK + 'd2u-deck-music-mixing.webp',   cat: 'Audio & DJ',       cap: 'Mixing and mastering session' },
  { src: D2U_DECK + 'd2u-deck-spinoff-panel.webp',  cat: 'Live Production',  cap: 'Multi-camera coverage of the Spin-Off Open Deck' },
  { src: D2U_DECK + 'd2u-deck-spinoff-wall.webp',   cat: 'Live Production',  cap: 'The interactive video and graphic display wall' },
  { src: D2U_DECK + 'd2u-deck-spinoff-lights.webp', cat: 'Live Production',  cap: 'Theatrical lighting and projection on the floor' },
  { src: D2U_DECK + 'd2u-deck-gear.webp',           cat: 'Community',        cap: 'Digi2U gear' },
  /* NOTE: this file is named "Justice_Khemfest" but shows a Best Student Film
     trophy. Caption kept neutral — confirm the correct attribution before use. */
  { src: D2U_DECK + 'd2u-deck-award.webp',          cat: 'Media Production', cap: 'Student film award' }
];

/* Partner and sponsor marks already in the Digi2U media library. */
const D2U_LOGOS = [
  { name: '26 Blocks',             src: D2U_DECK + 'd2u-logo-26blocks.png' },
  { name: 'C. Cherry Foundation',  src: D2U_CDN + 'd2u-logo-cherry-foundation.webp' },
  { name: 'Art 4 Change',          src: D2U_CDN + 'd2u-logo-art4change.webp' },
  { name: 'NU Digi.Tech',          src: D2U_DECK + 'd2u-logo-nu-digitech.png' },
  { name: 'NJIT',                  src: D2U_CDN + 'd2u-logo-njit.webp' },
  { name: 'Barat Foundation',      src: D2U_CDN + 'd2u-logo-barat.webp' },
  { name: 'Newark Public Library', src: D2U_CDN + 'd2u-logo-newark-public-library.webp' },
  { name: 'Nu Media',              src: D2U_CDN + 'd2u-logo-nu-media.webp' },
  { name: 'Wise Engineering',      src: D2U_CDN + 'd2u-logo-wise-engineering.webp' },
  { name: 'Better Butter',         src: D2U_CDN + 'd2u-logo-betterbutter.webp' }
];

/* Day-in-the-life strip. Copy assembled from the live digi2u.org wording. */
const D2U_MOMENTS = [
  { img: D2U_GIT_IMG + 'girls-in-tech-3d-sketching-01-rotated.jpg', when: '01', title: 'Hands-on training',
    desc: 'Hands-on training in technology, media, and creative industries — taught by industry professionals, educators, and creatives.' },
  { img: D2U_GIT_IMG + 'girls-in-tech-3d-tinkercad-01.jpg',         when: '02', title: 'Real-life projects',
    desc: 'Pairing instruction with real-life projects, so what is learned in the classroom is applied in a professional, real-world setting.' },
  { img: D2U_CDN + 'd2u-3d-jellybox-build.webp',                    when: '03', title: 'Finished products',
    desc: 'Adult learners leave with marketable skills, finished products, and portfolios — real tools, real projects, real outcomes.' },
  { img: D2U_CDN + 'd2u-spinoff-newark-07.webp',                    when: '04', title: 'Real career paths',
    desc: 'From 3D fabrication to live event staging, every program leaves adult learners with skills, portfolios, and real career paths.' }
];

/* Retained for reference only — not rendered on any page. The site uses the
   live digi2u.org wording throughout. */
const D2U_CHARTER = {
  lead: 'Access. Training. Opportunity.',
  body: 'Digi2U is working to empower communities through hands-on training in technology, media, and the creative industries.',
  points: []
};
