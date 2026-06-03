---
id: "68ee5b9912c0e279c1348a33"
title: "Information : picoCTF"
description: "Files can always be changed in a secret way. Can you find the flag? cat.jpg"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/information-picoctf"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T14:18:01.994Z"
updatedAt: "2026-01-25T15:35:46.921Z"
---

# 🧪 **cat.jpg Challenge Report – picoCTF**

## 1. **Identification**

**Description:**\
The challenge asks us to find the flag in a JPEG image named `cat.jpg`. The hint mentions that files can always be changed in a secret way, suggesting hidden metadata or steganography.

**Tools used:**

* `file`

* `exiftool`

* `base64`

**Procedure:**

```bash
$ file CatTheCTF
CatTheCTF: JPEG image data, JFIF standard 1.02, aspect ratio, density 1x1, segment length 16, baseline, precision 8, 2560x1598, components 3
```

**Result:**\
The file is a standard JPEG image (2560x1598 pixels), which can be displayed normally. However, it may contain hidden information in its metadata.

***

## 2. **Acquisition**

**Procedure:**\
The image was downloaded from the provided link using `wget` and copied for analysis under a new name to preserve the original:

```bash
$ wget https://mercury.picoctf.net/static/d1375e383810d8d957c04eef9e345732/cat.jpg
$ cp cat.jpg CatTheCTF
```

**Result:**

* Original file: `cat.jpg`

* Working copy: `CatTheCTF`

The original file remains unchanged for verification purposes.

***

## 3. **Preservation**

**Goal:**\
Ensure the file's integrity during analysis.

**Steps:**

* Create a copy for analysis (`CatTheCTF`)

* Keep the original (`cat.jpg`) untouched

* Optionally, verify the file hash:

```bash
$ sha256sum cat.jpg CatTheCTF 
ab639e3a45a4f76efe104953a77b709e441e0546ec9fb08780e57fe3644d4250  cat.jpg
ab639e3a45a4f76efe104953a77b709e441e0546ec9fb08780e57fe3644d4250  CatTheCTF
```

**Result:**\
The file is preserved and ready for analysis without any changes to its original content.

***

## 4. **Analysis**

**Goal:**\
Look for hidden data inside the image (metadata or embedded information).

**Steps:**

1. **Check metadata using ExifTool:**

```bash
$ exiftool CatTheCTF 
ExifTool Version Number         : 11.88
File Name                       : CatTheCTF
Directory                       : .
File Size                       : 858 kB
File Modification Date/Time     : 2025:08:20 23:42:31+00:00
File Access Date/Time           : 2025:08:20 23:43:09+00:00
File Inode Change Date/Time     : 2025:08:20 23:42:31+00:00
File Permissions                : rw-rw-r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.02
Resolution Unit                 : None
X Resolution                    : 1
Y Resolution                    : 1
Current IPTC Digest             : 7a78f3d9cfb1ce42ab5a3aa30573d617
Copyright Notice                : PicoCTF
Application Record Version      : 4
XMP Toolkit                     : Image::ExifTool 10.80
License                         : cGljb0NURnt0aGVfbTN0YWRhdGFfMXNfbW9kaWZpZWR9
Rights                          : PicoCTF
Image Width                     : 2560
Image Height                    : 1598
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 2560x1598
Megapixels                      : 4.1
```

**Important output:**

```bash
License : cGljb0NURnt0aGVfbTN0YWRhdGFfMXNfbW9kaWZpZWR9
```

2. **Analyze the encoded data:**\
   The **License** field contains a Base64-encoded string.

3. **Decode Base64:**

```bash
$ echo cGljb0NURnt0aGVfbTN0YWRhdGFfMXNfbW9kaWZpZWR9 | base64 -d
```

**Result:**\
The flag hidden in the metadata is:

```bash
picoCTF{the_m3tadata_1s_Try_it_yourself}
```

***

## 5. **Reporting**

**Summary of Analysis:**

| Phase          | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| Identification | File identified as a standard JPEG. Metadata could hide information.            |
| Acquisition    | File downloaded and copied for safe analysis.                                   |
| Preservation   | Original file kept intact, working copy used for analysis.                      |
| Analysis       | ExifTool revealed Base64 text in the License field. Decoding revealed the flag. |
| Reporting      | Final flag: `picoCTF{the_m3tadata_1s_Try_ityourself}`                           |

✅ **Flag:**

```bash
picoCTF{the_m3tadata_1s_Try_it_yourself}
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

