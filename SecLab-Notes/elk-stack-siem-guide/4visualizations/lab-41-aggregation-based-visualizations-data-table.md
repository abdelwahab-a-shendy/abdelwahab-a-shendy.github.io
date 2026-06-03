
# 🧩 **Lab 4.1 – إنشاء Data Table Visualization مع Aggregations**

## 🎯 **الهدف من المعمل (Objective):**

تعلم كيفية إنشاء **جدول بيانات (Data Table)** يعتمد على **Aggregation** داخل **Kibana** لعرض **أعلى 10 عناوين IP مصدرية (Top 10 Source IPs)**.

## 🔗 **المراجع الرسمية:**

Elastic Docs – Add Aggregation-Based Visualization Panels :

* [https://www.elastic.co/guide/en/kibana/8.14/add-aggregation-based-visualization-panels.html](https://www.elastic.co/guide/en/kibana/8.14/add-aggregation-based-visualization-panels.html)

***

## 🧭 **الخطوات العملية:**

### 🪜 **الخطوة 1 – إنشاء Visualization جديدة**

1. من واجهة **Kibana**، انتقل إلى:

   * **Analytics → Visualize Library**

2. اضغط على **Create visualization** ➕

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534254719/25d68ca9-ab86-409c-8b0e-6950004f0924.png" align="center" fullwidth="false" />

3. اختر نوع **Aggregation Based**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534260381/31d097a8-10b5-488a-8891-9fbfdb7b99e0.png" align="center" fullwidth="false" />

4. بعد ذلك اختر نوع **Data Table**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534271147/aef90619-ad78-4057-995d-51f3c9972b22.png" align="center" fullwidth="false" />

> 🔍 *Data Table* تُستخدم لعرض البيانات في شكل منسق ومنظم باستخدام الأعمدة والصفوف، وهي مفيدة جدًا في تحليل السجلات الأمنية (logs).

***

### 🧩 **الخطوة 2 – إعداد Data View والـ Time Picker**

1. اختر **Data View** التالي: `ecs-zeek-*`

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534287134/2b13af6f-6a5e-4078-b8f9-7d06b7304ec2.png" align="center" fullwidth="false" />

* هذا الفيو يحتوي على بيانات Zeek الخاصة بحركة الشبكة.

* في أعلى الشاشة، استخدم **Time Picker** لتحديد النطاق الزمني: `Day 0`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534300862/17b1d6be-5b3b-4581-b89e-0ef1a6af60ec.png" align="center" fullwidth="false" />

* (وهو اليوم الأول من البيانات في اللاب.)

* 🕒 *تحديد الوقت مهم جدًا في Kibana* لأن معظم الرسوم البيانية تعتمد على نطاق زمني لإظهار البيانات بشكل صحيح.

### ⚙️ **الخطوة 3 – إعداد خيارات Aggregation داخل الجدول**

1. من إعدادات **Buckets** اضغط على **Add** ثم اختر **Split rows**\
   🔹 هذا يحدد كيفية تقسيم الصفوف في الجدول.

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534317806/75418879-8455-4a67-8f86-bdabcaa83d1d.png" align="center" fullwidth="false" />

2. من قائمة **Aggregation**، اختر: `Terms`

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534326174/af8f51b0-a132-4ac1-8452-35852007c7c7.png" align="center" fullwidth="false" />

> * وهي تُستخدم لتجميع البيانات حسب قيمة معينة (مثل IP أو اسم المستخدم).

* من قائمة **Field**، اكتب وحدد: `source.ip`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534337402/bf91dd45-6408-4f14-9e4f-1a393c0bbc1a.png" align="center" fullwidth="false" />

> * هذا الحقل يمثل عنوان الـ IP المصدري (أي الجهاز الذي بدأ الاتصال).

* غيّر القيمة في خانة **Size** إلى:

  `10`

  لعرض أعلى 10 قيم فقط.

* غيّر الترتيب إلى **Descending** (تنازلي) حتى يتم عرض الـ IPs الأكثر تكرارًا في الأعلى.

* اضغط على **Update** 🔄 لتطبيق التغييرات ورؤية النتائج في الجدول.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534360717/5e9db7f5-d016-42fd-b72c-cddec6d75a15.png" align="center" fullwidth="false" />

> 💡 الآن سيعرض الجدول **أكثر 10 عناوين IP مصدرية ظهورًا** في سجلات Zeek خلال النطاق الزمني المحدد.

***

### 💾 **الخطوة 4 – حفظ الـ Visualization**

1. اضغط على **Save** في الأعلى.

2. اختر اسم مناسب: `LAB - Count of Top 10 Source IPs`

3. في خانة **Add to Dashboard** اختر: `None`

   * لأنك في هذا اللاب لا تحتاج لربطها بلوحة تحكم بعد.

4. ثم اختر: `Save and Add to Library`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761534371613/32a6ee53-faf9-4b28-a002-11330b902922.png" align="center" fullwidth="false" />

***

## 🧠 **الملخص (Summary):**

في هذا اللاب، تعلمنا كيفية:

* إنشاء **Data Table Visualization** تعتمد على **Aggregation-Based Analysis**.

* استخدام **Terms Aggregation** لتجميع البيانات حسب حقل معين (`source.ip`).

* عرض **أعلى 10 عناوين IP مصدرية** من سجلات Zeek في فترة زمنية محددة.

> 🧩 **النتيجة النهائية:** جدول يعرض الـ IPs الأكثر نشاطًا أو تكرارًا — وهي خطوة مهمة جدًا في تحليل سلوك الشبكة وتحديد مصادر الهجمات أو النشاط غير الطبيعي.

***

## 📘 **ملاحظات إضافية من Documentation:**

* يمكن استخدام **Metric Aggregations** إضافية (مثل `Count`, `Sum`, `Avg`) بجانب **Terms Aggregation** في نفس الجدول.

* الـ **Data Table** يمكن أن تحتوي على أكثر من مستوى **Sub-Buckets** لعرض تحليل أعمق (مثل `source.ip` ثم `destination.port`).

* دائمًا احفظ الـ Visualization داخل **Library** لتتمكن من إضافتها لاحقًا إلى Dashboards.

