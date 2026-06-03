
***

***

***

***

# 🧪 **Lab 3.2: Searching with KQL and Lucene**

**🎯 Objective:**\
تعلم كيفية استخدام **KQL (Kibana Query Language)** و **Lucene Search Syntax** للبحث وتحليل السجلات داخل تطبيق **Discover** في Kibana.

**📚 Reference Material:**

* [KQL Documentation](https://www.elastic.co/guide/en/kibana/8.14/kuery-query.html)

* [Lucene Query Syntax](https://www.elastic.co/guide/en/kibana/8.14/lucene-query.html)

***

في هذا اللاب، ستتعلم كيفية **التبديل بين لغتي البحث KQL و Lucene** لتحليل البيانات داخل واجهة Discover.\
بشكل افتراضي، **لغة البحث في Kibana هي KQL**،\
ولذلك، إذا كتبت استعلام بلغة Lucene دون التبديل إليها، فلن يعمل الاستعلام.

***

## 🧭 1. تعلم كيفية التبديل بين KQL و Lucene

### 🔹 1-1. افتح قائمة الخيارات (Hamburger Menu)

اضغط على **رمز القائمة (☰)** الموجود على يسار شريط البحث داخل Discover.

> هذه القائمة تحتوي على إعدادات خاصة بطريقة عرض النتائج وخيارات اللغة.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761021252852/c95975aa-094a-49a1-a9e1-2a5b18a89adc.png" align="center" fullwidth="false" />

***

### 🔹 1-2. اختر خيار **Language**

بعد فتح القائمة، اختر **Language** لتحديد لغة البحث التي تريد استخدامها في كتابة الاستعلامات.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761021262465/22f62e14-75c6-418e-8ece-fa19424c7198.png" align="center" fullwidth="false" />

***

### 🔹 1-3. حدد اللغة المطلوبة (KQL أو Lucene)

يمكنك الآن الاختيار بين:

* **KQL (Kibana Query Language)** → أسهل وأكثر حداثة، تدعم الكتابة بأسلوب طبيعي مثل:

  ```yaml
  event.dataset : "nginx.access"
  ```

* **Lucene** → أقدم وأقرب إلى أسلوب البحث المنطقي التقليدي مثل:

  ```yaml
  event.dataset:nginx.access AND response:200
  ```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761021268741/6383ceb3-bfbd-40e9-8e1b-998f316db696.png" align="center" fullwidth="false" />

> 🧠 **معلومة:**\
> KQL لا تحتاج إلى استخدام علامات اقتباس أو عمليات منطقية معقدة دائمًا،\
> بينما Lucene أكثر مرونة من ناحية التحكم لكنها تحتاج دقة أكبر في الصياغة.

***

## 🧾 **Summary**

في هذا اللاب تعلمت:

* كيفية فتح إعدادات البحث في Discover.

* التبديل بين لغتي **KQL** و **Lucene**.

* معرفة أن كل لغة لها أسلوبها الخاص في كتابة الاستعلامات لتحليل البيانات داخل Kibana.

