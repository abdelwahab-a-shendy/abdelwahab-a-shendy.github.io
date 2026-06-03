---
id: "692918ab1ca9ecdb4a91539f"
title: "Linux History"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/general-ctf/linux-history"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-11-28T03:36:11.941Z"
updatedAt: "2026-01-25T15:35:47.043Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1764300988760/64c0e247-e875-4a48-bc7d-9735e638eea8.png" alt="" align="center" fullwidth="true" />

# ✅ **القصة الكاملة: من لا شيء… إلى Linux اللي نعرفه النهارده**

## **1. العالم قبل أنظمة التشغيل (1950s – بداية 1960s)**

زمان، الكمبيوتر كان جهاز ضخم، ومفيش حاجة اسمها “نظام تشغيل”.\
علشان تشغّل برنامج:

* تكتب الأوامر على ورق مثقوب (Punch Cards)

* تحط الورق في الكمبيوتر

* الجهاز ينفّذ أو يطلع Error… وتبدأ من الأول!

**مشكلة كبيرة:**\
كل مرة مستخدم واحد بس يقدر يشتغل، والجهاز بيضيع وقت كبير فاضي وهو مستني الأوامر.\
فبدأ الناس تفكر:

> “ليه الكمبيوتر ما يشغّلش أكتر من مستخدم أو برنامج في نفس الوقت؟”

***

## **2. ظهور فكرة الـ Time-Sharing → بداية أنظمة التشغيل**

اتولدت فكرة مهمة:

> **نقسم وقت الجهاز لشرائح صغيرة، وكل مستخدم ياخد دور بسرعة → نحس إنه شغال لوحده.**\
> ده كان بداية مفهوم أنظمة التشغيل الحديثة.

***

## **3. مشروع MULTICS – الحلم الكبير (1964)**

جامعة MIT قالت:\
“خلونا نعمل نظام تشغيل كامل، ذكي، يخدم آلاف المستخدمين، آمن، ويشتغل في كل مكان.”

فاشتركوا مع:

* **Bell Labs (AT\&T)**

* **General Electric (GE)**

وسمّوه: **MULTICS**\
كان حلم قوي جدًا… لكن اتضح إنه أعقد بكتير من إمكانيات الزمن ده.

***

## **4. 1969 – الانسحاب وولادة UNIX من الرماد**

Bell Labs زهقت! المشروع كبير، بطيء، وبيفشل.\
فقالت: “إحنا منسحبين.”

لكن واحد اسمه **Ken Thompson** من Bell Labs ما استسلمش.\
قال:

> “طب ما نعمل نفس فكرة MULTICS… بس ببساطة وباللي نقدر عليه!”

فاستخدم جهاز بسيط اسمه **PDP-7**، وكتب نظام صغير سمّاه:\
**UNICS** → وبعدها بقت **UNIX**

***

## **5. UNIX يكبر وينتشر (1970 – 1980s)**

خلال شوية سنين:

* **Dennis Ritchie** يعيد كتابة UNIX بلغة جديدة اخترعها هو: **C**

* UNIX بقى قابل للنقل لأي جهاز (Portable)

* اتوزّع على الجامعات → الطلبة طوروه وبقى فيه نسخ زي:

  * **System V** (من AT\&T)

  * **BSD Unix** (جامعة Berkeley)

***

## **6. مشروع GNU – ناقصه حاجة واحدة (1983)**

Richard Stallman ظهر بفكرة مجنونة:

> “ليه نشتغل بأنظمة مغلقة؟ هنعمل نظام شبيه بـ UNIX، كامل، حر ومفتوح!”\
> وسمّاه: **GNU = GNU’s Not Unix**

عمل كل حاجة تقريبا (Shell, Compiler, Tools…)\
بس كان ناقصه حاجة واحدة: **Kernel (نواة النظام).**\
حاول يعمل Kernel اسمها **Hurd**… لكنها فشلت وتأخرت جدًا.

***

## **7. هنا يظهر Linus Torvalds و MINIX (1991)**

Linus كان طالب جامعة، بيستخدم نظام تعليمي بسيط اسمه **MINIX** (تشبه UNIX).\
لكن النظام مقفول، ومحدود، ومش عملي للاستخدام اليومي.

فقال لنفسه:

> “طيب… ما أكتب النواة بنفسي؟”

وبدأ يكتب **Linux Kernel** على جهازه الشخصي.

في 25 أغسطس 1991 نشر رسالة على الإنترنت:

> “أنا عامل نظام صغير شبيه بـ UNIX… حد مهتم يجرب؟”

***

## **8. GNU + Linux = نظام كامل (1992 – 1993)**

* Linus يفتح مصدر الكيرنل تحت رخصة **GPL**

* الناس تبدأ تضيف أدوات GNU إليه

* وظهر أول نظام متكامل اسمه: **GNU/Linux**

***

## **9. بداية التوزيعات (Distros)**

الناس بدأت تجمع الكيرنل + أدوات GNU + واجهات رسومية = توزيعة جاهزة.

| السنة    | التوزيعة  | ملاحظات                       |
| -------- | --------- | ----------------------------- |
| **1992** | SLS       | أول تجميعة غير مستقرة         |
| **1993** | Slackware | أول توزيعة مستقرة فعلًا       |
| **1993** | Debian    | مجانية، منظمة، أساس لـ Ubuntu |
| **1994** | Red Hat   | تجارية، تدعم RPM Package      |

***

## ✅ **ملخص القصة :**

> MULTICS حلم كبير → فشل → تولد UNIX → منه MINIX → ومن إحباط MINIX ظهر Linux → GNU + Linux = GNU/Linux → وبدأ عصر التوزيعات.

***

***

***

✅ **The Complete Story: From Nothing… to Modern Linux**

***

### 1. **The World Before Operating Systems (1950s – Early 1960s)**

Back then, computers were huge machines, and there was no concept of an “operating system.”

To run a program:

* Write commands on **punch cards**

* Feed the cards into the computer

* The machine executes them or throws an **error**, and you start over!

**Big problem:**\
Only one user could work at a time, and the computer spent a lot of idle time waiting for commands.\
People began asking:

*"Why can’t the computer run multiple users or programs at the same time?"*

***

### 2. **The Emergence of Time-Sharing → Birth of Operating Systems**

A key idea emerged:\
Divide the computer’s time into **small slices**, giving each user a turn very quickly → making it feel like the machine is dedicated to them.

This was the start of **modern operating system concepts**.

***

### 3. **The MULTICS Project – The Big Dream (1964)**

MIT said:\
*"Let’s build a complete, smart OS that serves thousands of users, is secure, and runs everywhere."*

They collaborated with:

* Bell Labs (AT\&T)

* General Electric (GE)

**Project name:** MULTICS

It was an ambitious dream… but turned out to be too complex for the time.

***

### 4. **1969 – Withdrawal & the Birth of UNIX**

Bell Labs gave up—the project was large, slow, and failing.\
But **Ken Thompson** didn’t give up.\
He said:

*"Let’s do the same idea as MULTICS… but simpler and achievable!"*

Using a simple machine called **PDP-7**, he wrote a small system called:\
**UNICS** → later renamed **UNIX**

***

### 5. **UNIX Grows & Spreads (1970s – 1980s)**

Over the next few years:

* **Dennis Ritchie** rewrote UNIX in **C** → making it **portable** to any machine

* UNIX spread to universities → students improved it, producing variants like:

  * **System V** (AT\&T)

  * **BSD Unix** (Berkeley University)

***

### 6. **The GNU Project – Missing One Piece (1983)**

**Richard Stallman** had a revolutionary idea:

*"Why work with closed-source OS? Let’s build a complete UNIX-like system that is free and open-source!"*

He called it **GNU = GNU’s Not Unix**

* Developed almost everything (Shell, Compiler, Tools…)

* Missing piece: the **Kernel**

* Kernel project **Hurd** failed and was significantly delayed

***

### 7. **Enter Linus Torvalds & MINIX (1991)**

* Linus was a university student using **MINIX** (an educational UNIX-like system)

* MINIX was closed, limited, and impractical for daily use

He decided:

*"Okay… I’ll write the kernel myself."*

* Started writing the **Linux Kernel** on his personal computer

* On **August 25, 1991**, he posted online:

*"I’ve created a small UNIX-like system… anyone interested in trying it?"*

***

### 8. **GNU + Linux = Complete System (1992 – 1993)**

* Linus released the kernel under the **GPL license**

* People started adding **GNU tools**

* The first complete system appeared: **GNU/Linux**

***

### 9. **The Start of Distributions (Distros)**

People began combining: **Kernel + GNU tools + Graphical Interfaces = ready-to-use distributions**

| Year | Distribution | Notes                             |
| ---- | ------------ | --------------------------------- |
| 1992 | SLS          | First unstable collection         |
| 1993 | Slackware    | First truly stable distro         |
| 1993 | Debian       | Free, organized, base for Ubuntu  |
| 1994 | Red Hat      | Commercial, supports RPM packages |

***

✅ **Story Summary:**\
MULTICS → ambitious dream → failed → UNIX born → MINIX → frustration with MINIX → Linux kernel → GNU + Linux = GNU/Linux → beginning of the distro era

