
**Forensics**

[Challenge — Binwalk — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/108)

Here is a file with another file hidden inside it. Can you extract it? [https://mega.nz/#!qbpUTYiK!-deNdQJxsQS8bTSMxeUOtpEclCI-zpK7tbJiKV0tXYY](https://mega.nz/#!qbpUTYiK!-deNdQJxsQS8bTSMxeUOtpEclCI-zpK7tbJiKV0tXYY)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454917203/3280f9ba-7f16-473e-b4db-080cb67fa472.png" alt="" align="left" fullwidth="false" />

I always change the names to something that is closest to what we do, so I changed the name of the file to the name of the task that we are doing now. Now let’s get started.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454918759/a2fedea0-422b-499b-af97-747dbcb500cd.png" alt="" align="left" fullwidth="false" />

Here we define the file type .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454920113/d8bab0d9-919f-44c3-a0a4-d4d7eaf9d1bf.png" alt="" align="left" fullwidth="false" />

I used exiftool, but didn’t find anything interesting :

It was in the title of the question that the file is hidden. You should extract it, then:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454921702/fda59772-c7e7-4970-9c8a-f78ef2d7d9da.png" alt="" align="left" fullwidth="false" />

The `**binwalk**` command is a tool used for analyzing and extracting embedded files in binary data. In the command you provided:

* **binwalk**: This is the command-line tool itself.

* **— extract**: This option instructs `binwalk` to attempt to extract any files that it finds.

* **— dd=”.\*”**: This option specifies a regular expression pattern for files to be extracted. In this case, it’s set to “.\*”, which essentially matches any file.

* **Binwalk.jpeg**: This is the name of the file (presumably a JPEG image in this case) that you want to analyze and extract embedded files from.

So, when you run this command, `binwalk` will analyze the 'Binwalk.jpeg' file, attempt to find embedded files, and extract them. The `--dd` option with the regular expression ".\*" allows it to extract any files it finds in the binary data.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454923186/0049c781-e4e6-4205-b178-03970982339c.png" alt="" align="left" fullwidth="false" />

When I used strings I didn’t find anything interesting :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454924755/87094ba1-c6cc-4a77-9cfb-dda1a61907a1.png" alt="" align="left" fullwidth="false" />

The `**eog**` command is used to launch the Eye of GNOME (EOG) image viewer on Linux systems. The command you provided, `eog 25795`, is likely an attempt to open an image file with the EOG viewer.

Here’s a breakdown of the components:

* **eog**: This is the command to start the Eye of GNOME image viewer.

* **25795**: This is likely the name of the image file you want to open with EOG.

So, when you run `eog 25795`, it attempts to open and display the image file named "25795" using the Eye of GNOME viewer. If the file exists in the current working directory, EOG will open and display the image. If the file is in a different directory, you may need to provide the full path to the image file.

> ***Here is the flag\
> See you soon in other reports….!!***

> ***Abdelwahab\_Shandy***

> ***AS\_Cyber***

