---
id: "68f5b15dd010eb20d977c6ca"
title: "Advanced SIEM HOME LAB"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/books/advanced-log-collection-and-shipping"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-20T03:49:49.697Z"
updatedAt: "2026-01-25T15:35:47.119Z"
---

# **Advanced Log Collection and Shipping :**

### **Lab 1 : Centralized Log Collection & Indexing with Logstash**

* **D1-Advanced Log Collection and Shipping-Logstash Task** : [Centralized Log Collection & Indexing with Logstash](https://hashnode.com/docs/687e32493aa4a0e5086a2992/guide/687e324a100405ceff21607b/version/687e324a100405ceff21607c/page/68f664fd65493f91cc680fcb)

  * **1️⃣ Windows Logs Collection** :

    * Install **Winlogbeat** on a **Windows** machine.

    * Set up **Winlogbeat** to send Windows event logs to **Logstash** server.

  * **2️⃣ Linux Logs Collection :**

    * Install **Filebeat** on **Linux** machine.

    * Preparing or using **Nginx dummy logs**.

    * Set up **Filebeat** to send Nginx logs to **Logstash** server.

  * **3️⃣ Logstash to Elasticsearch :**

    * Set up **Logstash** to receive logs from both **Winlogbeat and Filebeat**. Send logs from **Logstash** to **Elasticsearch** making sure:

      * Each log source is stored in a separate **index**.

        * Example:

          * Windows logs → `windows-logs`

          * Nginx logs → `nginx-logs`

### Lab 2 : **Windows Event Forwarding & ELK Integration**

* **Windows Logs Pipeline: WEF → Logstash → Elasticsearch**

  | **Device**                     | **Role**                 | **Executed Tasks**                                                                                                                                             |
  | ------------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **AD Server (Windows Server)** | Log Source               | - Generating **Windows Security/Application** logs. - Enabling **Audit Policy**. - Activating **WinRM** and configuring **GPO** to point to the Log Collector. |
  | **Log Collector (Windows)**    | WEF Collector + Logstash | - Receiving **WEF** logs from the AD via **Forwarded Events**. - Installing **Logstash** to process these logs. - Sending data to the **ELK Server (Linux)**.  |
  | **ELK Server (Linux)**         | Storage and Analysis     | - Receiving logs from Logstash. - Storing and analyzing data using **Elasticsearch/Kibana**.                                                                   |

### Lab 3 : **Linux Log Collection & Analysis with Fluent Bit and Elasticsearch**

* Send linux auth logs via syslog to fluentbit syslog listener and parse all of them

* Configure auditd on linux and send admin activities logs to fluentbit Parsethem .

* Then outptut parsed auth logs and admin activites parsed logs to elasticsearch using fluentbit .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366952366/72fd448e-cc86-410a-9e45-bd208acf4887.png" alt="" align="center" fullwidth="true" />

