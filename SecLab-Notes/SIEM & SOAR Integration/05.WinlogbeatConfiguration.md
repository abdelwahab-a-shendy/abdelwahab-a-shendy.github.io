
> Winlogbeat acts as a lightweight log shipper developed by Elastic, designed specifically to collect and send Windows event logs to Elasticsearch or Logstash for centralized monitoring and analysis.
>
> Throughout this step, we will:
>
> Configure Winlogbeat to collect security and system events.
>
> Set up the connection between Winlogbeat and the ELK server.
>
> Test and verify that the logs are successfully reaching Elasticsearch.
>
> By the end of this section, our Windows Server will be fully integrated with the SIEM, enabling real-time visibility of system activities and security events directly in Kibana dashboards.

***

### 🧩 **Step 1 – Configuring Winlogbeat**

In this section, we configured **Winlogbeat** on the Windows Server machine (`LAB-WIN-SERVER`) to collect event logs and forward them to the **SIEM (ELK Stack)** hosted on `LAB-ELK-N8N`.

**Before doing anything else, I’ll make sure that the Windows Server can connect to our SIEM system :**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759630999256/c27ea009-593f-4445-aaf2-eec5e6035244.png" alt="" align="center" fullwidth="true" />

### **Step 1 – Edit the Configuration File**

Open PowerShell **as Administrator**, then edit the main configuration file:

```powershell
notepad "C:\Program Files\Winlogbeat\winlogbeat.yml"
```

Under the `winlogbeat.event_logs:` section, define the main Windows event channels to monitor:

```powershell
# =============== Winlogbeat specific options =========
winlogbeat.event_logs:
  - name: Application
    ignore_older: 72h

  - name: System
    ignore_older: 72h

  - name: Security
    ignore_older: 72h

  - name: Microsoft-Windows-Sysmon/Operational

  - name: Windows PowerShell
    event_id: 400, 403, 600, 800

  - name: Microsoft-Windows-PowerShell/Operational
    event_id: 4103, 4104, 4105, 4106

  - name: ForwardedEvents
    tags: [forwarded]
```

### **Step 2 – Configure Kibana and Elasticsearch Output**

**Under the Kibana section:**

```powershell
 # =================== Kibana ==================

# Starting with Beats version 6.0.0, the dashboards are loaded via the Kibana API.
# This requires a Kibana endpoint configuration.
setup.kibana:

  # Kibana Host
  # Scheme and port can be left out and will be set to the default (http and 5601)
  # In case you specify and additional path, the scheme is required: http://localhost:5601/path
  # IPv6 addresses should always be defined as: https://[2001:db8::1]:5601
  host: "http://192.168.1.16:5601"
  #ssl.verification_mode: none

  # Kibana Space ID
  # ID of the Kibana Space into which the dashboards should be loaded. By default,
  # the Default Space will be used.
  #space.id:
```

> If it’s using **HTTPS**, I’ll remove the **comment (#)** from the **SSL** section in the configuration file.

**Under the Elasticsearch output and** Add template settings **:**

```powershell
# ================================== Outputs ===================================

# Configure what output to use when sending the data collected by the beat.

  setup.template.enabled: true
  setup.template.name: "as-win-abdelwahab-shandy-winlogbeat"
  setup.template.pattern: "as-win-abdelwahab-shandy-winlogbeat-*"

  setup.ilm.enabled: false
  winlogbeat.index: "as-win-abdelwahab-shandy-winlogbeat-%{+yyyy.MM.dd}"


# ---------------------------- Elasticsearch Output ----------------------------
output.elasticsearch:
  # Array of hosts to connect to.
  hosts: ["https://192.168.1.16:9200"]
  ssl.verification_mode: none

  # Protocol - either `http` (default) or `https`.
  #protocol: "https"

  # Authentication credentials - either API key or username/password.
  #api_key: "id:api_key"
  username: "elastic"
  password: "3lSq=GCEWU1ygpW_cEkl"

  # Pipeline to route events to security, sysmon, or powershell pipelines.
  # pipeline: "winlogbeat-%{[agent.version]}-routing"
```

### **Step 3 – Install and Start the Winlogbeat Service**

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

.\install-service-winlogbeat.ps1

Start-Service winlogbeat
```

Then confirm the service status:

```bash
Get-Service winlogbeat
```

### **Step 4 – Test Configuration and Connectivity**

Validate syntax:

```powershell
.\winlogbeat.exe test config
|
|
Config OK
```

✅ Output: `Config OK`

Check Elasticsearch connection:

```powershell
.\winlogbeat.exe test output
|
|
elasticsearch: https://192.168.1.16:9200...
  parse url... OK
  connection...
    parse host... OK
    dns lookup... OK
    addresses: 192.168.1.16
    dial up... OK
  TLS...
    security... WARN server's certificate chain verification is disabled
    handshake... OK
    TLS version: TLSv1.3
    dial up... OK
  talk to server... OK
  version: 9.1.4
```

✅ Output: Successful connection (TLSv1.3)

### **Step 5 – Load Dashboards and Pipelines**

```powershell
.\winlogbeat.exe setup -e
```

🟢 This automatically loads:

* Index templates

* Ingest pipelines

* Default Winlogbeat dashboards

All successfully verified with logs such as:

```powershell
Kibana dashboards successfully loaded.
Loaded Ingest pipelines
```

***

## 📊 **Verifying Logs in Kibana**

After completing the configuration of **Winlogbeat** and starting the service, the next step is to verify that logs are being received and indexed correctly in the **ELK Stack**.

### **Step 1 – Access Kibana**

Open your browser and navigate to:

```powershell
https://192.168.1.16:5601 # OR Your IP 
```

Log in using your Elasticsearch credentials:

* **Username:** elastic

* **Password:** (your password from installation)

**After that, go to Analytics → Discover And Simpal Search:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759634500153/3048ce98-02da-4ded-ac9d-e2955c592868.png" alt="" align="center" fullwidth="true" />

Our machine’s name is already set to:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759634603109/07b70781-f176-400a-b748-aed5ebbd5687.png" alt="" align="center" fullwidth="true" />

***

### **Here, I’ve already completed the first part of the final WE INNOVATE test. The configuration is exactly the same as before — the only issue I encountered last time was that I wrote the index name in capital letters, which caused a problem. I corrected it by changing it back to lowercase.**

### **Other than that, I haven’t changed anything in the configuration.**

