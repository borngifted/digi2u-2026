/* ==========================================================================
   Digi2U 2026 — shared behaviour
   The lightbox mirrors Elementor Pro Popup: one trigger attribute per element,
   focus trapped while open, Esc + backdrop to close, deep-linkable via #hash.
   Elementor equivalent: #elementor-action:action=popup:open&settings=<id>
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Video backgrounds ----------
     The poster image is always painted first; the video only upgrades in when
     the connection and viewport can carry it. The hero clips are 0.9-2.9 MB
     (they were far heavier when this was first written, hence the old 900px
     cut-off, which withheld video from any desktop window under 900px wide —
     a laptop at 860px got a still image). The gate is now about phones and
     metered connections, which is what it was always meant to be about.
     Elementor equivalent: Section → Background → Video, with a Background
     Fallback image set and "Play on mobile" left off. */
  function videoIsWelcome() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    /* A backgrounded or prerendered tab can report 0 here, which is "not
       measured yet" rather than "very small screen" — fall back to the
       documentElement before deciding the viewport is too narrow for video. */
    var w = window.innerWidth || document.documentElement.clientWidth || 0;
    if (w && w < 640) return false;
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (c) {
      if (c.saveData) return false;
      if (/^(slow-2g|2g|3g)$/.test(c.effectiveType || '')) return false;
    }
    return true;
  }

  /* Keyed on data-poster: a still image is mandatory, the video is optional.
     A host with only a poster is a photographic hero and stays that way. */
  document.querySelectorAll('[data-poster]').forEach(function (host) {
    var src = host.getAttribute('data-video');
    var poster = host.getAttribute('data-poster');
    var label = host.getAttribute('data-label') || '';
    if (!poster) return;

    var img = document.createElement('img');
    img.src = poster;
    img.alt = label;
    host.appendChild(img);

    if (!src || !videoIsWelcome()) return;

    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.autoplay = true;
    v.playsInline = true; v.setAttribute('playsinline', '');
    v.setAttribute('aria-hidden', 'true');
    v.preload = 'auto';
    v.poster = poster;
    v.src = src;
    v.style.opacity = '0';
    v.style.transition = 'opacity .8s ease';

    v.addEventListener('canplay', function () {
      var p = v.play();
      if (p && p.catch) p.catch(function () { /* autoplay blocked — poster stands in */ });
      v.style.opacity = '1';
      img.style.display = 'none';
    }, { once: true });

    v.addEventListener('error', function () { v.remove(); });
    host.appendChild(v);
  });

  /* ---------- Click-to-play portrait video ----------
     This clip is 13 MB. It loads only when someone asks for it — poster frame
     until then, so the section costs nothing to scroll past.
     Elementor equivalent: the Video widget with "Lightbox" on and a custom
     image overlay. */
  document.querySelectorAll('.vportrait[data-src]').forEach(function (host) {
    var poster = host.getAttribute('data-poster');
    var src = host.getAttribute('data-src');
    var btn = host.querySelector('.vportrait-play');

    if (poster) {
      var img = document.createElement('img');
      img.src = poster;
      img.alt = host.getAttribute('data-label') || '';
      host.insertBefore(img, host.firstChild);
    }
    if (!btn || !src) return;

    btn.addEventListener('click', function () {
      var v = document.createElement('video');
      v.src = src;
      v.controls = true;
      v.playsInline = true;
      v.setAttribute('playsinline', '');
      v.preload = 'auto';
      if (poster) v.poster = poster;
      host.insertBefore(v, host.firstChild);
      host.classList.add('playing');
      var p = v.play();
      if (p && p.catch) p.catch(function () { /* user can hit the native control */ });
    }, { once: true });
  });

  /* ---------- Chapter numbering ----------
     Renumber in DOM order rather than trusting the hard-coded markup: a section
     can remove itself (Stories does, when there is no verified testimony), and
     a gap in the sequence reads as a mistake. Runs after the renderers. */
  var chapterNums = document.querySelectorAll('.chapter .num');
  if (chapterNums.length) {
    chapterNums.forEach(function (el, i) {
      el.textContent = String(i + 1).padStart(2, '0');
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lb');
  if (!lb) return;
  var panel = lb.querySelector('.lb-panel');
  var lastFocus = null;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function metaBlock(meta) {
    if (!meta || !meta.length) return '';
    return '<div class="lb-meta">' + meta.map(function (m) {
      return '<div><strong>' + esc(m[0]) + '</strong><span>' + esc(m[1]) + '</span></div>';
    }).join('') + '</div>';
  }

  function bulletList(bullets) {
    if (!bullets || !bullets.length) return '';
    return '<ul class="lb-list">' + bullets.map(function (b) {
      return Array.isArray(b)
        ? '<li><b>' + esc(b[0]) + '</b><span>' + esc(b[1]) + '</span></li>'
        : '<li><span>' + esc(b) + '</span></li>';
    }).join('') + '</ul>';
  }

  var ctaApply =
    '<div class="lb-foot">' +
      '<a class="btn btn-primary" href="get-involved.html#contact">Apply / Inquire</a>' +
      '<a class="btn btn-ghost" href="get-involved.html#donate">Support This Program</a>' +
    '</div>';

  /* --- Builders, one per content type --- */
  var build = {
    program: function (d) {
      return (d.img ? '<div class="lb-hero" style="background-image:url(' + esc(d.img) + ')"></div>' : '') +
        '<div class="lb-body">' +
          (d.tag ? '<span class="lb-tag">' + esc(d.tag) + '</span>' : '') +
          (d.kicker ? '<div class="lb-kicker">' + esc(d.kicker) + '</div>' : '') +
          '<h2>' + esc(d.title) + '</h2>' +
          '<p>' + esc(d.desc || d.short) + '</p>' +
          metaBlock(d.meta) +
          (d.bullets && d.bullets.length ? '<div class="lb-sub">What you\u2019ll learn</div>' + bulletList(d.bullets) : '') +
          ctaApply +
        '</div>';
    },

    person: function (d) {
      var exp = (d.experience || []).map(function (e) {
        return '<div class="lb-exp">' +
          '<h4>' + esc(e.role) + (e.company ? ' · ' + esc(e.company) : '') + '</h4>' +
          (e.dates ? '<div class="when">' + esc(e.dates) + '</div>' : '') +
          (e.desc ? '<p>' + esc(e.desc) + '</p>' : '') +
        '</div>';
      }).join('');
      var skills = (d.expertise || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
      var links = (d.links || []).map(function (l) {
        return '<a class="btn btn-ghost" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>';
      }).join('');
      return '<div class="lb-body">' +
        '<div class="lb-person">' +
          (d.img ? '<img class="lb-person-img" src="' + esc(d.img) + '" alt="' + esc(d.name) + '" loading="lazy">' : '') +
          '<div>' +
            (d.role ? '<span class="lb-tag">' + esc(d.role) + '</span>' : '') +
            '<h2>' + esc(d.name) + '</h2>' +
            (d.tagline ? '<div class="lb-kicker" style="margin-top:8px">' + esc(d.tagline) + '</div>' : '') +
          '</div>' +
        '</div>' +
        (d.bio ? '<p style="margin-top:22px">' + esc(d.bio) + '</p>' : '') +
        (exp ? '<div class="lb-sub">Experience</div>' + exp : '') +
        (skills ? '<div class="lb-sub">Expertise</div><ul class="lb-chips">' + skills + '</ul>' : '') +
        (links ? '<div class="lb-foot">' + links + '</div>' : '') +
      '</div>';
    },

    partner: function (d) {
      var secs = (d.sections || []).map(function (s) {
        return '<div class="lb-sub">' + esc(s.title) + '</div>' +
          (s.sub ? '<div class="lb-kicker">' + esc(s.sub) + '</div>' : '') +
          (s.body ? '<p style="margin-bottom:14px">' + esc(s.body) + '</p>' : '') +
          bulletList(s.bullets);
      }).join('');
      return '<div class="lb-body">' +
        '<span class="lb-tag">' + esc(d.tag) + '</span>' +
        '<h2>' + esc(d.name) + '</h2>' +
        '<p>' + esc(d.desc) + '</p>' +
        (d.collab ? '<div class="note"><strong>Program collaboration</strong>' + esc(d.collab) + '</div>' : '') +
        secs +
        '<div class="lb-foot"><a class="btn btn-primary" href="get-involved.html#contact">Become A Partner</a></div>' +
      '</div>';
    },

    doc: function (d) {
      return '<div class="lb-body">' +
        '<span class="lb-tag">' + esc(d.status) + '</span>' +
        '<div class="lb-kicker">' + esc(d.credit) + '</div>' +
        '<h2>' + esc(d.title) + '</h2>' +
        '<p>' + esc(d.desc) + '</p>' +
        '<div class="lb-sub">About the film</div>' +
        '<p>' + esc(d.body) + '</p>' +
        '<div class="lb-foot"><a class="btn btn-primary" href="get-involved.html#donate">Support Our Films</a></div>' +
      '</div>';
    },

    role: function (d) {
      return '<div class="lb-body">' +
        '<span class="lb-tag">Now Hiring</span>' +
        '<h2>' + esc(d.title) + '</h2>' +
        '<p>' + esc(d.desc) + '</p>' +
        metaBlock(d.meta) +
        '<div class="lb-sub">What you\u2019ll actually do</div>' +
        bulletList(window.D2U_ROLE_DUTIES || []) +
        '<div class="lb-foot"><a class="btn btn-primary" href="#apply" data-lb-close>Apply For This Role</a></div>' +
      '</div>';
    },

    tier: function (d) {
      return '<div class="lb-body">' +
        '<span class="lb-tag">' + esc(d.tag) + '</span>' +
        '<h2>' + esc(d.name) + '</h2>' +
        '<div class="tier-amt" style="margin:14px 0 22px">' + esc(d.amount) + '</div>' +
        '<div class="lb-sub" style="margin-top:0;padding-top:0;border:0">What is included</div>' +
        bulletList(d.benefits) +
        '<div class="lb-foot"><a class="btn btn-primary" href="#contact" data-lb-close>Talk Sponsorship</a></div>' +
      '</div>';
    },

    event: function (d) {
      return '<div class="lb-body">' +
        '<span class="lb-tag">' + esc(d.tag) + '</span>' +
        '<h2>' + esc(d.title) + '</h2>' +
        '<p>' + esc(d.desc) + '</p>' +
        metaBlock(d.meta) +
        '<div class="lb-foot"><a class="btn btn-primary" href="get-involved.html#contact">Reserve A Seat</a></div>' +
      '</div>';
    },

    photo: function (d) {
      return '<img class="lb-photo" src="' + esc(d.src) + '" alt="' + esc(d.cap) + '">' +
        '<div class="lb-photo-cap"><b>' + esc(d.cat) + '</b><span>' + esc(d.cap) + '</span></div>';
    },

    /* Static HTML pulled from a <template> already in the page. */
    node: function (_d, id) {
      var tpl = document.getElementById(id);
      return '<div class="lb-body">' + (tpl ? tpl.innerHTML : '') + '</div>';
    }
  };

  /* Registry: populated per page via D2U.register() */
  var sources = {};
  window.D2U = window.D2U || {};
  window.D2U.register = function (type, dict) { sources[type] = dict; };

  function open(type, key, trigger) {
    var fn = build[type];
    if (!fn) return;
    var data = (sources[type] || {})[key];
    if (type !== 'node' && !data) return;

    lastFocus = trigger || document.activeElement;
    panel.className = 'lb-panel' + (type === 'photo' ? ' photo' : '');
    panel.innerHTML =
      '<button class="lb-close" type="button" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
          '<path d="M5 5 L19 19 M19 5 L5 19" />' +
        '</svg>' +
      '</button>' + fn(data, key);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lb-locked');
    lb.scrollTop = 0;
    var closeBtn = panel.querySelector('.lb-close');
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lb-locked');
    panel.innerHTML = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    if (location.hash.indexOf('#lb-') === 0) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  window.D2U.openLightbox = open;

  /* Delegated trigger: any element with data-lb="type:key" */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-lb]');
    if (t) {
      e.preventDefault();
      var parts = t.getAttribute('data-lb').split(':');
      open(parts[0], parts.slice(1).join(':'), t);
      return;
    }
    if (e.target.closest('[data-lb-close]')) { close(); return; }
    if (e.target.closest('.lb-close')) { close(); return; }
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = panel.querySelectorAll('a[href], button:not([disabled]), input, select, textarea');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* Deep link: #lb-program-drone opens that popup on load. */
  function fromHash() {
    var h = location.hash;
    if (h.indexOf('#lb-') !== 0) return;
    var rest = h.slice(4);
    var i = rest.indexOf('-');
    if (i < 0) return;
    open(rest.slice(0, i), rest.slice(i + 1));
  }
  window.addEventListener('load', fromHash);
})();

/* ===========================================================================
   Donate lightbox
   Donating used to send people to Zeffy on another domain, which loses the
   context they were reading in and, on mobile, usually loses them entirely.
   The form now opens over the page.

   The iframe src is only set when the overlay opens, so the Zeffy embed costs
   nothing on pages nobody donates from. Scroll is locked while open, Esc and
   the backdrop close it, and focus returns to the button that opened it.
   Any link pointing at #donate or at zeffy.com is intercepted, so the nav
   button, the hero CTAs and the giving section all behave the same.
   ========================================================================= */
(function () {
  var ZEFFY = 'https://www.zeffy.com/embed/donation-form/donate-to-change-lives-3894';
  var ov, frame, opener;

  function build() {
    if (ov) return ov;
    ov = document.createElement('div');
    ov.className = 'd2u-donate-ov';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Donate to Digi2U');
    ov.innerHTML =
      '<div class="d2u-donate-box">' +
        '<div class="d2u-donate-head">' +
          '<strong>Donate to Digi2U</strong>' +
          '<button type="button" class="d2u-donate-close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<iframe title="Donation form powered by Zeffy" allowpaymentrequest allowtransparency="true" loading="lazy"></iframe>' +
        '<div class="d2u-donate-foot">Digi2U is a 501(c)(3) — EIN 88-3213984. All gifts are tax-deductible. ' +
        'Trouble loading? <a href="https://www.zeffy.com/donation-form/donate-to-change-lives-3894" target="_blank" rel="noopener">Open the form in a new tab</a>.</div>' +
      '</div>';
    document.body.appendChild(ov);
    frame = ov.querySelector('iframe');
    ov.querySelector('.d2u-donate-close').addEventListener('click', close);
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
    return ov;
  }

  function open(from) {
    build();
    opener = from || null;
    if (!frame.getAttribute('src')) frame.setAttribute('src', ZEFFY);
    ov.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    var btn = ov.querySelector('.d2u-donate-close');
    if (btn) btn.focus();
  }

  function close() {
    if (!ov) return;
    ov.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    if (opener && opener.focus) opener.focus();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ov && ov.classList.contains('is-open')) close();
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('#donate') === -1 && href.indexOf('zeffy.com') === -1) return;
    e.preventDefault();
    open(a);
  });
})();

/* Page bootstraps (assets/page-*.js) render their content before this file runs,
   then leave any lightbox registration here — D2U.register only exists once the
   IIFE above has executed. */
if (typeof window.__D2U_INIT === 'function') {
  window.__D2U_INIT();
  delete window.__D2U_INIT;
}
