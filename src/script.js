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
        const isOpen = !mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(!isOpen));
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
        tags: ['React Native', 'Axios'],
        title: { fr: 'Application Mobile - Gestion Produits', en: 'Mobile App - Product Management' },
        desc: {
            fr: 'Application mobile connectee a une API Node.js permettant de gerer un catalogue produits.',
            en: 'Mobile application connected to a Node.js API for managing a product catalog.'
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
        return '<article class="proj-card">'
            + '<div class="proj-idx">' + num + ' -</div>'
            + '<span class="proj-badge">' + p.label + '</span>'
            + '<h3 class="proj-title">' + p.title[currentLang] + '</h3>'
            + '<p class="proj-desc">' + p.desc[currentLang] + '</p>'
            + '<div class="proj-tags">' + tags + '</div>'
            + '<a href="' + p.url + '"' + target + ' class="proj-link">' + viewLabel + ' <span>&#8594;</span></a>'
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
