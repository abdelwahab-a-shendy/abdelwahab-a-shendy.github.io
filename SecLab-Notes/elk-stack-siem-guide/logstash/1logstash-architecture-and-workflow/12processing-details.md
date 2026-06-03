
## 🧩 **Processing Details in Logstash**

### ⚙️ 1️⃣ General Concept

Logstash is built around the concept of a **pipeline**, which consists of three main stages:

> **Input → Filter → Output**

* **Input:** Receives data from a source (e.g., Elastic Agent, log files).

* **Filter:** Processes, cleans, and transforms the data (using filters such as `drop` or `mutate`).

* **Output:** Sends the processed data to a chosen destination (e.g., Elasticsearch).

***

### 🔁 2️⃣ Event Ordering

By default, **Logstash does not guarantee event order** during processing.

📍 **Reasons:**

* Events within the same batch can change order while passing through filters.

* Some batches may be processed faster than others.

📌 **Solution (if event order is critical):**

```bash
pipeline.workers: 1
pipeline.ordered: true
```

This ensures that Logstash processes events **one by one**, maintaining their original order.

***

### ⚙️ 3️⃣ `pipeline.ordered` Setting

You can configure **event ordering** behavior in the `logstash.yml` file:

| **Value** | **Description**                                                                   |
| --------- | --------------------------------------------------------------------------------- |
| `auto`    | Enables automatic ordering when the number of workers = 1                         |
| `true`    | Enforces strict ordering; Logstash won’t start if more than one worker is defined |
| `false`   | Disables ordering (faster performance, but order not guaranteed)                  |

***

### 🕓 4️⃣ Java Pipeline Initialization Time

When Logstash starts, the logs display the **pipeline initialization time**,\
which indicates how long it takes to **compile the pipeline configuration** and **start worker threads**.

***

### ⚠️ 5️⃣ Reserved Fields in Logstash Events

Certain fields are **reserved** within a Logstash event and should be used carefully to avoid runtime errors.

| **Field**    | **Description**                                                     |
| ------------ | ------------------------------------------------------------------- |
| `@metadata`  | Contains internal temporary data (not visible in the final output). |
| `@timestamp` | Stores the event’s timestamp (in ISO8601 format).                   |
| `@version`   | Text value representing the version number (usually `"1"`).         |
| `tags`       | An array of labels that help categorize or classify events.         |

***

🧠 **Summary:**

* The Logstash **pipeline** processes data through input, filter, and output stages.

* Event order is **not guaranteed** unless explicitly configured.

* Reserved fields like `@timestamp` and `@metadata` are crucial for event structure and should not be overwritten.

***

***

***

***

## 🧩 **تفاصيل المعالجة في Logstash (Processing Details)**

### ⚙️ **1. فكرة عامة**

Logstash يعتمد على مفهوم **الـ Pipeline** (خط الأنابيب)، واللي بيتكوّن من:

* **Input** → استقبال البيانات من مصدر (زي Elastic Agent أو ملفات Logs)

* **Filter** → معالجة وتصفية وتنظيف البيانات (زي استخدام Drop و Mutate)

* **Output** → إرسال البيانات بعد معالجتها إلى وجهة معينة (زي Elasticsearch)

***

### 🔁 **2. ترتيب الأحداث (Event Ordering)**

بشكل افتراضي، **Logstash لا يضمن ترتيب الأحداث** أثناء المعالجة.

📍 **الأسباب:**

* ممكن الأحداث داخل نفس الـ batch يتغير ترتيبها أثناء تطبيق الفلاتر.

* بعض الـ batches ممكن تتعالج أسرع من غيرها.

📌 **الحل:**\
لو مهم جدًا تحافظ على ترتيب الأحداث:

```yaml
pipeline.workers: 1
pipeline.ordered: true
```

ده بيخلي Logstash يعالج الأحداث **واحدة وراء التانية بنفس الترتيب**.

***

### ⚙️ **3. إعداد pipeline.ordered**

في ملف `logstash.yml`، تقدر تتحكم في ترتيب الأحداث باستخدام:

* `auto` → بيشغّل الترتيب التلقائي لو عدد الـ workers = 1

* `true` → بيفرض الحفاظ على الترتيب، ومش بيبدأ Logstash لو فيه أكثر من عامل

* `false` → بيعطّل ترتيب الأحداث، وده أسرع بس الترتيب مش مضمون

***

### 🕓 **4. وقت تهيئة الـ Java Pipeline**

لما Logstash يبدأ، بيظهر في الـ logs وقت تهيئة الـ pipeline (Initialization time)\
وده الوقت اللي بياخده النظام لتجميع (compile) إعدادات الـ pipeline وتشغيل العمال (workers).

***

### ⚠️ **5. الحقول المحجوزة (Reserved Fields)**

فيه بعض الحقول محجوزة داخل Logstash event وما ينفعش تستخدمها بطريقة عشوائية لأنها ممكن تسبب **أخطاء تشغيل**.

| الحقل          | الوصف                                                         |
| -------------- | ------------------------------------------------------------- |
| **@metadata**  | يحتوي على بيانات مؤقتة داخلية (غير مرئية في الإخراج النهائي). |
| **@timestamp** | بيحتفظ بتاريخ ووقت الحدث (بصيغة ISO8601).                     |
| **@version**   | قيمة نصية تمثل رقم النسخة (عادة "1").                         |
| **tags**       | مصفوفة تحتوي على وسوم (labels) بتساعد في تصنيف الأحداث.       |

