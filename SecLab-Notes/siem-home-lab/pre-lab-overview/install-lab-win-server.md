---
id: "68de8ff814f66c30f44c6f2c"
title: "Install LAB-WIN-SERVER"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/siem-home-lab/pre-lab-overview/install-lab-win-server"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
seoTitle: "SIEM Home LAB"
createdAt: "2025-10-02T14:45:12.569Z"
updatedAt: "2026-01-25T15:35:46.806Z"
---

1. ### **Installing Guest Additions Tools on a Windows VM**

1) Start your Windows VM.

2) From the VirtualBox top menu:

   `Devices → Insert Guest Additions CD image…`

3) Inside Windows:

   * Go to the newly added CD.

   * Run `VBoxWindowsAdditions.exe` (choose the version according to your system, 32-bit or 64-bit).

4) Follow the steps and click **Reboot** after installation.

5) After restarting:

   * Enable **Shared Clipboard** and **Drag & Drop**:

```bash
Devices → Shared Clipboard → Bidirectional
Devices → Drag & Drop → Bidirectional
```

✅ Now your Windows VM is ready for copy, paste, and sharing.

***

### **1️⃣ Change the device name (Hostname):**

From **Start => Settings => System => About => Rename this PC (Advanced)**

* In the **Computer name** field: `LAB-WIN-AS`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759417598660/7823fa55-f9bd-435a-ba0f-b51ed0a725ff.png" alt="" align="center" fullwidth="true" />

Click **OK**, then **Restart Now**.

I confirmed that the name was successfully changed using the **CMD**:

```sh
C:\Users\Administrator>hostname
GROUP1-ABDELWAHAB-SHANDY
```

> Everything looks perfect! ✅

***

### **2️⃣ Adding Local Audit Policies :**

* From the **search bar**, open **Local Security Policy** →

  * **Security Settings** →\
    \- **Advanced Audit Policy Configuration** →\
    \- **System Audit Policies – Local Group Policy Object**

  Under **Advanced Audit Policy Configuration**, you’ll find many **Subcategories**.\
  Some specific subcategories are important because they generate useful logs, as follows:

  🔹 **1) Logon/Logoff**

  * **Logon:** Users logging into the system (Event ID **4624/4625**)

  * **Logoff:** Users logging off

  * **Special Logon:** Logins with administrative privileges

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759611438594/2e77d75f-8738-4ef3-ba3f-12dc39b50141.png" alt="" align="center" fullwidth="true" />

🔹 **2) Account Management**

* **User Account Management:** Creating, deleting, or modifying user accounts (**4720/4726**)

* **Security Group Management:** Adding or removing users from sensitive groups (**4732/4728**)

* **Other Account Management Events:** Any additional account changes

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759611770760/cf4a2a46-3b56-4c92-8d50-43355ed0fda4.png" alt="" align="center" fullwidth="true" />

> I’ll stop here since I only need to generate logs.

***

### **3️⃣ Generating Log Events :** Now, we’ll create some logs so that they appear in the **Event Viewer**.

Before proceeding, open **CMD** as Administrator and run:

```sh
gpupdate /force
|
|
Updating policy...

Computer Policy update has completed successfully.
User Policy update has completed successfully.
```

* Running `gpupdate /force` isn’t strictly necessary, but it doesn’t hurt — it ensures that the new settings are applied immediately.\
  You can also verify this by running:

```sh
auditpol /get /category:*
```

> This confirms that all the changes made above have been successfully applied.

### **In the Event Viewer, I’ll make sure that the logs are being recorded properly — especially for logon and logoff events.**

After performing the logon and logoff actions, I’ll go to:

**Event Viewer → Windows Logs → Security / System / Application**

There, I’ll review the generated logs to confirm that everything has been applied and is working correctly through the **Event Viewer**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759612224275/99a21079-e8d5-4b83-ba87-00014885d19d.png" alt="" align="center" fullwidth="true" />

> Here, all the logs related to the **Audit Policies** that were enabled are recorded.

***

## **4️⃣ Sending Logs with Winlogbeat :**

Before anything else, I wanted to make sure that Elasticsearch and Kibana were working correctly.

# Photo

Now that we've configured the Local Security Policy and collected the logs in the Event Viewer, it's time to send the logs from the Windows server to the ELK stack:

Download Winlogbeat to the Windows Server from [here](https://www.elastic.co/docs/reference/beats/winlogbeat/winlogbeat-installation-configuration)

After downloading the file, extract it to the following location: Change Name : `Winlogbeat`

```bash
C:\Program Files\Winlogbeat
```

> Up to this point, we’ve successfully set up and configured the machine with everything we’ll need.
>
> ***

### *The next step is to* ***configure Winlogbeat*** , set up its ***configuration file*** , and then ***run it on Windows***.

