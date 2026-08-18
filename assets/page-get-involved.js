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

  function d2uSubmit(e) {
    e.preventDefault();
    document.getElementById('f-note').textContent =
      'Demo build — this form is not wired to a mail handler yet. In the Elementor version this is the Form widget, routed to support@digi2u.org.';
    return false;
  }

  window.__D2U_INIT = function () {
    D2U.register('role', D2U_ROLES);
    D2U.register('tier', D2U_TIERS);
    window.D2U_ROLE_DUTIES = D2U_ROLE_DUTIES;
  };
}());
