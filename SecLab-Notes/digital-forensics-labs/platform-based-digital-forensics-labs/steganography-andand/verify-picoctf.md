---
id: "68ee5e77a0797ba66241e41c"
title: "Verify : picoCTF"
description: "Description\n\nPeople keep trying to trick my players with imitation flags. I want to make sure they get the real thing! I'm going to provide the SHA-256 hash and a decrypt script to help you know that my flags are legitimate.\n\nAdditional details will be available after launching your challenge instance."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/digital-forensics-labs/platform-based-digital-forensics-labs/steganography-andand/verify-picoctf"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T14:30:15.159Z"
updatedAt: "2026-01-25T15:35:46.950Z"
---

***

# Digital Forensic Report (DFIR)

> Case: Verify – picoCTF
>
> Challenge Issuer: Jeffery John
>
> Date: August 23, 2025
>
> Investigator: Abdelwahab Shandy
>
> Remote System ID: [rhea.picoctf.net:63110](http://rhea.picoctf.net:63110)
>
> Key Fingerprint (ECDSA): SHA256:intfZRbiBnFFTwsnRQifu/Wu8o+HCV3fqyuYXoQ3pLQ
>
> Server System: Ubuntu 20.04.3 LTS (Linux 6.8.0-1021-aws).

***

1. ## Identification

* Report/Issue: CTF players are being exposed to fake "flags." Only the valid flag should be verified. Technical Objective:

* Use SHA-256 to verify the integrity of the valid flag file.

* After verification, use the [decrypt.sh](http://decrypt.sh) script to extract only the legitimate flag.

* Available IOCs/Guidance:

* Declared Checksum: fba9f49bf22aa7188a155768ab0dfdc1f9b86c47976cd0f7c9003af2e20598f7

* Binding Instructions: SSH to the ctf-player account with the challenge password.

* Directory Path: The files/ folder contains several encrypted files (64 bytes in size).

* Why is this step important?

  * To ensure we're working with the correct file before any decompilation/running—this prevents tampering and saves time trying every file.

***

2. ## Acquisition

* Actions:

  * Connect to server :

    * ```bash
        ssh -p 63110 ctf-player@rhea.picoctf.net
      ```

> Accept fingerprint only once after matching: <mark>yes </mark>.

* Inventory initial content:

  * ```bash
      ls
      # Output: checksum.txt decrypt.sh files
      ls -la files/
      # A large number of files with random names and size of 64 bytes
    ```

  > **Why is this?**
  >
  > **Here, acquisition means "legitimate access to the evidence" and determining where it is located (checksum.txt, files/, and** [**decrypt.sh**](http://decrypt.sh)**) to prepare it for verification without modifying it.**

***

3. ## Preservation

* Integrity and Authentication:

  * Authenticate the SSH host fingerprint to prevent a MITM attack later.

  * Do not modify any files within files/.

  * Use SHA-256 authentication instead of random opening or decryption.

Integrity Verification Steps:

* Read the declared checksum value :

  ```bash
  cat checksum.txt
  # fba9f49bf22aa7...e20598f7
  ```

Calculate SHA-256 for each file/ and search for matches:

```bash
sha256sum files/* | grep fba9f49bf22aa7188a155768ab0dfdc1f9b86c47976cd0f7c9003af2e20598f7
# Result:
# fba9f49b...e20598f7 files/87590c24
```

> Why is this?
>
> To objectively establish which file is the intended one (files/87590c24) before any further processing, thus preserving the integrity of the evidence.

***

4. ## Analysis

Analysis of the [decrypt.sh](http://decrypt.sh) script:

* Verifies the playback argument (file name).

* Ensures that the passed object is a file within the drop path /home/ctf-player/drop-in/$file\_name (the path is linked by the challenge so that it accepts files/).

* Uses:

  * OpenSSL AES-256-CBC with PBKDF2, 100,000 iterations, and salt.

  * The password is fixed by the challenge: picoCTF.

* If decryption fails, a message indicating the flag is false is displayed.

Decrypt the correct file (after hash verification):

```bash
./decrypt.sh files/87590c24
# Output:
# picoCTF{trust_but_verify_87590c24}
```

### Analysis of the reason for success:

* Because files/87590c24 is the only file that matches the announced SHA-256, so when it is passed to the script, the decryption process is successful and the legitimate flag is displayed.

* Any other file will display a failure message (false flag) due to a mismatch between the real structure/key/content.

### Additional technical notes (why and why):

* Why SHA-256? To ensure integrity and authenticity.

* Why PBKDF2 and 100,000 iterations? To slow down attempts to crack the password (hardening the derivation), even though the password is published by challenge.

* Why accept the server fingerprint? To avoid man-in-the-middle (MITM) and establish trust in the destination.

* Why grep with sha256sum? To quickly filter results and identify the matching filename among hundreds of files.

***

## Reporting – Report (Results, Lessons, and Re-implementation)

Final Result:

* Verified the correct file: files/87590c24.

* Successfully decrypted and forensic flag extracted:

  * ```bash
      picoCTF{trust_but_verify_87590c24}
    ```

* What have we achieved? We have proven that the process of “trust but verify” is the only way to distinguish between real and fake science within a group.

**Reproducible steps (abbreviated):**

```bash
ssh -p 63110 ctf-player@rhea.picoctf.net
yes # Accept fingerprint after matching
# (Enter password)

cat checksum.txt
sha256sum files/* | grep <hash-value-from-checksum.txt>
./decrypt.sh files/<matching-file>
```

***

### Appendix A - Key Evidence

Checksum declared: fba9f49bf22aa7188a155768ab0dfdc1f9b86c47976cd0f7c9003af2e20598f7

Corresponding file: files/87590c24

Final flag: picoCTF\{trust\_but\_verify\_87590c24}

SSH server fingerprint: SHA256:intfZRbiBnFFTwsnRQifu/Wu8o+HCV3fqyuYXoQ3pLQ

Verification command:

```bash
sha256sum files/87590c24
# Should output the same value as checksum.txt
```

### Appendix B – Excerpt from [decrypt.sh](http://decrypt.sh) (parser)

Decryption:

```bash
openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -salt \
  -in "/home/ctf-player/drop-in/$file_name" -k picoCTF
```

> Purpose: Reject false flags and show a failure message if the file is not valid.

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

