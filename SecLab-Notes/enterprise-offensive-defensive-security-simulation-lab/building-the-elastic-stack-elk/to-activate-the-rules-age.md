
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759938941561/5e53240d-3f0b-49bc-a61e-7b19b4636f27.png" alt="" align="center" fullwidth="true" />

## **Generate Encryption Keys**

**I solved this problem before and wrote a simple article about it.** | [LINK](https://sec-lab-notes.hashnode.space/abdelwahabshandy-notes/siem-home-lab/detection-egnineering/pre-start)

* Before starting the lab or running detection and alert rules in the SIEM/ Environment, the goal is to avoid common operational issues (such as connectivity problems, encryption key errors, permission issues, or configuration mistakes).

* This step also provides a checklist to ensure the environment is set up securely and in a repeatable manner.

* When moving to **Security → Rules**, you might encounter the following message:

```sh
Unable to create actions client because the Encrypted Saved Objects plugin is missing encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in the kibana.yml or use the bin/kibana-encryption-keys command. (500)
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759937901361/40380bb5-062a-4beb-870b-8824108d60f1.png" alt="" align="center" fullwidth="true" />

#### **Cause :**

Kibana requires an encryption key to secure certain sensitive objects, such as Connectors, Actions, and Saved Objects. Without this key, you won’t be able to save or run any alerts.

**What Are “Encrypted Saved Objects”?**

* Every time you create an Alert, Rule, or Connector, Kibana stores the configuration as a Saved Object.

* Some of these objects contain sensitive data (like passwords, tokens, or API credentials), so Kibana encrypts them using the following key:

```sh
xpack.encryptedSavedObjects.encryptionKey
```

####  **Where’s the Problem?**

* Kibana can’t find this key inside the configuration file:

```sh
/etc/kibana/kibana.yml
```

> As a result, the **Actions and Alerts** system fails to start.

#### **Solution — Generate Encryption Keys**

##### 1️⃣ Generate the Keys

Run the following command:

```bash
sudo /usr/share/kibana/bin/kibana-encryption-keys generate
```

**Example Output:**

```bash
Settings:
xpack.encryptedSavedObjects.encryptionKey: f33d08ae9217567c3af61e4754b140c9
xpack.reporting.encryptionKey: 971e27adaddcd0e3bcd1629b2d1b26fe
xpack.security.encryptionKey: 70faae08f08070b49974a17f391c6816
```

##### 2️⃣ Edit the `kibana.yml` File

* Open the file for editing:

```bash
sudo nano /etc/kibana/kibana.yml
```

* Add these lines at the end of the file (replace with your generated keys):

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768675136618/bc9f439d-7e6f-437b-9904-42ad5912b08c.png" alt="" align="center" fullwidth="true" />

##### 3️⃣ Restart Kibana

```bash
sudo systemctl restart kibana
# And 
sudo systemctl daemon-reload
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1759938941561/5e53240d-3f0b-49bc-a61e-7b19b4636f27.png" alt="" align="center" fullwidth="true" />

> * After restarting, you’ll notice that the **Rules** page in Kibana loads normally, and **Connectors** can be created without any errors.
>
> * ✅ The SIEM is now up and running successfully

