
[Web Security Academy](https://portswigger.net/web-security) >>[Information disclosure](https://portswigger.net/web-security/information-disclosure) >> [Exploiting](https://portswigger.net/web-security/information-disclosure/exploiting) >> [Lab](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-via-backup-files)

This lab leaks its source code via backup files in a hidden directory. To solve the lab, identify and submit the database password, which is hard-coded in the leaked source code .

If the source code is in the backup files, and also two backup files are in a hidden directory, then we have to find that directory :

> https\://0af100de0405d8cc805bb22a004a0053.web-security-academy.net/**robots.txt**

The “robots .txt” directory is often used, because the robots.txt file is a useful tool for managing how a website interacts with search engines, but it must be kept in mind that using it is not an effective way to block access to sensitive resources. These instructions specify which pages should Or it should not be indexed by these engines.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454599550/bb17624c-ba01-4f9f-b05c-7b27608fe895.png" alt="" align="left" fullwidth="false" />

We’ve already found a backup file for that :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454600765/38e412f3-3574-4dd2-af7b-405fae3f668a.png" alt="" align="left" fullwidth="false" />

And when we opened that file ProductTemplate.java.bak:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454602561/c49ec00d-15a8-43b8-90d2-d1225a985ac3.png" alt="" align="left" fullwidth="false" />

We can also find the backup file in another way. You can continue reading if you want to benefit…….

In short, this means that you use [FeroxBuster](https://github.com/epi052/feroxbuster) to scan the specified location while using the specified list of [words](https://github.com/Bo0oM/fuzz.txt/blob/master/fuzz.txt) to search for hidden or unknown files and paths.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454604571/20093bf7-8113-4aee-9eac-c1e152f912fb.png" alt="" align="left" fullwidth="false" />

Indeed, in the end, we found what we wanted and reached the same file .

> ***See you soon in other reports….!!***

> ***Abdelwahab\_Shandy***

> ***AS\_Cyber***

