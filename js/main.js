const body = document.body;
const html = document.documentElement;

const header = document.getElementById("site-header");
const progressBar = document.querySelector(".site-progress");

const navToggle = document.querySelector(".nav-toggle");
const navToggleIcon = navToggle?.querySelector("i");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuClose = document.querySelector(".mobile-menu__close");
const mobileMenuBackdrop = document.querySelector(".mobile-menu__backdrop");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

const cookieBanner = document.getElementById("cookie-banner");
const cookieButtons = document.querySelectorAll("[data-cookie-action]");

const faqRoots = document.querySelectorAll("[data-faq-root]");
const revealItems = document.querySelectorAll("[data-reveal]");

const themeToggles = document.querySelectorAll("[data-theme-toggle]");

const COOKIE_STORAGE_KEY = "walkInTubCompareCookieConsent";
const THEME_STORAGE_KEY = "walkInTubCompareTheme";
const MOBILE_BREAKPOINT = 1024;

let lastFocusedBeforeMenuOpen = null;

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

function getFocusableElements(container) {
    if (!container) return [];

    const selector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(",");

    return Array.from(container.querySelectorAll(selector)).filter((element) => {
        if (element.hasAttribute("disabled")) return false;
        if (element.getAttribute("aria-hidden") === "true") return false;
        return element.offsetParent !== null || element === document.activeElement;
    });
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
function setMobileMenuInitialState() {
    if (!mobileMenu || !navToggle) return;

    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.setAttribute("inert", "");
    mobileMenu.setAttribute("tabindex", "-1");

    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    if (navToggleIcon) {
        navToggleIcon.classList.remove("fa-xmark");
        navToggleIcon.classList.add("fa-bars-staggered");
    }
}

function openMobileMenu() {
    if (!mobileMenu || !navToggle) return;

    lastFocusedBeforeMenuOpen = document.activeElement;

    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    mobileMenu.removeAttribute("inert");

    navToggle.classList.add("is-active");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    if (navToggleIcon) {
        navToggleIcon.classList.remove("fa-bars-staggered");
        navToggleIcon.classList.add("fa-xmark");
    }

    lockBodyScroll();

    const focusables = getFocusableElements(mobileMenu);
    const target = mobileMenuClose || focusables[0] || mobileMenu;
    target.focus();
}

function closeMobileMenu({ restoreFocus = true } = {}) {
    if (!mobileMenu || !navToggle) return;

    if (document.activeElement && mobileMenu.contains(document.activeElement)) {
        navToggle.focus();
    }

    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.setAttribute("inert", "");

    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    if (navToggleIcon) {
        navToggleIcon.classList.remove("fa-xmark");
        navToggleIcon.classList.add("fa-bars-staggered");
    }

    unlockBodyScroll();

    if (restoreFocus) {
        if (
            lastFocusedBeforeMenuOpen &&
            typeof lastFocusedBeforeMenuOpen.focus === "function" &&
            document.contains(lastFocusedBeforeMenuOpen)
        ) {
            lastFocusedBeforeMenuOpen.focus();
        } else {
            navToggle.focus();
        }
    }
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

function trapFocusInMobileMenu(event) {
    if (!mobileMenu || !mobileMenu.classList.contains("is-open")) return;
    if (event.key !== "Tab") return;

    const focusableElements = getFocusableElements(mobileMenu);

    if (!focusableElements.length) {
        event.preventDefault();
        mobileMenu.focus();
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey) {
        if (activeElement === firstElement || !mobileMenu.contains(activeElement)) {
            event.preventDefault();
            lastElement.focus();
        }
    } else {
        if (activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
}

function initMobileMenu() {
    if (!navToggle || !mobileMenu) return;

    setMobileMenuInitialState();

    navToggle.addEventListener("click", toggleMobileMenu);
    mobileMenuClose?.addEventListener("click", () => closeMobileMenu());
    mobileMenuBackdrop?.addEventListener("click", () => closeMobileMenu());

    mobileMenuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu({ restoreFocus: false });
        });
    });

    window.addEventListener("resize", () => {
        if (isDesktopViewport() && mobileMenu.classList.contains("is-open")) {
            closeMobileMenu({ restoreFocus: false });
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

    if (!themeToggles.length) return;

    themeToggles.forEach((toggle) => {
        const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        toggle.setAttribute("aria-label", label);
        toggle.setAttribute("title", label);
    });
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

    if (!themeToggles.length) return;

    themeToggles.forEach((toggle) => {
        toggle.addEventListener("click", toggleTheme);
    });
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
        return;
    }

    trapFocusInMobileMenu(event);
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
