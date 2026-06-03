---
id: "68ee6bd615078ac2792c4c8c"
title: "Tux! : CTFLEARN"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/tux-ctflearn"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T15:27:18.511Z"
updatedAt: "2026-01-25T15:35:46.963Z"
---

**Forensics**

[Challenge — Tux! — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/973)

The flag is hidden inside the Penguin! Solve this challenge before solving my 100 point Scope challenge which uses similar techniques as this one.

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

We took the download link and used **wget** to download the :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454830728/ce1753fc-3b17-4257-885f-d1d3122f45c6.png" alt="" align="left" fullwidth="false" />

I always change the names to something that is closest to what we do, so I changed the name of the file to the name of the task that we are doing now , Now let’s get started :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454831956/ded22814-baf8-4d8c-9302-84c3c944fb70.png" alt="" align="left" fullwidth="false" />

I used file to find out the file type, and then I used exiftool, to make sure that this comment is correct, one way or another.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454833152/a400e155-033b-4ceb-a7a9-6a2b8141b13b.png" alt="" align="left" fullwidth="false" />

When I was sure I had to ask my brother for help [https://cyberchef.org/](https://cyberchef.org/)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454834630/3d13fee4-1fbf-4370-a860-b0f699637ac5.png" alt="" align="left" fullwidth="false" />

Okay, this is the password, but, why in the first place, there seems to be a hidden file in the back , It seems that there is a hidden file. Let’s try then, I will use binwalk :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454836198/3acb0cb9-1114-4450-8225-92dcff72fe70.png" alt="" align="left" fullwidth="false" />

Well we found a zip file already :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454837493/34821953-1a3b-4725-b1df-b06bb1890407.png" alt="" align="left" fullwidth="false" />

After extracting the file, I entered \_Tux.jpg.extracted/, to find out what was inside it, then I determined the type of files ,It seems that file 1570 is what is meant :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454838998/f541811c-4d18-4c85-b43c-3e0ebaae179f.png" alt="" align="left" fullwidth="false" />

We have set the password Linux12345, you must not forget it :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454840415/7c44aa1c-c25a-4f11-a8cf-59d92e29d931.png" alt="" align="left" fullwidth="false" />

Then the flag was redirected to the flag , It was really fun .

> **Here is the flag\
> See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

