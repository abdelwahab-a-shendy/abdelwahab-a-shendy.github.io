
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760454200626/6c0190c9-7d25-49fa-b32b-06aa31f46acd.png" align="center" fullwidth="false" />

# 🕵️‍♂️ Digital Forensics Report

## 🎯 Challenge: Search in Trash

**Platform**: CyberTalents\
**Category**: Digital Forensics\
**Objective**: Identify the hidden flag inside a recovered Windows Recycle Bin file.

***

## 🧩 1. Identification

> **Scenario**:\
> The user reports a data loss incident where their hard drive was damaged. However, a file related to the Windows Recycle Bin (INFO2 format) was recovered.\
> The primary objective is to analyze the recovered file and identify the hidden flag, if present.

***

## 📥 2. Acquisition

> **Goal**: Obtain and preserve a copy of the evidence file for analysis.

**Command Used**:

```bash
sansforensics@as: ~/DF-LAB
$ wget  https://hubchallenges.s3.eu-west-1.amazonaws.com/forensics/search-trash
--2025-08-06 03:55:18--  https://hubchallenges.s3.eu-west-1.amazonaws.com/forensics/search-trash
Resolving hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)... 52.218.109.232, 3.5.69.166, 3.5.69.192, ...
Connecting to hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)|52.218.109.232|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 81620 (80K) [binary/octet-stream]
Saving to: ‘search-trash’

search-trash                            100%[=============================================================================>]  79.71K   481KB/s    in 0.2s    

2025-08-06 03:55:19 (481 KB/s) - ‘search-trash’ saved [81620/81620]
```

**Download Details**:

* File Name: `search-trash`

* Size: `81620 bytes (≈80 KB)`

* Type: Binary (initially unknown)

***

## 🔐 3. Preservation

> **Goal**: Ensure data integrity and avoid altering the original file.

**Steps Taken**:

```bash
sansforensics@as: ~/DF-LAB
$ ls
search-trash
sansforensics@as: ~/DF-LAB
$ ls -la
total 88
drwxrwxr-x  2 sansforensics sansforensics  4096 Aug  6 03:55 .
drwxr-xr-x 18 sansforensics sansforensics  4096 Jul 27 23:52 ..
-rw-rw-r--  1 sansforensics sansforensics 81620 Dec  3  2024 search-trash
```

After Obtaining the file , we must make a copy to work on and to save the original copy :

```bash
sansforensics@as: ~/DF-LAB
$ cp search-trash /home/sansforensics/DF-LAB/Copy-SearchTrash
```

To ensure that the files will not be changed , **SHA-256 Hash Check**:

```bash
sansforensics@as: ~/DF-LAB
$ sha256sum Copy-SearchTrash 
17c564655e030dcdafc18c17bb353cba758b638aa69306506828ceb5478c92cd  Copy-SearchTrash
sansforensics@as: ~/DF-LAB
$ sha256sum search-trash 
17c564655e030dcdafc18c17bb353cba758b638aa69306506828ceb5478c92cd  search-trash
```

✅ The hashes match — the copy is identical to the original.

We will Start the analysis now .

***

## 🔍 4. Analysis

### 🔸 4.1 File Type Identification

```bash
sansforensics@as: ~/DF-LAB
$ file Copy-SearchTrash 
Copy-SearchTrash: Windows Recycle Bin INFO2 file (Win2k - WinXP)
```

> 📌 The file is in the legacy `INFO2` format used by Windows to store Recycle Bin metadata.

### 🔸 4.2 Metadata Examination

### **The** `stat` **command is used to display detailed information about a file :**

* To know the actual file size and its internal properties :

```bash
sansforensics@as: ~/DF-LAB
$ stat Copy-SearchTrash 
  File: Copy-SearchTrash
  Size: 81620     	Blocks: 160        IO Block: 4096   regular file
Device: 802h/2050d	Inode: 3150185     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/sansforensics)   Gid: ( 1000/sansforensics)
Access: 2025-08-06 04:02:26.431632486 +0000
Modify: 2025-08-06 04:02:02.695633614 +0000
Change: 2025-08-06 04:02:02.695633614 +0000
 Birth: -
```

### **Examine the metadata using** `exiftool` **(or exif) :**

```bash
sansforensics@as: ~/DF-LAB
$ exiftool Copy-SearchTrash 
ExifTool Version Number         : 11.88
File Name                       : Copy-SearchTrash
Directory                       : .
File Size                       : 80 kB
File Modification Date/Time     : 2025:08:06 04:02:02+00:00
File Access Date/Time           : 2025:08:06 04:02:26+00:00
File Inode Change Date/Time     : 2025:08:06 04:02:02+00:00
File Permissions                : rw-rw-r--
Error                           : Unknown file type
```

> 🧾 File statistics and timestamps confirm no modification since acquisition.

### 🔸 4.3 Content Inspection

**I tried to read the file to find out the content, but it was like this using** `head`**:**

```bash
$ 
sansforensics@as: ~/DF-LAB
$ head -n 5 Copy-SearchTrash 
 :\ar.txt`�v
            ���(H:\ar.txt:\ast.txt`�v
                                     ���H:\ast.txt:\az.txt`�v
                                                             ���&H:\az.txt:\ba.txt`�v
                                                                                     ���,H:\ba.txt:\be.txt`�v
                                                                                                             ���0H:\be.txt:\bg.txt`�v
                                                                                                                                     ���4H:\bg.txt:\bn.txt`�v
                                                                                                                                                             ���<H:\bn.txt:\br.tx`�v
                      ���H:\br.txt:\ca.txt	`�v
                                                   ���H:\ca.txt:\co.txt
`�v
   ���*H:\co.txt:\cs.txt
                        `�v
                           ��� H:\cs.txt:\cy.txt
                                                `�v
`�v                                                ���H:\cy.txt:\da.txt
   ���"H:\da.txt:\de.txt`�v
                           ���&H:\de.txt:\el.txt`�v
                                                   ���DH:\el.txt:\eo.txt`�v
                                                                           ���H:\eo.txt:\es.txt`�v
                                                                                                  ��� H:\es.txt:\et.txt`�v
                                                                                                                          ���H:\et.txt:\eu.txt`�v
                                                                                                                                                 ���$H:\eu.txt:\ext.txt`�v
            ��� H:\ext.txt:\fa.txt`�v
                                     ���,H:\fa.txt:\fi.txt`�v
                                                             ���$H:\fi.txt:\FLag{Fat_32_DF_2}.txt`�v
                                                                                                    ���H:\FLag{Fat_32_DF_2}.txt:\fr.txt`�v
                                                                                                                                          ���(H:\fr.txt:\fur.txt`�v
     ���H:\fur.txt:\fy.txt�`�v
                              ����H:\fy.txt:\ga.txt�v
                                                     ���"H:\ga.txt:\gl.txt`�v
                                                                             ���H:\gl.txt:\gu.txt`�v
                                                                                                    ���HH:\gu.txt:\he.txt`�v
                                                                                                                            ���&H:\he.txt:\hi.txt`�v
                                                                                                                                                    ���HH:\hi.txt:\hr.txt `�v
               ���"H:\hr.txt:\hu.txt!`�v
                                        ��� H:\hu.txt:\hy.txt"`�v
                                                                 ���8H:\hy.txt:\icuuc51.dll#`�v
                                                                                               ���2H:\icuuc51.dll:\id.txt$`�v
                                                                                                                             ���"H:\id.txt:\idriver.dll%`�v
                                                                                                                                                           ���2H:\idriver.dll:\ikernel.dll&`�v
                                ����H:\ikernel.dll:\io.txt'`�v
                                                              ���H:\io.txt:\is.txt(`�v
                                                                                      ��� H:\is.txt:\IsoBuster.dll)`�v
                                                                                                                      ����:\IsoBuster.dll:\it.txt*`�v
                                                                                                                                                     ���&H:\it.txt:\ja.txt+tx
               ���.H:\ja.txt:\ka.txt,tx
                                       ���HH:\ka.txt:\kaa.txt-tx
                                                                ��� H:\kaa.txt:\kk.txt.tx
                                                                                         ���*H:\kk.txt:\ko.txt/tx
                                                                                                                 ���&H:\ko.txt:\ku.txt0tx
                                                                                                                                         ���H:\ku.txt:\ku-ckb.txt1tx
      ���2H:\ku-ckb.txt:\ky.txt2tx
                                  ���2H:\ky.txt:\libbfio.dll3tx
                                                               ����
H:\libbfio.dll:\lij.txt4tx
                          ��� H:\lij.txt:\LMS.dll5tx
                                                    ����<H:\LMS.dll:\LMS-FS.dll6tx
                                                                                  �����H:\LMS-FS.dll:\loader.exe.manifest7tx
                                                                                                                            ���H:\loader.exe.manifest:\lt.txt8tx
  ���&H:\lt.txt:\lv.txt9tx
                          ���H:\lv.txt:\MD5Remote.dll:tx
                                                        ����H:\MD5Remote.dll:\Microsoft.VC90.CRT.manifest;tx
                                                                                                            ��H:\Microsoft.VC90.CRT.manifest:\mk.txt<tx
                                                                                                                                                       ���$H:\mk.txt:\mn.txt=tx
                 ���"H:\mn.txt:\mng.txt>tx
                                          ���RH:\mng.txt:\mng2.txt?tx
                                                                     ���XH:\mng2.txt:\mr.txt@tx
                                                                                               ���,H:\mr.txt:\ms.txtAtx
                                                                                                                       ���H:\ms.txt:\msvcm90.dllBtx
                                                                                                                                                   ���nH:\msvcm90.dll:\msvcp90.dllCtx
                       ���H:\msvcp90.dll:\msvcr90.dllDtx
                                                        ���
H:\msvcr90.dll:\msvcr100.dllEtx
                               ����
                                   H:\msvcr100.dllH:\nb.txtFtx
                                                              ���H:\nb.txtH:\ne.txtGtx
                                                                                      ���6H:\ne.txtH:\nl.txtHtx
                                                                                                               ���$H:\nl.txtH:\nn.txtItx
                                                                                                                                        ���H:\nn.txtH:\pa-in.txtJtx
     ���<H:\pa-in.txtH:\PartitionWizard.exe.manifestKtx
                                                       ���H:\PartitionWizard.exe.manifestH:\pl.txtLtx
                                                                                                     ���$H:\pl.txtH:\ps.txtM�+�
                                                                                                                               ���"H:\ps.txtH:\pt.txtN�+�
                                                                                                                                                         ���&H:\pt.txtH:\pt-br.txtO�+�
                        ���&H:\pt-br.txtH:\QtCore4.dllP�+�
                                                          ����%H:\QtCore4.dllH:\QtGui4.dllQ�+�
                                                                                              ��}H:\QtGui4.dllH:\QtNetwork4.dllR�+�
H:\QtNetwork4.dllH:\ro.txtS`��                                                                                                     ����
                              ���H:\ro.txtH:\ru.txtT`��
                                                       ���:H:\ru.txtH:\sa.txtU`��
                                                                                 ���NH:\sa.txtH:\si.txtV`��
                                                                                                           ���DH:\si.txtH:\sk.txtW`��
                                                                                                                                     ���&H:\sk.txtH:\sl.txtX`��
 ����H:\sl.txtH:\sq.txtY`��
                           ���H:\sq.txtH:\sr-spc.txtZ`��
                                                        ���0H:\sr-spc.txtH:\sr-spl.txt[`��
                                                                                          ���H:\sr-spl.txtH:\sv.txt\`��
                                                                                                                       ���H:\sv.txtH:\ta.txt]`��
                                                                                                                                                ���4H:\ta.txtH:\th.txt^`��
            ���@H:\th.txtH:\tr.txt_`��
                                      ���H:\tr.txtH:\tt.txt``��
                                                               ���,H:\tt.txtH:\ug.txta`��
                                                                                         ���.H:\ug.txtH:\uk.txtb`��
                                                                                                                   ���<H:\uk.txtH:\uz.txtc`��
                                                                                                                                             ���H:\uz.txtH:\va.txtd`��
        ����H:\va.txtH:\vi.txte`��
                                  ���"H:\vi.txtH:\yo.txtf`��
                                                            ���,H:\yo.txt
sansforensics@as: ~/DF-LAB
```

🚩 Detected suspicious paths such as:

```bash
H:\fi.txt:\FLag{Fat_32_DF_2}.txt
```

### **Accordingly , We used** `strings` **:**

Then i found the flag indeed.

```bash
sansforensics@as: ~/DF-LAB
$ strings Copy-SearchTrash | head
:\ar.txt
:\ast.txt
:\az.txt
:\ba.txt
:\be.txt
:\bg.txt
:\bn.txt
:\br.txt
:\ca.txt
:\co.txt
```

We will extract the required flag using :

```bash
sansforensics@as: ~/DF-LAB
$ strings Copy-SearchTrash | grep -i "flag"
:\FLag{Fat_32_DF_2}.txt
```

🧠 **Interpretation**:

* The file appears to store a sequence of paths resembling a chain of deleted `.txt` files.

* Among them, one filename explicitly contains the flag in CTF format.

***

### **Fifth : Reporting Objective: Documenting the steps and final results.**

> This section documents all the steps, tools, and findings for future reference and audit.

### Summary:

| Step             | Tool/Command              | Outcome                             |
| ---------------- | ------------------------- | ----------------------------------- |
| File Acquisition | `wget`                    | File `search-trash` downloaded      |
| Preservation     | `cp`, `sha256sum`         | Integrity confirmed                 |
| File Type Check  | `file`                    | INFO2 (Windows Recycle Bin)         |
| Metadata         | `stat`, `exiftool`        | Timestamps consistent               |
| Analysis         | `head`, `strings`, `grep` | Flag extracted: `FLag{Fat_32_DF_2}` |

## 🧰 Tools Used:

* `wget`

* `file`

* `cp`, `sha256sum`

* `stat`, `exiftool`

* `head`, `strings`, `grep`

## ✅ Conclusion

The forensic analysis of the `search-trash` INFO2 file revealed a hidden flag embedded within what appears to be a chain of deleted text files. The flag was successfully identified using string analysis:

✅ Flag: FLag\{Fat\_32\_DF\_2}

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

