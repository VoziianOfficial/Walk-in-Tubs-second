const pageName = document.body.dataset.page;

function initHomeAnimations() {
    if (pageName !== "home") return;

    const heroContent = document.querySelector(".hero-section__content");
    const heroVisual = document.querySelector(".hero-section__visual");
    const heroPanel = document.querySelector(".hero-panel--main");
    const heroImage = document.querySelector(".hero-panel--main img");
    const heroFloatingCards = document.querySelectorAll(".hero-floating-card");
    const highlightItems = document.querySelectorAll(".hero-section__highlights li");

    const benefitsCards = document.querySelectorAll(".benefits-grid .info-card");
    const serviceCards = document.querySelectorAll(".services-preview__grid .service-card");
    const processCards = document.querySelectorAll(".process-grid .step-card");
    const reassuranceCards = document.querySelectorAll(".reassurance-cards .stat-card");
    const faqItems = document.querySelectorAll(".faq-list .faq-item");

    const ctaPanel = document.querySelector(".cta-panel");
    const coverageMapCard = document.querySelector(".coverage-map-card");
    const coverageSideCard = document.querySelector(".coverage-side-card");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasGsap = typeof window.gsap !== "undefined";

    if (prefersReducedMotion) return;

    if (!hasGsap) {
        initHomeHoverFallbacks();
        return;
    }

    const { gsap } = window;

    if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
    }

    initHeroIntro(gsap, {
        heroContent,
        heroVisual,
        heroPanel,
        heroImage,
        heroFloatingCards,
        highlightItems,
    });

    initSectionStaggers(gsap, benefitsCards, serviceCards, processCards, reassuranceCards, faqItems);
    initCtaAnimation(gsap, ctaPanel);
    initCoverageAnimation(gsap, coverageMapCard, coverageSideCard);
    initParallaxDetails(gsap, heroImage, heroFloatingCards, coverageMapCard);
    initHomeHoverEffects(gsap);
}

function initHeroIntro(
    gsap,
    { heroContent, heroVisual, heroPanel, heroImage, heroFloatingCards, highlightItems }
) {
    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out",
        },
    });

    if (heroContent) {
        const heroChildren = Array.from(heroContent.children);

        heroTimeline.fromTo(
            heroChildren,
            {
                y: 28,
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
        heroTimeline.fromTo(
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
        heroTimeline.fromTo(
            heroPanel,
            {
                scale: 0.97,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
            },
            "-=0.65"
        );
    }

    if (heroImage) {
        heroTimeline.fromTo(
            heroImage,
            {
                scale: 1.08,
            },
            {
                scale: 1.02,
                duration: 1.4,
                ease: "power2.out",
            },
            "-=1.1"
        );
    }

    if (heroFloatingCards.length) {
        heroTimeline.fromTo(
            heroFloatingCards,
            {
                y: 18,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.16,
            },
            "-=0.85"
        );
    }

    if (highlightItems.length) {
        heroTimeline.fromTo(
            highlightItems,
            {
                y: 10,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.08,
            },
            "-=0.6"
        );
    }
}

function initSectionStaggers(
    gsap,
    benefitsCards,
    serviceCards,
    processCards,
    reassuranceCards,
    faqItems
) {
    createStaggerReveal(gsap, benefitsCards, {
        y: 22,
        duration: 0.7,
        stagger: 0.12,
        start: "top 82%",
    });

    createStaggerReveal(gsap, serviceCards, {
        y: 24,
        duration: 0.72,
        stagger: 0.1,
        start: "top 82%",
    });

    createStaggerReveal(gsap, processCards, {
        y: 24,
        duration: 0.72,
        stagger: 0.12,
        start: "top 84%",
    });

    createStaggerReveal(gsap, reassuranceCards, {
        x: 18,
        duration: 0.75,
        stagger: 0.14,
        start: "top 84%",
    });

    createStaggerReveal(gsap, faqItems, {
        y: 18,
        duration: 0.55,
        stagger: 0.08,
        start: "top 88%",
    });
}

function createStaggerReveal(gsap, elements, options = {}) {
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

function initCtaAnimation(gsap, ctaPanel) {
    if (!ctaPanel || !window.ScrollTrigger) return;

    gsap.fromTo(
        ctaPanel,
        {
            y: 26,
            opacity: 0,
            scale: 0.985,
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ctaPanel,
                start: "top 88%",
                once: true,
            },
        }
    );
}

function initCoverageAnimation(gsap, coverageMapCard, coverageSideCard) {
    if (!window.ScrollTrigger) return;

    if (coverageMapCard) {
        gsap.fromTo(
            coverageMapCard,
            {
                y: 28,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: coverageMapCard,
                    start: "top 84%",
                    once: true,
                },
            }
        );
    }

    if (coverageSideCard) {
        gsap.fromTo(
            coverageSideCard,
            {
                x: 24,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: coverageSideCard,
                    start: "top 88%",
                    once: true,
                },
            }
        );
    }
}

function initParallaxDetails(gsap, heroImage, heroFloatingCards, coverageMapCard) {
    if (!window.ScrollTrigger) return;

    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
            },
        });
    }

    if (heroFloatingCards.length) {
        heroFloatingCards.forEach((card, index) => {
            gsap.to(card, {
                y: index % 2 === 0 ? -14 : 14,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.1,
                },
            });
        });
    }

    if (coverageMapCard) {
        const overlay = coverageMapCard.querySelector(".coverage-map-card__overlay");

        if (overlay) {
            gsap.to(overlay, {
                y: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: coverageMapCard,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }
    }
}

function initHomeHoverEffects(gsap) {
    const hoverCards = document.querySelectorAll(
        ".info-card, .service-card, .step-card, .stat-card, .coverage-side-card"
    );

    hoverCards.forEach((card) => {
        const icon = card.querySelector(
            ".info-card__icon, .service-card__icon, .coverage-side-card__icon"
        );

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

    const ctaButtons = document.querySelectorAll(".hero-section .button, .cta-panel .button");

    ctaButtons.forEach((button) => {
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

function initHomeHoverFallbacks() {
    const heroVisual = document.querySelector(".hero-section__visual");
    const coverageMapCard = document.querySelector(".coverage-map-card");

    if (heroVisual) {
        heroVisual.classList.add("is-enhanced");
    }

    if (coverageMapCard) {
        coverageMapCard.classList.add("is-enhanced");
    }
}

window.addEventListener("page:ready", (event) => {
    if (event.detail?.page === "home") {
        initHomeAnimations();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (pageName === "home") {
        initHomeAnimations();
    }
});