
## 1️⃣ Prerequisites

Before installing Filebeat, make sure you have:

* Elasticsearch and Kibana ready (for storage and visualization).

* Root or sudo privileges on the system.

* Internet connection to download packages.

***

## 2️⃣ Downloading and Installing Filebeat

### For Ubuntu/Debian (DEB)

```json
# Download the deb package from Elastic official site
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-9.1.5-amd64.deb

# Install the package
sudo dpkg -i filebeat-9.1.5-amd64.deb
```

### For RedHat/CentOS (RPM)

```json
# Download the rpm package from Elastic official site
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-9.1.5-x86_64.rpm

# Install the package
sudo rpm -vi filebeat-9.1.5-x86_64.rpm
```

🔹 MacOS and Windows versions are available on the Elastic website if needed.

***

## 3️⃣ Configuring Connection to Elasticsearch and Kibana

Open the main configuration file:

```json
sudo nano /etc/filebeat/filebeat.yml
```

**If using Elastic Cloud Hosted:**

```yaml
cloud.id: "YOUR_CLOUD_ID"
cloud.auth: "filebeat_setup:YOUR_PASSWORD"
```

**If using self-managed local Elasticsearch:**

```yaml
output.elasticsearch:
  hosts: ["elasticsearch hosts"]
  protocol: https
  ssl.enabled: true
  ssl.verification_mode: none  # Self-signed certificates
  username: ""
  password: ""
  
setup.kibana:
  host: "https://192.168.1.66:5601"
  ssl.verification_mode: none  # Self-signed certificates
```

> Note: If you want to send data to Logstash instead of Elasticsearch, the output will be adjusted later.

***

## 4️⃣ Collecting Data (Log Data)

**Filebeat Modules** make it easier to collect and analyze logs for specific types like `nginx`, `system`, or `apache`.

```json
# List available modules
filebeat modules list

# Enable a module, e.g., nginx
filebeat modules enable nginx
```

Modify file paths (`paths`) in the module configuration:

```json
- module: nginx
  access:
    enabled: true
    var.paths: ["/var/log/nginx/access.log*"]
```

If no ready-made module exists, you can configure **inputs manually** in `filebeat.yml` to specify the files to read.

***

## 5️⃣ Setting Up Assets

To load index templates and dashboards beforehand:

```json
sudo filebeat setup -e
```

> `-e` sends output to stdout instead of logging to files.

***

## 6️⃣ Running Filebeat

**On Ubuntu/Debian:**

```json
sudo service filebeat start
```

Check service status:

```json
sudo service filebeat status
```

Alternative: run in foreground (useful for testing):

```json
sudo filebeat -e -c /etc/filebeat/filebeat.yml
```

> Filebeat now starts reading files and sending them to Elasticsearch or Logstash depending on your configuration.

***

## 7️⃣ Testing and Verifying Filebeat

### A. Syntax Check

Before running, make sure configurations and modules are free of syntax errors:

```json
sudo filebeat test config
```

> Checks `/etc/filebeat/filebeat.yml` and module files. Useful to prevent errors before starting the service.

### B. Test Output Connection (Elasticsearch)

Ensure Filebeat can communicate with Elasticsearch:

```json
sudo filebeat test output
```

> It tests the specified output (e.g., `output.elasticsearch`), showing connection details, TLS/handshake, and Elasticsearch version.

Example of a successful connection:

```json
elasticsearch: https://localhost:9200...
  parse url... OK
  connection...
    parse host... OK
    dns lookup... OK
    addresses: 127.0.0.1
    dial up... OK
  TLS...
    security... WARN server's certificate chain verification is disabled
    handshake... OK
    TLS version: TLSv1.3
    dial up... OK
  talk to server... OK
  version: 9.1.3
```

### C. Setup Dashboards and Ingest Pipelines

Prepare Elasticsearch and Kibana with prebuilt assets:

```json
sudo filebeat setup -e
```

Filebeat creates:

* Index templates / ILM in Elasticsearch

* Ingest pipelines for log parsing

* Kibana dashboards for visualization and analysis

> `-e` directs logs to stdout during testing.

### D. Run Filebeat as a Service

```json
sudo systemctl start filebeat
sudo systemctl enable filebeat
sudo systemctl status filebeat
```

* `start`: Run Filebeat now

* `enable`: Auto-start on boot

* `status`: Show running state (active or failed)

### E. Monitor Logs Directly

To follow Filebeat activity live:

```json
journalctl -u filebeat -f
# or
tail -f /var/log/filebeat/filebeat
```

> `-f` follows logs in real-time, useful for diagnosing connection or parsing issues.

### F. Confirm Kibana Integration

Make sure you ran:

```json
sudo filebeat setup -e
```

Check `username/password` in `filebeat.yml` are correct.

Test:

```json
sudo filebeat test output
```

> Should show: `Connection successful`

### G. Viewing Data in Dashboards

Open **Kibana → Analytics → Dashboards → Overview**.\
You’ll find panels like Top Hosts, Events per Module, Logs Count Over Time.

To filter data from your device, search by hostname:

```json
host.name : YourHostName
```

> If results appear, Filebeat is working and sending data correctly.

***

## 8️⃣ Viewing Data in Kibana

Open **Kibana → Discover** and ensure the index `filebeat-*` exists.\
Use prebuilt dashboards for analysis and visualization.

> Tip: If no data appears, adjust the **Time Filter** to cover the time when files were first read.

✅ After these steps, Filebeat is ready to run on your system, collecting log files and sending them to Elasticsearch or Logstash.

***

***

***

***

## **1️⃣ المتطلبات الأساسية**

قبل تثبيت Filebeat، تأكد من الآتي:

* عندك **Elasticsearch** و **Kibana** جاهزين (للتخزين والعرض).

* صلاحيات **root** أو sudo على الجهاز.

* اتصال بالإنترنت لتحميل الحزم.

***

## **1️⃣ المتطلبات الأساسية**

قبل تثبيت Filebeat، تأكد من الآتي:

* عندك **Elasticsearch** و **Kibana** جاهزين (للتخزين والعرض).

* صلاحيات **root** أو sudo على الجهاز.

* اتصال بالإنترنت لتحميل الحزم.

***

## **2️⃣ تحميل وتثبيت Filebeat**

### **لنظام Ubuntu/Debian (DEB)**

```sh
# تحميل ملف الـ deb من موقع Elastic الرسمي
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-9.1.5-amd64.deb

# تثبيت الحزمة
sudo dpkg -i filebeat-9.1.5-amd64.deb
```

### **لنظام RedHat/CentOS (RPM)**

```sh
# تحميل ملف الـ rpm من موقع Elastic الرسمي
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-9.1.5-x86_64.rpm

# تثبيت الحزمة
sudo rpm -vi filebeat-9.1.5-x86_64.rpm
```

> 🔹 نسخة MacOS و Windows متاحة على موقع Elastic إذا كنت تحتاجها.

***

## **3️⃣ إعداد الاتصال مع Elasticsearch و Kibana**

* افتح ملف الإعداد الرئيسي:

```sh
sudo nano /etc/filebeat/filebeat.yml
```

* إذا كنت تستخدم **Elastic Cloud Hosted**:

```yaml
cloud.id: "YOUR_CLOUD_ID"
cloud.auth: "filebeat_setup:YOUR_PASSWORD"
```

* إذا كنت تستخدم **Elasticsearch محلي (Self-managed)**:

```yaml
output.elasticsearch:
  hosts: ["elasticsearch hosts"]
  protocol: https
  ssl.enabled: true
  ssl.verification_mode: none  # Self-signed certificates
  username: ""
  password: ""
  
setup.kibana:
  host: "https://192.168.1.66:5601"
  ssl.verification_mode: none  # Self-signed certificates
```

> ملاحظة: إذا كنت تريد إرسال البيانات لـ **Logstash** بدل Elasticsearch، سنعدل الـ output لاحقًا.

***

## **4️⃣ جمع البيانات (Log Data)**

* **Filebeat Modules**: تسهّل جمع وتحليل logs لأنواع محددة مثل nginx، system، apache.

```sh
# عرض قائمة الوحدات المتاحة
filebeat modules list

# تفعيل وحدة معينة، مثلا nginx
filebeat modules enable nginx
```

* **تعديل مسارات الملفات (paths)** داخل config الوحدة:

```sh
- module: nginx
  access:
    enabled: true
    var.paths: ["/var/log/nginx/access.log*"]
```

* إذا لم يكن هناك وحدة جاهزة، يمكنك إعداد الـ **inputs يدويًا** في `filebeat.yml` لتحديد الملفات المطلوب قراءتها.

***

## **5️⃣ إعداد الـ Assets**

* لتحميل index templates وdashboards مسبقًا:

```sh
sudo filebeat setup -e
```

> `-e` يرسل المخرجات إلى الـ stdout بدل تسجيلها في logs.

***

## **6️⃣ تشغيل Filebeat**

* **على Ubuntu/Debian**:

```sh
sudo service filebeat start
```

* للتحقق من حالة الخدمة:

```sh
sudo service filebeat status
```

* **بديل للتشغيل في foreground** (مفيد للاختبار):

```sh
sudo filebeat -e -c /etc/filebeat/filebeat.yml
```

> Filebeat الآن يبدأ بقراءة الملفات وإرسالها إلى Elasticsearch أو Logstash حسب الإعداد.

***

## 7️⃣ اختبار وتشغيل Filebeat والتأكد من عمله\*\*

### **أ. التحقق من صحة الإعدادات (Syntax Check)**

قبل التشغيل، تأكد من أن ملفات الإعداد والـ modules خالية من الأخطاء النحوية:

```sh
sudo filebeat test config
```

* يتحقق من صحة `/etc/filebeat/filebeat.yml` وملفات الـ modules.

* مفيد لتجنب أي أخطاء قبل تشغيل الخدمة.

***

### **ب. اختبار الاتصال بالـ Output (Elasticsearch)**

تأكد أن Filebeat قادر على التواصل مع Elasticsearch:

```sh
sudo filebeat test output
```

* يجرب الاتصال بالـ output المحدد (مثل `output.elasticsearch`).

* يعرض تفاصيل الاتصال، TLS/Handshake، ونسخة Elasticsearch.

* مثال لنجاح الاتصال:

```sh
elasticsearch: https://localhost:9200...
  parse url... OK
  connection...
    parse host... OK
    dns lookup... OK
    addresses: 127.0.0.1
    dial up... OK
  TLS...
    security... WARN server's certificate chain verification is disabled
    handshake... OK
    TLS version: TLSv1.3
    dial up... OK
  talk to server... OK
  version: 9.1.3
```

***

### **ج. تهيئة Dashboards وIngest Pipelines**

لتجهيز Elasticsearch وKibana بالأدوات الجاهزة:

```sh
sudo filebeat setup -e
```

> يقوم Filebeat بإنشاء:

* **Index templates / ILM** في Elasticsearch

* **Ingest pipelines** لتحليل السجلات

* **Kibana dashboards** للعرض والتحليل

> `-e` لتوجيه اللوق إلى stdout أثناء التجربة.

***

### **د. تشغيل Filebeat كخدمة**

```sh
sudo systemctl start filebeat
sudo systemctl enable filebeat
sudo systemctl status filebeat
```

* `start`: تشغيل Filebeat الآن

* `enable`: تشغيل تلقائي عند الإقلاع

* `status`: عرض حالة التشغيل (`active` أو `failed`)

***

### **هـ. متابعة السجلات مباشرة**

لمتابعة عمل Filebeat بشكل مباشر:

```sh
journalctl -u filebeat -f
# أو
tail -f /var/log/filebeat/filebeat
```

> `-f` لمتابعة اللوق في الوقت الحقيقي، مهم لتحديد مشاكل الاتصال أو Parsing.

***

### **و. تأكيد الربط مع Kibana**

1. تأكد من أنك شغّلت:

```sh
sudo filebeat setup -e
```

2. تحقق من username/password في `filebeat.yml` وأنها صحيحة.

3. جرب:

```sh
sudo filebeat test output
```

* يجب أن يظهر: `Connection successful`

***

### **ز. عرض البيانات في Dashboards**

* افتح **Kibana → Analytics → Dashboards → Overview**

* ستجد Panels جاهزة مثل: **Top Hosts, Events per module, Logs count over time**

* لتأكيد أن البيانات من جهازك، ابحث باسم الـ hostname:

```sh
host.name : YourHostName
```

> إذا ظهرت النتائج، إذن Filebeat يعمل ويرسل البيانات بشكل صحيح.

***

## **8️⃣** عرض البيانات في Kibana\*\*

* افتح Kibana → **Discover** → تأكد أن الـ index `filebeat-*` موجود.

* استخدم **Dashboards** الجاهزة لتحليل وعرض البيانات.

> نصيحة: إذا لم تظهر بيانات، عدّل **Time filter** ليغطي وقت قراءة الملفات من البداية.

***

✅ بعد الخطوات دي، Filebeat جاهز للعمل على جهازك، وبيجمع البيانات من ملفات الـ log ويقدر يرسلها لـ Elasticsearch أو Logstash.

