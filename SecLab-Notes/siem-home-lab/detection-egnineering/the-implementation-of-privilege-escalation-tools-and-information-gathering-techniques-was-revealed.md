---
id: "68e670e6f528e1b9b98a19cf"
title: "The Implementation Of Privilege Escalation Tools And Information Gathering Techniques Was Revealed"
description: "In this scenario, we simulated attacker activity using privilege escalation and system discovery tools, such as `whoami.exe` and `net.exe`. These tools are commonly used to determine the current privileges of an attacker, helping them plan the next steps of an attack."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/siem-home-lab/detection-egnineering/the-implementation-of-privilege-escalation-tools-and-information-gathering-techniques-was-revealed"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-08T14:10:46.598Z"
updatedAt: "2026-01-25T15:35:46.834Z"
---

Our goal was **to configure a system that captures these processes in Windows Event Logs, sends them to Elasticsearch, and then create a Detection rule using KQL in Kibana to trigger alerts when these tools are executed.**

***

## 🔹 Tools Used

* **whoami.exe**: Displays information about the current user, including username, groups, and privileges.

* **net.exe**: Manages the local network, including adding/removing users, managing devices and groups, and performing network queries.

***

## 🔹 Step 1: Enable Process Creation Auditing

1. Open **Local Security Policy**:\
   `Start > type secpol.msc > Enter`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759932808187/607f2118-a343-4e64-a2a4-63c20734a2f4.png" alt="" align="center" fullwidth="true" />

2. Navigate to:\
   `Security Settings > Advanced Audit Policy Configuration > System Audit Policies > Detailed Tracking > Audit Process Creation`

3) Enable **Audit Process Creation → Success**

> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759932832453/087cfdcf-3cee-47b5-86ba-c7160c85f7fd.png" alt="" align="center" fullwidth="true" />
>
> This ensures that every new process is logged in the Event Logs.

***

## 🔹 Step 2: Include Command Line in Logs

To capture the full command line along with the program names:

1. Open **Group Policy Editor**:\
   `Start > type gpedit.msc > Enter`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759932924977/eea63bd2-e12d-4991-a7de-667078e96041.png" alt="" align="center" fullwidth="true" />

1. Navigate to:\
   `Computer Configuration > Administrative Templates > System > Audit Process Creation`

2. Enable **Include command line in process creation events → Enabled**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759932946909/ee17be5e-877d-4153-b467-286859e9d43a.png" alt="" align="center" fullwidth="true" />

> After this setting, any created process will be logged along with all its arguments.

***

## 🔹 Step 3: Verify Log Location

1. Open **Event Viewer**:\
   `Event Viewer > Windows Logs > Security`

2. Look for **Event ID 4688**, which records every process creation. It contains:

   * Process name (`whoami.exe` or `net.exe`)

   * Command line used

3. Filter the logs to find the required processes:

   * Right click → Filter Current Log

   * Event ID: `4688`

   * Keywords: `whoami.exe` or `net.exe`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759933046056/640c79d5-9f75-4dcb-a42f-e2f9a8b644dd.png" alt="" align="center" fullwidth="true" />

***

## 🔹 Step 4: Create Detection Rule Using KQL

Open **Kibana** in your browser:\
`https://<kibana-server>:5601`

After confirming that the **event.code: "4688"** logs are successfully received in Kibana, proceed with creating a new **Detection Rule** to generate alerts when suspicious executions of `whoami.exe` or `net.exe` are detected.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759942825201/37ff7bd3-8eee-472c-88ac-0140edd490e0.png" align="center" fullwidth="false" />

### 🧩 **Create a Custom Query Rule**

1. Navigate to:\
   **Security → Rules → Create new rule → Custom query**

2. **Index pattern:**

   ```bash
   winlogbeat-*
   ```

3. **Custom KQL Query:**

   ```bash
   (event.code:"4688") and (
     (
       winlog.event_data.NewProcessName:"*net.exe" and 
       winlog.event_data.CommandLine:( "*user*" or "*group*" )
     )
     or
     (
       (winlog.event_data.NewProcessName:"*whoami.exe" or winlog.event_data.NewProcessName:"*net.exe") and 
       not winlog.event_data.SubjectUserName:("*\\Administrator" or "Administrator")
     )
   )
   ```

   > ⚠️ This refined query helps reduce **false positives** by excluding executions made by the Administrator account or common parent processes like Explorer, CMD, or PowerShell.

***

### 🧠 **Rule Description**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759943228906/3312b5f1-79ef-43eb-a59a-2f00cd985001.png" align="center" fullwidth="false" />

> Triggers an alert when `whoami.exe` or `net.exe` are executed in **unusual contexts** — for example, when used for user or group enumeration, or when run by **non-administrative users** outside normal interactive sessions.

***

### ⚙️ **Configuration**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759943257642/9bdb42bb-62fb-4a37-bd3f-1ced66bf9a78.png" align="center" fullwidth="false" />

* **Severity:** Medium

* **Risk Score:** 70

* **Schedule:**

  * Runs every **5 minutes**

  * Additional look-back time: **1 minute**

* **Suppression:** Optional (can limit alerts per host or user)

* **Timeline Template:** None or Default

* **Actions:**\
  Configure a connector to send alerts via **Email**, **Slack**, or **Webhook**, including device name and command-line details.

## Here are some commands for Windows, but be careful that the user is not an admin:

```bash
whoami
whoami /priv
net user
net group
net user Administrator
```

***

### 🧩 **MITRE ATT\&CK Mapping**

* **T1082 – System Information Discovery**

* **T1016 – System Network Configuration Discovery**

* **T1087 – Account Discovery**

***

### 📘 **Example False Positives**

* System administrators running `whoami` or `net user` during routine tasks.

* Automated scripts or monitoring tools performing legitimate enumeration.

***

### ✅ **Result**

### Once this rule is enabled, any suspicious or unauthorized execution of `whoami.exe` or `net.exe` on monitored systems will generate an alert, allowing analysts to quickly investigate potential **privilege escalation** or **discovery activity** attempts.

