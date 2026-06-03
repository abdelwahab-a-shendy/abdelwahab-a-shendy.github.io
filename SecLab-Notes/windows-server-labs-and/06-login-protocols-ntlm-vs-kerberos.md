
#### الإنترنت مبني على مبدأ **Client / Server**:

* ال **Client (العميل)**: هو التطبيق اللي المستخدم بيستعمله عشان يوصل لخدمة معينة زي متصفح كروم أو أي أبلكيشن.

* ال **Server (الخادم)**: هو التطبيق اللي بيقدّم الخدمة زي Web Server أو Email Server.

عشان تحصل على خدمة معينة، لازم تمر بعمليتين أساسيتين:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963238897/1ed3df69-0c61-4ba5-840f-f1faecdb6db2.png" align="center" fullwidth="false" />

#### ال Authentication And Authorization :

1. ال **Authentication (المصادقة)**:\
   هي المرحلة اللي الـ Services (الخدمات) تتأكد فيها من هوية المستخدم. أبسط صورة ليها: **Username + Password** (وده اسمه User Credential).

2. ال **Authorization (التفويض/التخويل)**:\
   هي الإجراءات أو الصلاحيات اللي المستخدم يقدر يعملها بعد ما يتأكدوا من هويته.

   * مثال: مستخدم الـ Email Server يقدر يشوف بريده فقط.

   * بينما الـ Admin يقدر يضيف مستخدمين جداد.

💡 الصلاحيات (Authorization) مرتبطة بالـ Services نفسها وبيتم تخزينها في قاعدة بيانات الخدمة :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963258762/82beae37-e704-482f-ad7e-1b32241ff9cc.png" align="center" fullwidth="false" />

***

## أنواع الـ Authentication

### اولا Basic Authentication (Form-based)

* معناها: الـ Credential (اسم المستخدم + كلمة المرور) بتتبعت كقيم فعلية (Plain).

* عشان كده لازم تكون القناة بين الـ Client والـ Service **مشفّرة** → لذلك بيتم استخدام **HTTPS**.

  * علشان لو فيه Attackers في الوسط (MITM)

* اتسمت "Form-based" لأنها عادةً بتكون داخل فورم (نموذج).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963268280/a85b1a58-a39c-4588-81d8-5779e5bf38fe.png" align="center" fullwidth="false" />

***

### 2. Network Authentication

* تخيّل موظفين في مؤسسة بيستخدموا خدمات متعددة يوميًا (Email, Login, Apps...).

* لو كل خدمة ليها Username & Password مختلفين → هيبقى المستخدم محتاج يحفظ عدد كبير جدًا.

* عشان كده ظهر مفهوم **Authentication Server**:

  * قاعدة بيانات مركزية بتحتوي على كل المستخدمين.

  * بيقدم خدمات: التحقق من User Credential + إدارة الحسابات.

  * في Windows → اسمه **Active Directory (AD)**.

💡 أحيانًا السيرفر نفسه محتاج يتصل بسيرفر تاني (زي Web Server يستخدم Database Server).

* في الحالة دي السيرفر بيكون عنده Credential خاصة بيه اسمها **Service Account**.

المستخدم أو السيرفر اللي بيطلب الخدمة بنسميه **Principal**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963277760/2feae4fc-f52b-4018-b18f-80776eb045b3.png" align="center" fullwidth="false" />

***

## Shared Secret Concept

الفكره هنا ممكن تحل لينا المشكله

> افترض معايا ان فيه شخصين عرفين سر معين و عايزين يتاكدو انهم فعلا عارفين السر ده من غير ما كل الناس اللي سمعاهم يعرفو اي هو السر ده

فكرة أساسية لحل مشكلة تبادل كلمة المرور:

* شخصين عندهم سر مشترك.

* الشخص الاول يبعت للتاني يطلب منه تحديد (قيمة عشوائية).

* الشخص التاني رد عليه بكلمه عشوائيه يحتفظ بيها عندو (YYYZZZTTT)

* الشخص الاول يشفر القيمة (YYYZZZTTT) و يضيف عليه السر الل بينهم

  * ال (ٍSec=MD5+Value Pass)

* الشخص التاني بيقوم بنفس العمليه للحصول علي الناتج .

* لو النتيجة متطابقة → الاتنين متأكدين إنهم عارفين السر.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963296108/5fac1153-9d95-4469-9ef1-56dfadf6c1dd.png" align="center" fullwidth="true" />

> و في الحاله دي كل الناس اللي سمعوهم مش هيعرفو السر . (الفكرة دي أساس NTLM وKerberos).

***

## NTLM Authentication Protocol

**NTLM = NT LAN Manager**

* بروتوكول مصادقة طورته مايكروسوفت مرتبط بالـ Active Directory.

* **الفكرة**:

  1. المستخدم يطلب من الService بتسجيل الدخول.

  2. السيرفر يرد بكلمه عشوائية تسمي ال (Nonce OR Challenge).

  3. المستخدم يقوم بالعمليه الحسابيه يشفر التحدي باستخدام الباسورد و يبعتها الي الService .

  4. الService بدورها بتقوم ب ارسال Nonce المحتفظه بيها مع الShared Sec المرسلة من المستخدم الي ال Authentication Server و تسمي ب ال Path Through Authentication

  5. ال Authentication Server بيقوم بنفس العمليه و بيتاكد من المستخدم و ارسال الناتج الي الService (اما المستخدم صحيح او غير صحيح)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963312237/78eba776-b40a-4267-9a66-b01a9c645942.png" align="center" fullwidth="false" />

📌 ملاحظات على NTLM:

1. قديم ومايكروسوفت لسه بتدعمه للتوافق مع الأنظمة القديمة.

2. بطيء نسبيًا → كل مرة لازم السيرفر يتصل بالـ Domain Controller.

3. **المشكلة الأمنية**:

   * السيرفر يتأكد من المستخدم، لكن المستخدم ما يقدرش يتأكد إن السيرفر أصلي. (ممكن هجوم "خدمة مزيفة").

4. لو المستخدم بيستخدم Service تانيه فابالتالي صعب يستخدم مفهوم ال **Single Sign-On (SSO)** لان ال Service التانيه هتحتاج تقوم بنفس العمليه للتاكد من المستخدم .

   1. بس ممكن تتحقق في نقطه واحده بس لو نظام التشغيل الخاص بالمستخدم عمل Caching ل user , pass علشان يستخدم للدخول عل Service تانيه

5. بيعتمد فقط على كلمة المرور (مافيش Smart Cards أو Biometric).

6. مافيش Delegation (التفويض).

***

## Kerberos Protocol

* مبني على مبدأ 3 أطراف: **Client – Server – Authentication Server**.

* الاسم جاي من الكائن الأسطوري "Cerberos" برؤوس 3.

* بيحل مشاكل NTLM , ازاي ؟

  * تخيل معايا الاتي :

    * عندك شخصين => A , B => كل واحد فيهم معاه مفتاح , و معانا شخص ثالث C

    * ال C ده معاه نسخه من كل المفاتيح

    * و عندنا A , B محتاجين يتعاملو مع بعض , فا محتاجين من C انه يبعتلهم مفتاح مشترك يستخدموه ما بينهم من غير ما حد فيهم يعرف المفتاح الاساسي للتاني .

    * البدايه من A

      * هيبعت ل C يطلب منه مفتاح مشترك مع B

    * اخونا ال C

      * هيعمل مفتاح جديد عشوائي و يعمل منه نسختين

        * النسخه الأولى هيحطها في صندوق و هيقفل عليها بالمفتاح الخاص ب B

        * النسخه الثانية هتتحط في صندوق الخاص ب B داخل صندوق اكبر و يقفل عليها بالمفتاح الخاص ب A و بعدها يبعت الصندوق الي A

    * و في الحاله دي A الوحيد اللي قادر يعرف محتوي الصندوق بالشكل ده :

    * ال

      <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963333262/67b1f415-8fff-454d-b904-69eb0f5b7d78.png" align="center" fullwidth="false" />

    * اخونا A :

      * هفتح الصندوق و ياخد النسخه الخاصه بالمفتاح المشترك بينه و بين B

      * ال

        <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963376860/02c6e212-fb40-4106-afc3-0a19d9f2fb95.png" align="center" fullwidth="false" />

      * بعدها A هيكتب رساله يعرف فيها هو مين و يقفلها في صندوق بالمفتاح المشترك مع B :

        <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963389481/c1ad47a8-38da-4ec0-a79c-000b354f267d.png" align="center" fullwidth="false" />

    * بعدها بيعمل ارسال ل B

      * بما ان B هو الوحيد اللي يعرف محتوي الصندوق الخاص بيه و هو من الاساس المرسل من C هيقدر يوصل للمفتاح المشترك مع A

      * و بستخدم المفتاح المشترك هيقدر يفتح الصندوق الخاص ب A و يتاكد منه, لانه في الحاله دي هو الوحيد اللي قادر يستخدم المفتاح المشترك ما بينهم .

      * ال

        <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963398813/f507656a-bcc1-49d8-848e-2b16743bb288.png" align="center" fullwidth="false" />

      * في النهايه حصلنا علي مفتاح مشترك بين A , B

  * وبكده حصلت عملية Authentication بينهم من غير ما يلجؤوا لـ C مرة أخرى.

### تطبيق المبدأ:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963408809/f315d7f0-1db9-4d16-a941-11fdef2406ed.png" align="center" fullwidth="false" />

* الـ Authentication Server في Kerberos اسمه: **KDC (Key Distribution Center)**.

* الـ Credential بتكون: **Tickets** بدل الـ Password المباشرة.

* أول تذكرة: **TGT (Ticket Granting Ticket)** → بتسمح لك تطلب خدمات تانية من غير ما تدخل الباسورد تاني.

* الـ KDC ينشئ مفتاح جلسة مؤقت اسمه **Session Key**

  * (له صلاحية محدودة بالوقت و تاريخ معين و ليه تاريخ انتهاء صلاحيه).

📌 خطوات مبسطة:

1. المستخدم يطلب تذكرة من الـ KDC , تسمح ليه ب استخدام XYZ Service

2. الـ KDC بدورها ينشئ مفتاح عشوائي جديد اسمو الSession Key

3. و بعدها هيقوم بتشفير الSession Key بستخدام المفتاح الدائم لل Server XYZ و اللي هو عباره عن كلمه المرور الخاصه بال Service Account الخاصه ب ال XYZ Service , بالاضافه الي المفتاح مره تاني بدون تشفير

4. بعد كده هيشفر الرساله كلها ب استخدام المفتاح الدائم للمستخدم => pass User

5. بعدها هيبعت الرساله للمستخدم مشفر بباسورد المستخدم.

   1. ال

      <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963428704/c84081b8-7fd4-4bf6-8f51-27c990c768c3.png" align="center" fullwidth="false" />

6. المستخدم بعدها هيقدر يفك التشفير للرساله ويحصل على الـ Session Key و يحتفظ بيها.

   1. ال

      <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963445313/743f9ac0-6581-42dc-b63c-20ed12cbb5e8.png" align="center" fullwidth="false" />

7. بعدها هيقدر يستخدم ال Ticket و يبعتها ل XYZ Service لاستخدامها .

   1. ال XYZ Service هتقدر تفك تشفير Ticket و تحصل علي ال Session Key

   2. ال

      <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963457170/e5832b13-c0f7-47b2-b1dd-a4feccc4ac5c.png" align="center" fullwidth="false" />

* ال XYZ Service هتقدر تحتفظ ب ال Session Key عندها لاستخدمها في اي عمليه Authentication خاصه بالمستخدم

* بعدها هتبعت للمستخدم ال Ticket بتاعته صحيحه في رساله مشفره

> كده عمليه ال Authentication تمت .

***

## مميزات Kerberos

1. ال **Single Sign-On (SSO):** موجودة بفضل الـ TGT.

2. ال **Security أعلى:**

   * المستخدم يتأكد إن السيرفر أصلي (لأن الـ Ticket مشفرة بباسورد السيرفر).

3. ال **Delegation:** السيرفر يقدر يستخدم خدمة تانية نيابةً عن المستخدم.

4. **دعم Multi-factor Auth:** زي Smart Cards وبصمة الإصبع.

5. ال **Performance أعلى:** بفضل Session Keys.

6. ال **Time Synchronization:** لازم الكل (Client – Server – KDC) يكونوا متزامنين بالوقت.

***

## مقارنة (Basic vs NTLM vs Kerberos)

| النقطة               | Basic                           | NTLM                                   | Kerberos                      |
| -------------------- | ------------------------------- | -------------------------------------- | ----------------------------- |
| Performance          | أبطأ                            | متوسط (بطيء نسبيًا)                    | أسرع                          |
| Security             | ضعيفة (الباسورد مكشوفة للسيرفر) | متوسطة (المستخدم ما يتأكدش من السيرفر) | عالية (Mutual Authentication) |
| SSO                  | غير مدعوم                       | محدود جدًا                             | مدعوم                         |
| MFA (بصمة/كروت ذكية) | غير مدعوم                       | غير مدعوم                              | مدعوم                         |
| Delegation           | غير مدعوم                       | غير مدعوم                              | مدعوم                         |
| Time Sync            | غير مطلوب                       | غير مطلوب                              | مطلوب                         |

***

***

***

## The Internet is built on the **Client / Server** model :

* **Client:** The application that the user uses to access a certain service, such as Chrome browser or any application.

* **Server:** The application that provides the service, such as a Web Server or Email Server.

To get a specific service, you must go through two main processes:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761962672642/2ecdf015-93b2-4d7a-96a9-bd816dc53025.png" align="center" fullwidth="false" />

## Authentication And Authorization :

1. **Authentication:**\
   This is the stage where the Services verify the user's identity. The simplest form of it: **Username + Password** (called User Credential).

2. **Authorization:**\
   These are the actions or permissions that the user can perform after verifying their identity.

   * Example: The Email Server user can only view their own mailbox.

   * While the Admin can add new users.

💡 Permissions (Authorization) are related to the Services themselves and are stored in the service’s database.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761962706887/c368fe23-bc6e-4c21-a5a0-785ce3abae01.png" align="center" fullwidth="false" />

***

## Types of Authentication

### 1. Basic Authentication (Form-based)

* Meaning: The Credential (username + password) is sent as actual (plain) values.

* Therefore, the channel between the Client and the Service must be **encrypted** → so **HTTPS** is used.

  * To prevent attackers in the middle (MITM).

* It’s called "Form-based" because it’s usually included inside a form.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963192488/7565a0eb-4696-4344-8ebd-be4bd4b69380.png" align="center" fullwidth="false" />

***

### 2. Network Authentication

* Imagine employees in an organization using multiple services daily (Email, Login, Apps…).

* If each service has a different Username & Password → users would need to remember too many credentials.

* That’s why the concept of an **Authentication Server** appeared:

  * A centralized database that contains all users.

  * Provides services: verifying user credentials + managing accounts.

  * In Windows → it’s called **Active Directory (AD)**.

💡 Sometimes, the server itself needs to connect to another server (like a Web Server using a Database Server).

* In that case, the server has its own credential called a **Service Account**.

The user or server requesting the service is called the **Principal**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963176024/f83b10b0-777d-4c7c-b07b-89d8c5d5d3b2.png" align="center" fullwidth="false" />

***

## Shared Secret Concept

This idea can solve the problem:

> Imagine two people know a shared secret and want to verify they both know it — without letting others listening know what the secret is.

Basic idea to solve the password exchange problem:

* Two people share a common secret.

* The first person asks the second for a random value.

* The second person replies with a random word they keep (YYYZZZTTT).

* The first person encrypts that random value (YYYZZZTTT) and combines it with the shared secret.

  * (Sec = MD5 + Value Pass)

* The second person performs the same operation to get the result.

* If the results match → both are sure they know the shared secret.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963159124/3340912c-a719-44e8-b147-5745093c84b4.png" align="center" fullwidth="false" />

> In that case, everyone who heard them won’t know the secret.\
> (This idea is the foundation of NTLM and Kerberos.)

***

## NTLM Authentication Protocol

**NTLM = NT LAN Manager**

* An authentication protocol developed by Microsoft and related to Active Directory.

* **Concept:**

  1. The user requests to log in to the Service.

  2. The server replies with a random word called the (Nonce or Challenge).

  3. The user performs a calculation, encrypts the challenge using the password, and sends it to the Service.

  4. The Service then sends the stored Nonce along with the user’s shared secret to the Authentication Server — this is called **Pass-Through Authentication**.

  5. The Authentication Server performs the same operation, verifies the user, and returns the result to the Service (valid or invalid user).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963143367/3f21a4aa-ccdb-497d-856a-309f275fedd2.png" align="center" fullwidth="false" />

📌 Notes on NTLM:

1. Old, but Microsoft still supports it for backward compatibility.

2. Relatively slow → every time the server must contact the Domain Controller.

3. **Security issue:**

   * The server can verify the user, but the user cannot verify that the server is legitimate (possible “fake service” attack).

4. If the user accesses another Service, the **Single Sign-On (SSO)** concept is hard to apply because the new Service must repeat the process to verify the user.

   1. But it can work in one case if the operating system caches the user and password for reuse.

5. Relies only on passwords (no Smart Cards or Biometric).

6. No Delegation.

***

## Kerberos Protocol

* Based on a 3-party model: **Client – Server – Authentication Server**.

* The name comes from the mythological creature “Cerberos” with 3 heads.

* Solves NTLM’s problems — how?

  * Imagine this:

    * Two people: A and B — each has a private key.

    * There’s a third person, C, who holds copies of both keys.

    * A and B need to communicate securely, so they ask C to send them a shared key without revealing each other's private keys.

    * A sends a request to C for a shared key with B.

    * C creates a new random shared key and makes two copies:

      * One copy locked with B’s key.

      * The second copy placed inside a box with B’s copy, locked with A’s key, and sent to A.

    * A can open their box and get the shared key for communication with B.

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963010033/3cf487d5-c98b-4d27-ab7d-27812db1d0ab.png" align="center" fullwidth="false" />

    * A then writes a message identifying themselves, encrypts it using the shared key, and sends it to B.

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963013030/99934b97-f244-44af-bcab-ea029e37a50a.png" align="center" fullwidth="false" />

    * B can open their box (using their key from C) to retrieve the shared key.

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963036967/dd46b08b-265b-4e65-a46c-6e344d986869.png" align="center" fullwidth="false" />

    * Using the shared key, B decrypts A’s message and verifies their identity — since only A could have sent it.

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963006827/a070552c-7f3f-4e7e-a5e1-ff407df06ea8.png" align="center" fullwidth="false" />

    * Finally, A and B now share a secret key securely.

  * This way, Authentication occurs between them without going back to C again.

### Applying the concept:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761963120993/52c821a8-0bbb-452b-8d74-13e9ea567988.png" align="center" fullwidth="false" />

* The Authentication Server in Kerberos is called **KDC (Key Distribution Center)**.

* The Credential is in the form of **Tickets** instead of direct passwords.

* The first ticket is the **TGT (Ticket Granting Ticket)** → allows requesting other services without re-entering the password.

* The KDC creates a temporary session key called **Session Key**

  * (It has a specific validity period and expiration time.)

📌 Simplified steps:

1. The user requests a ticket from the KDC to access the XYZ Service.

2. The KDC creates a random new key called the Session Key.

3. Then encrypts the Session Key using the permanent key of the XYZ Service (its Service Account password), and also includes the plain version.

4. Then encrypts the whole message using the user’s permanent key (user password).

5. Sends the encrypted message back to the user.

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761962928004/5c230b92-b18e-4348-85c7-a5ef8e92525a.png" align="center" fullwidth="false" />

6. The user decrypts the message, obtains the Session Key, and stores it.

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761962883509/6c302634-1948-4440-ab6a-7dce6c1fc83b.png" align="center" fullwidth="false" />

7. The user then sends the Ticket to the XYZ Service for use.

   1. The XYZ Service decrypts the Ticket, retrieves the Session Key.

* <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761962858785/8780c0b1-7255-4e52-bfc4-7fb84e3bd27f.png" align="center" fullwidth="false" />

  The XYZ Service keeps the Session Key for any future authentication operations for that user.

* Then it sends back a confirmation message encrypted with the Session Key.

> The Authentication process is now complete.

***

## Advantages of Kerberos

1. **Single Sign-On (SSO):** Supported via TGT.

2. **Higher Security:**

   * The user verifies that the server is legitimate (Ticket encrypted with server’s password).

3. **Delegation:** The server can access other services on behalf of the user.

4. **Supports Multi-factor Authentication:** Smart Cards, fingerprints, etc.

5. **Better Performance:** Thanks to Session Keys.

6. **Time Synchronization:** All parties (Client – Server – KDC) must have synchronized clocks.

***

## Comparison (Basic vs NTLM vs Kerberos)

| Point                         | Basic                             | NTLM                               | Kerberos                     |
| ----------------------------- | --------------------------------- | ---------------------------------- | ---------------------------- |
| Performance                   | Slowest                           | Moderate (relatively slow)         | Fastest                      |
| Security                      | Weak (password visible to server) | Medium (user cannot verify server) | High (Mutual Authentication) |
| SSO                           | Not supported                     | Very limited                       | Supported                    |
| MFA (Smart Cards/Fingerprint) | Not supported                     | Not supported                      | Supported                    |
| Delegation                    | Not supported                     | Not supported                      | Supported                    |
| Time Sync                     | Not required                      | Not required                       | Required                     |

