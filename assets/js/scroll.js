/* ============================================================
   SCROLL — Reveal, Progress, Header, Nav Highlight
   ============================================================ */

(function () {
  'use strict';

  /* === REVEAL ON SCROLL === */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  /* === PROJECT CARDS STAGGER === */
  function initProjectCards() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-card');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach(c => c.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    });

    cards.forEach(c => observer.observe(c));
  }

  /* === SCROLL PROGRESS === */
  function initScrollProgress() {
    const line = document.getElementById('scrollLine');
    if (!line) return;

    let ticking = false;

    function update() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      line.style.width = progress + '%';
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* === HEADER SCROLLED STATE === */
  function initHeaderState() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;

    function update() {
      if (window.pageYOffset > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* === ACTIVE NAV LINK === */
  function initNavHighlight() {
    const navLinks = document.querySelectorAll('.nav__link, .mobile-nav a');
    if (!navLinks.length) return;

    const sections = Array.from(navLinks).map(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return null;
      const id = href.slice(1);
      return document.getElementById(id);
    }).filter(Boolean);

    if (!sections.length) return;

    let ticking = false;

    function update() {
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height')
      ) || 72;

      const scrollPos = window.pageYOffset + headerHeight + 100;
      let current = sections[0];

      for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
          current = section;
        }
      }

      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + current.id);
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* === INIT === */
  function init() {
    initReveal();
    initProjectCards();
    initScrollProgress();
    initHeaderState();
    initNavHighlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();