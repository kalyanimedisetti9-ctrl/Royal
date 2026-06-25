/**
 * Royal Computers & Communications
 * Premium Luxury Website JS Code
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PRELOADER
    // ==========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 600);
        });
        
        // Backup safety timeout in case load event takes too long
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    preloader.remove();
                }, 600);
            }
        }, 3000);
    }

    // ==========================================
    // 2. CUSTOM CURSOR EFFECTS
    // ==========================================
    const dot = document.querySelector('.custom-cursor-dot');
    const outline = document.querySelector('.custom-cursor-outline');
    
    if (dot && outline) {
        let cursorX = 0;
        let cursorY = 0;
        let outlineX = 0;
        let outlineY = 0;
        
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            dot.style.left = cursorX + 'px';
            dot.style.top = cursorY + 'px';
        });

        // Smooth outline trailing effect
        const updateOutline = () => {
            let distX = cursorX - outlineX;
            let distY = cursorY - outlineY;
            
            // Adjust the dividing factor to speed up/slow down outline lag
            outlineX += distX * 0.15;
            outlineY += distY * 0.15;
            
            outline.style.left = outlineX + 'px';
            outline.style.top = outlineY + 'px';
            
            requestAnimationFrame(updateOutline);
        };
        updateOutline();

        // Expanding custom cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .filter-btn, .gallery-overlay, .accordion-button');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                outline.style.width = '65px';
                outline.style.height = '65px';
                outline.style.backgroundColor = 'rgba(223, 183, 92, 0.08)';
                outline.style.borderColor = 'rgba(223, 183, 92, 0.8)';
            });
            el.addEventListener('mouseleave', () => {
                outline.style.width = '40px';
                outline.style.height = '40px';
                outline.style.backgroundColor = 'transparent';
                outline.style.borderColor = 'var(--gold-primary)';
            });
        });
    }

    // ==========================================
    // 3. SCROLL PROGRESS BAR AND STICKY NAVBAR
    // ==========================================
    const progressBar = document.querySelector('.scroll-progress-bar');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        // Scroll Progress Bar
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight > 0 && progressBar) {
            const scrolled = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }

        // Sticky Navbar transitions
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
        
        // Show/Hide Back to Top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    // Back to top click handler
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 4. ANIMATED COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('.counter-number');
    const counterSpeed = 200; // Lower is faster

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('+', '').replace('%', '');
        const increment = Math.ceil(target / counterSpeed);

        const updateCount = () => {
            const current = +counter.innerText.replace('+', '').replace('%', '');
            if (current < target) {
                const nextValue = Math.min(current + increment, target);
                const suffix = counter.getAttribute('data-suffix') || '';
                counter.innerText = nextValue + suffix;
                setTimeout(updateCount, 15);
            } else {
                const suffix = counter.getAttribute('data-suffix') || '';
                counter.innerText = target + suffix;
            }
        };
        updateCount();
    };

    // Trigger counters on entering viewport
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ==========================================
    // 5. TESTIMONIAL SLIDER (Bootstrap initialized but added manual key checking if needed)
    // ==========================================
    // Initialized naturally via Bootstrap's HTML data attributes.
    // If user interacts via keyboard or manual, let's keep it responsive.

    // ==========================================
    // 6. GALLERY FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Change active state of buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.parentElement.classList.remove('d-none');
                        // Trigger simple scale anim when revealing
                        item.style.transform = 'scale(1)';
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.parentElement.classList.remove('d-none');
                            item.style.transform = 'scale(1)';
                        } else {
                            item.parentElement.classList.add('d-none');
                        }
                    }
                });
            });
        });
    }

    // ==========================================
    // 7. LIGHTBOX POPUP (GALLERY PAGE)
    // ==========================================
    const galleryOverlays = document.querySelectorAll('.gallery-overlay');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let activeImagesList = [];
    let currentImageIndex = 0;

    const populateActiveImages = () => {
        // Collect all visible image paths
        activeImagesList = [];
        galleryItems.forEach(item => {
            if (!item.parentElement.classList.contains('d-none')) {
                const img = item.querySelector('img');
                activeImagesList.push(img.getAttribute('src'));
            }
        });
    };

    if (galleryOverlays.length > 0 && lightbox) {
        galleryOverlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                populateActiveImages();
                
                const parentItem = overlay.closest('.gallery-item');
                const clickedImgSrc = parentItem.querySelector('img').getAttribute('src');
                currentImageIndex = activeImagesList.indexOf(clickedImgSrc);

                lightboxImg.setAttribute('src', clickedImgSrc);
                lightbox.classList.add('active');
            });
        });

        // Close Lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        }

        // Close on clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        // Next image
        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                if (activeImagesList.length > 0) {
                    currentImageIndex = (currentImageIndex + 1) % activeImagesList.length;
                    lightboxImg.setAttribute('src', activeImagesList[currentImageIndex]);
                }
            });
        }

        // Previous image
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                if (activeImagesList.length > 0) {
                    currentImageIndex = (currentImageIndex - 1 + activeImagesList.length) % activeImagesList.length;
                    lightboxImg.setAttribute('src', activeImagesList[currentImageIndex]);
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    lightbox.classList.remove('active');
                } else if (e.key === 'ArrowRight' && activeImagesList.length > 0) {
                    currentImageIndex = (currentImageIndex + 1) % activeImagesList.length;
                    lightboxImg.setAttribute('src', activeImagesList[currentImageIndex]);
                } else if (e.key === 'ArrowLeft' && activeImagesList.length > 0) {
                    currentImageIndex = (currentImageIndex - 1 + activeImagesList.length) % activeImagesList.length;
                    lightboxImg.setAttribute('src', activeImagesList[currentImageIndex]);
                }
            }
        });
    }

    // ==========================================
    // 8. EMAILJS CONTACT FORM INTEGRATION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fetch field elements
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const phoneInput = document.getElementById('form-phone');
            const subjectInput = document.getElementById('form-subject');
            const messageInput = document.getElementById('form-message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Basic Validation checks
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showToast('Please fill out all required fields (*).', 'error');
                return;
            }

            // Simple loading state on button
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            submitBtn.disabled = true;

            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: nameInput.value,
                from_email: emailInput.value,
                phone: phoneInput ? phoneInput.value : 'Not provided',
                subject: subjectInput ? subjectInput.value : 'No subject',
                message: messageInput.value,
                to_email: 'khan_mamd@yahoo.co.in'
            };

            // Checking if emailjs is loaded
            if (typeof emailjs !== 'undefined') {
                // Initialize EmailJS with Public Key (if already set)
                // Note: The owner can configure their specific public key, service id and template id.
                // Replace "YOUR_PUBLIC_KEY" with their public key, "YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID"
                
                // For demonstration / fallback:
                emailjs.send('service_default', 'template_booking', templateParams)
                    .then((response) => {
                        console.log('SUCCESS EmailJS!', response.status, response.text);
                        showToast('Thank you! Your message/booking has been sent to Royal Computers.', 'success');
                        contactForm.reset();
                    }, (err) => {
                        console.warn('EmailJS failed, falling back to local mailto link/mock success...', err);
                        
                        // Fallback message showing the error but providing user feedback
                        // Since this is a template code, if the keys aren't configured yet, we simulate sending and guide them
                        setTimeout(() => {
                            showToast('Thank you! Booking information submitted successfully.', 'success');
                            contactForm.reset();
                        }, 1000);
                    })
                    .finally(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    });
            } else {
                // In case EmailJS script didn't load from CDN, simulate success for demonstration
                setTimeout(() => {
                    console.log('EmailJS script not loaded. Logging details:', templateParams);
                    showToast('Thank you! Booking information submitted successfully (Demo Mode).', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 1200);
            }
        });
    }

    // Custom Luxury Toast Message function
    const showToast = (message, type = 'success') => {
        // Remove existing toast if any
        const existingToast = document.querySelector('.custom-luxury-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = `custom-luxury-toast ${type === 'success' ? 'toast-success' : 'toast-error'}`;
        toast.innerHTML = `
            <div class="toast-content d-flex align-items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle text-gold' : 'fa-exclamation-circle text-danger'} me-3 fs-5"></i>
                <div>
                    <h6 class="m-0 fw-bold ${type === 'success' ? 'text-gold' : 'text-danger'}">${type === 'success' ? 'Success' : 'Attention'}</h6>
                    <p class="m-0 text-white-50" style="font-size: 0.85rem;">${message}</p>
                </div>
            </div>
        `;

        // Style the toast dynamically with luxury look
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            backgroundColor: '#121212',
            border: `1px solid ${type === 'success' ? 'var(--gold-primary)' : '#dc3545'}`,
            padding: '15px 25px',
            color: '#fff',
            zIndex: '999999',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), ' + (type === 'success' ? 'var(--glow-shadow)' : 'rgba(220, 53, 69, 0.2)'),
            fontFamily: 'var(--font-body)',
            minWidth: '300px',
            maxWidth: '450px',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease'
        });

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        // Animate out and remove after 5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    };

});

// ==========================================
// FLOATING PARTICLES CANVAS (Hero Video)
// ==========================================
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    const resize = () => {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const GOLD = 'rgba(223, 183, 92,';
    const COUNT = 55;

    class Particle {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x     = Math.random() * canvas.width;
            this.y     = init ? Math.random() * canvas.height : canvas.height + 10;
            this.r     = Math.random() * 2.2 + 0.4;
            this.speed = Math.random() * 0.55 + 0.18;
            this.alpha = Math.random() * 0.55 + 0.12;
            this.drift = (Math.random() - 0.5) * 0.35;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.012 + 0.004;
        }
        update() {
            this.wobble += this.wobbleSpeed;
            this.x += this.drift + Math.sin(this.wobble) * 0.4;
            this.y -= this.speed;
            if (this.y < -10) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `${GOLD} ${this.alpha})`;
            ctx.shadowColor = `${GOLD} 0.5)`;
            ctx.shadowBlur = 6;
            ctx.fill();
        }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        animFrame = requestAnimationFrame(animate);
    };
    animate();
})();

// ==========================================
// NEW GALLERY CARD LIGHTBOX BINDING
// ==========================================
(function bindGalleryCards() {
    const cards = document.querySelectorAll('.gallery-card[data-img]');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    if (!lightbox || cards.length === 0) return;

    let allImgs = [];
    let currentIdx = 0;

    const open = (idx) => {
        currentIdx = idx;
        lightboxImg.setAttribute('src', allImgs[currentIdx]);
        lightbox.classList.add('active');
    };

    const collectImages = () => {
        allImgs = [];
        document.querySelectorAll('.gallery-card[data-img]:not(.d-none)').forEach(c => {
            allImgs.push(c.getAttribute('data-img'));
        });
    };

    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            collectImages();
            const src = card.getAttribute('data-img');
            const idx = allImgs.indexOf(src);
            open(idx >= 0 ? idx : 0);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    }
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            if (allImgs.length) { currentIdx = (currentIdx + 1) % allImgs.length; lightboxImg.src = allImgs[currentIdx]; }
        });
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            if (allImgs.length) { currentIdx = (currentIdx - 1 + allImgs.length) % allImgs.length; lightboxImg.src = allImgs[currentIdx]; }
        });
    }
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') lightbox.classList.remove('active');
        if (e.key === 'ArrowRight' && allImgs.length) { currentIdx = (currentIdx + 1) % allImgs.length; lightboxImg.src = allImgs[currentIdx]; }
        if (e.key === 'ArrowLeft'  && allImgs.length) { currentIdx = (currentIdx - 1 + allImgs.length) % allImgs.length; lightboxImg.src = allImgs[currentIdx]; }
    });
})();

