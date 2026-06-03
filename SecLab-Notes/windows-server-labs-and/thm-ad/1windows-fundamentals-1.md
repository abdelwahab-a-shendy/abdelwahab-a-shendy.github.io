
## Introduction to Windows :

### 📌 Translation and Explanation:

* **Windows OS**: A complex operating system that includes many files, settings, tools, and features.

* The goal of this **Module**: to give you an overview of some basic concepts in Windows → how to interact with the interface and change simple settings.

* To start the practical part: click the **Start Machine** button.

* The virtual machine (VM) will appear in the browser.

* You can also access it via **Remote Desktop (RDP)** using the following credentials:

  * **IP**: MACHINE\_IP

  * **User**: administrator

  * **Password**: letmein123!

* If a Certificate warning appears → click **Accept**.

* Note: The VM may take about 3 minutes to boot.

### 📌 Extracting the Answer:

* The question says: *"Read above and start the virtual machine."*

* It simply means you need to start the virtual machine and be ready for the next questions.

* There’s no written answer here → just **start the VM**. ✅

***

## Windows Editions :

* Windows started in 1985 and is still the dominant system in both homes and companies.

* That’s why it has always been a main target for hackers and malware.

* **XP** was very popular, followed by **Vista**, which quickly failed.

* After the end of support for XP, companies were forced to move to **Windows 7** quickly.

* Then came **Windows 8**, which also didn’t last long.

* Later came **Windows 10**, and now **Windows 11** (the current version).

* Windows 11 has two editions: **Home** and **Pro**.

* The current server used in the lab is **Windows Server 2019 Standard**.

* For Windows 10 → support continues until **October 14, 2025**.

### 📌 Question:

> **What encryption can you enable on Pro that you can't enable in Home?**\
> Meaning:\
> *What type of encryption can you enable in* ***Windows Pro*** *but not in* ***Windows Home****?*

### 📌 Solution:

The main difference between **Home** and **Pro** is:

* **Pro** supports **BitLocker** (for drive encryption).

* **Home** does not have this feature.

✅ **Answer:** `BitLocker`

***

### How to verify yourself that **BitLocker** exists and can be used:

### 🔹 Method via **Control Panel**:

1. Open **Control Panel**.

2. Go to **System and Security**.

3. If you see an option called **BitLocker Drive Encryption** → then your system supports BitLocker.

4. In the **Home** edition, you won’t find this option.

### 🔹 Method via **CMD**:

1. Open **Command Prompt** as Administrator.

2. Type:

   `manage-bde -status`

3. If you see details about the drives and BitLocker status → it’s supported.

4. In the Home edition, it will usually say the tool isn’t supported.

***

## The Desktop (GUI) :

* The **Desktop (Graphical User Interface)** is the screen that appears after logging in (Username + Password).

* You can change its appearance (icons, wallpaper, themes, colors, etc.) from:

  * **Right Click → Display Settings** (to change resolution and multiple screens).

  * **Right Click → Personalize** (to change background, colors, fonts, etc.).

* **Start Menu**:

  * Now appears as the **Windows Logo**, not the word "Start."

  * Divided into sections:

    1. Account settings (Documents, Pictures, Settings, Power…)

    2. Program list (Recently Added + Installed Apps)

    3. Tiles (application squares that can be added or removed)

* **Taskbar**:

  * Shows open or pinned programs.

  * You can change its settings via Right Click.

* **Notification Area**:

  * Bottom right → contains the clock, network, sound, and other icons like the **Action Center**.

  * Controlled through Taskbar settings.

### 📌 Questions + Answers:

1. **Which selection will hide/disable the Search box?**\
   ✅ **Hidden**

2. **Which selection will hide/disable the Task View button?**\
   ✅ **Show Task View button** (disabling it removes it from the taskbar).

3. **Besides Clock and Network, what other icon is visible in the Notification Area?**\
   ✅ **Action Center**

***

## The File System :

* Modern **Windows** uses the **NTFS = New Technology File System**.

* Previously, there were **FAT16/FAT32** and **HPFS**, and you can still see FAT in USB drives or MicroSD cards.

* **NTFS** features:

  * Supports files larger than **4GB**.

  * **Permissions** (access control for files and folders).

  * File/folder compression.

  * Encryption using **EFS (Encrypting File System)**.

* More **NTFS** advantages:

  * **Journaling**: can repair itself after an issue using logs.

  * **Permissions** (Full control, Modify, Read & Execute, etc.).

  * **Alternate Data Streams (ADS):** every file has a primary stream, and ADS adds extra ones. Sometimes malware hides there, but Windows also uses them (e.g., when you download a file, it stores its source in ADS).

### 📌 Question:

> **What is the meaning of NTFS?**

✅ **Answer:** `New Technology File System`

***

## The Windows\System32 Folders :

The **Windows** folder (‎`C:\Windows`‎) is traditionally the directory that contains the Windows operating system.

It’s not necessarily located on the **C** drive; it can be on any drive or even within a different folder.

Here comes the role of **environment variables**, specifically **system environment variables**.\
Even if we haven’t covered them yet, the **system environment variable** for the Windows folder is **%windir%**.

According to Microsoft:

> “Environment variables store information about the operating system environment. This information includes details like the OS path, the number of processors used, and the location of temporary folders.”

Inside the **Windows** directory, there are many subfolders, including:

🔹 **System32**

The **System32** folder contains essential files required for the operating system to function.\
It must be handled with extreme care, as deleting any file or folder inside it by mistake can make Windows unbootable.

📌 Note: Many of the tools covered in the **Windows Fundamentals** series are located in the **System32** folder.

**Answer the questions below**\
**What is the system variable for the Windows folder?**\
✅ %windir%

***

## User Accounts, Profiles, and Permissions :

**User Accounts, Profiles, and Permissions:**

A user account on Windows can be one of two local types:

1. **Administrator**

2. **Standard User**

🔹 The account type determines what the user can do on the system:

* **Administrator**: can make system-wide changes like adding/deleting users, modifying groups, or changing system settings.

* **Standard User**: can only modify their own files/folders and cannot make system-level changes like installing software.

Since you are **logged in as Administrator**, there are several ways to view existing accounts.

One way: open the **Start Menu**, type **Other User**, and select:\
**System Settings > Other users**

Clicking that will show a window with the option:\
**Add someone else to this PC** (not visible to Standard Users).

Clicking a local account displays additional options like **Change account type** and **Remove**.

📌 When a new account is created, a **Profile** is automatically created for it in:\
`C:\Users`

Example: an account named **Max** → its profile path is:\
`C:\Users\Max`

The profile is created upon the first login, showing the **User Profile Service** screen while files are being prepared.\
Then, a dialog box appears confirming that the profile is being set up.

Each profile includes default folders like:

* Desktop

* Documents

* Downloads

* Music

* Pictures

🔹 Another way to view this information: **Local User and Group Management**

* Right-click on Start Menu → choose **Run**

* Type: `lusrmgr.msc`

You’ll see two folders:

* **Users**

* **Groups**

Inside **Groups**, you’ll find local group names with short descriptions.\
Each group has specific permissions, and a user can belong to one or more groups.\
Once added to a group, the user inherits its permissions.

📌 Note: Choosing **Add someone else to this PC** from **Other Users** opens the same **Local Users and Groups Management** tool.

✅ **Answer the questions below**

**What is the name of the other user account?**\
👉 tryhackmebilly

**Correct Answer**

**What groups is this user a member of?**\
👉 Remote Desktop Users, Users

**Correct Answer**

**What built-in account is for guest access to the computer?**\
👉 Guest

**Correct Answer**

**What is the account description?**\
👉 window$Fun1!

**Correct Answer** ✅

***

## User Account Control

**User Account Control (UAC):**

Most home users log into their Windows systems using **local administrator accounts**.\
Remember from the previous section that an **Administrator** can make system-level changes.

However, users don’t need **elevated privileges** for regular activities like browsing or editing documents.\
These high privileges increase the risk of system compromise, as any **malware** will run with the same privileges as the user who can change system settings.

To protect local users, Microsoft introduced **User Account Control (UAC)**.\
It was first introduced in **Windows Vista** (short-lived) and has existed in all later versions.

📌 Note: **UAC** (by default) does not apply to the **built-in local administrator account**.

***

🔹 **How UAC Works:**

* When a user with **Administrator** privileges logs in, the session does not start with full privileges.

* When performing an action that requires higher privileges, a **prompt** appears asking for confirmation to continue.

For example:

* Viewing a program’s **Properties** as the built-in **Administrator**, under the **Security** tab, shows users/groups with permissions — **Standard Users** are not listed.

* If you log in as a **Standard User** and try to install a program (e.g., via **Remote Desktop**), you’ll see a **Shield Icon** on the program.

* This shield means **UAC** will request elevated privileges (like opening Wireshark).

* Double-clicking it triggers a **UAC prompt** showing the built-in **Administrator** name, asking for its password.

* If the password isn’t entered within a certain time, the prompt disappears, and installation is canceled.

This feature greatly reduces the likelihood of successful malware attacks.

✅ **Answer the questions below**

**What does UAC mean?**\
👉 User Account Control

**Correct Answer**

***

## Settings and the Control Panel :

**Settings and the Control Panel**

In Windows systems, the main places for making changes are:

1. **Settings menu**

2. **Control Panel**

🔹 For a long time, **Control Panel** was the main hub for system changes like adding printers or uninstalling programs.

With **Windows 8** (the first tablet-oriented version), **Settings** was introduced and still exists in Windows 10.\
Now, **Settings** has become the primary interface for most user-level changes.

Both (Settings & Control Panel) can be accessed via the **Start Menu**.

📌 Differences:

* **Control Panel**: contains more advanced and detailed system settings.

* **Settings**: covers daily-use settings but sometimes redirects you to **Control Panel**.

Example:

* From **Settings** → **Network & Internet** → **Change adapter options**

* The next window that opens is from **Control Panel**.

If unsure which one to open, you can use **Start Menu** search.\
Example: searching for **wallpaper** → shows limited results, and the best one opens the **Settings** window for changing the background.

✅ **Answer the questions below**

**In the Control Panel, change the view to Small icons. What is the last setting in the Control Panel view?**\
👉 Windows Defender Firewall

**Correct Answer**

***

## Task Manager :

The last topic in this section is **Task Manager**.

**Task Manager** displays information about the currently running applications and processes.\
It also shows performance metrics such as **CPU** and **RAM** usage under the **Performance** tab.

🔹 To open **Task Manager**:

* Right-click on the **taskbar** and select **Task Manager**

By default, **Task Manager** opens in **Simple View**, showing limited information.\
For more details, click **More details**, and the interface will expand with full information.

You can learn more about **Task Manager** from specialized blogs, and study each process in detail from the **Core Windows Processes** room.

✅ **Answer the questions below**

**What is the keyboard shortcut to open Task Manager?**\
👉 Ctrl + Shift + Esc

**Correct Answer**

***

***

***

## Introduction to Windows :

### 📌 الترجمة والشرح:

* ال **Windows OS**: نظام تشغيل معقد فيه ملفات، إعدادات، أدوات، ومزايا كتير.

* الهدف من الـ **Module** ده: يديك نظرة عامة على بعض الحاجات الأساسية في ويندوز → إزاي تتعامل مع الواجهة، وتغير إعدادات بسيطة.

* عشان تبدأ العملي: دوس على زر **Start Machine**.

* الجهاز الافتراضي (VM) هيظهر في المتصفح.

* ممكن كمان تدخل عليه عن طريق **Remote Desktop (RDP)** بالبيانات دي:

  * **IP**: MACHINE\_IP

  * **User**: administrator

  * **Password**: letmein123!

* لو جالك Certificate → اعمل **Accept**.

* خد بالك: الـ VM ممكن ياخد حوالي 3 دقايق لحد ما يشتغل.

### 📌 استخراج الحل:

* السؤال بيقول: *"Read above and start the virtual machine."*

* يعني المطلوب منك بس إنك تشغل الجهاز الافتراضي وتكون جاهز للأسئلة اللي بعده.

* مفيش إجابة تكتبها هنا → مجرد **تشغيل الـ VM**. ✅

***

## Windows Editions :

* ويندوز بدأ من 1985 وهو لحد دلوقتي النظام المسيطر سواء في البيت أو في الشركات.

* عشان كده دايمًا كان مستهدف من الهاكرز والمالوير.

* **XP** كان مشهور، وبعده نزل **Vista** اللي فشل بسرعة.

* بعد إعلان نهاية دعم XP، الشركات اضطرت تتحول لـ **Windows 7** بسرعة.

* بعد كده نزل **Windows 8** اللي برضو ماكملش.

* ثم نزل **Windows 10** وبعده **Windows 11** (الإصدار الحالي).

* ويندوز 11 موجود منه نسختين: **Home** و **Pro**.

* السيرفر الحالي في اللاب هو **Windows Server 2019 Standard**.

* بالنسبة لـ Windows 10 → الدعم مستمر لحد **14 أكتوبر 2025**.

### 📌 السؤال:

> **What encryption can you enable on Pro that you can't enable in Home?**\
> يعني:\
> *إيه نوع التشفير اللي ممكن تفعلّه في نسخة* ***Windows Pro*** *ومش موجود في* ***Windows Home****؟*

### 📌 الحل:

الفرق الأساسي بين **Home** و **Pro** هو إن:

* نسخة **Pro** بتدعم **BitLocker** (لتشفير الأقراص).

* نسخة **Home** مش فيها الخاصية دي.

✅ **الإجابة:** `BitLocker`

***

### إزاي تتأكد بنفسك إن **BitLocker** موجود وممكن تستخدمه:

### 🔹 الطريقة من **Control Panel**:

1. افتح **Control Panel**.

2. روح على **System and Security**.

3. لو لقيت خيار اسمه **BitLocker Drive Encryption** → يبقى النظام بيدعم BitLocker.

4. في نسخة **Home** مش هتلاقي الاختيار ده.

### 🔹 الطريقة من **CMD**:

1. افتح **Command Prompt** كـ Administrator.

2. اكتب:

   `manage-bde -status`

3. لو جالك تفاصيل عن الـ drives وحالة الـ BitLocker → يبقى مدعوم.

4. في نسخة Home غالبًا هيقولك إن الأداة غير مدعومة.

***

## The Desktop (GUI) :

* **الـ Desktop (سطح المكتب)**: هو الشاشة اللي بتظهرلك بعد تسجيل الدخول (Username + Password).

* تقدر تغيّر شكله (الأيقونات، الخلفية، الـ Themes، الألوان… إلخ) من:

  * **Right Click → Display Settings** (لتغيير الدقة والشاشات المتعددة).

  * **Right Click → Personalize** (لتغيير الخلفية، الألوان، الخطوط…).

* **Start Menu (قائمة ابدأ)**:

  * موجودة دلوقتي كـ **Windows Logo** مش كلمة Start.

  * مقسمة لأجزاء:

    1. إعدادات الحساب (Documents, Pictures, Settings, Power…).

    2. قائمة البرامج (Recently Added + Installed Apps).

    3. Tiles (مربعات التطبيقات اللي ممكن تضيف/تشيل منها برامج).

* **Taskbar (شريط المهام)**:

  * بيعرض البرامج المفتوحة أو الـ pinned.

  * ممكن تغير إعداداته بالـ Right Click.

* **Notification Area (منطقة الإشعارات)**:

  * يمين تحت → فيها الساعة، الشبكة، الصوت، وأيقونات تانية زي **Action Center**.

  * تقدر تتحكم من Taskbar settings.

### 📌 الأسئلة + الحلول:

1. **Which selection will hide/disable the Search box?**\
   ✅ **Hidden**

2. **Which selection will hide/disable the Task View button?**\
   ✅ **Show Task View button** (إلغاء التفعيل يشيلها من التاسك بار).

3. **Besides Clock and Network, what other icon is visible in the Notification Area?**\
   ✅ **Action Center**

***

## The File System :

* النظام اللي بيستخدمه **Windows الحديث** هو **NTFS = New Technology File System**.

* قبل كده كان فيه **FAT16/FAT32** و **HPFS**. ولسه بتشوف FAT في الفلاشة أو الـ MicroSD.

* مميزات **NTFS**:

  * دعم ملفات أكبر من **4GB**.

  * **Permissions** (تحديد صلاحيات على الملفات والمجلدات).

  * ضغط الملفات والمجلدات.

  * التشفير باستخدام **EFS (Encrypting File System)**.

* من مميزات NTFS كمان:

  * **ال Journaling**: يقدر يصلح نفسه بعد مشكلة بالاعتماد على Log.

  * **ال Permissions** (Full control, Modify, Read & Execute… إلخ).

  * **ال Alternate Data Streams (ADS):** كل ملف له Stream أساسي، و ADS يضيف Streams إضافية. أحيانًا المالوير بيخبي نفسه فيها، لكن كمان Windows بيستخدمها (مثلاً لو نزلت ملف من النت بيتسجل في ADS إنه جاي من الإنترنت).

### 📌 السؤال:

> **What is the meaning of NTFS?**

✅ **الإجابة:** `New Technology File System`

***

## The Windows\System32 Folders :

مجلد **Windows** (‎`C:\Windows`‎) يُعرف تقليديًا بأنه المجلد الذي يحتوي على نظام التشغيل Windows.

هذا المجلد ليس شرطًا أن يكون موجودًا على قرص **C** تحديدًا، بل يمكن أن يكون على أي قرص آخر، أو حتى داخل مجلد مختلف.

هنا يظهر دور **environment variables**، وتحديدًا **system environment variables**. حتى وإن لم نتحدث عنها بعد، فإن **system environment variable** الخاص بمجلد Windows هو **%windir%**.

حسب مايكروسوفت:

> ال "Environment variables تخزّن معلومات عن بيئة نظام التشغيل. هذه المعلومات تتضمن تفاصيل مثل: مسار نظام التشغيل، عدد المعالجات التي يستخدمها النظام، ومكان المجلدات المؤقتة."

يوجد داخل مجلد **Windows** العديد من المجلدات، ومن بينها:

🔹 **System32**

مجلد **System32** يحتوي على ملفات مهمة وحيوية لعمل نظام التشغيل.\
يجب التعامل معه بحذر شديد، لأن حذف أي ملف أو مجلد بداخله بالخطأ قد يجعل نظام Windows غير قابل للتشغيل.

📌 ملاحظة: العديد من الأدوات التي سيتم تغطيتها في سلسلة **Windows Fundamentals** موجودة داخل مجلد **System32**.

**Answer the questions below**\
**What is the system variable for the Windows folder?**\
✅ %windir%

***

## User Accounts, Profiles, and Permissions :

الحسابات، الملفات الشخصية، والصلاحيات (**User Accounts, Profiles, and Permissions**):

يمكن أن يكون حساب المستخدم على نظام Windows محلي من نوعين:

1. **Administrator**

2. **Standard User**

🔹 نوع الحساب يحدد ما يمكن للمستخدم فعله على النظام:

* **Administrator**: يمكنه إجراء تغييرات على النظام مثل: إضافة مستخدمين، حذف مستخدمين، تعديل المجموعات، تغيير إعدادات النظام، إلخ.

* **Standard User**: يمكنه فقط تعديل الملفات/المجلدات الخاصة به، ولا يمكنه تنفيذ تغييرات على مستوى النظام مثل تثبيت البرامج.

بما أنك **مسجّل الدخول كـ Administrator**، توجد عدة طرق لمعرفة الحسابات الموجودة على النظام.

إحدى الطرق: فتح **Start Menu** وكتابة **Other User** → سيظهر اختصار إلى:\
**System Settings > Other users**

لو ضغطت عليه، ستظهر نافذة إعدادات تعرض خيار:\
**Add someone else to this PC** (هذا الخيار لا يظهر عند المستخدم العادي).

بالضغط على الحساب المحلي، ستظهر خيارات إضافية مثل: **Change account type** و **Remove**.

📌 عند إنشاء حساب جديد، يتم إنشاء **Profile** له.\
مكان ملفات البروفايل يكون في:\
`C:\Users`

مثال: حساب باسم **Max** → بروفايله في:\
`C:\Users\Max`

إنشاء البروفايل يتم عند تسجيل الدخول لأول مرة، حيث يظهر على الشاشة **User Profile Service** أثناء تجهيز الملفات.\
بعدها، يظهر صندوق حوار يؤكد أن البروفايل قيد الإنشاء.

كل بروفايل يتضمن مجلدات أساسية مثل:

* Desktop

* Documents

* Downloads

* Music

* Pictures

🔹 طريقة أخرى لمعرفة هذه المعلومات: **Local User and Group Management**

* اضغط يمين على Start Menu → اختر **Run**

* اكتب: `lusrmgr.msc`

ستجد مجلدين:

* **Users**

* **Groups**

داخل **Groups** ستجد أسماء المجموعات المحلية مع وصف قصير لكل مجموعة.\
كل مجموعة لها صلاحيات محددة، والمستخدم يمكن إضافته لمجموعة واحدة أو أكثر.\
بمجرد إضافته لمجموعة، يرث صلاحياتها.

📌 ملاحظة: اختيار **Add someone else to this PC** من **Other Users** يفتح نفس أداة **Local Users and Groups Management**.

✅ **Answer the questions below**

**What is the name of the other user account?**\
👉 tryhackmebilly

**Correct Answer**

**What groups is this user a member of?**\
👉 Remote Desktop Users, Users

**Correct Answer**

**What built-in account is for guest access to the computer?**\
👉 Guest

**Correct Answer**

**What is the account description?**\
👉 window$Fun1!

**Correct Answer** ✅

***

## User Account Control

**User Account Control (UAC):**

معظم مستخدمي الأجهزة المنزلية يقومون بتسجيل الدخول إلى أنظمة Windows الخاصة بهم باستخدام حسابات **local administrators**.\
تذكَّر من الجزء السابق أن أي مستخدم نوع حسابه **Administrator** يمكنه إجراء تغييرات على النظام.

لكن المستخدم لا يحتاج إلى تشغيل مهام بامتيازات عالية (**elevated privileges**) لتنفيذ مهام عادية مثل: تصفح الإنترنت، أو العمل على ملف Word، إلخ.\
هذه الامتيازات العالية تزيد من خطر اختراق النظام، لأنها تسهّل إصابة النظام بالبرمجيات الخبيثة. ففي هذه الحالة، أي **malware** سيعمل ضمن سياق المستخدم الذي يمتلك صلاحيات التغيير على النظام.

لحماية المستخدم المحلي من هذا الخطر، قدمت مايكروسوفت ميزة **User Account Control (UAC)**.\
تم تقديم هذه الميزة لأول مرة في نظام **Windows Vista** (قصير العمر) واستمرت في جميع إصدارات Windows التي تلت ذلك.

📌 ملاحظة: **UAC** (افتراضيًا) لا ينطبق على الحساب المحلي المدمج **built-in local administrator account**.

***

🔹 **كيف يعمل UAC؟**

* عندما يقوم مستخدم نوع حسابه **Administrator** بتسجيل الدخول للنظام، فإن الجلسة لا تعمل مباشرة بامتيازات عالية.

* عند تنفيذ عملية تتطلب صلاحيات أعلى، يظهر للمستخدم **Prompt** يطلب التأكيد للسماح للعملية بالمتابعة.

على سبيل المثال:

* عند عرض **Properties** للبرنامج من خلال الحساب المدمج **Administrator**، وفي تبويب **Security**، سترى المستخدمين/المجموعات وصلاحياتهم. ستلاحظ أن **Standard User** غير مذكور.

* لو قمت بتسجيل الدخول كـ **Standard User** وحاولت تثبيت البرنامج (باستخدام **Remote Desktop** مثلًا)، ستلاحظ ظهور **Shield Icon** على أيقونة البرنامج.

* هذا الدرع يشير إلى أن **UAC** سيطلب إذنًا لامتيازات أعلى(زي فتح Wireshark مثلا )

* عند الضغط المزدوج لتشغيل البرنامج، يظهر **UAC prompt** مع اسم الحساب **Administrator** المدمج ويطلب إدخال كلمة مروره.

* إذا لم يتم إدخال كلمة المرور خلال فترة زمنية، يختفي الـ Prompt ولا يتم تثبيت البرنامج.

هذه الميزة تقلل بشكل كبير من احتمالية نجاح البرمجيات الخبيثة في اختراق النظام.

✅ **Answer the questions below**

**What does UAC mean?**\
👉 User Account Control

**Correct Answer**

***

## Settings and the Control Panel :

**Settings and the Control Panel**

في أنظمة Windows، الأماكن الأساسية لإجراء التغييرات هي:

1. **Settings menu**

2. **Control Panel**

🔹 لفترة طويلة، كان **Control Panel** هو المكان الرئيسي لإجراء تغييرات على النظام مثل: إضافة طابعة، إلغاء تثبيت برنامج، إلخ.

مع **Windows 8** (أول نظام Windows مُوجّه لأجهزة التابلت التي تعمل باللمس)، تم تقديم **Settings menu**، ولا يزال متاحًا في Windows 10.\
في الحقيقة، أصبح **Settings** الآن هو المكان الأساسي الذي يتجه له المستخدم لإجراء تغييرات على النظام.

كلاهما (Settings & Control Panel) يمكن الوصول إليهما من **Start Menu**.

📌 الفرق:

* **Control Panel**: يحتوي على إعدادات أكثر تعقيدًا وإجراءات متقدمة.

* **Settings**: يغطي معظم الإعدادات اليومية للمستخدم، لكنه أحيانًا يحيلك إلى **Control Panel**.

مثال:

* من **Settings** → **Network & Internet** → **Change adapter options**

* ستلاحظ أن النافذة التالية التي تفتح هي من **Control Panel**.

لو لم تكن متأكدًا أيهما تفتح، يمكنك استخدام البحث في **Start Menu**.\
مثال: البحث عن **wallpaper** → تظهر نتائج قليلة، وأفضل نتيجة تفتح نافذة من **Settings** لتغيير الخلفية.

✅ **Answer the questions below**

**In the Control Panel, change the view to Small icons. What is the last setting in the Control Panel view?**\
👉 Windows Defender Firewall

**Correct Answer**

***

## Task Manager :

آخر موضوع في هذا الجزء هو **Task Manager**.

ال **Task Manager** يعرض معلومات عن التطبيقات والعمليات (**processes**) التي تعمل حاليًا على النظام.\
كما يعرض معلومات أخرى مثل استخدام المعالج (**CPU**) والذاكرة (**RAM**) ضمن تبويب **Performance**.

🔹 للوصول إلى **Task Manager**:

* اضغط يمين على **taskbar** واختر **Task Manager**

بشكل افتراضي، يفتح **Task Manager** في **Simple View** ويعرض معلومات محدودة.\
للحصول على مزيد من التفاصيل، اضغط على **More details** لتتغير الواجهة وتظهر جميع المعلومات المتاحة.

يمكنك الاطلاع على مزيد من المعلومات حول **Task Manager** من خلال مدونات متخصصة، كما يمكن تعلم دور كل عملية في النظام من غرفة **Core Windows Processes**.

✅ **Answer the questions below**

**What is the keyboard shortcut to open Task Manager?**\
👉 Ctrl + Shift + Esc

**Correct Answer**

***

***

***

