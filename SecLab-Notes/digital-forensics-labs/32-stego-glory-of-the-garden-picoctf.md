
# 🧪 Glory of the Garden – PicoCTF

## 1. **Identification**

* **Challenge Name:** Glory of the Garden

* **Author:** jedavis/Danny

* **Description:** "This garden contains more than it seems." This suggests that the image contains hidden or non-obvious data.

* **Target File:** JPEG image `garden.jpg`

* **File Type:** JPEG, verified with:

```bash
$ file garden.jpg
garden.jpg: JPEG image data, JFIF standard 1.01, resolution 72x72, baseline, 8-bit, 2999x2249, components 3
```

***

## 2. **Acquisition**

* **Download the file:**

```bash
sansforensics@as: ~/CTF-DF
$ wget https://jupiter.challenges.picoctf.org/static/d0e1ffb10fc0017c6a82c57900f3ffe3/garden.jpg
--2025-08-20 23:12:18--  https://jupiter.challenges.picoctf.org/static/d0e1ffb10fc0017c6a82c57900f3ffe3/garden.jpg
Resolving jupiter.challenges.picoctf.org (jupiter.challenges.picoctf.org)... 3.131.60.8
Connecting to jupiter.challenges.picoctf.org (jupiter.challenges.picoctf.org)|3.131.60.8|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 2295192 (2.2M) [application/octet-stream]
Saving to: ‘garden.jpg’

garden.jpg             77%[===================>      ]   1.69M  4.85KB/s    in 2m 6s   

2025-08-20 23:14:25 (13.7 KB/s) - Read error at byte 1769181/2295192 (Connection reset by peer). Retrying.

--2025-08-20 23:14:26--  (try: 2)  https://jupiter.challenges.picoctf.org/static/d0e1ffb10fc0017c6a82c57900f3ffe3/garden.jpg
Connecting to jupiter.challenges.picoctf.org (jupiter.challenges.picoctf.org)|3.131.60.8|:443... connected.
HTTP request sent, awaiting response... 206 Partial Content
Length: 2295192 (2.2M), 526011 (514K) remaining [application/octet-stream]
Saving to: ‘garden.jpg’

garden.jpg            100%[++++++++++++++++++++=====>]   2.19M   682KB/s    in 0.8s    

2025-08-20 23:14:28 (682 KB/s) - ‘garden.jpg’ saved [2295192/2295192]
```

* **Copy to preserve original:**

```bash
sansforensics@as: ~/CTF-DF
$ cp garden.jpg GardenThePicoCtf
sansforensics@as: ~/CTF-DF
$ ls -la
total 4496
drwxrwxr-x  2 sansforensics sansforensics    4096 Aug 20 23:16 .
drwxr-xr-x 17 sansforensics sansforensics    4096 Aug 20 22:48 ..
-rw-rw-r--  1 sansforensics sansforensics 2295192 Oct 26  2020 garden.jpg
-rw-rw-r--  1 sansforensics sansforensics 2295192 Aug 20 23:16 GardenThePicoCtf
```

* **Verify integrity using SHA256:**

```bash
sansforensics@as: ~/CTF-DF
$ sha256sum garden.jpg GardenThePicoCtf
27dbaa7c73c9bacbe55cfdcd1ad207027acbd5d0a94f5ff55bdd9575fed5fa1f  garden.jpg
27dbaa7c73c9bacbe55cfdcd1ad207027acbd5d0a94f5ff55bdd9575fed5fa1f  GardenThePicoCtf
```

✅ Hashes match, confirming exact copy.

***

## 3. **Preservation**

* Original file `garden.jpg` is preserved.

* All analysis is performed on the copy `GardenThePicoCtf` to avoid altering original data.

***

## 4. **Analysis**

1. **Check metadata (EXIF):**

```bash
sansforensics@as: ~/CTF-DF
$ exiftool GardenThePicoCtf 
ExifTool Version Number         : 11.88
File Name                       : GardenThePicoCtf
Directory                       : .
File Size                       : 2.2 MB
File Modification Date/Time     : 2025:08:20 23:16:18+00:00
File Access Date/Time           : 2025:08:20 23:17:03+00:00
File Inode Change Date/Time     : 2025:08:20 23:16:18+00:00
File Permissions                : rw-rw-r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Resolution Unit                 : inches
X Resolution                    : 72
Y Resolution                    : 72
Profile CMM Type                : Linotronic
Profile Version                 : 2.1.0
Profile Class                   : Display Device Profile
Color Space Data                : RGB
Profile Connection Space        : XYZ
Profile Date Time               : 1998:02:09 06:49:00
Profile File Signature          : acsp
Primary Platform                : Microsoft Corporation
CMM Flags                       : Not Embedded, Independent
Device Manufacturer             : Hewlett-Packard
Device Model                    : sRGB
Device Attributes               : Reflective, Glossy, Positive, Color
Rendering Intent                : Perceptual
Connection Space Illuminant     : 0.9642 1 0.82491
Profile Creator                 : Hewlett-Packard
Profile ID                      : 0
Profile Copyright               : Copyright (c) 1998 Hewlett-Packard Company
Profile Description             : sRGB IEC61966-2.1
Media White Point               : 0.95045 1 1.08905
Media Black Point               : 0 0 0
Red Matrix Column               : 0.43607 0.22249 0.01392
Green Matrix Column             : 0.38515 0.71687 0.09708
Blue Matrix Column              : 0.14307 0.06061 0.7141
Device Mfg Desc                 : IEC http://www.iec.ch
Device Model Desc               : IEC 61966-2.1 Default RGB colour space - sRGB
Viewing Cond Desc               : Reference Viewing Condition in IEC61966-2.1
Viewing Cond Illuminant         : 19.6445 20.3718 16.8089
Viewing Cond Surround           : 3.92889 4.07439 3.36179
Viewing Cond Illuminant Type    : D50
Luminance                       : 76.03647 80 87.12462
Measurement Observer            : CIE 1931
Measurement Backing             : 0 0 0
Measurement Geometry            : Unknown
Measurement Flare               : 0.999%
Measurement Illuminant          : D65
Technology                      : Cathode Ray Tube Display
Red Tone Reproduction Curve     : (Binary data 2060 bytes, use -b option to extract)
Green Tone Reproduction Curve   : (Binary data 2060 bytes, use -b option to extract)
Blue Tone Reproduction Curve    : (Binary data 2060 bytes, use -b option to extract)
Image Width                     : 2999
Image Height                    : 2249
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 2999x2249
Megapixels                      : 6.7
```

* The file is a standard JPEG with EXIF data including dimensions (2999x2249), Baseline DCT encoding, RGB color components.

* No suspicious metadata detected.

2. **Search for hidden text in the binary:**

```bash
$ strings GardenThePicoCtf | grep flag
Here is a flag "picoCTF{more_than_m33ts_the_Try_it_yourself}"
```

* The **flag** was found hidden as plain text inside the image binary.

✅ **Conclusion:** The hidden data was embedded as text within the image file, not in EXIF or advanced steganography.

***

## 5. **Reporting**

* **Challenge:** Glory of the Garden – PicoCTF

* **Analysis Type:** JPEG file analysis for hidden data

* **Tools Used:**

  * `wget` – to download the file

  * `cp` – to create a working copy

  * `sha256sum` – to verify file integrity

  * `file` & `stat` – to inspect file properties

  * `exiftool` – to check metadata

  * `strings` – to extract hidden text

* **Result:** The flag hidden in the image is:

```bash
Here is a flag "picoCTF{more_than_m33ts_the_Try_it_yourself}"
```

* **Notes:** The challenge did not require advanced steganography techniques; simply using `strings` was sufficient to uncover the hidden text.

***

> ***💬 "Control the code, and you control the world." 🔐 From wiping metadata to gaining root access — every step is documented and my goal is to deeply understand the system, not just hack!***
>
> [Abdelwahab Shandy](https://abdelwahabshandy.hashnode.dev/)
>
> [Linkedin](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)
>
> [GitHub](https://github.com/abdelwahab-ahmed-shandy)
>
> ***See You Soon***
>
> AS Cyber “)).

