// ====================== MOBILE MENU ======================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    
    hamburger.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');

        // Change icon to X when open
        if (mobileMenu.classList.contains('active')) {
            hamburger.innerHTML = '&times;';
            hamburger.style.fontSize = "2.2rem";
        } else {
            hamburger.textContent = '☰';
            hamburger.style.fontSize = "1.9rem";
        }
    });
}

// Close menu when any link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        hamburger.textContent = '☰';
    });
});

// ====================== OPTIONAL ENHANCEMENTS ======================

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Active link highlighting
function highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Run when page loads
window.addEventListener('load', highlightActiveLink);

// Console message
console.log('%c✅ CHRISREAL EDUCATIONAL COMPLEX Website Loaded Successfully', 
    'color: #c9a227; font-size: 14px; font-weight: bold;');
