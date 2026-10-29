# Collecting Visualizing ssh logs Fluentbit :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760453718418/8bee09db-0fef-4cfe-b275-d69ea48fc222.webp" align="center" fullwidth="false" />

1. Install Fluent-bit

2. Navigate to /etc/fluent-bit

3. Modify fluent-bit.conf

4. Create a new file called ssh.conf

5. Navigate to /opt/fluent-bit/bin

6. Run the Fluent Bit script => `./fluent-bit -c "full Path"`

7. Append a log to the log file that Fluent Bit watches

***

#### Before anything: make sure of the following:

* To check the status of the Elasticsearch service on your machine :

```sh
sudo systemctl status elasticsearch.service
```

* To check the Kibana service :

```sh
sudo systemctl status kibana
```

***

# Getting Started with Fluent Bit + SSH Logs

### **1️⃣ Install Fluent Bit**

```sh
sudo curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
|
|
Processing triggers for libc-bin (2.35-0ubuntu3.8) ...

Installation completed. Happy Logging!
```

* We download the installation script from GitHub and run it directly.

* Fluent Bit will be installed on the system. It is a tool for collecting, transforming, and sending logs to Elasticsearch or other destinations.

### **2️⃣ Navigate to the Configuration Folder**

```bash
cd /etc/fluent-bit/
```

* This is where Fluent Bit’s configuration files are located.

### **3️⃣ Create New Files**

```sh
sudo touch ssh.conf

sudo touch ssh_logs.log

aas@aas:/etc/fluent-bit$ ls
fluent-bit.conf  parsers.conf  plugins.conf  ssh.conf  ssh_logs.log
```

* `ssh.conf` → file to define a parser for SSH logs

* `ssh_logs.log` → file to write and monitor SSH logs that Fluent Bit will read

* `ls` → verify that the files were created

### **4️⃣ Configure SSH Parser**

```sh
sudo nano ssh.conf 
|
|
[PARSER]
    Name ssh
    Format regex
    Regex (?<time>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+(?<Type>\w+)\s+(?<Protocol>\w+)\s+(?<Source_IP>\d{1,3}(?:\.\d{1,3}){3})\s+(?<Destination_IP>\d{1,3}(?:\.\d{1,3}){3})\s+(?<Source_Port>\d+)\s+(?<Destination_Port>\d+)\s+(?<User>\S+)\s+(?<Location>\S+)$
    Time_Key time
    Time_Format %Y-%m-%d %H:%M:%S
```

* The Regex splits each log line into fields: Time, Type, Protocol, Source\_IP, Destination\_IP, Source\_Port, Destination\_Port, User, Location.

* `Time_Key` and `Time_Format` specify which field to use as the event time and its format.

### **5️⃣ Modify fluent-bit.conf**

```bash
    # Plugins File
    # ============
    # specify an optional 'Plugins' configuration file to load external plugins.
    plugins_file plugins.conf

[INPUT]
    name tail
    path /etc/fluent-bit/ssh_logs.log
    tag ssh_logs
    parser ssh
    
    # Read interval (sec) Default: 1
    #interval_sec 1

[OUTPUT]
    name es
    host 127.0.0.1
    port 9200
    match ssh_logs
    index ssh_logs
    HTTP_User elastic
    HTTP_Passwd hel+6ncXHaUKps*RU-k5
    tls on 
    tls.verify off
    Suppress_Type_Name on
```

* INPUT → the source file (`ssh_logs.log`)

* parser → `ssh` parser we created

* OUTPUT → Elasticsearch as the destination:

  * `host` and `port` → location of Elasticsearch

  * `index` → name of the index in Elasticsearch(`ssh_logs`)

  * `HTTP_User` and `HTTP_Passwd` → login credentials

  * `tls` → encrypt connection (`tls.verify off` if certificate is self-signed)

**Note :**

```sh
index ssh_logs
```

> Means all logs will be stored in an Elasticsearch index called `ssh_logs`.

### **6️⃣ Navigate to the Executable Folder and Run Fluent Bit**

```sh
 cd /opt/fluent-bit/bin/
```

* Run:

```sh
./fluent-bit -c /etc/fluent-bit/fluent-bit.conf
Fluent Bit v4.0.9
* Copyright (C) 2015-2025 The Fluent Bit Authors
* Fluent Bit is a CNCF sub-project under the umbrella of Fluentd
* https://fluentbit.io

______ _                  _    ______ _ _             ___  _____ 
|  ___| |                | |   | ___ (_) |           /   ||  _  |
| |_  | |_   _  ___ _ __ | |_  | |_/ /_| |_  __   __/ /| || |/' |
|  _| | | | | |/ _ \ '_ \| __| | ___ \ | __| \ \ / / /_| ||  /| |
| |   | | |_| |  __/ | | | |_  | |_/ / | |_   \ V /\___  |\ |_/ /
\_|   |_|\__,_|\___|_| |_|\__| \____/|_|\__|   \_/     |_(_)___/ 


[2025/09/16 16:12:29] [ info] [fluent bit] version=4.0.9, commit=, pid=5105
[2025/09/16 16:12:29] [ info] [storage] ver=1.5.3, type=memory, sync=normal, checksum=off, max_chunks_up=128
[2025/09/16 16:12:29] [ info] [simd    ] SSE2
[2025/09/16 16:12:29] [ info] [cmetrics] version=1.0.5
[2025/09/16 16:12:29] [ info] [ctraces ] version=0.6.6
[2025/09/16 16:12:29] [ info] [input:tail:tail.0] initializing
[2025/09/16 16:12:29] [ info] [input:tail:tail.0] storage_strategy='memory' (memory only)
[2025/09/16 16:12:29] [ info] [sp] stream processor started
[2025/09/16 16:12:29] [ info] [engine] Shutdown Grace Period=5, Shutdown Input Grace Period=2
[2025/09/16 16:12:29] [ info] [input:tail:tail.0] inotify_fs_add(): inode=2624218 watch_fd=1 name=/etc/fluent-bit/ssh_logs.log
[2025/09/16 16:12:29] [ info] [output:es:es.0] worker #1 started
[2025/09/16 16:12:29] [ info] [output:es:es.0] worker #0 started
```

* This launches Fluent Bit using the configuration file.

* Fluent Bit starts monitoring `/etc/fluent-bit/ssh_logs.log` and sends new log lines to Elasticsearch.

* The messages confirm it is running and waiting for new log entries.

### **7️⃣ Add a Test Log**

```sh
echo "2025-09-16 18:55:00 DROP TCP 192.168.1.5 10.0.0.8 12345 22 root Cairo" | sudo tee -a /etc/fluent-bit/ssh_logs.log
```

* Adds a test line so Fluent Bit can capture it and send it to Elasticsearch.

### **8️⃣ Verify Logs in Elasticsearch**

```sh
curl -u elastic:hel+6ncXHaUKps*RU-k5 -k "https://127.0.0.1:9200/ssh_logs/_search?pretty"
```

* Search in the `ssh_logs` index.

* `-u` → username and password

* `-k` → ignore certificate issues

* If the added log appears → Fluent Bit is working correctly.

### **9️⃣ In Kibana**

* Open in browser:

```bash
http://192.168.1.100:5601/
```

* Go to: Management → Stack Management → Index Management → you should see the `ssh_logs` index created with logs inside.

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758088467949/35600e8e-ba96-4ae2-89f2-24f977aa58d8.png" alt="" align="left" fullwidth="false" />

***

### **Expected Outputs**

**Screenshot from the Fluent Bit configuration file:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758088482305/c348f2af-3d6b-48f4-a8d2-d46cc80e8f87.png" alt="" align="left" fullwidth="false" />

**Screenshot from the terminal after executing the command:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758088495724/a58d5563-1f60-493d-bf61-0720d47d75db.png" alt="" align="left" fullwidth="false" />

**Screenshot from the created index in Elasticsearch Stack Management:**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1758088530270/e9fa1398-2b6f-43e5-bfb4-7bc182088eec.png" alt="" align="left" fullwidth="false" />

***

> **Abdelwahab A. Shandy**\
> 📅 **Date:16-09-2025**
>
> ***💬 "Control*** ***the code, and you control the world." 🔐 From wiping metadata to gaining root access — every step is documented and my goal is to deeply understand the system, not just hack!***
>
> [***Abdelwahab Shandy***](https://abdelwahabshandy.hashnode.dev/)
>
> [***Linkedin***](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)
>
> [***GitHub***](https://github.com/abdelwahab-ahmed-shandy)
>
> ***See You Soon***

