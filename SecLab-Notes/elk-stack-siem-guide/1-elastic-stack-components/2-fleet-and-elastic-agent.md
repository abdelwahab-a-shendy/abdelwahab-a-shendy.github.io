---
id: "68efcdc0443d57302704eca0"
title: "2. Fleet and Elastic Agent "
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/1-elastic-stack-components/2-fleet-and-elastic-agent"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-15T16:37:20.950Z"
updatedAt: "2026-01-25T15:35:47.063Z"
---

## 🎯 **Introduction to Fleet**

**Fleet** is a web-based tool inside **Kibana** used to centrally manage **Elastic Agents** and their associated policies.\
Instead of managing each agent manually, you can control all agents from one place through Kibana’s graphical interface.

***

## 🧠 **Core Functions**

| Component               | Function                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| **Fleet**               | Centralized management for all agents via Kibana.                                         |
| **Elastic Agents**      | Agents installed on systems to collect data from different sources.                       |
| **Agent Policies**      | Define what data the agent collects and which integrations are enabled.                   |
| **Enrollment Tokens**   | Used to register new agents with the Fleet Server.                                        |
| **Uninstall Tokens**    | Used to deregister agents when needed.                                                    |
| **Data Streams**        | Data flow from agents to Elasticsearch.                                                   |
| **Settings & Activity** | Manage Fleet settings and monitor agent statuses (Healthy, Unhealthy, Updating, Offline). |

***

## ⚙️ **Fleet Prerequisites**

For **Fleet** to function properly within **Kibana**, the following requirements must be met:

| Requirement                 | Description                                                 |
| --------------------------- | ----------------------------------------------------------- |
| **Fleet Server**            | Must be properly installed and configured to manage agents. |
| **Internet Connection**     | Required for downloading and updating integration packages. |
| **Air-gapped Environments** | Can be supported using a local package repository.          |
| **Kibana User Privileges**  | The user must have **all privileges** in Kibana.            |

***

## 🧭 **Fleet Configuration Architecture**

The process flow within Fleet works as follows 👇

```bash
Elastic Agent ⇆ Fleet Server ⇆ Elasticsearch ⇆ Kibana (Fleet UI)
          ↑            ↑                           ↑
          |            |                           |
  Artifact Registry    |                    Package Registry
```

### 🔹 **Simplified Explanation:**

1. The **Elastic Agent** registers with the **Fleet Server** using an **Enrollment Token**.

2. The **Fleet Server** sends the assigned policies and receives the agent’s health and activity updates.

3. **Elasticsearch** stores the data collected by the agent.

4. **Kibana (Fleet UI)** allows administrators to manage agents and policies.

5. The **Package Registry** contains all available integrations that can be installed on agents.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760636270393/f83eee03-0eaf-456e-b12c-e4f880241e8a.png" align="center" fullwidth="false" />

***

## 🧩 **Fleet UI: Package Manager**

* Used to manage and describe the available **Integrations** provided by Elastic via Beats and Elastic Agent.

* Usually requires **internet connectivity** since packages are updated periodically.

* **Air-gapped environments** can use a **Local Package Repository** to manually upload packages.

***

## 🌐 **Integrations Page**

Through the **Integrations** page in **Kibana**, you can:

* Connect Elastic to external services and systems (e.g., AWS, Azure, Docker, 1Password...).

* Easily collect new data sources.

* Each integration typically comes with:

  * Prebuilt **Dashboards**

  * **Visualizations**

  * **Pipelines** for data processing

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760636970515/a8b5679a-fd93-4187-96d7-a3c8375ac6e4.png" align="center" fullwidth="true" />

***

## 🧱 **Integrations Examples**

| Integration               | Function                                                       |
| ------------------------- | -------------------------------------------------------------- |
| **Elastic Defend**        | Protects systems from attacks, malware, and ransomware.        |
| **AWS / Azure**           | Monitors cloud environments.                                   |
| **AbuseCH**               | Fetches Indicators of Compromise (IOCs) from multiple sources. |
| **Web Crawler**           | Adds website content indexing and search capabilities.         |
| **Database / Containers** | Monitors databases and containerized environments.             |

***

## 🛡️ **Elastic Defend Integration**

One of the most powerful integrations in **Elastic Security**, offering:

* Protection against malware and ransomware.

* Detection of advanced threats and attack behaviors.

* High-fidelity alerts.

* Terminal session recording and replay.

* Cloud workload protection.

***

## 🧠 **Additional Important Integrations**

| Integration                     | Function                                                                                     |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| **Osquery**                     | Allows querying operating systems as if they were databases (run live queries on endpoints). |
| **Abuse (Threat Intelligence)** | Collects threat indicators (URLs, malicious files, domains) from multiple sources.           |
| **Elastic APM**                 | Monitors application performance (Application Performance Monitoring).                       |

***

## 💡 **Summary**

| Component         | Role                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| **Fleet**         | The central control and management hub.                                |
| **Elastic Agent** | The endpoint component responsible for data collection.                |
| **Elasticsearch** | The central storage for all collected data.                            |
| **Kibana**        | The interface that provides visibility and management over everything. |

***

***

***

## 🎯 **المقدمة (Introduction to Fleet)**

ال **Fleet** هي أداة قائمة على الويب داخل **Kibana** تُستخدم لإدارة **Elastic Agents** والسياسات الخاصة بهم **بشكل مركزي**.\
بدلاً من إدارة كل وكيل (Agent) يدويًا، يمكنك التحكم في جميع الوكلاء من مكان واحد عبر واجهة رسومية داخل Kibana.

## 🧠 **الوظائف الأساسية (Core Functions)**

| العنصر                  | الوظيفة                                                                     |
| ----------------------- | --------------------------------------------------------------------------- |
| **Fleet**               | الإدارة المركزية لجميع الوكلاء (Agents) من خلال Kibana.                     |
| **Elastic Agents**      | الوكلاء المثبتين على الأنظمة لجمع البيانات من المصادر المختلفة.             |
| **Agent Policies**      | تحدد ما هي البيانات التي يجمعها الوكيل، وأي تكاملات (Integrations) مفعّلة.  |
| **Enrollment Tokens**   | رموز تُستخدم لتسجيل الوكلاء الجدد في Fleet Server.                          |
| **Uninstall Tokens**    | رموز لإلغاء تسجيل الوكلاء عند الحاجة.                                       |
| **Data Streams**        | تدفق البيانات من الوكلاء إلى Elasticsearch.                                 |
| **Settings & Activity** | إعدادات Fleet ومتابعة حالة الوكلاء (Healthy، Unhealthy، Updating، Offline). |

***

## ⚙️ **المتطلبات الأساسية (Fleet Prerequisites)**

لكي تعمل **Fleet** داخل **Kibana**، يجب أن يتوفر التالي:

| الشرط                              | التوضيح                                                         |
| ---------------------------------- | --------------------------------------------------------------- |
| **Fleet Server**                   | يجب أن يكون مُثبّت ومُعد بشكل صحيح لإدارة الوكلاء.              |
| **اتصال بالإنترنت**                | مطلوب لتحديث وتحميل حزم التكاملات (Integrations).               |
| **بيئات بدون إنترنت (Air-gapped)** | يمكن دعمها باستخدام مستودع حزم محلي (Local Package Repository). |
| **صلاحيات المستخدم في Kibana**     | يجب أن يمتلك المستخدم جميع الامتيازات (All privileges).         |

***

## 🧭 **بنية Fleet (Fleet Configuration Architecture)**

سير العملية داخل Fleet يتم بالشكل التالي 👇

```css
Elastic Agent ⇆ Fleet Server ⇆ Elasticsearch ⇆ Kibana (Fleet UI)
          ↑            ↑                           ↑
          |            |                           |
  Artifact Registry    |                    Package Registry
```

### 🔹 **الشرح المبسط:**

1. ال **Elastic Agent** يسجل نفسه في **Fleet Server** باستخدام **Enrollment Token**.

2. ال **Fleet Server** يرسل له السياسات (Policies) ويستقبل حالته ونشاطه.

3. ال **Elasticsearch** يخزن البيانات التي يجمعها الوكيل.

4. ال **Kibana (Fleet UI)** تسمح للمسؤول بإدارة السياسات والوكلاء.

5. ال **Package Registry** تحتوي على جميع التكاملات (Integrations) القابلة للتثبيت على الوكلاء.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760636270393/f83eee03-0eaf-456e-b12c-e4f880241e8a.png" align="center" fullwidth="false" />

***

## 🧩 **واجهة Fleet UI: مدير الحزم (Package Manager)**

* تُستخدم لإدارة وشرح التكاملات (Integrations) التي يوفرها Elastic عبر Beats و Elastic Agent.

* تحتاج عادة إلى **اتصال بالإنترنت** لأن الحزم يتم تحديثها دوريًا.

* **البيئات المغلقة (Air-gapped)** يمكنها إعداد **مستودع محلي (Local Package Repository)** لتحميل الحزم يدويًا.

***

## 🌐 **واجهة التكاملات (Integrations Page)**

من خلال صفحة **Integrations** في **Kibana** يمكنك:

* ربط Elastic بالخدمات والأنظمة الخارجية (مثل AWS, Azure, Docker, 1Password...).

* جمع مصادر جديدة من البيانات بسهولة.

* كل تكامل يأتي غالبًا بـ:

  * ال Dashboards جاهزة

  * ال Visualizations

  * ال Pipelines لمعالجة البيانات

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760636970515/a8b5679a-fd93-4187-96d7-a3c8375ac6e4.png" align="center" fullwidth="true" />

***

## 🧱 **أمثلة على التكاملات (Integrations Examples)**

| التكامل                   | الوظيفة                                                           |
| ------------------------- | ----------------------------------------------------------------- |
| **Elastic Defend**        | لحماية الأنظمة من الهجمات، البرامج الخبيثة، والفدية (Ransomware). |
| **AWS / Azure**           | لمراقبة بيئات السحابة.                                            |
| **AbuseCH**               | لجلب مؤشرات التهديد (Indicators of Compromise) من مصادر متعددة.   |
| **Web Crawler**           | لإضافة خاصية البحث داخل المواقع الإلكترونية.                      |
| **Database / Containers** | لمراقبة قواعد البيانات والحاويات.                                 |

***

## 🛡️ **ال Elastic Defend Integration**

من أقوى تكاملات **Elastic Security**، حيث يتيح:

* منع البرامج الخبيثة والفدية (Ransomware).

* اكتشاف التهديدات المتقدمة وسلوكيات الهجوم.

* توفير تنبيهات عالية الدقة (High Fidelity Alerts).

* تسجيل جلسات الطرفية (Terminal Sessions Replay).

* حماية بيئات السحابة (Cloud Workloads).

***

## 🧠 **تكاملات إضافية مهمة (Additional Integrations)**

| التكامل                         | الوظيفة                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| **Osquery**                     | يسمح بالاستعلام عن أنظمة التشغيل كأنها قاعدة بيانات (تشغيل استعلامات حيّة على الأجهزة). |
| **Abuse (Threat Intelligence)** | يجمع مؤشرات التهديد (URLs، ملفات ضارة، نطاقات خبيثة) من مصادر متعددة.                   |
| **Elastic APM**                 | لمراقبة أداء التطبيقات (Application Performance Monitoring).                            |

***

## 💡 **الخلاصة**

| المكون            | الوظيفة                                        |
| ----------------- | ---------------------------------------------- |
| **Fleet**         | مركز التحكم والإدارة.                          |
| **Elastic Agent** | المنفذ على الأجهزة والمسؤول عن جمع البيانات.   |
| **Elasticsearch** | المخزن المركزي لجميع البيانات.                 |
| **Kibana**        | الواجهة التي تتيح لك الرؤية والتحكم في كل شيء. |

