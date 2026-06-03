---
id: "69291662a88af8ce981f1a6a"
title: "Command Line"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/windows-server-labs-and/command-line"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-11-28T03:26:26.499Z"
updatedAt: "2026-01-25T15:35:47.057Z"
---

# TOP Command Line in Windows :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1764300444585/4989d804-6635-46f6-927e-5ef84104c13f.png" align="center" fullwidth="false" />

### 1. مفهوم سطر الأوامر

| **المصطلح**          | **الشرح المكتوب في الصورة**                                  | **الشرح المفصل**                                                               |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| **Command**          | أي أمر يُراد تنفيذه أو مهمة معينة                            | تعليمات محددة تُعطى لنظام التشغيل لتنفيذ مهمة ما.                              |
| **Shell**            | المترجم الذي يأخذ الـ Command ويحوله إلى شيء يفهمه الكمبيوتر | هو الواجهة التي تسمح للمستخدم بالتفاعل مع نظام التشغيل عن طريق الأوامر النصية. |
| **Term (Terminal)**  | أي نافذة يُكتب فيها Command ويتم تنفيذها                     | هو تطبيق الواجهة الرسومية الذي يستضيف Shell (مثل نافذة CMD).                   |
| **CMD / PowerShell** | أمثلة على الـ Shells (مفسرات الأوامر)                        | CMD هو Shell التقليدي لويندوز، و PowerShell هو Shell أكثر قوة ومرونة وحديث.    |

### 2. الأوامر الأساسية للتنقل والعرض

| **الأمر**     | **الشرح المكتوب في الصورة**                        | **الوظيفة**                                                    |
| ------------- | -------------------------------------------------- | -------------------------------------------------------------- |
| `dir`         | عرض ملفات المكان الذي أنت واقف عليه                | عرض قائمة بالملفات والمجلدات داخل المجلد الحالي.               |
| `dir ..`      | عرض ملفات الباث (Path) اللي قبل اللي أنت واقف عليه | عرض محتويات المجلد الأب (المجلد الذي يحتوي على المجلد الحالي). |
| `cls`         | Clean Screen                                       | مسح محتويات الشاشة لجعل الواجهة نظيفة.                         |
| `title MyCmd` | Change Title Top                                   | تغيير عنوان نافذة سطر الأوامر.                                 |
| `color a`     | Change color                                       | تغيير لون النص والخلفية في النافذة.                            |
| `cd`          | تغيير المسار/المجلد                                | الانتقال إلى مسار أو مجلد آخر.                                 |

### 3. أوامر إدارة الملفات والمجلدات

| **الأمر**                     | **الشرح المكتوب في الصورة** | **الوظيفة**                                                                                                |
| ----------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `mkdir F1 md "D:\New Folder"` | Create New Folder           | إنشاء مجلد جديد (يمكن استخدام `mkdir` أو اختصارها `md`).                                                   |
| `md F1 F2 F3 "New 3 Folder"`  |                             | إنشاء مجلدات متعددة في أمر واحد.                                                                           |
| `rm 2X 3X 4X`                 | Delete Many                 | حذف ملفات أو مجلدات متعددة (في CMD يتم استخدام `del` للملفات أو `rd` للمجلدات، و `rm` شائع في PowerShell). |
| `rmdir F1`                    | Delete One                  | حذف مجلد فارغ (اختصار لـ `remove directory`).                                                              |
| `ren sys.txt newsys.txt`      | Rename                      | إعادة تسمية ملف أو مجلد.                                                                                   |
| `copy sys.txt D:\`            | Copy                        | نسخ ملف من مكانه إلى مسار آخر.                                                                             |
| `move sys.txt D:\DN\sys.txt`  | Move And Cut                | نقل ملف من مكانه إلى مسار آخر (يشبه القص).                                                                 |

### 4. أوامر النظام والشبكة والتوجيه

| **الأمر**                                | **الشرح المكتوب في الصورة** | **الوظيفة**                                                                            |
| ---------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| `systeminfo`                             | عرض مواصفات الجهاز          | عرض معلومات مفصلة حول نظام التشغيل وعتاد الجهاز.                                       |
| `systeminfo > system.txt`                |                             | توجيه نتيجة الأمر `systeminfo` إلى ملف جديد باسم `system.txt`.                         |
| `echo hello CMD > Readoncmd.txt`         | لـ (كتابة) أو تخزين في ملف  | كتابة النص "hello CMD" داخل ملف `Readoncmd.txt` (ينشئ الملف إذا لم يكن موجوداً).       |
| `call Readoncmd.txt`                     | GUI as notepad              | فتح الملف `Readoncmd.txt` في برنامج المفكرة (أو البرنامج الافتراضي المرتبط بالامتداد). |
| `type Readoncmd.txt`                     | عرض لي الـ Term             | عرض محتويات ملف نصي مباشرة في نافذة سطر الأوامر.                                       |
| `ipconfig`                               |                             | عرض معلومات إعدادات الشبكة الحالية.                                                    |
| `ipconfig /all`                          |                             | عرض معلومات إعدادات الشبكة بالتفصيل (بما في ذلك خوادم DNS و MAC Address).              |
| `ipconfig /flushdns`                     |                             | مسح ذاكرة التخزين المؤقت لـ DNS على الجهاز.                                            |
| `ping `[`google.com`](http://google.com) |                             | اختبار الاتصال بموقع أو عنوان IP معين.                                                 |
| `shutdown`                               |                             | إيقاف تشغيل الكمبيوتر.                                                                 |

### 5. أدوات تشغيل سطر الأوامر

* **تشغيل CMD:** يظهر أنه يمكن تشغيله من **Start** وكتابة `cmd`.

* **تشغيل Terminal:** يمكن تشغيل الـ Term عن طريق استخدام **properties** (خصائص).

* `exit`: أمر للخروج وإغلاق نافذة سطر الأوامر.

* `Tab`: **ظلل الـ Tab** (أو **Tab**): يُستخدم زر **Tab** للإكمال التلقائي للأوامر وأسماء الملفات والمجلدات، مما يوفر الوقت ويقلل من الأخطاء الإملائية.

***

***

***

# 🔵 **1) إدارة النظام (System Management – CMD & PowerShell)**

## 📌 **معلومات النظام**

```powershell
systeminfo               ← عرض معلومات النظام بالكامل
hostname                 ← عرض اسم الجهاز
whoami                   ← معرفة المستخدم الحالي
ver                      ← عرض إصدار ويندوز
wmic os get name         ← معرفة نسخة النظام
```

## 📌 **العمليات (Processes)**

```powershell
tasklist                    ← عرض جميع العمليات
tasklist /svc               ← العمليات + الخدمات
taskkill /PID <id> /F       ← إنهاء عملية بالقوة
taskkill /IM notepad.exe /F

Get-Process                 ← عرض العمليات PowerShell
Stop-Process -Name notepad  ← إيقاف عملية
```

### PowerShell :

```powershell
Get-Service
Start-Service -Name "Spooler"
Stop-Service -Name "Spooler"
Restart-Service -Name "Spooler"
Set-Service -Name "Spooler" -StartupType Automatic
```

### CMD :

```sh
tasklist
tasklist /svc
taskkill /IM notepad.exe /F
taskkill /PID 1234 /F
```

## 📌 **إيقاف / إعادة تشغيل**

```powershell
shutdown /s /t 0     ← إيقاف فورًا
shutdown /r /t 0     ← إعادة تشغيل
shutdown /l          ← تسجيل خروج
shutdown /a          ← إلغاء الإيقاف
shutdown /r /t 60 /c "Restart in 1 minute"
```

***

# 🟣 **2) إدارة الملفات والمجلدات (CMD & PowerShell)**

## 📌 **أساسيات الملفات**

```powershell
dir                        # عرض الملفات
cd <path>                  # تغيير مجلد
cd..                       # رجوع خطوة
mkdir folder               # إنشاء مجلد
rmdir folder               # حذف مجلد
copy a.txt b.txt           # نسخ
move a b                   # نقل أو إعادة تسمية
del file.txt               # حذف ملف
ren old new                # إعادة تسمية
```

***

# 🌐 **3) أوامر الشبكات (Networking – CMD)**

## 📌 **إعدادات الشبكة**

```powershell
ipconfig               ← عرض IP
ipconfig /all          ← عرض تفاصيل الشبكة
ipconfig /release      ← تحرير IP
ipconfig /renew        ← تجديد IP
ipconfig /flushdns     ← مسح DNS
ipconfig /displaydns   ← عرض DNS Cache
```

## 📌 **اختبارات الشبكة**

```powershell
ping <IP/Domain>              ← اختبار الاتصال
ping google.com               ← اختبار Ping
ping -t 192.168.1.1           ← Ping مستمر
tracert google.com            ← تتبع المسار
pathping google.com           ← تتبع + تحليل
nslookup domain.com           ← تحليل DNS
```

## 📌 **الاتصالات والمنافذ**

```powershell
netstat -ano              ← جميع الاتصالات + PID
netstat -r                ← جدول التوجيه
nslookup domain.com       ← تحليل DNS
```

***

# 🏢 **4) Active Directory (AD DS)**

## ⭐ **تثبيت AD DS – PowerShell**

```powershell
Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
Install-ADDSForest -DomainName "company.com"
Install-ADDSForest -DomainName "company.local"
```

## ⭐ **إدارة المستخدمين (PowerShell)**

```powershell
Get-ADUser -Filter *                      # كل المستخدمين
New-ADUser -Name "Ahmed" -SamAccountName ahmed -Enabled $true
Set-ADUser -Identity ahmed -Department "IT"
Remove-ADUser -Identity ahmed
Enable-ADAccount -Identity ahmed
Disable-ADAccount -Identity ahmed
```

## ⭐ **إدارة المجموعات**

```powershell
New-ADGroup -Name "IT Admins" -GroupScope Global
Add-ADGroupMember -Identity "IT Admins" -Members "ahmed"
Get-ADGroupMember "IT Admins"
Remove-ADGroupMember "IT Admins" ahmed -Confirm:$false
```

## ⭐ **إدارة الكمبيوترات**

```powershell
Get-ADComputer -Filter *
Get-ADComputer -Filter "Name -like 'PC-*'"
Add-ADComputer -Name "PC-001"
```

## ⭐ **أوامر CMD القديمة**

```powershell
dsquery user
dsadd user ...
dsmod group ...
dsrm "CN=John,..."
```

***

# 🌐 **5) DNS Administration**

## ⭐ **PowerShell**

```powershell
Get-DnsServerResourceRecord -ZoneName "company.com"
Add-DnsServerResourceRecordA -Name server1 -ZoneName company.com -IPv4Address 192.168.1.10
Add-DnsServerResourceRecordCName -Name www -ZoneName company.com -HostNameAlias server1.company.com
Add-DnsServerPrimaryZone -Name branch.company.com -ZoneFile "branch.company.com.dns"
```

## ⭐ **CMD**

```powershell
dnscmd /info
dnscmd /zoneadd branch.company.com /primary
dnscmd /recordadd company.com server1 A 192.168.1.10
```

***

# 📡 **6) DHCP Administration**

## ⭐ **PowerShell**

```powershell
Get-DhcpServerv4Scope

Add-DhcpServerv4Scope -Name "Main" -StartRange 192.168.1.100 -EndRange 200 -SubnetMask 255.255.255.0

Get-DhcpServerv4Lease -ScopeId 192.168.1.0

Add-DhcpServerv4Reservation -ScopeId 192.168.1.0 -IPAddress 192.168.1.50 -ClientId "AA-BB-CC-DD-EE-FF"
```

## ⭐ **CMD**

```sh
netsh dhcp server show scope
netsh dhcp server add scope 192.168.1.0 255.255.255.0
netsh dhcp server scope 192.168.1.0 set state 1
```

***

# 💾 7) Storage and disk management

```powershell
Get-Disk
Initialize-Disk -Number 1 -PartitionStyle GPT
New-Partition -DiskNumber 1 -DriveLetter F -Size 10GB
Format-Volume -DriveLetter F -FileSystem NTFS
```

## **📌 CMD (DiskPart)**

```sh
diskpart
list disk
select disk 1
clean
create partition primary
format fs=ntfs quick
assign letter=G
```

***

# 🔒 **7) Firewall & Security Commands**

## ⭐ **PowerShell**

```powershell
Get-NetFirewallRule
New-NetFirewallRule -DisplayName "Allow Web" -Protocol TCP -LocalPort 80 -Action Allow
Set-NetFirewallProfile -Profile Domain,Private,Public -Enabled False
```

## ⭐ **CMD**

```sh
netsh advfirewall show allprofiles
netsh advfirewall firewall add rule name="Allow ICMP" protocol=icmpv4:8,any dir=in action=allow
netsh advfirewall set allprofiles state off
```

## **📌 السجلات (Event Logs)**

```powershell
Get-EventLog -LogName System -Newest 20
Get-WinEvent -FilterHashtable @{LogName='Security'; StartTime=(Get-Date).AddHours(-1)}
```

***

# 📋 **8) Group Policy (GPO)**

```sh
gpupdate /force
gpresult /r
gpresult /h C:\result.html
gpresult /user username /v
```

***

# 🖥️ **9) Hyper-V Management (PowerShell)**

```sh
Get-VM
New-VM -Name "WebServer" -MemoryStartupBytes 2GB -NewVHDPath "C:\VMs\WS.vhdx" -NewVHDSizeBytes 40GB
Start-VM WebServer
Stop-VM WebServer -Force
Set-VM -Name WebServer -ProcessorCount 2 -MemoryStartupBytes 4GB
```

***

# 🛠️ **10) System Maintenance**

```sh
sfc /scannow                 # إصلاح النظام
chkdsk C: /f /r              # إصلاح القرص
defrag C: /O                 # إلغاء تجزئة
cleanmgr                     # تنظيف القرص
```

***

# 💾 **11) Backup & Recovery**

```sh
wbadmin start backup -backupTarget:E: -include:C: -quiet
wbadmin get versions
wbadmin start recovery -version:<id> -itemType:File -items:C:\Data -quiet
```

***

# 🚨 **12) Emergency & Session Control**

```sh
query user
logoff 1
net session
net session \\IP /delete
```

***

# 💡 **13) PowerShell Tips**

```powershell
Get-Help Get-ADUser -Examples
Get-Command *ADUser*
Get-Service | Where-Object {$_.Status -eq "Running"}
Export-CSV C:\users.csv
```

