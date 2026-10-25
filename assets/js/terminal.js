/* ============================================================
   TERMINAL — Typewriter Effect for Hero
   ============================================================ */

(function () {
  'use strict';

  const LINES = [
    { type: 'cmd',    text: 'whoami' },
    { type: 'out',    text: 'abdelwahab_shendy',     cls: 'is-info' },
    { type: 'cmd',    text: 'cat headline.txt' },
    { type: 'out',    text: 'Security Operations & Automation | eCIR | Building GRC Foundations', cls: 'is-info' },
    { type: 'cmd',    text: 'cat status.txt' },
    { type: 'out',    text: '● Open to SOC & GRC opportunities', cls: 'is-success' },
    { type: 'cmd',    text: 'ls focus/' },
    { type: 'out',    text: 'soc/    automation/    grc_foundations/', cls: '' },
    { type: 'cmd',    text: 'system_status' },
    { type: 'out',    text: '● OPERATIONAL — Learning in public', cls: 'is-success' }
  ];

  const DELAY_BETWEEN = 350;
  const TYPE_SPEED = 35;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function createLine(type) {
    const line = document.createElement('div');
    line.className = 'terminal__line';

    if (type === 'cmd') {
      const prompt = document.createElement('span');
      prompt.className = 'terminal__prompt';
      prompt.textContent = '➜';

      const cmd = document.createElement('span');
      cmd.className = 'terminal__cmd';

      line.appendChild(prompt);
      line.appendChild(cmd);
      return { line, textTarget: cmd };
    }

    const out = document.createElement('span');
    out.className = 'terminal__output';
    line.appendChild(out);
    return { line, textTarget: out };
  }

  async function typeText(el, text, speed = TYPE_SPEED) {
    for (let i = 0; i < text.length; i++) {
      el.textContent += text.charAt(i);
      await sleep(speed);
    }
  }

  async function runTerminal(body) {
    // Clear initial content
    body.innerHTML = '';

    for (let i = 0; i < LINES.length; i++) {
      const item = LINES[i];
      const { line, textTarget } = createLine(item.type);
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;

      await typeText(textTarget, item.text, item.type === 'cmd' ? 45 : TYPE_SPEED);

      if (item.cls) textTarget.classList.add(item.cls);

      // Blinking cursor at end of line
      const cursor = document.createElement('span');
      cursor.className = 'terminal__cursor';
      line.appendChild(cursor);
      await sleep(DELAY_BETWEEN);
      cursor.remove();
    }

    // Add final cursor on last line
    const lastLine = body.lastElementChild;
    if (lastLine) {
      const cursor = document.createElement('span');
      cursor.className = 'terminal__cursor';
      lastLine.appendChild(cursor);
    }
  }

  function init() {
    const body = document.getElementById('terminalBody');
    if (!body) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      body.innerHTML = '';
      LINES.forEach(item => {
        const { line, textTarget } = createLine(item.type);
        textTarget.textContent = item.text;
        if (item.cls) textTarget.classList.add(item.cls);
        body.appendChild(line);
      });
      return;
    }

    // Delay start until loading screen is gone
    setTimeout(() => runTerminal(body), 2400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();