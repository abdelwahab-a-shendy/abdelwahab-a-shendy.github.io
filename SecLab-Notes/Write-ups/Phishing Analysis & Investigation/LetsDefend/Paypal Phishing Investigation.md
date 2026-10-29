# Paypal Phishing Investigation (LetsDefend) 

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

> **Report Prepared By: Abdelwahab Ahmed Shandy
> 22-09-2025
> Phishing Email – LetsDefend**
