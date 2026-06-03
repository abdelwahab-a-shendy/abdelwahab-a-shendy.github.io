---
id: "68ee6ab263b49ae29059a106"
title: "I’m a dump : CTFLEARN"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/im-a-dump-ctflearn"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T15:22:26.044Z"
updatedAt: "2026-01-25T15:35:46.959Z"
---

**Forensics**

[Challenge — I’m a dump — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/883)

The keyword is hexadecimal, and removing an useless H.E.H.U.H.E. from the flag. The flag is in the format CTFlearn\{\*}

[file](https://ctflearn.com/challenge/download/883)

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

We took the download link and used **wget** to download the :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454872921/1f1bc344-7aaa-4f51-be5c-3a701d2f484d.png" alt="" align="left" fullwidth="false" />

I always change the names to something that is closest to what we do, so I changed the name of the file to the name of the task that we are doing now , Now let’s get started :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454874149/72e0fb3c-5f9b-4b48-a08b-43ab521cbbc4.png" alt="" align="left" fullwidth="false" />

Here we define the **file** type , There are a lot of interesting things :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454875490/37e31afc-480a-4d49-b997-a480d6f38585.png" alt="" align="left" fullwidth="false" />

Let’s search using **strings :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454876541/fd464ac8-334c-4d08-a372-186ef04ee8df.png" alt="" align="left" fullwidth="false" />

Well, I read the file using cat. I already found the flag, but we will need to delete some of the visible letters, such as H, E, and U.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454877894/8ede355d-0970-49c3-bbec-fb8193df36d9.png" alt="" align="left" fullwidth="false" />

***CTFlearnH \{fl4ggyfH E H U H E l4g}\
CTFlearn\{fl4ggyf###}***

***No, I will not leave him that easily, my friend. You have to try***

> Here is the flag\
> See you soon in other reports….!!

> Abdelwahab\_Shandy

> AS\_Cyber

