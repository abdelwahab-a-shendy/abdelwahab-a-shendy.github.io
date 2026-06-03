
**Forensics**

[Challenge — Minions — CTFlearn — CTF Practice — CTF Problems — CTF Challenges](https://ctflearn.com/challenge/955)

Hey! Minions have stolen my flag, encoded it few times in one cipher, and then hidden it somewhere there: [https://mega.nz/file/1UBViYgD#kjKISs9pUB4E-1d79166FeX3TiY5VQcHJ\_GrcMbaLhg](https://mega.nz/file/1UBViYgD#kjKISs9pUB4E-1d79166FeX3TiY5VQcHJ_GrcMbaLhg) Can you help me? TIP: Decode the flag until you got a sentence.

Don’t forget we always work inside VMs .

So we’ll upload the file there and then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454767712/2e4fc943-ec73-4362-a1d3-f2d3caa82b58.png" alt="" align="left" fullwidth="false" />

Here we define the **file** type , There are a lot of interesting things :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454769126/72951a83-2913-4267-bfd4-2dbccc7775b7.png" alt="" align="left" fullwidth="false" />

I decided to use exif and exiftool, but no positive result :

Then we used binwalk :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454770505/b75b7504-2f45-4c1d-b058-02f25f0bd49c.png" alt="" align="left" fullwidth="false" />

We accessed the extracted file, and then determined the type of this compressed file:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454771853/a00f6dc7-f33c-47c2-bdc5-2f7f7fd1113a.png" alt="" align="left" fullwidth="false" />

It seems that the file (..txt) is related to something :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454773199/1f57ed95-a61f-4503-a5c9-d523da620744.png" alt="" align="left" fullwidth="false" />

We read the file :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454774786/47284ac3-8106-487f-9da0-6bedc0f86980.png" alt="" align="left" fullwidth="false" />

There appears to be a file , I downloaded the file :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454776161/e4f28d0c-ef96-4f6a-a2c2-11aab50facb7.png" alt="" align="left" fullwidth="false" />

Here we define the **file** type , There are a lot of interesting things :

I decided to use exif and exiftool, but no positive result :

Then we used binwalk :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454777411/f7102031-575b-448c-ad24-63a3e26e414e.png" alt="" align="left" fullwidth="false" />

It seems I reached the goal :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454778975/17691bec-8fea-40dc-9664-1617cff617c7.png" alt="" align="left" fullwidth="false" />

I decided to use file and exiftool, but nothing seemed to really matter :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454780556/90ecf835-711a-4d34-9580-9c59df937cb1.png" alt="" align="left" fullwidth="false" />

I used strings :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454782096/059e2406-2c55-422b-8ea4-42ca2f2f939f.png" alt="" align="left" fullwidth="false" />

I used my friend [https://cyberchef.org/](https://cyberchef.org/) :

And also do not forget that note (TIP: Decode the flag until you got a sentence.)

And Base64 :

> ***CTF\{VmtaU1IxUXhUbFZSYXpsV1RWUnNRMVpYZEZkYWJFWTJVVmhrVlZGVU1Eaz0=)***

> ***VmtaU1IxUXhUbFZSYXpsV1RWUnNRMVpYZEZkYWJFWTJVVmhrVlZGVU1Eaz0***

> ***VkZSR1QxTlVRazlWTVRsQ1ZXdFdabEY2UVhkVVFUMDk=***

> ***VFRGT1NUQk9VMTlCVWtWZlF6QXdUQT09***

> ***TTFOSTBOU19BUkVfQzAwTA==***

> ***M1NI0NS\_ARE\_C00L***

> ***CTF\{VmtaU1IxUXhUbFZSYXpsV1RWUnNRMVpYZEZkYWJFWTJVVmhrVlZGVU1Eaz0=)***

> ***CTF\{M1NI0NS\_ARE\_C00L)***

*See you soon in other reports….!!*

*Abdelwahab\_Shandy*

*AS\_Cyber*

