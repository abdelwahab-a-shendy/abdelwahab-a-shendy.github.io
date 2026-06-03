---
id: "68e9810d7121a989aa2afc1b"
title: "Intro To Penetration Testing"
description: "The goal here is to build a lab that we will work on together to cover the fundamentals of penetration testing."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/introduction"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-10T21:56:29.101Z"
updatedAt: "2026-01-25T15:35:46.975Z"
---

1. # Setting up a Test VM

You can use Kali or Ubuntu. Here are the steps to install VirtualBox Guest Additions on Debian/Ubuntu distributions (example: I used Ubuntu).

Quick steps

```bash
sudo apt update
sudo apt install -y build-essential dkms linux-headers-$(uname -r)
```

From VirtualBox: Devices → Insert Guest Additions CD image…

Then in the terminal inside the Linux VM:

```bash
sudo mount /dev/cdrom /mnt
sudo /mnt/VBoxLinuxAdditions.run
```

After the installation finishes, reboot the machine:

```bash
sudo reboot
```

To enable clipboard sharing and drag & drop:

Devices → Shared Clipboard → Bidirectional

Devices → Drag & Drop → Bidirectional

***

2. # What is Penetration Testing (Penetration Testing)?

Penetration testing (PenTest) is a planned, ethical attempt to test and analyze the security defenses of a system or application with the goal of finding vulnerabilities before real attackers can exploit them. Testers use the same tools and techniques that malicious attackers use, but within a legal and authorized framework.

Cybersecurity importance is increasing daily, and cyberattacks constantly appear in the news — so the role of penetration testing has become essential to protect individuals and organizations.

Note: According to specialized reports, thousands of attacks occur daily, highlighting the need for regular and reliable testing.

***

3. # Penetration Testing Ethics

Penetration testing is legal and authorized only when there is an explicit agreement between the tester and the system owner. Any action outside that agreement is considered unauthorized and may be a crime.

Elements of ethics and legality

* Prior agreement: Define the scope, tools, and techniques of the test.

* Rules of Engagement (ROE): A document that defines what is allowed and what is forbidden.

* Handling sensitive information: If the tester discovers sensitive data, it must be handled professionally and according to the agreement.

Hacker classifications (hats)

| Hat category | Description                                             | Example                                                                                |
| ------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| White hat    | Legal testers who work to improve security.             | An authorized penetration tester assessing a company's systems.                        |
| Gray hat     | Sometimes operates outside ethical or legal boundaries. | Someone who takes down a phishing site using methods that may be illegal occasionally. |
| Black hat    | Attackers who aim for harm or personal gain.            | Ransomware authors.                                                                    |

***

4. # Rules of Engagement (ROE)

ROE is a fundamental document usually composed of three main sections:

| Section    | Description                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Permission | Explicit authorization to perform the test to legally protect the parties.                                           |
| Test Scope | Specifies the targets to be tested (servers/applications/networks).                                                  |
| Rules      | The techniques allowed and prohibited during the test (for example: banning phishing or allowing it if agreed upon). |

***

5. # Penetration Testing Methodologies

A methodology defines the steps and the appropriate phase for each type of test. There is no single methodology that fits every case — choose or adapt a methodology according to the objective.

Common general phases

| Phase                 | Description                                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Information Gathering | Collect publicly available information (OSINT) to understand the target. This is not scanning or direct exploitation. |
| Enumeration/Scanning  | Discover services and applications and find potential entry points.                                                   |
| Exploitation          | Exploit discovered vulnerabilities to gain access to the system or application.                                       |
| Privilege Escalation  | Attempt to obtain higher privileges within the system (horizontal/vertical).                                          |
| Post-Exploitation     | Pivoting, collecting additional information, covering tracks, and preparing the final report.                         |

Examples of well-known methodologies

* OSSTMM: A comprehensive security testing framework covering networks, communications, and the human aspect.

* OWASP: Focused on web applications and presents the major vulnerabilities and how to deal with them (OWASP Top 10).

* NIST Cybersecurity Framework: A framework for risk management and security policies at the organizational level.

* NCSC CAF: An assessment framework made of principles for securing critical infrastructure.

***

6. # Types of Penetration Tests (Black/Gray/White Box)

* Black-Box: No internal information is provided; the tester behaves like an external user.

* Gray-Box: The tester is given partial information; this is the most commonly used type in practice.

* White-Box: Full access to code and diagrams, for thorough in-depth testing.

***

***

***

# إعداد جهاز افتراضي للاختبار

يمكنك استخدام **Kali** أو **Ubuntu**. فيما يلي خطوات تثبيت إضافات ضيف VirtualBox على توزيعات Debian/Ubuntu (مثال: استخدمت Ubuntu).

**خطوات سريعة**

```bash
sudo apt update
sudo apt install -y build-essential dkms linux-headers-$(uname -r)
```

من قائمة VirtualBox:\
**Devices → Insert Guest Additions CD image…**

ثم داخل الطرفية في الـ VM اللينكس:

```bash
sudo mount /dev/cdrom /mnt
sudo /mnt/VBoxLinuxAdditions.run
```

بعد انتهاء التثبيت، أعد تشغيل الجهاز:

```bash
sudo reboot
```

لتفعيل مشاركة الحافظة والسحب والإفلات:

من قائمة VirtualBox:\
**Devices → Shared Clipboard → Bidirectional**\
**Devices → Drag & Drop → Bidirectional**

***

# ما هو اختبار الاختراق (Penetration Testing)؟

اختبار الاختراق (PenTest) هو محاولة مخططة وأخلاقية لاختبار وتحليل دفاعات الأمان لنظام أو تطبيق بهدف العثور على ثغرات قبل أن يستغلها مهاجمون حقيقيون. يستخدم المختبرون نفس الأدوات والتقنيات التي يستخدمها المهاجمون الخبيثون، ولكن داخل إطار قانوني ومصرح به.

تزداد أهمية الأمن السيبراني يومًا بعد يوم، وتظهر الهجمات الإلكترونية باستمرار في الأخبار — لذلك أصبح دور اختبار الاختراق ضروريًا لحماية الأفراد والمؤسسات.

> ملاحظة: وفقًا لتقارير متخصصة، تحدث آلاف الهجمات يوميًا، مما يبرز الحاجة إلى اختبارات منتظمة وموثوقة.

***

# أخلاقيات اختبار الاختراق

يُعد اختبار الاختراق قانونيًا ومصرحًا به فقط عندما يكون هناك اتفاق صريح بين المختبر ومالك النظام. أي إجراء خارج هذا الاتفاق يُعتبر غير مصرح به وقد يُعد جريمة.

**عناصر الأخلاقيات والشرعية**

* **الاتفاق المسبق:** تحديد نطاق الاختبار والأدوات والتقنيات.

* **قواعد الاشتباك (Rules of Engagement - ROE):** وثيقة تحدد المسموح والممنوع.

* **التعامل مع المعلومات الحساسة:** إذا اكتشف المختبر بيانات حساسة، فيجب التعامل معها مهنيًا وبما يتوافق مع الاتفاق.

***

# تصنيفات الهاكرز (القبعات)

| الصنف                  | الوصف                                               | مثال                                                             |
| ---------------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| قبعة بيضاء (White hat) | مختبرون قانونيون يعملون على تحسين الأمان.           | مختبر اختراق مرخّص لتقييم أنظمة شركة.                            |
| قبعة رمادية (Gray hat) | قد تعمل أحيانًا خارج الحدود الأخلاقية أو القانونية. | شخص يزيل موقع تصيّد باستخدام أساليب قد تكون غير قانونية أحيانًا. |
| قبعة سوداء (Black hat) | مهاجمون يهدفون للضرر أو الربح الشخصي.               | مطورو برامج الفدية (Ransomware).                                 |

***

# قواعد الاشتباك (ROE)

تعد ROE وثيقة أساسية عادةً وتتكون من ثلاثة أقسام رئيسية:

* **الإذن (Permission):** تفويض صريح لأداء الاختبار لحماية الأطراف قانونيًا.

* **نطاق الاختبار (Test Scope):** تحديد الأهداف المراد اختبارها (سيرفرات/تطبيقات/شبكات).

* **القواعد (Rules):** التقنيات المسموح بها والممنوعة أثناء الاختبار (مثال: حظر الصيد الاحتيالي/phishing أو السماح به إذا تم الاتفاق عليه).

***

# منهجيات اختبار الاختراق

المنهجية تحدد الخطوات والمرحلة المناسبة لكل نوع اختبار. لا توجد منهجية واحدة تناسب كل الحالات — اختَر أو عدّل منهجية بحسب الهدف.

**المراحل العامة الشائعة**

* **جمع المعلومات (Information Gathering):** جمع المعلومات المتاحة للعامة (OSINT) لفهم الهدف — هذه لا تتضمن المسح أو الاستغلال المباشر.

* **العدّ/المسح (Enumeration/Scanning):** اكتشاف الخدمات والتطبيقات وإيجاد نقاط دخول محتملة.

* **الاستغلال (Exploitation):** استغلال الثغرات المكتشفة للوصول إلى النظام أو التطبيق.

* **تصعيد الصلاحيات (Privilege Escalation):** محاولة الحصول على صلاحيات أعلى داخل النظام (أفقياً/عمودياً).

* **ما بعد الاستغلال (Post-Exploitation):** التمحور (pivoting)، جمع معلومات إضافية، مسح الآثار، والتحضير للتقرير النهائي.

**أمثلة على منهجيات معروفة**

* **OSSTMM:** إطار شامل لاختبار الأمان يغطي الشبكات والاتصالات والجوانب البشرية.

* **OWASP:** يركز على تطبيقات الويب ويعرض أبرز الثغرات وكيفية التعامل معها (مثل OWASP Top 10).

* **NIST Cybersecurity Framework:** إطار لإدارة المخاطر وسياسات الأمن على مستوى المؤسسة.

* **NCSC CAF:** إطار تقييم مبني على مبادئ تأمين البُنى التحتية الحيوية.

***

# أنواع اختبارات الاختراق (Black/Gray/White Box)

* **Black-Box:** لا تُقدم معلومات داخلية؛ يعمل المختبر كمستخدم خارجي.

* **Gray-Box:** يُعطى المختبر معلومات جزئية؛ هذا النوع الأكثر استخدامًا عمليًا.

* **White-Box:** وصول كامل إلى الشيفرة والمخططات، لاختبار عميق وشامل.

