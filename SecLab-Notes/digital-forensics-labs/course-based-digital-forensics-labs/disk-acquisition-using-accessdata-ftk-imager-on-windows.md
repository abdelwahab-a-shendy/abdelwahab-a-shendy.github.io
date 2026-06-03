---
id: "68ee45d5b7376082b8469969"
title: "🧰 Disk Acquisition Using AccessData FTK Imager on Windows"
description: "Disk Acquisition Using AccessData FTK Imager in Windows"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/course-based-digital-forensics-labs/disk-acquisition-using-accessdata-ftk-imager-on-windows"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T12:45:09.542Z"
updatedAt: "2026-01-25T15:35:46.837Z"
---

## 📌 **Quick Introduction**

* Disk Acquisition refers to creating a **bit-by-bit** copy of a storage disk or partition for the purpose of digital forensic analysis without affecting the original.

* On Windows, we don’t use the well-known `dd` tool from Linux. Instead, we use a free tool called **FTK Imager**.

***

## 📥 **Downloading FTK Imager**

1. The tool is free and released by **Exterro** (owner of AccessData).

2. It can be downloaded from the official website:

   * Search: `FTK Imager download Exterro`

   * You may be asked to enter information such as an email address before downloading.

3. Alternatively: You can download it from third-party sites, but those are often outdated versions.

***

## 🧭 **Overview of FTK Imager**

The tool is not only for image acquisition, but also allows you to:

* Browse files inside disks.

* Preview protected files.

* Acquire RAM images.

***

## 🗂️ **Key Interface Functions**

* **File → Create Disk Image**: To create a full disk image.

* **Mount Image to Drive**: To mount and read an image as if it were a real disk.

* **Add Evidence Item**: To add files or evidence for analysis.

* **Export Files**: To export selected files.

***

## 🛠️ **Starting the Disk Acquisition Process**

### 1. From the main screen:

Select: `File > Create Disk Image`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760445987013/f86f919c-0312-4e3e-9a15-48c8e2cd89a1.png" align="center" fullwidth="false" />

### 2. Choose the source type:

* **Physical Drive**: If you want to image an entire disk.

* **Logical Drive / Partition**: If you want to image a specific partition.

* **Image File**: To clone from an existing image.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446013709/fe27d965-8b1b-4d77-a3bf-1d3e091adff7.png" align="center" fullwidth="false" />

> 📝 You can also perform a **Partial Acquisition** (for specific files or folders) instead of the entire disk.

***

## 🖥️ **Selecting the Hard Drive or Partition to Image**

* A list of connected disks will appear.

* Select the desired disk (e.g., USB drive or small test disk).

***

## 💾 **Setting Image Parameters**

* Choose the save location for the image.

* Choose the format:

  * **Raw (dd)**: A single file with no metadata.

  * **E01**: Includes metadata, encryption, and segmentation capabilities.

  * **SMART / AFF**: Less commonly used.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446099836/07aca4bd-fbdb-4320-8193-bb5afa8fe52a.png" align="center" fullwidth="false" />

### Then:

* Fill in the required data:

  * Case Number: (use the current date)

  * Evidence Number: (evidence number)

  * Unique Description: (a unique description)

  * Examiner Name: (your name)

  * Notes (if any)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446041167/b468cc4b-9ba9-4855-ba5c-84137d761c3b.png" align="center" fullwidth="false" />

***

## 🧱 **Additional Options**

* **Compression**: Compress the image to save space.

* **Split Image**: Split the image into smaller files (e.g., every 1500 MB).

* **Verify Image after Creation** ✅ Very important: To verify image integrity by checking the hash.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446052581/0826c1b3-0300-4304-8af5-0909d7533e03.png" align="center" fullwidth="false" />

> Click **Finish**

***

## ▶️ **Start Acquisition**

Click:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446131022/0cd7d226-c2fb-4efa-bea4-9eb7150aa58c.png" align="center" fullwidth="false" />

> **Start**

The imaging process will begin. Once completed:

* It will display the **Hash Value** (e.g., SHA1 or MD5) of the image, which must be documented in the forensic report.

* The data is saved in a folder containing:

  * The image file itself (e.g., `.dd`)

  * Metadata file (if using Raw format)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446148576/eeec97fe-57f5-406b-88a2-5fd38b85098b.png" align="center" fullwidth="false" />

> Image Summary:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446159013/a0f5445d-05ee-4f70-a880-af5e1a565f42.png" align="center" fullwidth="false" />

***

## 🔍 **Mounting the Image**

After acquisition, you may want to read the image contents:

1. From the menu, select: `File > Image Mounting`

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446175814/10b7c502-a0cf-45db-aead-af22e8796dcc.png" align="center" fullwidth="false" />

2. Select the image you created.

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446194762/ab8aa142-2068-4332-b57d-1af006c97cb4.png" align="center" fullwidth="false" />

3. Assign a drive letter (e.g., D or E).

4. Choose the mount mode:

   * **Read-Only** (highly recommended)

   * **Read/Write** (not recommended for investigations)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446209036/e56e1863-dd2a-436c-acfb-9054bdd8cd04.png" align="center" fullwidth="false" />

🛑 **Important Note:**\
It is not recommended to change the image type or convert it (e.g., from dd to VHD), as this may result in data loss or alter the hash, invalidating the image as court-admissible evidence.

***

## 💡 **Extra Feature: Extracting Protected System Files**

FTK Imager allows you to extract sensitive files such as:

* **SAM File**: Contains user password hashes.

* **SYSTEM File**: Contains registry keys.

* **User Profile Files**: Such as desktop and document folders for each user.

***

## ✅ **Verifying Image Integrity**

After completion, the software displays an image summary including:

* Path

* Hash

* Verification status ✅

***

## 📂 **Opening and Reviewing the Image**

On Windows:

* Use Windows Explorer or other tools to review the image if it was mounted.

* If it's in E01 format, you can use FTK Imager or tools like Autopsy.

***

## 🧾 **Important Tips**

* Always save the hash value of the image in your report.

* Never analyze the original media directly.

* Always work with **Read-Only** images.

* Organize case files neatly in clearly labeled folders.

***

***

# 🧰 **Disk Acquisition باستخدام AccessData FTK Imager في Windows**

***

## 📌 **مقدمة سريعة**

* عملية Disk Acquisition تعني أخذ نسخة **bit-by-bit** من قرص تخزين أو بارتيشن، بهدف التحليل الجنائي الرقمي دون التأثير على الأصل.

* في Windows لا نستخدم أداة `dd` المعروفة في Linux، بل نستخدم أداة مجانية تُدعى **FTK Imager**.

***

## 📥 **تحميل FTK Imager**

1. الأداة مجانية ويتم إصدارها من خلال شركة **Exterro** (التي تملك AccessData).

2. يمكن تحميلها من الموقع الرسمي:

   * ابحث عن: `FTK Imager download Exterro`

   * قد يُطلب منك إدخال بيانات مثل البريد الإلكتروني قبل التحميل.

3. بديلًا: يمكن تحميلها من مواقع خارجية، لكن غالبًا ما تكون نسخ قديمة.

***

## 🧭 **نظرة عامة داخل FTK Imager**

الأداة ليست فقط لأخذ الصور (Acquisition)، بل تسمح أيضًا بـ:

* تصفح الملفات داخل الأقراص.

* معاينة الملفات المحمية.

* أخذ صور لذاكرة RAM.

***

## 🗂️ **أهم الوظائف في الواجهة**

* **File → Create Disk Image**: لأخذ نسخة كاملة من قرص.

* **Mount Image to Drive**: لتركيب صورة وقراءتها وكأنها قرص حقيقي.

* **Add Evidence Item**: لإضافة ملفات أو أدلة لتحليلها.

* **Export Files**: لتصدير ملفات معينة.

***

## 🛠️ **بدء عملية Disk Acquisition**

### 1. من الشاشة الرئيسية:

اختر: `File > Create Disk Image` :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760445987013/f86f919c-0312-4e3e-9a15-48c8e2cd89a1.png" align="center" fullwidth="false" />

### 2. اختر نوع المصدر:

* **Physical Drive**: إذا كنت تريد عمل Image لقرص كامل.

* **Logical Drive / Partition**: إذا كنت تريد نسخة من بارتيشن معين.

* **Image File**: لعمل كلون من صورة موجودة.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446013709/fe27d965-8b1b-4d77-a3bf-1d3e091adff7.png" align="center" fullwidth="false" />

> 📝 يمكنك أيضًا أخذ **Partial Acquisition** (لملفات أو مجلدات معينة فقط) بدلًا من القرص الكامل.

***

## 🖥️ **اختيار ال Hard او Partation المُراد نسخه**

* تظهر لك قائمة بالأقراص المتصلة بالجهاز.

* اختر القرص المطلوب (مثلاً: قرص USB أو قرص بمساحة صغيرة للتجربة).

***

## 💾 **تحديد إعدادات الصورة**

* اختر موقع حفظ الصورة.

* اختر نوع الفورمات:

  * **Raw (dd)**: ملف واحد بدون metadata.

  * **E01**: يحتوي Metadata وإمكانيات تشفير وتجزئة.

  * **SMART / AFF**: أقل شيوعًا.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446099836/07aca4bd-fbdb-4320-8193-bb5afa8fe52a.png" align="center" fullwidth="false" />

### ثم:

* املأ البيانات المطلوبة مثل:

  * Case Number : (التاريخ الخاص باليوم)

  * Evidence Number : ( Evidenceرقم ال )

  * Unique Descreption : (وصف فريد)

  * Examiner Name : (اسمك)

  * Notes (إن وجدت)

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446041167/b468cc4b-9ba9-4855-ba5c-84137d761c3b.png" align="center" fullwidth="false" />

***

## 🧱 **خيارات إضافية**

* **Compression**: ضغط الصورة لتوفير المساحة.

* **Split Image**: تقسيم الصورة إلى ملفات صغيرة الحجم (مثلاً كل 1500 ميجابايت).

* **Verify Image after Creation** ✅ مهم جدًا: لفحص سلامة الصورة عبر التحقق من الـ Hash. !

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446052581/0826c1b3-0300-4304-8af5-0909d7533e03.png" align="center" fullwidth="false" />

> اضغط علي **Finish**

***

## ▶️ **بدء الاستخراج (Acquisition)**

اضغط على:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446131022/0cd7d226-c2fb-4efa-bea4-9eb7150aa58c.png" align="center" fullwidth="false" />

> **Start**

ستبدأ عملية التصوير. بعد الانتهاء:

* يُظهر لك **Hash Value** (مثل SHA1 أو MD5) للصورة، يجب توثيقها في التقرير الجنائي.

* تحفظ البيانات داخل فولدر يحتوي:

  * الصورة نفسها (مثلاً: `.dd`)

  * ملف metadata (إذا كنت تستخدم Raw Format).

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446148576/eeec97fe-57f5-406b-88a2-5fd38b85098b.png" align="center" fullwidth="false" />

> Image Summary :
>
> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446159013/a0f5445d-05ee-4f70-a880-af5e1a565f42.png" align="center" fullwidth="false" />

***

## 🔍 **تركيب الصورة Mount Image**

بعد التصوير، قد تحتاج لقراءة محتويات الصورة:

1. اختر من القائمة: `File > Image Mounting`

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446175814/10b7c502-a0cf-45db-aead-af22e8796dcc.png" align="center" fullwidth="false" />

2. اختر الصورة التي تم إنشاؤها.

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446194762/ab8aa142-2068-4332-b57d-1af006c97cb4.png" align="center" fullwidth="false" />

3. حدد حرف البارتيشن (مثل D أو E).

4. اختر وضع التركيب:

   * **Read-Only** (موصى به جدًا)

   * **Read/Write** (غير مفضل في التحقيقات)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760446209036/e56e1863-dd2a-436c-acfb-9054bdd8cd04.png" align="center" fullwidth="false" />

🛑 **ملاحظة مهمة:**\
لا يُفضل تغيير نوع الصورة أو تحويلها (مثلًا من dd إلى VHD)، لأن ذلك قد يُفقد بعض البيانات أو يُغير الـ Hash، مما يُفقد الصورة صلاحيتها كدليل في المحكمة.

***

## 💡 **ميزة إضافية: استخراج ملفات النظام المحمية**

FTK Imager يسمح لك بأخذ ملفات حساسة مثل :

* **SAM File**: يحتوي على كلمات مرور المستخدمين.

* **SYSTEM File**: يحتوي على Registry keys.

* **User Profile Files**: مثل سطح المكتب والمستندات الخاصة بكل مستخدم.

***

## ✅ **التحقق من صحة الصورة**

بعد الانتهاء، يعرض البرنامج ملخصًا للصورة مع:

* المسار.

* الـ Hash.

* حالة التحقق ✅.

***

## 📂 **فتح ومراجعة الصورة**

داخل Windows:

* استخدم Windows Explorer أو برامج أخرى لمراجعة الصورة إذا كانت Mounted.

* إذا كانت E01، يمكن استخدام FTK Imager أو أدوات مثل Autopsy.

***

## 🧾 **نصائح مهمة**

* دائمًا احفظ نسخة الـ Hash الخاصة بالصورة في التقرير.

* لا تستخدم النسخة الأصلية للتحليل.

* استخدم صور **Read-Only** دائمًا أثناء العمل.

* نظم ملفات القضية بشكل مرتب داخل فولدرات واضحة.

