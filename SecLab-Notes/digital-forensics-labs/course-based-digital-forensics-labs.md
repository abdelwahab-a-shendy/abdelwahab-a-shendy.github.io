---
id: "688013925b9fa47e5ca9abaa"
title: "Course-Based DF-Labs"
description: "Course-Based Digital Forensics Labs , this section documents the hands-on labs I completed as part of structured digital forensics training courses.  "
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/course-based-digital-forensics-labs"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-07-22T22:41:22.371Z"
updatedAt: "2026-01-25T15:35:46.835Z"
---

***

## 🧪 Digital Forensics Fundamentals Labs

Hands-on labs covering foundational topics in digital forensics, including file system analysis, metadata inspection, and tool usage across Linux and Windows environments.

* ### 🔍 Real Case Study: BTK Killer

  Learn how metadata led to the arrest of the BTK serial killer.\
  Use the `stat` command in Linux to extract and analyze file timestamps.\
  📁 **Skills:** File system analysis, metadata interpretation

  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/file-analysis-using-the-stat-command-in-linux">🔗 View Lab</a>

* ### 🖼️ Image Analysis with `exiftool`, `exif`, and `GPS Metadata`

  Extract hidden data and locate where a photo was taken.\
  Perform deep analysis on image files to find EXIF and GPS metadata.\
  📁 **Skills:** Metadata extraction, privacy implications

  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/image-analysis-using-exiftool-and-exif-in-linux">🔗 View Lab</a>

* ### 🧮 File Properties Analysis in Windows

  Analyze file creation/modification/access times, authorship, and embedded metadata using built-in and 3rd-party tools.\
  📁 **Skills:** NTFS metadata inspection, alternate data streams

  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/analyzing-file-properties-in-digital-forensics-windows-example">🔗 View Lab</a>

* ### 🛡️ Using a Software Write Blocker

  Prevent evidence tampering by ensuring forensic soundness during analysis.\
  Understand how software write blockers work and when to use them.\
  📁 **Skills:** Evidence preservation, tool configuration

  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/explaining-the-use-of-software-write-blocker-in-digital-forensics">🔗 View Lab</a>

* ### ⚠️ Disk Acquisition Using Linux DD Command

  Learn how to take bit-by-bit disk images using `dd`, handling bad sectors and large drives.\
  📁 **Skills:** Command-line imaging, error handling

  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/lab-disk-acquisition-using-linux-dd-command">🔗 View Lab</a>

* ### ***🔐* Disk Acquisition Using AccessData FTK Imager on Windows**

  Acquire disk images without altering original content.\
  FTK Imager provides a GUI-based approach to forensic imaging.

  📁 **Skills :** GUI-based acquisition, image verification

  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/disk-acquisition-using-accessdata-ftk-imager-on-windows">🔗 View Lab</a>

* ### 🛡️🔍 Verifying the integrity of digital evidence using hashing And a practical application on Windows and Linux

  Understand how hashing ensures evidence has not been tampered with.\
  Includes hands-on hashing labs on **both Windows and Linux** .

  📁 **Skills :** MD5/SHA1/SHA256 usage, integrity checks

  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/verifying-the-integrity-of-digital-evidence-using-hashing-a-practical-application-on-windows-and-linux">🔗 View Lab</a>

* ### 🧭**Overview of Registry Hives & Extraction with FTK Imager**

  Understand the structure and significance of **Windows Registry Hives** in forensic analysis. Learn how to **locate, extract, and preserve registry hive files** using **AccessData FTK Imager**

  **📁 Skills :** Registry hive identification, FTK Imager extraction

  🔗 <a target="_blank" href="https://github.com/abdelwahab-ahmed-shandy/Complete-Study-Archive/blob/main/Digital%20Forensics/1-Digital%20Forensics%20Fundamentals/04-Analysis%20phase/0-Windows/01-Overview%20of%20Registry%20Hives%20%26%20Extraction%20with%20FTK%20Imager.md">View Lab</a>

* ### 🛠️ **Analysis using registry explorer & Shell bag explorer & regripper**

  Perform **in-depth registry analysis** using multiple specialized tools to uncover user activity, system configuration, and potential evidence.\
  Includes a **guided script** covering common artifacts to examine (e.g., USB history, user logins, program execution).

  📁 **Skills:** Registry artifact interpretation, tool-based analysis, automation with RegRipper

  🔗View Lab : 🧪 Registry Analysis using Registry Explorer, ShellBags Explorer, and RegRipper

* ### 🧠 **Registry Analysis Guide – What to Look for at the Analysis Phase**

  A focused guide on **what artifacts to extract and why** during Windows registry analysis , Learn how to spot valuable forensic indicators using targeted tools.\
  ✅ **Tools Used:**

  🔍 **Registry Explorer** – for GUI-based navigation of hive contents

  📂 **ShellBags Explorer** – for analyzing user folder access history

  🧰 **RegRipper** – for automated extraction of key forensic evidence\
  📁 **Skills:** Timeline creation, behavioral analysis, forensic triage

  🔗 **View Lab : 🧠 Registry Analysis Guide – What to Look for at the Analysis Phase**

* ### 🐧 **Linux Operating System Analysis**

  In Windows systems, the **Registry** is the central source of system and user activity.\
  In contrast, **Linux** systems rely on **distributed configuration files** spread across the file system.

  🔍 Therefore, Linux forensic analysis focuses on **key directories and configuration files** that reveal user behavior, login history, system configuration, and potential malicious activity.

  📁 **Skills:** Linux directory structure analysis, log file investigation, forensic triage in `/etc`, `/var/log`, `/home`, and more

  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/linux-os-forensics-digital-analysis-on-linux-systems">🔗 View Lab</a>

* ### 🦊 **Extracting Firefox Artifacts on Linux**

  The goal of Firefox forensics is to **trace user activity** through browser data such as:

  * **Browsing history**

  * **Cookies**

  * **Bookmarks**

  * **Form autofill data**

  * **Saved login credentials**

  This lab teaches how to locate and extract these artifacts from **Firefox profiles** on a Linux system, and how to interpret them as digital evidence.

  📁 **Skills:** Browser artifact recovery, SQLite analysis, user activity reconstruction\
  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/firefox-artifacts-extraction">🔗 View Lab</a>

* ### 🧰 **Autopsy: Create a New Case & Add a Data Source**

  Learn how to initiate a forensic investigation using **Autopsy**, an open-source digital forensics platform.\
  This lab covers creating a new case, adding disk images or logical files as a **data source**, and setting up the case environment.

  📁 **Skills:** Case setup, image ingestion, data source configuration in Autopsy\
  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/creating-a-new-case-and-adding-a-data-source-in-autopsy-step-by-step-with-full-explanation">🔗 View Lab</a>

* ### 🔎 **Analysis of Data Source Using Autopsy**

  Dive into **analyzing disk images** and file systems using Autopsy's interface.\
  Explore browser history, email artifacts, recent documents, deleted files, and system metadata through **Autopsy modules** like:

  * Keyword Search

  * File Type Filtering

  * Timeline Analysis

  * Recent Activity

  📁 **Skills:** GUI-based forensic analysis, artifact recovery, timeline generation, report creation\
  <a target="_blank" href="https://sec-lab-notes.hashnode.space/abdelwahabshandy-cybersecurity-notes/digital-forensics-labs/course-based-digital-forensics-labs/analysis-of-data-source-using-autopsy-autopsy-forensic-tool">🔗 View Lab</a>

***

> ***💬 "Control the code, and you control the world." 🔐 From wiping metadata to gaining root access — every step is documented and my goal is to deeply understand the system, not just hack!***
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

