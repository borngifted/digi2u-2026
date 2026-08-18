/* Digi2U 2026 — page bootstrap for impact.
   Extracted from inline <script> so WordPress's wpautop filter cannot inject
   <p> tags into it. Everything runs inside one closure: the bootstrap renders
   the page immediately, and __D2U_INIT is invoked by site.js once D2U exists. */
(function () {
  'use strict';

  D2URender.giving('outputs', D2U_OUTPUTS);
  D2URender.metrics('cohorts', D2U_COHORTS);
  D2URender.need('dashNeed', D2U_INDUSTRY);
  D2URender.metrics('dashOurs', D2U_IMPACT);
  D2URender.stories('stories', D2U_STORIES);
  var ih = document.getElementById('impactHero');
  ih.setAttribute('data-video',  D2U_VIDEOS.studio.src);
  ih.setAttribute('data-poster', D2U_VIDEOS.studio.poster);
  ih.setAttribute('data-label',  D2U_VIDEOS.studio.label);

  D2URender.gallery('fullGallery', D2U_GALLERY, { feature: true, filters: 'galFilters' });
  D2URender.logos('logoWall', D2U_LOGOS);

  D2URender.tiles('docGrid', D2U_DOCS, 'doc', { cta: 'More Info' });
  D2URender.tiles('partnerGrid', D2U_PARTNERS, 'partner', { cta: 'View Collaboration' });
  D2URender.events('eventGrid', D2U_EVENTS);
  D2URender.numbered('mediaKinds', [
    { n: '3',   title: 'Feature Documentaries', desc: 'Long-form films on gentrification, advocacy, and resilience.' },
    { n: '35',  title: 'Streamed Events',       desc: 'Multi-camera live broadcasts, music and culture festivals.' },
    { n: 'P',   title: 'Podcast & Streaming',   desc: 'Studio infrastructure powering our own broadcasts and shows.' },
    { n: 'BTS', title: 'Behind The Scenes',     desc: 'Inside our classrooms, studios, and production days.' }
  ]);
  document.getElementById('tripGrid').innerHTML = D2U_FIELD_TRIPS.map(function (t) {
    return '<div class="tile is-static reveal">' +
      '<div class="card-kicker">' + t.region + '</div>' +
      '<h3 class="h-card">' + t.items.join(' · ') + '</h3>' +
      '<p class="tile-desc">' + t.desc + '</p>' +
    '</div>';
  }).join('');

  window.__D2U_INIT = function () {
    D2U.register('doc', D2U_DOCS);
    D2U.register('partner', D2U_PARTNERS);
    D2U.register('event', D2U_EVENTS);
    D2U.register('photo', D2U_GALLERY);
  };
}());
