
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1764299892483/44fb1eb2-7315-4001-973a-bd7a5a3edb2b.png" alt="" align="center" fullwidth="true" />

### 1. 🔍 ال Join in Backround (AAA - Kerberos)

هذا الجزء يوضح المفاهيم الأساسية التي تحدث عند انضمام الجهاز إلى النطاق والاتصال بخادم النطاق (Domain Controller) الذي يستخدم خدمة Kerberos للتصديق.

| **المفهوم**           | **المعنى (مكتوب بالعربية في الصورة)** | **الشرح**                                                                                                                                                                                          |
| --------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1- Authentication** | `user,Pass`                           | **التصديق:** التحقق من هوية المستخدم باستخدام اسم المستخدم وكلمة المرور. يتم إرسال هذه البيانات إلى خادم النطاق.                                                                                   |
| **2- Authorization**  | `سماح بالمرور`                        | **التفويض:** تحديد ما إذا كان المستخدم المصادق عليه لديه الإذن للوصول إلى المورد المطلوب (مثل الانضمام إلى النطاق).                                                                                |
| **3- Accounting**     | `جاي ليه`                             | **المحاسبة/التتبع:** تسجيل الأحداث، مثل متى دخل المستخدم أو ما الذي قام بالوصول إليه (يساعد في تتبع نشاط المستخدمين).                                                                              |
| **AAA**               |                                       | اختصار لـ **Authentication, Authorization, Accounting**. هذا هو الإطار العام لخدمات الأمان والوصول.                                                                                                |
| **Kerberos**          |                                       | هو البروتوكول الأساسي الذي تستخدمه بيئات ويندوز للنطاق (Active Directory) لإجراء التصديق الآمن. يظهر دوره في الاتصال بين الجهاز العميل (PC-Client) وخادم النطاق (`192.168.1.2`, `Test.local PDC`). |

#### تفاصيل الاتصال:

* **PC-Client:** جهاز العميل بعنوان $192.168.1.3$.

* **Domain\_Name:** اسم النطاق.

* **Kerberos:** يقع على خادم النطاق الرئيسي (PDC - Primary Domain Controller) بعنوان $192.168.1.2$.

### 2. 🔑 طرق تسجيل الدخول للنطاق (Login Domain)

هناك طريقتان شائعتان لتسجيل الدخول إلى النطاق عبر شاشة **Other user**:

#### أ. طريقة NetBIOS (اسم النطاق القديم)

* **الصيغة المستخدمة:** `DomainName\Username`

* **المثال الظاهر:** `Test\username`

* **الشرح:** يتم استخدام اسم النطاق القصير (NetBIOS name) متبوعًا بشرطة مائلة عكسية (`\`) ثم اسم المستخدم. هذه طريقة قديمة لكنها لا تزال مدعومة.

* **Sign in to:** تظهر اسم النطاق القصير (`Test`).

#### ب. طريقة FQDN (Fully Qualified Domain Name) - UPN

* **الصيغة المستخدمة:** `Username@DomainName.local` (تسمى UPN - User Principal Name)

* **المثال الظاهر:** `username@Test.local`

* **الشرح:** يتم استخدام اسم المستخدم متبوعًا بالرمز `@` ثم اسم النطاق الكامل (مثل البريد الإلكتروني). هذه هي الطريقة المفضلة والأكثر حداثة.

* **Sign in to:** تظهر اسم النطاق الكامل (`Test.local`).

### 3. 🖥️ طريقة تسجيل الدخول للجهاز المحلي (Login local Machin)

هذا الجزء يوضح كيفية تسجيل الدخول إلى الحسابات المحلية على نفس الجهاز، بدلاً من استخدام حساب النطاق.

* **الصيغة المستخدمة:** `.\Username` أو `ComputerName\Username`

* **المثال الظاهر:** `.`

* **الشرح:**

  * عند إدخال نقطة (`.`) فقط في حقل اسم المستخدم، فإن ويندوز يفترض أنك تحاول تسجيل الدخول إلى حساب محلي موجود على هذا الجهاز.

  * بدلاً من ذلك، يمكن استخدام اسم الكمبيوتر (في المثال `WIN-1`) متبوعًا بشرطة مائلة عكسية ثم اسم المستخدم المحلي (مثال: `WIN-1\LocalAdmin`).

* **Sign in to:** تظهر اسم الجهاز المحلي (`WIN-1`).

* **السؤال الختامي:** `How do I sign in to another domain?` يذكر المستخدم بضرورة تحديد النطاق إذا كان هناك نطاقات متعددة متاحة.

***

***

***

### 1. 🔍 **Joining a Domain in the Background (AAA – Kerberos)**

This section explains the core concepts involved when a device joins a domain and communicates with a **Domain Controller (DC)** using **Kerberos authentication**.

| Concept            | Meaning        | Explanation                                                                                                        |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Authentication** | user, pass     | Verifying the user’s identity using a username and password. These credentials are sent to the domain controller.  |
| **Authorization**  | Access granted | Determines whether the authenticated user has permission to access the requested resource (e.g., join the domain). |
| **Accounting**     | Who did what   | Logs events such as when the user logged in or what resources they accessed. Helps track user activity.            |

**AAA** = **Authentication, Authorization, Accounting** → the general framework for security and access services.

**Kerberos** is the core protocol used in Windows environments for secure domain authentication. It mediates communication between the client machine and the domain controller.

**Connection Details:**

* **PC-Client:** 192.168.1.3

* **Domain Name:** Test.local

* **Kerberos Server / PDC:** 192.168.1.2

***

### 2. 🔑 **Domain Login Methods**

Two common ways to log in to a domain via the **Other User** screen:

**A. NetBIOS (Legacy Domain Name)**

* **Format:** `DomainName\Username`

* **Example:** `Test\username`

* **Explanation:** Uses the short NetBIOS domain name followed by a backslash () and the username. Older method but still supported.

* **Sign in to:** Shows the short domain name (`Test`).

**B. FQDN (Fully Qualified Domain Name) – UPN (User Principal Name)**

* **Format:** `Username@DomainName.local`

* **Example:** `username@Test.local`

* **Explanation:** Uses the username followed by `@` and the full domain name. Modern and preferred method.

* **Sign in to:** Shows the full domain name (`Test.local`).

***

### 3. 🖥️ **Local Machine Login**

This explains how to log in using **local accounts** on the same machine rather than domain accounts.

* **Format:** `.\Username` or `ComputerName\Username`

* **Example:** `.`, or `WIN-1\LocalAdmin`

* **Explanation:**

  * Entering a single dot (`.`) assumes login to a **local account** on the current machine.

  * Alternatively, you can use the computer name (e.g., `WIN-1`) followed by a backslash and the local username (`WIN-1\LocalAdmin`).

* **Sign in to:** Shows the local machine name (`WIN-1`).

**Final Reminder:**

> **How do I sign in to another domain?**\
> Make sure to specify the domain if multiple domains are available.

