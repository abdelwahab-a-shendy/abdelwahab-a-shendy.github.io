---
id: "68e1c227dc0f2328382c5ba4"
title: "Building a SIEM"
description: "In this section, we’ll begin building our SIEM (Security Information and Event Management) system using the ELK Stack — which stands for Elasticsearch, Logstash, and Kibana."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/siem-home-lab/pre-lab-overview/building-a-siem"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
seoTitle: "SIEM Home LAB"
createdAt: "2025-10-05T00:56:07.073Z"
updatedAt: "2026-01-25T15:35:46.809Z"
---

***

## 🧩 **Step 1 – Configure Elasticsearch**

After installing Elasticsearch, the next step is to configure it to make it accessible from your local network.

#### 1️⃣ Open the configuration file:

```sh
sudo nano /etc/elasticsearch/elasticsearch.yml
```

#### 2️⃣ Edit the following lines:

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

```powershell
inet 192.168.1.16/24 brd 192.168.1.255 scope global dynamic enp0s3
```

> In this case, the server IP is **192.168.1.16**

#### 4️⃣ Test Elasticsearch in your browser:

Open the following link: 🔗 [**https://192.168.1.16:9200/**](https://192.168.1.16:9200/)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759626660395/aa267a36-67f5-4a7d-8496-7c176dc57b86.png" alt="" align="center" fullwidth="true" />

Then log in using:

* **Username:** `elastic`

* **Password:** `3lSq=GCEWU1ygpW_cEkl`\
  (This is the password displayed after installation)

#### 5️⃣ If you forget your password:

You can reset it anytime using:

```bash
sudo /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759626732604/1ceb0f67-a488-4955-8dcb-e9b69830ea16.png" alt="" align="center" fullwidth="true" />

> ✅ **Elasticsearch configuration is complete!**

***

## **🧩 Step 2 – Configure Kibana**

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
eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTkyLjE2OC4xLjE2OjkyMDAiXSwiZmdyIjoiOTMwYWI1MTViNTkwMDAxOTUxY2YxMTczN2M5NWY3NzA3NmFiNmY1NDNjMTM0OGExYTNkZGE1NTYyZGQ5MDFiNSIsImtleSI6IkY0VDNzWmtCcE1VNGVESlVrbl9kOnYxcEx2Tkg4U1hLTzVMNmcwbGZoNVEifQ==
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

🔹 Example: [`http://192.168.1.16:5601/?code=035706`](http://192.168.1.16:5601/?code=035706)

Open this link in your browser, and you’ll be prompted to enter the **Enrollment Token** you created earlier.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759627876760/bcbdec52-2ae0-423d-8238-d6b5a889e634.png" alt="" align="center" fullwidth="true" />

If you receive a “token invalid” message, simply generate a new one:

```bash
sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

#### 6️⃣ Login to Kibana

Use the same credentials generated during the Elasticsearch installation:

* **Username:** `elastic`

* **Password:** `3lSq=GCEWU1ygpW_cEkl`

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759628013155/f5b2362b-8b6e-41d2-814a-1ec3225f7c24.png" alt="" align="center" fullwidth="true" />

Once authenticated, Kibana will complete registration and connect to Elasticsearch.

✅ **Kibana is now successfully configured and linked to Elasticsearch!**

***

### **At this stage, the SIEM is now up and running successfully. ✅**

