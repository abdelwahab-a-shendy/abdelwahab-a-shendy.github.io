
### Task 1 — Introduction

Welcome to the first room of the Network Security Module. This module covers:

1. [Passive Reconnaissance](https://tryhackme.com/room/passiverecon)

2. [Active Reconnaissance](https://tryhackme.com/room/activerecon)

3. [Nmap Live Host Discovery](https://tryhackme.com/room/nmap01)

4. [Nmap Basic Port Scans](https://tryhackme.com/room/nmap02)

5. [Nmap Advanced Port Scans](https://tryhackme.com/room/nmap03)

6. [Nmap Post Port Scans](https://tryhackme.com/room/nmap04)

7. [Protocols and Servers](https://tryhackme.com/room/protocolsandservers)

8. [Protocols and Servers 2](https://tryhackme.com/room/protocolsandservers2)

9. [Network Security Challenge](https://tryhackme.com/room/netsecchallenge)

In this room, after we define passive reconnaissance and active reconnaissance, we focus on essential tools related to passive reconnaissance. We will learn three command-line tools:

* `whois` to query WHOIS servers

* `nslookup` to query DNS servers

* `dig` to query DNS servers

We use `whois` to query WHOIS records, while we use `nslookup` and `dig` to query DNS database records. These are all publicly available records and hence do not alert the target.

We will also learn the usage of two online services:

* DNSDumpster

* Shodan.io

These two online services allow us to collect information about our target without directly connecting to it.

Pre-requisites: This room requires basic networking knowledge along with basic familiarity with the command line. The modules [Network Fundamentals](https://tryhackme.com/module/network-fundamentals) and [Linux Fundamentals](https://tryhackme.com/module/linux-fundamentals) provide the required knowledge if necessary.

***Important Notice***\*: Please note that if you’re not subscribed, the AttackBox won’t have Internet access, so you will need to use the VPN to complete the questions that require Internet access.\*

***

Answer the questions below

> This room does not use a target virtual machine (VM) to demonstrate the discussed topics. Instead, we will query public WHOIS servers and DNS servers for domains owned by TryHackMe. Start the AttackBox and make sure it is ready. You will use the AttackBox to answer the questions in later tasks, especially tasks 3 and 4.

> ***No answer needed***

### Task 2 — Passive Versus Active Recon

Reconnaissance (recon) can be defined as a preliminary survey to gather information about a target. It is the first step in [The Unified Kill Chain](https://www.unifiedkillchain.com/) to gain an initial foothold on a system. We divide reconnaissance into:

1. Passive Reconnaissance

2. Active Reconnaissance

In passive reconnaissance, you rely on publicly available knowledge. It is the knowledge that you can access from publicly available resources without directly engaging with the target. Think of it like you are looking at target territory from afar without stepping foot on that territory.

> You visit the Facebook page of the target company, hoping to get some of their employee names. What kind of reconnaissance activity is this? (A for active, P for passive)

> ***P***

> You ping the IP address of the company webserver to check if ICMP traffic is blocked. What kind of reconnaissance activity is this? (A for active, P for passive)

> ***A***

> You happen to meet the IT administrator of the target company at a party. You try to use social engineering to get more information about their systems and network infrastructure. What kind of reconnaissance activity is this? (A for active, P for passive)

> **A**

### Task 3 — Whois

WHOIS is a request and response protocol that follows the [RFC 3912](https://www.ietf.org/rfc/rfc3912.txt) specification. A WHOIS server listens on TCP port 43 for incoming requests. The domain registrar is responsible for maintaining the WHOIS records for the domain names it is leasing. The WHOIS server replies with various information related to the domain requested.

```plaintext
aas@AS:~$ whois tryhackme.com
   Domain Name: TRYHACKME.COM
   Registry Domain ID: 2282723194_DOMAIN_COM-VRSN
   Registrar WHOIS Server: whois.namecheap.com
   Registrar URL: http://www.namecheap.com
   Updated Date: 2025-05-11T14:06:02Z
   Creation Date: 2018-07-05T19:46:15Z
   Registry Expiry Date: 2034-07-05T19:46:15Z
   Registrar: NameCheap, Inc.
   Registrar IANA ID: 1068
   Registrar Abuse Contact Email: abuse@namecheap.com
   Registrar Abuse Contact Phone: +1.6613102107
   Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
   Name Server: KIP.NS.CLOUDFLARE.COM
   Name Server: UMA.NS.CLOUDFLARE.COM
   DNSSEC: unsigned
   URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
>>> Last update of whois database: 2025-07-14T14:13:14Z <<<

For more information on Whois status codes, please visit https://icann.org/epp

NOTICE: The expiration date displayed in this record is the date the
registrar's sponsorship of the domain name registration in the registry is
currently set to expire. This date does not necessarily reflect the expiration
date of the domain name registrant's agreement with the sponsoring
registrar.  Users may consult the sponsoring registrar's Whois database to
view the registrar's reported date of expiration for this registration.

TERMS OF USE: You are not authorized to access or query our Whois
database through the use of electronic processes that are high-volume and
automated except as reasonably necessary to register domain names or
modify existing registrations; the Data in VeriSign Global Registry
Services' ("VeriSign") Whois database is provided by VeriSign for
information purposes only, and to assist persons in obtaining information
about or related to a domain name registration record. VeriSign does not
guarantee its accuracy. By submitting a Whois query, you agree to abide
by the following terms of use: You agree that you may use this Data only
for lawful purposes and that under no circumstances will you use this Data
to: (1) allow, enable, or otherwise support the transmission of mass
unsolicited, commercial advertising or solicitations via e-mail, telephone,
or facsimile; or (2) enable high volume, automated, electronic processes
that apply to VeriSign (or its computer systems). The compilation,
repackaging, dissemination or other use of this Data is expressly
prohibited without the prior written consent of VeriSign. You agree not to
use electronic processes that are automated and high-volume to access or
query the Whois database except as reasonably necessary to register
domain names or modify existing registrations. VeriSign reserves the right
to restrict your access to the Whois database in its sole discretion to ensure
operational stability.  VeriSign may restrict or terminate your access to the
Whois database for failure to abide by these terms of use. VeriSign
reserves the right to modify these terms at any time.

The Registry database contains ONLY .COM, .NET, .EDU domains and
```

> When was TryHackMe.com registered?
>
> <Image src="https://cdn-images-1.medium.com/max/800/1*Cqn5ouDbBCMUlcnwzlNQMA.png" alt="" align="left" fullwidth="true" />
>
> 20180705

> What is the registrar of TryHackMe.com?

<Image src="https://cdn-images-1.medium.com/max/800/1*EUJAtIZxk8MHs9V0khf3Cg.png" alt="" align="left" fullwidth="true" />

namecheap.com

> Which company is TryHackMe.com using for name servers?

<Image src="https://cdn-images-1.medium.com/max/800/1*lOGxmE6RepBvDHLtupL_cA.png" alt="" align="left" fullwidth="true" />

### Task 4 — nslookup and dig

In the previous task, we used the WHOIS protocol to get various information about the domain name we were looking up. In particular, we were able to get the DNS servers from the registrar.

> This command tells you:

> “Get me the IP (IPv4) address of tryhackme.com using DNS Server 8.8.8.8.”

> If you want to do the same using Google’s DNS:

<Image src="https://cdn-images-1.medium.com/max/800/1*JHbmAk8kF_E8--ml5W39YQ.png" alt="" align="left" fullwidth="true" />

> 🔸 8.8.8.8 is the server from which the query was made, and #53 is the default DNS port number.

> 🔹 Non-authoritative answer = This means that the server that responded is not the official server for the domain, but is providing an answer from the cache (temporary storage).

> 🔹 Address: 172.66.164.239 and 172.67.27.10 = These are the IP addresses used by tryhackme.com (meaning any of them could be used to access the site).

> Displays tryhackme.com’s mail servers :

<Image src="https://cdn-images-1.medium.com/max/800/1*Ee0FChZKk_V8_tz1GAzp_Q.png" alt="" align="left" fullwidth="true" />

> tryhackme.com uses Gmail to manage email.

> Priority: The lower the number, the higher the importance.

> ;; Got recursion not available from 172.18.128.1

> This is just a warning message, meaning that the local server 172.18.128.1 does not support recursive queries.

> Dig tool is asked to view the mail (MX) records for the domain tryhackme.com :

<Image src="https://cdn-images-1.medium.com/max/800/1*MOc0m4vXo6ckkP25ZcmYMQ.png" alt="" align="left" fullwidth="true" />

> 🔹 Gmail (Google Workspace) servers are used to send and receive mail.

> WARNING: recursion requested but not available

> This means that the server I used (172.18.128.1) does not support recursive DNS query, but it is just a warning — the result was successful.

> Answer the questions below

> Check the TXT records of thmlabs.com. What is the flag there?

<Image src="https://cdn-images-1.medium.com/max/800/1*tk0-tQzuTRUsyIvc3qFwgw.png" alt="" align="left" fullwidth="true" />

THM\{a5b83929888ed36acb0272971e438d78}

> Non-authoritative answer: This means the answer came from the DNS cache, not the official server.

> text = “**THM\{a5b83929888ed36acb0272971e438d78}**”: This is the flag stored in the TXT record.

### Task 5 — DNSDumpster

DNS lookup tools, such as nslookup and dig, cannot find subdomains on their own. The domain you are inspecting might include a different subdomain that can reveal much information about the target. For instance, if tryhackme.com has the subdomains wiki.tryhackme.com and webmail.tryhackme.com, you want to learn more about these two as they can hold a trove of information about your target. There is a possibility that one of these subdomains has been set up and is not updated regularly. Lack of proper regular updates usually leads to vulnerable services. But how can we know that such subdomains exist?

> Lookup tryhackme.com on DNSDumpster. What is one interesting subdomain that you would discover in addition to www and blog?

<Image src="https://cdn-images-1.medium.com/max/800/1*NaIdsSRkuIqX_IMnlHHUjA.png" alt="" align="left" fullwidth="true" />

> **remote**

### Task 6 — Shodan.io

When you are tasked to run a penetration test against specific targets, as part of the passive reconnaissance phase, a service like [Shodan.io](https://www.shodan.io/) can be helpful to learn various pieces of information about the client’s network, without actively connecting to it. Furthermore, on the defensive side, you can use different services from Shodan.io to learn about connected and exposed devices belonging to your organization.

Shodan.io tries to connect to every device reachable online to build a search engine of connected “things” in contrast with a search engine for web pages. Once it gets a response, it collects all the information related to the service and saves it in the database to make it searchable. Consider the saved record of one of tryhackme.com’s servers.

> According to Shodan.io, what is the 2nd country in the world in terms of the number of publicly accessible Apache servers?

<Image src="https://cdn-images-1.medium.com/max/800/1*uAxAR9hnOU9PD2LlZ0sCBA.png" alt="" align="left" fullwidth="true" />

> **China**

> Based on Shodan.io, what is the 3rd most common port used for Apache?

<Image src="https://cdn-images-1.medium.com/max/800/1*D6jdlJCVAgc1vrAHotyT3Q.png" alt="" align="left" fullwidth="true" />

> **8080**

> Based on Shodan.io, what is the 3rd most common port used for nginx?

<Image src="https://cdn-images-1.medium.com/max/800/1*9n5kU6pf1crjMOpAhYga_Q.png" alt="" align="left" fullwidth="true" />

> **5001**

### Task 7 — Summary

> In this room, we focused on passive reconnaissance. In particular, we covered command-line tools, `whois`, `nslookup`, and `dig`. We also discussed two publicly available services [DNSDumpster](https://dnsdumpster.com/) and [Shodan.io](https://www.shodan.io/). The power of such tools is that you can collect information about your targets without directly connecting to them. Moreover, the trove of information you may find using such tools can be massive once you master the search options and get used to reading the results.

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
>
> ***AS Cyber “)).***

