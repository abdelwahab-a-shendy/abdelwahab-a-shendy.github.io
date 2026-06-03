---
id: "68ee4ea9d72cc51a7566d353"
title: "🧠 Linux OS Forensics – Digital Analysis on Linux Systems"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/course-based-digital-forensics-labs/linux-os-forensics-digital-analysis-on-linux-systems"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T13:22:49.400Z"
updatedAt: "2026-01-25T15:35:46.857Z"
---

# 🧠 **Linux OS Forensics – Digital Analysis on Linux Systems**

## 🎯 **Introduction: Differences Between Linux and Windows in Digital Forensics**

In **Windows** systems, the **Registry** is the central source of information.\
In **Linux**, there is **no registry**; instead, the system relies on **distributed configuration files** throughout the filesystem.

🔍 Therefore, in Linux forensics, the focus is on **specific directories and paths** that hold key evidence about system and user behavior.

***

## 🚨 **Step 1: How to Handle a Linux Machine at the Crime Scene**

### 🧰 Possible Scenarios:

#### 1. The Device is Provided as a Hard Drive Only

* Use the `dd` tool to create a forensic image of the drive:

```bash
dd if=/dev/sdX of=/mnt/usb/linux_image.dd bs=4M conv=noerror,sync
```

#### 2. The Device is Powered On and Accessible

* Do **not** use `dd` from the live system.

* Use a **Live CD** such as: `CAINE`, `SIFT`, `Kali`.

* The goal: avoid writing to the original disk.

⚠️ **Warning:** Any write operation may corrupt the evidence.

#### 3. The Device is Powered Off and Password is Unknown

* You can use **Single User Mode** to bypass the password, provided it is legally permissible.\
  → \[\[05-What is Single User Mode]]

***

## 📁 **Key Locations for Analysis in the Linux File System**

### 1. `/home/USERNAME/` – User Directory

#### Important Files:

| File                         | Purpose                                          |
| ---------------------------- | ------------------------------------------------ |
| `.bash_history`              | User command history                             |
| `.bashrc`                    | Commands executed automatically at shell startup |
| `.profile` / `.bash_profile` | Environment setup and execution paths            |

#### Helpful Commands:

```bash
cat ~/.bash_history  

cat ~/.bashrc  echo $PATH
```

> 🧠 **Note:**\
> These files may contain paths to malicious tools, autorun scripts, or external links.

***

### 2. `/etc/passwd` – User Information

#### Contains information about all users:

* Username

* UID

* GID

* Shell

* Home Directory

#### Analyze File Content:

```bash
cat /etc/passwd

cat /etc/passwd | cut -f1 -d ":"
```

📌 The file may be difficult to read directly. Use tools like Excel or `awk`:

```bash
awk -F ':' '{print $1}' /etc/passwd
```

🔍 **Check for Unauthorized Users:**

* Some accounts are **services, not actual users** (e.g., `www-data`, `sshd`).

* Check the login shell.\
  Real users typically have `/bin/bash`, while service accounts often use `/usr/sbin/nologin`.

```bash
cat /etc/passwd | grep "nologin" | cut -f1 -d ":"
```

#### Example: List Only Real Users

```bash
awk -F ':' '$7 ~ /bash/' /etc/passwd
```

***

### 3. `/var/log/` – Log Files

#### Contains records of key activities:

| File                  | Purpose                           |
| --------------------- | --------------------------------- |
| `auth.log` / `secure` | Authentication and login attempts |
| `syslog` / `messages` | General system activity           |
| `kern.log`            | Kernel activity                   |
| `apache2/`, `httpd/`  | Web server logs                   |
| `dpkg.log`, `yum.log` | Software installation logs        |

📌 Inspect the directory:

```bash
ls -l /var/log/  cat /var/log/auth.log
```

🔍 **DF Insight:**

> Logs can help identify login attempts, script executions, and suspicious tools:
>
> * Track user commands
>
> * Discover cron jobs or auto-scripts
>
> * Detect installation of hacking tools like `netcat`

***

### 4. `/proc/` – Running Processes and System Info

#### A virtual directory that reflects real-time system status:

| Path            | Description                     |
| --------------- | ------------------------------- |
| `/proc/cpuinfo` | CPU information                 |
| `/proc/meminfo` | Memory info                     |
| `/proc/[PID]/`  | Details about a running process |

🔍 **DF Insight:**

* View active processes during live forensics.

* Extract details from malicious process activity.

***

### 5. `/etc/cron*` – Scheduled Tasks (Cron Jobs)

#### To list scheduled jobs for users:

```bash
ls /etc/cron*
```

#### To check a user’s cron jobs manually:

```bash
crontab -l -u USERNAME
```

> 🔍 **DF Tip:**\
> You may find scripts used to maintain a backdoor.\
> Look for suspicious auto-executing jobs that maintain access or launch malware.

***

### 6. `/etc/fstab` and `/etc/mtab` – Mounted Drives

* **fstab**: Lists drives mounted at boot time.

* **mtab**: Shows currently mounted drives.

#### Example:

```bash
cat /etc/fstab   cat /etc/mtab
```

🔍 **DF Insight:**\
Reveals external drives used and their mount locations.\
Helpful in identifying storage devices possibly containing tools or malicious data.

***

### 7. Environment Variables

Via:

* `.bashrc`

* `.profile`

* Command `env`

```bash
env
```

🔍 **DF Tip:**\
Monitor strange environment variables—they may point to malicious libraries (e.g., `LD_PRELOAD`).

Pay close attention to any unfamiliar variables like `LD_PRELOAD`, which can be used to load malicious code.

***

## 🧪 **Important Tips During Investigation**

| Step                     | Tip                                                                    |
| ------------------------ | ---------------------------------------------------------------------- |
| Working on a live system | Do not use `dd` directly; use Live CD to avoid changes                 |
| Connecting USB           | Check `/proc/` and `/var/log/` for activity – avoid evidence tampering |
| File extraction          | Use tools like `foremost`, `photorec` on the image file                |
| Analyzing users          | Focus on login shell, home directories, and command history            |
| Analyzing services       | Use `/etc/passwd` and verify login permissions                         |

***

## ✅ **Conclusion**

**Linux system forensics** is a delicate yet information-rich process.\
It requires:

* Deep understanding of Linux system architecture

* Awareness of where and how evidence is stored

* Proper tools to avoid altering original data

🔎 With this knowledge, a digital investigator can trace every step taken on the system and identify the perpetrator with well-documented and precise procedures.

***

***

# 🧠 **التحليل الجنائي لنظام التشغيل لينكس – Linux OS Forensics**

## 🎯 **مقدمة : الفرق بين لينكس وويندوز في التحقيق الرقمي**

في أنظمة **ويندوز**، يكون الـ **Registry** هو المصدر المركزي للمعلومات.\
أما في **لينكس**، فلا يوجد Registry، بل يعتمد النظام على **ملفات موزعة** في هيكل نظام الملفات.

🔍 لذلك، أثناء التحقيق الجنائي في لينكس، يتم التركيز على **مجلدات ومسارات معينة** تحتوي على أدلة هامة حول سلوك المستخدم والنظام.

***

## 🚨 **الخطوة الأولى: كيفية التعامل مع جهاز لينكس في موقع الجريمة؟**

### 🧰 السيناريوهات المحتملة:

#### 1. الجهاز تم تسليمه كقرص صلب (Hard Disk فقط)

* استخدم أداة `dd` لعمل نسخة طبق الأصل (Image) من القرص:

```bash
dd if=/dev/sdX of=/mnt/usb/linux_image.dd bs=4M conv=noerror,sync
```

#### 2. الجهاز يعمل ومفتوح

* لا تستخدم `dd` من النظام نفسه.

* استخدم **Live CD** مثل: `CAINE`, `SIFT`, `Kali`.

* الهدف: تجنب الكتابة على القرص الأصلي.

⚠️ **تحذير:** أي كتابة على الجهاز قد تُفسد الأدلة.

#### 3. الجهاز مغلق ولا تعرف كلمة المرور

* يمكن استخدام **Single User Mode** لتجاوز كلمة المرور، بشرط أن يكون ذلك ضمن القوانين المعمول بها. => \[\[05-What is Single User Mode]]

***

## 📁 **أهم الأماكن للتحليل في نظام ملفات لينكس**

### 1. `/home/USERNAME/` – مجلد المستخدم

#### ملفات مهمة:

| الملف                        | الغرض                                         |
| ---------------------------- | --------------------------------------------- |
| `.bash_history`              | سجل الأوامر التي نفذها المستخدم               |
| `.bashrc`                    | أوامر تُنفذ تلقائيًا عند الدخول إلى الـ shell |
| `.profile` / `.bash_profile` | إعدادات البيئة ومسارات التشغيل                |

#### أوامر مساعدة:

```bash
cat ~/.bash_history

cat ~/.bashrc

echo $PATH
```

> 🧠 **ملاحظة:**\
> قد تحتوي هذه الملفات على مسارات أدوات خبيثة أو سكربتات تُفعّل تلقائيًا أو روابط خارجية.

***

### 2. `/etc/passwd` – التعرف على المستخدمين

#### يحتوي على معلومات كل المستخدمين:

* اسم المستخدم

* UID

* GID

* Shell المستخدم

* مجلد Home

#### تحليل محتوى الملف:

```bash
cat /etc/passwd
```

```bash
cat /etc/passwd|cut -f1 -d ":"
```

📌 قد يكون من الصعب قراءة الملف مباشرة، فاستخدم أدوات مثل Excel أو `awk`:

```bash
awk -F ':' '{print $1}' /etc/passwd
```

🔍 **التحقق من المستخدمين غير الشرعيين:**

* بعض المستخدمين يمثلون **خدمات وليس أشخاصًا حقيقيين** (مثل `www-data`, `sshd`).

* تحقق من حق الوصول (Login shell).\
  المستخدمون الحقيقيون يكون لديهم `/bin/bash`، أما الخدمات غالبًا تكون `/usr/sbin/nologin`.

```bash
cat /etc/passwd|grep "nologin" |cut -f1 -d ":"
```

#### مثال للحصول على المستخدمين الحقيقيين فقط:

```bash
awk -F ':' '$7 ~ /bash/' /etc/passwd
```

***

### 3. `/var/log/` – ملفات السجلات (Logs)

#### تحتوي على سجلات كل العمليات التالية:

| الملف                     | الوظيفة                       |
| ------------------------- | ----------------------------- |
| `auth.log` / `secure`     | سجلات الدخول ومحاولات التوثيق |
| `syslog` / `messages`     | نشاط النظام العام             |
| `kern.log`                | سجل نواة النظام               |
| `apache2/`, `httpd/`      | سجلات خوادم الويب             |
| `dpkg.log`, `yum.log`     | سجلات تثبيت البرمجيات         |
| 📌 افحص هذا المسار جيدًا: |                               |

```bash
ls -l /var/log/

cat /var/log/auth.log
```

🔍 **DF Insight:**

> قد تساعدك السجلات على تحديد محاولات الدخول، تنفيذ السكربتات، أو استخدام أدوات مشبوهة.

* تحديد الأوامر التي نفّذها المستخدم.

* اكتشاف السكربتات التلقائية أو الـ Cron Jobs.

* التحقق من عمليات تثبيت البرامج، خصوصًا أدوات الهجوم مثل `netcat`.

***

### 4. `/proc/` – العمليات الجارية ومعلومات الجهاز

#### مجلد افتراضي يعرض حالة النظام في الوقت الحقيقي

| المسار          | الوظيفة                 |
| --------------- | ----------------------- |
| `/proc/cpuinfo` | معلومات المعالج         |
| `/proc/meminfo` | معلومات الذاكرة         |
| `/proc/[PID]/`  | معلومات العملية الجارية |

🔍 **DF Insight:**

* معرفة العمليات التي كانت تعمل (في التحليل المباشر – Live).

* استخراج معلومات من العمليات المرتبطة بالتنفيذ الخبيث.

***

### 5. `/etc/cron*` – المهام المجدولة (Cron Jobs)

#### لفحص المهام المجدولة للمستخدمين:

```bash
ls /etc/cron*
```

#### لفحص المهام المجدولة يدويًا:

```bash
crontab -l -u USERNAME
```

> 🔍 **DF Tip:** قد تجد سكربتات تُستخدم للحفاظ على اتصال خلفي (backdoor). ابحث عن سكربتات مشبوهة تعمل بجدولة تلقائية للحفاظ على الاتصال أو تشغيل برامج خبيثة.

***

### 6. `/etc/fstab` و `/etc/mtab` – نقاط تركيب الأقراص (Mount Points)

* **fstab**: يحتوي على الأقراص التي تُركّب تلقائيًا عند الإقلاع.

* **mtab**: الأقراص المركبة حاليًا.

#### مثال:

```bash
cat /etc/fstab 

cat /etc/mtab
```

🔍 **DF Insight:**\
يعطي فكرة عن الأقراص الخارجية المستخدمة، وأماكن تركيبها. يساعد على معرفة استخدام وحدات تخزين خارجية قد تحتوي على أدوات أو بيانات خبيثة.

***

### 7. ملفات الـ Environment Variables (بيئة التشغيل)

من خلال:

* `.bashrc`

* `.profile`

* أمر `env`

```bash
env
```

🔍 **DF Tip:** راقب متغيرات البيئة الغريبة، قد تكون دليلاً على تحميل مكتبات مشبوهة (مثال: LD\_PRELOAD). انتبه لأي متغير غريب، مثل `LD_PRELOAD` الذي يمكن استخدامه لتحميل مكتبات خبيثة.

***

## 🧪 **نصائح مهمة أثناء التحقيق**

| الخطوة                  | نصيحة                                                          |
| ----------------------- | -------------------------------------------------------------- |
| عند دخولك على جهاز يعمل | لا تستخدم `dd` مباشرة، استخدم Live CD لتجنب التعديل على النظام |
| عند توصيل USB           | سيظهر في `/proc/`, `/var/log/` – كن حذرًا من تعديل الأدلة.     |
| استخراج الملفات         | استخدم أدوات مثل `foremost`, `photorec` على الـ Image.         |
| تحليل المستخدمين        | ركّز على Shell المستخدم، ومجلداته، وسجل الأوامر.               |
| تحليل الخدمات           | استخدم `/etc/passwd` مع تحقق من أذونات الدخول.                 |

***

## ✅ **خاتمة**

يُعد **تحليل نظام التشغيل لينكس** عملية دقيقة لكنها غنية بالمعلومات.\
يتطلب الأمر:

* فهمًا عميقًا لبنية النظام.

* دراية بالأماكن التي تُخزّن فيها الأدلة.

* استخدام أدوات مناسبة لمنع العبث بالأدلة.

🔎 بفضل هذه المعرفة، يستطيع المحقق الرقمي أن يتتبّع كل حركة على النظام، ويصل إلى الجاني الرقمي بخطوات موثقة ومحكمة.

