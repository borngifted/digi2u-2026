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
      return '<button class="card card-person reveal" type="button" data-lb="person:' + esc(p.id) + '">' +
        '<div class="card-media">' +
          (p.img ? '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy">' : '') +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-kicker">' + esc(p.role) + '</div>' +
          '<h3 class="h-card">' + esc(p.name) + '</h3>' +
          '<span class="card-more">Read Bio</span>' +
        '</div>' +
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

  window.D2URender = {
    cards: cards, people: people, tiles: tiles, events: events,
    tiers: tiers, stats: stats, numbered: numbered, theory: theory, marquee: marquee
  };
})();
