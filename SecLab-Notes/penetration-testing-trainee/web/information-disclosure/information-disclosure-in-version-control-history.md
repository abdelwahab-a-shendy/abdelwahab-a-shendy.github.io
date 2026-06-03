---
id: "68ee808a91218581d275904b"
title: "Information disclosure in version control history"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/web/information-disclosure/information-disclosure-in-version-control-history"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T16:55:38.125Z"
updatedAt: "2026-01-25T15:35:47.006Z"
---

[Web Security Academy](https://portswigger.net/web-security) >> [Information disclosure](https://portswigger.net/web-security/information-disclosure) >> [Exploiting](https://portswigger.net/web-security/information-disclosure/exploiting) >> [Lab](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-in-version-control-history)

This lab discloses sensitive information via its version control history. To solve the lab, obtain the password for the `administrator` user then log in and delete the user `carlos`.

The task here is to find the admin’s password and then delete the user Carlos ……………

In short, this command runs the [**FeroxBuster**](https://github.com/epi052/feroxbuster) tool to discover paths and files on the specified location using the specified list of [**words**](https://github.com/Bo0oM/fuzz.txt/blob/master/fuzz.txt).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454632132/6205103f-85b5-41ad-a7a7-8fa04c860937.png" alt="" align="left" fullwidth="false" />

Indeed, he has brought out some important paths for me here :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454634306/dd37a000-767b-4781-9fd5-8f0f2fb2bf3a.png" alt="" align="left" fullwidth="false" />

When you open this guide, you will find the following :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454636049/bbb2f3bb-b587-4528-83cc-3fb7505dda76.png" alt="" align="left" fullwidth="false" />

When I searched here I found the following :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454637559/332b3db2-f955-48ca-a678-e27ad0bf735a.png" alt="" align="left" fullwidth="false" />

These two sentences refer to a series of actions in the software development process, usually done using a version control system such as Git. Let me explain to you:

“commit (initial): Add skeleton admin panel”:\
 “commit”: A Git term that refers to logging specific changes to files in a Git repository.\
 “(initial)”: Indicates that this comment relates to the first or basic modifications to the project.\
 “Add skeleton admin panel”: A description of the changes made, whereby a skeleton (or template) of the Admin Panel interface (Admin Panel) has been added to the project.

“Remove admin password from config”:\
 This comment indicates another change made to the project.\
 It appears that the Admin password has been removed from the config file, possibly for security reasons or to avoid putting a sensitive password in a public file.\
But do not forget, our mission is to find the password for the admin , so :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454638922/48ee162e-5eb3-4997-8ae0-bd1ca2d13ed1.png" alt="" align="left" fullwidth="false" />

This command uses the wget tool to download (or retrieve) the content of the .git folder from the specified website. Let’s explain it:

wget: is a Linux command used to download files from the web.

-r: This option means “read resources recursively”, and indicates that wget should recursively download all links on the target page.

[https://0a5b00af03d5a8af805d3fcf00a600ea.web-security-academy.net/.git/](https://0a5b00af03d5a8af805d3fcf00a600ea.web-security-academy.net/.git/): This is the URL of the .git folder in the target website, it contains the .git folder, which is the Git version control system folder that contains all the history of changes and related data With the project.

In short, this command uses wget to download the content of the .git folder from the specified website, enabling the user to access all version data and changes in the project, which is exactly what we want, so we don’t see

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454640334/35ad65a8-62c6-43a7-a353-9df3370411a7.png" alt="" align="left" fullwidth="false" />

Now we will open the downloaded file :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454642157/812cde7c-01a4-4561-818e-e4daa0e0b92e.png" alt="" align="left" fullwidth="false" />

We will restore the commit :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454643749/e30bd9e8-5ffa-4e70-a4ff-5ac707d22712.png" alt="" align="left" fullwidth="false" />

Of course yes :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454645262/2a828fde-f35e-490b-9c6b-193364eb652f.png" alt="" align="left" fullwidth="false" />

It will show what the admin has already done :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454646427/4298b162-a4c4-4d0a-b942-2eeb39067476.png" alt="" align="left" fullwidth="false" />

Now that we have obtained the password, we will enter the admin panel :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454647886/d0eeb006-f79f-4f5e-a19d-51322afb4e60.png" alt="" align="left" fullwidth="false" />

Already logged in :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454649260/1988bd17-2923-4577-9c24-fb99b7441b96.png" alt="" align="left" fullwidth="false" />

We will delete the carlos user

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454650533/29d50a06-d14f-457d-8f4d-25638e77eb16.png" alt="" align="left" fullwidth="false" />

Yes, we succeeded this time too

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454652073/f96dd709-3a46-439c-970a-4d7b918b7bd0.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

> **See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

