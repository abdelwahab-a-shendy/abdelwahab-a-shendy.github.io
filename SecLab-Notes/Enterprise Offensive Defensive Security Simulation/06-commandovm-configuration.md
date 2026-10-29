
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768812944397/12c4f830-4086-4a09-ae95-bc71324c149a.png" align="center" fullwidth="false" />

## Configuration Network Manual :

| Machine    | External     | DMZ           | Internal      |
| ---------- | ------------ | ------------- | ------------- |
| Kali Linux | 172.16.10.20 | 172.16.100.20 | 172.16.200.20 |

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768753515387/241092e0-cbba-4766-9589-592e443def02.png" alt="" align="center" fullwidth="true" />

* Adapter 1: NAT

* Adapter 2: External-Zone

* Adapter 3: DMZ-Zone

* Adapter 4: Internal-Zone

- **Default Gateway**

  * External Zone → `172.16.10.1`

***

## Set Static IP Configuration :

open Start => Control Panal : ***Select Network and Sharing Center :***

* And `Change adapter settings` :

* Adapter 2 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768756071163/c2d04deb-3fca-40ec-aaf7-3fac372f3831.png" alt="" align="center" fullwidth="true" />

And `Use the following IP Address` :

| Machine     | DMZ           | External      | Internal      |
| ----------- | ------------- | ------------- | ------------- |
| CommandoVM  | 172.16.10.20  | 172.16.100.20 | 172.16.200.20 |
| Subnet mask | 255.255.255.0 | 255.255.255.0 | 255.255.255.0 |

### ⚠️ Troubleshooting: Multiple Default Gateways Warning

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768756421271/dfed1c02-dde6-4c14-bde9-bb3d2cfe4706.png" alt="" align="center" fullwidth="true" />

**Problem:** Windows displays a warning when assigning a Gateway to multiple network adapters.

**Impact:** Routing instability, loss of internet connection, and inability to reach the SIEM.

**Fix:**

1\. Identify the primary gateway (usually the NAT adapter or pfSense).

2\. For all other adapters (Internal/DMZ/External), leave the **Default Gateway field BLANK**.

3\. Windows will automatically use the correct interface for local traffic (172.16.x.x) based on the Subnet Mask.

* Adapter 3 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768757083350/335be9d1-8754-4e94-911d-b244d18bf779.png" alt="" align="center" fullwidth="true" />

And Adapter 4 :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768757106264/7f5e0150-6206-4f07-af4b-1d2de0d2ea84.png" alt="" align="center" fullwidth="true" />

> done network confg

***

### We Can test connection between CommandoVM And Kali :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768757695953/27b45e38-01d7-419a-afda-a82ede084fdd.png" alt="" align="center" fullwidth="true" />

> * You can ping from CommandoVM to Kali, but the reverse will be blocked by the firewall. If you want to do this, you can disable the firewall.
>
> - Configuration is Done :
>
>   * complit install : [Running CommandoVM](https://hashnode.com/docs/687e32493aa4a0e5086a2992/guide/687e324a100405ceff21607b/version/687e324a100405ceff21607c/page/696d1b06465c047f681510e8)

