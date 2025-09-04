        // Loading Animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Mobile menu functionality
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.nav-container');
            
            if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Portfolio Filter Functionality
        function filterProjects(category) {
            const cards = document.querySelectorAll('.portfolio-card');
            const buttons = document.querySelectorAll('.filter-btn');
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category.includes(category)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Custom Cursor (Desktop only)
        if (!('ontouchstart' in window)) {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');

            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX - 10 + 'px';
                cursor.style.top = e.clientY - 10 + 'px';
                
                setTimeout(() => {
                    cursorFollower.style.left = e.clientX - 4 + 'px';
                    cursorFollower.style.top = e.clientY - 4 + 'px';
                }, 100);
            });

            // Cursor hover effects
            document.querySelectorAll('a, button, .service-card, .portfolio-card, .testimonial-card').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(2)';
                    cursor.style.borderColor = '#4ecdc4';
                    cursorFollower.style.background = '#4ecdc4';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.borderColor = '#ff6b6b';
                    cursorFollower.style.background = '#ff6b6b';
                });
            });
        } else {
            // Hide cursor on touch devices
            document.querySelector('.cursor').style.display = 'none';
            document.querySelector('.cursor-follower').style.display = 'none';
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

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all scroll-animate elements
        document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right').forEach(el => {
            observer.observe(el);
        });

        // Dynamic navbar background on scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });

        // Parallax effect for floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Form submission with enhanced animation
        function handleFormSubmission(e) {
            e.preventDefault();
            
            const form = document.getElementById('contactForm');
            const formInputs = form.querySelectorAll('input, select, textarea');
            
            // Validate required fields
            let isValid = true;
            formInputs.forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    field.style.borderColor = '#ff6b6b';
                    field.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
                    isValid = false;
                    
                    // Reset border after 3 seconds
                    setTimeout(() => {
                        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        field.style.boxShadow = 'none';
                    }, 3000);
                } else {
                    field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    field.style.boxShadow = 'none';
                }
            });
            
            if (!isValid) {
                // Shake animation for invalid form
                form.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    form.style.animation = '';
                }, 500);
                return;
            }
            
            // Success animation
            const btn = e.target;
            const originalText = btn.textContent;
            
            btn.style.transform = 'scale(0.95)';
            btn.textContent = 'Sending...';
            btn.style.pointerEvents = 'none';
            
            // Create loading spinner in button
            btn.innerHTML = '<div style="display: flex; align-items: center; gap: 10px;"><div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>Sending...</div>';
            
            // Simulate API call
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
                btn.innerHTML = 'Message Sent! 🚀';
                btn.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
                
                // Reset form with animation
                formInputs.forEach((input, index) => {
                    setTimeout(() => {
                        input.value = '';
                        input.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            input.style.transform = 'scale(1)';
                        }, 100);
                    }, index * 100);
                });
                
                // Show success message
                showSuccessMessage();
                
                // Reset button
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                    btn.style.pointerEvents = 'auto';
                }, 5000);
            }, 2000);
        }

        function showSuccessMessage() {
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 50px;
                text-align: center;
                z-index: 10000;
                color: white;
                box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                transition: all 0.5s ease;
                max-width: 400px;
                width: 90%;
            `;
            
            successMsg.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 20px; animation: bounce 2s infinite;">✨</div>
                <h3 style="margin-bottom: 15px; color: #4ecdc4; font-size: 1.8rem;">Thank You!</h3>
                <p style="margin-bottom: 20px; line-height: 1.6;">We'll get back to you within 24 hours with a detailed project proposal.</p>
                <button onclick="this.parentElement.remove()" style="
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                    border: none;
                    padding: 12px 25px;
                    border-radius: 25px;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">Close</button>
            `;
            
            document.body.appendChild(successMsg);
            
            // Animate in
            setTimeout(() => {
                successMsg.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 100);
            
            // Auto remove after 8 seconds
            setTimeout(() => {
                successMsg.style.transform = 'translate(-50%, -50%) scale(0)';
                setTimeout(() => successMsg.remove(), 500);
            }, 8000);
        }

        // Newsletter subscription
        document.querySelector('.newsletter-btn').addEventListener('click', function(e) {
            e.preventDefault();
            const input = document.querySelector('.newsletter-input');
            const btn = this;
            
            if (input.value && input.value.includes('@')) {
                btn.textContent = 'Subscribed!';
                btn.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
                input.value = '';
                
                setTimeout(() => {
                    btn.textContent = 'Subscribe';
                    btn.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                }, 3000);
            } else {
                input.style.borderColor = '#ff6b6b';
                input.placeholder = 'Please enter a valid email';
                
                setTimeout(() => {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    input.placeholder = 'Enter your email';
                }, 3000);
            }
        });

        // Add bounce animation for success message
        const bounceStyle = document.createElement('style');
        bounceStyle.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(bounceStyle);

        // Touch device optimizations
        if ('ontouchstart' in window) {
            // Add touch-friendly interactions
            document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach(el => {
                el.addEventListener('touchstart', function() {
                    this.style.transform = 'translateY(-5px) scale(1.02)';
                }, { passive: true });
                
                el.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                }, { passive: true });
            });
        }

        // Intersection Observer for testimonial cards animation
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            testimonialObserver.observe(card);
        });

        // Console branding
        console.log(`
        %c🚀 TECHIEDOX - Premium Digital Agency
        %c✨ Enhanced Features:
        • Responsive navigation with mobile hamburger
        • Portfolio section with filtering
        • Client testimonials showcase
        • Premium footer with newsletter
        • Smooth scroll animations
        • Touch-optimized interactions
        • Loading screen animation
        %c📱 Fully responsive and mobile-optimized
        %c🎨 Modern design with glassmorphism effects
        `, 
        'color: #ff6b6b; font-size: 18px; font-weight: bold;',
        'color: #4ecdc4; font-size: 14px;',
        'color: #45b7d1; font-size: 14px;',
        'color: #9b59b6; font-size: 14px;'
        );






        let testimonialIndex = 0;

function moveTestimonials(direction) {
  const container = document.getElementById('testimonialCarousel');
  const totalCards = container.children.length;
  const cardWidth = container.children[0].offsetWidth + 40; // width + margin (20px each side)

  testimonialIndex += direction;

  // circular scrolling
  if (testimonialIndex < 0) testimonialIndex = totalCards - 1;
  if (testimonialIndex >= totalCards) testimonialIndex = 0;

  container.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
}




