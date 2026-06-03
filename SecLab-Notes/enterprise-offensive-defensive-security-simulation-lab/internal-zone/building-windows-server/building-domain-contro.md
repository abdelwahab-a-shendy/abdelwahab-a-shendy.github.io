---
id: "696e402df14954ca5eac7165"
title: "Building Domain Controller"
description: "Active Directory Domain Service (ADDS)"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/enterprise-offensive-defensive-security-simulation-lab/internal-zone/building-windows-server/building-domain-contro"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2026-01-19T14:31:09.351Z"
updatedAt: "2026-01-25T15:35:46.730Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768833410701/0c8e7d62-8ed9-4286-8e4f-55bdc7f151ba.png" alt="" align="center" fullwidth="true" />

1. ## Some important information :

### Active Directory Domain Service (ADDS)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768990503469/9bf72414-14a3-4f31-be5a-bc8e3aed36d1.png" alt="" align="center" fullwidth="true" />

This image illustrates the structural concept of connecting devices to a domain:

**Adding a Role (ADD):** The first step is to install the Active Directory Domain Services role, then begin the configuration process.

**Domain Controller (DC):** This represents the primary server that manages the domain. Here, it's called the PDC (Primary Domain Controller) and holds a test domain such as Test.local.

**Switch:** The diagram shows that the server and client devices are connected through a central "switch" to facilitate data exchange.

**Joining a Domain:** This shows the process by which a device transitions from WorkGroup mode to Domain Join mode, becoming managed by the server.

***

### Forest & Functional Levels :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768991105271/c9e13cc3-74df-4ded-b2ff-8d6b45eb75f5.png" alt="" align="center" fullwidth="true" />

This image illustrates advanced forest and domain management concepts:

**Forest Function Level (FFL):** This is the minimum version of Windows Server that the forest accepts for a domain controller to function.

**Domain Functional Level (DFL):** If a domain's level is higher than the forest level, any child domain must meet this requirement.

**Upgrade Rule:** A domain can be raised (Up) normally, but it cannot be lowered (Down) once it has been upgraded.

**Hierarchical Structure:**

**Forest Root Domain:** This is the first domain created in the forest (e.g., Vodafone.local).

**Parent Domain:** Primary domains (e.g., Egypt, USA, Ger).

**Child Domain:** Subdomains (e.g., Naser City).

***

### Domain Controller Capabilities

**Domain Name System (DNS):**\
It is essential for translating domain names into IP addresses within the domain.

**Global Catalog (GC):**

* It is a component of the **Active Directory** database.

* It contains partial information about every object within the entire forest, such as **Organizational Units (OUs)**, **Users**, and **Groups**.

***

### **Directory Services Restore Mode (DSRM)**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768992353733/593b184b-d99f-4c81-abc1-c54751f5566f.png" alt="" align="center" fullwidth="true" />

**DSRM Password:** This is the password for the **local administrator account (Local Admin)**.

**Usage:** It is used when performing a **data restore** or **backup recovery**.

**Access Method:** This mode is accessed by pressing the **F8 key** during system startup to enter **Repair Mode**.

***

### AD DataBase :

The components of data storage within the system are described below:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768992731674/aac04b01-cf57-4762-9381-8a31c6efa106.png" alt="" align="center" fullwidth="true" />

**NTDS (.dit):** The primary database file located at C:\Windows\NTDS. It is divided into a database folder and a log folder.

**SYSVOL:** A folder created automatically by the system. It contains policies and scripts and has "read-only" permissions for all objects within the domain.

***

***

2. ## Steps to install and configure Active Directory Domain Services (AD DS) :

### **Add Role**

How to start installing the service itself through **Server Manager**:

* **Select installation type:** Choose the installation type.\
  In this step, **“Role-based or feature-based installation”** is selected :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768992997305/dcb84f0b-8d0f-487e-8427-46fa2321541d.png" alt="" align="center" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768993040443/9e39b4e9-5071-44d6-9a5b-fe8eeeec1ee5.png" alt="" align="center" fullwidth="true" />

### **Select destination server:**

* Select the target server (in the image, a server named PDC is shown) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768993091332/9c663d77-31a8-4cd6-ac1a-dd2e811e2d46.png" alt="" align="center" fullwidth="true" />

### Select server roles :

* This is the most important part, where you specify the Active Directory Domain Services. A sub-dialogue appears asking you to add the required features (Add Features) to support this role :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768993167475/30242ba7-59e3-4864-9188-c49555dfbe4f.png" alt="" align="center" fullwidth="true" />

> next and next and next

### **Active Directory Domain Services:**

* An introductory page explaining the role of AD DS in network management :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768993329231/749b3914-1e29-48cd-a214-151564e62810.png" alt="" align="center" fullwidth="true" />

> Installation progress: Shows the installation process progress until completion (Done Add Role) .

***

***

3. ## Configure Active Directory

**After the role is established, the next step is to upgrade the server to a "Domain Controller":**

**Upgrade (Promote):** Begin by clicking the yellow exclamation mark in Server Manager and selecting "Promote this server to a domain controller" :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768993819231/3ee8ca3d-da2e-443d-863c-7f1cd6a07c43.png" alt="" align="center" fullwidth="true" />

Deployment Configuration: Select "Add a new forest" and name the domain (in the example: `aas.local` ) :

* <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768993978208/b35bfcf3-6bfd-48c1-a03e-d7150c767d84.png" alt="" align="center" fullwidth="true" />

**Domain Controller Options:** Specify Functional Levels and enter a Service Recovery Password (DSRM). Note that the DNS server and Global Catalog options are enabled.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768994209615/bc3990db-95ab-4c97-b831-a060f6c3e30b.png" alt="" align="center" fullwidth="true" />

**DNS Options:** A note about DNS delegation appears :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768994327211/923a94e0-adfa-4190-9a58-fc055171ac11.png" alt="" align="center" fullwidth="true" />

> We need this when the child delegates DNS authority to the parents. But here we will click next.

**Additional Options:** Check the NetBIOS name (shown in the example as AAS):

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768994382537/e4618329-0807-476c-85f6-0f05498fc289.png" alt="" align="center" fullwidth="true" />

**Paths:** Specify the paths to the database and log (NTDS) and the SYSVOL folder :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768994451835/0a55d314-7030-4e6c-958d-3cc5b2db83c2.png" alt="" align="center" fullwidth="true" />

**Review Options & Installation:** Review all settings and then begin the final installation :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768994494483/52cf1e6e-46e9-4723-93e3-3886fd0b3722.png" alt="" align="center" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768994580517/578f6a2c-9273-4cf6-89eb-27b9b5487cdc.png" alt="" align="center" fullwidth="true" />

> Restart

***

4. ## Final Stage (Done) Login Screen:

* A screenshot of the Windows lock screen appears with the new username in the domain format: `AAS\Administrator` :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768995032642/06f94606-8db0-48ec-8743-8b8070e8014c.png" alt="" align="center" fullwidth="true" />

> ✅ Restart: The guide concludes with `Restart` and `DONE YA BRO` to indicate successful completion.

