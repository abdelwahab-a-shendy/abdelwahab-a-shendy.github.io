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

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isOpen);
      mobileNav.hidden = isOpen;

      // Prevent body scroll when open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
        document.body.style.overflow = '';
      });
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileNav.hidden) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileNav.hidden &&
          !mobileNav.contains(e.target) &&
          !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
        document.body.style.overflow = '';
      }
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