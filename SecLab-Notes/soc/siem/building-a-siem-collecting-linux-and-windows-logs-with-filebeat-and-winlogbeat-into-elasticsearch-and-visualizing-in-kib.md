---
id: "68ee64a3d933cebf01767bda"
title: "Building a SIEM Collecting Linux and Windows Logs with Filebeat & Winlogbeat into Elasticsearch and Visualizing in Kibana"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/soc/siem/building-a-siem-collecting-linux-and-windows-logs-with-filebeat-and-winlogbeat-into-elasticsearch-and-visualizing-in-kibana"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T14:56:35.951Z"
updatedAt: "2026-01-25T15:35:46.827Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760453823707/405a760b-0770-465a-a569-a4be389726da.webp" align="center" fullwidth="false" />

> Part 1: Ubuntu Setup and Elasticsearch Installation :
>
> * Setting a Static IP on Ubuntu VM
>
> * Installing Elasticsearch via Debian Package
>
> * Configuring Elasticsearch (elasticsearch.yml)
>
> * Running Elasticsearch as a systemd service
>
> * Setting the elastic user password
>
> * Verifying Elasticsearch functionality
>
> Part 2: Kibana Installation :
>
> * Installing Kibana via Debian Package
>
> * Importing the PGP Signing Key
>
> * Adding Elastic Repository and Installing Kibana
>
> Part 3: Registering Kibana with Elasticsearch :
>
> * Creating an Enrollment Token on Elasticsearch
>
> * Making Kibana Accessible Externally (Optional)
>
> * Running Kibana as a systemd service
>
> * Completing Kibana Registration with Elasticsearch Part 4: Windows Device and Winlogbeat
>
> * Enabling Audit Policy on Windows :
>
>   * Login is correct and incorrect
>
>   * Creating/Deleting Users
>
>   * Creating Groups
>
>   * Adding Users to Groups
>
> * Installing Winlogbeat on Windows
>
> * Configuring `winlogbeat.yml`
>
> * Connecting Winlogbeat to Elasticsearch and Kibana
>
> * Verifying Logs in Kibana Dashboards

***

# **Part 1: Ubuntu Setup & Elasticsearch Installation**

> * There are a few things we need to ensure before downloading or installing anything:
>
>   * We prefer that the VMs be Ubuntu, and we avoid Kali for security.
>
>   * We'll set up a static IP on the machines we'll be running SIEM on.

***

## 1️⃣ Setting a Static IP

* Understanding the Current NAT Configuration

* NAT means that the machine will obtain a dynamic IP (DHCP) from VirtualBox, and internet connectivity will pass through the primary machine.

* We'll change it to a static IP within Ubuntu. We need to know the gateway and DNS.

```bash
ip a   # current IP
#OR
ifconfig                  
192.168.1.4/24

ip route                 # Gateway
192.168.1.1
```

#### **GUI (User Interface) Method :**

1. Open Settings in Ubuntu.

2. Go to Wired > Wired Settings (or Wi-Fi).

3. Click ⚙️ next to the connected network.

4. Change the IPv4 Method from Automatic (DHCP) to Manual.

5. Enter the following information:

   1. Address: Static IP, such as 192.168.1.100

   2. Netmask / Prefix: 255.255.255.0 or /24

   3. Gateway: such as 192.168.1.1

   4. DNS: 8.8.8.8, 8.8.4.4

6. Click Apply, and restart the network or machine.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087537209/dd4a4c32-941d-42cd-9058-2fa8a8854a20.png" alt="" align="left" fullwidth="false" />

***

## Install Elasticsearch with a Debian Package

> [https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-with-debian-package](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-with-debian-package)

#### **First, we import the PGP Key to ensure that the package is authentic:**

```sh
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
```

* Our goal: to verify Elastic packages before installation.

#### 2️⃣ **Add the Elastic Repository :**

```sh
sudo apt-get install apt-transport-https
|
|
|
(Reading database ... 169650 files and directories currently installed.)
Preparing to unpack .../apt-transport-https_2.4.14_all.deb ...
Unpacking apt-transport-https (2.4.14) ...
Setting up apt-transport-https (2.4.14) ...
```

* We save the repository definition in `/etc/apt/sources.list.d/elastic-9.x.list`:

```sh
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-9.x.list
```

* **Our goal**: to allow apt to use HTTPS and add an official repo without modifying the main sources.

#### 3️⃣ **Update apt and install Elasticsearch :**

```sh
sudo apt-get update && sudo apt-get install elasticsearch
```

***

#### 4️⃣ Configure Network (to access the node from other machines)

* For a **Single-node cluster**:

1. We open the configuration file `/etc/elasticsearch/elasticsearch.yml`:

```sh
sudo nano /etc/elasticsearch/elasticsearch.yml
```

* Be careful — YAML is case sensitive and space sensitive.

Key settings:

```yaml
cluster.name: elasticsearch-demo     # Cluster name
network.host: 0.0.0.0                # Allow connection from all networks
transport.host: 0.0.0.0              # Same for transport layer
```

Save and exit nano with `Ctrl+O` then `Ctrl+X`.

🔹 **Goal:**

* [`cluster.name`](http://cluster.name) → must be the same for all nodes in the cluster.

* [`network.host`](http://network.host) → makes the node accessible to other machines.

* [`transport.host`](http://transport.host) → enables communication between nodes.

For [`network.host`](http://network.host), we can also use the VM’s specific IP.

***

##### 5️⃣ Run Elasticsearch as a systemd service

```sh
# Reload systemd to recognize new service
sudo /bin/systemctl daemon-reload

# Enable Elasticsearch service at boot
sudo /bin/systemctl enable elasticsearch.service

# Start the service
sudo systemctl start elasticsearch.service
```

* `daemon-reload` → updates systemd so it knows about the new service.

* `enable` → runs the service automatically at boot.

* `start` → runs the service now.

> **Our goal:** The service works now and automatically upon startup.

***

##### 6️⃣ Set the `elastic` user password (first time only)

At first run, security is configured automatically, but the `elastic` superuser password is not shown. We set it using:

**We should save this password in a safe place!** Recommended to store it as an environment variable:

```bash
aas@aas:~$ sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
This tool will reset the password of the [elastic] user to an autogenerated value.
The password will be printed in the console.
Please confirm that you would like to continue [y/N]y


Password for the [elastic] user successfully reset.
New value: hel+6ncXHaUKps*RU-k5
aas@aas:~$ export ELASTIC_PASS="hel+6ncXHaUKps*RU-k5"
```

> Our goal: Set the superuser password to protect the cluster.

***

##### 7️⃣ Verify Elasticsearch is running

Test the connection using `curl` with the auto-generated CA certificate:

```bash
sudo apt install curl # Install it if it is not available

aas@aas:~$ sudo curl --cacert /etc/elasticsearch/certs/http_ca.crt -u elastic:$ELASTIC_PASS https://localhost:9200
{
  "name" : "aas",
  "cluster_name" : "elasticsearch-demo",
  "cluster_uuid" : "rjyFV29wSxCvhUX3bhSdCw",
  "version" : {
    "number" : "9.1.3",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "0c781091a2f57de895a73a1391ff8426c0153c8d",
    "build_date" : "2025-08-24T22:05:04.526302670Z",
    "build_snapshot" : false,
    "lucene_version" : "10.2.2",
    "minimum_wire_compatibility_version" : "8.19.0",
    "minimum_index_compatibility_version" : "8.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

If a JSON appears containing `cluster_name` and `version`, Elasticsearch is running successfully.

> We stored the password in the variable `ELASTIC_PASS` so we can use it easily.

***

### Now we are done ✅

* When opening Elasticsearch in a browser (usually at [https://localhost:9200](https://localhost:9200)), **security is enabled by default**, so it will ask for:

  * **User**: `elastic`

  * **Password**: the one we set using `elasticsearch-reset-password`

* **If we forget the password, we can reset it again or just check :**

```sh
aas@aas:~$ echo $ELASTIC_PASS
hel+6ncXHaUKps*RU-k5
aas@aas:~$
```

> That's why we made it a variable.

* This completes Part 1 :

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087592464/c5b479d8-058d-4682-b82d-6311e485c20a.png" alt="" align="left" fullwidth="false" />

***

***

***

# **Part 2: Installing Kibana and Connecting It to Elasticsearch :**

> [https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-kibana-with-debian-package](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-kibana-with-debian-package)

* Kibana is the graphical interface for Elasticsearch. Without it, we would have to use curl or other API tools to manipulate data.

* With Kibana, we can:

  * Display data in the form of graphics and reports.

  * Manage Elasticsearch indices and settings through a graphical interface.

  * Monitor cluster performance and health.

  * Create interactive dashboards.

***

### **1️⃣ Import the PGP Signing Key**

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
```

> **Our goal:** to ensure that the packages we install are original and safe.

***

### **2️⃣ Install Kibana from the APT Repository**

* **Add Elastic repository to sources list :**

```bash
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-9.x.list
```

* Here, we tell Ubuntu/Debian (“hey `apt`”) where the official repository containing Kibana is.

* The option `[signed-by=...]` tells `apt` to use the key we added in the previous step to verify the authenticity of packages from this repository.

**Update package list and install Kibana:**

```bash
sudo apt-get install apt-transport-https

sudo apt-get update

sudo apt-get install kibana
```

> Our goal: to locate the official repository and ensure that apt can validate packages before installing them.

***

### **3️⃣Create an Enrollment Token for Kibana**

**Step (we do this on the Elasticsearch server):**

```bash
sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

* This will generate an **Enrollment Token**.

* We will do the following:

* <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087636660/ea30a40b-0c10-48e2-a7a9-558a41835b86.png" alt="" align="left" fullwidth="false" />

```bash
aas@aas:~$ echo $KIBANA_ENROLL_TOKEN
eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTkyLjE2OC4xLjEwMDo5MjAwIl0sImZnciI6ImJhNjY4ZjVlNjhkZjk1ODM4ZmE4ZjI5ZmUzOWQ1Mjg5YmU3MGViNTU3OTJiMDlmN2VkYTllMjk2MjM3NTMyMjMiLCJrZXkiOiJhMHY0VFprQnlfWEd5Z3BzVmRDUDpIbWpUZHhYZzNNVEhGdGRwcTZfMnpRIn0=
```

> If the token appears correctly, everything is fine.

* **Why this step is important:**

  * This token serves as a "secure invitation" for Kibana to connect to the cluster.

  * It contains security settings (TLS certificates) and grants user privileges to the kibana\_system user.

  * It expires after 30 minutes to maintain security.

***

### **4️⃣Make Kibana Accessible Externally**

Open the configuration file:

```bash
sudo nano /etc/kibana/kibana.yml
```

* Search for the line `#`[`server.host`](http://server.host)`: "`[`localhost`](http://localhost)`"` and other lines other than:

  * Perform a search using Cntrl + W

```bash
server.host: "0.0.0.0"
```

> Save file.

* **Default:** [`localhost`](http://localhost) means Kibana only listens for connections from the same machine — secure but not accessible from other devices.

* **Change:** `0.0.0.0` means “listen on all available IP addresses on this server.” This allows any device on the network to access Kibana (authentication is still required).

> Our goal: to allow access to Kibana from any device on the network (authentication is still required).

***

### **5️⃣ Run Kibana as a systemd Service**

1. **Enable automatic startup at boot:**

```bash
sudo systemctl daemon-reload
OR 
sudo /bin/systemctl daemon-reload

sudo systemctl enable kibana.service
OR
sudo /bin/systemctl enable kibana.service
```

* **Explanation:** `enable` creates a symbolic link so the service **starts automatically** on system boot; no need to start it manually each time.

2. **Start the Kibana service:**

```bash
sudo systemctl start kibana.service
```

> Our goal: Kibana starts right away and automatically when your device starts up. ✅

***

***

***

# **Part Three: Register Kibana with Elasticsearch**

> This step is the most important; in it we will connect Kibana with Elasticsearch .

### **1️⃣ Obtain the Verification Code:**

* Let's see the status of Kibana service with this command:

```sh
sudo systemctl status kibana
```

* If it appears to you like this :

```sh
● kibana.service - Kibana
     Loaded: loaded (/lib/systemd/system/kibana.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2025-09-15 18:49:09 EEST; 1min 43s ago
```

* Kibana is still running but you haven't registered with Elasticsearch yet.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087670623/144b577d-7c3a-4c99-9af7-5be2c5a037e8.png" alt="" align="left" fullwidth="false" />

2️⃣ We will open the link that contains the code:

```ruby
http://<host-IP>:5601/?code=<6-digit-code>

EX :
http://192.168.1.100:5601/?code=823251
```

> Open it in the browser and complete the steps that appear.

* After that :

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087688441/ae5e52ef-20d2-4631-bf68-e998952f6293.png" alt="" align="left" fullwidth="false" />

* This is the token we stored in a variable.

  * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087739846/6c8f00ad-31ea-4d91-89fd-bf576fe3653a.png" alt="" align="left" fullwidth="false" />

* There is a problem, we told you above that it closes every half hour:

  * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087767962/5efd8923-06ef-434e-88bf-4f26a072081d.png" alt="" align="left" fullwidth="false" />

#### 3️⃣ If the code or token expires:

* The enrollment token will expire after half an hour. If it expires, we'll create a new one:

```sh
sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

> You'll receive a new token valid for 30 minutes.

* Return to the Kibana registration page, enter the new token in the required field, and click Configure Elastic again :

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087789659/9f14870e-0656-4a71-b6b6-e44ab8613659.png" alt="" align="left" fullwidth="false" />

### **4️⃣ Login Credentials:**

* We will use the username and password that we stored before:

```sh
aas@aas:~$ echo $ELASTIC_PASS
hel+6ncXHaUKps*RU-k5
```

> * The username will be: elastic
>
> * The password will be the value in $ELASTIC\_PASS

* We enter them, and now we've registered Kibana with Elasticsearch.

***

***

***

# Part 4

> * Windows Device
>
> * In this section, we'll work on a Windows device to:
>
>   * Enable Audit Policy to record all important events (logon, user creation, user deletion, group creation, user addition to group).
>
>   * Send the logs to a SIEM using Winlogbeat.
>
> * Let's divide this into two parts:
>
> * First, we enable the **Audit Policy**.
>
> * Second, we send the logs to the SIEM.

***

## **Step 1: Activate Audit Policy**

##### **1️⃣ Open Local Security Policy**

* Press Win + R

* Type secpol.msc and press Enter

* Local Security Policy will open (you can also search for it in Windows as Local Security Policy)

##### **2️⃣ Navigate to Audit Policy**

1. On the left panel, choose:\
   **Security Settings → Local Policies → Audit Policy**

2. On the right panel, you will see the policies you can enable

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087821509/6fad09ea-16f7-4497-8ce1-27792bed1629.png" alt="" align="left" fullwidth="false" />

##### **3️⃣ Enable Policies for the Required Actions**

* Logging in → **Audit logon events** + **Audit account logon events**

* Creating/Deleting a user or group → **Audit account management**

* Adding a user to a group → **Audit account management**

* For each policy:

  * Select Success and Failure to record success and failure.

  * Click OK.

##### **4️⃣ We'll apply the settings immediately:**

* Open CMD as Administrator and type:

```sh
gpupdate /force
|
|
C:\Windows\system32>gpupdate /force
Updating policy...

Computer Policy update has completed successfully.
User Policy update has completed successfully.
```

* Run this command to apply the policies immediately

#### **5️⃣ Let's test in Event Viewer:**

* Log out and log back in to make sure.

* From the left: Windows Logs → Security

* Here you'll find all the events that were logged.

***Here, all events related to the enabled Audit Policy will be recorded***

##### **Example Event IDs for Login:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087848073/0321e0e1-645d-41eb-ab68-022ef46551a2.png" alt="" align="left" fullwidth="false" />

* Event ID 4624 → successful logon

* Event ID 4625 → failed logon

* I tested both a correct and incorrect login:

* <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087867976/f091a944-9d23-4945-a367-f071e82a499d.png" alt="" align="left" fullwidth="false" />

> Now everything is working correctly.

***

## **Step 2: Send logs to the SIEM using Winlogbeat**

> (After completing the steps above)

##### **- You will ping the server to make sure of the connection :**

```bash
C:\Users\aas>ping 192.168.1.100

Pinging 192.168.1.100 with 32 bytes of data:
Reply from 192.168.1.100: bytes=32 time=2ms TTL=64
Reply from 192.168.1.100: bytes=32 time=1ms TTL=64
Reply from 192.168.1.100: bytes=32 time=2ms TTL=64
Reply from 192.168.1.100: bytes=32 time=1ms TTL=64

Ping statistics for 192.168.1.100:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 1ms, Maximum = 2ms, Average = 1ms
```

> I initially faced a network issue because the device couldn’t see the network, which I solved by setting a static IP and pointing it to the DHCP from the NAT in the Virtual Machine.

* We need a little bit ahead

```powershell
PS C:\Users\aas> hostname
WIN-AS
```

> To verify connectivity

##### **- You can download Winlogbeat from the official website :**

1. Go to the [official Elastic download page](https://www.elastic.co/downloads/beats/winlogbeat)

2. Select the appropriate version for your system (usually 64-bit) → download the `.zip` file

   * Follow the steps on the website in order:

     1. Edit the `winlogbeat.yml` configuration file

     2. Run in PowerShell

     3. Reference: [Winlogbeat quick start](https://www.elastic.co/docs/reference/beats/winlogbeat/winlogbeat-installation-configuration)

3. Extract the files to a folder such as:

```bash
C:\Program Files\Winlogbeat
```

##### **Modify the** `winlogbeat.yml` Configuration File

> Open the file with **Notepad** as Administrator

##### Winlogbeat Setup:

1. **Install Winlogbeat on the Windows device**

2. **Configure** `winlogbeat.yml` to read Security logs (or all logs if needed):

```bash
# ============= Winlogbeat specific options ==========
winlogbeat.event_logs:
  - name: Security
    ignore_older: 72h

  - name: System

  - name: Application

  - name: Microsoft-Windows-Sysmon/Operational

  - name: Windows PowerShell
    event_id: 400, 403, 600, 800

  - name: Microsoft-Windows-PowerShell/Operational
    event_id: 4103, 4104, 4105, 4106

  - name: ForwardedEvents
    tags: [forwarded]
```

3. **Specify the Elasticsearch endpoint to send the logs to:**

```bash
# ------------------- Elasticsearch Output ----------------
output.elasticsearch:
  # Array of hosts to connect to.
  hosts: ["https://192.168.1.100:9200"]

  # Protocol - either `http` (default) or `https`.
  protocol: "https"
  ssl:
      enabled: true
  ssl.verification_mode: none

  # Authentication credentials - either API key or username/password.
  #api_key: "id:api_key"
  username: "elastic"
  password: "hel+6ncXHaUKps*RU-k5"

  # Pipeline to route events to security, sysmon, or powershell pipelines.
  pipeline: "winlogbeat-%{[agent.version]}-routing"
```

4. **Specify Kibana to monitor the data:**

```bash
# =================== Kibana =====================

# Starting with Beats version 6.0.0, the dashboards are loaded via the Kibana API.
# This requires a Kibana endpoint configuration.
setup.kibana:

  # Kibana Host
  # Scheme and port can be left out and will be set to the default (http and 5601)
  # In case you specify and additional path, the scheme is required: http://localhost:5601/path
  # IPv6 addresses should always be defined as: https://[2001:db8::1]:5601
  host: "https://192.168.1.100:5601"
  ssl.verification_mode: none

  # Kibana Space ID
  # ID of the Kibana Space into which the dashboards should be loaded. By default,
  # the Default Space will be used.
  #space.id:
```

##### Run the Service:

* Open PowerShell as Administrator:

```bash
PS C:\Windows\system32> cd ..
PS C:\Windows> cd 'C:\Program Files\Winlogbeat\'
PS C:\Program Files\Winlogbeat> .\install-service-winlogbeat.ps1
.\install-service-winlogbeat.ps1 : File C:\Program Files\Winlogbeat\install-service-winlogbeat.ps1 cannot be loaded
because running scripts is disabled on this system. For more information, see about_Execution_Policies at
https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ .\install-service-winlogbeat.ps1
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

> If you get a policy error, scripts are blocked due to PowerShell Execution Policy

* **Check current Execution Policy:**

```powershell
PS C:\Program Files\Winlogbeat> Get-ExecutionPolicy
Restricted
```

* **Change Execution Policy:**

```powershell
PS C:\Program Files\Winlogbeat> Set-ExecutionPolicy Bypass -Scope Process

Execution Policy Change
The execution policy helps protect you from scripts that you do not trust. Changing the execution policy might expose
you to the security risks described in the about_Execution_Policies help topic at
https:/go.microsoft.com/fwlink/?LinkID=135170. Do you want to change the execution policy?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): y
```

* **Run the installation script again:**

```powershell
PS C:\Program Files\Winlogbeat> .\install-service-winlogbeat.ps1

Status   Name               DisplayName
------   ----               -----------
Stopped  winlogbeat         winlogbeat


PS C:\Program Files\Winlogbeat>
```

* **The winlogbeat service is now created (initially Stopped)**

* **Start the service:**

```powershell
PS C:\Program Files\Winlogbeat> Start-Service winlogbeat
```

* **Verify it is running:**

```powershell
PS C:\Program Files\Winlogbeat> Get-Service winlogbeat

Status   Name               DisplayName
------   ----               -----------
Running  winlogbeat         winlogbeat


PS C:\Program Files\Winlogbeat>
```

> `Status: Running` means the service ran successfully.

* OR

```powershell
.\winlogbeat.exe test config -c .\winlogbeat.yml -e
```

> If you get a Kibana HTTPS error, change the host in `winlogbeat.yml` to [`http://192.168.1.100:5601`](http://192.168.1.100:5601)

```powershell
.\winlogbeat.exe setup -e
```

* It will show something like this:

```bash
{"log.level":"error","@timestamp":"2025-09-15T17:27:56.151-0700","log.origin":{"function":"github.com/elastic/beats/v7/libbeat/cmd/instance.handleError","file.name":"instance/beat.go","file.line":1355},"message":"Exiting: error connecting to Kibana: fail to get the Kibana version: HTTP GET request to https://192.168.1.100:5601/api/status fails: fail to execute the HTTP GET request: Get \"https://192.168.1.100:5601/api/status\": http: server gave HTTP response to HTTPS client (status=0). Response: ","service.name":"winlogbeat","ecs.version":"1.6.0"}
Exiting: error connecting to Kibana: fail to get the Kibana version: HTTP GET request to https://192.168.1.100:5601/api/status fails: fail to execute the HTTP GET request: Get "https://192.168.1.100:5601/api/status": http: server gave HTTP response to HTTPS client (status=0). Response:
```

* **To solve the problem here :**

```powershell
# ======================= Kibana =========================

# Starting with Beats version 6.0.0, the dashboards are loaded via the Kibana API.
# This requires a Kibana endpoint configuration.
setup.kibana:

  # Kibana Host
  # Scheme and port can be left out and will be set to the default (http and 5601)
  # In case you specify and additional path, the scheme is required: http://localhost:5601/path
  # IPv6 addresses should always be defined as: https://[2001:db8::1]:5601
  host: "http://192.168.1.100:5601"
  #ssl.verification_mode: none
```

* And then :

```powershell
.\winlogbeat.exe setup -e
|
|
|
line":299},"message":"Loaded index template.","service.name":"winlogbeat","ecs.version":"1.6.0"}
Index setup finished.
Loading dashboards (Kibana must be running and reachable)
{"log.level":"info","@timestamp":"2025-09-15T17:37:12.567-0700","log.logger":"kibana","log.origin":{"function":"github.com/elastic/elastic-agent-libs/kibana.NewClientWithConfigDefault","file.name":"kibana/client.go","file.line":181},"message":"Kibana url: http://192.168.1.100:5601","service.name":"winlogbeat","ecs.version":"1.6.0"}
{"log.level":"info","@timestamp":"2025-09-15T17:37:12.762-0700","log.logger":"kibana","log.origin":{"function":"github.com/elastic/elastic-agent-libs/kibana.NewClientWithConfigDefault","file.name":"kibana/client.go","file.line":181},"message":"Kibana url: http://192.168.1.100:5601","service.name":"winlogbeat","ecs.version":"1.6.0"}
{"log.level":"info","@timestamp":"2025-09-15T17:37:15.325-0700","log.logger":"processors.add_cloud_metadata","log.origin":{"function":"github.com/elastic/beats/v7/libbeat/processors/add_cloud_metadata.(*addCloudMetadata).init.func1","file.name":"add_cloud_metadata/add_cloud_metadata.go","file.line":100},"message":"add_cloud_metadata: hosting provider type not detected.","service.name":"winlogbeat","ecs.version":"1.6.0"}
{"log.level":"info","@timestamp":"2025-09-15T17:37:34.033-0700","log.origin":{"function":"github.com/elastic/beats/v7/libbeat/cmd/instance.(*Beat).loadDashboards","file.name":"instance/beat.go","file.line":1070},"message":"Kibana dashboards successfully loaded.","service.name":"winlogbeat","ecs.version":"1.6.0"}
Loaded dashboards
{"log.level":"info","@timestamp":"2025-09-15T17:37:34.044-0700","log.logger":"esclientleg","log.origin":{"function":"github.com/elastic/beats/v7/libbeat/esleg/eslegclient.NewConnection","file.name":"eslegclient/connection.go","file.line":132},"message":"elasticsearch url: https://192.168.1.100:9200","service.name":"winlogbeat","ecs.version":"1.6.0"}
{"log.level":"warn","@timestamp":"2025-09-15T17:37:34.046-0700","log.logger":"esclientleg.tls","log.origin":{"function":"github.com/elastic/elastic-agent-libs/transport/tlscommon.(*TLSConfig).ToConfig","file.name":"tlscommon/tls_config.go","file.line":109},"message":"SSL/TLS verifications disabled.","service.name":"winlogbeat","ecs.version":"1.6.0"}
{"log.level":"warn","@timestamp":"2025-09-15T17:37:34.047-0700","log.logger":"esclientleg.tls","log.origin":{"function":"github.com/elastic/elastic-agent-libs/transport/tlscommon.(*TLSConfig).ToConfig","file.name":"tlscommon/tls_config.go","file.line":109},"message":"SSL/TLS verifications disabled.","service.name":"winlogbeat","ecs.version":"1.6.0"}
{"log.level":"info","@timestamp":"2025-09-15T17:37:34.120-0700","log.logger":"esclientleg","log.origin":{"function":"github.com/elastic/beats/v7/libbeat/esleg/eslegclient.(*Connection).Ping","file.name":"eslegclient/connection.go","file.line":324},"message":"Attempting to connect to Elasticsearch version 9.1.3 (default)","service.name":"winlogbeat","ecs.version":"1.6.0"}
Loaded Ingest pipelines
```

> After setup, Winlogbeat will connect to Elasticsearch successfully and dashboards will load.

* To make sure again :

```bash
PS C:\Program Files\Winlogbeat> .\winlogbeat.exe test config
Config OK
PS C:\Program Files\Winlogbeat> .\winlogbeat.exe test output
elasticsearch: https://192.168.1.100:9200...
  parse url... OK
  connection...
    parse host... OK
    dns lookup... OK
    addresses: 192.168.1.100
    dial up... OK
  TLS...
    security... WARN server's certificate chain verification is disabled
    handshake... OK
    TLS version: TLSv1.3
    dial up... OK
  talk to server... OK
  version: 9.1.3
```

```powershell
Restart-Service winlogbeat
```

#### Verify Logs in Kibana:

1. Open Kibana in browser (`https://<kibana-server>:5601`)

2. Navigate to **Analytics > Dashboard**

3. Search for **"\[Winlogbeat] Security"**

4. Select any dashboard, e.g., **"Failed Logon and Account Lockout Winlogbeat Security"**

   * Test failed logons 3 times to see the events appear on the dashboard

   * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758087918501/06cbd1ff-36db-4038-84ba-5c84fc2999fc.png" alt="" align="left" fullwidth="false" />

   * So we almost did what was required of us in this task.

***

> **Abdelwahab Ahmed Abdelwahab Mohamed**
>
> **15-09-2025**
>
> ***💬 "Control*** ***the code, and you control the world." 🔐 From wiping metadata to gaining root access — every step is documented and my goal is to deeply understand the system, not just hack!***
>
> [***Abdelwahab Shandy***](https://abdelwahabshandy.hashnode.dev/)
>
> [***Linkedin***](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)
>
> [***GitHub***](https://github.com/abdelwahab-ahmed-shandy)
>
> ***See You Soon***

