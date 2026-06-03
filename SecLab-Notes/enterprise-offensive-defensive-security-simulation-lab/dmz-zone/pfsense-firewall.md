---
id: "696bf6d4c30b7ca905d6966d"
title: "pfSense Firewall"
description: "DMZ Zone"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/enterprise-offensive-defensive-security-simulation-lab/dmz-zone/pfsense-firewall"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2026-01-17T20:53:40.151Z"
updatedAt: "2026-01-25T15:35:46.758Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768813534477/f8744d45-24af-4597-a948-4de7ee9abddb.png" align="center" fullwidth="false" />

## One of the steps to install and configure the pfSense firewall via the Netgate Installer wizard:

1. ### Starting the installation and initial settings

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768683838442/9b2ecaf6-32c8-4857-a896-0c39bddf4d6f.png" alt="" align="center" fullwidth="true" />

> License Agreement: The terms of use and intellectual property rights of Netgate and pfSense are shown first; Accept must be selected to continue.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768684359677/5e6a1308-00cb-44de-88c5-8fb71c54115d.png" alt="" align="center" fullwidth="true" />

> Welcome menu: Options appear (Install) to begin installation, or (Rescue Shell) to repair the system. Install is selected.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768684393360/b2ff93f7-1aa8-4055-ae22-9a30e4aaa13f.png" alt="" align="center" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768684418276/08942e7c-fb99-4e5f-81e2-2cfcdf58af94.png" alt="" align="center" fullwidth="true" />

Network installation: The wizard sets up an internet connection to download the necessary installation files.

***

2. ### Configuring the External Network Interface (WAN)

Interface Selection: Port EM2 was selected as the WAN (external area) interface.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768684633915/95f85a4a-a19a-4330-b1b9-3c48a334c1df.png" alt="" align="center" fullwidth="true" />

> Operating mode (Interface Mode): The setting has been changed from DHCP to STATIC to assign a static IP address.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768684896456/2c0a5445-ac9c-4098-8b49-d86b110adc15.png" alt="" align="center" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768684920957/09abcf55-64cc-4a30-88be-93f2034ae30a.png" alt="" align="center" fullwidth="true" />

> Setting the IP address: The address 172.16.10.100 was entered with the network mask /24.

### DNS and Gateway settings:

* The DNS server address entered is: 8.8.8.8.

* The gateway address (default gateway) entered is: 172.16.10.1.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768685140920/f0df5013-c66b-493a-aa11-0e5b41591913.png" alt="" align="center" fullwidth="true" />

> WAN Review: A final screen appears summarizing all WAN interface settings before proceeding to the next step.

***

3. ## Setting up the internal network (LAN) interface

Interface selection: Port em3 was selected as the LAN (Local Area Network) interface :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768685281053/af601454-889a-4537-92c0-cd619bd7b8de.png" alt="" align="center" fullwidth="true" />

Setting the internal IP address: The internal network address 192.168.100.100/24 ​​has been set :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768685395174/abe15362-133e-4708-ba05-9ca711b837e8.png" alt="" align="center" fullwidth="true" />

Address Distribution (DHCP) Setup: DHCP has been enabled and the range has been set from 192.168.1.100 to 192.168.1.199 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768685495071/af1add27-27d5-483a-8894-0a7d82870b71.png" alt="" align="center" fullwidth="true" />

***

4. ## Confirm the installation and version.

Interface confirmation: A screen appears to confirm the assignment of `em3` for LAN and `em2` for WAN :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768685535517/68759d98-6c38-4a7e-927c-286249365273.png" alt="" align="center" fullwidth="true" />

Subscription verification: A screen appears asking you to verify your Netgate Plus copy or choose to install the free Install CE version (which is the one selected) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768685707902/ba1c1fb7-def3-41a1-a70e-6368402aac06.png" alt="" align="center" fullwidth="true" />

File System: The ZFS file system with a GPT partition scheme was selected :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768685753794/99a49bc4-f333-4e14-9d08-7e1c13854d23.png" alt="" align="center" fullwidth="true" />

Disk setup: Stripe mode (no duplication) was selected and the available hard drive `ada0` was selected to erase its data and install the system on it.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768685843851/f6571601-d0f7-4e3d-a2f3-d16e26b384a4.png" alt="" align="center" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768686030521/60afd16d-a1ae-4d84-9e3c-91292bdb7cb7.png" alt="" align="center" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768686132556/c3f2e18c-2e2a-4695-83c4-fce8ed925db3.png" alt="" align="center" fullwidth="true" />

System version: The stable version 2.8.1 (Current Stable Version) was selected for download and installation :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768686148418/f07b0906-bfd7-40bd-b96a-d89153de3138.png" alt="" align="center" fullwidth="true" />

***

5. ## Completion and Operation

Installation details: A screen appears showing the progress of the download, installation, and definitions process (such as AMD GPU drivers) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768686233079/8d0a189e-6fed-4705-afda-c4a489787861.png" alt="" align="center" fullwidth="true" />

Installation complete: A message "Installation of pfSense complete" appears with the option to reboot the system (shell) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768686374839/86a3779f-0d32-4e12-83c7-39c4f60e23b2.png" alt="" align="center" fullwidth="true" />

VirtualBox settings: The last image shows the virtual machine settings, where the pfSense ISO file has been attached to the optical disc to get started :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768686618723/94090530-350a-40da-b065-b3e5c0c1d6d9.png" alt="" align="center" fullwidth="true" />

> And Start VM , pfSense Done

