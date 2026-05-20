/* ════════════════════════════════════════════════════════════════════
   Bau Job AG — Interaction & motion
   ════════════════════════════════════════════════════════════════════ */

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Sticky header floating state on scroll ─────────────────────── */
  const header = document.querySelector('[data-header]');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-floating', y > 8);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Scroll-triggered reveal ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    revealEls.forEach((el) => revealIO.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ─── Stat counters ──────────────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-counter]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.counter);
    if (Number.isNaN(target)) return;
    const duration = 1800;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const v = Math.round(target * easeOut(t));
      el.textContent = v.toLocaleString('de-CH');
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => countIO.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = parseFloat(el.dataset.counter).toLocaleString('de-CH');
    });
  }

  /* ─── Smooth scroll for in-page anchors ──────────────────────────── */
  document.querySelectorAll('a[href^="#"], [data-scroll-to]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const target = el.dataset.scrollTo || el.getAttribute('href');
      if (!target || target === '#') return;
      const node = document.querySelector(target);
      if (!node) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = node.getBoundingClientRect().top + window.scrollY - headerH + 1;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  /* ─── Form submit (placeholder) ──────────────────────────────────── */
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.querySelector('span').textContent;
      btn.querySelector('span').textContent = 'Wird gesendet …';
      btn.disabled = true;
      setTimeout(() => {
        btn.querySelector('span').textContent = 'Danke — wir melden uns.';
        setTimeout(() => {
          btn.querySelector('span').textContent = original;
          btn.disabled = false;
          form.reset();
        }, 2400);
      }, 800);
    });
  }

  /* ─── Subtle parallax on hero logo ───────────────────────────────── */
  const heroLogo = document.querySelector('.hero__logo');
  if (heroLogo && !prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    const stage = heroLogo.closest('.hero__stage');
    let rect = stage.getBoundingClientRect();
    const updateRect = () => { rect = stage.getBoundingClientRect(); };
    window.addEventListener('resize', updateRect, { passive: true });

    stage.addEventListener('mousemove', (e) => {
      const cx = (e.clientX - rect.left) / rect.width  - 0.5;
      const cy = (e.clientY - rect.top)  / rect.height - 0.5;
      heroLogo.style.transform = `translate(${cx * 12}px, ${cy * 12}px) rotate(${cx * 1.5}deg)`;
    });
    stage.addEventListener('mouseleave', () => {
      heroLogo.style.transform = '';
    });
  }
})();
