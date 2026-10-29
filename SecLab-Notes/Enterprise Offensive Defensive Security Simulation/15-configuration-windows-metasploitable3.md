
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768813750281/ff264110-b47c-45ee-9b3f-42ae59d74863.png" alt="" align="center" fullwidth="true" />

## Network Design & Configuration :

| Machine                            | DMZ           | External     | Internal      |
| ---------------------------------- | ------------- | ------------ | ------------- |
| Vulnerable Windows(Metasploitable) | 172.16.100.50 | 172.16.10.50 | 172.16.200.50 |

### 🟠 DMZ Zone Machines

* Adapter 1: NAT

* Adapter 2: DMZ-Zone

* Adapter 3: External-Zone

* Adapter 4: Internal-Zone

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768645257525/065a7df3-77d1-44c3-ac25-a73cc1ff3087.png" alt="" align="center" fullwidth="true" />

***

## Set Static IP Configuration :

open Start => Control Panal :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768678008036/f1af350d-61a5-40af-aed4-1b6286706675.png" alt="" align="center" fullwidth="true" />

> Select Network and Sharing Center

* And `Change adapter settings` :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768678433613/f20724d9-6e32-4b02-9b14-0774a15158a5.png" alt="" align="center" fullwidth="true" />

And `Use the following IP Address` :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768678558500/fc3f7a2d-38e7-41ec-9d9b-2adcb6cb7e65.png" alt="" align="center" fullwidth="true" />

| Machine                            | DMZ           | External      | Internal      |
| ---------------------------------- | ------------- | ------------- | ------------- |
| Vulnerable Windows(Metasploitable) | 172.16.100.50 | 172.16.10.50  | 172.16.200.50 |
| Subnet mask                        | 255.255.255.0 | 255.255.255.0 | 255.255.255.0 |

***

> ✅ Windows Metasploit3 Is DONE

