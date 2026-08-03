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
          (d.bullets && d.bullets.length ? '<div class="lb-sub">What you will build</div>' + bulletList(d.bullets) : '') +
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
        '<div class="lb-sub">What you will actually do</div>' +
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
