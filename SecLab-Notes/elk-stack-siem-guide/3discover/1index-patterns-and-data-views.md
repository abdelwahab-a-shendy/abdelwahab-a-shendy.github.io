---
id: "68f6e27f25c9d6de3f467901"
title: "1.Index Patterns and Data Views"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/3discover/1index-patterns-and-data-views"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-21T01:31:43.605Z"
updatedAt: "2026-01-25T15:35:47.090Z"
---

***

***

***

***

# 🧾 1. أنماط الفهرسة وعروض البيانات (Index Patterns and Data Views)

## 🎯 **أهداف التعلم (Learning Objectives) – قسم Discover**

يتناول هذا القسم كيفية استخدام واجهة **Discover** في **Kibana** بفعالية لاستكشاف وتحليل البيانات المأخوذة من **Elasticsearch**.

### الأهداف التفصيلية:

* **تخصيص واجهة Discover:** تعلم كيفية تعديل الواجهة للبحث في البيانات.

* **الوصول إلى البيانات:** تحديد كيفية الوصول إلى البيانات من فهارس Elasticsearch المختلفة.

* **عرض البيانات في Kibana:** مناقشة كيف تعرض Kibana البيانات داخل واجهة Discover.

* **اختيار الإعدادات المناسبة:** تحديد الإعدادات المثالية في Discover لعرض البيانات ذات الصلة.

* **إنشاء الاستعلامات:** بناء الاستعلامات باستخدام لغات **KQL** أو **Lucene** لعرض البيانات المطلوبة.

***

## 🧩 **المفاهيم الأساسية: Data Views / Index Patterns**

| المفهوم (Terminology)         | الوصف (Description)                                                             | ملاحظات هامة                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Data Storage**              | تُخزن بياناتك الأساسية في **Elasticsearch indices (فهارس Elasticsearch)**.      | يتم الوصول إلى هذه البيانات من خلال Kibana للتحليل.                                         |
| **Data View / Index Pattern** | متطلب أساسي لـ Kibana للوصول إلى بيانات Elasticsearch التي تريد استكشافها.      | هو في الأساس نمط **Wildcard** أو **Regex** يحدد الفهارس أو **Data Streams** المراد تضمينها. |
| **التسمية (Terminology)**     | **Index Pattern** هو المصطلح القديم (Legacy).                                   | تم استبداله بمصطلح **Data View** بدءاً من الإصدار **Kibana 8.0** فما فوق.                   |
| **نطاق الوصول (Scope)**       | يمكنك أن يشير إلى فهرس واحد أو أكثر، أو **Data Streams**، أو **Index Aliases**. | هذا يتيح تجميع مصادر بيانات متعددة تحت مُعرِّف واحد في Kibana.                              |

***

## 🔍 **ما هي الـ Index Pattern / Data View؟**

* بياناتك مخزّنة في مؤشرات (indices) داخل **Elasticsearch**.

* لكي يستطيع **Kibana** الوصول لهذه البيانات، تحتاج إلى تعريف **Index Pattern** أو **Data View**.

* من إصدار **Kibana 8.0** فإن المصطلح **Index Pattern** تم استبداله بـ **Data View**.

* يمكنك أن تُشير هذه الـ **Data View** إلى:

  * مؤشرات متعددة (indices)

  * تدفقات بيانات (data streams)

  * أو ألقاب المؤشرات (index aliases)

📌 **مثال:**\
`ecs-*` → كل المؤشرات التي تبدأ بـ ecs-

***

## 📂 **أمثلة على أنماط الفهرسة (Index Pattern Examples)**

لتحديد مجموعة من البيانات التي تتبع تنسيق **ECS (Elastic Common Schema)** المشترك، تُستخدم الأنماط التالية:

| النمط (Pattern)     | الوصف                                                                 | أمثلة للفهرسة المشمولة                                                 |
| ------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **ecs-**\*          | يشمل **All ECS** (جميع بيانات ECS).                                   | `ecs-suricata-network-2018.09.01`, `ecs-zeek-network-2018.09.01`, إلخ. |
| **ecs-suricata-**\* | يشمل فقط سجلات **Network IDS logs** من **SURICATA** وفقاً لـ ECS.     | `ecs-suricata-network-2018.09.01`, إلخ.                                |
| **ecs-zeek-**\*     | يشمل فقط سجلات **Network Traffic Metadata** من **Zeek** وفقاً لـ ECS. | `ecs-zeek-network-2018.09.01`, إلخ.                                    |

***

## 🧠 **ملاحظات مهمّة**

* ضمن قسم **Discover**، بعد إنشاء **Data View**، ستتمكن من اختيار الحقل الزمني الافتراضي (**time field**) لفلترة البيانات الزمنية.

* يجب أن تتطابق بياناتك في **Elasticsearch** مع ما تُشير إليه الـ **pattern/view** وإلا فلن تظهر في Kibana.

* أخطاء في التكوين أو الأذونات قد تمنع ظهور البيانات.

* استخدام **wildcard (\*)** مفيد لمؤشرات متعدّدة، لكن يجب أن يكون مطابقًا تمامًا لأسماء المؤشرات الفعلية.

***

## 🧪 **مثال تطبيقي لتحديد بيانات Zeek**

🎯 **الهدف:** تضمين جميع بيانات Zeek فقط.\
🔹 **Data View / Index Pattern المستخدم:** `ecs-zeek*`\
🔹 **الفهارس المشمولة:** فقط الفهارس التي تبدأ بـ `ecs-zeek-`\
(سيتم استبعاد الفهارس التي تبدأ بـ `ecs-suricata-`)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761011318794/885cfff6-04f3-471b-b017-fc19695fb868.png" align="center" fullwidth="false" />

***

## 🔗 **الروابط المرجعية الرسمية**

* [🔹 Data views | Elastic Docs](https://www.elastic.co/docs/explore-analyze/find-and-organize/data-views?utm_source=chatgpt.com)

* [🔹 Define your index patterns | Kibana Guide (8.19)](https://www.elastic.co/guide/en/kibana/8.19/tutorial-define-index.html?utm_source=chatgpt.com)

* [🔹 Data view APIs | Elastic Docs](https://www.elastic.co/docs/api/doc/kibana/group/endpoint-data-views?utm_source=chatgpt.com)

* [🔹 Troubleshooting Data Views | ](https://drdroid.io/stack-diagnosis/kibana-kibana-data-views-not-displaying?utm_source=chatgpt.com)[DrDroid.io](http://DrDroid.io)

***

## 🧩 **تذكّر دائمًا**

استخدام **Data View** (أو **Index Pattern**) الصحيح هو الخطوة الأولى لاستكشاف أي بيانات **SIEM** داخل **Kibana**.

