
## 🎯 **Lesson Objective**

Learn how to extract and analyze **metadata** from digital images using tools such as:

* `exiftool`

* `exif`

To understand:

* When and where the image was taken

* Type of device used

* Camera settings

* Whether the image was modified

* And other valuable information in digital forensics investigations.

***

## 🧠 **What is EXIF?**

**EXIF = Exchangeable Image File Format**\
It’s a standard format for storing metadata within image files (especially JPG, JPEG, TIFF).

| Type            | Example                      |
| --------------- | ---------------------------- |
| Camera used     | iPhone 13, Canon EOS         |
| Capture time    | 2025:07:20 18:35:11          |
| Camera settings | ISO, Shutter Speed, Aperture |
| Geolocation     | GPS coordinates              |
| Software used   | Photoshop, Camera App        |

***

## 🔍 **Practical Example for Image Analysis**

```bash
exiftool image.jpg
```

### Sample Output:

```yaml
File Name           : image.jpg
Make                : Apple
Model               : iPhone 13
Date/Time Original  : 2025:07:20 18:35:11
GPS Latitude        : 30 deg 2' 40.20" N
GPS Longitude       : 31 deg 14' 8.40" E
Software            : Adobe Photoshop 25.0
```

***

## 🧠 **Importance of Image Analysis in Digital Forensics**

* An image may seem ordinary, but hidden EXIF data can reveal:

  * When and where it was taken

  * Type of phone or camera

  * If it was modified

  * If GPS location is embedded

> In some cases, metadata was a **crucial piece of evidence** to confirm or deny a suspect's involvement.

***

## 🧰 **Tools Used**

| Tool       | Function                                                         |
| ---------- | ---------------------------------------------------------------- |
| `stat`     | Displays file system metadata (creation/modification/access)     |
| `exif`     | Shows basic EXIF data only                                       |
| `exiftool` | The most powerful tool for detailed EXIF, IPTC, and XMP analysis |

***

#### 🔧 **Installing the Tools**

```bash
sudo apt update 

sudo apt install exif exiftool
```

#### 📂 **Navigate to the Target Image**

```bash
cd ~/Desktop/DigitalForensics
```

#### 📤 **Run** `exiftool` on the Image

```bash
exiftool trip_photo.jpg
```

#### ✅ Key Output from `exiftool`:

| Metadata Type            | Example                    | Description                       |
| ------------------------ | -------------------------- | --------------------------------- |
| `Date/Time Original`     | 2024:06:30 09:00:00        | Time the photo was taken          |
| `Modify Date`            | 2024:07:02 15:45:30        | Last time the file was modified   |
| `Make / Model`           | Samsung / Galaxy S22 Ultra | Type of phone or camera           |
| `Software`               | G998BXXU9EWF3              | Software or OS used               |
| `Orientation`            | Rotate 90 CW               | Image orientation while capturing |
| `GPS Latitude/Longitude` | 34.0211, -6.8343           | GPS location at capture           |
| `ISO / Exposure Time`    | ISO 100 / 1/125 sec        | Technical camera settings         |

***

#### 📝 **Comparison:** `stat` vs `exiftool`

| Tool       | Data Extracted                         | Typical Usage                            |
| ---------- | -------------------------------------- | ---------------------------------------- |
| `stat`     | File system data (Access, Modify)      | Identify date of access/transfer/editing |
| `exiftool` | Original image capture metadata (EXIF) | Understand time, location, device used   |

***

## 🛑 **Important Security Notes**

* Apps like WhatsApp and Facebook automatically strip EXIF data from uploaded images.

* Criminals may delete metadata before sharing images.

* Some editing software (like Photoshop) may retain or alter EXIF data.

***

## 📍 **Using GPS Metadata**

* Identify the **exact geographic location** of the image

* Link the image to:

  * Crime scene location

  * Suspect’s movement history

  * Nearby surveillance cameras

> If GPS data is missing, tools like **Google Images** or **TinEye** can be used for visual location identification.

***

## 🕵️‍♂️ **Applied Case Study**

**Image:** `trip_photo.jpg`\
**EXIF Analysis:**

* Capture date: June 30, 2024 – 09:00 AM

* Device: Samsung Galaxy S22 Ultra

* Location: Casablanca, Morocco (via GPS)

* Modification: No signs of editing

**Conclusion:**

* The image was captured with a specific device at a specific time and place.

* The device matches what was found with the suspect.

* Thus, the image serves as **authenticated digital evidence**.

***

## ✅ **Quick Summary**

| Aspect                  | Tool                         | Practical Value                                 |
| ----------------------- | ---------------------------- | ----------------------------------------------- |
| File timestamps         | `stat`                       | Creation and modification dates on the system   |
| Capture time & location | `exiftool`                   | Original image metadata                         |
| Geolocation             | EXIF or Reverse Image Search | Determine the place                             |
| Device type             | `Make / Model`               | Match with suspect’s device                     |
| Contextual analysis     | Comprehensive analysis       | Combine digital, temporal, and spatial evidence |

***

## 🧠 **Conclusion: Forensics Investigator Tips**

* **Look beyond the image itself — analyze what's behind it.**

* **Metadata** can incriminate or exonerate.

* Don’t rely on `stat` alone — use specialized tools like `exiftool`.

***

***

# 🖼️ تحليل الصور باستخدام `exiftool` و `exif` في لينكس

## 🎯 **هدف الدرس**

تعلم كيفية استخراج وتحليل **البيانات الوصفية (Metadata)** من الصور الرقمية باستخدام أدوات مثل:

* `exiftool`

* `exif`

لفهم:

* وقت ومكان التقاط الصورة

* نوع الجهاز المُستخدم

* إعدادات التصوير

* هل تم تعديل الصورة؟

* ومعلومات أخرى ذات قيمة في التحقيق الجنائي الرقمي.

***

## 🧠 **ما هو EXIF؟**

**EXIF = Exchangeable Image File Format**\
وهو تنسيق قياسي لتخزين البيانات الوصفية داخل ملفات الصور (خاصة JPG, JPEG, TIFF).

| النوع              | مثال                         |
| ------------------ | ---------------------------- |
| الكاميرا المستخدمة | iPhone 13, Canon EOS         |
| وقت الالتقاط       | 2025:07:20 18:35:11          |
| إعدادات الكاميرا   | ISO, Shutter Speed, Aperture |
| الموقع الجغرافي    | GPS coordinates              |
| السوفتوير المستخدم | Photoshop, Camera App        |

## 🔍 **مثال عملي لتحليل صورة**

```bash
exiftool image.jpg
```

### مخرجات محتملة:

```yaml
File Name           : image.jpg
Make                : Apple
Model               : iPhone 13
Date/Time Original  : 2025:07:20 18:35:11
GPS Latitude        : 30 deg 2' 40.20" N
GPS Longitude       : 31 deg 14' 8.40" E
Software            : Adobe Photoshop 25.0
```

***

## 🧠 **أهمية تحليل الصور في التحقيق الجنائي الرقمي**

* قد تبدو الصورة ملفًا عاديًا، لكن البيانات المخبأة (EXIF) قد تكشف:

  * متى وأين التُقطت

  * نوع الهاتف أو الكاميرا

  * هل تم تعديلها؟

  * هل تتضمن موقع GPS؟

> في بعض القضايا، شكّلت الميتاداتا دليلًا حاسمًا لإثبات أو نفي التهمة عن المشتبه به.

***

## 🧰 **الأدوات المستخدمة**

| الأداة     | الوظيفة                                              |
| ---------- | ---------------------------------------------------- |
| `stat`     | يعرض بيانات نظام الملفات (إنشاء / تعديل / فتح الملف) |
| `exif`     | يعرض بيانات EXIF الأساسية فقط                        |
| `exiftool` | أقوى أداة لتحليل شامل لبيانات EXIF و IPTC و XMP      |

***

#### 🔧 **تثبيت الأدوات**

```bash
sudo apt update 

sudo apt install exif exiftool
```

#### 📂 **التنقل إلى الصورة المطلوبة**

```bash
cd ~/Desktop/DigitalForensics
```

#### 📤 **تشغيل** `exiftool` على صورة

```bash
exiftool trip_photo.jpg
```

#### ✅ مخرجات مهمة من `exiftool`:

| نوع البيانات             | مثال                       | التفسير                      |
| ------------------------ | -------------------------- | ---------------------------- |
| `Date/Time Original`     | 2024:06:30 09:00:00        | وقت التقاط الصورة            |
| `Modify Date`            | 2024:07:02 15:45:30        | آخر وقت تم تعديل الملف فيه   |
| `Make / Model`           | Samsung / Galaxy S22 Ultra | نوع الهاتف أو الكاميرا       |
| `Software`               | G998BXXU9EWF3              | البرنامج أو النظام المستخدم  |
| `Orientation`            | Rotate 90 CW               | اتجاه الصورة أثناء التصوير   |
| `GPS Latitude/Longitude` | 34.0211, -6.8343           | الموقع الجغرافي عند الالتقاط |
| `ISO / Exposure Time`    | ISO 100 / 1/125 sec        | الإعدادات الفنية للكاميرا    |

***

#### 📝 **مقارنة:** `stat` vs `exiftool`

| الأداة     | البيانات المستخرجة                   | الاستخدام النموذجي                |
| ---------- | ------------------------------------ | --------------------------------- |
| `stat`     | بيانات نظام الملفات (Access, Modify) | لتحديد تاريخ دخول/نقل/تعديل       |
| `exiftool` | بيانات التصوير الأصلية (EXIF)        | لفهم وقت الالتقاط، المكان، الجهاز |

***

## 🛑 **ملاحظات أمنية مهمة**

* برامج مثل WhatsApp وFacebook تحذف بيانات EXIF تلقائيًا عند رفع الصور.

* يمكن للمجرمين حذف البيانات الوصفية قبل مشاركة الصور.

* بعض برامج تعديل الصور (مثل Photoshop) تُبقي أو تُعدل بيانات EXIF.

***

## 📍 **استخدام بيانات GPS**

* تحديد **الموقع الجغرافي** الدقيق للصورة

* ربط الصورة بـ:

  * موقع الجريمة

  * سجل تنقل المشتبه به

  * الكاميرات المجاورة

> وإذا غابت بيانات GPS، يمكن استخدام **Google Images** أو **TinEye** لتحديد الموقع الظاهر في الصورة بصريًا.

***

## 🕵️‍♂️ **دراسة حالة تطبيقية**

**الصورة:** `trip_photo.jpg`\
**تحليل EXIF:**

* تاريخ الالتقاط: 30 يونيو 2024 – الساعة 09:00

* الجهاز: Samsung Galaxy S22 Ultra

* موقع: Casablanca, Morocco (حسب GPS)

* تعديل: لا توجد مؤشرات على التعديل

**الاستنتاج:**

* الصورة التُقطت بجهاز معين في وقت ومكان محددين.

* الجهاز مطابق لما تم ضبطه مع المتهم.

* بذلك، تشكل الصورة **دليلًا رقميًا موثقًا**.

***

## ✅ **ملخص سريع**

| العنصر             | الأداة                       | القيمة العملية                        |
| ------------------ | ---------------------------- | ------------------------------------- |
| تواريخ الملف       | `stat`                       | تاريخ الإنشاء والتعديل على الجهاز     |
| وقت ومكان الالتقاط | `exiftool`                   | معلومات التصوير الأصلية               |
| الموقع الجغرافي    | EXIF أو Reverse Image Search | تحديد المكان                          |
| نوع الجهاز         | `Make / Model`               | مطابقة الجهاز مع ما يملكه المشتبه به  |
| التحليل السياقي    | تحليل متكامل                 | دمج الأدلة الرقمية والزمنية والمكانية |

***

## 🧠 **خاتمة: نصائح للمحقق الجنائي**

* **افحص ما خلف الصورة، لا ما يظهر فيها فقط.**

* **الميتاداتا** قد تُدين أو تُبرّئ.

* لا تكتفِ بـ `stat` فقط — استخدم أدوات متخصصة كـ `exiftool`.

