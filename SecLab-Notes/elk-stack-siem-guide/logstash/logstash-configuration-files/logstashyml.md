---
id: "68f6b0a958c360fbb7eb2f55"
title: "logstash.yml"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/logstash/logstash-configuration-files/logstashyml"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-20T21:59:05.739Z"
updatedAt: "2026-01-25T15:35:47.109Z"
---

***

***

***

***

# 📘 Logstash Configuration File — logstash.yml

يُعد ملف `logstash.yml` الملف الرئيسي في إعداد Logstash، ويُستخدم للتحكم في كيفية تنفيذ Logstash، وتحديد إعدادات الـ **pipelines**، ومواقع ملفات الإعداد، وخيارات التسجيل (logging)، بالإضافة إلى إعدادات الـ HTTP API وغيرها.

***

## 🧩 **وظيفة الملف**

* تحديد إعدادات الـ **pipeline** (مثل عدد الـ workers، حجم الـ batch، ترتيب الأحداث).

* تحديد أماكن الملفات (**config files**, **logs**, **data directories**).

* التحكم في طريقة التسجيل (**log level**, **log format**).

* تمكين أو تعطيل واجهة **HTTP API** الخاصة بـ Logstash.

* دعم **Environment Variables** و **Keystore Secrets** داخل القيم.

***

## ⚙️ **الموقع الافتراضي حسب النظام**

| النظام       | المسار                                    |
| ------------ | ----------------------------------------- |
| Debian / RPM | `/etc/logstash/logstash.yml`              |
| Docker Image | `/usr/share/logstash/config/logstash.yml` |

***

## 📝 **المبادئ الأساسية**

### 🔹 التنسيق

الملف مكتوب بتنسيق **YAML**، ويمكن تحديد الإعدادات بطريقتين:

* **هرمية (Hierarchical):**

```yaml
pipeline:
  batch:
    size: 125
    delay: 50
```

* **مفاتيح مسطحة (Flat Keys):**

```yaml
pipeline.batch.size: 125
pipeline.batch.delay: 50
```

***

### 🔹 الأولوية (Override)

أي إعداد يتم تمريره عبر **سطر الأوامر (Command-line flags)** يتجاوز الإعداد المقابل له داخل `logstash.yml`.

***

### 🔹 متغيرات البيئة (Environment Variables)

يدعم الملف استخدام **bash-style interpolation**:

```yaml
pipeline:
  batch:
    size: ${BATCH_SIZE}
    delay: ${BATCH_DELAY:50}
node:
  name: "node_${LS_NODE_NAME}"
path:
  queue: "/tmp/${QUEUE_DIR:queue}"
```

📘 الصيغة: `${VAR_NAME:default_value}`

> تعني أن القيمة الافتراضية ستُستخدم إذا لم يكن متغير البيئة موجودًا.

***

## ⚙️ **الإعدادات الرئيسية في logstash.yml**

### 🔸 **Node & Path Settings**

| الإعداد                         | الوصف                                                        | القيمة الافتراضية     |
| ------------------------------- | ------------------------------------------------------------ | --------------------- |
| [`node.name`](http://node.name) | اسم وصفي لعقدة Logstash.                                     | اسم المضيف (hostname) |
| [`path.data`](http://path.data) | مسار البيانات التي يستخدمها Logstash والـ plugins الخاصة به. | `LOGSTASH_HOME/data`  |
| `path.config`                   | مسار ملفات إعداد الـ main pipeline.                          | خاص بالمنصة           |
| `path.logs`                     | المكان الذي تُكتب فيه السجلات.                               | `LOGSTASH_HOME/logs`  |
| `path.plugins`                  | مكان وجود الـ custom plugins.                                | خاص بالمنصة           |

***

### 🔸 **Pipeline Settings**

| الإعداد                             | الوصف                                                                                 | القيمة الافتراضية |
| ----------------------------------- | ------------------------------------------------------------------------------------- | ----------------- |
| [`pipeline.id`](http://pipeline.id) | معرف الـ pipeline الرئيسي.                                                            | `main`            |
| `pipeline.workers`                  | عدد خيوط العمال التي تنفذ مراحل الـ filter والـ output بالتوازي.                      | عدد أنوية CPU     |
| `pipeline.batch.size`               | الحد الأقصى من الأحداث التي يجمعها كل عامل قبل المعالجة.                              | 125               |
| `pipeline.batch.delay`              | الوقت بالمللي ثانية قبل إرسال batch غير مكتمل.                                        | 50                |
| `pipeline.ordered`                  | ترتيب الأحداث داخل الـ pipeline (`auto`, `true`, `false`).                            | `auto`            |
| `pipeline.unsafe_shutdown`          | يجبر Logstash على الإغلاق حتى لو كان هناك بيانات قيد التنفيذ (قد يؤدي لفقد البيانات). | `false`           |
| `pipeline.ecs_compatibility`        | التوافق مع Elastic Common Schema (`disabled`, `v1`, `v8`).                            | `disabled`        |
| `pipeline.separate_logs`            | فصل سجلات كل pipeline في ملف منفصل لتسهيل التتبع.                                     | `false`           |

***

### 🔸 **Persistent Queue Settings**

تُستخدم لتخزين الأحداث على القرص بدلاً من الذاكرة لزيادة الموثوقية.

| الإعداد                   | الوصف                                                        | القيمة الافتراضية                           |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| `queue.type`              | نوع قائمة الانتظار الداخلية (`memory` أو `persisted`).       | `memory`                                    |
| `path.queue`              | مسار تخزين بيانات الـ queue عند تمكين persistent queue.      | [`path.data/queue`](http://path.data/queue) |
| `queue.max_bytes`         | السعة القصوى للـ queue بالبايت.                              | `1024mb (1g)`                               |
| `queue.checkpoint.acks`   | عدد الأحداث المؤكدة قبل إنشاء نقطة تفتيش.                    | 1024                                        |
| `queue.checkpoint.writes` | عدد الأحداث المكتوبة قبل نقطة التفتيش.                       | 1024                                        |
| `queue.drain`             | عند التفعيل، ينتظر Logstash حتى تُفرغ الـ queue قبل الإغلاق. | `false`                                     |

***

### 🔸 **Dead Letter Queue (DLQ) Settings**

تُستخدم لتخزين الأحداث التي فشلت في الوصول إلى المخرجات لتجنب فقدانها.

| الإعداد                       | الوصف                    | القيمة الافتراضية                                                   |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------- |
| `dead_letter_queue.enable`    | تفعيل قائمة DLQ.         | `false`                                                             |
| `dead_letter_queue.max_bytes` | الحد الأقصى لحجم كل DLQ. | `1024mb`                                                            |
| `path.dead_letter_queue`      | مسار تخزين بيانات DLQ.   | [`path.data/dead_letter_queue`](http://path.data/dead_letter_queue) |

***

### 🔸 **HTTP API Settings**

تمكّنك من مراقبة Logstash والتحكم به عبر HTTP.

| الإعداد                                 | الوصف                                | القيمة الافتراضية |
| --------------------------------------- | ------------------------------------ | ----------------- |
| `api.enabled`                           | تفعيل HTTP API.                      | `true`            |
| [`api.http.host`](http://api.http.host) | العنوان الذي ترتبط به واجهة الـ API. | `"127.0.0.1"`     |
| `api.http.port`                         | المنفذ الذي تعمل عليه الـ API.       | `9600–9700`       |
| `api.ssl.enabled`                       | لتفعيل SSL في الـ API.               | `false`           |
| `api.auth.type`                         | نوع المصادقة (مثل `basic`).          | `none`            |

***

### 🔸 **Logging Settings**

| الإعداد      | الوصف                                                               | القيمة الافتراضية    |
| ------------ | ------------------------------------------------------------------- | -------------------- |
| `log.level`  | مستوى السجلات (`fatal`, `error`, `warn`, `info`, `debug`, `trace`). | `info`               |
| `log.format` | تنسيق السجلات (`plain` أو `json`).                                  | `plain`              |
| `path.logs`  | مسار ملفات السجلات.                                                 | `LOGSTASH_HOME/logs` |

***

## 💡 **ملاحظات إضافية**

* يوصى بتفعيل `config.reload.automatic: true` أثناء التطوير لتحديث الإعدادات تلقائيًا.

* تجنب تفعيل `pipeline.unsafe_shutdown` في بيئات الإنتاج لتفادي فقد البيانات.

* استخدم `log.level: debug` أثناء الاختبار لتصحيح الأخطاء.

* تفعيل `pipeline.separate_logs: true` يساعد في تتبع مشكلات الـ pipelines المتعددة.

***

## 📚 **المرجع الرسمي**

🔗 [Elastic Docs – Logstash Configuration (logstash.yml)](https://www.elastic.co/guide/en/logstash/current/logstash-settings-file.html)

