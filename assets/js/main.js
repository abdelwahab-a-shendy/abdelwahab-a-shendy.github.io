/* ============================================================
   MAIN — Loading, Navigation, Init
   ============================================================ */

(function () {
  'use strict';

  /* === LOADING SCREEN === */
  function initLoadingScreen() {
    const loading = document.getElementById('loadingScreen');
    if (!loading) return;

    // Hide after animation (1.8s CSS + buffer)
    const hideDelay = 2000;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loading.classList.add('is-hidden');
        document.body.classList.add('is-loaded');
        // Remove from DOM after transition
        setTimeout(() => loading.remove(), 800);
      }, hideDelay);
    });

    // Fallback: force hide after 3s max
    setTimeout(() => {
      if (!loading.classList.contains('is-hidden')) {
        loading.classList.add('is-hidden');
        setTimeout(() => loading.remove(), 800);
      }
    }, 3500);
  }

/* === MOBILE NAV TOGGLE === */
function initMobileNav() {
  const toggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  function openNav() {
    toggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    if (mobileNav.classList.contains('is-open')) closeNav();
    else openNav();
  }

  toggle.addEventListener('click', toggleNav);

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeNav();
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!mobileNav.classList.contains('is-open')) return;
    if (mobileNav.contains(e.target)) return;
    if (toggle.contains(e.target)) return;
    closeNav();
  });
}

  /* === YEAR === */
  function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* === SMOOTH SCROLL FOR ANCHOR LINKS === */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#' || targetId.length < 2) return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const headerHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height')
        ) || 72;

        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      });
    });
  }

  /* === JOURNEY TABS === */
  function initJourneyTabs() {
    const tabs = document.querySelectorAll('.journey__tab');
    const panels = document.querySelectorAll('.journey__panel');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        if (!target) return;

        // Update tabs
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        // Update panels
        panels.forEach(p => p.classList.remove('is-active'));
        const activePanel = document.getElementById(`panel-${target}`);
        if (activePanel) activePanel.classList.add('is-active');
      });
    });
  }

  /* === INIT ALL === */
  function init() {
    initLoadingScreen();
    initMobileNav();
    initYear();
    initSmoothScroll();
    initJourneyTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();