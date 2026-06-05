
**Case:** Scan Surprise – picoCTF\
**Author:** Jeffery John\
**Date:** August 23, 2025\
**Investigator:** Abdelwahab Shandy

***

## **1) Identification**

**Description:**\
In CTF challenges, flags are usually delivered as plain text. However, in this challenge the flag was embedded inside an image (PNG).

**Indicators of Compromise (IOCs):**

* File: `flag.png` (350 bytes).

* File type: PNG – dimensions 99x99 – colormap 1-bit.

* Media: Available via [`challenge.zip`](http://challenge.zip) and also through SSH.

* SSH server fingerprint:

  ```bash
  atlas.picoctf.net:52728
  Fingerprint: SHA256:QF0l+8x0mwmM2QvewTSPdDEvkELbQihq9zN4rUKog8k
  ```

**Technical Goal:**\
Determine whether the image contains a hidden flag (QR code) or encrypted data.

***

## **2) Acquisition**

**Actions:**

* Downloaded the challenge archive:

  ```bash
  wget https://artifacts.picoctf.net/c_atlas/13/challenge.zip

  unzip challenge.zip
  ```

* Extracted files revealed the path:

  ```bash
  home/ctf-player/drop-in/flag.png
  ```

* The file size (350 bytes) was suspiciously small, suggesting it was not a regular image but likely a QR code.

**Rationale:**\
Obtaining a local copy of the evidence (`flag.png`) avoids reliance on the server and allows repeated offline analysis.

***

## **3) Preservation**

**Preservation Measures:**

* Used `file`, `stat`, and `exiftool` commands to inspect metadata without modifying the file.

* No changes were made to file permissions or content of `flag.png`.

* Created a secondary copy (`ScanSurprise.png`) for working analysis.

**Rationale:**\
Ensuring the integrity of the digital evidence while enabling safe testing on a duplicate.

***

## **4) Analysis**

**Tools Used:**

* **Exif / Exiftool:** No hidden metadata found (no EXIF).

* **file:** Confirmed PNG format (99x99, 1-bit).

* **zbarimg:** Used to scan for QR codes.

**Verification via SSH:**

```bash
ssh -p 52728 ctf-player@atlas.picoctf.net

zbarimg flag.png
```

**Output:**

```bash
QR-Code:picoCTF{p33k_@_b00_d4ca652e}
```

**Verification Locally (after installing zbar-tools):**

```bash
sudo apt install zbar-tools

zbarimg flag.png
```

**Output:**

```bash
QR-Code:picoCTF{p33k_@_b00_d4ca652e}
```

**Analysis:**

* The flag was hidden inside a **QR code**, not in text, metadata, or steganography.

* Only **zbarimg** was able to accurately extract the content.

* Attempts using exif or manual inspection did not reveal the flag because it required a QR scan.

***

## **5) Reporting**

**Final Result:**

* Extracted flag:

  ```bash
  picoCTF{p33k_@_b00_d4ca652e}
  ```

* `flag.png` contained a hidden QR code image (99x99).

* Results were verified both locally and on the challenge server.

**Lessons Learned:**

* **Verify formats:** Small image size and dimensions can indicate QR/barcode.

* **Use the right tool:** EXIF tools failed, but `zbarimg` succeeded immediately.

* **Preserve first:** Creating a duplicate (`ScanSurprise.png`) protected the original evidence.

* **Cross-validation:** Testing locally and remotely confirmed consistent results.

***

### **Appendix A – Key Commands**

```bash
wget https://artifacts.picoctf.net/c_atlas/13/challenge.zip

unzip challenge.zip

file flag.png

exiftool flag.png

zbarimg flag.png
```

### **Appendix B – Extracted Flag**

```bash
picoCTF{p33k_@_b00_d4ca652e}
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

