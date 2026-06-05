Malware Traffic Analysis

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757001863051/e87b9d24-8e80-4816-9be8-18d7fbc635f3.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" alt="" align="left" fullwidth="true" />

Malware Traffic Analysis : [https://www.malware-traffic-analysis.net/2025/01/22/index.html](https://www.malware-traffic-analysis.net/2025/01/22/index.html)

***

## Identification

* **Incident Title:** Suspicious File Download – Fake Google Authenticator

* **Date/Reported:** 02-09-2025

* **Reported by:** Training Program – WE INNOVATE

* **Investigator:** Abdelwahab Ahmed Shandy (Trainee)

* **Description:**\
  During my cybersecurity training at *WE INNOVATE*, I was assigned a task to investigate a simulated incident. The scenario involved a user who reported downloading a suspicious file after searching for *Google Authenticator*. Packet capture analysis confirmed indicators of compromise within the internal network segment `10.1.17.0/24`.

***

## Acquisition

* **Evidence Collected:** Packet Capture File (`2025-01-22-traffic-analysis-exercise.pcap`)

* **Tool Used:** Wireshark

***

## **Preservation**

* I made a **copy** of the original file to maintain **integrity**:

  * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756998109875/8ae0a838-17cb-4d0d-9db4-85e379a33c06.png" alt="" align="center" fullwidth="true" />

* **Hash (MD5):** `578da46541bd2f763e63cceeac875983`

* **Preservation:** A verified copy of the original PCAP file was maintained to ensure forensic integrity.

***

## **Analysis :**

### **Step 1**: **Identify the infected Windows client ؟**

1\. Open the PCAP in Wireshark in VM =>  `wireshark Task_3WeInnev.pcap`

* Select the network subnet **(\`10.1.17.0/24\`)** to narrow your search.

* Use Filter to search for suspicious activity, such as: `ip.src == 10.1.17.0/24 || ip.dst == 10.1.17.0/24`

  Then open: **Statistics → Conversations → IPv4** → the IP with the most connections will be shown.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756998247118/a9abd6da-a8c9-498a-8462-0a13cc91af06.png" alt="" align="center" fullwidth="true" />

We will find that the IP is: **10.1.17.215** , which is a private IP and is communicating with more than one IP from outside the network.

* Open : **Statistics > Endpoints > IPv4** — Sort by Bytes/Packets. You'll see which IPs have high/outbound traffic :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756998332221/37fc86c8-3cac-44de-982a-a81b320c1a74.png" alt="" align="center" fullwidth="true" />

Here also the same ips are the ones that have high traffic

> **What is the IP address of the infected Windows client?**
>
> * **10.1.17.215**

### **Second step: Extract the MAC and Hostname ?**

**First, we will get the MAC address, and since we know the IP, we will go to Filter and write**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756998412931/c0a9fb9a-c560-4cb5-a204-c8082c5c0083.png" alt="" align="center" fullwidth="true" />

The IP here was the first source, so we will click on it on the packet with the mouse, then we will open the left-hand section and we will find the MAC address there with us “**=> Ethernet II => Source => Address**”

> **What is the mac address of the infected Windows client?**
>
> **Intel\_26:4a:74 (00:d0:b7:26:4a:74) => 00:d0:b7:26:4a:74**

**Now we will get the host name :**

**What did we do here?**

* A filter with "ip.addr==10.1.17.215 || dhcp" resulted in finding the HostName in the traffic between device 0.0.0.0 and 255.255.255.255.

**DHCP Discovery:**

* 0.0.0.0 → Source device before it obtains an IP

* 255.255.255.255 → Broadcast to all devices on the network to find the DHCP Server

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756998518506/4143673c-bd6a-43e0-99da-68a4e266d345.png" alt="" align="center" fullwidth="true" />

> **What is the host name of the infected Windows client?**
>
> * **DESKTOP-L8C5GSJ**

### **Step 3: User account name :**

* Of course, it took some time, but let's think first about which protocols can transmit information like this:  "smb , kerberos , http , rdp"

* **After some attempts, we found that the Kerberos protocol that shows the username in the Ticket Granting Ticket is:**

* From Kerberos AS-REP or AS-REQ :

  * Open the package, go to: Kerberos → AS-REP → cname → CNameString

  * OR Open the package, go to: Kerberos → AS-REQ → cname → CNameString

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756998812981/8d820625-9268-40ad-be8a-4d5ab8ca5b7b.png" alt="" align="center" fullwidth="true" />

> * What is the user account name from the infected Windows client?
>
>   * shutchenson

### **Step 4: Find the fake domain (Google Authenticator page)**

I want to get the strange domain for Google Authenticator, so the first thing we can do a filter with is DNS or HTTP , But I need to have the domain with me to get the result via HTTP , If the device was hacked because of an email, there is a possibility that it was also from SMTP, but the closest here is DNS

* When I ran the DNS filter with the IP, it showed a lot of traffic that was difficult for me to search for.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756998944492/99bf2b4b-87d8-4e4e-8117-eee03a420884.png" alt="" align="center" fullwidth="true" />

Device **10.1.17.215** tried to access the Fake Domain

* First via mDNS (224.0.0.251) → Local Ads Only

* Then via DNS to 10.1.17.2 → actually trying to access the fake page

* The domain [googleads.g.doubleclick.net](http://googleads.g.doubleclick.net) is just an ad linked to the page, not a fake domain.

At first I thought this was the fake site but I was wrong :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756999076055/7853c500-d044-4083-a7c9-d0dc8a7193c0.png" alt="" align="center" fullwidth="true" />

I tried using filter => **ip.addr==10.1.17.215 &&** [**dns.qry.name**](http://dns.qry.name) **contains "auth"**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756999146756/3d3179fe-f254-4d73-b003-27dc4f393364.png" alt="" align="center" fullwidth="true" />

> **What is the likely domain name for the fake Google Authenticator page?**
>
> * [authenticatoor.org](http://authenticatoor.org)

### **Part 5: Finding C2**

I came back here to use Statistics → Conversations in Wireshark to check the IP that the device connected to more than once, there was an IP == 5.252.153.241 and it is likely to be C2, I went to virustotal and found the ips Malicious range :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756999204806/510965de-b0c8-4662-bdd6-2730c88c0b49.png" alt="" align="center" fullwidth="true" />

I felt for a moment that I was wrong, so I brought back the File => Export Object => http :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756999239329/d0335c37-eb51-4ada-9f66-b40a17a7109e.png" alt="" align="center" fullwidth="true" />

> I found the file "am\_delta\_patch\_1.421.1491.0\_c8e6042b36d8f357a8e298b6f9f2fcde561c2e02.exe", after filtering the .exe file and extracting it and putting it on virustotal, I found the file to be normal, it seems to be an update file or something like that.

**Wait a minute it may be strange but the external IP address is only connecting to the infected device and this is another sign that it is the device you actually tried to find in order to hack the system but it seems to have been downloaded from a file from somewhere else, let's continue the search in another way :**

* First, by looking at the analysis and search for the IP on Virus Total, I found that the IP range downloads files with the => .exe , .bat , .ps1 , When looking and searching through the files, I actually found **.ps1 :**

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1756999705298/67895301-21d0-4901-9e71-597e2cc32ddc.png" alt="" align="center" fullwidth="true" />

* use **.ps1 :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757001384032/6c823b46-6a30-4baf-b2f6-a690625841a6.png" alt="" align="center" fullwidth="true" />

After a little searching I found some connections, when I searched on virustotal :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757001261192/ccf72e5f-7216-4ef1-826e-f348fc2eb253.png" alt="" align="center" fullwidth="true" />

**45.125.66.32 , 45.125.66.252 , 82.221.136.26 =>** Malicious , Phishing => I did a search for them but nothing clear came up but they can be classified as Malicious :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757001037460/61db2d4f-ef81-496e-b61d-4ccca4973994.png" alt="" align="center" fullwidth="true" />

> What are the IP addresses used for C2 servers for this infection?
>
> * 5.252.153.241 => Because he somehow downloaded some files.
>
> * 82.221.136.26
>
> * 45.125.64.32
>
> * 45.125.66.252

***

## 5. Indicators of Compromise (IOCs)

| Indicator Type      | Value                                                     |
| ------------------- | --------------------------------------------------------- |
| Infected Client IP  | 10.1.17.215                                               |
| MAC Address         | 00:d0:b7:26:4a:74                                         |
| Hostname            | DESKTOP-L8C5GSJ                                           |
| Username            | BLUEMOONTUESDAY\shutchenson                               |
| Fake Domain         | [authenticatoor.org](http://authenticatoor.org)           |
| C2 Server IPs       | 5.252.153.241, 82.221.136.26, 45.125.64.32, 45.125.66.252 |
| Evidence Hash (MD5) | 578da46541bd2f763e63cceeac875983                          |

✍️ **Prepared by:** Abdelwahab A. Shandy

📅 **Date:** 02-09-2025

