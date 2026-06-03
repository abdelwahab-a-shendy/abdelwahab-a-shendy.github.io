
### **Digital Forensics Report– picoCTF Challenge “RED”**

> Author: Shuailin Pan (LeConjuror)
>
> Investigator: Abdelwahab Shandy
>
> Date: August 23, 2025

***

1. ## Identification

* Suspicious file: red.png

* Initial description: A plain red image.

* Hints:

  * "The picture seems pure, but is it true?" → The image isn't just red.

  * "Red? Ged? Bed? Aed?" → Indicates possible alteration or encryption.

  * "Check whatever Facebook is called now" → Possibly refers to hidden data such as metadata.

> Conclusion: The file likely contains steganography (data hidden within the image).

***

2. ## Acquisition

The file was downloaded from the official challenge server:

```bash
wget https://challenge-files.picoctf.net/c_verbal_sleep/831307718b34193b288dde31e557484876fb84978b5818e2627e453a54aa9ba6/red.png
```

File integrity check:

```bash
sha256sum red.png
```

***

3. ## Preservation

* A duplicate copy named RED.png was created to protect the original.

* All analysis was performed on the copy.

***

4. ## Analysis Steps:

Select the file type:

```bash
file RED.png
```

> → Its type is a regular PNG image.

Metadata check:

```bash
exiftool RED.png
```

> → No important data appeared, except for a very strange poem.

Using binwalk to extract hidden data:

```bash
binwalk -e RED.png
```

> A file named 11C was extracted.
>
> This file was compressed using zlib.

```bash
zlib-flate -uncompress < 11C.zlib > output.txt
```

> → It produced an output.txt file but it wasn't clear or useful.

**Trying to display the data as a RAW image:**

```bash
display -size 128x128 -depth 8 rgb:output.txt
```

> → Nothing clear appears

**Using the zsteg tool:**

**Explanation of the zsteg tool:**

* zsteg is a specialized tool for analyzing PNG and BMP images to detect steganography.

* The idea: Images store color data (RGB or RGBA). Each color consists of several bits.

* Sometimes the least significant bit (LSB) is exploited to hide text or binary data without the human eye being affected.

* zsteg examines these layers or bits across all channels (R, G, B, Alpha) and detects whether there is hidden text or files.

Execute the commands:

```bash
 zsteg -a RED.png
```

**The important result was:**

```bash
b1,rgba,lsb,xy .. text: "cGljb0NURntyM2RfMXNfdGgzX3VsdDFtNHQzX2N1cjNfZjByXzU0ZG4zNTVffQ=="
```

> This is the Base64 encoded text.

**Base64 decoding:**

```bash
echo "cGljb0NURntyM2RfMXNfdGgzX3VsdDFtNHQzX2N1cjNfZjByXzU0ZG4zNTVffQ==" | base64 -d
```

Result:

```bash
picoCTF{r3d_1s_th3_ult1m4t3_cur3_f0r_54dn355_}
```

***

5. ## Reporting - Report

**Results:**

* The red.png file contained hidden data using Steganography in the least significant bit (LSB) on the RGBA channels.

* The hidden text was detected using the zsteg tool.

* The text was Base64 encoded and decoded to obtain the flag.

**Final flag:**

```bash
picoCTF{r3d_1s_th3_ult1m4t3_cur3_f0r_54dn355_}
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

