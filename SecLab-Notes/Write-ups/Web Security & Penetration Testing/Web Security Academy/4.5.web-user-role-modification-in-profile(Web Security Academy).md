
rs who are logged in using Role ID 2 , Therefore, we need to know what our permissions are on the site .

If we change the email of the user that I own, the request will be here post, because it is considered entering data into the server, and therefore in the response it will be clear to me what type of roleid it is.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454727558/649f5ae9-7491-4f12-be7c-54dfd2f55c35.png" alt="" align="left" fullwidth="false" />

I have already changed my email address .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454729352/d3072cce-24ac-4316-8ce0-f2fc37d81eb7.png" alt="" align="left" fullwidth="false" />

Indeed, when I changed the email, the response was that the user, wiener, has a “roleid”: 1 , If so, we can change this by sending the roleid, with a request to change the email, as follows:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454730698/7a533a15-8144-4093-a385-ad2b1bf5c738.png" alt="" align="left" fullwidth="false" />

We will take the request and send it to Repeater .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454731875/57024091-b539-42f4-bdfe-ac912b70e68e.png" alt="" align="left" fullwidth="false" />

You will add the “roleid”: 1, but instead of 1 you will make it 2 , to make the user wiener have higher permissions.

After that, you will send the request

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454733682/b6d9d4e0-1469-42c1-9030-7ac879acf095.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

Here we have reached the admin panel .

> ***See you soon in other reports….!!***
>
> ***Abdelwahab\_Shandy***
>
> ***AS\_Cyber***

