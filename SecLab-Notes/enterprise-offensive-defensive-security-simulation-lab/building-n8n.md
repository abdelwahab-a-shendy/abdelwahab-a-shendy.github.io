---
id: "696c96df3d5c21d78c15e4a3"
title: "Building N8N"
description: "Installing Docker and Running n8n"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/enterprise-offensive-defensive-security-simulation-lab/building-n8n"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2026-01-18T08:16:31.202Z"
updatedAt: "2026-01-25T15:35:46.718Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768813136989/3769f2e6-77a4-4a71-b2f2-9136bb90c43c.png" align="center" fullwidth="false" />

In this step, we’ll install **Docker** and run **n8n** inside a container. This setup allows you to automate and orchestrate workflows that interact with your **SIEM (ELK Stack)**.

### **1️⃣ Update the system and install essential packages :**

```bash
sudo apt update

sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
```

* `apt update` → Updates the package list.

* `apt install` → Installs the essential packages required to set up Docker.

### **2️⃣ Add Docker’s official GPG key :**

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

* This command downloads and stores Docker’s GPG key, ensuring that all downloaded packages are verified.

### **3️⃣ Add the official Docker repository :**

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
| sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

* This adds Docker’s official repository to your system so you can install the latest stable version.

### **4️⃣ Update the package index again :**

```bash
sudo apt update
```

* Updates the list to include Docker packages from the newly added repository.

### **5️⃣ Install Docker Engine :**

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

* **docker-ce** → Docker Engine.

* **docker-ce-cli** → Command-line tools for Docker.

* [**containerd.io**](http://containerd.io) → Container runtime engine.

### **6️⃣ Run Docker without using sudo :**

```bash
sudo usermod -aG docker $USER

newgrp docker
```

* This adds your user to the Docker group so you can run Docker commands without `sudo`.\
  `newgrp docker` applies the changes immediately.

### **7️⃣ Pull the official n8n image :**

```bash
docker pull n8nio/n8n
|
|
elk@elk-VM:~$ docker pull n8nio/n8n
Using default tag: latest
latest: Pulling from n8nio/n8n
036c5fea5ec2: Pull complete 
9cd9f54f6da2: Pull complete 
bc0cdc8ecc2f: Pull complete 
66d634619c1c: Pull complete 
f860243118e9: Pull complete 
e628b015b66d: Pull complete 
4f4fb700ef54: Pull complete 
2be4a8f1e10d: Pull complete 
0bcbf20a888a: Pull complete 
218829d6d7f2: Pull complete 
7ebb9aff85fe: Pull complete 
6cbf3b91f9d4: Download complete 
1bffad71d142: Download complete 
Digest: sha256:37d6559a03d8d24a01317148aca3909686e76527bb5f84387ff7cf2ce04bb09d
Status: Downloaded newer image for n8nio/n8n:latest
docker.io/n8nio/n8n:latest
```

* Downloads the latest official image of **n8n** from Docker Hub.

### **8️⃣ Run n8n container :**

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

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768727146052/7d5feea0-ea58-43f5-8b98-b0fc77a6f98e.png" alt="" align="center" fullwidth="true" />

#### ***✅ At this point, we’ve completed the installation of everything needed on the machine that will function as both the SIEM and the n8n automation server.***

