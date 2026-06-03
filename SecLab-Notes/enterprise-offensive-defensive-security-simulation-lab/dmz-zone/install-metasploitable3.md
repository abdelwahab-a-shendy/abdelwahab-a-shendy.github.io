
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768813631126/f1c0d019-b342-4281-b67a-7367566e06bb.png" alt="" align="center" fullwidth="true" />

## 1️⃣ Core Idea (Lab Objective)

The goal is to build a penetration testing environment consisting of two targets inside a virtualized system:

* **Linux System:** An Ubuntu 14.04 machine packed with vulnerabilities.

* **Windows System:** A Windows Server 2008 R2 machine configured with security vulnerabilities.

* **Orchestration:** Both machines are managed using **Vagrant** to ensure easy startup and automated configuration.

***

## 2️⃣ Required Tools (Prerequisites)

Before starting, make sure the following requirements are installed on your machine (Linux or Windows):

1. **VirtualBox:** The hypervisor responsible for running virtual machines.

2. **Vagrant:** The tool that automatically downloads and configures the VMs.

3. **Virtualization Enabled:** Ensure that (VT-x or AMD-V) is enabled in your system BIOS settings.

***

## 3️⃣ Installation & Configuration (Installation)

### 🐧 On Linux (Host)

Open the terminal and run the following commands in order:

1. **Add the Vagrant repository:**

```plaintext
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
```

2. **Install Vagrant:**

```plaintext
sudo apt update && sudo apt install vagrant
```

### 🪟 On Windows (Host)

1. Download **Vagrant** from the official website: [hashicorp.com](https://www.vagrantup.com/downloads).

2. Download **VirtualBox** from: [virtualbox.org](https://www.virtualbox.org/).

3. Restart your machine after installation.

## 4️⃣ Running the Lab (The Setup)

Run the following steps in the terminal (Linux) or PowerShell (Windows):

```plaintext
# Create a project directory
mkdir metasploitable3-workspace
cd metasploitable3-workspace

# Download the configuration file
curl -O https://raw.githubusercontent.com/rapid7/metasploitable3/master/Vagrantfile

# Start the lab
vagrant up
```

***

## Troubleshooting Guide

If you encounter any of the following issues, apply the corresponding solutions (applicable to both systems unless stated otherwise):

### ❌ Issue 1: Host-Only Network Conflict

**Message:** `VirtualBox is complaining about the IP range`\
**Cause:** VirtualBox blocks certain IP ranges (such as 172.x.x.x) for security reasons.\
**Solution (on Linux):**

1. Create the configuration file:

```plaintext
sudo nano /etc/vbox/networks.conf
```

2. Add the following lines to allow the network ranges:

```plaintext
* 172.16.0.0/16
* 172.28.0.0/16
* 192.168.56.0/21
```

3. Save the file and try running `vagrant up` again.

### Note 4: Slow Windows Image Download

**Situation:** The download may take one hour or more.\
**Explanation:** The Windows Server image is very large. Do not close the terminal; let the process finish until you see a success message.

### Login Credentials & Access

Once the setup is complete, you can log in to the systems via VirtualBox or Vagrant:

* **Username:** `vagrant`

* **Password:** `vagrant`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768645257525/065a7df3-77d1-44c3-ac25-a73cc1ff3087.png" alt="" align="center" fullwidth="true" />

> the metasploit3 is Done you can take SnapShot

