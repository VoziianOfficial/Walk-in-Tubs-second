const contactPageName = document.body.dataset.page;

function initContactPage() {
    if (contactPageName !== "contact") return;

    initContactForm();
    initContactAnimations();
    initSuccessModal();
}

function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        form.reset();
        openSuccessModal();
    });
}

function initSuccessModal() {
    const modal = document.getElementById("success-modal");
    const closeButton = document.getElementById("success-modal-close");
    const actionButton = document.getElementById("success-modal-button");
    const backdrop = modal?.querySelector(".success-modal__backdrop");

    if (!modal) return;

    closeButton?.addEventListener("click", closeSuccessModal);
    actionButton?.addEventListener("click", closeSuccessModal);
    backdrop?.addEventListener("click", closeSuccessModal);

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-visible")) {
            closeSuccessModal();
        }
    });
}

function openSuccessModal() {
    const modal = document.getElementById("success-modal");
    if (!modal) return;

    modal.hidden = false;
    modal.classList.add("is-visible");
    document.body.classList.add("cookie-modal-open");
}

function closeSuccessModal() {
    const modal = document.getElementById("success-modal");
    if (!modal) return;

    modal.classList.remove("is-visible");
    modal.hidden = true;
    document.body.classList.remove("cookie-modal-open");
}

function initContactAnimations() {
    if (contactPageName !== "contact") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const hasGsap = typeof window.gsap !== "undefined";
    if (!hasGsap) return;

    const { gsap } = window;

    if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
    }

    const heroContent = document.querySelector(".contact-hero__content");
    const heroVisual = document.querySelector(".contact-hero__visual");
    const heroPanel = document.querySelector(".contact-hero__panel");
    const heroImage = document.querySelector(".contact-hero__panel img");
    const heroCards = document.querySelectorAll(".contact-hero__card");
    const heroHighlights = document.querySelectorAll(".contact-hero__highlights li");

    const optionCards = document.querySelectorAll(".contact-option-card");
    const sideCards = document.querySelectorAll(".contact-side-panel__card");
    const mapCard = document.querySelector(".contact-map__card");
    const mapSide = document.querySelector(".contact-map__side");
    const reassurancePanel = document.querySelector(".contact-reassurance__panel");

    initContactHero(gsap, {
        heroContent,
        heroVisual,
        heroPanel,
        heroImage,
        heroCards,
        heroHighlights,
    });

    createContactStagger(gsap, optionCards, {
        y: 24,
        duration: 0.72,
        stagger: 0.1,
        start: "top 84%",
    });

    createContactStagger(gsap, sideCards, {
        x: 18,
        duration: 0.72,
        stagger: 0.12,
        start: "top 84%",
    });

    if (mapCard && window.ScrollTrigger) {
        gsap.fromTo(
            mapCard,
            {
                y: 26,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: mapCard,
                    start: "top 84%",
                    once: true,
                },
            }
        );
    }

    if (mapSide && window.ScrollTrigger) {
        gsap.fromTo(
            mapSide,
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
                    trigger: mapSide,
                    start: "top 88%",
                    once: true,
                },
            }
        );
    }

    if (reassurancePanel && window.ScrollTrigger) {
        gsap.fromTo(
            reassurancePanel,
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
                    trigger: reassurancePanel,
                    start: "top 88%",
                    once: true,
                },
            }
        );
    }

    initContactParallax(gsap, heroImage, heroCards, mapCard);
    initContactHover(gsap);
}

function initContactHero(gsap, { heroContent, heroVisual, heroPanel, heroImage, heroCards, heroHighlights }) {
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

function createContactStagger(gsap, elements, options = {}) {
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

function initContactParallax(gsap, heroImage, heroCards, mapCard) {
    if (!window.ScrollTrigger) return;

    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
                trigger: ".contact-hero",
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
                    trigger: ".contact-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        });
    }

    if (mapCard) {
        const overlay = mapCard.querySelector(".contact-map__overlay");
        if (overlay) {
            gsap.to(overlay, {
                y: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: mapCard,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }
    }
}

function initContactHover(gsap) {
    const hoverCards = document.querySelectorAll(
        ".contact-option-card, .contact-side-panel__card, .contact-map__side"
    );

    hoverCards.forEach((card) => {
        const icon = card.querySelector(
            ".contact-option-card__icon, .contact-map__side-icon"
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

    const buttons = document.querySelectorAll(".contact-hero .button, .contact-form .button");

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
    if (event.detail?.page === "contact") {
        initContactPage();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (contactPageName === "contact") {
        initContactPage();
    }
});