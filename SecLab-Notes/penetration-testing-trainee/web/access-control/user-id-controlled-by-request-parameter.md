---
id: "68ee8113d27df768aa27cacb"
title: "User ID controlled by request parameter"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/web/access-control/user-id-controlled-by-request-parameter"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T16:57:55.154Z"
updatedAt: "2026-01-25T15:35:47.014Z"
---

[Web Security Academy](https://portswigger.net/web-security) >> [Access control](https://portswigger.net/web-security/access-control) >> [Lab](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter)

The goal is to get the API key of user carlos :

We will log in with wiener:peter .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454739714/8a74dbcc-3ddd-4c87-988a-03c120938328.png" alt="" align="left" fullwidth="false" />

So to get the API Key, we must go to Carlos’s page .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454741016/99956d1e-317b-4637-b896-60b520359b58.png" alt="" align="left" fullwidth="false" />

If you notice in the URL, the user ID appears as the user name, so we can change the name to the user Carlos .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454742428/d6f28383-4d6f-4785-8266-955123aa39a2.png" alt="" align="left" fullwidth="false" />

We need to change the id from wiener to carlos

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454743694/7a3d1dac-0fbc-4902-a0fd-1b06e7743a99.png" alt="" align="left" fullwidth="false" />

Therefore, we will send the request to the repeater :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454745049/ad78b735-f820-4d7c-9b99-c31c8f403b1a.png" alt="" align="left" fullwidth="false" />

Change the ID , And send the request :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454746727/6270000b-a223-47ab-ab71-14915cb17146.png" alt="" align="left" fullwidth="false" />

The response came and he has already registered using the user carlos, so search in the search box for “API”.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454748085/1adff809-68a9-4686-8b3e-8bf20b053ea0.png" alt="" align="left" fullwidth="false" />

Here we are .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454749278/8f08bc51-c0ea-4ff0-865a-5bd59124db6b.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

We could have changed the ID from wiener to carlos inside the URL and see what happens , Sometimes it works, but on this site it did not work, so we logged in to the user Carlos, using burp .

> **See you soon in other reports….!!**
>
> **Abdelwahab\_Shandy**
>
> **AS\_Cyber**

