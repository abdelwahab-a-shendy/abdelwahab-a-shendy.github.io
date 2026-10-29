
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768746412314/abd395ac-3196-4a68-9ed1-886763866c69.png" alt="" align="center" fullwidth="true" />

## 1️⃣ Lab Network Zones Overview

This lab is designed using **three logical network zones** to simulate a real-world **enterprise environment**, with an additional advanced defensive layer for **monitoring and automation (SIEM / SOAR)**.

### 🌐 External / Outside Network – 172.16.10.0/24

Represents the internet or the attacker network.

Includes:

* Kali Linux

* CommandoVM

Used for:

* Attacks and exploitation

* Reconnaissance

* Network pivoting

***

### 🟠 DMZ Zone – 172.16.100.0/24

An intermediate **Demilitarized Zone (DMZ)**.

Hosts exposed and attack-facing systems:

* Web Server

* Vulnerable Windows

* pfSense Firewall

Represents public-facing services accessible from external networks.

***

### 🔵 Internal Network – 172.16.200.0/24

Represents the corporate internal network.

Includes:

* Domain Controller

* Client machines

* IIS Server

* SIEM & Automation services

This is the most secure zone and contains management, monitoring, and core enterprise systems.

***

## 2️⃣ Network Configuration (VirtualBox NAT Networks)

Instead of using **Bridged Networking**, **NAT Networks** are used to completely isolate the lab from the physical host while still allowing limited internet access for updates.

| Network Name  | Subnet Range    | DHCP                  | Purpose                       |
| ------------- | --------------- | --------------------- | ----------------------------- |
| External-Zone | 172.16.10.0/24  | Disabled              | Attacker Infrastructure       |
| DMZ-Zone      | 172.16.100.0/24 | Disabled              | Public-Facing Services        |
| Internal-Zone | 172.16.200.0/24 | Disabled (DC Managed) | Corporate Assets & Management |

💡 **Static IP addressing** is used to ensure stable communication with the SIEM and the Domain Controller.

***

## 3️⃣ Adapter Allocation Strategy

### 🔧 Management Adapter

All machines include:

* **Adapter 1:** NAT

Purpose:

* Internet access

* System updates

* SIEM agent communication

***

### Service Adapters

Each machine is connected to its designated zones (External / DMZ / Internal).

Attack machines (Kali, CommandoVM) use **Multi-Homing** to enable:

* Pivoting

* Lateral movement

* Realistic attack paths

⚠️ **Security Warning:** When testing real malware samples, the **NAT adapter must be completely disconnected**.

***

## 4️⃣ Static IP Addressing Schema (Multi-Homed)

### 🟢 External Zone Machines

| Machine    | External     | DMZ           | Internal      | Mask |
| ---------- | ------------ | ------------- | ------------- | ---- |
| Kali Linux | 172.16.10.10 | 172.16.100.10 | 172.16.200.10 | /24  |
| CommandoVM | 172.16.10.20 | 172.16.100.20 | 172.16.200.20 | /24  |

***

### 🟠 DMZ Zone Machines

| Machine            | DMZ            | External      | Internal       | Mask |
| ------------------ | -------------- | ------------- | -------------- | ---- |
| Vulnerable Windows | 172.16.100.50  | 172.16.10.50  | 172.16.200.50  | /24  |
| Vulnerable Linux   | 172.16.100.55  | 172.16.10.55  | 172.16.200.55  | /24  |
| Web Server         | 172.16.100.60  | 172.16.10.60  | 172.16.200.60  | /24  |
| pfSense            | 172.16.100.100 | 172.16.10.100 | 172.16.200.100 | /24  |

***

### 🔵 Internal Zone Machines

| Machine           | Internal       | DMZ            | External      | Mask |
| ----------------- | -------------- | -------------- | ------------- | ---- |
| Domain Controller | 172.16.200.201 | 172.16.100.201 | 172.16.10.201 | /24  |
| IIS Server        | 172.16.200.202 | 172.16.100.202 | 172.16.10.202 | /24  |
| Client 1          | 172.16.200.210 | 172.16.100.210 | 172.16.10.210 | /24  |
| Client 2          | 172.16.200.220 | 172.16.100.220 | 172.16.10.220 | /24  |

***

## 5️⃣ Defensive & Automation Layer (Blue Team)

### 📊 SIEM – ELK Stack

* **Location:** Internal Zone

* **IP Address:** 172.16.200.250

Functions:

* Centralized logging

* Detection and correlation

Agents:

* Winlogbeat

* Filebeat

***

### 🤖 SOAR – n8n Automation

* **IP Address:** 172.16.200.250

Role:

* Incident response automation

* Playbooks and workflows

Example:

* **ELK Alert ➜ n8n Workflow ➜ pfSense Block IP**

***

## 6️⃣ Critical Configuration Notes

* **Gateway Rule:**\
  Each machine must have **only one default gateway**, typically:

  * The pfSense IP within the machine’s primary zone

* **DNS Configuration:**\
  Internal Zone machines must use:

  * **172.16.200.201 (Domain Controller)**

* **NAT Adapter:**

  * Receives an automatic IP (e.g., 10.0.2.x)

  * Used strictly for internet access

  * Not part of the logical network design

***

## 7️⃣ Final Objectives

This design achieves:

* Realistic enterprise network simulation

* Full Red / Blue / Purple Team visibility

* Hands-on SIEM and SOAR experience

* Safe malware and attack testing environment

📌 A complete environment for learning, experimentation, and analysis without exposing your physical host to any risk.

