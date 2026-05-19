// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Mobile menu (you can expand later)
console.log("%cCHRISREAL EDUCATIONAL COMPLEX - Professional Site Loaded", "color: #1e40af; font-weight: bold;");
