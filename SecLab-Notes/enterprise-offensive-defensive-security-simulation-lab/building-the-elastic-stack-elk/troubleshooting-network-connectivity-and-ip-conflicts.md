
## 1. The “NAT IP” Trap (The Problem)

When installing the SIEM, you may notice an IP address such as **10.0.2.15**. This is a **local NAT IP** assigned by VirtualBox and is used **only for internet access**.

**Symptoms:**\
You can access the SIEM dashboard from the SIEM machine itself, but when attempting to connect the **Domain Controller** or **Kali Linux** to the SIEM, you encounter errors such as:

* `Connection Refused`

* `No route to host`

**Root Cause:**\
The **10.0.2.15** address is **not reachable** by other lab machines. It is isolated within the NAT network.

***

## 2. The Solution: Use the Static Management IP

To ensure proper inter-machine communication, you must always use the **Internal IP** defined in the IP schema.

**Rule of Thumb:**

> **Always use** `172.16.200.250` for any inter-lab communication (Logs, Beats, SOAR).

***

## 3. How to Fix the “SIEM Unreachable” Error

If you face issues connecting any target machine to the SIEM, follow these steps **in order**:

### Step 1: Basic Connectivity Test

From the machine you want to connect (e.g., the Domain Controller), open **PowerShell** or a **Terminal** and run:

```bash
ping 172.16.200.250
```

If there is **no response**, verify that:

* The **second adapter** on both the SIEM and the DC

* Is connected to the **same Internal Network name** in VirtualBox

***

### Step 2: Port Connectivity Test

Elasticsearch requires **port 9200**, and Kibana requires **port 5601**.\
Test connectivity from an external machine:

```powershell
# Windows (PowerShell)
Test-NetConnection -ComputerName 172.16.200.250 -Port 9200
```

If the test fails, ensure that the **Linux firewall on the SIEM** allows these ports:

```bash
sudo ufw allow 9200/tcp
sudo ufw allow 5601/tcp
```

***

### Step 3: Configuration Files (Bind Address)

Ensure the SIEM services are **listening on all interfaces**, not only the NAT adapter.

Confirm the following settings:

* **elasticsearch.yml**

  ```yaml
  network.host: 0.0.0.0
  ```

* **kibana.yml**

  ```yaml
  server.host: "0.0.0.0"
  ```

***

## 4. Important Note About Enrollment Tokens

If the SIEM generates an **Enrollment Token** using the incorrect NAT IP (e.g., `10.0.2.15`), you can safely ignore the generated link.

Manually access Kibana using the correct internal address:

```bash
https://172.16.200.250:5601
```

Then enter the enrollment token manually. Kibana will automatically discover Elasticsearch over the **internal network**.

***

✅ Following these steps ensures stable and correct SIEM connectivity across the entire lab environment.

