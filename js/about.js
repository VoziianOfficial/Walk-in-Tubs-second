const aboutPageName = document.body.dataset.page;

function initAboutPageAnimations() {
    if (aboutPageName !== "about") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const hasGsap = typeof window.gsap !== "undefined";
    if (!hasGsap) return;

    const { gsap } = window;

    if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
    }

    const heroContent = document.querySelector(".about-hero__content");
    const heroVisual = document.querySelector(".about-hero__visual");
    const heroPanel = document.querySelector(".about-hero__panel");
    const heroImage = document.querySelector(".about-hero__panel img");
    const heroCards = document.querySelectorAll(".about-hero__card");
    const heroHighlights = document.querySelectorAll(".about-hero__highlights li");

    const storyCards = document.querySelectorAll(".about-story-card");
    const clarityCards = document.querySelectorAll(".clarity-card");
    const processCards = document.querySelectorAll(".about-process-card");
    const valuePoints = document.querySelectorAll(".about-value-point");
    const ctaPanel = document.querySelector(".about-cta__panel");

    initAboutHero(gsap, {
        heroContent,
        heroVisual,
        heroPanel,
        heroImage,
        heroCards,
        heroHighlights,
    });

    createAboutStagger(gsap, storyCards, {
        x: 18,
        duration: 0.72,
        stagger: 0.12,
        start: "top 84%",
    });

    createAboutStagger(gsap, clarityCards, {
        y: 22,
        duration: 0.74,
        stagger: 0.12,
        start: "top 84%",
    });

    createAboutStagger(gsap, processCards, {
        y: 24,
        duration: 0.72,
        stagger: 0.1,
        start: "top 84%",
    });

    createAboutStagger(gsap, valuePoints, {
        x: 18,
        duration: 0.72,
        stagger: 0.12,
        start: "top 84%",
    });

    if (ctaPanel && window.ScrollTrigger) {
        gsap.fromTo(
            ctaPanel,
            {
                y: 26,
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

    initAboutParallax(gsap, heroImage, heroCards);
    initAboutHover(gsap);
}

function initAboutHero(gsap, { heroContent, heroVisual, heroPanel, heroImage, heroCards, heroHighlights }) {
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

    if (heroHighlights.length) {
        tl.fromTo(
            heroHighlights,
            {
                y: 10,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
            },
            "-=0.55"
        );
    }
}

function createAboutStagger(gsap, elements, options = {}) {
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

function initAboutParallax(gsap, heroImage, heroCards) {
    if (!window.ScrollTrigger) return;

    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
                trigger: ".about-hero",
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
                    trigger: ".about-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        });
    }
}

function initAboutHover(gsap) {
    const hoverCards = document.querySelectorAll(
        ".about-story-card, .clarity-card, .about-process-card, .about-value-point"
    );

    hoverCards.forEach((card) => {
        const icon = card.querySelector(".clarity-card__icon, .about-value-point__icon");

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

    const buttons = document.querySelectorAll(".about-hero .button, .about-cta .button");

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
    if (event.detail?.page === "about") {
        initAboutPageAnimations();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (aboutPageName === "about") {
        initAboutPageAnimations();
    }
});