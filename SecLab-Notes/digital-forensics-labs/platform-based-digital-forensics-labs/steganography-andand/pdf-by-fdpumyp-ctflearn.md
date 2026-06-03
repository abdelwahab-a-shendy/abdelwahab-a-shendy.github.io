
**Forensics**

[Challenge — PDF by fdpumyp — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/957)

Hi, just as we talked during a break, you have this file here and check if something is wrong with it. That’s the only thing we found strange with this suspect, I hope there will be a password for his external drive

Bye

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

We took the download link and used **wget** to download the :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455079921/241605fc-8f64-4586-bb1a-1e2d565498fb.png" alt="" align="left" fullwidth="false" />

I always change the names to something that is closest to what we do, so I changed the name of the file to the name of the task that we are doing now , Now let’s get started :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455081048/683e9b8f-69e8-45ea-ab47-e7b39f65b089.png" alt="" align="left" fullwidth="false" />

Here we define the **file** type , There are a lot of interesting things :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455082194/eefe1c4f-c678-405c-8e54-f86ea1950403.png" alt="" align="left" fullwidth="false" />

I decided to use exif and exiftool , Nothing important

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455083722/cf1bb681-b258-4f1c-b6d8-19327dbc6ce9.png" alt="" align="left" fullwidth="false" />

Let’s search using **strings :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455085006/034c2196-a392-407c-8f7a-3e938e44ac36.png" alt="" align="left" fullwidth="false" />

With the use of strings, at the end of the file I found some information :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455086257/f442b477-807e-478a-90af-b50478abe610.png" alt="" align="left" fullwidth="false" />

I took this, and searched it on [https://cyberchef.org/](https://cyberchef.org/)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455087459/e5bea682-db91-4ac8-99bb-4fcb292bc799.png" alt="" align="left" fullwidth="false" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455088782/88378ee2-8c8f-41ea-bfe5-c03b3662b472.png" alt="" align="left" fullwidth="false" />

***Here is the flag***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455090069/a6bd8a5d-d26b-4cde-a610-22beb1205f06.png" alt="" align="left" fullwidth="false" />

> **See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

