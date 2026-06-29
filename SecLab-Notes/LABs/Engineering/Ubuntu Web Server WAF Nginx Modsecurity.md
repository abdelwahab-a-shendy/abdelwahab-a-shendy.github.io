# Ubuntu Web Server WAF Nginx Modsecurity :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760134590203/b7a636f5-70d7-49ff-9147-5707e72a3946.png" alt="" align="center" fullwidth="true" />

In this lab, I prepared a complete environment on Ubuntu to practice running a **Web Server** with **WAF (ModSecurity)** and see the difference between Allowed and Blocked Requests.

***

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760134639050/79fb3d35-57a4-45ef-9190-a8caf80bd704.png" alt="" align="center" fullwidth="true" />

## **1.First: Preparing the Lab Environment**

* I installed Ubuntu 22.04.3 LTS to work on:

```bash
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.3 LTS
Release:        22.04
Codename:       jammy
```

* I installed essential tools to interact faster with the system:

  * Because we will need git and something like ipconfig

```bash
sudo apt install git net-tools -y
```

***

### **2.Installing the Web Server (Nginx)**

* **Nginx (pronounced Engine-X)** is a **high-performance open-source Web Server**.\
  It is used to serve web pages, and it also works as a **Reverse Proxy**, **Load Balancer**, and **HTTP Cache**.

```bash
sudo apt update

sudo apt install nginx -y

sudo systemctl enable nginx

sudo systemctl start nginx

sudo nginx -v
```

> (It showed nginx/1.18.0 version)

* To make sure everything is working correctly:

  <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757798769997/53b2f3f7-0c9c-49e6-9d26-108e6ffc1920.png" alt="" align="left" fullwidth="true" />

> I confirmed everything works by opening the page in the browser or using curl.

***

### **3.Creating a Simple HTML Page for Practice**

Created an HTML file in the default Nginx web folder:

```shell
cd /var/www/html/

sudo nano NetworkSecurityTask.html
```

It will appear:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757798794166/01b19246-1d17-4668-b357-5facd13a4bb7.png" alt="" align="left" fullwidth="true" />

> I wrote simple content to test on it.

***

## **4.Preparing the Libraries Needed to Build ModSecurity**

```bash
sudo apt install gcc make build-essential autoconf automake libtool libcurl4-openssl-dev liblua5.3-dev libfuzzy-dev ssdeep gettext pkg-config libgeoip-dev libyajl-dev doxygen libpcre++-dev libpcre2-16-0 libpcre2-dev libpcre2-posix3 zlib1g zlib1g-dev wget -y
```

> To build ModSecurity from source.

***

### **5.Installing ModSecurity from Source**

```bash
cd /opt
# Go to the /opt directory (commonly used to install software from source)

sudo git clone https://github.com/owasp-modsecurity/ModSecurity.git
# Download (clone) the ModSecurity source code from GitHub into /opt

cd ModSecurity
# Enter the ModSecurity folder we just downloaded

sudo git submodule init
# Initialize the submodules (linked libraries inside the project)

sudo git submodule update
# Download/update the contents of the submodules (pulls all required sub-libraries)

sudo ./build.sh
# Run the build.sh script to prepare the project for building (creates initial configuration files)

sudo ./configure
# Configure the build (checks for required libraries and sets installation options)

sudo make
# Compile the source code (turn it into executable binaries)

sudo make install
# Install the program into the system after compilation (copies files to the correct paths)
```

> * **ModSecurity** is an **open-source Web Application Firewall (WAF)**.
>
> * It works as a **Module** for Web Servers (Apache, Nginx, IIS) to protect applications from common web attacks.

***

### **6.Downloading ModSecurity-Nginx Connector**

```shell
cd /opt
# Go to the /opt directory (commonly used to store or build software from source)

sudo git clone https://github.com/owasp-modsecurity/ModSecurity-nginx.git
# Download (clone) the ModSecurity-nginx connector source code from GitHub into /opt
# (This connector links Nginx to the ModSecurity engine)
```

> * The **ModSecurity-Nginx Connector** is a **module** that acts as an interface between Nginx and the ModSecurity Engine.
>
> * It allows Nginx to use the WAF (ModSecurity) and apply rules to incoming traffic.

***

### **7.Downloading the Same Nginx Version Source**

* Initially, I downloaded nginx-1.25.4:

```bash
cd /opt

sudo wget https://nginx.org/download/nginx-1.25.4.tar.gz
# Download the Nginx source code (version 1.25.4) as a .tar.gz archive from the official site

sudo tar -xzvf nginx-1.25.4.tar.gz
# Extract (unzip) the downloaded archive file into a folder named nginx-1.25.4

cd nginx-1.25.4
```

> * The **Source Code** is the original program code (Nginx here) before it becomes a ready binary.
>
> * When someone tells you to **download the source of the same version you have**, it means :
>
>   * Check which version of Nginx you are running (e.g., 1.24.0).
>
>   * Download the exact same version from the official site as **tar.gz** (source).
>
>   * Do not build from a newer or older version — same as the installed version.
>
> * Reason: If you will build **Modules** or **Compile with additions**, the source must match the installed version to avoid conflicts.

***

### **8.Building Nginx with the ModSecurity Module**

```bash
sudo ./configure --with-compat --add-dynamic-module=/opt/ModSecurity-nginx
# Configure the Nginx source build:
# --with-compat → allows dynamic modules to be compatible with the running Nginx version
# --add-dynamic-module=/opt/ModSecurity-nginx → tells Nginx to compile in the ModSecurity-nginx connector as a dynamic module

sudo make

sudo make modules
```

> * **Building Nginx with ModSecurity Module** means **compiling Nginx and the ModSecurity Nginx Connector together from source** so Nginx can work as a Web Application Firewall (WAF) and apply protection rules to traffic.

***

### **9.Copying Module and ModSecurity Files**

* **You copy the Module files and ModSecurity configuration files to the correct paths so Nginx can use them**:

```bash
sudo cp objs/ngx_http_modsecurity_module.so /etc/nginx/modules-enabled/
# Copy the module file (ngx_http_modsecurity_module.so) that was adopted from the Nginx source code
# to the /etc/nginx/modules-enabled/ directory so that Nginx can load and run it at startup

sudo cp /opt/ModSecurity/modsecurity.conf-recommended /etc/nginx/modsecurity.conf
# Copy the default configuration file (modsecurity.conf-recommended)
# from the ModSecurity project to /etc/nginx/modsecurity.conf
# (This is the main config file for ModSecurity inside Nginx)

sudo cp /opt/ModSecurity/unicode.mapping /etc/nginx/unicode.mapping
# Copy the file unicode.mapping (responsible for Unicode support)
# From the ModSecurity project to /etc/nginx/unicode.mapping
# So that ModSecurity handles different encodings correctly
```

> * **Step 1** → Makes Nginx load the ModSecurity Module.
>
> * **Step 2** → Adds default ModSecurity configuration to Nginx.
>
> * **Step 3** → Ensures Unicode works correctly with ModSecurity.

***

## **10.Activating the Module in Nginx**

* Added this line at the top of **/etc/nginx/nginx.conf** :

```shell
sudo nano /etc/nginx/nginx.conf

load_module /etc/nginx/modules-enabled/ngx_http_modsecurity_module.so;
# Add this line at the top of the nginx.conf file
# (before the events or http block) so that Nginx loads the ModSecurity module when running
```

> This line tells **Nginx** to load the external **ModSecurity Module** located at `/etc/nginx/modules-enabled/` during startup.

* Place it at the top **before any events or http block**. Example:

```bash
# Download the ModSecurity module
load_module /etc/nginx/modules-enabled/ngx_http_modsecurity_module.so;

user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
    # multi_accept on;
}

http {
    ##
    # Basic Settings
    ##
    sendfile on;
    tcp_nopush on;
    types_hash_max_size 2048;
    ...
    include /etc/nginx/sites-enabled/*;
}
```

***

### **Problem I Faced:**

* Error appeared:

```cs
module "...ngx_http_modsecurity_module.so" version 1025004 instead of 1018000
```

> This means the module was built for a different Nginx version.

### **Solution:**

> Removed the default Nginx and installed the latest version (1.28.0):

```bash
sudo apt remove nginx nginx-common nginx-core -y

sudo add-apt-repository ppa:ondrej/nginx -y

sudo apt update

sudo apt install nginx -y

sudo nginx -v  # nginx/1.28.0
```

* Then rebuilt the module with the new version **1.28.0**:

```bash
cd /opt

sudo wget https://nginx.org/download/nginx-1.28.0.tar.gz

sudo tar -xzvf nginx-1.28.0.tar.gz

cd nginx-1.28.0

sudo ./configure --with-compat --add-dynamic-module=/opt/ModSecurity-nginx

sudo make

sudo make modules

sudo cp objs/ngx_http_modsecurity_module.so /etc/nginx/modules-enabled/
```

* Tested the configuration :

```bash
sudo nginx -t
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

***

## **11. Enabling ModSecurity inside the Server Block**

```bash
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm;

    server_name _;

	# 🔹 Activate ModSecurity
    modsecurity on;
    modsecurity_rules_file /etc/nginx/modsecurity.conf;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

***

## **12. Setting ModSecurity to DetectionOnly Mode**

```bash
sudo nano /etc/nginx/modsecurity.conf

SecRuleEngine DetectionOnly
# This line is located inside the configuration file:
# Specifies ModSecurity's operating mode to be "DetectionOnly"
# This means it will only detect attacks and write them to the log without blocking them (it will not block them).
```

* This makes ModSecurity log attacks without blocking them.

***

## **13. Running and Monitoring the Service**

```bash
sudo systemctl enable nginx
# Enable the Nginx service to start automatically on every system reboot (Auto Start on Boot)

sudo systemctl start nginx
# Start the Nginx service immediately

sudo tail -f /var/log/modsec_audit.log
# Live monitoring of the ModSecurity log file
# - tail -f means displaying the last lines of the file with immediate updates when new logs are added
# - Here you will see any attack attempts or requests logged in ModSecurity
```

***

## **14. Performing Simple Test Attacks**

* XSS Attack:

```bash
curl "http://localhost/NetworkSecurityTask.html?q=<script>alert(1)</script>"
```

* Simple SQLi Attack:

```bash
curl -X POST -d "username=' OR '1'='1" http://localhost/NetworkSecurityTask.html
```

* Example:

  * <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757804179828/e83e804a-a10d-407c-b976-125a5e0b83a1.png" alt="" align="center" fullwidth="true" />

***

## **15. Results**

* All requests appeared in `/var/log/modsec_audit.log` with all details (A/B/D/E/F).

* ModSecurity logged everything but did not block (DetectionOnly).

* To actually block, rules with `deny` must be added.

* What I did so far is the **Attack Detection phase** (or DetectionOnly Mode).

***

### **16. Next, enabling Blocking Mode in ModSecurity**

* ### 📝 Idea:

  * We were in **DetectionOnly** (attacks logged but not blocked).

  * Now we will switch ModSecurity to **Blocking Mode** (attacks blocked + log shows “Access denied with code 403”).

  * We will do this step by step:

#### 1️⃣ Change ModSecurity.conf to Blocking Mode

Opened the config file:

```bash
sudo nano /etc/nginx/modsecurity.conf
```

Changed the line:

```bash
SecRuleEngine DetectionOnly
```

to:

```bash
SecRuleEngine On
```

💡 Now ModSecurity will block, not just log.

***

#### 2️⃣ Download OWASP Core Rule Set (CRS)

To detect and block attacks, ModSecurity needs Rules:

```bash
cd /etc/nginx/

sudo git clone https://github.com/coreruleset/coreruleset.git
```

* **Explanation:** CRS is a ready-made set of rules that detects and blocks most common attacks (XSS, SQLi, LFI…).

***

#### 3️⃣ Add Rules to modsecurity.conf

Opened the file again:

```bash
sudo nano /etc/nginx/modsecurity.conf
```

Added at the end:

```bash
# Include the Core Rule Set (CRS) configuration file
# This file configures the global settings for security rules (such as global variables)
Include /etc/nginx/coreruleset/crs-setup.conf
Include /etc/nginx/coreruleset/rules/*.conf
# Include all rules files located in the rules/ folder
# These files contain the actual rules for detecting and preventing attacks (XSS, SQLi, LFI, etc.)
```

💡 **Explanation:** This links ModSecurity to the new CRS.

***

### 4️⃣ Reload Nginx to Apply Changes

```bash
sudo nginx -t && sudo systemctl reload nginx
```

💡 **Explanation:** `nginx -t` tests the configuration. If it says `syntax is ok`, everything is fine. Then reload applies changes without stopping the service.

##### Another problem appeared:

```bash
aas@aas:/etc/nginx$ sudo nginx -t && sudo systemctl reload nginx
2025/09/11 03:50:20 [emerg] 6906#6906: "modsecurity_rules_file" directive Rules error. File: /etc/nginx/modsecurity.conf. Line: 276. Column: 45. /etc/nginx/coreruleset/crs-setup.conf: Not able to open file. Looking at: '/etc/nginx/coreruleset/crs-setup.conf', '/etc/nginx/coreruleset/crs-setup.conf', '/etc/nginx//etc/nginx/coreruleset/crs-setup.conf', '/etc/nginx//etc/nginx/coreruleset/crs-setup.conf'. in /etc/nginx/sites-enabled/default:49
nginx: configuration file /etc/nginx/nginx.conf test failed
```

> Cannot find `crs-setup.conf` in the path used in `modsecurity_rules_file`.

The file might be elsewhere:

```bash
aas@aas:/etc/nginx$ ls /etc/nginx/coreruleset
CHANGES.md              docs           plugins         rules        util
CONTRIBUTING.md         INSTALL.md     README.md       SECURITY.md
CONTRIBUTORS.md         KNOWN_BUGS.md  regex-assembly  SPONSORS.md
crs-setup.conf.example  LICENSE        renovate.json   tests
```

The filename is different, meaning the default CRS file is not copied yet.

#### Solution:

* **Create a copy from the example file**:

```bash
sudo cp /etc/nginx/coreruleset/crs-setup.conf.example /etc/nginx/coreruleset/crs-setup.conf
```

* **Ensure the path in modsecurity.conf is correct**

```bash
sudo nano /etc/nginx/modsecurity.conf
```

* Make sure the line reads:

```bash
Include /etc/nginx/coreruleset/crs-setup.conf
```

* After the modification:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

***

### ✅ Next Step: **Testing Blocking Mode**

* To confirm everything works:

  * 1️⃣ **Send a malicious request** — like a simple SQL Injection or XSS.

  * Example:

```bash
curl -i http://localhost/NetworkSecurityTask.html?id='or+1=1--
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757799056407/69bfaaf3-177a-4d78-899d-27a399ef562e.png" alt="" align="left" fullwidth="true" />

OR:

```bash
curl "http://localhost/NetworkSecurityTask.html?q=<script>alert(1)</script>"
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757799360271/b13b106b-5080-4151-aac4-6afb64fc55e0.png" alt="" align="left" fullwidth="true" />

* <Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757801785061/5a602104-79d1-4f11-b611-35e6d8f342bd.png" alt="" align="center" fullwidth="true" />

* If Blocking Mode works:

  * The server returns **403 Forbidden** (Access Denied).

  * In `/var/log/modsec_audit.log` it shows:

    * `Access denied with code 403` + Rule ID that blocked the request.

***

2️⃣ **Check ModSecurity Log:**

```bash
sudo tail -f /var/log/modsec_audit.log
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1757799379363/e769e722-d22b-4c37-9647-d2227bcfdc02.png" alt="" align="left" fullwidth="true" />

You will see the request sent and the Rule that blocked it.

***

✅ **Final Result:**

* Prepared a full environment: Nginx + ModSecurity.

* Logged attacks (DetectionOnly) then enabled blocking attacks (Blocking Mode).

* Documented every stage with images.

***

> ***💬 "Control*** ***the code, and you control the world." 🔐 From wiping metadata to gaining root access — every step is documented and my goal is to deeply understand the system, not just hack!***
>
> [***Abdelwahab Shandy***](https://abdelwahabshandy.hashnode.dev/)
>
> [***Linkedin***](https://www.linkedin.com/in/abdelwahab-ahmed-shandy/)
>
> [***GitHub***](https://github.com/abdelwahab-ahmed-shandy)
>
> ***See You Soon***
>
> ***AS Cyber “)).***

