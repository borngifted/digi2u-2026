/* Digi2U 2026 — page bootstrap for blog.

   The post list is read live from the WordPress REST API rather than baked in,
   so anything published in wp-admin appears here with no rebuild. The feed
   links below are the same content as RSS, which is what a mail tool needs if
   it is going to turn the blog into a newsletter. */
(function () {
  'use strict';

  var API = 'https://digi2u.org/wp-json/wp/v2/';
  var SITE = 'https://digi2u.org/';
  var PER_PAGE = 9;

  var bh = document.getElementById('blogHero');
  bh.setAttribute('data-poster', D2U_CDN + 'd2u-newark-3d-1.webp');
  bh.setAttribute('data-label', 'A Digi2U training session in Newark');

  /* ---- Feeds -------------------------------------------------------- */
  /* Programme categories, so "everything about the programmes" is one feed
     rather than asking someone to subscribe to six. */
  var PROGRAMME_CATS = [328, 325, 330, 331, 332, 326];
  var FEEDS = [
    { n: '01', title: 'Everything',
      desc: 'Every post published on digi2u.org.',
      url: SITE + 'feed/' },
    { n: '02', title: 'Programmes only',
      desc: 'STEAM, 3D printing and fabrication, AI and technology, financial literacy, cultural and creative arts, digital marketing.',
      url: SITE + 'feed/?cat=' + PROGRAMME_CATS.join(',') },
    { n: '03', title: 'Success stories',
      desc: 'Graduate outcomes and cohort write-ups.',
      url: SITE + 'category/success-stories/feed/' },
    { n: '04', title: 'Community partnerships',
      desc: 'Work with partner organisations, schools and city programmes.',
      url: SITE + 'category/community-partnerships/feed/' }
  ];

  document.getElementById('feedList').innerHTML = FEEDS.map(function (f) {
    return '<div>' +
      '<div class="n">' + f.n + '</div>' +
      '<h3>' + f.title + '</h3><p>' + f.desc + '</p>' +
      '<a class="card-more" href="' + f.url + '">Copy this feed URL &rarr;</a>' +
    '</div>';
  }).join('');

  /* ---- Newsletter ---------------------------------------------------- */
  /* No mail service is wired up yet, so rather than swallow a signup the form
     composes it and hands it to the sender's own mail client. */
  var nf = document.getElementById('newsletterForm');
  nf.addEventListener('submit', function (e) {
    e.preventDefault();
    var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    var body = 'Please add me to the Digi2U newsletter.\n\n' +
               'Name: ' + (val('n-name') || '(not given)') + '\n' +
               'Email: ' + val('n-email') + '\n' +
               'Nearest site: ' + val('n-city');
    window.location.href = 'mailto:support@digi2u.org' +
      '?subject=' + encodeURIComponent('Newsletter signup') +
      '&body=' + encodeURIComponent(body);
    document.getElementById('n-note').textContent =
      'Opening your email app with the signup ready to send. Prefer not to email? ' +
      'Use one of the feeds instead — they need no signup at all.';
  });

  /* ---- Posts --------------------------------------------------------- */
  var grid = document.getElementById('blogGrid');
  var filters = document.getElementById('blogFilters');
  var more = document.getElementById('blogMore');

  var state = { page: 1, cat: null, total: null, posts: [] };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  /* WordPress returns titles and excerpts as pre-rendered HTML with entities.
     Decoding through a detached element keeps &#038; and friends readable. */
  function decode(html) {
    var d = document.createElement('textarea');
    d.innerHTML = String(html == null ? '' : html);
    return d.value;
  }
  function strip(html) {
    var d = document.createElement('div');
    d.innerHTML = String(html == null ? '' : html);
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  }
  function when(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function card(p) {
    var media = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0];
    var img = media && (media.source_url || (media.media_details && media.media_details.sizes &&
              media.media_details.sizes.medium_large && media.media_details.sizes.medium_large.source_url));
    var terms = (p._embedded && p._embedded['wp:term'] && p._embedded['wp:term'][0]) || [];
    var cat = terms.filter(function (t) { return t.slug !== 'uncategorized'; })[0];
    var summary = strip(decode(p.excerpt && p.excerpt.rendered));
    if (summary.length > 165) summary = summary.slice(0, 162).replace(/\s+\S*$/, '') + '…';

    return '<a class="tile is-static reveal post-card" href="' + esc(p.link) + '">' +
      (img ? '<div class="post-media"><img src="' + esc(img) + '" alt="" loading="lazy"></div>' : '') +
      '<div class="card-kicker">' + esc(when(p.date)) + (cat ? ' · ' + esc(decode(cat.name)) : '') + '</div>' +
      '<h3 class="h-card">' + esc(decode(p.title && p.title.rendered)) + '</h3>' +
      (summary ? '<p class="tile-desc">' + esc(summary) + '</p>' : '') +
      '<span class="card-more">Read the post &rarr;</span>' +
    '</a>';
  }

  function message(text, sub) {
    grid.innerHTML = '<div class="transparency" style="grid-column:1/-1"><div><strong>' +
      esc(text) + '</strong>' + esc(sub || '') + '</div></div>';
  }

  function load(reset) {
    if (reset) { state.page = 1; state.posts = []; grid.innerHTML = ''; message('Loading', 'Fetching the latest posts.'); }
    var url = API + 'posts?_embed&per_page=' + PER_PAGE + '&page=' + state.page +
              (state.cat ? '&categories=' + state.cat : '');
    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        state.total = parseInt(r.headers.get('X-WP-TotalPages') || '1', 10);
        return r.json();
      })
      .then(function (posts) {
        if (!posts.length && state.page === 1) {
          message('Nothing published here yet',
                  'New posts appear on this page automatically as they go live.');
          more.innerHTML = '';
          return;
        }
        if (state.page === 1) grid.innerHTML = '';
        state.posts = state.posts.concat(posts);
        grid.insertAdjacentHTML('beforeend', posts.map(card).join(''));
        more.innerHTML = state.page < state.total
          ? '<button class="btn btn-dark" type="button" id="loadMore">Load more posts</button>' : '';
        var lm = document.getElementById('loadMore');
        if (lm) lm.addEventListener('click', function () { state.page++; load(false); });
      })
      .catch(function () {
        message('Could not load the posts',
                'The blog is still readable at digi2u.org/blog — this list just could not reach the site.');
        more.innerHTML = '';
      });
  }

  /* Filters are built from the categories that actually have posts, so an
     empty category never shows up as a dead tab. */
  fetch(API + 'categories?per_page=100&hide_empty=true&orderby=count&order=desc')
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (cats) {
      cats = cats.filter(function (c) { return c.slug !== 'uncategorized'; });
      filters.innerHTML =
        '<button class="gal-filter" type="button" aria-pressed="true" data-cat="">All</button>' +
        cats.map(function (c) {
          return '<button class="gal-filter" type="button" aria-pressed="false" data-cat="' + c.id + '">' +
            esc(decode(c.name)) + ' <span style="opacity:.5">' + c.count + '</span></button>';
        }).join('');
      filters.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-cat]');
        if (!b) return;
        filters.querySelectorAll('.gal-filter').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        state.cat = b.getAttribute('data-cat') || null;
        load(true);
      });
    })
    .catch(function () { filters.innerHTML = ''; });

  load(true);

  window.__D2U_INIT = function () { /* no lightbox registry on this page */ };
}());
