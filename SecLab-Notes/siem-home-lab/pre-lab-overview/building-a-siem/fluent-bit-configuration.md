---
id: "68e1e6cace4bd20b5b8063e2"
title: "Fluent Bit Configuration"
description: "Fluent Bit acts as a lightweight and high-performance log processor and forwarder, designed to collect, parse, and ship logs from multiple sources to various destinations such as Elasticsearch, Logstash, or cloud-based monitoring platforms."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/siem-home-lab/pre-lab-overview/building-a-siem/fluent-bit-configuration"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
seoTitle: "SIEM Home LAB"
createdAt: "2025-10-05T03:32:26.788Z"
updatedAt: "2026-01-25T15:35:46.832Z"
---

In this step, we will configure Fluent Bit to:

* Collect and parse raw log files (e.g., Fortigate firewall logs).

* Apply a custom **Regex parser** to extract key fields such as source and destination IP addresses.

* Send the structured logs to **Elasticsearch** for centralized indexing and visualization in **Kibana**.

  > By the end of this section, Fluent Bit will serve as an efficient log shipper that integrates seamlessly with our SIEM, providing real-time insights and enhanced visibility into network and security activities.

***

> ### **2. LAB Scenario**
>
> The following scenario was required for the Fluent Bit configuration task:
>
> 1. **Regex Parser:**\
>    Write a Regex parser for the Fortigate log file, extracting at least 8 key fields (including *Source IP* and *Destination IP*).
>
> 2. **Log Indexing:**\
>    Send the parsed logs to the SIEM.\
>    Index name format:
>
>    ```bash
>    group#-firstname-lastname-fluentbit
>    ```
>
> 3. **Dashboard Creation:**\
>    Create a descriptive dashboard for the logs and visualize important fields. *(Bonus)*

***

1. ### **Navigating Fluent Bit Configuration Directory**

```bash
cd /etc/fluent-bit/

ls 
```

Output:

```bash
fluent-bit.conf  parsers.conf  plugins.conf
```

2. ### Sample Log File :

   Located at:

   ```bash
   /var/log/FortigateRegex_logs.log
   ```

   Sample content:

   ```bash
   date=2025-02-24 time=14:47:05 devname="FORTIGATE-02" devid="FGT90D4H56789012" logid="0210000000" type="utm" subtype="virus" eventtype="infected" level="critical" vd="root" policyid=18 sessionid=5632789 srcip=192.168.8.20 srcport=50123 dstip=103.143.230.162 dstport=80 srcintf="internal" dstintf="wan1" service="HTTP" hostname="suspicious-files.net" profile="AV-High-Security" direction="outgoing" virusname="Trojan.GenericKD.45321" action="blocked" msg="Malware detected and blocked"

   date=2025-02-24 time=15:10:33 devname="FORTIGATE-01" devid="FGT90D3G12345678" logid="0210000001" type="utm" subtype="virus" eventtype="infected" level="high" vd="root" policyid=22 sessionid=8745123 srcip=192.168.6.45 srcport=55122 dstip=188.168.12.14 dstport=443 srcintf="internal" dstintf="wan1" service="HTTPS" hostname="compromised-updates.com" profile="AV-Security" direction="outgoing" virusname="Backdoor.Win32.DarkKomet" action="blocked" msg="Malware download attempt prevented"

   date=2025-02-24 time=16:30:15 devname="FORTIGATE-01" devid="FGT90D3G12345678" logid="0210000004" type="utm" subtype="virus" eventtype="infected" level="high" vd="root" policyid=17 sessionid=6458392 srcip=192.168.1.35 srcport=50211 dstip=192.0.2.55 dstport=80 srcintf="internal" dstintf="wan1" service="HTTP" hostname="malicious-updates.net" profile="AV-Standard" direction="outgoing" virusname="Win.Trojan.Agent-9876" action="detected" msg="Malware detected but not blocked"

   date=2025-02-24 time=18:15:22 devname="FORTIGATE-04" devid="FGT1234567XYZ" logid="0210000008" type="utm" subtype="virus" eventtype="infected" level="critical" vd="root" policyid=19 sessionid=7856432 srcip=10.50.3.15 srcport=50987 dstip=218.78.132.164 dstport=80 srcintf="internal" dstintf="wan1" service="HTTP" hostname="officeupdates-fake.com" profile="AV-Enterprise" direction="outgoing" virusname="Trojan.Macro.Dropper" action="blocked" msg="Malicious macro detected in document"
   ```

   *(Four full log entries were used for testing, representing multiple Fortigate devices and malware detections.)*

***

2. ### **Creating the Regex Parser**

To test and build the regular expression, **Rubular** ([https://rubular.com) was used.\
The fin](https://rubular.com)al parser s[uccessfully extract](https://rubular.com)ed multiple fields including Date, Time, DeviceName, SourceIP, DestinationIP, Service, VirusName, and Action.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759687289222/ac9e70ae-b607-4e4c-b6dd-97d7529dfa4a.png" align="center" fullwidth="false" />

**Regex Parser Configuration :**

```bash
sudo nano /etc/fluent-bit/FortigateRegex.conf
```

```ini
[PARSER]
    Name FortigateRegex
    Format regex
    Regex date=(?<Date>\S+) time=(?<Time>\S+) devname="(?<DeviceName>[^"]+)" devid="(?<DeviceID>[^"]+)" logid="(?<LogID>\S+)" type="(?<LogType>\S+)" subtype="(?<Subtype>\S+)" eventtype="(?<EventType>\S+)" level="(?<SeverityLevel>\S+)" vd="(?<VirtualDomainUsed>\S+)" policyid=(?<PolicyIDHandledTraffic>\d+) sessionid=(?<SessionID>\d+) srcip=(?<SourceIP>\S+) srcport=(?<SourcePort>\d+) dstip=(?<DestinationIP>\S+) dstport=(?<DestinationPort>\d+) srcintf="(?<SourceInterface>[^"]+)" dstintf="(?<DestinationInterface>[^"]+)" service="(?<ServiceORProtocol>[^"]+)" hostname="(?<DomainNameAccessed>[^"]+)" profile="(?<AntivirusProfile>[^"]+)" direction="(?<Direction>\S+)" virusname="(?<VirusName>[^"]+)" action="(?<Action>[^"]+)" msg="(?<MSG>[^"]+)"
```

***

3. ### **Fluent Bit Main Configuration**

Edit the main configuration file:

```bash
sudo nano /etc/fluent-bit/fluent-bit.conf
```

```ini
# Parsers File
parsers_file /etc/fluent-bit/FortigateRegex.conf

[INPUT]
    Name tail
    Path /var/log/FortigateRegex_logs.log
    Parser FortigateRegex

[OUTPUT]
    Name es
    Match *
    Host 192.168.1.16
    Port 9200
    Index lab-abdelwahabshandy-fluentbit
    HTTP_User elastic
    HTTP_Passwd 3lSq=GCEWU1ygpW_cEkl
    Logstash_Format Off
    Suppress_Type_Name On
    TLS On
    TLS.Verify Off
```

***

4. ### **Running Fluent Bit**

```bash
cd /opt/fluent-bit/bin/
./fluent-bit -c /etc/fluent-bit/fluent-bit.conf
```

**Expected Output:**

```bash
Fluent Bit v4.1.0
* Copyright (C) 2015-2025 The Fluent Bit Authors
* Fluent Bit is a CNCF sub-project under the umbrella of Fluentd
* https://fluentbit.io

______ _                  _    ______ _ _             ___   __  
|  ___| |                | |   | ___ (_) |           /   | /  | 
| |_  | |_   _  ___ _ __ | |_  | |_/ /_| |_  __   __/ /| | `| | 
|  _| | | | | |/ _ \ '_ \| __| | ___ \ | __| \ \ / / /_| |  | | 
| |   | | |_| |  __/ | | | |_  | |_/ / | |_   \ V /\___  |__| |_
\_|   |_|\__,_|\___|_| |_|\__| \____/|_|\__|   \_/     |_(_)___/


[2025/10/05 21:24:12.245058920] [ info] [fluent bit] version=4.1.0, commit=, pid=16180
[2025/10/05 21:24:12.246568500] [ info] [storage] ver=1.5.3, type=memory, sync=normal, checksum=off, max_chunks_up=128
[2025/10/05 21:24:12.246585491] [ info] [simd    ] SSE2
[2025/10/05 21:24:12.246589051] [ info] [cmetrics] version=1.0.5
[2025/10/05 21:24:12.246591140] [ info] [ctraces ] version=0.6.6
[2025/10/05 21:24:12.247832913] [ info] [input:tail:tail.0] initializing
[2025/10/05 21:24:12.247843555] [ info] [input:tail:tail.0] storage_strategy='memory' (memory only)
[2025/10/05 21:24:12.294324657] [ info] [sp] stream processor started
[2025/10/05 21:24:12.295115470] [ info] [output:es:es.0] worker #0 started
[2025/10/05 21:24:12.295230245] [ info] [output:es:es.0] worker #1 started
[2025/10/05 21:24:12.295833313] [ info] [engine] Shutdown Grace Period=5, Shutdown Input Grace Period=2
```

***

5. ### **Verify Log Ingestion in ELK**

**Steps:**

1. Go to **Stack Management → Index Management → Indices**

   <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759689139714/52501964-80bf-4229-9520-1e94f7f4fdbf.png" align="center" fullwidth="false" />

   * Found index: `lab-abdelwahabshandy-fluentbit`

2. Create a **Data View**:

   * **Name:** LAB-AS-Fluentbit

   * **Index pattern:** lab-abdelwahabshandy-fluentbit

   * **Timestamp field:** @timestamp

   * **Save Data View to Kibana**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759701203339/5747a802-65be-4467-98a6-f802ec659fbb.png" align="center" fullwidth="false" />

***

6. ### **Dashboard Creation**

Go to:

```bash
Analytics → Visualize Library → Lens
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759701285772/140b8004-7dec-4f70-862b-e9c18abf3a31.png" align="center" fullwidth="false" />

**I created this part quickly at the time, but I will focus on the dashboards elsewhere :**

1. **Top Source & Destination IPs**

   * Displays most active source and destination IPs involved in virus detection logs.

2. **Virus Names by Device**

   * Shows which devices detected specific malware types, providing quick visibility into infection trends.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759702214962/abdb2752-635d-48a6-98b2-f83ab9958e8a.png" align="center" fullwidth="false" />

***

> ### So you have finished the second part of the exam with some detailed explanation.

