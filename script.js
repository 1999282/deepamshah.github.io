// ===================================
// SMOOTH SCROLLING & NAVIGATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .hero-cta a[href^="#"], .hero-scroll a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                    
                    // Scroll to section with offset for fixed navbar
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(this);
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150; // offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const correspondingLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    updateActiveNavLink(correspondingLink);
                }
            }
        });
        
        // Navbar background on scroll
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });
    
    function updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ===================================
    // COPY EMAIL FUNCTIONALITY
    // ===================================
    
    window.copyEmail = function() {
        const email = 'deepamshah65@gmail.com';
        
        // Create temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        
        // Select and copy
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            
            // Visual feedback
            const copyBtn = event.target.closest('.copy-btn');
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#10b981';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = '#0d9488';
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy email:', err);
            alert('Email copied to clipboard!');
        }
        
        // Remove temporary input
        document.body.removeChild(tempInput);
    };
    
    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .highlight-card, .stat-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===================================
    // TYPING EFFECT FOR HERO HEADLINE (Optional)
    // ===================================
    
    function typeEffect(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Uncomment below to enable typing effect
    // const heroHeadline = document.querySelector('.hero-headline');
    // if (heroHeadline) {
    //     const originalText = heroHeadline.textContent;
    //     typeEffect(heroHeadline, originalText, 30);
    // }
    
    // ===================================
    // STAT COUNTER ANIMATION
    // ===================================
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.dataset.suffix || '');
            }
        }, 16);
    }
    
    // Trigger counter animation when stats are visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const statNumber = entry.target.querySelector('.stat-number');
                const targetValue = statNumber.textContent.replace(/[^0-9]/g, '');
                const suffix = statNumber.textContent.replace(/[0-9]/g, '');
                
                statNumber.dataset.suffix = suffix;
                animateCounter(statNumber, parseInt(targetValue), 2000);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });
    
    // ===================================
    // FORM VALIDATION (if you add a contact form later)
    // ===================================
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===================================
    // LAZY LOADING IMAGES (if needed)
    // ===================================
    
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // BACK TO TOP BUTTON (Optional)
    // ===================================
    
    function createBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 999;
        `;
        
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        backToTop.addEventListener('mouseenter', () => {
            backToTop.style.transform = 'scale(1.1)';
        });
        
        backToTop.addEventListener('mouseleave', () => {
            backToTop.style.transform = 'scale(1)';
        });
    }
    
    // Initialize back to top button
    createBackToTop();
    
    // ===================================
    // PRELOADER (Optional)
    // ===================================
    
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
    
    // ===================================
    // CONSOLE MESSAGE FOR RECRUITERS
    // ===================================
    
    console.log('%c👋 Hi there, Recruiter!', 'font-size: 20px; font-weight: bold; color: #1e3a8a;');
    console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #0d9488;');
    console.log('%cI\'m Deepam Shah - Operations & Strategy Graduate', 'font-size: 14px; color: #2d3748;');
    console.log('%c📧 deepamshah65@gmail.com', 'font-size: 14px; color: #2d3748;');
    console.log('%c💼 linkedin.com/in/deepammshah', 'font-size: 14px; color: #2d3748;');
    console.log('%cLet\'s connect and discuss how I can contribute to your team!', 'font-size: 14px; font-weight: bold; color: #0d9488;');
    
    // ===================================
    // ANALYTICS PLACEHOLDER
    // ===================================
    
    // Google Analytics tracking code would go here
    // Example: gtag('config', 'GA_MEASUREMENT_ID');
    
    // Track important interactions
    document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            const type = this.href.startsWith('mailto:') ? 'Email' : 'Phone';
            console.log(`Contact interaction: ${type} - ${this.href}`);
            // In production, you would send this to analytics:
            // gtag('event', 'contact', { method: type, value: this.href });
        });
    });
    
    // Track project card views
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.viewed) {
                const projectTitle = entry.target.querySelector('h3').textContent;
                console.log(`Project viewed: ${projectTitle}`);
                entry.target.dataset.viewed = 'true';
                // In production: gtag('event', 'project_view', { project_name: projectTitle });
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.project-card').forEach(card => {
        projectObserver.observe(card);
    });
    
});

// ===================================
// PERFORMANCE MONITORING
// ===================================

// Log page load performance
window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);
    
    // In production, send this data to analytics
    // gtag('event', 'timing_complete', {
    //     name: 'load',
    //     value: pageLoadTime,
    //     event_category: 'Page Performance'
    // });
});

// ===================================
// SERVICE WORKER FOR PWA (Optional)
// ===================================

// Uncomment to enable PWA functionality
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => console.log('SW registered:', registration))
//             .catch(error => console.log('SW registration failed:', error));
//     });
// }