
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768814848370/2926b62f-2715-4fe0-aa2d-979bb14e1c5b.png" alt="" align="center" fullwidth="true" />

## Network Design & Configuration :

| Machine              | DMZ              | External        | Internal         |
| -------------------- | ---------------- | --------------- | ---------------- |
| Vulnerable Webserver | 172.16.100.60/24 | 172.16.10.60/24 | 172.16.200.60/24 |

### 🟠 DMZ Zone Machines

* Adapter 1: NAT

* Adapter 2: DMZ-Zone

* Adapter 3: External-Zone

* Adapter 4: Internal-Zone

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768728625149/4e6e1bf7-1c8f-4d4e-ac8a-c86c81bcd90f.png" alt="" align="center" fullwidth="true" />

> And Complite Install Vm

***

We'll go to the network settings on the machine.

We'll start by disconnecting the network cards and then reconnecting them, and so on, to ensure they're working in the correct order :

* Adapter 1: NAT : Done , don’t change

* Adapter 2: DMZ-Zone :

  * Manual :

    * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768730393373/d4817d32-abf0-4e78-aa33-ca4689173fc1.png" alt="" align="center" fullwidth="true" />

* Adapter 3: External-Zone

  * Manual :

    * Addresses And Mask : 172.16.10.60/24

    * GetWay : 172.16.10.1

* Adapter 4: Internal-Zone

  * Manual :

    * Addresses And Mask : 172.16.200.60/24

    * GetWay : 172.16.200.1

    * DNS : 8.8.8.8 (you can not set that , But in the future, as things begin to be implemented, we will need internet access, so we need to prepare it now. )

***

> Running WebServer (bWAPP) → DONE
>
> Complete the settings here :
>
> * [Configuration WebServer (bWAPP)](https://hashnode.com/docs/687e32493aa4a0e5086a2992/guide/687e324a100405ceff21607b/version/687e324a100405ceff21607c/page/696dfa852e0cda4e75ab9b1b)

