---
id: "68ee80abd27df768aa27cac2"
title: "Authentication bypass via information disclosure"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/web/information-disclosure/authentication-bypass-via-information-disclosure"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T16:56:11.833Z"
updatedAt: "2026-01-25T15:35:47.007Z"
---

[Web Security Academy](https://portswigger.net/web-security) >> [Information disclosure](https://portswigger.net/web-security/information-disclosure) >> [Exploiting](https://portswigger.net/web-security/information-disclosure/exploiting) >> [Lab](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-authentication-bypass)

Learn to log in using the username and password : `wiener:peter`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454657457/76a5556b-775c-406f-93ba-624cfa3a1121.png" alt="" align="left" fullwidth="false" />

browse to GET /admin :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454658935/b48d28fb-4d64-461f-b343-1c52b52eb9e1.png" alt="" align="left" fullwidth="false" />

If we go to the Burp :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454660886/7b91e47a-86d8-4fcf-ab09-f33be9a8d311.png" alt="" align="left" fullwidth="false" />

We can change the GET in the TRACE , By sending it to Repeater :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454662369/0b352fbf-412d-4f1a-bc77-d5cab8a542e6.png" alt="" align="left" fullwidth="false" />

Then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454663781/23ce8585-5c1a-40a8-bc81-e6890918d861.png" alt="" align="left" fullwidth="false" />

This X-Custom-IP-Authorization header has the IP address “156.174.229.54”. IP addresses are commonly used to identify communication sources in networks. In this case, the header could be part of a custom authentication system where IP addresses are used to determine access to resources or services.

`X-Custom-IP-Authorization: 127.0.0.1`

If we change “X-Custom-IP-Authorization: 156.174.229.54” to “X-Custom-IP-Authorization: 127.0.0.1”……………….\
This X-Custom-IP-Authorization header has the IP address “127.0.0.1”. The address 127.0.0.1 refers to the address of “localhost” or your computer itself. Mostly, this type of header is used to validate requests or to manage access. This header can have different meanings depending on the context in which it is used, for example if it is part of a custom authentication scheme, if we use it with GET in the TRACE and set X-Custom-IP-Authorization: 127.0.0.1 with the request .

So I’m going to run intercept , Let us change the order as follows\
We will add “X-Custom-IP-Authorization: 127.0.0.1” to each request :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454665253/9bb56ef2-6628-4b78-bbce-c4e18b02b703.png" alt="" align="left" fullwidth="false" />

in this way , Then we will delete the user carlos :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454666731/14fe1519-b318-4143-9690-15dc6f62e8de.png" alt="" align="left" fullwidth="false" />

Don’t forget to put “X-Custom-IP-Authorization: 127.0.0.1” in each request :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454668350/16de349f-7d79-4e9c-b04e-c03d0825e157.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

> ***See you soon in other reports….!!***

> ***Abdelwahab\_Shandy***

> ***AS\_Cyber***

