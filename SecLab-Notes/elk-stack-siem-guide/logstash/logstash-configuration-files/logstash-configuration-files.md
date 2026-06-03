
***

***

***

***

# 📘 Logstash Configuration Files (ملفات إعداد Logstash)

يستخدم **Logstash** نوعين رئيسيين من ملفات الإعداد، وكل نوع له وظيفة مختلفة داخل النظام:

* ⚙️ ال **Pipeline Configuration Files**\
  تُستخدم لتعريف مراحل معالجة البيانات داخل Logstash.

* 🧩 ال **Settings Files**\
  تتحكم في إعدادات تشغيل Logstash وسلوك النظام أثناء الإقلاع والعمل.

***

## ⚙️ أولًا: Pipeline Configuration Files (ملفات إعداد الـ Pipeline)

هي الملفات التي تُحدد خطوات معالجة البيانات (**Processing Pipeline**) داخل Logstash.\
بمعنى آخر، هي التي تحدد:

* من أين تأتي البيانات (**Input**)

* كيف يتم معالجتها (**Filter**)

* وأين يتم إرسالها بعد المعالجة (**Output**)

#### 📍 الموقع الافتراضي:

في أنظمة **Debian** و **RPM**، يتم حفظ هذه الملفات داخل المسار:

```sh
cd /etc/logstash/conf.d/
```

### 🧾 ملاحظات مهمة:

* يقوم Logstash بتحميل **فقط** الملفات ذات الامتداد `.conf` من هذا المجلد.

* أي ملفات أخرى داخل `conf.d` يتم تجاهلها تلقائيًا.

* عادةً يحتوي كل ملف `.conf` على أقسام: **input**, **filter**, و **output**.

🔗 **لمزيد من التفاصيل:** [Creating a Logstash pipeline (Elastic Docs)](https://www.elastic.co/guide/en/logstash/current/configuration.html)

***

## 🧩 ثانيًا: Settings Files (ملفات الإعدادات الأساسية)

ملفات الإعدادات يتم تثبيتها تلقائيًا مع Logstash،\
وهي المسؤولة عن ضبط سلوك Logstash أثناء التشغيل — مثل إدارة الذاكرة، السجلات، وإعدادات الـ **pipelines** المتعددة.

***

### 📁 الملفات الرئيسية داخل Logstash

| اسم الملف             | الوظيفة الأساسية         | الوصف                                                                                                                                                                                                                                                                                                                   |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **logstash.yml**      | إعدادات التشغيل العامة   | يحتوي على **Logstash configuration flags**. يمكنك تحديد الإعدادات هنا بدلًا من تمريرها عبر سطر الأوامر (**Command Line**). 💡 ملاحظة: الإعدادات التي تُمرر عبر سطر الأوامر **تتجاوز** الإعدادات في هذا الملف. 🔗 [المزيد عن logstash.yml](https://www.elastic.co/guide/en/logstash/current/logstash-settings-file.html) |
| **pipelines.yml**     | إدارة تعدد الـ Pipelines | يُستخدم لتشغيل أكثر من **Pipeline** داخل نفس الـ Logstash instance. كل **pipeline** يمكن أن يكون له ملف إعداد `.conf` منفصل. 🔗 [المزيد عن Multiple Pipelines](https://www.elastic.co/guide/en/logstash/current/multiple-pipelines.html)                                                                                |
| **jvm.options**       | إعدادات الـ JVM          | يحتوي على إعدادات **Java Virtual Machine**. يمكنك من خلاله تحديد: - الحد الأدنى والأقصى من الذاكرة (**Heap Size**). - اللغة المحلية (**Locale**). - إعدادات متقدمة خاصة بالـ JVM (للمستخدمين الخبراء). 💡 ملاحظة: كل إعداد يتم كتابته في **سطر منفصل**.                                                                 |
| **log4j2.properties** | إعدادات نظام الـ Logging | يحتوي على الإعدادات الافتراضية لمكتبة **Log4j 2**، المسؤولة عن إنشاء وتسجيل سجلات Logstash الداخلية. 🔗 [المزيد عن Log4j2 Configuration](https://www.elastic.co/guide/en/logstash/current/logging.html)                                                                                                                 |

### **ملاحظات مهمه :**

##### **Multiple Pipelines داخل Logstash :**

عند استخدام **Multiple Pipelines** داخل Logstash، يمكن لكل **pipeline** أن يعمل بشكل مستقل تمامًا من حيث:

* ال **Input** (المنفذ أو مصدر البيانات)

* ال **Filter** (طريقة معالجة البيانات)

* ال **Output** (وجهة الإرسال النهائية)

🔹 **كل ملف .conf يمكنه استخدام port مختلف** لاستقبال البيانات.\
لكن يجب الانتباه إلى أن استخدام أكثر من pipeline على **نفس المنفذ (port)** يؤدي إلى **تعارض (Port Conflict)** وفشل تشغيل Logstash.

📘 **مثال توضيحي:**

* ال `nginx.conf` يستقبل على المنفذ `5044`

* ال `windows.conf` يستقبل على المنفذ `5045`\
  كلاهما يمكن تشغيلهما في نفس Logstash instance بدون أي مشكلة.

##### **Logstash Instance** :

الـ **Instance** معناها "نسخة تشغيل" أو "عملية تشغيل" (Running Process) من Logstash.\
بمعنى آخر، كل مرة بتشغّل Logstash (سواء كخدمة أو يدويًا)، أنت بتشغّل **instance واحدة من Logstash**.

| المصطلح                | المعنى                                                    |
| ---------------------- | --------------------------------------------------------- |
| **Logstash Instance**  | عملية تشغيل واحدة لـ Logstash (Running process)           |
| **Pipeline**           | مجموعة مراحل (Input → Filter → Output) داخل الـ instance  |
| **Multiple Pipelines** | أكثر من Pipeline بيشتغلوا معًا داخل نفس Logstash instance |
| 📌 **بمعنى بسيط:**     |                                                           |

> الـ *Logstash instance* هو "المحرّك" اللي بيشغّل واحد أو أكثر من الـ *pipelines* في نفس الوقت.

***

## 🧠 خلاصة (Summary)

| نوع الملف                                         | الوظيفة                                            | الموقع الافتراضي        |
| ------------------------------------------------- | -------------------------------------------------- | ----------------------- |
| **Pipeline Configs (.conf)**                      | تحديد مراحل الـ pipeline (Input → Filter → Output) | `/etc/logstash/conf.d/` |
| **logstash.yml**                                  | إعدادات عامة وتشغيلية                              | `/etc/logstash/`        |
| **pipelines.yml**                                 | تعريف وتشغيل عدة Pipelines                         | `/etc/logstash/`        |
| **jvm.options**                                   | تخصيص إعدادات JVM (الذاكرة واللغة)                 | `/etc/logstash/`        |
| [**log4j2.properties**](http://log4j2.properties) | إعدادات تسجيل السجلات (Logging)                    | `/etc/logstash/`        |

***

## 📚 المرجع الرسمي

🔗 [Elastic Docs – Logstash Configuration Files](https://www.elastic.co/guide/en/logstash/current/configuration-files.html)

