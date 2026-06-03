---
id: "68e98bab2fb15bfc72ae4eb4"
title: "Bandit Level 10 To Level 20"
description: "Today we will complete the old report boxes to continue playing : Bandit Level 0 ToBandit Level 10"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/general-ctf/linux-labs-review/overthewire-bandit-level-0-tobandit-level-10/overthewire-bandit-level-10-tobandit-level-20"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-10T22:41:47.083Z"
updatedAt: "2026-01-25T15:35:47.037Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455350099/f939859e-dbfe-4f5c-ad5a-4c499c275c6f.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" alt="" align="left" fullwidth="true" />

Today we will complete the old report boxes to continue playing : [Bandit Level 0 ToBandit Level 10](https://medium.com/@abdelwahabshandy/overthewire-bandit-level-0-tobandit-level-10-628935ceaee3)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455298366/df070940-6085-4df8-a432-545610b6f581.png" alt="" align="left" fullwidth="true" />

### Bandit Level 10 → Level 11

The password for the next level is stored in the file **data.txt**, which contains base64 encoded data .

To sign up : ssh [bandit10@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : G7w8LIi6J3kTb8A7j9LgrywtEUlyyp6s

The command **base64 -d date.txt** is used to decode a Base64-encoded file named **date.txt** . Base64 is a binary-to-text encoding scheme that is commonly used to transmit data over the internet, such as email attachments. The **-d** flag tells the **base64** command to decode the file.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455299624/1ff88a24-1a5e-4411-97fc-59d7c1b4a738.png" alt="" align="left" fullwidth="true" />

Password, let’s go to the next level .

### Bandit Level 11 → Level 12

The password for the next level is stored in the file **data.txt**, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

To sign up : ssh [bandit11@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : 6zPeziLdR2RKNdNYFNb6nVCKzphlXHBM

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455300711/c5ee60f8-28ab-4523-b74b-09df1bf1f84b.png" alt="" align="left" fullwidth="true" />

Yes, the game is starting to take some thought .

After searching [**Rot13 on Wikipedia**](https://en.wikipedia.org/wiki/Rot13) , and using Google to find out the solution, I found one of the best solutions , Refer the attached resources for more information on the tr command :

To decode ROT13 on the Linux command line, you can use the `tr` command with the following syntax:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455301888/95d4c44d-fbeb-4ca4-bd67-fc76c121397f.png" alt="" align="left" fullwidth="true" />

Here is the password .

Since we know we know that the characters in the data are rotated by 13 characters , In this command:

* **tr** : The **tr** command for translating or deleting characters.

* **‘\[N-ZA-Mn-za-m]’** : The first character set, representing the ROT13-encrypted characters.

* **‘\[A-Za-z]’** : The second character set, representing the corresponding ROT13-decoded characters.

### Bandit Level 12 → Level 13

The password for the next level is stored in the file **data.txt**, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work using mkdir. For example: mkdir /tmp/myname123. Then copy the datafile using cp, and rename it using mv (read the manpages!)

To sign up : ssh [bandit12@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : JVNBBFSmZwKKOP0XbFXOoW8chDz5yVRv

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455303335/d0e83745-3763-49a4-b4b8-daf54949de41.png" alt="" align="left" fullwidth="true" />

When doing the first things .

-**mkdir** used to create a new directory.

-**cp** copies files.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455304538/3beac626-97ab-4a86-a3e0-23d36880676c.png" alt="" align="left" fullwidth="true" />

The **xxd** command is particularly useful for debugging purposes when examining binary files or manipulating binary data. It provides a clear representation of the data’s binary representation and enables modifications or conversions to the desired format.

The **-r** option in the **xxd** command specifically indicates the reverse operation, where the command attempts to convert a hexadecimal dump back into its original binary form. This is useful for reconstructing binary data from its hexadecimal representation, which is often used in various file formats or transmissions.

In essence, the **xxd -r** command allows you to take a hexadecimal dump, which is a text representation of binary data, and convert it back into the original binary format, making it easier to interpret and manipulate the data as needed.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455306119/36b960fe-793b-4d11-b09f-105edb0b9d6d.png" alt="" align="left" fullwidth="true" />

We can see that the file has been compressed using qzip so we can decompress the data , The command is **mv DATE DATE.gz** used to move a file named **DATE** to a new name **DATA.gz** and compress it using the **gzip** algorithm. The **mv** command stands for "move" and is used to rename or move files and directories. The **.gz** extension indicates that the file is compressed using the `gzip` algorithm, a common compression format for Unix-like systems , The **gunzip** command is used to decompress gzip-compressed files.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455307483/434ed28e-5e56-4bc3-bbf1-91cfe4dc38ce.png" alt="" align="left" fullwidth="true" />

The **bunzip2** command is used to decompress files that have been compressed using the bzip2 algorithm. Bzip2 is a popular compression algorithm that is known for its high compression ratio and relatively fast decompression speed.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455308806/8ddb9a4a-c1ce-434d-bb28-d15844dca1bf.png" alt="" align="left" fullwidth="true" />

The command **tar xvf DATE** is used to extract the contents of a tar archive named DATE to the current directory. The tar command is a versatile tool for creating, extracting, and managing tar archives, which are commonly used to store and transfer files.

Options:

**x** : Extract the contents of the archive.\
**v** : Verbose mode, displaying additional information during operation.\
**f** : Specify the archive file to operate on.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455310147/db9e1b24-633e-43bd-b35a-f8c7440adf03.png" alt="" align="left" fullwidth="true" />

As a reminder, The **file** command is typically used to identify the type of unknown files or to verify the format of known files. It’s particularly useful in troubleshooting situations where file type mismatches or data corruption might occur.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455311691/150135c1-fd69-4ee3-b78e-ec4ea7606f5a.png" alt="" align="left" fullwidth="true" />

The purpose of all this is to learn how to use pressure .

As a reminder, The **mv** command is a versatile tool in Unix-like operating systems that performs various operations on files and directories, primarily moving, renaming, and deleting them. It’s a fundamental command widely used in file management tasks and scripting.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455313187/5e6d97c5-12f4-4c46-abdb-6e6e76001edb.png" alt="" align="left" fullwidth="true" />

Yes, finish the new password .

### Bandit Level 13 → Level 14

The password for the next level is stored in **/etc/bandit\_pass/bandit14 and can only be read by user bandit14**. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. **Note:** **localhost** is a hostname that refers to the machine you are working on :

To sign up : ssh [bandit13@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : wbWdlBxEir4CaE8LaPhauuOo6pwRmrDw

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455314525/8b63145a-15ed-43ba-b34c-7d98c704f088.png" alt="" align="left" fullwidth="true" />

So far there is no mystery .

PEM (Privacy Enhanced Mail) is a format for storing RSA private keys. RSA is a public-key cryptography algorithm widely used for secure communication and data exchange. PEM is a text-based format that encodes the binary RSA private key data using Base64 encoding and wraps it within specific header and footer lines. This format makes it easier to handle and transmit RSA private keys in various contexts, such as email attachments or configuration files.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455315904/609bf8a9-886d-44b8-91f0-1a66f3e73f86.png" alt="" align="left" fullwidth="true" />

This is where the problems started .

The command ssh -i sshkey.private bandit14\@local is used to establish an SSH connection to the user bandit14 on the local machine using the private key sshkey.private. SSH (Secure Shell) is a cryptographic protocol that allows for secure remote login and data transfer between two computers. It provides a secure channel over an insecure network, enabling users to communicate and manage files remotely without compromising security.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455317466/f67056bd-8de2-435d-a1aa-be7d4c9127ed.png" alt="" align="left" fullwidth="true" />

Here a lot of things were searched and created, so we used scp .

Password here : wbWdlBxEir4CaE8LaPhauuOo6pwRmrDw

You can refer here to know more information [phoenixnap.com](https://phoenixnap.com/kb/linux-scp-command)

scp -P [2220bandit13@bandit.labs.overthewire.org](mailto:2220bandit13@bandit.labs.overthewire.org):sshkey.private . is used to securely copy a file named sshkey.private from the user bandit13 on the remote machine bandit.labs.overthewire.org to the current directory on the local machine. SCP (Secure Copy) is a file transfer protocol that utilizes SSH to securely transfer files between two machines.

***Here’s a breakdown of the command:***

**scp** : Invokes the SCP client program.

**-P 2220** : Specifies the non-standard SSH port 2220 to connect to the remote server. The default SSH port is 22.

[**bandit13@bandit.labs.overthewire.org**](mailto:bandit13@bandit.labs.overthewire.org) : Identifies the remote user bandit13 on the remote machine bandit.labs.overthewire.org.

**:sshkey.private** : Specifies the source file sshkey.private on the remote machine to be copied.

**.** : Indicates the destination directory on the local machine, which is the current directory represented by **.**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455318940/65f835f7-5acd-4d1e-9268-9cd106145489.png" alt="" align="left" fullwidth="true" />

The command **chmod 700 sshkey.private** is used to change the permissions of the file sshkey.private to 700. This means that only the owner of the file (the user who created it) will have read, write, and execute permissions for the file. No other users or groups will have any access to the file. This is a common practice for protecting private keys, as it ensures that only the authorized person can use the key to decrypt sensitive data.

***Here is a breakdown of the command:***

**chmod** : This is the command to change file permissions.\
**700** : This is the octal number that represents the permissions to set for the file. The first digit (7) represents the owner’s permissions, the second digit (0) represents the group’s permissions, and the third digit (0) represents the permissions for other users.\
**sshkey.private**: This is the name of the file whose permissions are being changed.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455320283/75a095a8-3677-4d6e-889f-59846fd3475e.png" alt="" align="left" fullwidth="true" />

After modifying the permissions on my device, we were able to access the device using sshkey.private .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455321854/c68832dd-0542-4506-b98b-8ac39749f341.png" alt="" align="left" fullwidth="true" />

Welcome to the new password

### Bandit Level 14 → Level 15

The password for the next level can be retrieved by submitting the password of the current level to **port 30000 on localhost**.

To sign up : ssh [bandit14@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : fGrHPx402xGC7U7rXKDaxiWFTOiF0ENq

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455323047/5690ec6a-242b-42aa-868f-9399cd7efcf6.png" alt="" align="left" fullwidth="true" />

It needs some thought .

**nc localhost 30000** is used to establish a TCP connection to the localhost on port 30000 using the netcat utility. Netcat, often abbreviated as nc, is a versatile networking tool that can be used for various purposes, including creating TCP and UDP connections, transferring files, and sending and receiving data over a network.

***The command syntax for netcat is:***

**nc \[options] :**\
Where:

**options** : Specify various options that control the behavior of netcat.\
 : The hostname or IP address of the host to connect to.\
 : The port number on the host to connect to.\
In the case of nc localhost 30000, the command is attempting to connect to the local machine (localhost) on port 30000. This can be useful for testing network connectivity or communicating with a service running on the local machine that listens on port 30000.

Without additional context or knowledge of the specific service running on port 30000, it’s difficult to determine the exact purpose or outcome of executing this command. It could be used to send data to a local server, receive data from a local server, or establish a backdoor connection to the local machine.

Here, after we opened a connection to NC, we entered the password for the path in game number 13, so enter the password for the next game.

### Bandit Level 15 → Level 16

The password for the next level can be retrieved by submitting the password of the current level to **port 30001 on localhost** using SSL encryption.

**Helpful note: Getting “HEARTBEATING” and “Read R BLOCK”? Use -ign\_eof and read the “CONNECTED COMMANDS” section in the manpage. Next to ‘R’ and ‘Q’, the ‘B’ command also works in this version of that command…**

To sign up : ssh [bandit15@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455324619/d42c8846-f42e-46f6-a0f9-830fb7a6b015.png" alt="" align="left" fullwidth="true" />

After a little searching and thinking, I found this path for the current level: /etc/bandit\_pass/bandit15 .

**openssl s\_client -connect localhost:30001** is used to establish an SSL/TLS connection to the local machine (**localhost**) on port **30001** using the **OpenSSL** library. **OpenSSL** is a widely used toolkit for cryptography and secure communication, providing various tools for handling certificates, generating keys, and establishing secure connections.

The **s\_client** command specifically is used for testing **SSL/TLS** connections and analyzing the server's **SSL/TLS** certificate and handshake process. It initiates a connection to the specified remote server and examines the server's response to determine if the connection is secure and the server's certificate is valid.

In this case, the command is attempting to connect to the local machine (localhost) on port **30001**, which is usually reserved for unprivileged ports. It’s possible that a local application or service is listening on this port and using **SSL/TLS** encryption for secure communication.

Executing this command will typically display the following information:

* Connection details: The established SSL/TLS connection parameters, including the protocol version, cipher suite, and session ID.

* Server’s certificate: The server’s SSL/TLS certificate information, including its issuer, validity period, and subject details.

* Handshake negotiation: The steps involved in the SSL/TLS handshake process, including the exchange of messages and cryptographic keys.

* Connection termination: The closing of the SSL/TLS connection and any additional information that might be relevant.

* The specific output may vary depending on the server’s configuration and the version of OpenSSL being used.

* The `openssl s_client` command is a valuable tool for troubleshooting SSL/TLS connectivity issues and verifying the security of servers. It allows users to assess the server's certificate validity, encryption strength, and overall SSL/TLS configuration.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455326434/e41a60fc-3ec8-4be9-8e5b-4cd5224dfbcf.png" alt="" align="left" fullwidth="true" />

We pasted the password from inside the file during the connection .

The method worked and we extracted the password for the next round. If you want to know more about openssl, visit [OpenSSL](https://www.feistyduck.com/library/openssl-cookbook/online/) .

### Bandit Level 16 → Level 17

The credentials for the next level can be retrieved by submitting the password of the current level to **a port on localhost in the range 31000 to 32000**. First find out which of these ports have a server listening on them. Then find out which of those speak SSL and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.

To sign up : ssh [bandit16@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : JQttfApK4SeyHwDlI9SXGR50qclOAil1

Now I had to resort to nmap, so look at that [The Best Nmap Cheat Sheet | Zero To Mastery](https://zerotomastery.io/cheatsheets/nmap-cheat-sheet/) to know more :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455327919/73482e7c-789e-4d0e-9d48-bfab92ce9fae.png" alt="" align="left" fullwidth="true" />

We find out which server ports it is listening on.

**31518/tcp open ssl/echo , 31790/tcp open ssl/unknown**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455329287/056e14ce-7b39-44a5-93e4-a51ae8966f76.png" alt="" align="left" fullwidth="true" />

Just the beginning .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455330497/261c64b4-65c2-4c64-aab2-9fe79b81b635.png" alt="" align="left" fullwidth="true" />

After adding the first password that we found .

When I was unable to create a file to save the password in, I had to find another way, so I did the following:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455332469/88176e29-6b05-4da9-8d38-90144fbc2258.png" alt="" align="left" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455334129/dafa93be-19a1-468b-8c97-2a6862cc02eb.png" alt="" align="left" fullwidth="true" />

But we didn’t have powers here either for that .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455335612/ad5a4386-889b-44ac-a47d-3a971b15e37e.png" alt="" align="left" fullwidth="true" />

We saved the key, entered a file in our host

I switched the connection along using ” **ssh -i pry\_Key** [**bandit17@bandit.labs.overthewire.org**](mailto:bandit14@bandit.labs.overthewire.org) **-p 2220 “**\
But it did not work and I was asked for a password, so I have to modify the permissions until I reach the optimal solution.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455337236/73312650-50dc-4554-860c-e6ddb27b97e7.png" alt="" align="left" fullwidth="true" />

After several attempts, these are the appropriate permissions .

We succeeded, my friend .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455338337/0620a7e7-873b-44d7-9adc-18882cf7e0f7.png" alt="" align="left" fullwidth="true" />

Here’s the goal .

### Bandit Level 17 → Level 18

There are 2 files in the homedirectory: **passwords.old and passwords.new**. The password for the next level is in **passwords.new** and is the only line that has been changed between **passwords.old and passwords.new**

**NOTE: if you have solved this level and see ‘Byebye!’ when trying to log into bandit18, this is related to the next level, bandit19**

From here I actually started using the instructions , Commands you may need to solve this level :

**cat, grep, ls, diff**

To sign up : ssh [bandit17@bandit.labs.overthewire.org](mailto:bandit2@bandit.labs.overthewire.org) -p 2220

Password : VwOSWtCA7lRKkTfbr2IDh6awj9RNZM5e

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455339443/3ffaff90-026d-4a3a-acd9-3b9ec033b046.png" alt="" align="left" fullwidth="true" />

**diff :**

The command **diff passwords.old passwords.new** is used to compare the contents of two files named **passwords.old** and **passwords.new** line by line and display the differences between them. It is a common practice to compare old and new password files to identify any changes that have been made to user passwords.

***Here’s a breakdown of the command:***

**diff** : This is the command to compare the contents of two files.\
**passwords.old** : This is the name of the first file to compare. It is assumed to contain the old passwords.\
**passwords.new** : This is the name of the second file to compare. It is assumed to contain the new passwords.\
When you execute this command, you will see the output of the diff command, which will show you the lines that have been added, removed, or changed between the two files.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455340835/5a464287-6394-481a-942f-7ad786996386.png" alt="" align="left" fullwidth="true" />

The second is the password :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455342272/476551f4-f865-4e71-9fe1-61267c092979.png" alt="" align="left" fullwidth="true" />

It’s ‘Byebye!’, it’s the right target

### Bandit Level 18 → Level 19

The password for the next level is stored in a file **readme** in the homedirectory. Unfortunately, someone has modified **.bashrc** to log you out when you log in with SSH.

To sign up : ssh [bandit18@bandit.labs.overthewire.org](mailto:bandit17@bandit.labs.overthewire.org) -p 2220\
Password : hga5tuuCLF6fFzUpnagiMN8ssu9LFrdg

When you log in with the correct password, it will exit you, again with the word **Enjoy your stay!**

**Byebye!\
Connection to bandit.labs.overthewire.org closed.**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455343758/5502eab4-d7b9-48f9-aa48-032046ff5c9b.png" alt="" align="left" fullwidth="true" />

This time we should have used a **man ssh**

The command “ **ssh** [**bandit18@bandit.labs.overthewire.org**](mailto:bandit18@bandit.labs.overthewire.org) **-p 2220 ls “** is used to connect to the Bandit Level 18 machine on the OverTheWire network using SSH and list the contents of the current directory.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455345232/6dfb449f-e371-4c99-a77c-83c6ac16ee90.png" alt="" align="left" fullwidth="true" />

It’s the password .

### Bandit Level 19 → Level 20

To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit\_pass), after you have used the setuid binary.

Helpful Reading Material : [setuid on Wikipedia](https://en.wikipedia.org/wiki/Setuid) .

To sign up : ssh [bandit19@bandit.labs.overthewire.org](mailto:bandit17@bandit.labs.overthewire.org) -p 2220\
Password : awhqfNnAbc1naukrpqDYcF95h7HoMTrC

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455346540/caae3cde-b32e-4a82-bc9e-bc59416c6bb4.png" alt="" align="left" fullwidth="true" />

The command “ **./bandit20-do cat /etc/bandit\_pass/bandit20** “is used to execute the bandit20-do setuid binary and read the contents of the /etc/bandit\_pass/bandit20 file. Setuid binaries are executables that run with the privileges of the file’s owner, even if they are run by a different user. In this case, the bandit20-do binary is owned by the bandit20 user, so it can read the /etc/bandit\_pass/bandit20 file, which is normally only accessible to the bandit20 user.

***Here’s a breakdown of the command:***

**./** : Indicates that the bandit20-do binary is located in the current directory.\
bandit20-do: The name of the setuid binary to execute.\
**cat** : A command that reads the contents of a file and prints them to the standard output.\
**/etc/bandit\_pass/bandit20** : The path to the file to read.\
**-When you execute this command, the bandit20-do binary will read the contents of the /etc/bandit\_pass/bandit20 file and print them to the standard output. The /etc/bandit\_pass/bandit20 file contains the password for the bandit20 user.**

### Bandit Level 20 → Level 21

To sign up : ssh [bandit20@bandit.labs.overthewire.org](mailto:bandit17@bandit.labs.overthewire.org) -p 2220\
Password : VxCazJaVykI6W36BkBU0mJTCM8rR95XT

We have reached level 20\
We will meet you in the future, my friend

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

