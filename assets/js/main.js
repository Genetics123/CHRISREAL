// ====================== MOBILE HAMBURGER MENU ======================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Toggle between hamburger and close icon
        if (mobileMenu.classList.contains('active')) {
            hamburger.innerHTML = '&times;';   // × symbol
            hamburger.style.fontSize = '2rem';
        } else {
            hamburger.textContent = '☰';
            hamburger.style.fontSize = '1.9rem';
        }
    });
}

// Close mobile menu when any link is clicked
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
                behavior: 'smooth'
            });
        }
    });
});

// ====================== FORM SUBMISSION HANDLING (Optional) ======================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        // You can add real form submission logic here later
        // For now, we'll just show a nice alert
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('✅ Application submitted successfully!\n\nWe will contact you soon.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
});

// ====================== ACTIVE NAV LINK (Optional Enhancement) ======================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Run when page loads
window.addEventListener('load', () => {
    setActiveNavLink();
    console.log('%c✅ CHRISREAL EDUCATIONAL COMPLEX - Website Loaded Successfully', 
                'color: #c9a227; font-weight: bold; font-size: 14px;');
});
