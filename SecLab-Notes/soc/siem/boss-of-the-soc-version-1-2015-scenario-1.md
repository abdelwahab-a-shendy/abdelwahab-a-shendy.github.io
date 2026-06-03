---
id: "68ee716caeca63fd37af8da6"
title: "Boss of the SOC Version 1 (2015) Scenario-1"
description: "- Web site defacement"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/soc/siem/boss-of-the-soc-version-1-2015-scenario-1"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T15:51:08.471Z"
updatedAt: "2026-01-25T15:35:46.829Z"
---

***

# **Web site defacement**

**Scenario:**

* Today is the first day for **Alice** at the Security Operations Center (SOC) of **Wayne Enterprises**.

* The manager **Lucius** gave her a first task: to verify a report from the **Gotham City Police Department (GCPD)**. The report indicates that the site [`www.imreallynotbatman.com`](http://www.imreallynotbatman.com) (which is the personal blog of the company’s CEO) has been **compromised**.

* The hacker group has multiple objectives, but **their main goal** is **Website Defacement** to embarrass the victims.

* Alice is required to confirm whether the site has indeed been **hacked** or not.

* The attackers used a Scanner, then Brute Force, then uploaded Malware, and finally performed a Defacement.

* In short: **the task is to investigate a website compromise and determine whether it was defaced by a hacker group, using analysis tools such as Splunk.**

***

# **Before Any Analysis – Some Important Basics to Know**

In Wireshark, we look at **Statistics, Follow TCP Stream, or Endpoints**, and in Splunk we focus on **Logs and Events** from servers and websites.

#### **1️⃣ Splunk Basics – The Essentials**

**Splunk** is a tool for collecting, analyzing, and visualizing data from various sources (logs, network data, application events…).

#### **Core Components:**

* **Search Head**

  * The place where you perform searches (queries) on the data.

  * Similar to Wireshark when you click “Statistics” or “Follow TCP stream” but for logs.

* **Indexers**

  * Stores all the data after **indexing** the logs so that searching is fast.

* **Forwarders**

  * Programs or agents that send logs from servers to Splunk.

  * Similar to sniffing in Wireshark but for logs instead of packets.

* **User Interface (UI)**

  * The interface where you view results, dashboards, reports…

***

# **2️⃣ Basic Search Terms**

Almost everything in Splunk starts with searching for data.

#### **Common Splunk Queries**

1. `search`

   * Search for keywords or events.

   * Example:

     `index=web_logs host="`[`www.imreallynotbatman.com`](http://www.imreallynotbatman.com)`"`

     This retrieves all events related to this website.

2. `dedup`

   * Remove duplicates.

   * Example:

     `... | dedup clientip`

     Ensures each IP appears only once.

3. `table`

   * Display the columns you want in an organized way.

   * Example:

     `... | table _time, clientip, status, uri`

4. `sort`

   * Sort results based on a chosen column.

   * Example:

     `... | sort -_time`

     Displays the newest events first.

5. `regex`

   * Filter using regular expressions.

   * Example:

     `... | regex uri="/admin"`

     Focuses on requests that attempted to access `/admin`.

6. `stats values`

   * Calculate statistics for different fields.

   * Example:

     `... | stats values(uri) by clientip`

     Shows all URLs that each IP tried to access.

7. `count`

   * Count the number of events.

   * Example:

     `... | stats count by clientip`

     Highlights which IP performed the most **brute-force** or unusual attempts.

***

# **Now we have some points we can build on:**

* We have **13 questions** that need to be answered with **screenshots**, mentioning **reasons and details**:

1. What is the IP address of our web server?

2. What is the likely IPv4 address of someone from the Po1s0n1vy group scanning [imreallynotbatman.com](http://imreallynotbatman.com) for web application vulnerabilities?

3. What company created the web vulnerability scanner used by Po1s0n1vy?

4. What content management system is [imreallynotbatman.com](http://imreallynotbatman.com) using?

5. What is the content management system imreallynotbatman using?

6. What address is performing the brute-forcing attack against our website?

7. What was the correct password for the content management system running [imreallynotbatman.com](http://imreallynotbatman.com)?

8. After successful exploitation, what is the uploaded malicious software?

9. Mention some internal discovery command lines that were used?

10. What is the name of the file that defaced the [imreallynotbatman.com](http://imreallynotbatman.com) website?

11. What fully qualified domain name (FQDN) is associated with this attack?

***

## 1. **What is the IP address of our web server?**

#### **Analysis:**

* Used the Splunk query:

```sh
index="botsv1" imreallynotbatman.com sourcetype=stream:http | stats count by src_ip
```

> * This query retrieves all HTTP requests related to the site [`imreallynotbatman.com`](http://imreallynotbatman.com) from the `botsv1` index and counts the number of requests per source IP.
>
> * Useful to identify who interacted most with the server or attempted scanning, brute-force, or any abnormal activity.

* Results shown in Statistics:

```bash
src_ip          count
23.22.63.114    1236
40.80.148.42    20932
```

##### **Observation:**

* We have **src\_ip**: 23.22.63.114 and 40.80.148.42.

* But inspecting the HTTP headers in the logs shows **Host:** [**imreallynotbatman.com**](http://imreallynotbatman.com) and the `dest_ip` is: **192.168.250.70**.

* The server responds with `Server: Microsoft-IIS/8.5`, indicating that the internal server is the **destination IP**.

##### **Reason:**

* `src_ip` in Splunk represents the **source that sent the request**, not the server itself.

* The actual server is located in the `dest_ip` field: **192.168.250.70**.

##### ✅ **Answer:**

* **IP address of the web server:** `192.168.250.70`

* **Evidence:** `dest_ip` in HTTP logs and response headers from Splunk.

***

## 2. **What is the likely IPv4 address of someone from the Po1s0n1vy group scanning** [**imreallynotbatman.com**](http://imreallynotbatman.com) **for web application vulnerabilities?**

Since the attackers used a scanner, then brute force, then uploaded malware, and finally performed defacement, we can deduce that the brute force came from the likely IPv4 of a Po1s0n1vy member probing [`imreallynotbatman.com`](http://imreallynotbatman.com) for web application vulnerabilities.

Given this is a web server, the brute force likely targeted admin/login pages, preceded by scanning, resulting in high request counts.

```sh
index="botsv1" imreallynotbatman.com sourcetype=stream:http | stats count by src_ip
```

> * **index="botsv1"** → Searching in the BOTS V1 index.
>
> * [**imreallynotbatman.com**](http://imreallynotbatman.com) → Filter for traffic to/from this domain.
>
> * **sourcetype=stream:http** → Only HTTP traffic.
>
> * **| stats count by src\_ip** → Count requests from each IP to see who generated the most traffic.

| src\_ip          | count     |
| ---------------- | --------- |
| 23.22.63.114     | 1236      |
| **40.80.148.42** | **20932** |

> 🔹 `40.80.148.42` shows **very high traffic**, likely the scanner.

To confirm this IP is doing scanning:

* In one of the events:

```sh
http_method: POST
request: POST /joomla/index.php/component/search/ HTTP/1.1
|
|
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.21 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.21 
Acunetix-Product: WVS/10.0 (Acunetix Web Vulnerability Scanner - Free Edition) 
Acunetix-Scanning-agreement: Third Party Scanning PROHIBITED Acunetix-User-agreement: http://www.acunetix.com/wvs/disc.htm
```

* The **Acunetix Web Vulnerability Scanner - Free Edition** confirms it's a web vulnerability scanner.

* `POST` requests with many parameters → testing/SQLi.

* Request rate very high (20932 requests).

* Target: `/joomla/index.php/component/search/` → clear injection attempts.

##### ✅ **Answer:**

* **Likely scanning IP:** `40.80.148.42`

* **Evidence:** High request count in Splunk logs and presence of Acunetix scanner in HTTP headers.

***

## **3. What company created the web vulnerability scanner used by Po1s0n1vy?**

* From the previous step, we observed that Po1s0n1vy used a **Web Vulnerability Scanner**, as indicated in the **User-Agent** header.

* The User-Agent reveals the scanner’s name, which tells us the **manufacturer**:

```sh
Acunetix-Product: WVS/10.0 (Acunetix Web Vulnerability Scanner - Free Edition) 
```

* Verified with Splunk query:

```sh
index="botsv1" imreallynotbatman.com sourcetype=stream:http | stats values(http_user_agent) by src_ip
```

* Sample output:

```sh
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.21 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.21 Acunetix-Product: WVS/10.0 (Acunetix Web Vulnerability Scanner - Free Edition)
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760457274606/291dd098-f096-4967-857c-dae8f7d7e890.png" align="center" fullwidth="false" />

##### ✅ **Answer:**

* **Company:** `Acunetix`

***

## **4&5.What content management system is** [**imreallynotbatman.com**](http://imreallynotbatman.com) **using?**

Honestly, searching on Google was the best solution: "How can I know the content management system in the header in the logs siem?"

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760457224381/7270c1ca-9754-404d-8e50-d8115e7c1dc2.png" align="center" fullwidth="false" />

The simplest way to identify the **CMS** through **Logs** is to focus on the **HTTP Headers** and **URI Paths** because they reveal clear fingerprints :

* In the **HTTP Headers**: `Server` or `X-Powered-By`

* In the **URLs**: for example `/administrator`, `/wp-admin`, `index.php?option=com_content`

```bash
index="botsv1" imreallynotbatman.com sourcetype=stream:http 
| table _time src_ip dest_ip uri_path http_user_agent http_content_type http_server http_x_powered_by
```

> This query fetches all **HTTP Requests** to the site and displays columns that might reveal the CMS.

##### 🔹 Analysis of results:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760457353858/d7f74cbf-6f91-45e8-85c1-a6ecd202573c.png" align="center" fullwidth="false" />

The path appearing: `/joomla/index.php/component/search/`

Repeatedly appearing in the logs is a **clear indication** that the site is using **Joomla**, as it is a well-known signature of Joomla CMS.

##### ✅ **Answer:**

> [**imreallynotbatman.com**](http://imreallynotbatman.com) **is using Joomla CMS**

***

## **6.What address is performing the brute-forcing attack against our website?**

```sh
index="botsv1" imreallynotbatman.com sourcetype=stream:http Login Admin
|
|
c_ip: 40.80.148.42
src_ip: 40.80.148.42
```

From the logs, it is clear that the **IP address** performing the brute-force attack is: `40.80.148.42`

🔹 Reason:\
In Splunk, **c\_ip** or **src\_ip** represents the client (attacker) IP, while **dest\_ip** represents the targeted server (here 192.168.250.70).

So the answer to question 6 👇

> **The IP address performing the brute-forcing attack is** `40.80.148.42`. ✅

To **prove** that the IP `40.80.148.42` is indeed performing **brute force/scanning** on the site, we can use:

```sh
index="botsv1" imreallynotbatman.com sourcetype=stream:http src_ip=40.80.148.42 | table _time src_ip dest_ip uri_path http_user_agent http_method
```

The result was:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760457401640/b1ffcc7f-f795-4f87-8663-9d63fd5a1ec5.png" align="center" fullwidth="false" />

* Why this proves that 40.80.148.42 is the attacker:

  * All requests occur within 1–2 seconds. This is not human behavior.

  * The many POST requests to the same path in a short time → pattern of Brute-force or Scanner sending data.

  * **src\_ip is constant** and **dest\_ip is constant**

##### ✅ **Answer:**

> 40.80.148.42

***

## **7. What was the correct password for the content management system running** [**imreallynotbatman.com**](http://imreallynotbatman.com)**?**

### **1️⃣ Scenario Understanding**

* There was a **Brute-Force attack** on the **Joomla admin page** (`/joomla/administrator/index.php`).

* We focus on **POST requests** containing password fields (`pass`, `passwd`, `password`).

* We need to identify: **source IP, destination IP, time, page, and response status**.

### **2️⃣ Initial filtering for POST requests containing passwords**

```sh
index="botsv1" imreallynotbatman.com sourcetype=stream:http (pass OR passwd OR password) | table status http_post_data _time src_ip dest_ip  http_method
```

* Initial results:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760458882174/b6dee187-4955-43e7-b562-a1acbb67486f.png" align="center" fullwidth="false" />

* Noticed both **GET and POST** requests; passwords are normally in POST :

```bash
index="botsv1" imreallynotbatman.com sourcetype=stream:http (pass OR passwd OR password) http_method=POST | table status http_post_data _time src_ip dest_ip
```

* Results displayed:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760458882184/984be91e-8d85-444a-ab15-c7cd5f40691b.png" align="center" fullwidth="false" />

### **3️⃣ Identify the page targeted for login**

```sh
index="botsv1" imreallynotbatman.com sourcetype=stream:http (pass OR passwd OR password) http_method=POST | table status http_post_data _time src_ip dest_ip url_path
```

* Shows **uri\_path** for each login attempt:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760458956437/f20c6870-2267-4bf0-9ee8-30cca61bc0fc.png" align="center" fullwidth="false" />

### **4️⃣ Log Analysis**

* IP **23.22.63.114** tried logging in to `/joomla/administrator/index.php` and received many **303** responses (Redirect / Failed Login).

* Later, IP **40.80.148.42** sent POST requests to the same page with status **200** (**Login Successful / Accepted**).

* **Same** `uri_path` and **http\_method** (POST)

* **Different status codes** (303 → Fail / 200 → Success)

This strongly indicates that IP `40.80.148.42` successfully logged in.

### **5️⃣ Extract the password**

```sql
index="botsv1" imreallynotbatman.com sourcetype=stream:http http_method=POST | regex src_content="(username=|passwd=)"
| table _time src_ip dest_ip uri_path http_post_data src_content
```

* This query searches all POST requests containing login credentials (username/password) on [**imreallynotbatman.com**](http://imreallynotbatman.com) and presents them in a clear table.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760459068922/09d127ae-acba-4a4a-988a-fbd1acc97508.png" align="center" fullwidth="false" />

* From the logs of the successful IP (`40.80.148.42`), we can see the **correct password** used for login.

* The key idea: focus on POST requests with login data, identify successful vs. failed IPs, and extract the attempted passwords without wasting time on irrelevant data.

##### ✅ **Answer:**

> * **Username:** `admin`
>
> * **Password:** `batman`
>
> * Therefore, the correct password for the CMS on [www.imreallynotbatman.com](http://www.imreallynotbatman.com) is `batman`.

***

## **8. After Successful Exploitation, What is the uploaded Malicious Software?**

Since the attack sequence was:\
Scan → Brute-Force → Login → Upload Malware → Defacement

**Logical deduction:**

* The **uploaded malicious software** is likely a **Web Shell or PHP Backdoor**.

* This file would be placed in `/administrator` or a directory accessible from the admin panel.

* Purpose: **establish attacker control over the site and enable remote access**.

To identify the uploaded file or malicious software after a successful login, we can use a Splunk query focusing on POST requests from IP `40.80.148.42` after logging in successfully to `/joomla/administrator/index.php`, searching for any file uploads or suspicious PHP content.

* Query to get all **POST requests** the attacker made on the Admin Panel after login:

```sh
index="botsv1" imreallynotbatman.com sourcetype=stream:http http_method=POST src_ip=40.80.148.42 uri_path="/joomla/administrator/index.php" | sort _time | table _time src_ip dest_ip uri_path http_post_data src_content
```

This shows all POST requests from the attacker after accessing the admin page, including:

* The login using `admin/batman`

* Any uploaded files (like `agent.php`)

* Other commands or movements after the compromise:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760459268289/082412a3-fd59-4b3c-9311-f183076a6679.png" align="center" fullwidth="false" />

Event sequence in the logs:

1. First event: **successful login**:\
   `username=admin&passwd=batman` on `/joomla/administrator/index.php`\
   Status = 200 → Successful Login.

2. Immediately after, a suspicious request **uploaded** `agent.php` via `install_package`:\
   `Content-Disposition: form-data; name="install_package"; filename="agent.php"`

3. Then the attacker used **com\_extplorer**:

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760459277060/d99b81f6-cade-422c-afea-96e4b746b04a.png" align="center" fullwidth="false" />

`com_extplorer` is a **Joomla Extension** acting as a **File Manager** inside the Admin Panel, similar to Windows “File Explorer.”

This extension allowed the attacker to:

* View site files on the server

* Move, delete, upload files

* Change permissions

##### ✅ **Answer:**

> `agent.php`\
> an obfuscated PHP backdoor

***

## **9. Mention some internal discovery command lines that were used?**

* We want to extract all **commands executed** on the server or machine after the compromise.

* In previous tasks, sometimes Winlogbeat settings were adjusted to track which logs were sent to the SIEM:

  * `name: System`

  * `name: Security`

  * Occasionally `Sysmon`

* We can organize the search the same way, meaning:

  * Check the Security Logs with:

```bash
index="botsv1"  sourcetype="WinEventLog:Security" sourcetype="sourcetype=WinEventLog:System"
```

* To get all logs after 2016-08-10:

```bash
index="botsv1" (sourcetype="WinEventLog:Security" OR sourcetype="WinEventLog:System") earliest="08/10/2016:21:50:00"
```

* This helps identify what happened after the attacker logged in or ran commands.

* Testing with:

```bash
index="botsv1" (sourcetype="WinEventLog:Security" OR sourcetype="WinEventLog:System") earliest="08/10/2016:21:50:00" | table _time host user EventCode Process_Name CommandLine
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760459307899/7a0ffa1b-496a-4e12-a425-19ef2fe10457.png" align="center" fullwidth="false" />

* This shows all **programs and commands** executed on the machines after a specific time.

* To filter further, I tried:

```bash
index="botsv1" (sourcetype="WinEventLog:Security" OR sourcetype="WinEventLog:System") earliest="08/10/2016:21:50:00" whoami
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760458210643/56d7fa37-6e67-4c0b-aa13-4bd777ce6d73.png" align="center" fullwidth="false" />

* I tested expected commands like `nslookup`, `whoami`, `net use`, `net group`, `net view`. Each command ran individually; no straightforward way to combine them.

* Another approach: identify all values in **Process\_Command\_Line** and count occurrences:

```sh
index="botsv1" sourcetype="WinEventLog:Security" EventCode=4688 earliest="08/10/2016:21:50:00"
| search (Process_Command_Line="*net use*" OR Process_Command_Line="*net view*" OR Process_Command_Line="*net group*" OR Process_Command_Line="*whoami*" OR Process_Command_Line="*systeminfo*" OR Process_Command_Line="*tasklist*" OR Process_Command_Line="*wmic*")
| where NOT like(Process_Command_Line,"%Microsoft.NET%")
| dedup Process_Command_Line
| table _time, Account_Name, New_Process_Name, Process_Command_Line
| sort 0 + _time
```

* **Explanation:**

  * `index="botsv1"` → database

  * `sourcetype="WinEventLog:Security"` → focus on Security logs

  * `EventCode=4688` → new process creation events

  * `earliest="08/10/2016:21:50:00"` → start after attacker logged in

* **Filter internal discovery commands:**

  * `net use`, `net view`, `net group`, `whoami`, `systeminfo`, `tasklist`, `wmic`

* **Exclude normal .NET processes:**

  * `where NOT like(Process_Command_Line,"%`[`Microsoft.NET`](http://Microsoft.NET)`%")`

* **Remove duplicates:**

  * `dedup Process_Command_Line` → show each command only once

* **Display results neatly:**

  * `table _time, Account_Name, New_Process_Name, Process_Command_Line` → clear columns

  * `sort 0 + _time` → order by execution time

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760458191994/8fd9d0b7-b983-4528-9b7d-2dcf2d4763ab.png" align="center" fullwidth="false" />

> - Initial activity: **user and system info discovery** (`whoami`, `tasklist`)
>
> - Then: **saving process and service lists** to temporary files (likely for information gathering)
>
> - Finally: **suspicious activity deleting shadow copies** (`shadowcopy delete`)

##### ✅ **Answer:**

> A set of commands:
>
> * whoami
>
> * tasklist
>
> * tasklist /svc > temp file
>
> * tasklist /svc
>
> * tasklist /svc > temp file
>
> * wmic shadowcopy delete

***

## **10. What is the name of the file that defaced the** [**imreallynotbatman.com**](http://imreallynotbatman.com) **website?**

Remember that **Defacement** usually involves HTML or even PHP files that are new on the server. We can search the POST requests for file uploads that occurred after the hacker logged in:

```bash
index="botsv1" imreallynotbatman.com sourcetype=stream:http http_method=POST earliest="08/10/2016:21:50:00" | table _time src_ip dest_ip uri_path http_post_data
```

But this returned many logs because the attacker was also performing **Scanning and Brute-force**.

To find the **Defacement file**:

* From previous analysis, we know the **successful login happened via the Joomla admin panel**: `/joomla/administrator/index.php`

* This is the natural place where files could have been uploaded. So we refine the query:

```bash
index="botsv1" imreallynotbatman.com sourcetype=stream:http http_method=POST earliest="08/10/2016:21:50:00" uri_path="/joomla/administrator/*" | table _time src_ip dest_ip uri_path http_post_data
```

* I searched using `uri_path="/joomla/administrator/*"` thinking there might be another path, but the results of both queries were identical:

```bash
index="botsv1" imreallynotbatman.com sourcetype=stream:http http_method=POST earliest="08/10/2016:21:50:00" uri_path="/joomla/administrator/index.php" | table _time src_ip dest_ip uri_path http_post_data
```

Both results are the same:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760458111551/757763b3-ae47-429a-9f0c-22b3ff2f7e63.png" align="center" fullwidth="false" />

From reviewing the logs, it appears the attacker used `com_extplorer` to leave traces.

To extract the uploaded files:

```bash
index="botsv1" imreallynotbatman.com sourcetype=stream:http uri_path="/joomla/administrator/index.php" http_method=POST form_data="*upload*" | table _time src_ip dest_ip uri_path form_data
```

**form\_data="*upload*"** → searches for any request containing file upload data:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760458118206/ad255b34-8612-40eb-9bd5-c3d6f5e81cb7.png" align="center" fullwidth="false" />

* First log:

  * POST data: `option=com_extplorer&dir=&item=/joomla&selitems[]=/joomla&action=upload`

  * This indicates an attempt to upload a file or folder via `com_extplorer`.

* Second log:

  * POST data contains **encoded/encrypted PHP code** (usually a web shell or backdoor).

This points to an attempt to upload a **malicious PHP file** using Joomla’s package installation feature (`install_package`).

We confirmed the file was uploaded via `install_package`. After further searching in the logs, we found:

```ini
part_filename: agent.php

request: POST /joomla/administrator/index.php option=com_installer&view=install HTTP/1.1

Content-Disposition: form-data; name="install_package"; filename="agent.php" Content-Type: text/plain
```

##### ✅ **Answer:**

> **File Involved:** `agent.php` (PHP web shell)

***

## **11. What fully qualified domain name (FQDN) is associated with this attack?**

* A Fully Qualified Domain Name (FQDN) is the complete, unambiguous internet address of a network resource, such as a server or website, specifying its exact location within the Domain Name System (DNS) hierarchy.

* In this scenario:

  * The targeted website is: [`www.imreallynotbatman.com`](http://www.imreallynotbatman.com)

  * The server itself has an internal IP: `192.168.250.70`

##### ✅ **Answer:**

> [www.imreallynotbatman.com](http://www.imreallynotbatman.com)

***

### **Summary of All Answers**

Here’s a clean summary of your answers:

1. **IP address of our web server:** `192.168.250.70`

2. **Likely IPv4 of Po1s0n1vy group scanning the site:** `40.80.148.42`

3. **Company that created the web vulnerability scanner:** `Acunetix`

4. **CMS used by** [**imreallynotbatman.com**](http://imreallynotbatman.com)**:** `Joomla CMS`

5. **CMS used by iamnotreallybatman:** `Joomla CMS`

6. **Address performing the brute-force attack:** `40.80.148.42`

7. **Correct password for the CMS on** [**imreallynotbatman.com**](http://imreallynotbatman.com)**:** `batman`

8. **Uploaded malicious software after exploitation:** `agent.php`

9. **Some internal discovery command lines used:**

   * `whoami`

   * `tasklist`

   * `tasklist /svc > temp file`

   * `tasklist /svc`

   * `wmic shadowcopy delete`

10. **File that defaced** [**imreallynotbatman.com**](http://imreallynotbatman.com)**:** `agent.php` (PHP web shell)

11. **Fully qualified domain name (FQDN) associated with this attack:** [`www.imreallynotbatman.com`](http://www.imreallynotbatman.com)

***

### **Observations**

* The attack started **Scan → Brute Force → Successful Login → Upload PHP Backdoor → Defacement**

* The IP `40.80.148.42` is responsible for most of the attacker activity (Scanner + Brute Force + Exploitation).

* The uploaded file (`agent.php`) allowed the attacker to remotely control the website.

***

### References

Splunk Quick Reference Guide → The most important Commands and Stats.

Splunk Cheat Sheet: Query, SPL, RegEx, & Commands

Acunetix Official Documentation

