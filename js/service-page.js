const servicePageName = document.body.dataset.page;

function initServicePage() {
    if (servicePageName !== "service-page") return;

    initServiceAnimations();
}

function initServiceAnimations() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const hasGsap = typeof window.gsap !== "undefined";
    if (!hasGsap) return;

    const { gsap } = window;

    if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
    }

    const heroContent = document.querySelector(".service-hero__content");
    const heroVisual = document.querySelector(".service-hero__visual");
    const heroPanel = document.querySelector(".service-hero__panel");
    const heroImage = document.querySelector(".service-hero__panel img");
    const heroCards = document.querySelectorAll(".service-hero__card");
    const heroChips = document.querySelectorAll(".service-hero__chips li");

    const miniCards = document.querySelectorAll(".service-mini-card");
    const detailCards = document.querySelectorAll(".service-detail-card");
    const relatedCards = document.querySelectorAll(".related-card");
    const faqItems = document.querySelectorAll(".faq-list .faq-item");
    const factorPanel = document.querySelector(".service-factor-panel");
    const ctaPanel = document.querySelector(".service-cta__panel");

    initServiceHero(gsap, {
        heroContent,
        heroVisual,
        heroPanel,
        heroImage,
        heroCards,
        heroChips,
    });

    createServiceStagger(gsap, miniCards, {
        x: 18,
        duration: 0.72,
        stagger: 0.12,
        start: "top 84%",
    });

    createServiceStagger(gsap, detailCards, {
        y: 22,
        duration: 0.72,
        stagger: 0.1,
        start: "top 84%",
    });

    createServiceStagger(gsap, relatedCards, {
        y: 20,
        duration: 0.68,
        stagger: 0.1,
        start: "top 86%",
    });

    createServiceStagger(gsap, faqItems, {
        y: 18,
        duration: 0.55,
        stagger: 0.08,
        start: "top 88%",
    });

    if (factorPanel && window.ScrollTrigger) {
        gsap.fromTo(
            factorPanel,
            {
                y: 24,
                opacity: 0,
                scale: 0.99,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.82,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: factorPanel,
                    start: "top 88%",
                    once: true,
                },
            }
        );
    }

    if (ctaPanel && window.ScrollTrigger) {
        gsap.fromTo(
            ctaPanel,
            {
                y: 24,
                opacity: 0,
                scale: 0.99,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.82,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ctaPanel,
                    start: "top 88%",
                    once: true,
                },
            }
        );
    }

    initServiceParallax(gsap, heroImage, heroCards);
    initServiceHover(gsap);
}

function initServiceHero(gsap, { heroContent, heroVisual, heroPanel, heroImage, heroCards, heroChips }) {
    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out",
        },
    });

    if (heroContent) {
        tl.fromTo(
            Array.from(heroContent.children),
            {
                y: 26,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
            }
        );
    }

    if (heroVisual) {
        tl.fromTo(
            heroVisual,
            {
                x: 30,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.9,
            },
            "-=0.55"
        );
    }

    if (heroPanel) {
        tl.fromTo(
            heroPanel,
            {
                scale: 0.975,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.95,
            },
            "-=0.65"
        );
    }

    if (heroImage) {
        tl.fromTo(
            heroImage,
            {
                scale: 1.08,
            },
            {
                scale: 1.02,
                duration: 1.35,
                ease: "power2.out",
            },
            "-=1.05"
        );
    }

    if (heroCards.length) {
        tl.fromTo(
            heroCards,
            {
                y: 18,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.14,
            },
            "-=0.78"
        );
    }

    if (heroChips.length) {
        tl.fromTo(
            heroChips,
            {
                y: 10,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.05,
            },
            "-=0.55"
        );
    }
}

function createServiceStagger(gsap, elements, options = {}) {
    if (!elements || !elements.length || !window.ScrollTrigger) return;

    const {
        y = 20,
        x = 0,
        duration = 0.7,
        stagger = 0.1,
        start = "top 85%",
    } = options;

    gsap.fromTo(
        elements,
        {
            y,
            x,
            opacity: 0,
        },
        {
            y: 0,
            x: 0,
            opacity: 1,
            duration,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
                trigger: elements[0].parentElement || elements[0],
                start,
                once: true,
            },
        }
    );
}

function initServiceParallax(gsap, heroImage, heroCards) {
    if (!window.ScrollTrigger) return;

    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
                trigger: ".service-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
            },
        });
    }

    if (heroCards.length) {
        heroCards.forEach((card, index) => {
            gsap.to(card, {
                y: index % 2 === 0 ? -12 : 12,
                ease: "none",
                scrollTrigger: {
                    trigger: ".service-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        });
    }
}

function initServiceHover(gsap) {
    const hoverCards = document.querySelectorAll(
        ".service-mini-card, .service-detail-card, .related-card"
    );

    hoverCards.forEach((card) => {
        const icon = card.querySelector(".service-detail-card__icon");

        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -4,
                duration: 0.28,
                ease: "power2.out",
            });

            if (icon) {
                gsap.to(icon, {
                    scale: 1.05,
                    rotate: 2,
                    duration: 0.28,
                    ease: "power2.out",
                });
            }
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                duration: 0.28,
                ease: "power2.out",
            });

            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotate: 0,
                    duration: 0.28,
                    ease: "power2.out",
                });
            }
        });
    });

    const buttons = document.querySelectorAll(".service-hero .button, .service-cta .button");

    buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            gsap.to(button, {
                y: -2,
                duration: 0.22,
                ease: "power2.out",
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                y: 0,
                duration: 0.22,
                ease: "power2.out",
            });
        });
    });
}

window.addEventListener("page:ready", (event) => {
    if (event.detail?.page === "service-page") {
        initServicePage();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (servicePageName === "service-page") {
        initServicePage();
    }
});