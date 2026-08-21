// Copyright year
const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Dark Mode Toggle
const themeToggleBtns = document.querySelectorAll('.theme-toggle');
const htmlElement = document.documentElement;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

themeToggleBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        htmlElement.classList.toggle('dark');
        localStorage.theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    });
});

// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
    });
    document.querySelectorAll('#mobile-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Language Toggle
const langToggleBtn = document.getElementById('lang-toggle');
const mobileLangToggleBtn = document.getElementById('mobile-lang-toggle');
const langText = document.getElementById('lang-text');

// Build FR dictionary from the HTML
const frTranslations = {};
document.querySelectorAll('[data-key]').forEach(function(el) {
    var key = el.getAttribute('data-key');
    if (!(key in frTranslations)) frTranslations[key] = el.innerHTML;
});
frTranslations.view_project = 'Voir le projet';

var translations = {
    fr: frTranslations,
    en: {
        nav_home: 'Home',
        nav_profile: 'Profile',
        nav_skills: 'Skills',
        nav_projects: 'Projects',
        hero_greeting: 'Hi, I\'m <span class="accent">Walid</span><br>and I am a Full Stack developer',
        hero_desc: 'Passionate about web development, I love creating complete, modern, and high-performance applications.',
        hero_btn_portfolio: 'My Portfolio',
        hero_btn_cv: 'My Resume',
        profile_title: 'My Profile',
        profile_card1_title: 'The Spark',
        profile_card1_desc: 'Curious by nature, I discovered the world of coding by exploring HTML, CSS and JavaScript. I quickly became passionate about interface creation, which naturally led me to web development.',
        profile_card2_title: 'Education',
        profile_card2_desc: 'Holder of a title of IT Project Coordinator. I have acquired solid skills in Full Stack development as well as cloud infrastructure.',
        profile_card3_title: 'My Vision',
        profile_card3_desc: 'I place great importance on accessibility, performance and aesthetics. I believe in simple, useful and well-thought-out interfaces, always user-oriented.',
        skills_title: 'Skills',
        skill_pm: 'Project Management (PMBOK)',
        skill_arch: 'Project Architecture',
        skill_tests: 'API Testing',
        skill_cloud: 'Cloud (Basics)',
        projects_title: 'Projects',
        filter_all: 'All',
        filter_pro: 'Professional',
        filter_personal: 'Personal',
        view_project: 'View Project',
        contact_title: 'Have an idea or a project?',
        contact_desc: 'Find all my links at the bottom of the page to contact me.',
        contact_btn: 'Get in Touch'
    }
};

// Projects data
var projects = [
    {
        id: 'prestly',
        label: 'Prestly',
        category: 'personal',
        url: 'https://prestly.fr',
        img: 'Img/prestly.png',
        tags: ['Next.js 16', 'Supabase', 'Stripe', 'IA', 'React Native'],
        title: { fr: 'Prestly - SaaS de Gestion pour Artisans du Bâtiment', en: 'Prestly - Management SaaS for Building Trade Craftsmen' },
        desc: {
            fr: 'SaaS de gestion pour artisans du bâtiment indépendants : devis générés par IA en quelques secondes (règles de chiffrage propres à 8 métiers), signature électronique, suivi des paiements et avis clients automatisés, avec une app mobile compagnon. Architecture multi-tenant sécurisée (RLS Postgres, CSP stricte, backups chiffrés AES-256-GCM).',
            en: 'Management SaaS for independent building trade craftsmen: AI-generated quotes in seconds (pricing rules tailored to 8 trades), e-signature, payment tracking and automated client reviews, plus a companion mobile app. Secure multi-tenant architecture (Postgres RLS, strict CSP, AES-256-GCM encrypted backups).'
        }
    },
    {
        id: 'cyna',
        label: 'CYNA',
        category: 'pro',
        url: '#',
        tags: ['Node.js', 'MySQL', 'React', 'API REST'],
        title: { fr: 'CYNA - Plateforme SaaS E-commerce', en: 'CYNA - E-commerce SaaS Platform' },
        desc: {
            fr: 'Plateforme SaaS permettant aux entreprises de gerer leurs produits, commandes et utilisateurs via une API REST et une interface web/mobile.',
            en: 'SaaS platform allowing companies to manage their products, orders, and users via a REST API and a web/mobile interface.'
        }
    },
    {
        id: 'api-saas',
        label: 'API SaaS',
        category: 'pro',
        url: '#',
        tags: ['Node.js', 'Express', 'JWT'],
        title: { fr: 'API SaaS - Produits & Modules', en: 'SaaS API - Products & Modules' },
        desc: {
            fr: 'API REST securisee permettant l\'ajout, modification et suppression de modules SaaS (CRUD complet).',
            en: 'Secure REST API allowing the addition, modification, and deletion of SaaS modules (full CRUD).'
        }
    },
    {
        id: 'mobile-app',
        label: 'Mobile App',
        category: 'personal',
        url: '#',
        imgs: [
            'Img/login.png',
            'Img/Screenshot_20260508_232406_CynaMobile.png',
            'Img/Screenshot_20260508_232352_CynaMobile.png',
            'Img/Screenshot_20260508_232358_CynaMobile.png',
            'Img/Screenshot_20260508_232345_CynaMobile.png',
            'Img/Screenshot_20260508_230030_CynaMobile.png'
        ],
        tags: ['React Native', 'Expo', 'Node.js', 'Axios', 'AsyncStorage'],
        title: { fr: 'CYNA — Application Mobile SaaS', en: 'CYNA — SaaS Mobile Application' },
        desc: {
            fr: 'Application mobile full-stack connectee a une API REST Node.js. Catalogue produits, panier persistant, paiement, historique des commandes et mode sombre.',
            en: 'Full-stack mobile application connected to a Node.js REST API. Product catalog, persistent cart, payment, order history and dark mode.'
        }
    },
    {
        id: 'paradise',
        label: 'Paradise',
        category: 'personal',
        url: 'https://paradise-saintgratien.vercel.app/',
        imgs: [
            'Img/paradise.png',
            'Img/paradise-mobile-1.png',
            'Img/paradise-mobile-2.png',
            'Img/paradise-mobile-3.png',
            'Img/paradise-mobile-4.png'
        ],
        tags: ['Next.js', 'TypeScript', 'Supabase', 'React'],
        title: { fr: 'Paradise - Bar à Dessert (Site Vitrine)', en: 'Paradise - Dessert Bar (Showcase Website)' },
        desc: {
            fr: 'Site vitrine pour un bar à dessert à Saint-Gratien : carte des produits, présentation du concept, événements et informations pratiques, avec Supabase comme backend.',
            en: 'Showcase website for a dessert bar in Saint-Gratien: product menu, concept presentation, events and practical info, powered by Supabase as backend.'
        }
    }
];

var currentLang = localStorage.lang || 'fr';
var activeFilter = 'all';

function renderProjects(filter) {
    activeFilter = filter;
    var grid = document.getElementById('projects-grid');
    if (!grid) return;

    var viewLabel = translations[currentLang].view_project;
    var list = filter === 'all' ? projects : projects.filter(function(p) { return p.category === filter; });

    grid.innerHTML = list.map(function(p, i) {
        var num = String(i + 1).padStart(2, '0');
        var target = p.url !== '#' ? ' target="_blank" rel="noopener noreferrer"' : '';
        var tags = p.tags.map(function(tag) { return '<span class="proj-tag">' + tag + '</span>'; }).join('');
        var imgHtml = '';
        if (p.imgs && p.imgs.length > 0) {
            var carImgs = p.imgs.map(function(src, i) {
                return '<img src="' + src + '" class="proj-car-img' + (i === 0 ? ' active' : '') + '" alt="' + p.label + '">';
            }).join('');
            var carDots = p.imgs.map(function(_, i) {
                return '<span class="car-dot' + (i === 0 ? ' active' : '') + '"></span>';
            }).join('');
            imgHtml = '<div class="proj-carousel" data-idx="0">'
                + carImgs
                + '<button class="car-prev" aria-label="Précédent">&#8592;</button>'
                + '<button class="car-next" aria-label="Suivant">&#8594;</button>'
                + '<div class="car-dots">' + carDots + '</div>'
                + '</div>';
        } else if (p.img) {
            imgHtml = '<img src="' + p.img + '" alt="' + p.label + '" class="proj-img">';
        }
        var videoBtn = p.video ? '<button type="button" class="proj-video-btn" data-video="' + p.video + '">&#9654; Voir la démo</button>' : '';
        return '<article class="proj-card">'
            + imgHtml
            + '<div class="proj-idx">' + num + ' -</div>'
            + '<span class="proj-badge">' + p.label + '</span>'
            + '<h3 class="proj-title">' + p.title[currentLang] + '</h3>'
            + '<p class="proj-desc">' + p.desc[currentLang] + '</p>'
            + '<div class="proj-tags">' + tags + '</div>'
            + videoBtn
            + (p.imgs && p.imgs.length > 0
                ? '<button type="button" class="proj-link proj-gallery-btn" data-pid="' + p.id + '">' + viewLabel + ' <span>&#8594;</span></button>'
                : '<a href="' + p.url + '"' + target + ' class="proj-link">' + viewLabel + ' <span>&#8594;</span></a>')
            + '</article>';
    }).join('');

    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.classList.toggle('f-active', btn.dataset.filter === filter);
    });
}

document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { renderProjects(btn.dataset.filter); });
});

renderProjects('all');

function updateLanguage(lang) {
    var dict = translations[lang];
    document.querySelectorAll('[data-key]').forEach(function(el) {
        var key = el.getAttribute('data-key');
        if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.documentElement.lang = lang;
    if (langText) langText.textContent = lang.toUpperCase();
    if (mobileLangToggleBtn) mobileLangToggleBtn.textContent = lang.toUpperCase();
    localStorage.lang = lang;
    renderProjects(activeFilter);
}

if (currentLang === 'fr') {
    document.documentElement.lang = 'fr';
} else {
    updateLanguage(currentLang);
}

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', function() {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        updateLanguage(currentLang);
    });
}

if (mobileLangToggleBtn) {
    mobileLangToggleBtn.addEventListener('click', function() {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        updateLanguage(currentLang);
    });
}

// Video modal
var videoModal = document.getElementById('video-modal');
var videoPlayer = document.getElementById('video-modal-player');

function openVideoModal(src) {
    videoPlayer.src = src;
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    videoPlayer.play();
}
function closeVideoModal() {
    videoModal.classList.remove('open');
    videoPlayer.pause();
    videoPlayer.src = '';
    document.body.style.overflow = '';
}

document.getElementById('video-modal-close').addEventListener('click', closeVideoModal);
document.getElementById('video-modal-backdrop').addEventListener('click', closeVideoModal);
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeVideoModal(); });

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('proj-video-btn')) {
        openVideoModal(e.target.dataset.video);
    }
});

// Gallery modal
var galleryModal = document.getElementById('gallery-modal');
var galleryImg = document.getElementById('gallery-img');
var galleryDots = document.getElementById('gallery-dots');
var galleryCounter = document.getElementById('gallery-counter');
var galleryCurrentImgs = [];
var galleryCurrentIdx = 0;

function openGallery(imgs, startIdx) {
    galleryCurrentImgs = imgs;
    galleryCurrentIdx = startIdx || 0;
    renderGallery();
    galleryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeGallery() {
    galleryModal.classList.remove('open');
    document.body.style.overflow = '';
}
function renderGallery() {
    galleryImg.src = galleryCurrentImgs[galleryCurrentIdx];
    galleryCounter.textContent = (galleryCurrentIdx + 1) + ' / ' + galleryCurrentImgs.length;
    galleryDots.innerHTML = galleryCurrentImgs.map(function(_, i) {
        return '<span class="g-dot' + (i === galleryCurrentIdx ? ' active' : '') + '" data-i="' + i + '"></span>';
    }).join('');
}
function galleryGo(dir) {
    galleryCurrentIdx = (galleryCurrentIdx + dir + galleryCurrentImgs.length) % galleryCurrentImgs.length;
    renderGallery();
}

document.getElementById('gallery-close').addEventListener('click', closeGallery);
document.getElementById('gallery-backdrop').addEventListener('click', closeGallery);
document.getElementById('gallery-prev').addEventListener('click', function() { galleryGo(-1); });
document.getElementById('gallery-next').addEventListener('click', function() { galleryGo(1); });
document.getElementById('gallery-dots').addEventListener('click', function(e) {
    var dot = e.target.closest('.g-dot');
    if (dot) { galleryCurrentIdx = parseInt(dot.dataset.i); renderGallery(); }
});
document.addEventListener('keydown', function(e) {
    if (!galleryModal.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') galleryGo(-1);
    if (e.key === 'ArrowRight') galleryGo(1);
    if (e.key === 'Escape') closeGallery();
});
document.addEventListener('click', function(e) {
    var btn = e.target.closest('.proj-gallery-btn');
    if (!btn) return;
    var pid = btn.dataset.pid;
    var project = projects.filter(function(p) { return p.id === pid; })[0];
    if (project && project.imgs) openGallery(project.imgs, 0);
});

// Carousel navigation
document.addEventListener('click', function(e) {
    var btn = e.target.closest('.car-prev, .car-next');
    if (!btn) return;
    e.stopPropagation();
    var carousel = btn.closest('.proj-carousel');
    if (!carousel) return;
    var imgs = carousel.querySelectorAll('.proj-car-img');
    var dots = carousel.querySelectorAll('.car-dot');
    var current = parseInt(carousel.dataset.idx) || 0;
    current = btn.classList.contains('car-prev')
        ? (current - 1 + imgs.length) % imgs.length
        : (current + 1) % imgs.length;
    imgs.forEach(function(img, i) { img.classList.toggle('active', i === current); });
    dots.forEach(function(dot, i) { dot.classList.toggle('active', i === current); });
    carousel.dataset.idx = current;
});

// Skill tooltips — clic pour mobile
document.querySelectorAll('.skill-tag[data-tip]').forEach(function(tag) {
    tag.addEventListener('click', function(e) {
        e.stopPropagation();
        var isOn = this.classList.contains('tip-on');
        document.querySelectorAll('.skill-tag.tip-on').forEach(function(t) { t.classList.remove('tip-on'); });
        if (!isOn) this.classList.add('tip-on');
    });
});
document.addEventListener('click', function() {
    document.querySelectorAll('.skill-tag.tip-on').forEach(function(t) { t.classList.remove('tip-on'); });
});

// ── SWIPE : carousel ────────────────────────────────────────
var carSwipeX = 0, carSwipeEl = null;
document.addEventListener('touchstart', function(e) {
    var c = e.target.closest('.proj-carousel');
    if (!c) return;
    carSwipeX = e.changedTouches[0].clientX;
    carSwipeEl = c;
}, { passive: true });
document.addEventListener('touchend', function(e) {
    if (!carSwipeEl) return;
    var dx = e.changedTouches[0].clientX - carSwipeX;
    if (Math.abs(dx) > 40) {
        var c = carSwipeEl;
        var imgs = c.querySelectorAll('.proj-car-img');
        var dots = c.querySelectorAll('.car-dot');
        var cur = parseInt(c.dataset.idx) || 0;
        cur = dx < 0 ? (cur + 1) % imgs.length : (cur - 1 + imgs.length) % imgs.length;
        imgs.forEach(function(img, i) { img.classList.toggle('active', i === cur); });
        dots.forEach(function(dot, i) { dot.classList.toggle('active', i === cur); });
        c.dataset.idx = cur;
    }
    carSwipeEl = null;
}, { passive: true });

// ── TAP carousel → ouvre la galerie à l'index courant ───────
document.addEventListener('click', function(e) {
    if (e.target.closest('.car-prev, .car-next')) return;
    var c = e.target.closest('.proj-carousel');
    if (!c) return;
    var card = c.closest('.proj-card');
    if (!card) return;
    var galleryBtn = card.querySelector('.proj-gallery-btn');
    if (!galleryBtn) return;
    var pid = galleryBtn.dataset.pid;
    var project = projects.filter(function(p) { return p.id === pid; })[0];
    if (project && project.imgs) openGallery(project.imgs, parseInt(c.dataset.idx) || 0);
});

// ── SWIPE : galerie modale ───────────────────────────────────
var galSwipeX = 0;
galleryModal.addEventListener('touchstart', function(e) {
    galSwipeX = e.changedTouches[0].clientX;
}, { passive: true });
galleryModal.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - galSwipeX;
    if (Math.abs(dx) > 40) galleryGo(dx < 0 ? 1 : -1);
}, { passive: true });
