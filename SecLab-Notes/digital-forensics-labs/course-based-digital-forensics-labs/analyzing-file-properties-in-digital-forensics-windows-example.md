---
id: "68ee42e4eab21a496995963d"
title: "📁 Analyzing File Properties in Digital Forensics – Windows Example"
description: "File properties using in analysis"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/course-based-digital-forensics-labs/analyzing-file-properties-in-digital-forensics-windows-example"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T12:32:36.820Z"
updatedAt: "2026-01-25T15:35:46.830Z"
---

# 📁 **Analyzing File Properties in Digital Forensics – Windows Example**

## 🎯 **Objective:**

Understand how **File Properties** such as:

* Creation Time

* Modification Time

* Access Time

affect **digital forensic evidence analysis**, especially in a Windows environment.

***

## 🧰 **The Properties Tool in Windows**

* When you right-click on a file → and select **Properties**:

  You can view:

  * **Created**: When the file was originally created

  * **Modified**: When it was last edited

  * **Accessed**: The last time the file was opened

📝 *Example:*\
An image was created on July 6 at 3:45 PM and was modified and accessed at the same time.

***

## 🧪 **Practical Experiment:**

1. **Open an image using Paint**

   * Make a simple edit (e.g., draw a line)

   * Save the image under a new name (copy)

2. **Compare the original and modified copies:**

   * The modified file **loses most of its metadata**

   * The original image retains all EXIF data:

     * Phone type

     * Actual capture date

     * Camera settings

     * Software used to take the photo

⚠️ **The modified copy is unreliable as digital evidence** in court.

***

## 🔍 **Difference Between Regular Copy and Modified Copy**

| Action                                  | Metadata              | Forensic Validity            |
| --------------------------------------- | --------------------- | ---------------------------- |
| Direct copy (copy-paste)                | Metadata is preserved | ✅ Acceptable                 |
| Edited in programs like Paint and saved | EXIF metadata is lost | ❌ Not acceptable as evidence |

***

## ⚖️ **Why This Matters in Court:**

* When a file is edited or opened with editing software (e.g., Paint, Photoshop):

  * **System times are altered**

  * **Original metadata is lost**

  * Important info like camera type and location is removed

✅ Therefore, it’s essential to rely on the **unaltered original file** and analyze it directly.

***

## 🧠 **Understanding “By Default Copy” in Windows:**

* If you copy a file using:

```bash
Ctrl+C → Ctrl+V
```

In most cases:

* Metadata is **not** changed

* The system **block structure** remains intact

However ⚠️ on the **physical storage level**:

* The new file is stored in a different location on the disk

* **Block allocation and file pointer** change

So:

* **From a surface level, the copy appears identical**

* But from a **physical forensic perspective** (e.g., forensic imaging), the file is considered different

***

## 🧪 **When Does This Matter?**

If you need to:

* Analyze **physical disk blocks**

* Extract the **original file location history**

💡 Then a regular copy is **not enough**, and you must use **forensic acquisition tools** such as:

* FTK Imager

* Autopsy

* `dd` (in Linux)

***

## ✅ **Key Takeaways for Digital Forensic Investigators:**

| Point                            | Details                                       |
| -------------------------------- | --------------------------------------------- |
| Don’t use editing programs       | They delete metadata automatically            |
| Rely on original copies          | They preserve timestamps and device info      |
| Check `Properties` and `EXIF`    | To obtain accurate data                       |
| Don’t trust appearances only     | Investigate at the physical level when needed |
| Courts require accurate evidence | So avoid altering files in any way            |

***

***

# 📁 **تحليل خصائص الملفات (File Properties) في التحقيقات الجنائية الرقمية – Windows Example**

## 🎯 **الهدف:**

فهم كيف تؤثر **خصائص الملف (File Properties)** مثل:

* وقت الإنشاء (Creation Time)

* التعديل (Modification Time)

* آخر وصول (Access Time)\
  على **تحليل الأدلة الجنائية الرقمية**، خصوصًا في بيئة Windows.

***

## 🧰 **أداة الخصائص (Properties) في Windows**

* عند الضغط بزر الفأرة الأيمن على ملف → واختيار **Properties**:

  * يمكن رؤية:

    * **Created**: متى تم إنشاء الملف.

    * **Modified**: متى تم تعديله آخر مرة.

    * **Accessed**: آخر وقت تم فيه فتح الملف.

📝 *مثال:*\
تم إنشاء صورة يوم 6 يوليو الساعة 3:45 PM وتم تعديلها وفتحها في نفس الوقت.

***

## 🧪 **تجربة عملية:**

1. **فتح صورة باستخدام Paint**

   * إجراء تعديل بسيط (مثل رسم خط).

   * حفظ الصورة من جديد تحت اسم مختلف (copy).

2. **مقارنة النسخة الأصلية والنسخة المعدّلة:**

   * الملف المعدل **فُقِدت منه معظم بيانات الميتاداتا.**

   * الصورة الأصلية تحتفظ بكل بيانات EXIF:

     * نوع الهاتف

     * التاريخ الفعلي

     * إعدادات التصوير

     * البرنامج الذي التقط الصورة

⚠️ **النسخة المعدّلة لا يمكن الوثوق بها كدليل رقمي** في المحكمة.

***

## 🔍 **الفرق بين النسخ العادي والنسخ المعدل**

| الإجراء                          | الميتاداتا             | الحالة الجنائية    |
| -------------------------------- | ---------------------- | ------------------ |
| نسخ مباشر (copy-paste)           | تظل الميتاداتا كما هي  | ✅ مقبولة           |
| تعديل على برامج مثل Paint ثم حفظ | تفقد الميتاداتا (EXIF) | ❌ غير مقبولة كدليل |

***

## ⚖️ **أهمية ذلك في المحكمة:**

* عند تعديل ملف أو فتحه ببرامج تحرير (مثل Paint، Photoshop)، يتم:

  * تغيير **أوقات النظام**

  * فقدان **الميتاداتا الأصلية**

  * إزالة معلومات مهمة مثل نوع الكاميرا ومكان التصوير

✅ لذلك يجب الاعتماد على النسخة الأصلية غير المعدلة وتحليلها مباشرة.

***

## 🧠 **مفهوم “By Default Copy” في ويندوز:**

* إذا قمت بنسخ ملف عبر:

```bash
Ctrl+C → Ctrl+V
```

ففي معظم الحالات:

* لا يتم تغيير الميتاداتا.

* يظل **البلوك** داخل النظام كما هو.

ولكن ⚠️ على المستوى الفيزيائي:

* يختلف موقع تخزين الملف الجديد على القرص.

* **block allocation و file pointer** يتغيران.

لذلك:

* **النسخة من الناحية الظاهرية سليمة**

* لكن من منظور **التحليل الفيزيائي** (مثلاً عبر أدوات forensic imaging)، الملف يعتبر مختلفًا.

***

## 🧪 **متى تكون هذه المشكلة حرجة؟**

إذا كنت بحاجة إلى:

* تحليل **البلوكات الفيزيائية** (physical disk blocks)

* استخراج **سجل المواقع الأصلية للملف**

💡 حينها فإن النسخة **غير كافية**، ويجب استخدام **أدوات اقتباس جنائي (Acquisition Tools)** مثل:

* FTK Imager

* Autopsy

* dd (في لينكس)

***

## ✅ **خلاصة مهمة للمحقق الجنائي الرقمي:**

| نقطة                            | تفصيل                                 |
| ------------------------------- | ------------------------------------- |
| لا تستخدم برامج تعديل           | تحذف الميتاداتا تلقائيًا              |
| اعتمد على النسخ الأصلية         | تحافظ على التواريخ ونوع الجهاز        |
| افحص بالـ `Properties` و `EXIF` | للحصول على بيانات دقيقة               |
| لا تكتفِ بالظاهر                | تحقق من المستوى الفيزيائي عند الضرورة |
| المحكمة تعتمد الأدلة الصحيحة    | لذلك لا تغيّر الملفات بأي شكل         |

