---
id: "68f6d34dd04a4c38730760f5"
title: "Structure & Configuration"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/logstash/pipeline/structure-and-configuration"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-21T00:26:53.197Z"
updatedAt: "2026-01-25T15:35:47.111Z"
---

***

***

***

***

# 🛠️ **هيكل Logstash Pipeline وتفاصيل الإعدادات (Pipeline Structure & Configuration)**

***

## ⚙️ أولًا: ما هو الـ **Logstash Pipeline**

الـ **pipeline** في Logstash هو سلسلة من المكونات اللي بتشتغل مع بعض لمعالجة البيانات.\
بيتكوّن من ثلاث مراحل أساسية:

```css
input → filter → output
```

| المكون (Component) | الوظيفة (Role)                                        | أمثلة                       |
| ------------------ | ----------------------------------------------------- | --------------------------- |
| **Input**          | المكان اللي Logstash بياخد منه البيانات               | Filebeat, TCP, stdin, http  |
| **Filter**         | المرحلة اللي بيتم فيها معالجة أو تعديل البيانات       | grok, mutate, date          |
| **Output**         | الوجهة اللي Logstash بيبعت ليها البيانات بعد المعالجة | Elasticsearch, stdout, file |

***

## 📄 ثانيًا: هيكل ملف الإعداد (Pipeline Structure)

ملف إعداد Logstash Pipeline بيتكوّن من أقسام منفصلة لكل نوع من الـ plugins،\
وبيتم تطبيق الـ Filters والـ Outputs **بالترتيب اللي تظهر بيه في الملف**.

### 🧩 شكل الملف:

```yaml
# This is a comment.
input {
  ...
}

filter {
  ...
}

output {
  ...
}
```

📌 **ملاحظة:**

* لو عندك أكثر من filter أو output، بيتطبقوا بالتسلسل في نفس الترتيب اللي مكتوبين بيه.

* عند النشر (deployment)، لازم تضيف ملف الإعداد إلى:

  * ال `logstash.yml` باستخدام إعداد [`pipeline.id`](http://pipeline.id)\
    **أو**

  * ال `pipelines.yml` لتشغيل multiple pipelines.

***

## 🧱 ثالثًا: إعداد الـ Plugins (Plugin Configuration)

كل قسم من الأقسام (`input`, `filter`, `output`) بيحتوي على **plugins**.

شكل إعداد الـ plugin:

```yaml
input {
  http {
    port => 3333
    tags => gateway
  }

  # ممكن تستخدم نفس الـ plugin بإعدادات مختلفة
  http {
    port => 4444
    tags => billing
  }
}
```

📘 **الشرح:**

* ال `http` هو نوع الـ plugin.

* ال `port` و `tags` هما إعداداته الخاصة.

* تقدر تستخدم أكثر من plugin في نفس القسم.

***

## 💡 رابعًا: أنواع القيم المدعومة (Value Types)

كل plugin بيقبل أنواع معينة من القيم، وهي :

| النوع (Type)     | الوصف (Description)       | مثال                                                                       |
| ---------------- | ------------------------- | -------------------------------------------------------------------------- |
| **Boolean**      | قيمة منطقية               | `ssl_enable => true`                                                       |
| **String**       | نص داخل علامات اقتباس     | `name => "Hello world"`                                                    |
| **Number**       | رقم صحيح أو عشري          | `port => 33`                                                               |
| **Hash**         | أزواج key/value           | `match => { "field1" => "value1" "field2" => "value2" }`                   |
| **List (Array)** | أكثر من قيمة لنفس الإعداد | `path => ["/var/log/messages", "/var/log/*.log"]`                          |
| **Bytes**        | حجم بيانات                | `my_bytes => "10MiB"`                                                      |
| **Codec**        | نوع الـ codec المستخدم    | `codec => "json"`                                                          |
| **Password**     | نص مخفي لا يتم طباعته     | `my_password => "password"`                                                |
| **URI**          | رابط أو مُعرّف            | `my_uri => "`[`http://foo:bar@example.net`](http://foo:bar@example.net)`"` |
| **Path**         | مسار ملف في النظام        | `my_path => "/tmp/logstash"`                                               |

***

## 🧠 خامسًا: الوصول إلى حقول الأحداث (Accessing Event Fields)

كل **event** داخل Logstash بيتخزن في شكل JSON يحتوي على **fields** (حقول).

مثال:

```yaml
{
  "ip": "192.168.1.1",
  "response": {
    "status": 200
  }
}
```

تقدر توصل للحقول كالتالي:

| نوع الحقل    | طريقة الوصول         | النتيجة       |
| ------------ | -------------------- | ------------- |
| Top-level    | `[ip]`               | `192.168.1.1` |
| Nested field | `[response][status]` | `200`         |

⚠️ **ملاحظات مهمة:**

* لا يمكن استخدام `Field References` أو `Sprintf format` أو `Conditionals` داخل قسم **input**.

* لأنها تعتمد على وجود الأحداث بعد دخولها (يعني بعد مرحلة input).

***

## 🔢 سادسًا: تنسيق Sprintf Format

يُستخدم لإدراج قيم الحقول داخل النصوص باستخدام الصيغة `%{fieldname}`.

### أمثلة:

```sh
path => "/var/log/%{host}.log"
```

### تنسيق الوقت:

```sh
path => "/var/log/%{{yyyy.MM.dd.HH}}"
```

### قيمة الوقت الحالي:

```sh
%{{TIME_NOW}}
```

***

## 🧾 سابعًا: الحقل الخاص @metadata

ال `@metadata` هو **حقل مؤقت** لا يتم تضمينه في البيانات النهائية،\
يُستخدم لتخزين معلومات مساعدة أثناء المعالجة فقط.

### مثال:

```sh
filter {
  mutate { add_field => { "[@metadata][timestamp]" => "2025-10-20" } }
}

output {
  if [@metadata][timestamp] {
    stdout { codec => rubydebug }
  }
}
```

🔍 **ملاحظات:**

* لا يظهر محتواه في الإخراج النهائي.

* الوحيد اللي بيقدر يعرض محتواه هو **rubydebug codec** لما تحدد `metadata => true`.

***

## 🔀 ثامنًا: الشروط (Conditionals)

تُستخدم للتحكم في تنفيذ أجزاء معينة من الـ pipeline بناءً على حالة معينة.

### البنية:

```sh
if EXPRESSION {
  ...
} else if EXPRESSION {
  ...
} else {
  ...
}
```

### العوامل (Operators):

| النوع              | الأمثلة                          |
| ------------------ | -------------------------------- |
| مقارنة             | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| تعبير نمطي (Regex) | `=~`, `!~`                       |
| تضمين              | `in`, `not in`                   |
| منطق بولياني       | `and`, `or`, `nand`, `xor`, `!`  |

### مثال عملي:

```sh
filter {
  if [action] == "login" {
    mutate { remove_field => "secret" }
  }
}
```

🔎 **التحقق من وجود الحقول:**

```sh
if [foo]   # True فقط إذا كان الحقل موجود وله قيمة صالحة
```

***

## 🌍 تاسعًا: استخدام متغيرات البيئة (Environment Variables)

تسمح لك باستخدام متغيرات النظام داخل إعداد Logstash.

### الصيغة:

```sh
${VAR_NAME} أو ${VAR_NAME:default_value}
```

* `VAR_NAME`: اسم المتغير.

* `default_value`: القيمة الافتراضية لو المتغير مش موجود.

### مثال:

```sh
input {
  tcp {
    port => "${TCP_PORT:54321}"
  }
}
```

🔒 **المزايا:**

* أمان أعلى للكلمات السرية.

* مرونة في نشر الإعدادات على بيئات مختلفة.

***

## 🧩 عاشرًا: مثال تطبيقي كامل

```sh
input {
  beats {
    port => 5044
  }
}

filter {
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}" }
  }
  date {
    match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "apache-logs"
  }
  stdout { codec => rubydebug }
}
```

📊 **شرح:**

* ال `beats`: Logstash يستقبل البيانات من Filebeat.

* ال `grok`: يحلل الـ logs ويستخرج الحقول.

* ال `date`: يضبط التاريخ بناءً على صيغة الـ log.

* ال `elasticsearch`: يرسل النتائج إلى الـ cluster.

* ال `stdout`: يطبع البيانات على الشاشة بصيغة مقروءة (debug mode).

