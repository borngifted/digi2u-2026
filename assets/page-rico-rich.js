/* Digi2U 2026 — page bootstrap for the Rico Rich page. */
(function () {
  'use strict';

  var hero = document.getElementById('ricoHero');
  hero.setAttribute('data-poster', D2U_VIDEOS_PORTRAIT.printingPromo.poster);
  hero.setAttribute('data-label', 'Rico Rich, the puppet who fronts the Digi2U 3D and media programs');

  /* The promo, autoplaying and looping in its own 9:16 frame — site.js gates
     it on viewport and connection and adds the sound toggle. */
  var promo = document.getElementById('ricoPromo');
  promo.setAttribute('data-src',    D2U_VIDEOS_PORTRAIT.printingPromo.src);
  promo.setAttribute('data-poster', D2U_VIDEOS_PORTRAIT.printingPromo.poster);
  promo.setAttribute('data-label',  D2U_VIDEOS_PORTRAIT.printingPromo.label);

  D2URender.numbered('ricoTracks', D2U_RICO_TRACKS);

  /* Podcast preview. The section stays hidden until an episode URL exists, so
     the page never shows a player with nothing behind it — drop a URL into
     D2U_PODCAST.audio and this lights up on the next load. */
  var pod = D2U_PODCAST || {};
  if (pod.audio) {
    var sec = document.getElementById('podcast');
    sec.removeAttribute('hidden');
    document.getElementById('podTitle').textContent = pod.title || 'Listen';
    document.getElementById('podBlurb').textContent = pod.blurb || '';
    document.getElementById('podPlayer').innerHTML =
      '<div class="audio-meta">' +
        '<strong>' + (pod.title || 'Episode') + '</strong>' +
        '<span>' + [pod.site, pod.duration].filter(Boolean).join(' · ') + '</span>' +
      '</div>' +
      '<audio controls preload="none" src="' + pod.audio + '">' +
        'Your browser cannot play audio. <a href="' + pod.audio + '">Download the episode</a>.' +
      '</audio>';
  }

  window.__D2U_INIT = function () { /* no lightbox registry on this page */ };
}());
