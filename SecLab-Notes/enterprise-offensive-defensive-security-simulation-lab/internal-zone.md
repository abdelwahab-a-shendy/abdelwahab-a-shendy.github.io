---
id: "696bd7e97709922a918e3514"
title: "Building Internal Zone"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/enterprise-offensive-defensive-security-simulation-lab/internal-zone"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2026-01-17T18:41:45.574Z"
updatedAt: "2026-01-25T15:35:46.801Z"
---

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

