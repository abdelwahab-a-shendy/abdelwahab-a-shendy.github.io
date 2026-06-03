---
id: "68ee4f5b764272ae26971fe4"
title: "🛠️ Creating a New Case and Adding a Data Source in Autopsy – Step-by-Step with Full Explanation"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/course-based-digital-forensics-labs/creating-a-new-case-and-adding-a-data-source-in-autopsy-step-by-step-with-full-explanation"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T13:25:47.711Z"
updatedAt: "2026-01-25T15:35:46.849Z"
---

# 🛠️ **Creating a New Case and Adding a Data Source in Autopsy – Step-by-Step with Full Explanation**

***

## 🧭 **Introduction – Why Autopsy?**

**Autopsy** is a free and open-source tool used for digital evidence analysis.\
It is considered one of the most powerful free alternatives to tools like:

* **FTK Imager** – Used to view and analyze files, but limited without a paid license.

* **EnCase** and **X-Ways** – Powerful but expensive tools.

💡 **Advantages of Autopsy**:

* Easy graphical user interface (GUI).

* Multi-type analysis (images, registry, browser data, deleted files, etc.).

* Available on both Windows and Linux (GUI is easier on Windows).

***

## 🧱 **Understanding the Case Concept in Autopsy**

Every investigation in Autopsy begins by creating a **Case**.

### ✅ Why Do We Need a Case?

* Autopsy creates a dedicated database for each case.

* It stores:

  * Evidence

  * Analysis results

  * Final reports

***

## 📁 **Step 1: Create a New Case**

When launching Autopsy:

1. Click on `Create New Case`.

2. Enter the following details:

| Field                 | Description                                  |
| --------------------- | -------------------------------------------- |
| **Case Name**         | Name of the case (e.g., `Missing_Person`)    |
| **Base Directory**    | Location where the case files will be stored |
| **Case Number**       | Unique identifier, could be the date         |
| **Examiner Name**     | Name of the analyst or investigator          |
| **Organization Name** | Name of the organization (if applicable)     |

> 📌 **Tip**: Use structured and numbered case names to simplify future archiving.

***

## 🧩 **Step 2: Add Data Source**

### 💡 What is a Data Source?

It's the source that contains the data to be analyzed, such as:

* Disk image

* Logical files

* Mobile dump

#### 🧷 Types of Data Sources You Can Add:

| Type                      | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| **Disk Image or VM File** | Full disk image (e.g., E01, DD, ISO) or virtual machine image |
| **Logical Files**         | Individual files or folders                                   |
| **Unallocated Space**     | Unutilized space on the disk                                  |
| **Sparse Files**          | Partially extracted data                                      |
| **Autopsy Log**           | Log files from a previous investigation                       |

### 📌 **Very Important Note**:

* You must know the **type of data** you have — is it a **full disk image** or just loose files?

***

## 🔐 **Step 3: Define the Host**

After selecting the data source type, you must define the **Host** (the device from which the data was acquired):

* This can be:

  * A computer

  * A smartphone

  * An IoT device

* **Give it a clear name** (e.g., `Laptop_MissingPerson`)

📌 **Important Forensics Note**:\
Each analyzed device is represented as a Host in Autopsy, which helps with documentation and evidence-device association.

***

## 🕓 **Step 4: Set Time Zone**

This setting is **critically important**!

### ❗ Why Is This Important?

Most digital artifacts (logs, registry, browsers…) include **timestamps**.\
Setting the correct time zone allows for an **accurate timeline** of events.

For example:

* When was a file opened?

* When did the user visit a site?

* When was a USB connected?

🧠 **Forensics Tip**:\
Always document the time zone that the system or user was operating in. An incorrect time zone may lead to inaccurate analysis.

***

## 🔍 **Step 5: Enter Hash Value (Optional but Important)**

If you have the hash (MD5 or SHA1) of the disk image, enter it here.

### ✅ Purpose:

* Verify the image’s integrity

* Ensure the data was not modified during copying or upload

***

## 🧪 **Step 6: Select Ingest Modules**

Autopsy provides several **built-in analysis modules**, including:

| Module                       | Function                             |
| ---------------------------- | ------------------------------------ |
| **Recent Activity**          | Displays recent user activities      |
| **Web Artifacts**            | Extracts browser history and cookies |
| **Extract Registry**         | Analyzes Windows registry            |
| **File Type Identification** | Identifies file types                |
| **Keyword Search**           | Searches within files                |
| **Email Parser**             | Analyzes email content               |
| **Photo Analyzer**           | Extracts and analyzes images         |

✅ **Practical Tip**:

* If the image size is small → enable all modules.

* If it's large → enable only what you need.

***

## 🚀 **Final Step: Start the Analysis Phase**

After configuring everything:

1. Click on `Finish`

2. Analysis begins automatically, and a **progress bar** will appear

3. Do not close Autopsy until the process finishes

***

## 📊 **Where Are the Results Saved?**

All extracted content (artifacts, reports, logs, etc.) is stored in:

* Autopsy’s internal database

* The case folder you created at the beginning

***

## ⏱️ **What Comes After Analysis?**

Once analysis is complete, you can:

* View browsing history

* Recover and examine deleted files

* Export a professional final report

* Trace a full event **Timeline**

***

## 🧠 Important Notes & Tips for DF Students:

1. **Document every step** – especially extraction time, time zone, and data verification

2. **Analysis depends on evidence integrity** – altered data = unreliable analysis

3. **Prepare for different scenarios** – sometimes you get a full image, other times just files

4. **Understand each module** before enabling it to save time and target evidence efficiently

***

***

# 🛠️ **إنشاء قضية جديدة وإضافة مصدر بيانات في Autopsy – خطوة بخطوة مع الشرح الكامل**

## 🧭 **مقدمة – لماذا Autopsy؟**

**Autopsy** هي أداة مجانية ومفتوحة المصدر تُستخدم في تحليل الأدلة الرقمية.\
تُعتبر واحدة من أقوى البدائل المجانية لأدوات مثل:

* **FTK Imager**: يستخدم لاستعراض الملفات وتحليلها لكنه محدود بدون رخصة مدفوعة.

* **EnCase** و **X-Ways**: أدوات قوية لكن مكلفة.

💡 **مميزات Autopsy**:

* واجهة رسومية سهلة (GUI).

* تحليل متعدد الأنواع (صور، ريجستري، متصفح، ملفات محذوفة...).

* يمكن استخدامها على Windows أو Linux (لكن واجهتها الرسومية أسهل على Windows).

***

## 🧱 **مفهوم الـ Case في Autopsy**

كل تحقيق في Autopsy يبدأ بإنشاء "قضية - Case".

### ✅ لماذا نحتاج Case؟

* لأن Autopsy ينشئ قاعدة بيانات خاصة بكل قضية.

* يتم فيها حفظ كل:

  * الأدلة (Evidence)

  * التحليلات (Analysis results)

  * التقارير النهائية (Reports)

***

## 📁 **الخطوة 1: إنشاء قضية جديدة**

عند فتح Autopsy لأول مرة:

1. اضغط على: `Create New Case`

2. أدخل البيانات التالية:

| الحقل                 | الشرح                                 |
| --------------------- | ------------------------------------- |
| **Case Name**         | اسم القضية (مثل: `Missing_Person`)    |
| **Base Directory**    | المكان الذي تريد حفظ ملف القضية فيه   |
| **Case Number**       | رقم فريد للقضية، يمكن أن يكون التاريخ |
| **Examiner Name**     | اسم المحقق أو من يجري التحليل         |
| **Organization Name** | اسم الجهة أو الشركة إن وجد            |

> 📌 **نصيحة**: اجعل أسماء القضايا مرتبة ومرقمة لتسهيل أرشفتها لاحقًا.

***

## 🧩 **الخطوة 2: إضافة مصدر بيانات (Data Source)**

### 💡 ما هو الـ Data Source؟

هو المصدر الذي يحتوي على البيانات التي نريد تحليلها، مثل:

* صورة قرص (Disk Image)

* ملفات منطقية (Logical Files)

* هاتف محمول (Mobile Dump)

#### 🧷 أنواع المصادر التي يمكن إضافتها:

| النوع                     | الشرح                                                  |
| ------------------------- | ------------------------------------------------------ |
| **Disk Image or VM File** | صورة كاملة للهارد (مثل E01، DD، ISO) أو صورة نظام وهمي |
| **Logical Files**         | ملفات منفردة أو مجلدات تم نسخها                        |
| **Unallocated Space**     | المساحات غير المستخدمة في الهارد                       |
| **Sparse Files**          | استخلاص جزئي للبيانات                                  |
| **Autopsy Log**           | ملفات سجل لمتابعة تحقيق سابق                           |

### 📌 **نقطة مهمة جدًا**:

* يجب أن تعرف **نوع الداتا** التي لديك، وهل هي **صورة كاملة للهارد** أم مجرد ملفات.

***

## 🔐 **الخطوة 3: تعريف الـ Host**

بعد اختيار نوع المصدر، يجب تعريف الـ Host (الجهاز المأخوذة منه البيانات):

* يمكن أن يكون:

  * كمبيوتر

  * هاتف ذكي

  * جهاز IoT

* **ضع اسم واضح له** (مثل: `Laptop_MissingPerson`)

📌 **معلومة مهمة في Digital Forensics**:\
كل جهاز يتم تحليله يُمثل كـ Host داخل الأداة، وده بيساعد على التوثيق وربط الأدلة بالجهاز.

***

## 🕓 **الخطوة 4: تحديد المنطقة الزمنية – Time Zone**

هذا الإعداد حرج جدًا!

### ❗ لماذا مهم؟

لأن أغلب الأدلة الرقمية (Logs, Registry, Browsers…) تحتوي على **أزمنة وأوقات**.\
تحديد التايم زون الصحيح يساعدك على بناء **Timeline دقيق** للأحداث.

مثلاً:

* متى تم فتح ملف معين؟

* متى زار المستخدم موقعًا ما؟

* متى تم توصيل USB؟

🧠 **نصيحة جنائية**:\
احرص دائمًا على توثيق المنطقة الزمنية التي كانت تعمل بها الضحية أو الجهاز، لأن أي اختلاف فيها ممكن يؤدي إلى نتائج تحليل خاطئة.

***

## 🔍 **الخطوة 5: إدخال Hash Value (اختياري لكن مهم)**

لو كان عندك Hash لقطة القرص (MD5 أو SHA1)، ضعه هنا.

### ✅ فائدته:

* التحقق من سلامة الـ Image.

* التأكد من أن البيانات لم تتغير أثناء النسخ أو التحميل.

***

## 🧪 **الخطوة 6: اختيار التحليلات – Ingest Modules**

Autopsy يحتوي على عدد من **Modules جاهزة للتحليل**، مثل:

| الموديول                     | وظيفته                       |
| ---------------------------- | ---------------------------- |
| **Recent Activity**          | عرض الأنشطة الأخيرة للمستخدم |
| **Web Artifacts**            | استخراج سجل التصفح والكوكيز  |
| **Extract Registry**         | تحليل الريجستري              |
| **File Type Identification** | تحديد نوع الملفات            |
| **Keyword Search**           | البحث داخل الملفات           |
| **Email Parser**             | تحليل البريد الإلكتروني      |
| **Photo Analyzer**           | استخراج وتحليل الصور         |

✅ **نصيحة عملية**:

* لو حجم الـ Image صغير → فعّل كل الموديولز.

* لو كبير → فعّل فقط اللي أنت محتاجه.

***

## 🚀 **الخطوة الأخيرة: بدء التحليل (Analysis Phase)**

بعد ضبط كل الإعدادات:

1. اضغط على `Finish`

2. ستبدأ عملية التحليل تلقائيًا، وسيظهر **Progress Bar**

3. لا تغلق Autopsy حتى تنتهي العملية

***

## 📊 **أين تُحفظ النتائج؟**

كل ما يتم استخراجه (Artifacts, Reports, Logs...) يُحفظ داخل:

* قاعدة بيانات Autopsy.

* فولدر الكيس الذي تم إنشاؤه في البداية.

***

## ⏱️ **ماذا بعد التحليل؟**

بعد الانتهاء، يمكنك:

* عرض نتائج تصفح الإنترنت.

* استعراض ملفات تم حذفها.

* تصدير تقرير نهائي احترافي.

* تتبع Timeline للأحداث.

***

## 🧠 ملاحظات وتحليلات مهمة جدًا لك كدارس DF:

1. **توثيق كل خطوة مهم** – خاصةً وقت الاستخراج، التايم زون، والتحقق من سلامة البيانات.

2. **التحليل مبني على Evidence Integrity** – لو البيانات اتغيرت، التحليل كله يبقى غير موثوق.

3. **استعد للسيناريوهات المتنوعة** – مرات هيكون عندك Image، وأحيانًا مجرد ملفات.

4. **فهم معنى كل موديول** قبل تفعيله بيساعدك توفر وقت وتستهدف الدليل بشكل دقيق.

