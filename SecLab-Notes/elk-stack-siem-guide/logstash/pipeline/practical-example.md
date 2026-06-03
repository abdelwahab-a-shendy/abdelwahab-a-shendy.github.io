
***

***

***

***

* عندك **جهازين** (Windows وLinux).

* كل واحد عليه Beat مختلف:

  * ال **Winlogbeat** على Windows.

  * ال **Filebeat** على Linux.

* الاتنين بيبعتوا Logs إلى **Logstash** (على Linux).

* ال Logstash بيعمل:

  * إرسال البيانات إلى **Elasticsearch** (علشان الـ SIEM أو Kibana).

  * وتخزين نسخة من نفس البيانات في **ملف Backup** محلي على السيرفر.

***

## 🧱 أولاً: الهيكل العام

### 🔹 الأجهزة:

| الجهاز                    | النظام  | الأداة        | الوظيفة                                                                 |
| ------------------------- | ------- | ------------- | ----------------------------------------------------------------------- |
| Windows                   | Windows | Winlogbeat    | جمع سجلات النظام                                                        |
| Linux                     | Linux   | Filebeat      | جمع ملفات الـ Nginx أو syslog                                           |
| Linux (نفس الجهاز أو آخر) | Linux   | Logstash      | استقبال ومعالجة البيانات وإرسالها إلى Elasticsearch + حفظ نسخة احتياطية |
| أي مكان                   | —       | Elasticsearch | تخزين وتحليل البيانات                                                   |

***

## ⚙️ ثانياً: إعداد Beats

### على Windows — Winlogbeat config:

افتح ملف:

```powershell
C:\Program Files\Winlogbeat\winlogbeat.yml
```

ثم عدل:

```yaml
winlogbeat.event_logs:
  - name: Application
  - name: Security
  - name: System

output.logstash:
  hosts: ["192.168.1.10:5045"]   # IP السيرفر اللي عليه Logstash (Linux)
```

***

### 🐧 على Linux — Filebeat config:

افتح:

```sh
sudo nano /etc/filebeat/filebeat.yml
```

ثم عدل:

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/nginx/access.log
      - /var/log/nginx/error.log

output.logstash:
  hosts: ["192.168.1.10:5044"]   # نفس السيرفر (Linux)
```

***

## 🧩 ثالثاً: إعداد Logstash — على Linux

هنا هننشئ **2 Pipelines منفصلين** (واحد لملفات Linux، والتاني للـ Windows logs).

### 🗂️ ملف: `/etc/logstash/pipelines.yml`

```yaml
- pipeline.id: filebeat-pipeline
  path.config: "/etc/logstash/conf.d/filebeat-pipeline.conf"

- pipeline.id: winlogbeat-pipeline
  path.config: "/etc/logstash/conf.d/winlogbeat-pipeline.conf"
```

***

### 🧾 ملف 1: `/etc/logstash/conf.d/filebeat-pipeline.conf`

```yaml
input {
  beats {
    port => 5044
  }
}

filter {
  # مثال على فلتر بسيط لإضافة Tag
  mutate { add_tag => ["from_filebeat_linux"] }
}

output {
  # 1️⃣ إرسال إلى Elasticsearch
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "linux-filebeat-logs-%{+YYYY.MM.dd}"
  }

  # 2️⃣ حفظ نسخة احتياطية في ملف محلي
  file {
    path => "/var/log/logstash/backups/linux_logs-%{+YYYY-MM-dd}.json"
    codec => json_lines
  }

  # 3️⃣ إخراج إلى الكونسول (للتصحيح)
  stdout { codec => rubydebug }
}
```

***

### 🧾 ملف 2: `/etc/logstash/conf.d/winlogbeat-pipeline.conf`

```yaml
input {
  beats {
    port => 5045
  }
}

filter {
  mutate { add_tag => ["from_winlogbeat_windows"] }
}

output {
  # 1️⃣ إرسال إلى Elasticsearch
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "windows-winlogbeat-logs-%{+YYYY.MM.dd}"
  }

  # 2️⃣ حفظ نسخة احتياطية محلية
  file {
    path => "/var/log/logstash/backups/windows_logs-%{+YYYY-MM-dd}.json"
    codec => json_lines
  }

  # 3️⃣ إخراج إلى الكونسول
  stdout { codec => rubydebug }
}
```

***

## 📦 رابعاً: إنشاء مجلد الـ Backup

قبل تشغيل Logstash، أنشئ مجلد لحفظ النسخ الاحتياطية:

```sh
sudo mkdir -p /var/log/logstash/backups
sudo chmod 777 /var/log/logstash/backups
```

***

## 🚀 خامساً: تشغيل Logstash

```sh
sudo systemctl restart logstash
sudo systemctl enable logstash
```

تحقق من أنه يعمل:

```sh
sudo systemctl status logstash
```

***

## ✅ النتيجة النهائية

| المصدر               | الـ Input Port | الـ Index في Elasticsearch | مكان النسخة الاحتياطية                          |
| -------------------- | -------------- | -------------------------- | ----------------------------------------------- |
| Filebeat (Linux)     | 5044           | linux-filebeat-logs-\*     | `/var/log/logstash/backups/linux_logs-*.json`   |
| Winlogbeat (Windows) | 5045           | windows-winlogbeat-logs-\* | `/var/log/logstash/backups/windows_logs-*.json` |

