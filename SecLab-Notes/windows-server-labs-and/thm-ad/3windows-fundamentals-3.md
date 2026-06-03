---
id: "6905688f13ac8fc85bfbc213"
title: "3.Windows Fundamentals 3"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/windows-server-labs-and/thm-ad/3windows-fundamentals-3"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-11-01T01:55:27.830Z"
updatedAt: "2026-01-25T15:35:47.049Z"
---

## Introduction:

* In **Windows Fundamentals 1**: we introduced you to the Desktop, File System, UAC, Control Panel, Settings, and Task Manager.

* In **Windows Fundamentals 2**: we talked about Utilities like MSConfig, Computer Management, Resource Monitor, etc.

* In **Windows Fundamentals 3**: we’ll talk about **Security Features** in Windows.

After that, it says:

* Click on **Start Machine** to launch the VM.

* Or if you’re using **Remote Desktop (RDP)**, the login credentials are:

  * **User:** administrator

  * **Password:** letmein123!

  * **Machine IP:** MACHINE\_IP (displayed in the lab)

⚠️ Note: The VM can take up to **3 minutes** to start.

### ✅ Task Requirement:

* **Answer the questions below → Read the above and start the virtual machine.**\
  👉 There’s no practical question here; you just need to start the machine following these steps.

***

## Windows Updates:

Let’s start with **Windows Update**.

**Windows Update** is a service provided by Microsoft to deliver **security updates**, **feature enhancements**, and **patches** for the **Windows operating system**, as well as other Microsoft products such as **Microsoft Defender**.

Typically, **updates** are released on the second Tuesday of every month, known as **Patch Tuesday**. However, that doesn’t mean every **critical update/patch** must wait until the next **Patch Tuesday**; if an update is urgent, Microsoft pushes it immediately through the **Windows Update** service to all Windows devices.

📌 You can check the **Microsoft Security Update Guide** here.

You’ll find **Windows Update** in **Settings**.

💡 **Tip:** You can also access **Windows Update** through the **Run dialog box** or **CMD** by running the command:

`control /name Microsoft.WindowsUpdate`

In the provided **VM**, there are a few notes:

* The **Windows Update** settings are marked as “managed.” (Home users typically won’t see this message).

* There are no **updates** available for the **virtual machine** (because the VM isn’t connected to the internet to fetch new updates from Microsoft).

Over the years, Windows users have gotten used to delaying or even avoiding **Windows Updates**. One reason is that updates often require a **reboot** after installation.

Microsoft addressed this issue clearly with **Windows 10**:

* You can no longer ignore or indefinitely postpone updates.

* You can only delay them temporarily, but eventually, they will be installed, and your computer will **reboot**.

* The main goal is to keep your system secure and protected.

The image below shows what a "**Restart required**" message looks like and the options for scheduling the **restart**.

📌 For more details, see the **Windows Updates FAQ**.

***

## Windows Security:

According to Microsoft: *“Windows Security is your home to manage the tools that protect your device and your data.”*

If you missed it, Windows Security is also available in **Settings**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761962174042/84c44c1d-134e-44b7-9b96-105f7efa75ff.png" align="center" fullwidth="true" />

In the image above, focus on the **Protection areas**:

* **Virus & threat protection**

* **Firewall & network protection**

* **App & browser control**

* **Device security**

Each of the following sections will briefly explain these areas.

Before continuing, let’s quickly clarify the **status icons**:

* **Green**: Your device is adequately protected; no action needed.

* **Yellow**: There’s a security recommendation to review.

* **Red**: Warning – immediate attention is required.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761962186827/3a11431a-05e3-45f3-9bb0-c2011700a520.png" align="center" fullwidth="false" />

Click on **Open Windows Security**.

📌 Note: Since the provided VM runs **Windows Server 2019**, its appearance differs from **Windows 10 Home or Professional**.

The image below is from a **Windows 10** device.

Next, we’ll look at **Virus & threat protection**.

**Answer the questions below**

Checking the Security section on your VM, which area needs immediate attention?\
**Virus & threat protection**\
Correct Answer

***

## Virus & threat protection

**Virus & threat protection** is divided into two parts:

* **Current threats**

* **Virus & threat protection settings**

The image below focuses only on **Current threats**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761962200463/5c3092e9-d7c4-4f41-be4c-386f11be7fbc.png" align="center" fullwidth="true" />

### Current threats

**Scan options**

* **Quick scan** – scans folders in your system where threats are most likely to be found.

* **Full scan** – scans all files and running programs on your hard disk. This may take over an hour.

* **Custom scan** – allows you to choose specific files and locations to scan.

**Threat history**

* **Last scan** – Windows Defender Antivirus automatically scans your device to help protect it from viruses and threats.

* **Quarantined threats** – threats that have been isolated and prevented from running. They’re deleted periodically.

* **Allowed threats** – threats that were detected but allowed to run.\
  ⚠️ **Warning:** Only allow an identified threat if you are 100% sure of what you’re doing.

***

### Virus & threat protection settings

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761962211275/fe8b6e3b-8ea4-40c7-810d-6471556cce20.png" align="center" fullwidth="true" />

**Manage settings**

* **Real-time protection** – detects and stops malware from installing or running on your device.

* **Cloud-delivered protection** – provides faster, stronger protection with the latest cloud-based security data.

* **Automatic sample submission** – sends sample files to Microsoft to help protect you and others.

* **Controlled folder access** – protects files, folders, and memory areas from unauthorized changes by malicious applications.

* **Exclusions** – Windows Defender Antivirus won’t scan excluded items.

* **Notifications** – sends important security and health alerts about your device.\
  ⚠️ **Warning:** Excluded items may contain threats that make your system vulnerable. Use this option only if you’re sure.

***

### Virus & threat protection updates

* **Check for updates** – manually checks for updates to Windows Defender Antivirus definitions.

***

### Ransomware protection

* **Controlled folder access** – ransomware protection that requires enabling this feature, which in turn requires **Real-time protection**.

📌 **Note:** In the provided VM, **Real-time protection** is disabled to reduce performance issues. Since the VM isn’t connected to the internet and has no threats, this is safe.\
However, on your personal devices, **Real-time protection** should always be turned on (unless you’re using a third-party antivirus). Make sure it’s always updated and active.

💡 **Tip:** You can perform an on-demand scan on any file/folder by **right-clicking** it and choosing **Scan with Microsoft Defender**.

***

✅ **Answer:**\
Specifically, what is turned off and what Windows alerts you to enable is:\
**Real-time protection**

***

## Firewall & network protection

### What is a firewall?

According to Microsoft:\
“**Traffic** moves into and out of devices through what we call **ports**. The **firewall** controls what is or isn’t allowed to pass through those ports. You can think of it as a **security guard** standing at the door, checking the ID of anything trying to enter or leave.”

***

### Difference between the three profiles (Domain, Private, Public)

According to Microsoft:\
“Windows Firewall provides three profiles: **domain**, **private**, and **public**.”

* **Domain** – applies to networks where the system can authenticate with a **domain controller**.

* **Private** – user-defined, typically used for home or private networks.

* **Public** – the default profile, used for public networks such as Wi-Fi hotspots in cafes, airports, and other places.

If you click on any firewall profile, you’ll see another screen with two options:

1. Turn the firewall on/off.

2. Block all incoming connections.

⚠️ **Warning:** Unless you are 100% sure of what you’re doing, it’s recommended to keep **Windows Defender Firewall** enabled.

***

### Allow an app through firewall

You can view the current settings for any firewall profile.\
In the image above, several apps have access permissions for either the Private or Public firewall profiles.\
Some apps may show extra details using the **Details** button if available.

***

### Advanced Settings

**Windows Defender Firewall** settings are aimed at advanced users. Check the official Microsoft documentation for best practices.

💡 **Tip:** The command to open **Windows Defender Firewall** is:

`WF.msc`

***

## App & browser control

In this section, you can modify **Microsoft Defender SmartScreen** settings.

According to Microsoft:\
“**Microsoft Defender SmartScreen** helps protect against phishing or malware websites, and from potentially malicious applications and downloads.”

### Check apps and files

**Windows Defender SmartScreen** helps protect your device by checking unknown apps and files downloaded from the internet.

### Exploit protection

This feature is built into Windows 10 (and also Windows Server 2019 in our case) to protect your device from attacks.

⚠️ **Warning:** Unless you are 100% sure of what you’re doing, it’s recommended to keep the default settings.

***

## Device security

Even though you’ll rarely change these settings, we’ll cover them briefly for awareness.

### Core isolation

* **Memory Integrity** – prevents attacks from injecting malicious code into high-security processes.

⚠️ **Warning:** It’s best to leave default settings enabled.

### Security processor

The images below show **Security processor** details from another device.

***

## Trusted Platform Module (TPM)

According to Microsoft:\
“**Trusted Platform Module (TPM)** is a technology designed to provide hardware-based security functions.\
The TPM chip is a **secure crypto-processor** designed to carry out cryptographic operations.\
It has multiple physical security mechanisms to make it tamper-resistant, and malware cannot tamper with TPM’s security functions.”

✅ **Answer:** TPM stands for **Trusted Platform Module**

***

## BitLocker

According to Microsoft:\
“**BitLocker Drive Encryption** is a data protection feature integrated into the OS that addresses threats of data theft or exposure from lost, stolen, or improperly decommissioned computers.”

On devices with **TPM**, **BitLocker** provides the strongest protection.

According to Microsoft:\
“BitLocker offers the highest level of protection when used with **TPM version 1.2** or later. The TPM is a physical component built into most modern devices by manufacturers. It works with BitLocker to help protect user data and ensure the computer hasn’t been tampered with while offline.”

📌 Note: BitLocker isn’t available in the provided VM.

✅ **Answer:** On devices without **TPM v1.2** or newer, you must use a **removable drive** containing a **startup key**

***

## Volume Shadow Copy Service (VSS)

According to Microsoft:\
**Volume Shadow Copy Service (VSS)** coordinates actions required to create **consistent shadow copies** (also known as snapshots or point-in-time copies) of data to be backed up.

* **Volume Shadow Copies** are stored in the **System Volume Information** folder on each drive with protection enabled.

If **VSS** is enabled (**System Protection** On), you can:

* Create a **restore point**

* Perform a **system restore**

* Configure restore settings

* Delete **restore points**

⚠️ From a security perspective: malware developers know this feature, so they often include code to delete these files, making recovery from a ransomware attack impossible unless you have an **offline** or **off-site** backup.

✅ **Answer:** VSS stands for **Volume Shadow Copy Service**

***

## Conclusion

In this room, we covered built-in Windows OS security tools that help protect your system.

However, there’s still much more to explore and understand about Windows OS. As we mentioned in Windows Fundamentals 1:\
“The content is aimed at people who want to understand and use Windows OS more comfortably.”

📖 Additional reading:

* **Antimalware Scan Interface**

* **Credential Guard**

* **Windows Hello**

* **CSO Online – Best new security features in Windows 10**

⚠️ **Note:**\
Attackers often exploit built-in Windows tools to hide their activity within a victim’s environment.\
This strategy is known as **Living Off The Land**.

