/**
 * Elite Properties - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.getElementById('header');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ========================================
    // Hero Slider
    // ========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroNavBtns = document.querySelectorAll('.hero-nav-btn');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        heroNavBtns.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        currentSlide = index;
    };

    const nextSlide = () => {
        const next = (currentSlide + 1) % heroSlides.length;
        showSlide(next);
    };

    const startSlider = () => {
        slideInterval = setInterval(nextSlide, 5000);
    };

    const stopSlider = () => {
        clearInterval(slideInterval);
    };

    if (heroSlides.length > 0) {
        showSlide(0);
        startSlider();

        heroNavBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                stopSlider();
                showSlide(index);
                startSlider();
            });
        });
    }

    // ========================================
    // Search Tabs
    // ========================================
    const searchTabs = document.querySelectorAll('.search-tab');

    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // ========================================
    // Smooth Scroll
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Favorite Buttons
    // ========================================
    document.querySelectorAll('.property-fav').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
        });
    });

    // ========================================
    // Properties Slider
    // ========================================
    const sliderTrack = document.querySelector('.properties-slider-track');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (sliderTrack && prevBtn && nextBtn) {
        const cards = sliderTrack.querySelectorAll('.property-card-mini');
        let sliderPosition = 0;
        const cardWidth = 280;
        const gap = 24;
        const visibleCards = Math.floor(sliderTrack.parentElement.offsetWidth / (cardWidth + gap));
        const maxPosition = -(cards.length - visibleCards) * (cardWidth + gap);

        const updateSlider = () => {
            sliderTrack.style.transform = `translateX(${sliderPosition}px)`;
        };

        prevBtn.addEventListener('click', () => {
            sliderPosition = Math.min(sliderPosition + cardWidth + gap, 0);
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            sliderPosition = Math.max(sliderPosition - cardWidth - gap, maxPosition);
            updateSlider();
        });
    }

    // ========================================
    // Forms
    // ========================================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53935';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
                form.reset();
            }
        });
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.property-card, .zone-card, .quick-action, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // Lazy Loading Images
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

});

// ========================================
// Utility Functions
// ========================================
function formatPrice(price) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
