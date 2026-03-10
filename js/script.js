// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Loading Animation & Preloader
    const loadTl = gsap.timeline();
    const preloader = document.getElementById("preloader");

    // Once page is fully rendered, hide preloader and start hero animations
    window.addEventListener("load", () => {
        if (preloader) {
            preloader.classList.add("fade-out");
            setTimeout(() => {
                preloader.style.display = "none";
                startHeroAnimations();
            }, 600); // Wait for fade out
        } else {
            startHeroAnimations();
        }
    });

    function startHeroAnimations() {
        loadTl.fromTo("nav",
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".hero-greeting",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4"
            )
            .fromTo(".hero-name",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4"
            )
            .fromTo(".hero-role-container",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4"
            )
            .fromTo(".hero-description",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4"
            )
            .fromTo(".hero-buttons",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4"
            )
            .fromTo(".hero-image-container",
                { scale: 0.8, opacity: 0, rotation: -5 },
                { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.5)" }, "-=0.8"
            );
    }

    // Typing Effect Logic
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Software Engineer", "Full Stack Developer", "Tech Innovator"];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan || !cursorSpan) return;

        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan || !cursorSpan) return;

        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Setup Scroll Animations globally
    const initScrollAnimations = () => {
        // Elements revealing from bottom
        document.querySelectorAll(".reveal").forEach((elem) => {
            gsap.fromTo(elem,
                { y: 60, opacity: 0, visibility: "hidden" },
                {
                    y: 0,
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Elements revealing from left
        document.querySelectorAll(".reveal-left").forEach((elem) => {
            gsap.fromTo(elem,
                { x: -60, opacity: 0, visibility: "hidden" },
                {
                    x: 0,
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Elements revealing from right
        document.querySelectorAll(".reveal-right").forEach((elem) => {
            gsap.fromTo(elem,
                { x: 60, opacity: 0, visibility: "hidden" },
                {
                    x: 0,
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Elements scaling up
        document.querySelectorAll(".reveal-scale").forEach((elem) => {
            gsap.fromTo(elem,
                { scale: 0.8, opacity: 0, visibility: "hidden" },
                {
                    scale: 1,
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.6,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Progress Bar Animations
        document.querySelectorAll(".progress-fill").forEach((bar) => {
            const width = bar.getAttribute("data-width") || "0%";
            gsap.fromTo(bar,
                { width: "0%", visibility: "hidden" },
                {
                    width: width,
                    visibility: "visible",
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    };

    setTimeout(initScrollAnimations, 500); // Give DOM time to stabilize

    // Initialize VanillaTilt for advanced 3D hover effects on cards
    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            perspective: 1000,
            scale: 1.02
        });
    }

    // Custom Cursor tracking logic
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDot && cursorOutline) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Use animate for a smoother lag effect on the outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            const icon = mobileMenuBtn.querySelector("i");
            if (mobileMenu.classList.contains("hidden")) {
                icon.classList.replace("fa-xmark", "fa-bars");
            } else {
                icon.classList.replace("fa-bars", "fa-xmark");
                // Animate links
                gsap.fromTo(mobileLinks,
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
                );
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                mobileMenuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
            });
        });
    }

    // Sticky Navbar & Scroll Progress
    const navbar = document.getElementById("navbar");
    const scrollProgress = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {
        // Apply glassmorphism on scroll
        if (navbar) {
            if (window.scrollY > 20) {
                navbar.classList.add("glass", "border-b", "border-white/10", "shadow-lg");
                navbar.classList.remove("bg-transparent");
            } else {
                navbar.classList.remove("glass", "border-b", "border-white/10", "shadow-lg");
                navbar.classList.add("bg-transparent");
            }
        }

        // Calculate and apply scroll progress bar width
        if (scrollProgress) {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollValue = `${(totalScroll / windowHeight) * 100}%`;
            scrollProgress.style.width = scrollValue;
        }
    });

    // Contact Form Validation and Simulation
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const messageField = document.getElementById("message");
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Basic validation
            let hasError = false;

            if (!nameField.value.trim()) {
                nameField.classList.add("border-red-500");
                hasError = true;
            } else {
                nameField.classList.remove("border-red-500");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
                emailField.classList.add("border-red-500");
                hasError = true;
            } else {
                emailField.classList.remove("border-red-500");
            }

            if (!messageField.value.trim()) {
                messageField.classList.add("border-red-500");
                hasError = true;
            } else {
                messageField.classList.remove("border-red-500");
            }

            if (hasError) {
                // Shake animation for error
                gsap.fromTo(contactForm,
                    { x: -10 },
                    { x: 10, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => { gsap.set(contactForm, { x: 0 }) } }
                );
                return;
            }

            // Simulate sending state
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add("opacity-75", "cursor-not-allowed");

            // Simulate API delay
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Sent Successfully';
                submitBtn.classList.remove("bg-primary", "hover:bg-primary/80");
                submitBtn.classList.add("bg-green-500", "hover:bg-green-600");

                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove("opacity-75", "cursor-not-allowed", "bg-green-500", "hover:bg-green-600");
                    submitBtn.classList.add("bg-primary", "hover:bg-primary/80");
                }, 3000);
            }, 1500);
        });

        // Remove error border on input
        ['name', 'email', 'message'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => {
                    el.classList.remove('border-red-500');
                });
            }
        });
    }

    // Update Copyright Year dynamically
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
