---
id: "68ee4e5daab509ade1166b25"
title: "🧠 Registry Analysis Guide – What to Look for at the Analysis Phase"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/course-based-digital-forensics-labs/registry-analysis-guide-what-to-look-for-at-the-analysis-phase"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T13:21:33.040Z"
updatedAt: "2026-01-25T15:35:46.843Z"
---

# 🧠 **Registry Analysis Guide – What to Look for at the Analysis Phase**

> ✅ **Tools Used:**\
> `Registry Explorer` | `ShellBags Explorer` | `RegRipper`

***

## 🎯 **First: Goal of the Analysis Phase**

After acquiring the **Registry Hives** files, we analyze them to gather accurate forensic information that helps in:

* 🧑‍💻 Understanding **user behavior**

* ⚙️ Collecting **system information**

* 🌐 Detecting **network or internet connections**

* 💿 Analyzing **connected external devices (USBs)**

* 🧪 Detecting **suspicious activity or attempts to hide evidence**

***

## 🗂️ **Section One: Analysis by Hive File Type**

### 📁 1. Analyzing the `SYSTEM` Hive

| 🔍 What to Look For       | 🧩 Why?                                   | 📁 Path                                           | 🛠️ Tool                   | 🧪 Analytical Notes                                                                     |
| ------------------------- | ----------------------------------------- | ------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------- |
| 🖥️ **Computer Name**     | Identify the machine involved             | `ControlSet001\Control\ComputerName\ComputerName` | RegRipper: `compname`      | Useful in large networks to correlate with network logs                                 |
| ⏰ **Time Zone**           | Interpret timestamps correctly            | `ControlSet001\Control\TimeZoneInformation`       | `timezone`                 | May reveal date manipulation in anti-forensic attempts                                  |
| 🌐 **Network Interfaces** | Identify networks connected to the device | `Services\Tcpip\Parameters\Interfaces`            | Manual or RegRipper Plugin | Compare internal IPs with DHCP logs or network records                                  |
| 🔌 **Mounted Devices**    | Track connected external storage          | `MountedDevices`                                  | `mountdev`                 | Might reveal USB drives used for exfiltration or live OS like Kali                      |
| 📱 **USBSTOR Artifacts**  | Track USB devices history                 | `Enum\USBSTOR`                                    | Manual                     | Shows device type (e.g., "SanDisk", "iPhone"); helpful in approximating connection time |

***

### 📁 2. Analyzing the `SOFTWARE` Hive

| 🔍 What to Look For       | 🧩 Why?                                     | 📁 Path                                      | 🛠️ Tool              | 🧪 Analytical Notes                                                               |
| ------------------------- | ------------------------------------------- | -------------------------------------------- | --------------------- | --------------------------------------------------------------------------------- |
| 💻 **Installed Programs** | Discover what tools/software were installed | `Microsoft\Windows\CurrentVersion\Uninstall` | `uninstall`           | Look for apps like: `TeamViewer`, `AnyDesk`, `Wireshark`, `Tor`, or hacking tools |
| 🌐 **Typed URLs (IE)**    | Analyze user activity on Internet Explorer  | `Microsoft\Internet Explorer\TypedURLs`      | `typedurls`           | May include login pages, bank portals, or targeting pages                         |
| 🧭 **Last Used Keys**     | Track what the user viewed in Regedit       | `Applets\Regedit\LastKey`                    | Manual / `recentdocs` | Might indicate attempts to modify or monitor sensitive keys                       |

***

### 📁 3. Analyzing the `NTUSER.DAT` Hive

> Each user has a different `NTUSER.DAT` file\
> It contains details about user behavior and interactions with the system

| 🔍 What to Look For             | 🧩 Why?                           | 📁 Path                            | 🛠️ Tool             | 🧪 Analytical Notes                                                                       |
| ------------------------------- | --------------------------------- | ---------------------------------- | -------------------- | ----------------------------------------------------------------------------------------- |
| 📂 **File MRUs (Recent Files)** | Analyze recently opened documents | `Office\<ver>\Word/Excel\File MRU` | `officeMRU`          | May contain sensitive documents or drafted malicious content                              |
| ▶️ **Run MRU**                  | Programs run manually by the user | `Explorer\RunMRU`                  | `runmru`             | Commands like `cmd`, `powershell`, `nc.exe` may indicate suspicious activity              |
| 🔍 **WordWheelQuery**           | Keywords searched in the system   | `Explorer\WordWheelQuery`          | `wordwheel`          | Look for terms like “VPN”, “delete logs”, or suspicious filenames                         |
| 🧳 **ShellBags**                | Track folders browsed by the user | `Shell\BagMRU` and `ShellNoRoam`   | `ShellBags Explorer` | ShellBags preserve folder history even after deletion – useful in proving hidden evidence |
| 🔐 **UserAssist**               | Programs launched via GUI         | `Explorer\UserAssist`              | `userassist`         | Logs most app executions even if they don't show in recent files                          |

***

### 📁 4. Analyzing the `SAM` Hive

| 🔍 What to Look For  | 🧩 Why?                 | 📁 Path                           | 🛠️ Tool   | 🧪 Analytical Notes                                         |
| -------------------- | ----------------------- | --------------------------------- | ---------- | ----------------------------------------------------------- |
| 👥 **User Accounts** | List all local accounts | `SAM\Domains\Account\Users\Names` | `samparse` | Look for suspicious or new accounts like `adm1n`, `test123` |

***

## 🧾 Registry Forensics Checklist

| 🔍 Hive      | 🧠 Key Points to Verify                                      |
| ------------ | ------------------------------------------------------------ |
| `SYSTEM`     | ComputerName, TimeZone, Interfaces, Mounted Devices, USBSTOR |
| `SOFTWARE`   | Installed Software, IE TypedURLs, Last Registry Keys         |
| `NTUSER.DAT` | File MRU, RunMRU, WordWheel, ShellBags, UserAssist           |
| `SAM`        | User accounts, creation time, privileges                     |

***

## 🔎 Section Two: Context-Based or Activity-Based Analysis

### 🧠 **User Behavior**

* Manual command execution (`RunMRU`)

* System-wide searches (`WordWheelQuery`)

* Recently used files (Office MRU)

* Folder navigation (Shellbags)

* Apps launched via GUI (UserAssist)

### 🌐 **Internet and Network Interaction**

* TypedURLs → browsing history

* Network Interfaces → DHCP or static IPs

* Installed programs → presence of VPNs or anonymizing tools

### 🔌 **Portable Device Analysis (USB/Phones)**

* MountedDevices → show connection order of devices

* USBSTOR → reveals device names, can be correlated with CCTV logs or network evidence

***

## 💡 Final Smart Analysis Tips

* 📋 **Build a Timeline Template** to correlate evidence chronologically

* 🔍 **Map SID to real usernames**

* 🆚 **Compare results across tools** (RegRipper × Registry Explorer)

* 📎 **Document every step** with date, time, and tool used

* 🧩 **Check alternate registry paths** for Windows 10/11 (some keys have changed)

***

***

***

# 🧠 **Registry Analysis Guide – What to Look for at the Analysis Phase**

> ✅ **الأدوات المستخدمة:**\
> `Registry Explorer` | `ShellBags Explorer` | `RegRipper`

***

## 🎯 **أولاً: هدف مرحلة التحليل**

بعد الحصول على ملفات الـ **Registry Hives**، نقوم بتحليلها لتجميع معلومات جنائية دقيقة تساعد في:

* 🧑‍💻 فهم **سلوك المستخدم**

* ⚙️ جمع **معلومات عن النظام**

* 🌐 كشف **الاتصال بالشبكات** أو الإنترنت

* 💿 تحليل **الأجهزة الخارجية** المستخدمة (USBs)

* 🧪 رصد **أي نشاط مشبوه أو محاولة إخفاء أدلة**

***

## 🗂️ **القسم الأول: التحليل حسب نوع ملف الـHive**

### 📁 1. تحليل ملف `SYSTEM`

| 🔍 ماذا أبحث؟             | 🧩 لماذا؟                        | 📁 المسار                                         | 🛠️ الأداة               | 🧪 ملاحظات تحليلية                                                                  |
| ------------------------- | -------------------------------- | ------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------- |
| 🖥️ **Computer Name**     | تحديد اسم الجهاز المرتبط بالأدلة | `ControlSet001\Control\ComputerName\ComputerName` | RegRipper: `compname`    | مفيد في تتبع الأجهزة في شبكات كبيرة، وربطه بـ Network Logs                          |
| ⏰ **Time Zone**           | تفسير التواريخ والـTimestamps    | `ControlSet001\Control\TimeZoneInformation`       | `timezone`               | قد يكشف تلاعب بالتاريخ، خصوصًا في سيناريوهات تغيير التوقيت للتضليل                  |
| 🌐 **Network Interfaces** | تحديد الشبكات المتصلة بالجهاز    | `Services\Tcpip\Parameters\Interfaces`            | يدوي أو RegRipper Plugin | احرص على مقارنة IP الداخلي مع سجلات DHCP الخارجية أو ملفات الشبكة                   |
| 🔌 **Mounted Devices**    | تتبع الأجهزة الخارجية المتصلة    | `MountedDevices`                                  | `mountdev`               | قد تحتوي على آثار لأقراص USB مشفرة أو أدوات اختراق مثل Kali Live USB                |
| 📱 **USBSTOR Artifacts**  | تتبع أجهزة USB المتصلة           | `Enum\USBSTOR`                                    | يدوي                     | يكشف نوع الجهاز (مثلاً: "SanDisk", "iPhone") ويُستخدم لتحديد توقيت الاتصال بالتقريب |

***

### 📁 2. تحليل ملف `SOFTWARE`

| 🔍 ماذا أبحث؟             | 🧩 لماذا؟                           | 📁 المسار                                    | 🛠️ الأداة          | 🧪 ملاحظات تحليلية                                                              |
| ------------------------- | ----------------------------------- | -------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| 💻 **Installed Programs** | معرفة ما تم تثبيته من أدوات/برامج   | `Microsoft\Windows\CurrentVersion\Uninstall` | `uninstall`         | ابحث عن برامج مثل: `TeamViewer`, `AnyDesk`, `Wireshark`, `Tor`، أو أدوات اختراق |
| 🌐 **Typed URLs (IE)**    | تحليل نشاط المستخدم على IE          | `Microsoft\Internet Explorer\TypedURLs`      | `typedurls`         | قد تجد مواقع دخول بريد، بنوك، صفحات استهداف                                     |
| 🧭 **Last Used Keys**     | تتبع ما استعرضه المستخدم في Regedit | `Applets\Regedit\LastKey`                    | يدوي / `recentdocs` | يدل على محاولة المستخدم تعديل أو رؤية مفاتيح حساسة في الريجستري                 |

***

### 📁 3. تحليل ملف `NTUSER.DAT`

> لكل مستخدم يوجد ملف `NTUSER.DAT` مختلف\
> يحتوي على معلومات تتعلق بسلوك المستخدم وتفاعله مع النظام

| 🔍 ماذا أبحث؟                   | 🧩 لماذا؟                                 | 📁 المسار                          | 🛠️ الأداة           | 🧪 ملاحظات تحليلية                                                                    |
| ------------------------------- | ----------------------------------------- | ---------------------------------- | -------------------- | ------------------------------------------------------------------------------------- |
| 📂 **File MRUs (Recent Files)** | تحليل الملفات التي تم فتحها مؤخرًا        | `Office\<ver>\Word/Excel\File MRU` | `officeMRU`          | قد تتضمن مستندات بها بيانات سرية أو أدلة كتابة تقارير خبيثة                           |
| ▶️ **Run MRU**                  | البرامج التي تم تشغيلها يدويًا            | `Explorer\RunMRU`                  | `runmru`             | أوامر مثل `cmd`, `powershell`, `nc.exe` قد تدل على أنشطة مشبوهة                       |
| 🔍 **WordWheelQuery**           | الكلمات التي تم البحث عنها في النظام      | `Explorer\WordWheelQuery`          | `wordwheel`          | ابحث عن كلمات مثل "VPN", "delete logs", أو أسماء ملفات مثيرة                          |
| 🧳 **ShellBags**                | معرفة المجلدات التي تم تصفحها             | `Shell\BagMRU` و `ShellNoRoam`     | `ShellBags Explorer` | ShellBags تحتفظ بمعلومات حتى بعد حذف المجلدات – مفيدة جدًا في إثبات وجود دليل تم حذفه |
| 🔐 **UserAssist**               | البرامج المفتوحة من خلال الواجهة الرسومية | `Explorer\UserAssist`              | `userassist`         | يقوم النظام بتسجيل تشغيل معظم التطبيقات، حتى إن لم تظهر بوضوح                         |

***

### 📁 4. تحليل ملف `SAM`

| 🔍 ماذا أبحث؟        | 🧩 لماذا؟                | 📁 المسار                         | 🛠️ الأداة | 🧪 ملاحظات تحليلية                                             |
| -------------------- | ------------------------ | --------------------------------- | ---------- | -------------------------------------------------------------- |
| 👥 **User Accounts** | جميع الحسابات على الجهاز | `SAM\Domains\Account\Users\Names` | `samparse` | تحقق من الحسابات الغريبة أو الجديدة (مثال: `adm1n`, `test123`) |

***

## 🧾 قائمة مراجعة تحليل الريجستري (Registry Forensics Checklist)

| 🔍 الملف     | 🧠 نقاط أساسية للتحقق منها                                   |
| ------------ | ------------------------------------------------------------ |
| `SYSTEM`     | ComputerName, TimeZone, Interfaces, Mounted Devices, USBSTOR |
| `SOFTWARE`   | Installed Software, IE TypedURLs, Last Registry Keys         |
| `NTUSER.DAT` | File MRU, RunMRU, WordWheel, ShellBags, UserAssist           |
| `SAM`        | User accounts, توقيت الإنشاء، الصلاحيات                      |

***

## 🔎 القسم الثاني: التحليل حسب النشاط أو السياق الجنائي

### 🧠 **سلوك المستخدم**

* تنفيذ أوامر يدويًا (`RunMRU`)

* البحث داخل النظام (`WordWheelQuery`)

* الملفات المستخدمة مؤخرًا (Office MRU)

* تصفح المجلدات (Shellbags)

* البرامج المفتوحة عبر الواجهة (UserAssist)

### 🌐 **التواصل مع الإنترنت والشبكات**

* ال TypedURLs → يظهر تاريخ التصفح

* ال Network Interfaces → يكشف الاتصال بـDHCP أو IP ثابت

* البرامج المثبتة → وجود VPNs أو أدوات تحويل IP

### 🔌 **تحليل الأدوات المحمولة (USB/Phones)**

* ال MountedDevices → عرض ترتيب توصيل الأجهزة

* ال USBSTOR → يظهر أسماء الأجهزة، يمكن مقارنتها مع لقطات كاميرا مراقبة أو لوجات الشبكة

***

## 💡 نصائح ختامية للتحليل الذكي

* 📋 **جهّز قالب Timeline** لربط الأدلة زمنيًا

* 🔍 **اربط الـSID** لكل مستخدم مع اسمه الحقيقي

* 🆚 **قارن النتائج بين أكثر من أداة** (RegRipper × Registry Explorer)

* 📎 **وثّق كل خطوة** بالتاريخ والوقت والأداة المستخدمة

* 🧩 **راجع المفاتيح البديلة** في حالات Windows 10 و11 (بعض المسارات تغيّرت)

