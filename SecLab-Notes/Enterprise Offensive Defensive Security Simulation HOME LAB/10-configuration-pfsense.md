
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768813534477/f8744d45-24af-4597-a948-4de7ee9abddb.png" alt="" align="center" fullwidth="true" />

# **Steps for Initial Configuration and Setup of the pfSense Firewall via the Console Interface and then the WebGUI**

***

## First: Configuration via the Console Interface

### **Main Menu:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768945146279/fbdd20e6-d3b2-4816-a75a-755a8feb292a.png" align="center" fullwidth="false" />

> After booting, the pfSense system console screen appears, displaying version details and the current IP addresses of the interfaces (WAN and LAN).

### **IP Address Configuration (Option 2):**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768945268639/51e72fb9-d2f9-461d-91ed-c087989125e2.png" align="center" fullwidth="false" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768945322137/e03e04d6-4f4d-492c-a929-cb865641cab7.png" align="center" fullwidth="false" />

* Interface number 2 (LAN) was selected to modify its settings.

* A new IP address was assigned to the LAN interface: **172.16.200.100/24**.

* DHCP on the LAN interface was disabled, and the **HTTP** protocol was enabled to allow access to the management interface.

### **Interface Assignment (Option 1):**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768945553789/111ce1a8-d7f0-4665-98f6-5f72753ae5e4.png" align="center" fullwidth="false" />

* The Interfaces Assignment menu was used to define and map physical ports (such as **em0, em1, em2, em3**) to logical interfaces.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768945829933/81a6dd77-bb48-4607-8ed9-414e6425f5cd.png" align="center" fullwidth="false" />

* The **WAN** interface was assigned to **em2**, and the **LAN** interface was assigned to **em3**.

**Adding the DMZ Zone and Additional Interfaces (OPT):**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768945962411/258a38d7-098e-48cf-b012-f2650af0ea84.png" align="center" fullwidth="false" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946027737/c4333976-8124-4288-a075-4eb7102184d3.png" align="center" fullwidth="false" />

* An additional interface (**OPT1**) was enabled and assigned to **em1**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946232142/0a689745-a4a9-41c6-aa50-f4beea8d5e58.png" align="center" fullwidth="false" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946398607/8fca8f0e-ec4c-4966-b9f6-357d97a74668.png" align="center" fullwidth="false" />

* An IP address was assigned to OPT1: **172.16.100.100/24**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946461796/7a13060a-33f0-49ff-b7fd-e94f7d06b49e.png" align="center" fullwidth="false" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946466922/6a1e82a6-9c1c-41a7-8cae-81dd3e1c7877.png" align="center" fullwidth="false" />

* A second additional interface (**OPT2**) was enabled and assigned to **em0**, with its IP address obtained automatically via **DHCP**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946472828/5b8311c8-ae20-4658-9db6-123fc3b397a6.png" align="center" fullwidth="false" />

**Final Summary:**\
The final console screen displays all four interfaces (**WAN, LAN, OPT1, OPT2**) along with their respective IP addresses.

***

## Second: Configuration via the WebGUI

### **Login:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946641903/e76d379d-6fba-4a1b-9df5-6ffd4580556d.png" align="center" fullwidth="false" />

Access the firewall through a web browser at [**http://172.16.200.100**](http://172.16.200.100) using the default username **admin** and password **pfsense**.

**Setup Wizard:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946709745/c9ebcb8b-2b04-404d-92f5-b45cf86f8004.png" align="center" fullwidth="false" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946750803/f4916f2c-1fa1-4036-8361-c76791b2c18a.png" align="center" fullwidth="false" />

* **Steps 1 & 2:** Welcome message and information about Netgate support.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946784818/8fc29426-1e90-4e23-be10-452b3c0065f5.png" align="center" fullwidth="false" />

* **Step 3 (System Settings):** Configure the **Hostname**, **Domain**, and **DNS servers**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946800945/7f4ba631-9c2e-4029-b009-3ac8f21480fe.png" align="center" fullwidth="false" />

* **Step 4 (Time Server):** Configure time settings and select the time zone (**Africa/Cairo**).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768946894553/eb055b6d-e400-4efc-979e-2b7d70ff699c.png" align="center" fullwidth="false" />

* **Step 5 (WAN Interface):** Review the external interface settings and confirm the static IP address **172.16.10.100**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768947015662/e9cb0006-3863-4a61-b6ba-aad01247db0e.png" align="center" fullwidth="false" />

* **Step 6 (LAN Interface):** Review and confirm the internal network address **172.16.200.100**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768947069270/ac33fde6-20f1-42db-a61c-cc35bfec2d7f.png" align="center" fullwidth="false" />

* **Step 7 (Password):** Change the default administrator password to a new secure password.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768947091661/081081da-27cd-4848-a1a7-9d147c369ed9.png" align="center" fullwidth="false" />

**Apply Settings:**\
Click the **Reload** button to save and apply all changes made through the wizard.

***

## Third: Final Dashboard

### **Configuration Complete:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768947127969/8009065c-f299-474a-9be1-23afa36d02b8.png" align="center" fullwidth="false" />

A confirmation message appears: **“Congratulations! pfSense is now configured.”**

### **Dashboard:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768947184910/33b06d6f-00ed-4e77-970f-25e84ad08344.png" align="center" fullwidth="false" />

The dashboard provides a complete system overview, including the pfSense version, CPU type, system uptime, and memory status.

### **Interfaces Status:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768947176306/c62e6b25-2dd5-47ce-a87e-dff38de1c9cd.png" align="center" fullwidth="false" />

An interface status table shows that all interfaces (**WAN, LAN, OPT1, OPT2**) are **Up**, operating at **1000baseT (Gigabit)** speed, with each interface’s assigned IP address displayed.

***

> ✅ pfSense DONE

