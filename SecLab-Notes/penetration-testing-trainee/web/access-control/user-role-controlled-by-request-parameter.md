---
id: "68ee815894cc3894479a9a8b"
title: "User role controlled by request parameter"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/web/access-control/user-role-controlled-by-request-parameter"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T16:59:04.579Z"
updatedAt: "2026-01-25T15:35:47.017Z"
---

[Web Security Academy](https://portswigger.net/web-security) >> [Access control](https://portswigger.net/web-security/access-control) >> [Lab](https://portswigger.net/web-security/access-control/lab-user-role-controlled-by-request-parameter)

Well, I checked the robots.txt file, and also the code for the site, and also guessed the hidden directory, but in the end I did not find anything, so we will use burp , But in the end we must access the admin panel ؟؟

So we tried adding /admin. We might achieve something, but:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454694034/bf8a2b66-b8c7-4019-9e42-331b3a29d114.png" alt="" align="left" fullwidth="false" />

First of all, you must log in using “ wiener:peter ”.

But I found the message “Admin interface is only available if you are logged in as administrator”

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454695435/2ce1aa9c-eae8-4bb5-b2c3-e93f08870c34.png" alt="" align="left" fullwidth="false" />

I will run intercept in burp , I will try again, adding admin again and narrating the request and it is going to the server :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454697265/2305d26a-0881-4dac-b02f-46213b5a17ef.png" alt="" align="left" fullwidth="false" />

This series contains two cookies:

“Admin=false”: This cookie indicates that the current user is not a system administrator. A value of “false” indicates that he is not a manager.\
 “session=0dl420TfDQJuY2vIiMv6ZCC8W0z2wPAs”: This cookie is used to set the user’s session. This cookie is supposed to contain a session identifier that is used to identify the user and allow them to access appropriate content in the application.

So, if we change the value of “false” to “true”, will it then make me go to the admin panel? Let’s try.

Cookie: Admin=false; session=0dl420TfDQJuY2vIiMv6ZCC8W0z2wPAs

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454699134/f00bb9a6-f438-4078-96be-310939142386.png" alt="" align="left" fullwidth="false" />

We have already changed the value and it has already entered the admin panel :

Cookie: Admin=true; session=0dl420TfDQJuY2vIiMv6ZCC8W0z2wPAs

Well, we have already reached the admin panel :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454700985/f649461f-6e12-437b-8449-d542d9d9c7eb.png" alt="" align="left" fullwidth="false" />

But I ran into a problem when I deleted the user Carlos. He refused to do so. It seems that he checks the cookies on every request the user makes for that , We will do the following :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454702376/8837dca6-e15f-4d42-8de0-0b6044dab27c.png" alt="" align="left" fullwidth="false" />

You will open the proxy settings .

After that, go to match and replace rules , You will add a new part as follows :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454703645/75cc4e31-6485-46b0-a681-9c9784a7a316.png" alt="" align="left" fullwidth="false" />

After this point and adding it from the burp, the curator will enable you to delete the user without stopping the request and modifying it:

> **See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

