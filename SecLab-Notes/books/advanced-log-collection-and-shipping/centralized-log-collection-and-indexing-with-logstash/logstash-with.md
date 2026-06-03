---
id: "68fc575df4e4e305610124d4"
title: "🧩 Logstash with Winlogbeat Integration"
description: "Set up Winlogbeat on Windows to send event logs to Logstash, then store them in Elasticsearch and display them in Kibana."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/books/advanced-log-collection-and-shipping/centralized-log-collection-and-indexing-with-logstash/logstash-with"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-25T04:51:41.199Z"
updatedAt: "2026-01-25T15:35:47.122Z"
---

# ⚙️ **First: Install Logstash on the Server that hosts Elasticsearch and Kibana**

### 1️⃣ **Add the Elasticsearch GPG key:**

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elastic-keyring.gpg
```

### 2️⃣ **Add the package source:**

```bash
echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-9.x.list
```

### 3️⃣ **Install Logstash:**

```bash
sudo yum install logstash
```

### 4️⃣ **Enable and start the service:**

```bash
sudo systemctl enable logstash
sudo systemctl start logstash
sudo systemctl status logstash
```

🔹 **Expected result:** `active (running)`

***

# 💻 **Second: Configure the Windows Machine and Winlogbeat**

### 1️⃣ **Prepare the machine**

Open **PowerShell as Administrator**.

Make sure the machine can connect to the **Logstash server** via its IP.

### 2️⃣ **Install Winlogbeat**

Download **Winlogbeat** from the official Elastic website.

Extract it into a suitable directory:

```bash
C:\Program Files\Winlogbeat\
```

Rename the folder to **Winlogbeat**.

Open PowerShell and navigate to the directory:

```bash
cd "C:\Program Files\Winlogbeat"
```

Install the service:

```bash
.\install-service-winlogbeat.ps1
```

⚠️ If you face issues running scripts, use:

```bash
PowerShell.exe -ExecutionPolicy Unrestricted -File .\install-service-winlogbeat.ps1
```

***

# 🧾 **Third: Configure Winlogbeat to send data to Logstash**

Open the following file as Administrator:

```bash
C:\Program Files\Winlogbeat\winlogbeat.yml
```

Then:

Disable the Elasticsearch output:

```bash
# output.elasticsearch:
```

Enable the Logstash output and edit the IP:

```bash
output.logstash:
  hosts: ["192.168.1.16:5044"]
```

After editing, **save the file**.

***

# 🔄 **Fourth: Configure Logstash to receive Winlogbeat data**

Open the configuration file:

```bash
sudo nano /etc/logstash/conf.d/windows-logs.conf
```

Add the following configuration:

```bash
input {
  beats {
    port => 5044
    tags => ["windows"]
  }
}

output {
  if "windows" in [tags] {
    elasticsearch {
      hosts => ["https://192.168.1.16:9200"]
      index => "windows-logs-%{+YYYY.MM.dd}"
      user => "elastic"
      password => "3lSq=GCEWU1ygpW_cEkl"
      ssl_enabled => true
      ssl_verification_mode => "none"
    }
  }
}
```

🎯 **Explanation:**

* Logstash listens for data on port **5044**.

* Any data tagged with **windows** is sent to **Elasticsearch**.

* A new index is created **daily**.

* The connection is **secured with SSL**, but certificate verification is **disabled**.

***

🧩 **Add the pipeline to Logstash**

Open the pipeline file:

```bash
sudo nano /etc/logstash/pipelines.yml
```

Add the following entry:

```bash
- pipeline.id: windows-pipeline
  path.config: "/etc/logstash/conf.d/windows-logs.conf"
```

Verify the configuration:

```bash
sudo -u logstash /usr/share/logstash/bin/logstash --config.test_and_exit -f /etc/logstash/conf.d/windows-logs.conf
```

🔹 **Expected result:**

```bash
Config Validation Result: OK. Exiting Logstash
```

***

# 🧠 **Fifth: Verify Winlogbeat operation**

Start the service:

```bash
.\install-service-winlogbeat.ps1
```

Check its status:

```bash
Get-Service winlogbeat
```

🔹 **Expected result:** `Running`

***

# 🔍 **Sixth: Test connection with Logstash**

In PowerShell:

```bash
.\winlogbeat.exe test config
.\winlogbeat.exe test output
```

**Expected result:**

```bash
logstash: 192.168.1.16:5044...
  connection... OK
  TLS... WARN secure connection disabled
  talk to server... OK
```

To monitor live sending:

```bash
.\winlogbeat.exe -e -c .\winlogbeat.yml
```

🔹 You should see a line similar to:

```bash
Connection to backoff(async(tcp://192.168.1.16:5044)) established
```

***

# 🧾 **Seventh: Verify in Elasticsearch**

```bash
curl -k -u elastic:3lSq=GCEWU1ygpW_cEkl -X GET "https://localhost:9200/_cat/indices?v"
```

🔹 **Example output:**

```bash
open windows-logs-2025.10.20 ...
```

***

# 📊 **Eighth: Verify data in Kibana**

Open **Kibana → Discover → Create Data View**

Enter:

```bash
windows-logs-*
```

***

### ✅ **Final Result**

The full pipeline has been successfully implemented:\
**Winlogbeat → Logstash → Elasticsearch → Kibana**

***

***

***

