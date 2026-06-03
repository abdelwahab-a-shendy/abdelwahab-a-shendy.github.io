---
id: "68f4470e2b874bd32e919fdd"
title: "1.1.ECS in Logstash"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/logstash/1logstash-architecture-and-workflow/11ecs-in-logstash"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-19T02:03:58.599Z"
updatedAt: "2026-01-25T15:35:47.096Z"
---

## 📘 **ECS in Logstash**

### 🔹 1️⃣ What is ECS?

**ECS (Elastic Common Schema)** is a **standardized field naming convention**.

It helps unify how data (such as logs and metrics) is stored in Elasticsearch.

**Purpose:**\
To make it easier to analyze data, correlate events, and visualize information in Kibana.

***

### 🔹 2️⃣ What Does ECS Compatibility Mean?

Some **Logstash plugins** support an **ECS compatibility mode**.

When enabled, the plugin **produces or processes events** in a way that aligns with the ECS standard.

Each plugin includes an option called:

```bash
ecs_compatibility
```

which defines the mode it runs in (`v8` or `disabled`).

***

### 🔹 3️⃣ General Rule for Enabling ECS

In **Logstash 8**, all plugins run in **ECS v8 mode by default**.

However, you can disable ECS compatibility at different levels:

* For a **specific plugin**

* For an **entire pipeline**

* For the **whole system**

***

### 🔹 4️⃣ Setting ECS at the Plugin Level

For example, if you want to **disable ECS** only for the **GeoIP filter** 👇

```bash
filter {
  geoip {
    source => "[host][ip]"
    ecs_compatibility => disabled
  }
}
```

📘 Another example: **Enable ECS** for a **UDP input** with the **CEF codec** 👇

```bash
input {
  udp {
    port => 1234
    ecs_compatibility => v8
    codec => cef {
      ecs_compatibility => v8
    }
  }
}
```

***

### 🔹 5️⃣ Setting ECS at the Pipeline Level

You can define the ECS mode in the `pipelines.yml` file:

```bash
- pipeline.id: my-legacy-pipeline
  path.config: "/etc/path/to/legacy-pipeline.config"
  pipeline.ecs_compatibility: disabled

- pipeline.id: my-ecs-pipeline
  path.config: "/etc/path/to/ecs-pipeline.config"
  pipeline.ecs_compatibility: v8
```

***

### 🔹 6️⃣ Setting ECS at the System Level

To configure the **default ECS mode** for all pipelines, edit the `logstash.yml` file 👇

```bash
pipeline.ecs_compatibility: disabled
```

***

### 🧭 Quick Summary

| **Level**             | **Configuration Location** | **Example**                            |
| --------------------- | -------------------------- | -------------------------------------- |
| **Specific Plugin**   | Inside the `.conf` file    | `ecs_compatibility => v8`              |
| **Specific Pipeline** | `pipelines.yml`            | `pipeline.ecs_compatibility: disabled` |
| **Entire System**     | `logstash.yml`             | `pipeline.ecs_compatibility: v8`       |

***

***

***

***

> الجزء ده **(ECS in Logstash)** فكرته الأساسية إن Logstash بقى يدعم **ECS (Elastic Common Schema)** علشان يوحّد شكل البيانات داخل Elasticsearch.

***

## 📘 **ECS in Logstash**

### 🔹 **1️⃣ ما هو ECS؟**

* ال **ECS (Elastic Common Schema)** هو **مخطط موحّد للحقول** (Standardized field naming).

* بيساعد في **توحيد شكل البيانات** اللي بتتخزن في Elasticsearch (زي logs و metrics).

* الهدف منه: تسهيل **تحليل البيانات**، و **الربط بين الأحداث**، و **التمثيل المرئي في Kibana**.

***

### 🔹 **2️⃣ ما معنى ECS Compatibility؟**

* بعض **الـ plugins** في Logstash بتدعم وضع **ECS compatibility**.

* لما تفعّله، الـ plugin بينتج أو يتعامل مع الأحداث بطريقة متوافقة مع ECS.

* كل plugin عنده خيار اسمه:

```sh
ecs_compatibility
```

* لتحديد الوضع اللي يشتغل عليه (v8 أو disabled).

***

### 🔹 **3️⃣ القاعدة العامة لتفعيل ECS**

* في **Logstash 8**، كل الـ plugins بتشتغل بوضع **ECS v8** بشكل **افتراضي**.

* لكن تقدر **تعطل الوضع ده** على مستوى:

  * **Plugin معين**

  * **Pipeline كامل**

  * **النظام كله**

***

### 🔹 **4️⃣ إعداد ECS على مستوى Plugin محدد**

مثلاً لو عندك فلتر GeoIP وتريد تعطيل ECS فيه فقط 👇

```ruby
filter {
  geoip {
    source => "[host][ip]"
    ecs_compatibility => disabled
  }
}
```

📘 مثال آخر: تفعيل ECS لإدخال UDP مع Codec CEF 👇

```ruby
input {
  udp {
    port => 1234
    ecs_compatibility => v8
    codec => cef {
      ecs_compatibility => v8
    }
  }
}
```

***

### 🔹 **5️⃣ إعداد ECS على مستوى Pipeline**

تقدر تحدد وضع ECS في ملف `pipelines.yml`:

```yaml
- pipeline.id: my-legacy-pipeline
  path.config: "/etc/path/to/legacy-pipeline.config"
  pipeline.ecs_compatibility: disabled

- pipeline.id: my-ecs-pipeline
  path.config: "/etc/path/to/ecs-pipeline.config"
  pipeline.ecs_compatibility: v8
```

***

### 🔹 **6️⃣ إعداد ECS على مستوى النظام بالكامل**

لو عايز تضبط الوضع الافتراضي لكل الـ pipelines في Logstash:\
في ملف `logstash.yml` 👇

```yaml
pipeline.ecs_compatibility: disabled
```

***

### 🧭 **ملخص سريع**

| المستوى       | مكان الإعداد  | مثال                                   |
| ------------- | ------------- | -------------------------------------- |
| Plugin محدد   | داخل config   | `ecs_compatibility => v8`              |
| Pipeline محدد | pipelines.yml | `pipeline.ecs_compatibility: disabled` |
| النظام كله    | logstash.yml  | `pipeline.ecs_compatibility: v8`       |

