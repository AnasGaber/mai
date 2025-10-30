// Language switching functionality
function switchLang(lang) {
    const enContent = document.getElementById('en-content');
    const arContent = document.getElementById('ar-content');
    const enBtn = document.getElementById('enBtn');
    const arBtn = document.getElementById('arBtn');
    const enBtn2 = document.getElementById('enBtn2');
    const arBtn2 = document.getElementById('arBtn2');
    
    // Mobile buttons
    const enBtnMobile = document.getElementById('enBtnMobile');
    const arBtnMobile = document.getElementById('arBtnMobile');
    const enBtnMobileEn = document.getElementById('enBtnMobileEn');
    const arBtnMobileEn = document.getElementById('arBtnMobileEn');
    
    if (lang === 'en') {
        enContent.classList.remove('hidden');
        arContent.classList.add('hidden');
        if (enBtn) {
            enBtn.classList.add('active');
            arBtn.classList.remove('active');
        }
        if (enBtn2) {
            enBtn2.classList.add('active');
            arBtn2.classList.remove('active');
        }
        if (enBtnMobile) {
            enBtnMobile.classList.add('active');
            arBtnMobile.classList.remove('active');
        }
        if (enBtnMobileEn) {
            enBtnMobileEn.classList.add('active');
            arBtnMobileEn.classList.remove('active');
        }
        document.body.classList.remove('rtl');
        document.body.classList.add('ltr');
        document.documentElement.dir = 'ltr';
        
        // Re-initialize observers for English content
        initializeObservers();
    } else {
        arContent.classList.remove('hidden');
        enContent.classList.add('hidden');
        if (arBtn) {
            arBtn.classList.add('active');
            enBtn.classList.remove('active');
        }
        if (arBtn2) {
            arBtn2.classList.add('active');
            enBtn2.classList.remove('active');
        }
        if (arBtnMobile) {
            arBtnMobile.classList.add('active');
            enBtnMobile.classList.remove('active');
        }
        if (arBtnMobileEn) {
            arBtnMobileEn.classList.add('active');
            enBtnMobileEn.classList.remove('active');
        }
        document.body.classList.remove('ltr');
        document.body.classList.add('rtl');
        document.documentElement.dir = 'rtl';
        
        // Re-initialize observers for Arabic content
        initializeObservers();
    }
    
    // Close mobile menu after language switch
    closeMobileMenu();
}

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const isArabic = !document.getElementById('ar-content').classList.contains('hidden');
    const mobileMenu = isArabic ? document.getElementById('mobileMenu') : document.getElementById('mobileMenuEn');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenus = document.querySelectorAll('.mobile-menu');
    mobileMenus.forEach(menu => {
        menu.classList.remove('active');
    });
}

// Initialize observers for the currently visible content
function initializeObservers() {
    // Clear existing observers
    if (window.progressObserver) {
        window.progressObserver.disconnect();
    }
    if (window.statsObserver) {
        window.statsObserver.disconnect();
    }
    
    // Re-create observers for visible content
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    // Progress bars observer
    window.progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, observerOptions);

    // Stats observer
    window.statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const finalValue = parseInt(stat.textContent);
                    animateCounter(stat, 0, finalValue, 1500);
                });
            }
        });
    }, observerOptions);

    // Observe visible sections
    const activeContent = document.querySelector('#en-content:not(.hidden), #ar-content:not(.hidden)');
    if (activeContent) {
        const expertiseSection = activeContent.querySelector('.expertise');
        const welcomeSection = activeContent.querySelector('.welcome');
        
        if (expertiseSection && window.progressObserver) {
            window.progressObserver.observe(expertiseSection);
        }
        if (welcomeSection && window.statsObserver) {
            window.statsObserver.observe(welcomeSection);
        }
    }
}

// Set Arabic as default on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state to Arabic
    document.body.classList.add('rtl');
    document.documentElement.dir = 'rtl';
    
    // Initialize observers after content is loaded
    setTimeout(() => {
        initializeObservers();
    }, 100);
});

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target.querySelector('#name-ar')?.value;
    const email = formData.get('email') || event.target.querySelector('#email-ar')?.value;
    const message = formData.get('message') || event.target.querySelector('#message-ar')?.value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields / يرجى ملء جميع الحقول');
        return;
    }
    
    // Here you would typically send the data to a server
    alert('Thank you for your message! We will get back to you soon. / شكراً لرسالتك! سنعود إليك قريباً.');
    
    // Reset form
    event.target.reset();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Animate progress bars when they come into view (removed - now handled in initializeObservers)

// Animate stats when they come into view (removed - now handled in initializeObservers)

// Counter animation function
function animateCounter(element, start, end, duration) {
    let current = start;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        }
    }, 16);
}

// Add hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});



// Add floating animation to decorative elements
document.querySelectorAll('.leaf-decoration').forEach(leaf => {
    leaf.style.animation = `float ${2 + Math.random() * 2}s ease-in-out infinite`;
    leaf.style.animationDelay = `${Math.random() * 2}s`;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroText = document.querySelector('.hero-text');
    
    if (heroImage && heroText && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroText.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Services scroll functionality
function scrollServices(direction) {
    // Get the currently visible services grid
    const isArabic = !document.getElementById('ar-content').classList.contains('hidden');
    let servicesGrid;
    
    if (isArabic) {
        servicesGrid = document.getElementById('servicesGrid') || document.getElementById('servicesGridAr');
    } else {
        servicesGrid = document.getElementById('servicesGridEn');
    }
    
    if (!servicesGrid) return;
    
    const scrollAmount = 340; // Card width + gap
    const currentScroll = servicesGrid.scrollLeft;
    
    if (direction === 'left') {
        servicesGrid.scrollTo({
            left: currentScroll - scrollAmount,
            behavior: 'smooth'
        });
    } else {
        servicesGrid.scrollTo({
            left: currentScroll + scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Update scroll arrows visibility based on scroll position
function updateScrollArrows() {
    const servicesGrids = document.querySelectorAll('.services-grid');
    
    servicesGrids.forEach(grid => {
        const leftArrow = grid.parentElement.querySelector('.scroll-arrow-left');
        const rightArrow = grid.parentElement.querySelector('.scroll-arrow-right');
        
        if (leftArrow && rightArrow) {
            // Check if scrollable
            const isScrollable = grid.scrollWidth > grid.clientWidth;
            const isAtStart = grid.scrollLeft <= 5;
            const isAtEnd = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 5;
            
            if (!isScrollable) {
                leftArrow.style.opacity = '0.3';
                rightArrow.style.opacity = '0.3';
            } else {
                leftArrow.style.opacity = isAtStart ? '0.3' : '1';
                rightArrow.style.opacity = isAtEnd ? '0.3' : '1';
            }
        }
    });
}

// Initialize scroll arrows on load
document.addEventListener('DOMContentLoaded', () => {
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileMenus = document.querySelectorAll('.mobile-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-toggle')) {
            mobileMenus.forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
});

// Search functionality (placeholder)
document.querySelector('.search-btn')?.addEventListener('click', () => {
    alert('Search functionality would be implemented here');
});

// WhatsApp button functionality
document.querySelector('.whatsapp-btn')?.addEventListener('click', () => {
    window.open('https://wa.me/1234567890', '_blank');
});

console.log('Feminine Purple theme loaded successfully! 💜');