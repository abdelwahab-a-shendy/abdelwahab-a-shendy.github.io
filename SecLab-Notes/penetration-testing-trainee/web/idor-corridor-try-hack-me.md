
***

What is the flag ..!?

What is the flag?\
Flag\{################################}

Insecure Direct Object References (IDOR) is a type of security vulnerability that occurs\
when an application allows an attacker to access a protected resource by modifying the\
value of a parameter that references the resource. For example, an IDOR vulnerability\
could allow an attacker to view the profile of another user by changing the user\_id\
parameter in a URL.\
-First, we connected the machine and obtained the server’s IP .\
-Then I put the IP on the browser, and this was the result :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455095468/386e145f-9ad1-4851-9fbb-66474bab8182.png" alt="" align="left" fullwidth="false" />

So where is the key?

When I was hovering over these doors with my mouse, I noticed that each door has a\
different path with different numbers , I had to look at the code for the page .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455096640/c462cc89-f237-4739-a290-bbfdfe561b3a.png" alt="" align="left" fullwidth="false" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455098135/99430520-fe5b-4fdf-9883-a0f03129c633.png" alt="" align="left" fullwidth="false" />

* After opening the source code, I found the codes in this form, so I decided to check\
  them , i took all this to Note and then went to search and find out what kind of hash\
  it is , went to\
  [https://www.tunnelsup.com/hash-analyzer/](https://www.tunnelsup.com/hash-analyzer/)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455099576/15f0bc77-2255-43e4-95ea-0daea2c00ca6.png" alt="" align="left" fullwidth="false" />

I learned that the hash type (MD4 or MD5) , went to\
[https://crackstation.net/](https://crackstation.net/)

* This was the result :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455100789/c0419925-e1fb-4500-92f1-7b41b15f5fc9.png" alt="" align="left" fullwidth="false" />

-From here I was sure it was over MD5 , But we should note something important here,the Resalt is equal to 1 .\
-Well I have to see the result of the rest of the hashtags :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455102233/435d7e2b-244c-491e-a3aa-5edec9d682c1.png" alt="" align="left" fullwidth="false" />

* Well, the results here are sequential in numbers from 1 to 13 by the number of doors ,\
  We felt that since this room is under the name of the IDOR vulnerability, I decided to\
  put the numbers one behind the second behind the IP in the URL :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455103404/b70b569b-3c19-4522-b81d-bfeeec4515dd.png" alt="" align="left" fullwidth="false" />

-Well,it seems to be something else, but do not forget that it is the IDOR\
vulnerability,So we will try numbers before 1 and after 13 ,Well it didn’t work .\
-But the hash result was from 1 to 13, so we will make a hash MD5 For number 14 At[https://gchq.github.io/CyberChef](https://gchq.github.io/CyberChef)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455104812/3d7d9896-073e-418e-a1fa-3cd390059835.png" alt="" align="left" fullwidth="false" />

-Then I tried it again by hashing it to the URL until I found the flag , But it didn’t work

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455106034/5c30d8aa-cd32-445e-8f1d-6f44d7da6243.png" alt="" align="left" fullwidth="false" />

-Then bring the hash of number 0 ( cfcd208495d565ef66e7dff9f98764da ) .\
-Then try the hash of number 0 with the URL .\
-Hey, it worked

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455107394/67559472-5969-4956-a632-c63ad2ead65d.png" alt="" align="left" fullwidth="false" />

Flag: flag\{2477##########################2e}

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455108703/1e28bd7b-08b8-46dd-a785-d058a56d9475.png" alt="" align="left" fullwidth="false" />

Here are some additional tips for preventing IDOR\
vulnerabilities:\
•Use parameterized queries instead of direct object references in database queries.\
•Use input validation to prevent attackers from injecting malicious code into parameters.\
•Use strong authentication and authorization mechanisms to protect resources.\
•Regularly scan your applications for IDOR vulnerabilities.

see you soon

Abdelwahab\_Shandy

AS\_Cyber

