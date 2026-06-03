
## ⚙️ إنشاء Logstash Pipeline (Creating a Logstash Pipeline)

### 🔹 مقدمة

ال **Pipeline Logstash** هو سلسلة من المكونات التي تعمل معاً لمعالجة البيانات.\
يتم إنشاء هذا الـ **Pipeline** عن طريق كتابة ملف إعداد (**Configuration File**) يحدد الإضافات (**plugins**) التي سيتم استخدامها.

***

### 1️⃣ المكونات الأساسية للـ Pipeline

يتكون الـ **Pipeline** من ثلاثة أقسام رئيسية، باستخدام الإضافات (**plugins**) التالية:

| المكون (Component)    | الإضافة (Plugin Type) | الوصف (Description)                                                                                              |
| --------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **الإدخال (Input)**   | Input                 | مصدر البيانات. يقوم بجلب البيانات إلى Logstash (مثل stdin، file، beats).                                         |
| **المعالجة (Filter)** | Filter                | مرحلة المعالجة والتحويل (الجزء Transform من دورة ETL). يستخدم لتعديل، وتحليل، وتخصيب الأحداث (مثل grok، mutate). |
| **الإخراج (Output)**  | Output                | الوجهة التي يتم إرسال البيانات المعالجة إليها (مثل elasticsearch، stdout).                                       |
| **المُرمّز (Codec)**  | Codec                 | يعمل داخل الإدخال أو الإخراج لتشفير أو فك تشفير البيانات (مثل json, rubydebug).                                  |

🔸 **الحد الأدنى لمتطلبات الـ Pipeline:**

* ال **Input** واحد على الأقل.

* ال **Output** واحد على الأقل.

عادةً ما تتضمن معظم خطوط الأنابيب إضافة **Filter** واحدة على الأقل لأنها تُنفذ الجزء الأهم وهو التحويل (**Transform**) في عملية\
**ETL (Extract → Transform → Load)**.

***

### 2️⃣ هيكل ملف الإعداد (Config File Structure)

يتم تعريف الإعدادات داخل ملف التكوين (عادةً بامتداد `.conf`) باستخدام الأقواس المعقوفة `{}`.\
يمكنك الإشارة إلى **حقول الأحداث (Event Fields)** واستخدام **الشروط (Conditionals)** لتنفيذ المعالجة فقط عندما تفي الأحداث بمعايير معينة.

***

### 3️⃣ مثال لـ Pipeline بسيط (Simple Example)

#### أ. إنشاء ملف الإعداد:

قم بإنشاء ملف باسم `logstash-simple.conf` (على سبيل المثال) واكتب فيه التكوين التالي:

```ruby
input {
  stdin { } 
}

output {
  # الإخراج إلى Elasticsearch باستخدام إعدادات Cloud
  elasticsearch { 
    cloud_id => "<cloud id>" 
    api_key => "<api key>" 
  }
  
  # الإخراج إلى الـ Standard Output لغرض التصحيح (Debugging)
  stdout { 
    codec => rubydebug 
  }
}
```

#### ب. تشغيل Logstash:

قم بتشغيل Logstash وتحديد ملف الإعداد باستخدام الـ flag التالي:

```bash
bin/logstash -f logstash-simple.conf
```

📍 **النتيجة:**\
سيقرأ Logstash الإعدادات، ويأخذ البيانات من **المدخلات القياسية (stdin)**، ثم يرسل الأحداث المعالجة إلى كل من:

* ال **Elasticsearch** (للتخزين)

* ال **stdout** (للمشاهدة الفورية بصيغة rubydebug)

***

## 🎯 الهدف من الـ Pipeline

الـ **pipeline** في Logstash هو **خط المعالجة (processing pipeline)** اللي بياخد البيانات (logs مثلًا)،\
يعالجها، وبعدين يرسلها إلى وجهة معينة (زي Elasticsearch أو حتى يطبعها على الشاشة).

***

## ⚙️ المكونات الأساسية لأي Pipeline

كل Logstash pipeline لازم يحتوي على على الأقل جزئين:

### 🔸 input

👉 بيحدد منين Logstash هياخد الـ data.

**أمثلة:**

* من ملف

* من Beats (زي Filebeat أو Winlogbeat)

* أو من الـ stdin (يعني إدخال يدوي من الكيبورد في المثال ده).

### 🔸 output

👉 بيحدد Logstash هيبعت البيانات دي فين بعد ما يعالجها.

**أمثلة:**

* إلى Elasticsearch

* أو إلى stdout (يعني يطبعها على الشاشة عشان نشوف شكلها).

***

## 🧩 شرح مثال الكود

```ruby
input { stdin { } }

output {
  elasticsearch {
    cloud_id => "<cloud id>"
    api_key => "<api key>"
  }
  stdout { codec => rubydebug }
}
```

📌 **الشرح:**

* ال `stdin { }` → بياخد الإدخال من المستخدم مباشرة (يعني لو كتبت كلمة في التيرمنال).

* ال `elasticsearch { ... }` → بيبعت البيانات إلى **Elasticsearch cloud**.

* ال `stdout { codec => rubydebug }` → بيعرض البيانات في التيرمنال بطريقة مقروءة وواضحة أثناء التجربة.

***

## 🚀 تشغيل Logstash باستخدام ملف الإعداد

لما تكتب الأمر ده:

```yaml
bin/logstash -f logstash-simple.conf
```

* ال Logstash بيبدأ تشغيل **instance واحدة**.

* بيقرأ إعدادات الـ **pipeline** من الملف `logstash-simple.conf`.

* وبعد كده بيبدأ في استقبال البيانات من الـ **input** وإرسالها إلى الـ **output**.

