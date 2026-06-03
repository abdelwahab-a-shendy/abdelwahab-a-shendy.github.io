
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768812944397/12c4f830-4086-4a09-ae95-bc71324c149a.png" alt="" align="center" fullwidth="true" />

## Pre-Installation:

### 1️⃣ Download Lab Resources

The configuration files were downloaded as a compressed archive using **Download as a ZIP File** | <a target="_blank" href="https://github.com/mandiant/commando-vm">link</a>

The archive was then extracted to a known location (for example:\
`C:\LabResources`).

***

### 2️⃣ Disabling Tamper Protection

Before modifying any system policies, **Tamper Protection must be disabled manually**:

1. Go to **Windows Security → Virus & threat protection**.

2. Select **Manage settings**.

3. Disable both **Tamper Protection** and **Real-time protection**.

***

### 3️⃣ Disabling Windows Defender via Group Policy (GPO)

To ensure that protection is **permanently disabled** and does not automatically re-enable itself, follow these steps:

1. Press **Win + R**, type `gpedit.msc`, and open the **Local Group Policy Editor**.

2. Navigate to the following path:

   ```bash
   Computer Configuration  
   → Administrative Templates  
   → Windows Components  
   → Microsoft Defender Antivirus
   ```

3. Modify the following policy:

   * **Turn off Microsoft Defender Antivirus** → set to **Enabled**.

4. Then navigate to the **Real-time Protection** folder under the same path and configure:

   * **Turn off real-time protection** → set to **Enabled**.

***

### 4️⃣ Refreshing Group Policy

To apply the changes immediately without restarting the system:

1. Open the **Run** dialog using **Win + R**.

2. Enter the following command:

   ```bash
   gpupdate /force
   ```

3. Wait until the following message appears:

   > **"Computer Policy update has completed successfully."**

✅ At this point, Windows Defender is fully disabled according to the lab requirements.

***

#### **🚀 CommandoVM Installation Steps**

To ensure a smooth installation of CommandoVM in our lab, follow these PowerShell as Admin commands sequentially:

1. **Navigate to the extracted resources folder:**

   PowerShell

   ```powershell
   cd C:\commando-vm-main\commando-vm-main
   ```

2. **Elevate Execution Policy to allow all scripts:**

   PowerShell

   ```powershell
   Set-ExecutionPolicy Unrestricted -Force
   ```

3. **Unblock downloaded files to prevent security interruptions:**

   PowerShell

   ```powershell
   Get-ChildItem . -Recurse | Unblock-File
   ```

4. **Launch the installer:**

   PowerShell

   ```powershell
   .\install.ps1
   ```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768760751832/f8e9f5db-7cd3-4920-9dfd-d59506990612.png" alt="" align="center" fullwidth="true" />

### **Issue: Compatible Windows Release is "False" on Windows 11**

* Reason: The CommandoVM scan tool is programmed to search for Windows 10 Pro/Enterprise. When using Windows 11, the scan may not recognize the OS build correctly and return a false result.

* Solution: Since the system is a Pro edition and installed within a virtual machine, you can manually override the scan by clicking the confirmation box and then "Continue".

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768764062761/c130827d-afe7-4466-bd0b-269386be9f84.png" alt="" align="center" fullwidth="true" />

### 1️⃣ Lite Profile (Low Data Consumption) Download Size:

* Consumes the least amount of data because it only downloads the essential core tools.

* Storage: Requires significantly less storage space than the 70 GB required by the default.

* Usage: Suitable if you have a limited internet connection or weak machine resources, but it won't include all the attack tools you might need later on your laptop.

### 2️⃣ Default Profile (Medium and Recommended) Download Size:

* Consumes approximately 20-30 GB.

* Storage: Requires 70 GB of hard drive space.

* Usage: The best balance for your project as it provides the basic hacking tools for a Windows environment.

### 3️⃣ Full Profile (High Data Consumption) Download Size:

* Consumes the most data because it downloads every tool available in the project without exception.

* Storage: May exceed 100 GB.

* Enter You Pass :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768763694896/7259088b-e145-4691-9fad-6ea81ae52586.png" alt="" align="center" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768813922330/b3bf8faf-97e3-4cd8-bbe6-9aa520cdb49c.png" alt="" align="center" fullwidth="true" />

> ✅ Done Install

***

***

***

## 🛠️ Adding New Tools to CommandoVM (Post-Installation)

* Since **CommandoVM** relies on the **Chocolatey** package manager, adding new tools is straightforward and can be done directly through **PowerShell**.

### Step 1: Open PowerShell with Administrator Privileges

* Right-click the **Start** button and select **Windows PowerShell (Admin)**.

### Step 2: Search for a Tool (Optional)

* If you want to verify the exact tool name in the Chocolatey repository, use:

```powershell
choco search <tool_name>
```

* **Example:**

```powershell
choco search nmap
```

### Step 3: Install the Tool

Use the following command to install a tool automatically:

```powershell
cinst <tool_name> -y
```

* **cinst:** Short for *Chocolatey Install*

* **-y:** Automatically accepts all installation prompts

## Commonly Used Tools (Ready-to-Use Commands)

Based on an **Active Directory–focused lab**, these are the tools you will most likely need:

### Network Mapping Tool

```powershell
cinst bloodhound -y
```

### Credential Dumping Tools

```powershell
cinst mimikatz -y
```

### Exploitation & AD Attack Scripts (Impacket)

```powershell
cinst impacket -y
```

> ✅ These tools integrate seamlessly into CommandoVM and are essential for realistic Active Directory attack and post-exploitation scenarios.

