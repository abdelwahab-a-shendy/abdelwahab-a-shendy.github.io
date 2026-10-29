
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760451173484/aa52317a-05c6-47fb-8100-58a81cd51b65.png" align="center" fullwidth="false" />

## **Scenario**

> **The attached images were posted by a criminal on the run, with the caption “I’m roaming free. You will never catch me”. We believe you can assist us in proving him wrong.**

# First, we will download the file to our machines if you are using linux VM :

**1.✅ Upload the file using wget:**

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ wget https://blueteamlabs.online/storage/files/cf7becafebbb525b3c1df03785a2b9ee6b96e41c.zip
--2025-07-21 16:54:04--  https://blueteamlabs.online/storage/files/cf7becafebbb525b3c1df03785a2b9ee6b96e41c.zip
Resolving blueteamlabs.online (blueteamlabs.online)... 18.130.215.145
Connecting to blueteamlabs.online (blueteamlabs.online)|18.130.215.145|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 4676956 (4.5M) [application/zip]
Saving to: ‘cf7becafebbb525b3c1df03785a2b9ee6b96e41c.zip’

cf7becafebbb525b3c1 100%[=================>]   4.46M   817KB/s    in 8.0s    

2025-07-21 16:54:13 (573 KB/s) - ‘cf7becafebbb525b3c1df03785a2b9ee6b96e41c.zip’ saved [4676956/4676956]

sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ ls -lh 
total 4.5M
-rw-rw-r-- 1 sansforensics sansforensics 4.5M Nov 26  2021 cf7becafebbb525b3c1df03785a2b9ee6b96e41c.zip
```

\*\*2.\*\*Decompress using 7z :

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ 7z x cf7becafebbb525b3c1df03785a2b9ee6b96e41c.zip 

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,4 CPUs Intel(R) Core(TM) i7-9850H CPU @ 2.60GHz (906ED),ASM,AES-NI)

Scanning the drive for archives:
1 file, 4676956 bytes (4568 KiB)

Extracting archive: cf7becafebbb525b3c1df03785a2b9ee6b96e41c.zip
--
Path = cf7becafebbb525b3c1df03785a2b9ee6b96e41c.zip
Type = zip
Physical Size = 4676956

    
Enter password (will not be echoed): # "Here Add a Pass == btlo"
Everything is Ok     

Files: 2
Size:       4779511
Compressed: 4676956
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ ls
cf7becafebbb525b3c1df03785a2b9ee6b96e41c.zip  uploaded_1.JPG  uploaded_2.png
```

## Do not start dreaming directly on the search first and see the files well through the following commands :

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ ls -lh
total 4.6M
-rw-rw-r-- 1 sansforensics sansforensics 3.5M Nov 26  2021 uploaded_1.JPG
-rw-rw-r-- 1 sansforensics sansforensics 1.2M Nov 26  2021 uploaded_2.png
```

> Through this command you can see the file size, the date and time of the last modification, the file permissions, the user name and the group to which the file belongs.

I used the file command for an initial analysis ✅ :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1753117960694/614c8b06-75e7-47bd-b455-b00177ce7b8d.png" alt="" align="center" fullwidth="false" />

✅ Quick Analysis: It has excellent Exif data: company, model, date.

It has very important GPS data, which we'll extract immediately.

There's a caption inside the image:

"Relying on altered metadata to catch me?" This caption could be a disguise or hint that the metadata is altered or spoofed, which is common in challenge scenarios.

### We can also use state :

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ stat uploaded_1.JPG 
  File: uploaded_1.JPG
  Size: 3575684   	Blocks: 6984       IO Block: 4096   regular file
Device: 802h/2050d	Inode: 3149056     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/sansforensics)   Gid: ( 1000/sansforensics)
Access: 2025-07-21 17:06:28.434098416 +0000
Modify: 2021-11-26 16:35:07.000000000 +0000
Change: 2025-07-21 16:59:45.878102701 +0000
 Birth: -

sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ stat uploaded_2.png 
  File: uploaded_2.png
  Size: 1203827   	Blocks: 2352       IO Block: 4096   regular file
Device: 802h/2050d	Inode: 3149059     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/sansforensics)   Gid: ( 1000/sansforensics)
Access: 2025-07-21 17:06:28.442098743 +0000
Modify: 2021-11-26 16:35:07.000000000 +0000
Change: 2025-07-21 16:59:45.886102701 +0000
 Birth: -
```

> This command is used to display detailed information about a file or folder in Linux, such as: size, timings, permissions, inode number.

# 🧰 Next step: Extract detailed Exif data Use the exiftool:

**✅ If it's not installed:**

```bash
sudo apt install libimage-exiftool-perl
```

📤 Then run with photo one :

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ exiftool uploaded_1.JPG 
ExifTool Version Number         : 11.88
File Name                       : uploaded_1.JPG
Directory                       : .
File Size                       : 3.4 MB
File Modification Date/Time     : 2021:11:26 16:35:07+00:00
File Access Date/Time           : 2025:07:21 17:06:28+00:00
File Inode Change Date/Time     : 2025:07:21 16:59:45+00:00
File Permissions                : rw-rw-r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
Exif Byte Order                 : Little-endian (Intel, II)
Compression                     : JPEG (old-style)
Make                            : Canon
Camera Model Name               : Canon EOS 550D
Orientation                     : Rotate 90 CW
X Resolution                    : 72
Y Resolution                    : 72
Resolution Unit                 : inches
Modify Date                     : 2021:11:02 13:20:23
Y Cb Cr Positioning             : Co-sited
Exposure Time                   : 1/1000
F Number                        : 18.0
Exposure Program                : Manual
ISO                             : 100
Exif Version                    : 0221
Date/Time Original              : 2021:11:02 13:20:23
Create Date                     : 2021:11:02 13:20:23
Components Configuration        : Y, Cb, Cr, -
Shutter Speed Value             : 1/1024
Aperture Value                  : 18.2
Flash                           : Off, Did not fire
Focal Length                    : 55.0 mm
Macro Mode                      : Normal
Self Timer                      : Off
Quality                         : Fine
Canon Flash Mode                : Off
Continuous Drive                : Single
Focus Mode                      : One-shot AF
Record Mode                     : JPEG
Canon Image Size                : Large
Easy Mode                       : Manual
Digital Zoom                    : None
Contrast                        : Normal
Saturation                      : Normal
Metering Mode                   : Evaluative
Focus Range                     : Not Known
Canon Exposure Mode             : Manual
Lens Type                       : Canon EF-S 55-250mm f/4-5.6 IS
Max Focal Length                : 250 mm
Min Focal Length                : 55 mm
Focal Units                     : 1/mm
Max Aperture                    : 4
Min Aperture                    : 23
Flash Activity                  : 0
Flash Bits                      : (none)
Zoom Source Width               : 0
Zoom Target Width               : 0
Manual Flash Output             : n/a
Color Tone                      : Normal
Auto ISO                        : 100
Base ISO                        : 100
Measured EV                     : 14.88
Target Aperture                 : 18
Target Exposure Time            : 1/1024
Exposure Compensation           : 0
White Balance                   : Auto
Slow Shutter                    : None
Shot Number In Continuous Burst : 0
Optical Zoom Code               : n/a
Camera Temperature              : 50 C
Flash Guide Number              : 0
Flash Exposure Compensation     : 0
Auto Exposure Bracketing        : Off
AEB Bracket Value               : 0
Control Mode                    : Camera Local Control
Measured EV 2                   : 17.375
Bulb Duration                   : 0
Camera Type                     : EOS High-end
ND Filter                       : n/a
Canon Image Type                : Canon EOS 550D
Canon Firmware Version          : Firmware Version 1.0.9
Owner Name                      : 
Serial Number                   : 1932126681
Flash Metering Mode             : Off
Camera Orientation              : Rotate 90 CW
Firmware Version                : 1.0.9
File Index                      : 3845
Directory Index                 : 102
Contrast Standard               : 0
Sharpness Standard              : 3
Saturation Standard             : 0
Color Tone Standard             : 0
Contrast Portrait               : 0
Sharpness Portrait              : 2
Saturation Portrait             : 0
Color Tone Portrait             : 0
Contrast Landscape              : 0
Sharpness Landscape             : 4
Saturation Landscape            : 0
Color Tone Landscape            : 0
Contrast Neutral                : 0
Sharpness Neutral               : 0
Saturation Neutral              : 0
Color Tone Neutral              : 0
Contrast Faithful               : 0
Sharpness Faithful              : 0
Saturation Faithful             : 0
Color Tone Faithful             : 0
Contrast Monochrome             : 0
Sharpness Monochrome            : 3
Filter Effect Monochrome        : None
Toning Effect Monochrome        : None
Contrast User Def 1             : 0
Sharpness User Def 1            : 3
Saturation User Def 1           : 0
Color Tone User Def 1           : 0
Filter Effect User Def 1        : None
Toning Effect User Def 1        : None
Contrast User Def 2             : 0
Sharpness User Def 2            : 3
Saturation User Def 2           : 0
Color Tone User Def 2           : 0
Filter Effect User Def 2        : None
Toning Effect User Def 2        : None
Contrast User Def 3             : 0
Sharpness User Def 3            : 3
Saturation User Def 3           : 0
Color Tone User Def 3           : 0
Filter Effect User Def 3        : None
Toning Effect User Def 3        : None
User Def 1 Picture Style        : Standard
User Def 2 Picture Style        : Standard
User Def 3 Picture Style        : Standard
Canon Model ID                  : EOS Rebel T2i / 550D / Kiss X4
Thumbnail Image Valid Area      : 0 159 7 112
Serial Number Format            : Format 2
AF Area Mode                    : Single-point AF
Num AF Points                   : 9
Valid AF Points                 : 1
Canon Image Width               : 5184
Canon Image Height              : 3456
AF Image Width                  : 5184
AF Image Height                 : 3456
AF Area Widths                  : 518 0 0 0 0 0 0 0 0
AF Area Heights                 : 691 0 0 0 0 0 0 0 0
AF Area X Positions             : 0 0 0 0 0 0 0 0 0
AF Area Y Positions             : 0 0 0 0 0 0 0 0 0
AF Points In Focus              : 0
AF Points Selected              : 0
Original Decision Data Offset   : 0
Bracket Mode                    : Off
Bracket Value                   : 0
Bracket Shot Number             : 0
Raw Jpg Size                    : Large
Long Exposure Noise Reduction 2 : Off
WB Bracket Mode                 : Off
WB Bracket Value AB             : 0
WB Bracket Value GM             : 0
Live View Shooting              : On
Focus Distance Upper            : 26.1 m
Focus Distance Lower            : 19.12 m
Flash Exposure Lock             : Off
Lens Model                      : EF-S55-250mm f/4-5.6 IS
Internal Serial Number          : VC1245303
Dust Removal Data               : (Binary data 1024 bytes, use -b option to extract)
Crop Left Margin                : 0
Crop Right Margin               : 0
Crop Top Margin                 : 0
Crop Bottom Margin              : 0
Exposure Level Increments       : 1/3 Stop
ISO Expansion                   : Off
Flash Sync Speed Av             : Auto
Long Exposure Noise Reduction   : Off
High ISO Noise Reduction        : Standard
Highlight Tone Priority         : Disable
AF Assist Beam                  : Emits
Mirror Lockup                   : Disable
Shutter-AE Lock                 : AF/AE lock
Set Button When Shooting        : Normal (disabled)
LCD Display At Power On         : Display
Add Original Decision Data      : Off
Tone Curve                      : Standard
Sharpness                       : 3
Sharpness Frequency             : n/a
Sensor Red Level                : 0
Sensor Blue Level               : 0
White Balance Red               : 0
White Balance Blue              : 0
Color Temperature               : 5200
Picture Style                   : Standard
Digital Gain                    : 0
WB Shift AB                     : 0
WB Shift GM                     : 0
Measured RGGB                   : 1056 1024 1024 1058
VRD Offset                      : 0
Sensor Width                    : 5344
Sensor Height                   : 3516
Sensor Left Border              : 152
Sensor Top Border               : 56
Sensor Right Border             : 5335
Sensor Bottom Border            : 3511
Black Mask Left Border          : 0
Black Mask Top Border           : 0
Black Mask Right Border         : 0
Black Mask Bottom Border        : 0
Color Data Version              : 7 (500D/550D/7D/1DmkIV)
WB RGGB Levels As Shot          : 2389 1024 1024 1553
Color Temp As Shot              : 5586
WB RGGB Levels Auto             : 2389 1024 1024 1553
Color Temp Auto                 : 5586
WB RGGB Levels Measured         : 2386 1024 1023 1552
Color Temp Measured             : 5586
WB RGGB Levels Daylight         : 2250 1024 1024 1589
Color Temp Daylight             : 5200
WB RGGB Levels Shade            : 2583 1024 1024 1364
Color Temp Shade                : 7000
WB RGGB Levels Cloudy           : 2422 1024 1024 1469
Color Temp Cloudy               : 6000
WB RGGB Levels Tungsten         : 1621 1024 1024 2346
Color Temp Tungsten             : 3200
WB RGGB Levels Fluorescent      : 2005 1024 1024 2208
Color Temp Fluorescent          : 3763
WB RGGB Levels Kelvin           : 2250 1024 1024 1589
Color Temp Kelvin               : 5200
WB RGGB Levels Flash            : 2485 1024 1024 1456
Color Temp Flash                : 6215
Average Black Level             : 2048 2048 2048 2048
Raw Measured RGGB               : 0 0 0 0
Per Channel Black Level         : 2047 2047 2048 2048
Specular White Level            : 12279
Linearity Upper Margin          : 10000
Picture Style User Def          : Standard; Standard; Standard
Picture Style PC                : None; None; None
Custom Picture Style File Name  : 
Vignetting Corr Version         : 0
Peripheral Lighting             : On
Distortion Correction           : Off
Chromatic Aberration Corr       : Off
Peripheral Lighting Value       : 35
Distortion Correction Value     : 0
Original Image Width            : 5184
Original Image Height           : 3456
Peripheral Lighting Setting     : On
Peripheral Illumination Corr    : Off
Auto Lighting Optimizer         : Strong
Sub Sec Time                    : 32
Sub Sec Time Original           : 32
Sub Sec Time Digitized          : 32
Flashpix Version                : 0100
Color Space                     : sRGB
Exif Image Width                : 5184
Exif Image Height               : 3456
Interoperability Index          : R98 - DCF basic file (sRGB)
Interoperability Version        : 0100
Focal Plane X Resolution        : 5728.176796
Focal Plane Y Resolution        : 5808.403361
Focal Plane Resolution Unit     : inches
Custom Rendered                 : Normal
Exposure Mode                   : Manual
Scene Capture Type              : Standard
GPS Latitude Ref                : South
GPS Longitude Ref               : West
Thumbnail Offset                : 7902
Thumbnail Length                : 6101
Comment                         : relying on altered metadata to catch me?
Image Width                     : 5184
Image Height                    : 3456
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:2 (2 1)
Drive Mode                      : Single-frame Shooting
File Number                     : 102-3845
Lens                            : 55.0 - 250.0 mm
Shooting Mode                   : Manual
WB RGGB Levels                  : 2389 1024 1024 1553
Aperture                        : 18.0
Blue Balance                    : 1.516602
Image Size                      : 5184x3456
Lens ID                         : Canon EF-S 55-250mm f/4-5.6 IS
Megapixels                      : 17.9
Red Balance                     : 2.333008
Scale Factor To 35 mm Equivalent: 1.6
Shutter Speed                   : 1/1000
Create Date                     : 2021:11:02 13:20:23.32
Date/Time Original              : 2021:11:02 13:20:23.32
Modify Date                     : 2021:11:02 13:20:23.32
Thumbnail Image                 : (Binary data 6101 bytes, use -b option to extract)
GPS Latitude                    : 32 deg 40' 3.87" S
GPS Longitude                   : 279 deg 29' 31.87" W
Lens                            : 55.0 - 250.0 mm (35 mm equivalent: 86.5 - 393.2 mm)
Circle Of Confusion             : 0.019 mm
Depth Of Field                  : inf (6.34 m - inf)
Field Of View                   : 23.5 deg
Focal Length                    : 55.0 mm (35 mm equivalent: 86.5 mm)
GPS Position                    : 32 deg 40' 3.87" S, 279 deg 29' 31.87" W
Hyperfocal Distance             : 8.80 m
Light Value                     : 18.3
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$
```

> This will display all metadata, including:
>
> GPS Latitude / Longitude 📍
>
> DateTime Original 🕒
>
> Camera Info 📷
>
> And any Hidden Tags

**📤 Then run with photo one :**

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ exiftool uploaded_2.png 
ExifTool Version Number         : 11.88
File Name                       : uploaded_2.png
Directory                       : .
File Size                       : 1176 kB
File Modification Date/Time     : 2021:11:26 16:35:07+00:00
File Access Date/Time           : 2025:07:21 17:06:28+00:00
File Inode Change Date/Time     : 2025:07:21 16:59:45+00:00
File Permissions                : rw-rw-r--
File Type                       : PNG
File Type Extension             : png
MIME Type                       : image/png
Image Width                     : 1296
Image Height                    : 608
Bit Depth                       : 8
Color Type                      : RGB
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Interlace                       : Noninterlaced
SRGB Rendering                  : Perceptual
Gamma                           : 2.2
Pixels Per Unit X               : 3779
Pixels Per Unit Y               : 3779
Pixel Units                     : meters
Image Size                      : 1296x608
Megapixels                      : 0.788
```

> Exiftool's analysis of the uploaded\_2.png image didn't reveal any sensitive metadata, comments, or GPS data—which is to be expected, as PNGs often don't contain EXIF like JPGs.
>
> However, as we've seen before, the image contains compressed Zlib data, which is likely the key to the challenge.

# But before we dive deeper into the analysis, let us look at the questions and see what he needs from us :

## **Challenge Submission :**

### ***1.What is the camera model?***

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ exiftool uploaded_1.JPG | grep Camera
Camera Model Name               : Canon EOS 550D
Camera Temperature              : 50 C
Control Mode                    : Camera Local Control
Camera Type                     : EOS High-end
Camera Orientation              : Rotate 90 CW
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ exiftool uploaded_1.JPG | grep "Camera Model " 
Camera Model Name               : Canon EOS 550D
```

OR

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1753119243634/08ddd252-8926-4a75-9522-f47ee81a5764.png" alt="" align="center" fullwidth="false" />

**The correct answer :** Canon EOS 550D

### ***2. When was the picture taken?***

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ exiftool uploaded_1.JPG | grep "Date/Time Original"
Date/Time Original              : 2021:11:02 13:20:23
Date/Time Original              : 2021:11:02 13:20:23.32
```

Or

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1753119474922/76514c3f-d25c-4d13-b326-5230b472ac05.png" alt="" align="center" fullwidth="false" />

**The correct answer :** 2021:11:02 13:20:23

### ***3. What does the comment on the first image says?***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1753121484412/078f6a22-b7b7-48e8-a27e-34c97b5813fd.png" alt="" align="center" fullwidth="false" />

OR

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ exiftool uploaded_1.JPG | grep "Comment"
Comment                         : relying on altered metadata to catch me?
```

**The correct answer :** relying on altered metadata to catch me?

### ***4.Where could the criminal be?***

**📌 First: Extract the coordinates in digital format:**

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ exiftool -n -GPSLatitude -GPSLongitude uploaded_1.JPG
GPS Latitude                    : -32.6677411483056
GPS Longitude                   : -279.4921875
```

📌 Next: Open Google Maps:

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ xdg-open "https://www.google.com/maps?q=-32.6677411483056,-279.4921875"
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ libEGL warning: DRI2: failed to authenticate
ATTENTION: default value of option mesa_glthread overridden by environment.
```

There's a problem here: The longitude of -279.4921875 is invalid because longitude is always between -180 and +180.

### **✅ Possible cause:**

The camera/file may contain intentionally altered GPS data (as indicated by the caption in the image "relying on altered metadata to catch me?")

```bash
sansforensics@as: ~/Desktop/Digital Forensics/BTLO
$ exiftool uploaded_1.JPG | grep -i gps
GPS Latitude Ref                : South
GPS Longitude Ref               : West
GPS Latitude                    : 32 deg 40' 3.87" S
GPS Longitude                   : 279 deg 29' 31.87" W
GPS Position                    : 32 deg 40' 3.87" S, 279 deg 29' 31.87" W
```

Now we have the coordinates in full format:

```yaml
GPS Latitude  : 32° 40′ 3.87″ S  → -32.667741
GPS Longitude : 279° 29′ 31.87″ W
```

But ❗ As we said, the longitude of 279° W is invalid because it falls outside the normal range (-180° to +180°).

✅ Solution: Normalize the longitude When you find Longitude > 180° W, simply:

Subtract 360 from the value to get the true longitude.

```yaml
279.492187 - 360 = -80.507812
```

✅ Actual coordinates:

```yaml
Latitude = -32.667741 
Longitude = -80.507812
```

The result was as follows in the middle of the sea :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1753123455373/2613f931-4a44-4a95-8c64-c457f082b845.png" alt="" align="center" fullwidth="false" />

### **We will try to search using the same image.**

📍 Search on Google Maps:

Open:

Here we will use one of the Reverse Image Search sites, which is [**tineye**](https://tineye.com/) , You can use it, but I prefer Google

**But I actually always prefer to use Google, so**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455118316/0097e401-cc1b-4695-a024-2506b275399e.png" alt="" align="left" fullwidth="false" />

Click on the camera icon here .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455119432/a486e6d4-21e7-4104-b9b1-09dd33d0a0be.png" alt="" align="left" fullwidth="false" />

You will upload the second picture, because it is clearer :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1753123953383/4f29437c-2094-4ff5-88e9-b6935844782d.png" alt="" align="center" fullwidth="false" />

Contribute to the first line

**The correct answer :** Kathmandu

**Here we are, congratulations my friend .**

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

