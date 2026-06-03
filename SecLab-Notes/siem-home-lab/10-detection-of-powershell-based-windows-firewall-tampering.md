
***

# 1️⃣ Environment Setup (Defense Side)

### A. Checking Winlogbeat

* I made sure the Winlogbeat service is running so logs are recorded:

```powershell
PS C:\Windows\system32> Get-Service winlogbeat

Status   Name               DisplayName
------   ----               -----------
Running  winlogbeat         winlogbeat
```

> This step is important so that any PowerShell or Sysmon operations are logged and reach Kibana.

***

### B. Enabling PowerShell Logging

* I enabled logging for all PowerShell commands, even obfuscated ones, by:

1. Opening `gpedit.msc` → `Computer Configuration → Administrative Templates → Windows Components → Windows PowerShell`

2. Enabled:

   * **Turn on PowerShell Script Block Logging**

   * **Turn on Module Logging** (Modules: `Microsoft.PowerShell.*`)

     <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760026215551/73ef350a-c672-4562-bde9-7af45e502a8f.png" align="center" fullwidth="false" />

> This way, any PowerShell commands, whether clear or obfuscated, will be logged at the system level.

1. Ran `gpupdate /force` to apply policies immediately:

```powershell
C:\Users\AAS-LOGS>gpupdate /force
Updating policy...
Computer Policy update has completed successfully.
User Policy update has completed successfully.
```

***

### C. Configuring Sysmon (Optional but Recommended)

* Sysmon was installed, and I modified a few things and configured a simplified config focusing on:

  * Monitoring PowerShell execution

  * Monitoring Run/RunOnce key changes

* **Example of config :**

```xml
<EventFiltering>
  <RuleGroup name="PowerShell and Run Keys" groupRelation="or">
    <ProcessCreate onmatch="include">
      <Image condition="is">C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe</Image>
      <CommandLine condition="contains">-enc</CommandLine>
    </ProcessCreate>
  </RuleGroup>
</EventFiltering>
```

* Then executed:

```powershell
.\Sysmon64.exe -i sysmonconfig.xml -accepteula

.\Sysmon64.exe -c sysmonconfig.xml
```

> * Ensured logging of any obfuscated PowerShell or persistence key modification.
>
> * This completes almost the **Defensive Setup** (Winlogbeat + PowerShell Logging + Sysmon).
>
>   * The next step is to enter the **Attack + Monitoring** phase to see everything recorded.

***

# 2️⃣ Attack Execution (Attack Simulation)

### A. Direct Command to Disable Firewall

* Ran PowerShell as Administrator and executed:

```powershell
PS C:\Windows\system32> Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False

PS C:\Windows\system32> Get-NetFirewallProfile | Format-Table Name, Enabled

Name    Enabled
----    -------
Domain    False
Private   False
Public    False
```

* Verified that the Firewall was disabled on all profiles.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760026176596/39f163da-3710-4c18-8ae2-2efd1fcfc4ea.png" align="center" fullwidth="false" />

### B. Converting Command to Obfuscated (Encoded)

1. Open PowerShell as Admin.

2. Ran "converted the command to Base64 to avoid direct detection" :

```powershell
$Command = 'Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False'
$Bytes = [System.Text.Encoding]::Unicode.GetBytes($Command)
$EncodedCommand = [Convert]::ToBase64String($Bytes)
Write-Output $EncodedCommand
```

3. This will output a **Base64 string**, for example:

* output:

```bash
PS C:\Windows\system32> $Command = 'Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False'
PS C:\Windows\system32> $Bytes = [System.Text.Encoding]::Unicode.GetBytes($Command)
PS C:\Windows\system32> $EncodedCommand = [Convert]::ToBase64String($Bytes)
PS C:\Windows\system32> Write-Output $EncodedCommand
UwBlAHQALQBOAGUAdABGAGkAcgBlAHcAYQBsAGwAUAByAG8AZgBpAGwAZQAgAC0AUAByAG8AZgBpAGwAZQAgAEQAbwBtAGEAaQBuACwAUAB1AGIAbABpAGMALABQAHIAaQB2AGEAdABlACAALQBFAG4AYQBiAGwAZQBkACAARgBhAGwAcwBlAA==
```

##### Final obfuscated command for execution:

```bash
powershell.exe -NoP -NonI -W Hidden -Enc UwBlAHQALQBOAGUAdABGAGkAcgBlAHcAYQBsAGwAUAByAG8AZgBpAGwAZQAgAC0AUAByAG8AZgBpAGwAZQAgAEQAbwBtAGEAaQBuACwAUAB1AGIAbABpAGMALABQAHIAaQB2AGEAdABlACAALQBFAG4AYQBiAGwAZQBkACAARgBhAGwAcwBlAA==
```

> Afterwards, PowerShell will execute, and the Firewall will be disabled.

##### 💡 **Option Explanation:**

* `-NoP` → No Profile (prevents loading user profile).

* `-NonI` → Non-Interactive (execute without interaction).

* `-W Hidden` → Hidden window.

* `-Enc` → Base64 Encoded Command.

> - The Event ID logged by PowerShell in the Operational Log is **4104** (Script Block Logging), where ScriptBlockText can be viewed.
>
> - This allows simulating a real attack on the system.

***

# 1️⃣ Verifying Logs are Recorded Locally

### A. Windows Event Viewer

* Open Event Viewer → `Applications and Services Logs → Microsoft → Windows → PowerShell → Operational`

* Noticed all commands are logged, even obfuscated ones.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760026142467/0637d872-33a7-4a01-9d60-3cafa17e4de8.png" align="center" fullwidth="false" />

* This means they are **PowerShell Script Block Logging events** → any PowerShell command (even obfuscated) is logged here.

### **Second: The Difference Between Both**

| Event      | ScriptBlockText                                                 | Notes                                                                                                                            |
| ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **First**  | `prompt`                                                        | This is a direct PowerShell command, **not obfuscated**. Just a simple command executed without Base64 or encryption.            |
| **Second** | `{ @('ByName', 'GetAll', 'InputObject (cdxml)') -contains $_ }` | This is a **complex/obfuscated PowerShell command** or internal Module/Script code, sometimes from executing an Encoded command. |

* **Simply:**

  * **First = Normal** → Clear command, understandable directly.

  * **Second = Obfuscated or Script/Module** → Indirect or complex content, sometimes appears with `-Enc` or obfuscated commands.

***

### B. Sysmon Logs

* Open Event Viewer → `Applications and Services Logs → Microsoft → Windows → Sysmon → Operational`

* Looked for Event ID 1 (ProcessCreate) for any PowerShell.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760026118871/c83672a4-c799-4051-acc9-4e110565fb9b.png" align="center" fullwidth="false" />

> CommandLine shows the encoded command, and ParentProcess, User, IntegrityLevel show the context.

***

# 4️⃣ Modifying Winlogbeat to Simplify Kibana Search

* Initially, I had issues; no matter how I searched, I couldn’t find logs, so I decided to modify the `winlogbeat.yml` settings.

##### A. Old Setup

* Initially, Winlogbeat was configured as follows:

```yaml
winlogbeat.event_logs:
  - name: Application
    ignore_older: 72h

  - name: System

  - name: Security

  - name: Microsoft-Windows-Sysmon/Operational

  - name: Windows PowerShell
    event_id: 400, 403, 600, 800

  - name: Microsoft-Windows-PowerShell/Operational
    event_id: 4103, 4104, 4105, 4106

  - name: ForwardedEvents
    tags: [forwarded]
```

> ❌ Issue: Some obfuscated commands were not showing.

##### 2️⃣ New Modification

* After modification, configuration became :

```yaml
winlogbeat.event_logs:
  - name: Application
    ignore_older: 72h

  - name: System

  - name: Security

  - name: Microsoft-Windows-Sysmon/Operational
    ignore_older: 168h

  - name: Windows PowerShell
    event_id: 400, 403, 600, 800, 4103, 4104, 4105, 4106

  - name: Microsoft-Windows-PowerShell/Operational
    event_id: 4103, 4104, 4105, 4106
    include_xml: true

  - name: ForwardedEvents
    tags: [forwarded]
```

> Added `include_xml: true` and events 4103-4106 to ensure all ScriptBlocks, obfuscated or encoded, appear.

* Why did we modify?

  1. Ensure **all PowerShell commands, even obfuscated and Base64 encoded, appear in Kibana**.

  2. Facilitate searching and analysis without losing important events.

  3. Reduce noise from old Sysmon or PowerShell data.

  4. Avoid KQL errors when searching for obfuscated commands.

## After editing the file:

```powershell
PS C:\Program Files\Winlogbeat> .\winlogbeat.exe test config
Config OK
PS C:\Program Files\Winlogbeat> .\winlogbeat.exe setup
Overwriting lifecycle policy is disabled. Set `setup.ilm.overwrite: true` to overwrite.
Index setup finished.
Loading dashboards (Kibana must be running and reachable)
Loaded dashboards
Loaded Ingest pipelines
PS C:\Program Files\Winlogbeat> Restart-Service winlogbeat
PS C:\Program Files\Winlogbeat> Get-Service winlogbeat

Status   Name               DisplayName
------   ----               -----------
Running  winlogbeat         winlogbeat
```

> As an update and confirmation for modifications in case of any issues, but everything was fine.

***

# **5️⃣ Searching in Kibana After Attack**

### B. Re-running the Attack to Generate Logs

* Now I will try to see logs in Kibana.

1. Open Kibana → **Discover**.

2. Select the **index pattern** linked to Winlogbeat (usually `winlogbeat-*`).

3. To filter sensitive commands (like disabling Firewall), add a filter on ScriptBlockText or CommandLine.

```bash
process.command_line:*Enc*
```

* output :

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760026080603/2dd12bce-296e-49d6-a5dc-5864dfc15822.png" align="center" fullwidth="false" />

> Now the logs are available and everything works fine.

* What we see in the log:

```powershell
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -NoP -NonI -W Hidden -Enc UwBlAHQALQBOAGUAdABGAGkAcgBlAHcAYQBsAGwAUAByAG8AZgBpAGwAZQAgAC0AUAByAG8AZgBpAGwAZQAgAEQAbwBtAGEAaQBuACwAUAB1AGIAbABpAGMALABQAHIAaQB2AGEAdABlACAALQBFAG4AYQBiAGwAZQBkACAARgBhAGwAcwBlAA==
```

> * `-NoP` → Do not load user profile.
>
> * `-NonI` → Non-interactive execution.
>
> * `-W Hidden` → Hidden window.
>
> * `-Enc` → Base64 encoded command.

***

# 6️⃣ Creating KQL Rule in Kibana Security

Now we want to create a rule to generate an alert in SIEM.

## 1️⃣ KQL Detection Rule :

```bash
winlog.event_data.ScriptBlockText:*Set-NetFirewallProfile* OR process.command_line:*-Enc*
```

**Explanation:**

* `winlog.event_data.ScriptBlockText:*Set-NetFirewallProfile*`\
  → Catches any direct or obfuscated PowerShell command targeting `Set-NetFirewallProfile`.

* `process.command_line:*"-Enc*"`\
  → Catches any Base64 encoded PowerShell command, any obfuscation attempt.

**Settings:**

| Field              | Value                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Name               | Detect PowerShell Encoded Commands for Firewall Modification                                |
| Description        | Detects PowerShell commands (clear or encoded) that disable Windows Firewall                |
| Severity           | Critical                                                                                    |
| Risk Score         | 99                                                                                          |
| Tags               | powershell, firewall, persistence, obfuscated, defense-evasion                              |
| Index Pattern      | winlogbeat-\*                                                                               |
| Custom Query (KQL) | `winlog.event_data.ScriptBlockText:*Set-NetFirewallProfile* OR process.command_line:*-Enc*` |
| Rule Type          | Query                                                                                       |
| Timeline Template  | None                                                                                        |
| Schedule           | Every 1 minute                                                                              |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760026044708/bb855b35-edd3-4352-bd85-7bd118c5d95f.png" align="center" fullwidth="false" />

> This way, any attempt to disable Firewall will generate an alert automatically.

* Went to the Windows machine, and executed the Attacks again:

Executed :

```powershell
$Command = 'Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False'
$Bytes = [System.Text.Encoding]::Unicode.GetBytes($Command)
$EncodedCommand = [Convert]::ToBase64String($Bytes)
Write-Output $EncodedCommand
```

Then:

```powershell
powershell.exe -NoP -NonI -W Hidden -Enc UwBlAHQALQBOAGUAdABGAGkAcgBlAHcAYQBsAGwAUAByAG8AZgBpAGwAZQAgAC0AUAByAG8AZgBpAGwAZQAgAEQAbwBtAGEAaQBuACwAUAB1AGIAbABpAGMALABQAHIAaQB2AGEAdABlACAALQBFAG4AYQBiAGwAZQBkACAARgBhAGwAcwBlAA==
```

* Firewall was successfully disabled after this. I repeated the commands multiple times to see alerts in SIEM:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760026024541/11091090-0481-4862-a8d0-f96dedf0414a.png" align="center" fullwidth="false" />

* Alerts appeared as follows :

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760026004475/d9a46d30-f09f-41cd-ac09-7f940683658f.png" align="center" fullwidth="false" />

***

# 7️⃣ Mapping the Rule to MITRE ATT\&CK

| Field         | Value                                         |
| ------------- | --------------------------------------------- |
| Tactic        | Defense Evasion                               |
| Technique     | Impair Defenses                               |
| Sub-technique | T1562.004 – Disable or Modify System Firewall |

> Goal: Map the attack to a specific MITRE tactic to facilitate documentation and security analysis:
>
> <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760025972308/95627e15-974d-4e31-81cf-b88cdc3214f6.png" align="center" fullwidth="false" />

***

## ✅ Summary

* Set up a strong defensive environment (Winlogbeat + PowerShell Logging + Sysmon).

* Conducted a test attack to disable Firewall, including obfuscated (Base64) commands.

* Verified all events are logged locally and in Kibana.

* Created a precise KQL rule detecting clear and encoded commands, linked to MITRE framework.

> **20-09-2025**

