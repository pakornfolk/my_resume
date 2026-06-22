document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');

    // เช็คว่าเคยเลือกธีมไว้ไหม
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
    
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Initial translation
    if (body.classList.contains('lang-th')) {
        translate('th');
    } else {
        translate('en');
    }

    // ระบบสลับภาษา
    langBtn.addEventListener('click', () => {
        if (body.classList.contains('lang-en')) {
            // สลับไปไทย
            body.classList.replace('lang-en', 'lang-th');
            langText.innerText = 'EN';
            translate('th');
        } else {
            // สลับไปอังกฤษ
            body.classList.replace('lang-th', 'lang-en');
            langText.innerText = 'TH';
            translate('en');
        }
    });

    function translate(lang) {
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(el => {
            el.innerText = el.getAttribute(`data-${lang}`);
        });
    }

    // Scroll reveal animation อย่างง่าย
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-box, .project-card, .edu-card, .exp-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = '0.8s ease-out';
        observer.observe(el);
    });

    // Smooth scrolling & Scroll Spy for Navbar
    const navSections = document.querySelectorAll('#about, #skills, #experience, #projects');
    const topNavLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        navSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        topNavLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    topNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            
            // Close mobile menu on click
            if (window.innerWidth <= 800) {
                document.querySelector('.nav-links').classList.remove('nav-open');
                const menuIcon = document.querySelector('#mobile-menu-btn i');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }

            if (targetEl) {
                window.scrollTo({
                    top: targetEl.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinksContainer.classList.contains('nav-open')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Mouse Glow Effect Tracking
    const mouseGlow = document.getElementById('mouse-glow');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            // Use accent colors depending on theme
            const color = document.body.classList.contains('light-mode') 
                ? 'rgba(37, 99, 235, 0.08)' // blue accent for light mode
                : 'rgba(249, 212, 35, 0.08)'; // yellow/orange for dark mode
                
            mouseGlow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${color}, transparent 80%)`;
        });
    }
});