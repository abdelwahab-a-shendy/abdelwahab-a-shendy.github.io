---
id: "68ee7ea7a91e94c8b28b987e"
title: "Hidden Message : Cyber Talents "
description: "A cyber Criminal is hiding information in the below file . capture the flag ? submit Flag in MD5 Format "
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/hidden-message-cyber-talents"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T16:47:35.757Z"
updatedAt: "2026-01-25T15:35:46.971Z"
---

## 🕵️‍♂️ 1. Identification :

Challenge Description:

Cyber Criminal is hiding information in a file named `h_m.jpg` . Requirements: Extract the flag and submit it in MD5 format.

Case Type: Forensic Analysis of an Image File Suspected of Steganography / Metadata Forensics.

***

## 📥 2. Acquisition

Download the digital guide (image) :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ wget https://hubchallenges.s3.eu-west-1.amazonaws.com/h_m.jpg
--2025-07-28 20:51:21--  https://hubchallenges.s3.eu-west-1.amazonaws.com/h_m.jpg
Resolving hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)... 3.5.70.76, 3.5.72.21, 52.92.16.106, ...
Connecting to hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)|3.5.70.76|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 63516 (62K) [image/jpeg]
Saving to: ‘h_m.jpg’

h_m.jpg             100%[===================>]  62.03K   128KB/s    in 0.5s    

2025-07-28 20:51:23 (128 KB/s) - ‘h_m.jpg’ saved [63516/63516]
```

Check file properties after downloading :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ stat h_m.jpg 
  File: h_m.jpg
  Size: 63516     	Blocks: 128        IO Block: 4096   regular file
Device: 802h/2050d	Inode: 3150185     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/sansforensics)   Gid: ( 1000/sansforensics)
Access: 2025-07-28 20:51:23.000000000 +0000
Modify: 2024-09-22 15:28:18.000000000 +0000
Change: 2025-07-28 20:51:23.182125873 +0000
 Birth: -
```

Determine the file type using the file tool:

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ file h_m.jpg 
h_m.jpg: JPEG image data, JFIF standard 1.01, resolution (DPI), density 96x96, segment length 16, Exif Standard: [TIFF image data, big-endian, direntries=5, xresolution=74, yresolution=82, resolutionunit=2], baseline, precision 8, 955x384, components 3
```

***

## 🧊 3. Preservation

The file was processed in a digital forensic environment .

The file contents were not modified at all, and analysis was performed using read-only tools such as exif.

Preservation was performed by:

Copying the file into the investigation folder: \~/DF-LAB/CyberTalents/

Not modifying its timestamps.

Not using any tool that would overwrite the file.

***

## 🔍 4. Analysis

Analysis tools used: `exif` or `exiftool` To analyze the image's metadata.

Execute the analysis :

Here we have found the flag , Using exiftool :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ exif h_m.jpg 
EXIF tags in 'h_m.jpg' ('Motorola' byte order):
--------------------+----------------------------------------------------------
Tag                 |Value
--------------------+----------------------------------------------------------
X-Resolution        |96
Y-Resolution        |96
Resolution Unit     |Inch
YCbCr Positioning   |Centered
Exif Version        |Unknown Exif Version
Components Configura|Y Cb Cr -
User Comment        |b1a1f2855d2428930e0c9c4ce10500d5
FlashPixVersion     |FlashPix Version 1.0
Color Space         |Internal error (unknown value 65535)
--------------------+----------------------------------------------------------
```

To extract the flag alone :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ exif h_m.jpg | grep Comment
User Comment        |b1a1f2855d2428930e0c9c4ce10500d5
```

🟢 The flag was found inside the User Comment field of the Exif Metadata.

***

## 📝 5. Reporting

Report Report Title: Investigating an Image File Containing Hidden Data - CyberTalents Challenge

Description : An image named h\_m.jpg was uploaded, and by analyzing the metadata using forensic tools, a hidden key was found in the "User Comment" field .

Analysis Tool: `exif`

Final Result (Flag):

```bash
b1a1f2855d2428930e0c9c4ce10500d5
```

Flag Format: MD5 ✅

Status: ✅ Flag extracted successfully

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

