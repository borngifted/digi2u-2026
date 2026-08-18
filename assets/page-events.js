/* Digi2U 2026 — page bootstrap for events.
   Extracted from inline <script> so WordPress's wpautop filter cannot inject
   <p> tags into it. Everything runs inside one closure: the bootstrap renders
   the page immediately, and __D2U_INIT is invoked by site.js once D2U exists. */
(function () {
  'use strict';

  var eh = document.getElementById('eventsHero');
  eh.setAttribute('data-poster', D2U_CDN + 'd2u-spinoff-newark-2.webp');
  eh.setAttribute('data-label', 'A Digi2U community-produced live event in Newark');

  /* Latest updates — page-specific layout, reusing the shared tile components. */
  document.getElementById('updates').innerHTML = D2U_UPDATES.map(function (u) {
    return '<div class="tile is-static reveal">' +
      '<div class="card-kicker">' + u.when + '</div>' +
      '<h3 class="h-card">' + u.title + '</h3>' +
      '<p class="tile-desc">' + u.desc + '</p>' +
    '</div>';
  }).join('');

  /* Upcoming, straight from the live calendar (see sync-events.js). Where an
     event has been enriched with an official link and description, it gets the
     fuller treatment; the rest still show date and place. */
  document.getElementById('cal-upcoming').innerHTML = D2U_CAL_UPCOMING.map(function (e) {
    return '<div class="tile is-static reveal">' +
      (e.img ? '<img src="' + e.img + '" alt="' + e.title + ' event graphic" loading="lazy"' +
               ' style="width:100%;height:auto;margin-bottom:16px;border:1px solid rgba(10,10,10,.10)">' : '') +
      '<div class="card-kicker">' + e.when + '</div>' +
      '<h3 class="h-card">' + e.title + '</h3>' +
      (e.blurb ? '<p class="tile-desc">' + e.blurb + '</p>' : '') +
      (e.detail ? '<p class="tile-desc" style="font-weight:600">' + e.detail + '</p>' : '') +
      (e.where ? '<p class="tile-desc" style="opacity:.75">' + e.where + '</p>' : '') +
      (e.url ? '<a class="card-more" href="' + e.url + '" target="_blank" rel="noopener">Official site &rarr;</a>' : '') +
      (e.credit ? '<p class="tile-desc" style="font-size:11px;opacity:.6;margin-top:10px">' + e.credit + '</p>' : '') +
    '</div>';
  }).join('');

  /* Subscribe links for the public Digi2U events calendar. */
  var sub = document.getElementById('cal-subscribe');
  if (sub) {
    sub.innerHTML =
      '<a class="btn btn-dark" href="' + D2U_CAL.html + '" target="_blank" rel="noopener">View The Full Calendar</a>' +
      '<a class="card-more" href="' + D2U_CAL.ics + '" style="align-self:center">Subscribe in your calendar app &rarr;</a>';
  }

  D2URender.events('events-grid', D2U_EVENTS);

  /* Industry events and field trips. */
  var D2U_INDUSTRY_EVENTS = [
    {
      title: 'Khemfest · New York Comic Con · AfroAnimation · Maker Faire',
      desc: 'New Jersey · New York · Los Angeles · Philadelphia. Art, animation, comic books, creative content development and business networking.'
    },
    {
      title: 'Propelify · Art Basel · BITCON · Investfest',
      desc: 'New Jersey · Miami · Atlanta. Startups, contemporary art, Black technologists and investment — the rooms where backing gets decided.'
    }
  ];
  D2URender.numbered('industry', D2U_INDUSTRY_EVENTS);

  window.__D2U_INIT = function () {
    D2U.register('event', D2U_EVENTS);
  };
}());
