---
id: "68ee8014123781a54bf3c204"
title: "Information disclosure on debug page"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/web/information-disclosure/information-disclosure-on-debug-page"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T16:53:40.112Z"
updatedAt: "2026-01-25T15:35:47.004Z"
---

* [Web Security Academy](https://portswigger.net/web-security) >> [Information disclosure](https://portswigger.net/web-security/information-disclosure) >>[Exploiting](https://portswigger.net/web-security/information-disclosure/exploiting) >>[Lab](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-on-debug-page)

This lab contains a debug page that discloses sensitive information about the application. To solve the lab, obtain and submit the `SECRET_KEY` environment variable.

So it seems that we have to create a debug page through which we reveal sensitive information about the application …………

We can first search in /robots.txt :

But we didn’t find anything important….

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454610462/0fe95537-5f20-41f9-9fdf-cf78b04005ef.png" alt="" align="left" fullwidth="false" />

So I’ll try to guess which Directory contains the debug page, so….

We will need a tool that helps us guess and also a large set of possibilities, so we will use the feroxbuster tool, and the list that we will use for guessing is the list for [https://github.com/Bo0oM/fuzz.txt/blob/master/fuzz.txt](https://github.com/Bo0oM/fuzz.txt/blob/master/fuzz.txt)\
You can also download the feroxbuster tool from here: [https://github.com/epi052/feroxbuster](https://github.com/epi052/feroxbuster)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454612153/65ae4363-8366-4fbc-b6f7-7c615b636907.png" alt="" align="left" fullwidth="false" />

feroxbuster -u "https\://0a6d00b6036d1771808a99a1006a0080.web-security-academy.net/" -w /home/as/Desktop/fuzz.txt

Here's what each part means:

* `feroxbuster`: This is the command to run FeroxBuster.

* `-u "https://0a6d00b6036d1771808a99a1006a0080.web-security-academy.net/"`: This flag specifies the target URL to scan. In this case, it's the URL `https://0a6d00b6036d1771808a99a1006a0080.web-security-academy.net/`, which seems to be a web server belonging to Web Security Academy.

* `-w /home/as/Desktop/fuzz.txt`: This flag specifies the wordlist (list of words) to use for fuzzing or directory and file discovery. It points to the file `/home/as/Desktop/fuzz.txt`, which is likely a text file containing a list of words that FeroxBuster will use to attempt to discover directories and files on the target website.

In summary, this command tells FeroxBuster to scan the specified URL using the wordlist provided in `fuzz.txt` to discover directories and files on the target web server. This can be useful for security testing purposes to identify hidden or potentially vulnerable areas of a website.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454613999/c68775ca-46c7-496e-a2dc-5db887ec97fa.png" alt="" align="left" fullwidth="false" />

Finally we found the Directory, let’s look at it :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454615881/f8ba450a-5ee6-4e1e-979a-5df568db05ac.png" alt="" align="left" fullwidth="false" />

We found a file that looks interesting :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454617391/69c200ff-ac34-4100-b1bc-105940fcc04e.png" alt="" align="left" fullwidth="false" />

Here is the debugging page. You can search the page for the word “SECRET\_KEY” and send the key until you finish the laptop. However, I solved this laptop in another way. You can follow the tick if you want to benefit.

> **We can also look at the source code, for the site there may be more**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454618730/8d1b1e93-b0fa-4c7e-aa5b-7efab64017da.png" alt="" align="left" fullwidth="false" />

Well there was this comment that said it was a comment containing a link to the **“phpinfo.php”** page, which displays information about the **PHP** settings. The code has been placed in a comment most likely for security reasons to prevent unauthorized access to sensitive server information.

> **Since we found the debug page, we can now search for SECRET\_KEY :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454620216/9f6b2e2d-fe85-4441-b2e7-f7356c180cf4.png" alt="" align="left" fullwidth="false" />

> **I will solve the entire lab this time using burp :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454622061/b7546bcd-19f5-4515-bf0e-afc27d94d5ac.png" alt="" align="left" fullwidth="false" />

When you connect your browser with burp, and then when you go to the “target” tab, you will find that file that we also found by guessing in Wordlist, and inside the file we will find the error correction page, so :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454623384/59845ab1-3677-4f45-b1b2-514f3e6b33dc.png" alt="" align="left" fullwidth="false" />

You will perform a “Sent to Repeater” on this GET request, and then you will send the request, and you will find the debugging page again:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454625017/14fdea1d-f8e1-49d7-8514-68f68c51e81d.png" alt="" align="left" fullwidth="false" />

You will find the answer like this, so we will search for “SECRET\_KEY” :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454626585/b4cafc1e-eee8-4e0e-85fc-3e6cd67c6357.png" alt="" align="left" fullwidth="false" />

Congratulations on getting what you want for the second time .

> **See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

