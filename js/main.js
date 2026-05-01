(function () {
  'use strict';

  /* ── Navbar scroll shadow ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ── Hamburger / mobile nav ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── Delivery / Pickup toggles (navbar + order-type section) ── */
  document.querySelectorAll('.order-toggle').forEach(toggle => {
    const btns = toggle.querySelectorAll('button');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  const orderCards = document.querySelectorAll('.order-card');
  orderCards.forEach(card => {
    card.addEventListener('click', () => {
      orderCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  /* ── Hero Slider ── */
  const track     = document.getElementById('slidesTrack');
  const dots      = document.querySelectorAll('.slider-dot');
  const prevBtn   = document.getElementById('slidePrev');
  const nextBtn   = document.getElementById('slideNext');

  if (track && dots.length) {
    let current   = 0;
    let autoTimer = null;
    const total   = dots.length;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach(dot => {
      dot.addEventListener('click', () => { goTo(+dot.dataset.index); resetAuto(); });
    });

    /* Touch/swipe */
    let touchX = 0;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
    }, { passive: true });

    startAuto();
  }

  /* ── Deals horizontal scroll arrows ── */
  const dealsScroll = document.getElementById('dealsScroll');
  const dealsLeft   = document.getElementById('dealsLeft');
  const dealsRight  = document.getElementById('dealsRight');

  if (dealsScroll) {
    const scrollAmt = 320;
    if (dealsLeft)  dealsLeft.addEventListener('click',  () => dealsScroll.scrollBy({ left: -scrollAmt, behavior: 'smooth' }));
    if (dealsRight) dealsRight.addEventListener('click', () => dealsScroll.scrollBy({ left:  scrollAmt, behavior: 'smooth' }));
  }

  /* ── Menu category tabs ── */
  const catTabs  = document.querySelectorAll('.cat-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  if (catTabs.length) {
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;

        menuCards.forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.style.display = show ? 'block' : 'none';
          if (show) {
            card.style.animation = 'none';
            card.offsetHeight; // reflow
            card.style.animation = 'fadeUp .4s ease forwards';
          }
        });
      });
    });
  }

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  /* ── Smooth scroll anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });

  /* ── Inject keyframes ── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
  `;
  document.head.appendChild(style);

})();
