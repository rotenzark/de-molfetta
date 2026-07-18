/* De Molfetta 1938 — main.js
   PLUMBING_V 1 (da Agenzia/Toolkit/boilerplate) + codice-firma: la linea-orlo
   che si «cuce» allo scroll nella sezione Su Misura.
   GSAP registrato SUBITO; reveal once; watchdog 1,5s. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'de-molfetta',
    whatsapp: { number: '', message: '', ids: [] },
    hours: {
      0: [],
      1: [['15:00', '19:30']],
      2: [['10:00', '13:30'], ['15:00', '19:30']],
      3: [['10:00', '13:30'], ['15:00', '19:30']],
      4: [['10:00', '13:30'], ['15:00', '19:30']],
      5: [['10:00', '13:30'], ['15:00', '19:30']],
      6: [['10:00', '13:30'], ['15:00', '19:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 960,
    EN: {
      'nav.bottega': 'The workshop', 'nav.sumisura': 'Made to measure', 'nav.guardaroba': 'The wardrobe',
      'nav.recensioni': 'Reviews', 'nav.dove': 'Where & when', 'nav.chiama': 'Call',
      'hero.eyebrow': 'Corso Vercelli 11 · Milan · since 1938',
      'hero.title': "A man's style, made to measure.",
      'hero.sub': 'Menswear and made-to-measure tailoring on Corso Vercelli — <strong>three generations</strong>, the same passion since 1938.',
      'hero.cta1': 'Call: +39 02 463437', 'hero.cta2': 'The made-to-measure',
      'bottega.kicker': 'The workshop', 'bottega.t': 'Not a shop. A workshop.',
      'bottega.p1': '«Not just a shop, but a true workshop where we make garments to measure with the same passion as ever, in a modern and unique style.» For three generations, the same family behind the same counter.',
      'bottega.pull': '«A historic shop in Milan. My parents already came here when I was a child, when the De Molfetta gentlemen were here.»',
      'sm.kicker': 'Made to measure', 'sm.t1': 'The scent of tailoring', 'sm.t2': 'at every hem',
      'sm.1t': 'The cloth', 'sm.1p': 'A wide selection of first-quality fabrics: chosen together, the way you choose a season.',
      'sm.2t': 'The tape', 'sm.2p': 'Measurements taken on you, one by one. The garment is born on the customer, not on a size.',
      'sm.3t': 'The hem', 'sm.3p': 'The finishing done by hand, with the patience of old. The scent of tailoring is all in here.',
      'gr.kicker': 'The wardrobe', 'gr.t1': 'Not only made to measure:', 'gr.t2': 'the best of Made in Italy',
      'gr.c1t': 'Shirts', 'gr.c1p': 'Chosen cottons and fabrics, workshop fit',
      'gr.c2t': 'Jackets & knitwear', 'gr.c2p': 'Outerwear and knitwear from the finest labels',
      'gr.c3t': 'Trousers', 'gr.c3p': 'Cottons and fabrics for every season',
      'gr.nota': 'Your parents already shopped here: the same choice, with today’s eye.',
      'rec.kicker': 'What people say', 'rec.t2': '«five stars are even too few»',
      'rec.r1': '«I bought a shirt, had a couple of words with the owner, and it was those two words that convinced me: passion and professionalism, plus courtesy and kindness.»',
      'rec.r2': '«Wide choice of quality, stylish menswear, helpful and friendly staff. You never leave without buying something nice. Great quality and fair prices.»',
      'rec.r3': '«A historic shop in Milan. My parents already came here when I was a child, when the De Molfetta gentlemen were here.»',
      'rec.r4': '«Professional, cordial, excellent products with a great quality/price ratio. Five stars are even too few for a workshop of such standing.»',
      'dove.kicker': 'Where & when', 'dove.t1': 'On Corso Vercelli,', 'dove.t2': 'since 1938',
      'dove.metro': 'Corso Vercelli 11, 20144 Milan · corner of Largo Settimio Severo',
      'dove.chiama': 'Call +39 02 463437', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday',
      'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'Do you make garments to measure?', 'faq.a1': 'Yes: for three generations we have made garments to measure with a wide selection of first-quality fabrics, with the same passion as ever and a modern style.',
      'faq.q2': 'What do you sell besides made-to-measure?', 'faq.a2': 'A complete menswear wardrobe: shirts, jackets, knitwear, trousers and accessories from the finest Made in Italy labels.',
      'faq.q3': 'How long have you been here?', 'faq.a3': 'Since 1938: we are a historic Milan shop on Corso Vercelli, run by the same family for three generations.',
      'faq.q4': 'What are your opening hours?', 'faq.a4': 'Monday 3–7:30pm; Tuesday to Saturday 10am–1:30pm and 3–7:30pm. Closed Sunday.',
      'faq.q5': 'Where are you?', 'faq.a5': 'Corso Vercelli 11 in Milan, on the corner of Largo Settimio Severo.',
      'foot.dove': 'Corso Vercelli 11, 20144 Milan · +39 02 463437',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { if (hasST) { els.forEach(function (el) { ScrollTrigger.getAll().forEach(function (st) { if (st.trigger === el && !st.progress) st.kill(); }); }); } gsap.set(els, { opacity: 1, y: 0 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
    var p = document.getElementById('orloPath'); if (p) p.style.strokeDashoffset = 0;
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    /* GESTO-FIRMA: la linea-orlo si cuce allo scroll (scrub) */
    var path = document.getElementById('orloPath');
    if (path) {
      var len = path.getTotalLength();
      path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
      gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.sumisura', start: 'top 65%', end: 'center 70%', scrub: 0.5 } });
    }
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: .5 }, .05)
      .fromTo('.hero-title', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .8 }, .15)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .6 }, .5)
      .to('.hero-cta', { opacity: 1, y: 0, duration: .6 }, .7)
      .to('.hero-est', { opacity: 1, duration: .8 }, .6);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 700); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome (PLUMBING_V 1) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < e) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId), st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>/<em>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
