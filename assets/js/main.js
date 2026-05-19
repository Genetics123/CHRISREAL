// ====================== MOBILE MENU FUNCTIONALITY ======================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Change hamburger icon to X when menu is open
    if (mobileMenu.classList.contains('active')) {
        hamburger.innerHTML = '&times;';  // × symbol
    } else {
        hamburger.textContent = '☰';
    }
});

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.textContent = '☰';
    });
});

// ====================== SMOOTH SCROLLING ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================== HERO BUTTON ANIMATION (Optional) ======================
const heroButtons = document.querySelectorAll('.hero-buttons .btn-primary, .hero-buttons .btn-secondary');

heroButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-5px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// ====================== CONSOLE MESSAGE ======================
console.log('%c✅ CHRISREAL EDUCATIONAL COMPLEX Website Loaded Successfully', 
    'color: #c9a227; font-size: 14px; font-weight: bold;');

// Prevent right-click on images (optional)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        // e.preventDefault();   // Uncomment if you want to disable right-click on images
    }
});
