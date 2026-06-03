
***

***

***

***

## 📘 **Logstash Directory Layout (هيكل مجلدات Logstash)**

يشرح هذا القسم **الهيكل الافتراضي للمجلدات (Directory Structure)** الذي يتم إنشاؤه عند تثبيت **Logstash**، ويختلف هذا الهيكل باختلاف **طريقة التثبيت**:

* أرشيفات (`.zip` أو `.tar.gz`)

* حزم أنظمة (`Debian` أو `RPM`)

* أو صور الحاويات (`Docker Images`).

***

## ⚙️ **مفاهيم أساسية (General Concepts)**

| النوع        | الوصف                                                                                                                           | المسار الافتراضي | الإعداد في Logstash             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------- |
| **home**     | المجلد الرئيسي لتثبيت Logstash                                                                                                  | —                | —                               |
| **bin**      | يحتوي على **السكربتات الثنائية (Binary Scripts)** مثل: `logstash` لتشغيل Logstash و `logstash-plugin` لإدارة الإضافات (Plugins) | —                | —                               |
| **settings** | ملفات الإعدادات مثل `logstash.yml` و `jvm.options`                                                                              | —                | `path.settings`                 |
| **logs**     | ملفات السجلات (Logs)                                                                                                            | —                | `path.logs`                     |
| **data**     | ملفات البيانات التي يستخدمها Logstash والـ plugins لتخزين المعلومات الدائمة (Persistence)                                       | —                | [`path.data`](http://path.data) |
| **plugins**  | ملفات الإضافات المحلية (Local Plugins) غير المثبتة كـ Ruby-Gem — مخصصة للتطوير فقط                                              | —                | `path.plugins`                  |

***

## 🗂️ **1️⃣ هيكل مجلدات الأرشيف (.zip و .tar.gz)**

### 📦 **الوصف:**

الحزم التي تأتي بصيغة `.zip` أو `.tar.gz` هي **Self-contained** أي مكتفية ذاتيًا — تحتوي على كل شيء داخل مجلد رئيسي واحد (Home Directory).

🔹 **المميزات:**

* لا تحتاج لإنشاء أي مجلدات إضافية لتبدأ استخدام Logstash.

* إزالة التثبيت سهلة جدًا — فقط احذف مجلد التثبيت الرئيسي.

🔸 **ملاحظة مهمة:**\
يُنصح **بتغيير أماكن مجلدات** `config` و `logs` حتى لا تفقد بياناتك المهمة عند حذف مجلد التثبيت.

### 📁 **الهيكل الافتراضي**

| النوع        | الوصف                                           | المسار الافتراضي                 | الإعداد في Logstash             |
| ------------ | ----------------------------------------------- | -------------------------------- | ------------------------------- |
| **home**     | المجلد الرئيسي لتثبيت Logstash                  | `{extract.path}` (ناتج فك الضغط) | —                               |
| **bin**      | ملفات التشغيل (`logstash`, `logstash-plugin`)   | `{extract.path}/bin`             | —                               |
| **settings** | ملفات الإعدادات (`logstash.yml`, `jvm.options`) | `{extract.path}/config`          | `path.settings`                 |
| **logs**     | ملفات السجلات                                   | `{extract.path}/logs`            | `path.logs`                     |
| **data**     | ملفات البيانات الدائمة                          | `{extract.path}/data`            | [`path.data`](http://path.data) |
| **plugins**  | إضافات محلية لأغراض التطوير                     | `{extract.path}/plugins`         | `path.plugins`                  |

***

## 🧩 **2️⃣ هيكل مجلدات حزم النظام (Debian و RPM)**

### 📦 **الوصف:**

عند تثبيت Logstash من خلال حزم النظام مثل `.deb` أو `.rpm`، يتم وضع الملفات في **أماكن قياسية على نظام Linux** تتوافق مع بنية النظام (File Hierarchy Standard).

### 📁 **الهيكل الافتراضي**

| النوع        | الوصف                                         | المسار الافتراضي              | الإعداد في Logstash                           |
| ------------ | --------------------------------------------- | ----------------------------- | --------------------------------------------- |
| **home**     | المجلد الرئيسي لتثبيت Logstash                | `/usr/share/logstash`         | —                                             |
| **bin**      | ملفات التشغيل (`logstash`, `logstash-plugin`) | `/usr/share/logstash/bin`     | —                                             |
| **settings** | ملفات الإعداد (`logstash.yml`, `jvm.options`) | `/etc/logstash`               | `path.settings`                               |
| **conf**     | ملفات تكوين الـ Pipeline (`*.conf`)           | `/etc/logstash/conf.d/*.conf` | يمكن تحديدها في `/etc/logstash/pipelines.yml` |
| **logs**     | ملفات السجلات                                 | `/var/log/logstash`           | `path.logs`                                   |
| **data**     | ملفات البيانات الدائمة                        | `/var/lib/logstash`           | [`path.data`](http://path.data)               |
| **plugins**  | الإضافات المحلية                              | `/usr/share/logstash/plugins` | `path.plugins`                                |

***

## 🐳 **3️⃣ هيكل مجلدات Docker Images**

### 📦 **الوصف:**

تم إنشاء صور Docker الخاصة بـ Logstash من الحزم (`.tar.gz`) وتحتفظ ببنية مشابهة تقريبًا، ولكنها تعمل داخل **Container environment**.

### 📁 **الهيكل الافتراضي**

| النوع        | الوصف                                         | المسار الافتراضي               | الإعداد في Logstash             |
| ------------ | --------------------------------------------- | ------------------------------ | ------------------------------- |
| **home**     | المجلد الرئيسي داخل الحاوية                   | `/usr/share/logstash`          | —                               |
| **bin**      | ملفات التشغيل (`logstash`, `logstash-plugin`) | `/usr/share/logstash/bin`      | —                               |
| **settings** | ملفات الإعداد (`logstash.yml`, `jvm.options`) | `/usr/share/logstash/config`   | `path.settings`                 |
| **conf**     | ملفات الـ Pipeline                            | `/usr/share/logstash/pipeline` | `path.config`                   |
| **data**     | بيانات التخزين الدائمة                        | `/usr/share/logstash/data`     | [`path.data`](http://path.data) |
| **plugins**  | الإضافات المحلية                              | `/usr/share/logstash/plugins`  | `path.plugins`                  |

> 📝 **ملاحظة:**\
> لا تُنشئ صور Docker الخاصة بـ Logstash ملفات Logs افتراضيًا.\
> بدلاً من ذلك، يتم تسجيل السجلات إلى **Standard Output (stdout)** ويمكن عرضها بالأمر:
>
> `docker logs <container_name>`

***

## 🧠 **خلاصة (Summary)**

* الهيكل العام لـ Logstash يتكوّن من مجلدات **bin**, **config**, **logs**, **data**, **plugins**.

* **ملفات الإعدادات** (مثل `logstash.yml`) تحدد مسارات هذه المجلدات عبر إعدادات مثل `path.settings`, `path.logs`, [`path.data`](http://path.data).

* يختلف مكان هذه المجلدات حسب **طريقة التثبيت** (Archive، System Packages، Docker).

* في Docker، يتم توجيه السجلات مباشرة إلى **stdout** بدلاً من حفظها كملفات.

***

## 📚 **المرجع الرسمي**

🔗 [Elastic Docs – Logstash Directory Layout](https://www.elastic.co/guide/en/logstash/current/dir-layout.html)

