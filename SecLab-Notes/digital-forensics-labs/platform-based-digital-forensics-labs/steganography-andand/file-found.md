---
id: "68ee7f52869fe163c26cf567"
title: "File Found : Cyber Talents"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/file-found"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T16:50:26.836Z"
updatedAt: "2026-01-25T15:35:46.974Z"
---

## 📍 First, Identification - Definition Goal: Determine the type and location of digital evidence.

The challenge included a file named foundfile without an extension.

Challenge text: "We found the following file on a machine. We know it contains a secret, but we do not know what this file is..."

The file was identified as a compiled Java class file (a compiled Java file in .class format).

***

## 📥 Second: Acquisition Goal: Download a copy of the digital directory without changing its content :

### The file was downloaded using wget:

```bash
sansforensics@as: ~/DF-LAB
$ wget https://hubchallenges.s3.eu-west-1.amazonaws.com/forensics/foundfile
--2025-07-25 16:18:47--  https://hubchallenges.s3.eu-west-1.amazonaws.com/forensics/foundfile
Resolving hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)... 3.5.67.246, 52.218.45.130, 3.5.72.248, ...
Connecting to hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)|3.5.67.246|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 668 [binary/octet-stream]
Saving to: ‘foundfile’

foundfile                       100%[=====================================================>]     668  --.-KB/s    in 0s      

2025-07-25 16:18:48 (19.0 MB/s) - ‘foundfile’ saved [668/668]
```

The entire file has been downloaded, size 668 bytes.

> File type: binary/octet-stream

***

## 🔒 Third: Preservation Goal: Preserve the file without any modification.

Non-destructive read commands such as: `file` , `stat` , `strings` , `head`

The file's permissions were preserved and unmodified.

For further confirmation, the hash can be calculated using:

```bash
sha256sum foundfile
```

***

## Fourth: Analysis - Objective: Analyzing the file content and attempting to extract the secret or flag.

### `file` type had to be known :

```bash
sansforensics@as: ~/DF-LAB
$ file foundfile 
foundfile: compiled Java class data, version 52.0 (Java 1.8)
```

**The stat command is used to display detailed information about a file :**

```bash
sansforensics@as: ~/DF-LAB
$ stat foundfile 
  File: foundfile
  Size: 668           Blocks: 8          IO Block: 4096   regular file
Device: 802h/2050d    Inode: 3149980     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/sansforensics)   Gid: ( 1000/sansforensics)
Access: 2025-07-25 16:20:33.600336979 +0000
Modify: 2024-11-27 09:01:46.000000000 +0000
Change: 2025-07-25 16:18:48.768937093 +0000
 Birth: -
```

> To know the actual file size and its internal properties.

### I tried to read the file to find out the content, but it was like this  using `head`:

```bash
sansforensics@as: ~/DF-LAB
$ head foundfile 
����4)


	
StackMapTableLineNumberTablemain([Ljava/lang/String;)V
SourceFileHelloWorld.java
                         	
SYNT{SBERAFVPF_101}
                    
                    !"#
                       $%&
                          '(
HelloWorldjava/lang/Objectjava/lang/Stringlength()IcharAt(I)Cjava/lang/SystemoutLjava/io/PrintStream;java/io/PrintStreamprint(C)V!

*��
   	
�rL=+��g+�>a�m�
`�>�?A�M�
`�>�*n�z�
d�>�������	
          *
```

→ Show encrypted and random symbols for binary file

### I decided to use `strings` To extract texts:

```bash
sansforensics@as: ~/DF-LAB
$ strings foundfile 
<init>
Code
LineNumberTable
main
([Ljava/lang/String;)V
StackMapTable
SourceFile
HelloWorld.java
SYNT{SBERAFVPF_101}
HelloWorld
java/lang/Object
java/lang/String
length
charAt
(I)C
java/lang/System
Ljava/io/PrintStream;
java/io/PrintStream
print
(C)V
```

I found this line `SYNT{SBERAFVPF_101}` and it seems that it ends the flag.

This is clearly the secret or flag inside the program.

But its appearance isn't immediately clear, is it?

`SYNT{SBERAFVPF_101}` doesn't appear random, and is likely encrypted using simple encryption.

### 🔐 High probability :

The encryption used is ROT13, which is a primitive encryption that replaces each letter with the next letter 13 places in the alphabet .

### Search with: `encryption used is ROT13`

Here you will find the idea of how to do this encryption : [`https://www.geeksforgeeks.org/dsa/rot13-cipher/`](https://www.geeksforgeeks.org/dsa/rot13-cipher/)

After research, it seemed that the flag had been changed with Caesar Cipher, and we had to restore it as it was before : [`https://www.dcode.fr/rot-13-cipher`](https://www.dcode.fr/rot-13-cipher)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1753465976896/564e94ff-4013-4f7c-9103-0b37241b2f2d.png" alt="" align="center" fullwidth="false" />

> FLAG\{FORENSICS\_101}

I changed the key here several times, until I reached the correct number, which was`ROT13`

***

## 📝 Fifth: Reporting – Final Report

📂 File Name: `foundfile`

🧠 File Type: Java Class File – version 52.0

🔍 Analysis Result: A flag was found inside the file encoded with ROT13 🛠️ Tools Used: `wget` , `file` , `stat` , `head` , `strings` , [`dcode.fr`](https://www.dcode.fr/rot-13-cipher)

🏁 Flag Extracted:

```bash
SYNT{FORENSICS_101}
```

> ***💬 "Control the code, and you control the world."***
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

