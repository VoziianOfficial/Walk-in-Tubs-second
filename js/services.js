const servicesPageName = document.body.dataset.page;

function initServicesPageAnimations() {
    if (servicesPageName !== "services") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const hasGsap = typeof window.gsap !== "undefined";
    if (!hasGsap) return;

    const { gsap } = window;

    if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
    }

    const heroContent = document.querySelector(".services-hero__content");
    const heroVisual = document.querySelector(".services-hero__visual");
    const heroPanel = document.querySelector(".services-hero__panel");
    const heroImage = document.querySelector(".services-hero__panel img");
    const heroBadges = document.querySelectorAll(".services-hero__badge");
    const heroChips = document.querySelectorAll(".services-hero__chips li");

    const categoryCards = document.querySelectorAll(".services-category-card");
    const comparisonCards = document.querySelectorAll(".comparison-mini-card");
    const selectionCards = document.querySelectorAll(".selection-card");
    const ctaPanel = document.querySelector(".services-cta__panel");

    initServicesHero(gsap, {
        heroContent,
        heroVisual,
        heroPanel,
        heroImage,
        heroBadges,
        heroChips,
    });

    createServicesStagger(gsap, categoryCards, {
        y: 24,
        duration: 0.72,
        stagger: 0.09,
        start: "top 82%",
    });

    createServicesStagger(gsap, comparisonCards, {
        x: 18,
        duration: 0.72,
        stagger: 0.12,
        start: "top 84%",
    });

    createServicesStagger(gsap, selectionCards, {
        y: 20,
        duration: 0.68,
        stagger: 0.1,
        start: "top 85%",
    });

    if (ctaPanel && window.ScrollTrigger) {
        gsap.fromTo(
            ctaPanel,
            {
                y: 24,
                opacity: 0,
                scale: 0.988,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ctaPanel,
                    start: "top 88%",
                    once: true,
                },
            }
        );
    }

    initServicesParallax(gsap, heroImage, heroBadges);
    initServicesHover(gsap);
}

function initServicesHero(
    gsap,
    { heroContent, heroVisual, heroPanel, heroImage, heroBadges, heroChips }
) {
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

    if (heroBadges.length) {
        tl.fromTo(
            heroBadges,
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

function createServicesStagger(gsap, elements, options = {}) {
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

function initServicesParallax(gsap, heroImage, heroBadges) {
    if (!window.ScrollTrigger) return;

    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
                trigger: ".services-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
            },
        });
    }

    if (heroBadges.length) {
        heroBadges.forEach((badge, index) => {
            gsap.to(badge, {
                y: index % 2 === 0 ? -12 : 12,
                ease: "none",
                scrollTrigger: {
                    trigger: ".services-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        });
    }
}

function initServicesHover(gsap) {
    const hoverCards = document.querySelectorAll(
        ".services-category-card, .comparison-mini-card, .selection-card"
    );

    hoverCards.forEach((card) => {
        const icon = card.querySelector(".services-category-card__icon, .selection-card__icon");

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

    const buttons = document.querySelectorAll(".services-hero .button, .services-cta .button");

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
    if (event.detail?.page === "services") {
        initServicesPageAnimations();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (servicesPageName === "services") {
        initServicesPageAnimations();
    }
});