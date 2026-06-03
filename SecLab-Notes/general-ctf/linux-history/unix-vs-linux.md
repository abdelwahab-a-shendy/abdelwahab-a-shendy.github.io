
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1764301126645/15f2e195-427b-46f7-a95c-ea93d7e721e4.png" alt="" align="center" fullwidth="true" />

## شرح بنية أنظمة التشغيل (Unix vs Linux)

### 1. بنية نظام التشغيل في شكل طبقات (Layers Architecture)

توضح الصورة البنية الهرمية لأي نظام تشغيل، بدءاً من المكونات المادية وصولاً إلى التطبيقات التي يستخدمها المستخدم:

* **1. الأجهزة (Hardware) - (الطبقة الزرقاء الداخلية):**

  * هذه هي المكونات المادية الفعلية للكمبيوتر (المعالج، الذاكرة، القرص الصلب، لوحات الإدخال/الإخراج).

  * إنها الأساس الذي يقوم عليه كل شيء.

* **2. النواة (Kernel) - (الطبقة الخضراء):**

  * هي قلب نظام التشغيل وعقل مدبر يقع بين الأجهزة والبرامج.

  * وظيفتها الأساسية هي إدارة موارد الجهاز.

* **3. الصدفة (Shell) - (الطبقة الحمراء):**

  * هي الواجهة التي تسمح للمستخدم أو التطبيقات بالتفاعل مع النواة.

  * تستقبل أوامر المستخدم وتمررها إلى النواة للتنفيذ (مثلاً: `Bash` أو `PowerShell`).

* **4. التطبيقات (Application) - (الطبقة الرمادية الخارجية):**

  * هي البرامج التي يستخدمها المستخدم لأداء مهام محددة (مثل المتصفحات، محررات النصوص، قواعد البيانات).

  * تعتمد على طبقة الصدفة والنواة لتشغيلها والوصول إلى موارد الجهاز.

### 2. وظائف النواة (Kernel)

النواة هي أهم جزء في نظام التشغيل، ووظائفها الأساسية المذكورة هي:

* **Resource Management:** إدارة موارد الجهاز بشكل عام (مثل توزيع الطاقة والتحكم في الأجهزة الطرفية).

* **Memory Management (إدارة الذاكرة):** تحديد كيفية تخصيص واستخدام الذاكرة العشوائية (RAM) بين العمليات المختلفة.

* **Storage Management (إدارة التخزين):** إدارة نظام الملفات والوصول إلى البيانات المخزنة على القرص الصلب.

* **Job Schedule (جدولة المهام):** تحديد ترتيب تنفيذ العمليات والمهام المختلفة على المعالج (CPU) لضمان تعدد المهام (Multitasking).

### 3. مقارنة سريعة (UNIX vs Linux)

توضح الصورة الاختلافات والمميزات الأساسية لكل من نظامي UNIX و Linux:

#### **UNIX:**

* **Close Source (مغلق المصدر):** الكود المصدري للنظام غير متاح للعامة للتعديل أو المراجعة.

* **الشرح:** UNIX هو نظام التشغيل الأصلي الذي طورته AT\&T Bell Labs في الستينيات والسبعينيات، وهو أساس كل الأنظمة الأخرى المشابهة له (مثل macOS و Solaris).

#### **Linux:**

* **Linus Torvalds:** المطور الذي بدأ مشروع نواة لينكس في عام 1991.

* **Open Source (مفتوح المصدر):** الكود المصدري متاح مجاناً لأي شخص لاستخدامه وتعديله وتوزيعه.

* **Multi Taking (تعدد المهام):** القدرة على تشغيل عدة برامج وعمليات في وقت واحد بفعالية (هذه ميزة مشتركة مع معظم أنظمة UNIX الحديثة أيضاً).

* **الشرح:** لينكس هو نظام تشغيل شبيه بـ UNIX لكنه مبني على نواة طورها لينوس تورفالدس ومجموعة من المطورين، وهو يتميز بكونه مجاني ومفتوح المصدر.

***

***

***

## **Operating System Architecture (Unix vs Linux)**

### 1. **Operating System Layered Architecture**

The diagram illustrates the hierarchical structure of any operating system, from the hardware components up to the user applications:

1. **Hardware (Blue Inner Layer):**\
   These are the physical components of the computer (CPU, memory, hard drive, input/output boards).\
   They form the foundation on which everything else relies.

2. **Kernel (Green Layer):**\
   The core of the operating system, acting as the brain between hardware and software.\
   Its main function is to manage system resources.

3. **Shell (Red Layer):**\
   The interface that allows users or applications to interact with the kernel.\
   It receives user commands and passes them to the kernel for execution (e.g., Bash or PowerShell).

4. **Applications (Gray Outer Layer):**\
   Programs used by users to perform specific tasks (such as browsers, text editors, or databases).\
   They rely on the shell and kernel to operate and access hardware resources.

***

### 2. **Kernel Functions**

The kernel is the most critical part of the OS, with these primary functions:

* **Resource Management:** Overall management of system resources (e.g., power distribution and peripheral control).

* **Memory Management:** Allocating and managing RAM among different processes.

* **Storage Management:** Handling the file system and access to data stored on the hard drive.

* **Job Scheduling:** Determining the order of process execution on the CPU to ensure multitasking efficiency.

***

### 3. **Quick Comparison (UNIX vs Linux)**

The diagram highlights key differences and characteristics of UNIX and Linux:

**UNIX:**

* **Closed Source:** The system source code is not publicly available for modification or review.

* **Explanation:** UNIX is the original operating system developed by AT\&T Bell Labs in the 1960s–70s and serves as the foundation for other similar systems (e.g., macOS, Solaris).

**Linux:**

* **Linus Torvalds:** The developer who started the Linux kernel project in 1991.

* **Open Source:** The source code is freely available for anyone to use, modify, and distribute.

* **Multitasking:** The ability to run multiple programs and processes simultaneously (also a feature shared with most modern UNIX systems).

* **Explanation:** Linux is a UNIX-like OS built on a kernel developed by Linus Torvalds and a community of developers. It is free, open-source, and widely used.

***

