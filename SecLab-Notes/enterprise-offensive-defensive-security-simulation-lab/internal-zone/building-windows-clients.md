---
id: "696e4061b984877cf6ac6c26"
title: "Building Windows Clients"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/enterprise-offensive-defensive-security-simulation-lab/internal-zone/building-windows-clients"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2026-01-19T14:32:01.296Z"
updatedAt: "2026-01-25T15:35:46.729Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768833431162/52e404c8-8442-4c57-b238-03fbbb9acb40.png" alt="" align="center" fullwidth="true" />

## Install Windows Server :

### **1. Initial Configuration**

This section explains the preparatory steps before starting the actual installation process inside the virtual environment (such as VMware or VirtualBox):

* **Create a New VM:** Begin by creating a new virtual machine.

* **Select the ISO File:** Choose the Windows ISO version to be installed.

* **Allocate Resources:** Specify the hard disk size and memory (RAM).

**Important Note:**\
The **Network Adapter** settings must be properly configured.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769004811848/eb7cbe4e-cd86-4460-b3e3-e02161bab49c.png" alt="" align="center" fullwidth="true" />

***

## Install VMWare Tools:

### In Win Client ANd Server :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948688621/3fb7057c-9e7a-429e-bc4b-c97a61441448.png" alt="" align="center" fullwidth="true" />

**Then :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948717647/09275206-d1d5-4922-8c05-f73f538833d3.png" alt="" align="center" fullwidth="true" />

**Then :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948736533/f06d61b4-a28e-47fc-a3fe-171f32f8f1db.png" alt="" align="center" fullwidth="true" />

And Next => Next => Then Reboot/ Restart

***

### **Change Date, Time, and Time Zone :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769005281231/be3aac76-acbb-4deb-9c0a-8d12abbd286e.png" alt="" align="center" fullwidth="true" />

***

### **Change Device Name :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769005193922/8116b098-d46b-4201-8599-db7ef3990660.png" alt="" align="center" fullwidth="true" />

> And reboot

***

### **Configuration of IP Addresses**

### This section is the most important to ensure proper connectivity between devices:

### 🔵 Internal Zone Machines

| Machine  | Internal       | DMZ            | External      |
| -------- | -------------- | -------------- | ------------- |
| Client 1 | 172.16.200.210 | 172.16.100.210 | 172.16.10.210 |
| Client 2 | 172.16.200.211 | 172.16.100.211 | 172.16.10.211 |
| Client 3 | 172.16.200.212 | 172.16.100.212 | 172.16.10.212 |
| Client 4 | 172.16.200.213 | 172.16.100.213 | 172.16.10.213 |
| Client 5 | 172.16.200.214 | 172.16.100.214 | 172.16.10.214 |

### 🔵 Internal Zone Machines

🔵 Internal Zone Machines

* Adapter 1: NAT (Actually used only by the Domain Controller)

* Adapter 2: Internal-Zone → DNS → IP Windows Server

* Adapter 3: DMZ-Zone

* Adapter 4: External-Zone

Open Network And Sharing Center :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989434499/a19d5fd0-85b7-40c9-8fdb-db0b7ee79fa4.png" alt="" align="center" fullwidth="true" />

In Ethernet 2 (Internal):

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769006458677/ccbb578e-9d6a-49ea-a71d-61fb6669d881.png" alt="" align="center" fullwidth="true" />

In Ethernet 3 (DMZ):

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769006518595/571121d6-0718-4a3f-bed0-6e76a49ffa8d.png" alt="" align="center" fullwidth="true" />

In Ethernet 4 (External) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769006593968/adcffd0f-52f7-4463-b55e-09baa94282ff.png" alt="" align="center" fullwidth="true" />

***

### Check Connection betwen Device :

in Win Server :

```bash
C:\Users\Administrator>ipconfig

Windows IP Configuration


Ethernet adapter Ethernet:

   Connection-specific DNS Suffix  . : home
   Link-local IPv6 Address . . . . . : fe80::c8d0:3e26:219d:fe41%5
   IPv4 Address. . . . . . . . . . . : 10.0.2.15
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 10.0.2.2

Ethernet adapter Ethernet 2:

   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::54a5:79b2:372b:a7bc%17
   IPv4 Address. . . . . . . . . . . : 172.16.200.201
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . :

Ethernet adapter Ethernet 3:

   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::1d4d:6fd4:6aff:972d%9
   IPv4 Address. . . . . . . . . . . : 172.16.100.201
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . :

Ethernet adapter Ethernet 4:

   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::1c8e:1309:e820:530%10
   IPv4 Address. . . . . . . . . . . : 172.16.10.201
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . :

C:\Users\Administrator>
```

> IP IN Internal Network : `172.16.200.201`

in Win Client :

```bash
C:\Users\vboxuser>ping 172.16.200.201

Pinging 172.16.200.201 with 32 bytes of data:
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128

Ping statistics for 172.16.200.201:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms
```

***

> ✅ Building Windows Clients

