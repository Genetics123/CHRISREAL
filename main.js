// Basic interactivity: nav toggle, year, simple lightbox
document.addEventListener('DOMContentLoaded', function(){
  // Year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // Nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'flex';
    });
    // ensure nav resets on resize
    window.addEventListener('resize', function(){
      if(window.innerWidth >= 700) nav.style.display = 'flex';
      else nav.style.display = '';
    });
  }

  // Simple lightbox for gallery images
  const links = document.querySelectorAll('.gallery-grid a, .gallery-preview a');
  links.forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const src = this.getAttribute('href') || this.querySelector('img').src;
      openLightbox(src);
    });
  });

  function openLightbox(src){
    const overlay = document.createElement('div');
    overlay.style.position='fixed';
    overlay.style.inset=0;
    overlay.style.background='rgba(0,0,0,0.8)';
    overlay.style.display='flex';
    overlay.style.alignItems='center';
    overlay.style.justifyContent='center';
    overlay.style.zIndex=9999;
    overlay.addEventListener('click', ()=>document.body.removeChild(overlay));

    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth='95%';
    img.style.maxHeight='90%';
    img.style.borderRadius='8px';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
  }
});
