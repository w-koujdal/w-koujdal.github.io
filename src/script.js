// Copyright year
const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Dark Mode Toggle
const themeToggleBtns = document.querySelectorAll('.theme-toggle');
const htmlElement = document.documentElement;

// Check for saved user preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

// Add event listener to ALL toggle buttons
themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });
});

// Mobile Menu
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");

if (btn && menu) {
    btn.addEventListener("click", () => {
        const isOpen = !menu.classList.toggle("hidden");
        btn.setAttribute("aria-expanded", String(!isOpen));
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Language Toggle
const langToggleBtn = document.getElementById(‘lang-toggle’);
const mobileLangToggleBtn = document.getElementById(‘mobile-lang-toggle’);
const langText = document.getElementById(‘lang-text’);

// Build FR dictionary from the HTML — the markup is the single source of truth for French
const frTranslations = {};
document.querySelectorAll(‘[data-key]’).forEach(el => {
    const key = el.getAttribute(‘data-key’);
    if (!(key in frTranslations)) frTranslations[key] = el.innerHTML;
});
// Keys used in dynamic renders (not in static HTML)
frTranslations.view_project = ‘Voir le projet’;

const translations = {
    fr: frTranslations,
    en: {
        nav_home: ‘Home’,
        nav_profile: ‘Profile’,
        nav_skills: ‘Skills’,
        nav_projects: ‘Projects’,
        hero_greeting: ‘Hi, I\’m <span class="text-indigo-500">Walid</span><br>and I am a Full Stack developer’,
        hero_desc: "Passionate about web development, I love creating complete, modern, and high-performance applications.",
        hero_btn_portfolio: ‘My Portfolio’,
        hero_btn_cv: ‘My Resume’,
        profile_title: ‘My Profile’,
        profile_card1_title: ‘The Spark’,
        profile_card1_desc: "Curious by nature, I discovered the world of coding by exploring HTML, CSS, and JavaScript. I quickly became passionate about interface creation, which naturally led me to web development.",
        profile_card2_title: ‘Education’,
        profile_card2_desc: "Holder of a title of IT Project Coordinator. I have acquired solid skills in Full Stack development as well as cloud infrastructure.",
        profile_card3_title: ‘My Vision’,
        profile_card3_desc: "I place great importance on accessibility, performance, and aesthetics. I believe in simple, useful, and well-thought-out interfaces, always user-oriented. I love solving real problems with creativity.",
        skills_title: ‘Skills’,
        skill_pm: ‘Project Management (PMBOK)’,
        skill_arch: ‘Project Architecture’,
        skill_tests: ‘API Testing’,
        skill_cloud: ‘Cloud (Basics)’,
        projects_title: ‘Projects’,
        filter_all: ‘All’,
        filter_pro: ‘Professional’,
        filter_personal: ‘Personal’,
        view_project: ‘View Project’,
        contact_title: ‘Have an idea or a project?’,
        contact_desc: ‘Find all my links at the bottom of the page to contact me.’,
        contact_btn: ‘Get in Touch’
    }
};

// Projects data — single source of truth for all project content
const projects = [
    {
        id: ‘cyna’,
        label: ‘CYNA’,
        category: ‘pro’,
        url: ‘#’,
        tags: [‘Node.js’, ‘MySQL’, ‘React’, ‘API REST’],
        title: { fr: ‘CYNA – Plateforme SaaS E-commerce’, en: ‘CYNA – E-commerce SaaS Platform’ },
        desc: {
            fr: "Plateforme SaaS permettant aux entreprises de gérer leurs produits, commandes et utilisateurs via une API REST et une interface web/mobile.",
            en: "SaaS platform allowing companies to manage their products, orders, and users via a REST API and a web/mobile interface."
        }
    },
    {
        id: ‘api-saas’,
        label: ‘API SaaS’,
        category: ‘pro’,
        url: ‘#’,
        tags: [‘Node.js’, ‘Express’, ‘JWT’],
        title: { fr: ‘API SaaS – Produits & Modules’, en: ‘SaaS API – Products & Modules’ },
        desc: {
            fr: "API REST sécurisée permettant l’ajout, modification et suppression de modules SaaS (CRUD complet).",
            en: "Secure REST API allowing the addition, modification, and deletion of SaaS modules (full CRUD)."
        }
    },
    {
        id: ‘mobile-app’,
        label: ‘Mobile App’,
        category: ‘personal’,
        url: ‘#’,
        tags: [‘React Native’, ‘Axios’],
        title: { fr: ‘Application Mobile – Gestion Produits’, en: ‘Mobile App – Product Management’ },
        desc: {
            fr: "Application mobile connectée à une API Node.js permettant de gérer un catalogue produits.",
            en: "Mobile application connected to a Node.js API for managing a product catalog."
        }
    }
];

let currentLang = localStorage.lang || ‘fr’;
let activeFilter = ‘all’;

const arrow = ‘<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>’;

function renderProjects(filter) {
    activeFilter = filter;
    const grid = document.getElementById(‘projects-grid’);
    if (!grid) return;

    const viewLabel = translations[currentLang].view_project;
    const list = filter === ‘all’ ? projects : projects.filter(p => p.category === filter);

    grid.innerHTML = list.map(p => `
        <div class="bg-white dark:bg-white/5 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 border border-midnight-indigo/5 dark:border-vanilla-cream/5 group reveal active">
            <div class="h-48 bg-gray-200 dark:bg-white/10 relative overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center text-midnight-indigo/20 dark:text-vanilla-cream/20 text-4xl font-bold group-hover:scale-105 transition duration-500">
                    ${p.label}
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-midnight-indigo dark:text-vanilla-cream mb-2">${p.title[currentLang]}</h3>
                <p class="text-midnight-indigo/70 dark:text-vanilla-cream/70 text-sm mb-4 leading-relaxed">${p.desc[currentLang]}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${p.tags.map(tag => `<span class="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full text-xs font-medium border border-indigo-500/20">${tag}</span>`).join(‘’)}
                </div>
                <a href="${p.url}"${p.url !== ‘#’ ? ‘ target="_blank" rel="noopener noreferrer"’ : ‘’} class="inline-flex items-center text-indigo-500 font-medium text-sm hover:text-indigo-600 transition">
                    ${viewLabel} ${arrow}
                </a>
            </div>
        </div>
    `).join(‘’);

    // Sync active state on filter buttons
    document.querySelectorAll(‘.filter-btn’).forEach(btn => {
        const isActive = btn.dataset.filter === filter;
        btn.className = isActive
            ? ‘filter-btn px-4 py-2 text-sm font-medium rounded-full transition bg-midnight-indigo text-vanilla-cream’
            : ‘filter-btn px-4 py-2 text-sm font-medium rounded-full transition text-midnight-indigo/60 dark:text-vanilla-cream/60 hover:text-midnight-indigo dark:hover:text-vanilla-cream’;
    });
}

// Wire up filter buttons
document.querySelectorAll(‘.filter-btn’).forEach(btn => {
    btn.addEventListener(‘click’, () => renderProjects(btn.dataset.filter));
});

// Initial render
renderProjects(‘all’);

function updateLanguage(lang) {
    const dict = translations[lang];
    document.querySelectorAll(‘[data-key]’).forEach(el => {
        const key = el.getAttribute(‘data-key’);
        if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.documentElement.lang = lang;
    if (langText) langText.textContent = lang.toUpperCase();
    if (mobileLangToggleBtn) mobileLangToggleBtn.textContent = lang.toUpperCase();
    localStorage.lang = lang;
    renderProjects(activeFilter);
}

// HTML already renders in French — only re-render if the user previously chose English
if (currentLang === ‘fr’) {
    document.documentElement.lang = ‘fr’;
} else {
    updateLanguage(currentLang);
}

if (langToggleBtn) {
    langToggleBtn.addEventListener(‘click’, () => {
        currentLang = currentLang === ‘fr’ ? ‘en’ : ‘fr’;
        updateLanguage(currentLang);
    });
}

if (mobileLangToggleBtn) {
    mobileLangToggleBtn.addEventListener(‘click’, () => {
        currentLang = currentLang === ‘fr’ ? ‘en’ : ‘fr’;
        updateLanguage(currentLang);
    });
}
