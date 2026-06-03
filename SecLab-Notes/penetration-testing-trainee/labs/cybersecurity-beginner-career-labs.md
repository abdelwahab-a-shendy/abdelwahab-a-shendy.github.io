
***

1. ## Pay Me

* **I will lock your machine screen or files till you pay me. Who am i ?**

  > Ransomware

***

2. ## htmlentities

* **True or False , htmlentities ( convert special characters to its html entity ) can't be exploited to run XSS payload ?**

  `htmlentities()` converts special HTML characters (like `<`, `>`, `&`) into HTML entities (`&lt;`, `&gt;`, `&amp;`) — this helps protect against XSS when the text is rendered inside normal HTML content.\
  However, the protection isn't absolute, because XSS can still occur through other contexts (e.g., inside attributes, JavaScript, CSS, or URLs) or if the function is misconfigured or used incorrectly.

> False

***

3. ## This is Sparta

* **Morning has broken today they're fighting in the shade when arrows blocked the sun they fell tonight they dine in hell\
  open Link in** Challenge :

  * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760145355276/92884a35-7253-49a0-9b3c-0b10a8dc2225.png" alt="" align="center" fullwidth="true" />

    go to [https://obf-io.deobfuscate.io/](https://obf-io.deobfuscate.io/) - After deobfuscating, this is what we get :

  * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760145444801/2ae0b1a0-99cf-4d66-86f1-0b369bf42b94.png" alt="" align="center" fullwidth="true" />

  > - The `check()` function reads the username and password from two DOM elements (whose IDs are `user` and `pass`).
  >
  > - The username and password must both be `"Cyber-Talent"` for the success message to appear.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760145855301/fb5d832f-212b-4acd-b08c-bc0b976cb686.png" alt="" align="center" fullwidth="true" />

  > \{J4V4\_Scr1Pt\_1S\_Aw3s0me}

  ***

  4. ## Hackers Gathering

     **I am a cyber security conference that run in August every year in Las Vegas. I am the largest gathering for Hackers in the whole world. No Credit cards, no online booking , Only Cash allowed . Who am I ?**

     \> `Defcon`

***

5. ## Admin has the power

* **Administrators only has the power to see the flag , can you be one ?**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760146533628/5479e8b5-6f37-4b7a-a2e3-cc473d4ed8ff.png" alt="" align="center" fullwidth="true" />

After Login : user=> `support` , password=> `x34245323`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760146635535/c66df61c-b456-4803-ac78-d5b5dcfe4ff8.png" alt="" align="center" fullwidth="true" />

Here you can see that we have a cookie and a role set to support. Let’s mess with the role, as our aim is to get admin privilege :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760146930536/e9d9b6c7-2cdf-40ee-8915-331eb31a3b15.png" alt="" align="center" fullwidth="true" />

Change this role to : admin :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760147240557/7a52bd84-584a-4dd6-9fc5-1388bc34cb0c.png" alt="" align="center" fullwidth="true" />

> **hiadminyouhavethepower**

***

6. ## Hash3rror

* we got this corrupted hash password from a Pcap file with a note (password = sha-1(hash-result)).

  HASH:77be5d24ed2e3e590045e1d6o7e84i50d2799c19f48ede46804a8734e287df120f 

### **Calculate String Length :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760147623194/555c1db7-2cda-4c33-84ea-061fdb72a455.png" alt="" align="center" fullwidth="true" />

**this hash is SHA-256 but the length of SHA-256 is 64 so there are two caharaters we must remove them , using** [http://www.sha1-online.com/](http://www.sha1-online.com/) Or hexadecimal digits (0=>9:a=>f) the i And o not Hexa : 77be5d24ed2e3e590045e1d67e8450d2799c19f48ede46804a8734e287df120f

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760147931150/f52fba2c-b73a-4ad4-9b17-0569b87e7538.png" alt="" align="center" fullwidth="true" />

SHA-256 Decoder **using :** [https://www.dcode.fr/sha256-hash](https://www.dcode.fr/sha256-hash) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760148141948/ad769195-3cc6-43d4-9d34-f34d2994ef52.png" alt="" align="center" fullwidth="true" />

the Plan Text : `s3cr3tpassword`

using [https://gchq.github.io/CyberChef/](https://gchq.github.io/CyberChef/) , to get Hash to password using “sha-1”\
(password = sha-1(hash-result)) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760148351996/096cb858-5916-479e-ad78-b38379641906.png" alt="" align="center" fullwidth="true" />

> 83874343435092cb681c0d558a84bfeb389c32ed

***

7. ## who am i?

