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

    // Number Counters Animation
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        counters.forEach(counter => {
            let targetCount = parseInt(counter.getAttribute('data-target'));
            gsap.fromTo(counter,
                { innerHTML: 0 },
                {
                    innerHTML: targetCount,
                    duration: 3,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    snap: { innerHTML: 1 },
                    onUpdate: function () {
                        // GSAP snap handles rounding automatically
                    }
                }
            );
        });
    }



    // Initialize tsParticles Backgorund
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: { value: "#0ea5e9" },
                links: {
                    enable: true,
                    color: "#334155",
                    distance: 150,
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    outModes: "out"
                },
                size: {
                    value: 2,
                    random: true
                },
                opacity: {
                    value: 0.5
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "bubble"
                    }
                },
                modes: {
                    bubble: {
                        distance: 200,
                        size: 4,
                        duration: 2,
                        opacity: 0.8
                    }
                }
            },
            detectRetina: true
        });
    }
    // --- Advanced Interactions: Global Persistence ---
    const viewCountEl = document.getElementById('view-count');
    const likeBtn = document.getElementById('like-btn');
    const likeIcon = document.getElementById('like-icon');
    const likeCountEl = document.getElementById('like-count');

    const NAMESPACE = 'dravex-hacker-portfolio-v1';
    const BASE_LIKES = 856;
    let isLiked = localStorage.getItem('portfolio_is_liked') === 'true';

    // 1. Instant UI Initialization from Local Storage
    if (isLiked && likeBtn && likeIcon) {
        likeIcon.classList.remove('fa-regular');
        likeIcon.classList.add('fa-solid');
        likeBtn.classList.add('!bg-rose-500', '!text-white', '!border-rose-500');
    }

    // 2. Attach Click Handler Immediately (Don't wait for API)
    if (likeBtn && likeIcon && likeCountEl) {
        likeBtn.addEventListener('click', async () => {
            if (!isLiked) {
                // UI - Instant Update
                isLiked = true;
                localStorage.setItem('portfolio_is_liked', 'true');

                likeIcon.classList.remove('fa-regular');
                likeIcon.classList.add('fa-solid');
                likeBtn.classList.add('!bg-rose-500', '!text-white', '!border-rose-500');

                gsap.fromTo(likeIcon,
                    { scale: 0.5 },
                    { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" }
                );

                // API - Update Global Count
                try {
                    const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/total_likes/up`);
                    const data = await res.json();
                    if (data.count !== undefined) {
                        likeCountEl.innerHTML = (data.count + BASE_LIKES).toLocaleString();
                    }
                } catch (e) { console.error("Global like failed:", e); }
            } else {
                // UI - Local Undo (for testing/corrections)
                isLiked = false;
                localStorage.removeItem('portfolio_is_liked');
                likeIcon.classList.remove('fa-solid');
                likeIcon.classList.add('fa-regular');
                likeBtn.classList.remove('!bg-rose-500', '!text-white', '!border-rose-500');
            }
        });
    }

    // 3. Fetch Initial Global Data
    async function initGlobalStats() {
        try {
            // Fetch Views (Increment on every visit)
            const viewRes = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/page_views/up`);
            const viewData = await viewRes.json();
            if (viewCountEl && viewData.count) {
                gsap.to(viewCountEl, {
                    innerHTML: viewData.count,
                    duration: 3,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function () {
                        viewCountEl.innerHTML = Number(Math.round(this.targets()[0].innerHTML)).toLocaleString();
                    }
                });
            }

            // Fetch Current Likes
            const likeRes = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/total_likes`);
            const likeData = await likeRes.json();
            if (likeCountEl && likeData.count !== undefined) {
                likeCountEl.innerHTML = (likeData.count + BASE_LIKES).toLocaleString();
            }
        } catch (error) {
            console.warn("Global stats fetch failed, using local fallback.");
            if (viewCountEl) viewCountEl.innerText = "1,542+";
            if (likeCountEl) likeCountEl.innerText = (isLiked ? BASE_LIKES + 1 : BASE_LIKES).toLocaleString();
        }
    }

    initGlobalStats();

    // Advanced Share Modal Logic
    const shareBtn = document.getElementById('share-btn');
    const shareModal = document.getElementById('share-modal');
    const shareModalContent = document.getElementById('share-modal-content');
    const closeShareModal = document.getElementById('close-share-modal');
    const shareModalOverlay = document.getElementById('share-modal-overlay');

    if (shareBtn && shareModal) {
        // Open Modal
        shareBtn.addEventListener('click', () => {
            shareModal.classList.remove('hidden');
            setTimeout(() => {
                shareModalContent.classList.remove('scale-95', 'opacity-0');
            }, 10);
        });

        // Close Modal Functions
        const hideModal = () => {
            shareModalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                shareModal.classList.add('hidden');
            }, 300);
        };

        if (closeShareModal) closeShareModal.addEventListener('click', hideModal);
        if (shareModalOverlay) shareModalOverlay.addEventListener('click', hideModal);
    }

    // Global Share Function
    window.shareTo = function (platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent("Check out this amazing developer portfolio!");
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${title}%20${url}`;
                window.open(shareUrl, '_blank');
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                window.open(shareUrl, '_blank');
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                window.open(shareUrl, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const icon = document.getElementById('copy-share-icon');
                    const text = document.getElementById('copy-share-text');
                    const bg = document.getElementById('copy-icon-bg');

                    if (icon && text && bg) {
                        icon.className = 'fa-solid fa-check';
                        text.textContent = 'Copied!';
                        bg.classList.add('!bg-green-500', '!text-white');

                        setTimeout(() => {
                            icon.className = 'fa-solid fa-link';
                            text.textContent = 'Copy Link';
                            bg.classList.remove('!bg-green-500', '!text-white');
                        }, 2000);
                    }
                });
                break;
        }
    };

});
