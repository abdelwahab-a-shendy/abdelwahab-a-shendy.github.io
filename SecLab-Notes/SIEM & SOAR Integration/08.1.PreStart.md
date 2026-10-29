
# 🧾 **Quick Verification Commands**

### 🔹 **Check Kibana Status**

```bash
sudo systemctl status kibana
```

You should see that the service is **active (running)**, for example:

```bash
● kibana.service - Kibana
     Active: active (running) since Wed 2025-10-08 18:49:14 EEST
```

### 🔹 **Check Elasticsearch**

```bash
curl -k -u elastic:<password> https://<ELK-IP>:9200/_cluster/health?pretty
```

**Example:**

```bash
curl -k -u elastic:3lSq=GCEWU1ygpW_cEkl https://192.168.1.16:9200/_cluster/health?pretty
```

Expected output (cluster health status):

```bash
{
  "cluster_name" : "elasticsearch",
  "status" : "yellow",
  "number_of_nodes" : 1,
  "active_primary_shards" : 51
}
```

### 🔹 **Check Fluent Bit / Winlogbeat Agent**

**Windows:**

```bash
Get-Service winlogbeat
```

**Linux:**

```bash
sudo systemctl status fluent-bit
```

✅ **Successful verification ensures that all core components (Kibana, Elasticsearch, and log shippers) are running properly before starting detection labs.**

***

# ⚠️ Common Error When Creating Alerts / Actions

When moving to **Security → Rules**, you might encounter the following message:

```bash
Unable to create actions client because the Encrypted Saved Objects plugin is missing encryption key.
Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml
or use the bin/kibana-encryption-keys command. (500)
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759937901361/40380bb5-062a-4beb-870b-8824108d60f1.png" alt="" align="center" fullwidth="true" />

### 🔍 **Cause**

Kibana requires an **encryption key** to secure certain sensitive objects, such as **Connectors**, **Actions**, and **Saved Objects**.\
Without this key, you won’t be able to **save** or **run** any alerts.

### 🔐 **What Are “Encrypted Saved Objects”?**

Every time you create an **Alert**, **Rule**, or **Connector**, Kibana stores the configuration as a **Saved Object**.\
Some of these objects contain **sensitive data** (like passwords, tokens, or API credentials), so Kibana **encrypts** them using the following key:

```bash
xpack.encryptedSavedObjects.encryptionKey
```

### **Where’s the Problem?**

Kibana can’t find this key inside the configuration file:

```bash
/etc/kibana/kibana.yml
```

As a result, the **Actions and Alerts** system fails to start.

## 🧩 **Solution — Generate Encryption Keys**

### 1️⃣ Generate the Keys

Run the following command:

```bash
sudo /usr/share/kibana/bin/kibana-encryption-keys generate
```

**Example Output:**

```bash
xpack.encryptedSavedObjects.encryptionKey: 7d35e303958363027ae5799872e6387a
xpack.reporting.encryptionKey: 39f71537b4f5c1ea00576c1b5cffd098
xpack.security.encryptionKey: 795e25787601e5069366a45227db146a
```

### 2️⃣ Edit the `kibana.yml` File

Open the file for editing:

```bash
sudo nano /etc/kibana/kibana.yml
```

Add these lines at the end of the file (replace with your generated keys):

```bash
xpack.encryptedSavedObjects.encryptionKey: 7d35e303958363027ae5799872e6387a
xpack.reporting.encryptionKey: 39f71537b4f5c1ea00576c1b5cffd098
xpack.security.encryptionKey: 795e25787601e5069366a45227db146a
```

### 3️⃣ Restart Kibana

```bash
sudo systemctl restart kibana
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759938941561/5e53240d-3f0b-49bc-a61e-7b19b4636f27.png" alt="" align="center" fullwidth="true" />

After restarting, you’ll notice that the **Rules** page in Kibana loads normally, and **Connectors** can be created without any errors. ✅

