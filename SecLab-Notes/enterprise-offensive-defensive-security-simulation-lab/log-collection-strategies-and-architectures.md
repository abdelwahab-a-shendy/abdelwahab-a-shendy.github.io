
# 1️⃣ Windows Log Collection Scenarios

## Scenario 1: Agent-based (Per-Host Collection) :

* **Use Case:** Full Visibility + Flexibility

* **Architecture:**

`Windows Host → Winlogbeat → Elasticsearch → Kibana`

**Includes:**

* Security / System / Application

* PowerShell Logs

* Sysmon

**When to use:**

* Small / Medium Environments

* Requires Custom parsing

* High-fidelity telemetry

## 🟦 Scenario 2: Centralized Windows Event Forwarding (WEF) :

**Use Case:** Native + Low footprint\
**Architecture:**

`Windows Hosts → WEF Collector → Logstash → Elasticsearch → Kibana`

**Variants:**

* Source-Initiated

* Collector-Initiated

**When to use:**

* Domain environments

* Reduce agents

* Compliance-heavy setups

## 🟦 Scenario 3: Hybrid Windows Collection

**Use Case:** Defense-in-depth\
**Architecture:**

* `Critical servers → Winlogbeat → Elasticsearch → Kibana`

* `Workstations → WEF → Elasticsearch → Kibana`

**Why this matters:**

* Performance

* Cost

* Risk-based logging

***

***

