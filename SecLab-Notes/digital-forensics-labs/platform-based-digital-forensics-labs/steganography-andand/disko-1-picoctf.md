---
id: "68ee5a79edf9226b324ace4d"
title: "DISKO 1 : PicoCtf"
description: "Can you find the flag in this disk image ?"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/disko-1-picoctf"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T14:13:13.264Z"
updatedAt: "2026-01-25T15:35:46.919Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760451344995/bfd7999a-cfb3-42d2-9730-306d3543e91f.png" align="center" fullwidth="false" />

# 🧪 DISKO-1 Lab Solution | PicoCTF

## 1️⃣ Identification

The challenge requires retrieving the **flag** from a disk image named:\
`disko-1.dd.gz`

After extraction, the file type was identified as:

```bash
file disko-1.dd
disko-1.dd: DOS/MBR boot sector ... FAT (32 bit)
```

➡️ This confirms that the file is a **FAT32 File System Image**.

***

## 2️⃣ Acquisition

The disk image was downloaded from PicoCTF’s official source:

```bash
sansforensics@as: ~/CTF-DF
$ wget https://artifacts.picoctf.net/c/538/disko-1.dd.gz
--2025-08-20 22:49:01--  https://artifacts.picoctf.net/c/538/disko-1.dd.gz
Resolving artifacts.picoctf.net (artifacts.picoctf.net)... 13.226.175.87, 13.226.175.57, 13.226.175.125, ...
Connecting to artifacts.picoctf.net (artifacts.picoctf.net)|13.226.175.87|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 20484476 (20M) [application/octet-stream]
Saving to: ‘disko-1.dd.gz’

disko-1.dd.gz       100%[===================>]  19.54M   583KB/s    in 27s     

2025-08-20 22:49:29 (754 KB/s) - ‘disko-1.dd.gz’ saved [20484476/20484476]
```

Then decompressed:

```bash
sansforensics@as: ~/CTF-DF
$ gzip -d disko-1.dd.gz 
sansforensics@as: ~/CTF-DF
$ ls -la
total 51208
drwxrwxr-x  2 sansforensics sansforensics     4096 Aug 20 22:49 .
drwxr-xr-x 17 sansforensics sansforensics     4096 Aug 20 22:48 ..
-rw-rw-r--  1 sansforensics sansforensics 52428800 May 15 18:48 disko-1.dd
```

📂 The final extracted file size was **50MB**.

***

## 3️⃣ Preservation

To maintain evidence integrity, a duplicate copy was created:

```bash
sansforensics@as: ~/CTF-DF
$ cp disko-1.dd TheFileCtfPico
```

The integrity was verified using **SHA256 hashing**:

```bash
sansforensics@as: ~/CTF-DF
$ sha256sum disko-1.dd TheFileCtfPico
062ce2c9876bd9b72aca9c071b39f4f3b09e8c4c96cd8c939ff1fd6452fc5286  disko-1.dd
062ce2c9876bd9b72aca9c071b39f4f3b09e8c4c96cd8c939ff1fd6452fc5286  TheFileCtfPico
```

✅ Both hashes match, proving the duplicate is identical to the original.

***

## 4️⃣ Analysis

* Initial inspection with `file` , `stat` and `exiftool` → no significant metadata found.

* A deeper search was performed with `strings` and filtered for `CTF`:

```bash
sansforensics@as: ~/CTF-DF
$ strings TheFileCtfPico | grep ctf
checkpoint_fullfignore_check_conjournal_size_limrecursive_triggewal_autocheckpoicase_sensitive_ldont_ask_collatipromptsqltabsinntabsinnewprojectformatted_fg_colformatted_bg_colsyntaxhighlightesavedefaultlocathideschemalinebrDBFileExtensionshorizontal_tilinerror_indicatorsidentifier_quoteforeground_colouwebkitEpochLocal
margins,rectfill
-gctf
ctf_debug_info_level

sansforensics@as: ~/CTF-DF
$ strings TheFileCtfPico | grep CTF
MIIEogIBAAKCAQEA7UtSJPeCTF+m2SQKy+sT3XRGb8oQMr+QRSkicJvjY7xkDUdI
Generate CTF debug information at default level.
picoCTF{1t5_ju5t_4_5tr1n9_}
debug/dwarf.(*LineReader).readLNCTFormat
type:.uGWYCTFu

sansforensics@as: ~/CTF-DF
$ strings TheFileCtfPico | grep picoCTF
picoCTF{1t5_ju5t_4_5tr1n9_Try_it _yourself}
```

This revealed the **flag**:

```bash
picoCTF{1t5_ju5t_4_5tr1n9_Try_it_yourself}
```

➡️ The flag was hidden in plain text inside the raw disk image.

***

## 5️⃣ Reporting

### 🎯 Summary

* **Challenge**: Analyze a FAT32 disk image to recover a hidden flag.

* **Tools used**:\
  `wget`, `gzip`, `file`, `sha256sum`, `exiftool`, `strings`, `grep`, `cp` `stat` .

### ✔️ Steps Taken

1. Identified the file type (FAT32 disk image).

2. Acquired and extracted the image.

3. Preserved integrity with hashing and duplication.

4. Analyzed with `strings` to locate hidden data.

5. Successfully recovered the flag.

### ✅ Recovered Flag

```bash
picoCTF{1t5_ju5t_4_5tr1n9_Try_it_yourself}
```

***

## 🔍 Extra Forensic Insights

### Why `strings` was effective?

* FAT32 doesn’t store files in an encrypted way by default.

* Deleted/hidden data may still remain in **unallocated or slack space**.

* The `strings` tool scans raw sectors and extracts readable text, regardless of filesystem references.

* That’s why the flag appeared directly as a plain string.

### Why verify integrity with hashing?

* In real forensics, **chain of custody** is critical.

* Using `sha256sum` ensures every copy is validated.

* Prevents accidental alteration and makes findings admissible in legal/forensic contexts.

### Alternative approaches

* Mounting the image directly:

  ```bash
  mount -o loop disko-1.dd /mnt/test
  ```

* Using forensic suites like **Autopsy** or **Sleuth Kit** (`fls`, `icat`) to extract files.

* In this challenge, however, `strings | grep` was the fastest solution.

### Key Lesson Learned

* Not every challenge requires complex carving or advanced tools.

* Start simple (`file`, `exiftool`, `strings`) before moving to heavier frameworks.

* Often, hidden data is just a **string in raw disk space**.

***

> ***💬 "Control the code, and you control the world." 🔐 From wiping metadata to gaining root access — every step is documented and my goal is to deeply understand the system, not just hack!***
>
> [***Abdelwahab***](https://abdelwahabshandy.hashnode.dev/) [***Shandy***](https://abdelwahabshandy.hashnode.dev/)
>
> [***Linke***](https://abdelwahabshandy.hashnode.dev/)[***din***](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)
>
> [***G***](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)[***itHub***](https://github.com/abdelwahab-ahmed-shandy)
>
> ***See You Soon***
>
> ***AS Cyber “)).***

