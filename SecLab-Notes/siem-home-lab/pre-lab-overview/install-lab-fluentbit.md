---
id: "68e1b9ec94c8e25f0a16941f"
title: "Install LAB-FLUENTBIT"
description: "In this section, we prepare the LAB-FLUENTBIT virtual machine, which will be responsible for log collection and forwarding within our SIEM environment.\n"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/siem-home-lab/pre-lab-overview/install-lab-fluentbit"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
seoTitle: "SIEM Home LAB"
createdAt: "2025-10-05T00:21:00.459Z"
updatedAt: "2026-01-25T15:35:46.820Z"
---

### **We begin by setting up the environment inside VirtualBox, enabling Guest Additions, Shared Clipboard, and Drag & Drop to streamline interaction between the host and the virtual machine :**

**VM Name:** `LAB-FLUENTBIT`

**Operating System:**

* Ubuntu 22.04 LTS (64-bit)

Since I use VBox , You can choose whether to install the labs on VBox or even VMware.

After installing a Linux distribution, Ubuntu is recommended.

### First, I will activate the VirtualBox tools on this virtual machine :

* On Debian/Ubuntu distributions:

```sh
sudo apt update 
sudo apt install build-essential dkms linux-headers-$(uname -r)
```

1. From VirtualBox: `Devices → Insert Guest Additions CD image`

2. In the Linux terminal:

```sh
sudo mount /dev/cdrom /mnt 
sudo /mnt/VBoxLinuxAdditions.run
```

3. After installation is complete, **reboot** the machine:

```sh
sudo reboot
```

4. Enable **Shared Clipboard** and **Drag & Drop**:

   * Devices → Shared Clipboard → Bidirectional

   * Devices → Drag & Drop → Bidirectional

***

### Once the system is ready, we proceed with installing Fluent Bit using the official installation script, ensuring it’s properly configured for later integration with the ELK Stack :

<a target="_blank" href="https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit">**Get started with Fluent Bit**</a>

```bash
sudo apt update 

sudo apt install curl
```

* We'll use this command to install cURL, a tool that allows you to upload files or execute HTTP requests from the command line. We'll need it to download the Fluent Bit installation script.

```bash
sudo curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
|
|
Installation completed. Happy Logging!
```

* Here, we use cURL to download and run the official Fluent Bit installation script directly from the project's GitHub site. The |sh symbol means that the download result (the script) will be executed immediately using the shell without first saving it as a file.

***

### *We have downloaded the fluentbit next stage and its settings.*

