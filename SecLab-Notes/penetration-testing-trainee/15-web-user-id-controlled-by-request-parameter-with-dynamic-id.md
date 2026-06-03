
[Web Security Academy](https://portswigger.net/web-security) >>[Access control](https://portswigger.net/web-security/access-control) [>> Lab](https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-unpredictable-user-ids)

The goal here is to access Carlos’s API, so we have to access his GUIDs :

If, after collecting information before starting anything about this site, you will know that it is a blogs site more than anything that is just posts, and each post is written by a specific user. Therefore, you will find that the number of users is 3, and that each user actually has his own GUIDs. , So :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454710616/1d2867da-f0f8-4b44-bf1d-413058325670.png" alt="" align="left" fullwidth="false" />

When you browse around, you will find that each post has a specific ID .

So I will register the login using wiener:peter, then tell the userId from within the wiener user page, and will it really be the same as the user’s blogs?

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454712530/eb504cc7-6eca-40c5-b373-2b67d9aceab4.png" alt="" align="left" fullwidth="false" />

Same user id .

Here inside the page for the user wiener .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454713921/111d72f8-4a5d-4f08-9073-c958f3baea4d.png" alt="" align="left" fullwidth="false" />

Same user id .

Here inside the blogs .

So we can go back to the My Account page, and change the user ID :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454715541/b7800c91-9ae1-432b-92ac-7977417af15c.png" alt="" align="left" fullwidth="false" />

This is carlos’s user id , We found him by finding the post, and thus we found his user ID :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454716873/12dfffb3-fce5-4770-9d4d-8821bb4fad7a.png" alt="" align="left" fullwidth="false" />

We will change the user ID from here, and test whether it will actually take me to Carlos’s page .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454718462/59d784bc-fa19-49e8-9789-c85672684bb5.png" alt="" align="left" fullwidth="false" />

Indeed, what was expected happened and I arrived at Carlos’s page .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454720014/f3fc9266-211d-49aa-8a67-c101dec32d18.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

We can also do all this using burp. Try it, it will be really fun .

> ***See you soon in other reports….!!***

> ***Abdelwahab\_Shandy***

> ***AS\_Cyber***

