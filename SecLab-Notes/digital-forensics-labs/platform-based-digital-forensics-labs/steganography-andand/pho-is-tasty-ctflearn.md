---
id: "68ee6ba9cf6a737c66d33169"
title: "Pho Is Tasty! : CTFLEARN"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/pho-is-tasty-ctflearn"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T15:26:33.865Z"
updatedAt: "2026-01-25T15:35:46.963Z"
---

**Forensics**

[Challenge — Pho Is Tasty! — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/971)

The flag is hidden in the jpeg file. Good Luck! Have some Pho! Solve this challenge before solving my Scope challenge for 100 points.

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

We took the download link and used **wget** to download the :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454814284/efda4941-bc43-4529-ab70-5f606ce90eef.png" alt="" align="left" fullwidth="false" />

I always change the names to something that is closest to what we do, so I changed the name of the file to the name of the task that we are doing now , Now let’s get started :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454815701/d08d4484-8183-4035-8215-dde80560a942.png" alt="" align="left" fullwidth="false" />

Here we define the **file** type , There are a lot of interesting things :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454817009/656bc460-284a-469c-a219-63a212b9278e.png" alt="" align="left" fullwidth="false" />

I decided to use exif and exiftool, but no positive result :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454818635/c8ec47d4-35ff-4f42-846f-00886db92486.png" alt="" align="left" fullwidth="false" />

Let’s search using **strings :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454819780/29edf0b4-ee13-46eb-9b36-d135838c8299.png" alt="" align="left" fullwidth="false" />

Also binwalk, nothing useful came out :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454821197/7de823e2-7581-41e0-b9d0-3208ffb9f4e2.png" alt="" align="left" fullwidth="false" />

I decided to enlist the help of a man with hexdump, to find a solution

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454822450/7cbba6a2-b3df-4412-8ad8-08fce0182e3d.png" alt="" align="left" fullwidth="false" />

Finally it seems to be the solution :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454823983/e2ed2510-5a6b-44f8-a107-d2999c27dbb4.png" alt="" align="left" fullwidth="false" />

Here is the flag

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454825090/49f5881d-e478-438e-9540-43f68941d5fe.png" alt="" align="left" fullwidth="false" />

..C..T..F..l..e..a..r..n..\{..I..\_..L..o..v..e.\_..P..h..o..!..!..!..}.

It’s not that easy, take out the flasher correctly??

> **See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

