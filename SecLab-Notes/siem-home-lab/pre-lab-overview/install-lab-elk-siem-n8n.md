
**VM Name:** `LAB-ELK-N8N`

**Purpose/Role:**

* Hosts the ELK Stack (Elasticsearch + Kibana \[+Logstash optional])

* Hosts n8n (SOAR) for managing workflows and threat automation

**Operating System:**

* Ubuntu 22.04 LTS (64-bit)

Since I use VBox , You can choose whether to install the labs on VBox or even VMware.

After installing a Linux distribution, Ubuntu is recommended.

### First, I will activate the VirtualBox tools on this virtual machine :

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

# 🧩 Firstly : **Install Elasticsearch, Kibana, and Logstash (ELK Stack)**

### **Official Reference:**

[Install Elasticsearch with Debian Package](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-with-debian-package)

<a target="_blank" href="https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-kibana-with-debian-package">**Install Kibana with Debian package**</a>

**Step 1: Switch to Root and Update System :**

```bash
sudo apt update
```

**Step 2: Add Elasticsearch GPG Key and Repository :**

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-9.x.list
```

**Step 3: Install Dependencies :**

```bash
sudo apt-get install apt-transport-https -y
sudo apt update
```

**Step 4: Install Elasticsearch :**

```bash
sudo apt-get install elasticsearch -y
```

📌 **During installation**, Elasticsearch will automatically:

* Create `elasticsearch` user and group.

* Enable **security auto-configuration** (authentication + TLS).

* Generate a **password** for the built-in `elastic` superuser, for ex[ample:](https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-with-debian-package)

  ```bash
  The generated password for the elastic built-in superuser is : 3lSq=GCEWU1ygpW_cEkl
  ```

**Important Commands after Installation :**

```bash
sudo systemctl daemon-reload

sudo systemctl enable elasticsearch.service

sudo systemctl start elasticsearch.service
```

> ✅ Verify status:

```bash
sudo systemctl status elasticsearch
```

**Step 5: Install Kibana and Logstash**

```bash
sudo apt-get install kibana logstash -y

sudo systemctl enable kibana.service 

sudo systemctl start kibana.service 

sudo systemctl status kibana.service
```

During the installation, the following will be done:

* A **dedicated user and service** for **Kibana** will be created.

* A **Kibana Keystore file** will be set up to store sensitive values.

* **Logstash** will be configured to process logs in the future.

**Step 6: Install curl (to test Elasticsearch connection) :**

```bash
sudo apt-get install curl -y
```

***

***

***

# 🧩 **Secondly: Installing Docker and Running n8n on WSL**

In this step, we’ll install **Docker** and run **n8n** inside a container. This setup allows you to automate and orchestrate workflows that interact with your **SIEM (ELK Stack)**.

**1️⃣ Update the system and install essential packages :**

```bash
sudo apt update

sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```

* `apt update` → Updates the package list.

* `apt install` → Installs the essential packages required to set up Docker.

**2️⃣ Add Docker’s official GPG key :**

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

* This command downloads and stores Docker’s GPG key, ensuring that all downloaded packages are verified.

**3️⃣ Add the official Docker repository :**

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
| sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

* This adds Docker’s official repository to your system so you can install the latest stable version.

**4️⃣ Update the package index again :**

```bash
sudo apt update
```

* Updates the list to include Docker packages from the newly added repository.

**5️⃣ Install Docker Engine :**

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

* **docker-ce** → Docker Engine.

* **docker-ce-cli** → Command-line tools for Docker.

* [**containerd.io**](http://containerd.io) → Container runtime engine.

**6️⃣ Run Docker without using sudo :**

```bash
sudo usermod -aG docker $USER

newgrp docker
```

* This adds your user to the Docker group so you can run Docker commands without `sudo`.\
  `newgrp docker` applies the changes immediately.

**7️⃣ Pull the official n8n image :**

```bash
docker pull n8nio/n8n
```

* Downloads the latest official image of **n8n** from Docker Hub.

**8️⃣ Run n8n container :**

```bash
sudo service docker start

docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

* `-it` → Interactive terminal session.

* `--rm` → Automatically remove the container after stopping.

* `-p 5678:5678` → Expose port **5678** for web access.

* `-v n8n_data:/home/node/.n8n` → Persist workflow data inside a Docker volume.

OR

### Running Docker on a host network :

```bash
docker run -it --rm --name n8n --network host -v n8n_data:/home/node/.n8n n8nio/n8n
```

> The method makes [localhost](http://localhost) in the container point directly to host .

***

### ***✅ At this point, we’ve completed the installation of everything needed on the machine that will function as both the SIEM and the n8n automation server.***

