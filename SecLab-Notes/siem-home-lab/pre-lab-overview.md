---
id: "68de74f5fe45d21900dad638"
title: "Pre-Lab Overview"
description: "This training program is designed to build a complete, fully functional security operations center (SOC) environment from scratch.  We will install and configure a Security Information and Event Management (SIEM) system (ELK Stack) and integrate it with a Security Orchestration, Automation, and Response (SOAR) platform (n8n). We will also use Winlogbeat and Fluent Bit to collect and transform event logs from various devices and send them to the SIEM platform for analysis."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/siem-home-lab/pre-lab-overview"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
seoTitle: "SIEM Home LAB"
createdAt: "2025-10-02T12:49:57.115Z"
updatedAt: "2026-01-25T15:35:46.802Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759623679308/2b30993e-eac9-443b-adb9-ba8df865c98b.png" align="center" fullwidth="false" />

### **Pre-Lab Overview**

| VM Name            | Purpose / Role                 | Services / Tools                                            |
| ------------------ | ------------------------------ | ----------------------------------------------------------- |
| **LAB-ELK-N8N**    | ELK Stack Server & SOAR        | Elasticsearch, Kibana, Logstash (optional), n8n             |
| **LAB-FLUENTBIT**  | Log Collector                  | Fluent Bit (collect & forward logs to ELK)                  |
| **LAB-WIN-SERVER** | Windows Server / Log Generator | Winlogbeat (send Windows logs to ELK), Local Audit Policies |

### Key Notes Before Starting

##### **Networking:**

* All VMs must be on the same virtual network to ensure seamless communication between them.

**Hostname & Naming Conventions:**

* Windows Server hostname: AS-Device\_Name (This is important for the lab requirements).

**Installation Order:**

* First: Install ELK Stack + n8n on LAB-ELK-SIEM-N8N

* Second: Install Fluent Bit on LAB-FLUENTBIT

* Third: Install Windows Server + Winlogbeat on LAB-WIN-SERVER

