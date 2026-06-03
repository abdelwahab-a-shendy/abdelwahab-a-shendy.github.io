---
id: "68e98adf74308dda1f0cab19"
title: "OverTheWire : Bandit Level 0 ToBandit Level 10"
description: "Bandit Level 1 → Level 10"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/general-ctf/linux-labs-review/overthewire-bandit-level-0-tobandit-level-10"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-10T22:38:23.998Z"
updatedAt: "2026-01-25T15:35:47.038Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455288433/c10e7cff-c1ed-4cb7-992f-75f139d19b06.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" align="left" fullwidth="false" />

Bandit Level 1 → Level 10

— First, you have to use ssh to login to the server with the following information

* Username: bandit0

* Password: bandit0

* Host: bandit.labs.overthewire.org

* Port: 2220

An important note: You must always log out of each level until you change the number and enter the password for the new level

### Bandit Level

The goal of this level is for you to log into the game using SSH. The host to which you need to connect is **bandit.labs.overthewire.org**, on port 2220. The username is **bandit0** and the password is **bandit0**. Once logged in, go to the [Level 1](https://overthewire.org/wargames/bandit/bandit1.html) page to find out how to beat Level 1.

In the beginning, you have to :

the password is : **bandit0**

### Bandit Level 0 → Level 1

The password for the next level is stored in a file called **readme** located in the home directory. Use this password to log into bandit1 using SSH. Whenever you find a password for a level, use SSH (on port 2220) to log into that level and continue the game.

We have to find the password to reach the next level :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455265200/b09c6a69-70bf-4c7c-87b0-2601dc1185ab.png" alt="" align="left" fullwidth="false" />

To connect to the next level password :

### Bandit Level 1 → Level 2

The password for the next level is stored in a file called — located in the home directory .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455266422/0a3a41c3-cc8c-41fe-a8ca-9edcd78b5ddd.png" alt="" align="left" fullwidth="false" />

To reach the next level:

password : NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL

— We now have to find the password for the next level :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455267713/70f71eb4-7dd9-45b3-9635-54dfff350e5f.png" alt="" align="left" fullwidth="false" />

Here is the password .

### Bandit Level 2 → Level 3

The password for the next level is stored in a file called **spaces in this filename** located in the home directory .

To sign up : ssh [bandit2@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi

Here you have to use the TAB button, to make things easier :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455269004/585d117d-8753-4391-8c63-e823f7b8815c.png" alt="" align="left" fullwidth="false" />

Here is the password .

### Bandit Level 3 → Level 4

The password for the next level is stored in a hidden file in the **inhere** directory.

To sign up : ssh [bandit3@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455270161/0493fe90-fe4f-41a2-b18c-fd7563e975e4.png" alt="" align="left" fullwidth="false" />

The password is inside the hidden file .

### Bandit Level 4 → Level 5

The password for the next level is stored in the only human-readable file in the **inhere** directory. Tip: if your terminal is messed up, try the “reset” command.

To sign up : ssh [bandit4@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : 2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455271761/60c8b9ea-9d71-4949-81ab-306ad90c329d.png" alt="" align="left" fullwidth="false" />

Let’s go to the next stage .

Here we used **ls -a** to find out hidden files .

The **file** command in Linux is used to determine the type of a file ,

directoryname **/\*** option : This is used to display all files filetypes in particular directory.

They also used the dot \*\*(.)\*\*to say “width from here”, from where you stand .

### Bandit Level 5 → Level 6

The password for the next level is stored in a file somewhere under the **inhere** directory and has all of the following properties:

* human-readable

* 1033 bytes in size

* not executable

To sign up : ssh [bandit5@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : lrIWWI6bB37kxfiCQZqUdOIYfr6eEeqR

Here we must use the find command :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455273257/32fec44e-a760-494c-a1bf-afef5ece8bdd.png" alt="" align="left" fullwidth="false" />

Here is the password .

Use -type f to specify the file type .

Use -size 1033c to specify the bytes we want in the file .

We used \\! -executable, to specify that the file is not executable .

### Bandit Level 6 → Level 7

The password for the next level is stored **somewhere on the server** and has all of the following properties:

* owned by user bandit7

* owned by group bandit6

* 33 bytes in size

To sign up : ssh [bandit6@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : P4L4vucdmLnm8I7Vl7jG1ApGSfjYKqJU

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455274653/957896f5-3cf8-44cb-8da3-cb3f3f83d21e.png" alt="" align="left" fullwidth="false" />

It wasn’t the best way to get what I wanted out of it .

I extracted the file with all the same specifications, and used the grep command to remove bandit7 from the output .

So we will use 2>/dev/null , to prevent too much output and output only what we want .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455275886/33cba7af-95ff-472c-922b-db33bac2e337.png" alt="" align="left" fullwidth="false" />

This is better .

### Bandit Level 7 → Level 8

The password for the next level is stored in the file **data.txt** next to the word **millionth .**

To sign up : ssh [bandit7@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : z7WtoNQU2XfjmMtWA8u5rN4vzqu4v99S

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455277526/19ee720d-8992-492b-8a54-e2f712647145.png" alt="" align="left" fullwidth="false" />

The first way .

Here we used grep command, to output the millionth line, to output the password .

The second method is to use vi or nano and then extract the line by searching inside the file :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455279087/66563281-ce62-477a-987c-3b79bf8b0fd7.png" alt="" align="left" fullwidth="false" />

The second way .

### Bandit Level 8 → Level 9

The password for the next level is stored in the file **data.txt** and is the only line of text that occurs only once .

To sign up : ssh [bandit8@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : TESKZC0XvTetK0S9xNwm25STk5iWrBvP

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455280730/ca4a9aea-b4b8-4611-903f-f1dff943c0d9.png" alt="" align="left" fullwidth="false" />

Here is the new password .

The **sort** command in Unix-based systems is used to sort the contents of a text file called `data.txt` in alphabetical order. The `sort` command can also be used to sort in reverse alphabetical order, numerically, and by other criteria.

The **uniq -u** command in Unix-based systems is used to print only unique lines from a text file. The **-u** option tells the **uniq** command to print only lines that have not been seen before.

### Bandit Level 9 → Level 10

The password for the next level is stored in the file **data.txt** in one of the few human-readable strings, preceded by several ‘=’ characters.

To sign up : ssh [bandit9@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : EN632PlfYiZbn3PhVK3XOGSlNInNE00t .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455281964/bb4d33d6-77ad-43ea-a576-1fed1309fc48.png" alt="" align="left" fullwidth="false" />

When he looked into the matter further, he learned that the file was not readable at all, so I tried to search using the grep command, but it did not work, so :

Uses of the **strings** command ; The **strings** command is a Unix/Linux command-line utility used to extract and display printable strings from non-text files.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455283412/aa1cd6ca-7bab-4a40-9a7a-9c6b0a563743.png" alt="" align="left" fullwidth="false" />

Here is the new password .

### Bandit Level 10 → Level 11

The password for the next level is stored in the file **data.txt**, which contains base64 encoded data .

To sign up : ssh [bandit10@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : G7w8LIi6J3kTb8A7j9LgrywtEUlyyp6s

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455285139/3ca33e02-47ee-4f4f-aa8f-8f54b523cf83.png" alt="" align="left" fullwidth="false" />

Here we should have used — help .

So we have to decode the file using -d :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455286593/50203f31-8385-429b-aa19-b4f854c07d4f.png" alt="" align="left" fullwidth="false" />

The end for the day

This is my first report here. I always recorded reports on Word files, but they always got lost, so I decided to write here until the end.

I hope it will be useful to everyone and be a good reference for readers .

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

