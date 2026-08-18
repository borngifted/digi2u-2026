/* Digi2U 2026 — page bootstrap for get-involved.
   Extracted from inline <script> so WordPress's wpautop filter cannot inject
   <p> tags into it. Everything runs inside one closure: the bootstrap renders
   the page immediately, and __D2U_INIT is invoked by site.js once D2U exists. */
(function () {
  'use strict';

  D2URender.giving('giving', D2U_GIVING);
  D2URender.funder('funder', D2U_FUNDER);
  var gh = document.getElementById('giHero');
  gh.setAttribute('data-poster', D2U_CDN + 'd2u-cherry-xmas-3.webp');
  gh.setAttribute('data-label', 'Digi2U students at a Newark community event');

  D2URender.logos('giLogos', D2U_LOGOS);
  D2URender.tiers('tierGrid', D2U_TIERS);
  D2URender.tiles('roleGrid', D2U_ROLES, 'role', { cta: 'Role Details' });
  D2URender.numbered('partnerWays', [
    { n: '01', title: 'Schools',     desc: 'Co-deliver STEAM tracks and give students access to professional equipment.' },
    { n: '02', title: 'Foundations', desc: 'Fund cohorts, certifications, or mobile media lab operations in your target communities.' },
    { n: '03', title: 'Government',  desc: 'Workforce development partnerships across Newark, Jersey City, Atlanta, and Houston.' },
    { n: '04', title: 'Businesses',  desc: 'Sponsor, host apprentices, or bring your team in as mentors and instructors.' }
  ]);
  document.getElementById('sponsorGrid').innerHTML = D2U_SPONSORS.map(function (s) {
    return '<div class="tile is-static reveal"><div class="tile-icon">' + s.slice(0,2).toUpperCase() + '</div><h3 class="h-card">' + s + '</h3></div>';
  }).join('') +
  '<div class="tile is-static reveal" style="grid-column:1/-1"><div class="tile-icon">+</div><h3 class="h-card">Your logo here</h3><p class="tile-desc">Reach out to support@digi2u.org to discuss a sponsorship.</p></div>';

  /* The inquiry form has no server behind it, so rather than accept a
     submission and silently drop it, it composes the message and hands it to
     the sender's own mail client. Bound here rather than through an onsubmit
     attribute: the handler lives in this closure, and inline handlers are the
     first thing a content security policy removes. */
  var form = document.querySelector('#apply form');
  if (form) {
    form.removeAttribute('onsubmit');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var name = v('f-name'), email = v('f-email'), interest = v('f-int'), message = v('f-msg');
      var body = 'Name: ' + name + '\nEmail: ' + email + '\nInterested in: ' + interest +
                 '\n\n' + (message || '(no message)');
      window.location.href = 'mailto:support@digi2u.org' +
        '?subject=' + encodeURIComponent('Digi2U enquiry — ' + interest) +
        '&body=' + encodeURIComponent(body);
      document.getElementById('f-note').textContent =
        'Opening your email app with this enquiry ready to send. If nothing happens, ' +
        'email support@digi2u.org directly and we will reply within one business day.';
    });
  }

  window.__D2U_INIT = function () {
    D2U.register('role', D2U_ROLES);
    D2U.register('tier', D2U_TIERS);
    window.D2U_ROLE_DUTIES = D2U_ROLE_DUTIES;
  };
}());
