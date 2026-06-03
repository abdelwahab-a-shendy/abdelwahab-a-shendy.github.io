---
id: "68e98c3eba87be83be182286"
title: "Bandit Level 20 To Level 23"
description: "OverTheWire : Bandit Level 20 ToBandit Level 23"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/general-ctf/linux-labs-review/overthewire-bandit-level-0-tobandit-level-10/bandit-level-20-to-level-23"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-10T22:44:14.409Z"
updatedAt: "2026-01-25T15:35:47.040Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455259440/bffdbcce-4c88-4e2d-977d-69fe44e4d1fa.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" align="left" fullwidth="false" />

Today we will complete the old report boxes to continue playing : [Bandit Level 0 ToBandit Level 10](https://medium.com/@abdelwahabshandy/overthewire-bandit-level-0-tobandit-level-10-628935ceaee3)

Today we will complete the old report boxes to continue playing : [Bandit Level 10 ToBandit Level 20](https://medium.com/@abdelwahabshandy/overthewire-bandit-level-10-tobandit-level-20-2c2255ba16c1)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455251010/21a9fe88-3294-4de7-b82b-1a3d9b05ebca.png" alt="" align="left" fullwidth="false" />

OverTheWire : Bandit Level 20 ToBandit Level 23 …..

### Bandit Level 20 → Level 21

There is a setuid binary in the homedirectory that does the following: it makes a connection to localhost on the port you specify as a commandline argument. It then reads a line of text from the connection and compares it to the password in the previous level (bandit20). If the password is correct, it will transmit the password for the next level (bandit21).

**NOTE:** Try connecting to your own network daemon to see if it works as you think

Commands you may need to solve this level : “ ssh, nc, cat, bash, screen, tmux, Unix ‘job control’ (bg, fg, jobs, &, CTRL-Z, …) “

To sign up : ssh [bandit20@bandit.labs.overthewire.org](mailto:bandit17@bandit.labs.overthewire.org) -p 2220\
Password : VxCazJaVykI6W36BkBU0mJTCM8rR95XT .

The matter here is a little different because we have a binary file that connects to the port specified by the user and reads a line of text. If the text is the same as the last level password, we will get the correct password :

Many things must be detailed .

***Once he wrote the password for the previous level, it was compared with the text that we specified on port 8080, and since they were identical, we obtained the password for the next level :***

The command **echo “VxCazJaVykI6W36BkBU0mJTCM8rR95XT” | netcat -lp 8080 &** is a combination of two commands: echo and netcat.

The echo command simply prints the text string **“VxCazJaVykI6W36BkBU0mJTCM8rR95XT”** to the standard output. The pipe (**|**) symbol is used to redirect the output of the echo command to the input of the netcat command.

The **netcat** command is a network utility that can be used to establish TCP or UDP connections to other hosts. The **-lp** option tells netcat to listen for incoming connections on port **8080**. The & symbol at the end of the command tells the shell to execute the command in the background, so that you can continue to use the terminal.

So, the overall effect of the command is to listen for incoming TCP connections on **port 8080**, and when a connection is established, to send the text string **“VxCazJaVykI6W36BkBU0mJTCM8rR95XT”** to the connected host.

***Here is a breakdown of the command:***

**echo**: Prints the specified text to the standard output.\
**“VxCazJaVykI6W36BkBU0mJTCM8rR95XT”**: The text string to be printed by the echo command.\
**( | )**: Redirects the output of the echo command to the input of the netcat command.\
**netcat** : A network utility for establishing TCP or UDP connections.\
**-lp** : Tells netcat to listen for incoming connections on port 8080.\
**8080** : The port number to listen on.\
**&** : Executes the command in the background.

***The* ps *command can be used to display a variety of information about running processes, including:***

* Process ID (PID): A unique identifier for each process.

* Parent process ID (PPID): The PID of the process that started the current process.

* User: The name of the user who owns the process.

* %CPU: The percentage of CPU time that the process is using.

* %MEM: The percentage of physical memory that the process is using.

* Vssize: The virtual size of the process in bytes.

* RSS: The resident set size of the process in bytes.

* Stat: The state of the process (e.g., running, sleeping, stopped).

* Command: The command line that was used to start the process.

The **jobs** command is a built-in command in several Unix-like shells, including bash . It is used to display a list of all background jobs that are currently running in the current shell session.

Background jobs are processes that have been started using the **&** operator at the end of the command. This operator tells the shell to run the command in the background, which means that the shell will not wait for the command to finish before returning to the prompt.

### Bandit Level 21 → Level 22

A program is running automatically at regular intervals from **cron**, the time-based job scheduler. Look in **/etc/cron.d/** for the configuration and see what command is being executed.

To sign up : ssh [bandit21@bandit.labs.overthewire.org](mailto:bandit17@bandit.labs.overthewire.org) -p 2220\
Password : NvEJF7oVjkddltPSrdKEFOllh9V1IBcq .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455252678/6645e687-81ac-4bef-a1e0-1d166073826d.png" alt="" align="left" fullwidth="false" />

You have to use man 5 crontab .

The **crontab** command is a built-in command in Unix-like operating systems that manages cron jobs, which are tasks that are scheduled to run at specific times or intervals. It is a powerful tool for automating tasks, such as backups, system maintenance, and sending notifications.

When we looked at the file /etc/cron.d\
They found a number of jobs, when we looked at cronjob\_bandit22 because it is our target, we found that there is a shell script that is executed every second.

*When we looked at the script, we found that it creates a file called in the directory and then saves the password for the next level in that file :*\
**chmod 644 /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv\
cat /etc/bandit\_pass/bandit22 > /tmp/t7O6lds9S0RqQh9aMcz6ShpAo**

We can view the content of the file, so when we viewed it, we found a text that I think is the password .

### Bandit Level 22 → Level 23

A program is running automatically at regular intervals from **cron**, the time-based job scheduler. Look in **/etc/cron.d/** for the configuration and see what command is being executed.

**NOTE:** Looking at shell scripts written by other people is a very useful skill. The script for this level is intentionally made easy to read. If you are having problems understanding what it does, try executing it to see the debug information it prints.

To sign up : ssh [bandit22@bandit.labs.overthewire.org](mailto:bandit17@bandit.labs.overthewire.org) -p 2220\
Password : WdDozAdTM2z9DiFEQ2mGlwngMfj4EZff .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455254361/1d857157-5a4b-4608-ba5e-990e7362644e.png" alt="" align="left" fullwidth="false" />

The echo command simply prints the text string **“I am user $myname”** to the standard output. **The pipe (|)** symbol is used to redirect the output of the echo command to the input of the md5sum command.

The md5sum command is a cryptographic hash function that generates a unique 128-bit fingerprint for the input data. In this case, the input data is the text string **“I am user $myname”**. The md5sum command prints the hash value to the standard output.

The cut command is used to cut fields from a line of text. In this case, the -d ‘ ‘ option specifies that the delimiter is a space character, and the -f 1 option specifies that only the first field should be printed. So, the cut command takes the hash value that was printed by the md5sum command and prints only the first field, which is the hash value itself.

Therefore, the overall effect of the command is to print the MD5 hash of the text string “I am user $myname”.

***Here is a breakdown of the command:***

**echo** : Prints the specified text to the standard output.\
**“I am user $myname”** : The text string to be printed by the echo command.\
( **|** ) : Redirects the output of the echo command to the input of the md5sum command.\
**md5sum** : A cryptographic hash function that generates a unique 128-bit fingerprint for the input data.\
**( | )** : Redirects the output of the md5sum command to the input of the cut command.\
**cut** : Cuts fields from a line of text.\
**-d ‘ ‘** : Specifies that the delimiter is a space character.\
**-f 1** : Specifies that only the first field should be printed.

When I kept track of things, such as the solution of the previous level, I found some things that we needed to follow up on :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455255953/8d66b397-956b-4cdb-a114-5ba8f3866c13.png" alt="" align="left" fullwidth="false" />

We have to search here .

The command `**cat /etc/bandit_pass/$myname > /tmp/$mytarget**` is a shell command that copies the contents of the file `**/etc/bandit_pass/$myname**` to the file `**/tmp/$mytarget**`.

* `**cat**`: The `**cat**` command is a standard Unix/Linux command that concatenates files and prints them to the standard output. In this case, the `**cat**` command is being used to read the contents of a file.

* `**/etc/bandit_pass/$myname**`: This is the path to the file that the `cat` command will read. The `**/etc/bandit_pass**` directory is a directory that contains password files for users on the system. The `**$myname**` variable is a shell variable that contains the current user's name.

* `**>**`: The `**>**` operator is the redirection operator. It is used to redirect the output of a command to a file. In this case, the `**>**` operator is redirecting the output of the `cat` command to the file `**/tmp/$mytarget**`.

* `**/tmp/$mytarget**`: This is the path to the file that the contents of `**/etc/bandit_pass/$myname**` will be copied to. The `**/tmp**` directory is a temporary directory that is typically used for storing temporary files. The `**$mytarget**` variable is a shell variable that contains the name of the target file.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455257599/a0d5edb8-d0ee-44fc-896e-d895c84c8c99.png" alt="" align="left" fullwidth="false" />

You have to pay attention here .

This command must be modified. I am user $myname ,And then do the cat command to extract the password for the next level. Let’s go, my friend …!

### Bandit Level 23 → Level 24

To sign up : ssh [bandit23@bandit.labs.overthewire.org](mailto:bandit17@bandit.labs.overthewire.org) -p 2220\
Password : QYw0Y2aiA672PsMmh9puTQuhoz8SyR2G

Next roles may require detailed reports, so see you soon…….!!

We’ll meet later, my friend……

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

