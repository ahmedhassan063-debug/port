/* ========================================
   Portfolio JavaScript
   - Typing Effect
   - Scroll Animations (IntersectionObserver)
   - Navbar Scroll Effect
   - Active Nav Link Tracking
   - Mobile Menu Toggle
   - Counter Animation
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== TYPING EFFECT =====
    const typedElement = document.getElementById('typedText');
    const phrases = [
        'Junior Web Developer',
        'Engineering Student',
        'Frontend Enthusiast',
        'Problem Solver'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    if (typedElement) {
        setTimeout(type, 1200);
    }


    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // ===== ACTIVE NAV LINK TRACKING =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));


    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.navbar__links');
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                menuBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
    });


    // ===== MOBILE MENU TOGGLE =====
    const menuBtn = document.getElementById('menuBtn');
    const navLinksContainer = document.querySelector('.navbar__links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            if (navLinksContainer.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }


    // ===== COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.about__stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 40;
        const duration = 1500;
        const stepTime = duration / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

});