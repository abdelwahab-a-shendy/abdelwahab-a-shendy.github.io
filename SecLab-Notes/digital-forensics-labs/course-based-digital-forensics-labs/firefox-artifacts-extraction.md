
# 🦊 **Firefox Artifacts Extraction**

## 🎯 **Objective**

The goal of Firefox forensics is to **trace user activity** on the system through browsing records, cookies, bookmarks, form data, and login data.\
These artifacts help determine:

* Browsing history

* Cookies

* Bookmarks

* Form input data

* Login credentials

They are used to:

* Track **user’s online activity**

* Accurately determine **browsing behavior and timeline**

* Detect attempts to **hide evidence** such as history deletion or private browsing

* Uncover illegal use like:

  * Accessing stolen accounts

  * Visiting hacking or leak sites

  * Downloading suspicious tools

***

## 🧪 **Practical Scenarios**

> We are analyzing Firefox data in one of the following scenarios:

| Scenario Type       | Description                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| 🟢 Live Analysis    | The system is running, and we’re analyzing directly.                            |
| 🔵 Mounted Analysis | Analyzing a disk or disk image from another system (e.g., in SIFT Workstation). |

***

## 📍 **Firefox Artifact Paths on Linux Systems**

### 🔹 **Ubuntu / Linux Mint (when installed via Snap):**

```bash
/home/USERNAME/snap/firefox/common/.mozilla/firefox/
```

* Contains profile folders and SQLite databases

* Snap runs in a sandbox, hence different path

### 🔹 **Kali / SIFT (when installed via apt):**

```bash
/home/USERNAME/.mozilla/firefox/  

cd /home/as/.mozilla/firefox/i8moxwwr.default-esr  

cd /home/sansforensics/.mozilla/firefox/xn53uh5w.default-release/
```

* Default path for apt-based installations

* Used in distros like Kali and SIFT

* In SIFT, evidence paths are often mounted as:

```bash
/mnt/evidence/home/USERNAME/.mozilla/firefox/
```

> 🔍 **DF Tip**: Always make sure the image is mounted properly and work on a copy, not the original.

***

## 📂 **Profile Folder Components**

Inside folders like:

```bash
xxxxxxxx.default-release or xxxxxxxx.default-esr
```

You’ll find key databases:

| File                      | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| `places.sqlite`           | 🔥 Main database: browsing history + bookmarks       |
| `cookies.sqlite`          | Stores cookies: sessions, site settings              |
| `favicons.sqlite`         | Site icons – visual context of activity              |
| `formhistory.sqlite`      | Form input history (e.g., search terms)              |
| `webappsstore.sqlite`     | LocalStorage data for web apps                       |
| `logins.json` + `key4.db` | Saved login data – encrypted and need key to decrypt |

```bash
cd /home/as/.mozilla/firefox/i8moxwwr.default-esr  ls *.sqlite *.json *.db
```

If files aren't found, try:

```bash
cd /home/as/.mozilla/firefox/yi64xyq1.default
```

***

## 🛠️ **Practical Analysis Steps**

### ✅ 1. Locate Relevant Files

```bash
find /home -type f -name "places.sqlite"
```

### ✅ 2. Copy Files for Analysis

```bash
cp /home/USERNAME/.mozilla/firefox/xxxxxxxx.default-release/places.sqlite ~/Desktop/
```

### ✅ 3. Analyze with SQLite Viewer

* Site: [SQLViewer](https://sqliteviewer.app/)

* Upload `places.sqlite`

Key tables inside:

| Table                     | Purpose                            |
| ------------------------- | ---------------------------------- |
| `moz_places`              | Visited URLs                       |
| `moz_historyvisits`       | Links URL to visit timestamps      |
| `moz_bookmarks`           | User’s saved bookmarks             |
| `moz_bookmarks_deleted`   | Deleted bookmarks (very important) |
| `moz_inputhistory`        | Typed entries in address bar       |
| `moz_keywords`            | Bookmark keywords                  |
| `moz_places_extra`        | Extra visit data                   |
| `moz_historyvisits_extra` | Time spent on site                 |
| `moz_origins`             | Domain origins                     |

> 💡 **Tip**: Join `moz_places` and `moz_historyvisits` for a timeline view of user activity.

***

### 🔍 **Advanced Tools for Firefox Artifacts Analysis**

| Tool                       | Functionality                                                           |
| -------------------------- | ----------------------------------------------------------------------- |
| `sqlite3`                  | Quick command-line analysis                                             |
| `Browser History Examiner` | Visual browsing history analysis (Windows)                              |
| `Hindsight` (by Obsidian)  | Open-source Python tool to analyze browser history and generate reports |
| `Autopsy`                  | Forensics suite with built-in browser module                            |

***

## 🧠 **What Can Firefox Forensics Reveal?**

1. **Visited websites** and timestamps

2. **Bookmark analysis** to reveal sites of interest

3. **Cookie analysis** to extract:

   * Active sessions

   * Site tracking artifacts

4. **Temporal correlation** between browsing and other system events

5. **Detection of concealment attempts** (private mode – history deletion)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760448265104/899425ff-c554-43a8-9bda-2afa4d448740.png" align="center" fullwidth="false" />

***

## 💡 **Pro Tips in Digital Forensics**

* 🧪 Always work on a **readonly** copy

* 📅 Use `stat` to check file timestamps:

```bash
stat places.sqlite
```

* 🔗 Correlate findings with:

  * Bash history

  * System logs (`/var/log/syslog`)

  * USB activity logs

* 👥 Check all profiles — there may be multiple users

***

## 🔗 **Practical Example: Visit Timeline**

#### Opening the file using SQLite

##### ✳️ Option 1: Terminal using `sqlite3`

```bash
sqlite3 ~/Desktop/places.sqlite
```

> Inside SQLite, run:

```sql
SELECT 
    moz_places.url, 
    datetime(moz_historyvisits.visit_date/1000000,'unixepoch') AS visit_time 
FROM 
    moz_places, moz_historyvisits 
WHERE 
    moz_places.id = moz_historyvisits.place_id 
ORDER BY 
    visit_time DESC 
LIMIT 20;
```

> To exit SQLite:

```bash
.exit
```

##### 📌 **Why divide timestamp by 1,000,000?**

> Because `visit_date` is stored in **microseconds** since the Unix epoch.\
> To convert to seconds (for `datetime(...,'unixepoch')`), you must divide by `1,000,000`.

##### ✅ **End Result?**

> You'll extract the **last 20 visited websites** along with their **timestamps** – extremely useful in building a **user activity timeline** during investigation.

***

## 📊 **Summary of File Analysis Outputs**

| Artifact Type             | What It Reveals                                 |
| ------------------------- | ----------------------------------------------- |
| `moz_places`              | Visited websites                                |
| `moz_historyvisits`       | Visit timestamps and durations                  |
| `moz_bookmarks`           | User’s bookmarked/favorite sites                |
| `moz_bookmarks_deleted`   | Bookmark deletion attempts                      |
| `cookies.sqlite`          | Active sessions – possible account access       |
| `logins.json` + `key4.db` | Logged-in accounts (even if history is deleted) |
| `formhistory.sqlite`      | Search terms and form data                      |

***

## 🧰 **Additional Useful Tools**

| Tool                                       | Use Case                                                          |
| ------------------------------------------ | ----------------------------------------------------------------- |
| `sqlite3`                                  | Fast terminal-based analysis                                      |
| [SQLite Viewer](https://sqliteviewer.app/) | Visual SQLite analysis                                            |
| `Browser History Examiner`                 | Powerful GUI tool (Windows)                                       |
| `Autopsy`                                  | Comprehensive forensics platform with browser support             |
| `Hindsight`                                | Python tool to analyze Chrome and Firefox with timeline reporting |

***

***

# 🦊 **استخراج الأدلة من متصفح Firefox – Firefox Artifacts Extraction**

## 🎯 **الهدف**

الهدف من تحليل متصفح Firefox هو **تتبع نشاط المستخدم** على الجهاز من خلال سجلات التصفح، الكوكيز، البوك ماركس، بيانات النماذج، وبيانات تسجيل الدخول.\
تُستخدم هذه الأدلة لتحديد :

* سجلات التصفح (History)

* الكوكيز (Cookies)

* البوك ماركس (Bookmarks)

* بيانات النماذج (Forms)

* بيانات تسجيل الدخول (Logins)

تُستخدم هذه الأدلة لتحديد:

* تتبع **نشاط المستخدم عبر الإنترنت**

* تحديد **سلوك التصفح والزمن بدقة**

* كشف محاولات **إخفاء الأدلة** مثل حذف الهيستوري أو استخدام الوضع الخفي

* اكتشاف استخدامات غير مشروعة مثل:

  * الدخول لحسابات مسروقة

  * زيارة مواقع اختراق أو تسريبات

  * تحميل أدوات مشبوهة

***

## 🧪 **السيناريو العملي**

> نحن بصدد تحليل بيانات Firefox في أحد السيناريوهات التالية:

| نوع السيناريو       | الوصف                                                      |
| ------------------- | ---------------------------------------------------------- |
| 🟢 Live Analysis    | الجهاز يعمل، ونقوم بالتحليل مباشرةً من النظام.             |
| 🔵 Mounted Analysis | تحليل قرص أو صورة قرص لجهاز آخر (كما في SIFT Workstation). |

***

## 📍 **أماكن حفظ ملفات Firefox في أنظمة Linux**

### 🔹 **Ubuntu / Linux Mint (عند التثبيت عبر Snap):**

```bash
/home/USERNAME/snap/firefox/common/.mozilla/firefox/
```

* يحتوي على مجلد البروفايل وقواعد البيانات

* ال Snap يعمل ضمن بيئة معزولة (sandbox) لذا المسار مختلف

### 🔹 **Kali / SIFT (عند التثبيت عبر apt):**

```bash
/home/USERNAME/.mozilla/firefox/

cd /home/as/.mozilla/firefox/i8moxwwr.default-esr

cd /home/sansforensics/.mozilla/firefox/xn53uh5w.default-release/
```

* هو المسار الافتراضي عند التثبيت عبر apt

* مستخدم في توزيعات مثل Kali و SIFT Workstation

* في SIFT غالبًا يتم تحليل مسارات الأدلة على شكل:

```bash
/mnt/evidence/home/USERNAME/.mozilla/firefox/
```

> 🔍 **نصيحة DF**: تأكد من mount الصورة بشكل صحيح واعمل دائمًا على نسخة وليس الأصل.

***

## 📂 **مكونات مجلد البروفايل (Profile Folder)**

داخل مجلد مثل:

```bash
xxxxxxxx.default-release أو xxxxxxxx.default-esr
```

يوجد عدد من قواعد البيانات المهمة:

| الملف                     | الوصف                                                |
| ------------------------- | ---------------------------------------------------- |
| `places.sqlite`           | 🔥 قاعدة البيانات الأساسية: سجل التصفح + البوك ماركس |
| `cookies.sqlite`          | تخزين الكوكيز: الجلسات، إعدادات المواقع              |
| `favicons.sqlite`         | أيقونات المواقع (تعطي تصور مرئي عن النشاط)           |
| `formhistory.sqlite`      | بيانات تم إدخالها في النماذج (مثل كلمات البحث)       |
| `webappsstore.sqlite`     | تخزين بيانات التطبيقات (LocalStorage)                |
| `logins.json` + `key4.db` | بيانات الدخول – مشفرة وتحتاج المفتاح لفك التشفير     |

```bash
cd /home/as/.mozilla/firefox/i8moxwwr.default-esr

ls *.sqlite *.json *.db
```

إذا لم تجد الملفات، جرّب:

```bash
cd /home/as/.mozilla/firefox/yi64xyq1.default
```

***

## 🛠️ **الخطوات العملية للتحليل**

### ✅ 1. البحث عن الملفات المهمة

```bash
find /home -type f -name "places.sqlite"
```

### ✅ 2. نسخ الملفات للتحليل

```bash
cp /home/USERNAME/.mozilla/firefox/xxxxxxxx.default-release/places.sqlite ~/Desktop/
```

### ✅ 3. تحليل الملفات باستخدام SQLite Viewer

* الموقع: [SQLViewer](https://sqliteviewer.app/)

* قم بتحميل ملف `places.sqlite`

* أهم الجداول داخل القاعدة:

| الجدول                    | الوظيفة                                       |
| ------------------------- | --------------------------------------------- |
| `moz_places`              | عناوين URL التي تمت زيارتها                   |
| `moz_historyvisits`       | ربط URL بزمن الزيارة                          |
| `moz_bookmarks`           | البوك ماركس (المواقع المحفوظة كمفضلة)         |
| `moz_bookmarks_deleted`   | إشارات مرجعية تم حذفها (مهمة جدًا في التحقيق) |
| `moz_inputhistory`        | كلمات تم إدخالها في شريط العنوان              |
| `moz_keywords`            | كلمات مفتاحية للبوكماركس                      |
| `moz_places_extra`        | بيانات إضافية عن كل زيارة                     |
| `moz_historyvisits_extra` | زمن البقاء داخل الموقع                        |
| `moz_origins`             | أصل النطاق (Domain)                           |

> 💡 **ربط moz\_places بـ moz\_historyvisits يعطيك Timeline للنشاط.**

***

### 🔍 **أدوات متقدمة لتحليل Firefox Artifacts**

| الأداة                     | الفائدة                                                     |
| -------------------------- | ----------------------------------------------------------- |
| `sqlite3`                  | تحليل سريع من الطرفية بدون واجهة رسومية                     |
| `Browser History Examiner` | تحليل بصري متقدم للتواريخ، مدة البقاء، والمواقع (Windows)   |
| `Hindsight` (by Obsidian)  | أداة Python مفتوحة المصدر لتحليل تاريخ التصفح وتوليد تقارير |
| `Autopsy`                  | أداة جنائية تحتوي على وحدة مدمجة لتحليل المتصفحات           |

***

## 🧠 **مخرجات تحليل Firefox – ما الذي نستفيده؟**

1. **المواقع التي زارها المستخدم** وزمن الزيارة

2. **تحليل البوك ماركس** لفهم المواقع ذات الأهمية

3. **تحليل الكوكيز** لاستخراج:

   * جلسات دخول نشطة

   * أثر المواقع التي تتبع المستخدم

4. **ربط زمني** بين نشاط التصفح وأحداث أخرى في النظام

5. **كشف محاولات الإخفاء** (الوضع الخفي – حذف السجل)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760448265104/899425ff-c554-43a8-9bda-2afa4d448740.png" align="center" fullwidth="false" />

***

## 💡 **نصائح احترافية في Digital Forensics**

* 🧪 اعمل دائمًا على نسخة readonly

* 📅 استخدم `stat` لرؤية توقيتات الملفات :

```bash
stat places.sqlite
```

* 🔗 اربط النتائج مع:

  * ال Bash history

  * ال system logs (`/var/log/syslog`)

  * نشاط الأجهزة الخارجية (USB logs)

* 👥 افحص كل البروفايلات الموجودة — قد يكون هناك أكثر من مستخدم

***

## 🔗 \*\*مثال عملي: Timeline للزيارات

#### فتح الملف باستخدام SQLite

##### ✳️ الطريقة الأولى: من الطرفية (Terminal) باستخدام `sqlite3`

```bash
sqlite3 ~/Desktop/places.sqlite
```

> داخل SQLite، نفذ الاستعلام , او اي استعلام تريد

```sql
SELECT 
    moz_places.url, 
    datetime(moz_historyvisits.visit_date/1000000,'unixepoch') AS visit_time 
FROM 
    moz_places, moz_historyvisits 
WHERE 
    moz_places.id = moz_historyvisits.place_id 
ORDER BY 
    visit_time DESC 
LIMIT 20;
```

> للخروج من SQLite :

```bash
.exit
```

##### 📌 **ليه بنقسم timestamp على 1,000,000؟**

> لأن `visit_date` في جدول `moz_historyvisits` بيكون بالـ **microseconds** (منذ Unix epoch)، ولازم نحوله إلى **seconds** باستخدام `/1000000` عشان `datetime(...,'unixepoch')` تقدر تقراه صح.

##### ✅ **النتيجة النهائية؟**

> هتقدر تستخرج **آخر 20 موقع زارهم المستخدم**، مع **توقيت كل زيارة**، وده مفيد جدًا في بناء **Timeline** لنشاط المستخدم أثناء التحقيق الرقمي.

***

## 📊 **مُلخص مخرجات التحليل حسب نوع الملف**

| نوع الدليل                | ما الذي نستفيده منه؟                                  |
| ------------------------- | ----------------------------------------------------- |
| `moz_places`              | المواقع التي زارها المستخدم                           |
| `moz_historyvisits`       | زمن الزيارة ومدة البقاء                               |
| `moz_bookmarks`           | إشارات مرجعية مهمة لدى المستخدم                       |
| `moz_bookmarks_deleted`   | محاولة إخفاء إشارات                                   |
| `cookies.sqlite`          | الجلسات النشطة – قد تتيح الدخول لحسابات               |
| `logins.json` + `key4.db` | المستخدمين الذين سجلوا الدخول (حتى لو حُذف الهيستوري) |
| `formhistory.sqlite`      | كلمات البحث وبيانات النماذج                           |

## 🧰 **أدوات مفيدة إضافية**

| الأداة                                     | الاستخدام                                              |
| ------------------------------------------ | ------------------------------------------------------ |
| `sqlite3`                                  | تحليل مباشر وسريع من الطرفية                           |
| [SQLite Viewer](https://sqliteviewer.app/) | تحليل بصري لقواعد البيانات SQLite                      |
| `Browser History Examiner`                 | أداة رسومية قوية (مناسبة لأنظمة Windows)               |
| `Autopsy`                                  | تحليل شامل ومتكامل يشمل المتصفحات                      |
| `Hindsight`                                | Python tool لتحليل Chrome وFirefox وتوليد تقارير زمنية |

