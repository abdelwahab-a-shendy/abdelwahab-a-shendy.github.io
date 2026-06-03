---
id: "68eadfeefea38ff5f333362a"
title: "🌐HTTP Protocol"
description: "base"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/introduction/http-protocol"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-11T22:53:34.493Z"
updatedAt: "2026-01-25T15:35:47.003Z"
---

### ⚙️ **What Is HTTP?**

**HTTP** stands for **HyperText Transfer Protocol**.\
It is a **TCP-based protocol** used for transferring data between **websites and applications**.

* The **default protocol** for web pages.

* It typically runs on **Port 80** (though this can be changed in the server settings).

* It’s used for communication between **Web Applications** and **Mobile Applications**.

The communication happens between a **Client** (the user or browser) and a **Server**,\
through **Requests** and **Responses**.

***

## 🔗 **What Is a URL and What Does It Contain?**

**URL** stands for **Uniform Resource Locator** —\
it’s the address or link used to access a specific web page.

Example 👇

```bash
Scheme       Host                Directory         Parameters
|             |                      |                   |
|             |                      |                   |
http://image.google.com:80/Secrets/index.php?id=13&message=Hello#top
              |             |             |                        |
     Second-Level Domain   Port          File                   Fragment
```

| **Part**                  | **Description**                                           |
| ------------------------- | --------------------------------------------------------- |
| **Scheme**                | The protocol type (e.g., `http` or `https`).              |
| **Host**                  | The website’s domain name or address.                     |
| **Port**                  | The port used for the connection (default: 80 or 443).    |
| **Directory / File Path** | The internal path on the server to access a page or file. |
| **Parameters**            | Data values sent to the server (e.g., `?id=13`).          |
| **Fragment**              | A specific section on a page, indicated by `#`.           |

***

## 🔐 **HTTP vs HTTPS**

In **HTTP**, all data is transmitted **in plain text**,\
which means it can be intercepted or read — for example, through a **Man-in-the-Middle (MITM)** attack.

This issue was solved with **HTTPS**,\
the **secure version of HTTP** that adds **encryption** via **SSL/TLS**.

| **Protocol** | **Default Port** | **Security**           |
| ------------ | ---------------- | ---------------------- |
| **HTTP**     | 80               | ❌ Unencrypted          |
| **HTTPS**    | 443              | ✅ Encrypted and secure |

📊 **Main Difference:** The presence (or absence) of **encryption**:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760229841742/0316041d-a373-4aec-87ea-f51e8dca0309.png" alt="" align="center" fullwidth="true" />

***

## 📩 **Components of an HTTP Request**

An **HTTP Request** is what the client sends to the server.\
It consists of the following parts:

1. **Method** – The type of operation (e.g., GET, POST, etc.)

2. **Path** – The requested path on the server

3. **HTTP Version** – The version of the HTTP protocol

4. **Headers** – Additional information such as content type or browser details

5. **Body** – Contains the data (used in methods like POST)

### 🧾 **Example of an HTTP Request:**

```bash
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept-Language: en-US
Connection: keep-alive
```

***

## 📤 **Components of an HTTP Response**

An **HTTP Response** is what the server sends back to the client.\
It contains:

1. **Status Line** – Includes the status code and message (e.g., `200 OK`)

2. **Headers** – Provide details about the server or file

3. **Body** – Contains the actual data or webpage content

### 🧾 **Example of an HTTP Response:**

```bash
HTTP/1.1 200 OK
Date: Sun, 12 Oct 2025 20:00:00 GMT
Server: Apache/2.4.52
Content-Type: text/html
Content-Length: 1024

<html>
  <body>
    <h1>Welcome to Example Website</h1>
  </body>
</html>
```

***

## 🧱 **Types of HTTP Headers**

### 📩 **Request Headers**

| **Header Name**     | **Description**                                                   |
| ------------------- | ----------------------------------------------------------------- |
| **Host**            | Contains the IP or domain of the target server.                   |
| **User-Agent**      | Contains information about the client device or browser.          |
| **Connection**      | Specifies whether to keep the connection alive after the request. |
| **Referer**         | The page from which the request originated.                       |
| **Accept-Language** | The languages supported by the client.                            |
| **Accept-Encoding** | Supported encoding/compression types.                             |
| **Accept**          | The data types the client accepts from the server.                |
| **Cookie**          | Contains session or authentication data.                          |
| **Content-Length**  | The size of the request body data.                                |
| **Content-Type**    | The format of the request body (e.g., `application/json`).        |

***

### 📤 **Response Headers**

| **Header Name** | **Description**                            |
| --------------- | ------------------------------------------ |
| **Date**        | The date and time the response was sent.   |
| **Location**    | Used for redirects.                        |
| **Set-Cookie**  | Used to create or update cookies.          |
| **Server**      | Contains information about the web server. |

***

## 🧭 **HTTP Methods**

| **Method**  | **Description**                                               |
| ----------- | ------------------------------------------------------------- |
| **GET**     | Retrieves data from the server — no body (data in URL).       |
| **POST**    | Sends data to the server (e.g., forms or files) via the body. |
| **HEAD**    | Similar to GET but without a body, used for validation.       |
| **OPTIONS** | Lists the allowed HTTP methods on the server.                 |
| **PUT**     | Creates or replaces existing data.                            |
| **PATCH**   | Updates part of an existing resource.                         |
| **DELETE**  | Deletes data from the server.                                 |

> 🔸 Common usage:
>
> * **GET** and **POST** → Used in web applications.
>
> * **PUT**, **PATCH**, and **DELETE** → Common in **APIs**.

***

## 📊 **HTTP Response Codes**

| **Category** | **Meaning**                         |
| ------------ | ----------------------------------- |
| **1xx**      | Informational or processing status. |
| **2xx**      | Success responses.                  |
| **3xx**      | Redirection responses.              |
| **4xx**      | Client-side errors.                 |
| **5xx**      | Server-side errors.                 |

### **Most Common Status Codes:**

| **Code**                      | **Meaning**                           |
| ----------------------------- | ------------------------------------- |
| **200 OK**                    | Request succeeded.                    |
| **302 Found**                 | Resource found (redirect).            |
| **400 Bad Request**           | Invalid request syntax.               |
| **403 Forbidden**             | Access denied – no permission.        |
| **404 Not Found**             | Resource not found.                   |
| **500 Internal Server Error** | Server encountered an internal issue. |

***

***

***

⚙️ **ما هو HTTP؟**

**HTTP** هو اختصار لـ **HyperText Transfer Protocol**،\
وهو بروتوكول يعتمد على **TCP** ويُستخدم لنقل البيانات بين **المواقع الإلكترونية والتطبيقات**.

هو البروتوكول الافتراضي لصفحات الويب،\
ويعمل عادةً على **المنفذ 80** (لكن يمكن تغييره من إعدادات الخادم).

يُستخدم في الاتصال بين **تطبيقات الويب أو الهاتف (Web / Mobile Apps)**،\
ويتم التواصل بين **العميل (Client)** مثل المتصفح أو المستخدم، و**الخادم (Server)**\
عن طريق **الطلبات (Requests)** و**الاستجابات (Responses)**.

***

🔗 **ما هو الـ URL وماذا يحتوي؟**

**URL** هو اختصار لـ **Uniform Resource Locator**،\
وهو **العنوان أو الرابط** المستخدم للوصول إلى صفحة ويب محددة.

**مثال 👇**

```bash
http://image.google.com:80/Secrets/index.php?id=13&message=Hello#top
```

| الجزء                     | الوصف                                             |
| ------------------------- | ------------------------------------------------- |
| **Scheme**                | نوع البروتوكول (مثل http أو https).               |
| **Host**                  | اسم النطاق أو عنوان الموقع.                       |
| **Port**                  | المنفذ المستخدم للاتصال (افتراضيًا: 80 أو 443).   |
| **Directory / File Path** | المسار الداخلي على الخادم للوصول إلى ملف أو صفحة. |
| **Parameters**            | البيانات المُرسلة للخادم (مثل ?id=13).            |
| **Fragment**              | قسم محدد في الصفحة، ويُشار إليه بالرمز #.         |

***

🔐 **الفرق بين HTTP و HTTPS**

في بروتوكول **HTTP**، تُنقل البيانات **كنص عادي (Plain Text)**،\
مما يعني أنه يمكن اعتراضها أو قراءتها — مثلًا في **هجوم الرجل في المنتصف (MITM Attack)**.

تم حل هذه المشكلة مع **HTTPS**،\
وهو النسخة الآمنة من HTTP التي تُضيف **تشفير SSL/TLS** لحماية الاتصال.

| البروتوكول | المنفذ الافتراضي | الأمان       |
| ---------- | ---------------- | ------------ |
| **HTTP**   | 80               | ❌ غير مشفّر  |
| **HTTPS**  | 443              | ✅ مشفّر وآمن |

📊 **الفرق الأساسي:** وجود أو غياب التشفير 🔒

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760229841742/0316041d-a373-4aec-87ea-f51e8dca0309.png" alt="" align="center" fullwidth="true" />

***

📩 **مكونات طلب HTTP (HTTP Request)**

طلب الـ HTTP هو ما يُرسله العميل إلى الخادم، ويتكون من الأجزاء التالية:

* **Method** → نوع العملية (مثل: GET, POST, …)

* **Path** → المسار المطلوب على الخادم

* **HTTP Version** → إصدار البروتوكول المستخدم

* **Headers** → معلومات إضافية (مثل نوع المحتوى أو تفاصيل المتصفح)

* **Body** → يحتوي على البيانات (يُستخدم عادةً في POST أو PUT)

🧾 **مثال على طلب HTTP:**

```bash
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept-Language: en-US
Connection: keep-alive
```

***

📤 **مكونات استجابة HTTP (HTTP Response)**

استجابة الـ HTTP هي ما يُرسله الخادم ردًا على الطلب، وتحتوي على:

* **Status Line** → تحتوي على كود الحالة والرسالة (مثل 200 OK)

* **Headers** → معلومات عن الخادم أو الملف

* **Body** → يحتوي على البيانات أو محتوى صفحة الويب

🧾 **مثال على استجابة HTTP:**

```bash
HTTP/1.1 200 OK
Date: Sun, 12 Oct 2025 20:00:00 GMT
Server: Apache/2.4.52
Content-Type: text/html
Content-Length: 1024

<html>
  <body>
    <h1>Welcome to Example Website</h1>
  </body>
</html>
```

***

🧱 **أنواع ترويسات HTTP (HTTP Headers)**

📩 **ترويسات الطلب (Request Headers)**

| الاسم               | الوصف                                                   |
| ------------------- | ------------------------------------------------------- |
| **Host**            | يحتوي على عنوان الخادم الهدف أو اسم النطاق.             |
| **User-Agent**      | يحتوي على معلومات عن الجهاز أو المتصفح المستخدم.        |
| **Connection**      | يحدد ما إذا كان يجب الحفاظ على الاتصال بعد الطلب أم لا. |
| **Referer**         | الصفحة التي تم إرسال الطلب منها.                        |
| **Accept-Language** | اللغات التي يدعمها العميل.                              |
| **Accept-Encoding** | أنواع الضغط/الترميز التي يدعمها العميل.                 |
| **Accept**          | أنواع البيانات التي يقبلها العميل من الخادم.            |
| **Cookie**          | يحتوي على بيانات الجلسة أو المصادقة.                    |
| **Content-Length**  | حجم بيانات الطلب (Body).                                |
| **Content-Type**    | نوع البيانات المُرسلة (مثل: application/json).          |

📤 **ترويسات الاستجابة (Response Headers)**

| الاسم          | الوصف                                        |
| -------------- | -------------------------------------------- |
| **Date**       | تاريخ ووقت إرسال الاستجابة.                  |
| **Location**   | يُستخدم في عمليات إعادة التوجيه (Redirects). |
| **Set-Cookie** | يُستخدم لإنشاء أو تحديث الكوكيز.             |
| **Server**     | يحتوي على معلومات عن خادم الويب.             |

***

🧭 **أنواع طلبات HTTP (HTTP Methods)**

| الطريقة     | الوصف                                             |
| ----------- | ------------------------------------------------- |
| **GET**     | جلب البيانات من الخادم — بدون جسم (Body).         |
| **POST**    | إرسال بيانات إلى الخادم (مثل النماذج أو الملفات). |
| **HEAD**    | مثل GET ولكن بدون جسم، يُستخدم للتحقق فقط.        |
| **OPTIONS** | يعرض الطرق المسموح بها على الخادم.                |
| **PUT**     | إنشاء أو استبدال بيانات موجودة.                   |
| **PATCH**   | تحديث جزء من مورد موجود.                          |
| **DELETE**  | حذف بيانات من الخادم.                             |

🔸 **الاستخدام الشائع:**

* **GET و POST** → في تطبيقات الويب.

* **PUT و PATCH و DELETE** → في واجهات **APIs**.

***

📊 **رموز استجابات HTTP (HTTP Response Codes)**

| الفئة   | المعنى                  |
| ------- | ----------------------- |
| **1xx** | معلومات أو حالة معالجة. |
| **2xx** | نجاح العملية.           |
| **3xx** | إعادة توجيه.            |
| **4xx** | أخطاء من جانب العميل.   |
| **5xx** | أخطاء من جانب الخادم.   |

**أشهر رموز الحالة:**

| الكود                         | المعنى                              |
| ----------------------------- | ----------------------------------- |
| **200 OK**                    | تم تنفيذ الطلب بنجاح.               |
| **302 Found**                 | تم العثور على المورد (إعادة توجيه). |
| **400 Bad Request**           | صيغة الطلب غير صحيحة.               |
| **403 Forbidden**             | الوصول مرفوض – لا توجد صلاحية.      |
| **404 Not Found**             | المورد غير موجود.                   |
| **500 Internal Server Error** | خطأ داخلي في الخادم.                |

