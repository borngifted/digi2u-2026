/* Digi2U 2026 — page bootstrap for programs.
   Extracted from inline <script> so WordPress's wpautop filter cannot inject
   <p> tags into it. Everything runs inside one closure: the bootstrap renders
   the page immediately, and __D2U_INIT is invoked by site.js once D2U exists. */
(function () {
  'use strict';

  var ph = document.getElementById('programsHero');
  ph.setAttribute('data-poster', D2U_GIT_IMG + 'girls-in-tech-3d-lab-wide.jpg');
  ph.setAttribute('data-label', 'A Digi2U cohort at work in the studio');

  D2URender.gallery('programGallery', D2U_GALLERY, { limit: 8, feature: true });

  D2URender.stats('statBar', D2U_STATS);
  D2URender.theory('theory', D2U_THEORY);
  D2URender.cards('programGrid', D2U_PROGRAMS, 'program');
  D2URender.cards('certGrid', D2U_CERTS, 'program', { cta: 'Certification Details' });

  window.__D2U_INIT = function () {
    var all = {};
    Object.keys(D2U_PROGRAMS).forEach(function (k) { all[k] = D2U_PROGRAMS[k]; });
    Object.keys(D2U_CERTS).forEach(function (k) { all[k] = D2U_CERTS[k]; });
    D2U.register('program', all);
    D2U.register('photo', D2U_GALLERY);
  };
}());
