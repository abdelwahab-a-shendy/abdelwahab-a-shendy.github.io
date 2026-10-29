
**Forensics**

[Challenge — Chalkboard — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/972)

Solve the equations embedded in the jpeg to find the flag. Solve this problem before solving my Scope challenge which is worth 100 points.

[math.jpg](https://ctflearn.com/challenge/download/972)

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

We took the download link and used **wget** to download the :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454845978/aaea158e-af70-41cb-9328-dd27fe4b8f52.png" alt="" align="left" fullwidth="false" />

I always change the names to something that is closest to what we do, so I changed the name of the file to the name of the task that we are doing now , Now let’s get started :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454847731/bf793687-f40c-444a-9bae-0adb4b4ee8cf.png" alt="" align="left" fullwidth="false" />

Here we define the **file** type , There are a lot of interesting things :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454848946/7eb8094a-bcf6-4d65-a826-cd99bcd431d1.png" alt="" align="left" fullwidth="false" />

I decided to use exif and exiftool:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454850309/330e930e-a636-41c4-a370-d868496b0a3f.png" alt="" align="left" fullwidth="false" />

We found this comment suspicious :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454851635/4a727e57-73e9-4404-836d-a7cf4fa01aed.png" alt="" align="left" fullwidth="false" />

Let’s search using **strings :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454852736/44d7c89b-541d-483d-9a37-da6da93e1da4.png" alt="" align="left" fullwidth="false" />

It’s a math story , We have to solve it then :

When I substituted the two equations, I found that x = 2 and y = 5

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454853956/d16f9c3f-911b-48cf-8296-8134c64fe5a0.png" alt="" align="left" fullwidth="false" />

> **Here is the flag\
> See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

