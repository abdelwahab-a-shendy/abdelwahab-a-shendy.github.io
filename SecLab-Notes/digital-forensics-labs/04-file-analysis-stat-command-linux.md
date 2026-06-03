
## 🔍 **File Analysis Using the** `stat` Command in Linux

### 🎯 **Lesson Objective:**

Learn how to perform an initial analysis of a file using built-in tools in the Linux system, specifically the `stat` command, to examine the file’s **metadata**, which represents the first step in any **Digital Forensics** investigation.

### 🧠 **Real Case – BTK Killer Case**

The lesson began by referring to the **famous BTK case**, which is one of the cases where **Digital Forensics** helped solve the mystery after analyzing a **floppy disk** from which some files had been deleted.\
By recovering the deleted files and examining the **metadata**, investigators were able to reach important information about the file’s owner.

***

### 📸 **Scenario Used in the Lab**

We have an **image file** obtained (for example, from the suspect’s device), and we want to examine its metadata to determine:

* When was it created?

* Who created it?

* Was it recently modified?

* Was it opened after creation?

***

### 🧰 **Tools and Environment Used:**

* Operating System: Ubuntu OR SIFT (or any Linux distribution)

* Image file located in the folder: `DigitalForensics`

* Tools: `ls`, `stat`, `cp`, `mv`

***

### 🧾 **Detailed Steps for Analyzing Metadata Using** `ls -lh`

#### 🔹 1. **Accessing the File via Terminal:**

```bash
cd Desktop/DigitalForensics   

ls -lh
```

Expected output:

```bash
-rw-r--r--  1 user user 1.2K Jul 20 20:15 notes.txt
drwxr-xr-x  2 user user 4.0K Jul 20 18:00 documents
```

#### 🔹 2. **Understanding** `ls -lh` Command

| Part | Meaning                                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------ |
| `ls` | Lists files and directories in the current path.                                                                         |
| `-l` | Displays details in long listing format, including: permissions, link count, owner, group, size, and last modified date. |
| `-h` | Displays sizes in **human-readable format** (e.g., KB, MB instead of just bytes).                                        |

#### 🔹 3. **Analyzing** `ls -lh` Output

| Part           | Explanation                                                               |
| -------------- | ------------------------------------------------------------------------- |
| `-rw-r--r--`   | File permissions (read and write for owner, read for group and others).   |
| `1`            | Number of links to the file (how many times the filesystem points to it). |
| `user`         | Username of the file owner.                                               |
| `user`         | Group that owns the file.                                                 |
| `1.2K`         | File size (1.2 kilobytes).                                                |
| `Jul 20 20:15` | Last modified date and time.                                              |
| `notes.txt`    | File name.                                                                |

### ⚠️ **Important Note:**

The `ls -lh` command does not show all metadata of the file, such as:

* Creation time

* Last access time

🛠️ To get this info, use:

```bash
stat notes.txt
```

***

### 🔹 2. **Displaying Data Using** `stat`

```bash
stat trip_photo.jpg
```

It shows:

* **Access time**: Last time the file was opened

* **Modify time**: Last time the file content was changed

* **Change time**: Last time file properties (not content) were changed

* **Birth/Creation time**: When the file was created

* **Inode**: The file’s identifier on disk (physical location)

* **Block size / Block count**: Number and size of blocks occupied by the file

> 📌 `stat` provides detailed information useful for tracking a file’s timeline.

***

## 🧪 **Hands-On File Experiments**

### ✅ **Opening File to Change Access Time**

```bash
xdg-open trip_photo.jpg 

stat trip_photo.jpg
```

* Just by opening the file (without modifying it), only **Access Time** changes.

***

### ✅ **Moving the File Using** `mv`

```bash
mv trip_photo.jpg .. 

cd .. 

stat trip_photo.jpg
```

* Result: **Inode does not change**, because the file wasn’t copied but moved on the same disk.

* Timestamps (like Modify or Change) also do not change.

> ✅ Moving doesn’t affect the file physically on disk.

***

### ✅ **Copying the File Using** `cp`

```bash
cp ../trip_photo.jpg DigitalForensics/

stat DigitalForensics/trip_photo.jpg
```

* A new file is actually created:

  * **New Inode**

  * **All timestamps (Access, Modify, Change, Birth)** change to the moment of copy

> 📌 Copying creates a new file as if you did a “Save As”.

***

## 📊 **Detailed Comparison: mv vs cp in Forensics Analysis**

| Property                       | `mv` (Move)                             | `cp` (Copy)                                          |
| ------------------------------ | --------------------------------------- | ---------------------------------------------------- |
| **Primary Function**           | Moves file to another location          | Copies file to another location (creates new file)   |
| **Effect on Original**         | Not changed                             | Original remains unchanged                           |
| **Is New File Created?**       | ❌ No – just relocated                   | ✅ Yes – new file is created                          |
| **Inode** (physical location)  | **Unchanged** (on same disk)            | **Changed** – new file has new inode                 |
| **Access Time**                | Unchanged unless opened                 | Set to new access time of copied file                |
| **Modify Time**                | Unchanged                               | Copied from original (same modify time)              |
| **Change Time**                | May change if attributes changed (rare) | New timestamp reflecting copy time                   |
| **Creation Time (Birth Time)** | Remains unchanged                       | Reflects copy time (new file)                        |
| **Permissions**                | Remains same                            | May be copied or differ depending on system settings |
| **Ownership**                  | Remains same                            | May differ based on current user                     |
| **Forensics Impact**           | Hard to detect change unless opened     | New copy can be tracked with timestamps              |

***

## 🔍 **Practical Example**

### 1. **Moving the File:**

```bash
mv photo.jpg .. 

stat ../photo.jpg
```

* Inode **remains the same**

* Timestamps **do not change**

* It’s **the same file**, just moved

***

### 2. **Copying the File:**

```bash
cp ../photo.jpg . 

stat photo.jpg
```

* New **Inode**

* All timestamps reflect copy moment

* Now there are **two independent files**

***

## 🧠 **Case Analysis – What Metadata Tells Us**

| Situation                                    | Conclusion                                                      |
| -------------------------------------------- | --------------------------------------------------------------- |
| Only Access time changed                     | File was opened recently without being modified                 |
| Same Inode after mv                          | File was moved, not copied                                      |
| All timestamps are identical                 | File was newly created or recently copied                       |
| Creation date is older than first appearance | File came from **another system** (e.g., from Windows to Linux) |

***

### 🧠 **Very Important Fact**

If a file was created on a Windows machine and transferred to Linux, the **last modified date remains** (from the old system), but the **creation date** reflects the moment it was introduced into the Linux system.

***

## 🕵️‍♂️ **Importance in Digital Forensics:**

Using `stat`, the forensic investigator can:

* Determine if the file was accessed recently

* Check if it was copied from another device

* Verify permissions: who can modify it?

* Track digital evidence with timestamps and ownership

***

## ✅ **Comparison Summary**

| Key Point                  | `mv` | `cp` |
| -------------------------- | ---- | ---- |
| Preserves timestamps       | ✔️   | ❌    |
| Preserves inode            | ✔️   | ❌    |
| Only changes file path     | ✔️   | ❌    |
| Creates new forensic trace | ❌    | ✔️   |

***

## 🧭 **Lesson Summary:**

1. `ls -l` ⇨ General file info

2. `stat` ⇨ Deep metadata analysis

3. **Copying vs Moving** is crucial in digital evidence tracking

4. **Metadata reveals the complete file history**, even after changes or moves

| Tool    | Benefit                                                    |
| ------- | ---------------------------------------------------------- |
| `ls -l` | Surface info: permissions, size, last modified             |
| `stat`  | Comprehensive: access, modify, creation, physical location |
| `mv`    | Doesn’t change file physically                             |
| `cp`    | Creates a completely new file                              |

***

## 🧑‍💻 **Advice for Digital Forensics Investigators**

> Don’t rely solely on file content; analyze the **metadata** as it may contain very important clues about the file’s history and source.

> 🎯 **Real-life Example:**\
> If you find a suspicious image with a recent creation date but an older modify date, it might have been **copied from another machine** or **downloaded from the internet**.

***

***

## 🔍 **تحليل الملفات باستخدام أمر** `stat` في لينكس

### 🎯 **هدف الدرس:**

تعلم كيفية إجراء تحليل مبدئي لملف باستخدام أدوات مدمجة في نظام لينكس، وتحديدًا أمر `stat`، لفحص بيانات **الملف الوصفية (metadata)**، التي تمثل الخطوة الأولى في أي تحليل جنائي رقمي (Digital Forensics).

### 🧠 **القضية الواقعية – BTK Killer Case**

بدأ الشرح بالإشارة إلى **قضية BTK الشهيرة**، وهي واحدة من القضايا التي ساهم فيها الـ Digital Forensics بحل اللغز بعد تحليل **فلوبي ديسك** تم حذفه منه بعض الملفات.\
من خلال استعادة الملفات المحذوفة وفحص **البيانات الوصفية (Metadata)**، توصل المحققون إلى معلومات مهمة عن صاحب الملف.

***

### 📸 **السيناريو المستخدم في اللاب**

لدينا **ملف صورة** تم الحصول عليه (مثلًا من جهاز المشتبه به)، ونريد فحص البيانات الوصفية الخاصة بها لمعرفة:

* متى تم إنشاؤها؟

* من قام بإنشائها؟

* هل تم تعديلها مؤخرًا؟

* وهل تم فتحها بعد الإنشاء؟

***

### 🧰 **الأدوات والبيئة المستخدمة:**

* نظام تشغيل: Ubuntu OR SIFT (أو أي توزيعة لينكس)

* ملف صورة محفوظ داخل مجلد: `DigitalForensics`

* أدوات: `ls`, `stat`, `cp`, `mv`

***

### 🧾 **الخطوات التفصيلية لتحليل الميتاداتا (Metadata) باستخدام** `ls -lh`

#### 🔹 1. **الوصول إلى الملف عبر الطرفية (Terminal):**

```bash
cd Desktop/DigitalForensics 

ls -lh
```

سيظهر لك مثل هذا:

```bash
-rw-r--r--  1 user user 1.2K Jul 20 20:15 notes.txt
drwxr-xr-x  2 user user 4.0K Jul 20 18:00 documents
```

#### 🔹 2. **فهم الأمر** `ls -lh`

| الجزء | المعنى                                                                                                                                   |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ls`  | يعرض قائمة الملفات والمجلدات في المسار الحالي.                                                                                           |
| `-l`  | يعرض التفاصيل في صيغة "قائمة طويلة" (long listing format) والتي تشمل: الصلاحيات، عدد الروابط، المالك، المجموعة، الحجم، وتاريخ آخر تعديل. |
| `-h`  | يعرض الحجم بصيغة **قابلة للقراءة البشرية** (مثل KB, MB بدلاً من البايت فقط).                                                             |

#### 🔹 3. **تحليل مخرجات الأمر** `ls -lh`

| الجزء          | التفسير                                                                    |
| -------------- | -------------------------------------------------------------------------- |
| `-rw-r--r--`   | صلاحيات الملف (قراءة وكتابة للمالك، قراءة للمجموعة والعامة).               |
| `1`            | عدد الروابط إلى الملف (عدد المرات التي يشير فيها نظام الملفات لهذا الملف). |
| `user`         | اسم المستخدم مالك الملف.                                                   |
| `user`         | اسم المجموعة التي ينتمي إليها الملف.                                       |
| `1.2K`         | حجم الملف (1.2 كيلوبايت).                                                  |
| `Jul 20 20:15` | تاريخ ووقت آخر تعديل للملف.                                                |
| `notes.txt`    | اسم الملف.                                                                 |

### ⚠️ **ملاحظة مهمة:**

أمر `ls -lh` لا يعرض جميع الميتاداتا الخاصة بالملف، مثل:

* وقت الإنشاء (Creation Time)

* آخر وقت تم فيه الوصول إلى الملف (Access Time)

🛠️ للحصول على هذه المعلومات، يمكن استخدام أوامر أخرى مثل:

```bash
stat notes.txt
```

***

### 🔹 2. **عرض البيانات باستخدام** `stat`

```bash
stat trip_photo.jpg
```

يعرض:

* **Access time**: آخر مرة تم فتح الملف فيها

* **Modify time**: آخر مرة تم تعديل محتوى الملف فيها

* **Change time**: آخر مرة تغيرت فيها خصائص الملف (وليس المحتوى)

* **Birth/Creation time**: متى تم إنشاء الملف

* **Inode**: رقم العنصر على القرص (موقعه الفيزيائي)

* **Block size / Block count**: عدد ومساحة البلوكات التي يحتلها الملف

> 📌 `stat` تعطي تفاصيل دقيقة تفيد المحقق في تتبع التسلسل الزمني للملف.

***

## 🧪 **تجارب عملية على الملفات**

### ✅ **فتح الملف وتغيير Access Time**

```bash
xdg-open trip_photo.jpg 

stat trip_photo.jpg
```

* بمجرد فتح الملف (بدون تعديله)، يتغير فقط **Access Time**.

***

### ✅ **نقل الملف باستخدام** `mv`

```bash
mv trip_photo.jpg .. 

cd .. 

stat trip_photo.jpg
```

* النتيجة: الـ **Inode لا يتغير**، لأن الملف لم يُنسخ فعليًا، بل تم نقله على نفس القرص.

* التواريخ (مثل Modify أو Change) لا تتغير أيضًا.

> ✅ الموف لا يُحدث تغييرات كبيرة على مستوى القرص الفيزيائي.

***

### ✅ **نسخ الملف باستخدام** `cp`

```bash
cp ../trip_photo.jpg DigitalForensics/

stat DigitalForensics/trip_photo.jpg
```

* يتم إنشاء ملف جديد فعليًا:

  * **Inode جديد**

  * **جميع التواريخ (Access, Modify, Change, Birth)** تتغير تقريبًا لنفس اللحظة.

> 📌 النسخ يعيد إنشاء الملف من جديد، وكأنك عملت "Save As".

***

## 📊 **مقارنة تفصيلية: mv vs cp في تحليل الملفات الجنائي**

| الخاصية                        | `mv` (نقل)                              | `cp` (نسخ)                                    |
| ------------------------------ | --------------------------------------- | --------------------------------------------- |
| **الوظيفة الأساسية**           | ينقل الملف من موقع إلى آخر              | ينسخ الملف إلى مكان آخر (ينشئ نسخة جديدة)     |
| **تأثير على الملف الأصلي**     | لا يتم تغييره                           | يظل الملف الأصلي كما هو                       |
| **هل يتم إنشاء ملف جديد؟**     | ❌ لا – يتم فقط تغيير موقع الملف         | ✅ نعم – يتم إنشاء ملف جديد فعليًا             |
| **Inode** (الموقع الفيزيائي)   | **لا يتغير** (إذا على نفس القرص)        | **يتغير** – لأن نسخة جديدة يتم إنشاؤها        |
| **Access Time**                | لا يتغير إلا إذا تم فتح الملف           | يتم تعيين وقت جديد للملف المنسوخ              |
| **Modify Time**                | لا يتغير                                | يتم نسخه من الملف الأصلي (نفس وقت التعديل)    |
| **Change Time**                | قد يتغير إذا تغيرت خصائص الملف (نادرًا) | يتم تعيين وقت جديد يعكس وقت النسخ             |
| **Creation Time (Birth Time)** | يظل كما هو                              | يعكس لحظة إنشاء النسخة الجديدة (وقت النسخ)    |
| **الصلاحيات (Permissions)**    | تظل كما هي                              | تُنسخ حسب إعدادات النظام أو قد تختلف          |
| **الملكية (Owner/Group)**      | تظل كما هي                              | يمكن أن تختلف حسب المستخدم الحالي             |
| **الأثر الجنائي الرقمي**       | من الصعب تتبع التغيير إن لم تُفتح       | يمكن تتبع النسخة الجديدة ومتى وأين تم إنشاؤها |

***

## 🔍 **مثال عملي**

### 1. **نقل الملف:**

```bash
mv photo.jpg .. 

stat ../photo.jpg
```

* Inode **يبقى كما هو**

* التواريخ **لا تتغير**

* الملف **نفسه، فقط تغير موقعه**

***

### 2. **نسخ الملف:**

```bash
cp ../photo.jpg . 

stat photo.jpg
```

* Inode **جديد**

* كل التواريخ تشير إلى لحظة النسخ

* أصبح لدينا **ملفين مستقلين تمامًا**

***

## 🧠 **تحليل الحالة وماذا نستنتج من الميتاداتا؟**

| الحالة                                         | الاستنتاج                                                |
| ---------------------------------------------- | -------------------------------------------------------- |
| Access فقط تغيّر                               | الملف تم فتحه مؤخرًا بدون تعديل                          |
| نفس الـ Inode بعد mv                           | لم يتم نسخ الملف، فقط تم نقله                            |
| كل التواريخ متشابهة                            | الملف تم إنشاؤه حديثًا أو تم نسخه حديثًا                 |
| تاريخ الإنشاء أقدم من تاريخ أول ظهور في النظام | الملف جاء من **نظام آخر** (مثلاً من Windows لجهاز Linux) |

***

### 🧠 **معلومة مهمة جدًا**

لو الملف تم إنشاؤه على جهاز Windows وتم نقله إلى Linux، فإن **تاريخ التعديل الأخير سيبقى كما هو** (من النظام السابق)، لكن **تاريخ الإنشاء** سيكون من لحظة إدخال الملف إلى نظام لينكس.

***

## 🕵️‍♂️ **أهمية كل ذلك في التحقيق الجنائي الرقمي:**

* من خلال `stat` يمكن للمحقق الجنائي:

  * معرفة إذا كان الملف تم لمسه مؤخرًا أو لا.

  * معرفة إذا كان تم نسخه من جهاز آخر.

  * التحقق من الصلاحيات: من يملك حق تعديل الملف؟

  * تتبع الأدلة الرقمية بدقة زمنية وملكية.

***

## ✅ **خلاصة المقارنة**

| النقطة الأساسية            | `mv` | `cp` |
| -------------------------- | ---- | ---- |
| يحافظ على التواريخ         | ✔️   | ❌    |
| يحافظ على الـ Inode        | ✔️   | ❌    |
| يغير مسار الملف فقط        | ✔️   | ❌    |
| يُنشئ أثرًا جنائيًا جديدًا | ❌    | ✔️   |

***

## 🧭 **خلاصة الدرس:**

1. `ls -l` ⇨ معلومات عامة عن الملف.

2. `stat` ⇨ تحليل عميق للـ Metadata.

3. **الفرق بين النسخ والنقل مهم جدًا** في تتبع الأثر الرقمي.

4. **Metadata يمكن أن تكشف التاريخ الكامل للملف،** حتى بعد النقل أو التعديل.

| أداة    | الفائدة                                                   |
| ------- | --------------------------------------------------------- |
| `ls -l` | معلومات سطحية: الأذونات، الحجم، التعديل                   |
| `stat`  | معلومات شاملة: الوصول، التعديل، الإنشاء، الموقع الفيزيائي |
| `mv`    | لا يغيّر الملف فيزيائيًا                                  |
| `cp`    | يخلق نسخة جديدة تمامًا                                    |

***

## 🧑‍💻 **نصيحة للمحقق الجنائي الرقمي**

> لا تعتمد فقط على محتوى الملف، بل افحص الـ **Metadata** لأنها قد تحتوي على أدلة مهمة جدًا عن تاريخ الملف ومصدره.

> 🎯 **مثال حقيقي:**\
> إذا وجدت صورة مشبوهة بتاريخ إنشاء حديث لكن تعديلها قديم، فيحتمل أنها **نُسخت من جهاز آخر** أو **تم تحميلها من الإنترنت**.

