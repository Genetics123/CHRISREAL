/**
 * assets/js/tiles-upgrade.js
 * CHRISREAL INTERNATIONAL SCHOOL — Tile Enhancement
 * Purely additive — adds scroll-reveal + animated stat counters.
 * Does NOT redefine anything in main.js.
 */

(function () {
  'use strict';

  /* ── Scroll-reveal (IntersectionObserver) ── */
  function initReveal() {
    const targets = document.querySelectorAll('.tile--upgraded, .stats-bar');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      targets.forEach(el => el.classList.add('cr-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cr-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    targets.forEach(el => io.observe(el));
  }

  /* ── Animated count-up for stat numbers ── */
  function animateCount(el, target, duration) {
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1
        ? 1
        : 1 - Math.pow(2, -10 * progress);
      const current = eased * target;
      el.textContent = isFloat
        ? current.toFixed(1)
        : Math.floor(current).toString();
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const items = document.querySelectorAll('.stats-bar__num[data-count]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => {
        el.textContent = el.dataset.count;
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el     = entry.target;
            const target = parseFloat(el.dataset.count);
            animateCount(el, target, 1800);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    items.forEach(el => io.observe(el));
  }

  /* ── Subtle mouse-parallax tilt on tiles (desktop only) ── */
  function initTilt() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.tile--upgraded').forEach(tile => {
      tile.addEventListener('mousemove', (e) => {
        const rect   = tile.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        const maxDeg = 5;
        tile.style.transform = `
          translateY(-10px)
          scale(1.012)
          rotateX(${(-dy * maxDeg).toFixed(2)}deg)
          rotateY(${( dx * maxDeg).toFixed(2)}deg)
        `;
      });

      tile.addEventListener('mouseleave', () => {
        tile.style.transform = '';
      });
    });
  }

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  function boot() {
    initReveal();
    initCounters();
    initTilt();
  }

})();
