
# 🧠 **Chapter 2 – Part 2: Logs and Data Structures**

## 🎯 Learning Objectives

After studying this part, you will learn:

* How data is stored inside **Elasticsearch**.

* The main data components: **Indices**, **Documents**, and **Fields**.

* The role of **Data Types** in search and analysis operations.

* The **types of fields in ECS (Core – Extended – Custom)** and their role in data unification and performance optimization.

***

## 🧩 **First: Data Structure in Elasticsearch**

### 🔹 1. Index

The **Index** is the fundamental unit of data storage in Elasticsearch and is similar to a **database** in traditional systems.

* Each **Index** contains a collection of **Documents**.

* An index is usually named according to the type and date of data, for example:\
  `logs-security-2025.10.18`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760820288397/4a66abd3-832b-4b4c-9abc-57faf6c73506.png" align="center" fullwidth="false" />

📘 **From the official Elastic documentation:**

> “An index is a collection of documents that share similar characteristics,\
> while a document is a JSON object that contains key-value pairs representing data fields.”

***

### 🔹 2. Document

A **Document** is the **basic data unit** within an index and represents **a single event or log entry**.\
Each document consists of several **fields** that include:

* Field name

* Field value

🧱 **Example:**

```bash
{
  "host.name": "server-01",
  "event.action": "login",
  "user.name": "admin"
}
```

***

### 🔹 3. Fields and Values

Fields represent detailed information within a document — such as username or IP address.\
Each field has a **data type** that defines how it is stored and how it can be queried.

***

## 🧩 **Second: Field Data Types in Elasticsearch**

Each **Field** in Elasticsearch has a **Data Type**, which determines the types of operations that can be performed on it during search or analysis.

| Data Type  | Description                                         | Example of Use                                       |
| ---------- | --------------------------------------------------- | ---------------------------------------------------- |
| **Date**   | Used to store dates and timestamps accurately.      | Searching within a time range (e.g., last 24 hours). |
| **Number** | Includes integer (long) and decimal (double) types. | Comparing values such as file size or response time. |
| **String** | Used to store text values (`text` or `keyword`).    | Searching for words or text patterns.                |
| **IP**     | Used to store IP addresses (IPv4/IPv6).             | Searching within IP ranges using CIDR notation.      |

📘 **From Elastic documentation:**

> “A field’s data type determines the kind of search or aggregation that can be performed on it.\
> For example, a `text` field supports full-text search,\
> while a `numeric` field supports range queries.”

***

## 🧩 **Third: Field Types in ECS**

The **Elastic Common Schema (ECS)** defines a unified structure for fields, allowing data from different sources to be integrated under the same model.

| Field Type          | Description                                                                                              | Recommendation & Usage                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Core Fields**     | A comprehensive set of predefined fields under main ECS objects such as `host`, `source`, `destination`. | Recommended as a starting point since they are used in most security use cases. |
| **Extended Fields** | A subset of fields used in more specific or specialized cases.                                           | Customized based on the type of data or service.                                |
| **Custom Fields**   | User-defined fields created to include additional data not covered by ECS.                               | Can be used as long as they do not conflict with existing ECS fields.           |

📘 **From the official documentation:**

> “Custom fields allow users to extend the ECS schema to meet their specific needs,\
> but they must not conflict with predefined ECS fields.”

***

## 🧩 **Fourth: Relationship Between ECS and Elasticsearch**

* **ECS** defines the structure and naming of fields during data ingestion.

* **Elasticsearch** stores these fields within documents inside indices.

🔁 **Result:**\
**Consistent and unified data structure** → **Faster search** → **More accurate and efficient analysis.**

***

## 🧾 **Fifth: Lesson Summary**

| Concept                 | Explanation                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| **ECS**                 | Defines a unified set of fields for data ingestion into Elasticsearch. |
| **Normalization**       | Ensures data consistency, accelerating search and analysis.            |
| **Indices**             | Units where data is stored in Elasticsearch.                           |
| **Documents**           | Represent log events within indices.                                   |
| **Fields & Data Types** | Define how data is stored and what search operations are possible.     |

🔗 **Official Elastic documentation:**\
[`https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html`](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)

***

***

***

# 🧠 الفصل الثاني – الجزء الثاني: بنية السجلات والبيانات (Logs and Data Structures)

## 🎯 الأهداف التعليمية

بعد دراسة هذا الجزء ستتعلم:

* كيفية تخزين البيانات داخل **Elasticsearch**.

* مكونات البيانات الأساسية: **الفهارس (Indices)**، **المستندات (Documents)**، و**الحقول (Fields)**.

* أنواع البيانات (**Data Types**) ودورها في عمليات البحث والتحليل.

* التعرف على **أنواع الحقول في ECS (Core – Extended – Custom)** ودورها في توحيد البيانات وتحسين الكفاءة.

***

## 🧩 أولًا: بنية البيانات في Elasticsearch (Elasticsearch Data Structure)

### 🔹 1. الفهرس (Index)

هو الوحدة الأساسية لتخزين البيانات داخل Elasticsearch، ويُشبه قاعدة البيانات في الأنظمة التقليدية.

* كل **فهرس** يحتوي على مجموعة من **المستندات (Documents)**.

* عادة ما يُسمى الفهرس باسم يدل على نوع البيانات وتاريخها، مثل:\
  `logs-security-2025.10.18`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760820288397/4a66abd3-832b-4b4c-9abc-57faf6c73506.png" align="center" fullwidth="false" />

📘 **من التوثيق الرسمي لـ Elastic:**

> "الفهرس (Index) هو مجموعة من المستندات (Documents) التي تشترك في خصائص متشابهة،\
> بينما يُعدّ المستند كائن JSON يحتوي على أزواج من المفاتيح والقيم (Key-Value Pairs) تمثل حقول البيانات."

***

### 🔹 2. المستند (Document)

هو **وحدة البيانات الأساسية** داخل الفهرس، ويمثل **حدثًا واحدًا أو سجلًّا محددًا (Log Event)**.\
كل مستند يتكون من مجموعة من **الحقول (Fields)** تحتوي على:

* اسم الحقل (Field Name)

* قيمة الحقل (Field Value)

🧱 **مثال:**

```json
{
  "host.name": "server-01",
  "event.action": "login",
  "user.name": "admin"
}
```

***

### 🔹 3. الحقول والقيم (Fields and Values)

الحقول تمثل المعلومات التفصيلية داخل المستند، مثل اسم المستخدم أو عنوان الـ IP.\
كل حقل له **نوع بيانات (Data Type)** يحدد كيفية تخزينه وطريقة البحث عليه.

***

## 🧩 ثانيًا: أنواع البيانات في الحقول (Elasticsearch Fields – Data Types)

كل **Field** في Elasticsearch يمتلك **نوع بيانات (Data Type)**، وهذا النوع يُحدد أنواع العمليات الممكن تنفيذها على هذا الحقل أثناء البحث أو التحليل.

| نوع البيانات             | الوصف                                          | أمثلة على الاستخدام                          |
| ------------------------ | ---------------------------------------------- | -------------------------------------------- |
| **Date**                 | لتخزين التواريخ والأوقات بدقة.                 | البحث ضمن نطاق زمني (مثل آخر 24 ساعة).       |
| **Number**               | يشمل الأعداد الصحيحة (long) والعشرية (double). | مقارنة القيم مثل حجم الملف أو مدة الاستجابة. |
| **String**               | لتخزين النصوص العادية (text أو keyword).       | البحث عن كلمات أو أنماط نصية.                |
| **IP**                   | لتخزين عناوين IP (IPv4/IPv6).                  | البحث في نطاقات IP باستخدام ترميز CIDR.      |
| 📘 **من وثائق Elastic:** |                                                |                                              |

> "يُحدد نوع بيانات الحقل (Field’s Data Type) نوع البحث أو التجميع (Aggregation) الذي يمكن إجراؤه عليه.\
> فعلى سبيل المثال، يدعم الحقل النصي (Text Field) البحث النصي الكامل (Full-text Search)،\
> بينما يدعم الحقل الرقمي (Numeric Field) عمليات البحث باستخدام النطاقات (Range Queries)."

***

## 🧩 ثالثًا: أنواع الحقول في ECS (ECS Field Types)

يُعرّف **Elastic Common Schema (ECS)** بنية موحدة للحقول، مما يسمح بتكامل البيانات القادمة من مصادر مختلفة ضمن نفس النموذج.

| نوع الحقل                            | الوصف                                                                                        | التوصية والاستخدام                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Core Fields (الحقول الأساسية)**    | مجموعة كاملة من الحقول المعرفة مسبقًا ضمن كائنات ECS العليا مثل (host، source، destination). | يُفضل البدء بها لأنها تُستخدم في أغلب السيناريوهات الأمنية. |
| **Extended Fields (الحقول الموسعة)** | مجموعة جزئية تُستخدم في حالات متخصصة أو أضيق.                                                | تُعدل حسب نوع البيانات أو الخدمة.                           |
| **Custom Fields (الحقول المخصصة)**   | حقول يُنشئها المستخدم لإضافة بيانات جديدة خارج ECS.                                          | يمكن استخدامها بشرط عدم تعارضها مع الحقول الأصلية لـ ECS.   |
| 📘 **من التوثيق الرسمي:**            |                                                                                              |                                                             |

> "تُتيح الحقول المخصصة (Custom Fields) للمستخدمين توسيع مخطط ECS بما يتناسب مع احتياجاتهم الخاصة،\
> ولكن يجب ألا تتعارض هذه الحقول مع الحقول المعرفة مسبقًا في ECS."

***

## 🧩 رابعًا: العلاقة بين ECS و Elasticsearch

* **ECS** يحدد شكل وأسماء الحقول الموحدة أثناء إدخال البيانات.

* **Elasticsearch** يخزن هذه الحقول داخل المستندات ضمن الفهارس.

🔁 النتيجة:\
بيانات **موحدة في الشكل والبنية** → **بحث أسرع** → **تحليل أكثر كفاءة ودقة**.

***

## 🧾 خامسًا: ملخص الدرس

| المفهوم                 | التوضيح                                                         |
| ----------------------- | --------------------------------------------------------------- |
| **ECS**                 | يحدد مجموعة موحدة من الحقول لإدخال البيانات داخل Elasticsearch. |
| **Normalization**       | يجعل البيانات متسقة في البنية مما يسرع عمليات البحث والتحليل.   |
| **Indices**             | الوحدات التي تُخزَّن فيها البيانات داخل Elasticsearch.          |
| **Documents**           | تمثل الأحداث (Log Events) داخل الفهارس.                         |
| **Fields & Data Types** | تحدد كيفية تخزين البيانات وأنواع عمليات البحث الممكنة.          |

* رابط مباشر لتوثيق Elastic الرسمي : [`https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html`](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)

