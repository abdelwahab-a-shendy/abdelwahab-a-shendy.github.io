---
id: "68ee6a4e4d0fcceaaac91796"
title: "Git Is Good : CTFLEARN"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/git-is-good-ctflearn"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T15:20:46.883Z"
updatedAt: "2026-01-25T15:35:46.957Z"
---

**Forensics**

[Challenge — Git Is Good — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/104)

The flag used to be there. But then I redacted it. Good Luck. [https://mega.nz/#!3CwDFZpJ!Jjr55hfJQJ5-jspnyrnVtqBkMHGJrd6Nn\_QqM7iXEuc](https://mega.nz/#!3CwDFZpJ!Jjr55hfJQJ5-jspnyrnVtqBkMHGJrd6Nn_QqM7iXEuc)

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454894101/15dd6852-d3a7-44fd-a249-a4391520e7b4.png" alt="" align="left" fullwidth="false" />

Here we have decompressed the file, after verifying its type :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454895442/f6c37672-4802-4150-9855-1e130dde4ecf.png" alt="" align="left" fullwidth="false" />

Here we navigated to the compressed file using cd, then read the flag.txt file using cat .

I didn’t think it would be that easy, so I continued my research :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454897238/09220169-553b-4e22-bb5e-5d3d4d647baf.png" alt="" align="left" fullwidth="false" />

The command `**grep -r 'flag'** **/home/sansforensics/CTFLERARN/gitIsGood/.git/**` is searching for the string 'flag' recursively in all files within the specified directory `**/home/sansforensics/CTFLERARN/gitIsGood/.git/**` and its subdirectories. Here's a breakdown of the components:

* **grep**: This is the command-line utility used for searching patterns in text.

* **-r**: This option stands for “recursive” and is used to search for the specified pattern in all files within the specified directory and its subdirectories.

* **‘flag’**: This is the string or pattern that `grep` is searching for in the files.

* **/home/sansforensics/CTFLERARN/gitIsGood/.git/**: This is the path to the directory where the search is being performed. In this case, it’s the `.git` directory within the `gitIsGood` project.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454898994/03da83d9-ea58-410e-8d56-a69196adbb0c.png" alt="" align="left" fullwidth="false" />

The `**git show HEAD**` command in Git is used to display the detailed information about the latest commit in the current branch. Here's a breakdown of the components:

* **git**: This is the Git version control system.

* **show**: This is the command used to show various types of objects in Git, such as commits, tags, or trees.

* **HEAD**: This is a special reference that points to the latest commit on the current branch. It represents the tip of the current branch.

When you run `git show HEAD`, Git will display information about the latest commit on the current branch, including details such as the commit message, author, date, and the changes made in that commit.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454900358/1345136b-704f-430a-b0a1-3309eb4a97bd.png" alt="" align="left" fullwidth="false" />

you see information about the latest commit ,author, date, commit message, and a unified diff showing the changes made in the commit. The actual output may vary based on the content of your commit .

> ***Here is the flag\
> See you soon in other reports….!!***

> ***Abdelwahab\_Shandy***

> ***AS\_Cyber***

