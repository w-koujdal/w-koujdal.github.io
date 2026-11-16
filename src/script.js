/* ════════════════════════════════════════════════════════════
   Walid Koujdal — portfolio scrollytelling
   1. Données (traductions + projets)  ← c'est ici qu'on édite le contenu
   2. Utilitaires
   3. Chrome : thème, menu, langue
   4. Chapitres projets (générés depuis `projects`)
   5. Moteur de scroll + scènes
   6. Modales, curseur, divers
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';

var root = document.documentElement;
var SM = root.classList.contains('sm');          // false → animations réduites, page statique

/* ── 1. DONNÉES ─────────────────────────────────────────────── */

// Le français est lu dans le HTML (attributs data-key) ; seul l'anglais est déclaré ici.
var EN = {
    nav_home: 'Home',
    nav_profile: 'Profile',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    hero_tag: 'Full Stack Developer',
    hero_greeting: 'Hi, I\'m <span class="accent">Walid</span><br>and I\'m a Full&nbsp;Stack developer',
    hero_desc: 'Passionate about web development, I love creating complete, modern, and high-performance applications.',
    hero_btn_portfolio: 'My Projects',
    hero_btn_cv: 'My Resume',
    hero_hint: 'Scroll',
    manifesto_eye: 'Approach',
    manifesto: 'I build complete applications, from the back-end to the interface. <em>Simple, useful, well thought-out</em> — and always user-first.',
    profile_title: 'My Profile',
    profile_hint: 'Three moments, one trajectory.',
    profile_card1_title: 'The Spark',
    profile_card1_desc: 'Curious by nature, I discovered the world of coding by exploring HTML, CSS and JavaScript. I quickly became passionate about interface creation, which naturally led me to web development.',
    profile_card2_title: 'Education',
    profile_card2_desc: 'Holder of a title of IT Project Coordinator. I have acquired solid skills in Full Stack development as well as cloud infrastructure.',
    profile_card3_title: 'My Vision',
    profile_card3_desc: 'I place great importance on accessibility, performance and aesthetics. I believe in simple, useful and well-thought-out interfaces, always user-oriented. I enjoy solving real problems with creativity.',
    skills_title: 'Skills',
    skills_cat_tools: 'Tools &amp; Methods',
    skill_pm: 'Project Management (PMBOK)',
    skill_arch: 'Project Architecture',
    skill_tests: 'API Testing',
    skill_cloud: 'Cloud (Basics)',
    projects_title: 'Projects',
    projects_sub: 'projects, told screen by screen',
    contact_pre: 'What now?',
    contact_title: 'Have an idea or a project?',
    contact_desc: 'I usually reply within 24 to 48 hours.',
    contact_btn: 'Send Me an Email'
};

// Libellés utilisés par les chapitres projets
var UI = {
    fr: { visit: 'Voir le site', gallery: 'Galerie', demo: 'Voir la démo', pro: 'Pro', personal: 'Personnel', open: 'Ouvrir la galerie de', copied: 'Copié !', copiedSr: 'Adresse email copiée' },
    en: { visit: 'Visit site', gallery: 'Gallery', demo: 'Watch demo', pro: 'Professional', personal: 'Personal', open: 'Open gallery for', copied: 'Copied!', copiedSr: 'Email address copied' }
};

/* Projets — un chapitre épinglé est généré pour chaque entrée.
   Pour en ajouter un : copier un bloc, déposer les captures dans src/Img/ et lister-les dans `shots`.
   - category : 'pro' | 'personal'
   - url      : lien du site ('#' = pas de lien public)
   - theme    : couleurs du chapitre (fond, texte, accent)
   - shots    : captures dans l'ordre du récit. Paysage → cadre navigateur, portrait → cadre téléphone (automatique).
   - video    : (optionnel) chemin d'une vidéo de démo, ex. 'Img/demo.mp4' */
var projects = [
    {
        id: 'prestly',
        label: 'Prestly',
        category: 'pro',
        url: 'https://prestly.fr',
        theme: { bg: '#101010', fg: '#F5F2EA', accent: '#F5C400' },
        tags: ['Next.js 16', 'Supabase', 'Stripe', 'IA', 'React Native'],
        sub: { fr: 'SaaS de gestion pour artisans du bâtiment', en: 'Management SaaS for building trade craftsmen' },
        desc: {
            fr: 'SaaS de gestion pour artisans du bâtiment indépendants : devis générés par IA en quelques secondes (règles de chiffrage propres à 8 métiers), signature électronique, suivi des paiements et avis clients automatisés, avec une app mobile compagnon. Architecture multi-tenant sécurisée (RLS Postgres, CSP stricte, backups chiffrés AES-256-GCM).',
            en: 'Management SaaS for independent building trade craftsmen: AI-generated quotes in seconds (pricing rules tailored to 8 trades), e-signature, payment tracking and automated client reviews, plus a companion mobile app. Secure multi-tenant architecture (Postgres RLS, strict CSP, AES-256-GCM encrypted backups).'
        },
        shots: [
            { src: 'Img/prestly.webp',                  fr: 'Page d\'accueil',        en: 'Landing page' },
            { src: 'Img/prestly-dashboard.webp',        fr: 'Tableau de bord',        en: 'Dashboard' },
            { src: 'Img/prestly-devis-liste.webp',      fr: 'Liste des devis',        en: 'Quotes list' },
            { src: 'Img/prestly-rendez-vous.webp',      fr: 'Rendez-vous',            en: 'Appointments' },
            { src: 'Img/prestly-clients.webp',          fr: 'Clients',                en: 'Clients' },
            { src: 'Img/prestly-devis-detail.webp',     fr: 'Détail d\'un devis',     en: 'Quote detail' },
            { src: 'Img/prestly-factures.webp',         fr: 'Factures',               en: 'Invoices' },
            { src: 'Img/prestly-devis-ia.webp',         fr: 'Devis généré par IA',    en: 'AI-generated quote' },
            { src: 'Img/prestly-booking.webp',          fr: 'Réservation en ligne',   en: 'Online booking' },
            { src: 'Img/prestly-artisans-listing.webp', fr: 'Annuaire des artisans',  en: 'Craftsmen directory' }
        ]
    },
    {
        id: 'paradise',
        label: 'Paradise',
        category: 'pro',
        url: 'https://paradise-saintgratien.vercel.app/',
        theme: { bg: '#6E2C0D', fg: '#FFF3E2', accent: '#FFA75E' },
        tags: ['Next.js', 'TypeScript', 'Supabase', 'React'],
        sub: { fr: 'Bar à dessert — site vitrine', en: 'Dessert bar — showcase website' },
        desc: {
            fr: 'Site vitrine pour un bar à dessert à Saint-Gratien : carte des produits, présentation du concept, événements et informations pratiques, avec Supabase comme backend.',
            en: 'Showcase website for a dessert bar in Saint-Gratien: product menu, concept presentation, events and practical info, powered by Supabase as backend.'
        },
        shots: [
            { src: 'Img/paradise.webp',          fr: 'Page d\'accueil',  en: 'Home page' },
            { src: 'Img/paradise-mobile-1.webp', fr: 'Accueil mobile',   en: 'Mobile home' },
            { src: 'Img/paradise-mobile-2.webp', fr: 'Le concept',       en: 'The concept' },
            { src: 'Img/paradise-mobile-3.webp', fr: 'La carte',         en: 'The menu' },
            { src: 'Img/paradise-mobile-4.webp', fr: 'Nous trouver',     en: 'Find us' }
        ]
    },
    {
        id: 'mesnotes',
        label: 'Mes Notes',
        category: 'personal',
        url: '#',
        theme: { bg: '#0D1F2A', fg: '#E4F1F4', accent: '#62C6D6' },
        tags: ['Flutter', 'Rust', 'ONNX Runtime', 'SQLite'],
        sub: { fr: 'Bibliothécaire personnel', en: 'Personal librarian' },
        desc: {
            fr: 'App de prise de notes Android qui retrouve tes notes par le sens plutôt que par les mots exacts, grâce à un moteur de recherche sémantique 100% embarqué : chaque note est convertie en vecteur via un modèle MiniLM exécuté localement (pont FFI Flutter ↔ Rust ↔ ONNX Runtime), sans jamais dépendre d\'une API cloud. Dictée vocale, tags intelligents suggérés par IA, import en masse et corbeille avec restauration.',
            en: 'Android note-taking app that finds your notes by meaning rather than exact keywords, powered by a fully on-device semantic search engine: each note is turned into a vector via a locally-run MiniLM model (Flutter ↔ Rust ↔ ONNX Runtime FFI bridge), with zero cloud dependency. Voice dictation, AI-suggested smart tags, bulk text import and a trash with restore.'
        },
        shots: [
            { src: 'Img/mesnotes-liste.webp',     fr: 'Mes notes',             en: 'Notes list' },
            { src: 'Img/mesnotes-recherche.webp', fr: 'Recherche sémantique',  en: 'Semantic search' },
            { src: 'Img/mesnotes-note.webp',      fr: 'Édition d\'une note',   en: 'Note editor' },
            { src: 'Img/mesnotes-corbeille.webp', fr: 'Corbeille',             en: 'Trash' }
        ]
    }
];

/* ── 2. UTILITAIRES ─────────────────────────────────────────── */
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
function map(p, a, b) { return clamp((p - a) / (b - a)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function pad(n) { return String(n).padStart(2, '0'); }
function rnd(i, k) { var x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); }
function offsetTo(el, ancestor) {
    var x = 0, y = 0;
    while (el && el !== ancestor) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
    return { x: x, y: y };
}

// Découpe un texte en mots <span class="w"> en conservant le balisage interne (<em>, <span>…)
function splitWords(el) {
    (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
            if (ch.nodeType === 3) {
                var frag = document.createDocumentFragment();
                ch.textContent.split(/([ \t\n\r]+)/).forEach(function (tok) {
                    if (!tok) return;
                    if (/^[ \t\n\r]+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
                    var sp = document.createElement('span');
                    sp.className = 'w';
                    sp.textContent = tok;
                    frag.appendChild(sp);
                });
                node.replaceChild(frag, ch);
            } else if (ch.nodeType === 1 && ch.tagName !== 'BR') { walk(ch); }
        });
    })(el);
    return $$('.w', el);
}
function splitChars(el) {
    var text = el.textContent;
    el.textContent = '';
    text.split('').forEach(function (c, i) {
        var sp = document.createElement('span');
        sp.className = 'ch';
        sp.style.setProperty('--i', i);
        sp.textContent = c;
        el.appendChild(sp);
    });
}

/* ── 3. CHROME : année, thème, menu, langue ─────────────────── */
var yearEl = $('#copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

$$('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
        root.classList.toggle('dark');
        try { localStorage.theme = root.classList.contains('dark') ? 'dark' : 'light'; } catch (e) {}
    });
});

var menuBtn = $('#menu-btn');
var mobileMenu = $('#mobile-menu');
function setMenu(open) {
    mobileMenu.classList.toggle('hidden', !open);
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
}
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () { setMenu(mobileMenu.classList.contains('hidden')); });
    $$('a', mobileMenu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
}

// Dictionnaire FR construit depuis le HTML (avant tout découpage du texte)
var FR = {};
$$('[data-key]').forEach(function (el) {
    var key = el.getAttribute('data-key');
    if (!(key in FR)) FR[key] = el.innerHTML;
});
var translations = { fr: FR, en: EN };
var currentLang = 'fr';
try { if (localStorage.lang === 'en') currentLang = 'en'; } catch (e) {}

/* ── 4. CHAPITRES PROJETS ───────────────────────────────────── */
var INTRO = .9;       // durée (en écrans) de l'entrée d'un chapitre projet
var PER_SHOT = .42;   // durée (en écrans) allouée à chaque capture
var projStates = [];

function buildProjects() {
    var host = $('#projects-root');
    if (!host) return;
    var count = $('#proj-count');
    if (count) count.textContent = projects.length;

    host.innerHTML = projects.map(function (p, i) {
        var len = (INTRO + p.shots.length * PER_SHOT).toFixed(2);
        var hostName = p.url !== '#' ? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : p.label.toLowerCase().replace(/\s+/g, '') + '.app';
        var imgs = p.shots.map(function (s, j) {
            return '<img src="' + s.src + '" alt="" ' + (j === 0 ? 'class="on"' : 'loading="lazy"') + ' decoding="async">';
        }).join('');
        var tags = p.tags.map(function (t) { return '<span class="proj-tag">' + t + '</span>'; }).join('');
        var visit = p.url !== '#'
            ? '<a class="proj-btn solid" href="' + p.url + '" target="_blank" rel="noopener noreferrer"><b data-ui="visit"></b> <span>&#8599;</span></a>' : '';
        var video = p.video
            ? '<button type="button" class="proj-btn proj-video-btn" data-video="' + p.video + '">&#9654; <b data-ui="demo"></b></button>' : '';
        var miniLink = p.url !== '#'
            ? '<a href="' + p.url + '" target="_blank" rel="noopener noreferrer"><b data-ui="visit"></b> &#8599;</a>' : '';

        return '<section class="scene over proj" id="proj-' + p.id + '" data-scene="project" data-pid="' + p.id + '"'
            + ' style="--len:' + len + ';--p-bg:' + p.theme.bg + ';--p-fg:' + p.theme.fg + ';--p-accent:' + p.theme.accent + '">'
            + '<div class="stage"><div class="stage-inner">'
            + '<div class="proj-water" aria-hidden="true">' + p.label + ' — ' + p.label + '</div>'
            + '<div class="proj-layout">'
            +   '<div class="proj-info">'
            +     '<div class="proj-idx pi-item">' + pad(i + 1) + ' / ' + pad(projects.length) + ' <span class="proj-cat" data-ui="' + p.category + '"></span></div>'
            +     '<h3 class="proj-name pi-item">' + p.label + '</h3>'
            +     '<p class="proj-sub pi-item" data-pf="sub"></p>'
            +     '<p class="proj-desc pi-item" data-pf="desc"></p>'
            +     '<div class="proj-tags pi-item">' + tags + '</div>'
            +     '<div class="proj-links pi-item">' + visit
            +       '<button type="button" class="proj-btn proj-gallery-btn" data-pid="' + p.id + '"><b data-ui="gallery"></b> <span>&#8594;</span></button>'
            +       video
            +     '</div>'
            +   '</div>'
            +   '<div class="proj-right">'
            +     '<div class="proj-mini"><span>' + p.label + '</span>' + miniLink + '</div>'
            +     '<div class="proj-device-area"><div class="proj-device">'
            +       '<button type="button" class="proj-frame" data-pid="' + p.id + '">'
            +         '<span class="frame-bar" aria-hidden="true"><i></i><i></i><i></i><em>' + hostName + '</em></span>'
            +         '<span class="frame-screen">' + imgs + '</span>'
            +       '</button>'
            +     '</div></div>'
            +     '<div class="proj-caption"><span class="cap-count"></span><span class="cap-text"><span></span></span><span class="cap-rail"><i></i></span></div>'
            +   '</div>'
            + '</div>'
            + '</div></div></section>';
    }).join('');

    projStates = projects.map(function (p) {
        var el = $('#proj-' + p.id);
        var ps = {
            p: p, el: el, cur: -1,
            area: $('.proj-device-area', el), device: $('.proj-device', el), frame: $('.proj-frame', el),
            imgs: $$('.frame-screen img', el), info: $('.proj-info', el), items: $$('.pi-item', el),
            water: $('.proj-water', el), mini: $('.proj-mini', el),
            count: $('.cap-count', el), capWrap: $('.cap-text', el), cap: $('.cap-text span', el), rail: $('.cap-rail i', el)
        };
        ps.imgs.forEach(function (im) { im.addEventListener('load', function () { layoutFrame(ps); }); });
        return ps;
    });
}

// Le cadre épouse le ratio de la capture active : paysage → navigateur, portrait → téléphone.
function layoutFrame(ps) {
    if (ps.cur < 0) return;
    var im = ps.imgs[ps.cur];
    var r = im.naturalWidth ? im.naturalWidth / im.naturalHeight : 1.6;
    var W = ps.area.clientWidth, H = ps.area.clientHeight;
    if (!W || !H) return;
    var phone = r < 1;
    var bar = phone ? 0 : 30, chrome = phone ? 16 : 2;
    var w = Math.min(W, (H - bar - chrome) * r + chrome);
    var h = (w - chrome) / r + bar + chrome;
    ps.frame.style.width = Math.round(w) + 'px';
    ps.frame.style.height = Math.round(h) + 'px';
    ps.frame.classList.toggle('is-phone', phone);
}
function setShot(ps, i) {
    if (ps.cur === i) return;
    var first = ps.cur < 0;
    ps.cur = i;
    ps.imgs.forEach(function (im, j) { im.classList.toggle('on', j === i); });
    layoutFrame(ps);
    ps.count.textContent = pad(i + 1) + ' / ' + pad(ps.imgs.length);
    ps.cap.textContent = ps.p.shots[i][currentLang];
    if (!first) {
        ps.capWrap.classList.remove('swap');
        void ps.capWrap.offsetWidth;
        ps.capWrap.classList.add('swap');
    }
}
function fillProjectText() {
    var ui = UI[currentLang];
    $$('[data-ui]').forEach(function (el) { el.textContent = ui[el.getAttribute('data-ui')]; });
    projStates.forEach(function (ps) {
        $$('[data-pf]', ps.el).forEach(function (el) { el.textContent = ps.p[el.getAttribute('data-pf')][currentLang]; });
        ps.frame.setAttribute('aria-label', ui.open + ' ' + ps.p.label);
        if (ps.cur >= 0) ps.cap.textContent = ps.p.shots[ps.cur][currentLang];
    });
}

buildProjects();
projStates.forEach(function (ps) { setShot(ps, 0); });

/* ── 5. MOTEUR DE SCROLL ────────────────────────────────────── */
/* Chaque scène reçoit, à chaque frame :
     s.p   0→1  progression pendant qu'elle est épinglée (lissée)
     s.inn 0→1  elle glisse par-dessus la scène précédente
     s.out 0→1  la scène suivante la recouvre                       */
var scenes = [];
var byName = {};
var vw = window.innerWidth, vh = window.innerHeight, mobile = false, force = true;

$$('.scene').forEach(function (el) {
    var s = {
        el: el, name: el.getAttribute('data-scene'),
        stage: $('.stage', el), inner: $('.stage-inner', el),
        hasOut: el.getAttribute('data-out') !== '0',
        p: 0, out: 0, inn: 0, init: false, ink: null, accent: null, top: 0, h: 1, sh: 1,
        _r: -1, _o: -1
    };
    scenes.push(s);
    if (s.name !== 'project') byName[s.name] = s;
});

/* — Hero : le nom s'écarte, le portrait rejoint sa place, le texte arrive — */
(function () {
    var s = byName.hero; if (!s) return;
    $$('[data-chars]', s.el).forEach(splitChars);
    var L = $('.hero-line-l', s.el), R = $('.hero-line-r', s.el);
    var slot = $('.hero-slot', s.el), photo = $('.hero-photo', s.el);
    var items = $$('.hero-i', s.el), hint = $('.hero-hint', s.el);
    var track = $('.marquee-track', s.el);
    if (track) track.innerHTML += track.innerHTML;       // boucle sans couture
    var dx = 0, dy = 0, s0 = .6;
    s.measure = function () {
        s0 = parseFloat(getComputedStyle(slot).getPropertyValue('--s0')) || .6;
        var o = offsetTo(slot, s.inner);
        dx = s.inner.offsetWidth / 2 - (o.x + slot.offsetWidth / 2);
        dy = s.inner.offsetHeight * .5 - (o.y + slot.offsetHeight / 2);
    };
    s.update = function () {
        var p = s.p;
        var t = easeInOut(map(p, .06, .6));
        photo.style.transform = 'translate3d(' + (dx * (1 - t)) + 'px,' + (dy * (1 - t)) + 'px,0) rotate(' + (-6 * (1 - t)) + 'deg) scale(' + lerp(s0, 1, t) + ')';
        var a = easeInOut(map(p, .1, .62)), fade = 1 - map(p, .3, .56);
        L.style.transform = 'translate3d(' + (-a * 75) + 'vw,0,0)';
        R.style.transform = 'translate3d(' + (a * 75) + 'vw,0,0)';
        L.style.opacity = R.style.opacity = fade;
        items.forEach(function (el, i) {
            var q = easeOut(map(p, .46 + i * .07, .72 + i * .07));
            el.style.opacity = q;
            el.style.transform = 'translate3d(0,' + ((1 - q) * 40) + 'px,0)';
            el.style.pointerEvents = q < .5 ? 'none' : '';
        });
        hint.style.opacity = 1 - map(p, 0, .08);
    };
})();

/* — Manifeste : les mots s'allument un à un — */
(function () {
    var s = byName.manifesto; if (!s) return;
    var text = $('.manifesto-text', s.el), words = [];
    s.collect = function () { words = splitWords(text); };
    s.update = function () {
        var f = map(s.p, .04, .86) * (words.length + 1);
        for (var i = 0; i < words.length; i++) words[i].style.opacity = .13 + .87 * clamp(f - i);
        text.style.transform = 'translate3d(0,' + lerp(24, -24, s.p) + 'px,0)';
    };
})();

/* — Profil : défilement horizontal — */
(function () {
    var s = byName.profile; if (!s) return;
    var track = $('.h-track', s.el), bar = $('.h-progress span', s.el);
    var nums = $$('.p-num', s.el).map(function (n) { return { el: n, panel: n.parentNode, c: 0 }; });
    var maxX = 0, W = 1;
    s.measure = function () {
        W = s.inner.offsetWidth;
        maxX = Math.max(0, track.scrollWidth - W);
        nums.forEach(function (n) { n.c = n.panel.offsetLeft + n.panel.offsetWidth / 2; });
    };
    s.update = function () {
        var t = map(s.p, .03, .97), x = -maxX * t;
        track.style.transform = 'translate3d(' + x + 'px,0,0)';
        bar.style.transform = 'scaleX(' + t + ')';
        nums.forEach(function (n) {
            var rel = (n.c + x - W / 2) / W;                       // -1 … 1 autour du centre
            n.el.style.transform = 'translate3d(' + (rel * 140) + 'px,0,0)';
        });
    };
})();

/* — Compétences : les tags épars viennent se ranger — */
(function () {
    var s = byName.skills; if (!s) return;
    var tags = $$('.skill-tag', s.el), cats = $$('.skill-cat', s.el), head = $('.section-header', s.el);
    s.update = function () {
        var p = s.p, n = tags.length;
        tags.forEach(function (el, i) {
            var d = (i / n) * .48;
            var q = easeOut(map(p, .03 + d, .3 + d));
            if (q >= 1) {
                if (el._moving) { el.style.transform = ''; el.style.opacity = ''; el._moving = false; }
                return;
            }
            el._moving = true;
            var k = 1 - q;
            el.style.transform = 'translate3d(' + ((rnd(i, 1) - .5) * vw * .95 * k) + 'px,' + ((rnd(i, 2) - .5) * vh * .95 * k) + 'px,0) rotate(' + ((rnd(i, 3) - .5) * 100 * k) + 'deg) scale(' + lerp(.5, 1, q) + ')';
            el.style.opacity = Math.min(1, q * 2.5);
        });
        cats.forEach(function (c, i) {
            var q = easeOut(map(p, .08 + i * .12, .4 + i * .12));
            c.style.setProperty('--l', q);
            c.style.opacity = q;
        });
        head.style.transform = 'translate3d(0,' + lerp(30, 0, easeOut(map(p, 0, .3))) + 'px,0)';
    };
})();

/* — Carton « Projets » : deux rangées qui se croisent — */
(function () {
    var s = byName.pintro; if (!s) return;
    var rows = $$('.pi-row', s.el), mid = $('.pi-mid', s.el);
    s.update = function () {
        var t = (s.inn + s.p + s.out) / 3;                         // tout le temps où la scène est visible
        rows[0].style.transform = 'translate3d(' + lerp(-4, -38, t) + '%,0,0)';
        rows[1].style.transform = 'translate3d(' + lerp(-40, -6, t) + '%,0,0)';
        var q = easeOut(map(s.inn + s.p, .7, 1.25));
        mid.style.opacity = q;
        mid.style.transform = 'translate3d(0,' + ((1 - q) * 30) + 'px,0)';
    };
})();

/* — Chapitres projets — */
scenes.forEach(function (s) {
    if (s.name !== 'project') return;
    var ps = projStates.filter(function (x) { return x.el === s.el; })[0];
    var n = ps.imgs.length;
    var a = INTRO / (INTRO + n * PER_SHOT);                        // part de la progression dédiée à l'entrée
    s.ink = ps.p.theme.fg;
    s.accent = ps.p.theme.accent;
    s.measure = function () { layoutFrame(ps); };
    s.update = function () {
        var p = s.p;
        var t = easeOut(map(p, mobile ? a * .5 : -.02, a * .95));
        var k = 1 - t;
        var drift = lerp(-3, 3, map(p, a, 1)) * t;
        ps.device.style.transform = 'translate3d(0,' + (k * 30) + 'vh,0) rotateX(' + (k * 40) + 'deg) rotateY(' + drift + 'deg) rotateZ(' + (k * -5) + 'deg) scale(' + lerp(.8, 1, t) + ')';
        if (mobile) {
            var gone = map(p, a * .42, a * .68);
            ps.info.style.opacity = 1 - gone;
            ps.info.style.transform = 'translate3d(0,' + (-gone * 50) + 'px,0)';
            ps.info.style.pointerEvents = gone > .5 ? 'none' : '';
            ps.device.style.opacity = clamp(t * 3);
            ps.mini.style.opacity = map(p, a * .6, a);
            ps.items.forEach(function (el) { el.style.opacity = ''; el.style.transform = ''; });
        } else {
            ps.info.style.opacity = ps.info.style.transform = ps.info.style.pointerEvents = '';
            ps.device.style.opacity = '';
            ps.items.forEach(function (el, i) {
                var q = easeOut(map(p, a * i * .1, a * (.5 + i * .1)));
                el.style.opacity = q;
                el.style.transform = 'translate3d(0,' + ((1 - q) * 46) + 'px,0)';
            });
        }
        ps.water.style.transform = 'translate3d(' + lerp(6, -42, (s.inn + p + s.out) / 3) + '%,0,0)';
        var seq = map(p, a, 1);
        setShot(ps, Math.min(n - 1, Math.floor(seq * n)));
        ps.rail.style.transform = 'scaleX(' + seq + ')';
    };
});

/* — Contact : le point ambre envahit l'écran — */
(function () {
    var s = byName.contact; if (!s) return;
    var fill = $('.contact-fill', s.el), pre = $('.contact-pre', s.el), pulse = $('.contact-pulse', s.el);
    var title = $('.contact-h', s.el), items = $$('.c-i', s.el), words = [];
    s.collect = function () { words = splitWords(title); };
    s.update = function () {
        var p = s.p;
        var clip = 'circle(' + lerp(3.5, 95, easeInOut(map(p, .02, .6))) + 'vmax at 50% 62%)';
        fill.style.webkitClipPath = clip;
        fill.style.clipPath = clip;
        var g = map(p, .08, .34);
        pre.style.opacity = 1 - g;
        pre.style.transform = 'translate3d(0,' + (-g * 60) + 'px,0) scale(' + lerp(1, .9, g) + ')';
        pulse.style.visibility = p > .03 ? 'hidden' : '';
        var n = words.length;
        words.forEach(function (w, i) {
            var d = (i / n) * .26;
            var q = easeOut(map(p, .36 + d, .6 + d));
            w.style.opacity = q;
            w.style.transform = 'translate3d(0,' + ((1 - q) * 70) + '%,0) rotate(' + ((1 - q) * 6) + 'deg)';
        });
        items.forEach(function (el, i) {
            var q = easeOut(map(p, .62 + i * .07, .86 + i * .07));
            el.style.opacity = q;
            el.style.transform = 'translate3d(0,' + ((1 - q) * 30) + 'px,0)';
        });
        // la nav s'efface le temps que le disque la traverse, puis revient en encre sombre
        s.ink = p > .3 ? 'var(--accent-fg)' : null;
        s.accent = s.ink;
        root.style.setProperty('--nav-o', (Math.max(1 - map(p, .16, .24), map(p, .36, .46))).toFixed(3));
    };
})();

function collectAll() {
    scenes.forEach(function (s) { if (s.collect) s.collect(); });
    force = true;
}

function measure() {
    vw = window.innerWidth; vh = window.innerHeight;
    mobile = window.matchMedia('(max-width: 900px)').matches;
    var y = window.scrollY;
    scenes.forEach(function (s) {
        var r = s.el.getBoundingClientRect();
        s.top = r.top + y; s.h = r.height; s.sh = s.stage.offsetHeight || vh;
        if (s.measure) s.measure();
    });
    force = true;
}

/* — Rail de chapitres + encre de la nav — */
var rail = $('#rail'), railItems = [];
var progressBar = $('#progress span');
var navScene = null, lastInk, lastAccent;
function buildRail() {
    if (!rail) return;
    rail.innerHTML = '';
    railItems = scenes.filter(function (s) { return s.el.hasAttribute('data-rail'); }).map(function (s) {
        var li = document.createElement('li'), b = document.createElement('button');
        b.type = 'button'; b.tabIndex = -1;
        var key = s.el.getAttribute('data-rail');
        b.innerHTML = '<span data-key="' + key + '">' + (translations[currentLang][key] || '') + '</span>';
        b.addEventListener('click', function () { window.scrollTo({ top: s.top + 1, behavior: 'smooth' }); });
        li.appendChild(b); rail.appendChild(li);
        return { s: s, li: li };
    });
}
function updateChrome(y) {
    var cur = scenes[0];
    for (var i = 0; i < scenes.length; i++) if (scenes[i].top <= y + 34) cur = scenes[i];
    var ink = cur.ink, accent = cur.accent;
    if (ink !== lastInk) { lastInk = ink; ink ? root.style.setProperty('--nav-ink', ink) : root.style.removeProperty('--nav-ink'); }
    if (accent !== lastAccent) { lastAccent = accent; accent ? root.style.setProperty('--nav-accent', accent) : root.style.removeProperty('--nav-accent'); }
    if (cur !== navScene) {
        navScene = cur;
        var active = null;
        railItems.forEach(function (it) { if (it.s.top <= cur.top) active = it; });
        railItems.forEach(function (it) { it.li.classList.toggle('on', it === active); });
    }
    var max = document.documentElement.scrollHeight - vh;
    if (progressBar) progressBar.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max) : 0) + ')';
}

/* — Boucle — */
var lastT = 0;
function frame(now) {
    var dt = Math.min(.05, (now - lastT) / 1000 || .016);
    lastT = now;
    var k = 1 - Math.exp(-dt * 9);                                 // lissage indépendant du framerate
    var y = window.scrollY;

    for (var i = 0; i < scenes.length; i++) {
        var s = scenes[i];
        var outLen = s.hasOut ? s.sh : 0;
        var main = Math.max(1, s.h - s.sh - outLen);
        var d = y - s.top;
        var tp = clamp(d / main);
        var tout = outLen ? clamp((d - main) / outLen) : 0;
        var tin = clamp((d + s.sh) / s.sh);

        var np = s.init ? s.p + (tp - s.p) * k : tp;
        if (Math.abs(tp - np) < .0004) np = tp;
        var changed = force || !s.init || np !== s.p || tout !== s.out || tin !== s.inn;
        s.init = true;
        if (!changed) continue;
        s.p = np; s.out = tout; s.inn = tin;

        // habillage commun : coins arrondis à l'entrée, recul + assombrissement à la sortie
        var rad = i === 0 ? 0 : Math.round((1 - tin) * 30);
        if (rad !== s._r) { s._r = rad; s.stage.style.borderRadius = rad ? rad + 'px ' + rad + 'px 0 0' : ''; }
        if (tout !== s._o) {
            s._o = tout;
            if (tout > 0) {
                s.inner.style.transform = 'scale(' + (1 - .09 * tout) + ')';
                s.inner.style.borderRadius = (tout * 30) + 'px';
                s.stage.style.setProperty('--dim', (tout * .6).toFixed(3));
            } else {
                s.inner.style.transform = s.inner.style.borderRadius = '';
                s.stage.style.removeProperty('--dim');
            }
        }
        if (s.update) s.update();
    }
    force = false;
    updateChrome(y);
    updateCursor();
    requestAnimationFrame(frame);
}

/* ── Langue ─────────────────────────────────────────────────── */
var langText = $('#lang-text');
function updateLanguage(lang, initial) {
    currentLang = lang;
    var dict = translations[lang];
    if (!(initial && lang === 'fr')) {
        $$('[data-key]').forEach(function (el) {
            var key = el.getAttribute('data-key');
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });
    }
    root.lang = lang;
    if (langText) langText.textContent = lang.toUpperCase();
    try { localStorage.lang = lang; } catch (e) {}
    fillProjectText();
    if (SM) { collectAll(); measure(); }
}
var langBtn = $('#lang-toggle');
if (langBtn) langBtn.addEventListener('click', function () { updateLanguage(currentLang === 'fr' ? 'en' : 'fr'); });

/* ── 6. MODALES, CURSEUR, DIVERS ────────────────────────────── */

// Vidéo
var videoModal = $('#video-modal'), videoPlayer = $('#video-modal-player');
function openVideoModal(src) {
    videoPlayer.src = src;
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    videoPlayer.play();
}
function closeVideoModal() {
    if (!videoModal.classList.contains('open')) return;
    videoModal.classList.remove('open');
    videoPlayer.pause();
    videoPlayer.removeAttribute('src');
    document.body.style.overflow = '';
}
$('#video-modal-close').addEventListener('click', closeVideoModal);
$('#video-modal-backdrop').addEventListener('click', closeVideoModal);

// Galerie
var galleryModal = $('#gallery-modal'), galleryImg = $('#gallery-img');
var galleryDots = $('#gallery-dots'), galleryCounter = $('#gallery-counter');
var gImgs = [], gIdx = 0, gLabel = '', gOpener = null;
function renderGallery() {
    galleryImg.src = gImgs[gIdx];
    galleryImg.alt = gLabel + ' — capture ' + (gIdx + 1) + '/' + gImgs.length;
    galleryCounter.textContent = (gIdx + 1) + ' / ' + gImgs.length;
    galleryDots.innerHTML = gImgs.map(function (_, i) {
        return '<span class="g-dot' + (i === gIdx ? ' active' : '') + '" data-i="' + i + '"></span>';
    }).join('');
}
function openGallery(imgs, startIdx, label) {
    gImgs = imgs; gIdx = startIdx || 0; gLabel = label || '';
    gOpener = document.activeElement;
    renderGallery();
    galleryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('#gallery-close').focus();
}
function closeGallery() {
    if (!galleryModal.classList.contains('open')) return;
    galleryModal.classList.remove('open');
    document.body.style.overflow = '';
    if (gOpener && gOpener.focus) gOpener.focus();
}
function galleryGo(dir) { gIdx = (gIdx + dir + gImgs.length) % gImgs.length; renderGallery(); }

$('#gallery-close').addEventListener('click', closeGallery);
$('#gallery-backdrop').addEventListener('click', closeGallery);
$('#gallery-prev').addEventListener('click', function () { galleryGo(-1); });
$('#gallery-next').addEventListener('click', function () { galleryGo(1); });
galleryDots.addEventListener('click', function (e) {
    var dot = e.target.closest('.g-dot');
    if (dot) { gIdx = parseInt(dot.dataset.i, 10); renderGallery(); }
});
galleryImg.addEventListener('click', function (e) {
    var rect = galleryImg.getBoundingClientRect();
    galleryGo(e.clientX - rect.left < rect.width / 2 ? -1 : 1);
});
galleryImg.addEventListener('mousemove', function (e) {
    var rect = galleryImg.getBoundingClientRect();
    galleryImg.style.cursor = e.clientX - rect.left < rect.width / 2 ? 'w-resize' : 'e-resize';
});
var galSwipeX = 0;
galleryModal.addEventListener('touchstart', function (e) { galSwipeX = e.changedTouches[0].clientX; }, { passive: true });
galleryModal.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - galSwipeX;
    if (Math.abs(dx) > 40) galleryGo(dx < 0 ? 1 : -1);
}, { passive: true });

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeVideoModal(); closeGallery(); if (mobileMenu && !mobileMenu.classList.contains('hidden')) setMenu(false); }
    if (!galleryModal.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') galleryGo(-1);
    if (e.key === 'ArrowRight') galleryGo(1);
});

// Clics délégués : galerie (bouton ou cadre), vidéo, tooltips des compétences
document.addEventListener('click', function (e) {
    var videoBtn = e.target.closest('.proj-video-btn');
    if (videoBtn) { openVideoModal(videoBtn.dataset.video); return; }

    var opener = e.target.closest('.proj-gallery-btn, .proj-frame');
    if (opener) {
        var ps = projStates.filter(function (x) { return x.p.id === opener.dataset.pid; })[0];
        if (ps) openGallery(ps.p.shots.map(function (s) { return s.src; }), opener.classList.contains('proj-frame') ? Math.max(0, ps.cur) : 0, ps.p.label);
        return;
    }

    var tag = e.target.closest('.skill-tag[data-tip]');
    var wasOn = tag && tag.classList.contains('tip-on');
    $$('.skill-tag.tip-on').forEach(function (t) { t.classList.remove('tip-on'); });
    if (tag && !wasOn) tag.classList.add('tip-on');
});

// Copier l'adresse email
var copyBtn = $('#copy-email-btn'), copyFeedback = $('#copy-email-feedback');
if (copyBtn) {
    var copyTextEl = $('.copy-email-text', copyBtn);
    var copyOriginal = copyTextEl ? copyTextEl.textContent : '';
    copyBtn.addEventListener('click', function () {
        var email = copyBtn.dataset.email;
        var announce = function () {
            if (copyTextEl) copyTextEl.textContent = UI[currentLang].copied;
            if (copyFeedback) copyFeedback.textContent = UI[currentLang].copiedSr;
            setTimeout(function () {
                if (copyTextEl) copyTextEl.textContent = copyOriginal;
                if (copyFeedback) copyFeedback.textContent = '';
            }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(announce, function () {});
        } else {
            var tmp = document.createElement('textarea');
            tmp.value = email; tmp.style.position = 'fixed'; tmp.style.opacity = '0';
            document.body.appendChild(tmp); tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp);
            announce();
        }
    });
}

// Curseur d'accompagnement (souris uniquement)
var cursor = $('#cursor'), cOn = false, cx = 0, cy = 0, tx = 0, ty = 0;
if (cursor && SM && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!cOn) { cOn = true; cx = tx; cy = ty; cursor.classList.add('on'); }
    }, { passive: true });
    document.addEventListener('mouseover', function (e) {
        cursor.classList.toggle('hover', !!(e.target.closest && e.target.closest('a, button, .skill-tag')));
    });
    document.addEventListener('mouseleave', function () { cOn = false; cursor.classList.remove('on'); });
}
function updateCursor() {
    if (!cOn) return;
    cx += (tx - cx) * .22; cy += (ty - cy) * .22;
    cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
}

/* ── DÉMARRAGE ──────────────────────────────────────────────── */
buildRail();
updateLanguage(currentLang, true);

if (SM) {
    measure();
    requestAnimationFrame(frame);

    var resizeTimer;
    window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 120); });
    window.addEventListener('load', measure);

    // Loader : compte jusqu'à 100 pendant que les polices arrivent, puis lève le rideau
    var loader = $('#loader'), loaderNum = $('#loader-num');
    var fontsReady = false, t0 = performance.now(), DUR = 900;
    var done = function () { fontsReady = true; };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(done, done); else done();
    setTimeout(done, 2500);
    (function count(now) {
        var q = clamp((now - t0) / DUR);
        var v = Math.round(easeOut(q) * 100);
        if (q >= 1 && !fontsReady) v = 99;
        loaderNum.textContent = String(v).padStart(3, '0');
        if (q < 1 || !fontsReady) { requestAnimationFrame(count); return; }
        measure();
        root.classList.add('loaded');
        setTimeout(function () { if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 1100);
    })(t0);
} else {
    // Page statique : on pose simplement la première capture de chaque projet
    root.classList.add('loaded');
    var relayout = function () { projStates.forEach(layoutFrame); };
    window.addEventListener('resize', relayout);
    window.addEventListener('load', relayout);
    relayout();
}

})();
