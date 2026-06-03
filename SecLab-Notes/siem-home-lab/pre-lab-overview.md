
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759623679308/2b30993e-eac9-443b-adb9-ba8df865c98b.png" align="center" fullwidth="false" />

### **Pre-Lab Overview**

| VM Name            | Purpose / Role                 | Services / Tools                                            |
| ------------------ | ------------------------------ | ----------------------------------------------------------- |
| **LAB-ELK-N8N**    | ELK Stack Server & SOAR        | Elasticsearch, Kibana, Logstash (optional), n8n             |
| **LAB-FLUENTBIT**  | Log Collector                  | Fluent Bit (collect & forward logs to ELK)                  |
| **LAB-WIN-SERVER** | Windows Server / Log Generator | Winlogbeat (send Windows logs to ELK), Local Audit Policies |

### Key Notes Before Starting

##### **Networking:**

* All VMs must be on the same virtual network to ensure seamless communication between them.

**Hostname & Naming Conventions:**

* Windows Server hostname: AS-Device\_Name (This is important for the lab requirements).

**Installation Order:**

* First: Install ELK Stack + n8n on LAB-ELK-SIEM-N8N

* Second: Install Fluent Bit on LAB-FLUENTBIT

* Third: Install Windows Server + Winlogbeat on LAB-WIN-SERVER

