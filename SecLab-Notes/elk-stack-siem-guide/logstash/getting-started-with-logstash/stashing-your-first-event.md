
# 🚀 **Stashing Your First Event — Your First Logstash Experience**

## 🧩 **Concept Overview**

Every **Logstash Pipeline** consists of three main components:

1. **Input** → The data source (e.g., `stdin`, file, or agent)

2. **Filter (optional)** → Used to modify or clean the data

3. **Output** → The destination where the processed data will be sent (e.g., `stdout` or Elasticsearch)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760836153611/6937a133-aa93-4d11-a59c-8c121aecdb42.png" alt="" align="center" fullwidth="true" />

***

## 🔹 **Basic Pipeline Test**

### 📦 On **Linux / macOS:**

```bash
cd logstash-9.0.0
bin/logstash -e 'input { stdin { } } output { stdout {} }'

# The one installed via APT does not download into `/opt` or `/bin`
# Rather, it is in the standard system path under `/usr/share/logstash` and its files are in `/etc/logstash`
cd /usr/share/logstash/bin

# Create the data directory if it doesn't exist
mkdir -p /usr/share/logstash/data

# Change ownership of the data directory to the current user
sudo chown -R $USER:$USER /usr/share/logstash/data

# Run Logstash as a regular user
./logstash -e 'input { stdin { } } output { stdout { } }'
```

### 📦 On **Windows:**

```bash
cd logstash-9.0.0
.\bin\logstash.bat -e "input { stdin { } } output { stdout {} }"
```

🔸 The `-e` flag means:

> “Provide the Logstash configuration directly from the command line instead of using a config file.”

***

## ⚙️ **Explanation of the Configuration**

```bash
input { stdin { } }    # Input comes from the keyboard (Standard Input)
output { stdout {} }   # Output is displayed on the screen (Standard Output)
```

In simple terms:

> Anything you type into the terminal passes through the pipeline and is displayed in a formatted way on the same screen.

***

## 🧠 **Practical Example**

After running the command, wait until you see:

```css
[INFO ]  ... Pipeline main started
|
|[INFO ] 2025-10-19 15:11:00.072 [Agent thread] agent - Pipelines running {:count=>1, :running_pipelines=>[:main], :non_running_pipelines=>[]}
```

Then type something like:

```bash
Hello Abdelwahab
```

You’ll see output similar to this:

```json
{
       "message" => "Hello Abdelwahab",
          "host" => {
        "hostname" => "lab-elk-n8n-VirtualBox"
    },
      "@version" => "1",
    "@timestamp" => 2025-10-19T12:14:03.275622350Z,
         "event" => {
        "original" => "Hello Abdelwahab"
    }
}
```

📌 Logstash automatically adds:

* **Timestamp** (when the input was received)

* **IP Address**

* **The original message**

***

## 🧩 **Stopping Logstash**

To end the test, press `CTRL + D`.

***

### 🎉 **Result**

Congratulations! 🎯\
You’ve successfully created and run your first **basic Logstash pipeline** ✅

The next step is to build a **real pipeline from a configuration file** instead of using the command line — for example:

```bash
input {
  file { path => "/var/log/syslog" }
}
filter {
  grok { match => { "message" => "%{SYSLOGBASE}" } }
}
output {
  elasticsearch { hosts => ["localhost:9200"] }
}
```

ده هيسمح لك:

1. ال Logstash يقرأ `/var/log/syslog`.

2. يحلل كل سطر ويستخرج الحقول الأساسية زي timestamp وhost وmessage.

3. يرسل البيانات لـ Elasticsearch عشان تقدر تبحث فيها وتعمل dashboards على Kibana.

***

***

***

***

***

## 🚀 **Stashing Your First Event — أول تجربة باستخدام Logstash**

### 🧩 فكرة التجربة:

كل **Logstash Pipeline** بيتكوّن من:

1. ال **Input** → مصدر البيانات (زي stdin أو ملف أو agent)

2. ال **Filter (اختياري)** → تعديل أو تنقية البيانات

3. ال **Output** → الوجهة اللي البيانات هتروح لها (زي stdout أو Elasticsearch)

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1760836153611/6937a133-aa93-4d11-a59c-8c121aecdb42.png" alt="" align="center" fullwidth="true" />

***

### 🔹 **الاختبار الأساسي (Basic Pipeline)**

#### 📦 على **Linux / macOS:**

```sh
cd logstash-9.0.0
bin/logstash -e 'input { stdin { } } output { stdout {} }'

# اللي بيتثبت عن طريق APT مش بينزل داخل `/opt` ولا `/bin`
# بل بيكون في مسار النظام القياسي تحت `/usr/share/logstash` وملفاته في `/etc/logstash`
cd /usr/share/logstash/bin

# اعمل مجلد البيانات لو مش موجود
mkdir -p /usr/share/logstash/data

# غير ملكية مجلد البيانات للمستخدم الحالي
sudo chown -R $USER:$USER /usr/share/logstash/data

# شغل Logstash كمستخدم عادي
./logstash -e 'input { stdin { } } output { stdout {} }'
```

#### 📦 على **Windows:**

```sh
cd logstash-9.0.0
.\bin\logstash.bat -e "input { stdin { } } output { stdout {} }"
```

🔸 الـ `-e` معناها:

> “أدخل إعداد Logstash مباشرة من سطر الأوامر بدل ما تكتب ملف إعدادات.”

***

### ⚙️ **شرح الإعداد اللي استخدمناه:**

```sh
input { stdin { } }    # الـ input من لوحة المفاتيح (Standard Input)
output { stdout {} }   # الـ output يعرض على الشاشة (Standard Output)
```

يعني باختصار :

> أي حاجة تكتبها في الـ terminal هتمر من الـ pipeline وتُعرض بشكل منسق في نفس الشاشة.

***

### 🧠 **مثال عملي**

بعد ما تشغل الأمر، انتظر حتى يظهر :

```css
[INFO ]  ... Pipeline main started
|
|[INFO ] 2025-10-19 15:11:00.072 [Agent thread] agent - Pipelines running {:count=>1, :running_pipelines=>[:main], :non_running_pipelines=>[]}
```

بعدها اكتب مثلًا :

```sh
Hello Abdelwahab
```

هيظهر الناتج كده :

```sh
{
       "message" => "Hello Abdelwahab",
          "host" => {
        "hostname" => "lab-elk-n8n-VirtualBox"
    },
      "@version" => "1",
    "@timestamp" => 2025-10-19T12:14:03.275622350Z,
         "event" => {
        "original" => "Hello Abdelwahab"
    }
}
```

📌 Logstash أضاف:

* **Timestamp** (وقت الإدخال)

* **IP Address**

* **الرسالة نفسها**

***

### 🧩 **إيقاف Logstash**

لإنهاء التجربة، اضغط => `CTRL + D`

***

### 🎉 **النتيجة:**

مبروك! 🎯\
كده أنت أنشأت وشغلت أول **Logstash Pipeline بسيط** بنجاح ✅\
الخطوة الجاية هي إنشاء **Pipeline حقيقي من ملف إعداد** بدل من سطر الأوامر — زي:

```sh
input {
  file { path => "/var/log/syslog" }
}
filter {
  grok { match => { "message" => "%{SYSLOGBASE}" } }
}
output {
  elasticsearch { hosts => ["localhost:9200"] }
}
```

This will allow you to:

1. Logstash reads `/var/log/syslog`.

2. Parse each line and extract key fields like timestamp, host, and message.

3. Send the data to Elasticsearch so you can search and create dashboards in Kibana.

