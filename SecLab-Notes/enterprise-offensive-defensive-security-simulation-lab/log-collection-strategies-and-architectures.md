---
id: "697383658068afcc6018082b"
title: "📊 Log Collection Strategies & Architectures (SIEM-Centric Scenarios)"
description: "- Windows Log Collection Scenarios\n- Linux Log Collection Scenarios\nNetwork & Perimeter Devices\nSIEM Ingestion Architecture\nValidation & Observability Scenarios"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/enterprise-offensive-defensive-security-simulation-lab/log-collection-strategies-and-architectures"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2026-01-23T14:19:17.200Z"
updatedAt: "2026-01-25T15:35:46.892Z"
---

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

