/* ============================================================
   EASTER EGG — Ctrl+K Terminal Emulator
   ============================================================ */

(function () {
  'use strict';

  const COMMANDS = {
    help: () => [
      'Available commands:',
      '  whoami     — display identity',
      '  role       — current role',
      '  focus      — current focus areas',
      '  projects   — list project categories',
      '  contact    — contact info',
      '  certs      — certifications',
      '  clear      — clear terminal',
      '  exit       — close terminal'
    ],
    whoami: () => ['abdelwahab_shendy', 'Cairo, Egypt'],
    role: () => ['Security Operations & Automation | eCIR | Building GRC Foundations'],
    focus: () => [
      '● SOC Operations     — ACTIVE',
      '● SOAR Automation    — ACTIVE',
      '● GRC Foundations    — IN PROGRESS'
    ],
    projects: () => [
      'Security (4):',
      '  → PhishOps (Automated Phishing Response)',
      '  → AD Attack Detection',
      '  → SOC Home Lab',
      '  → Enterprise Security Simulation',
      '',
      'Infrastructure (2):',
      '  → Enterprise Network (Dual-Stack)',
      '  → Windows Server Full Lab',
      '',
      'Programming (5):',
      '  → Smart BI (Graduation Project)',
      '  → Movie Market',
      '  → Programming Challenges',
      '  → OOP Mini Projects',
      '  → Database Design'
    ],
    contact: () => [
      'email:    abdelwahab.a.shendy@gmail.com',
      'linkedin: linkedin.com/in/abdelwahab-a-shendy',
      'github:   github.com/abdelwahab-a-shendy',
      'medium:   medium.com/@AAAS'
    ],
    certs: () => [
      '● eCIR — INE Security (Jun 2026)',
      '● Google Cybersecurity (Jul 2023)',
      '● Google IT Support (Feb 2023)',
      '● CCEP — Red Team Leaders (Apr 2026)'
    ],
    ls: () => ['projects/  about/  contact/  writeups/  certs/'],
    pwd: () => ['/home/abdelwahab/portfolio'],
    date: () => [new Date().toString()],
    echo: (args) => [args.join(' ') || '']
  };

  let terminalEl = null;
  let inputEl = null;
  let outputEl = null;

  function createTerminal() {
    const el = document.createElement('div');
    el.className = 'kbd-terminal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Terminal easter egg');
    el.innerHTML = `
      <div class="kbd-terminal__dialog">
        <div class="kbd-terminal__head">
          <span class="kbd-terminal__title">aas@portfolio — terminal</span>
          <button class="kbd-terminal__close" aria-label="Close terminal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="kbd-terminal__body" id="kbdOutput"></div>
        <div class="kbd-terminal__input-row">
          <span class="kbd-terminal__prompt">➜</span>
          <input type="text" class="kbd-terminal__input" id="kbdInput" placeholder="type 'help' for commands..." autocomplete="off" spellcheck="false">
        </div>
      </div>
    `;
    document.body.appendChild(el);

    terminalEl = el;
    inputEl = el.querySelector('#kbdInput');
    outputEl = el.querySelector('#kbdOutput');

    el.querySelector('.kbd-terminal__close').addEventListener('click', close);
    el.addEventListener('click', (e) => {
      if (e.target === el) close();
    });

    inputEl.addEventListener('keydown', handleKey);
  }

  function appendLine(text, cls = '') {
    const line = document.createElement('div');
    line.className = 'kbd-terminal__line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function appendEcho(cmd) {
    const line = document.createElement('div');
    line.className = 'kbd-terminal__line kbd-terminal__line--echo';
    line.innerHTML = `<span class="kbd-terminal__prompt">➜</span><span>${escapeHtml(cmd)}</span>`;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function handleKey(e) {
    if (e.key === 'Enter') {
      const raw = inputEl.value.trim();
      inputEl.value = '';
      if (!raw) {
        appendEcho('');
        return;
      }

      appendEcho(raw);

      const parts = raw.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (cmd === 'clear') {
        outputEl.innerHTML = '';
        return;
      }
      if (cmd === 'exit' || cmd === 'quit') {
        close();
        return;
      }

      const fn = COMMANDS[cmd];
      if (fn) {
        const result = fn(args);
        if (Array.isArray(result)) {
          result.forEach(line => appendLine(line));
        } else {
          appendLine(String(result));
        }
      } else {
        appendLine(`command not found: ${cmd}`, 'kbd-terminal__line--error');
        appendLine(`type 'help' to see available commands.`, 'kbd-terminal__line--muted');
      }
    }

    if (e.key === 'Escape') {
      close();
    }
  }

  function open() {
    if (!terminalEl) createTerminal();

    if (outputEl.children.length === 0) {
      appendLine('Welcome to abdelwahab_shendy terminal.', 'kbd-terminal__line--muted');
      appendLine("Type 'help' for available commands.", 'kbd-terminal__line--muted');
      appendLine('');
    }

    terminalEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputEl.focus(), 100);
  }

  function close() {
    if (!terminalEl) return;
    terminalEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function toggle() {
    if (terminalEl && terminalEl.classList.contains('is-open')) {
      close();
    } else {
      open();
    }
  }

  /* === GLOBAL KEY === */
  document.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggle();
    }
  });

  /* === HINT ON CONSOLE === */
  console.log(
    '%c➜ Press Ctrl+K to open the terminal',
    'color: #38BDF8; font-family: monospace; font-size: 14px; padding: 6px 12px; background: #0A1420; border-radius: 4px;'
  );

  console.log(
    '%c➜ abdelwahab_shendy — Security Operations & Automation | eCIR | Building GRC Foundations',
    'color: #10B981; font-family: monospace; font-size: 12px;'
  );
})();