
Forensics

Taking LS

[https://ctflearn.com/challenge/103](https://ctflearn.com/challenge/103)

Just take the Ls. Check out this zip file and I be the flag will remain hidden. [https://mega.nz/#!mCgBjZgB!\_FtmAm8s\_mpsHr7KWv8GYUzhbThNn0I8cHMBi4fJQp8](https://mega.nz/#!mCgBjZgB!_FtmAm8s_mpsHr7KWv8GYUzhbThNn0I8cHMBi4fJQp8)

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454940760/18615315-bb73-4a0d-91be-a85ce111f2e0.png" alt="" align="left" fullwidth="false" />

First we have to know the file type using file ,When we found the file with the zip extension, we now have to decompress the file .

The `**unzip**` command in Linux is used to extract the contents of a ZIP archive. When you run the command `unzip The\ Flag.zip`, it attempts to extract the files and directories contained in the 'The Flag.zip' archive.

Here’s a breakdown of the command:

* **unzip**: This is the command-line utility for extracting files from ZIP archives.

* **The\ Flag.zip**: This is the name of the ZIP file you want to extract. The backslash (`\`) is used to escape the space in the filename.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454942047/875d55d6-541f-4ca7-9c73-a15807c16458.png" alt="" align="left" fullwidth="false" />

The `**ll**` command is a commonly used shorthand for the `ls -l` command in Unix-like operating systems, including Linux. The `ls` command is used to list directory contents, and the `-l` option is used to provide detailed information about the files and directories in a long format.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454943348/914c0c71-09f6-4a56-b4cc-7bda71b97e44.png" alt="" align="left" fullwidth="false" />

The `**qpdf --show-xref 'The Flag.pdf'**` command is used with the `qpdf` tool to display the cross-reference (xref) table of a PDF file named 'The Flag.pdf'. The cross-reference table is a critical part of the internal structure of a PDF file, and it helps PDF readers locate and access different parts of the file efficiently.

Let’s break down the components of the command:

* **qpdf**: This is the command-line tool that provides various capabilities for transforming and inspecting PDF files.

* **— show-xref**: This is an option or flag for the `qpdf` command. It instructs `qpdf` to display the cross-reference table of the specified PDF file.

* **‘The Flag.pdf’**: This is the argument that represents the name of the PDF file you want to examine. Make sure to replace it with the actual filename and path if the file is not in the current working directory.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454944603/071309bc-24e1-440c-9e38-e3937a34deb4.png" alt="" align="left" fullwidth="false" />

Here, when we moved to .ThePassword/, we found ThePassword.txt, and when we opened it, we found the password for the pdf.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454945899/7f55d26b-771e-41d9-8d8c-f889009ca19f.png" alt="" align="left" fullwidth="false" />

Here we started by going to the PDF file and entering its password, **Im The Flag**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454946986/b4819043-4f1c-46de-85df-b1622925cc74.png" alt="" align="left" fullwidth="false" />

> **Here we have reached the flag, my friend**

> **See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

