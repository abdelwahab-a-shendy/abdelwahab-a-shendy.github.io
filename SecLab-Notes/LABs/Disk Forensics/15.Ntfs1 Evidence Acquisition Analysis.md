
## **Digital Forensics Investigation Report – NTFS1 Image**

**Case Title:** NTFS1 – Evidence Acquisition & Analysis Lab\
**Source:** [DigitalCorpora.org](http://DigitalCorpora.org) – [nps-2009-ntfs1\
**Investigator:**](https://digitalcorpora.s3.amazonaws.com/s3_browser.html#corpora/drives/nps-2009-ntfs1/) Abdelwahab Shandy\
**Date (UTC):** 2025-08-10\
**Syst**[**em Used for An**](https://digitalcorpora.s3.amazonaws.com/s3_browser.html#corpora/drives/nps-2009-ntfs1/)**alysis:**

* **OS:** `Ubuntu 20.04.6 LTS`

* **Hostname:** `as`

* **Tools:** `file`, `sha256sum`, `cp`, `ewfmount` (EWF Tools v2025.1)

***

## **🧩 1. Identification**

> ***Scenario:\
> -*** A te[st image of an](https://digitalcorpora.s3.amazonaws.com/s3_browser.html#corpora/drives/nps-2009-ntfs1/) NTFS file [system includi](https://digitalcorpora.s3.amazonaws.com/s3_browser.html#corpora/drives/nps-2009-ntfs1/)ng unfragment[ed and highly](https://digitalcorpora.s3.amazonaws.com/s3_browser.html#corpora/drives/nps-2009-ntfs1/) fragmented files stored in raw, compressed, and encrypted directories. The decryption key is provided.
>
> **Evidence Type:** Disk image (.E01) – EnCase EWF format.\
> **Source URL:** [Digital Corpora – nps-2009-ntfs1](https://digitalcorpora.org/corpora/disk-images/)

***

## **📥 2. Acquisition**

> [***Goal: Obt***](https://digitalcorpora.s3.amazonaws.com/s3_browser.html#corpora/drives/nps-2009-ntfs1/)***ain and preserve a copy of the evidence file for analysis.***
>
> Download the file with the extension `.E01`

1. **Download the image file:**

```bash
$ wget https://digitalcorpora.s3.amazonaws.com/corpora/drives/nps-2009-ntfs1/ntfs1-gen0.E01
```

2. ### Identify file type :

```bash
sansforensics@as: ~/DF-LAB
$ file ntfs1-gen0.E01 
ntfs1-gen0.E01: EWF/Expert Witness/EnCase image file format
```

3. **Generate cryptographic hash for integrity verification :**

```bash
sansforensics@as: ~/DF-LAB
$ sha256sum ntfs1-gen0.E01 
96e525f53d50f986461151f8e9c07588633215477a6b8a3f744b2eeebe512460  ntfs1-gen0.E01
```

***

## **🔐 3. Preservation**

> ***Goal: Ensure data integrity and avoid altering the original file.***

1. **Copy the original image for analysis:**

```bash
sansforensics@as: ~/DF-LAB
$ cp ntfs1-gen0.E01 CopyNtfs1Gen0.E01
```

> 📌 Objective:
>
> * Preserve the original copy without any modifications (so you can return to it or verify its integrity).
>
> * Any analysis or modifications will be made to the second copy only.

2. ### Ensure that the copy is exactly the same as the original :

```bash
sansforensics@as: ~/DF-LAB
$ sha256sum ntfs1-gen0.E01 
96e525f53d50f986461151f8e9c07588633215477a6b8a3f744b2eeebe512460  ntfs1-gen0.E01
sansforensics@as: ~/DF-LAB
$ sha256sum CopyNtfs1Gen0.E01 
96e525f53d50f986461151f8e9c07588633215477a6b8a3f744b2eeebe512460  CopyNtfs1Gen0.E01
```

> ✅ The hashes match – evidence integrity preserved.
>
> * **Note:** In a real-world scenario, a **write-blocker** would be used during acquisition to prevent any modifications.

***

## **🔍 4. Analysis**

### **🔸 1. File Type Identification**

```bash
sansforensics@as: ~/DF-LAB
$ file CopyNtfs1Gen0.E01 
CopyNtfs1Gen0.E01: EWF/Expert Witness/EnCase image file format
```

### **🔸 2. Metadata Examination**

**The** `stat` And `exiftool` **command is used to display detailed information about a file :**

```bash
sansforensics@as: ~/DF-LAB
$ stat CopyNtfs1Gen0.E01 
  File: CopyNtfs1Gen0.E01
  Size: 1089252   	Blocks: 2128       IO Block: 4096   regular file
Device: 802h/2050d	Inode: 3145918     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/sansforensics)   Gid: ( 1000/sansforensics)
Access: 2025-08-10 01:32:58.510661806 +0000
Modify: 2025-08-10 01:30:02.194796141 +0000
Change: 2025-08-10 01:30:02.194796141 +0000
 Birth: -

# using exiftool 
sansforensics@as: ~/DF-LAB
$ exiftool CopyNtfs1Gen0.E01 
ExifTool Version Number         : 11.88
File Name                       : CopyNtfs1Gen0.E01
Directory                       : .
File Size                       : 1064 kB
File Modification Date/Time     : 2025:08:10 01:30:02+00:00
File Access Date/Time           : 2025:08:10 01:32:58+00:00
File Inode Change Date/Time     : 2025:08:10 01:30:02+00:00
File Permissions                : rw-rw-r--
Error                           : Unknown file type
```

### **🔸** 3. EWF Metadata Examination

**Since the regular tulle did not do anything because it is not considered special, come on, let's use** `ewfinfo` **:**

> ### 📌 Its function ewfinfo displays the internal metadata of the .E01 file, such :
>
> * Date and time the original image was created.
>
> * Name of the device or evidence source.
>
> * Actual data size.
>
> * Number of sectors and the size of each sector.
>
> * Name of the user or tool that performed the acquisition.
>
> * Comments (if added at creation time).

```bash
sansforensics@as: ~/DF-LAB
$ ewfinfo CopyNtfs1Gen0.E01 
ewfinfo 20140812

Acquiry information
	Description:		converted from /corp/nps/drives/nps-2009-ntfs1/ntfs1-gen0.aff
	Acquisition date:	Fri Feb 22 10:53:50 2013
	System date:		Fri Feb 22 10:53:50 2013
	Operating system used:	Linux
	Software version used:	20130120
	Password:		N/A

EWF information
	File format:		EnCase 6
	Sectors per chunk:	64
	Error granularity:	64
	Compression method:	deflate
	Compression level:	best compression

Media information
	Media type:		fixed disk
	Is physical:		yes
	Bytes per sector:	512
	Number of sectors:	1008896
	Media size:		492 MiB (516554752 bytes)

Digest hash information
	MD5:			56abc8bc1c01f9ceb262c50a64c134c5
```

> 🔍 Analysis of the results:
>
> * Description → The image was originally converted from AFF (ntfs1-gen0.aff) to E01.
>
> * Acquisition date / System date → Time the directory was acquired: February 22, 2013, 10:53:50 UTC.
>
> * Operating system used → Acquired on Linux.
>
> * Software version used → Version 20130120 of the creation tool.
>
> * Password → No password (N/A), meaning the image is not protected.
>
> * File format → EnCase 6 EWF format.
>
> * Compression → Using deflate and the highest compression level (best compression).
>
> * Media information:
>
> * Media type: Fixed disk.
>
>   * Size: 492 MiB.
>
>   * Number of sectors: 1,008,896 (512 bytes per sector).
>
> * Digest hash → Original MD5: 56abc8bc1c01f9ceb262c50a64c134c5 (important for later file integrity comparison).

### Very important information:

1️⃣ MD5 from ewfinfo :

* This is the hash of the "original contents" of the acquired disk.

* This means that the tool calculates the hash on the data inside the image (the sectors on the disk), not on the E01 file itself.

* The E01 file contains directory data, metadata, and compression, but the MD5 inside the metadata is calculated before compression or any other processing.

2️⃣ MD5 from md5sum :

* CopyNtfs1Gen0.E01 This is the hash of the E01 file itself as a container, including the metadata and compression method.

Of course, it's different because you're hashing all the bytes in the file after the conversion and compression process, not the raw disk data.

💡 Summary:

MD5sum on the file = integrity check for the E01 file as a container.

MD5 inside ewfinfo = integrity check for the original disk contents inside the image (uncompressed, raw sectors),

### **🔸 4. Mounting / Conversion to Raw**

> Objective: Access and analyze the contents of the disk inside the .E01.
>
> You have two methods:
>
> * Convert it to a RAW (.dd) file using ewfexport or ewfmount.
>
> * Make a direct mount using ewfmount and then treat it as a block device.

**For live mount :**

```bash
sansforensics@as: ~/DF-LAB
$ mkdir EWF
sansforensics@as: ~/DF-LAB
$ ewfmount CopyNtfs1Gen0.E01 EWF/
ewfmount 20140812
```

You will see a file inside the EWF/ folder, probably named ewf1 :

```bash
sansforensics@as: ~/DF-LAB
$ ls -l EWF/
total 0
-r--r--r-- 1 sansforensics sansforensics 516554752 Aug 10 02:26 ewf1
```

> This ewf1 file is the raw image (similar to the .dd version) that you can use with analysis tools.

### **🔸 5.** The next step is to use `MMLS` to find out the partition table and see the offset that you will use in the analysis or the mount :

```bash
sansforensics@as: ~/DF-LAB/EWF
$ mmls ewf1 
Cannot determine partition type
```

> Sometimes with small images or images created for training purposes, such as NTFS1, because mmls expects a full partition table (MBR or GPT), but the file may be just a single NTFS disk without any partition table.
>
> 📌 This means that the contents of ewf1 often start directly from the first sector as an NTFS volume, without a partition table.

### **🔸 6.** Instead of relying on mmls, you can check the first sectors with fsstat to make sure :

```bash
sansforensics@as: ~/DF-LAB/EWF
$ fsstat ewf1 
FILE SYSTEM INFORMATION
--------------------------------------------
File System Type: NTFS
Volume Serial Number: DA5048E85048CCC7
OEM Name: NTFS    
Volume Name: NTFS1
Version: Windows XP

METADATA INFORMATION
--------------------------------------------
First Cluster of MFT: 336298
First Cluster of MFT Mirror: 504447
Size of MFT Entries: 1024 bytes
Size of Index Records: 4096 bytes
Range: 0 - 32
Root Directory: 5

CONTENT INFORMATION
--------------------------------------------
Sector Size: 512
Cluster Size: 512
Total Cluster Range: 0 - 1008894
Total Sector Range: 0 - 1008894

$AttrDef Attribute Values:
$STANDARD_INFORMATION (16)   Size: 48-72   Flags: Resident
$ATTRIBUTE_LIST (32)   Size: No Limit   Flags: Non-resident
$FILE_NAME (48)   Size: 68-578   Flags: Resident,Index
$OBJECT_ID (64)   Size: 0-256   Flags: Resident
$SECURITY_DESCRIPTOR (80)   Size: No Limit   Flags: Non-resident
$VOLUME_NAME (96)   Size: 2-256   Flags: Resident
$VOLUME_INFORMATION (112)   Size: 12-12   Flags: Resident
$DATA (128)   Size: No Limit   Flags: 
$INDEX_ROOT (144)   Size: No Limit   Flags: Resident
$INDEX_ALLOCATION (160)   Size: No Limit   Flags: Non-resident
$BITMAP (176)   Size: No Limit   Flags: Non-resident
$REPARSE_POINT (192)   Size: 0-16384   Flags: Non-resident
$EA_INFORMATION (208)   Size: 8-8   Flags: Resident
$EA (224)   Size: 0-65536   Flags: 
$LOGGED_UTILITY_STREAM (256)   Size: 0-65536   Flags: Non-resident
```

> It's very clear that the image (ewf1) is an NTFS volume directly from the first byte, without any partition table.
>
> 📌 Based on fsstat:
>
> * Sector Size = 512 bytes
>
> * Filesystem starts at offset = 0
>
> * Volume Name = NTFS1
>
> * Works on Windows XP

### **💡 So the mount will be like this :**

```bash
sansforensics@as: ~/DF-LAB/EWF
$ mkdir -p ~/mnt/ntfs1
sansforensics@as: ~/DF-LAB/EWF
$ sudo mount -o ro,loop,offset=0 ewf1 ~/mnt/ntfs1/
mount: /home/sansforensics/mnt/ntfs1/: failed to setup loop device for ewf1.
```

> The reason is that mount tries to treat ewf1 as a regular raw file, but it's actually a virtual FUSE file created by ewfmount, and not all mount versions can work with it directly in the loop.
>
> 📌 The solution in this scenario: Use xmount or mount with a fuse driver, or convert ewf1 to a temporary raw file before mounting.

```bash
sansforensics@as: ~/DF-LAB
$ ewfexport CopyNtfs1Gen0.E01 
ewfexport 20140812

Information for export required, please provide the necessary input
Export to format (raw, files, ewf, smart, ftk, encase1, encase2, encase3, encase4, encase5, encase6, encase7, encase7-v2, linen5, linen6, linen7, ewfx) [raw]: raw
Target path and filename without extension or - for stdout: ntfs1
Evidence segment file size in bytes (0 is unlimited) (0 B <= value <= 7.9 EiB) [0 B]: 
Start export at offset (0 <= value <= 516554752) [0]: 
Number of bytes to export (0 <= value <= 516554752) [516554752]: 

Export started at: Aug 10, 2025 02:49:15
This could take a while.

Export completed at: Aug 10, 2025 02:49:17

Written: 492 MiB (516554752 bytes) in 2 second(s) with 246 MiB/s (258277376 bytes/second).
MD5 hash calculated over data:		56abc8bc1c01f9ceb262c50a64c134c5
ewfexport: SUCCESS
```

> What happened:
>
> I did a full export of the .E01 RAW file (ntfs1.raw).
>
> The MD5 that came out (56abc8bc1c01f9ceb262c50a64c134c5) is the same as the one in the ewfinfo file, which indicates that the data itself is intact and identical to the original.

### You're now ready to open it and work directly on it :

> Mounting a RAW disk in read-only mode Since fsstat says NTFS starts from the first byte, offset = 0:

```bash
sansforensics@as: ~/DF-LAB
$ sudo mount -o ro,loop,offset=0 ntfs1.raw ~/mnt/ntfs1
```

> It actually appeared on the screen that there was something like a hard drive that had been cleaned up.

### Verify data access :

Enter the folder:

```bash
sansforensics@as: ~/DF-LAB
$ ls -lah ~/mnt/ntfs1/
total 8.0K
drwxrwxrwx 1 root          root          4.0K Dec 31  2008  .
drwxrwxr-x 3 sansforensics sansforensics 4.0K Aug 10 02:41  ..
drwxrwxrwx 1 root          root             0 Dec 31  2008  Compressed
drwxrwxrwx 1 root          root             0 Dec 31  2008  Encrypted
drwxrwxrwx 1 root          root             0 Dec 31  2008  RAW
drwxrwxrwx 1 root          root             0 Dec 31  2008 'System Volume Information'
```

> I mounted ntfs1.raw successfully, which indicates that the contents were recovered as folders:
>
> * Compressed → Most likely contains files compressed using NTFS compression.
>
> * Encrypted → Most likely contains files encrypted using EFS.
>
> * RAW → Folder name that may contain raw or unformatted data.
>
> * System Volume Information → Windows system folder (Restore Points, Indexing).

***

### Now that we have `ntfs1.raw` mounted and have seen the volumes, the logical steps for analysis would be :

* **Browse and index files :**

  * We create a list of all files and folders on the disk, including their size and creation/modification date.

```bash
sansforensics@as: ~/DF-LAB
$ ls -lR ~/mnt/ntfs1 > FileListing.txt
sansforensics@as: ~/DF-LAB
$ cat FileListing.txt 
/home/sansforensics/mnt/ntfs1:
total 0
drwxrwxrwx 1 root root 0 Dec 31  2008 Compressed
drwxrwxrwx 1 root root 0 Dec 31  2008 Encrypted
drwxrwxrwx 1 root root 0 Dec 31  2008 RAW
drwxrwxrwx 1 root root 0 Dec 31  2008 System Volume Information

/home/sansforensics/mnt/ntfs1/Compressed:
total 0

/home/sansforensics/mnt/ntfs1/Encrypted:
total 0

/home/sansforensics/mnt/ntfs1/RAW:
total 0

/home/sansforensics/mnt/ntfs1/System Volume Information:
total 0
```

* **We use** `fls` **to index files (including deleted ones):**

```bash
sansforensics@as: ~/DF-LAB
$ fls -r -m / ntfs1.raw > AllFile.txt
sansforensics@as: ~/DF-LAB
$ cat AllFile.txt 
0|/$AttrDef ($FILE_NAME)|4-48-2|r/rr-xr-xr-x|48|0|82|1230763442|1230763442|1230763442|1230763442
0|/$AttrDef|4-128-4|r/rr-xr-xr-x|48|0|2560|1230763442|1230763442|1230763442|1230763442
0|/$BadClus ($FILE_NAME)|8-48-3|r/rr-xr-xr-x|0|0|82|1230763442|1230763442|1230763442|1230763442
0|/$BadClus|8-128-2|r/rr-xr-xr-x|0|0|0|1230763442|1230763442|1230763442|1230763442
0|/$BadClus:$Bad|8-128-1|r/rr-xr-xr-x|0|0|516554240|1230763442|1230763442|1230763442|1230763442
0|/$Bitmap ($FILE_NAME)|6-48-2|r/rr-xr-xr-x|0|0|80|1230763442|1230763442|1230763442|1230763442
0|/$Bitmap|6-128-1|r/rr-xr-xr-x|0|0|126112|1230763442|1230763442|1230763442|1230763442
0|/$Boot ($FILE_NAME)|7-48-2|r/rr-xr-xr-x|48|0|76|1230763442|1230763442|1230763442|1230763442
0|/$Boot|7-128-1|r/rr-xr-xr-x|48|0|8192|1230763442|1230763442|1230763442|1230763442
0|/$Extend ($FILE_NAME)|11-48-3|d/dr-xr-xr-x|0|0|80|1230763442|1230763442|1230763442|1230763442
0|/$Extend|11-144-4|d/dr-xr-xr-x|0|0|344|1230763442|1230763442|1230763442|1230763442
0|/$Extend/$ObjId ($FILE_NAME)|25-48-1|r/rr-xr-xr-x|0|0|78|1230763445|1230763445|1230763445|1230763445
0|/$Extend/$ObjId:$O|25-144-2|r/rr-xr-xr-x|0|0|48|1230763445|1230763445|1230763445|1230763445
0|/$Extend/$Quota ($FILE_NAME)|24-48-1|r/rr-xr-xr-x|0|0|78|1230763445|1230763445|1230763445|1230763445
0|/$Extend/$Quota:$O|24-144-3|r/rr-xr-xr-x|0|0|88|1230763445|1230763445|1230763445|1230763445
0|/$Extend/$Quota:$Q|24-144-2|r/rr-xr-xr-x|0|0|208|1230763445|1230763445|1230763445|1230763445
0|/$Extend/$Reparse ($FILE_NAME)|26-48-1|r/rr-xr-xr-x|0|0|82|1230763445|1230763445|1230763445|1230763445
0|/$Extend/$Reparse:$R|26-144-2|r/rr-xr-xr-x|0|0|48|1230763445|1230763445|1230763445|1230763445
0|/$LogFile ($FILE_NAME)|2-48-2|r/rr-xr-xr-x|0|0|82|1230763442|1230763442|1230763442|1230763442
0|/$LogFile|2-128-1|r/rr-xr-xr-x|0|0|4685824|1230763442|1230763442|1230763442|1230763442
0|/$MFT ($FILE_NAME)|0-48-3|r/rr-xr-xr-x|0|0|74|1230763442|1230763442|1230763442|1230763442
0|/$MFT|0-128-1|r/rr-xr-xr-x|0|0|32768|1230763442|1230763442|1230763442|1230763442
0|/$MFTMirr ($FILE_NAME)|1-48-2|r/rr-xr-xr-x|0|0|82|1230763442|1230763442|1230763442|1230763442
0|/$MFTMirr|1-128-1|r/rr-xr-xr-x|0|0|4096|1230763442|1230763442|1230763442|1230763442
0|/$Secure ($FILE_NAME)|9-48-7|r/rr-xr-xr-x|0|0|80|1230763442|1230763442|1230763442|1230763442
0|/$Secure:$SDS|9-128-8|r/rr-xr-xr-x|0|0|262816|1230763442|1230763442|1230763442|1230763442
0|/$Secure:$SDH|9-144-6|r/rr-xr-xr-x|0|0|240|1230763442|1230763442|1230763442|1230763442
0|/$Secure:$SII|9-144-5|r/rr-xr-xr-x|0|0|208|1230763442|1230763442|1230763442|1230763442
0|/$UpCase ($FILE_NAME)|10-48-2|r/rr-xr-xr-x|0|0|80|1230763442|1230763442|1230763442|1230763442
0|/$UpCase|10-128-1|r/rr-xr-xr-x|0|0|131072|1230763442|1230763442|1230763442|1230763442
0|/$Volume ($FILE_NAME)|3-48-1|r/rr-xr-xr-x|48|0|80|1230763442|1230763442|1230763442|1230763442
0|/$Volume|3-128-3|r/rr-xr-xr-x|48|0|0|1230763442|1230763442|1230763442|1230763442
0|/Compressed ($FILE_NAME)|28-48-4|d/drwxrwxrwx|0|0|86|1230763473|1230763473|1230763473|1230763473
0|/Compressed|28-144-1|d/drwxrwxrwx|0|0|48|1230763503|1230763473|1230763476|1230763473
0|/Encrypted ($FILE_NAME)|29-48-4|d/drwxrwxrwx|0|0|84|1230763483|1230763483|1230763483|1230763483
0|/Encrypted|29-144-1|d/drwxrwxrwx|0|0|48|1230763514|1230763483|1230763515|1230763483
0|/RAW ($FILE_NAME)|27-48-4|d/drwxrwxrwx|0|0|72|1230763457|1230763457|1230763457|1230763457
0|/RAW|27-144-1|d/drwxrwxrwx|0|0|48|1230763550|1230763457|1230763468|1230763457
0|/System Volume Information ($FILE_NAME)|30-48-2|d/dr-xr-xr-x|0|0|116|1230763515|1230763515|1230763515|1230763515
0|/System Volume Information|30-144-1|d/dr-xr-xr-x|0|0|48|1230763515|1230763515|1230763515|1230763515
0|/Compressed and Encrypted ($FILE_NAME) (deleted)|31-48-4|-/drwxrwxrwx|0|0|114|1230763524|1230763524|1230763524|1230763524
0|/Compressed and Encrypted (deleted)|31-144-1|-/drwxrwxrwx|0|0|48|1230763524|1230763524|1230763528|1230763524
0|/$OrphanFiles|32|V/V---------|0|0|0|0|0|0|0
```

> **The result you see from fls is a complete index of the files on the system, including system files (MFT, $LogFile, $Bitmap...) and also the folders we saw .**

* **Then we can create a timeline :**

```bash
sansforensics@as: ~/DF-LAB
$ mactime -b AllFile.txt > TimeLine.txt
sansforensics@as: ~/DF-LAB
$ cat TimeLine.txt 
Wed Dec 31 2008 22:44:02    32768 macb r/rr-xr-xr-x 0        0        0-128-1  /$MFT
                               74 macb r/rr-xr-xr-x 0        0        0-48-3   /$MFT ($FILE_NAME)
                             4096 macb r/rr-xr-xr-x 0        0        1-128-1  /$MFTMirr
                               82 macb r/rr-xr-xr-x 0        0        1-48-2   /$MFTMirr ($FILE_NAME)
                           131072 macb r/rr-xr-xr-x 0        0        10-128-1 /$UpCase
                               80 macb r/rr-xr-xr-x 0        0        10-48-2  /$UpCase ($FILE_NAME)
                              344 macb d/dr-xr-xr-x 0        0        11-144-4 /$Extend
                               80 macb d/dr-xr-xr-x 0        0        11-48-3  /$Extend ($FILE_NAME)
                          4685824 macb r/rr-xr-xr-x 0        0        2-128-1  /$LogFile
                               82 macb r/rr-xr-xr-x 0        0        2-48-2   /$LogFile ($FILE_NAME)
                                0 macb r/rr-xr-xr-x 48       0        3-128-3  /$Volume
                               80 macb r/rr-xr-xr-x 48       0        3-48-1   /$Volume ($FILE_NAME)
                             2560 macb r/rr-xr-xr-x 48       0        4-128-4  /$AttrDef
                               82 macb r/rr-xr-xr-x 48       0        4-48-2   /$AttrDef ($FILE_NAME)
                           126112 macb r/rr-xr-xr-x 0        0        6-128-1  /$Bitmap
                               80 macb r/rr-xr-xr-x 0        0        6-48-2   /$Bitmap ($FILE_NAME)
                             8192 macb r/rr-xr-xr-x 48       0        7-128-1  /$Boot
                               76 macb r/rr-xr-xr-x 48       0        7-48-2   /$Boot ($FILE_NAME)
                         516554240 macb r/rr-xr-xr-x 0        0        8-128-1  /$BadClus:$Bad
                                0 macb r/rr-xr-xr-x 0        0        8-128-2  /$BadClus
                               82 macb r/rr-xr-xr-x 0        0        8-48-3   /$BadClus ($FILE_NAME)
                           262816 macb r/rr-xr-xr-x 0        0        9-128-8  /$Secure:$SDS
                              208 macb r/rr-xr-xr-x 0        0        9-144-5  /$Secure:$SII
                              240 macb r/rr-xr-xr-x 0        0        9-144-6  /$Secure:$SDH
                               80 macb r/rr-xr-xr-x 0        0        9-48-7   /$Secure ($FILE_NAME)
Wed Dec 31 2008 22:44:05      208 macb r/rr-xr-xr-x 0        0        24-144-2 /$Extend/$Quota:$Q
                               88 macb r/rr-xr-xr-x 0        0        24-144-3 /$Extend/$Quota:$O
                               78 macb r/rr-xr-xr-x 0        0        24-48-1  /$Extend/$Quota ($FILE_NAME)
                               48 macb r/rr-xr-xr-x 0        0        25-144-2 /$Extend/$ObjId:$O
                               78 macb r/rr-xr-xr-x 0        0        25-48-1  /$Extend/$ObjId ($FILE_NAME)
                               48 macb r/rr-xr-xr-x 0        0        26-144-2 /$Extend/$Reparse:$R
                               82 macb r/rr-xr-xr-x 0        0        26-48-1  /$Extend/$Reparse ($FILE_NAME)
Wed Dec 31 2008 22:44:17       48 m..b d/drwxrwxrwx 0        0        27-144-1 /RAW
                               72 macb d/drwxrwxrwx 0        0        27-48-4  /RAW ($FILE_NAME)
Wed Dec 31 2008 22:44:28       48 ..c. d/drwxrwxrwx 0        0        27-144-1 /RAW
Wed Dec 31 2008 22:44:33       48 m..b d/drwxrwxrwx 0        0        28-144-1 /Compressed
                               86 macb d/drwxrwxrwx 0        0        28-48-4  /Compressed ($FILE_NAME)
Wed Dec 31 2008 22:44:36       48 ..c. d/drwxrwxrwx 0        0        28-144-1 /Compressed
Wed Dec 31 2008 22:44:43       48 m..b d/drwxrwxrwx 0        0        29-144-1 /Encrypted
                               84 macb d/drwxrwxrwx 0        0        29-48-4  /Encrypted ($FILE_NAME)
Wed Dec 31 2008 22:45:03       48 .a.. d/drwxrwxrwx 0        0        28-144-1 /Compressed
Wed Dec 31 2008 22:45:14       48 .a.. d/drwxrwxrwx 0        0        29-144-1 /Encrypted
Wed Dec 31 2008 22:45:15       48 ..c. d/drwxrwxrwx 0        0        29-144-1 /Encrypted
                               48 macb d/dr-xr-xr-x 0        0        30-144-1 /System Volume Information
                              116 macb d/dr-xr-xr-x 0        0        30-48-2  /System Volume Information ($FILE_NAME)
Wed Dec 31 2008 22:45:24       48 ma.b -/drwxrwxrwx 0        0        31-144-1 /Compressed and Encrypted (deleted)
                              114 macb -/drwxrwxrwx 0        0        31-48-4  /Compressed and Encrypted ($FILE_NAME) (deleted)
Wed Dec 31 2008 22:45:28       48 ..c. -/drwxrwxrwx 0        0        31-144-1 /Compressed and Encrypted (deleted)
Wed Dec 31 2008 22:45:50       48 .a.. d/drwxrwxrwx 0        0        27-144-1 /RAW
```

> This timeline tells you the sequence of events that created, modified, and deleted folders, all at approximately the same minute on December 31, 2008. This indicates that the device was either new or formatted/rebooted at the same time.

**Important Notes:**

1. System File Creation

   * The primary NTFS files (MFT, $LogFile, $Bitmap, etc.) were initially created at approximately 22:44:02.

   * This is normal during partition formatting.

2. Volume Creation

   * `/RAW` was created at 22:44:17.

   * `/Compressed` at 22:44:33.

   * `/Encrypted` at 22:44:43.

3. Unusual Activity

   * At 22:45:24, a folder named "Compressed and Encrypted" was created, but it was listed as "deleted," meaning it was created and then deleted within a very short time.

   * At 22:45:50, an access update was performed on the `/RAW` folder.

***

### You've finally reached your goal of acquiring and preserving light. You've successfully mounted the RAW image, created a file index, and even started creating a Timeline.

**The next step in analyzing NTFS1 is essential:**

```bash
sansforensics@as: ~/mnt/ntfs1
$ ls -la Encrypted/
total 4
drwxrwxrwx 1 root root    0 Dec 31  2008 .
drwxrwxrwx 1 root root 4096 Dec 31  2008 ..
sansforensics@as: ~/mnt/ntfs1
$ ls -la RAW/
total 4
drwxrwxrwx 1 root root    0 Dec 31  2008 .
drwxrwxrwx 1 root root 4096 Dec 31  2008 ..
sansforensics@as: ~/mnt/ntfs1
$ ls -la System\ Volume\ Information/
total 4
drwxrwxrwx 1 root root    0 Dec 31  2008 .
drwxrwxrwx 1 root root 4096 Dec 31  2008 ..
sansforensics@as: ~/mnt/ntfs1
$ ls -la Compressed/
total 4
drwxrwxrwx 1 root root    0 Dec 31  2008 .
drwxrwxrwx 1 root root 4096 Dec 31  2008 ..
```

> * The Compressed folder (and other folders) are empty during normal browsing. This usually means that the files are either:
>
> * Deleted from the MFT, but the data is still present in unallocated space.
>
> * Or they are hidden/orphaned and not linked to a file directory.
>
> * To analyze Compressed in this case, we'll work on two levels:

1. Search for files in the folder via the MFT :

```bash
sansforensics@as: ~/DF-LAB
$ fls -rp ntfs1.raw
r/r 4-128-4:	$AttrDef
r/r 8-128-2:	$BadClus
r/r 8-128-1:	$BadClus:$Bad
r/r 6-128-1:	$Bitmap
r/r 7-128-1:	$Boot
d/d 11-144-4:	$Extend
r/r 25-144-2:	$Extend/$ObjId:$O
r/r 24-144-3:	$Extend/$Quota:$O
r/r 24-144-2:	$Extend/$Quota:$Q
r/r 26-144-2:	$Extend/$Reparse:$R
r/r 2-128-1:	$LogFile
r/r 0-128-1:	$MFT
r/r 1-128-1:	$MFTMirr
r/r 9-128-8:	$Secure:$SDS
r/r 9-144-6:	$Secure:$SDH
r/r 9-144-5:	$Secure:$SII
r/r 10-128-1:	$UpCase
r/r 3-128-3:	$Volume
d/d 28-144-1:	Compressed
d/d 29-144-1:	Encrypted
d/d 27-144-1:	RAW
d/d 30-144-1:	System Volume Information
-/d * sansforensics@as: ~/DF-LAB
$ fls -rpa ntfs1.raw 28-144-1
d/d 28-144-1:	.
d/d 5-144-6:	..
sansforensics@as: ~/DF-LAB
$ fls -rpa ntfs1.raw 29-144-1
d/d 29-144-1:	.
d/d 5-144-6:	..
sansforensics@as: ~/DF-LAB
$ fls -rpa ntfs1.raw 30-144-1
d/d 30-144-1:	.
d/d 5-144-6:	..
sansforensics@as: ~/DF-LAB
$ fls -rpa ntfs1.raw 31-144-1
d/d * 31-144-1:	.
d/d * 5-144-6(realloc):	..
sansforensics@as: ~/DF-LAB
$ fls -rpa ntfs1.raw 27-144-1
d/d 27-144-1:	.
d/d 5-144-6:	..
:	Compressed and Encrypted
V/V 32:	$OrphanFiles
```

> What you're seeing here is the entire MFT listing from fls. This shows that the compressed and encrypted files/folders are actually present in the NTFS metadata, even if they don't appear when you run ls in the mount.
>
> 📌 The important results:
>
> * d/d 28-144-1: Compressed → Compressed volume.
>
> * d/d 29-144-1: Encrypted → Encrypted volume.
>
> * d/d 27-144-1: RAW → A regular volume named RAW.
>
> * d/d 30-144-1: System Volume Information → System volume.
>
> * -/d *31-144-1: Compressed and Encrypted → Compressed and encrypted volume (marked with a* , indicating that it was deleted).
>
> * V/V 32: $OrphanFiles → Orphan files (files located unlinked in any directory).
>
> 💡 Why were these directories empty when I ran ls? Because the files inside them could be:
>
> 1. Deleted (but their data is in unallocated space).
>
> 2. Or hidden (Hidden/System) and not visible in a normal mount.

### **🔹 The next logical step is to browse the contents of these directories by the inode number that appears .**

* For Compressed folder:

  ```bash
  sansforensics@as: ~/DF-LAB
  $ fls -rpa ntfs1.raw 28-144-1
  d/d 28-144-1:	.
  d/d 5-144-6:	..
  sansforensics@as: ~/DF-LAB
  $ fls -rpa ntfs1.raw 29-144-1
  d/d 29-144-1:	.
  d/d 5-144-6:	..
  sansforensics@as: ~/DF-LAB
  $ fls -rpa ntfs1.raw 30-144-1
  d/d 30-144-1:	.
  d/d 5-144-6:	..
  sansforensics@as: ~/DF-LAB
  $ fls -rpa ntfs1.raw 31-144-1
  d/d * 31-144-1:	.
  d/d * 5-144-6(realloc):	..
  sansforensics@as: ~/DF-LAB
  $ fls -rpa ntfs1.raw 27-144-1
  d/d 27-144-1:	.
  d/d 5-144-6:	..
  sansforensics@as: ~/DF-LAB
  $ fls -rpa ntfs1.raw
  r/r 4-128-4:	$AttrDef
  r/r 8-128-2:	$BadClus
  r/r 8-128-1:	$BadClus:$Bad
  r/r 6-128-1:	$Bitmap
  r/r 7-128-1:	$Boot
  d/d 11-144-4:	$Extend
  d/d 11-144-4:	$Extend/.
  d/d 5-144-6:	$Extend/..
  r/r 25-144-2:	$Extend/$ObjId:$O
  r/r 24-144-3:	$Extend/$Quota:$O
  r/r 24-144-2:	$Extend/$Quota:$Q
  r/r 26-144-2:	$Extend/$Reparse:$R
  r/r 2-128-1:	$LogFile
  r/r 0-128-1:	$MFT
  r/r 1-128-1:	$MFTMirr
  r/r 9-128-8:	$Secure:$SDS
  r/r 9-144-6:	$Secure:$SDH
  r/r 9-144-5:	$Secure:$SII
  r/r 10-128-1:	$UpCase
  r/r 3-128-3:	$Volume
  d/d 5-144-6:	.
  d/d 28-144-1:	Compressed
  d/d 28-144-1:	Compressed/.
  d/d 5-144-6:	Compressed/..
  d/d 29-144-1:	Encrypted
  d/d 29-144-1:	Encrypted/.
  d/d 5-144-6:	Encrypted/..
  d/d 27-144-1:	RAW
  d/d 27-144-1:	RAW/.
  d/d 5-144-6:	RAW/..
  d/d 30-144-1:	System Volume Information
  d/d 30-144-1:	System Volume Information/.
  d/d 5-144-6:	System Volume Information/..
  -/d * 31-144-1:	Compressed and Encrypted
  d/d * 31-144-1:	Compressed and Encrypted/.
  d/d * 5-144-6(realloc):	Compressed and Encrypted/..
  V/V 32:	$OrphanFiles
  ```

  ### Continued Analysis: Browsing Directory Contents by Inode

  After identifying the directory inode numbers for the different folders (`Compressed`, `Encrypted`, `RAW`, `System Volume Information`, and `Compressed and Encrypted`), I attempted to list their contents using the `fls` tool with the recursive and full path options:

  ```bash
  $ fls -rpa ntfs1.raw 28-144-1
  d/d 28-144-1:	.
  d/d 5-144-6:	..

  $ fls -rpa ntfs1.raw 29-144-1
  d/d 29-144-1:	.
  d/d 5-144-6:	..

  $ fls -rpa ntfs1.raw 30-144-1
  d/d 30-144-1:	.
  d/d 5-144-6:	..

  $ fls -rpa ntfs1.raw 31-144-1
  d/d * 31-144-1:	.
  d/d * 5-144-6(realloc):	..

  $ fls -rpa ntfs1.raw 27-144-1
  d/d 27-144-1:	.
  d/d 5-144-6:	..
  ```

> The output shows that these directories contain only the standard `.` and `..` entries, indicating they appear empty when browsed through their inode numbers.
>
> Performing a full recursive listing on the image again confirms the presence of these folders and their metadata entries:

```bash
$ fls -rpa ntfs1.raw
...
d/d 28-144-1:	Compressed
d/d 29-144-1:	Encrypted
d/d 27-144-1:	RAW
d/d 30-144-1:	System Volume Information
-/d * 31-144-1:	Compressed and Encrypted
V/V 32:	$OrphanFiles
```

> ### Interpretation:
>
> * The `Compressed` and `Encrypted` directories are present in the Master File Table (MFT) but contain no visible files or folders.
>
> * The `Compressed and Encrypted` folder is marked as deleted (indicated by the `*` and `(realloc)` flags).
>
> * `$OrphanFiles` (inode 32) exists but contains no visible entries.
>
> * This suggests that files in these directories may have been deleted, moved, or hidden, making direct recovery challenging.

### Attempted File Extraction with `icat`

After listing directory contents showed no visible files, I attempted to extract files directly from the directory inodes using the `icat` tool:

```bash
$ icat -r ntfs1.raw 28-144-1
$ icat -r ntfs1.raw 29-144-1
$ icat -r ntfs1.raw 30-144-1
$ icat -r ntfs1.raw 31-144-1
$ icat -r ntfs1.raw 27-144-1
```

> All commands returned empty outputs, indicating that no recoverable files were extracted from these inodes.
>
> This confirms that either:
>
> * The files in these directories have been deleted and their metadata cleared.
>
> * Or the files are encrypted or compressed in a way that prevents direct extraction without proper handling.

***

### The next step after we extracted the empty files with icat:

File Carving for Lost Files Use tools like Foremost or Scalpel to scan the raw image and search for file data based on their file signatures.

This will help you recover files even if the metadata is deleted.

```bash
sansforensics@as: ~/DF-LAB
$ foremost -i ntfs1.raw -o carved_files/
Processing: ntfs1.raw
|*****|
```

> This means that `foremost` has started working and is trying to extract files.

View the contents of the carved\_files folder:

```bash
sansforensics@as: ~/DF-LAB/carved_files
$ ls
audit.txt
```

> The result is that foremost was able to produce only one file, audit.txt, which is usually a report file containing details of the carving process itself.

```bash
sansforensics@as: ~/DF-LAB/carved_files
$ cat audit.txt 
Foremost version 1.5.7 by Jesse Kornblum, Kris Kendall, and Nick Mikus
Audit File

Foremost started at Sun Aug 10 04:48:31 2025
Invocation: foremost -i ntfs1.raw -o carved_files/ 
Output directory: /home/sansforensics/DF-LAB/carved_files
Configuration file: /etc/foremost.conf
------------------------------------------------------------------
File: ntfs1.raw
Start: Sun Aug 10 04:48:31 2025
Length: 492 MB (516554752 bytes)
 
Num	 Name (bs=512)	       Size	 File Offset	 Comment 

Finish: Sun Aug 10 04:48:36 2025

0 FILES EXTRACTED
	
------------------------------------------------------------------

Foremost finished at Sun Aug 10 04:48:36 2025
```

> The audit.txt confirms that foremost was unable to extract any files from the NTFS1.raw image.
>
> This means:
>
> There are no files directly extractable through carving using foremost.
>
> The files that are present may not have been deleted or may have been hidden in a special way (such as compressed or encrypted files).
>
> Or the files may be fragmented or incoherent.

***

### Photorec, because it is a powerful carving tool that handles many file types in depth.

```bash
sudo photorec ntfs1.raw
```

> You see "0 files saved" with a "Recovery completed" message, meaning it couldn't find any recoverable files in the image (ntfs1.raw) under the settings you selected.
>
> This could be due to:
>
> * The files are permanently deleted or completely missing.
>
> * The files are not in the locations PhotoRec searches (such as unallocated space if you chose to scan only the designated area).
>
> * The files are not in a known format or are corrupted.
>
> * The image itself contains compressed or encrypted files, and therefore requires additional steps to decrypt or unzip them before extracting them.

```bash
sansforensics@as: ~/DF-LAB
$ ls -la recup_dir.*
recup_dir.1:
total 16
drwxr-xr-x 2 root          root          4096 Aug 10 05:00 .
drwxrwxr-x 8 sansforensics sansforensics 4096 Aug 10 05:18 ..
-rw-r--r-- 1 root          root          6890 Aug 10 05:00 report.xml

recup_dir.2:
total 16
drwxr-xr-x 2 root          root          4096 Aug 10 05:00 .
drwxrwxr-x 8 sansforensics sansforensics 4096 Aug 10 05:18 ..
-rw-r--r-- 1 root          root          6075 Aug 10 05:01 report.xml

recup_dir.3:
total 12
drwxr-xr-x 2 root          root          4096 Aug 10 05:01 .
drwxrwxr-x 8 sansforensics sansforensics 4096 Aug 10 05:18 ..
-rw-r--r-- 1 root          root          1430 Aug 10 05:18 report.xml
sansforensics@as: ~/DF-LAB
$ cat recup_dir.1/report.xml | less
```

> 📌 Interpretation of Results: No Recovered Files:
>
> * If there were recovered files, they would have names like f1234567.jpg or f0000001.doc.
>
> * The presence of only reports supports your previous conclusion that the disk image (ntfs1.raw) contains no recoverable deleted files.
>
> * Why PhotoRec creates report files:
>
> * Some versions of PhotoRec automatically generate these reports even if no files have been recovered.
>
> * The tool may have found fragments of data but did not match known file signatures.

***

***

### Final Report - NTFS1 Image Analysis

1. **Basic Information File Name: ntfs1-gen0.E01**

* Data Source: DigitalCorpora - nps-2009-ntfs1

* Image Type: EnCase EWF (.E01)

* File System: NTFS (Windows XP)

* Researcher: Abdelwahab Shandy

* Analysis Date: August 10, 2025

2. **Data Integrity Verification The image was downloaded and analyzed with integrity maintained via hash verification:**

   * SHA-256: 96e525f53d50f986461151f8e9c07588633215477a6b8a3f744b2eeebe512460

   * MD5 (inside image): 56abc8bc1c01f9ceb262c50a64c134c5

   * ✅ Result: There are no changes to the original data.

3. **File System Analysis A. General Structure Root Volume Name: NTFS1**

Main Folders:

* Compressed (compressed volume)

* Encrypted (encrypted volume)

* RAW (unprocessed data)

* System Volume Information (Windows system data)

* Compressed and Encrypted (deleted volume)

B. Files and Folders fls -rpa ntfs1.raw showed:

* There are no user files in any of the folders.

* The folders appear empty even with advanced tools like fls and icat.

* The "Compressed and Encrypted" folder has been deleted.

C. Activity Timeline Image created on: December 31, 2008 \~22:44 UTC

Folders created in sequence:

* /RAW (22:44:17)

* /Compressed (22:44:33)

* /Encrypted (22:44:43)

* /Compressed and Encrypted (created and deleted at 22:45:24)

4. Attempts to recover deleted files a. Using PhotoRec Created folders recup\_dir.1 to recup\_dir.3 containing:

   * report.xml: PhotoRec scan logs (no recovered files).

   * Result: No files recovered from unallocated space.

b. Using Foremost Scanned the entire image, but the result was:

* 0 recovered files.

c. Analyzing Unallocated Space (unallocated.dd) Strings unallocated.dd did not reveal any readable user data.

5. Final Conclusions ✅ What We Found: The image contains a clean NTFS structure with no actual user files.

* The Compressed and Encrypted folders are empty, even with advanced tools.

* No evidence of recoverable deleted files.

* ❌ What We Didn't Find: No compressed files in /Compressed.

* No encrypted files in /Encrypted.

* No traces of user files in the unallocated space.

6. Recommendations If the goal is training:

* This image is suitable for analyzing the basic NTFS structure, but it does not contain actual files for data recovery practice.

If the goal is research:

* It is preferable to use other disk images containing compressed/encrypted files, such as nps-2010-emails.

For further analysis:

* Specialized EFS decryption tools can be tried if there is any suspicion that encrypted files are present.

7. ### Researcher's Signature

   \- The analysis was completed on August 10, 2025, with confirmation that all procedures followed digital forensics best practices.

   \- Researcher: Abdelwahab Shandy

***

### 🎯 Conclusion:

**The ntfs1-gen0.E01 image is a clean test disk showing an NTFS structure without actual user data. There is no evidence of recoverable compressed or encrypted files.**

