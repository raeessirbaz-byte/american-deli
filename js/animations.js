/* ============================================================
   GSAP + ScrollTrigger animations — Framer Motion equivalent
   Runs after main.js. GSAP + ScrollTrigger loaded via CDN.
   ============================================================ */

window.addEventListener('load', function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Default ease that matches Framer Motion's spring feel ── */
  const EASE   = 'power3.out';
  const EASE_S = 'power2.out';

  /* ────────────────────────────────────────────
     Helper — stagger fade-up for a group
  ──────────────────────────────────────────── */
  function fadeUp(targets, options) {
    gsap.fromTo(
      targets,
      { opacity: 0, y: 48 },
      Object.assign({
        opacity: 1, y: 0,
        duration: 0.75,
        ease: EASE,
        stagger: 0.12,
        scrollTrigger: {
          trigger: targets[0] || targets,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }, options)
    );
  }

  function fadeLeft(targets, options) {
    gsap.fromTo(
      targets,
      { opacity: 0, x: -60 },
      Object.assign({
        opacity: 1, x: 0,
        duration: 0.8,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: {
          trigger: targets[0] || targets,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }, options)
    );
  }

  function fadeRight(targets, options) {
    gsap.fromTo(
      targets,
      { opacity: 0, x: 60 },
      Object.assign({
        opacity: 1, x: 0,
        duration: 0.8,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: {
          trigger: targets[0] || targets,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }, options)
    );
  }

  function scaleIn(targets, options) {
    gsap.fromTo(
      targets,
      { opacity: 0, scale: 0.88 },
      Object.assign({
        opacity: 1, scale: 1,
        duration: 0.65,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: {
          trigger: targets[0] || targets,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }, options)
    );
  }

  /* ────────────────────────────────────────────
     PAGE-WIDE ENTRANCE
  ──────────────────────────────────────────── */

  /* Navbar slides down on load */
  gsap.fromTo('#navbar',
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: EASE, delay: 0.1 }
  );

  /* ────────────────────────────────────────────
     HERO SLIDER text — each slide's content
  ──────────────────────────────────────────── */
  const slideTexts = document.querySelectorAll('.slide-text');
  if (slideTexts.length) {
    gsap.fromTo(slideTexts,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: EASE, delay: 0.4, stagger: 0 }
    );
  }

  /* ────────────────────────────────────────────
     ORDER TYPE SECTION
  ──────────────────────────────────────────── */
  const orderTypeSection = document.querySelector('.order-type-section');
  if (orderTypeSection) {
    gsap.fromTo('.order-type-inner h3',
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.6, ease: EASE,
        scrollTrigger: { trigger: orderTypeSection, start: 'top 90%' }
      }
    );
    const orderCards = document.querySelectorAll('.order-card');
    if (orderCards.length) scaleIn(orderCards);
  }

  /* ────────────────────────────────────────────
     SECTION HEADERS
  ──────────────────────────────────────────── */
  document.querySelectorAll('.sec-head').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  /* ────────────────────────────────────────────
     DEALS CARDS — staggered scale-in
  ──────────────────────────────────────────── */
  const dealCards = document.querySelectorAll('.deal-card');
  if (dealCards.length) {
    gsap.fromTo(dealCards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: '.deals-section', start: 'top 85%' }
      }
    );
  }

  /* ────────────────────────────────────────────
     MENU CATEGORY TABS
  ──────────────────────────────────────────── */
  const catTabs = document.querySelectorAll('.cat-tab');
  if (catTabs.length) {
    gsap.fromTo(catTabs,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.5, ease: EASE_S, stagger: 0.06,
        scrollTrigger: { trigger: '.cat-tabs', start: 'top 90%' }
      }
    );
  }

  /* ────────────────────────────────────────────
     MENU CARDS — staggered pop-in
  ──────────────────────────────────────────── */
  const menuCards = document.querySelectorAll('.menu-card');
  if (menuCards.length) {
    gsap.fromTo(menuCards,
      { opacity: 0, y: 32, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.55, ease: EASE, stagger: 0.08,
        scrollTrigger: { trigger: '.menu-grid', start: 'top 85%' }
      }
    );
  }

  /* ────────────────────────────────────────────
     SAUCE STRIP — split left/right
  ──────────────────────────────────────────── */
  const sauceStrip = document.querySelector('.sauce-strip');
  if (sauceStrip) {
    fadeLeft(['.sauce-strip-text'], {
      scrollTrigger: { trigger: sauceStrip, start: 'top 82%' }
    });
    fadeRight(['.sauce-strip-img'], {
      scrollTrigger: { trigger: sauceStrip, start: 'top 82%' }
    });
  }

  /* ────────────────────────────────────────────
     APP SECTION
  ──────────────────────────────────────────── */
  const appSection = document.querySelector('.app-section');
  if (appSection) {
    fadeLeft(['.app-text'], {
      scrollTrigger: { trigger: appSection, start: 'top 82%' }
    });
    gsap.fromTo('.app-badges .app-badge',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.5, ease: EASE, stagger: 0.12, delay: 0.3,
        scrollTrigger: { trigger: appSection, start: 'top 82%' }
      }
    );
    const appPhones = document.querySelector('.app-phones');
    if (appPhones) {
      fadeRight(['.app-phones'], {
        scrollTrigger: { trigger: appSection, start: 'top 82%' }
      });
    }
  }

  /* ────────────────────────────────────────────
     STORE BANNER
  ──────────────────────────────────────────── */
  const storeBanner = document.querySelector('.store-banner');
  if (storeBanner) {
    gsap.fromTo(storeBanner,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: EASE,
        scrollTrigger: { trigger: storeBanner, start: 'top 88%' }
      }
    );
  }

  /* ────────────────────────────────────────────
     FOOTER COLUMNS
  ──────────────────────────────────────────── */
  const footerCols = document.querySelectorAll('.footer-brand, .footer-col');
  if (footerCols.length) {
    gsap.fromTo(footerCols,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0,
        duration: 0.55, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: 'footer', start: 'top 90%' }
      }
    );
  }

  /* ────────────────────────────────────────────
     MENU PAGE — travel cards stagger
  ──────────────────────────────────────────── */
  document.querySelectorAll('.full-cat-block').forEach(block => {
    const cards = block.querySelectorAll('.travel-card');
    if (cards.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.93 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65, ease: EASE, stagger: 0.1,
          scrollTrigger: { trigger: block, start: 'top 85%' }
        }
      );
    }
    const title = block.querySelector('.full-cat-title');
    if (title) {
      gsap.fromTo(title,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: EASE,
          scrollTrigger: { trigger: block, start: 'top 88%' }
        }
      );
    }
  });

  /* ────────────────────────────────────────────
     MENU PAGE HERO
  ──────────────────────────────────────────── */
  const menuHero = document.querySelector('.menu-page-hero');
  if (menuHero) {
    gsap.fromTo(menuHero.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.15, delay: 0.2 }
    );
  }

  /* ────────────────────────────────────────────
     PARALLAX on hero slider bg images
  ──────────────────────────────────────────── */
  document.querySelectorAll('.slide-bg').forEach(bg => {
    gsap.to(bg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-slider',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  });

});
