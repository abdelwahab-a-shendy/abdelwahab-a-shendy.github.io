
# **Data Normalization – Elastic Common Schema (ECS)**

## 🎯 Learning Objectives

After this lesson, you will be able to:

1. Understand the **Elastic Common Schema (ECS)** and its importance in data normalization.

2. Learn the basics of event logging and different data structures.

3. Identify challenges when aggregating data from different sources.

4. Understand how to **normalize data using ECS** to simplify analysis and search.

***

# **Normalizing Data**

## 1️⃣ Challenges of Aggregating Disparate Data Sources

| Challenge                          | Description & Impact                                                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Data Diversity                     | Data comes in different forms and sizes (e.g., from multiple sensors), where each source has its own format and fields.                  |
| Ingestion Bottleneck               | Ingesting data from multiple sources (e.g., logs, performance metrics, network data) can create difficulties in processing and analysis. |
| Difficulty in Analysis & Archiving | Unnormalized data may require multiple tools and systems for analysis and visualization, complicating monitoring and alerting in Kibana. |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760808230477/0d3732a6-2cb6-4f0a-ac91-edb4e8579603.png" align="center" fullwidth="false" />

***

## 2️⃣ Concept of Data Normalization

* **Definition:** The process of accepting data from multiple and diverse schemas and transforming it into a unified and consistent schema.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760808242811/6a3c9978-8d62-4c1c-a76f-352a94b4dd4e.png" align="center" fullwidth="false" />

* **Example of the problem before normalization:**

| Source 1     | Source 2    | Source 3    |
| ------------ | ----------- | ----------- |
| Host Address | Client IP   | Source IP   |
| Host Port    | Client Port | Source Port |

* **Solution with ECS Normalization:**\
  Similar fields are merged into a single unified field regardless of the source, e.g.:

```bash
source.ip: 172.16.100.54 destination.port: 80
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760807115029/285c8eca-2866-4b64-a1db-79635643b222.png" align="center" fullwidth="false" />

> * **Goal of Normalization:** Facilitate searching and analysis using unified fields without needing to know all naming differences across different sources.

***

## 3️⃣ Elastic Common Schema (ECS)

| Point         | Description                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Definition    | An open-source specification aimed at supporting uniform data modeling.                                                               |
| Goal          | To define a common set of fields when storing any type of event data in Elasticsearch.                                                |
| Main Function | Enable Elastic Stack users to normalize event data to simplify analysis, visualization, and event correlation across any data source. |

* **Searching without ECS:**\
  You must search for all possible field names, e.g.:

```bash
host.address:172.16.100.54 OR source.ip:172.16.100.54 OR client_ip:172.16.100.54
```

* **Searching with ECS:**\
  Search using a single unified field only:

```bash
source.ip:172.16.100.54
```

***

## 4️⃣ Benefits of Normalization with ECS

1. **Simplified field names:** Fewer rules and exceptions for field names.

2. **Faster and more efficient search:** Search similar data across all sources using a single term.

3. **Data correlation:** Easily correlate data between different sources (e.g., server logs and network logs).

4. **Content reuse:** Reuse analysis content (dashboards, detection rules) across multiple data sources without modification.

5. **Future integration:** Integrate future Elastic or partner analysis tools without major changes.

6. **Unified inspection:** Support interactive search, graphing, and automated analysis.

***

## 5️⃣ How to Normalize Data Using ECS

**Process Flow:**

```bash
Disparate Data Sources → Agent/Beats → Logstash (Normalization) → Elasticsearch → Kibana (Visualization & Analysis)
```

| Component                                      | Description                                                                                                     |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Integrations (Elastic ready-made integrations) | Hundreds of integrations that normalize data automatically before sending it.                                   |
| Beats                                          | Lightweight clients (agents) that send normalized data to Elasticsearch.                                        |
| Logstash                                       | Server-side data processing tool that ingests and transforms disparate data before sending it to Elasticsearch. |
| Elastic Agent                                  | Unified agent that ingests and sends normalized data to Elasticsearch.                                          |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760807115777/26b19461-c84e-4e28-94d0-8e6306c635e3.png" align="center" fullwidth="false" />

***

## 6️⃣ Practical Examples

* **Before Normalization:**

```bash
source.ip: 172.16.100.54
client_ip: 172.16.100.54
host_ip: 172.16.100.54
source_address: 172.16.100.54
```

* **After Normalization with ECS:**

```bash
source.ip: 172.16.100.54
```

***

***

***

# **تطبيع البيانات – Elastic Common Schema (ECS)**

## 🎯 الأهداف التعليمية

بعد هذا الدرس، ستتمكن من:

1. فهم **Elastic Common Schema (ECS)** وأهميته في تطبيع البيانات.

2. معرفة أساسيات تسجيل الأحداث وهياكل البيانات المختلفة.

3. التعرف على مشاكل تجميع البيانات من مصادر مختلفة.

4. فهم كيفية **تطبيع البيانات باستخدام ECS** لتسهيل التحليل والبحث.

***

# **Normalizing Data**

## 1️⃣ تحديات تجميع مصادر البيانات المُتباينة (Aggregating Disparate Data Sources)

| التحدي                                          | الوصف والتأثير                                                                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| تباين الهياكل (Data Diversity)                  | البيانات تأتي بأشكال وأحجام مختلفة (مثل أجهزة الاستشعار المتعددة)، حيث يكون لكل مصدر تنسيقه وحقوله الخاصة.             |
| عنق الزجاجة في الاستيعاب (Ingestion Bottleneck) | استيعاب البيانات من مصادر متعددة (مثل السجلات، مقاييس الأداء، بيانات الشبكة) يمكن أن يخلق صعوبات في المعالجة والتحليل. |
| صعوبة التحليل والأرشفة                          | قد تتطلب البيانات غير المُسواة أنظمة وأدوات متعددة لتحليلها وعرضها، مما يعقد عملية المراقبة والتنبيه عبر Kibana.       |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760808230477/0d3732a6-2cb6-4f0a-ac91-edb4e8579603.png" align="center" fullwidth="false" />

***

## 2️⃣ مفهوم تسوية البيانات (Data Normalization)

* **التعريف:** عملية قبول البيانات من مخططات (Schemas) متعددة ومختلفة وتحويلها إلى مخطط موحد ومتسق (Consistent Schema).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760808242811/6a3c9978-8d62-4c1c-a76f-352a94b4dd4e.png" align="center" fullwidth="false" />

* **مثال على المشكلة قبل التسوية:**

| المصدر الأول | المصدر الثاني | المصدر الثالث |
| ------------ | ------------- | ------------- |
| Host Address | Client IP     | Source IP     |
| Host Port    | Client Port   | Source Port   |

* **الحل مع التسوية باستخدام ECS:**\
  يتم دمج كل الحقول المتشابهة في حقل واحد موحد بغض النظر عن المصدر، مثل:

```sh
source.ip: 172.16.100.54 destination.port: 80
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760807115029/285c8eca-2866-4b64-a1db-79635643b222.png" align="center" fullwidth="false" />

> * **هدف Normalization :** تسهيل البحث والتحليل عبر الحقول الموحدة دون الحاجة لمعرفة جميع الاختلافات في تسمية الحقول من المصادر المختلفة.

***

## 3️⃣ Elastic Common Schema (ECS)

| النقطة           | الوصف                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| التعريف          | مواصفة مفتوحة المصدر (Open Source Specification) تهدف إلى دعم نمذجة بيانات موحدة (Uniform Data Modeling).                          |
| الهدف            | تحديد مجموعة مشتركة من الحقول (Fields) عند تخزين أي نوع من بيانات الأحداث في Elasticsearch.                                        |
| الوظيفة الرئيسية | تمكين مستخدمي Elastic Stack من تسوية (Normalize) بيانات الأحداث لتسهيل التحليل والتصور وربط الأحداث (Correlate) من أي مصدر بيانات. |

* **البحث بدون ECS:**\
  يجب البحث عن جميع أسماء الحقول المحتملة، مثل:

```sh
host.address:172.16.100.54 OR source.ip:172.16.100.54 OR client_ip:172.16.100.54
```

* **البحث مع ECS:**\
  يتم البحث باستخدام حقل واحد موحد فقط:

```sh
source.ip:172.16.100.54
```

***

## 4️⃣ فوائد التسوية باستخدام ECS (Normalization Benefits)

1. **تبسيط أسماء الحقول:** أسماء حقول مبسطة مع عدد قليل من القواعد والاستثناءات.

2. **زيادة سرعة وكفاءة البحث:** البحث عن بيانات مشابهة عبر جميع المصادر باستخدام مصطلح واحد فقط.

3. **ربط البيانات (Correlation):** القدرة على ربط البيانات بسهولة بين مصادر مختلفة (مثل سجلات الخادم وسجلات الشبكة).

4. **إعادة استخدام المحتوى:** إمكانية إعادة استخدام محتوى التحليل (مثل لوحات المعلومات وقواعد الاكتشاف) عبر مصادر بيانات متعددة دون تعديل.

5. **التكامل المستقبلي:** دمج أدوات التحليل المستقبلية المقدمة من Elastic أو الشركاء دون الحاجة لتعديلات كبيرة.

6. **تسهيل الفحص الموحد:** دعم البحث التفاعلي، التصوير البياني، والتحليل الآلي.

***

## 5️⃣ كيفية تسوية البيانات باستخدام ECS

**تدفق العملية:**

```sh
Disparate Data Sources → Agent/Beats → Logstash (Normalization) → Elasticsearch → Kibana (Visualization & Analysis)
```

| المكون                                      | الوصف                                                                                                                         |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Integrations (التكاملات الجاهزة من Elastic) | المئات من التكاملات التي تقوم بتسوية البيانات تلقائيًا قبل إرسالها.                                                           |
| Beats                                       | عملاء (Agents) خفيفة الوزن لإرسال البيانات المسواة إلى Elasticsearch.                                                         |
| Logstash                                    | أداة معالجة البيانات من جانب الخادم (Server-side processing)، تستوعب البيانات المتباينة وتحولها قبل إرسالها لـ Elasticsearch. |
| Elastic Agent                               | وكيل موحد يقوم باستيعاب البيانات وإرسالها مسواة إلى Elasticsearch.                                                            |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760807115777/26b19461-c84e-4e28-94d0-8e6306c635e3.png" align="center" fullwidth="false" />

***

## 6️⃣ أمثلة عملية

* **قبل Normalization:**

```sh
source.ip: 172.16.100.54
client_ip: 172.16.100.54
host_ip: 172.16.100.54
source_address: 172.16.100.54
```

* **بعد Normalization باستخدام ECS:**

```sh
source.ip: 172.16.100.54
```

***

