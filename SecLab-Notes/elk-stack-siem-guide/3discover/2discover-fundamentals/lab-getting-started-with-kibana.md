
***

***

***

***

# 🧪 Lab 3.1: Discover - Getting Started with Kibana

**🎯 الهدف (Objective):**\
التعرف على واجهة **Kibana Discover** وكيفية استخدام ميزاتها لتحليل البيانات.

**📘 المرجع:**\
🔗 [Elastic Official Docs – Discover](https://www.elastic.co/guide/en/kibana/8.14/discover.html)

***

## 🔹 الخطوة 1: الانتقال إلى واجهة Discover

* من لوحة **Kibana** اختر **Discover** من قسم **Analytics**.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020107164/e80e1e2f-4c24-4f36-9042-d79a45beb9c5.png" align="center" fullwidth="true" />

* أو من القائمة الجانبية (Hamburger Menu) اختر **Discover** من تحت **Analytics**.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020120336/e95d4c3f-caa7-4421-8fab-fdec0f7b0272.png" align="center" fullwidth="true" />

📝 **شرح بسيط:**\
واجهة Discover هي المكان اللي بتقدر تشوف فيه كل الـ Logs اللي وصلت لـ Elasticsearch وتبدأ تعمل بحث أو فلترة عليها.

***

## 🔹 الخطوة 2: ضبط الـ Time Picker

* افتح الـ Calendar وعدّل الوقت إلى **Day 0** من قائمة **Commonly Used**.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020145077/016be3f7-c139-4208-a37b-49299fac59bf.png" align="center" fullwidth="false" />

📝 **شرح بسيط:**\
الـ Time Picker بيسمحلك تختار المدة الزمنية اللي عايز تشوف فيها الـ logs (مثلاً آخر يوم أو آخر ساعة).

***

## 🔹 الخطوة 3: عرض الـ Data Views

* من القائمة المنسدلة الخاصة بالـ **Data View**، شوف الـ Index Patterns المتاحة.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020158042/4bcf21fa-d553-4954-9d5b-878ececb35c2.png" align="center" fullwidth="true" />

📝 **شرح بسيط:**\
الـ Data View بيحدد من أي Index في Elasticsearch هيتم عرض البيانات (زي filebeat-\* أو windows-\*).

***

## 🔹 الخطوة 4: مراجعة النتائج في الـ Histogram

* شوف عدد الـ documents في الجدول، وحط المؤشر على العمود الأخضر الأكبر في الـ histogram لمعرفة عدد الأحداث في هذا الوقت.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020177335/3a2f7433-fd81-4031-bdea-1162e1a5014b.png" align="center" fullwidth="true" />

* بعد كده اضغط على العمود لتضييق النطاق الزمني، ولو حبيت ارجع، اختار تاني **Day 0**.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020188418/36613abf-d5f6-483f-803b-dee143e45e51.png" align="center" fullwidth="false" />

📝 **شرح بسيط:**\
الـ Histogram بيساعدك تشوف التوزيع الزمني للأحداث، وتقدر تركز على فترة معينة.

***

## 🔹 الخطوة 5: إنشاء الفلاتر

* من قائمة **Available Fields**، اضغط على حقل مثل `source.address`، واختر علامة **+** بجوار القيمة اللي عايز تعملها فلترة.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020227842/2f6dcde2-b6d5-4fdd-8dbc-9ef88d6ec7c3.png" align="center" fullwidth="false" />

* الفلتر هيظهر تحت شريط البحث، ولإزالته اضغط **X**.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020243513/83f522e9-092b-4668-92f5-fe62d3ea4592.png" align="center" fullwidth="false" />

* كمان ممكن تعمل فلتر يدوي من زر **+ Add Filter** وتختار الحقل والقيمة بنفسك.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020256392/6380bceb-fc47-4019-8d90-9b0e9d672bf2.png" align="center" fullwidth="false" />

📝 **شرح بسيط:**\
الفلاتر بتساعدك تحدد بيانات معينة — مثلاً تشوف فقط الـ logs اللي مصدرها IP محدد.

***

## 🔹 الخطوة 6: استعراض المستندات (Documents)

* اضغط على السهم الصغير بجانب أي document لعرض تفاصيله.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020266492/17c75c86-d550-4dc4-b4c7-b7a4d0ae55ef.png" align="center" fullwidth="false" />

* راقب الحقول والقيم، وجرب تستخدم علامة **-** لاستبعاد قيمة معينة من النتائج.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020270889/ffe6901a-bd5e-48ed-9335-7caa183c2603.png" align="center" fullwidth="false" />

📝 **شرح بسيط:**\
دي طريقة لاستعراض كل التفاصيل الدقيقة داخل log واحد وتحليل القيم اللي فيه.

***

## 🔹 الخطوة 7: استخدام قائمة الفلاتر (Query Menu)

* بعد تطبيق أكثر من فلتر، اضغط على **Query Menu** فوق الفلاتر.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020292047/7e25950e-648b-4254-b497-74f59cc92d11.png" align="center" fullwidth="false" />

* اختار **Apply to all** لعرض الخيارات مثل:

  * Enable all

  * Disable all

  * Invert inclusion

  * Pin all / Unpin all

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020317387/8b69d6bc-b7c3-4cae-9234-1639aeb3ecd2.png" align="center" fullwidth="true" />

📝 **شرح بسيط:**\
ميزة الـ “Pin” بتخليك تحتفظ بالفلاتر لما تنتقل لتطبيقات تانية داخل Kibana (زي Dashboard).

***

## 🔹 الخطوة 8: استعراض خصائص كل فلتر

* اضغط على أي فلتر لتشوف خيارات إضافية مثل:

  * Pin across all apps

  * Edit filter

  * Exclude / Include

  * Temporarily disable

  * Delete

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020331031/aa3b7fa2-70cb-4620-ad85-86869d0208d1.png" align="center" fullwidth="false" />

📝 **شرح بسيط:**\
تقدر تتحكم في الفلتر بالكامل بدون ما تمسحه — ممكن توقفه مؤقتًا أو تعكس تأثيره.

***

## 🔹 الخطوة 9: تخصيص الأعمدة (Columns)

* وسّع document جديد واضغط على **Toggle column in table** لإضافة حقل كعمود في الجدول.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020350193/44734e1a-4e36-4abf-b864-841a6f8d2fed.png" align="center" fullwidth="false" />

* يمكنك تحريك الأعمدة أو إزالة عمود بالضغط على **X** بجانبه.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761020356864/9ec385ca-964e-44e8-ac42-5563b339cf3d.png" align="center" fullwidth="false" />

📝 **شرح بسيط:**\
تخصيص الأعمدة بيساعدك تشوف الحقول اللي تهمك فقط بدون فوضى.

***

## 🧭 **الملخص (Summary)**

في هذا اللاب، تعلمنا كيفية:

* التنقل داخل واجهة **Discover**

* ضبط النطاق الزمني للبيانات

* إنشاء فلاتر وتحليل الـ Logs

* تخصيص الجدول لعرض الحقول المطلوبة\
  📊 **النتيجة:** أصبحت قادرًا على تحليل البيانات داخل Kibana بفعالية.

