
<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768814848370/2926b62f-2715-4fe0-aa2d-979bb14e1c5b.png" alt="" align="center" fullwidth="true" />

**DMZ Zone – Pre-Installation & Deployment**

This server was prepared as a **secure, isolated lab environment** for testing web application vulnerabilities within an Enterprise / DMZ scenario.

***

## 1️⃣ Precautionary Action – Snapshot

**Action:**\
A system snapshot was taken before starting any installation or configuration.

**Reason:**

* Provides a restore point in case of errors.

* Allows easy rollback to a clean lab state for repeated experiments or training.

***

## 2️⃣ Database Setup (MySQL Database)

### 2.1 Installing MySQL Server

```bash
sudo apt install mysql-server
sudo systemctl enable mysql
sudo systemctl status mysql
```

The **bWAPP** application requires a database to store:

* User data

* Application settings

* Attack logs

***

### 2.2 Database and User Configuration

Access MySQL:

```bash
sudo mysql
```

Create a local user:

```sql
CREATE USER 'user'@'localhost' IDENTIFIED BY 'LOL';
```

Create the database:

```sql
CREATE DATABASE bWAPP;
```

Grant privileges:

```sql
GRANT ALL PRIVILEGES ON bWAPP.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

Exit:

```sql
exit;
```

**Result:**

* Database: `bWAPP`

* User: `user`

* Password: `LOL`

* The user has full privileges on the database.

The `FLUSH PRIVILEGES` command ensures that permission changes take effect immediately without restarting MySQL.

***

## 3️⃣ Web Server Setup (Apache & PHP)

### 3.1 Installing Apache

```bash
sudo apt install apache2
sudo systemctl enable apache2
sudo systemctl status apache2
```

### 3.2 Installing PHP and Required Modules

```bash
sudo apt install php libapache2-mod-php
sudo apt install php-mysql
```

**Reason:**

* Apache: Web server

* PHP: Application language

* php-mysql: Connects PHP to the MySQL database

***

## 4️⃣ Downloading and Installing bWAPP

### 4.1 Downloading the Application

* Source: SourceForge

* Version: **bWAPP v2.2**

### 4.2 Extracting into the Apache Directory

```bash
sudo unzip bWAPPv2.2.zip -d /var/www/html
```

Verification:

```bash
ls /var/www/html
ls /var/www/html/bWAPP
```

***

### 4.3 Permissions Management

```bash
sudo chmod -R 777 /var/www/html/bWAPP
sudo chown -R www-data:www-data /var/www/html/bWAPP
```

**Reason:**

* Some bWAPP vulnerabilities rely on file uploads and write permissions.

* This configuration is suitable **only for a lab environment**, not production.

***

## 5️⃣ Application Configuration

### 5.1 Editing `settings.php`

Path:

```bash
/var/www/html/bWAPP/admin/settings.php
```

Before:

```php
// Database connection settings
$db_server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "bWAPP";
```

After:

```php
// Database connection settings 
$db_server = "localhost"; 
$db_username = "user"; 
$db_password = "LOL"; 
$db_name = "bWAPP";
```

### 5.2 Editing `install.php`

Path:

```bash
/var/www/html/bWAPP/install.php
```

Before:

```php
if(!mysqli_select_db($link,"bWAPP"))
```

After:

```php
if(mysqli_select_db($link,"bWAPP"))
```

**Reason:**\
Modifying the database existence check logic to ensure successful manual installation.

***

## 6️⃣ Restarting Apache

```bash
sudo systemctl restart apache2
```

***

## 7️⃣ Deployment & Verification

### 7.1 Running the Installer

```bash
http://localhost/bWAPP/install.php
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768830099738/e6854d8c-f51e-4016-81f6-42888c37c3a9.png" alt="" align="center" fullwidth="true" />

* Click: **Install bWAPP**

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768830420775/160b10bd-7267-443e-9369-d33480020287.png" alt="" align="center" fullwidth="true" />

* Database tables are created automatically.

***

### 7.2 Login Credentials

```bash
Username: bee
Password: bug
```

***

### 7.3 IP Address Verification

```bash
ip a
```

Example:

```bash
inet 172.16.100.60/24
```

Network access:

```bash
http://172.16.100.60/bWAPP/login.php
http://172.16.10.60/bWAPP/login.php
http://172.16.200.60/bWAPP/login.php
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1768830642592/71027d4b-f1e1-4d36-a6c0-100c6b6420e7.png" alt="" align="center" fullwidth="true" />

> ✔ The application is accessible successfully across multiple network segments within the lab.

***

## 8️⃣ Final Action – Snapshot

**Action:**\
A snapshot was taken after completing the setup.

**Reason:**

* Preserve the fully configured training state.

* Enable reuse of the server as a baseline for offensive or defensive scenarios.

***

## ✅ Conclusion

The **bWAPP Web Server** has been successfully deployed within the DMZ environment with:

* MySQL Database

* Apache + PHP

* Proper configuration

* Functional network accessibility

The server is now **fully ready** for:

* Web Penetration Testing

* OWASP Top 10 practice

* Red Team / Blue Team scenarios

***

> ✅ WebServer (bWAPP)

