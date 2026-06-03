---
id: "68f664fd65493f91cc680fcb"
title: "Centralized Log Collection & Indexing with Logstash"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/books/advanced-log-collection-and-shipping/centralized-log-collection-and-indexing-with-logstash"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-20T16:36:13.580Z"
updatedAt: "2026-01-25T15:35:47.121Z"
---

# **1️⃣ ELK/ SIEM Machine Setup**

## **1️⃣Ensuring the ELK (Elasticsearch + Logstash + Kibana) Machine is Working Correctly:**

### **Verification and Installation Steps:**

1. **Verify Elasticsearch:**

   * I used the following command to check the service's operation and connect to it using **HTTPS** and the user credentials `elastic`:

```sh
curl -k -u elastic:3lSq=GCEWU1ygpW_cEkl "https://192.168.1.16:9200/"
{
  "name" : "lab-elk-n8n-VirtualBox",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "EtKojqmjQLiczGlz67ig6A",
  "version" : {
    "number" : "9.1.4",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "0b7fe68d2e369469ff9e9f344ab6df64ab9c5293",
    "build_date" : "2025-09-16T22:05:19.073893347Z",
    "build_snapshot" : false,
    "lucene_version" : "10.2.2",
    "minimum_wire_compatibility_version" : "8.19.0",
    "minimum_index_compatibility_version" : "8.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

> It was confirmed that **Elasticsearch is working correctly**, and the response containing the version information and cluster status appeared.

* The service status was also checked:

```sh
systemctl status elasticsearch
```

> Result: **active (running)**.

2. **Verify Kibana:**

   * The service status on the machine was checked:

```sh
lab-elk-n8n@lab-elk-n8n-VirtualBox:~$ sudo systemctl status kibana
● kibana.service - Kibana
     Loaded: loaded (/lib/systemd/system/kibana.service; enabled; vendor preset: enabled)
     Active: active (running) since Sun 2025-10-19 21:29:10 EEST; 27min ago
       Docs: https://www.elastic.co
   Main PID: 755 (node)
      Tasks: 11 (limit: 4602)
     Memory: 606.3M
        CPU: 2min 57.899s
     CGroup: /system.slice/kibana.service
             └─755 /usr/share/kibana/bin/../node/glibc-217/bin/node /usr/share/kibana/bin/../src/cli/dist
```

> Result: **active (running)**

3. **Install Logstash:**

   * Add the Elasticsearch GPG key:

```sh
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elastic-keyring.gpg
```

* Add the package source:

```sh
echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-9.x.list
```

* Install Logstash:

```sh
sudo yum install logstash
```

* **Run and Verify Logstash:**

  * Enable the service to run automatically on boot:

```sh
sudo systemctl enable logstash
```

* Start the service :

```sh
sudo systemctl start logstash
```

* Check the service status after installation:

```sh
sudo systemctl status logstash
```

Result: **active (running)**.

***

## **2️⃣ Verification of Network Accessibility**

* From the **ELK (SIEM) machine**:

```sh
ip a
```

> ELK IP : 192.168.1.16

* From the **other Linux machine (LinuxVM)**:

```sh
as-linux@linuxvm:~$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:b6:18:a0 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.20/24 brd 192.168.1.255 scope global dynamic noprefixroute enp0s3
       valid_lft 548sec preferred_lft 548sec
    inet6 fe80::5727:c749:ef56:7562/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
```

> 192.168.1.20

* Perform a **ping** from **LinuxVM** to the **ELK machine**:

```sh
as-linux@linuxvm:~$ ping 192.168.1.16
PING 192.168.1.16 (192.168.1.16) 56(84) bytes of data.
64 bytes from 192.168.1.16: icmp_seq=1 ttl=64 time=1.82 ms
64 bytes from 192.168.1.16: icmp_seq=2 ttl=64 time=0.697 ms
64 bytes from 192.168.1.16: icmp_seq=3 ttl=64 time=0.822 ms
64 bytes from 192.168.1.16: icmp_seq=4 ttl=64 time=0.680 ms
64 bytes from 192.168.1.16: icmp_seq=5 ttl=64 time=0.595 ms
^C
--- 192.168.1.16 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4115ms
rtt min/avg/max/mdev = 0.595/0.922/1.820/0.454 ms
```

> The devices are connected to the network and can **communicate correctly** with each other.

***

### **3️⃣ Preparing the Indices to Receive Logs**

#### **A. Manually Creating a New Index**

* Indices can be created manually using `curl`.

* Example of creating an index specifically for **Windows logs**:

```sh
curl -k -u elastic:3lSq=GCEWU1ygpW_cEkl -X PUT "https://192.168.1.16:9200/windows-logs-?pretty"
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "windows-logs"
}
```

* Example of creating an index specifically for **Nginx logs** :

```sh
curl -k -u elastic:3lSq=GCEWU1ygpW_cEkl -X PUT "https://192.168.1.16:9200/nginx-logs-?pretty"
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "nginx-logs"
}
```

> ✅ This means the **indices were successfully created in Elasticsearch**.

### **How to Verify Their Presence in Kibana**

1. I opened **Kibana** in the browser.

2. Go to **Stack Management → Index Management**.

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760978429129/d167a0ec-3b29-4853-ade1-24d2e086372b.png" alt="" align="center" fullwidth="true" />

> * ✅ The indices `windows-logs` and `nginx-logs` are officially present in **Elasticsearch**.
>
> * ✅ **Kibana** sees them normally.

* I have now completed the **required settings for the ELK/SIEM Machine**. I can now proceed with the rest of the task.

***

***

***

***

# **2️⃣ Setting up the Linux Machine and Filebeat/Logstash Configurations**

### **1️⃣ Installing Filebeat:**

```sh
# Download the deb package from Elastic official site
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-9.1.5-amd64.deb

# Install the package
sudo dpkg -i filebeat-9.1.5-amd64.deb
```

### 2️⃣ Preparing Nginx dummy logs or any logs for testing.

##### 1️⃣ Installing Nginx:

```sh
sudo apt update
sudo apt install nginx -y
```

##### 2️⃣ Verifying the service status:

```sh
sudo systemctl status nginx
```

> active (running)

##### 3️⃣ Viewing the Test Page:

I opened the browser or used curl: `curl `[`http://localhost`](http://localhost)

This displayed the **default Nginx HTML page**.

##### 📁 **Log Locations:**

* After starting, Nginx began generating logs in:

```sh
/var/log/nginx/access.log
/var/log/nginx/error.log
```

* I confirmed this :

```sh
sudo tail -f /var/log/nginx/access.log
```

### **3️⃣ Configuring Filebeat to send logs to Logstash on the ELK machine.**

1. I opened the Filebeat configuration file `filebeat.yml` on the Filebeat machine, for example:

```sh
sudo nano /etc/filebeat/filebeat.yml
```

##### **1️⃣ Configuring the Filebeat Input**

* I modified the `filebeat.inputs` section in `filebeat.yml` to actually read the Nginx files:

```yaml
# ========= Filebeat inputs =========
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

> Upon researching, I also learned that if the **nginx module** is enabled, this part is automatically activated.

##### **2️⃣ Configuring the Logstash Output**

* I enabled the output:

```yaml
# ------------- Logstash Output -------------
#output.logstash:
   # The Logstash hosts
   hosts: ["192.168.1.16:5045"]
```

##### **3️⃣ Enabling Modules (Nginx & System)**

* The results from the `filebeat modules list` commands were excellent :

```sh
filebeat version

sudo filebeat modules list

sudo filebeat modules enable nginx
```

> The `nginx` module will collect the web logs.

##### **4️⃣ Nginx Module Configuration**

* The file `/etc/filebeat/modules.d/nginx.yml`:

```sh
# Module: nginx
# Docs: https://www.elastic.co/guide/en/beats/filebeat/9.1/filebeat-module-nginx.html

- module: nginx
  # Access logs
  access:
    enabled: true
    var.paths: ["/var/log/nginx/access.log"]

    # Set custom paths for the log files. If left empty,
    # Filebeat will choose the paths depending on your OS.
    #var.paths:

  # Error logs
  error:
    enabled: true
    var.paths: ["/var/log/nginx/error.log"]
```

* **Important Note**: Since I enabled **modules**, I can delete or comment out the `filebeat.inputs` section from `filebeat.yml` to avoid **data duplication**.

* Since you have enabled modules, you can delete or suspend the filebeat.inputs section of filebeat.yml to avoid duplicate data.

  * That is, leave it like this :

```yaml
# filebeat.inputs:
# - type: filestream
# id: nginx-access-logs
# enabled: true
# paths:
# - /var/log/nginx/access.log
# - /var/log/nginx/error.log
```

## **Connecting Logstash to Elasticsearch so logs are received and displayed in Kibana**

##### **1️⃣ Open the Logstash Configuration File**

* I opened the default pipeline file (or the one used for sending logs):

```sh
sudo nano /etc/logstash/conf.d/nginx-pipeline.conf
```

##### **2️⃣ Add the Following Configuration:**

```yaml
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

* Inside `/etc/logstash/pipelines.yml`, I added this configuration:

```yaml
- pipeline.id: nginx-pipeline
  path.config: "/etc/logstash/conf.d/nginx-pipeline.conf"
```

##### **3️⃣ Testing the Configuration**

* I tested the Logstash configuration to ensure it was correct before running it :

```sh
sudo /usr/share/logstash/bin/logstash --config.test_and_exit -f /etc/logstash/conf.d/nginx-pipeline.conf
```

* Initially, an error appeared that Logstash could not be run as **root**, so it was solved by running it with the **logstash** user :

```sh
sudo -u logstash /usr/share/logstash/bin/logstash --config.test_and_exit -f /etc/logstash/conf.d/nginx-pipeline.conf
```

> ✅ Result: `Configuration OK`

## **Sending Logs from Filebeat to Logstash**

### **1️⃣ Ensuring Logstash is Running**

* On the ELK machine (where Logstash is located):

```sh
sudo systemctl status logstash
```

> The result showed: `active (running)`. This is correct.

### **2️⃣ Enable and Start Filebeat**

* On the Linux machine (where Nginx is located):

```sh
sudo systemctl enable filebeat
sudo systemctl start filebeat
```

### **3️⃣ Ensuring Filebeat is Actually Sending Data**:

* I opened the **Filebeat** log :

```sh
sudo journalctl -u filebeat -f
```

* If the configuration is correct, you will see messages similar to:

```sh
Connected to logstash host: 192.168.1.16:5045
Successfully published events
```

> This means **Filebeat successfully connected to Logstash** and sent the logs. ✅

* To generate many logs at once, I ran this Bash loop:

```sh
for i in {1..10000}; do
  curl -s http://localhost/ > /dev/null
done
```

### **4️⃣ Ensuring Logstash is Receiving Data**

* On the ELK machine (Logstash) :

```sh
sudo tail -f /var/log/logstash/logstash-plain.log
```

> If everything is correct, you will see messages like: `[INFO ] Successfully processed events`

### **5️⃣ Checking Elasticsearch**

* I confirmed that **Logstash** actually stored the logs in **Elasticsearch** :

```sh
curl -k -u elastic:3lSq=GCEWU1ygpW_cEkl -X GET "https://localhost:9200/_cat/indices?v"
```

> i will see something like: `open nginx-logs-2025.10.19 ...`

### **6️⃣ Checking Data within Kibana**

* I opened Kibana → **Discover → Create a data view**

* And typed: `nginx-logs*` :

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760978601541/c2f57ec3-3f53-4d1e-9872-e9ae3878cdd6.png" alt="" align="center" fullwidth="true" />

* And indeed, it started collecting logs :

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760978634765/c2194b6b-a3ee-4add-963f-70d098b42068.png" alt="" align="center" fullwidth="true" />

* **Practical confirmation that the first part of the task was successfully completed**:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760978652881/73e432ae-0ab9-43c7-afe6-2e31d2b1d527.png" alt="" align="center" fullwidth="true" />

* **Filebeat** read the logs from `/var/log/nginx/access.log` → This is the **input**.

* The data was transformed and reached **Logstash**.

* It was stored in a **separate index**: `nginx-logs-2025.10.20` → This was required in the pipeline step, ensuring each log source has its own index.

* The `tags` indicate the log type (nginx), and the pipeline is able to differentiate between them.

**Linux Logs Collection**, everything is correct:

* **Filebeat is installed on the Linux machine** ✅

* **Nginx logs are present and ready (dummy logs)** and are actually being collected ✅

* **Filebeat is configured to send logs to Logstash** ✅

* **Logs reached Elasticsearch and were stored in a separate index** ✅

This means all steps have been achieved and the pipeline is working correctly for the Linux/Nginx logs.

***

***

***

***

# **3️⃣ Setting up the Windows Machine and Winlogbeat with Logstash**

> Steps to set up the **Windows Machine and Winlogbeat with Logstash** from scratch.

### **1️⃣ Preparing the Windows Machine**

1. I opened PowerShell as **Administrator**.

2. I checked the network (confirming connection to the Logstash server via IP).

```powershell
PS C:\Windows\system32> ping 192.168.1.16

Pinging 192.168.1.16 with 32 bytes of data:
Reply from 192.168.1.16: bytes=32 time=4ms TTL=64
Reply from 192.168.1.16: bytes=32 time=1ms TTL=64
Reply from 192.168.1.16: bytes=32 time=1ms TTL=64
Reply from 192.168.1.16: bytes=32 time<1ms TTL=64

Ping statistics for 192.168.1.16:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 4ms, Average = 1ms
PS C:\Windows\system32>
```

> The two machines can see each other. This is correct.

### **2️⃣ Installing Winlogbeat**

1. I downloaded Winlogbeat from the official website: [Elastic Winlogbeat Downloads](https://www.elastic.co/downloads/beats/winlogbeat)

2. I extracted the contents to a suitable folder, for example: `C:\Program Files\Winlogbeat\`

* I renamed the folder to `Winlogbeat`.

  1. I opened PowerShell as Administrator and navigated to the folder:

```powershell
cd "C:\Program Files\Winlogbeat"
```

2. I installed the service using the following command :

```powershell
.\install-service-winlogbeat.ps1
```

* If the script execution policy was not enabled, I could temporarily change it using :

```powershell
PowerShell.exe -ExecutionPolicy Unrestricted -File .\install-service-winlogbeat.ps1
```

### **3️⃣ Configuring Winlogbeat to Send Data to Logstash**

1. I opened `winlogbeat.yml` with **Notepad as Administrator**.

2. I disabled the Elasticsearch output by commenting out the following line: `# output.elasticsearch:`

3. I enabled the Logstash output by uncommenting and modifying the following lines to suit my setup:

```yaml
output.logstash:
  hosts: ["192.168.1.16:5044"]
```

4. I kept the rest of the settings as they were and saved the changes.

## **4️⃣ Configuring Logstash to Receive Winlogbeat Data**

* I opened the default pipeline file (or the one used for sending logs) :

```sh
sudo nano /etc/logstash/conf.d/windows-logs.conf 
```

##### **2️⃣ Add the Following Configuration:**

```yaml
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

* Logstash will listen on **port 5044** for any incoming data from Winlogbeat.

* Any incoming data will automatically be assigned the **tag = "windows"**.

* Every log with the **windows** tag will be sent to Elasticsearch on host **192.168.1.16**.

* A **new index named** [`windows-logs-YYYY.MM`](http://windows-logs-YYYY.MM)`.dd` will be created daily.

* The connection is secured with SSL, but certificate verification is disabled (`ssl_verification_mode => "none"`).

* Inside `/etc/logstash/pipelines.yml`, I added this configuration:

```yaml
- pipeline.id: windows-pipeline
  path.config: "/etc/logstash/conf.d/windows-pipeline.conf"
```

* I tested the Logstash configuration:

```sh
sudo -u logstash /usr/share/logstash/bin/logstash --config.test_and_exit -f /etc/logstash/conf.d/windows-pipeline.conf 
|
|
[INFO ] 2025-10-20 05:46:50.876 [LogStash::Runner] runner - Using config.test_and_exit mode. Config Validation Result: OK. Exiting Logstash
```

> Everything is normal, the files are valid. If you want to actually run Logstash

## **5️⃣ Installing Winlogbeat as a Service**

1. In **PowerShell** As Admin :

```powershell
.\install-service-winlogbeat.ps1
```

2. I checked the service status:

```powershell
Get-Service winlogbeat
```

* It was **Running**.

## **5️⃣ Verification of Transmission to Logstash**

1. I opened PowerShell on the Windows instance and ran log monitoring:

```powershell
PS C:\Program Files\Winlogbeat> .\winlogbeat.exe test config
Config OK
PS C:\Program Files\Winlogbeat> .\winlogbeat.exe test output
logstash: 192.168.1.16:5044...
  connection...
    parse host... OK
    dns lookup... OK
    addresses: 192.168.1.16
    dial up... OK
  TLS... WARN secure connection disabled
  talk to server... OK
```

2. I checked for Windows logs to appear in **Kibana** or via the **Logstash logs**.

```powershell
.\winlogbeat.exe -e -c .\winlogbeat.yml
```

* This line confirms the connection with Logstash was successful:

```yaml
"Connection to backoff(async(tcp://192.168.1.16:5044)) established"
```

### **5️⃣ Checking Elasticsearch**

* I confirmed that Logstash actually stored the logs in Elasticsearch:

```sh
curl -k -u elastic:3lSq=GCEWU1ygpW_cEkl -X GET "https://localhost:9200/_cat/indices?v"
```

> I will see something like: `open windows-logs-2025.10.20 ...`

### **6️⃣ Checking Data within Kibana**

افتح Kibana → **discover → Create a data view**

* And typed: `windows-logs-*`:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760978687492/43ff005d-0848-4182-bea0-6aaba5ef4c38.png" alt="" align="center" fullwidth="true" />

* **Practical confirmation that the first part of the task was successfully completed**:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760978708908/09fffc66-2ad8-4326-a3ed-91b62206efe8.png" alt="" align="center" fullwidth="true" />

> The **core pipeline**: **Winlogbeat** → **Logstash** → **Elasticsearch** → **Kibana** was fully implemented.

***

***

***

***

# **4️⃣ Final Verification**

`windows-logs` :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760978723067/5d43ab36-0534-4ea6-8240-b855edf74655.png" alt="" align="center" fullwidth="true" />

`nginx-logs` :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760978732828/cc3cca4f-155b-45b5-822d-1a078f47db34.png" alt="" align="center" fullwidth="true" />

**I have now completed everything that was required.**

***

