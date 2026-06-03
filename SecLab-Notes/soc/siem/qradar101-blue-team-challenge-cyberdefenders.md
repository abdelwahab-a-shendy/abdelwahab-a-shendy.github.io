---
id: "68ee6c6dcf6a737c66d3316c"
title: "Qradar101 Blue Team Challenge : CyberDefenders"
description: "This challenge is designed to work with VirtualBox. Download challenge VM and uncompress it using the password ‘cyberdefenders.org’"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/soc/siem/qradar101-blue-team-challenge-cyberdefenders"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T15:29:49.465Z"
updatedAt: "2026-01-25T15:35:46.790Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760456023066/fd4a8a70-a352-4f32-93f8-130e65f857d6.webp" align="center" fullwidth="false" />

### Category : Threat Hunting

#### CyberDefenders : Write up

#### SIEM ThreatHunting IBM QRadar CyberDefenders

#### CyberDefenders : [Qradar101](https://cyberdefenders.org/blueteam-ctf-challenges/39#nav-questions) Blue Team Challenge

> ### Details :
>
> Instructions:
>
> * This challenge is designed to work with **VirtualBox**. Download challenge VM and uncompress it using the password ‘cyberdefenders.org’
>
> * Please make sure to watch the instructional video under the **Walkthroughs** section.
>
> * Make sure you have a host-only subnet within the following IP range **192.168.20.0/24**.
>
> * Assign the proper network adapter (192.168.20.0/24) to the VM before starting it.
>
> * Wait for some minutes after the import completes then visit: https\://192.168.20.21/.
>
> * Challenge credentials: **QRadar Dashboard**: admin:Admin\@123 — **SSH**: root:cyberdefenders
>
> * In case you face a license issue, please go to > License Pool Management. Edit and set eps > 0 and edit the FPM and set it to 0. This will ensure you will not have a license problem.
>
> * **Hardware Requirements**: 8GB of memory and 65GB of disk space.

## Challenge Overview

**A financial company was compromised, and they are looking for a security analyst to help them investigate the incident, This Challenge consists of 24 questions, we will solve them and make things easier for those who have problems in solving them, let’s start.**

**Dataset:**

**-Sysmon — swift on security configuration**

**-PowerShell logging**

**-Windows Eventlog**

**-Suricata IDS**

**-Zeek logs (conn, HTTP)**

### ***First we will prepare the network for the machines:***

**Open oracle vm virtulbox > file > tools > network manager > host only Ethernet adapter**

**Then we will do the following:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455354824/bf49d7ba-fdd0-4d0b-8065-590fff191f43.png" alt="" align="left" fullwidth="false" />

***Adapter should be set like this ….***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455356123/b17da9da-bfeb-46bc-b028-5a3a52a095d5.png" alt="" align="left" fullwidth="false" />

***The DHCP Server must be set up like this ….***

**-Make sure you have a host-only subnet within the following IP range 192.168.20.0/24.**

**-Assign the proper network adapter (192.168.20.0/24) to the VM before starting it.**

**-Wait for some minutes after the import completes then visit:** [**https://192.168.20.21/**](https://192.168.20.21/)**.**

**-Challenge credentials: QRadar Dashboard: admin:Admin\@123 — SSH: root:cyberdefenders.**

**-Hardware Requirements: 8GB of memory and 65GB of disk space.**

# **Let’s get started :**

## **(1)How many log sources available?**

***Log in to QRadar SIEM and select the Admin tap>> and then click Log sources :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455357484/3626465b-a7c5-411d-bd97-99b298afbe81.png" alt="" align="left" fullwidth="false" />

***Answer: 1# Log sources .***

## **(2)What is the IDS software used to monitor the network?**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455358996/63e476b9-4fdc-427f-9d42-b825938da303.png" alt="" align="left" fullwidth="false" />

***Looking at the sources of the logs above, you can find out what IDS is:***

***Answer: ####cata .***

## **(3) What is the domain name used in the network?**

***The Event ID 4624 in the Windows Event Log indicates a successful logon event.***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455360379/6368ac29-e17b-4aa0-ad9e-3262d05e842a.png" alt="" align="left" fullwidth="false" />

***We examine the first event.***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455362342/3d911673-6081-4644-a344-a747d6daa84a.png" alt="" align="left" fullwidth="false" />

***We found the Domain here.***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455363642/ace962ca-a437-4e19-993a-5a3773314709.png" alt="" align="left" fullwidth="false" />

***Answer:*** ##########***.local .***

## **(4) Multiple IPs were communicating with the malicious server. One of them ends with “20”. Provide the full IP ?**

***We went to Dashboard and looked at top sources. We found 192.168.##.## have a greatest offenses 7 :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455365151/532805b6-d9d7-48d1-9640-a7a25cb57008.png" alt="" align="left" fullwidth="false" />

***We can display a log of activity by source IP to see which IPs generated the most communication :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455366693/186bd710-be7a-47e2-ae5f-920712e5e363.png" alt="" align="left" fullwidth="false" />

***We found that the IP 192.168.##.## generated the most communication :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455367940/fe67fcfb-d186-4032-af93-e87d15a9cdf9.png" alt="" align="left" fullwidth="false" />

***Answer: 192.168.##.## .***

## **(5) What is the SID of the most frequent alert rule in the dataset?**

We went to search edit, then we went to column definition, then we added the RULE SID :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455369555/e6db25f9-7fc7-44cf-8cb3-77d27f9bf7b5.png" alt="" align="left" fullwidth="false" />

**Then we know that “*#####65*” is the correct answer, because it is the highest in the count column with a number of 72 :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455370814/1a91e9a1-0f83-4506-b021-768a51ebbb7a.png" alt="" align="left" fullwidth="false" />

**Now that we are here we can see that the highest SID for the base is :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455372226/5423af1e-c131-4f8f-9eb3-7662f76ded89.png" alt="" align="left" fullwidth="false" />

***Answer: #####65 .***

## **(6) What is the attacker’s IP address?**

***In closed offenses, we can see a suspicious public IP .***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455373584/b84f538d-a845-4ae6-b3d0-9714e42f8801.png" alt="" align="left" fullwidth="false" />

***Answer : 192.##.##.## .***

## **(7) The attacker was searching for data belonging to one of the company’s projects, can you find the name of the project ?**

***We can search for the project with regular expression then :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455374648/908e159d-b950-4398-bca2-be82fdf43031.png" alt="" align="left" fullwidth="false" />

***We can see 4 events :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455375967/d28120a9-5f70-4cd1-b8c2-85a9be66b841.png" alt="" align="left" fullwidth="false" />

***then read payload information :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455377112/36f29b0b-1443-45c6-9b74-d06c557d1e19.png" alt="" align="left" fullwidth="false" />

***Answer : #######48 .***

## **(8) What is the IP address of the first infected machine ?**

***We have added a filter for the attacker’s IP address with the source IP :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455378154/69c05d0f-6828-4745-a5ed-904a7a48433f.png" alt="" align="left" fullwidth="false" />

***We found that the attacker’s IP was sending malware to IP 192.168.10.15 :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455379456/3f9baef0-3c83-445b-970d-eb8ead596c89.png" alt="" align="left" fullwidth="false" />

***I found the serukata alert, like this :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455381048/da9d285e-c9e1-4bc9-ab50-1f2c9fbbd2cc.png" alt="" align="left" fullwidth="false" />

***Answer : 192.168.##.## .***

## **(9) What is the username of the infected employee using 192.168.10.15 ?**

***We searched for successful logon event id on Google :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455382410/fa0be86d-ab7d-4477-a38e-a18b70d4aba2.png" alt="" align="left" fullwidth="false" />

***Then we added the filter :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455383967/0d000a07-a88d-43f7-9dfb-42b714bd3148.png" alt="" align="left" fullwidth="false" />

***Then I found that the username for 192.168.10.15 is Nour :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455385315/0c04f690-b696-4c9c-8dca-8ae49b97aca9.png" alt="" align="left" fullwidth="false" />

***We also looked at the payload information :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455386913/d6bb5457-2b2a-4fc5-8131-d23fbfda1a9b.png" alt="" align="left" fullwidth="false" />

***Answer : ###r .***

## **(10) Hackers do not like logging, what logging was the attacker checking to see if enabled ?**

***We can apply a new filter for log source is HD-FIN-03 , and the username “nour” :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455388038/3752135e-27bb-4920-b2b9-02dd0b51157b.png" alt="" align="left" fullwidth="false" />

***You’ll find that the attacker tried using PowerShell :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455389461/45639567-9c9f-4295-8c31-c4d2cd0b30fa.png" alt="" align="left" fullwidth="false" />

***Answer : p######### .***

## **(11) Name of the second system the attacker targeted to cover up the employee ?**

***We added a process commandline filter with del :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455391178/d3729663-bfc1-402d-bb87-56ed7e152a4c.png" alt="" align="left" fullwidth="false" />

***Then we entered :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455392382/58369143-5780-4344-8922-1d3977e1e08e.png" alt="" align="left" fullwidth="false" />

***We found a second system :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455393828/d69a2832-7fca-4594-b1e8-93f2a4b64fb9.png" alt="" align="left" fullwidth="false" />

***This is the command line :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455395581/c152fbc4-e15e-48cc-868e-b2f4aaf43b0b.png" alt="" align="left" fullwidth="false" />

***Answer : ####-01 .***

## **(12) When was the first malicious connection to the domain controller (log start time — hh:mm:ss)?**

***We have searched for :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455396937/250b7479-ed27-40ad-8a89-5cf6dbd1a6b7.png" alt="" align="left" fullwidth="false" />

***So we added id :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455398507/8c40e1b5-3c80-4ca0-9e4b-7d7957b87ecc.png" alt="" align="left" fullwidth="false" />

***We found a file that the attacker is uploading at the same time :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455400024/cddfb164-d5d5-422d-a1ac-61a3e5a190a6.png" alt="" align="left" fullwidth="false" />

***Answer : 11:##:## .***

## **(13) What is the md5 hash of the malicious file?**

***We will add a new filter by hash, we can find the .docx file that contains the malicious hash or add filter with event number 15 :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455401335/9c49dd17-a6a3-4ff2-8668-90d8bb4375e0.png" alt="" align="left" fullwidth="false" />

***We can look at the payload information to access the hash of the file:***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455402679/9f88e541-465b-4190-b795-1a7842928dc1.png" alt="" align="left" fullwidth="false" />

***Answer :*** ###########CD9D35###############***.***

## (14) **What is the MITRE persistence technique ID used by the attacker?**

***we searched on google and found out that the most common techniques for establishing persistence by malware and threat actors is the usage of registry Run keys & Start up folders in a windows system.***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455404307/fe80e482-e80b-4987-8946-d068c7e58b1b.png" alt="" align="left" fullwidth="false" />

***Add filter Event id with number 13 :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455405680/ba112d4d-d32d-4dd5-86cc-a49c7b340531.png" alt="" align="left" fullwidth="false" />

***we applied a filter for Sysmon Event ID 13: RegistryEvent (Value Set) and added a column for “Target Object”****.*

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455407316/7f7db6fb-dbe0-4a7a-9028-24943c7b9c89.png" alt="" align="left" fullwidth="false" />

***We will go to MITER ATT\&CK® , Then we will search for \windows\current\version :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455408991/c4e250fa-016f-4a9f-b976-02db2a31e0bc.png" alt="" align="left" fullwidth="false" />

***The expected result will appear :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455410788/f87eabda-486f-43e8-9c20-512c89bfb3b2.png" alt="" align="left" fullwidth="false" />

***Answer : #####.001 .***

## **(15) What protocol is used to perform host discovery?**

***We have added a filter , We can discover this information by analyzing outgoing traffic from “192.168.10.15”, with Log source is Zeek\_conn***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455412312/4d7f4fe0-aef6-457b-b238-024594ee4c7a.png" alt="" align="left" fullwidth="false" />

***Then we block udp , tcp connections :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455414045/04780bdc-8663-4f60-af03-9b2cdab9cb10.png" alt="" align="left" fullwidth="false" />

***Answer : i### .***

## **(16) What is the email service used by the company?(one word)**

***We added these filters, to find all the companies that speak from outside the network, to find the service that the company relies on :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455415664/1e328eee-d65c-4951-ad37-0913ded0796f.png" alt="" align="left" fullwidth="false" />

***Then we searched the website*** [***www.iplocation.net***](http://www.iplocation.net) ***to find out the IP address of any service :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455417431/34777b6d-0e27-4803-9fe6-bb3c77974e49.png" alt="" align="left" fullwidth="false" />

***Hijab The search result showed #########365 and ######365***

***Answer : ######365 .***

## **(17) What is the name of the malicious file used for the initial infection ?**

***Referring to Question No 13, We found the file with the md5 hash :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455418822/ab0def64-3edb-4e21-9221-24130829ffd2.png" alt="" align="left" fullwidth="false" />

***Answer :*** #########\_############.docx\*\*\*.\*\*\*

## **(18) What is the name of the new account added by the attacker ?**

***We will search for the event id of A user account was created :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455420194/b79f5871-8ea5-4e1e-83db-83dd28b12de9.png" alt="" align="left" fullwidth="false" />

***So I took the ID 4720 and added a filter :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455421633/dd38b5b7-1264-4ab2-ba21-4f4855365142.png" alt="" align="left" fullwidth="false" />

***Then we will look at the payload information :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455423160/63e24fab-52e8-4ffc-b147-dd0a4e1c0609.png" alt="" align="left" fullwidth="false" />

***Answer : ####o .***

## **(19) What is the PID of the process that performed injection ?**

***We will search for what is event id of the process that performed injection in Google :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455424493/c9a9d94a-6c32-43f5-8fd4-f80fb2113171.png" alt="" align="left" fullwidth="false" />

***We added this filter :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455426127/0d9639d8-e67f-4083-9080-bfad303b6da9.png" alt="" align="left" fullwidth="false" />

***Then we found, an alarm for the notepad file being uploaded :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455427691/c70c8ed1-c606-4288-a03f-030b013eabd7.png" alt="" align="left" fullwidth="false" />

***We found the PID :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455429212/9fd351af-b25f-4754-a61f-81fb090e7fc9.png" alt="" align="left" fullwidth="false" />

***Answer : #### .***

## **(20) What is the name of the tool used for lateral movement ?**

***We have added a filter to find out what technique the attacker used :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455430765/cfb7d22e-afeb-4d26-b9bc-c1e12ef7cb38.png" alt="" align="left" fullwidth="false" />

***The result was some commands that the attacker typed into the command lines :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455432700/5c20e089-2503-46d6-a24c-4b32265ab789.png" alt="" align="left" fullwidth="false" />

***We used*** [*MITRE ATT\&CK®*](https://attack.mitre.org/) ***Software\policies\microsoft\windows\powershell***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455434449/743cd465-4f93-429e-b2cd-b750e64bb2f0.png" alt="" align="left" fullwidth="false" />

***Here we found Impacket and searched it :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455435889/ef9c25e9-a2bd-4f2e-9f0c-7678fa69b84e.png" alt="" align="left" fullwidth="false" />

***We even found the tool used for lateral movement, which the attacker used :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455437132/2592df89-b41f-4c52-b478-356664f7b5bf.png" alt="" align="left" fullwidth="false" />

***Then we headed to*** [***https://github.com/***](https://github.com/) ***To look at it :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455438499/a1535df0-590b-4b7e-a110-e7257022df27.png" alt="" align="left" fullwidth="false" />

***Answer :*** #######.py ***.***

## **(21) Attacker exfiltrated one file, what is the name of the tool used for exfiltration ?**

***We used this filter :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455439651/d1f83a06-0235-4444-8537-5c9219044b04.png" alt="" align="left" fullwidth="false" />

*The result was :*

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455440976/bf2b8666-75cb-49ef-b21a-f8109a56f588.png" alt="" align="left" fullwidth="false" />

***Answer : ###l.***

## **(22) Who is the other legitimate domain admin other than the administrator ?**

***To find the other domain admin, I applied a filter for event ID 4672 :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455442075/adfda984-aacd-4475-b116-50dc33f93a0d.png" alt="" align="left" fullwidth="false" />

***Then we added a filter :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455443377/136c9765-8651-4039-ac1f-204bd2d5a833.png" alt="" align="left" fullwidth="false" />

***We found the two devices logging into Administrator Adam’s account :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455444711/dd676715-a07a-43bf-911c-abe60f7f7c8f.png" alt="" align="left" fullwidth="false" />

***Answer : ###m .***

## **(23)The attacker used the host discovery technique to know how many hosts available in a certain network, what is the network the hacker scanned from the host IP 1 to 30 ?**

***We used this filter :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455446224/1bd116d8-e510-4728-9631-11b058ae8a28.png" alt="" align="left" fullwidth="false" />

***You will find that the IP 192.168.10.15 has started scanning the IP addresses from 192.168.20.1 to 192.168.20.30 .***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455447900/e03bbb00-277e-4002-934c-996b56a3567c.png" alt="" align="left" fullwidth="false" />

***Answer : 192.168.##.# .***

## **(24)What is the name of the employee who hired the attacker ?**

***Looking at the answers to the previous questions, we may know that the file is called Sami :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455449538/94daa58e-f94b-4578-ab3b-b5474ab8951e.png" alt="" align="left" fullwidth="false" />

***but we added the answers for confirmation :***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455450680/fe6f1556-cf18-402a-9569-6b83920fddc6.png" alt="" align="left" fullwidth="false" />

***Answer : #a## .***

***in the end :\
 I hope you start solving the challenge before looking at where the solutions are. At the end of this wonderful challenge, I hope that we have succeeded in writing the report well. If you find any problem understanding part of the solution, please contact me. Thank you for reading the report.***

***See you soon in other reports….!!***

#### **Abdelwahab\_Shandy**

#### **AS\_Cyber**

