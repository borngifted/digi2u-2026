/* Digi2U 2026 — page bootstrap for donate.
   Three live donation channels, none of which may be inlined into the page:
   the WordPress build asserts that a page ships zero inline <script> tags, and
   wpautop would rewrite one anyway. So the Zeffy iframes are written from here,
   and the DonateStock Easy Button loader — which used to be a raw <script> in
   the old Elementor HTML widget — is transcribed into this closure unchanged in
   behaviour. */
(function () {
  'use strict';

  var hero = document.getElementById('donateHero');
  if (hero) {
    hero.setAttribute('data-poster', D2U_CDN + 'd2u-cherry-xmas-3.webp');
    hero.setAttribute('data-label', 'Digi2U learners at a community build day');
  }

  D2URender.ways('waysGrid', D2U_DONATE_WAYS);
  D2URender.causes('causeGrid', D2U_CAUSES);
  D2URender.points('stockWhy', D2U_STOCK_WHY);
  D2URender.numbered('stockSteps', D2U_STOCK_STEPS);
  D2URender.points('stockKnow', D2U_STOCK_KNOW);
  D2URender.faq('donateFaq', D2U_DONATE_FAQ);

  /* ---------- Zeffy ----------
     Written from script rather than hard-coded in the markup so the campaign
     slug lives in exactly one place (data-donate.js). Both frames are
     third-party payment UI: they need payment-request permission, and the
     donation form needs enough height that the card step is not scrolled
     inside its own box on a phone. */
  function frame(hostId, src, title, allowPayment) {
    var host = document.getElementById(hostId);
    if (!host) return;
    var f = document.createElement('iframe');
    f.src = src;
    f.title = title;
    f.loading = 'lazy';
    f.setAttribute('allow', allowPayment ? 'payment' : '');
    f.setAttribute('allowpaymentrequest', 'true');
    host.appendChild(f);
  }
  frame('zeffyForm',   D2U_DONATE.zeffyEmbed,  'Donation form powered by Zeffy', true);
  frame('zeffyThermo', D2U_DONATE.zeffyThermo, 'Fundraising progress powered by Zeffy', false);

  /* ---------- DonateStock Easy Button ----------
     The loader is DonateStock's own snippet. It is kept verbatim so that a
     future version of their script behaves here exactly as it does on every
     other nonprofit page that uses it. */
  (function (w, d, s, o, f) {
    w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments); };
    var js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = f; js.async = true;
    fjs.parentNode.insertBefore(js, fjs);
  }(window, document, 'script', 'dsEasyButton', 'https://donatestock.com/EasyButton.js'));

  var dsHost = document.getElementById('dsEasyButtonContainer');
  if (dsHost) {
    window.dsEasyButton('init', {
      element: dsHost,
      ein: D2U_DONATE.stockEin,
      preloadNonprofit: true,
      transferInstructionsLink: true,
      debug: false,
      style: { dark: false }
    });

    /* The plain link below the button is the fallback for a blocked or slow
       third-party script — it opens the same portal. Once the button has
       actually rendered, the link is redundant, so it steps aside rather than
       offering two controls that do the same thing. */
    var fallback = document.getElementById('dsFallback');
    if (fallback) {
      var settle = setInterval(function () {
        if (!dsHost.childElementCount) return;
        clearInterval(settle);
        fallback.hidden = true;
      }, 400);
      setTimeout(function () { clearInterval(settle); }, 12000);
    }
  }
}());
