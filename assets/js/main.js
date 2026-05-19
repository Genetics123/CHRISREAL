document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'flex';
      if(!expanded) nav.querySelector('a')?.focus();
    });
    window.addEventListener('resize', () => {
      if(window.innerWidth >= 720) nav.style.display = 'flex';
      else nav.style.display = '';
    });
  }

  // Keyboard focus for tiles (Enter opens link if any)
  document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') tile.click();
    });
  });

  // Lightbox (keyboard accessible)
  const galleryLinks = document.querySelectorAll('.gallery-grid a, .gallery-preview a');
  galleryLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(a.href || a.querySelector('img').src);
    });
  });

  function openLightbox(src){
    const overlay = document.createElement('div');
    overlay.className = 'cr-lightbox';
    Object.assign(overlay.style, {
      position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', display:'flex',
      alignItems:'center', justifyContent:'center', zIndex:9999, padding:'1rem'
    });
    overlay.tabIndex = 0;
    overlay.addEventListener('click', () => document.body.removeChild(overlay));
    overlay.addEventListener('keydown', (e) => { if(e.key === 'Escape') document.body.removeChild(overlay); });

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Gallery image';
    Object.assign(img.style, {maxWidth:'95%', maxHeight:'90%', borderRadius:'10px', boxShadow:'0 20px 60px rgba(0,0,0,0.6)'});
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    overlay.focus();
  }
});
