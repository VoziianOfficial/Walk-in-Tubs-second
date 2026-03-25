const body = document.body;
const html = document.documentElement;

const header = document.getElementById("site-header");
const progressBar = document.querySelector(".site-progress");

const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuClose = document.querySelector(".mobile-menu__close");
const mobileMenuBackdrop = document.querySelector(".mobile-menu__backdrop");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

const cookieBanner = document.getElementById("cookie-banner");
const cookieButtons = document.querySelectorAll("[data-cookie-action]");

const faqRoots = document.querySelectorAll("[data-faq-root]");
const revealItems = document.querySelectorAll("[data-reveal]");

const themeToggle = document.querySelector("[data-theme-toggle]");

const COOKIE_STORAGE_KEY = "walkInTubCompareCookieConsent";
const THEME_STORAGE_KEY = "walkInTubCompareTheme";
const MOBILE_BREAKPOINT = 1024;

/* =========================
   UTILITIES
========================= */
function lockBodyScroll() {
    body.classList.add("menu-open");
}

function unlockBodyScroll() {
    body.classList.remove("menu-open");
}

function isDesktopViewport() {
    return window.innerWidth > MOBILE_BREAKPOINT;
}

/* =========================
   HEADER / PROGRESS
========================= */
function updateHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function updateProgressBar() {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
}

/* =========================
   MOBILE MENU
========================= */
function openMobileMenu() {
    if (!mobileMenu || !navToggle) return;

    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    navToggle.classList.add("is-active");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");

    lockBodyScroll();
}

function closeMobileMenu() {
    if (!mobileMenu || !navToggle) return;

    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");

    unlockBodyScroll();
}

function toggleMobileMenu() {
    if (!mobileMenu) return;

    const isOpen = mobileMenu.classList.contains("is-open");
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function initMobileMenu() {
    if (!navToggle || !mobileMenu) return;

    navToggle.addEventListener("click", toggleMobileMenu);
    mobileMenuClose?.addEventListener("click", closeMobileMenu);
    mobileMenuBackdrop?.addEventListener("click", closeMobileMenu);

    mobileMenuLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", () => {
        if (isDesktopViewport()) {
            closeMobileMenu();
        }
    });
}

/* =========================
   THEME TOGGLE
========================= */
function getSavedTheme() {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        /* ignore */
    }
}

function getPreferredTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
}

function applyTheme(theme) {
    html.setAttribute("data-theme", theme);

    if (!themeToggle) return;

    const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    themeToggle.setAttribute("aria-label", label);
}

function toggleTheme() {
    const currentTheme = html.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    saveTheme(nextTheme);
}

function initThemeToggle() {
    const theme = getPreferredTheme();
    applyTheme(theme);

    if (!themeToggle) return;
    themeToggle.addEventListener("click", toggleTheme);
}

/* =========================
   COOKIE CONSENT
========================= */
function getCookieConsent() {
    try {
        return localStorage.getItem(COOKIE_STORAGE_KEY);
    } catch {
        return null;
    }
}

function setCookieConsent(value) {
    try {
        localStorage.setItem(COOKIE_STORAGE_KEY, value);
    } catch {
        /* ignore */
    }
}

function showCookieBanner() {
    if (!cookieBanner) return;
    cookieBanner.hidden = false;
    requestAnimationFrame(() => cookieBanner.classList.add("is-visible"));
}

function hideCookieBanner() {
    if (!cookieBanner) return;
    cookieBanner.classList.remove("is-visible");

    window.setTimeout(() => {
        cookieBanner.hidden = true;
    }, 380);
}

function initCookieBanner() {
    if (!cookieBanner) return;

    const consent = getCookieConsent();
    if (!consent) {
        showCookieBanner();
    }

    cookieButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const action = button.dataset.cookieAction;
            if (!action) return;

            if (action === "accept") setCookieConsent("accepted");
            if (action === "decline") setCookieConsent("declined");

            hideCookieBanner();
        });
    });
}

/* =========================
   FAQ
========================= */
function closeFaqItem(item) {
    if (!item) return;

    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.setAttribute("aria-expanded", "false");
    answer.hidden = true;
    item.classList.remove("is-open");
}

function openFaqItem(item) {
    if (!item) return;

    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.setAttribute("aria-expanded", "true");
    answer.hidden = false;
    item.classList.add("is-open");
}

function initFaqAccordion() {
    if (!faqRoots.length) return;

    faqRoots.forEach((root) => {
        const items = root.querySelectorAll("[data-faq-item]");

        items.forEach((item) => {
            const button = item.querySelector(".faq-question");
            if (!button) return;

            button.addEventListener("click", () => {
                const isExpanded = button.getAttribute("aria-expanded") === "true";

                items.forEach((otherItem) => {
                    if (otherItem !== item) closeFaqItem(otherItem);
                });

                if (isExpanded) {
                    closeFaqItem(item);
                } else {
                    openFaqItem(item);
                }
            });
        });
    });
}

/* =========================
   REVEAL
========================= */
function initRevealObserver() {
    if (!revealItems.length) return;

    const supportsIntersectionObserver = "IntersectionObserver" in window;

    revealItems.forEach((item) => {
        const delay = item.dataset.delay;
        if (delay) {
            item.style.setProperty("--reveal-delay", `${delay}ms`);
        }
    });

    if (!supportsIntersectionObserver) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    revealItems.forEach((item) => observer.observe(item));
}

/* =========================
   EVENTS
========================= */
function handleGlobalKeydown(event) {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
}

function handleScroll() {
    updateHeaderState();
    updateProgressBar();
}

/* =========================
   PAGE READY
========================= */
function initPageScript() {
    const page = body.dataset.page;
    if (!page) return;

    const event = new CustomEvent("page:ready", {
        detail: { page },
    });

    window.dispatchEvent(event);
}

/* =========================
   GSAP SAFE INIT
========================= */
function initGsapDefaults() {
    if (!window.gsap) return;

    window.gsap.config({
        nullTargetWarn: false,
    });
}

/* =========================
   INIT
========================= */
function init() {
    initThemeToggle();

    updateHeaderState();
    updateProgressBar();

    initMobileMenu();
    initCookieBanner();
    initFaqAccordion();
    initRevealObserver();
    initGsapDefaults();
    initPageScript();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleGlobalKeydown);
}

document.addEventListener("DOMContentLoaded", init);