
## First, Identification - Definition Goal: To identify the type of digital evidence and its location.

The challenge contained a godot.png image file.

The hint read: "The hacker left something inside the image that can be traced."

So, we define the type of evidence as a digital image that potentially contains hidden or cached data (steganography/metadata/embedded data).

***

## Second, Acquisition.

Goal: Obtain a copy of the digital evidence.

I used the following command to download the file :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ wget https://hubchallenges.s3.eu-west-1.amazonaws.com/godot.png
--2025-07-28 07:09:44--  https://hubchallenges.s3.eu-west-1.amazonaws.com/godot.png
Resolving hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)... 3.5.68.114, 52.218.96.227, 52.92.20.130, ...
Connecting to hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)|3.5.68.114|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 3539 (3.5K) [image/png]
Saving to: ‘godot.png’

godot.png       100%[=====>]   3.46K  --.-KB/s    in 0s      

2025-07-28 07:09:45 (49.5 MB/s) - ‘godot.png’ saved [3539/3539]
```

We obtained the full, unaltered version of the image.

File size: 3539 Bytes – indicates it's small but may contain encrypted information.

***

## Third: Preservation Goal: Ensure the directory is not changed during analysis.

We used non-destructive read commands such as:

* `file` , `stat` , `exiftool` , `strings`

We did not modify the file.

Preservation can be further enhanced by using sha256sum to calculate the file hash before and after analysis.

**Hashing suggestion:** Could be improved with:

```bash
sha256sum godot.png
```

***

## Fourth: Analysis Objective: Extract and analyze important data within the image.

**Preliminary analysis** `file` **type had to be known :**

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ file godot.png 
godot.png: PNG image data, 64 x 64, 8-bit/color RGBA, non-interlaced
```

### **The stat command is used to display detailed information about a file :**

* To know the actual file size and its internal properties :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ stat godot.png 
  File: godot.png
  Size: 3539      	Blocks: 8          IO Block: 4096   regular file
Device: 802h/2050d	Inode: 3150185     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/sansforensics)   Gid: ( 1000/sansforensics)
Access: 2025-07-28 07:09:45.000000000 +0000
Modify: 2024-11-27 12:57:26.000000000 +0000
Change: 2025-07-28 07:09:45.247300610 +0000
 Birth: -
```

### Examine the metadata using exiftool (or exif) :

The goal here is to determine if any hidden data has been included in the metadata:

* information about the author, the software used, comments, etc :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ exif godot.png 
Corrupt data
The data provided does not follow the specification.
ExifLoader: The data supplied does not seem to contain EXIF data.
sansforensics@as: ~/DF-LAB/CyberTalents
$ exiftool godot.png 
ExifTool Version Number         : 11.88
File Name                       : godot.png
Directory                       : .
File Size                       : 3.5 kB
File Modification Date/Time     : 2024:11:27 12:57:26+00:00
File Access Date/Time           : 2025:07:28 07:17:21+00:00
File Inode Change Date/Time     : 2025:07:28 07:09:45+00:00
File Permissions                : rw-rw-r--
File Type                       : PNG
File Type Extension             : png
MIME Type                       : image/png
Image Width                     : 64
Image Height                    : 64
Bit Depth                       : 8
Color Type                      : RGB with Alpha
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Interlace                       : Noninterlaced
Warning                         : [minor] Trailer data after PNG IEND chunk
Image Size                      : 64x64
Megapixels                      : 0.004
```

> **Exif didn't show any EXIF data. This is expected because PNG often doesn't support it.**
>
> **But Exiftool gave us an important warning:**
>
> **Trailer data after PNG IEND chunk**

### Accordingly , We used strings godot.png :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ strings godot.png 
IHDR
IEND
IZGECR33JZXXIX2PNZWHSX2CMFZWKNRUPU======
```

This is the important line:

```bash
IZGECR33JZXXIX2PNZWHSX2CMFZWKNRUPU======
```

💡 Quick line analysis: The string is long and formatted very similarly to Base32 encoding.

It ends with ====== → which is very common in Base32 (not Base64) padding.

### Here I used cyberchef.org, and you can also use command lines to output the flag, by using :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ echo "IZGECR33JZXXIX2PNZWHSX2CMFZWKNRUPU======" | base64 --decode
!��	�%��!}�5��I}�0VV(�T=base64

sansforensics@as: ~/DF-LAB/CyberTalents
$ echo "IZGECR33JZXXIX2PNZWHSX2CMFZWKNRUPU======" | base32 --decode
FLAG{Not_Only_Base64}
```

> I tried both base64 and base32, base32 succeeded in outputting the required flag .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455038840/e3fbcf58-cd54-4337-9dcc-10052781de58.png" alt="" align="left" fullwidth="false" />

> **you can use :** [Cyberchef](https://cyberchef.io/)

Really, flag is not always base64 .

***

### Fifth : Reporting Objective: Documenting the steps and final results.

📋 The final report includes: 🖼️ File name: `godot.png`

🔐 Directory type: `PNG` image with hidden data after `IEND`

🧪 **Analysis** : Base32 string found in image data

🏁 **Result** : Flag successfully extracted

🛠️ Tools used: `wget` , `file` , `stat` , `exiftool` , `strings` , `base32`

> ✅ Flag: FLAG\{Not\_Only\_Base64}

> > ***💬 "Control the code, and you control the world."***
> >
> > [***Abdelwahab Shandy***](https://abdelwahabshandy.hashnode.dev/)
> >
> > [***Linkedin***](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)
> >
> > [***GitHub***](https://github.com/abdelwahab-ahmed-shandy)
> >
> > ***See You Soon***
> >
> > ***AS Cyber “)).***

