
# **Aggregation-Based Visualizations :**

## 🎯 الأهداف التعليمية (Learning Objectives)

بعد الانتهاء من هذا الفصل، ستكون قادرًا على:

1. إنشاء **visualizations تعتمد على aggregations** لحالات الاستخدام الأمني.

2. التعرف على **أنواع التجميعات (Aggregations)** المختلفة وأنواع الرسوم البيانية المناسبة لها.

3. تطبيق **أفضل الممارسات** في إنشاء visualizations تعتمد على aggregations.

4. بناء visualization بناءً على **معطيات محددة (parameters)**.

5. **تحليل وتفسير البيانات** داخل الرسوم البيانية.

***

## ⚙️ **جوهر Kibana: Aggregation-Based Visualizations**

البيانات في العادة تكون **معقدة ومتعددة الأبعاد**، لذلك نحتاج إلى أدوات تلخيص وتحليل تساعدنا في استخراج رؤى واضحة منها.

> 🧩 **الهدف الأساسي:** تحويل البيانات الخام إلى **رؤى قابلة للفهم** من خلال:

* تقسيم البيانات إلى شرائح حسب خصائص معينة (**slices**)

* إجراء حسابات رقمية على خصائص معينة (**calculations**)

***

## 🧮 **أنواع الـ Aggregations**

هناك نوعان أساسيان:

### 1️⃣ **Metrics Aggregation**

🔹 تُستخدم لإجراء **حسابات رقمية** على مجموعة من الوثائق (documents).\
🔹 تشبه طريقة التلخيص في الجداول المحورية (Pivot Tables).\
🔹 ناتجها يكون إما:

* **قيمة واحدة** مثل:\
  `avg`, `sum`, `min`, `max`, `unique_count`

* **قيم متعددة** مثل:\
  `percentiles`, `percentile_ranks`

> 🧠 مثال عملي:\
> حساب **متوسط عمر المستخدمين** أو **إجمالي عدد السجلات** في الـ index.

### 2️⃣ **Buckets Aggregation**

🔹 تُستخدم لتقسيم البيانات إلى **مجموعات (Buckets)** بناءً على معايير معينة.\
🔹 تشبه عملية **Group By** في SQL أو Excel Pivot Table.\
🔹 كل Bucket يحتوي على مجموعة من الوثائق التي تشترك في نفس القيمة في حقل محدد.\
🔹 افتراضيًا، يتم حساب **عدد الوثائق (doc\_count)** داخل كل bucket.

> 📊 يمكن ربط أكثر من metric مع نفس bucket لعرض حسابات مختلفة مثل:\
> `count`, `average`, `max`, `sum` … إلخ.

***

## 📘 **مثال بسيط للتوضيح**

| id | user   | age | country | category |
| -- | ------ | --- | ------- | -------- |
| 1  | Bill   | 30  | FR      | A        |
| 2  | Marie  | 32  | US      | A        |
| 3  | Claire | 32  | US      | A        |
| 4  | Tom    | 44  | DE      | B        |
| 5  | John   | 40  | US      | B        |
| 6  | Emma   | 26  | US      | B        |

🔸 إذا قمنا بعمل **Bucket Aggregation** حسب `country`\
سنحصل على:

* Bucket لـ (US)

* Bucket لـ (FR)

* Bucket لـ (DE)

ثم يمكننا تطبيق **Metric Aggregation** مثل `avg(age)` لكل bucket.

***

## ⚖️ **أنواع الـ Metric Aggregations**

| النوع                              | الوصف                                                    |
| ---------------------------------- | -------------------------------------------------------- |
| **Count**                          | عدد السجلات (documents) في الـ index — القيمة الافتراضية |
| **Average (avg)**                  | متوسط قيمة الحقل المحدد                                  |
| **Sum**                            | مجموع القيم لحقل معين                                    |
| **Min / Max**                      | أقل وأكبر قيمة في الحقل                                  |
| **Unique Count (Cardinality)**     | عدد القيم الفريدة                                        |
| **Percentiles / Percentile Ranks** | تحليل القيم بناءً على النسب المئوية                      |

***

## 🧩 **Sub-Bucket Aggregation**

🔹 تُستخدم لتقسيم كل bucket رئيسي إلى **مجموعات فرعية**.\
🔹 مثال:

* bucket رئيسي حسب `country`

* sub-bucket فرعي حسب `category`

> 🔍 بهذه الطريقة يمكنك رؤية التوزيع الداخلي لكل مجموعة بشكل تفصيلي.

***

## 📊 **أنواع الرسوم البيانية (Visualization Types)**

| النوع                         | الاستخدام                                               |
| ----------------------------- | ------------------------------------------------------- |
| **Area**                      | لإبراز المساحة بين الخط والمحور (جيد لعرض الاتجاهات).   |
| **Data Table**                | عرض البيانات في شكل جدول منظم.                          |
| **Goal**                      | متابعة التقدم نحو هدف محدد.                             |
| **Heat Map**                  | عرض القيم بالألوان داخل شبكة.                           |
| **Gauge**                     | إظهار الحالة أو النسبة الحالية لمؤشر.                   |
| **Horizontal / Vertical Bar** | عرض المقارنات على محور أفقي أو رأسي.                    |
| **Line**                      | عرض تغير القيم عبر الزمن.                               |
| **Metric**                    | إظهار قيمة واحدة فقط (مثل عدد التنبيهات أو المستخدمين). |
| **Pie**                       | مقارنة الأجزاء كنسبة من الكل.                           |
| **Tag Cloud**                 | عرض تكرار الكلمات أو المصطلحات بحجم خط متغير.           |
| **Timeline**                  | عرض البيانات الزمنية كسلسلة أحداث.                      |

***

## 🧠 **أفضل الممارسات (Best Practices)**

1. 🔍 **ابدأ بهدف واضح**: ماذا تريد أن تكتشف من البيانات؟

2. 🧩 **اختر النوع المناسب من aggregation** (metric أو bucket) حسب الهدف.

3. 📏 **حدد الحقول المهمة فقط** لتجنب التعقيد.

4. 🎨 **اختر Visualization مناسبة** لطبيعة البيانات (Pie للمقارنة – Line للزمن – Gauge للقياس).

5. ⚡ **اختبر عدة أنواع** من visualizations حتى تصل للأكثر وضوحًا.

6. 🧱 **استخدم Sub-Buckets** لتوضيح العلاقات الداخلية.

7. 🧾 **أضف تفسير لكل Visualization** داخل الـ Dashboard ليسهل على الآخرين فهمها.

***

## 🧩 **روابط مهمة من Documentation الرسمية:**

* 🔗 [Kibana Visualize Guide (Elastic Docs)](https://www.elastic.co/guide/en/kibana/current/visualize.html)

* 🔗 [Aggregation Reference (Elasticsearch Docs)](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)

* 🔗 [Best Practices for Visualizations](https://www.elastic.co/guide/en/kibana/current/visualize-best-practices.html)

