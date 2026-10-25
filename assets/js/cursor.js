/* ============================================================
   CURSOR — Custom Dot + Ring
   ============================================================ */

(function () {
  'use strict';

  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || prefersReduced) return;

  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (!cursor || !cursorDot) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let dotX = 0, dotY = 0;
  let rafId = null;
  let isVisible = false;

  const RING_EASE = 0.16;
  const DOT_EASE = 0.35;

  function animate() {
    ringX += (mouseX - ringX) * RING_EASE;
    ringY += (mouseY - ringY) * RING_EASE;

    dotX += (mouseX - dotX) * DOT_EASE;
    dotY += (mouseY - dotY) * DOT_EASE;

    cursor.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

    rafId = requestAnimationFrame(animate);
  }

  function show() {
    if (isVisible) return;
    isVisible = true;
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  function hide() {
    isVisible = false;
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  /* === EVENTS === */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Set initial position to avoid jump on first move
    if (!isVisible) {
      ringX = dotX = mouseX;
      ringY = dotY = mouseY;
      show();
    }
  }, { passive: true });

  document.addEventListener('mouseleave', hide);
  document.addEventListener('mouseenter', show);

  /* === HOVER STATES === */
  const hoverables = 'a, button, [role="button"], .btn, .nav__link, .filter__btn, .project-card, .skill-card, .focus-card, .cred-card, .writeup-card, .training-card, .journey__tab, input, textarea, .hero__scroll';

  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '48px';
      cursor.style.height = '48px';
      cursor.style.borderColor = 'var(--cyan-bright)';
      cursor.style.opacity = '0.6';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '32px';
      cursor.style.height = '32px';
      cursor.style.borderColor = 'var(--cyan-bright)';
      cursor.style.opacity = '1';
    });
  });

  /* === HIDE ON SCROLL OVERFLOW === */
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    hide();
    scrollTimer = setTimeout(() => {
      if (document.body.matches(':hover')) show();
    }, 400);
  }, { passive: true });
})();