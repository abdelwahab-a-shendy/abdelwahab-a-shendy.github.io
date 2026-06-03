
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1764300125671/b686815c-6d2e-4f72-8c48-5c73eae145c5.png" alt="" align="center" fullwidth="true" />

# تنقسم الصورة إلى قسمين رئيسيين: حالة الجهاز قبل الانضمام وحالته بعد الانضمام.

## 1. 🟢 قبل الانضمام إلى النطاق (Before Join Domain)

عندما يكون الجهاز يعمل كمجموعة عمل (Workgroup) أو بشكل مستقل:

* **المستخدمون المحليون (Users):** يتم إدارة المستخدمين عبر مجموعات المستخدمين المحلية (**Local Group**) على الجهاز نفسه.

* **مجموعة المسؤولين المحلية (Local Administrator Group):** هذه المجموعة هي التي تمنح أعلى الصلاحيات على الجهاز.

  * عادةً ما تحتوي على:

    * حساب **Administrator** (قد يكون معطّلًا افتراضيًا: `disable`).

    * حساب المستخدم المحلي الذي تم إنشاؤه أثناء تثبيت النظام (`Localadmin`).

**الخلاصة:** الصلاحيات والوصول تتم إدارتها بشكل حصري ومحلي على الجهاز `Win-PC`.

## 2. 🔴 بعد الانضمام إلى النطاق (After Join Domain)

بعد انضمام الجهاز `Win-PC` إلى النطاق `Test.local` (الذي تتم إدارته عبر خادم PDC):

#### أ. التغيير في إدارة المستخدمين على الجهاز المحلي:

* **مجموعة المسؤولين المحلية (Local Administrator Group):** تظل قائمة، لكن يتم إضافة أعضاء جدد إليها من النطاق.

* **إضافة مجموعات النطاق (Domain Groups):** يتم ربط مجموعات النطاق بمجموعات الجهاز المحلي:

  * `Test\DomainUsers`: هي مجموعة المستخدمين العامة في النطاق `Test.local`.

  * يُحتمل أن يتم إضافة مجموعة `Domain Users` إلى مجموعة **Users المحلية** على الجهاز، مما يسمح لأي مستخدم في النطاق بتسجيل الدخول إلى الجهاز، ولكن بصلاحيات مستخدم عادي فقط.

#### ب. الإجراءات التي يقوم بها النطاق (PDC):

يُظهر المربع السفلي الأخضر ثلاث خطوات أساسية تحدث على خادم النطاق (PDC):

1. **Created a Computer Account With The Computers Container in AD:**

   * يتم إنشاء حساب كمبيوتر جديد باسم `Win-ComputerName` ضمن حاوية **Computers** في خدمة دليل النطاق (Active Directory - AD). هذا الحساب هو الذي يمثل الجهاز على الشبكة.

2. **Domain Users Group a member of Local Users Group:**

   * يتم جعل مجموعة **Domain Users** (مستخدمو النطاق) عضوًا في مجموعة **Users المحلية** على جهاز `Win-PC`.

   * **النتيجة:** يمكن لجميع مستخدمي النطاق تسجيل الدخول واستخدام الجهاز، لكن بصلاحيات محدودة (صلاحيات مستخدم عادي)، ما لم يتم ترقيتهم.

3. **Domain Admins Group is a member of Local Administrators Group:**

   * يتم جعل مجموعة **Domain Admins** (مسؤولو النطاق) عضوًا في مجموعة **Local Administrators Group** (مجموعة المسؤولين المحلية) على جهاز `Win-PC`.

   * **النتيجة:** يمكن لأي مسؤول نطاق التحكم بالجهاز بشكل كامل (صلاحيات المسؤول)، حتى لو لم يكن لديه حساب محلي على الجهاز.

***

***

***

# The diagram is divided into **two main sections**: the device state **before joining** and **after joining** a domain.

## 1. 🟢 **Before Joining a Domain**

When the device operates as a **workgroup** or **standalone**:

* **Local Users:** Managed through the device’s **Local User Groups**.

* **Local Administrator Group:** This group has the **highest privileges** on the machine.

Typically contains:

* **Administrator account** (may be **disabled** by default)

* **Local user account** created during system installation (e.g., `Localadmin`)

**Summary:**\
All permissions and access are **managed locally** on the Win-PC.

***

## 2. 🔴 **After Joining a Domain**

After the Win-PC joins the domain **Test.local**, managed by the **PDC (Primary Domain Controller)**:

**A. Changes in Local User Management:**

* **Local Administrator Group:** Remains, but **new members** from the domain are added.

* **Domain Groups:** Domain groups are linked to local groups on the PC:

  * `Test\DomainUsers` → general users in the domain.

  * `Domain Users` group may be added to the local `Users` group → allows **any domain user** to log in with **standard user privileges**.

**B. Actions Performed by the Domain (PDC):**\
The green box shows **three key steps** executed by the PDC:

1. **Created a Computer Account within the Computers container in AD:**

   * A new computer account `Win-ComputerName` is created in the **Computers container** of Active Directory (AD).

   * This account represents the device on the network.

2. **Domain Users Group as a member of Local Users Group:**

   * The **Domain Users** group is added to the **local Users group** on Win-PC.

   * Result: All domain users can log in with **limited privileges** unless elevated.

3. **Domain Admins Group as a member of Local Administrators Group:**

   * The **Domain Admins** group is added to the **local Administrators group** on Win-PC.

   * Result: Any domain admin can **fully control the device**, even without a local account.

