---
id: "68f45485a3ebb489b50a1408"
title: "Installing Logstash"
description: "There are several different ways to install Logstash, whether manually or via a package manager or Docker."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/logstash/getting-started-with-logstash/installing-logstash"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-19T03:01:25.654Z"
updatedAt: "2026-01-25T15:35:47.102Z"
---

# 🧩 **Installing Logstash**

### 🔹 **1️⃣ From Downloaded Binary**

You can download the appropriate version for your operating system from:\
🔗 [https://www.elastic.co/downloads](https://www.elastic.co/downloads)

Available packages:

* `.tar.gz` (for Linux)

* `.zip` (for Windows)

* `.deb` (for Debian/Ubuntu distributions)

* `.rpm` (for RHEL/CentOS distributions)

📦 **Installation Steps:**

1. Download the appropriate file.

2. Unpack it into a folder (avoid using paths that contain `:`).

3. Run Logstash from within the extracted directory.

💡 **Note:**

* The standard version is free under the **Elastic License** (includes free and trial paid features).

* There’s also an **OSS (Open Source)** edition licensed under **Apache 2.0**.

***

## 🔹 **2️⃣ From Package Repository**

### 🟢 **APT (Ubuntu/Debian):**

1. **Add the public key:**

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elastic-keyring.gpg
```

2. **Install HTTPS transport if needed:**

```bash
sudo apt-get install apt-transport-https
```

3. **Add the repository:**

```bash
echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-9.x.list
```

4. **Update and install Logstash:**

```bash
sudo apt-get update && sudo apt-get install logstash
```

⚠️ **Important Note:**\
Do not use `add-apt-repository` because it will add a `deb-src` line, which does not have a valid source.

***

#### 🔵 **YUM (RHEL/CentOS):**

1. **Import the public key:**

```bash
sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

2. **Create the repository file** `/etc/yum.repos.d/logstash.repo`:

```bash
[logstash-9.x]
name=Elastic repository for 9.x packages
baseurl=https://artifacts.elastic.co/packages/9.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

3. **Install Logstash:**

```bash
sudo yum install logstash
```

***

### 🔹 **3️⃣ Docker (Optional)**

You can run Logstash directly inside a **Docker container**:

```bash
docker pull docker.elastic.co/logstash/logstash:9.0.0
```

📚 **Full documentation:**\
🔗 [Running Logstash on Docker](https://www.elastic.co/guide/en/logstash/current/docker.html)

***

***

***

***

## 🧩 **Installing Logstash (تثبيت Logstash)**

### 🔹 **1️⃣ من الملف (Downloaded Binary)**

يمكنك تحميل النسخة المناسبة لنظامك من:\
🔗 [https://www.elastic.co/downloads](https://www.elastic.co/downloads)

الملفات المتاحة:

* `.tar.gz` (للـ Linux)

* `.zip` (للـ Windows)

* `.deb` (لتوزيعات Debian/Ubuntu)

* `.rpm` (لتوزيعات RHEL/CentOS)

📦 **خطوات التثبيت:**

1. حمل الملف المناسب.

2. فك الضغط (unpack) في مجلد لا يحتوي على `:` في المسار.

3. شغل Logstash من داخل المجلد.

💡 الملاحظة:

* النسخة العادية مجانية تحت رخصة **Elastic License** (بها ميزات مجانية وتجريبية مدفوعة).

* يوجد إصدار **OSS (Open Source)** بميزات Apache 2.0 فقط.

***

### 🔹 **2️⃣ من Package Repository**

#### 🟢 **APT (Ubuntu/Debian):**

1. **أضف المفتاح العام:**

```sh
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elastic-keyring.gpg
```

2. **ثبت حزمة HTTPS لو لزم:**

```sh
sudo apt-get install apt-transport-https
```

3. **أضف المستودع:**

```sh
echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-9.x.list
```

4. **حدث النظام وثبت Logstash:**

```sh
sudo apt-get update && sudo apt-get install logstash
```

⚠️ ملاحظة مهمة:\
لا تستخدم `add-apt-repository` لأنه سيضيف سطر `deb-src` الذي لا يوجد له مصدر.

***

#### 🔵 **YUM (RHEL/CentOS):**

1. **استورد المفتاح العام:**

```sh
sudo rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

2. **أنشئ ملف** `/etc/yum.repos.d/logstash.repo`:

```sh
[logstash-9.x]
name=Elastic repository for 9.x packages
baseurl=https://artifacts.elastic.co/packages/9.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

3. **ثبت Logstash:**

```sh
sudo yum install logstash
```

***

### 🔹 **3️⃣ Docker (اختياري)**

تقدر تشغل Logstash داخل **حاوية Docker** مباشرة:

```sh
docker pull docker.elastic.co/logstash/logstash:9.0.0
```

📚 الوثائق الكاملة:\
🔗 [Running Logstash on Docker](https://www.elastic.co/guide/en/logstash/current/docker.html)

