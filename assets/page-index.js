/* Digi2U 2026 — page bootstrap for index.
   Extracted from inline <script> so WordPress's wpautop filter cannot inject
   <p> tags into it. Everything runs inside one closure: the bootstrap renders
   the page immediately, and __D2U_INIT is invoked by site.js once D2U exists. */
(function () {
  'use strict';

  var hv = document.getElementById('heroVideo');
  hv.setAttribute('data-video',  D2U_VIDEOS.mentorship.src);
  hv.setAttribute('data-poster', D2U_VIDEOS.mentorship.poster);
  hv.setAttribute('data-label',  'A Digi2U instructor working alongside an adult learner');

  // Portrait promo — phone-shot 9:16, click to load.
  var promo = document.getElementById('promoVideo');
  promo.setAttribute('data-src',    D2U_VIDEOS_PORTRAIT.printingPromo.src);
  promo.setAttribute('data-poster', D2U_VIDEOS_PORTRAIT.printingPromo.poster);
  promo.setAttribute('data-label',  D2U_VIDEOS_PORTRAIT.printingPromo.label);

  var rv = document.getElementById('responseVideo');
  rv.setAttribute('data-video',  D2U_VIDEOS.design.src);
  rv.setAttribute('data-poster', D2U_VIDEOS.design.poster);
  rv.setAttribute('data-label',  'An adult learner modelling a design in the Digi2U studio');

  var allPrograms = {};
  Object.keys(D2U_PROGRAMS).forEach(function (k) { allPrograms[k] = D2U_PROGRAMS[k]; });
  Object.keys(D2U_CERTS).forEach(function (k) { allPrograms[k] = D2U_CERTS[k]; });

  D2URender.marquee('marquee', ['STEAM Training','3D Printing & Prototyping','Documentary Filmmaking','Media Production','Makerspace & Woodworking','Content Creation','Mobile Media Labs']);
  D2URender.need('needStats', D2U_INDUSTRY);
  D2URender.need('dashNeed', D2U_INDUSTRY);
  D2URender.metrics('dashOurs', D2U_IMPACT);
  D2URender.numbered('pillars', D2U_PILLARS);
  D2URender.categories('categories', D2U_CATEGORIES, allPrograms);
  D2URender.moments('moments', D2U_MOMENTS);
  D2URender.stories('stories', D2U_STORIES);
  D2URender.pillars('storyPillars', D2U_STORY.pillars);
  D2URender.gallery('homeGallery', D2U_GALLERY, { limit: 8, feature: true });
  D2URender.logos('logoWall', D2U_LOGOS);
  D2URender.giving('giving', D2U_GIVING);
  D2URender.giving('whyGive', D2U_WHY_GIVE);
  D2URender.funder('funder', D2U_FUNDER);
  document.getElementById('storyLead').innerHTML = D2U_STORY.lead;
  document.getElementById('storyBody').textContent = D2U_STORY.body;

  window.__D2U_INIT = function () {
    D2U.register('program', allPrograms);
    D2U.register('photo', D2U_GALLERY);
  };
}());
