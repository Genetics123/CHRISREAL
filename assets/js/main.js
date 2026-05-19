/**
 * assets/js/main.js
 * Robust, site-wide interactions for CHRISREAL EDUCATIONAL COMPLEX
 * - Accessible nav toggle with Esc to close and basic focus trap
 * - Keyboard actionable tiles
 * - Lightweight, keyboard-friendly lightbox
 * - Lazy image helper (polyfill for browsers without native support)
 * - Simple form UX: disable on submit and show inline status
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ====== Year in footer ====== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ====== Skip link visibility on focus (optional) ====== */
  const skip = document.querySelector('.skip-link');
  if (skip) {
    skip.addEventListener('focus', () => skip.style.left = '1rem');
    skip.addEventListener('blur', () => skip.style.left = '-9999px');
  }

  /* ====== Accessible navigation toggle ====== */
  const toggle = document.querySelector('.nav-toggle') || document.querySelector('.hamburger');
  const nav = document.getElementById('main-nav') || document.querySelector('.nav-links');
  let navOpen = false;
  let lastFocusedElement = null;

  function openNav() {
    if (!nav || !toggle) return;
    lastFocusedElement = document.activeElement;
    nav.style.display = 'flex';
    toggle.setAttribute('aria-expanded', 'true');
    navOpen = true;
    // focus first focusable link inside nav
    const first = nav.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
    if (first) first.focus();
    document.addEventListener('keydown', handleNavKeydown);
    document.body.style.overflow = 'hidden'; // prevent background scroll on mobile
  }

  function closeNav() {
    if (!nav || !toggle) return;
    nav.style.display = '';
    toggle.setAttribute('aria-expanded', 'false');
    navOpen = false;
    document.removeEventListener('keydown', handleNavKeydown);
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function handleNavKeydown(e) {
    if (e.key === 'Escape') closeNav();
    // Basic focus trap: keep focus inside nav when open
    if (e.key === 'Tab') {
      const focusable = Array.from(nav.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (toggle && nav) {
    // ensure aria attributes exist
    if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      if (navOpen) closeNav();
      else openNav();
    });
    // ensure nav resets on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 720) {
        nav.style.display = 'flex';
        toggle.setAttribute('aria-expanded', 'false');
        navOpen = false;
        document.body.style.overflow = '';
      } else if (!navOpen) {
        nav.style.display = '';
      }
    });
  }

  /* ====== Make tiles keyboard actionable ====== */
  document.querySelectorAll('.tile').forEach(tile => {
    if (!tile.hasAttribute('tabindex')) tile.setAttribute('tabindex', '0');
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // emulate click if tile contains a link, otherwise trigger click
        const link = tile.querySelector('a');
        if (link) link.click();
        else tile.click();
      }
    });
  });

  /* ====== Lightbox (keyboard accessible) ====== */
  function openLightbox(src, alt = '') {
    const overlay = document.createElement('div');
    overlay.className = 'cr-lightbox';
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.88)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    });
    overlay.tabIndex = 0;

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || 'Gallery image';
    Object.assign(img.style, {
      maxWidth: '95%',
      maxHeight: '90%',
      borderRadius: '10px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
    });

    // close button for screen readers
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.innerText = 'Close';
    Object.assign(closeBtn.style, {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'rgba(255,255,255,0.06)',
      color: '#fff',
      border: 'none',
      padding: '8px 10px',
      borderRadius: '8px',
      cursor: 'pointer'
    });
    closeBtn.addEventListener('click', () => document.body.removeChild(overlay));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) document.body.removeChild(overlay);
    });
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (document.body.contains(overlay)) document.body.removeChild(overlay);
      }
    });

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    overlay.focus();
  }

  // Attach lightbox to gallery links
  const galleryLinks = Array.from(document.querySelectorAll('.gallery-grid a, .gallery-preview a'));
  galleryLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href') || a.querySelector('img')?.src;
      const alt = a.querySelector('img')?.alt || '';
      if (href) openLightbox(href, alt);
    });
  });

  /* ====== Lazy loading helper (polyfill) ====== */
  if ('loading' in HTMLImageElement.prototype) {
    // native lazy loading supported; ensure images have loading="lazy"
    document.querySelectorAll('img[data-src]').forEach(img => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.src || img.src.endsWith('placeholder')) img.src = img.dataset.src;
    });
  } else {
    // simple intersection observer fallback
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            obs.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      lazyImages.forEach(img => io.observe(img));
    } else {
      // last-resort: load all
      lazyImages.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
    }
  }

  /* ====== Form UX: disable submit button and show inline status ====== */
  document.querySelectorAll('form.form').forEach(form => {
    // add honeypot if not present
    if (!form.querySelector('input[name="_honeypot"]')) {
      const hp = document.createElement('input');
      hp.type = 'text';
      hp.name = '_honeypot';
      hp.style.display = 'none';
      hp.tabIndex = -1;
      form.prepend(hp);
    }

    form.addEventListener('submit', (e) => {
      // simple client-side UX only; allow normal submission to Formspree
      const submit = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submit) {
        submit.disabled = true;
        const originalText = submit.innerText || submit.value || 'Submitting...';
        submit.dataset.orig = originalText;
        if (submit.tagName.toLowerCase() === 'button') submit.innerText = 'Submitting...';
        else submit.value = 'Submitting...';
      }

      // show a small inline status element (will not block submission)
      let status = form.querySelector('.form-status');
      if (!status) {
        status = document.createElement('div');
        status.className = 'form-status';
        Object.assign(status.style, { marginTop: '12px', color: 'var(--muted)', fontSize: '0.95rem' });
        form.appendChild(status);
      }
      status.textContent = 'Sending your application — please wait.';
      // allow the form to submit normally (Formspree will handle response)
      // re-enable after 8s in case of no redirect (best-effort)
      setTimeout(() => {
        if (submit) {
          submit.disabled = false;
          if (submit.tagName.toLowerCase() === 'button') submit.innerText = submit.dataset.orig || 'Submit';
          else submit.value = submit.dataset.orig || 'Submit';
        }
        status.textContent = '';
      }, 8000);
    });
  });

  /* ====== Small enhancement: ensure external links open safely ====== */
  document.querySelectorAll('a[target="_blank"]').forEach(a => {
    if (!a.hasAttribute('rel')) a.setAttribute('rel', 'noopener noreferrer');
  });

  /* ====== End DOMContentLoaded ====== */
});
