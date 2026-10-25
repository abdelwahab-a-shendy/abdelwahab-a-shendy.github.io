/* ============================================================
   PROJECTS — Filter, Search, Modal
   ============================================================ */

(function () {
  'use strict';

  /* === MODAL DATA === */
  const PROJECT_DATA = {
    phishops: {
      title: 'PhishOps: Automated Phishing Detection & Response',
      meta: ['SOAR', 'Email Security', 'Threat Intel', 'Apr – May 2026'],
      sections: [
        { heading: 'Overview', items: [
          'End-to-end automated phishing analysis pipeline built with n8n',
          'Ingests emails via IMAP or webhook, parses EML/MSG artifacts',
          'Enriches indicators with VirusTotal & AbuseIPDB',
          'Applies heuristic social-engineering scoring engine',
          'Routes verdicts: Deliver / Investigate / Quarantine'
        ]},
        { heading: 'Pipeline Architecture', items: [
          'Ingestion: IMAP / Webhook (EML/MSG)',
          'Parsing: Custom JS normalization engine',
          'Pre-filtering: Whitelisting to preserve API quota',
          'Enrichment: DNS (HackerTarget) + IP (AbuseIPDB) + URL (VirusTotal)',
          'NLP: Social engineering keyword detection (urgency, financial, identity)',
          'Scoring: Heuristic risk engine (0-100)',
          'Routing: Switch node → Deliver / Investigate / Quarantine'
        ]},
        { heading: 'Detection Capabilities', items: [
          'SPF / DKIM / DMARC authentication analysis',
          'Domain alignment & spoofing detection',
          'Malicious URL detection (VirusTotal 70+ engines)',
          'IP reputation scoring (AbuseIPDB)',
          'Social engineering linguistic analysis (5 categories)',
          'Urgency & time-pressure pattern detection'
        ]},
        { heading: 'Shift-Aware Automation', items: [
          'Queries live Google Sheets schedule',
          'Routes alerts only to on-duty SOC analysts',
          'Sends HTML-formatted incident reports with full IoCs',
          'Automated end-user feedback (Safe / Quarantined)'
        ]}
      ]
    },
    'ad-attack': {
      title: 'Multi-Stage Active Directory Attack Detection',
      meta: ['ELK', 'Sigma', 'MITRE ATT&CK', 'Jan 2026'],
      sections: [
        { heading: 'Lab Architecture', items: [
          'Domain Controller: Windows Server 2019/2022',
          'Client: Windows 10/11',
          'SIEM: Ubuntu + ELK Stack',
          'Attacker: Ubuntu + Metasploit / Impacket'
        ]},
        { heading: 'Attack Chain (Red Team)', items: [
          '1. Initial Access — Reverse Shell (T1059)',
          '2. Privilege Escalation — SeImpersonate (T1134)',
          '3. Credential Dumping — LSASS (T1003.001)',
          '4. Lateral Movement — Pass-the-Hash (T1550.002)'
        ]},
        { heading: 'Detection Rules (Blue Team)', items: [
          'Reverse Shell event identifiers (Sysmon ID 3)',
          'Privilege escalation operations (Sysmon ID 1)',
          'LSASS memory core access audits (Sysmon ID 10/11)',
          'Pass-the-Hash security event verification (Logon Type 3 - ID 4624)'
        ]},
        { heading: 'Validation', items: [
          'All rules mapped to MITRE ATT&CK',
          'Alerts validated in Kibana with custom dashboards',
          'Detection gap analysis documented'
        ]}
      ]
    },
    'soc-lab': {
      title: 'SOC Home Lab: SIEM & SOAR Integration',
      meta: ['ELK', 'n8n', 'Winlogbeat', 'Oct – Dec 2025'],
      sections: [
        { heading: 'Components', items: [
          'ELK Stack: Elasticsearch + Logstash + Kibana',
          'Fluent Bit for Linux log ingestion',
          'Winlogbeat for Windows event forwarding',
          'n8n SOAR for automated response workflows',
          'VirusTotal API for threat intel enrichment'
        ]},
        { heading: 'Capabilities', items: [
          'Custom detection use cases in Kibana',
          'Windows event monitoring (logon, process, network)',
          'Alert generation with severity scoring',
          'Automated incident escalation via n8n',
          'Email notifications with full context'
        ]},
        { heading: 'Documentation', items: [
          'Full lab write-up published on SecLab-Hub',
          'Step-by-step architecture diagrams',
          'Screenshots of all configurations'
        ]}
      ]
    },
    'ent-security': {
      title: 'Enterprise Offensive & Defensive Security Lab',
      meta: ['pfSense', 'ELK', 'n8n', 'Dec 2025 – Mar 2026'],
      sections: [
        { heading: 'Architecture', items: [
          'Multi-zoned network: External / DMZ / Internal',
          'pfSense firewall for zone separation',
          'Intentionally vulnerable systems: Metasploitable3, bWAPP',
          'Windows Domain environment with AD',
          'Centralized ELK SIEM for log aggregation'
        ]},
        { heading: 'Attack Simulation', items: [
          'Multi-stage attack chains with pivoting',
          'Lateral movement across zones',
          'Custom detection rules to identify malicious activity',
          'n8n SOAR integrated with SIEM + firewall',
          'Automated containment playbooks'
        ]}
      ]
    },
    'network': {
      title: 'Enterprise Multi-Site Network (Dual-Stack)',
      meta: ['Cisco', 'OSPF', 'HSRP', 'Jul – Aug 2026'],
      sections: [
        { heading: 'Network Architecture', items: [
          'Multi-layer Campus + WAN: Access, Distribution, Edge, Branch',
          'High Availability: HSRPv2 (Active/Standby failover)',
          'Link Aggregation: LACP EtherChannel (Port-Channel 1)',
          'Layer 2 Loop Prevention: Rapid-PVST+',
          'Branch: Routed WAN + Router-on-a-Stick'
        ]},
        { heading: 'Dual-Stack Routing', items: [
          'Dynamic routing: OSPFv2 (IPv4) & OSPFv3 (IPv6) in Area 0',
          'Edge translation: PAT (NAT Overload) with default static route',
          'DHCP Relay via ip helper-address',
          'Centralized services: DNS, HTTP, FTP, Email, NTP, Syslog',
          'IPv4 + IPv6 end-to-end addressing'
        ]},
        { heading: 'Security Hardening', items: [
          'Zero-Trust segmentation: Extended ACLs (Guest / Finance isolation)',
          'Port Security: Sticky MAC, max 2, Restrict violation mode',
          'STP Edge: PortFast + BPDU Guard',
          'Management: SSHv2 only, Telnet disabled, session timeouts',
          'Unused interfaces administratively shutdown'
        ]}
      ]
    },
    'windows-lab': {
      title: 'Enterprise Infrastructure: Windows Server Full Lab',
      meta: ['Windows Server', 'AD', 'GPO', 'Jun – Sep 2025'],
      sections: [
        { heading: 'Core Infrastructure', items: [
          'Primary (PDC) & Additional (ADC) Domain Controllers',
          'DHCP scope + hot-standby failover with ADC partner',
          'DNS Round Robin load balancing (www.final.local)',
          'Highly available IIS Web Server on PDC & ADC',
          'Hyper-V virtualization role with Core_VM template'
        ]},
        { heading: 'GPO Security', items: [
          'Enterprise password & lockout policy (4 attempts / 1hr lockout)',
          'Disable USB storage, Task Manager & Control Panel on endpoints',
          'Remote Desktop & Assistance GPOs with IT delegation',
          'AD Recycle Bin & OU department structuring'
        ]},
        { heading: 'Storage & Backup', items: [
          'FSRM: File screening (block .exe, audio, video)',
          'Department network drives + Public shared quota (2 GB / user)',
          'Managed printer with time-based scheduling (9 AM – 4 PM)',
          'Daily full backup scheduled to ADC (11:00 PM)'
        ]}
      ]
    }
  };

  /* === INIT FILTER === */
  function initFilter() {
    const filterBtns = document.querySelectorAll('.filter__btn');
    const cards = document.querySelectorAll('.project-card');
    const emptyState = document.getElementById('projectsEmpty');
    if (!filterBtns.length || !cards.length) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function applyFilters() {
      let visibleCount = 0;

      cards.forEach(card => {
        const category = card.dataset.category || '';
        const title = (card.dataset.title || '').toLowerCase();
        const tech = (card.dataset.tech || '').toLowerCase();
        const desc = (card.querySelector('.project-card__desc')?.textContent || '').toLowerCase();

        const matchesFilter = activeFilter === 'all' || category === activeFilter;
        const matchesSearch = !searchQuery ||
          title.includes(searchQuery) ||
          tech.includes(searchQuery) ||
          desc.includes(searchQuery);

        const isVisible = matchesFilter && matchesSearch;
        card.classList.toggle('is-hidden', !isVisible);

        if (isVisible) visibleCount++;
      });

      if (emptyState) emptyState.hidden = visibleCount > 0;
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter || 'all';
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        applyFilters();
      });
    });

    // Listen for search updates
    document.addEventListener('project-search', (e) => {
      searchQuery = (e.detail.query || '').toLowerCase().trim();
      applyFilters();
    });
  }

  /* === INIT SEARCH === */
  function initSearch() {
    const input = document.getElementById('projectSearch');
    if (!input) return;

    let timer = null;

    input.addEventListener('input', () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        document.dispatchEvent(new CustomEvent('project-search', {
          detail: { query: input.value }
        }));
      }, 150);
    });
  }

  /* === MODAL === */
  function buildModalContent(data) {
    let html = '';
    data.sections.forEach(section => {
      html += `<h4>${section.heading}</h4><ul>`;
      section.items.forEach(item => {
        html += `<li>${item}</li>`;
      });
      html += '</ul>';
    });
    return html;
  }

  function ensureModal() {
    let modal = document.getElementById('projectModal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'projectModal';
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'projectModalTitle');
    modal.innerHTML = `
      <div class="modal__dialog">
        <button class="modal__close" aria-label="Close project details">
          <i class="fas fa-times"></i>
        </button>
        <h2 class="modal__title" id="projectModalTitle"></h2>
        <div class="modal__meta"></div>
        <div class="modal__body"></div>
      </div>
    `;
    document.body.appendChild(modal);

    // Close handlers
    const closeBtn = modal.querySelector('.modal__close');
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    return modal;
  }

  function openModal(projectKey) {
    const data = PROJECT_DATA[projectKey];
    if (!data) return;

    const modal = ensureModal();
    modal.querySelector('.modal__title').textContent = data.title;

    const metaEl = modal.querySelector('.modal__meta');
    metaEl.innerHTML = data.meta.map(m => `<span class="badge badge--ghost">${m}</span>`).join('');

    const bodyEl = modal.querySelector('.modal__body');
    bodyEl.innerHTML = buildModalContent(data);

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* === BIND DETAIL BUTTONS === */
  function initDetailsButtons() {
    document.querySelectorAll('.project-details-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.project;
        if (key) openModal(key);
      });
    });
  }

  /* === INIT === */
  function init() {
    initFilter();
    initSearch();
    initDetailsButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();