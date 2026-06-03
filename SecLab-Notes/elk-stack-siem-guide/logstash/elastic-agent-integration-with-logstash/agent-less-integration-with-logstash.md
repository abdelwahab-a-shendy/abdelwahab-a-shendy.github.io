---
id: "68f4504d4ae613e5b176c169"
title: "Agent-less Integration with Logstash"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/elk-stack-siem-guide/logstash/elastic-agent-integration-with-logstash/agent-less-integration-with-logstash"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-19T02:43:25.693Z"
updatedAt: "2026-01-25T15:35:47.099Z"
---

## ⚙️ **Agent-less Integration with Logstash**

When we say **Agent-less integration**, it means you don’t use an Elastic Agent or any other agent to collect data — instead, the data is sent **directly to Logstash** from the source itself (like a server, network device, or application).

***

## 🧩 **What Does “Agent-less” Mean?**

🔹 **"Agent-less"** = No Agent software installed on the devices.\
Instead of an agent (like Elastic Agent or Filebeat) collecting and sending logs,\
the logs are sent directly to Logstash using other protocols or transport methods.

***

## 📘 **Examples of Agent-less Integration:**

| Source Type             | Method                   | Description                                                                                             |
| ----------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| **Syslog Server**       | Uses UDP or TCP protocol | Devices (like Firewalls, Routers, or Linux servers) send logs directly to Logstash via the syslog port. |
| **Web Servers**         | Through File Input       | Logstash reads log files (like Apache or Nginx) from a local path without using an Agent.               |
| **Network Devices**     | Via UDP/TCP Input        | Network devices send their data to Logstash through open ports.                                         |
| **APIs / Applications** | Via HTTP Input Plugin    | Applications send events to Logstash through a REST API endpoint.                                       |

***

## 🧰 **Simple Practical Example: Syslog Agent-less Integration**

📄 **Logstash configuration file:**

```bash
input {
  tcp {
    port => 514
    type => "syslog"
  }
}

filter {
  grok {
    match => { "message" => "%{SYSLOGBASE}" }
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "syslog-%{+YYYY.MM.dd}"
  }
}
```

***

🔹 **In this scenario:**

* No Elastic Agent is installed on the devices.

* Each device (Firewall, Router, Linux Server) sends logs directly to the Logstash IP on port 514.

* Logstash processes the data and stores it in Elasticsearch.

***

💡 **When to Use Agent-less Integration?**

Use it when:

* Devices don’t support installing Elastic Agent (like network appliances or legacy systems).

* You want to collect logs centrally from multiple devices via Syslog.

* You need a lightweight or fast setup without deploying agents.

***

***

***

***

## ⚙️ **Agent-less Integration with Logstash**

يعني لما نقول **Agent-less integration** → المقصود إنك **ما تستخدمش Elastic Agent أو أي Agent آخر** لجمع البيانات،\
لكن البيانات بتوصل لـ **Logstash مباشرة من المصدر نفسه** (مثل سيرفر، جهاز شبكة، أو تطبيق).

***

### 🧩 **ما معنى Agent-less؟**

🔹 "Agent-less" = بدون وجود برنامج Agent منصب على الأجهزة.\
بدل ما الـ Agent (زي Elastic Agent أو Filebeat) يجمع الـ Logs ويرسلها،\
يتم إرسال الـ Logs **مباشرة** إلى Logstash باستخدام بروتوكولات أو طرق نقل أخرى.

***

### 📘 **أمثلة على Agent-less Integration:**

| نوع المصدر              | الطريقة                        | الوصف                                                                                                 |
| ----------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Syslog Server**       | يستخدم بروتوكول **UDP أو TCP** | الأجهزة (مثل Firewalls، Routers، أو Linux servers) ترسل الـ Logs مباشرة إلى Logstash عبر منفذ syslog. |
| **Web Servers**         | عبر **File Input**             | Logstash يقرأ ملفات الـ logs (مثل Apache أو Nginx) من مسار محلي بدون Agent.                           |
| **Network Devices**     | عبر **UDP/TCP Input**          | الأجهزة الشبكية ترسل بياناتها إلى Logstash عبر المنافذ المفتوحة.                                      |
| **APIs / Applications** | عبر **HTTP Input Plugin**      | التطبيقات ترسل الأحداث (Events) لـ Logstash عبر REST API endpoint.                                    |

***

### 🧰 **مثال عملي بسيط: Syslog Agent-less Integration**

📄 **في Logstash config file:**

```ruby
input {
  tcp {
    port => 514
    type => "syslog"
  }
}

filter {
  grok {
    match => { "message" => "%{SYSLOGBASE}" }
  }
}

output {
  elasticsearch {
    hosts => ["http://localhost:9200"]
    index => "syslog-%{+YYYY.MM.dd}"
  }
}
```

🔹 في هذا السيناريو:

* لا يوجد **Elastic Agent** على الأجهزة.

* كل جهاز (Firewall, Router, Linux Server) يرسل logs إلى IP Logstash مباشرة على المنفذ 514.

* Logstash يعالج البيانات ويخزنها في Elasticsearch.

***

### 💡 **متى تستخدم Agent-less Integration؟**

استخدمها عندما:

* الأجهزة لا تدعم تثبيت Elastic Agent (مثل أجهزة الشبكات أو الأنظمة القديمة).

* تريد تجميع logs مركزياً من عدة أجهزة عبر syslog.

* تحتاج بيئة خفيفة أو سريعة بدون نشر Agents.

