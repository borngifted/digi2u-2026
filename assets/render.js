/* ==========================================================================
   Digi2U 2026 — grid renderers
   Each renderer maps to an Elementor widget loop:
     cards()  → Image Box grid  · tiles() → Icon Box grid · tiers() → Price Table
   ========================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function el(id) { return document.getElementById(id); }

  /* Image-Box style cards driven by a keyed object. */
  function cards(targetId, dict, type, opts) {
    var host = el(targetId);
    if (!host) return;
    opts = opts || {};
    var keys = opts.only || Object.keys(dict);
    host.innerHTML = keys.map(function (k) {
      var d = dict[k];
      if (!d) return '';
      return '<button class="card reveal" type="button" data-lb="' + type + ':' + esc(k) + '">' +
        '<div class="card-media">' +
          (d.tag ? '<span class="card-tag">' + esc(d.tag) + '</span>' : '') +
          (d.img ? '<img src="' + esc(d.img) + '" alt="' + esc(d.title || d.name) + '" loading="lazy">' : '') +
        '</div>' +
        '<div class="card-body">' +
          (d.kicker ? '<div class="card-kicker">' + esc(d.kicker) + '</div>' : '') +
          '<h3 class="h-card">' + esc(d.title || d.name) + '</h3>' +
          '<p class="card-desc">' + esc(d.short || d.desc) + '</p>' +
          '<span class="card-more">' + esc(opts.cta || 'Learn More') + '</span>' +
        '</div>' +
      '</button>';
    }).join('');
  }

  /* Team cards from an array. */
  function people(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (p) {
      /* The 2026 team cards carry the name and role baked into the artwork, so
         the visible text block is suppressed to avoid showing each name twice.
         Name and role still travel in alt text — screen readers and search
         engines need them, and the card image alone gives them nothing. */
      var labelled = /d2u-team-/.test(p.img || '');
      return '<button class="card card-person' + (labelled ? ' card-person-art' : '') +
        ' reveal" type="button" data-lb="person:' + esc(p.id) + '"' +
        ' aria-label="' + esc(p.name) + ' — ' + esc(p.role) + '. Read bio">' +
        '<div class="card-media">' +
          (p.img ? '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + ' — ' + esc(p.role) + '" loading="lazy">' : '') +
        '</div>' +
        (labelled ? '' :
        '<div class="card-body">' +
          '<div class="card-kicker">' + esc(p.role) + '</div>' +
          '<h3 class="h-card">' + esc(p.name) + '</h3>' +
          '<span class="card-more">Read Bio</span>' +
        '</div>') +
      '</button>';
    }).join('');
  }

  /* Icon-Box style tiles driven by a keyed object. */
  function tiles(targetId, dict, type, opts) {
    var host = el(targetId);
    if (!host) return;
    opts = opts || {};
    host.innerHTML = Object.keys(dict).map(function (k) {
      var d = dict[k];
      return '<button class="tile reveal" type="button" data-lb="' + type + ':' + esc(k) + '">' +
        '<div class="tile-icon">' + esc(d.icon || (d.title || d.name || '').slice(0, 2).toUpperCase()) + '</div>' +
        (d.tag ? '<div class="card-kicker">' + esc(d.tag) + '</div>' : '') +
        (d.status ? '<div class="card-kicker">' + esc(d.status) + '</div>' : '') +
        '<h3 class="h-card">' + esc(d.title || d.name) + '</h3>' +
        '<p class="tile-desc">' + esc(d.short || d.desc) + '</p>' +
        '<span class="card-more">' + esc(opts.cta || 'More Info') + '</span>' +
      '</button>';
    }).join('');
  }

  /* Events from an array. */
  function events(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (d, i) {
      return '<button class="tile reveal" type="button" data-lb="event:' + i + '">' +
        '<div class="tile-icon">' + String(i + 1).padStart(2, '0') + '</div>' +
        '<div class="card-kicker">' + esc(d.tag) + '</div>' +
        '<h3 class="h-card">' + esc(d.title) + '</h3>' +
        '<p class="tile-desc">' + esc(d.desc) + '</p>' +
        '<span class="card-more">Event Details</span>' +
      '</button>';
    }).join('');
  }

  /* Sponsorship tiers — Elementor Price Table. */
  function tiers(targetId, dict) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = Object.keys(dict).map(function (k) {
      var d = dict[k];
      return '<div class="tier reveal' + (d.featured ? ' featured' : '') + '">' +
        '<div class="tier-tag">' + esc(d.tag) + '</div>' +
        '<h3 class="h-card">' + esc(d.name) + '</h3>' +
        '<div class="tier-amt">' + esc(d.amount) + '</div>' +
        '<ul>' + d.benefits.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' +
        '<button class="btn btn-' + (d.featured ? 'primary' : 'ghost') + '" type="button" data-lb="tier:' + esc(k) + '">Full Details</button>' +
      '</div>';
    }).join('');
  }

  /* Static stat bar — Elementor Counter. */
  function stats(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (s) {
      return '<div class="stat reveal"><div class="stat-n">' + esc(s.n) + '</div><div class="stat-l">' + esc(s.label) + '</div></div>';
    }).join('');
  }

  /* Numbered blocks — pillars, values. */
  function numbered(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (v) {
      return '<div class="reveal"><div class="n">' + esc(v.n) + '</div><h3>' + esc(v.title) + '</h3><p>' + esc(v.desc) + '</p></div>';
    }).join('');
  }

  /* Theory of change spine. */
  function theory(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (t, i) {
      return '<div class="theory-step reveal" style="--fill:' + Math.round(((i + 1) / arr.length) * 100) + '%">' +
        '<div class="theory-n">' + esc(t.step) + '</div>' +
        '<h3>' + esc(t.title) + '</h3>' +
        '<p>' + esc(t.desc) + '</p>' +
      '</div>';
    }).join('');
  }

  /* Marquee strip. */
  function marquee(targetId, items) {
    var host = el(targetId);
    if (!host) return;
    var row = items.map(function (i) { return '<span class="marquee-item">' + esc(i) + '</span>'; }).join('');
    host.innerHTML = row + row;
  }

  /* Activity gallery. opts.limit caps the tile count; opts.feature makes the
     first tile 2×2; opts.filters renders category chips. */
  function gallery(targetId, items, opts) {
    var host = el(targetId);
    if (!host) return;
    opts = opts || {};

    function tiles(list) {
      return list.map(function (p) {
        var i = items.indexOf(p);
        return '<button class="gal-item' + (opts.feature && p === list[0] ? ' wide' : '') + '" type="button" data-lb="photo:' + i + '">' +
          '<img src="' + esc(p.src) + '" alt="' + esc(p.cap) + '" loading="lazy">' +
          '<span class="gal-cap"><span class="gal-cat">' + esc(p.cat) + '</span>' + esc(p.cap) + '</span>' +
        '</button>';
      }).join('');
    }

    var shown = opts.limit ? items.slice(0, opts.limit) : items;
    host.innerHTML = tiles(shown);

    if (!opts.filters) return;
    var bar = el(opts.filters);
    if (!bar) return;
    var cats = ['All'];
    items.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
    bar.innerHTML = cats.map(function (c, i) {
      return '<button class="gal-filter" type="button" aria-pressed="' + (i === 0) + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.gal-filter');
      if (!b) return;
      bar.querySelectorAll('.gal-filter').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var c = b.getAttribute('data-cat');
      var list = c === 'All' ? items : items.filter(function (p) { return p.cat === c; });
      host.innerHTML = tiles(opts.limit ? list.slice(0, opts.limit) : list);
    });
  }

  /* Day-in-the-life strip. */
  function moments(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (m) {
      return '<div class="moment reveal">' +
        '<div class="moment-img"><img src="' + esc(m.img) + '" alt="' + esc(m.title) + '" loading="lazy"></div>' +
        '<div class="moment-body">' +
          '<div class="moment-when">' + esc(m.when) + '</div>' +
          '<h3>' + esc(m.title) + '</h3>' +
          '<p>' + esc(m.desc) + '</p>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* Partner / sponsor logo wall. */
  function logos(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (l) {
      return '<div class="logo-cell reveal"><img src="' + esc(l.src) + '" alt="' + esc(l.name) + '" loading="lazy"></div>';
    }).join('');
  }

  /* Charter block. */
  function charter(targetId, c) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML =
      '<div class="charter reveal">' +
        '<p class="charter-lead">' + esc(c.lead) + '</p>' +
        '<p class="charter-body">' + esc(c.body) + '</p>' +
      '</div>';
  }

  /* ---- Phase 2 ---- */

  function stagger(i) { return ' data-d="' + ((i % 7) + 1) + '"'; }

  /* THE NEED — national workforce data. Every cell carries its source. */
  function need(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (s, i) {
      var src = s.href
        ? '<a href="' + esc(s.href) + '" target="_blank" rel="noopener">' + esc(s.source) + '</a>'
        : esc(s.source);
      return '<div class="need-cell reveal"' + stagger(i) + '>' +
        '<div class="need-n">' + esc(s.n) + '</div>' +
        '<div class="need-label">' + esc(s.label) + '</div>' +
        '<div class="need-src">Source: ' + src + '</div>' +
      '</div>';
    }).join('');
  }

  /* OUR IMPACT — Digi2U figures only. Pending cards render visibly empty. */
  function metrics(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (m, i) {
      if (m.pending) {
        return '<div class="metric pending reveal"' + stagger(i) + '>' +
          '<div class="metric-n">—</div>' +
          '<div class="metric-l">' + esc(m.label) + '</div>' +
          '<div class="metric-tag">Tracking</div>' +
        '</div>';
      }
      return '<div class="metric reveal"' + stagger(i) + '>' +
        '<div class="metric-n">' + esc(m.n) + '</div>' +
        '<div class="metric-l">' + esc(m.label) + '</div>' +
        (m.note ? '<div class="metric-note">' + esc(m.note) + '</div>' : '') +
      '</div>';
    }).join('');
  }

  /* Program categories. Each child program opens its existing popup. */
  function categories(targetId, cats, lookup) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = cats.map(function (c, i) {
      var items = c.programs.map(function (k) {
        var p = lookup[k];
        if (!p) return '';
        var isCert = /certification/i.test(p.tag || '');
        return '<li><button type="button" data-lb="program:' + esc(k) + '">' +
          esc(p.title) +
          (isCert ? '<span class="badge">Cert</span>' : '') +
        '</button></li>';
      }).join('');
      return '<div class="cat reveal"' + stagger(i) + '>' +
        '<div class="cat-media">' +
          '<span class="cat-count">' + c.programs.length + ' Tracks</span>' +
          (c.img ? '<img src="' + esc(c.img) + '" alt="' + esc(c.title) + '" loading="lazy">' : '') +
        '</div>' +
        '<div class="cat-body">' +
          '<div class="cat-kicker">' + esc(c.kicker) + '</div>' +
          '<h3>' + esc(c.title) + '</h3>' +
          '<p class="cat-desc">' + esc(c.desc) + '</p>' +
          '<ul class="cat-list">' + items + '</ul>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* Donation impact cards. */
  function giving(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (g, i) {
      return '<div class="give reveal"' + stagger(i) + '>' +
        '<div class="give-icon">' + esc(g.icon) + '</div>' +
        '<h3>' + esc(g.title) + '</h3>' +
        '<p>' + esc(g.desc) + '</p>' +
        (g.amount ? '<div class="give-amt">' + esc(g.amount) + '</div>' : '') +
      '</div>';
    }).join('');
  }

  /* Testimonials. Renders real entries only — no placeholder cards.
     With D2U_STORIES empty the whole section is removed from the page, so
     nothing advertises that testimony is missing. Add entries and the section
     reappears automatically. */
  function stories(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    if (!arr || !arr.length) {
      var sec = host.closest('section');
      if (sec) sec.remove(); else host.remove();
      return;
    }
    host.innerHTML = arr.map(function (s, i) {
      return '<div class="story reveal"' + stagger(i) + '>' +
        '<p class="story-quote">' + esc(s.quote) + '</p>' +
        '<div class="story-who">' +
          '<img class="story-img" src="' + esc(s.img) + '" alt="' + esc(s.name) + '" loading="lazy">' +
          '<div><div class="story-name">' + esc(s.name) + '</div>' +
          '<div class="story-prog">' + esc(s.program) + '</div></div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* Our Story pillars. */
  function pillars(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (p, i) {
      return '<div class="story-pillar reveal"' + stagger(i) + '>' +
        '<div class="tile-icon">' + esc(p.icon) + '</div>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.desc) + '</p>' +
      '</div>';
    }).join('');
  }

  /* Physical locations, with the grant-eligibility evidence attached. */
  function sites(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (s, i) {
      var stats = (s.stats || []).map(function (m) {
        return '<div><strong>' + esc(m[0]) + '</strong><span>' + esc(m[1]) + '</span></div>';
      }).join('');
      return '<div class="loc reveal"' + stagger(i) + '>' +
        '<div class="loc-role">' + esc(s.role) + '</div>' +
        '<h3>' + esc(s.name) + '</h3>' +
        '<div class="loc-place">' + esc(s.place) + '</div>' +
        '<p>' + esc(s.body) + '</p>' +
        (stats ? '<div class="loc-stats">' + stats + '</div>' : '') +
      '</div>';
    }).join('');
  }

  /* Founder card. */
  function founder(targetId, f) {
    var host = el(targetId);
    if (!host || !f) return;
    host.innerHTML =
      '<div class="founder reveal">' +
        '<img class="founder-img" src="' + esc(f.img) + '" alt="' + esc(f.name) + '" loading="lazy">' +
        '<div class="founder-body">' +
          '<p class="founder-quote">“' + esc(f.quote) + '”</p>' +
          '<p class="founder-story">' + esc(f.story) + '</p>' +
          '<div class="founder-who"><strong>' + esc(f.name) + '</strong><span>' + esc(f.role) + '</span></div>' +
        '</div>' +
      '</div>';
  }

  /* Funder eligibility panel. */
  function funder(targetId, arr) {
    var host = el(targetId);
    if (!host) return;
    host.innerHTML = arr.map(function (r, i) {
      return '<div class="fund-row reveal"' + stagger(i) + '>' +
        '<div class="fund-k">' + esc(r.k) + '</div>' +
        '<div class="fund-v">' + esc(r.v) + '</div>' +
        '<div class="fund-note">' + esc(r.note) + '</div>' +
      '</div>';
    }).join('');
  }

  window.D2URender = {
    sites: sites, founder: founder, funder: funder,
    cards: cards, people: people, tiles: tiles, events: events,
    tiers: tiers, stats: stats, numbered: numbered, theory: theory, marquee: marquee,
    gallery: gallery, moments: moments, logos: logos, charter: charter,
    need: need, metrics: metrics, categories: categories, giving: giving,
    stories: stories, pillars: pillars
  };
})();
