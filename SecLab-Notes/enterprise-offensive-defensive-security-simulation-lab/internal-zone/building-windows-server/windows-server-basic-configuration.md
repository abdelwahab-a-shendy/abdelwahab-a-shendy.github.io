---
id: "697004ce4ff32703b3d59d85"
title: "Basic Configuration (After DC)"
description: "Building Windows Server"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/enterprise-offensive-defensive-security-simulation-lab/internal-zone/building-windows-server/windows-server-basic-configuration"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2026-01-20T22:42:22.001Z"
updatedAt: "2026-01-25T15:35:46.748Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768833410701/0c8e7d62-8ed9-4286-8e4f-55bdc7f151ba.png" alt="" align="center" fullwidth="true" />

### **1. Change Date, Time, and Time Zone**

These settings are accessed through the **Server Manager** control panel:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989101207/ad227756-6974-4513-b49b-7b51e13f3dd5.png" alt="" align="center" fullwidth="true" />

The date and time are adjusted to match the geographical location (such as Cairo) to ensure proper synchronization of logs and services.

***

### **2. Change Device Name**

This step includes changing the default device names to make them easier to identify within the network:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989187981/bc1bc7d6-7654-42f0-89d1-0a566cba6445.png" alt="" align="center" fullwidth="true" />

* On the **server**, the name is changed from the default settings to a custom name such as **PDC** (short for *Primary Domain Controller*).

Changing the device name usually requires a system restart to apply the changes.

***

### **3. Configuration of IP Addresses**

### This section is the most important to ensure proper connectivity between devices:

### 🔵 Internal Zone Machines

| Machine           | Internal       | DMZ            | External      |
| ----------------- | -------------- | -------------- | ------------- |
| Domain Controller | 172.16.200.201 | 172.16.100.201 | 172.16.10.201 |

🔵 Internal Zone Machines

* Adapter 1: NAT (Actually used only by the Domain Controller)

* Adapter 2: Internal-Zone

* Adapter 3: DMZ-Zone

* Adapter 4: External-Zone

Use `Ctrl + R` : ncpa.col

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989374165/482b4090-f2c6-4b10-a10c-428e750d75ab.png" alt="" align="center" fullwidth="true" />

In Ethernet 2 (Internal):

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989434499/a19d5fd0-85b7-40c9-8fdb-db0b7ee79fa4.png" alt="" align="center" fullwidth="true" />

Then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989533047/2190cebb-f396-42e1-9165-cfd9010899ca.png" alt="" align="center" fullwidth="true" />

In Ethernet 3 (DMZ):

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989617482/f6137022-d802-47f8-bc38-6cfd945046c3.png" alt="" align="center" fullwidth="true" />

In Ethernet 4 (External) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989671872/18d1dcdc-4f83-475d-b981-e3fbfd3dc2a1.png" alt="" align="center" fullwidth="true" />

> then Restasrt VM

