---
id: "6905694e13ac8fc85bfbc21b"
title: "Active Directory Basics"
description: "This room will introduce the basic concepts and functionality provided by Active Directory."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/windows-server-labs-and/thm-ad/active-directory-basics"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-11-01T01:58:38.129Z"
updatedAt: "2026-01-25T15:35:47.060Z"
---

## Introduction

### 🟢 Introduction

**Active Directory** from Microsoft is considered the **backbone of the corporate world**.\
It simplifies managing devices and users inside a Corporate Environment.\
In this room, we will do a **deep dive** into the core components of Active Directory.

***

### 🎯 Room Objectives

In this room, we will learn about **Active Directory** and cover the following topics:

1. What **Active Directory** is.

2. What an **Active Directory Domain** is.

3. What components make up an Active Directory Domain.

4. **Forests** and **Domain Trusts**.

5. And many more!

***

### 📌 Room Prerequisites

* You should have a general knowledge of **Windows**.

* You can refer back to the **Windows Fundamentals** module if you need more details.

***

### 📝 Instructions

* Answer the questions below.

* Click **Continue Learning** to proceed.

✅ No answer is required in this section (No answer needed).

***

## Windows Domains :

### 🟢 Windows Domains

📌 Imagine you are responsible for a small network at a company with 5 devices and 5 employees.

* In that case, you can easily set up each device individually.

* You will create local accounts on each device, configure settings for each account.

* If a device stops working, you fix it on-site for that user.

That seems easy and calm 😅 … but if the company grows and you have:

* 157 computers

* 320 users

* distributed across 4 different offices

Can you manage each device individually, manually configure Policies for every user, and provide on-site support?\
👉 The answer is likely: **No**.

***

### 🔹 Solution: Windows Domain

To overcome these problems, we use something called a **Windows Domain**.

* Simply: it is a **collection of users and devices** under the administration of a particular company.

* The core idea: you **centralize management** of all network components in one place called **Active Directory (AD)**.

* The server that runs Active Directory services is called a **Domain Controller (DC)**.

***

### 🔹 Benefits of a Windows Domain

1. **Centralized identity management:**\
   You can manage all network users from one place (Active Directory).

2. **Security policy management:**\
   You can set Security Policies in Active Directory and apply them to all devices and users.

***

### 🔹 Real-world example

It may seem complex, but you’ve probably used a Windows Domain before:

* At school or university: they give you a **Username + Password** you can use on any campus device.

* Your credentials are checked against **Active Directory**, they are not stored on each device.

* Active Directory also lets the school prevent you from opening **Control Panel** or having admin privileges.

***

### 🏢 Welcome to THM Inc.

* In this lab, you will be the **new IT Admin** at THM Inc.

* Your first task: review the current domain "THM.local" and perform some additional configurations.

* You have Admin privileges on the pre-provisioned **Domain Controller (DC)**.

***

### 🔹 Start Machine

* Click the **Start Machine** button to open the machine in the browser.

* If you want to connect via RDP, use these credentials:

**THM Key Credentials**

* Username → `Administrator`

* Password → `Password321`

* IP (RDP) → `MACHINE_IP`

📌 Note: When connecting via RDP, you must enter the Username like this:\
`THM\Administrator`\
so you specify that you are logging in as the Administrator on the THM domain.

If you plan to use RDP from the AttackBox (or your own machine) now is a good time to start it.

***

### ✅ Questions and Answers:

* In a Windows domain, credentials are stored in a centralised repository called…\
  👉 **Active Directory**

* The server in charge of running the Active Directory services is called…\
  👉 **Domain Controller**

***

***

***

## Active Directory :

### 🟢 Active Directory

The core of any **Windows Domain** is the **Active Directory Domain Service (AD DS)**.\
This service is basically a **catalog** that contains all the **Objects** present in the network.

Important AD-supported Objects include:

* Users

* Groups

* Machines

* Printers

* Shares

* And many more…

***

### 🔹 Users

* Users are the most common Object in Active Directory.

* They are also called **Security Principals** → meaning they can be authenticated and granted permissions to resources (like files or printers).

* Any **Security Principal** is an object that can interact with network resources.

Users can represent:

1. **People:** employees who need to log in to the network.

2. **Services:** like IIS or MSSQL. These services run under dedicated service accounts, separate from normal user accounts.

***

### 🔹 Machines

* Every device joined to the domain gets a **Machine Object** in Active Directory.

* Machines are also **Security Principals** and have an account similar to user accounts but with limited privileges.

* The machine's local Administrator account exists on the device itself and should not be used by others.

* **The machine account password changes automatically** and is long (around 120 characters).

📌 Machine account names have this format:\
`machine_name$`\
Example: if the machine is named `DC01` → the account is `DC01$`.

***

### 🔹 Security Groups

* In Windows you create **Groups** and assign permissions once instead of assigning them to each user individually.

* Benefit: when you add a user to a group → they inherit the group’s permissions.

* Groups themselves are **Security Principals** and can be given permissions on network resources.

* Groups can contain:

  * Users

  * Machines

  * Or even other Groups.

***

### 🔹 Default Domain Groups

| Security Group         | Description                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| **Domain Admins**      | Administrative privileges over the entire domain. They can manage any device, including DCs. |
| **Server Operators**   | Can manage Domain Controllers, but cannot change Admins membership.                          |
| **Backup Operators**   | Can access any file regardless of permissions (for backup purposes).                         |
| **Account Operators**  | Can create or modify accounts.                                                               |
| **Domain Users**       | Contains all user accounts.                                                                  |
| **Domain Computers**   | Contains all computers.                                                                      |
| **Domain Controllers** | Contains all DCs.                                                                            |

***

### 🔹 Active Directory Users and Computers (ADUC)

* To manage users, groups, and machines:

  1. Go to the **Domain Controller**.

  2. Run **Active Directory Users and Computers** from the Start Menu.

* A window opens showing the hierarchy of Objects (Users, Computers, Groups).

* They are organized inside **Organizational Units (OUs)**.

* OUs are **containers** that classify users and machines.

  * Example: Sales department vs IT department.

  * A user can belong to **only one OU**.

📌 In the lab:

* We have an OU named **THM**.

* Inside it are 5 OUs: IT, Management, Marketing, R\&D, Sales.

* You can create a new OU (e.g., Students) for practice.

***

### 🔹 Default Containers

* Apart from the THM OU, there are default containers created automatically:

  * **Builtin:** contains default groups.

  * **Computers:** newly joined computers land here.

  * **Domain Controllers:** contains DCs.

  * **Users:** domain users and default groups.

  * **Managed Service Accounts:** service-specific accounts.

***

### 🔹 Difference between Security Groups and OUs

* **OUs:**

  * Purpose: apply Policies.

  * A user can belong to only one OU.

* **Security Groups:**

  * Purpose: grant access permissions to resources.

  * A user can be a member of **multiple groups**.

***

### ✅ Questions and Answers:

1. **Which group normally administrates all computers and resources in a domain?**\
   👉 **Domain Admins**

2. **What would be the name of the machine account associated with a machine named TOM-PC?**\
   👉 **TOM-PC$**

3. **Suppose our company creates a new department for Quality Assurance. What type of containers should we use to group all Quality Assurance users so that policies can be applied consistently to them?**\
   👉 **Organizational Units**

***

***

***

## Managing Users in AD :

## 🟢 Managing Users in AD

### 🔹 Step 1: Remove extra OUs and extra users

* Initially you will notice there is an **extra OU** in AD that is not present in the Organisational Chart.

* Reason: that department was closed due to budget cuts → so it needs removal.

* If you try to Delete it directly → an error appears (because OUs are protected against accidental deletion).

📌 To delete the OU:

1. Enable **Advanced Features** from the View menu.

2. You will then find a new tab called **Object** in the OU Properties.

3. Uncheck **Protect object from accidental deletion**.

4. Now you can Delete the OU.

5. Be careful: any **Users, Groups, or OUs** inside it will also be deleted.

After deleting the extra OU, you may find some users in AD not matching the Organisational Chart → you must **Create/Delete** users to make them match.

***

### 🔹 Step 2: Delegation

* A powerful feature in AD is granting certain users **specific privileges** on particular OUs.

* This process is called **Delegation**.

* Practical example: the IT Support team often gets the right to **reset passwords** for regular users.

📌 In this scenario:

* "Phillip" is the IT Support person.

* We should grant him the permission to **Reset Passwords** for users in Sales, Marketing, and Management.

**Steps:**

1. Right-click the OU (e.g., Sales) → choose **Delegate Control**.

2. Add user "phillip" (use **Check Names** to verify).

3. In the next step: choose **Reset user passwords and force password change at next logon**.

4. Finish the Wizard.

Now Phillip can reset any user password in Sales (repeat same steps for Marketing and Management if desired).

***

### 🔹 Step 3: Test Delegation

* We will test resetting the Password for user **Sophie** in Sales.

* Phillip’s credentials:

  * Username → `THM\phillip`

  * Password → `Claire2008`

⚡ Note:

* Phillip cannot open **Active Directory Users and Computers** (he lacks the necessary privileges).

* We will use **PowerShell** instead:

```bash
Set-ADAccountPassword sophie -Reset -NewPassword (Read-Host -AsSecureString -Prompt 'New Password') -Verbose
```

And to force Sophie to change her password at next login:

```bash
Set-ADUser -ChangePasswordAtLogon $true -Identity sophie -Verbose
```

***

### 🔹 Step 4: Obtain the flag

* Now log in as **Sophie** using the new password:

  * Username → `THM\sophie`

* You will find a **Flag** on her Desktop:

👉 **THM\{thanks\_for\_contacting\_support}**

***

## ✅ Questions and Answers:

1. **What was the flag found on Sophie's desktop?**\
   👉 `THM{thanks_for_contacting_support}`

2. **The process of granting privileges to a user over some OU or other AD Object is called…**\
   👉 `delegation`

***

***

***

## Managing Computers in AD :

## 🟢 Managing Computers in AD

### 🔹 Default behaviour

* Any computer joined to the Domain (except Domain Controllers) is placed automatically in the **Computers** Container.

* If you look on the DC you will find devices already listed there:

  * Servers

  * Laptops

  * PCs for network users

But:

* Having all devices in one place is not a good idea 👎.

* Reason: you may want to apply **different policies** to different types of devices.

***

### 🔹 Better organization for devices

There is no single golden rule, but a great starting point is to separate devices by **usage**:

1. **Workstations:**

   * Devices users log into daily.

   * Used for work or browsing.

   * 🚫 Privileged Users should not log in to these.

2. **Servers:**

   * Provide services to users or other servers.

   * Examples: File Server – Web Server – SQL Server, etc.

3. **Domain Controllers (DCs):**

   * Responsible for managing Active Directory.

   * Considered the most sensitive machines.

   * Contain hashed passwords for all users.

   * (Windows places them automatically in a separate OU.)

***

### 🔹 Lab task

* Create new OUs under the `thm.local` domain as follows:

  * `Workstations`

  * `Servers`

* Then move:

  * PCs and Laptops into the **Workstations OU**.

  * Servers into the **Servers OU**.

📌 Goal: later you can apply different Group Policies per OU.

***

### ✅ Questions and Answers

1. **After organising the available computers, how many ended up in the Workstations OU?**\
   👉 `7` ✅

2. **Is it recommendable to create separate OUs for Servers and Workstations? (yay/nay)**\
   👉 `yay` ✅

***

***

***

## Group Policies :

## 🟢 Group Policies

### 🔹 General idea

So far we divided Users and Computers into **OUs**.\
The main goal isn’t just organization, but to be able to apply **different policies** to each OU independently.\
For example:

* IT has specific settings.

* Marketing has different policies.

* Servers have special security settings.

This is achieved using **Group Policy Objects (GPOs)**.

***

### 🔹 What is a GPO?

* A **GPO** is a **collection of settings** that can be applied to an OU.

* It can contain **user-specific** or **computer-specific** policies.

* The purpose: create a unified baseline for certain devices or accounts.

***

### 🔹 Management tool

* From the **Start Menu** open **Group Policy Management**.

* You’ll see the OU structure as arranged earlier.

* To create a Policy:

  1. Create a new GPO under "Group Policy Objects".

  2. Link it to the OU you want it applied to.

📌 Example:

* **Default Domain Policy** and **RDP Policy** → applied to the entire domain `thm.local`.

* **Default Domain Controllers Policy** → applied only to the Domain Controllers OU.

⚠️ Any GPO affects the OU it’s linked to **and any Sub-OUs beneath it**.

***

### 🔹 GPO components

1. **Scope:**\
   Shows which OUs it is linked to.

2. **Security Filtering:**\
   You can make the Policy apply only to certain Users/Computers.\
   By default: applies to all Authenticated Users.

3. **Settings:**\
   Contains the GPO content.\
   Divided into:

   * **Computer Configurations**

   * **User Configurations**

📌 Example:

* In **Default Domain Policy** → settings affecting computers only (like Password Policy, Account Lockout, etc.).

***

### 🔹 Modify a policy (Password Policy Example)

* Change Minimum Password Length to **10 characters**.

* Path:\
  `Computer Configurations -> Policies -> Windows Settings -> Security Settings -> Account Policies -> Password Policy`

***

### 🔹 GPO distribution

* GPOs are distributed via the SYSVOL Network Share on the DC.

* Default path:

```bash
C:\Windows\SYSVOL\sysvol\
```

* Machines sync GPOs periodically.

* To force an immediate update:

```bash
gpupdate /force
```

***

### 🔹 Lab tasks

#### 1. Restrict Access to Control Panel

* Create a new GPO named: **Restrict Control Panel Access**.

* Policy:

  * User Configurations → Prohibit Access to Control Panel and PC Settings.

* Link it to OUs: **Marketing, Management, Sales**.

#### 2. Auto Lock Screen GPO

* Create a new GPO named: **Auto Lock Screen**.

* Policy:

  * Computer Configurations → Windows Settings → Security Settings → Local Policies → Security Options (Inactivity limit = 5 min).

* Link it to the **root domain** so it applies to all machines.

***

### ✅ Questions and Answers

1. **What is the name of the network share used to distribute GPOs to domain machines?**\
   👉 `sysvol` ✅

2. **Can a GPO be used to apply settings to users and computers? (yay/nay)**\
   👉 `yay` ✅

***

***

***

## Authentication Methods :

## 🟢 Authentication Methods

### 🔹 General idea

* In a **Windows Domains** environment, all Credentials (login data) are stored in the **Domain Controllers (DCs)**.

* Any service requiring user verification must ask the DC.

* There are two main protocols:

  1. **Kerberos** → the default protocol in modern Windows.

  2. **NetNTLM** → an older protocol (kept for legacy compatibility).

⚠️ Most networks still run both, but **Kerberos is the primary**.

***

## 🔹 Kerberos Authentication

Kerberos works using **Tickets**.\
A ticket = proof that you have been authenticated.

### 📌 Kerberos authentication steps:

1. **Step One:**

   * The user sends Username + Timestamp (encrypted with a key derived from the password) → to the **KDC** (service on the DC).

   * The KDC returns:

     * **TGT (Ticket Granting Ticket)** → a main ticket allowing requests for service tickets (TGS).

     * **Session Key** → used in subsequent requests.

   * The TGT is not usable by the user directly because it is encrypted with the krbtgt account password.

2. **Step Two:**

   * The user wants access to a specific service (Share, Website, Database…).

   * Sends:

     * Username + Timestamp (encrypted with the Session Key).

     * The TGT.

     * The service name (SPN).

   * The KDC replies with:

     * **TGS (Ticket Granting Service)** → a ticket specific to that service.

     * **Service Session Key**.

   * The TGS is encrypted with the password of the account that runs the service (Service Owner).

3. **Step Three:**

   * The user sends the TGS to the target service.

   * The service decrypts it with its account password and verifies the Service Session Key.

   * The connection succeeds. ✅

***

## 🔹 NetNTLM Authentication

Operates using a **Challenge–Response** mechanism.

### 📌 NetNTLM steps:

1. The client requests login from the server.

2. The server generates a random number and returns it (Challenge) (16-digit random number).

3. The client combines its NTLM Hash with the Challenge → produces a Response.

4. The server sends the Response to the DC to verify.

5. The DC recalculates the Response and compares.

6. If they match → authentication is successful.

⚠️ Note:

* The password (or its hash) **is not sent over the network**.

* If the account is local (Local Account) → the server can verify itself because it has the password hash in SAM.

***

## ✅ Questions and Answers

1. **Will a current version of Windows use NetNTLM as the preferred authentication protocol by default? (yay/nay)**\
   👉 `nay` ✅

2. **When referring to Kerberos, what type of ticket allows us to request further tickets known as TGS?**\
   👉 `Ticket Granting Ticket` ✅

3. **When using NetNTLM, is a user's password transmitted over the network at any point? (yay/nay)**\
   👉 `nay` ✅

***

***

***

## Trees, Forests and Trusts :

## 🌳 Trees, Forests and Trusts

### 📌 Single Domain

So far we discussed managing a single domain and the role of the Domain Controller in housing computers, servers, and users. A single domain is sufficient at first, but as companies grow, needs change.

***

### 🌲 Trees

Imagine your company expands to a new country with different laws and regulations. You may need to adjust GPOs and have an IT team per country managing local resources without interfering with others. You could build a complex OU structure, but that’s error-prone.

Active Directory supports multiple domains so you can divide the network into independently managed units. If domains share the same namespace (e.g., `thm.local`), they can form a **Tree**.

Example:

* Root Domain: `thm.local`

* Subdomains: `uk.thm.local` and `us.thm.local`

Each branch has its own DC managing only that branch’s resources. Admins in UK won’t manage US resources and vice versa.

👉 Note:

* Each domain has its own Domain Admins.

* There are **Enterprise Admins** with privileges across all domains in the organization.

***

### 🌳 Forests

You can manage domains in **different namespaces**.\
Example: your company bought another company called MHT.

* The original company has its own Tree.

* The acquired company has its own Tree.

Joining multiple Trees with different namespaces into one network is called a **Forest**.

***

### 🤝 Trust Relationships

Multiple domains, trees, or forests allow better organization. But at some point a user in UK may need access to a file on a server in MHT.

Solution: **Establish a Trust Relationship**.

* Trust = allowing users in one domain to access resources in another domain.

📌 Types of Trust:

1. **One-way trust:**

   * AAA trusts BBB → a user from BBB can access resources in AAA.

   * Direction matters for access.

2. **Two-way trust:**

   * Domain A and Domain B trust each other.

   * Users from both sides can access each other’s resources.

   * This is the default type when domains are joined under a Tree or Forest.

⚠️ Important: a Trust Relationship does not automatically grant permissions on resources. It just allows you, as an Admin, to grant cross-domain permissions—the actual access decision remains yours.

***

### ✅ Questions and Answers

* What is the name for the group of domains that share the same namespace?\
  **Tree**

* What must be configured between two domains so a user from Domain A can access a resource in Domain B?\
  **Trust Relationship**

***

***

***

## Conclusion

## Conclusion 📝

In this Room, we presented the core components and concepts related to **Active Directory** and **Windows Domains**.

📌 Remember: this Room is only an **introduction to basic concepts**; there are many more details required to build a production-ready Active Directory environment.

🔐 If you are interested in learning how to **harden your Active Directory**, go to:\
➡️ **Active Directory Hardening Room**

💻 If you want to learn how **attackers abuse AD misconfigurations and what techniques they use**, go to:\
➡️ **Compromising Active Directory module**

