---
id: "690567d6cf335f48cba6f837"
title: "2.Windows Fundamentals 2"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/windows-server-labs-and/thm-ad/2windows-fundamentals-2"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-11-01T01:52:22.283Z"
updatedAt: "2026-01-25T15:35:47.048Z"
---

## **Introduction :**

**Windows Fundamentals 2 – Introduction**

We will continue our journey exploring the **Windows** operating system.

In **Windows Fundamentals 1**, we covered:

* **Desktop**

* **File System**

* **User Account Control**

* **Control Panel**

* **Settings**

* **Task Manager**

In this part, we will take an overview of other **utilities** available in Windows, along with different ways to access them.

🔹 **To start the Virtual Machine:**

1. Click **Start Machine** to start the attached machine.

2. If you want to access it via **Remote Desktop**, use the following credentials:

   * **Machine IP:** MACHINE\_IP

   * **User:** administrator

   * **Password:** letmein123!

3. When a **Certificate** message appears, choose **Accept** to log in remotely.

📌 Note: The virtual machine may take up to 3 minutes to load.

✅ **Answer the questions below**

**Read above and start the virtual machine.**\
👉 قم بقراءة التعليمات أعلاه وابدأ تشغيل الجهاز الافتراضي (**Start Machine**)

***

## **System Configuration :**

**System Configuration (MSConfig)**

The **System Configuration** or **MSConfig** tool is used for advanced **troubleshooting**, and its main purpose is diagnosing **startup issues**.

🔹 **Ways to open MSConfig:**

* Through the **Start Menu**

* Requires **local administrator** privileges

The tool contains five **tabs**:

1. **General**

2. **Boot**

3. **Services**

4. **Startup**

5. **Tools**

***

### **Explanation of the tabs:**

* **General:**\
  Allows selecting which devices and services Windows should load at startup. Options include:

  * **Normal**

  * **Diagnostic**

  * **Selective**

* **Boot:**\
  Allows defining different startup options for the operating system.

* **Services:**\
  Displays all system **services**, whether running or stopped.

  > A service is a special type of application that runs in the **background**.

* **Startup:**\
  In the provided virtual machine, you won’t see important items here.

  * Microsoft recommends using **Task Manager** to manage startup items (enable/disable).

  * **MSConfig is not a startup management tool.**

* **Tools:**\
  Contains a list of various tools that can be launched for additional system configuration, with a short description of each tool.

  * In the **Selected command** textbox, information changes based on the selected tool.

  * To launch any tool, use the appropriate command via:

    * **Run prompt**

    * **Command Prompt**

    * Or click **Launch**

***

✅ **Answer the questions below**

**What is the name of the service that lists Systems Internals as the manufacturer?**\
👉 PsShutdown\
**Correct Answer**

**Whom is the Windows license registered to?**\
👉 Windows User\
**Correct Answer**

**What is the command for Windows Troubleshooting?**\
👉 C:\Windows\System32\control.exe /name Microsoft.Troubleshooting\
**Correct Answer**

**What command will open the Control Panel? (The answer is the name of .exe, not the full path)**\
👉 control.exe\
**Correct Answer**

***

## **Change UAC Settings :**

We continue with the **Tools** available via **System Configuration (MSConfig)**.

The **User Account Control (UAC)** feature was explained in detail in **Windows Fundamentals 1**.

🔹 **Changing UAC settings:**

* You can modify or even disable UAC (not recommended).

* Moving the **slider** shows how UAC settings change and Microsoft’s opinion on each level.

✅ **Answer the questions below**

**What is the command to open User Account Control Settings? (The answer is the name of the .exe file, not the full path)**\
👉 UserAccountControlSettings.exe\
**Correct Answer**

***

## **Computer Management :**

Continuing with tools available via **System Configuration (MSConfig)**, this time we discuss **Computer Management (compmgmt)**.

🔹 **Computer Management** has three main sections:

1. **System Tools**

2. **Storage**

3. **Services and Applications**

***

### **1️⃣ System Tools**

* **Task Scheduler:**

  * Allows creating and managing tasks that the computer executes automatically at specific times.

  * Tasks can run programs or scripts, and can be scheduled on login, logout, or at set intervals (e.g., every 5 minutes).

  * To create a basic task: choose **Create Basic Task** from **Actions** (right pane).

* **Event Viewer:**

  * Allows viewing **events** that occurred on the computer, serving as an **audit trail** to understand system activity.

  * It contains three panels:

    1. Left: tree of **event log providers**

    2. Middle: summary of events for the selected provider

    3. Right: **actions pane**

  * Five event types can be logged, and standard logs appear under **Windows Logs**.

* **Shared Folders:**

  * Displays a list of **shared folders** accessible by others.

  * Right-click any folder to view **Properties** such as **Permissions**.

  * **Sessions:** list of users currently connected to shared folders.

  * **Open Files:** shows files and folders currently accessed by connected users.

* **Local Users and Groups:**

  * Familiar from Windows Fundamentals 1 (**lusrmgr.msc**).

* **Performance:**

  * Contains **Performance Monitor (perfmon)** for monitoring performance data in real-time or from a log file.

* **Device Manager:**

  * Displays and configures devices, such as disabling connected hardware.

***

### **2️⃣ Storage**

* **Disk Management:**

  * Allows performing advanced storage tasks such as:

    * Initializing a new disk

    * **Extending** a partition

    * **Shrinking** a partition

    * **Assigning/Changing** drive letters

> Note: Since the virtual machine runs on Windows Server, there are extra tools not usually found in Windows 10.

***

### **3️⃣ Services and Applications**

* **Services:**

  * A **service** is an application that runs in the background.

  * You can enable/disable and view its properties.

* **WMI Control:**

  * Configures and manages **Windows Management Instrumentation (WMI)** service.

  * **WMIC:** command-line interface for managing WMI, deprecated in Windows 10—PowerShell is preferred.

***

✅ **Answer the questions below**

**What is the command to open Computer Management? (The answer is the name of the .msc file, not the full path)**\
👉 compmgmt.msc\
**Correct Answer**

**At what time every day is the GoogleUpdateTaskMachineUA task configured to run?**\
👉 6:15 AM\
**Correct Answer**

**What is the name of the hidden folder that is shared?**\
👉 sh4r3dF0Ld3r\
**Correct Answer**

***

## **System Information :**

We continue with tools available through the **System Configuration panel**.

🔹 **What is System Information (msinfo32)?**

According to Microsoft:\
“Windows includes a tool called **Microsoft System Information (Msinfo32.exe)**.\
This tool collects information about your computer and displays a comprehensive view of the **hardware**, **system components**, and **software environment**, which you can use to diagnose computer issues.”

***

### **System Summary** information is divided into three main sections:

1. **Hardware Resources**

2. **Components**

3. **Software Environment**

📌 **System Summary** displays general computer specifications, such as processor brand and model.

***

### **Hardware Resources**

The information shown here is not targeted at the average user. You can visit Microsoft’s official page for more details.

***

### **Components**

Here you can find details about **hardware devices** installed on the computer. Some sections may be empty, while others show details like **Display** and **Input**.

***

### **Software Environment**

Displays information about built-in and installed software. It also includes:

* **Environment Variables**

* **Network Connections**

***

⏪ Reminder from **Windows Fundamentals 1 room** (**The Windows\System32 Folder** task) where **Environment Variables** were briefly discussed.

According to Microsoft:\
“**Environment variables** store information about the operating system environment, such as OS path, number of processors, and temporary folder locations.\
For example, the **WINDIR** variable contains the Windows installation directory. Programs can query it to find where system files are located.”

***

### **Other ways to view Environment Variables:**

* **Control Panel > System and Security > System > Advanced system settings > Environment Variables**

* Or via **Settings > System > About > system info > Advanced system settings > Environment Variables**

💡 At the bottom of **msinfo32**, there’s a **search bar** — try searching for **IP address** under **Components**.

***

### ✅ **Questions and Answers:**

* **What is the command to open System Information?**\
  👉 `msinfo32.exe`

* **What is listed under System Name?**\
  👉 `THM-WINFUN2`

* **Under Environment Variables, what is the value for ComSpec?**\
  👉 `%SystemRoot%\system32\cmd.exe`

***

## **Resource Monitor :**

We continue with tools from the **System Configuration panel**.

🔹 **What is Resource Monitor (resmon)?**

According to Microsoft:\
“**Resource Monitor** displays **CPU**, **memory**, **disk**, and **network** usage per process and in aggregate.\
It also shows which processes use **file handles** and **modules**.\
Advanced filtering allows users to isolate data for one or more processes.\
Users can start, stop, pause, or resume services and close unresponsive applications.\
It also includes **process analysis** to identify deadlocks and **file locking conflicts**, helping users resolve issues without losing data.”

***

🔹 Like other tools in this section, this one is mainly for advanced users performing **system troubleshooting**.

***

### **Overview tab** contains four main sections:

1. **CPU**

2. **Disk**

3. **Network**

4. **Memory**

Each section also has its own dedicated tab with additional details.

📊 A right-hand pane displays **real-time graphs** for each section.

⚠️ Note: Information in **Resource Monitor** varies by system.

***

### ✅ **Questions and Answers:**

* **What is the command to open Resource Monitor?**\
  👉 `resmon.exe`

***

## **Command Prompt :**

We continue with tools from the **System Configuration panel**.

🔹 **Command Prompt (cmd)** may seem intimidating at first, but it’s not complicated once you understand how to use it.

* In older systems, the **command line** was the only way to interact with the OS.

* With the advent of **GUI (graphical user interface)**, users could perform complex tasks with a few clicks instead of typing commands.

However, even today, you can still interact with the OS via **Command Prompt**.

***

### **Basic commands:**

* `hostname` → Displays the computer’s name.

* `whoami` → Displays the current logged-in username.

***

### **Useful troubleshooting commands:**

* `ipconfig` → Displays the computer’s **network address** configuration.

Each command has a **help manual** explaining its **syntax** and optional **parameters**.

* To view help for any command → add `/?`\
  Example: `ipconfig /?`

📌 To clear the screen → use `cls`.

***

### **Other commands:**

* `netstat` → Displays protocol statistics and active **TCP/IP connections**.\
  Can be used with flags like `-a`, `-b`, `-e`.

* `net` → Manages **network resources**.\
  Running `net` alone shows available **sub-commands**.\
  `/?` doesn’t work here — use `net help`.\
  Example:

  * `net help user` → Help for **net user**.

  * Same applies to other sub-commands like `localgroup`, `use`, `share`, `session`.

***

### ✅ **Questions and Answers:**

* **In System Configuration, what is the full command for Internet Protocol Configuration?**\
  👉 `C:\Windows\System32\cmd.exe /k %windir%\system32\ipconfig.exe`

* **For the ipconfig command, how do you show detailed information?**\
  👉 `ipconfig /all`

***

## **Registry Editor :**

### 🖥️ **Registry Editor**

* The **Windows Registry**, according to Microsoft, is a **central hierarchical database** used to store configuration information for one or more users, applications, and **hardware devices**.

* The registry contains data that Windows constantly uses during operation, such as:

  1. User **profiles**

  2. Installed **applications** and associated file types

  3. Folder and **application icon** settings

  4. Installed **hardware**

  5. Used **ports**

⚠️ **Warning:** Editing the **Registry** is for advanced users only. Mistakes can cause system instability.

***

### **How to access the Registry:**

One main method is using the **Registry Editor** via command:

`regedt32.exe`

***

### ✅ **Question and Answer:**

* **What is the command to open the Registry Editor?**\
  👉 `regedt32.exe`

***

## **Conclusion :**

The **Conclusion** states that the tasks covered in **Windows Fundamentals 2** were about **tools** that can be launched through **MSConfig**, such as:

* System Information (**msinfo32.exe**)

* Resource Monitor (**resmon.exe**)

* Command Prompt (**cmd.exe**)

* Registry Editor (**regedt32.exe**)

* Computer Management (**compmgmt.msc**)

* … and more.

🔹 The idea is that you don’t need to open **MSConfig** to access them — you can run them directly from:

* **Start Menu** (by typing in search)

* **Run dialog box** (Win+R)

* Or even **Command Prompt**

