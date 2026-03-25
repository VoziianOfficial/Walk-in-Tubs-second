const legalPageName = document.body.dataset.page;

function initLegalPage() {
    if (legalPageName !== "legal") return;

    initLegalAnimations();
}

function initLegalAnimations() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const hasGsap = typeof window.gsap !== "undefined";
    if (!hasGsap) return;

    const { gsap } = window;

    if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
    }

    const heroContent = document.querySelector(".legal-hero__content");
    const heroNav = document.querySelector(".legal-hero__nav");
    const heroNavCards = document.querySelectorAll(".legal-nav-card");
    const sidebarCard = document.querySelector(".legal-sidebar__card");
    const sidebarLinks = document.querySelectorAll(".legal-sidebar__nav a");
    const legalArticle = document.querySelector(".legal-article");
    const legalSections = document.querySelectorAll(".legal-section");

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out",
        },
    });

    if (heroContent) {
        tl.fromTo(
            Array.from(heroContent.children),
            {
                y: 22,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.75,
                stagger: 0.08,
            }
        );
    }

    if (heroNav) {
        tl.fromTo(
            heroNav,
            {
                x: 24,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
            },
            "-=0.45"
        );
    }

    if (heroNavCards.length) {
        tl.fromTo(
            heroNavCards,
            {
                y: 10,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.06,
            },
            "-=0.45"
        );
    }

    if (sidebarCard && window.ScrollTrigger) {
        gsap.fromTo(
            sidebarCard,
            {
                y: 18,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sidebarCard,
                    start: "top 88%",
                    once: true,
                },
            }
        );
    }

    if (legalArticle && window.ScrollTrigger) {
        gsap.fromTo(
            legalArticle,
            {
                y: 22,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: legalArticle,
                    start: "top 88%",
                    once: true,
                },
            }
        );
    }

    if (legalSections.length && window.ScrollTrigger) {
        gsap.fromTo(
            legalSections,
            {
                y: 16,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: legalSections[0].parentElement || legalSections[0],
                    start: "top 86%",
                    once: true,
                },
            }
        );
    }

    initLegalHover(gsap, heroNavCards, sidebarLinks);
}

function initLegalHover(gsap, navCards, sidebarLinks) {
    navCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -2,
                duration: 0.22,
                ease: "power2.out",
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                duration: 0.22,
                ease: "power2.out",
            });
        });
    });

    sidebarLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            gsap.to(link, {
                x: 3,
                duration: 0.2,
                ease: "power2.out",
            });
        });

        link.addEventListener("mouseleave", () => {
            gsap.to(link, {
                x: 0,
                duration: 0.2,
                ease: "power2.out",
            });
        });
    });
}

window.addEventListener("page:ready", (event) => {
    if (event.detail?.page === "legal") {
        initLegalPage();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (legalPageName === "legal") {
        initLegalPage();
    }
});