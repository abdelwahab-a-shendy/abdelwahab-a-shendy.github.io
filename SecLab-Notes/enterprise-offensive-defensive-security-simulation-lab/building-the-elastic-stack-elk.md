---
id: "696ba32ccb3a24366d5c082a"
title: "Building ELK (SIEM)"
description: "Building the Elastic Stack (ELK):\nI will set up the Siem and prepare it to receive logs from the devices. "
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/enterprise-offensive-defensive-security-simulation-lab/building-the-elastic-stack-elk"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2026-01-17T14:56:44.825Z"
updatedAt: "2026-01-25T15:35:46.720Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768813207543/f53080df-270a-4efc-844d-d73161975c52.png" alt="" align="center" fullwidth="true" />

> After I get up and use Linux, I will never be able to start now

I wrote all of this before and published it here as well | [LINK](https://sec-lab-notes.hashnode.space/abdelwahabshandy-notes/siem-home-lab/pre-lab-overview)

## SIEM Network Assignment :

Since the **SIEM** needs to communicate with all **zones** to collect logs and telemetry, it is recommended to place it in the **Internal (Management) Zone** with broad access permissions, or to dedicate a **separate zone specifically for SIEM**.

### 🖥️ SIEM Server (ELK) – Network Placement

| Machine           | Internal (Mgmt) | DMZ            | External      |
| ----------------- | --------------- | -------------- | ------------- |
| SIEM Server (ELK) | 172.16.200.250  | 172.16.100.250 | 172.16.10.250 |

### 🌐 Network Adapters Configuration

* **Adapter 1: NAT**\
  **Purpose:** Updates only

* **Adapter 2: Internal-Zone**

* **Adapter 3: DMZ-Zone**

* **Adapter 4: External-Zone**

### Network Settings

* **Netmask:** /24

* **DNS:** Domain Controller or `8.8.8.8`

* **Default Gateway:** According to each zone

📌 This setup allows the **SIEM** to receive logs from all zones **without complex routing or additional network configuration**.

***

## Activate the VirtualBox tools on this virtual machine :

* On Debian/Ubuntu distributions:

```sh
sudo apt update 
sudo apt install build-essential dkms linux-headers-$(uname -r)
```

1. From VirtualBox: `Devices → Insert Guest Additions CD image`

2. In the Linux terminal:

```sh
sudo mount /dev/cdrom /mnt 
sudo /mnt/VBoxLinuxAdditions.run
```

3. After installation is complete, **reboot** the machine:

```sh
sudo reboot
```

4. Enable **Shared Clipboard** and **Drag & Drop**:

   * Devices → Shared Clipboard → Bidirectional

   * Devices → Drag & Drop → Bidirectional

***

## Install Elasticsearch, Kibana, and Logstash (ELK Stack) in SIEM Server :

#### **Official Reference:**

[Install Elasticsearch with Debian Package](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-with-debian-package)

[**Install Kibana with Debian package**](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-kibana-with-debian-package)

#### **Step 1: Switch to Root and Update System :**

```bash
sudo apt update
```

#### **Step 2: Add Elasticsearch GPG Key and Repository :**

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-9.x.list
```

#### **Step 3: Install Dependencies :**

```bash
sudo apt-get install apt-transport-https -y
sudo apt update
```

#### **Step 4: Install Elasticsearch :**

```bash
sudo apt-get install elasticsearch -y
```

📌 **During installation**, Elasticsearch will automatically:

* Create `elasticsearch` user and group.

* Enable **security auto-configuration** (authentication + TLS).

* Generate a **password** for the built-in `elastic` superuser, for example:

  ```bash
  The generated password for the elastic built-in superuser is : k_NRVGxEGSMmTgVLYmIn
  ```

##### **Important Commands after Installation :**

```bash
sudo systemctl daemon-reload

sudo systemctl enable elasticsearch.service

sudo systemctl start elasticsearch.service
```

> ✅ Verify status (**elasticsearch**):

```bash
sudo systemctl status elasticsearch
|
|
● elasticsearch.service - Elasticsearch
     Loaded: loaded (/usr/lib/systemd/system/elasticsearch.service; enabled; pr>
     Active: active (running) since Sat 2026-01-17 17:35:29 EET; 16s ago
       Docs: https://www.elastic.co
```

#### **Step 5: Install Kibana and Logstash**

```bash
sudo apt-get install kibana logstash -y

sudo systemctl enable kibana.service 

sudo systemctl start kibana.service 
```

> ✅ Verify status (**Kibana**) :

```sh
sudo systemctl status kibana.service
|
|
● kibana.service - Kibana
     Loaded: loaded (/usr/lib/systemd/system/kibana.service; enabled; preset: e>
     Active: active (running) since Sat 2026-01-17 17:50:59 EET; 41min ago
       Docs: https://www.elastic.co
```

During the installation, the following will be done:

* A **dedicated user and service** for **Kibana** will be created.

* A **Kibana Keystore file** will be set up to store sensitive values.

* **Logstash** will be configured to process logs in the future.

#### **Step 6: Install curl (to test Elasticsearch connection) :**

```bash
sudo apt-get install curl -y
```

***

## **Configure Elasticsearch :**

After installing Elasticsearch, the next step is to configure it to make it accessible from your local network.

#### **Open the configuration file:**

```sh
sudo nano /etc/elasticsearch/elasticsearch.yml
```

#### **2️⃣ Edit the following lines:**

```ruby
# Network interface:
network.host: 0.0.0.0

# Un-comment and set the port:
http.port: 9200
```

> Then **Save and Exit**.

#### 3️⃣ Check your IP address :

```ruby
ip a
```

Example output:

```sh
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:20:29:eb brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic noprefixroute enp0s3
```

> In this case, the server IP is 10.0.2.15

#### 4️⃣ Test Elasticsearch in your browser:

Open the following link: 🔗 [`https://10.0.2.15:9200/`](https://192.168.56.103:9200/) OR [`https://172.16.200.250:9200/`](https://172.16.200.250:9200/)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768669155146/1d3130dd-7eba-4276-a6a6-941a02fde5c4.png" alt="" align="center" fullwidth="true" />

> ✅ **Elasticsearch configuration is complete!**

***

## Configure Kibana :

After installing Kibana, we need to configure it, connect it to Elasticsearch, and make sure it runs automatically as a service.

#### 1️⃣ Edit the Kibana configuration file

```bash
sudo nano /etc/kibana/kibana.yml
```

Modify the following lines:

```powershell
# Network interface:
server.host: "0.0.0.0"

# Port number:
server.port: 5601
```

> Then **Save and Exit**.

#### 2️⃣ Create an Enrollment Token for Kibana

(Execute this on the Elasticsearch server)

```bash
sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

✅ Example output:

```bash
eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTAuMC4yLjE1OjkyMDAiXSwiZmdyIjoiMTNlOGZiYTFmNTczMmU1ZWFiYjVjNDY3Nzk3NjM5ZTUxMmVjNDMwMzI4YmI1ZjlmNzAzZjgyM2JjYjhlM2QyMyIsImtleSI6IkVlbnd6SnNCRUstNWpUX19iUEpaOm1KUHJuaVBxLVh4ZDJ0c094c3I2NGcifQ==
```

> This token will be used to register Kibana with Elasticsearch.\
> ⚠️ Note: It’s valid for **30 minutes only**.

#### 3️⃣ Enable Kibana to start automatically on boot

```bash
sudo systemctl daemon-reload
sudo systemctl enable kibana.service
sudo systemctl start kibana.service
```

* `enable` creates a symlink so that Kibana starts automatically on boot.

* `start` launches Kibana immediately.

#### 4️⃣ Verify Kibana service status

```bash
sudo systemctl status kibana
```

> If you see **Active (running)**, Kibana is now running but not yet registered with Elasticsearch.

#### 5️⃣ Register Kibana with Elasticsearch

In the status output, you’ll find a link like:

```bash
http://<host-IP>:5601/?code=<6-digit-code>
```

🔹 Example: [`http://localhost:5601/?code=035706`](http://localhost:5601/?code=035706)

Open this link in your browser, and you’ll be prompted to enter the **Enrollment Token** you created earlier.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768674738880/15bed157-64c6-463d-8a32-3665409c7d04.png" alt="" align="center" fullwidth="true" />

#### 6️⃣ Login to Kibana

Use the same credentials generated during the Elasticsearch installation:

* **Username:** `elastic`

* **Password:** `k_NRVGxEGSMmTgVLYmIn`

> - Once authenticated, Kibana will complete registration and connect to Elasticsearch.
>
> - ✅ **Kibana is now successfully configured and linked to Elasticsearch!**

At this stage, the SIEM is now up and running successfully. ✅

