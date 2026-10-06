/* ──────────────────────────────────────────────────────────────────
   Portfolio v2 — scrollytelling scaffold
   Libraries (loaded via CDN in index.html, pinned):
     gsap@3.15.0, gsap ScrollTrigger@3.15.0, lenis@1.3.26
   ────────────────────────────────────────────────────────────────── */
(function () {
    'use strict';

    /* ── 1. Theme (same localStorage contract as ../script.js) ───── */
    var html = document.documentElement;
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

    /* ── 3. Reduced motion → static page, nothing else runs ──────── */
    var reduceMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotionMQ.matches) {
        html.classList.add('no-motion');
        return; // native scroll, no Lenis, no GSAP: every element stays in its CSS position
    }

    /* ── 4. Guard against a blocked CDN ──────────────────────────── */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        console.warn('[v2] GSAP / ScrollTrigger / Lenis not available — falling back to a static page.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Append ?debug to the URL to show ScrollTrigger markers while building chapters.
    var DEBUG = new URLSearchParams(location.search).has('debug');
    ScrollTrigger.defaults({ markers: DEBUG });

    /* ── 5. Lenis smooth scroll, synced with ScrollTrigger ───────── */
    var lenis = new Lenis({
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
            lenis.scrollTo(target, { offset: -68 }); // nav height
        });
    });

    /* ── 6. Scroll progress bar (scrub example #1, all breakpoints) ─ */
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

    /* ── 7. Responsive + motion-aware animations ─────────────────── */
    var mm = gsap.matchMedia();

    // Desktop: full scrollytelling (pin + scrub).
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

            /* 7a. Chapter reveals — soft fade-up when a block enters.
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

            if (c.isDesktop) {
                /* 7b. Hero photo parallax — scrubbed, desktop only. */
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

                /* 7c. ★ PINNED SECTION + SCRUB EXAMPLE — Projects chapter.
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
        }
    );

    /* ── 8. Recalculate once images/fonts have settled ───────────── */
    window.addEventListener('load', function () {
        ScrollTrigger.refresh();
    });
})();
