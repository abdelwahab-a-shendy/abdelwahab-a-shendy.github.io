---
id: "68e981ce5ee38e5572d96b6e"
title: "Active Reconnaissance : Try Hack Me"
description: "Learn how to use simple tools such as traceroute, ping, telnet, and a web browser to gather information."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/information-gathering/active-reconnaissance-try-hack-me"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-10T21:59:42.288Z"
updatedAt: "2026-01-25T15:35:47.022Z"
---

# Task 1 — Introduction

> Active reconnaissance requires you to make some kind of contact with your target. This contact can be a phone call or a visit to the target company under some pretence to gather more information, usually as part of social engineering. Alternatively, it can be a direct connection to the target system, whether visiting their website or checking if their firewall has an SSH port open. Think of it like you are closely inspecting windows and door locks. Hence, it is essential to remember not to engage in active reconnaissance work before getting signed legal authorization from the client.

> Answer the questions below

> Ensure that you understand why these tools fall under active reconnaissance. Launch your AttackBox and ensure that it is ready. You will need it to answer the questions, especially in later tasks.

> **No Answer Needed**

# Task 2 — Web Browser

> The web browser can be a convenient tool, especially that it is readily available on all systems. There are several ways where you can use a web browser to gather information about a target.

> There are also plenty of add-ons for Firefox and Chrome that can help in penetration testing. Here are a few examples:

> **FoxyProxy** lets you quickly change the proxy server you are using to access the target website. This browser extension is convenient when you are using a tool such as Burp Suite or if you need to switch proxy servers regularly. You can get FoxyProxy for Firefox from [here](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard).

> **User-Agent Switcher and Manager** gives you the ability to pretend to be accessing the webpage from a different operating system or different web browser. In other words, you can pretend to be browsing a site using an iPhone when in fact, you are accessing it from Mozilla Firefox. You can download User-Agent Switcher and Manager for Firefox [here](https://addons.mozilla.org/en-US/firefox/addon/user-agent-string-switcher).

> **Wappalyzer** provides insights about the technologies used on the visited websites. Such extension is handy, primarily when you collect all this information while browsing the website like any other user. A screenshot of Wappalyzer is shown below. You can find Wappalyzer for Firefox [here](https://addons.mozilla.org/en-US/firefox/addon/wappalyzer).

> **Browse to the following website and ensure that you have opened your Developer Tools on AttackBox Firefox, or the browser on your computer. Using the Developer Tools, figure out the total number of questions**.
>
> ***1-Open Developer Tools***
>
> ***2-Press: F12 or Ctrl + Shift + I***
>
> ***3-Press F5 after opening the Network tab to start seeing all requests OR open Debugger***
>
> ***4-Look for something like: A JSON file or API call containing a list of questions.***
>
> ***The link will likely contain words like:\
> questions, quiz, data.json, api/questions, etc.***
>
> ***5 -Count questions : Either manually from the data you see.***
>
> ***Or search for a key like “total\_questions”: 10 or similar.***

```plaintext
let step = 1;
let questions = {
    1   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'SYN : Can you hear me Bob?',
        'answer_2'  :  'FIN : Goodbye',
        'answer_3'  :  'ACK : Erm... What?',
        'answer'    :   1
    },
    2   :   {
        'speaking'  :  'bob',
        'answer_1'  :  'RST : Cya Later',
        'answer_2'  :  'PING : 77',
        'answer_3'  :  'SYN/ACK : Yes, I can hear you!',
        'answer'    :   3
    },
    3   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'FAIL : SEGMENTATION FAULT',
        'answer_2'  :  'ACK : Okay Great',
        'answer_3'  :  'SYN : x = 3?',
        'answer'    :   2
    },
    4   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'ICMP : 99',
        'answer_2'  :  'SYN : Yes, I can hear you!',
        'answer_3'  :  'DATA : Cheesecake is on sale!',
        'answer'    :   3
    },
    5   :   {
        'speaking'  :  'bob',
        'answer_1'  :  'ACK : I Hear ya!',
        'answer_2'  :  'REPEAT : What?',
        'answer_3'  :  'RESET : Help!',
        'answer'    :   1
    },
    6   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'ACK : OK',
        'answer_2'  :  'FIN/ACK : I\'m all done',
        'answer_3'  :  'ECHO : Retry',
        'answer'    :   2
    },
    7   :   {
        'speaking'  :  'bob',
        'answer_1'  :  'SYN : Received',
        'answer_2'  :  'WIRE : Reset Connection',
        'answer_3'  :  'FIN/ACK : Yeah Me Too',
        'answer'    :   3
    },
    8   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'SYN : Connected',
        'answer_2'  :  'ACK : Okay, Goodbye',
        'answer_3'  :  'SYN/ACK : Not Received',
        'answer'    :   2
    }
}
```

> 8

## Task 3 — Ping

Ping should remind you of the game ping-pong (table tennis). You throw the ball and expect to get it back. The primary purpose of ping is to check whether you can reach the remote system and that the remote system can reach you back. In other words, initially, this was used to check network connectivity; however, we are more interested in its different uses: checking whether the remote system is online.

> **Which option would you use to set the size of the data carried by the ICMP echo request?**
>
> *The ping command sends ICMP Echo Request packets.*
>
> *The -s option specifies the size of the data carried by each packet.*
>
> The answer : **-s**

> **What is the size of the ICMP header in bytes?**
>
> Includes: (Type -Code- Checksum- Identifier -Sequence number)
>
> The answer : **8**

> **Does MS Windows Firewall block ping by default? (Y/N)**
>
> Yes, Windows Firewall blocks responses to Ping (ICMP Echo Requests) by default.
>
> This is a security measure to prevent easy detection of devices.
>
> You can change this by going to “Windows Defender Firewall” → “Advanced Settings.”
>
> **The answer : y**

> Deploy the VM for this task and using the AttackBox terminal, issue the command `ping -c 10 10.10.8.173`. How many ping replies did you get back?

<Image src="https://cdn-images-1.medium.com/max/800/1*Xxcojs6foLttRYuzLklMyg.png" alt="" align="left" fullwidth="true" />

> **The answer : 10**

## Task 4 — Traceroute

🛰️ What is Traceroute?\
The traceroute command is used to determine the path a packet takes from your device until it reaches another device over the internet.

It shows each router (hop) the packet passes through along the way.

It is used for network diagnostics and analysis, to identify where a problem or delay may occur.

> **In Traceroute A, what is the IP address of the last router/hop before reaching** [**tryhackme.com**](http://tryhackme.com)**?**

<Image src="https://cdn-images-1.medium.com/max/800/1*e-B9kbo7MC6X0R4O5uMPpg.png" alt="" align="left" fullwidth="true" />

> **172.67.69.208**

> **In Traceroute B, what is the IP address of the last router/hop before reaching** [**tryhackme.com**](http://tryhackme.com)**?**

<Image src="https://cdn-images-1.medium.com/max/800/1*V9kMYVJZUVxs_ZkNAi0oQg.png" alt="" align="left" fullwidth="true" />

> **104.26.11.229**

> **In Traceroute B, how many routers are between the two systems?**

<Image src="https://cdn-images-1.medium.com/max/800/1*8AKYy4myYF3azpIqSjkNJA.png" alt="" align="left" fullwidth="true" />

> 26

> **Start the attached VM from Task 3 if it is not already started. On the AttackBox, run** `traceroute 10.10.8.173`**. Check how many routers/hops are there between the AttackBox and the target VM.**

<Image src="https://cdn-images-1.medium.com/max/800/1*B8oG618xy1f9GM48Th-X-A.png" alt="" align="left" fullwidth="true" />

> **It only takes one hop to reach the target.**
>
> **This means that the target device is on the same subnet (local network) or very close.**
>
> No answer Needed

## Task 5 — Telnet

🔹 What is Telnet?\
A protocol used to connect to remote servers via terminal.

It is text-based.

It can be used to examine web servers and manual responses such as HTTP headers.

<Image src="https://cdn-images-1.medium.com/max/800/1*gnapZOnQTSfxz3rjbp9Jaw.png" alt="" align="left" fullwidth="true" />

> Start the attached VM from Task 3 if it is not already started. On the AttackBox, open the terminal and use the telnet client to connect to the VM on port 80. What is the name of the running server?
>
> **Apache**

> What is the version of the running server (on port 80 of the VM)?
>
> **2.4.61**

## Task 6 — Netcat

What is nc (Netcat)?\
nc is a simple yet powerful tool used to make network connections, whether sending and receiving data or scanning ports and services.

> Start the VM and open the AttackBox. Once the AttackBox loads, use Netcat to connect to the VM port 21. What is the version of the running server?

<Image src="https://cdn-images-1.medium.com/max/800/1*_rt9McOi4JbrBD50Y0M0Kw.png" alt="" align="left" fullwidth="true" />

> The answer :**0.17**

## Task 7 - Putting It All Together

In this room, we have covered many various tools. It is easy to put a few of them together via a shell script to build a primitive network and system scanner. You can use `traceroute` to map the path to the target, `ping` to check if the target system responds to ICMP Echo, and `telnet` to check which ports are open and reachable by attempting to connect to them. Available scanners do this at much more advanced and sophisticated levels, as we will see in the next four rooms with `nmap`.

> Ensure that you gain mastery over the different basic yet essential tools we presented in this room before moving on to more sophisticated tools.
>
> No answer needed

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

