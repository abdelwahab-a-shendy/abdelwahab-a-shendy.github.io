
#### *An image was leaked from a babies store. the manager is so annoyed because he needs to identify the image to fire charges against the responsible employee. the key is the md5 of the image*

# 🧭 Steps followed according to the digital forensics methodology:

1. ## Identification

   A suspicious file was found, originating from a children's products store, and it is suspected that it contains a leaked image. The goal is to extract this image and verify its identity by calculating its MD5 value.

***

2. ## Acquisition

   The compressed file was uploaded using the command:

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ wget https://hubchallenges.s3.eu-west-1.amazonaws.com/forensics/find+the+image.zip
--2025-07-28 19:21:59--  https://hubchallenges.s3.eu-west-1.amazonaws.com/forensics/find+the+image.zip
Resolving hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)... 3.5.65.153, 52.218.110.88, 3.5.68.106, ...
Connecting to hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)|3.5.65.153|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 2500600 (2.4M) [application/zip]
Saving to: ‘find+the+image.zip’

find+the+image.zip                      100%[=============================================================================>]   2.38M   497KB/s    in 5.6s    

2025-07-28 19:22:06 (436 KB/s) - ‘find+the+image.zip’ saved [2500600/2500600]
```

I will find out the file type first , Then I unzip the file :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ ls
find+the+image.zip

sansforensics@as: ~/DF-LAB/CyberTalents
$ file find+the+image.zip 
find+the+image.zip: Zip archive data, at least v2.0 to extract

sansforensics@as: ~/DF-LAB/CyberTalents
$ unzip find+the+image.zip 
Archive:  find+the+image.zip
  inflating: find the image.pcap     
   creating: __MACOSX/
  inflating: __MACOSX/._find the image.pcap
```

After confirming here also we can use Wire Shark :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ ls
'find the image.pcap'   find+the+image.zip   __MACOSX
sansforensics@as: ~/DF-LAB/CyberTalents
$ file 'find the image.pcap'
find the image.pcap: pcap capture file, microsecond ts (little-endian) - version 2.4 (Ethernet, capture length 65535)
```

✅ The goal now: Extract an image from within the PCAP. We know that the file contains a captured network containing a leaked image. We need to extract it and then calculate the MD5.

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ wireshark 'find the image.pcap'
```

We opened the find the image.pcap file using Wireshark.

***

3. ## Preservation

   The original files were preserved without modification or alteration, and operations were performed on copies only to ensure the integrity of the evidence.

***

4. ## Analysis

   ✅ Opening a PCAP file using Wireshark:

From Statistics → Protocol Hierarchy, we found the presence of data within TCP.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454978018/7df9323a-31c1-4a57-abd0-2e52c95e7729.png" alt="" align="left" fullwidth="false" />

We traced the TCP Stream and found a human conversation with a file transfer plan :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454979513/96fa7fc3-0a03-4171-9874-49e356bf61ff.png" alt="" align="left" fullwidth="false" />

> The conversation revolved around using the cryptcat tool with the password: P\@ssawordaya.
>
> Someone had set up a listen on port 7070 in preparation for receiving the file.

It turned out that there was a human conversation that included a plan to send a file using the cryptcat tool and the password:

```css
P@ssawordaya
```

### The goal now:

Extract the file sent via port 7070 :

```markdown
tcp.port == 7070
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454981287/a5ba9f26-1f45-4d39-a0ac-cf8dd7a47597.png" alt="" align="left" fullwidth="false" />

> Follow TCP Stream Click on any packet that appears.
>
> Then from the menu, select:
>
> Right Click → Follow → TCP Stream
>
> A window will appear containing binary data—most likely an image :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454983352/6b1d39a3-662f-465c-80ae-f2ca4bbc06e4.png" alt="" align="left" fullwidth="false" />

> Saving Raw Data From the TCP Stream window, make sure Raw is selected.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454985393/6a48c527-dff3-4fd9-97cd-583483d11867.png" alt="" align="left" fullwidth="false" />

Then choose Save As and save the file :

```bash
leak_img.raw
```

File Type Analysis After saving the raw file, return to Terminal and use:

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ file leak_img.raw 
leak_img.raw: data

sansforensics@as: ~/DF-LAB/CyberTalents
$ stat leak_img.raw 
  File: leak_img.raw
  Size: 117382    	Blocks: 232        IO Block: 4096   regular file
Device: 802h/2050d	Inode: 3150104     Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/sansforensics)   Gid: ( 1000/sansforensics)
Access: 2025-07-28 19:44:29.142461763 +0000
Modify: 2025-07-28 19:43:05.020581269 +0000
Change: 2025-07-28 19:43:05.020581269 +0000
 Birth: -
```

> The file was saved successfully and its content is about 117 KB, but it currently only appears as data (i.e. its type is not automatically recognized).

### Manually verify file type using `xxd` And `hexdump` :

And Find signatures of popular files :

| File Type | Hex Signature             | ASCII      |
| --------- | ------------------------- | ---------- |
| JPEG      | `ff d8 ff`                | `ÿØÿ`      |
| PNG       | `89 50 4e 47 0d 0a 1a 0a` | `.PNG....` |
| GIF       | `47 49 46 38 39 61`       | `GIF89a`   |
| PDF       | `25 50 44 46`             | `%PDF`     |

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ xxd leak_img.raw | head -n 10
00000000: ffb8 6fa6 6b2b c05c e469 23f2 8821 38aa  ..o.k+.\.i#..!8.
00000010: badf 2986 3e27 8373 af87 f97f 03b3 c004  ..).>'.s........
00000020: ac09 98d9 3223 30ab 1b49 f9e3 01bf 2df2  ....2#0..I....-.
00000030: 3a52 ca50 5fb0 f2fe 8d46 0d32 0c67 a693  :R.P_....F.2.g..
00000040: 822e 6f0b 10ed 615d 0c5f 91d9 a3ed 9d43  ..o...a]._.....C
00000050: 61c0 c539 b37c 6514 aa86 3ae9 5b1e d66b  a..9.|e...:.[..k
00000060: ee7f 82e8 dbb5 1af7 33a5 da74 6505 47a9  ........3..te.G.
00000070: 6e4b 964c 6452 d038 38e7 5cc8 84ef 2554  nK.LdR.88.\...%T
00000080: 5b91 23b1 41c7 823c e9c1 e2e5 d9d0 e115  [.#.A..<........
00000090: fc9b b447 158b 1d6a cfd1 7ea4 d07f daf8  ...G...j..~.....

sansforensics@as: ~/DF-LAB/CyberTalents
$ hexdump -C leak_img.raw | head -n 10
00000000  ff b8 6f a6 6b 2b c0 5c  e4 69 23 f2 88 21 38 aa  |..o.k+.\.i#..!8.|
00000010  ba df 29 86 3e 27 83 73  af 87 f9 7f 03 b3 c0 04  |..).>'.s........|
00000020  ac 09 98 d9 32 23 30 ab  1b 49 f9 e3 01 bf 2d f2  |....2#0..I....-.|
00000030  3a 52 ca 50 5f b0 f2 fe  8d 46 0d 32 0c 67 a6 93  |:R.P_....F.2.g..|
00000040  82 2e 6f 0b 10 ed 61 5d  0c 5f 91 d9 a3 ed 9d 43  |..o...a]._.....C|
00000050  61 c0 c5 39 b3 7c 65 14  aa 86 3a e9 5b 1e d6 6b  |a..9.|e...:.[..k|
00000060  ee 7f 82 e8 db b5 1a f7  33 a5 da 74 65 05 47 a9  |........3..te.G.|
00000070  6e 4b 96 4c 64 52 d0 38  38 e7 5c c8 84 ef 25 54  |nK.LdR.88.\...%T|
00000080  5b 91 23 b1 41 c7 82 3c  e9 c1 e2 e5 d9 d0 e1 15  |[.#.A..<........|
00000090  fc 9b b4 47 15 8b 1d 6a  cf d1 7e a4 d0 7f da f8  |...G...j..~.....|
```

This is not a standard signature for any known file type (JPG, PNG, GIF, PDF, etc.). This suggests two possibilities:

### ✅ Use the cryptcat tool to decrypt.

Steps: Install the cryptcat tool (if it isn't installed):

```bash
sudo apt install cryptcat
```

Run cryptcat to decrypt the raw file:

```bash
cryptcat -k "P@ssawordaya" -x < leak_img.raw > decrypted_output
```

> It was borrowed.. ⚠️ Use -x to decrypt directly from stdin, and -k for the password
>
> 🔻 The cryptcat tool does not support the -x option as you saw, because it is not the same as openssl

### ✅ Realistic solution: Cryptcat doesn't use complex encryption.

> It simply uses XOR encryption, and it can be decrypted using manual tools (if it uses an XOR key). But in our case, they most likely used Cryptcat with normal encryption using a password.
>
> 🔐 Does Cryptocat use XOR encryption? No, it relies on Blowfish encryption in older versions, or Twofish in some other versions, and is done by generating a key from the password using a hash function.

When using:

```bash
cryptcat -l -p 7070 -k "P@ssawordaya"
```

> The program generates a key derived from the password (usually using MD5) to encrypt/decrypt the data using an algorithm such as Blowfish.
>
> Therefore, decryption cannot be done simply using XOR tools such as xxor or cyberchef XOR.

### ⚠️ Important:

📌 As long as the conversation clearly indicates that they used cryptcat, and the password is known, the best and fastest method is.

### ✅ Try running cryptcat as a local server/client We simulate what happened on the network ourselves :

**🛠️ 1. Open two terminals:**

The first terminal (which is the Listener — as if you were the victim):

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ cryptcat -l -p 7070 -k "P@ssawordaya" > final_image
```

Second terminal (which is the sender):

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ cat leak_img.raw | nc localhost 7070
```

✅ Once you send the file from the second terminal, it will be in the first terminal inside the `final_image` file.

### 🧪 After that:

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ file final_image 
final_image: JPEG image data, JFIF standard 1.02, resolution (DPI), density 72x72, segment length 16, Exif Standard: [TIFF image data, big-endian, direntries=7, orientation=upper-left, xresolution=98, yresolution=106, resolutionunit=2, software=Adobe Photoshop 7.0, datetime=2012:07:30 17:31:00], baseline, precision 8, 1600x1200, components 3
```

Rename it and open it:

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ mv final_image img.jpg

sansforensics@as: ~/DF-LAB/CyberTalents
$ xdg-open img.jpg
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1753734360981/83df5d06-264b-4051-ad4c-d864836044ad.png" alt="" align="center" fullwidth="false" />

### To calculate the required value for the challenge :

```bash
sansforensics@as: ~/DF-LAB/CyberTalents
$ md5sum img.jpg 
3beef06be834f3151309037dde4714ec  img.jpg
```

***

5. ## Reporting 🎯

   Objective: Extract a leaked image hidden within a pcap file sent via cryptcat.

   🔐 Encryption Tool: Cryptcat

   🔑 Password Used: P\@ssawordaya

   📤 Output File: img.jpg

   🧮 Final MD5 Value:

```css
3beef06be834f3151309037dde4714ec
```

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

