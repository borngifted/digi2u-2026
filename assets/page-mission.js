/* Digi2U 2026 — page bootstrap for mission.
   Extracted from inline <script> so WordPress's wpautop filter cannot inject
   <p> tags into it. Everything runs inside one closure: the bootstrap renders
   the page immediately, and __D2U_INIT is invoked by site.js once D2U exists. */
(function () {
  'use strict';

  var mh = document.getElementById('missionHero');
  mh.setAttribute('data-poster', D2U_CDN + 'd2u-newark-3d-1.webp');
  mh.setAttribute('data-label', 'Digi2U 3D program in Newark');

  var dv = document.getElementById('directionVideo');
  dv.setAttribute('data-video',  D2U_VIDEOS.design.src);
  dv.setAttribute('data-poster', D2U_VIDEOS.design.poster);
  dv.setAttribute('data-label',  D2U_VIDEOS.design.label);

  var missionPhotos = D2U_GALLERY.filter(function (p) {
    return ['Training', 'Makerspace', '3D Design'].indexOf(p.cat) > -1;
  });
  D2URender.gallery('missionGallery', missionPhotos, { limit: 8 });

  D2URender.founder('founder', D2U_FOUNDER);
  D2URender.sites('sites', D2U_SITES);
  document.getElementById('siteRationale').textContent = D2U_SITE_RATIONALE;
  D2URender.theory('theory', D2U_THEORY);
  D2URender.numbered('pillars', D2U_PILLARS);
  D2URender.numbered('values', D2U_VALUES);
  D2URender.people('team-grid', D2U_TEAM.concat(D2U_TEAM_EXTRA));
  document.getElementById('cities').innerHTML = D2U_CITIES.map(function (c) {
    return '<div class="tile is-static reveal"><div class="tile-icon">' + c.state + '</div><h3 class="h-card">' + c.city + '</h3></div>';
  }).join('');

  window.__D2U_INIT = function () {
    var fullTeam = D2U_TEAM.concat(D2U_TEAM_EXTRA);
    var teamById = {};
    fullTeam.forEach(function (p) { teamById[p.id] = p; });
    D2U.register('person', teamById);
    D2U.register('photo', missionPhotos);
  };
}());
