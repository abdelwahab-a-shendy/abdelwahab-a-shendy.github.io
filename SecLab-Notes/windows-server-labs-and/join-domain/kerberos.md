---
id: "692915d506d68e0e867e2ab4"
title: "Kerberos"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/windows-server-labs-and/join-domain/kerberos"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-11-28T03:24:05.330Z"
updatedAt: "2026-01-25T15:35:47.056Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1764300257388/965237f5-8646-430d-870f-1a19349d16e8.png" alt="" align="center" fullwidth="true" />

## شرح عملية المصادقة باستخدام بروتوكول Kerberos

### 1. 🗝️ المكونات الأساسية (Kerberos Components)

يبدأ الشرح بتعريف المكونات الرئيسية التي تشكل مركز توزيع المفاتيح (Key Distribution Center - KDC)، وهي جميعها موجودة على خادم النطاق (Domain Controller):

* **KDC:** **Key Distribution Center** (مركز توزيع المفاتيح).

* **AS:** **Authentication Server** (خادم المصادقة).

* **TGS:** **Ticket Granting Service** (خدمة منح التذاكر).

### 2. 📝 المراحل الرئيسية لبروتوكول Kerberos

العملية تتضمن تفاعلاً بين ثلاثة أطراف: **العميل (Client)**، ومركز توزيع المفاتيح **(KDC)**، وخادم المورد **(File Server)**.

#### المرحلة الأولى: الحصول على تذكرة منح التذاكر (TGT)

* **الخطوة \< 1:**

  * **العميل (Client)** يرسل **اسم المستخدم** إلى خادم المصادقة (AS) طالباً الوصول إلى الشبكة. لا يرسل العميل كلمة المرور، بل يستخدمها محلياً لتشفير الطلب.

  * **AS:** يطلب من المستخدم إدخال **كلمة المرور (Password)** الخاصة به للمصادقة.

* **الخطوة \< 2:**

  * **AS** يطابق كلمة المرور المُدخلة مع نسخته المخزنة.

  * إذا نجحت المصادقة، يقوم **AS** بإنشاء **تذكرة منح التذاكر (TGT)**، وهي تذكرة مشفرة بمفتاح خادم منح التذاكر (TGS Key).

  * **AS** يرسل التذكرة المشفرة (`Encrypted TGT`) إلى العميل، بالإضافة إلى **مفتاح جلسة (Session Key)** مشفر بكلمة مرور المستخدم.

  * **(النص العربي الظاهر):** "بعد ما يطابق الـ User والـ Pass يقوم بإصدار TGT Encrypted TGT ويتم إرساله إلى الـ client."

#### المرحلة الثانية: طلب تذكرة الخدمة (Service Ticket)

الآن، العميل لديه TGT ويريد الوصول إلى مورد معين، مثل **File Server**.

* **الخطوة \< 3:**

  * العميل (Client) يستخدم مفتاح الجلسة الذي حصل عليه لفك تشفير TGT والحصول على مفتاح جلسة جديد.

  * العميل يرسل **TGT** الذي حصل عليه في الخطوة \< 2 إلى **TGS** (الموجود أيضاً في KDC)، ويطلب **تذكرة خدمة (Service Ticket)** للوصول إلى خادم الملفات (File Server).

* **الخطوة \< 4:**

  * **TGS** يقوم بفك تشفير TGT باستخدام مفتاحه الخاص للتحقق من هوية العميل.

  * إذا كان TGT صحيحاً، يقوم **TGS** بإنشاء **تذكرة الخدمة (Service Ticket)**.

  * **تذكرة الخدمة** مشفرة بمفتاح خادم الملفات (File Server Key).

  * **(النص العربي الظاهر):** "الـ TGS بعد ما استلم الـ TGT يوصل كل البيانات من الكلاينت. يقوم بإصدار تذكرة مشفرة Encry Token."

* **الخطوة \< 5:**

  * **TGS** يرسل **تذكرة الخدمة المشفرة (**`Encrypted Service Ticket`) إلى العميل (Client).

#### المرحلة الثالثة: الوصول إلى المورد (Accessing the Resource)

* **الخطوة \< 6:**

  * **العميل (Client)** يرسل **تذكرة الخدمة المشفرة (**`Encrypted Service Ticket`) إلى **خادم الملفات (File Server)** طالباً الوصول إلى الملفات.

* **الخطوة \< 7:**

  * **خادم الملفات (File Server)** يستقبل التذكرة.

  * يقوم الخادم بفك تشفير التذكرة باستخدام **مفتاحه الخاص (File Server Key)**.

  * بعد فك التشفير، يتم التحقق من الصلاحيات المضمنة في التذكرة.

  * **(النص العربي الظاهر):** "File Server يسمح بالعميل بالوصول إلى المورد بعد ما يتأكد من الـ Encry Token وما بينفعش يفتح من طريق Encry Key وبذلك يتم التأكد من كل حاجة تخصه."

* **الخطوة \< 8:**

  * **النتيجة النهائية:** بعد المصادقة والتفويض الناجحين، يتمكن **العميل (Client)** من الوصول إلى **خادم الملفات (File Server)**.

  * **(النص العربي الظاهر):** "بعد ما يتأكد من كل حاجة تمام يقدر يبدأ في إرسال أي طلبات إلى File Server."

***

**الخلاصة:** Kerberos يوفر طريقة مصادقة لا تتطلب إرسال كلمة مرور المستخدم عبر الشبكة في كل مرة، بل يعتمد على "تذاكر" مشفرة (TGT و Service Ticket) يتم إصدارها بواسطة KDC، مما يزيد من الأمان.

***

***

***

# **Kerberos Authentication Process Explained**

## 1. 🗝️ **Core Components (Kerberos Components)**

The explanation begins by defining the main components of the **Key Distribution Center (KDC)**, all located on the **Domain Controller**:

* **KDC** – Key Distribution Center

* **AS** – Authentication Server

* **TGS** – Ticket Granting Service

***

## 2. 📝 **Main Stages of the Kerberos Protocol**

## The process involves **three parties**: the **Client**, the **KDC**, and the **Resource Server** (e.g., File Server).

***

## **Stage 1: Obtaining the Ticket Granting Ticket (TGT)**

### **Step 1:**

* The **Client** sends the username to the **AS**, requesting network access.

* The password is **not sent** over the network; it is used locally to encrypt the request.

**AS:** prompts the user to enter their **password** for authentication.

### **Step 2:**

* AS validates the entered password against its stored copy.

* If authentication succeeds, AS generates a **TGT**, encrypted with the **TGS key**.

* AS sends the **Encrypted TGT** to the client along with a **Session Key**, encrypted with the user’s password.

*(Original Arabic: "بعد ما يطابق الـ User والـ Pass يقوم بإصدار TGT Encrypted TGT ويتم إرساله إلى الـ client.")*

***

## **Stage 2: Requesting the Service Ticket**

Now, the client has a TGT and wants to access a specific resource, e.g., a **File Server**.

### **Step 3:**

* The client uses the **session key** to decrypt the TGT and obtain a new session key.

* The client sends the TGT to the **TGS** (also in the KDC) requesting a **Service Ticket** for the File Server.

### **Step 4:**

* TGS decrypts the TGT using its **private key** to verify the client’s identity.

* If valid, TGS generates a **Service Ticket**, encrypted with the **File Server key**.

*(Original Arabic: "الـ TGS بعد ما استلم الـ TGT يوصل كل البيانات من الكلاينت. يقوم بإصدار تذكرة مشفرة Encry Token.")*

### **Step 5:**

* TGS sends the **Encrypted Service Ticket** to the client.

***

## **Stage 3: Accessing the Resource**

### **Step 6:**

* The client sends the **Encrypted Service Ticket** to the **File Server** requesting access.

### **Step 7:**

* The File Server receives the ticket and decrypts it using its **File Server Key**.

* The server verifies the permissions included in the ticket.

*(Original Arabic: "File Server يسمح بالعميل بالوصول إلى المورد بعد ما يتأكد من الـ Encry Token وما بينفعش يفتح من طريق Encry Key وبذلك يتم التأكد من كل حاجة تخصه.")*

**Step 8:**

* **Outcome:** After successful authentication and authorization, the client can access the File Server.

*(Original Arabic: "بعد ما يتأكد من كل حاجة تمام يقدر يبدأ في إرسال أي طلبات إلى File Server.")*

***

### ✅ **Summary**

Kerberos provides a secure authentication mechanism **without sending the user password over the network each time**. It relies on **encrypted tickets** (TGT and Service Ticket) issued by the KDC, enhancing overall security.

