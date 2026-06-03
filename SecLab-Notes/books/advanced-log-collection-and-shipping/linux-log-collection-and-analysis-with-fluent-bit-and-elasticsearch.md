---
id: "68fc53b81484bfe94764363a"
title: "Linux Log Collection & Analysis with Fluent Bit and Elasticsearch"
description: "Send linux auth logs via syslog to fluentbit syslog listener and parse all of them\nConfigure auditd on linux and send admin activities logs to fluentbit Parsethem\nThen outptut parsed auth logs and admin activites parsed logs to elasticsearch using fluentbit"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/books/advanced-log-collection-and-shipping/linux-log-collection-and-analysis-with-fluent-bit-and-elasticsearch"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-25T04:36:08.104Z"
updatedAt: "2026-01-25T15:35:47.127Z"
---

***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367102164/434070f6-302a-4cbe-839e-e209ea499621.png" align="center" fullwidth="false" />

| **Machine**      | **Name**       | **Internal IP**  | **Function**                                                              |
| ---------------- | -------------- | ---------------- | ------------------------------------------------------------------------- |
| 🖥️ **Server 1** | `elk-server`   | **192.168.1.16** | Contains Fluent Bit + Elasticsearch + Kibana (receives and analyzes logs) |
| 💻 **Client 2**  | `linux-client` | **192.168.1.20** | Contains `auth` + `auditd` logs, and sends logs to `elk-server`           |

> Dividing tasks between Client and Server ensures better security and organization for log collection and analysis.

***

# **1️⃣ ELK-Server Setup**

### **First, on the elk-server instance:**

* **Install Fluent Bit**:

```sh
sudo curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
|
Processing triggers for libc-bin (2.35-0ubuntu3.8) ...
Installation completed. Happy Logging!

lab-elk-n8n@lab-elk-n8n-VirtualBox:~$  cd /etc/fluent-bit/
lab-elk-n8n@lab-elk-n8n-VirtualBox:~$ /opt/fluent-bit/bin/fluent-bit -V
Fluent Bit v4.1.1
Git commit: 
```

Version **v4.1.1** was confirmed to be installed successfully.

***

# **2️⃣ Phase Two: Sending Linux Authentication Logs via Syslog to the Fluent Bit Syslog Listener and Parsing Them All**

### **🎯 Goal:**

* Configure **rsyslog** to send `authpriv.*` logs via **TCP** to Fluent Bit, and verify that Fluent Bit successfully receives and parses them using `syslog-rfc3164`.

### **Verifying Connection between Client and Collector:**

```sh
ip a  # 192.168.1.20
ping 192.168.1.16
```

> Client IP: 192.168.1.20 Collector IP: 192.168.1.16 ✅ *Successful connection between the client and the collector is confirmed.*

## **Client :**

### **Setting up rsyslog to Send Logs:**

1. Create a dedicated configuration file for Fluent Bit in `rsyslog`:

```sh
sudo nano /etc/rsyslog.d/fluentbit.conf
```

2. Add the following line to direct authentication logs to the **Collector**:

```sh
authpriv.* @@192.168.1.16:5140
& stop

authpriv.* @@192.168.1.16:5140
& stop
```

> ✅ *Successful log forwarding to the Collector is confirmed.*

### **Restarting the rsyslog service to apply the settings:**

```sh
sudo systemctl restart rsyslog
sudo systemctl status rsyslog
```

> ✅ *The service is confirmed to be running successfully.*

## **Collector :**

### **Verifying Connection and Fluent Bit Listening:**

1. Check the Fluent Bit status :

```sh
sudo systemctl status fluent-bit
```

2. Check for listening on port 5140 :

```sh
sudo ss -lntup | grep 5140
```

3. Configure the firewall to allow TCP connections :

```sh
sudo ufw enable
sudo ufw allow 5140/tcp
sudo ufw allow 5140/udp
sudo ufw reload
```

4. Restart the Fluent Bit service:

```sh
sudo systemctl restart fluent-bit
sudo systemctl status fluent-bit
```

### **Fluent Bit Configuration Files:**

* **/etc/fluent-bit/parsers.conf :**

```yaml
[PARSER]
    Name        syslog-rfc3164
    Format      regex
    Regex       /^\<(?<pri>[0-9]+)\>(?<time>[^ ]* {1,2}[^ ]* [^ ]*) (?<host>[^ ]*) (?<ident>[a-zA-Z0-9_\/\.\-]*)(?:\[(?<pid>[0-9]+)\])?(?:[^\:]*\:)? *(?<message>.*)$/
    Time_Key    time
    Time_Format %b %d %H:%M:%S
    Time_Keep   On
```

> The `syslog-rfc3164` was initially present in `parsers.conf`. I used it as a primary parser and can add more later for new logs.

* **/etc/fluent-bit/fluent-bit.conf :**

```yaml
[SERVICE]
    Flush        1
    Log_Level    info
    Parsers_File /etc/fluent-bit/parsers.conf

[INPUT]
    Name syslog
    Listen 0.0.0.0
    Port 5140
    Tag linux.auth
    Mode tcp
    Parser syslog-rfc3164

[FILTER]
    Name parser
    Match linux.auth
    Key_Name message
    Parser syslog-rfc3164

[OUTPUT]
    Name es
    Match linux.auth
    Host localhost
    Port 9200
    Index collection-auth-linux-logs
    HTTP_User elastic
    HTTP_Passwd 3lSq=GCEWU1ygpW_cEkl
    Type _doc
    Logstash_Format Off
    Suppress_Type_Name On
    TLS On
    TLS.Verify Off
```

### **Verifying Fluent Bit Operation:**

1. Start log monitoring:

```sh
sudo journalctl -u fluent-bit -f
```

2. Send a test from the Client machine:

```yaml
logger -p authpriv.alert "FINAL TEST: Syslog Client Config COMPLETE and PARSED!"
```

### **Verification in Kibana:**

* Check the logs in **Kibana** under the index: `collection-auth-linux-logs`:

> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367553624/9e1ca242-0596-4693-9823-a4b0129f2413.png" align="center" fullwidth="false" />
>
> The index: `collection-auth-linux-logs`

### **Results:**

* Logs were successfully sent to Elasticsearch via Fluent Bit and can be viewed in Kibana as follows:

> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367495893/6c288507-ccc0-48f4-9b94-331b558129ca.png" align="center" fullwidth="false" />
>
> The logs have indeed arrived:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367482869/729006a7-5f7e-4303-ba07-ddf5bb220db5.png" align="center" fullwidth="false" />

* Applying a filter: `ident:sudo` :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367391146/60c46b5c-09f4-4086-8b94-c91d27ed96ad.png" align="center" fullwidth="false" />

| **Property** | **Value**                                     | **Success Indication**                                                                                        |
| ------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `_index`     | `collection-auth-linux-logs`                  | **Output Success:** The log is stored in the correct index.                                                   |
| `host`       | `linuxvm`                                     | **Transmission Success:** The source host was identified.                                                     |
| `ident`      | `sudo`                                        | **Parsing Success:** The `sudo` process that generated the log was identified.                                |
| `message`    | `as-linux : 3 incorrect password attempts...` | **Natural Log:** This is a real message generated due to your failed attempts, not a test message (`logger`). |

> **Conclusion:** The first part of the task was completed with full success.

***

***

***

# **3️⃣ Configuring Auditd to Send Administrator Activity Logs:**

## **1. Client Setup:**

* The goal is to install and configure `auditd`, and then direct its logs to Fluent Bit.

### **Installing and Activating Auditd:**

```sh
sudo apt update
sudo apt install auditd audispd-plugins -y
```

* **Verifying Activation:**

```sh
sudo systemctl enable auditd
sudo systemctl start auditd
sudo systemctl status auditd
```

### **Configuring Auditd Rules**

We will add a simple rule to log all uses of `sudo` (Root/Superuser commands).

* **Editing the Rules File:**

```sh
sudo su
cd /etc/audit/
sudo nano /etc/audit/rules.d/fluent_admin.rules
```

* **I added the following rule:**

  * `/etc/audit/rules.d/fluent_admin.rules` :

```sh
-w /etc/sudoers -p wa -k actions-sudoers 
-w /etc/sudoers.d/ -p wa -k actions-sudoers-d 
-a always,exit -F arch=b64 -S execve -k admin_commands 
-a always,exit -F arch=b32 -S execve -k admin_commands
```

* **Reloading the Rules:**

```yaml
sudo systemctl restart auditd
```

* Navigate to the correct path and find the `syslog.conf` file:

```sh
sudo su

cd /etc/audit/plugins.d/

sudo nano syslog.conf
```

* I edited the file `/etc/audit/plugins.d/syslog.conf` to be as follows:

```sh
active = yes
direction = out
path = /sbin/audisp-syslog
type = always 
args = LOG_AUTHPRIV
format = string
```

* **Configuring rsyslog to read Auditd logs:** Since `auditd` logs are sent to `LOG_AUTHPRIV` (as per the configuration above), and I had already configured `rsyslog` to send `authpriv.*` over TCP:

* `/etc/rsyslog.d/fluentbit.conf` Add :

```sh
if $programname == 'auditd' then @@192.168.1.16:5141
& stop
```

> **Therefore, Auditd logs will be automatically sent** to Fluent Bit on port 5140!

### **Restarting Auditd :**

```sh
sudo systemctl restart auditd
```

## **Collector:**

> Since Auditd logs will be sent through the same channel (Syslog/TCP:5140), Fluent Bit is already receiving them. We only need to separate them and apply a new and complex **Parser** to them.

* Configure the firewall to allow TCP connections:

```sh
sudo ufw enable
sudo ufw allow 5141/tcp
sudo ufw reload
sudo ufw status 
```

### **Updating Fluent Bit Configuration:**

* **File** `/etc/fluent-bit/parsers.conf`:

```yaml
[PARSER]
    Name        auditd-simple
    Format      regex
    Regex       type=(?<type>[^ ]+)\s+msg=audit\((?<time>[^:]+):(?<record>[^)]+)\):\s*(?<message>.*)
```

* **File** `/etc/fluent-bit/fluent-bit.conf`: Add this section (before `[OUTPUT]`):

```yaml
[INPUT]
    Name syslog
    Listen 0.0.0.0
    Port 5141   
    Tag linux.auditd
    Mode tcp
    Parser auditd-simple

[FILTER]
    Name parser
    Match linux.auditd
    Key_Name message
    Parser auditd-simple
    Reserve_Data On

[OUTPUT]
    Name es
    Match linux.auditd
    Host localhost
    Port 9200
    Index collection-auditd-logs
    HTTP_User elastic
    HTTP_Passwd 3lSq=GCEWU1ygpW_cEkl
    Type _doc
    Logstash_Format Off
    Suppress_Type_Name On
    TLS On
    TLS.Verify Off
```

### **Verifying Fluent Bit Operation:**

* Start log monitoring on the **Collector**:

```sh
sudo journalctl -u fluent-bit -f
```

### **Confirming the Client sends auditd on port 5141:**

* On the client :

```sh
 logger -p local5.info "type=TEST msg=audit(0:0): test auditd log > AbdelwahabShandy OJT" -t auditd
```

### **Verification in Kibana:**

* The **Index**:

  * `collection-auditd-logs `:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367352734/520ff8a4-1286-4342-b245-0c00fb225841.png" align="center" fullwidth="false" />

* I chose `collection-auditd-logs`:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367325352/f1d24c60-9d88-4ea2-be42-3d782cdfb5c5.png" align="center" fullwidth="false" />

* I searched for the log using the filter `AbdelwahabShandy OJT`:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367269854/ee3afc45-8949-451f-aa3d-ff45acb9807e.png" align="center" fullwidth="false" />

> - The log successfully reached **Elasticsearch**.
>
> - The `type`, `record`, and `message` are correctly identified.
>
> - The message contains my name `> AbdelwahabShandy OJT` and appeared in the `message` without issues.
>
> - The `_timestamp` is automatically recorded by Fluent Bit/ES → good for time tracking.
>
> - **Fluent Bit + parser + Elasticsearch are 100% operational with auditd logs. ✅**

***

***

***

# **4️⃣ Creating a Single Data View to Combine All Indices and Performing a Final Test:**

* Create A New Index: `Coolection-Fluentbit-OJT` :

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367248507/fc915622-cdf4-4f45-9a85-f8a34f000756.png" align="center" fullwidth="false" />

* From the **client**, I will perform a test for `collection-auditd-logs` for auditd:

```sh
as-linux@linuxvm:~$ logger -p local5.info -t auditd "type=SYSCALL msg=audit(0:0): comm=\"ls\" exe=\"/usr/bin/ls\" uid=0 > AbdelwahabShandyahmed-OJT"
```

* I'll check them in the `collection-auditd-logs` index:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367228708/a51dbff9-c8a0-4c5c-88de-f647397496f8.png" align="center" fullwidth="false" />

### 1️⃣ `auth` Logs (collection-auth-linux-logs)

| `_index`                   | `host`  | `ident`    | `pri` | `message`                                                                      |
| -------------------------- | ------- | ---------- | ----- | ------------------------------------------------------------------------------ |
| collection-auth-linux-logs | linuxvm | test\_auth | 81    | FINAL TEST: Syslog Client Config COMPLETE and PARSED!AbdelwahabAhmedShandy-OJT |

* From the **client**, I will perform a test for `collection-auth-linux-logs` for auth:

```sh
logger -p authpriv.alert -t test_auth 'FINAL TEST: Syslog Client Config COMPLETE and PARSED!AbdelwahabAhmedShandy-OJT'
```

* And check them in the `collection-auth-linux-logs` index:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367212545/320c8c0a-d68f-44f4-a1f6-f126126bb999.png" align="center" fullwidth="false" />

### 2️⃣ `auditd` Logs (collection-auditd-logs)

| **\_index**            | **type** | **record** | **time**       | **message**                                                   |
| ---------------------- | -------- | ---------- | -------------- | ------------------------------------------------------------- |
| collection-auditd-logs | SYSCALL  | 0          | 0              | comm="ls" exe="/usr/bin/ls" uid=0 > AbdelwahabShandyahmed-OJT |
| collection-auditd-logs | CWD      | 4318       | 1761245247.761 | cwd="/home/as-linux"                                          |

* Every `auth` log was received and saved in `collection-auth-linux-logs`.

* Every `auditd` log was received and saved in `collection-auditd-logs`.

***

***

***

## ✅ Task Completion Summary

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761367195978/a1862aee-ccfc-4961-af45-0949fec68271.png" align="center" fullwidth="false" />

### 1️⃣ Linux Auth Logs

* **Action:** All authentication logs (`auth logs`) were sent from the Linux machine to **Fluent Bit** using the **syslog TCP** protocol on port 5140.

* **Verification:** Logs were received by Fluent Bit and **analyzed and separated using the** `syslog-rfc3164` Parser.

* **Output:** Logs were forwarded to **Elasticsearch** in the index: `collection-auth-linux-logs`

### 2️⃣ Linux Admin Activities (auditd)

* **Action:** `auditd` was configured to monitor administrative activities on the system.

* **Verification:** `auditd` logs were sent to Fluent Bit via TCP on port 5141 and **analyzed using the** `auditd-simple` Parser.

* **Output:** Logs were forwarded to **Elasticsearch** in the index: `collection-auditd-logs`

### 3️⃣ Fluent Bit Configuration

* **Inputs:**

  * Syslog auth logs (`Port 5140`)

  * Syslog auditd logs (`Port 5141`)

* **Filters:** Parsing for each log type (`syslog-rfc3164` and `auditd-simple`)

* **Outputs:** Elasticsearch, with each log saved to the correct index.

### 4️⃣ Verification

* Log reception was verified in Kibana for both indices:

  * `collection-auth-linux-logs` ✅

  * `collection-auditd-logs` ✅

* Each log displays the correct details: host, ident/type, pri/record, message, timestamp

> **Final Result:** The task is completed successfully. All authentication and administrative activity logs are being processed, analyzed, and stored correctly in Elasticsearch.

***

🔹 Sources

* [https://www.rsyslog.com/doc/configuration/index.html](https://www.rsyslog.com/doc/configuration/index.html)

* [https://linux.die.net/man/8/auditd](https://linux.die.net/man/8/auditd)

* [https://docs.fluentbit.io/manual/](https://docs.fluentbit.io/manual/)

