
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768833396819/f51f9be3-ae82-4c9d-821f-16a293a72b14.png" alt="" align="center" fullwidth="true" />

### 🔵 Internal Zone Machines

| Machine    | Internal       | DMZ            | External      |
| ---------- | -------------- | -------------- | ------------- |
| IIS Server | 172.16.200.202 | 172.16.100.202 | 172.16.10.202 |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769107688577/c7e61656-b66c-4321-a566-26d95eb63feb.png" alt="" align="center" fullwidth="true" />

### 🔵 Internal Zone Machines

* Adapter 1: NAT (Actually used only by the Domain Controller)

* Adapter 2: Internal-Zone

* Adapter 3: DMZ-Zone

* Adapter 4: External-Zone

***

## Preparing the web server (IIS Server) using Sysprep :

### After taking a clone of the Domain Controller, I ran the Sysprep tool located in `C:\Windows\System32\Sysprep` :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769109732307/229f13fc-b0bc-47ef-b918-8da6850c5d74.png" alt="" align="center" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769109761089/18fff6e7-c2ee-4110-b768-562352ca235f.png" alt="" align="center" fullwidth="true" />

The Generalize option was activated and the OOBE (New User Experience) mode was selected, which caused the system to reboot and ask for basic settings again (language, region, and administrator password) as if the system was being booted for the first time.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769109788661/95d35bfe-217b-401c-acfb-f5bf65beadaa.png" alt="" align="center" fullwidth="true" />

### Why did we take this step? (technical target)

**Recruit duplicate SID:** When a clone is created, the new device has the same Security Identifier (SID) value as the original device. In network environments, two devices with the same SID cannot work together properly within a domain, so we used the Generalize option to generate a new, unique SID for this server.

**Converting the copy from DC to Member Server :** Since the copy taken was for the Domain Controller, Sysprep cleans up the device roles and returns it as a “Stand-alone Server”. This is necessary because we want to dedicate this machine to be an IIS Server (web server) and not another DC.

**Avoid technical conflicts :** Remove any special settings or definitions associated with the original device to ensure system stability when installing IIS services later, and to ensure that problems do not occur when linking the device to the original Domain with a new name.

***

***

## Configuration After Join Domain :

### **Configuration of IP Addresses**

This section is the most important to ensure proper connectivity between devices:

🔵 Internal Zone Machines

| Machine           | Internal       | DMZ            | External      |
| ----------------- | -------------- | -------------- | ------------- |
| Domain Controller | 172.16.200.202 | 172.16.100.202 | 172.16.10.202 |

🔵 Internal Zone Machines

* Adapter 1: NAT (Actually used only by the Domain Controller)

* Adapter 2: Internal-Zone

* Adapter 3: DMZ-Zone

* Adapter 4: External-Zone

Use `Ctrl + R` : ncpa.col

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989374165/482b4090-f2c6-4b10-a10c-428e750d75ab.png" alt="" align="center" fullwidth="true" />

In Ethernet 2 (Internal):

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989434499/a19d5fd0-85b7-40c9-8fdb-db0b7ee79fa4.png" alt="" align="center" fullwidth="true" />

Then (Internal ):

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769111369259/5ec421d8-91e2-4a33-bacb-da092d350060.png" alt="" align="center" fullwidth="true" />

DNS → IP PDC

**In Ethernet 3 (DMZ):**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769111513065/7feec755-5aee-4f21-8593-80fd45b69e57.png" alt="" align="center" fullwidth="true" />

In Ethernet 4 (External) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769111549677/c85a59fe-9419-474d-a455-a1bafeb335d7.png" alt="" align="center" fullwidth="true" />

***

### Install VMWare Tools:

**In Win Client ANd Server :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948688621/3fb7057c-9e7a-429e-bc4b-c97a61441448.png" alt="" align="center" fullwidth="true" />

Then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948717647/09275206-d1d5-4922-8c05-f73f538833d3.png" alt="" align="center" fullwidth="true" />

Then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948736533/f06d61b4-a28e-47fc-a3fe-171f32f8f1db.png" alt="" align="center" fullwidth="true" />

And Next => Next => Then Reboot/ Restart

***

### **Change Date, Time, and Time Zone**

These settings are accessed through the **Server Manager** control panel:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768989101207/ad227756-6974-4513-b49b-7b51e13f3dd5.png" alt="" align="center" fullwidth="true" />

The date and time are adjusted to match the geographical location (such as Cairo) to ensure proper synchronization of logs and services.

***

***

## Join Domain :

### Ensure the connection between the devices :

From the IIS Server, I pinged the Windows Server :

```bash
C:\Users\Administrator>ping 172.16.200.201

Pinging 172.16.200.201 with 32 bytes of data:
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128
Reply from 172.16.200.201: bytes=32 time<1ms TTL=128
Reply from 172.16.200.201: bytes=32 time=1ms TTL=128

Ping statistics for 172.16.200.201:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 1ms, Average = 0ms

C:\Users\Administrator>
```

***

3. ## How to add a IIS to a domain

### To access the desired interface, follow these steps within Windows:

`Settings --> System --> About --> Rename this PC (Advanced)`

**Objective:** To access the traditional "System Properties" window .

**Window:** The "Computer Name/Domain Changes" window appears.

Action: Select the Domain option and enter the domain name you want to join (in this example: aas.local).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769112457179/2f3e13e8-34ba-49f3-a33f-b28eff03ab54.png" alt="" align="center" fullwidth="true" />

### Authentication and Login :

Window: The "Windows Security" window appears.

Action: This step requires you to enter the username and password for an account with "Domain Administrator" privileges to allow the device to join.

And Window: Welcome message from Windows :

Meaning: This means that the connection between your device and the server has been successfully completed.

### Restart request

Window: Windows alert message.

* <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769008335277/b0c2ac93-0dca-4bbd-b66b-d1d138693d52.png" alt="" align="center" fullwidth="true" />

The system tells you that the changes will not take effect and you will not be able to log in to domain accounts until you restart your device.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769008453708/30bba406-4fc3-4cf0-85ed-de9199866a14.png" alt="" align="center" fullwidth="true" />

> And `Restart Now`

### OPEN PDC NOW :

And Open AD User And Computer :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769112781514/b0898cb9-7e6e-4d5a-91a1-44cc2585da92.png" alt="" align="center" fullwidth="true" />

And I Create OU And Move This Server :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769112971275/61d6c4bd-fdd5-4179-bd9f-e90d5131380b.png" alt="" align="center" fullwidth="true" />

***

> ***✅*** DONE Configuration IIS And Join Domain

