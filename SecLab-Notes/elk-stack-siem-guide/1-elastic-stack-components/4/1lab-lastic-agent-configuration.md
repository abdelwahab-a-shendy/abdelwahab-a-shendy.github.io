---
id: "68f32aad91e8649264d16dc9"
title: "1.LAB-Elastic Agent Configuration"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/1-elastic-stack-components/4/1lab-lastic-agent-configuration"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-18T05:50:37.136Z"
updatedAt: "2026-01-25T15:35:47.069Z"
---

## ⚙️ Lab 1.1: Elastic Agent Configuration

### 🎯 **Objective**

Learn how to **configure the Elastic Agent** using **Fleet inside Kibana** and connect it to **Elasticsearch** for system monitoring and data collection.

### 📚 **Official Reference**

🔗 [Install Fleet-managed Elastic Agent (Elastic Docs](https://www.elastic.co/guide/en/fleet/current/fleet-install.html)[)](https://www.elastic.co/guide/en/fleet/current/fleet-install.html)

***

## 🧩 **Detailed Steps**

#### 🔹 **Step 1: Open Fleet in Kibana**

* In the **Kibana** sidebar, navigate to:\
  `Management → Fleet`

* The **Agents and Integrations** management page will appear.

* This page is the central hub for managing all Elastic Agents in your system.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769798394/9b2b623e-4ac3-4cc9-ae27-3740a2655e58.png" align="center" fullwidth="false" />

***

### 🔹 **Step 2: Configure Elastic Agent**

1. Click **Add Agent** inside the Fleet page.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769830210/69b4059a-0bb7-473c-bc71-7284ea6ccb30.png" align="center" fullwidth="false" />

1. To create a new agent, you need an **Agent Policy**.

2. Enter the policy name:\
   🏷️ `Agent Policy LAB`

   * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769927842/f1bd0fec-74c9-47a9-a21c-a1c33458bd38.png" align="center" fullwidth="false" />

3. * Click **Create Policy** and wait for it to be created.

4. Leave the default **Enroll in Fleet** option enabled (it links the agent directly to the Fleet Server).

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769947580/2b78a000-8d01-4d11-a3e7-87d48bd360bc.png" align="center" fullwidth="false" />

5. Choose the operating system: **Windows**.

   > <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769961805/9ef2dd80-32e1-4500-8f54-0a8dd9981d0a.png" align="center" fullwidth="false" />
   >
   > 1. A **PowerShell command** will appear to install the agent on the Windows machine.

💡 **Important Note:**\
Copy only the **last line** of the command (the one starting with `.\elastic-agent.exe install …`) — this will be used in the next step.

***

### 🔹 **Step 3: Open Windows Machine in Strigo**

* From the top of the **Strigo** window, click the arrow next to your session (`student-lab`).

* Select **Windows-Endpoint** to open the machine where the agent will be installed.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769972550/d8b40a30-cfef-468b-af03-7e77058d8dd7.png" align="center" fullwidth="false" />

***

### 🔹 **Step 4: Install Elastic Agent on Windows**

1. Open **File Explorer → This PC → Local Disk (C:)**

2. Go to folder `C:\Agent`

3. Right-click the Elastic Agent zip file → **Extract All** → Click **Extract**

4. After extraction, open a **PowerShell window** in the folder:

   * Shift + Right Click → **Open PowerShell window here**

     <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.1/1.1.04.6_open_powershell.png" alt="" align="left" fullwidth="false" />

     * Or type `powershell` in the address bar :

     <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770007430/d7058171-95bc-4c86-90a4-3fecd10505b7.png" align="center" fullwidth="false" />

Paste the copied command (the last line only):

```powershell
$ProgressPreference = 'SilentlyContinue' Invoke-WebRequest -Uri https://artifacts.elastic.co/downloads/beats/elastic-agent/elastic-agent-8.14.3-windows-x86_64.zip -OutFile elastic-agent-8.14.3-windows-x86_64.zip Expand-Archive .\elastic-agent-8.14.3-windows-x86_64.zip -DestinationPath . cd elastic-agent-8.14.3-windows-x86_64 .\elastic-agent.exe install --url=https://i-08e5765f324a0ab17.elasticlabs.training:8220 --enrollment-token=UnRqeTlaa0JPSVJJSkdEVmtUOE06QTRvVnJHek9TM2VlMXJ4V2g3Z0xWZw==
```

You will notice that there is more than one command, and since the file is present in the machine and also inside the folder, I will do the following: Take the copy to the last part only:

```powershell
.\elastic-agent.exe install --url=https://i-08e5765f324a0ab17.elasticlabs.training:8220 --enrollment-token=UnRqeTlaa0JPSVJJSkdEVmtUOE06QTRvVnJHek9TM2VlMXJ4V2g3Z0xWZw==
```

1. In the PowerShell window:

   * Paste the command you copied earlier:

     `.\elastic-agent.exe install --url=`[`https://i-`](https://i-)`....`

   * When asked "Do you want to continue?"

     Type Y and press Enter ✅

2. The installation will begin, and the agent will automatically register with Fleet:

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770037017/b232bc7b-a8aa-48e8-b036-67fc0e3a53a9.png" align="center" fullwidth="false" />

***

### 🔹 **Step 5: Verify Registration and Data**

1. Go back to **Kibana → Fleet**

2. You should see the new agent listed ✅

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770064521/f2c18cb0-824b-4efb-9b71-188f2fa484ec.png" align="center" fullwidth="false" />

3. * Close the **Add Agent** window.

4. Select the new host named **student**.

5. <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770096768/71815a3b-5296-44aa-a991-9b212981e9d5.png" align="center" fullwidth="false" />

6. Under the **Logs** tab, check that the following data is appearing:

   * System Logs

   * Security Logs

   * Metrics

   * Application Data

> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770253032/d3045d56-4294-4f74-a35c-c42418bfc642.png" align="center" fullwidth="false" />
>
> * If the logs are visible, the connection between the **Agent** and **Fleet** is working successfully.

***

## 🧠 **Lesson Summary**

| Step                    | Objective                                                 |
| ----------------------- | --------------------------------------------------------- |
| Create Agent Policy     | Define the settings and integrations for the agent        |
| Install Elastic Agent   | Connect the Windows machine to the Elastic Stack          |
| Register Agent in Fleet | Allow it to send data for analysis in Kibana              |
| Verify Connection       | Ensure the agent is sending logs and metrics successfully |

***

### 📊 **Outcome**

The **Elastic Agent** has been successfully set up via **Fleet** and is sending system data directly to **Elasticsearch** to be visualized and analyzed in **Kibana**.

***

***

***

## ⚙️ **Lab 1.1: Elastic Agent Configuration**

### 🎯 الهدف من المعمل (Objective)

تعلّم كيفية **تهيئة (Configure) Elastic Agent باستخدام Fleet** داخل Kibana وربطه بالـ Elasticsearch لمراقبة النظام وجمع البيانات.

📚 **المرجع الرسمي:**\
🔗 [Install Fleet-managed Elastic Agent (Elastic Docs)](https://www.elastic.co/guide/en/fleet/8.14/install-fleet-managed-elastic-agent.html)

***

## 🧩 **الخطوات التفصيلية**

### 🔹 **الخطوة 1: فتح Fleet في Kibana**

1. من واجهة **Kibana**، انتقل إلى القائمة الجانبية واختر:\
   **Management → Fleet**

2. هتظهر لك صفحة إدارة الـ Agents والتكاملات (Integrations).

   هذه الصفحة هي مركز إدارة جميع الـ Elastic Agents في النظام :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769798394/9b2b623e-4ac3-4cc9-ae27-3740a2655e58.png" align="center" fullwidth="false" />

***

### 🔹 **الخطوة 2: إعداد Elastic Agent**

1. اضغط على **Add Agent** من داخل صفحة Fleet :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769830210/69b4059a-0bb7-473c-bc71-7284ea6ccb30.png" align="center" fullwidth="false" />

1. لإنشاء وكيل جديد، تحتاج إلى **سياسة (Agent Policy)**.

   * أدخل اسم السياسة:\
     🏷️ `Agent Policy LAB`

     <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769927842/f1bd0fec-74c9-47a9-a21c-a1c33458bd38.png" align="center" fullwidth="false" />

2. اضغط على **Create Policy** وانتظر لحين إنشائها.

3. اترك الخيار الافتراضي **Enroll in Fleet** كما هو (لأنه يربط الوكيل مباشرة بـ Fleet Server) :

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769947580/2b78a000-8d01-4d11-a3e7-87d48bd360bc.png" align="center" fullwidth="false" />

4. اختر نظام التشغيل: **Windows**

   > <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769961805/9ef2dd80-32e1-4500-8f54-0a8dd9981d0a.png" align="center" fullwidth="false" />
   >
   > سيظهر أمر PowerShell لتثبيت الـ Agent على جهاز Windows.

💡 **ملاحظة مهمة:**\
انسخ فقط **السطر الأخير** من الأمر المعروض (الذي يبدأ بـ `.\elastic-agent.exe install …`)\
ستستخدمه لاحقًا في مرحلة التثبيت.

***

### 🔹 **الخطوة 3: فتح جهاز Windows من Strigo**

1. من أعلى نافذة Strigo، اضغط السهم بجانب اسم الجلسة `student-lab`.

2. اختر **Windows-Endpoint** لفتح الجهاز الذي سنثبت عليه الوكيل.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760769972550/d8b40a30-cfef-468b-af03-7e77058d8dd7.png" align="center" fullwidth="false" />

***

### 🔹 **الخطوة 4: تثبيت Elastic Agent على Windows**

1. افتح **File Explorer → This PC → Local Disk (C:)**

2. ادخل المجلد **C:\Agent**

3. اضغط **Right Click → Extract All** على ملف الـ Elastic Agent المضغوط.

4. اضغط **Extract** لبدء فك الضغط.

5. بعد الاستخراج، داخل المجلد الجديد:

   * اضغط **Shift + Right Click** ثم اختر **Open PowerShell window here**

     <Image src="https://i-0ca31171cfdc847f5.elasticlabs.training/files/lab1.1/1.1.04.6_open_powershell.png" alt="" align="left" fullwidth="false" />

     او من خلال كتابه poweshell في العنوان بالاعلي :

     <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770007430/d7058171-95bc-4c86-90a4-3fecd10505b7.png" align="center" fullwidth="false" />

لو ركزت في اللي مكتوب في الخطوه الثالثه : Install Elastic Agent on your host :

```powershell
$ProgressPreference = 'SilentlyContinue' Invoke-WebRequest -Uri https://artifacts.elastic.co/downloads/beats/elastic-agent/elastic-agent-8.14.3-windows-x86_64.zip -OutFile elastic-agent-8.14.3-windows-x86_64.zip Expand-Archive .\elastic-agent-8.14.3-windows-x86_64.zip -DestinationPath . cd elastic-agent-8.14.3-windows-x86_64 .\elastic-agent.exe install --url=https://i-08e5765f324a0ab17.elasticlabs.training:8220 --enrollment-token=UnRqeTlaa0JPSVJJSkdEVmtUOE06QTRvVnJHek9TM2VlMXJ4V2g3Z0xWZw==
```

هتلاحظ انه اكتر من امر و بما ان في الماشين احنا الفايل موجود و كمان جوا الفولدر فا هعمل الاتي : خد ال copy لاخر جزء بس :

```powershell
.\elastic-agent.exe install --url=https://i-08e5765f324a0ab17.elasticlabs.training:8220 --enrollment-token=UnRqeTlaa0JPSVJJSkdEVmtUOE06QTRvVnJHek9TM2VlMXJ4V2g3Z0xWZw==
```

1. في نافذة PowerShell:

   * الصق الأمر الذي نسخته من قبل:

     `.\elastic-agent.exe install --url=`[`https://i-`](https://i-)`....`

   * عند سؤالك “Do you want to continue?”\
     اكتب `Y` ثم اضغط Enter ✅

2. سيبدأ التثبيت، ويقوم الوكيل بالتسجيل تلقائيًا في Fleet :

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770037017/b232bc7b-a8aa-48e8-b036-67fc0e3a53a9.png" align="center" fullwidth="false" />

***

### 🔹 **الخطوة 5: التحقق من التسجيل وإرسال البيانات**

1. ارجع إلى **Kibana → Fleet**

2. الآن يجب أن ترى الوكيل الجديد مضافًا ضمن قائمة الـ Agents ✅

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770064521/f2c18cb0-824b-4efb-9b71-188f2fa484ec.png" align="center" fullwidth="false" />

3. أغلق نافذة **Add Agent**

4. اختر المضيف الجديد (Host) الذي اسمه **student**

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770096768/71815a3b-5296-44aa-a991-9b212981e9d5.png" align="center" fullwidth="false" />

5. من تبويب **Logs**، تأكد من ظهور بيانات الأنشطة:

   * System Logs

   * Security Logs

   * Metrics

   * Application Data

> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760770253032/d3045d56-4294-4f74-a35c-c42418bfc642.png" align="center" fullwidth="false" />
>
> إذا ظهرت السجلات، فهذا يعني أن الاتصال بين الـ Agent و Fleet يعمل بنجاح.

***

## 🧠 **ملخص الدرس**

في هذا المعمل قمنا بـ:

| الخطوة                | الهدف                                            |
| --------------------- | ------------------------------------------------ |
| إنشاء Agent Policy    | لتحديد الإعدادات والتكاملات الخاصة بالوكلاء.     |
| تثبيت Elastic Agent   | لربط جهاز Windows بـ Elastic Stack.              |
| تسجيل الوكيل في Fleet | للسماح له بإرسال البيانات وتحليلها في Kibana.    |
| التحقق من الاتصال     | لضمان أن الـ Agent يرسل السجلات والمقاييس بنجاح. |

📊 **النتيجة:**\
تم إعداد **Elastic Agent** بنجاح عبر **Fleet**، وأصبح يرسل بيانات النظام بشكل مباشر إلى **Elasticsearch** ليتم عرضها في **Kibana**.

