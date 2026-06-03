
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768746412314/abd395ac-3196-4a68-9ed1-886763866c69.png" alt="" align="center" fullwidth="true" />

## Network Design & Adapter Configuration

### 1. Virtual Network Interfaces (VNIs)

For each machine in the lab, dedicated **network adapters** are assigned to act as gateways between different network zones. A key design decision is the use of a **NAT Network** instead of a **Bridged Adapter** to ensure complete isolation from the physical host network.

#### Network Segments Table

| Network Name  | Subnet Range    | DHCP Status | Purpose                                            |
| ------------- | --------------- | ----------- | -------------------------------------------------- |
| NAT           | 10.0.2.0/24     | Enabled     | Provides safe internet access and system updates   |
| External-Zone | 172.16.10.0/24  | Disabled    | Attacker machines and public entry points          |
| DMZ-Zone      | 172.16.100.0/24 | Disabled    | Isolated servers (Web, Mail, Honeypots)            |
| Internal-Zone | 172.16.200.0/24 | DC Managed  | Corporate assets (Domain Controller, Clients, IIS) |

***

### 2. Adapter Allocation Strategy

To achieve flexibility for both **attack and defense scenarios (Red/Blue Teaming)**, network adapters are distributed as follows:

#### A. Gateway / Firewall (pfSense)

Acts as the central **traffic controller** between all zones:

* **Adapter 1:** NAT ( Internet access)

* **Adapter 2:** Internal Network (External-Zone)

* **Adapter 3:** Internal Network (DMZ-Zone)

* **Adapter 4:** Internal Network (Internal-Zone)

#### B. Target & Attack Machines (Kali, Windows Clients, Servers)

Each machine in these zones is configured with **three network adapters (Multi-Homed)** to allow controlled bypassing and direct access, as defined in the Demo Lab design:

* **Adapter 1:** NAT (for updates and internet access)

* **Adapter 2:** Primary zone of the machine (e.g., Internal-Zone)

* **Adapter 3:** Secondary communication zone (e.g., DMZ-Zone)

***

### 3. IP Addressing Schema (Static Configuration)

Since DHCP is not used (except in the Internal Zone, where it is managed by the Domain Controller), IP addressing is standardized to simplify memorization and documentation.

**Naming Rule:**\
The last octet of the IP address (Octet 4) remains constant for the same machine across all zones.

| Machine     | IP (External) | IP (DMZ)       | IP (Internal)  |
| ----------- | ------------- | -------------- | -------------- |
| Kali Linux  | 172.16.10.10  | 172.16.100.10  | 172.16.200.10  |
| Windows DC  | 172.16.10.201 | 172.16.100.201 | 172.16.200.201 |
| SIEM Server | –             | 172.16.100.250 | 172.16.200.250 |

