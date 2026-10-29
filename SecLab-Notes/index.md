---
hide:
  - navigation
  - toc
---

<div style="text-align: center; margin-bottom: 3rem;">
  <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #3b82f6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
    Abdelwahab Ahmed Shendy
  </h1>
  <p style="font-size: 1.1rem; color: var(--text-secondary); margin-top: 0;">
    SOC Analyst | Security Automation | Building GRC Foundations
  </p>
  <p style="font-size: 0.9rem; color: var(--text-muted);">
    📍 Cairo, Egypt &nbsp;•&nbsp; 
    <a href="https://abdelwahab-a-shendy.github.io/">🌐 Portfolio</a> &nbsp;| &nbsp; 
    <a href="https://linkedin.com/in/abdelwahab-a-shendy">💼 LinkedIn</a> &nbsp;| &nbsp; 
    <a href="https://github.com/abdelwahab-a-shendy">🐙 GitHub</a>
  </p>
</div>

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 1.5rem 0;">
  <span class="cert-badge"> Certified Incident Responder (eCIR) — INE Security</span>
  <span class="cert-badge">|  Google Cybersecurity Professional Certificate</span>
  <span class="cert-badge">|  Google IT Support Professional Certificate</span>
</div>


---

## 🛡️ Featured Security & Automation Projects

*   **[PhishOps: Automated Phishing Detection & Response Pipeline](Write-ups/Phishing%20Analysis%20&%20Investigation/Phishing%20Response%20Playbook/)**  
    End-to-end automated phishing analysis pipeline built with n8n. Parses email artifacts, enriches IoCs via Threat Intelligence (VirusTotal & AbuseIPDB), applies heuristic social engineering analysis, and automates SOC triage with shift-aware alerting and actionable verdicts (Deliver / Investigate / Quarantine).

*   **[Enterprise Offensive & Defensive Security Simulation](Enterprise%20Offensive%20Defensive%20Security%20Simulation/01-objective/)**  
    Multi-zoned virtual enterprise infrastructure simulating full cyber-attack life cycles (Red Team / Blue Team lab). Features pfSense firewall, ELK Stack SIEM, n8n SOAR automation, Metasploitable3, bWAPP, and full Windows domain environment.

*   **[Multi-Stage Active Directory Attack Detection using ELK](Write-ups/Security%20Engineering%20&%20Detection/WE%20INNOVATE%20Tasks/Building%20SIEM%20Filebeat%20Winlogbeat%20Kibana%20(SIEM%20LAB)/)**  
    Realistic AD lab simulating full Windows attack chain: Initial Access → Privilege Escalation → Credential Dumping → Lateral Movement. Includes custom Sigma detection rules mapped to MITRE ATT&CK, custom GPOs, Sysmon, and full ELK detection validation.

*   **[SOC Home Lab: SIEM & SOAR Integration](SIEM%20&%20SOAR%20Integration/00.PreLabOverview/)**  
    Built a complete SOC environment from scratch: ELK Stack, Fluent Bit, Winlogbeat, and n8n SOAR. Implemented log collection, detection engineering use cases, Windows event monitoring, and automated incident response workflows.

---

## 🌐 Network & Systems Infrastructure Labs

*   **[Enterprise Multi-Site Network Infrastructure (Dual-Stack IPv4/IPv6)](Write-ups/Network%20Forensics/)**  
    Full-scale enterprise campus (HQ + Branch) in Cisco Packet Tracer. Features HSRPv2 gateway failover, LACP EtherChannel, OSPFv2/v3 dual-stack routing, centralized server farm, NAT/PAT, and defense-in-depth security hardening (SSH, Port Security, BPDU Guard, ACLs).

*   **[Enterprise Infrastructure: Windows Server Full Lab](Windows-Server-Labs/0.Enterprise%20Infrastructure%20(Windows%20Server%20Full%20Lab)/0.Requirements/)**  
    Comprehensive enterprise simulation featuring Dual Domain Controllers (PDC & ADC), advanced GPO security policies, DHCP Failover, DNS Round Robin, IIS High Availability, FSRM quotas, Hyper-V virtualization, and automated backups.

---

## 📊 Software Engineering, AI & Data Projects

*   **[Smart System for Automating Data Analysis (Smart BI)](Write-ups/Security%20Engineering%20&%20Detection/)**  
    *Graduation Project — Awarded Best in BIS Department at MCI Academy.* End-to-end automated BI pipeline with a dual-path engine: real-time KPI visualization + AI-driven strategic analysis using LLMs and n8n workflows. Features Flask API backend with SQLite/Bcrypt and Bootstrap 5/Chart.js frontend.

*   **[Movie Market – Cinema Ticket Booking Platform](Write-ups/Web%20Security%20&%20Penetration%20Testing/)**  
    Full-featured cinema booking platform built with ASP.NET Core MVC following clean 3-tier architecture. Features custom claims-based authentication/authorization built from scratch, Stripe payment integration, role management, dynamic search, and SQL Server backend.

*   **[Database Design with ERD, EERD & SQL](Write-ups/Web%20Security%20&%20Penetration%20Testing/)**  
    Practical implementation of database design workflow: conceptualizing ERD/EERD models, translating them to relational schemas, database normalization, and SQL script implementation with constraint enforcement.

*   **[Foundational Programming & Challenges (Archive)](Write-ups/Linux%20&%20System%20Administration/)**  
    Curated collection of problem-solving solutions, OOP mini-projects (C# & C++), algorithmic challenges (C++, Python, Bash), and hardware/IT prototypes (Arduino Calculator) building a strong technical core.

---

## 📂 Write-ups & Practical Walkthroughs

Browse through hands-on technical write-ups, CTF solutions, and forensic investigations:

*   **[Disk Forensics & DFIR](Write-ups/Disk%20Forensics/)** — Evidence integrity, hashing, Autopsy & FTK Imager setup, and Linux/Windows artifact extraction.
*   **[Linux & System Administration](Write-ups/Linux%20&%20System%20Administration/)** — OverTheWire (Bandit & Leviathan) walkthroughs and command-line reviews.
*   **[Malware Analysis](Write-ups/Malware%20Analysis/)** — BTLO cases (Follina) and Python popup malware persistence analysis.
*   **[Network Forensics](Write-ups/Network%20Forensics/)** — PCAP analysis, ARP storms, PsExec hunts, and Hawkeye malware network traffic analysis.
*   **[OSINT Investigations](Write-ups/OSINT%20Investigations/)** — CyberHaze MITRE-mapped OSINT challenges and Shadow Rat investigation.
*   **[Phishing Analysis & Investigation](Write-ups/Phishing%20Analysis%20&%20Investigation/)** — Email header analysis, LetsDefend/BTLO phishing playbooks, and wallet verification scams.
*   **[Security Engineering & Detection](Write-ups/Security%20Engineering%20&%20Detection/)** — Snort Nmap scan detection, Fluentbit log shipping, and Nginx ModSecurity WAF.
*   **[Steganography & File Analysis](Write-ups/Steganography%20&%20File%20Analysis/)** — CTF write-ups (picoCTF, CTF Learn, Cyber Talents) covering binwalk, exiftool, and steganography.
*   **[Threat Hunting & Intelligence](Write-ups/Threat%20Hunting%20&%20Intelligence/)** — Splunk BOTSv1 scenarios, QRadar 101 investigations, and BTLO threat reports.
*   **[Web Security & Penetration Testing](Write-ups/Web%20Security%20&%20Penetration%20Testing/)** — PortSwigger Web Security Academy labs, TryHackMe rooms, and vulnerable machine walkthroughs (Kioptrix, Metasploitable).

---

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color);">
  <h3 style="color: var(--accent-blue); margin-top: 0;">Let's Connect Securely</h3>
  <p style="color: var(--text-secondary);">Securing operations today | Building governance foundations for tomorrow</p>
  <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 1rem;">
    <a href="https://abdelwahab-a-shendy.github.io/" class="btn btn-outline">Portfolio</a>
    <a href="https://linkedin.com/in/abdelwahab-a-shendy" class="btn btn-primary">LinkedIn</a>
    <a href="https://github.com/abdelwahab-a-shendy" class="btn btn-outline">GitHub</a>
  </div>
</div>
