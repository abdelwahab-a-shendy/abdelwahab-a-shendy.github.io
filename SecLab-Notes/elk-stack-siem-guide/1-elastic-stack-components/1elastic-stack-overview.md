---
id: "68efc76b7bec01ef47728b8c"
title: "1.Elastic Stack Overview"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/1-elastic-stack-components/1elastic-stack-overview"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-15T16:10:19.925Z"
updatedAt: "2026-01-25T15:35:47.088Z"
---

## 🎯 Topics Covered in This Lesson

* Components of the Elastic Stack

* Fleet and Elastic Agent

***

## 🎓 Learning Objectives

By the end of this lesson, you will be able to:

1. Explain how Fleet and Elastic Agents are used.

2. Describe the configuration and architecture of Fleet.

3. Explain how to manage Elastic Agents through Fleet.

4. Describe the available types of integrations.

5. Configure a policy for an Elastic Agent.

6. Deploy Elastic Agent on different systems.

***

## 🔹 What Is the Elastic Stack?

It is a set of integrated tools used to receive, store, analyze, and visually present data.

**The Elastic Stack consists of:**

* **Kibana**

* **Elasticsearch**

* **Logstash** / **Beats / Agents**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545746382/72315a7a-a55d-4e19-9255-4eed560dda3e.png" alt="" align="center" fullwidth="true" />

### ⚙️ Components of the Elastic Stack

| Component          | Function / Role                                                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Elasticsearch**  | The heart of the Stack, responsible for storing data, supporting search, and analytics operations.                                      |
| **Kibana**         | The user interface — for exploring data, creating visualizations, managing the stack, and responding to threats using the Security App. |
| **Logstash**       | A server-side component used for ingesting, parsing, and routing data.                                                                  |
| **Beats / Agents** | Lightweight agents running on servers to collect system, network, and log data, and send it to Elasticsearch or Logstash.               |

***

### 🧠 **Elasticsearch**

**The heart of the Elastic Stack**\
It is the component responsible for **data storage, search, and analytics**.\
It represents the **Storage & Analytics** layer of the Stack.

Key features:

* **Scalable** to handle massive data volumes.

* Supports multiple data types (Logs, Metrics, Text, Geo data...).

* Used in various applications such as:

  * Log Monitoring

  * Infrastructure Monitoring

  * Enterprise Search

  * Maps

  * SIEM (Security Information and Event Management)

  * Endpoint Security

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545975762/63032ab2-e205-4115-a239-d49b5d2b8a78.png" alt="" align="center" fullwidth="true" />

***

## 💾 Ingest Components

### **🧩 1. Logstash**

* Used for ingesting data into the Elastic Stack.

* A server-side component.

**Functions:**

* Ingests data of all shapes and sizes.

* Normalizes and parses data.

* Sends data to any output destination.

* Connects data streams from other storage layers.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545761077/d6e47616-799e-40df-8ca3-3419e5714ab3.png" alt="" align="center" fullwidth="true" />

***

### **🧩 2. Beats**

* Sends data to **Elasticsearch** or **Logstash**.

* Runs on servers, containers, or as a standalone binary.

* Can send data directly to Elasticsearch or through Logstash for further processing.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545783338/c5b1bf56-32c8-4abc-b254-e7cf5e49a9db.png" alt="" align="center" fullwidth="true" />

### **🔸 Common Types of Beats:**

| Name           | Function                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------- |
| **Filebeat**   | Collects logs and text-based data.                                                             |
| **Metricbeat** | Collects system metrics (CPU, Memory, Disk...).                                                |
| **Packetbeat** | Monitors network traffic.                                                                      |
| **Winlogbeat** | Collects and analyzes Windows Event Logs + monitors Active Directory + integrates with Sysmon. |
| **Auditbeat**  | Collects audit data, tracks system calls (syscalls), and monitors file integrity (FIM).        |
| **Heartbeat**  | Monitors service availability and uptime.                                                      |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545795185/4a7e78d4-d905-47c3-aaf6-01f1112ae715.png" alt="" align="center" fullwidth="true" />

> 📝 **Note:**\
> Beats and Elastic Agent can be used together, but Elastic Agent unifies the functionality of Beats into a single multi-purpose agent.

| Beat         | Linux Support           | Windows Support                | Special Notes                                                          |
| ------------ | ----------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| Filebeat     | Yes                     | Yes                            | Supports multiple systems                                              |
| Metricbeat   | Yes                     | Yes                            | Has modules for multiple operating systems                             |
| Packetbeat   | Yes                     | May be limited on Windows      | Mostly used on Linux systems for network traffic monitoring            |
| Winlogbeat   | —                       | Yes                            | Designed for Windows Event Logs                                        |
| Auditbeat    | Yes                     | Limited or not used on Windows | Commonly used on Unix/Linux systems for auditing                       |
| Heartbeat    | Yes                     | Yes                            | Supports service monitoring across multiple systems                    |
| Journalbeat  | Yes                     | No                             | Dedicated to systemd logs on Linux only                                |
| Functionbeat | Depends on the use case | Depends                        | Designed for cloud or serverless functions, not traditional system use |

#### **Important:**

* **Beats** ⟶ Official part of the **Elastic Stack**.

* **Fluent Bit / Fluentd** ⟶ **Third-party (Open Source)** tools that can send data to **Elasticsearch**, but are **not developed by Elastic**.

Although **Beats** and **Fluent Bit** perform similar roles — collecting and sending data — there are key differences between them:

| Aspect                           | **Beats (Elastic Beats)**                                                                        | **Fluent Bit / Fluentd**                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **Developer**                    | Developed by **Elastic** (the company behind Elasticsearch and Kibana)                           | **Open-source project** under the **CNCF**                                               |
| **Primary Purpose**              | Collecting data (Logs, Metrics, Network Data...) and sending it to **Elasticsearch or Logstash** | Collecting data and sending it to any destination (Elasticsearch, Loki, Kafka, S3, etc.) |
| **Programming Language**         | Written in **Go**                                                                                | Fluent Bit is written in **C**, Fluentd in **Ruby**                                      |
| **Common Environment**           | Traditional servers and system devices (Windows/Linux)                                           | **Cloud**, **Kubernetes**, and **Container** environments                                |
| **Integration**                  | Natively integrated with the **Elastic Stack**, requires no extra setup                          | Needs manual configuration for Elasticsearch integration                                 |
| **Performance & Resource Usage** | Lightweight and fast, but optimized mainly for Elastic environments                              | Fluent Bit is extremely lightweight and built for resource-constrained environments      |
| **Flexibility**                  | More specific to the Elastic Stack                                                               | More flexible — supports multiple destinations (multi-destination logging)               |

***

### **🧩 3. Elastic Agent**

* A unified way to add monitoring for different types of data:

  * Logs

  * Metrics

  * Host data

* Managed through **Kibana**.

* Sends data to **Logstash**.

* Includes more than **200 integrations**.

* Can configure **Elastic Defend** as a Security Integration.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545856268/e52959b5-8755-402a-adb2-8c72ecd425d5.png" alt="" align="center" fullwidth="true" />

***

### 💠 **Kibana**

**Kibana** is the **graphical (visual) interface** of the **Elastic Stack**,\
and serves as **the window through which users interact with the data** stored in Elasticsearch.

🔹 **What Is Kibana?**

* The **user-facing component** of the Elastic Stack.

* **Browser-based**, no standalone installation required.

* Used to visualize, manage, and analyze data stored in Elasticsearch.

🔹 **Core Kibana Functions:**

1. **Visualize Data:**\
   Create charts, graphs, and dashboards to illustrate data stored in Elasticsearch.

2. **Explore Data:**\
   Search within data, analyze trends, and identify patterns.

3. **Investigate & Respond to Threats (Security App):**\
   Includes a built-in security application for **security analysis and incident response**.

4. **Manage Elastic Stack Components:**\
   Manage users, Agents, Dashboards, and more.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545865572/a893364f-9b8f-4939-8d7c-d4a05247f876.png" alt="" align="center" fullwidth="true" />

***

## 🔄 Data Journey in Elasticsearch

Imagine you have data coming from different sources — it could be **server logs**, **system performance metrics**, or even **network traffic**.\
This data goes through several stages before you can **view and analyze it in Kibana** 👇

```bash
Data Source
     ↓
Ingest → (Beats / Elastic Agent / Elastic Defender / Logstash)
     ↓
Store → Elasticsearch
     ↓
Analyze → Kibana
```

###### ChatGPT said:

* 1️⃣ **Data Source**

  * This is the starting point.\
    Here, the data exists in its **raw form**, coming from: **Servers**, **Endpoints**, or **Applications**.

* 2️⃣ **Ingest Layer**

  * This is where we start **collecting and preparing** the data before it enters the database.

  * The tools responsible for this stage are:

    * **Beats** (like Filebeat, Metricbeat...): collect data from devices.

    * **Elastic Agent**: a unified agent that gathers various types of data.

  * 🧩 In other words, the **Ingest stage** is the phase of **data collection and cleaning** before storage.

* 3️⃣ **Store Layer (Elasticsearch)**

  * After the data is collected and prepared, it goes into **Elasticsearch**.

  * Here’s what happens:

    * The data is stored in an **index** format.

    * You can search through it **extremely fast**.

    * You can perform **analytics** and apply **filters**.\
      📦 Think of Elasticsearch as the **heart of the system** that stores and organizes everything.

* 4️⃣ **Analyze Layer (Kibana)**

  * Finally, we move to **Kibana** — the interface that lets you **see and understand your data**.

  * You can build **dashboards**.

  * Monitor **security alerts**.

  * Investigate **system issues**.

  * And track **infrastructure performance in real time**.\
    🎯 **The result:** All the **raw and scattered data** from the beginning has now become **visual and meaningful** inside Kibana.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545894554/eb73d6ec-e3a7-4a2b-81b4-d86e89c3ea25.png" alt="" align="center" fullwidth="true" />

The data starts from the **source** → gets **collected and processed (Ingest)** → then **stored and organized (Store)** → and finally **analyzed and visualized (Analyze)**.\
That’s exactly the **data lifecycle inside the Elastic Stack** ❤️

***

## 🔐 Fleet and Elastic Agent

This section represents the core focus of the lesson.

### 🚀 What Is Elastic Agent?

* A unified agent installed on a system to collect:

  * Logs

  * Metrics

  * System and security data

* Instead of installing multiple Beats, a single agent is used with integrated configuration policies.

> **Benefit:** Reduces complexity and unifies management and monitoring in a single interface.

***

### ⚙️ What Is Fleet?

* A **central management interface** inside **Kibana** used to manage **Elastic Agents** from setup to deployment and monitoring.

* Allows you to define **Agent Policies** that specify:

  * Active integrations on the agent.

  * Data transmission methods.

  * Active protection settings.

> When Elastic Agent is installed in “Managed by Fleet” mode, it automatically connects to the **Fleet Server** to receive policies and updates.

***

### **🧭 Fleet Server**

* Acts as the **control plane** between Elastic Agents and the Fleet interface.

* Updates agents with new policies, receives enrollment data, and issues commands.

***

### ⚖️ Operating Modes

| Mode                           | Description                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------- |
| **Managed (Managed by Fleet)** | Fully managed through Kibana/Fleet, automatically receives policies and updates. |
| **Standalone**                 | Managed manually through a local `elastic-agent.yml` file without Fleet.         |

***

## 🧩 Managing Elastic Agents via Fleet

From **Kibana → Management → Fleet → Agents**, you can:

* Unenroll an agent

* Set inactivity timeouts

* Upgrade agents to newer versions

* Migrate agents to another cluster

* Monitor agent status

* View logs and performance metrics

* Use tags to organize and classify agents

***

## 🚀 Steps to Deploy Elastic Agent via Fleet

1. In Kibana → Fleet:\
   Create an **Agent Policy** and specify the required integrations.

2. Obtain an **Enrollment Token** for new agents.

3. Install the **Elastic Agent** on the target system using the token.

4. The agent connects to the **Fleet Server**, retrieves its policy, and starts data collection.

5. From **Kibana → Fleet → Agents**, you can manage agents (update, delete, monitor).

***

## 🧾 Lesson Summary

| Goal                     | Summary                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Elastic Stack Components | Kibana (interface), Elasticsearch (analytics & storage), Logstash (ingest), Beats/Agents (data collection). |
| Ingest Components        | Logstash, Beats, and Elastic Agent.                                                                         |
| Fleet                    | Central management interface in Kibana for agents and policies.                                             |
| Fleet Server             | The mediator connecting Fleet and agents for policy delivery and updates.                                   |
| Elastic Agent            | Unified agent collecting system, metrics, and log data, supporting security integrations.                   |
| Operating Modes          | Managed (via Fleet) or Standalone (local).                                                                  |

***

***

***

Elastic Security for SIEM :

1. Elastic Stack Overview

2. Elastic Common Schema

3. Discover

4. Visualizations

5. Lens

6. Dashboards

7. Security App

8. Individual Hunt Capstone

***

## 🎯 المواضيع التي نغطيها في هذا الدرس

* مكونات Elastic Stack

* ال Fleet و Elastic Agent

***

## 🎓 الأهداف التعليمية (Learning Objectives)

عند نهاية الدرس، ستكون قادرًا على أن:

1. تشرح كيف يتم استخدام Fleet و Elastic Agents.

2. توضح تكوين وعمارة Fleet.

3. تشرح كيفية إدارة Elastic Agents عبر Fleet.

4. تصف أنواع التكاملات (Integrations) المتاحة.

5. تكوّن سياسة (Policy) لـ Elastic Agent.

6. تنشر (Deploy) Elastic Agent على الأنظمة المختلفة.

***

## 🔹 ما هو Elastic Stack؟

هو مجموعة أدوات متكاملة تُستخدم لاستقبال البيانات، تخزينها، تحليلها، وعرضها بصريًا.

**يتكون مكدس Elastic Stack من:**

* **Kibana**

* **Elasticsearch**

* **Logstash** / **Beats / Agents**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545746382/72315a7a-a55d-4e19-9255-4eed560dda3e.png" alt="" align="center" fullwidth="true" />

### ⚙️ مكونات Elastic Stack

| المكون             | الوظيفة / الدور                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Elasticsearch**  | القلب النابض للـ Stack، مسؤول عن تخزين البيانات، دعم عمليات البحث والتحليل.                                        |
| **Kibana**         | الواجهة البصرية للمستخدم — لاستكشاف البيانات، إنشاء التصورات، إدارة المكدس، والاستجابة للتهديدات عبر Security App. |
| **Logstash**       | مكون خادمي (Server-side) يستخدم لاستيعاب البيانات وتحليلها وتوجيهها.                                               |
| **Beats / Agents** | وكلاء خفيفة الوزن تعمل على الخوادم لجمع بيانات النظام، الشبكة، والسجلات ثم إرسالها إلى Elasticsearch أو Logstash.  |

***

### 🧠 **Elasticsearch**

**القلب النابض لـ Elastic Stack**\
هو المكوّن المسؤول عن **تخزين البيانات والبحث والتحليل**.\
يُعتبر طبقة الـ **Storage & Analytics** داخل الـ Stack.\
يتميز بأنه:

* قابل للتوسّع (Scalable) للتعامل مع كميات ضخمة من البيانات.

* يدعم أنواع بيانات مختلفة (Logs, Metrics, Text, Geo data...).

* يُستخدم في تطبيقات متعددة مثل:

  * مراقبة السجلات (Log Monitoring)

  * مراقبة البنية التحتية (Infrastructure Monitoring)

  * البحث المؤسسي (Enterprise Search)

  * الخرائط (Maps)

  * نظم إدارة الأحداث الأمنية (SIEM)

  * حماية الأجهزة الطرفية (Endpoint Security)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545975762/63032ab2-e205-4115-a239-d49b5d2b8a78.png" alt="" align="center" fullwidth="true" />

***

## 💾 مكونات الاستيعاب (Ingest Components)

### **🧩 1. ال Logstash**

* يُستخدم لاستيعاب البيانات في Elastic Stack.

* مكون من جانب الخادم (Server-side).

* **وظائفه:**

  * استيعاب البيانات بجميع الأشكال والأحجام.

  * تطبيع وتحليل البيانات (Normalize & Parse).

  * نقل البيانات إلى أي مخرج (Output).

  * ربط تدفقات البيانات من طبقات التخزين الأخرى.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545761077/d6e47616-799e-40df-8ca3-3419e5714ab3.png" alt="" align="center" fullwidth="true" />

***

### **🧩 2.ال Beats**

* تنقل البيانات إلى **Elasticsearch** أو **Logstash**.

* تعمل على الخوادم مع الحاويات (containers) أو كملف ثنائي (binary).

* يمكنها إرسال البيانات مباشرة إلى Elasticsearch أو إلى Logstash لمزيد من التحليل.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545783338/c5b1bf56-32c8-4abc-b254-e7cf5e49a9db.png" alt="" align="center" fullwidth="true" />

### **🔸 أنواع Beats الشائعة:**

| الاسم          | الوظيفة                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------- |
| **Filebeat**   | جمع السجلات (Logs) والبيانات النصية.                                                               |
| **Metricbeat** | جمع مقاييس النظام (CPU، Memory، Disk...).                                                          |
| **Packetbeat** | مراقبة حركة مرور الشبكة (Network Traffic).                                                         |
| **Winlogbeat** | جمع وتحليل سجلات أحداث Windows (Windows Event Logs) + مراقبة Active Directory + التكامل مع Sysmon. |
| **Auditbeat**  | جمع بيانات التدقيق (Audit Data) وتتبع استدعاءات النظام (syscalls) ومراقبة سلامة الملفات (FIM).     |
| **Heartbeat**  | مراقبة توافر الخدمات ووقت التشغيل (Uptime Monitoring).                                             |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545795185/4a7e78d4-d905-47c3-aaf6-01f1112ae715.png" alt="" align="center" fullwidth="true" />

> 📝 **ملاحظة:**\
> Beats و Elastic Agent يمكن استخدامهما معًا، ولكن Elastic Agent يوحّد وظائف Beats في وكيل واحد متعدد المهام.

| Beat         | دعم لينكس        | دعم ويندوز                     | ملاحظات خاصة                                                    |
| ------------ | ---------------- | ------------------------------ | --------------------------------------------------------------- |
| Filebeat     | نعم              | نعم                            | يدعم أنظمة متعددة                                               |
| Metricbeat   | نعم              | نعم                            | لديه وحدات (modules) لأنظمة تشغيل متعددة                        |
| Packetbeat   | نعم              | قد يكون محدودًا على ويندوز     | غالبًا يُستخدم على أنظمة لينوكس للتعامل مع حركة الشبكة          |
| Winlogbeat   | —                | نعم                            | مخصص لسجلات Windows Events                                      |
| Auditbeat    | نعم              | محدود أو غير مستخدم على ويندوز | غالبًا يستخدم على أنظمة Unix / Linux للتدقيق                    |
| Heartbeat    | نعم              | نعم                            | يدعم مراقبة الخدمات على أنظمة متعددة                            |
| Journalbeat  | نعم              | لا                             | مخصص لسجلات systemd على Linux فقط                               |
| Functionbeat | يعتمد على الحالة | يعتمد                          | مخصص للسحابة أو وظائف serverless وليس للعمل التقليدي على النظام |

#### **مهم** :

* ال **Beats** ⟶ جزء رسمي من **Elastic Stack**.

* ال **Fluent Bit / Fluentd** ⟶ أدوات **طرف ثالث (Open Source)** يمكن توجيه بياناتها إلى **Elasticsearch** لكنها ليست من Elastic نفسها.

* رغم أن **Beats** و **Fluent Bit** يؤدّيان وظيفة متشابهة وهي جمع وإرسال البيانات، إلا أن هناك اختلافات جوهرية بينهما:

| العنصر                      | **Beats (Elastic Beats)**                                                                | **Fluent Bit / Fluentd**                                           |
| --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **المطوّر**                 | شركة **Elastic** (المطورة لـ Elasticsearch وKibana)                                      | مشروع **مفتوح المصدر** تحت رعاية **CNCF**                          |
| **الهدف الأساسي**           | جمع البيانات (Logs, Metrics, Network Data...) وإرسالها إلى **Elasticsearch أو Logstash** | جمع البيانات وإرسالها لأي وجهة (Elasticsearch, Loki, Kafka, S3...) |
| **اللغة البرمجية**          | مكتوبة بلغة **Go**                                                                       | Fluent Bit مكتوبة بـ **C** و Fluentd بـ **Ruby**                   |
| **بيئة الاستخدام الشائعة**  | الخوادم العادية وأجهزة الأنظمة (Windows/Linux)                                           | بيئات **Cloud** و **Kubernetes** و **Containers**                  |
| **التكامل (Integration)**   | مدمجة أصلاً في **Elastic Stack**، ولا تحتاج إعدادات إضافية                               | تحتاج إعداد يدوي لتكاملها مع Elasticsearch                         |
| **الأداء واستهلاك الموارد** | خفيفة وسريعة، لكنها متخصصة أكثر لـ Elastic                                               | Fluent Bit أخف جدًا ومصمّمة للبيئات محدودة الموارد                 |
| **المرونة (Flexibility)**   | مخصصة أكثر لمكدس Elastic                                                                 | أكثر مرونة في الوجهات (multi-destination logging)                  |

***

### **🧩 3.ال Elastic Agent**

* طريقة موحّدة لإضافة المراقبة لأنواع مختلفة من البيانات:

  * السجلات (Logs)

  * المقاييس (Metrics)

  * بيانات المضيف الأخرى (Host Data)

* يُدار عبر **Kibana**.

* يرسل البيانات إلى **Logstash**.

* يحتوي على أكثر من **200 تكامل (Integration)**.

* يمكن تهيئة **Elastic Defend** كأحد تكاملات الأمان (Security Integration).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545856268/e52959b5-8755-402a-adb2-8c72ecd425d5.png" alt="" align="center" fullwidth="true" />

***

### 💠 ال **Kibana**

**ال Kibana** هي **الواجهة الرسومية** (المرئية) الخاصة بـ **Elastic Stack**،\
وتُعد **النافذة التي من خلالها يتفاعل المستخدم مع البيانات** الموجودة في Elasticsearch.

🔹 **ما هي Kibana؟**

* هي **المكوّن الموجّه للمستخدم** في Elastic Stack.

* تعمل من خلال **المتصفح (Browser-Based)**، أي لا تحتاج لتثبيت تطبيق منفصل.

* تُستخدم لعرض وإدارة وتحليل البيانات الموجودة داخل Elasticsearch.

🔹 **وظائف Kibana الأساسية:**

1. **عرض البيانات (Visualize):**\
   إنشاء الرسوم البيانية، الجداول، والمخططات لتوضيح البيانات المخزّنة في Elasticsearch.

2. **استكشاف البيانات (Explore):**\
   البحث داخل البيانات، تحليل الاتجاهات، واستخراج أنماط النشاط.

3. **التحقيق والاستجابة للتهديدات (Security App):**\
   تحتوي على تطبيق أمني مدمج يُستخدم في **التحليل الأمني والاستجابة للحوادث** (Incident Response).

4. **إدارة مكونات Elastic Stack:**\
   مثل إدارة المستخدمين، إعدادات الـ Agents، والـ Dashboards، وغيرها.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545865572/a893364f-9b8f-4939-8d7c-d4a05247f876.png" alt="" align="center" fullwidth="true" />

***

## 🔄 رحلة البيانات في Elasticsearch (Elasticsearch Data Journey)

تخيل إن عندك **بيانات** جاية من أماكن مختلفة — ممكن تكون **سجلات سيرفرات (Logs)**، أو **بيانات أداء النظام (Metrics)**، أو حتى **حركة مرور الشبكة (Network Traffic)**.\
البيانات دي بتمر بعدة مراحل قبل ما تقدر تشوفها وتحللها في Kibana 👇

```css
مصدر البيانات (Data Source)
     ↓
الاستيعاب (Ingest) → (Beats / Elastic Agent / Elastic Defender / Logstash)
     ↓
التخزين (Store) → Elasticsearch
     ↓
التحليل (Analyze) → Kibana
```

* 1️⃣ **مصدر البيانات (Data Source)**

  * دي نقطة البداية.\
    هنا بتكون البيانات في شكلها الخام (Raw Data)، جاية من: ( خوادم (Servers) , أجهزة المستخدمين (Endpoints) , تطبيقات (Applications) )

* 2️⃣ **الاستيعاب (Ingest Layer)**

  * هنا بنبدأ نجمع البيانات ونجهّزها قبل ما تدخل إلى قاعدة البيانات.

  * الأدوات اللي بتقوم بالمهمة دي هي:

    * ال**Beats** (زي Filebeat, Metricbeat...): بتاخد البيانات من الأجهزة.

    * ال **Elastic Agent**: وكيل موحد بيجمع أنواع مختلفة من البيانات.

* 🧩 بمعنى آخر: مرحلة "الاستيعاب" هي مرحلة **جمع وتنظيف البيانات** قبل تخزينها.

* 3️⃣ **التخزين (Store Layer - Elasticsearch)**

  * بعد ما البيانات تتجمع وتتجهز، بتروح إلى **Elasticsearch**.

  * هنا بيحصل الآتي:

    * البيانات تتخزن في شكل فهرس (Index).

    * تقدر تبحث فيها بسرعة رهيبة.

    * ممكن تعمل عليها عمليات تحليل (Analytics) وفلاتر (Filters). 📦 فكر في Elasticsearch كأنه **قلب النظام** اللي بيخزن كل حاجة وينظمها.

* 4️⃣ **التحليل والعرض (Analyze Layer - Kibana)**

  * في الآخر، بنروح إلى **Kibana** — الواجهة اللي بتخليك تشوف وتفهم البيانات.

  * تقدر تعمل لوحات تحكم (Dashboards).

  * تتابع تنبيهات الأمان.

  * تبحث عن مشاكل في النظام.

  * وتراقب البنية التحتية بشكل لحظي. 🎯 النتيجة: كل البيانات اللي كانت "خام ومبعثرة" في البداية، دلوقتي بقت **مرئية ومفهومة** داخل Kibana.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760545894554/eb73d6ec-e3a7-4a2b-81b4-d86e89c3ea25.png" alt="" align="center" fullwidth="true" />

البيانات بتبدأ من المصدر → تُجمع وتنظّف (Ingest) → تتخزن وتُنظَّم (Store) → تُحلَّل وتُعرض (Analyze).\
وده هو بالضبط مسار حياة البيانات داخل مكدس **Elastic Stack** ❤️

***

## 🔐 ال Fleet و Elastic Agent

هذا الجزء يمثل محور الدرس الأساسي.

### 🚀 ما هو Elastic Agent؟

* وكيل موحّد واحد على الجهاز لجمع:

  * السجلات (Logs)

  * المقاييس (Metrics)

  * بيانات النظام والأمان (Security Data)

* بدلاً من تثبيت Beats متعددة، يتم استخدام وكيل واحد بسياسات تكوين مدمجة.

> **الفائدة:** يقلل التعقيد ويوحّد الإدارة والمراقبة من واجهة واحدة.

***

### ⚙️ ما هو Fleet؟

* واجهة إدارة مركزية داخل **Kibana** لإدارة **Elastic Agents** من الإعداد إلى النشر والمراقبة.

* تتيح لك تحديد **Agent Policies**:

  * التكاملات النشطة على الوكيل.

  * طريقة إرسال البيانات.

  * إعدادات الحماية الفعّالة.

> عند تثبيت Elastic Agent في وضع “Managed by Fleet”، يتصل تلقائيًا بـ **Fleet Server** لتلقي السياسات والتحديثات.

***

### **🧭ال Fleet Server**

* بمثابة **الوسيط (Control Plane)** بين Elastic Agents وواجهة Fleet.

* يُحدث الوكلاء بالسياسات، يستقبل التسجيلات، ويُصدر الأوامر.

***

### ⚖️ الفرق بين وضعي التشغيل

| الوضع                           | الوصف                                                                    |
| ------------------------------- | ------------------------------------------------------------------------ |
| **Managed (مدار بواسطة Fleet)** | يُدار بالكامل من خلال Kibana/Fleet، ويتلقى السياسات والتحديثات تلقائيًا. |
| **Standalone**                  | يُدار يدويًا عبر ملف إعداد محلي `elastic-agent.yml` دون استخدام Fleet.   |

***

## 🧩 إدارة Elastic Agents عبر Fleet

من داخل **Kibana → Management → Fleet → Agents** يمكنك:

* إلغاء تسجيل وكيل (Unenroll Agent)

* تعيين مهلة لعدم النشاط (Inactivity Timeout)

* ترقية الوكلاء إلى إصدار أحدث

* ترحيل وكيل إلى Cluster آخر

* مراقبة حالة الوكلاء (Agents Status)

* عرض السجلات (Logs) ومقاييس الأداء (Performance Metrics)

* استخدام وسوم (Tags) لتصنيف الوكلاء وتنظيمهم

***

## 🚀 خطوات نشر Elastic Agent عبر Fleet

1. في Kibana → Fleet:\
   أنشئ **Agent Policy** وحدد التكاملات المطلوبة.

2. احصل على **رمز التسجيل (Enrollment Token)** للوكلاء الجدد.

3. ثبّت **Elastic Agent** على الجهاز الهدف باستخدام الرمز.

4. يتصل الوكيل بـ **Fleet Server**، يستلم السياسة، ويبدأ جمع البيانات.

5. من **Kibana → Fleet → Agents** يمكنك إدارة الوكلاء (تحديث، حذف، مراقبة).

***

## 🧾 خلاصة الدرس

| الهدف                | الملخص                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| مكونات Elastic Stack | Kibana (واجهة)، Elasticsearch (تحليل وتخزين)، Logstash (استيعاب)، Beats/Agents (جمع البيانات). |
| مكونات الاستيعاب     | Logstash و Beats و Elastic Agent.                                                              |
| Fleet                | واجهة إدارة مركزية في Kibana للوكلاء والسياسات.                                                |
| Fleet Server         | الوسيط الذي يربط Fleet بالوكلاء لتطبيق السياسات والتحديثات.                                    |
| Elastic Agent        | وكيل موحّد يجمع بيانات النظام، المقاييس، والسجلات، ويدعم تكاملات الأمان.                       |
| أوضاع العمل          | Managed (مدار من Fleet) أو Standalone (محلي).                                                  |

