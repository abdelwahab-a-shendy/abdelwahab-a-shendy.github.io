---
id: "68ee629917b2e4102dfb169e"
title: "Leviathan : level 0"
description: "OverTheWire"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/general-ctf/linux-labs-review/leviathan-linux/leviathan-level-0"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T14:47:53.231Z"
updatedAt: "2026-01-25T15:35:47.041Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455001016/6b4fc36d-da57-4e7d-9e1b-80821cef9438.png" alt="" align="left" fullwidth="false" />

Leviathan

### Dare you face the lord of the oceans?

Leviathan is a wargame that has been rescued from the demise of **intruded.net**, previously hosted on leviathan.intruded.net. **Big thanks to adc, morla and reth** for their help in resurrecting this game!

Description:\
This wargame doesn't require any knowledge about programming - just a bit of common\
sense and some knowledge about basic \*nix commands. We had no idea that it'd be this\
hard to make an interesting wargame that wouldn't require programming abilities from\
the players. Hopefully we made an interesting challenge for the new ones.

Leviathan’s levels are called **leviathan0, leviathan1, … etc.** and can be accessed on **leviathan.labs.overthewire.org** through SSH on port 2223.

To login to the first level use:

ssh -p 2223 leviathan0\@leviathan.labs.overthewire.org\
Password: leviathan0

Data for the levels can be found in **the homedirectories**. You can look at **/etc/leviathan\_pass** for the various level passwords.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455002860/dae47385-ed44-4ae0-9d96-582c7e808e8c.png" alt="" align="left" fullwidth="false" />

As usual, we did not find visible files, so we used -a, to show the files,Then we found this file named bookmarks.html ,When I first tried to read the files, I learned that it was huge

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455004160/2c1a1c68-077f-4d5f-8fcb-f55be24b6bab.png" alt="" align="left" fullwidth="false" />

So I used wc :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455005477/67444608-4b98-4d20-9fa6-58f98c6c0764.png" alt="" align="left" fullwidth="false" />

Here I read the file using cat, and output anything with the name password .

> ***See you soon in other reports….!!***

> *Abdelwahab\_Shandy*

> *AS\_Cyber*

