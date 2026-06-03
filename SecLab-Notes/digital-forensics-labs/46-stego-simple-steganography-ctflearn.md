
**Forensics**

[Challenge — Simple Steganography — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/894)

Think the flag is somewhere in there. Would you help me find it? hint-” Steghide Might be Helpfull”

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

We took the download link and used **wget** to download the :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454787738/e6520e6b-8757-4ee5-b095-6e665fbd29f4.png" alt="" align="left" fullwidth="false" />

I always change the names to something that is closest to what we do, so I changed the name of the file to the name of the task that we are doing now , Now let’s get started :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454789220/61d9d31c-af9a-44e5-bd37-0ed2da0aab90.png" alt="" align="left" fullwidth="false" />

Here we define the **file** type , There are a lot of interesting things :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454790562/89137686-b714-4b1a-9ab1-2362d19d7227.png" alt="" align="left" fullwidth="false" />

I decided to use exif and exiftool, but nothing new :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454792310/91a95b91-74a7-4401-a40c-3c31812fd37f.png" alt="" align="left" fullwidth="false" />

It seems like strings didn’t work this time :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454793556/c56d3feb-99e9-45da-90fd-a1f56736f621.png" alt="" align="left" fullwidth="false" />

The appearance of the word (myadmin) caught my attention in every way.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454794962/d49ed162-fbb8-4e12-964f-4e61d72edf35.png" alt="" align="left" fullwidth="false" />

I went back and found keywords, but why?

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454796295/0562c890-86aa-4cac-a4ca-51ae023aca61.png" alt="" align="left" fullwidth="false" />

Binwalk didn’t work either :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454797680/435ee911-c2ec-412c-8c7e-725f87236ca1.png" alt="" align="left" fullwidth="false" />

I used foremost :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454799046/ed823613-2e74-41ca-a57d-8130c7b8933b.png" alt="" align="left" fullwidth="false" />

> ***Let’s break down the options you’ve provided:***

> **-v**: This stands for verbose mode, which means the command will provide more detailed output about its operations.

> **-q**: This stands for quiet mode, which typically suppresses normal output, and only error messages or important information are displayed.

> **i Minionsl.jpeg**: This specifies the input file or device from which foremost should recover data. In this case, it’s looking for data in the file named “Minionsl.jpeg.”

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454800663/039d2c21-8e16-4a3a-a720-71b7d22ea7b3.png" alt="" align="left" fullwidth="false" />

It seems that the matter is related to the audit file. Inside the image, after all this research, it appears that the private key to open this file is (myadmin).

Well we have to use Google, it has been discontinued .

> After a lot of searching I found a tool called steghide, I installed it and then…

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454802083/0dc9e41e-aa07-47f9-96fb-724682413dd5.png" alt="" align="left" fullwidth="false" />

> We used help :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454803423/67380c5e-b130-4814-8bb5-d993abf8bdb6.png" alt="" align="left" fullwidth="false" />

> Let’s break down the options you’ve provided:

> **steghide — extract -sf Minionsl.jpeg -p myadmin\
>  — extract**: This option specifies that you want to extract (uncover) hidden data from the specified file.

> **-sf Minionsl.jpeg**: This option specifies the source file from which you want to extract the hidden data. In this case, it’s “Minionsl.jpeg.”

> **-p myadmin**: This option is used to provide the passphrase or password that was used during the embedding process. The passphrase is necessary to successfully extract the hidden data.

> So, the command is instructing steghide to extract hidden data from the “Minionsl.jpeg” file using the passphrase “myadmin.” Keep in mind that the success of the extraction depends on using the correct passphrase that was used during the embedding process.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454804823/f6380763-5fe4-449a-be4e-e92c301b9d85.png" alt="" align="left" fullwidth="false" />

Here I used [https://cyberchef.org/](https://cyberchef.org/) , I didn’t know what to use so I used migic:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454806245/b967e4c5-1b3b-4519-8d9b-9d57b4eb1b58.png" alt="" align="left" fullwidth="false" />

Well it looks like Base64 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454807668/e814df54-87d4-4955-a11b-e46da9641bb7.png" alt="" align="left" fullwidth="false" />

To make it more clear, I used the command :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454808938/c83982eb-9122-4f37-bcaf-7c12f1e73b91.png" alt="" align="left" fullwidth="false" />

> **Here is the flag\
> See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

