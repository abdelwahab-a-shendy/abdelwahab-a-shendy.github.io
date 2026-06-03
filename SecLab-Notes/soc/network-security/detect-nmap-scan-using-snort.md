---
id: "68e989396ff6a5ce9b73a6f8"
title: "Detect NMAP Scan Using Snort"
description: "Building a Lab: Snort IDS on Ubuntu with Nmap Attacks from Kali and Traffic Monitoring via Wireshark"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/soc/network-security/detect-nmap-scan-using-snort"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-10T22:31:21.566Z"
updatedAt: "2026-01-25T15:35:46.795Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760135357859/9017af2c-d744-47e5-83f1-032a95402671.png" alt="" align="center" fullwidth="true" />

* Attacker: Kali Linux (nmap).

* Target: Ubuntu (Snort as IDS).

* Or run the Target and let it perform attacks on itself normally.

* Monitoring and verification: Wireshark/tcpdump for PCAP capture and analysis.

***

### First, I’ll install some tools like Wireshark to monitor traffic, etc :

* On the Target machine :

```bash
sudo apt update

sudo apt upgrade -y

sudo apt install wireshark
```

## **Secondly : Installing and configuring Snort as an IDS :**

```bash
sudo -i

sudo apt install -y snort
```

* During installation, I encountered this prompt:

```bash
Package configuration

 ┌───────────┤ Configuring snort ├────────────┐
 │                                            │ 
 │ Please use the CIDR form - for example,      
 │ 192.168.1.0/24 for a block of 256            
 │ addresses or 192.168.1.42/32 for just        
 │ one. Multiple values should be               
 │ comma-separated (without spaces).            
 │                                              
 │ You can leave this value empty and           
 │ configure HOME_NET in                        
 │ /etc/snort/snort.conf instead. This is       
 │ useful if you are using Snort in a system    
 │ which frequently changes network and does    
 │                                              
 │                   <Ok>
```

* This line asks you to define the **HOME\_NET** in CIDR format :

```bash
Package configuration

    ┌─────────┤ Configuring snort ├─────────┐
    │ Address range for the local network:  │ 
    │                                       │ 
    │ 192.168.0.0/16_______________________ │ 
    │                                       │ 
    │                <Ok>
```

* Before continuing, I checked the machine’s IP:

```bash
aas@aas:~$ ifconfig 
enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.0.2.15  netmask 255.255.255.0  broadcast 10.0.2.255
        inet6 fe80::6a6a:bfa1:f934:1ee0  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:f5:0f:ed  txqueuelen 1000  (Ethernet)
        RX packets 210978  bytes 303130933 (303.1 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 31543  bytes 1966166 (1.9 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 316  bytes 27977 (27.9 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 316  bytes 27977 (27.9 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

* The network interface connected to the network is:

```bash
enp0s3
```

* The Target’s IP address is :

```bash
10.0.2.15
```

* The subnet is :

```bash
10.0.2.0/24
```

> because the Netmask = 255.255.255.0.

Since my Target’s actual network is `10.0.2.0/24`, I corrected the default value (`192.168.0.0/16`) to:

```bash
10.0.2.0/24
```

* Or leave it empty and modify later in `/etc/snort/snort.conf`.

* After entering it, press **Ok** to confirm.

***

#### #### Problem encountered during installation :

```bash
FATAL ERROR: /etc/snort/snort.conf(0) Unable to open rules file "/etc/snort/snort.conf": No such file or directory.
```

> * This means either the file is missing or the path is incorrect.
>
> * The issue isn’t with the installation itself—it’s with the **system service (systemd / init.d)** not being able to find the `snort.conf` configuration file.

***

### 🔹 Steps to fix the issue

##### 1️⃣ Verify if `snort.conf` exists

```bash
root@aas:~# ls -l /etc/snort/
total 8
drwxr-xr-x 2 root root 4096 سبت 12 17:42 rules
-rw------- 1 root root  803 سبت 12 17:42 snort.debian.conf
```

* **The main snort.conf file is missing**.

* Only `snort.debian.conf` exists. This is the default Debian/Ubuntu configuration file, not the standard Snort.

* The `rules` folder exists, but the main rules file `snort.conf` is missing. ⇒ The systemd/init.d service can't start Snort.

##### 2️⃣ Create a new `snort.conf` file :

```bash
root@aas:~# cd /etc/snort/
root@aas:/etc/snort# ls
rules  snort.debian.conf
root@aas:/etc/snort# sudo nano snort.conf
```

##### 3️⃣ Add basic settings to run Snort

* After research, I used the following configuration:

```bash
######################################################
# Snort Configuration File
# Version: 2.9.15.1
# Author: Abdelwahab Shandy - Config for IDS Testing
######################################################

#-------------------
# Network Variables
#------------------

# Internal network that Snort will monitor
ipvar HOME_NET 10.0.2.0/24

# All other networks are considered external
ipvar EXTERNAL_NET any

#------------
# Rule Paths
#------------

# Path for Snort rule files
var RULE_PATH /etc/snort/rules
var SO_RULE_PATH /etc/snort/so_rules
var PREPROC_RULE_PATH /etc/snort/preproc_rules

#---------------
# Include Rules
#---------------

# Include your local rules (local.rules)
include $RULE_PATH/local.rules

#-----------------
# Output Settings
#-----------------

# Output alerts directly to the console
output alert_fast: stdout

#---------------
# Preprocessors
#---------------

# Frag3 preprocessor settings
preprocessor frag3_global: max_frags 65536

# Stream5 preprocessor settings
preprocessor stream5_global: track_tcp yes, track_udp yes, track_icmp yes
preprocessor stream5_tcp: policy linux, detect_anomalies
preprocessor stream5_udp:
preprocessor stream5_icmp:

#############################
# End of Snort Configuration
#############################
```

* Frag3 is responsible for IP fragmentation so Snort can understand them as a single unit and detect attacks.

* Stream5 is responsible for session tracking and reassemblingTCP/UDP/ICMP streams so Snort can apply rules to the correct data in the correct order.

##### 3️⃣ Create the local rules file :

```bash
root@aas:/etc/snort# sudo nano rules/local.rules
```

* Add a simple test rule, for example:

```bash
alert icmp any any -> any any (msg:"ICMP test detected"; sid:1000001; rev:1;)
```

##### 4️⃣ Test the configuration to verify if the issue is resolved:

```bash
root@aas:/etc/snort# snort -T -c /etc/snort/snort.conf
```

Output:

```bash
Rule application order: pass->drop->sdrop->reject->alert->log
Verifying Preprocessor Configurations!

[ Port Based Pattern Matching Memory ]

--== Initialization Complete ==--

,,_     -*> Snort! <*-
o"  )~   Version 2.9.15.1 GRE (Build 15125) 
''''    By Martin Roesch & The Snort Team
Using libpcap version 1.10.1
Using PCRE version: 8.39
Using ZLIB version: 1.2.11

Snort successfully validated the configuration!
Snort exiting
```

* This means **Snort configuration is now successfully validated**.

  * `snort.conf` is valid: all paths and rules exist and are correct.

  * **Preprocessors are working**: protocol analysis and other settings are ready.

  * Snort is **not running yet**: the `-T` option only tests the configuration, so Snort exits after the test.

##### Testing live alerts:

* Run Snort to see alerts directly:

```bash
sudo snort -i lo -c /etc/snort/snort.conf -A console
```

* Monitoring the loopback interface (`lo`)

  * I’ll ping from the same machine for simplicity instead of using another VM.

From another terminal:

```bash
aas@aas:~$ ping 10.0.2.15
```

Output:

```bash
WARNING: No preprocessors configured for policy 0.
09/12-18:28:23.648061  [**] [1:1000001:1] ICMP test detected [**] [Priority: 0] {ICMP} 10.0.2.15 -> 10.0.2.15
```

* This confirms the rule is working: Snort captures any ICMP traffic on the monitored interface (`lo`).

* Running on the `enp0s3` interface did not trigger alerts because internal pings go through `lo`, not `enp0s3`.

* Pinging from another device on the `10.0.2.0/24` network will trigger an alert immediately.

> This was just a test. Everything is now set, so we can proceed to the main task.

***

# Preparing and testing Nmap scan detection

### 1️⃣ Add Nmap rules to `local.rules`

* We start with some of the most common Nmap scan types.

### 1️⃣ Open the local rules file

```bash
nano /etc/snort/rules/local.rules
```

* Here is the snort rule structure:

```bash
action protocol sourceIP sourceport -> destinationIP destinationport ([Rule options])
```

* EX :

  * A. Ping Sweep detection

```bash
# Ping Sweep Detector

alert icmp any any -> 10.0.2.15 any (msg:"NMAP Ping Sweep Scan"; dsize:0; sid:1000002; rev:1;)
```

* B.NULL Scan detection

```bash
action protocol sourceIP sourceport -> destinationIP destinationport ([Rule options])
```

* C.TCP Scan detection on port 22 :

```bash
alert tcp any any -> 10.0.2.15 22 (msg:"NMAP TCP Scan"; sid:1000003; rev:1;)
```

* D.XMAS Scan detection :

```bash
alert tcp any any -> 10.0.2.15 22 (msg:"NMAP XMAS Scan"; flags:FPU; sid:1000004; rev:1;)
```

* E.FIN Scan detection

```bash
alert tcp any any -> 10.0.2.15 22 (msg:"NMAP FIN Scan"; flags:F; sid:1000005; rev:1;)
```

* F.UDP Scan detection on port 68:

```bash
alert udp any any -> 10.0.2.15 68 (msg:"NMAP UDP Scan"; sid:1000007; rev:1;)
```

* Final combined file will look like:

```bash
# --------------------------------
# Nmap Detection Rules for Snort :
# --------------------------------

# ICMP Test Detection
alert icmp any any -> any any (msg:"ICMP test Detected!!!"; sid:10000010; rev:1;)

# NMAP Ping Sweep
alert icmp any any -> any any (msg:"NMAP Ping Sweep Scan!!!"; dsize:0; sid:10000020; rev:1;)

# NMAP TCP Scan
alert tcp any any -> any any (msg:"NMAP TCP Scan!!!"; flags:S; sid:10000030; rev:1;)

# NMAP XMAS Scan
alert tcp any any -> any any (msg:"NMAP XMAS Scan!!!"; flags:FPU; sid:10000040; rev:1;)

# NMAP FIN Scan
alert tcp any any -> any any (msg:"NMAP FIN Scan!!!"; flags:F; sid:10000050; rev:1;)

# NMAP NULL Scan
alert tcp any any -> any any (msg:"NMAP NULL Scan!!!"; flags:0; sid:10000060; rev:1;)

# NMAP UDP Scan
alert udp any any -> any any (msg:"NMAP UDP Scan!!!"; sid:10000070; rev:1;)
```

### Explanation of each rule

| Rule            | What it detects           | How it works                                                                                   |
| --------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| ICMP Test       | any simple ping           | any ICMP packet sent to the host                                                               |
| NMAP Ping Sweep | host discovery attempts   | ICMP echo with `dsize:0` often used by Nmap Ping Sweep                                         |
| NMAP TCP Scan   | TCP SYN scan across ports | any TCP SYN packet from Nmap or other TCP scanners                                             |
| NMAP XMAS Scan  | TCP XMAS scan             | any TCP packet with FIN+PSH+URG flags — a common Nmap scan type                                |
| NMAP FIN Scan   | TCP FIN scan              | any TCP packet with only FIN flag — used to probe ports without establishing a full connection |
| NMAP NULL Scan  | TCP NULL scan             | any TCP packet with no flags — attempt to bypass some firewalls                                |
| NMAP UDP Scan   | UDP scan                  | any UDP packet to any port; Nmap uses this to discover services                                |

***

* After saving the file, test the configuration:

```bash
sudo snort -T -c /etc/snort/snort.conf
```

* You should see:

```bash
Snort successfully validated the configuration! Snort exiting
```

* If that appears, everything is fine.

***

## Now I’ll test from the same machine

> Because I will run the scans from the same machine (Target), I need to use the loopback interface (`lo`) or the target’s internal IP `10.0.2.15` when running Snort, since scans from the same host won’t traverse `enp0s3` directly.

1️⃣ Start Snort on loopback (`lo`):

```bash
sudo snort -A console -q -c /etc/snort/snort.conf -i lo
```

`-A console` : show alerts on the terminal\
`-q` : quiet mode to reduce noise

2️⃣ In another terminal, start scanning from the same host:

* **First — Ping Sweep / ICMP Test**:

```bash
ping 10.0.2.15
```

* Snort produced the alert: `ICMP test detected`:

```bash
09/12-22:16:36.831126  [**] [1:10000010:1] ICMP test Detected!!! [**] [Priority: 0] {ICMP} 10.0.2.15 -> 10.0.2.15
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757807603198/a25ecf01-4b94-4119-9e43-2e9c049c5a0a.png" alt="" align="left" fullwidth="true" />

## Now I’ll test from the Attacker VM:

* **Target / Snort (Ubuntu) IP:** `10.0.2.15` on interface `enp0s3`

* Start Snort on `enp0s3`:

```bash
sudo snort -A console -q -c /etc/snort/snort.conf -i enp0s3
```

#### Temporarily open SSH port on the Target (Ubuntu) :

```bash
sudo systemctl start ssh
sudo systemctl enable ssh   # if you want it persistent after reboot
sudo ufw allow 22/tcp       # if UFW is active
```

* Now port 22 is open on the Target.

**Second — TCP SYN Scan from the Attacker**:

```bash
# To detect open ports quickly and less obviously than a regular scan.
sudo nmap -sS 10.0.2.15
```

Alert: `NMAP TCP Scan`:

```bash
09/12-22:17:28.232537  [**] [1:10000030:1] NMAP TCP Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:59006 -> 10.0.2.15:80
09/12-22:17:28.232541  [**] [1:10000030:1] NMAP TCP Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:59006 -> 10.0.2.15:139
09/12-22:17:28.232545  [**] [1:10000030:1] NMAP TCP Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:59006 -> 10.0.2.15:25
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757807588399/78ed49c8-c617-47e0-a01f-fcd9ef1c3f13.png" alt="" align="left" fullwidth="true" />

**Third — XMAS Scan from the Attacker**:

```bash
# To detect open ports in stealth mode (using packets containing FIN, PSH and URG flags together).
sudo nmap -sX 10.0.2.15
```

Alert: `NMAP XMAS Scan`:

```bash
09/12-22:21:59.585254  [**] [1:10000040:1] NMAP XMAS Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:42309 -> 10.0.2.15:5952
09/12-22:21:59.585259  [**] [1:10000040:1] NMAP XMAS Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:42309 -> 10.0.2.15:5510
09/12-22:22:00.602432  [**] [1:10000040:1] NMAP XMAS Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:42310 -> 10.0.2.15:22
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757807573829/1d258de7-8ae9-4627-acc3-9ce0230e7c75.png" alt="" align="left" fullwidth="true" />

**FIN Scan from the Attacker**

```bash
# To detect open ports in stealth mode (using FIN packets instead of SYN).
sudo nmap -sF 10.0.2.15
```

Alert: `NMAP FIN Scan`:

```bash
09/12-22:22:51.010337  [**] [1:10000050:1] NMAP FIN Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:37063 -> 10.0.2.15:1148
09/12-22:22:51.010342  [**] [1:10000050:1] NMAP FIN Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:37063 -> 10.0.2.15:787
09/12-22:22:51.010346  [**] [1:10000050:1] NMAP FIN Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:37063 -> 10.0.2.15:7001
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757807561720/9b759443-a948-4479-a984-93b43ca417fb.png" alt="" align="left" fullwidth="true" />

**NULL Scan from the Attacker**

```bash
# To identify open or closed ports in stealth mode (without any flags in the TCP header).
sudo nmap -sN 10.0.2.15
```

Alert: `NMAP NULL Scan`:

```bash
09/12-22:23:40.987444  [**] [1:10000060:1] NMAP NULL Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:37800 -> 10.0.2.15:6129
09/12-22:23:40.987448  [**] [1:10000060:1] NMAP NULL Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:37800 -> 10.0.2.15:27356
09/12-22:23:40.987452  [**] [1:10000060:1] NMAP NULL Scan!!! [**] [Priority: 0] {TCP} 10.0.2.15:37800 -> 10.0.2.15:10566
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757807542141/947d3d54-2db8-4457-8092-80a6690f4826.png" alt="" align="left" fullwidth="true" />

**UDP Scan from the Attacker**

```bash
# To detect open UDP ports and the services running on them.
sudo nmap -sU 10.0.2.15
```

Alert: `NMAP UDP Scan`:

```bash
09/12-22:24:41.947120  [**] [1:10000010:1] ICMP test Detected!!! [**] [Priority: 0] {ICMP} 10.0.2.15 -> 10.0.2.15
09/12-22:24:41.947123  [**] [1:10000070:1] NMAP UDP Scan!!! [**] [Priority: 0] {UDP} 10.0.2.15:56847 -> 10.0.2.15:112
09/12-22:24:41.947124  [**] [1:10000010:1] ICMP test Detected!!! [**] [Priority: 0] {ICMP} 10.0.2.15 -> 10.0.2.15
09/12-22:24:43.006069  [**] [1:10000070:1] NMAP UDP Scan!!! [**] [Priority: 0] {UDP} 10.0.2.15:56848 -> 10.0.2.15:5353
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757807522639/d5a1fc47-4ffa-4919-b236-98fa284892d9.png" alt="" align="left" fullwidth="true" />

* The ICMP messages you see are not from a normal `ping` — they are the ICMP responses that occur when a UDP scan probes closed ports.

> The host was noisy (responding) but everything behaved as expected.

***

### Summary / Conclusion

* Snort is successfully configured as an IDS on Ubuntu.

* All tested Nmap scan types were detected accurately.

* The environment is ready for further monitoring and packet analysis (PCAP/Wireshark).

***

> ***💬 "Control*** ***the code, and you control the world." 🔐 From wiping metadata to gaining root access — every step is documented and my goal is to deeply understand the system, not just hack!***
>
> [***Abdelwahab Shandy***](https://abdelwahabshandy.hashnode.dev/)
>
> [***Linkedin***](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)
>
> [***GitHub***](https://github.com/abdelwahab-ahmed-shandy)
>
> ***See You Soon***

