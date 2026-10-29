
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769291509144/cab3e32f-7df2-412d-9179-ae1de2b195b4.png" alt="" align="center" fullwidth="true" />

# Scenario 1: Agent-based (Per-Host Collection) :

## Per-Host Collection

* ### **Use Case**

  **Full Visibility + High-Fidelity Telemetry**

  This scenario relies on installing an agent (**Winlogbeat**) on every Windows machine to collect logs and send them directly to the SIEM.

### Architecture Overview :

```bash
Windows Host
   │
   ▼
Winlogbeat
   │
   ▼
Elasticsearch
   │
   ▼
Kibana
```

> This is the simplest way to send logs from Winlogbeat

***

### **Why this architecture?**

**Per-Host Visibility:** Each machine independently collects its own logs.

**High Fidelity:** No data loss or over-aggregation occurs.

**Flexibility:** Easy to add custom logs (Sysmon / PowerShell / Custom Channels).

### 📦 Logs Included

| Log Type                        | Why Important                                 |
| ------------------------------- | --------------------------------------------- |
| Security / System / Application | Core Windows Telemetry                        |
| PowerShell Logs                 | Detect Scripted Attacks & Living-off-the-Land |
| Sysmon                          | Deep process, network, and file visibility    |

### 🕒 When to Use This Scenario?

✔ Small / Medium Environments\
✔ Labs & Detection Engineering\
✔ Purple Team / Blue Team Training\
❌ Large Environments (Centralized Collection preferred)

***

## ⚠️ Pre-Deployment Notes

### Take a Snapshot

> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769350766358/0a2a7ce3-7d6c-4e41-971d-22289b54ebd0.png" align="center" fullwidth="false" />
>
> **Why?**
>
> * Every scenario will change the system state (services, logs, policies).\
>   A **snapshot** allows you to easily revert to any stage without rebuilding from scratch.
>
> * After finishing the lab, I reverted to the previous state to start executing other scenarios.

***

### 🌐 Infrastructure Overview :

| Machine          | OS                             | IP               |
| ---------------- | ------------------------------ | ---------------- |
| Windows Endpoint | Windows 10 / 11 / Server / IIS | `172.16.200.215` |
| SIEM Server      | Ubuntu Server (ELK)            | `172.16.200.250` |

### 🔌 Connectivity Check :

#### From Windows to ELK :

```bash
C:\Users\vboxuser>ping 172.16.200.250

Pinging 172.16.200.250 with 32 bytes of data:
Reply from 172.16.200.250: bytes=32 time<1ms TTL=64
Reply from 172.16.200.250: bytes=32 time<1ms TTL=64
Reply from 172.16.200.250: bytes=32 time<1ms TTL=64
Reply from 172.16.200.250: bytes=32 time<1ms TTL=64

Ping statistics for 172.16.200.250:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms
```

✅ Success

### **Why this check?**

To ensure that:

* **Network routing** is correct

* **Firewall** isn’t blocking outbound traffic

* **Winlogbeat** can successfully send data

❗ **Note:** Reverse ping from ELK → Windows may fail due to Windows Firewall (this is expected behavior).

***

## First of all, do a check on Kibana and elasticsearch :

### Elasticsearch :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769350576292/d4acccac-5fda-4bde-baae-5e58bdddcef9.png" align="center" fullwidth="false" />

### Kibana :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769350644109/f05fd847-222e-478e-be9a-2d3c993fc0e0.png" align="center" fullwidth="false" />

> ✅ Kibana and Elasticsearch are ready to receive logs

***

## IN WIN Devices :

### **Sysmon Deployment**

**Why Sysmon?**

Default Windows logs are not sufficient to see:

* **Process creation details**

* **Command line arguments**

* **Network connections**

* **DLL loads**

* **File creation**

**Sysmon** fills this gap.

### Downloaded Sysmon from Microsoft:

[`https://learn.microsoft.com/sysinternals/downloads/sysmon`](https://learn.microsoft.com/sysinternals/downloads/sysmon) | <a target="_blank" href="https://learn.microsoft.com/sysinternals/downloads/sysmon">link</a>

Extract to: `C:\Sysmon`

### Sysmon Deployment :

* [`https://github.com/SwiftOnSecurity/sysmon-config`](https://github.com/SwiftOnSecurity/sysmon-config) | <a target="_blank" href="https://github.com/SwiftOnSecurity/sysmon-config">link</a>

**SwiftOnSecurity Config**

> Enterprise-grade baseline widely used in SOCs

```bash
C:\Sysmon\sysmonconfig.xml
```

### Install Sysmon :

```bash
cd C:\Sysmon
.\Sysmon64.exe -accepteula -i sysmonconfig-export.xml
|
|
# OUT :
PS C:\Sysmon> .\Sysmon64.exe -accepteula -i sysmonconfig-export.xml


System Monitor v15.15 - System activity monitor
By Mark Russinovich and Thomas Garnier
Copyright (C) 2014-2024 Microsoft Corporation
Using libxml2. libxml2 is Copyright (C) 1998-2012 Daniel Veillard. All Rights Reserved.
Sysinternals - www.sysinternals.com

Loading configuration file with schema version 4.50
Sysmon schema version: 4.90
Configuration file validated.
Sysmon64 installed.
SysmonDrv installed.
Starting SysmonDrv.
SysmonDrv started.
Starting Sysmon64..
Sysmon64 started.
PS C:\Sysmon>
```

* `-accepteula`: Automation friendly

* Custom config: Noise reduction + meaningful telemetry

**✅ Verification :** `Get-Service Sysmon64`

```powershell
PS C:\Sysmon> Get-Service Sysmon64

Status   Name               DisplayName
------   ----               -----------
Running  Sysmon64           Sysmon64
```

#### Event Log Path

* Event Viewer → Applications and Services Logs → Microsoft →Windows → Sysmon → Operational

***

## Deployment Winlogbeat :

### Why Winlogbeat?

* Native Windows Event Collector

* Optimized for Elasticsearch

* Supports Sysmon & PowerShell natively

#### **Edit the Configuration File :**

* Open PowerShell **as Administrator**, then edit the main configuration file :

```powershell
cd .\winlogbeat-9.2.3-windows-x86_64\
notepad winlogbeat.yml
```

### Configure Event Channels :

```bash
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

> ### Why these logs?
>
> * **Security**: Authentication, Privilege Escalation
>
> * **Sysmon**: Deep telemetry
>
> * **PowerShell**: Script-based attacks

### Kibana Configuration :

```bash
# =================================== Kibana ===================================

# Starting with Beats version 6.0.0, the dashboards are loaded via the Kibana API.
# This requires a Kibana endpoint configuration.
setup.kibana:

  # Kibana Host
  # Scheme and port can be left out and will be set to the default (http and 5601)
  # In case you specify and additional path, the scheme is required: http://localhost:5601/path
  # IPv6 addresses should always be defined as: https://[2001:db8::1]:5601
  host: "http://172.16.200.250:5601"

  # Kibana Space ID
  # ID of the Kibana Space into which the dashboards should be loaded. By default,
  # the Default Space will be used.
  #space.id:
```

> Why?
>
> * Required to:
>
>   * Load dashboards
>
>   * Load visualizations
>
>   * Setup index patterns automatically

### Elasticsearch Output :

```bash

# ================================== Outputs ===================================

# Configure what output to use when sending the data collected by the beat.

# ---------------------------- Elasticsearch Output ----------------------------
output.elasticsearch:
  # Array of hosts to connect to.
  hosts: ["https://172.16.200.250:9200"]
  ssl.verification_mode: none

  # Protocol - either `http` (default) or `https`.
  #protocol: "https"

  # Authentication credentials - either API key or username/password.
  #api_key: "id:api_key"
  username: "elastic"
  password: "k_NRVGxEGSMmTgVLYmIn"

  # Pipeline to route events to security, sysmon, or powershell pipelines.
  pipeline: "winlogbeat-%{[agent.version]}-routing"
```

> Why disable SSL verification (Lab only)?
>
> * Self-signed certificates
>
> * Faster lab setup
>
> * ❌ Not recommended in production

### Processors :

```bash
# ================================= Processors =================================
processors:
  - add_host_metadata: ~
  - add_process_metadata:
      match_pids: [process.pid]
  - add_observer_metadata: ~
```

> Why processors?
>
> * Enrich logs with:
>
>   * Host info
>
>   * Process context
>
>   * Observer metadata
>
> * Improves detection & correlation

***

## Install & Start Winlogbeat

```bash
.\install-service-winlogbeat.ps1
Start-Service winlogbeat
```

```bash

PS C:\winlogbeat-9.2.3-windows-x86_64> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

Execution Policy Change
The execution policy helps protect you from scripts that you do not trust. Changing the execution policy might
expose you to the security risks described in the about_Execution_Policies help topic at
https:/go.microsoft.com/fwlink/?LinkID=135170. Do you want to change the execution policy?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): y
PS C:\winlogbeat-9.2.3-windows-x86_64> .\install-service-winlogbeat.ps1

Status   Name               DisplayName
------   ----               -----------
Stopped  winlogbeat         winlogbeat


PS C:\winlogbeat-9.2.3-windows-x86_64> Start-Service winlogbeat
PS C:\winlogbeat-9.2.3-windows-x86_64> Get-Service winlogbeat

Status   Name               DisplayName
------   ----               -----------
Running  winlogbeat         winlogbeat


PS C:\winlogbeat-9.2.3-windows-x86_64>
```

> Why service mode?
>
> * Persistence
>
> * Auto-start after reboot
>
> * Production-like behavior

### Validation Steps :

Config Test : `.\winlogbeat.exe test config`

```bash
.\winlogbeat.exe test config
|
|
Config OK
```

Output Test : `.\winlogbeat.exe test output`

```bash
.\winlogbeat.exe test output
|
|

PS C:\winlogbeat-9.2.3-windows-x86_64> .\winlogbeat.exe test config
Config OK
PS C:\winlogbeat-9.2.3-windows-x86_64> .\winlogbeat.exe test output
elasticsearch: https://172.16.200.250:9200...
  parse url... OK
  connection...
    parse host... OK
    dns lookup... OK
    addresses: 172.16.200.250
    dial up... OK
  TLS...
    security... WARN server's certificate chain verification is disabled
    handshake... OK
    TLS version: TLSv1.3
    dial up... OK
  talk to server... OK
  version: 9.2.4
```

> ✔ Confirms:
>
> * Syntax correctness
>
> * Network connectivity
>
> * TLS handshake
>
> * Elasticsearch version compatibility

### Load Dashboards & Pipelines :

```bash
.\winlogbeat.exe setup -e
```

> ### What gets loaded?
>
> * Index Templates
>
> * Ingest Pipelines
>
> * Prebuilt Dashboards

All successfully verified with logs such as:

```bash
CopyKibana dashboards successfully loaded.
Loaded Ingest pipelines
```

### Kibana Verification :

in Windows :

```bash
PS C:\winlogbeat-9.2.3-windows-x86_64> HOSTNAME.EXE
WIN2-Internal
```

Steps

1. Open Kibana

2. Go to **Analytics → Discover**

3. Select `winlogbeat-*`

4. Filter by: [`host.name`](http://host.name)` : WIN2-Internal`

OR OPEN:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769352671614/a88e386f-89b2-4992-9fad-d21da95f259a.png" align="center" fullwidth="false" />

### ✅ Final Result

✔ Logs are flowing\
✔ Sysmon events indexed\
✔ PowerShell activity visible\
✔ High-fidelity telemetry achieved

***

> **✅Scenario 1 is complete**
>
> **Also, don't forget that many changes occur from time to time... therefore, the most important thing is to always refer back to the original documentation... never use AI at the beginning of your learning, not even when preparing labs like these or any lab; always refer to your notes or the original documentation.**

