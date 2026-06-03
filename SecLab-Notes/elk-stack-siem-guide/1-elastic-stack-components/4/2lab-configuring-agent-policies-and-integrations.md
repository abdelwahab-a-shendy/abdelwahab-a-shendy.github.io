---
id: "68f39f3bb6e7ca93c8f9baec"
title: "2.LAB-Configuring Agent Policies and Integrations"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/1-elastic-stack-components/4/2lab-configuring-agent-policies-and-integrations"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-18T14:07:55.182Z"
updatedAt: "2026-01-25T15:35:47.070Z"
---

### 🎯 **Lab Objective (Objective)**

Learn how to configure an Agent policy and add Elastic Defend Integration to enable Endpoint Security on Windows devices using Fleet inside Kibana.

📚 Official reference:\
🔗 [Elastic Agent Installation & Integrations](https://www.elastic.co/guide/en/fleet/8.14/elastic-agent-installation.html)

***

## 🧩 Detailed Steps

### 🔹 **1.** Open the Agent Policies page in Kibana

1. From Kibana → Management → Fleet

2. Select **Agent policies** from the top tabs.

3. Open the policy you previously created in Lab 1:

   * Policy name: 🏷️ `Agent Policy Lab`

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.02.1_select_agent_policy.png" align="left" fullwidth="false" />

***

### 🔹 **2.** Add Elastic Defend Integration

1. Inside the **Agent Policy Lab** page, click **Add integration**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.1_add_integration.png" align="left" fullwidth="false" />

   The integrations page will appear; note that there are many available integrations.

   2. Select **Elastic Defend**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.2_select_elastic_defend.png" align="left" fullwidth="false" />

   3. Click **+ Add Elastic Defend**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.3_add_elastic_defend.png" align="left" fullwidth="false" />

   4. Enter integration name: 🏷️ `elastic-defend-lab`

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.5_name_integration.png" align="left" fullwidth="false" />

   5. Under **Configuration Settings**:

      * Choose **Complete EDR (Endpoint Detection & Response)**

      * Ensure **Existing hosts** is selected and the policy is **Agent Policy Lab**

   6. Click **Save and continue**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.7_configuration_settings.png" align="left" fullwidth="false" />

   7. When prompted, click **Save and deploy changes**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.8_save_and_deploy.png" align="left" fullwidth="false" />

   The newly configured Elastic Agent will reconnect to Elasticsearch and start installing the Endpoint Security integration. Before we check the agent status, we need to make a change to the Endpoint Security policy we just created.

***

### 🔹 **3.** Update the Endpoint Security policy

1. Go back to Management → Fleet → Agent policies

2. Select **Agent Policy Lab**

3. Click on the **elastic-defend-lab** integration

4. Scroll down and select **Enabled** under **Register as antivirus**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.04.5_register_av.png" align="left" fullwidth="false" />

   > This will register Elastic Security as an antivirus on Windows and disable Windows Defender.

   5. Click **Save integration**

   6. When prompted, click **Save and deploy changes**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.04.6_save_and_deploy.png" align="left" fullwidth="false" />

***

### 🔹 **4.** Verify the Elastic Agent

1. Go to the **Agents** tab in Fleet

2. Select the host **student**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.05.1_select_agent_hostname.png" align="left" fullwidth="false" />

   3. Under **Overview**, ensure the agent status is **Healthy ✅**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.05.2_agent_details_status.png" align="left" fullwidth="false" />

   4. From the **Integrations** tab, verify that the **Policy Response** is successfully connected to the agent

***

### 🧠 **Lesson Summary**

| Step                     | Objective                                                            |
| ------------------------ | -------------------------------------------------------------------- |
| Open Agent Policies page | To access the previously created policy.                             |
| Add Elastic Defend       | To enable Endpoint Security on the agent.                            |
| Update policy            | Register Elastic Security as antivirus and disable Windows Defender. |
| Verify status            | Ensure the Agent is healthy and sending data correctly.              |

📊 **Result:**\
The Agent Policy was successfully configured, Elastic Defend was added, and the agent is now able to protect the device and send security data to Kibana and Elasticsearch.

***

***

***

### 🎯 الهدف من المعمل (Objective)

تعلّم كيفية **تهيئة سياسة Agent** وإضافة **Elastic Defend Integration** لتفعيل Endpoint Security على أجهزة Windows باستخدام Fleet داخل Kibana.

📚 **المرجع الرسمي:**\
🔗 [Elastic Agent Installation & Integrations](https://www.elastic.co/guide/en/fleet/8.14/elastic-agent-installation.html)

***

## 🧩 **الخطوات التفصيلية**

### 🔹 **1. فتح صفحة Agent Policies في Kibana**

1. من **Kibana → Management → Fleet**

2. اختر **Agent policies** من التبويبات العليا.

3. افتح السياسة التي أنشأتها مسبقًا في Lab 1.1:

   * اسم السياسة: 🏷️ `Agent Policy Lab`

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.02.1_select_agent_policy.png" align="left" fullwidth="false" />

***

### 🔹 **2. إضافة Elastic Defend Integration**

1. داخل صفحة **Agent Policy Lab**، اضغط على **Add integration**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.1_add_integration.png" align="left" fullwidth="false" />

   يتم عرض صفحة عمليات التكامل، لاحظ أن هناك العديد من عمليات التكامل المتاحة.

   2. اختر **Elastic Defend**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.2_select_elastic_defend.png" align="left" fullwidth="false" />

   3. اضغط **+ Add Elastic Defend**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.3_add_elastic_defend.png" align="left" fullwidth="false" />

   4. أدخل اسم التكامل: 🏷️ `elastic-defend-lab`

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.5_name_integration.png" align="left" fullwidth="false" />

   5. ضمن **Configuration Settings**:

      * اختر **Complete EDR (Endpoint Detection & Response)**

      * تأكد أن **Existing hosts** محدد وأن السياسة هي **Agent Policy Lab**

   6. اضغط **Save and continue**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.7_configuration_settings.png" align="left" fullwidth="false" />

   7. عند المطالبة، اضغط **Save and deploy changes**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.03.8_save_and_deploy.png" align="left" fullwidth="false" />

   سوف يقوم Elastic Agent الذي تم تكوينه حديثًا بالاتصال مرة أخرى بـ Elasticsearch والبدء في تثبيت تكامل Endpoint Security. قبل أن نتحقق من حالة الوكيل، نحتاج إلى إجراء تغيير على سياسة Endpoint Security التي أنشأناها للتو.

***

### 🔹 **3. تحديث سياسة Endpoint Security**

1. عد إلى **Management → Fleet → Agent policies**

2. اختر **Agent Policy Lab**

3. اضغط على تكامل **elastic-defend-lab**

4. مرّر للأسفل وحدد **Enabled** تحت **Register as antivirus**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.04.5_register_av.png" align="left" fullwidth="false" />

   > هذا سيقوم بتسجيل Elastic Security كـ Antivirus على Windows وتعطيل Windows Defender.

   5. اضغط **Save integration**

   6. عند المطالبة، اضغط **Save and deploy changes**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.04.6_save_and_deploy.png" align="left" fullwidth="false" />

***

### 🔹 **4. التحقق من صحة Elastic Agent**

1. اذهب إلى تبويب **Agents** في Fleet

2. اختر المضيف **student**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.05.1_select_agent_hostname.png" align="left" fullwidth="false" />

   3. ضمن قسم **Overview**، تأكد أن حالة الوكيل **Healthy ✅**

   <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.2/1.2.05.2_agent_details_status.png" align="left" fullwidth="false" />

   4. من تبويب **Integrations**، تحقق من أن الاستجابات (Policy Response) متصلة بالوكيل بنجاح

***

### 🧠 **ملخص الدرس**

في هذا المعمل قمنا بـ:

| الخطوة                  | الهدف                                                        |
| ----------------------- | ------------------------------------------------------------ |
| فتح صفحة Agent Policies | للوصول إلى السياسة التي تم إنشاؤها مسبقًا.                   |
| إضافة Elastic Defend    | لتفعيل Endpoint Security على الوكيل.                         |
| تحديث السياسة           | تسجيل Elastic Security كـ Antivirus وتعطيل Windows Defender. |
| التحقق من الحالة        | التأكد من أن الـ Agent بصحة جيدة ويرسل البيانات بشكل صحيح.   |

📊 **النتيجة:**\
تم تهيئة **Agent Policy** وإضافة **Elastic Defend** بنجاح، وأصبح الوكيل قادرًا على حماية الجهاز وإرسال بيانات الأمان إلى Kibana و Elasticsearch.

