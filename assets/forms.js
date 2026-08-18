/* ==========================================================================
   Digi2U 2026 — form capture
   Every form on the site posts to one Google Form, "Digi2U Website
   Inquiries", which appends a row to its linked Google Sheet and — with
   Responses -> Get email notifications for new responses ticked — mails the
   team. This is the same endpoint the 2025 pages have been using; the field
   map below was read back off the live form, not copied on faith.

   Why fetch(mode:'no-cors'): Google's formResponse endpoint sends no CORS
   headers, so the browser will not let us read the reply. The request is
   delivered, but the response is opaque — we cannot distinguish "saved" from
   "rejected". A network-level failure (offline, DNS blocked, extension
   blocking docs.google.com) does still reject the promise, and that is the
   case the mailto fallback exists for. Anything Google itself refuses passes
   silently, which is the price of posting cross-origin from a static page.
   ========================================================================== */
(function () {
  'use strict';

  var ENDPOINT = 'https://docs.google.com/forms/d/e/' +
                 '1FAIpQLSc4hfIxV-DGX24LUzXIV44uRCUq2JOul_mUXfa_uzxXMMyeBw/formResponse';

  /* Read off the live form. Email and Subject are the two Google marks
     required, so send() refuses to post without them rather than firing a
     request that will be dropped. */
  var FIELD = {
    name:    'entry.1150649426',
    email:   'entry.1540006152',
    phone:   'entry.2053814286',
    subject: 'entry.1509303702',
    message: 'entry.1669567112',
    page:    'entry.1198200133'
  };

  var TEAM_EMAIL = 'support@digi2u.org';

  function send(data) {
    if (!data.email || !data.subject) {
      return Promise.reject(new Error('email and subject are required'));
    }
    var fd = new FormData();
    Object.keys(FIELD).forEach(function (k) {
      fd.append(FIELD[k], data[k] == null ? '' : String(data[k]));
    });
    return fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body: fd });
  }

  /* Hands the same content to the visitor's mail client when the POST could
     not leave the machine, so a blocked network costs us a slower lead rather
     than a lost one. */
  function mailto(data) {
    var body = 'Name: ' + (data.name || '(not given)') +
      '\nEmail: ' + data.email +
      (data.phone ? '\nPhone: ' + data.phone : '') +
      '\nInterested in: ' + data.subject +
      '\nPage: ' + data.page +
      '\n\n' + (data.message || '(no message)');
    window.location.href = 'mailto:' + TEAM_EMAIL +
      '?subject=' + encodeURIComponent('Digi2U enquiry — ' + data.subject) +
      '&body=' + encodeURIComponent(body);
  }

  /* Wires one <form>. `collect` returns the payload; everything else — the
     honeypot check, the button state, the status line — is the same on every
     form, so it lives here once.

     opts.form     the <form> element (or its id)
     opts.note     id of the <p> that carries the status message
     opts.collect  function returning {name,email,phone,subject,message,page}
     opts.success  message shown after a delivered submission
     opts.reset    false to leave the fields filled (default true) */
  function bind(opts) {
    var form = typeof opts.form === 'string' ? document.getElementById(opts.form) : opts.form;
    if (!form) return;
    var note = opts.note ? document.getElementById(opts.note) : null;
    var button = form.querySelector('button[type="submit"], button:not([type])');

    /* Bots fill every input they find, including one positioned off-screen and
       hidden from the accessibility tree. A human never sees it, so anything
       arriving with it filled is dropped before it can reach the sheet. */
    var trap = document.createElement('div');
    trap.className = 'hp-field';
    trap.setAttribute('aria-hidden', 'true');
    trap.innerHTML = '<label>Company (leave blank)' +
      '<input type="text" name="company" tabindex="-1" autocomplete="off"></label>';
    form.insertBefore(trap, form.firstChild);
    var honey = trap.querySelector('input');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (honey.value) { if (note) note.textContent = opts.success || 'Thank you.'; return; }

      var data = opts.collect();
      if (!data.email) { if (note) note.textContent = 'An email address is needed so we can reply.'; return; }

      var label = button ? button.textContent : '';
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      if (note) { note.textContent = 'Sending…'; note.classList.remove('is-done'); }

      send(data).then(function () {
        if (opts.reset !== false) form.reset();
        if (note) {
          note.textContent = opts.success ||
            'Thank you — this is with the team. We reply within one business day.';
          note.classList.add('is-done');
        }
      }).catch(function () {
        if (note) {
          note.innerHTML = 'We could not reach the server, so your email app is opening with ' +
            'this message ready to send. If nothing happens, write to ' +
            '<a href="mailto:' + TEAM_EMAIL + '">' + TEAM_EMAIL + '</a>.';
        }
        mailto(data);
      }).then(function () {
        if (button) { button.disabled = false; button.textContent = label; }
      });
    });
  }

  window.D2UForms = { send: send, bind: bind, FIELD: FIELD, ENDPOINT: ENDPOINT, TEAM_EMAIL: TEAM_EMAIL };
}());
