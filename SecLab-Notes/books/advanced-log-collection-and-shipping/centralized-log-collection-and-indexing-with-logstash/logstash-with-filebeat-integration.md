---
id: "68fc5b01ae9077354a4adb11"
title: "🧩 Logstash with Filebeat Integration"
description: "Set up Filebeat on a Linux machine to collect Nginx logs and send them to Logstash, to be parsed and stored in Elasticsearch, and then viewed in Kibana"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/books/advanced-log-collection-and-shipping/centralized-log-collection-and-indexing-with-logstash/logstash-with-filebeat-integration"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-25T05:07:13.647Z"
updatedAt: "2026-01-25T15:35:47.139Z"
---

## ⚙️ **1️⃣ Install Filebeat on the Linux Machine**

```bash
# Download the deb package from Elastic official site
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-9.1.5-amd64.deb

# Install the package
sudo dpkg -i filebeat-9.1.5-amd64.deb
```

***

## 🌐 **2️⃣ Prepare Nginx Logs (Dummy Logs)**

🔹 **Install Nginx:**

```bash
sudo apt update
sudo apt install nginx -y
```

🔹 **Check if the service is running:**

```bash
sudo systemctl status nginx
```

**Expected result:** `active (running)`

🔹 **Test the default page:**

```bash
curl http://localhost
```

You should see the default Nginx HTML page content.

📁 **Log file locations:**

```bash
/var/log/nginx/access.log
/var/log/nginx/error.log
```

To monitor logs in real time:

```bash
sudo tail -f /var/log/nginx/access.log
```

***

## ⚙️ **3️⃣ Configure Filebeat to Send Logs to Logstash**

Open Filebeat configuration:

```bash
sudo nano /etc/filebeat/filebeat.yml
```

🔸 **(A) Input Configuration:**

```bash
filebeat.inputs:
- type: filestream
  id: nginx-access-logs
  enabled: true
  paths:
    - /var/log/nginx/access.log
    - /var/log/nginx/error.log
  ignore_older: 0
  close_inactive: 0
```

📝 *Note:* Enabling the Nginx module automatically activates input collection, so you can later comment this section to avoid duplicate data.

***

🔸 **(B) Logstash Output Configuration:**

```bash
#output.logstash:
   hosts: ["192.168.1.16:5045"]
```

***

🔸 **(C) Enable Nginx and System Modules:**

```bash
filebeat version
sudo filebeat modules list
sudo filebeat modules enable nginx
```

***

🔸 **(D) Configure the Nginx Module:**

Open the module configuration:

```bash
sudo nano /etc/filebeat/modules.d/nginx.yml
```

Ensure the following settings:

```bash
- module: nginx
  access:
    enabled: true
    var.paths: ["/var/log/nginx/access.log"]
  error:
    enabled: true
    var.paths: ["/var/log/nginx/error.log"]
```

✅ *Note:* After enabling the module, comment out the `filebeat.inputs` section in `filebeat.yml` to prevent duplicate data:

```bash
# filebeat.inputs:
# - type: filestream
#   enabled: true
#   paths:
#     - /var/log/nginx/access.log
#     - /var/log/nginx/error.log
```

***

## 🧩 **4️⃣ Configure Logstash to Receive Filebeat Data**

Open the pipeline configuration:

```bash
sudo nano /etc/logstash/conf.d/nginx-pipeline.conf
```

Add the following configuration:

```bash
input {
  beats {
    port => 5045
    tags => ["nginx"]
  }
}

output {
  elasticsearch {
    hosts => ["https://192.168.1.16:9200"]
    index => "nginx-logs-%{+YYYY.MM.dd}"
    user => "elastic"
    password => "3lSq=GCEWU1ygpW_cEkl"
    ssl_enabled => true
    ssl_verification_mode => "none"
  }
}
```

***

## 🔍 **5️⃣ Test the Logstash Configuration**

Verify configuration correctness:

```bash
sudo -u logstash /usr/share/logstash/bin/logstash --config.test_and_exit -f /etc/logstash/conf.d/nginx-pipeline.conf
```

✅ **Expected result:** `Configuration OK`

***

## 🚀 **6️⃣ Send Logs from Filebeat to Logstash**

🔹 **Ensure Logstash is running:**

```bash
sudo systemctl status logstash
```

**Expected result:** `active (running)`

🔹 **Enable and start Filebeat:**

```bash
sudo systemctl enable filebeat
sudo systemctl start filebeat
```

🔹 **Check Filebeat output:**

```bash
sudo journalctl -u filebeat -f
```

You should see:

```bash
Connected to logstash host: 192.168.1.16:5045
Successfully published events
```

To generate a large number of logs for testing:

```bash
for i in {1..10000}; do curl -s http://localhost/ > /dev/null; done
```

🔹 **Check Logstash logs:**

```bash
sudo tail -f /var/log/logstash/logstash-plain.log
```

Expected line:

```bash
[INFO ] Successfully processed events
```

***

## 🧠 **7️⃣ Verify in Elasticsearch**

```bash
curl -k -u elastic:3lSq=GCEWU1ygpW_cEkl -X GET "https://localhost:9200/_cat/indices?v"
```

Expected output:

```bash
open nginx-logs-2025.10.19 ...
```

***

## 📊 **8️⃣ View Data in Kibana**

Open **Kibana → Discover → Create Data View**

Enter:

```bash
nginx-logs*
```

📈 You should now see live log data, confirming that the entire setup is working perfectly:

✅ **Filebeat** reads logs from `/var/log/nginx/access.log`\
✅ **Logstash** receives and processes the data\
✅ **Elasticsearch** stores it in a dedicated index\
✅ **Kibana** displays the results

***

### ✅ **Final Result**

The pipeline was successfully implemented:\
**Filebeat → Logstash → Elasticsearch → Kibana**

Linux/Nginx log collection is now running efficiently. 🎯

***

***

***

