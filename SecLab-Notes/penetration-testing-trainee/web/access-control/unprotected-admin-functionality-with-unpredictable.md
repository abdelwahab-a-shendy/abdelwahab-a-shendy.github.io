
[Web Security Academy](https://portswigger.net/web-security) [>> Access control](https://portswigger.net/web-security/access-control) >> [Lab](https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality-with-unpredictable-url)

So we have to access the admin panel first ??

After I searched and collected information on the site and also tried to find out if there was a hidden directory, but I did not find anything either, so we will read the site code :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454685972/5dfd4cb5-eb20-4848-8a3d-b009eaff93a4.png" alt="" align="left" fullwidth="false" />

I found this piece in the code like this:

This code checks a variable called “isAdmin”, which determines whether the user is an administrator (administrator) of the site or not. If the value of the variable is “false”, the “if” condition will not be met and the code within it will not be executed.

If “isAdmin” is “true”, the “if” condition is entered, where the HTML element is targeted using the “top-links” class, which is typically thought of as the list of top links on a web page. Next, create a new element “a” that will be a link to the Admin panel, and assign it the title “Admin panel” and the link “/admin-w4szmz”. After that, this link is added to the list of top links.

Then, a new ‘p’ element is created containing the text ‘|’, which is also added to the top link list.

It is clear that the goal of this code is to display a link to the control panel for the administrator according to the value of the variable “isAdmin”, as this link appears only if the user is the site administrator.

So we can use /admin-w4szmz with the main URL to redirect us to the admin panel.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746454687654/73523f9a-4c72-4b43-bc53-81ce21c37a12.png" alt="" align="left" fullwidth="false" />

Congratulations, you solved the lab!

Well, delete the user Carlos and then you win .

> **See you soon in other reports….!!**

> **Abdelwahab\_Shandy**

> **AS\_Cyber**

