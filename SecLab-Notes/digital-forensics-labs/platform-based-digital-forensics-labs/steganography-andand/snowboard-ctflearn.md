---
id: "68ee6a7af4cf6fe4b8f1fde8"
title: "Snowboard : CTFLEARN"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/snowboard-ctflearn"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T15:21:30.900Z"
updatedAt: "2026-01-25T15:35:46.972Z"
---

**Forensics**

[Challenge — Snowboard — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/934)

Find the flag in the jpeg file. Good Luck!

[Snowboard.jpg](https://ctflearn.com/challenge/download/934)

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

We took the download link and used **wget** to download the :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454883493/b8ae8de4-ebc6-4732-9080-ca4e8c6ce04e.png" alt="" align="left" fullwidth="false" />

I always change the names to something that is closest to what we do, so I changed the name of the file to the name of the task that we are doing now , Now let’s get started :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454884719/13fcc5a4-999f-46df-acab-1751323a5452.png" alt="" align="left" fullwidth="false" />

Here we define the **file** type , There are a lot of interesting things :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454885940/35dd5425-be48-47f1-9038-800123d91b06.png" alt="" align="left" fullwidth="false" />

Let’s search using **strings :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454887264/c3ea0609-5994-4c7b-8704-94800ce54688.png" alt="" align="left" fullwidth="false" />

The command `**strings Snowboard.jpg | head -n 20**` is used to extract printable characters (human-readable strings) from the binary content of the file "Snowboard.jpg" and display the first 20 lines of those strings.

Let’s break down the components of the command:

* `**strings Snowboard.jpg**`: This part of the command runs the `strings` command on the file "Snowboard.jpg". The `strings` command looks for sequences of printable characters in binary files.

* `**|**`: This is a pipe symbol, which is used to pass the output of the command on its left as input to the command on its right.

* `**head -n 20**`: This part of the command takes the output of the `strings` command and displays only the first 20 lines using the `head` command.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454888726/197d0fe4-6f41-4a5c-965c-8b69129b5c84.png" alt="" align="left" fullwidth="false" />

The command `**echo "Q1RGbGVhcm57U2tpQmFuZmZ9Cg==" | base64 --decode**` decodes the base64-encoded string **"Q1RGbGVhcm57U2tpQmFuZmZ9Cg=="** using the `**base64**` command. Here's a breakdown of the components:

* `**echo "Q1RGbGVhcm57U2tpQmFuZmZ9Cg=="**`: This part of the command echoes the base64-encoded string to the standard output.

* `**|**`: This is a pipe symbol, which is used to pass the output of the command on its left as input to the command on its right.

* `**base64 --decode**`: This part of the command uses the `base64` command with the `--decode` option to decode the base64-encoded string.

#### **You can also use** [**https://cyberchef.org/**](https://cyberchef.org/) **to extract the flag**

> **Here is the flag\
> See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

