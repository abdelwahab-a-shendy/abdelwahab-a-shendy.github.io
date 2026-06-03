---
id: "68ee5d208cd4c12711cc009f"
title: "Secret of the Polyglot : picoCtf"
description: "Can you extract all the information"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/secret-of-the-polyglot-picoctf"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T14:24:32.978Z"
updatedAt: "2026-01-25T15:35:46.958Z"
---

# Digital Forensics Report (DFIR)

**Case Title:** Secret of the Polyglot – picoCTF\
**Author:** syreal\
**Date:** August 23, 2025\
**Investigator:** Abdelwahab Shandy

***

## 1) Identification

**Description:**\
A suspicious file named `flag2of2-final.pdf` was identified. The file raised concerns because it appeared to contain multiple formats simultaneously (both PDF and PNG).

**Indicators of Compromise (IOCs):**

* File Name: `flag2of2-final.pdf`

* File Size: 3.3 KB

* Suspicion: The file exhibits dual-format characteristics (Polyglot file).

***

## 2) Acquisition

* The file was downloaded from the challenge server using:

  ```bash
  wget https://artifacts.picoctf.net/c_titan/99/flag2of2-final.pdf
  ```

* An exact copy was saved as `SecretofthePolyglot.pdf`.

* An additional version was created as `SecretofthePolyglot.png` to ensure no data was lost during analysis.

***

## 3) Preservation

* File permissions and integrity were verified to prevent accidental modification during analysis:

  * Permissions: `rw-rw-r--`

* A working copy was stored in a separate directory, leaving the original untouched.

* Access and modification timestamps were documented:

  * Modify Date: 2024-03-12

  * Access Date: 2025-08-23

***

## 4) Analysis

**File Type Examination:**

* `file` utility identified the object as a **PNG image (50×50)**.

* However, embedded **PDF data** was also detected.

**Metadata Analysis (ExifTool):**

* Created using **GIMP**.

* Comment field: “Created with GIMP.”

* Warning: “Trailer data after PNG IEND chunk” → Indicates hidden data appended after the PNG image.

**Binwalk Analysis:**\
Revealed the following structures inside the file:

* PNG image

* PDF document version 1.4

* Zlib compressed data

**Data Extraction (binwalk -e):**

* Extraction produced a folder `_SecretofthePolyglot.png.extracted`.

* Contents included:

  * `47D` → contained ASCII text:

    ```bash
    (1n_pn9_&_pdf_2a6a1ea8})
    ```

  * `47D.zlib` → compressed data requiring further review.

**Results:**

* The **first part** of the flag was found directly in the PNG image:

  ```bash
  picoCTF{f1u3n7_
  ```

* The **second part** of the flag was found in the extracted ASCII text:

  ```bash
  1n_pn9_&_pdf_2a6a1ea8}
  ```

***

## 5) Reporting

**Conclusion:**\
The suspicious file was a **Polyglot file** containing PNG, PDF, and Zlib compressed segments. Using forensic tools (`file`, `exiftool`, and `binwalk`), both embedded and hidden content were successfully extracted.

**Final Flag:**

```bash
picoCTF{f1u3n7_1n_pn9_&_pdf_2a6a1ea8}
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

