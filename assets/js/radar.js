/* ============================================================
   RADAR — Hero SOC Radar Canvas
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, DPR = 1;
  let cx = 0, cy = 0;
  let radius = 0;
  let sweepAngle = 0;
  let rafId = null;
  let isVisible = true;
  let lastTime = 0;

  // Pings (نقاط تظهر على الرادار)
  const pings = [];
  const PING_COUNT = 8;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createPing() {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 0.85 + 0.15; // 15% - 100% من الـ radius
    return {
      angle,
      dist,
      age: 0,
      maxAge: rand(2500, 4500),
      color: Math.random() > 0.85 ? '#F59E0B' : (Math.random() > 0.5 ? '#10B981' : '#0EA5E9')
    };
  }

  function resetPings() {
    pings.length = 0;
    for (let i = 0; i < PING_COUNT; i++) {
      const p = createPing();
      p.age = Math.random() * p.maxAge; // distribute ages
      pings.push(p);
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;

    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    cx = W / 2;
    cy = H / 2;
    radius = Math.min(W, H) / 2 * 0.9;
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.18)';
    ctx.lineWidth = 1;

    // Concentric circles (4 حلقات)
    for (let i = 1; i <= 4; i++) {
      const r = (radius / 4) * i;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Cross lines
    ctx.beginPath();
    ctx.moveTo(cx - radius, cy);
    ctx.lineTo(cx + radius, cy);
    ctx.moveTo(cx, cy - radius);
    ctx.lineTo(cx, cy + radius);
    ctx.stroke();

    // Diagonal lines (خيالية)
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.08)';
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 4) * (i * 2 + 1);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.stroke();
    }
  }

  function drawSweep() {
    // Sweep gradient (conic-like, simulated with radial)
    const sweepSize = Math.PI / 3; // 60 degrees

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(sweepAngle);

    const grad = ctx.createLinearGradient(0, 0, radius, 0);
    grad.addColorStop(0, 'rgba(14, 165, 233, 0)');
    grad.addColorStop(0.6, 'rgba(14, 165, 233, 0.15)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0.4)');

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, -sweepSize, 0);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Leading edge line
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius, 0);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  function drawPings(dt) {
    pings.forEach(p => {
      p.age += dt;

      if (p.age >= p.maxAge) {
        Object.assign(p, createPing());
        p.age = 0;
        p.maxAge = rand(2500, 4500);
      }

      const progress = p.age / p.maxAge;
      const x = cx + Math.cos(p.angle) * p.dist * radius;
      const y = cy + Math.sin(p.angle) * p.dist * radius;

      // Base dot
      const dotAlpha = 1 - progress;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = dotAlpha * 0.9;
      ctx.fill();

      // Expanding ring
      const ringRadius = 3 + progress * 20;
      ctx.beginPath();
      ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = (1 - progress) * 0.5;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.globalAlpha = 1;
    });
  }

  function drawCenter() {
    // Center point
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#0EA5E9';
    ctx.globalAlpha = 0.9;
    ctx.fill();

    // Center glow
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
    grad.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
    grad.addColorStop(1, 'rgba(14, 165, 233, 0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.globalAlpha = 1;
    ctx.fill();
  }

  function render(timestamp) {
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, W, H);

    drawGrid();

    if (!prefersReduced) {
      sweepAngle += 0.0006 * dt;
      if (sweepAngle > Math.PI * 2) sweepAngle -= Math.PI * 2;
      drawSweep();
      drawPings(dt);
    }

    drawCenter();

    rafId = requestAnimationFrame(render);
  }

  function start() {
    if (rafId) return;
    lastTime = performance.now();
    rafId = requestAnimationFrame(render);
  }

  function stop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // Pause when tab hidden or canvas off-screen
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (isVisible) start();
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden) start();
        else stop();
      });
    }, { threshold: 0 });
    io.observe(canvas);
  }

  // Resize (debounced)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (!prefersReduced) resetPings();
    }, 150);
  }, { passive: true });

  // Init
  function init() {
    resize();
    resetPings();

    if (prefersReduced) {
      // Static render — no animation
      ctx.clearRect(0, 0, W, H);
      drawGrid();
      drawCenter();
      return;
    }

    start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();