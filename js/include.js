function getBasePrefix() {
  const script =
    document.currentScript || document.querySelector('script[src*="include.js"]');
  if (!script) return './';

  try {
    const scriptUrl = new URL(script.getAttribute('src'), window.location.href);
    const segments = scriptUrl.pathname.split('/').filter(Boolean);

    segments.pop();
    if (segments[segments.length - 1] === 'js') segments.pop();

    return segments.length ? `/${segments.join('/')}/` : '/';
  } catch (error) {
    console.error('Problème de calcul du chemin de base :', error);
    return './';
  }
}

async function load(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(url);

    // Vérifie si la requête a réussi 
    if (!res.ok) throw new Error(`Erreur chargement ${url} : ${res.status}`);

    el.innerHTML = await res.text();

    // Mise à jour de l’année si nécessaire
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
  } catch (error) {
    console.error('Problème JS :', error);


    el.innerHTML = '<p>Erreur de chargement du menu.</p>';
  }
}

function applyBasePrefix(prefix) {
  const setWithPrefix = (el, attr) => {
    const value = el.getAttribute(attr) || '';
    if (!value) return;

    // Ignore liens absolus externes ou déjà normalisés
    if (/^(https?:|mailto:|tel:)/i.test(value)) return;
    if (
      value.startsWith(prefix) ||
      value.startsWith('./') ||
      value.startsWith('../')
    )
      return;

    el.setAttribute(attr, prefix + value.replace(/^\/+/, ''));
  };

  // Cas spécial : éléments avec data-path (on force le bon chemin)
  document.querySelectorAll('[data-path]').forEach((node) => {
    const target = node.getAttribute('data-path') || '';
    if (!target) return;

    if (node.hasAttribute('href')) node.setAttribute('href', prefix + target);
    else if (node.hasAttribute('src')) node.setAttribute('src', prefix + target);
  });

  // Normalise les liens/ressources qui commencent par /
  [
    ['a[href^="/"]', 'href'],
    ['link[href^="/"]', 'href'],
    ['img[src^="/"]', 'src'],
    ['script[src^="/"]', 'src'],
    ['source[src^="/"]', 'src'],
    ['use[href^="/"]', 'href'],
  ].forEach(([selector, attr]) => {
    document.querySelectorAll(selector).forEach((el) => setWithPrefix(el, attr));
  });
}

const basePrefix = getBasePrefix();

// Chargement des headers/footers + header mobile du feed (autonome)
const loadTasks = [
  ['#site-header', 'includes/header.html'],
  ['#site-footer', 'includes/footer.html'],
  ['#feed-header-mobile-container', 'includes/header_feed.html'],
].map(([selector, path]) => load(selector, `${basePrefix}${path}`));

const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}


// GESTIONNAIRE DE CLICS UNIFIÉ (PC & MOBILE)

document.addEventListener('click', function (e) {
  // --- 1) Gestion menu accueil (navigation principale) ---
  const navBar = document.querySelector('.nav-bar');
  const burgerAccueil = e.target.closest('.hamburger');

  if (burgerAccueil && navBar) {
    burgerAccueil.classList.toggle('active');
    navBar.classList.toggle('active');
  }

  // Fermeture automatique du menu Accueil au clic sur un lien
  if (navBar && e.target.closest('.nav-bar a')) {
    const burger = document.querySelector('.hamburger');
    if (burger) burger.classList.remove('active');
    navBar.classList.remove('active');
  }

  // --- 2) Gestion menu feed app (sidebar mobile) ---
  const feedBurger = e.target.closest('.feed-burger-btn');
  const closeBtn = e.target.closest('.close-sidebar'); 
  const overlayClick = e.target.closest('.feed-overlay'); 

  const feedSidebar = document.querySelector('.feed-sidebar-menu');
  const feedOverlay = document.querySelector('.feed-overlay');

  if (feedSidebar) {
    // Ouvrir
    if (feedBurger) {
      feedSidebar.classList.add('active');
      if (feedOverlay) feedOverlay.classList.add('active');
    }

    // Fermer 
    if (closeBtn || overlayClick) {
      feedSidebar.classList.remove('active');
      if (feedOverlay) feedOverlay.classList.remove('active');
    }
  }
});


function highlightCurrentPage() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const currentPath = parts.pop() || 'index.html'; 

  document.querySelectorAll('.nav-bar ul li a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.includes(currentPath)) link.classList.add('active');
  });
}

Promise.all(loadTasks).then(() => {
  applyBasePrefix(basePrefix);
  highlightCurrentPage();
});