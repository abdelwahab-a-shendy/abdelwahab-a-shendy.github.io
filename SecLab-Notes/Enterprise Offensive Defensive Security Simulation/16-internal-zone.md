
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768752600007/cb5795bc-01b4-40f9-aca6-4c4b9a19fe48.png" align="center" fullwidth="false" />

### 🔵 Internal Zone Machines

| Machine           | Internal       | DMZ            | External      |
| ----------------- | -------------- | -------------- | ------------- |
| Domain Controller | 172.16.200.201 | 172.16.100.201 | 172.16.10.201 |
| IIS Server        | 172.16.200.202 | 172.16.100.202 | 172.16.10.202 |
| Client1           | 172.16.200.210 | 172.16.100.210 | 172.16.10.210 |
| Client2           | 172.16.200.220 | 172.16.100.220 | 172.16.10.220 |

### 🔵 Internal Zone Machines

* Adapter 1: NAT (Actually used only by the Domain Controller)

* Adapter 2: Internal-Zone

* Adapter 3: DMZ-Zone

* Adapter 4: External-Zone

* **Default Gateway**

  * External Zone → `172.16.10.1`

  * DMZ Zone → `172.16.100.1`

  * Internal Zone → `172.16.200.1`

