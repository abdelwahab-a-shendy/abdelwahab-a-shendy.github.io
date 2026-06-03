---
id: "68ee7fd633831b928dce5746"
title: "Information disclosure in error messages"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/web/information-disclosure/information-disclosure-in-error-messages"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T16:52:38.077Z"
updatedAt: "2026-01-25T15:35:47.002Z"
---

[**Web Security Academy**](https://portswigger.net/web-security) **>>** [**Information disclosure**](https://portswigger.net/web-security/information-disclosure) **>>** [**Exploiting**](https://portswigger.net/web-security/information-disclosure/exploiting) **>>** [**Lab**](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-in-error-messages)

***

This lab’s verbose error messages reveal that it is using a vulnerable version of a third-party framework. To solve the lab, obtain and submit the version number of this framework.

Information disclosure in error messages

First of all, do not forget that he wants us to obtain the version number of the framework , Because it is a weak version .

As a person who specializes in web testing, you must, above all else, browse the page very normally, and then do unnatural things.

After starting to search the page, I found that there are a number of products, and each product has a number (productId).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454583859/28d5b99f-0df4-4e6f-ad7a-d1d9d78666c4.png" alt="" align="left" fullwidth="false" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454585152/b57ba079-be2c-4f56-aa43-8f275da004ed.png" alt="" align="left" fullwidth="false" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454586229/0110e65b-0934-4b6a-a0b6-1f2e4bf3e09c.png" alt="" align="left" fullwidth="false" />

We can also find out this using BURP :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454587345/31f35175-f7bd-4585-ad90-0dd363598bd4.png" alt="" align="left" fullwidth="false" />

So, when the productId number is changed, it gives a different value every time , These are called GET requests, or get-result requests.

There are other types of requests called post, and they are used when logging in to the site. In other words, they occur when data is sent from our device to the server we are talking to, or in other words, data is sent from the client to the server.

> [https://0a7a005304e36a5981cbdebf00cb0079.web-security-academy.net/product?productId=**2**](https://0a7a005304e36a5981cbdebf00cb0079.web-security-academy.net/product?productId=2)

> /product?productId=**2**

In the end, we know that no matter how many numbers the value changes, it will give us a normal result because in the end, the numbers refer to the pages.\
Our task here is to obtain an abnormal result, so we will change the value of the productId to something variable, using several methods.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454588551/4eeeb415-a96b-4770-bacc-be715ed349ef.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

The result after that will be the error message you are looking for, but I will show the error message in a stronger way than this, in the following way :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454589975/a679c124-cdc7-40ba-b1ac-473655a038b0.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

Here we have made the intercept is on and we are requesting the productId and making the actual value of the productId ==AS\_CYBER, and therefore the error message will be displayed when the request is forwarded.

#### There is another way, which I actually prefer, and the desired error message will be output :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454591569/238c0874-4421-4e55-8964-b2c013f3d3a4.png" alt="" align="left" fullwidth="false" />

We will send one of the GET requests to the sent to repeater , then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454593804/c3dbb1cc-3681-4bc2-80a0-9923a5348197.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

We will move to the Repeater tab, then you will change the productId number to /product?productId=”Abdelwahab\_Shandy”\
Then you will send the request\
You will find that the answer is as follows:\
You will find the error message and what you need to prove in this tab .

> ***See you soon in other reports….!!***

> ***Abdelwahab\_Shandy***

> ***AS\_Cyber***

