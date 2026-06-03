---
id: "68f1315f09f18a43af66b882"
title: "3. Fleet Configuration"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/1-elastic-stack-components/3-fleet-configuration"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-16T17:54:39.973Z"
updatedAt: "2026-01-25T15:35:47.064Z"
---

## 🧱 **1. Fleet UI: Policy Builder**

The **Policy Builder** in the **Fleet** interface of Kibana is used to create **Agent Policies**, which act as frameworks that agents (Elastic Agents) register under — defining what data they collect and how they operate.

### 🔹 **What Does the Policy Builder Do?**

* Creates a new **Agent Policy** for enrolling devices.

* Each **Agent Policy** consists of a group of **individual integrations**.

* Each integration includes specific settings that can be customized as needed.

📌 **Example Use Case:**\
A custom policy for monitoring Linux servers might include:

* **Filebeat** for collecting logs.

* **Metricbeat** for collecting system metrics (CPU, Memory, etc.).

* **Elastic Defend** for threat protection.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760757855063/3c17df84-04e3-44de-b3e8-dbdf5216ceff.png" align="center" fullwidth="false" />

***

## 🧩 **2. Fleet UI: Agent Policies**

The **Agent Policies** page is used to manage the relationship between integrations and agents.

### ✳️ **Core Functions:**

* **Attach Integrations** to policies.

* **Assign multiple agents to one policy** (Many-to-One relationship).

* **Configure each integration’s settings** attached to a policy independently.

📌 **Main Idea:**\
A group of agents can operate under the same policy if they perform similar tasks — making centralized management easier and more organized.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760757863899/aa048c52-f616-4a0c-8765-43809e5657ab.png" align="center" fullwidth="false" />

***

## 🧠 **3. Fleet UI: Agents**

This page allows you to manage all installed **Elastic Agents** across systems from one place within Kibana.

### ✳️ **Core Functions:**

* **Centralized Management:** View all agents and their current status.

* **Monitor & Troubleshoot:** Identify whether each agent is working properly or facing issues.

* **Deploy New Agents:** Easily install additional agents on systems.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760757875750/74eb448a-e3ad-40af-a99a-2f5082f48728.png" align="center" fullwidth="false" />

📊 **Common Agent States:**

| State            | Description                                  |
| ---------------- | -------------------------------------------- |
| ✅ **Healthy**    | Running normally.                            |
| ⚠️ **Unhealthy** | Experiencing issues or temporarily stopped.  |
| 🔄 **Updating**  | Currently being upgraded to a newer version. |
| 🔴 **Offline**   | Disconnected from the server.                |

***

## 📦 **4. Elastic Package Registry**

An online hosting service dedicated to **Elastic Agent integrations** available inside Kibana.

### ✳️ **Core Function:**

* Enables regular updates and releases of integrations in sync with Elastic updates.

* **Kibana** connects to the official repository at:\
  🔗 [`https://epr.elastic.co`](https://epr.elastic.co)

### 🌐 **Air-gapped Environments:**

* Supported through a **Local Package Repository**, allowing manual updates without internet access.

***

## 🧰 **5. Elastic Artifact Registry**

An online hosting service that provides the **binaries** required for installing and upgrading **Elastic Agents**.

### ✳️ **Core Function:**

* Installed agents download executable files from:\
  🔗 [`https://artifacts.elastic.co`](https://artifacts.elastic.co)

* **Elastic Defend** also requires access to additional security artifacts from:\
  🔗 [`https://security.artifacts.elastic.co`](https://security.artifacts.elastic.co)

### 🌐 **Air-gapped Environments:**

* Supported through a **Local Artifact Repository** within the internal network.

***

## 🖥️ **6. Fleet Server**

The **Fleet Server** is the central component responsible for managing communication between **Elastic Agents** and **Elasticsearch**.

### ✳️ **Core Functions:**

* Enables **centralized management** of all agents through Kibana.

* Allows **remote agents** to communicate with Elasticsearch.

* Deployed as a **special agent policy** using an Elastic Agent.

* Provides a **scalable infrastructure** to support a large number of agents.

📌 **Support:**

* Available in **Elastic Cloud ☁️**.

* Also supported in **Self-managed Environments 🖥️**.

***

## 💡 **Summary**

| Component             | Function                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------- |
| **Policy Builder**    | Creates agent policies containing specific integrations and settings.                       |
| **Agent Policies**    | Organizes and manages the integrations attached to each policy.                             |
| **Agents**            | Installed components responsible for data collection on systems.                            |
| **Package Registry**  | Official Elastic integration source (online or local).                                      |
| **Artifact Registry** | Source for Elastic Agent binaries and updates.                                              |
| **Fleet Server**      | The central hub connecting Elastic Agents with Elasticsearch for infrastructure management. |

***

***

***

## 🧱 **1. واجهة مستخدم Fleet: منشئ السياسات (Fleet UI: Policy Builder)**

يُستخدم **Policy Builder** داخل واجهة **Fleet** في Kibana لإنشاء سياسات **Agent Policies**، وهي الإطار الذي يُسجَّل تحته الوكلاء (Agents) ويحدد ما الذي سيجمعونه من بيانات وكيف.

### 🔹 **ما الذي يفعله Policy Builder؟**

* إنشاء **Agent Policy** جديدة لتسجيل (Enroll) الأجهزة فيها.

* كل **Agent Policy** تتكوّن من مجموعة من **التكاملات (Integrations)** الفردية.

* كل تكامل يحتوي على إعدادات خاصة يمكن تعديلها وتخصيصها حسب الحاجة.

📌 **مثال تطبيقي:**\
سياسة مخصصة لمراقبة خوادم Linux تحتوي على:

* **Filebeat** لجمع السجلات (Logs).

* **Metricbeat** لجمع مقاييس النظام (CPU, Memory...).

* **Elastic Defend** لتوفير الحماية من التهديدات.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760757855063/3c17df84-04e3-44de-b3e8-dbdf5216ceff.png" align="center" fullwidth="false" />

***

## 🧩 **2. واجهة مستخدم Fleet: سياسات Agent (Fleet UI: Agent Policies)**

تُستخدم صفحة **Agent Policies** لإدارة العلاقات بين التكاملات والوكلاء.

### ✳️ **الوظائف الأساسية:**

* **إرفاق التكاملات (Attach Integrations)** بالسياسة.

* **تعيين عدة وكلاء لسياسة واحدة** (Many-to-one Relationship).

* **تكوين إعدادات كل تكامل** مرفق بالسياسة بشكل مستقل.

📌 **الفكرة الأساسية:**\
يمكن لمجموعة من الوكلاء (Agents) العمل تحت نفس السياسة إذا كانت مهامهم متشابهة — مما يجعل الإدارة المركزية أكثر سهولة وتنظيماً.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760757863899/aa048c52-f616-4a0c-8765-43809e5657ab.png" align="center" fullwidth="false" />

***

## 🧠 **3. واجهة مستخدم Fleet: الوكلاء (Fleet UI: Agents)**

من خلال هذه الصفحة، يمكنك إدارة جميع الوكلاء (Agents) المثبتين على الأنظمة من مكان واحد في Kibana.

### ✳️ **الوظائف الأساسية:**

* **الإدارة المركزية (Centralized Management):** عرض جميع الوكلاء وحالتهم الحالية.

* **مراقبة واستكشاف الأخطاء (Monitor & Troubleshoot):** تحديد حالة كل وكيل إن كان يعمل أو به خطأ.

* **نشر وكلاء جدد (Deploy New Agents):** تثبيت وكلاء إضافيين على الأنظمة بسهولة.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760757875750/74eb448a-e3ad-40af-a99a-2f5082f48728.png" align="center" fullwidth="false" />

📊 **الحالات الشائعة للوكلاء:**

| الحالة           | الوصف                         |
| ---------------- | ----------------------------- |
| ✅ **Healthy**    | يعمل بشكل سليم.               |
| ⚠️ **Unhealthy** | يحتوي على مشاكل أو توقف مؤقت. |
| 🔄 **Updating**  | جارٍ تحديثه إلى إصدار أحدث.   |
| 🔴 **Offline**   | غير متصل حاليًا بالخادم.      |

***

## 📦 **4. سجل حزم Elastic (Elastic Package Registry)**

هي خدمة استضافة عبر الإنترنت مخصّصة لحزم **التكاملات (Integrations)** الخاصة بـ **Elastic Agent** والموجودة داخل Kibana.

### ✳️ **الوظيفة الأساسية:**

* تمكّن من تحديث وإصدار التكاملات بشكل دوري مع تحديثات Elastic الجديدة.

* يتصل **Kibana** بالمستودع الرسمي على:\
  🔗 [`https://epr.elastic.co`](https://epr.elastic.co)

### 🌐 **البيئات المعزولة (Air-gapped Environments):**

* يمكن دعمها من خلال **مستودع حزم محلي (Local Package Repository)** لتثبيت التحديثات يدويًا دون الحاجة إلى اتصال بالإنترنت.

***

## 🧰 **5. سجل القطع الأثرية لـ Elastic (Elastic Artifact Registry)**

هي خدمة استضافة عبر الإنترنت توفر **الملفات الثنائية (binaries)** اللازمة لتثبيت وترقية **Elastic Agent**.

### ✳️ **الوظيفة الأساسية:**

* يقوم الوكلاء المثبتون بتحميل الملفات التنفيذية من:\
  🔗 [`https://artifacts.elastic.co`](https://artifacts.elastic.co)

* يحتاج **Elastic Defend** إلى وصول إضافي لتحديثات وقطع أثرية أمنية من:\
  🔗 [`https://security.artifacts.elastic.co`](https://security.artifacts.elastic.co)

### 🌐 **البيئات المعزولة:**

* يمكن دعمها من خلال **مستودع قطع أثرية محلي (Local Artifact Repository)** داخل الشبكة الداخلية.

***

## 🖥️ **6. خادم Fleet (Fleet Server)**

يُعد **Fleet Server** المكون المركزي المسؤول عن إدارة الاتصال بين **Elastic Agents** و **Elasticsearch**.

### ✳️ **الوظائف الأساسية:**

* يسمح **للإدارة المركزية** لجميع الوكلاء عبر واجهة Kibana.

* يمكّن الوكلاء البعيدين (Remote Agents) من التواصل مع Elasticsearch.

* يتم نشره كـ **سياسة خاصة (Special Agent Policy)** باستخدام Elastic Agent نفسه.

* يوفر **بنية تحتية قابلة للتوسع (Scalable Infrastructure)** لدعم عدد كبير من الوكلاء.

📌 **الدعم:**

* متاح في **Elastic Cloud ☁️**.

* ومدعوم أيضًا في **البيئات الذاتية (Self-managed Environments) 🖥️**.

***

## 💡 **الخلاصة**

| المكون                | الوظيفة                                                                    |
| --------------------- | -------------------------------------------------------------------------- |
| **Policy Builder**    | إنشاء سياسات للوكلاء تحتوي على تكاملات وإعدادات محددة.                     |
| **Agent Policies**    | تنظيم وإدارة التكاملات المرفقة بكل سياسة.                                  |
| **Agents**            | الوكلاء المثبتون على الأنظمة والمسؤولون عن جمع البيانات.                   |
| **Package Registry**  | مصدر تكاملات Elastic الرسمي عبر الإنترنت أو محليًا.                        |
| **Artifact Registry** | مصدر الملفات التنفيذية والتحديثات الخاصة بـ Elastic Agent.                 |
| **Fleet Server**      | المحور الذي يربط بين Elastic Agents و Elasticsearch لإدارة البنية التحتية. |

