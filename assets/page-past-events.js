/* Digi2U 2026 — page bootstrap for past-events.
   Extracted from inline <script> so WordPress's wpautop filter cannot inject
   <p> tags into it. Everything runs inside one closure: the bootstrap renders
   the page immediately, and __D2U_INIT is invoked by site.js once D2U exists. */
(function () {
  'use strict';

  var ph = document.getElementById('pastHero');
  ph.setAttribute('data-poster', D2U_CDN + 'd2u-cherry-xmas-3.webp');
  ph.setAttribute('data-label', 'Christmas Wonderland, built end to end by Digi2U students');

  /* Build one flat photo list so lightbox indices stay unique across every
     gallery on the page, then render each past event against it. */
  var allPhotos = [];
  var html = D2U_PAST_EVENTS.map(function (ev, n) {
    var photos = ev.cats.length
      ? D2U_GALLERY.filter(function (p) { return ev.cats.indexOf(p.cat) > -1; })
      : [];

    var body;
    if (photos.length) {
      body = '<div class="gal">' + photos.map(function (p) {
        var i = allPhotos.length;
        allPhotos.push(p);
        return '<button class="gal-item" type="button" data-lb="photo:' + i + '">' +
          '<img src="' + p.src + '" alt="' + p.cap + '" loading="lazy">' +
          '<span class="gal-cap"><span class="gal-cat">' + p.cat + '</span>' + p.cap + '</span>' +
        '</button>';
      }).join('') + '</div>';
    } else {
      body = '<div class="transparency"><div><strong>Photography pending</strong>' +
             'No photographs from this event are in the library yet.</div></div>';
    }

    return '<section' + (n % 2 ? ' class="sec-light"' : '') + '>' +
      '<div class="wrap">' +
        '<div class="sec-head">' +
          '<p class="kicker">' + ev.when + '</p>' +
          '<h2 class="h-section">' + ev.title + '</h2>' +
          '<p class="lede">' + ev.desc + '</p>' +
        '</div>' + body +
      '</div>' +
    '</section>';
  }).join('');

  document.getElementById('pastEvents').innerHTML = html;
  window.__pastPhotos = allPhotos;

  /* Dated archive from the live calendar (see sync-events.js). */
  D2URender.numbered('cal-past', D2U_CAL_PAST.map(function (e) {
    return { title: e.title, desc: [e.when, e.where].filter(Boolean).join(' · ') };
  }));

  window.__D2U_INIT = function () {
    D2U.register('photo', window.__pastPhotos);
  };
}());
