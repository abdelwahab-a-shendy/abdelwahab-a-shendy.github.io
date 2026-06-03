
***

| **Device**                     | **Role**                 | **Executed Tasks**                                                                                                                                             |
| ------------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AD Server (Windows Server)** | Log Source               | - Generating **Windows Security/Application** logs. - Enabling **Audit Policy**. - Activating **WinRM** and configuring **GPO** to point to the Log Collector. |
| **Log Collector (Windows)**    | WEF Collector + Logstash | - Receiving **WEF** logs from the AD via **Forwarded Events**. - Installing **Logstash** to process these logs. - Sending data to the **ELK Server (Linux)**.  |
| **ELK Server (Linux)**         | Storage and Analysis     | - Receiving logs from Logstash. - Storing and analyzing data using **Elasticsearch/Kibana**.                                                                   |

***

# **1️⃣ ELK Server Preparation**

## **1.1 Checking Elasticsearch**

```sh
curl -k -u elastic:3lSq=GCEWU1ygpW_cEkl "https://192.168.1.16:9200/"
{
  "name" : "lab-elk-n8n-VirtualBox",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "EtKojqmjQLiczGlz67ig6A",
  "version" : {
    "number" : "9.1.4",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "0b7fe68d2e369469ff9e9f344ab6df64ab9c5293",
    "build_date" : "2025-09-16T22:05:19.073893347Z",
    "build_snapshot" : false,
    "lucene_version" : "10.2.2",
    "minimum_wire_compatibility_version" : "8.19.0",
    "minimum_index_compatibility_version" : "8.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

> ✅ Elasticsearch is running correctly, and the cluster is active.

## **1.2 Checking Kibana**

```sh
systemctl status elasticsearch
```

> ✅ Kibana is running successfully.

## **1.3 Checking Network Accessibility**

* ELK IP: `192.168.1.16`

* Log Collector IP: `192.168.1.24`

* Verify connectivity via:

```powershell
C:\Users\WIN-Log-Collector>ping 192.168.1.16
Pinging 192.168.1.16 with 32 bytes of data:
Reply from 192.168.1.16: bytes=32 time=7ms TTL=64
Reply from 192.168.1.16: bytes=32 time=2ms TTL=64
Reply from 192.168.1.16: bytes=32 time=3ms TTL=64
Reply from 192.168.1.16: bytes=32 time<1ms TTL=64

Ping statistics for 192.168.1.16:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 7ms, Average = 3ms
```

> ✅ Devices are connected and can communicate with each other correctly.

***

***

***

# **2️⃣ Activating Audit Policy on AD Server**

## **2.1 Ensuring Connectivity Between Devices**

* AD Server IP: `192.168.1.90`

* Win-Log-Collector IP: `192.168.1.95`

* Connection Test :

```powershell
C:\Users\WIN-Log-Collector>ping 192.168.1.90
Pinging 192.168.1.90 with 32 bytes of data:
Reply from 192.168.1.90: bytes=32 time<1ms TTL=128
Reply from 192.168.1.90: bytes=32 time<1ms TTL=128
Reply from 192.168.1.90: bytes=32 time<1ms TTL=128
Reply from 192.168.1.90: bytes=32 time=1ms TTL=128

Ping statistics for 192.168.1.90:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 1ms, Average = 0ms
```

> ✅ Connection is successful, and the devices can see each other.

## **2.2 Joining the Domain and Creating a User**

* A new user was created and logged in with the name `aasdomain\abdelwahabshandy` !

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366389644/b79e5708-d41e-4319-a9ca-435dd39c0e88.png" align="center" fullwidth="true" />

```powershell
C:\Users\abdelwahabshandy>whoami
aasdomain\abdelwahabshandy

C:\Users\abdelwahabshandy>whoami /fqdn
CN=Abdelwahab OJT. Shandy,CN=Users,DC=aasdomain,DC=local
```

* Ensured the user is in the appropriate **OU** (Organizational Unit).

  * The created user was added inside the OU:

  * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366418811/d8afaaab-39ed-44d3-9cc9-b9682e2e037f.png" align="center" fullwidth="true" />

> The devices are now in the same domain; proceeding to the next step.

## **2.3 Activating Audit Policy**

* Created a **GPO** (Group Policy Object) from `Group Policy Management` named:

  * `SocEng - Audit Policy`

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366439206/c5e3b5fc-f059-4dae-b33a-5f45280fcb98.png" align="center" fullwidth="false" />

* Activated **Success and Failure** for all important policies:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366461903/e7fa5461-7565-4042-9734-fce5798f2c6b.png" align="center" fullwidth="true" />

  * Logon/Logoff، Account Lockout، Special Logon، Network Policy Server، System Integrity

* Updated the policies :

```powershell
gpupdate /force

auditpol /get /category:*
```

> ✅ Security and Application logs are now being generated.

***

***

***

# **3️⃣ Setting up Windows Event Forwarding (WEF)**

## **First: On the Log-Collector Machine:**

### **3.1 Enabling WinRM on the Log Collector**

```powershell
PS C:\Windows\system32> winrm quickconfig
WinRM is not set up to receive requests on this machine.
The following changes must be made:

Start the WinRM service.
Set the WinRM service type to delayed auto start.

Make these changes [y/n]? y
WinRM has been updated to receive requests.
WinRM service type changed successfully.
WinRM service started.
WinRM is not set up to allow remote access to this machine for management.
The following changes must be made:
Enable the WinRM firewall exception.

Make these changes [y/n]? y

WinRM has been updated for remote management.
WinRM firewall exception enabled.
```

> A **firewall exception** was **added** to allow remote access.

* To verify this, the following command was used:

```powershell
netstat -ano | findstr 5985
```

* The result showed that the device is listening on port **5985**:

```powershell
TCP    0.0.0.0:5985     0.0.0.0:0     LISTENING
TCP    [::]:5985        [::]:0        LISTENING
```

> ✅ The service is running, port **5985** is open, and a firewall exception has been added.

### **3.2 Creating a Subscription (for Log Collection)**

* **Event Viewer** was opened as **Administrator**:

  * From the side menu: `Event Viewer → Subscriptions`

* An alert appeared: `> “The Windows Event Collector service is not running. Do you want to start it?”` and **Yes** was clicked.

* From the **Action** menu, **1. Create Subscription…** was selected.

### **Setting Up Subscription Details**

##### **(1) Subscription Name**

* In the **Name** field, entered: `AD-Audit-Logs`

* **Description**: "Collect Security Logs from AD Server"

##### **(2) Choosing the Subscription Type**

* Under **Subscription type:**

  * Selected **Collector initiated** ✅

* This is so that the source devices (like the AD) will send the logs themselves.

* <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366487921/767b7b40-7588-48d6-8aee-5832276a5135.png" align="center" fullwidth="true" />

##### **(3) Specifying Source Computers**

* Clicked **Select Computers…**

* Clicked **Add Domain Computers…**

* Entered the server name `DC`

* Clicked **Check Names** → The full device name appeared (ensuring it's a domain member)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366529505/d7cd39c4-1a64-4e73-a524-78d97149e005.png" align="center" fullwidth="true" />

* Clicked **OK** ✅

##### **(4) Specifying Required Events**

* Clicked **Select Events…**

* A window opened to choose the log types:

  * From **Logged:** selected **Any time**

  * From **Event Level:** checked all of them.

  * From **By Log:** selected: `Windows Logs → Security, Application And System`

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366550144/432a18b5-1d3e-454b-ad5e-5ee32246a40d.png" align="center" fullwidth="true" />

* Clicked **OK** ✅

##### **(5) Advanced Settings**

* Clicked on **Advanced...**

  * Under **Event delivery optimization:** selected:

  * **Minimize Latency** to ensure faster delivery.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366577406/2c9847ac-0519-4548-967c-23efb0280002.png" align="center" fullwidth="true" />

* Clicked **OK** ✅

##### **(6) Saving the Subscription**

* Clicked **OK** to save the subscription.

  * The new subscription appeared under the **Subscriptions** list :

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366611607/29e68c8c-8ea5-4e8a-8526-011cf2c566b7.png" align="center" fullwidth="true" />

***

## **Second: On the AD Server (Source) Machine**

### **3.2.1 Enabling the WEC (Windows Event Collector) Service**

* Opened **PowerShell** as Administrator or used `services.msc` from Start:

```powershell
services.msc
```

* Searched for: `Windows Event Collector`

  * In the Properties window:

  * Set **Startup type** to **Automatic**

  * Clicked **Start**

  * Then **Apply → OK**

> ✅ The goal is for the service to start automatically with the system.

### **3.2.2 Setting up Group Policy to Allow Forwarding**

1. Opened **Group Policy Management** from the AD Server:

   * `Server Manager → Tools → Group Policy Management`

2. Right-clicked on the **OU** containing the devices (e.g., `SocEng`) → **Create a GPO in this domain, and Link it here...**

3. Named it, for example: `WEF Forwarding Policy`

4. Right-clicked on it → **Edit**

### **3.2.3 Modifying WinRM Settings via GPO**

* Navigated to the following path within the Editor: `Computer Configuration → Policies → Administrative Templates → Windows Components → Event Forwarding`

1. Opened the setting named: **Configure target Subscription Manager**

2. Checked **Enabled**

3. In the box, entered:

```sh
Server=http://Log-Collector.aasdomain.local:5985/wsman/SubscriptionManager/WEC,Refresh=60
```

* This configuration makes the devices forward logs every **60 seconds**.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366664893/83f0a46e-0666-44b3-8ee5-2a4ef8930b89.png" align="center" fullwidth="false" />

* Clicked **OK** ✅

### **3.2.4 Updating Policies on the AD Server**

Opened **CMD** as Administrator:

```powershell
C:\Users\Administrator> gpupdate /force
Updating policy...

Computer Policy update has completed successfully.
User Policy update has completed successfully.
```

***

## 🧩 **Third: Verification of Operation**

* On the **AD Server (DC)**, ran PowerShell as Administrator:

```powershell
C:\Users\Administrator>winrm quickconfig
WinRM service is already running on this machine.
WinRM is already set up for remote management on this computer.
```

* On the **Log Collector**, executed :

```powershell
C:\Users\abdelwahabshandy>wecutil es
AD-Audit-Logs
```

* On the **Log Collector**: `Event Viewer → Windows Logs → ForwardedEvents`:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366698586/01314f76-b170-4280-b887-33b24bfde4f4.png" align="center" fullwidth="false" />

***

***

***

# **4️⃣ Configuring Logstash on the Log Collector**

* Navigated to the folder `C:\Logstash\config\`

* Created a file named, for example: `forwardedevents.conf`

* The file content was as follows (example for fetching Windows ForwardedEvents logs):

```yaml
input {
  eventlog {
    type  => 'Win32-EventLog'
    logfile  => 'System'
  }
}

filter {
  mutate {
    add_field => { "[log_source_type]" => "logstash_local_win" }
  }
}

output {
  elasticsearch {
    hosts => ["https://192.168.1.16:9200"] 
    index => "wef-win-logs-%{+YYYY.MM.dd}"
    user => "elastic"
    password => "3lSq=GCEWU1ygpW_cEkl"
    ssl_enabled => true
    ssl_verification_mode => "none"
  }
}
```

### **Configuration Test**

* Opened **PowerShell** as **Administrator** in the **Logstash** path :

```powershell
cd C:\Logstash\bin
```

* Executed the test :

```powershell
logstash.bat -f ..\config\forwardedevents.conf --config.test_and_exit
|
|
Configuration OK
Exiting Logstash
```

> This means **Logstash is able to read the file and confirm it's correct**.

***

### **Running Logstash**

```powershell
cd C:\Logstash\bin

.\logstash-plugin.bat install logstash-input-eventlog
```

* To run Logstash:

```powershell
PS C:\Logstash\bin> .\logstash.bat -f "C:\Logstash\config\your-pipeline-file.conf"
```

**Actually running Logstash** (without `--config.test_and_exit`) to monitor the reception of ForwardedEvents:

```yaml
.\logstash.bat -f "C:\Logstash\config\forwardedevents.conf"
```

***

### **Verifying Data Arrival in Elasticsearch**

* Opened Kibana → Discover

* Selected the Index Pattern:

  * wef-win-logs-\*

    <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366729290/3dfc88b6-4b2e-442b-add0-8bfb466c8825.png" align="left" fullwidth="true" />

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366771377/1610b17a-89e1-4357-96bc-a2f4cc001c5a.png" align="center" fullwidth="false" />

> ⚠️ Noticed that some data appeared incorrectly (UTF-8 not supported) and the text was garbled, as shown in the image:
>
> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366783167/cf51b6c3-bc1c-4081-95c6-360c1deee9e9.png" align="center" fullwidth="false" />

***

***

***

# **Final Step: Using Winlogbeat**

## **Running Winlogbeat as an Auxiliary Tool**

**Winlogbeat → Logstash → Elasticsearch** was used to overcome the encoding issues:

1. Navigated to the **Winlogbeat** folder:

```sh
cd 'C:\Program Files\Winlogbeat\'
```

2. Modified the **winlogbeat.yml** file to define the tag for Forwarded Events :

```yaml
  - name: ForwardedEvents
    tags: ["forwarded_event"]
```

3. Set up **Logstash Output** in the same file:

```yaml
# -------------- Logstash Output --------------
output.logstash:
  # The Logstash hosts
  hosts: ["192.168.1.95:5046"]
```

4. Allowed script execution on Windows :

```sh
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

5. Installed and started the service :

```sh
.\install-service-winlogbeat.ps1

Start-Service winlogbeat

Get-Service winlogbeat

.\winlogbeat.exe -e
```

***

## **Setting up the Pipeline in Logstash**

**pipelines.yml** file:

```yaml
- pipeline.id: forwarded-windows-pipeline
  path.config: "C:\Logstash\config\forwarded-windows-pipeline.conf"
```

**forwardedevents.conf** file:

```yaml
input {
  beats {
    port => 5046 
  }
}

filter {
  mutate {
    add_field => { "[log_source_type]" => "logstash_local_win" }
    convert => { "SourceName" => "string" }
  }
}

output {
  elasticsearch {
    hosts => ["https://192.168.1.16:9200"] 
    index => "wef-win-%{+YYYY.MM.dd}"
    user => "elastic"
    password => "3lSq=GCEWU1ygpW_cEkl"
    ssl_enabled => true
    ssl_verification_mode => "none"
    codec => "json" 
  }
}
```

* Changed the **Index** name in Kibana to: `wef-win-*` :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366810615/5849fd8a-8fd6-44f0-bf97-04dcd914ec68.png" align="center" fullwidth="false" />

### **Starting the Services**

```yaml
.\winlogbeat.exe -e
```

* In a different PowerShell window:

```yaml
.\logstash.bat -f "C:\Logstash\config\forwardedevents.conf"
```

* The logs arrived correctly:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366847359/158d751d-0213-4ee5-a6b9-99e5b5654d74.png" align="center" fullwidth="false" />

* Applied a **Filter** by **DC** to show it in the results:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761366861344/b9baef90-c197-4bd6-b1e4-9b5d60c96d4e.png" align="center" fullwidth="false" />

### **Data Status Summary**

| **Stage**                                                                                                               | **Status**                                                                 |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **AD Server (DC)**                                                                                                      | **Sent** the log (DC Logoff Event).                                        |
| **Log Collector**                                                                                                       | **Collected** the log (via WEF) then **re-forwarded** it (via Winlogbeat). |
| **ELK Server (SIEM)**                                                                                                   | **Received** the log and indexed it successfully.                          |
| ✅ **Result:** The task was completed successfully, and the logs are now available for searching and analysis in Kibana. |                                                                            |

