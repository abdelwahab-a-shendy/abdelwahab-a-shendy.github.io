
***

***

***

***

# 🧭 Discover Fundamentals

## 1️⃣ Where to Start

### 🏠 Start with the Home Page

الصفحة الرئيسية (Home Page) هي نقطة البداية في Kibana، وتوفر وصولًا سريعًا لكل الحلول والأدوات الخاصة بتحليل البيانات.\
من خلالها يمكنك الوصول إلى التطبيقات (Apps)، المحتوى (Content)، ولوحات التحكم (Dashboards).

| **الميزة (Solution)** | **الوصف (Description)**                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| **Search**            | إنشاء تجارب بحث باستخدام مجموعة محسّنة من الـ APIs والأدوات.                                            |
| **Observability**     | دمج السجلات (Logs)، المقاييس (Metrics)، تتبعات التطبيقات (Traces)، وتوفّر النظام (System Availability). |
| **Security (SIEM)**   | منع، جمع، كشف، والاستجابة للتهديدات لحماية موحدة عبر البنية التحتية.                                    |
| **Analytics**         | استكشاف، تصور، وتحليل البيانات باستخدام أدوات تحليل قوية.                                               |
|                       |                                                                                                         |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020863023/17d68aae-8ab5-4671-8870-85a3dd4fe67e.png" align="center" fullwidth="false" />

***

## 2️⃣ Discover: Analyze Your Data

واجهة **Discover** هي المكان الذي تبدأ فيه بتحليل البيانات الأولية في Kibana.\
توفر لك أدوات لاستعراض المستندات (Documents) واستكشاف الحقول وتصفية البيانات بزمن محدد.

| **العنصر (Component)**        | **الوصف (Description)**                                          |
| ----------------------------- | ---------------------------------------------------------------- |
| **Index Pattern / Data View** | يحدد مجموعة البيانات (الفهارس) التي يتم استكشافها (مثل `ecs-*`). |
| **Time Filter**               | لتحديد النطاق الزمني للبيانات المعروضة.                          |
| **Query Bar**                 | لكتابة الاستعلامات باستخدام KQL أو Lucene.                       |
| **Histogram**                 | رسم بياني زمني يوضح توزيع الأحداث عبر الوقت.                     |
| **Available Fields**          | قائمة جانبية بالحقول المتاحة في مجموعة البيانات.                 |
| **Documents Table**           | الجدول الرئيسي الذي يعرض الأحداث (Documents) وتفاصيلها.          |
| **Toolbar**                   | يحتوي على أدوات مثل Share، Alerts، Inspect، Save.                |

📷 *مثال توضيحي من واجهة Discover:*

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020886655/ee941ad5-3f4c-4874-8e21-5be162047618.png" align="center" fullwidth="false" />

***

## 3️⃣ Analyze Your Data with Discover

يمكنك البحث ضمن قائمة الحقول المتاحة **(Available Fields)**، أو النقر على أي حقل لعرض أكثر القيم شيوعًا له.

* عند النقر على حقل (مثل `source.ip`):

  * تظهر **Top values** (أكثر 10 قيم تكرارًا).

  * يتم حساب النسب المئوية من عينة من السجلات.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020891785/0c636697-5ea8-4cf5-b8c2-55e656a93da6.png" align="center" fullwidth="false" />

***

## 4️⃣ Customize the Discover Interface

افتراضيًا، يحتوي جدول الوثائق على:

* عمود لحقل الوقت `@timestamp`.

* عمود واحد يعرض جميع الحقول الأخرى.

يمكنك التخصيص عبر:

* **إضافة عمود:** اضغط على **+** بجانب أي حقل لإضافته إلى الجدول.

* **إعادة الترتيب:** اضغط على رأس العمود ثم اختر **Move left** أو **Move right**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020907865/ef8c866d-f068-45a6-849d-5d62a0f73620.png" align="center" fullwidth="false" />

***

## 5️⃣ Searching for Data

يمكنك كتابة استعلامات في شريط البحث (Query Bar) باستخدام **KQL أو Lucene** لعرض البيانات ذات الصلة.\
📘 *أمثلة:*

```yaml
destination.ip: 172.16.100.1
```

```yaml
status:[400 TO 499] AND extension:(php OR html)
```

📷 *مثال عملي:*

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020919841/08b5954f-27ef-443c-9586-0314efddc727.png" align="center" fullwidth="false" />

***

## 6️⃣ Filtering Your Data

الفلاتر تسمح بتضمين أو استبعاد بيانات حسب حقل أو نطاق محدد.

* يمكنك تعديل (Edit) أو حذف (Delete) أو تعطيل مؤقتًا (Temporarily Disable) الفلاتر.

* خيار **Pin across all apps** يجعل الفلتر فعّالًا في كل تطبيقات Kibana.

📘 *مثال فلترة نطاق القيم:*

```text
source.bytes is between 3000 and 6000
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020935957/44714838-4ba6-49b2-9746-24e20bba0f87.png" align="center" fullwidth="false" />

***

## 🧩 ملاحظات ختامية

* واجهة Discover هي **قلب عملية الـ SIEM**: فيها يتم

  * التحقق الأولي من الأحداث.

  * بناء الاستعلامات للتحليل.

  * اكتشاف الأنماط غير الطبيعية.

* بعد التحليل يمكن استخدام النتائج في **Dashboards** أو **Alerts**.

***

## 📚 المراجع :

* [Elastic Docs: Explore fields and data with Discover](https://www.elastic.co/docs/explore-analyze/discover/discover-get-started?utm_source=chatgpt.com)

* [Tutorialspoint: Kibana Discover Overview](https://www.tutorialspoint.com/kibana/kibana_discover.htm?utm_source=chatgpt.com)

* [SCS Undefined Guide on Kibana Querying](https://scsundefined.gitbooks.io/kibana-user-guide-cn/s06/?utm_source=chatgpt.com)

