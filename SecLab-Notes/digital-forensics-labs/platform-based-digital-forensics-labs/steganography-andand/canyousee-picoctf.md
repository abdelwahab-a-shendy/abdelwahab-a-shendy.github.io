---
id: "68ee5f1284635ce7eae60a37"
title: "CanYouSee : picoCTF"
description: "How about some hide and seek?"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/canyousee-picoctf"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T14:32:50.360Z"
updatedAt: "2026-01-25T15:35:46.951Z"
---

<Image src="https://miro.medium.com/v2/resize:fit:875/1*0L1UaVfknyeMxPmK4PbrQA.png" align="left" fullwidth="false" />

# 🕵️ CanYouSee Challenge Report – picoCTF

### 1️⃣ Identification

While analyzing CanYouSee, we were provided with a zip file named [known.zip](http://known.zip).

After decompressing, the file image returned as ukn\_reality.jpg.

The goal was to search for any hidden data (data hiding/metadata hiding).

***

### 2️⃣ Acquisition

* The original file was uploaded using :

```bash
sansforensics@as: ~/CTF-DF
$ wget https://artifacts.picoctf.net/c_titan/130/unknown.zip
--2025-08-22 22:38:53--  https://artifacts.picoctf.net/c_titan/130/unknown.zip
Resolving artifacts.picoctf.net (artifacts.picoctf.net)... 13.226.175.57, 13.226.175.87, 13.226.175.125, ...
Connecting to artifacts.picoctf.net (artifacts.picoctf.net)|13.226.175.57|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 2252265 (2.1M) [application/octet-stream]
Saving to: ‘unknown.zip’

unknown.zip         100%[===================>]   2.15M  1.02MB/s    in 2.1s    

2025-08-22 22:38:57 (1.02 MB/s) - ‘unknown.zip’ saved [2252265/2252265]

sansforensics@as: ~/CTF-DF
$ ls 
unknown.zip

sansforensics@as: ~/CTF-DF
$ unzip unknown.zip 
Archive:  unknown.zip
  inflating: ukn_reality.jpg  

sansforensics@as: ~/CTF-DF
$ cp ukn_reality.jpg CanYouSee.jpg

sansforensics@as: ~/CTF-DF
$ ls
CanYouSee.jpg  ukn_reality.jpg  unknown.zip
```

* The working version has been named <mark>CanYouSee.jpg</mark> to preserve the original.

* Image size: 2.2 MB.

***

### 3️⃣ Preservation

The file was preserved unmodified using:

* The cp command to create a copy.

* The stat command to verify the creation and modification dates.

The file, exif, and exiftool commands to verify the file type and preserve its properties :

```bash
sansforensics@as: ~/CTF-DF
$ stat CanYouSee.jpg 
  File: CanYouSee.jpg
  Size: 2263795   	Blocks: 4424       IO Block: 4096   regular file
Device: 802h/2050d	Inode: 3149192     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/sansforensics)   Gid: ( 1000/sansforensics)
Access: 2025-08-22 22:40:05.157068529 +0000
Modify: 2025-08-22 22:40:05.157068529 +0000
Change: 2025-08-22 22:40:05.157068529 +0000
 Birth: -

sansforensics@as: ~/CTF-DF
$ file CanYouSee.jpg 
CanYouSee.jpg: JPEG image data, JFIF standard 1.01, resolution (DPI), density 72x72, segment length 16, baseline, precision 8, 4308x2875, components 3

sansforensics@as: ~/CTF-DF
$ exif CanYouSee.jpg 
Corrupt data
The data provided does not follow the specification.
ExifLoader: The data supplied does not seem to contain EXIF data.

sansforensics@as: ~/CTF-DF
$ exiftool CanYouSee.jpg 
ExifTool Version Number         : 11.88
File Name                       : CanYouSee.jpg
Directory                       : .
File Size                       : 2.2 MB
File Modification Date/Time     : 2025:08:22 22:40:05+00:00
File Access Date/Time           : 2025:08:22 22:40:36+00:00
File Inode Change Date/Time     : 2025:08:22 22:40:05+00:00
File Permissions                : rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Resolution Unit                 : inches
X Resolution                    : 72
Y Resolution                    : 72
XMP Toolkit                     : Image::ExifTool 11.88
Attribution URL                 : cGljb0NURntNRTc0RDQ3QV9ISUREM05fNmE5ZjVhYzR9Cg==
Image Width                     : 4308
Image Height                    : 2875
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 4308x2875
Megapixels                      : 12.4
```

***

### 4️⃣ Analysis

Using ExifTool to detect hidden XMP data within an image:

```bash
Attribution URL : cGljb0NURntNRTc0RDQ3QV9ISUREM05fNmE5ZjVhYzR9Cg==
```

The previous string was encoded in Base64.

After decoding it:

```bash
sansforensics@as: ~/CTF-DF
$ echo "cGljb0NURntNRTc0RDQ3QV9ISUREM05fNmE5ZjVhYzR9Cg==" | base64 -d 
picoCTF{ME74D47A_HIDD3N_Try_it_yourself}
```

Result:

```bash
picoCTF{ME74D47A_HIDD3N_Try_it_yourself}
```

***

5️⃣ Reporting - The report

The challenge relied on data hiding in metadata (XMP field).

The flag was successfully extracted:

🎯 Flag:

```bash
picoCTF{ME74D47A_HIDD3N_Try_it_yourself}
```

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

