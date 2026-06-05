
# **1️⃣ Definition of Detection Engineering**

**Detection Engineering** is a cybersecurity discipline focused on designing, developing, and testing **detection rules** for identifying attacks within an organization’s environment.\
An engineer in this field builds **“digital sensors”** (Detection Rules) that inform the security team **when and where** a threat occurs, while working to reduce **false positives** and improve alert accuracy.

**Goal:** To detect threats quickly and reliably, providing enough context for an effective response.

***

# **2️⃣ What Should a Detection Engineer Know?**

A Detection Engineer should understand the full **cybersecurity lifecycle** (e.g., **NIST CSF Framework**) and know how to translate attack scenarios into actionable rules within the **SIEM**.

| **Phase**    | **Description**                                           |
| ------------ | --------------------------------------------------------- |
| **Identify** | Identify assets, ownership, and data locations            |
| **Protect**  | Apply preventive controls (ACLs, patching, hardening)     |
| **Detect**   | Build rules to detect malicious behaviors (core function) |
| **Respond**  | Execute containment and incident response actions         |
| **Recover**  | Restore systems and learn from incidents                  |
| **Govern**   | Evaluate detection program effectiveness and governance   |

***

# **3️⃣ Core Concepts in Detection Engineering**

* **Detection Rule / Query:** A rule or query that captures suspicious behavior in logs.

* **Correlation:** Linking smaller events together to form a more accurate composite alert.

* **False Positives Tuning:** Optimizing rules to minimize noise.

* **Mapping to MITRE ATT\&CK:** Associating each detection with a standardized attack technique.

* **Detection Validation:** Testing detection rules using simulations or real-world samples.

***

# 4️⃣ Process (High-Level)

**Inputs (Sources):**

* Red Team / Pentest results

* Threat Intelligence feeds

* New log sources (Sysmon, Winlogbeat, Netflow, FW logs)

* Business requirements / Compliance

**Processing:**

* Write detection rules (KQL / Sigma / Elastic DSL)

* Test them in a LAB environment

* Tune rules to reduce false positives

**Outputs:**

* Alerts to the SOC

* Analysis and response Playbooks

* Reports and detection KPIs

***

# 5️⃣ KQL Quick Reference (Security-focused cheat sheet)

**What is KQL?**\
KQL = **Kibana Query Language** — a simple filtering/query language in Kibana for searching fields and documents.

**Basic examples**

* Exact: `http.request.method: GET`

* Terms: `http.response.status_code: 400 401 404`

* Phrase: `http.response.body.content.text:"null pointer"`

* Range: `@timestamp >= now-24h or http.response.bytes > 10000 and http.response.bytes <= 20000`

* Wildcard: `machine.os: win*`

* Exists: `http.request.method: *`

* Negation: `NOT http.request.method: GET`

* Boolean: `(http.request.method: GET AND http.response.status_code: 200) OR (http.request.method: POST AND http.response.status_code: 400)`

**Tips for SOC detections**

* Always use `@timestamp` to narrow queries.

* Combine field filters + wildcards + boolean logic for precision.

* Test queries in **Discover** before creating alerts.

* Save reusable queries as **Saved Query**.

***

# 6️⃣ Nested & Escaping

* Nested example: `user:{ first: "Alice" and last: "White" }`

* Escape special chars: `\():<>"*` (or wrap the value in quotes)

***

# 7️⃣ Structure of this Detection Engineering Section (Pages / Labs)

This main page leads you to practical labs. Each lab includes: **Scenario**, **Deliverables**, and **Mapping to MITRE**.

## Scenarios **List (Suggested)**

### Scenario 1 **— Registry Persistence Detection (Run/RunOnce)**

* An attacker creates a Registry key to persist on startup.

* **Deliverables:**

  * KQL rule (Sysmon / Windows Event) that detects `HKCU\...\Run` or `HKLM\...\RunOnce`.

  * Explanation of when and what will trigger an alert.

  * Mapping to MITRE (T1547.\*).

### Scenario 2 **— PowerShell-based Firewall Tampering**

* **1:** Registry persistence via Run key.

* **2:** An attacker runs obfuscated PowerShell to disable Windows Firewall.

* **Deliverables:**

  * KQL rules to detect suspicious PowerShell commands or WMI/Registry changes to firewall rules.

  * Explanation of triggers and MITRE mapping (e.g., T1562.001 — *Impair Defenses: disabling security tools*).

### Scenario 3 **—** The implementation of privilege escalation tools and information gathering techniques was revealed.

* An attacker executes discovery/privilege-escalation tools (e.g., `whoami.exe`, `net.exe`) or dangerous scripts.

* **Deliverables:**

  * KQL rule (example + logic explanation).

  * When will the rule trigger? (Trigger conditions).

  * False-positive considerations.

  * Mapping to MITRE ATT\&CK.

***

