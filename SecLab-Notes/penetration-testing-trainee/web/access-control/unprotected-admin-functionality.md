---
id: "68ee81a209810160782c28b5"
title: "Unprotected admin functionality"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/web/access-control/unprotected-admin-functionality"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T17:00:18.232Z"
updatedAt: "2026-01-25T15:35:47.018Z"
---

[Web Security Academy](https://portswigger.net/web-security) >> [Access control](https://portswigger.net/web-security/access-control) >> [Lab](https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality)

So first we have to access the admin panel ؟؟

After collecting information on the site, I see no better guess than discovering hidden directories and files on web servers, because I don’t have any login data so we will do the following:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454674459/e7ac14b2-e81f-48e4-806d-a30334fb796d.png" alt="" align="left" fullwidth="false" />

In this context, the command appears to be used to scan a specific URL, which is “[https://0a13006e035c43fd8596df8700f9007f.web-security-academy.net/](https://0a13006e035c43fd8596df8700f9007f.web-security-academy.net/)", using a specific wordlist called “fuzz.txt”, which contains a set Potential keywords that could be used in an attack on the application.

In more detail:

“-u” specifies the URL to be scanned.\
 “-w” specifies the path to the wordlist to be used in the attack.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454676117/1119a8d3-ea36-4201-b758-b8a820f2fe14.png" alt="" align="left" fullwidth="false" />

**Robots.txt** file is a file used by site owners to instruct search engines about which pages they are allowed to visit and which should be ignored.

When you visit this link, you will likely see restrictive search engine instructions, specifying which pages should not be indexed, and which pages should be indexed.

For example, Robots.txt files can contain instructions such as:

Determine which folders should not be indexed.\
 Identify specific files that search engines should not visit.\
 Determine the search engine definition sites (sitemap) for the site.

Scanning the Robots.txt file can be an important part of the security scan process and evaluating potential attacks on the site.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454677631/ee48b7a0-1e50-421b-9529-93a6bc6a1df3.png" alt="" align="left" fullwidth="false" />

We will add this page with the link /administrator-panel , Let’s see what happens :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454678953/0178dac2-6d42-4149-8138-e0790e906204.png" alt="" align="left" fullwidth="false" />

Here we have reached the admin panel , Now we will delete the user carlos :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454680259/14e5840f-56bc-4374-9b4e-6aa78c825f33.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

> ***See you soon in other reports….!!***

> ***Abdelwahab\_Shandy***

> ***AS\_Cyber***

