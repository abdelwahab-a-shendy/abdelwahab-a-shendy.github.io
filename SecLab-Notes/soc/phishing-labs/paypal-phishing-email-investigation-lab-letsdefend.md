---
id: "68ee6fd8659f2542c6594b41"
title: "PayPal Phishing Email Investigation Lab @LetsDefend"
description: "LetsDefend => Phishing Email Lab =>  https://app.letsdefend.io/challenge/phishing-email"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/soc/phishing-labs/paypal-phishing-email-investigation-lab-letsdefend"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T15:44:24.434Z"
updatedAt: "2026-01-25T15:35:46.798Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1764430493041/abeebbcf-25c9-4bde-86b7-469f37ad3ab5.png" align="center" fullwidth="false" />

## **Case Overview**

**Scenario:**\
Your email address has been leaked and you received an email in German claiming to be from PayPal. The task is to analyze the suspicious email.

**File Location:**

```powershell
C:\Users\LetsDefend\Desktop\Files\PhishingChallenge.zip
```

**Password:**\
`infected`

***

### **1️⃣ Email Extraction**

* The ZIP file at:\
  `C:\Users\LetsDefend\Desktop\Files\`[`PhishingChallenge.zip`](http://PhishingChallenge.zip) (Password: infected) was extracted.

* The file contained an email message in **.eml** or **.msg** format.

* The email was opened using **Thunderbird** for full content analysis.

**Practical Steps in Thunderbird during Analysis:**

* Viewed the **full headers** via **View → Headers → All**.

* Displayed the **HTML source** of the email to inspect the original links.

* Saved suspicious attachments or image links for later verification in an isolated environment.

***

### **2️⃣ Header Analysis**

| Field              | Value                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Return-Path**    | [bounce@rjttznyzjjzydnillquh.designclub.uk.com](mailto:bounce@rjttznyzjjzydnillquh.designclub.uk.com)                                                                                 |
| **From (Visible)** | [IHKH0MFEWW@kodehexa.net](mailto:IHKH0MFEWW@kodehexa.net)                                                                                                                             |
| **Received From**  | [foresthillrestaurant.com](http://foresthillrestaurant.com) ([capchrist.org](http://capchrist.org). \[134.195.196.43]) & [efianalytics.com](http://efianalytics.com) (216.244.76.116) |

**Key Red Flags in the Header:**

* The Return Path is completely different from legitimate PayPal domains.

* IPs and domains are not related to PayPal.

***

### **3️⃣ Malicious Links (Body Analysis)**

* When viewing the message source in Thunderbird, a link was found claiming to be a PayPal Rewards page but actually pointing to:

```bash
https://storage.googleapis.com/hqyoqzatqthj/aemmfcylvxeo.html
```

* **Extracted Domain:**\
  [`storage.googleapis.com`](http://storage.googleapis.com)

**Practical Verification Steps:**

* Copied the link to [**URLScan.io**](http://URLScan.io) or **VirusTotal** to check reputation.

* Observed the results (Malicious / Suspicious).

***

### **4️⃣ Domain Reputation Check**

Although [`storage.googleapis.com`](http://storage.googleapis.com) is an official Google Cloud Storage domain, it is being used here to host a phishing page.

* **Status:** Suspicious / Malicious

* **Answer:** Yes

***

### **5️⃣ SHA-256 Hash of the Page**

The SHA-256 for the content hosted at [`storage.googleapis.com`](http://storage.googleapis.com) was calculated via:

```bash
curl storage.googleapis.com | sha256sum
```

**Result:**

```bash
13945ecc33afee74ac7f72e1d5bb73050894356c4bf63d02a1a53e76830567f5
```

🔹 **Important Note:**

* Calculating the SHA-256 of the domain name as a plain string will produce a different hash.

* Using `curl` to fetch the page content and then hashing it calculates the **hash of the actual page content** (as required in the lab).

***

### **6️⃣ Conclusion – Is the Email Phishing?**

All indicators confirm this is a phishing email:

* Spoofed PayPal identity.

* Different language (German) with unrealistic financial offers.

* Malicious link hosted on Google Cloud Storage.

* Unofficial Return Path and domains.

**Answer:** Yes

***

### **7️⃣ Summary Table of Answers**

| Question               | Answer                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Return Path**        | [bounce@rjttznyzjjzydnillquh.designclub.uk.com](mailto:bounce@rjttznyzjjzydnillquh.designclub.uk.com) |
| **Domain Name of URL** | [storage.googleapis.com](http://storage.googleapis.com)                                               |
| **Suspicious?**        | Yes                                                                                                   |
| **SHA-256 of Domain**  | 13945ecc33afee74ac7f72e1d5bb73050894356c4bf63d02a1a53e76830567f5                                      |
| **Is Email Phishing?** | Yes                                                                                                   |

***

### **8️⃣ Recommendations**

* Block the sender domain [`designclub.uk.com`](http://designclub.uk.com) and prevent future communications.

* Report the malicious URL to Google Safe Browsing for removal.

* Notify the targeted user not to click any links.

* Review and strengthen email gateway rules to detect similar patterns in the future.

***

> **Report Prepared By:\
> Abdelwahab Ahmed Shandy\
> 22-09-2025\
> Phishing Email – LetsDefend**

***

***

***

## **نظرة عامة على الحالة**

**السيناريو:**\
تم تسريب عنوان بريدك الإلكتروني وتلقيت رسالة بريد إلكتروني باللغة الألمانية تدّعي أنها من PayPal. المطلوب تحليل البريد الإلكتروني المشبوه.

**موقع الملف:**\
`C:\Users\LetsDefend\Desktop\Files\`[`PhishingChallenge.zip`](http://PhishingChallenge.zip)

**كلمة المرور:**\
`infected`

***

### **1️⃣ استخراج البريد الإلكتروني**

* قمت بفك ضغط الملف الموجود في:\
  `C:\Users\LetsDefend\Desktop\Files\`[`PhishingChallenge.zip`](http://PhishingChallenge.zip) (كلمة المرور: infected).

* الملف يحتوي على رسالة بريد إلكتروني بصيغة **.eml** أو **.msg**.

* فتحت الرسالة باستخدام برنامج **Thunderbird** لتحليل المحتوى بالكامل.

**خطوات عملية في Thunderbird أثناء التحليل:**

* استعراض الـ **Header** كامل عبر خيار **View → Headers → All**.

* عرض **الـ HTML Source** للرسالة لرؤية الروابط الأصلية.

* حفظ المرفقات أو روابط الصور المشبوهة للتحقق منها لاحقًا في بيئة معزولة.

***

### **2️⃣ تحليل الـ Header**

| الحقل             | القيمة                                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Return-Path**   | [bounce@rjttznyzjjzydnillquh.designclub.uk.com](mailto:bounce@rjttznyzjjzydnillquh.designclub.uk.com)                                                                                 |
| **From (ظاهر)**   | [IHKH0MFEWW@kodehexa.net](mailto:IHKH0MFEWW@kodehexa.net)                                                                                                                             |
| **Received From** | [foresthillrestaurant.com](http://foresthillrestaurant.com) ([capchrist.org](http://capchrist.org). \[134.195.196.43]) & [efianalytics.com](http://efianalytics.com) (216.244.76.116) |

**مؤشرات الخطر في الـ Header:**

* الـ **Return Path** مختلف تمامًا عن نطاقات PayPal الحقيقية.

* الـ IPs والدومينات غير مرتبطة بـ PayPal.

***

### **3️⃣ الروابط الخبيثة (تحليل الـ Body)**

* عند عرض مصدر الرسالة في Thunderbird وجدت رابطًا يدّعي أنه صفحة مكافآت PayPal لكن فعليًا يشير إلى:

[`https://storage.googleapis.com/hqyoqzatqthj/aemmfcylvxeo.html`](https://storage.googleapis.com/hqyoqzatqthj/aemmfcylvxeo.html)

* **الدومين المستخرج:**\
  [`storage.googleapis.com`](http://storage.googleapis.com)

**خطوات عملية للتحقق:**

* نسخ الرابط إلى [**URLScan.io**](http://URLScan.io) أو **VirusTotal** لفحص السمعة.

* ملاحظة النتيجة (Malicious / Suspicious).

***

### **4️⃣ فحص سمعة الدومين**

على الرغم من أن [`storage.googleapis.com`](http://storage.googleapis.com) دومين رسمي تابع لـ Google Cloud Storage، إلا أنه يُستخدم هنا لاستضافة صفحة تصيّد.

* **الحالة:** مشبوه / خبيث

* **الإجابة:** نعم

***

### **5️⃣ حساب الـ SHA-256 للصفحة**

تم حساب الـ SHA-256 للدومين [`storage.googleapis.com`](http://storage.googleapis.com) عبر:

`curl `[`storage.googleapis.com`](http://storage.googleapis.com)` | sha256sum`

النتيجة:

`13945ecc33afee74ac7f72e1d5bb73050894356c4bf63d02a1a53e76830567f5`

🔹 **معلومة مهمة:**

* إذا حسبت الـ SHA-256 لاسم الدومين كنص → هتحصل على هاش مختلف.

* إذا استخدمت `curl` لتحميل المحتوى ثم حسبت الـ SHA-256 → هتحصل على هاش **المحتوى الفعلي للصفحة** (وهو المطلوب في اللاب).

***

### **6️⃣ الاستنتاج – هل البريد Phishing؟**

كل المؤشرات تؤكد أن البريد الإلكتروني تصيّد (Phishing):

* انتحال هوية PayPal.

* لغة مختلفة (ألمانية) مع عروض مالية غير منطقية.

* رابط خبيث مستضاف على Google Cloud Storage.

* Return Path ودومينات غير رسمية.

**الإجابة:** نعم

***

### **7️⃣ جدول ملخّص للإجابات**

| السؤال                 | الإجابة                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Return Path**        | [bounce@rjttznyzjjzydnillquh.designclub.uk.com](mailto:bounce@rjttznyzjjzydnillquh.designclub.uk.com) |
| **Domain Name of URL** | [storage.googleapis.com](http://storage.googleapis.com)                                               |
| **Suspicious?**        | نعم                                                                                                   |
| **SHA-256 of Domain**  | 13945ecc33afee74ac7f72e1d5bb73050894356c4bf63d02a1a53e76830567f5                                      |
| **Is Email Phishing?** | نعم                                                                                                   |

***

### **8️⃣ التوصيات**

* حظر نطاق المرسل [`designclub.uk.com`](http://designclub.uk.com) ومنع أي مراسلات مستقبلية منه.

* رفع الرابط الخبيث إلى Google Safe Browsing للإزالة.

* تنبيه المستخدم المستهدف بعدم الضغط على أي روابط.

* مراجعة وتقوية سياسات الـ Email Gateway لاكتشاف الأنماط المشابهة مستقبلًا.

***

