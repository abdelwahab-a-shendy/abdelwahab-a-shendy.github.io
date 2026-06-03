---
id: "68e983aca9b723389c51c4df"
title: "Metasploitable-1"
description: "Full Penetration Test & Root Access Report on Metasploitable 1 (Ubuntu8.04)\n"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/labs/metasploitable1"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-10T22:07:40.214Z"
updatedAt: "2026-01-25T15:35:47.024Z"
---

## 🎯 Report Objective

This report documents **all phases** of the penetration testing process performed on the vulnerable machine **Metasploitable 1**. It includes:

* 🛠️ The tools and techniques used in each phase.

* 🔎 Analysis of the discovered vulnerabilities.

* 🔐 A breakdown of how **root access** was obtained.

***

## 🧾 General Information

* **Target Machine**: Metasploitable-1

* **Operating System**: Ubuntu 8.04

* **Difficulty Level**: Beginner to Intermediate

* **Target IP**:`192.168.84.132`

* **Attacker IP (Kali)**: `192.168.84.131`

* **Network Setup**: All machines are connected to the same NAT network (internal LAN).

### 🧰 Tools Used:

`nmap`, `msfconsole`, `nikto` , `smbclint`, `searchsploit`, `enum4linux`, `telnet` , etc.

***

# **First, let's make sure we're on the same network :**

* Since I put all the machines on one LAN network (NAT)

* The IP of the Attack machines (Kail) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752662234666/27f7dc8d-081d-4095-8c71-0a0d8fb59397.png" alt="IP Attacker" align="center" fullwidth="true" />

## 🧭 Phase 1: Discovery

### 🔹 Discover active devices:

```plaintext
sudo netdiscover -r 192.168.84.0/24
```

```plaintext
nmap -sn 192.168.84.0/24
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752662717723/45c2eadb-3f2e-45a8-b6c1-86dc19c57b40.png" alt="" align="center" fullwidth="true" />

-sn: Scan without port detection (Ping Scan only) 192.168.84.0/24 : Scan the entire Class C network (256 IP addresses)

📌 Results: 5 live devices confirmed:

```plaintext
192.168.84.1
192.168.84.2
192.168.84.132 ✅ Possible Target
192.168.84.131
192.168.84.254
```

Device <mark>192.168.84.132</mark> appears in both netdiscover and nmap, which makes it likely the target device.

### **Step 3: Scan for open services and ports on the target**

🔹 Tool: nmap ✅ Command:

```plaintext
nmap -p- -sV -T5 -O IP-Target| tee Kiopxrix.txt
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752663378165/e82c3802-f9e8-4f12-88c4-cc13789411c8.png" alt="" align="center" fullwidth="true" />

Analyzing open port scan results :

| Port    | Service    | Version                  | Initial Notes                                  |
| ------- | ---------- | ------------------------ | ---------------------------------------------- |
| 21      | FTP        | ProFTPD 1.3.1            | Known for vulnerabilities                      |
| 22      | SSH        | OpenSSH 4.7p1            | Probably won't be exploited initially          |
| 23      | Telnet     | Linux telnetd            | Open, can be tried with default privileges     |
| 25      | SMTP       | Postfix smtpd            | Can be exploited or guessed                    |
| 53      | DNS        | ISC BIND 9.4.2           | Has old vulnerabilities                        |
| 80      | HTTP       | Apache 2.2.8 + PHP 5.2.4 | Very important web gateway                     |
| 139/445 | Samba      | smbd 3.X - 4.X           | Very exploitable                               |
| 3306    | MySQL      | 5.0.51a                  | Try connecting without a password              |
| 3632    | distccd    | v1                       | Contains a known vulnerability (CVE-2004-2687) |
| 5432    | PostgreSQL | 8.3.x                    | Highly likely without a password               |
| 8009    | AJP13      | Apache JServ             | Targeting it later with Tomcat                 |
| 8180    | HTTP       | Tomcat/JSP engine        | Vulnerable (sometimes very strongly)           |

## Phase 2: Enumeration – Gathering Information from Open Services We'll start testing each open service one by one and see if we can benefit from it :

### **1 -We will start with FTP – Port 21 (ProFTPD 1.3.1) :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752664082536/0ef86be9-5cb0-4e94-8eac-754965f8b0aa.png" alt="" align="center" fullwidth="true" />

* The FTP service does not allow anonymous login. ❌ This means that it is currently impossible to access files via FTP without actual privileges.

### 2- We will start with Telnet – Port 23 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752664411819/f059b595-db00-4ead-82b5-4dd789cb609e.png" alt="" align="center" fullwidth="true" />

* The service is operating normally on port 23.

* I tried the password with the same username that I entered

* The login is visible, and the user is prompted for a username and password.

* The usernames I tried (anonymous, root, admin) did not work, and some caused the connection to be disconnected after incorrect attempts.

### 3. SMB (Samba) – Port 139, 445

✅ Check anonymous sharing :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752664886692/7e4e45b9-2c2c-40d2-8d6f-7f5b470c0a1a.png" alt="" align="center" fullwidth="true" />

🧾 Available sheers :

* print$ => Disk Printer Driver => Mostly unimportant.

* tmp => Disk Oh noes! => Very interesting

* opt => Disk (uncommented) => We might find additional files in it.

* IPC$ => IPC: Internal connection, usually without files => Sometimes used to execute commands.

* ADMIN$ => IPC: Same as above, may request permissions => We probably won't be able to connect to it anonymously.

Let's start by reviewing the important shares, and we'll start with tmp because it contains an interesting comment: oh noes! :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752665291828/b48bd839-c6fc-4c0a-9fe3-3c08ca36a599.png" alt="" align="center" fullwidth="true" />

Advanced Scan :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752666055215/f8e70846-aa0c-4fe1-9039-2749513aaa67.png" alt="" align="center" fullwidth="true" />

* The workgroup name of the target machine is WORKGROUP. This is common in SMB setups, especially in older Windows/SMB environments.

* grep "^user:": Displays all accounts/users present on the victim system.

* rid is a relative identifier, used in Windows/Samba systems to identify a user within a domain (SID).

```plaintext
### ✅ Summary from enum4linux:

Domain Name : WORKGROUP
OS Info : Samba 3.0.20-Debian on Linux Ubuntu 8.04
Users Enumerated :
  - root => The highest-authority user on the system (key to control)
  - msfadmin => A user
  - mysql => Indicates the presence of a MySQL database
  - postgres
  - tomcat55
  - distccd
  - service
Samba Shares :
  - `tmp`: Listing OK, Write: No
  - `opt`: Access Denied
Password Policy
  - Minimum length: 5
  - Complexity: Disabled
```

4 . Website Analysis (HTTP) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752667043055/452d1e3c-903d-4ed9-8e34-70bf27af3aed.png" alt="" align="center" fullwidth="true" />

* Apache/2.2.8 and PHP/5.2.4-2ubuntu5.10 => very old and outdated versions, containing known vulnerabilities => Excellent for exploitation

* phpinfo.php exposed => allows the collection of sensitive information about the system such as paths and server environment => It can be used to collect information before exploitation.

**Open in browser :** You will find more valuable information that you can exploit this way :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752667520729/f6b5c1a8-44e5-4f60-a46d-ec50a09611a2.png" alt="" align="center" fullwidth="true" />

## 🎯 Phase 3: Exploitation

We will begin by focusing on the most exploitable services, which are:

##### Use searchsploit :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752671765772/d5803bbc-14f6-4c7d-9769-19e359fc742b.png" alt="" align="center" fullwidth="true" />

The vulnerability is already present in Metasploit tools :

✅ Steps to exploit the vulnerability using Metasploit Open `msfconsole`

1- I wrote in msfconsole :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752672209344/1e9b4cd2-28fa-4b1c-bd8d-b8fe795caec3.png" alt="" align="center" fullwidth="true" />

2 -Use the exploitation unit :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752672328589/04b1d319-fb25-4e65-b1f4-4b0677d2c6a3.png" alt="" align="center" fullwidth="true" />

3 -Adjust basic settings :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752672696556/cbe9bd3a-15c5-4304-9bc2-23bfc44a6cfb.png" alt="" align="center" fullwidth="true" />

4-Run the exploit :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752673112122/1de59d97-84a8-4c71-9769-26991b9bd18c.png" alt="" align="center" fullwidth="true" />

Confirm the exploit. Change the root password :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752673322392/ab016570-de98-430d-a2ad-6af559ecbace.png" alt="" align="center" fullwidth="true" />

Try logging in using root username and password :

```plaintext
username : root
pass : AS
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752673539386/2f514f82-7009-4205-8262-918aee3d1bec.png" alt="" align="center" fullwidth="true" />

###### So remember:

> ***💬 "Control*** ***the code, and you control the world." 🔐 From wiping metadata to gaining root access — every step is documented and my goal is to deeply understand the system, not just hack!***
>
> [***Abdelwahab Shandy***](https://abdelwahabshandy.hashnode.dev/)
>
> [***Linkedin***](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)
>
> [***GitHub***](https://github.com/abdelwahab-ahmed-shandy)
>
> ***See You Soon***
>
> ***AS Cyber “)).***

