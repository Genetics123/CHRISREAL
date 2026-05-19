document.addEventListener('DOMContentLoaded', function(){
  // Year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // Nav toggle (accessible)
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'flex';
      if(!expanded) nav.querySelector('a')?.focus();
    });
    window.addEventListener('resize', function(){
      if(window.innerWidth >= 720) nav.style.display = 'flex';
      else nav.style.display = '';
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

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
    overlay.className = 'cr-lightbox';
    Object.assign(overlay.style,{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', display:'flex',
      alignItems:'center', justifyContent:'center', zIndex:9999, padding:'1rem'
    });
    overlay.tabIndex = 0;
    overlay.addEventListener('click', ()=>document.body.removeChild(overlay));
    overlay.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') document.body.removeChild(overlay); });

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Gallery image';
    Object.assign(img.style,{maxWidth:'95%', maxHeight:'90%', borderRadius:'10px', boxShadow:'0 12px 40px rgba(0,0,0,0.6)'});
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    overlay.focus();
  }
});
