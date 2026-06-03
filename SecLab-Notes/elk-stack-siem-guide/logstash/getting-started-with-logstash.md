---
id: "68f452a7bd630241efc687e2"
title: "Getting started with Logstash"
description: "This part explains how to install Logstash, verify that it is working properly, and then create your first simple pipeline to process the data (like Apache logs) and send it to Elasticsearch."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/logstash/getting-started-with-logstash"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-19T02:53:27.635Z"
updatedAt: "2026-01-25T15:35:47.100Z"
---

### 🧩 Components of This Section:

* ✅ **Java (JVM) Version**

* ⚙️ **Installing Logstash**

* 📦 **Stashing Your First Event**

* 🔍 **Parsing Logs with Logstash**

* 🔗 **Stitching Multiple Inputs and Outputs**

***

## ☕️ 1. Java (JVM) Requirements

🔹 **Logstash depends on Java**, so you must ensure that Java is installed before running it.

### Supported Versions:

* Java 17 ✅

* Java 21 (default version in Logstash 8.x) ✅

> It is recommended to use the official Oracle release or open-source distributions such as OpenJDK.

📘 Check the **Elastic Support Matrix** to confirm compatibility between your Logstash and Java versions.

***

## 🧱 2. Bundled JDK

Starting from recent versions, **Logstash comes with a bundled JDK** (Adoptium Eclipse Temurin 21 – LTS).\
That means you don’t have to install Java manually unless you want to use a different version.

* If you prefer to use your own Java version, set the variable:\
  `LS_JAVA_HOME`

* Logstash will ignore the bundled JDK and use the path specified in `LS_JAVA_HOME`.

💡 Even after upgrading, if `LS_JAVA_HOME` is set, Logstash will continue using the same JDK you specified.

***

## 🧪 3. Verifying the Java Version

Run the following command in the terminal:

```bash
java -version
```

Example output:

```bash
openjdk version "17.0.12" 2024-07-16
OpenJDK Runtime Environment Temurin-17.0.12+7 (build 17.0.12+7)
OpenJDK 64-Bit Server VM Temurin-17.0.12+7 (build 17.0.12+7, mixed mode)
```

***

## ⚙️ 4. Setting LS\_JAVA\_HOME Before Installation

On some Linux distributions, you must define the `LS_JAVA_HOME` variable **before installing Logstash**, especially if Java was installed manually from a tarball.

📌 **Reason:**\
Logstash uses Java during installation to determine the appropriate startup method (systemd or init scripts).\
If it doesn’t find `LS_JAVA_HOME`, installation may fail or Logstash might not start properly.

***

## 🔄 5. Updating Java Settings After Upgrading from Logstash 7.11.x or Earlier

Starting with version 8, Logstash uses **JDK 21** by default, so you need to modify certain files after upgrading:

***

### 📄 File: `config/jvm.options`

Remove the old CMS GC settings:

```bash
## GC configuration
-XX:+UseConcMarkSweepGC
-XX:CMSInitiatingOccupancyFraction=75
-XX:+UseCMSInitiatingOccupancyOnly
```

> These settings are no longer supported in JDK 21.

***

### 📄 File: `config/`[`log4j2.properties`](http://log4j2.properties)

Replace the old properties with the following updated ones:

```bash
appender.rolling.avoid_pipelined_filter.type = PipelineRoutingFilter
appender.json_rolling.avoid_pipelined_filter.type = PipelineRoutingFilter

appender.routing.type = PipelineRouting
appender.routing.name = pipeline_routing_appender
appender.routing.pipeline.type = RollingFile
appender.routing.pipeline.name = appender-${ctx:pipeline.id}
appender.routing.pipeline.fileName = ${sys:ls.logs}/pipeline_${ctx:pipeline.id}.log
appender.routing.pipeline.filePattern = ${sys:ls.logs}/pipeline_${ctx:pipeline.id}.%i.log.gz
appender.routing.pipeline.layout.type = PatternLayout
appender.routing.pipeline.layout.pattern = [%d{ISO8601}][%-5p][%-25c] %m%n
appender.routing.pipeline.policy.type = SizeBasedTriggeringPolicy
appender.routing.pipeline.policy.size = 100MB
appender.routing.pipeline.strategy.type = DefaultRolloverStrategy
appender.routing.pipeline.strategy.max = 30
```

***

***

***

***

### 🧩 مكونات هذا الجزء:

* ✅ **Java (JVM) version**

* ⚙️ **Installing Logstash**

* 📦 **Stashing Your First Event**

* 🔍 **Parsing Logs with Logstash**

* 🔗 **Stitching Multiple Inputs and Outputs**

***

## ☕️ 1. متطلبات Java (JVM)

🔹 **Logstash يعتمد على Java**، لذلك لازم تتأكد إن Java مثبتة قبل التشغيل.

### الإصدارات المدعومة:

* Java 17 ✅

* Java 21 (الإصدار الافتراضي في Logstash 8.x) ✅

> يُفضل استخدام النسخة الرسمية من Oracle أو النسخ مفتوحة المصدر مثل OpenJDK.

📘 راجع Elastic Support Matrix للتأكد من توافق الإصدار مع Logstash لديك.

***

## 🧱 2. الـ JDK المضمّن (Bundled JDK)

منذ الإصدارات الحديثة، **Logstash بيجي جاهز مع JDK مضمّن** (Adoptium Eclipse Temurin 21 – LTS).\
يعني مش لازم تثبّت Java بنفسك إلا لو عايز تستخدم إصدار مختلف.

* إذا أردت استخدام إصدارك الخاص من Java، استخدم المتغير:

  `LS_JAVA_HOME`

* Logstash سيتجاهل الـ JDK المضمّن ويستخدم المسار اللي تحدده في `LS_JAVA_HOME`.

💡 حتى بعد التحديث، لو LS\_JAVA\_HOME محدد، Logstash هيكمل يستخدم نفس الـ JDK اللي اخترته.

***

## 🧪 3. التحقق من إصدار Java

اكتب الأمر التالي في الـ Terminal:

```sh
java -version
```

مثال على النتيجة:

```bash
openjdk version "17.0.12" 2024-07-16
OpenJDK Runtime Environment Temurin-17.0.12+7 (build 17.0.12+7)
OpenJDK 64-Bit Server VM Temurin-17.0.12+7 (build 17.0.12+7, mixed mode)
```

***

## ⚙️ 4. إعداد LS\_JAVA\_HOME قبل التثبيت

على بعض توزيعات Linux، يجب تحديد المتغير `LS_JAVA_HOME` قبل تثبيت Logstash، خصوصًا إذا تم تثبيت Java من tarball يدويًا.

📌 السبب:\
Logstash يستخدم Java أثناء التثبيت لتحديد طريقة التشغيل المناسبة (systemd أو init scripts).\
فلو لم يجد `LS_JAVA_HOME` قد يفشل التثبيت أو لا يبدأ Logstash بشكل صحيح.

***

## 🔄 5. تحديث إعدادات Java بعد الترقية من Logstash 7.11.x أو أقدم

من الإصدار 8، Logstash يستخدم **JDK 21** افتراضيًا، لذلك تحتاج إلى تعديل بعض الملفات عند الترقية:

***

### 📄 ملف `config/jvm.options`

احذف إعدادات الـ CMS القديمة:

```sh
## GC configuration
-XX:+UseConcMarkSweepGC
-XX:CMSInitiatingOccupancyFraction=75
-XX:+UseCMSInitiatingOccupancyOnly
```

> هذه الإعدادات لم تعد مدعومة في JDK 21.

***

### 📄 ملف `config/`[`log4j2.properties`](http://log4j2.properties)

استبدل الخصائص القديمة بالخصائص الجديدة التالية:

```sh
appender.rolling.avoid_pipelined_filter.type = PipelineRoutingFilter
appender.json_rolling.avoid_pipelined_filter.type = PipelineRoutingFilter

appender.routing.type = PipelineRouting
appender.routing.name = pipeline_routing_appender
appender.routing.pipeline.type = RollingFile
appender.routing.pipeline.name = appender-${ctx:pipeline.id}
appender.routing.pipeline.fileName = ${sys:ls.logs}/pipeline_${ctx:pipeline.id}.log
appender.routing.pipeline.filePattern = ${sys:ls.logs}/pipeline_${ctx:pipeline.id}.%i.log.gz
appender.routing.pipeline.layout.type = PatternLayout
appender.routing.pipeline.layout.pattern = [%d{ISO8601}][%-5p][%-25c] %m%n
appender.routing.pipeline.policy.type = SizeBasedTriggeringPolicy
appender.routing.pipeline.policy.size = 100MB
appender.routing.pipeline.strategy.type = DefaultRolloverStrategy
appender.routing.pipeline.strategy.max = 30
```

