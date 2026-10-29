
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769180377556/72d0f8f1-617c-491a-b9a1-4129d3b260e8.png" alt="" align="center" fullwidth="true" />

## Scenario 1: Agent-based (Per-Host Collection) :

* **Use Case:** Full Visibility + Flexibility

* **Architecture:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1769291509144/cab3e32f-7df2-412d-9179-ae1de2b195b4.png" alt="" align="center" fullwidth="false" />

**Includes:**

* Security / System / Application

* PowerShell Logs

* Sysmon

**When to use:**

* Small / Medium Environments

* Requires Custom parsing

* High-fidelity telemetry

***

## 🟦 Scenario 2: Centralized Windows Event Forwarding (WEF) :

**Use Case:** Native + Low footprint\
**Architecture:**

`Windows Hosts → WEF Collector → Logstash → Elasticsearch → Kibana`

**Variants:**

* Source-Initiated

* Collector-Initiated

**When to use:**

* Domain environments

* Reduce agents

* Compliance-heavy setups

***

## 🟦 Scenario 3: Hybrid Windows Collection

**Use Case:** Defense-in-depth\
**Architecture:**

* `Critical servers → Winlogbeat → Elasticsearch → Kibana`

* `Workstations → WEF → Elasticsearch → Kibana`

**Why this matters:**

* Performance

* Cost

* Risk-based logging

