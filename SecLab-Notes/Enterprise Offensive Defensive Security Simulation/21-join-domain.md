
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768833431162/52e404c8-8442-4c57-b238-03fbbb9acb40.png" alt="" align="center" fullwidth="true" />

1. ## Some important information :

   ### When connecting a computer to a domain network:

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769009205632/d5b4f4f2-3279-4641-b6fd-914cc4b88d6e.png" align="center" fullwidth="false" />

   **AAA Concept:**

   * This refers to the fundamental security rules:

     * Authentication: Verifying the user's identity (User/Password).

     * Authorization: This refers to defining the permissions a user has.

     * Accounting: This refers to monitoring and recording user activity (what they did and when).

   **Network Diagram:** This shows the client PC with IP address 192.168.1.3 connecting to the Kerberos server (representing the Domain Controller) with IP address 192.168.1.2 and the domain name Test.local.

   **Connection Process:** This illustrates the need to enter the domain name and administrator credentials (User/Password) to complete the connection process.

***

### Domain Login

This section explains the two different ways to enter a username when logging into a device within a domain:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769009473011/c0ab24c3-415b-4386-af16-6d7cce2dca87.png" align="center" fullwidth="false" />

**NETBIOS:** The classic, older method, in the format: Domain\username (e.g., Test\username). As you can see in the image, the device displays "Sign in to: Test".

**FQDN (Fully Qualified Domain Name)** : The modern method (UPN format), in a format similar to an email address: [`username@Domain.local`](mailto:username@Domain.local) (e.g., [`username@Test.local`](mailto:username@Test.local)). As you can see below, "Sign in to: Test.local".

***

### Login to the Local Machine

This section explains how to log in to the machine itself, separate from domain accounts:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769009568788/f277daca-5287-4d7d-b61d-0e7d1c57db38.png" align="center" fullwidth="false" />

**Using the period and backslash (.):** This shows that typing `.\` in the username field means "This is the local machine".

**Changing the destination:** Notice at the bottom of the image that the phrase "Sign in to" has changed from the domain name to the local machine name (`WIN-1`), meaning you are logging in with an account stored on the machine's hard drive, not on the server.

***

***

2. ## Ensure the connection between the devices :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769007420740/70039257-76fb-41b5-a3ec-83f97cba246b.png" alt="" align="center" fullwidth="true" />

### In Windows Server :

```bash
C:\Users\Administrator>ping 172.16.100.210

Pinging 172.16.100.210 with 32 bytes of data:
Request timed out.
Request timed out.
Request timed out.
Request timed out.

Ping statistics for 172.16.100.210:
    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss),

C:\Users\Administrator>
```

> NO Replay == THE FireWall IS Disable

### In Windows Client :

```bash
C:\Users\vboxuser>ping 172.16.200.201

Pinging 172.16.200.201 with 32 bytes of data:
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128

Ping statistics for 172.16.200.201:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms

C:\Users\vboxuser>
```

***

***

3. ## How to add a Windows computer to a domain

### To access the desired interface, follow these steps within Windows:

`Settings --> System --> About --> Rename this PC (Advanced)`

**Objective:** To access the traditional "System Properties" window .

**Window:** The "Computer Name/Domain Changes" window appears.

Action: Select the Domain option and enter the domain name you want to join (in this example: aas.local).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769008101127/cfe2ba9d-4ee2-4bad-8a6b-dc7c9fd19c2f.png" alt="" align="center" fullwidth="true" />

### Authentication and Login :

Window: The "Windows Security" window appears.

Action: This step requires you to enter the username and password for an account with "Domain Administrator" privileges to allow the device to join.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769008211188/9d4fbf15-8dea-4ff1-b005-2fedf3212c76.png" alt="" align="center" fullwidth="true" />

### Success confirmation

Window: Welcome message from Windows :

* <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769008272803/00c888e2-893b-41cf-86d1-3fb6bcc9b23d.png" alt="" align="center" fullwidth="true" />

Meaning: This means that the connection between your device and the server has been successfully completed.

### Restart request

Window: Windows alert message.

* <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769008335277/b0c2ac93-0dca-4bbd-b66b-d1d138693d52.png" alt="" align="center" fullwidth="true" />

The system tells you that the changes will not take effect and you will not be able to log in to domain accounts until you restart your device.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769008453708/30bba406-4fc3-4cf0-85ed-de9199866a14.png" alt="" align="center" fullwidth="true" />

> And `Restart Now`

***

> ***✅*** You can add a client to the domain using the same steps.

