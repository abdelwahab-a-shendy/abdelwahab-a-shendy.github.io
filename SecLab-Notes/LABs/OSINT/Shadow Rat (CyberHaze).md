# Shadow Rat – AgentTesla InfoStealer Campaign (ANY.RUN Case Study)

During a routine monitoring shift, a high-severity alert was triggered on a workstation belonging to the Finance department. The EDR flagged an unsigned executable running from a temporary directory, followed by an unusual PowerShell script execution with an encoded payload. Preliminary threat intelligence suggests the involvement of a sophisticated InfoStealer. As a SOC Analyst, your mission is to dive into the threat intelligence platforms and sandbox analysis reports, reconstruct the attack stages, and identify the attacker's infrastructure to prevent further data exfiltration. To access the full analysis report, navigate to the 'Reports' section in Any.run and search using the file's hash or directly access through the link below: https://app.any.run/tasks/dac94262-a989-4a9b-a1bc-1b67e38a0e72 Malware Hash: f9525037843247d0c1e183c3d95666af.

Link :
	https://cyberhaze.io/challange-details/6a078bd76080ae6635c89b72

This analysis was performed using ANY.RUN sandbox, VirusTotal, and MITRE ATT&CK mapping as part of a SOC investigation simulation.

---
## Overview

During a routine SOC monitoring session, a high-severity alert was triggered on a Finance workstation. The alert originated from the execution of an unsigned binary dropped in a temporary directory, followed by obfuscated PowerShell activity.

Further investigation using **ANY.RUN** and **VirusTotal** confirmed that the sample is part of the **AgentTesla infostealer family**, a well-known credential-stealing malware.

---
##  Malware Identification

- **Malware Family:** Agent Tesla
- **File Name:** `payload.bin.exe`
- **MD5:** `f9525037843247d0c1e183c3d95666af`
- **SHA256:** `afe6d094ca27011e8a60eaa208a58545b7d487bd7e1af57a54217cb9bac2a842`
- **Threat Type:** Trojan / InfoStealer / Loader
- **Execution Environment:** Windows 10 (64-bit)

---
##  Initial Execution Vector

The malware was executed from:

```
C:\Users\<USER>\AppData\Local\Temp\
```

Execution was likely initiated via:

- Malicious email attachment
- User-driven execution (T1204.002)

---

##  Attack Chain Analysis

### 1. Execution Phase

- The initial payload (`payload.bin.exe`) launches a secondary loader (`ljers.exe`)
- Uses AutoIt-based execution to obfuscate behavior
- Drops additional payloads in Temp directory

---
### 2. Defense Evasion

- Uses **Base64 encoded PowerShell commands**
- Employs **AMSI bypass techniques**
- Executes via legitimate Windows binaries (LOLBins):
    - `powershell.exe`
    - `charmap.exe`

---
### 3. Persistence Mechanism

The malware ensures persistence by creating a startup entry:

```
C:\Users\admin\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\aleusbykhvziovkuiqfoiruiutibg.bat
```

 Technique: **Boot or Logon Autostart (T1547.001)**

---
### 4. Discovery & Reconnaissance

The malware performs system profiling using:

- Registry queries (language, mouse settings)
- System information gathering
- Network configuration discovery

 MITRE Technique:

- **T1012 – Query Registry**
- **T1082 – System Information Discovery**
- **T1016 – Network Configuration Discovery**

---
### 5. Credential Theft & Collection

The malware uses:

- **Browser credential harvesting**
- **Email data extraction**
- **File system data collection**

 Observed MITRE Techniques:

- **T1555.003 – Credentials from Browsers**
- **T1005 – Data from Local System**
- **T1114 – Email Collection**

---
### 6. Command & Control (C2)

The malware communicates with external infrastructure:

####  External Services:

```
http://ip-api.com/line/?fields=hostingsmtp://mail.onionmail.org
```

 Purpose:

- IP intelligence gathering
- Data exfiltration via SMTP

 MITRE:

- **T1071.003 – Application Layer Protocol (SMTP)**

---

##  Exfiltration Method

The malware exfiltrates stolen data using:

- SMTP protocol
- Email address used:

```
sendboxorigin@onionmail.org
```

This confirms covert data transfer via email-based C2 infrastructure.

---

##  Process Injection & Evasion

- Injects into `charmap.exe`
- Uses sandbox detection techniques:
    - Sleep delays
    - Debugger checks (`IsDebuggerPresent`)
- Obfuscation via AutoIt compiled payload

---

##  MITRE ATT&CK Summary

|Tactic|Technique|
|---|---|
|Execution|T1059, T1204|
|Persistence|T1547.001|
|Defense Evasion|T1027, T1562|
|Discovery|T1012, T1082, T1016|
|Credential Access|T1555.003|
|Collection|T1005, T1114|
|Command & Control|T1071.003|

---

##  Indicators of Compromise (IOCs)

### Files

```
payload.bin.exeljers.exehunuhqhwqmahcxyblgaleusbykhvziovkuiqfoiruiutibg.bat
```

### Domains

```
ip-api.commail.onionmail.org
```

### Email

```
sendboxorigin@onionmail.org
```

### Registry / Persistence Path

```
Startup folder (User Run key equivalent via BAT file)
```

---

##  Detection & Response

### Immediate Actions

- Isolate infected workstation
- Kill processes:
    - `ljers.exe`
    - `charmap.exe`
- Remove persistence file from Startup folder

### Containment

- Block SMTP outbound traffic (non-corporate mail servers)
- Block access to:
    - `mail.onionmail.org`
    - `ip-api.com` (if not business-required)

### Eradication

- Remove dropped binaries from Temp directories
- Reset all compromised credentials

---

##  Security Recommendations

- Enable strict PowerShell logging (Event ID 4104)
- Deploy AMSI enforcement policies
- Monitor Startup folder modifications (T1547.001)
- Block AutoIt execution in non-approved environments
- Implement EDR rules for:
    - Encoded PowerShell commands
    - LOLBins execution chains

---

##  Conclusion

The analyzed sample is a **fully functional AgentTesla infostealer** leveraging multiple evasion techniques, including:

- AutoIt-based execution
- PowerShell obfuscation
- LOLBins abuse
- SMTP-based exfiltration

The malware demonstrates a classic **multi-stage attack chain** designed for stealth, persistence, and credential theft.
