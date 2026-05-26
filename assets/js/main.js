/**
 * assets/js/main.js
 * CHRISREAL EDUCATIONAL COMPLEX
 * Full Site Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     YEAR IN FOOTER
  ========================= */
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================
     SKIP LINK
  ========================= */
  const skip = document.querySelector('.skip-link');

  if (skip) {

    skip.addEventListener('focus', () => {
      skip.style.left = '1rem';
    });

    skip.addEventListener('blur', () => {
      skip.style.left = '-9999px';
    });
  }

  /* =========================
     MODERN MOBILE MENU
  ========================= */

  const hamburger  = document.getElementById('hamburger');
  const mobilePanel =
        document.getElementById('mobilePanel') ||
        document.getElementById('mobileMenu');          /* fallback for about.html */
  const menuOverlay = document.getElementById('menuOverlay') || null;
  const closeMenu   = document.getElementById('closeMenu')   || null;

  let lastFocusedElement = null;
  let menuIsOpen = false;

  function openMenu() {

    if (!mobilePanel) return;
    if (menuIsOpen) return;

    menuIsOpen = true;
    lastFocusedElement = document.activeElement;

    mobilePanel.classList.add('active');

    if (menuOverlay) {
      menuOverlay.classList.add('active');
    }

    document.body.style.overflow = 'hidden';

    const firstLink = mobilePanel.querySelector('a');

    if (firstLink) {
      firstLink.focus();
    }

    document.addEventListener('keydown', handleMenuKeys);
  }

  function closeMobileMenu() {

    if (!mobilePanel) return;
    if (!menuIsOpen) return;

    menuIsOpen = false;

    mobilePanel.classList.remove('active');

    if (menuOverlay) {
      menuOverlay.classList.remove('active');
    }

    document.body.style.overflow = '';

    document.removeEventListener('keydown', handleMenuKeys);

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function handleMenuKeys(e) {

    /* ESC CLOSE */
    if (e.key === 'Escape') {
      closeMobileMenu();
    }

    /* FOCUS TRAP */
    if (e.key === 'Tab') {

      const focusable = Array.from(
        mobilePanel.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {

        e.preventDefault();
        last.focus();
      }

      else if (!e.shiftKey && document.activeElement === last) {

        e.preventDefault();
        first.focus();
      }
    }
  }

  /* OPEN MENU */
  if (hamburger) {
    hamburger.addEventListener('click', openMenu);
  }

  /* CLOSE BUTTON */
  if (closeMenu) {
    closeMenu.addEventListener('click', closeMobileMenu);
  }

  /* CLICK OVERLAY TO CLOSE */
  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
  }

  /* RESET MENU ON DESKTOP */
  window.addEventListener('resize', () => {

    if (window.innerWidth >= 993 && menuIsOpen) {
      closeMobileMenu();
    }
  });

  /* =========================
     ACTIVE PAGE HIGHLIGHT
  ========================= */

  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll('.nav-links a, .mobile-links a')
    .forEach(link => {

      const linkPage = link.getAttribute('href');

      if (linkPage === currentPage) {
        link.classList.add('active');
      }
    });

  /* =========================
     KEYBOARD ACCESSIBLE TILES
  ========================= */

  document.querySelectorAll('.tile').forEach(tile => {

    if (!tile.hasAttribute('tabindex')) {
      tile.setAttribute('tabindex', '0');
    }

    tile.addEventListener('keydown', (e) => {

      if (e.key === 'Enter' || e.key === ' ') {

        const link = tile.querySelector('a');

        if (link) {
          link.click();
        } else {
          tile.click();
        }
      }
    });
  });

  /* =========================
     LIGHTBOX GALLERY
  ========================= */

  function openLightbox(src, alt = '') {

    const overlay = document.createElement('div');

    overlay.className = 'cr-lightbox';

    Object.assign(overlay.style, {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.9)',
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
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
    });

    const closeBtn = document.createElement('button');

    closeBtn.type      = 'button';
    closeBtn.innerText = '✕';

    Object.assign(closeBtn.style, {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(255,255,255,0.1)',
      color: '#fff',
      border: 'none',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      fontSize: '1.2rem',
      cursor: 'pointer'
    });

    closeBtn.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });

    overlay.addEventListener('click', (e) => {

      if (e.target === overlay) {
        document.body.removeChild(overlay);
      }
    });

    overlay.addEventListener('keydown', (e) => {

      if (e.key === 'Escape') {

        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }
    });

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);

    document.body.appendChild(overlay);

    overlay.focus();
  }

  /* ATTACH LIGHTBOX */
  const galleryLinks = Array.from(
    document.querySelectorAll('.gallery-grid a, .gallery-preview a')
  );

  galleryLinks.forEach(a => {

    a.addEventListener('click', (e) => {

      e.preventDefault();

      const href =
        a.getAttribute('href') ||
        a.querySelector('img')?.src;

      const alt =
        a.querySelector('img')?.alt || '';

      if (href) {
        openLightbox(href, alt);
      }
    });
  });

  /* =========================
     LAZY IMAGE LOADING
  ========================= */

  if ('loading' in HTMLImageElement.prototype) {

    document.querySelectorAll('img[data-src]')
      .forEach(img => {

        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }

        if (!img.src || img.src.endsWith('placeholder')) {
          img.src = img.dataset.src;
        }
      });

  } else {

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

      }, {
        rootMargin: '200px'
      });

      lazyImages.forEach(img => io.observe(img));

    } else {

      lazyImages.forEach(img => {

        img.src = img.dataset.src;

        img.removeAttribute('data-src');
      });
    }
  }

  /* =========================
     FORM UX
  ========================= */

  document.querySelectorAll('form.form').forEach(form => {

    if (!form.querySelector('input[name="_honeypot"]')) {

      const hp = document.createElement('input');

      hp.type          = 'text';
      hp.name          = '_honeypot';
      hp.style.display = 'none';
      hp.tabIndex      = -1;

      form.prepend(hp);
    }

    form.addEventListener('submit', () => {

      const submit = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      if (submit) {

        submit.disabled = true;

        const originalText =
          submit.innerText ||
          submit.value ||
          'Submitting...';

        submit.dataset.orig = originalText;

        if (submit.tagName.toLowerCase() === 'button') {
          submit.innerText = 'Submitting...';
        } else {
          submit.value = 'Submitting...';
        }
      }

      let status = form.querySelector('.form-status');

      if (!status) {

        status           = document.createElement('div');
        status.className = 'form-status';

        Object.assign(status.style, {
          marginTop: '12px',
          color: '#666',
          fontSize: '0.95rem'
        });

        form.appendChild(status);
      }

      status.textContent = 'Sending your application — please wait.';

      setTimeout(() => {

        if (submit) {

          submit.disabled = false;

          if (submit.tagName.toLowerCase() === 'button') {
            submit.innerText = submit.dataset.orig || 'Submit';
          } else {
            submit.value = submit.dataset.orig || 'Submit';
          }
        }

        status.textContent = '';

      }, 8000);
    });
  });

  /* =========================
     SAFE EXTERNAL LINKS
  ========================= */

  document.querySelectorAll('a[target="_blank"]')
    .forEach(a => {

      if (!a.hasAttribute('rel')) {
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });

});
