/* ──────────────────────────────────────────────────────────────────
   Portfolio v2 — scrollytelling scaffold
   Libraries (loaded via CDN in index.html, pinned):
     gsap@3.15.0, gsap ScrollTrigger@3.15.0, lenis@1.3.26
   ────────────────────────────────────────────────────────────────── */

/* ══════════════════════════════════════════════════════════════════
   ✏️  VALEURS À ÉDITER À LA MAIN
   ══════════════════════════════════════════════════════════════════ */
var PLACES_PRISES = 0;            // nombre de places déjà prises (0 = "N places offertes")
var PLACES_TOTAL = 5;             // nombre total de places offertes
var DELAI_LIVRAISON_JOURS = 14;   // affiché en semaines : 14 → "environ 2 semaines"

(function () {
    'use strict';

    var NAV_H = 68;
    var html = document.documentElement;
    var lenis = null; // assigned later, only when motion is allowed and the CDN loaded

    /* ── 1. Theme (same localStorage contract as ../script.js) ───── */
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            html.classList.toggle('dark');
            localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
        });
    });

    /* ── 2. Copyright year ───────────────────────────────────────── */
    var yearEl = document.getElementById('copyright-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ── 3. Inject the editable values (static, visible in every mode) ── */
    var placesPrises = Math.min(Math.max(PLACES_PRISES, 0), PLACES_TOTAL);
    var placesRestantes = PLACES_TOTAL - placesPrises;
    var isFull = placesRestantes === 0;
    var isUntouched = placesPrises === 0;            // nothing taken yet → "offertes", no count-up
    var canCountUp = !isFull && !isUntouched;

    // Wording of the remaining places (pill + offer counter).
    var pillLabel = isFull ? 'Complet'
        : isUntouched ? PLACES_TOTAL + ' places offertes'
        : placesRestantes + (placesRestantes === 1 ? ' place restante' : ' places restantes');

    var delaiLabel = DELAI_LIVRAISON_JOURS < 7
        ? DELAI_LIVRAISON_JOURS + ' jour' + (DELAI_LIVRAISON_JOURS > 1 ? 's' : '')
        : 'environ ' + Math.round(DELAI_LIVRAISON_JOURS / 7) + ' semaine' + (Math.round(DELAI_LIVRAISON_JOURS / 7) > 1 ? 's' : '');

    var pillText = document.getElementById('places-pill-text');
    if (pillText) pillText.textContent = pillLabel;
    var pillBtn = document.getElementById('places-pill');
    if (pillBtn) pillBtn.setAttribute('aria-label', 'Voir l\'offre : ' + pillLabel);

    var counterEl = document.getElementById('offer-counter');
    var counterTotalEl = document.getElementById('offer-total');
    var counterLabelEl = document.getElementById('offer-label');
    function renderCounter(n) {
        if (isFull) {
            counterEl.textContent = 'Complet';
            if (counterTotalEl) counterTotalEl.hidden = true;
            if (counterLabelEl) counterLabelEl.hidden = true;
        } else if (isUntouched) {
            counterEl.textContent = PLACES_TOTAL;                 // "5 places offertes"
            if (counterTotalEl) counterTotalEl.hidden = true;
            if (counterLabelEl) counterLabelEl.textContent = 'places offertes';
        } else {
            counterEl.textContent = n;                            // "N/5 places restantes"
            if (counterLabelEl) counterLabelEl.textContent = placesRestantes === 1 ? 'place restante' : 'places restantes';
        }
    }
    if (counterEl) renderCounter(placesRestantes);

    document.querySelectorAll('[data-places-total]').forEach(function (el) { el.textContent = PLACES_TOTAL; });
    document.querySelectorAll('[data-delai]').forEach(function (el) { el.textContent = delaiLabel; });

    // Instagram CTA becomes a waiting list once everything is taken.
    if (isFull) {
        document.querySelectorAll('[data-ig-cta]').forEach(function (el) { el.textContent = 'Liste d\'attente'; });
    }

    /* ── 4. Shared scroll helper (Lenis when available, instant jump otherwise) */
    function scrollToEl(target) {
        if (!target) return;
        if (lenis) {
            lenis.scrollTo(target); // nav offset comes from CSS scroll-margin-top on [data-chapter]
        } else {
            window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - NAV_H);
        }
    }

    /* ── 5. Floating pill "X/10 places prises" ───────────────────── */
    var pill = document.getElementById('places-pill');
    var offerEl = document.getElementById('chapter-offer');
    var contactEl = document.getElementById('chapter-contact');

    if (pill) {
        pill.addEventListener('click', function () { scrollToEl(offerEl); });

        var setPillHidden = function (hidden) {
            pill.classList.toggle('opacity-0', hidden);
            pill.classList.toggle('translate-y-3', hidden);
            pill.classList.toggle('pointer-events-none', hidden);
            pill.inert = hidden;                     // also removes it from the tab order
            pill.setAttribute('aria-hidden', String(hidden));
        };

        // Hide the pill while the offer or the contact chapter is in view.
        // IntersectionObserver works in every mode (with or without Lenis / GSAP).
        if ('IntersectionObserver' in window) {
            var visibleChapters = [];
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var idx = visibleChapters.indexOf(entry.target);
                    if (entry.isIntersecting && idx === -1) visibleChapters.push(entry.target);
                    if (!entry.isIntersecting && idx !== -1) visibleChapters.splice(idx, 1);
                });
                setPillHidden(visibleChapters.length > 0);
            }, { threshold: 0 });
            [offerEl, contactEl].forEach(function (el) { if (el) io.observe(el); });
        }
    }

    /* ── 6. Full-screen menu ─────────────────────────────────────── */
    var menuBtn = document.getElementById('menu-btn');
    var overlay = document.getElementById('menu-overlay');
    var menuOpen = false;
    var lastFocus = null;

    if (menuBtn && overlay) {
        var FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
        var getFocusables = function () {
            // The hamburger (now an "X") stays reachable, then every control inside the overlay.
            return [menuBtn].concat(Array.prototype.slice.call(overlay.querySelectorAll(FOCUSABLE)));
        };

        var openMenu = function () {
            if (menuOpen) return;
            menuOpen = true;
            lastFocus = document.activeElement;
            overlay.hidden = false;
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.setAttribute('aria-label', 'Fermer le menu');
            html.classList.add('menu-open');           // CSS: overflow hidden on html/body
            if (lenis) lenis.stop();                   // pause smooth scroll + wheel/touch
            var first = overlay.querySelector(FOCUSABLE);
            if (first) first.focus({ preventScroll: true });
        };

        var closeMenu = function () {
            if (!menuOpen) return;
            menuOpen = false;
            overlay.hidden = true;
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Ouvrir le menu');
            html.classList.remove('menu-open');
            if (lenis) lenis.start();
            var target = (lastFocus && document.contains(lastFocus)) ? lastFocus : menuBtn;
            target.focus({ preventScroll: true });     // restore focus
            lastFocus = null;
        };

        menuBtn.addEventListener('click', function () {
            if (menuOpen) closeMenu(); else openMenu();
        });

        // Close on link tap. Registered before the Lenis anchor handler (section 9),
        // so lenis.start() runs before lenis.scrollTo().
        overlay.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function () { closeMenu(); });
        });

        // Close on tap outside any link/button of the menu (blank areas of the overlay).
        overlay.addEventListener('click', function (e) {
            if (!e.target.closest('a, button')) closeMenu();
        });

        // Close on tap anywhere outside the overlay (e.g. on the nav bar).
        document.addEventListener('click', function (e) {
            if (!menuOpen) return;
            if (overlay.contains(e.target) || menuBtn.contains(e.target)) return;
            closeMenu();
        });

        // Esc closes, Tab is trapped inside the menu.
        document.addEventListener('keydown', function (e) {
            if (!menuOpen) return;
            if (e.key === 'Escape') {
                e.preventDefault();
                closeMenu();
                return;
            }
            if (e.key !== 'Tab') return;
            var items = getFocusables();
            if (!items.length) return;
            var first = items[0];
            var last = items[items.length - 1];
            var active = document.activeElement;
            if (e.shiftKey && (active === first || items.indexOf(active) === -1)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && (active === last || items.indexOf(active) === -1)) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    /* ── 7. Reduced motion → static page, nothing else runs ──────── */
    var reduceMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotionMQ.matches) {
        html.classList.add('no-motion');
        return; // native scroll, no Lenis, no GSAP: values above are already shown directly
    }

    /* ── 8. Guard against a blocked CDN ──────────────────────────── */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        console.warn('[v2] GSAP / ScrollTrigger / Lenis not available — falling back to a static page.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Append ?debug to the URL to show ScrollTrigger markers while building chapters.
    var DEBUG = new URLSearchParams(location.search).has('debug');
    ScrollTrigger.defaults({ markers: DEBUG });

    /* ── 9. Lenis smooth scroll, synced with ScrollTrigger ───────── */
    lenis = new Lenis({
        autoRaf: false,          // GSAP's ticker drives Lenis so both share one rAF
        lerp: 0.1,
        smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);  // gsap ticker gives seconds, Lenis wants ms
    });
    gsap.ticker.lagSmoothing(0);

    // In-page anchors go through Lenis so pinned sections are accounted for.
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            scrollToEl(target);
        });
    });

    /* ── 10. Scroll progress bar (scrub example #1, all breakpoints) */
    gsap.to('#progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '#story',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });

    /* ── 11. Responsive + motion-aware animations ────────────────── */
    var mm = gsap.matchMedia();

    mm.add(
        {
            isDesktop: '(min-width: 768px)',
            isMobile: '(max-width: 767px)',
            reduceMotion: '(prefers-reduced-motion: reduce)'
        },
        function (context) {
            var c = context.conditions;

            // If the OS preference flips to "reduce" while the page is open,
            // this context reverts every tween/ScrollTrigger it created.
            if (c.reduceMotion) return;

            /* 11a. Chapter reveals — soft fade-up when a block enters.
                    Mobile gets a shorter, once-only version. */
            gsap.utils.toArray('[data-reveal]').forEach(function (el) {
                gsap.from(el, {
                    autoAlpha: 0,
                    y: c.isMobile ? 16 : 32,
                    duration: c.isMobile ? 0.5 : 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        once: c.isMobile,
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            /* 11b. Offer counter — counts 0 → remaining places once the chapter
                    scrolls in. Skipped when nothing is taken yet ("5 places offertes")
                    or when full ("Complet"): the static value is already shown. */
            if (counterEl && canCountUp) {
                var counter = { val: 0 };
                counterEl.textContent = '0';
                gsap.to(counter, {
                    val: placesRestantes,
                    duration: 1.4,
                    ease: 'power2.out',
                    snap: { val: 1 },
                    onUpdate: function () { counterEl.textContent = Math.round(counter.val); },
                    scrollTrigger: {
                        trigger: '#chapter-offer',
                        start: 'top 70%',
                        once: true
                    }
                });
            }

            if (c.isDesktop) {
                /* 11c. Hero photo parallax — scrubbed, desktop only. */
                gsap.to('[data-parallax]', {
                    yPercent: 18,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#chapter-intro',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });

                /* 11d. ★ PINNED SECTION + SCRUB EXAMPLE — Projects chapter.
                        The whole section is pinned while the horizontal track
                        is translated left in lock-step with the scrollbar. */
                var track = document.getElementById('projects-track');
                var panels = gsap.utils.toArray('[data-project-panel]');

                if (track && panels.length > 1) {
                    gsap.to(panels, {
                        xPercent: -100 * (panels.length - 1),
                        ease: 'none',
                        scrollTrigger: {
                            trigger: '#chapter-projects',
                            pin: true,
                            scrub: 1,                       // 1s catch-up for a softer feel
                            snap: {
                                snapTo: 1 / (panels.length - 1),
                                duration: { min: 0.2, max: 0.6 },
                                ease: 'power1.inOut'
                            },
                            end: function () {
                                return '+=' + (track.scrollWidth - window.innerWidth);
                            },
                            invalidateOnRefresh: true,
                            anticipatePin: 1
                        }
                    });
                }
            }

            // Mobile: no pin, no scrub beyond the progress bar — the panels
            // simply stack vertically (Tailwind flex-col) with the reveals above.

            // Cleanup when this context reverts (e.g. reduced motion turned on):
            // show the final value directly.
            return function () {
                if (counterEl) renderCounter(placesRestantes);
            };
        }
    );

    /* ── 12. Recalculate once images/fonts have settled ──────────── */
    window.addEventListener('load', function () {
        ScrollTrigger.refresh();
    });
})();
