---
id: "68f4379dc1e0dc4b966154cf"
title: "1.Logstash Architecture and Workflow"
description: "How Logstash Works : Which is considered the essential part of understanding the Logstash Pipeline before reaching the Logstash Configuration stage. "
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/logstash/1logstash-architecture-and-workflow"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-19T00:58:05.960Z"
updatedAt: "2026-01-25T15:35:47.106Z"
---

# 🔧 **How Logstash Works**

The **processing pipeline** in Logstash consists of three main stages:

> **Inputs → Filters → Outputs**
>
> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760836153611/6937a133-aa93-4d11-a59c-8c121aecdb42.png" align="center" fullwidth="false" />

## 🟢 1. Inputs

This is the stage where data is collected into Logstash from various sources.\
Each type of input is responsible for receiving data in a specific way.

**Examples:**

* **file:** Reads data from a file, similar to the `tail -f` command in UNIX systems.

* **syslog:** Listens on port 514 to receive Syslog messages according to the RFC3164 standard.

* **redis:** Reads from a Redis server, often used as a buffer in centralized Logstash environments.

* **beats:** Receives events from Beats tools (like Filebeat and Winlogbeat).

📘 *From the official documentation:*

> “Inputs generate events, filters modify them, and outputs ship them elsewhere.”

***

## 🧰 2. Filters

This is the middle layer used to process or transform data after it’s received and before it’s sent out.\
You can combine multiple filters with specific conditions (Conditionals).

**Main filters:**

* **grok:** Parses unstructured text and converts it into structured data.

* **mutate:** Modifies fields (rename, remove, update, etc.).

* **drop:** Deletes an event entirely (for example, debug events).

* **clone:** Creates a copy of the event with modified fields.

* **geoip:** Adds geolocation data for IP addresses (later visualized beautifully in Kibana).

📘 *From Elastic documentation:*

> “Grok is the best way in Logstash to parse unstructured log data into something structured and queryable.”

***

## 🟣 3. Outputs

This is the final stage of the pipeline, where events are sent to their final destinations after processing.\
A single event can go through multiple outputs.

**Common outputs:**

* **elasticsearch:** Sends data to Elasticsearch.

* **file:** Writes events to a file on disk.

* **graphite / statsd:** Sends metrics to monitoring systems like Graphite or StatsD.

📘 *From the official documentation:*

> “An event can pass through multiple outputs, but once all outputs complete, the event has finished its execution.”

***

## 🧩 4. Codecs

**Codecs** are special filters used within inputs or outputs to control data encoding or decoding as it enters or exits the pipeline.

**Examples:**

* **json:** Encodes or decodes data in JSON format.

* **multiline:** Merges multiple lines into a single event (useful for stack traces or Java errors).

***

### ⚙️ **Execution Model**

Each **input** runs in its own **thread** independently.\
Inputs write events into a **central queue** — either in memory (by default) or on disk.

Then:

* Each **worker thread** takes a batch of events from the queue\
  and passes them through the filters and then to the outputs.

* You can configure the **number of workers** and **batch size** in the settings.

📘 *From the official documentation:*

> “Each input stage runs in its own thread. Inputs write events to a central queue that is either in memory or on disk.”

***

***

***

***

## 🔧 **آلية عمل Logstash (How Logstash Works)**

يتكوّن **خط المعالجة (Pipeline)** في Logstash من ثلاث مراحل رئيسية:

> **Inputs → Filters → Outputs**
>
> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760836153611/6937a133-aa93-4d11-a59c-8c121aecdb42.png" align="center" fullwidth="false" />

### 🟢 1. المدخلات (Inputs)

هي المرحلة التي يتم فيها جلب البيانات إلى Logstash من مصادر مختلفة.\
كل نوع Input مسؤول عن استقبال البيانات بطريقة معينة.

**أمثلة:**

* ال **file:** يقرأ البيانات من ملف مثل الأمر `tail -f` في أنظمة UNIX.

* ال **syslog:** يستمع على المنفذ 514 لاستقبال رسائل Syslog وفقًا لمعيار RFC3164.

* ال **redis:** يقرأ من خادم Redis، ويُستخدم عادة كوسيط في بيئات Logstash المركزية.

* ال **beats:** يستقبل الأحداث من أدوات Beats (مثل Filebeat وWinlogbeat).

📘 *من التوثيق الرسمي:*

> “Inputs generate events, filters modify them, and outputs ship them elsewhere.”

***

### 🧰 2. المرشحات (Filters)

هي الطبقة الوسطى التي تُستخدم لمعالجة أو تحويل البيانات بعد استقبالها وقبل إرسالها.\
يمكنك دمج أكثر من فلتر مع شروط محددة (Conditionals).

**أهم الفلاتر:**

* ال **grok:** لتحليل النصوص غير المنظمة وتحويلها إلى بيانات منظمة (Structured).

* ال **mutate:** لتعديل الحقول (إعادة تسمية، حذف، تعديل...).

* ال **drop:** لحذف حدث بالكامل (مثل الأحداث الخاصة بالـ Debug).

* ال **clone:** لعمل نسخة من الحدث مع تعديل الحقول.

* ال **geoip:** لإضافة الموقع الجغرافي لعناوين IP (تُعرض لاحقًا على Kibana بشكل رائع).

📘 *من وثائق Elastic:*

> “Grok is the best way in Logstash to parse unstructured log data into something structured and queryable.”

***

### 🟣 3. المخرجات (Outputs)

هي المرحلة النهائية في الـ pipeline، حيث يتم إرسال الأحداث بعد معالجتها إلى وجهاتها النهائية.\
يمكن لحدث واحد أن يمر بعدة Outputs.

**أشهر المخرجات:**

* ال **elasticsearch:** لإرسال البيانات إلى Elasticsearch.

* ال **file:** لكتابة الأحداث في ملف على القرص.

* ال **graphite / statsd:** لإرسال المقاييس (metrics) إلى أنظمة المراقبة مثل Graphite وStatsD.

📘 *من التوثيق الرسمي:*

> “An event can pass through multiple outputs, but once all outputs complete, the event has finished its execution.”

***

### 🧩 4. الترميزات (Codecs)

الـ **Codecs** هي فلاتر خاصة تُستخدم ضمن الـ Inputs أو Outputs للتحكم في ترميز البيانات أثناء الدخول أو الخروج من الـ pipeline.

**أمثلة:**

* ال **json:** لترميز أو فك ترميز البيانات بصيغة JSON.

* ال **multiline:** لدمج أسطر متعددة في حدث واحد (مثل stack traces أو الأخطاء في Java).

***

### ⚙️ **نموذج التنفيذ (Execution Model)**

لكل **Input** خيط (Thread) خاص به يعمل بشكل مستقل.\
تقوم المدخلات بكتابة الأحداث في **قائمة انتظار مركزية (Queue)** — إما في الذاكرة (افتراضيًا) أو على القرص.

بعد ذلك:

* يقوم كل **عامل (Worker Thread)** بأخذ مجموعة من الأحداث (Batch) من القائمة،\
  ويمرّرها عبر الفلاتر ثم إلى المخرجات.

* يمكن ضبط **عدد العمال** وحجم الدفعات (Batch Size) في الإعدادات.

📘 *من التوثيق الرسمي:*

> “Each input stage runs in its own thread. Inputs write events to a central queue that is either in memory or on disk.”

