
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768833410701/0c8e7d62-8ed9-4286-8e4f-55bdc7f151ba.png" alt="" align="center" fullwidth="true" />

## Install Windows Server :

### **1. Initial Configuration**

This section explains the preparatory steps before starting the actual installation process inside the virtual environment (such as VMware or VirtualBox):

* **Create a New VM:** Begin by creating a new virtual machine.

* **Select the ISO File:** Choose the Windows ISO version to be installed.

* **Allocate Resources:** Specify the hard disk size and memory (RAM).

**Important Note:**\
The **Network Adapter** settings must be properly configured.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768947990428/01e0d871-a205-4318-bcac-f140c83e7f66.png" alt="" align="center" fullwidth="true" />

### **2. Operating System Selection (Step 1)**

### The Windows Setup window appears:

* At this stage, the required edition is selected. In the image, **Windows Server 2019 Datacenter (Desktop Experience)** was chosen.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948149744/ea208d51-f64c-49d8-9ded-9d7009d3b311.png" alt="" align="center" fullwidth="true" />

**Note:**\
Selecting **Desktop Experience** is necessary if you want a graphical user interface (icons and mouse support) rather than a command-line–only environment.

### This is a simple explanation of the differences between them :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948322795/58877f6d-faa2-4cee-b621-4cbafadebc70.png" alt="" align="center" fullwidth="true" />

### **3. Hard Disk Selection (Step 2)**

The **“Where do you want to install Windows?”** window appears:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948410876/1a6ac1c3-e193-4dfa-9e1c-ba6404cca2f0.png" alt="" align="center" fullwidth="true" />

* The available hard disk is selected (usually **Drive 0 Unallocated Space**).

* Click **Next** to allow the system to automatically partition the disk and begin installing the required files.

### **4. Password Configuration (Step 3)**

After the installation is completed, the **Customize settings** window appears:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948469316/6c1366f6-e9b9-4599-849d-e13222082469.png" alt="" align="center" fullwidth="true" />

* You are prompted to set a password for the **Administrator** account.

**Password Complexity Policy:**\
The image shows that the password must meet **3 out of 4** requirements:

* Uppercase letters

* Lowercase letters

* Special characters

* Numbers

The example shown is `P@$$w0rd`.

### **5. First Login (Bottom-Left Section)**

This image explains how to log in to the system after startup:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948514304/da263453-5523-4505-8631-76b2c73ab70f.png" alt="" align="center" fullwidth="true" />

* Since this is a virtual machine, you cannot press **Ctrl + Alt + Del** directly from your physical keyboard (as it would affect the host machine instead).

* You must send this key combination from the **virtual machine menu (VM)**, as shown in the dropdown menu in the image, in order to access the login screen.

***

## Install VMWare Tools:

### In Win Client ANd Server :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948688621/3fb7057c-9e7a-429e-bc4b-c97a61441448.png" alt="" align="center" fullwidth="true" />

Then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948717647/09275206-d1d5-4922-8c05-f73f538833d3.png" alt="" align="center" fullwidth="true" />

Then :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768948736533/f06d61b4-a28e-47fc-a3fe-171f32f8f1db.png" alt="" align="center" fullwidth="true" />

And Next => Next => Then Reboot/ Restart

***

> ✅ Windows Server INSTALLED

