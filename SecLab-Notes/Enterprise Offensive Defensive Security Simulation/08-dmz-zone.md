
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768752732887/653cba55-a1c0-450e-849c-e937231fba63.png" align="center" fullwidth="false" />

### 🟠 DMZ Zone Machines

| Machine                            | DMZ            | External      | Internal       |
| ---------------------------------- | -------------- | ------------- | -------------- |
| Vulnerable Windows(Metasploitable) | 172.16.100.50  | 172.16.10.50  | 172.16.200.50  |
| Vulnerable Webserver               | 172.16.100.60  | 172.16.10.60  | 172.16.200.60  |
| pfSense Firewall                   | 172.16.100.100 | 172.16.10.100 | 172.16.200.100 |
| Vulnerable Linux(Metasploitable)   | 172.16.100.55  | 172.16.10.55  | 172.16.200.55  |

### 🟠 DMZ Zone Machines

* Adapter 1: NAT

* Adapter 2: DMZ-Zone

* Adapter 3: External-Zone

* Adapter 4: Internal-Zone

* **Default Gateway :**

  * External Zone → `172.16.10.1`

  * DMZ Zone → `172.16.100.1`

  * Internal Zone → `172.16.200.1`

