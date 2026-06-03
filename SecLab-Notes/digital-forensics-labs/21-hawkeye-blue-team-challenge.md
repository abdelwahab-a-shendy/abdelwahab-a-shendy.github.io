
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760450211706/a3168193-e1e4-4bc5-a9f5-4a685040c1f3.png" align="center" fullwidth="false" />

### Scenario:

An accountant at your organization received an email regarding an invoice with a download link. Suspicious network traffic was observed shortly after opening the email. As a SOC analyst, investigate the network trace and analyze exfiltration attempts.

#### 1(How many packets does the capture have?

Well we can look at :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455195067/0f929ad6-3db0-4de5-b093-c0ab896db76c.png" alt="" align="left" fullwidth="false" />

Or look at **Statistics** then **Capture File Properties** :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455196265/da2c8735-5a72-4d96-8ff6-6a94c1a46752.png" alt="" align="left" fullwidth="false" />

#### 2(At what time was the first packet captured?

Well if we look at Statistics then Capture File Properties, there you can see the first packet that was captured :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455197388/706ec5df-8e47-4c49-9759-0c61d8dc31d2.png" alt="" align="left" fullwidth="false" />

Don’t forget to add UTC at the end

#### 3(What is the duration of the capture?

You can see the elapsed :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455198535/29cd0e73-661e-4ab2-ba8f-66d24cccddae.png" alt="" align="left" fullwidth="false" />

#### 4(What is the most active computer at the link level?

You can look at Statistics, then Conversations, and then look at IPV4 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455199900/d61c895e-f67a-444f-9f6a-16c60053bb16.png" alt="" align="left" fullwidth="false" />

If we search for the MAC of this IP :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455201186/816b9fce-49ec-4a5c-9c78-2225bd13a71d.png" alt="" align="left" fullwidth="false" />

You can look at Statistics, then Conversations, and then look at Ethernet

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455202641/063d2f38-737a-4d05-8967-b407f6a0f5a3.png" alt="" align="left" fullwidth="false" />

Here we are confirmed .

#### 5(Manufacturer of the NIC of the most active system at the link level?

Here we must do a MAC Address Lookup for the Mac that we found a moment ago :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455203926/5ebfebd4-706c-4da6-9054-007d3185e335.png" alt="" align="left" fullwidth="false" />

#### 6(Where is the headquarter of the company that manufactured the NIC of the most active computer at the link level?

You will use Google this time :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455205545/bb978760-7993-4f45-9e24-dcff4ea65aa6.png" alt="" align="left" fullwidth="false" />

#### 7(The organization works with private addressing and netmask /24. How many computers in the organization are involved in the capture?

You can look at the stats, then the conversations, then look at the IPV4 and you will find the addressing and netmask/24:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455206882/7b98c972-4a36-47e8-91cc-d0dc9c045288.png" alt="" align="left" fullwidth="false" />

#### 8(What is the name of the most active computer at the network level?

We know that the most active IP is 10.4.10.132 and also the owner of the Mac is 00:08:02:1c:47:ae, so :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455208369/5e8be122-a2e7-42a2-95a0-c007733171bf.png" alt="" align="left" fullwidth="false" />

Also through DNS :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455209886/be18a2f6-de20-448f-921f-af37d00506dc.png" alt="" align="left" fullwidth="false" />

#### 9(What is the IP of the organization’s DNS server?

If you search through DNS :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455211422/6f5dfa80-1ab2-4ab2-b307-e89f7b5e434e.png" alt="" align="left" fullwidth="false" />

#### 10(What domain is the victim asking about in packet 204?

We’re going to do go to packet :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455212622/f7efb415-9ec8-4dab-a2b4-26007b95469b.png" alt="" align="left" fullwidth="false" />

Inside packet 204 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455213953/6f8b0d8a-81e9-46ed-9d9c-de82e80a4e1a.png" alt="" align="left" fullwidth="false" />

#### 11(What is the IP of the domain in the previous question?

We can see the answer in packet 206 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455215269/dee6b7a6-7443-4cff-8915-7e09c9d4813f.png" alt="" align="left" fullwidth="false" />

#### 12(Indicate the country to which the IP in the previous section belongs.

We can use ip look up website :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455216874/1b8e6866-0690-4114-94ea-1eb9c5bfb247.png" alt="" align="left" fullwidth="false" />

#### 13(What operating system does the victim’s computer run?

If we search for any triffic that moves in TCP, and also do a Follow for the TCP Stream, then you will be able to specify what you want in the User Agent:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455218600/dc059457-1f71-4283-85a9-2bc294947507.png" alt="" align="left" fullwidth="false" />

#### 14(What is the name of the malicious file downloaded by the accountant?

If we go to TAP File, then Export objects, then HTTP ,We will find the malicious file :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455219864/d1e4919b-94b1-47a0-9009-16a9094091fc.png" alt="" align="left" fullwidth="false" />

This filter can also be used :

In Wireshark, the expression http.request.method == “GET” is a filter that can be used to capture only HTTP GET requests. The == operator is used to compare the value of the http.request.method field to the string “GET”. If the value of the field matches the string, then the packet is captured.

***Here is a breakdown of the filter:***

**http**: This part of the filter specifies that we are interested in HTTP packets.\
**.request**: This part of the filter specifies that we are interested in HTTP request packets.\
**.method**: This part of the filter specifies that we are interested in the HTTP request method.\
**==**: This part of the filter is the comparison operator. It means that we are comparing the value of the http.request.method field to the string “GET”.\
**“GET”**: This part of the filter is the string that we are comparing the value of the http.request.method field to.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455221130/310b2314-8a71-47b5-887c-58eda28e9d04.png" alt="" align="left" fullwidth="false" />

#### 15(What is the md5 hash of the downloaded file?

We’ll go to the TAP file, then Export Objects, then HTTP, so we’ll save the file to find the md5 hash :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455222561/c4349ab6-d60f-421e-9866-4170a3a4c20e.png" alt="" align="left" fullwidth="false" />

Then we will work :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455223940/1f211bbf-04a1-4697-b74f-164d6b3e8191.png" alt="" align="left" fullwidth="false" />

#### 16(What software runs the webserver that hosts the malware?

If we go to the traffic of the downloaded file and then **follow** and then **HTTP Stream :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455225858/70f414e2-7ccd-4976-87e5-121d9fa5076d.png" alt="" align="left" fullwidth="false" />

#### 17(What is the public IP of the victim’s computer?

If we go to http traffic, the src IP will be 10.4.10.132 , We will find the public IP , Specifically, GET traffic, then follow > HTTP Stream :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455227206/b548c88c-5a60-4f13-9561-614618eb120f.png" alt="" align="left" fullwidth="false" />

#### 18(In which country is the email server to which the stolen information is sent?

We know that there is traffic between the IP 10.4.10.132 and the external IP 66.171.248.178 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455228908/18622c33-7741-4cbc-b7a2-ab10f05544ab.png" alt="" align="left" fullwidth="false" />

When we used IP LOOKUP, to know more information about the IP address

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455230195/082947c9-442b-4f44-9769-07a05a2c86ee.png" alt="" align="left" fullwidth="false" />

#### 19(Analyzing the first extraction of information. What software runs the email server to which the stolen data is sent?

You can find more information about the programs running the email server by going to “Follow” > TCP stream ,Flow, as we did in question seven :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455232208/fbf906b9-f0ec-46a0-9a2b-21912311abc3.png" alt="" align="left" fullwidth="false" />

#### 20(To which email account is the stolen information sent?

The answer does not go away in the same TCP stream :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455233996/4e185731-02de-4c47-9b64-4dfa92ca64dc.png" alt="" align="left" fullwidth="false" />

#### 21(What is the password used by the malware to send the email?

If you notice AUTH login, and there is some encrypted information :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455235192/b8c0f6e5-45a0-4ea0-959c-3ae947682ca5.png" alt="" align="left" fullwidth="false" />

If we use the most famous tool cyberchef.org :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455236516/6b9c2907-5b82-448a-8d75-f230e07e4a42.png" alt="" align="left" fullwidth="false" />

#### 22(Which malware variant exfiltrated the data?

If you notice, you will find that the message content is BASE64 encoded, so we will do BASE64 encoded :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455238199/1b4ea39b-f4bb-4864-9eda-249e2fccff8d.png" alt="" align="left" fullwidth="false" />

I will use my friend cyberchef.org again :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455239722/eb0d6b68-36c0-4337-b4c5-268a307850b8.png" alt="" align="left" fullwidth="false" />

#### 23(What are the bankofamerica access credentials? (username:password)

Don’t go away, we are in the right place :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455241010/a9fee98b-8b65-428c-a762-74fba49a11c2.png" alt="" align="left" fullwidth="false" />

#### 24(Every how many minutes does the collected data get exfiltrated?

If you select the last two traffic, for example, and then open Follow>>TCP Stream :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455242332/65eb67f2-f34d-410d-9111-b042f186e18a.png" alt="" align="left" fullwidth="false" />

Look at the time here :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455244014/965aa239-cb24-4e6e-b6dd-391d2fd5e088.png" alt="" align="left" fullwidth="false" />

**tcp.stream eq 37**

And here :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455245406/1191c145-e105-47b2-aa53-5bc39e0667a7.png" alt="" align="left" fullwidth="false" />

**tcp.stream eq 35**

If you subtract the two from each other, you will get the result you want. Remember, he wants minutes .

***

> ***💬 "Control*** ***the code, and you control the world." 🔐 From wiping metadata to gaining root access — every step is documented and my goal is to deeply understand the system, not just hack!***
>
> [***Abdelwahab Shandy***](https://abdelwahabshandy.hashnode.dev/)
>
> [***Linkedin***](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)
>
> [***GitHub***](https://github.com/abdelwahab-ahmed-shandy)
>
> ***See You Soon***
>
> ***AS Cyber “)).***

