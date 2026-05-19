// Basic interactivity: nav toggle, year, simple lightbox
document.addEventListener('DOMContentLoaded', function(){

  // Year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // Nav toggle — matches .hamburger / #mobileMenu in all HTML pages
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if(hamburger && mobileMenu){
    hamburger.addEventListener('click', function(){
      mobileMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        mobileMenu.classList.remove('active');
      });
    });

    // Close menu on resize back to desktop
    window.addEventListener('resize', function(){
      if(window.innerWidth >= 992){
        mobileMenu.classList.remove('active');
      }
    });
  }

  // Simple lightbox for gallery images
  const links = document.querySelectorAll('.gallery-grid a, .gallery-preview a');
  links.forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      const src = this.getAttribute('href') || this.querySelector('img').src;
      openLightbox(src);
    });
  });

  function openLightbox(src){
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = 0;
    overlay.style.background = 'rgba(0,0,0,0.8)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;
    overlay.addEventListener('click', function(){ document.body.removeChild(overlay); });

    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '95%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '8px';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
  }

});
