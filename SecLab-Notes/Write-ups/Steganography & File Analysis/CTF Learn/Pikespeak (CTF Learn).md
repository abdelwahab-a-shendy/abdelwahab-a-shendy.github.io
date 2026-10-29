
<Image src="https://miro.medium.com/v2/resize:fit:875/1*H6P5qN5CmICX178TM6XZLA.png" align="left" fullwidth="false" />

[Challenge — PikesPeak — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/935)

Pay attention to those strings!

[PikesPeak.jpg](https://ctflearn.com/challenge/download/935)

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

We took the download link and used **wget** to download the :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454859730/357a91be-771f-4a99-8a93-2d7f65ff7f81.png" alt="" align="left" fullwidth="true" />

I always change the names to something that is closest to what we do, so I changed the name of the file to the name of the task that we are doing now , Now let’s get started :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454861132/9108a0ab-c389-46b1-8708-dcce93f81440.png" alt="" align="left" fullwidth="true" />

Here we define the **file** type , There are a lot of interesting things :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454862580/630b1649-162f-4364-b4d6-c7fe0b485e2d.png" alt="" align="left" fullwidth="true" />

If you notice, you will find a number of many comments here .

I decided to use exif and exiftool. We found a comment, but I don’t think it’s the flag.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454864087/7cbd55d4-2a2f-4be1-8e3a-938be376ea56.png" alt="" align="left" fullwidth="true" />

Let’s search using **strings :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454865340/b276a2d1-4923-436a-a9e4-d5e916443e4f.png" alt="" align="left" fullwidth="true" />

We found a group of flags, we have to find out which one of them is correct .

If we go back to the CTFs, the other ones we played before, we find that the first letter in the flag is CTFlearn.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454866541/fc2f4bab-1429-4fab-b958-b480eb48847b.png" alt="" align="left" fullwidth="true" />

> **Here is the flag\
> See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

