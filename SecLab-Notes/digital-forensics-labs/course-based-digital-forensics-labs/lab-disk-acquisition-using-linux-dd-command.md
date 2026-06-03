
## 🎯 **Lab Objective:**

To acquire a forensic image of a hard disk using Linux system tools while dealing with challenges such as bad sectors or large image sizes.

🔎 **Personal Note:**

> During my work on this lab, I used an external hard drive of approximately 112 GB. It appeared empty when opened, but I noticed the free space was only around 100 GB, meaning that about 12 GB was unaccounted for!\
> This sparked my curiosity, and instead of acquiring just one partition, I decided to take a **full image of the entire disk** for comprehensive analysis to find out what caused this missing space.\
> It was a valuable and practical experience in digital forensics and highlighted the importance of full disk acquisition, especially when hidden or unclear data is suspected.

***

## 🧩 **Introduction: What is Disk Acquisition?**

Disk Acquisition is the process of copying **bit-by-bit** from storage media (either a disk or partition) to obtain an exact duplicate for investigation or analysis purposes without altering the original source.

### 🆚 Image vs Clone:

| Type      | Description                                                                                   |
| --------- | --------------------------------------------------------------------------------------------- |
| **Image** | A digital file containing an exact copy of the disk, which can be easily stored and analyzed. |
| **Clone** | A physical copy to another disk, typically of the same size.                                  |

> ✅ **Using an image is better because it facilitates copying, verification, storage, and analysis.**

***

## 🗃️ **Locating the Device in the Filesystem**

* Each physical disk has a path under `/dev/` such as:

  * `/dev/sda` ← Primary disk.

  * `/dev/sdb` ← External disk.

  * `/dev/sdb1` ← A partition.

> ⚠️ **Do not confuse a partition (**`sdb1`) with the whole disk (`sdb`)!\
> ⚠️ Be careful: if you acquire only from `/dev/sdb1`, you will miss any unallocated or hidden data outside the partition.

***

## 🖥️ **Step 1: Connect the Disk and Check its Status**

Once the external hard drive is connected to a Linux system, it will be in one of two states:

1. **Mounted**: The disk is visible in the system and attached to a folder (mount point).

2. **Not Mounted**: The disk is connected but not attached, and doesn’t appear in the filesystem.

To check connected disks:

```bash
lsblk
```

> Shows device names such as `/dev/sda`, `/dev/sdb` and their sizes.

You can also use:

```bash
sudo fdisk -l
```

> Gives more detailed info: number of sectors, size, file system type, partitions.

```bash
sudo blkid
```

> Displays UUID, file system type, and partition labels.

📝 **Important Note**: Make sure you distinguish between `sdb` (entire disk) and `sdb1` (a single partition). Choose based on whether you want to copy just one partition or the whole disk.

***

## 🔍 **Step 2: Analyze Disk and Partition Size**

* Use this command to analyze used space:

```bash
df -h
```

* Compare sector counts between the disk and the partition:

```bash
sudo fdisk -lu /dev/sdb
```

> ✅ If the disk and partition sizes are nearly equal, you may copy only the partition. If there's a significant difference, hidden partitions may exist, and full disk acquisition is recommended.

***

## 💽 **Step 3: Acquire the Image using** `dd`

`dd` is a powerful Linux tool that allows bit-by-bit copying.

#### ✅ Basic Syntax:

```bash
sudo dd if=/dev/sdX of=/path/image.img bs=4M status=progress
```

* `if=`: Input source (disk or partition).

* `of=`: Output file path.

* `bs=4M`: Block size to improve performance.

* `status=progress`: Shows operation progress.

🔎 **Practical Example**:

```bash
sudo dd if=/dev/sdb of=~/Desktop/images/ExternalHD-Image.dd bs=4M status=progress
```

***

## ⚠️ **Step 4: Handling Bad Sectors During Copy**

If you suspect bad sectors, use:

```bash
sudo dd if=/dev/sdb of=~/Desktop/images/disk_image_safe.img conv=noerror,sync
```

| Option    | Meaning                                                |
| --------- | ------------------------------------------------------ |
| `noerror` | Ignore read errors (bad sectors).                      |
| `sync`    | Fills corrupted areas with zero to maintain structure. |

***

## 🔄 **Step 5: Splitting Large Images**

If the image is larger than the available storage:

```bash
sudo dd if=/dev/sdb | split -b 100M - ~/Desktop/images/disk_part_
```

> Splits the image into files like `disk_part_aa`, `disk_part_ab`…

To reassemble later:

```bash
cat disk_part_* > full_image.dd
```

***

## 🛡️ **Step 6: Verify Image Integrity (Hashing)**

To ensure no tampering occurred:

```bash
md5sum image.dd > image.dd.md5 

sha256sum image.dd > image.dd.sha256
```

> ✅ Comparing hashes later confirms the original image matches the analysis copy.

✅ Real Example:

```bash
sansforensics@as: ~/DF/HashFiles
cat MyImageExternalHash.md5 
915d6457aee3439b296e1dcd35021083  Hash_ExternalHD_Image.img
----------------------------------------------------------------------------------
sansforensics@as: ~/DF/Analysis
md5sum F1-ExternalHD-Image.dd 
915d6457aee3439b296e1dcd35021083  F1-ExternalHD-Image.dd
```

***

## 📂 **Step 7: Mounting and Analyzing the Image**

To analyze content without restoring the image to a new disk:

1. Create a mount folder:

```bash
mkdir Mount_Point
```

2. Attach image to a virtual device:

```bash
sudo losetup -fP F1-ExternalHD-Image.dd
```

3. Confirm partition appearance:

```bash
ls /dev/loop*

# out :
/dev/loop0    /dev/loop1  /dev/loop3  /dev/loop5  /dev/loop7
/dev/loop0p1  /dev/loop2  /dev/loop4  /dev/loop6  /dev/loop-control
```

4. Mount (for NTFS, for example):

```bash
sudo mount -t ntfs-3g /dev/loop0p1 Mount_Point/
```

5. Verify successful mount:

```bash
ls Mount_Point/

out :
'$RECYCLE.BIN'  'System Volume Information'`
```

> 🔎 You’ll see folders like `$RECYCLE.BIN` and `System Volume Information`.

***

## 🧪 **Advanced: If Image Has a Partition Table**

1. Extract partitions from a `.img` file:

```bash
kpartx -av disk_image.img
```

2. Then mount:

```bash
mount /dev/mapper/loop0p1 /mnt/image_mount
```

***

## 🔄 **Forensic Best Practices**

| Action                        | Reason                                       |
| ----------------------------- | -------------------------------------------- |
| Use a Write Blocker           | Prevents accidental writes to original disk. |
| Work on a copy, not original  | Preserves evidence.                          |
| Create and document hash      | Ensures integrity.                           |
| Log each step with timestamps | For court admissibility.                     |

***

## ⚙️ **Clean Up After Completion**

To safely unmount:

```bash
sudo umount Mount_Point   

sudo losetup -d /dev/loop0
```

***

## ✅ **Summary of Steps**

| Step             | Tool                         | Purpose                  |
| ---------------- | ---------------------------- | ------------------------ |
| Identify devices | `lsblk`, `fdisk -l`          | Determine target disk    |
| Acquire image    | `dd`                         | Create a bit-by-bit copy |
| Handle errors    | `conv=noerror,sync`          | Skip bad sectors         |
| Split image      | `split`, `cat`               | Manage large image files |
| Verify integrity | `md5sum`, `sha256sum`        | Ensure data consistency  |
| Analyze image    | `losetup`, `mount`, `kpartx` | Read content safely      |

***

## 📋 **Forensic Best Practices**

| Practice                          | Purpose                                           |
| --------------------------------- | ------------------------------------------------- |
| Use Write Blocker                 | Prevent modification to original evidence.        |
| Work on a copy                    | Protect digital evidence from accidental changes. |
| Document hash                     | Guarantees evidence integrity.                    |
| Log every step (Chain of Custody) | Present in court as documented proof.             |

***

***

# 🧰 **Lab: Disk Acquisition Using Linux** `dd` Command

## 🎯 **هدف اللاب:**

اكتساب صورة جنائية (Forensic Image) من قرص صلب باستخدام أدوات نظام Linux، مع التعامل مع تحديات مثل القطاعات التالفة أو الصور ذات الحجم الكبير.

🔎 **ملاحظة شخصية :**

> أثناء عملي على هذا اللاب، استخدمت هارد خارجي بحجم 112 جيجا بايت تقريبًا، وكان يبدو فارغًا عند الفتح، لكن لاحظت أن المساحة الفارغة لا تتجاوز 100 جيجا، مما يعني وجود حوالي 12 جيجا غير ظاهرة!\
> هذا الأمر أثار فضولي، وبدلًا من الاكتفاء بأخذ صورة لأحد البارتشنات، قررت أخذ صورة **كاملة للهارد بالكامل** لإجراء تحليل شامل ومعرفة السبب وراء اختفاء هذه المساحة.\
> كانت تجربة مفيدة وعملية في التحليل الجنائي الرقمي وأظهرت أهمية فحص الصورة الكاملة خصوصًا عند وجود دلائل على بيانات مخفية أو غير واضحة.

***

## 🧩 **مقدمة: ما هو Disk Acquisition؟**

Disk Acquisition هو عملية نسخ **bit-by-bit** من وسائط التخزين (سواء قرص أو بارتيشن)، بهدف الحصول على نسخة طبق الأصل لأغراض التحقيق أو التحليل دون المساس بالمصدر الأصلي.

### 🆚 الفرق بين Image و Clone:

| النوع     | الوصف                                                                   |
| --------- | ----------------------------------------------------------------------- |
| **Image** | ملف رقمي يحتوي على صورة طبق الأصل من القرص ويمكن تخزينه بسهولة وتحليله. |
| **Clone** | نسخ مادي (فعلي) إلى قرص آخر بنفس الحجم غالبًا.                          |

> ✅ **الاعتماد على الصورة (Image) أفضل لأنها تُسهل النسخ، التحقق، التخزين، والتحليل.**

***

## 🗃️ **عرض موقع الجهاز في نظام الملفات**

* كل قرص مادي له مسار تحت `/dev/` مثل:

  * `/dev/sda` ← القرص الرئيسي.

  * `/dev/sdb` ← قرص خارجي.

  * `/dev/sdb1` ← بارتيشن.

> ⚠️ **لا تخلط بين البارتيشن (**`sdb1`) والقرص بالكامل (`sdb`)! ⚠️ كن حذرًا: إذا أخذت صورة من `/dev/sdb1` فقط، فستفقد أي بيانات أو مساحات غير مخصصة خارج البارتيشن.

***

## 🖥️ **الخطوة 1: توصيل القرص والتحقق من حالته**

بمجرد توصيل الهارد الخارجي إلى جهاز Linux، لديك حالتان:

1. **Mounted**: القرص ظاهر في النظام ومربوط بمجلد (mount point).

2. **Not Mounted**: القرص متصل لكن غير مربوط، ولا يظهر في نظام الملفات

للتحقق من الأقراص المتصلة:

```bash
lsblk
```

> يظهر لك أسماء الأقراص، مثل `/dev/sda`, `/dev/sdb` وأحجامها.

يمكنك أيضًا استخدام:

```bash
sudo fdisk -l
```

> يوضح تفاصيل أدق: عدد القطاعات، الحجم، نظام الملفات، والبارتيشنات.

```bash
sudo blkid
```

> يُظهر UUID، نوع نظام الملفات، وتسمية الأقسام.

📝 **ملاحظة هامة**: تأكد من الفرق بين `sdb` (القرص بالكامل) و `sdb1` (بارتيشن منه). العمل على أحدهما يعتمد على ما إذا كنت تريد نسخ البارتيشن فقط أم القرص بأكمله.

***

## 🔍 **الخطوة 2: تحليل حجم القرص والبارتيشنات**

* استخدم الأمر التالي لتحليل الحجم المستخدم:

```bash
df -h
```

* قارن عدد القطاعات بين القرص والبارتيشن:

```bash
sudo fdisk -lu /dev/sdb
```

> ✅ إذا كان حجم القرص والبارتيشن متطابقين تقريبًا، فيمكنك الاكتفاء بصورة من البارتيشن. أما إذا كان هناك فرق كبير، فربما توجد أقسام مخفية (Hidden Partitions) ويُفضل أخذ صورة من القرص كاملًا.

***

## 💽 **الخطوة 3: أخذ صورة باستخدام** `dd`

`dd` هي أداة قوية في Linux تتيح لك أخذ نسخة bit-by-bit.

#### ✅ الصيغة الأساسية:

```bash
sudo dd if=/dev/sdX of=/path/image.img bs=4M status=progress
```

* `if=`: مصدر البيانات (القرص أو البارتيشن).

* `of=`: اسم الملف الذي سيتم إنشاءه.

* `bs=4M`: block size لتحسين الأداء.

* `status=progress`: يعرض تقدم العملية. 🔎 **مثال عملي**:

```bash
sudo dd if=/dev/sdb of=~/Desktop/images/ExternalHD-Image.dd bs=4M status=progress
```

***

## ⚠️ **الخطوة 4: معالجة القطاعات التالفة أثناء النسخ**

إذا كنت تشك في وجود قطاعات تالفة(Bad Sectors) ، استخدم:

```bash
sudo dd if=/dev/sdb of=~/Desktop/images/disk_image_safe.img conv=noerror,sync
```

| الخيار    | المعنى                                       |
| --------- | -------------------------------------------- |
| `noerror` | تجاهل الأخطاء (القطاعات التالفة).            |
| `sync`    | يملأ المساحات التالفة بصفر للحفاظ على الحجم. |

***

## 🔄 **الخطوة 5: تقسيم الصورة الكبيرة**

إذا كانت الصورة أكبر من حجم التخزين المتاح:

```bash
sudo dd if=/dev/sdb | split -b 100M - ~/Desktop/images/disk_part_
```

> تُقسم الصورة إلى ملفات مثل `disk_part_aa`, `disk_part_ab`… لإعادة تجميعها لاحقًا:

```bash
cat disk_part_* > full_image.dd
```

***

## 🛡️ **الخطوة 6: التحقق من سلامة النسخة (Hashing)**

لضمان عدم التلاعب بالصورة:

```bash
md5sum image.dd > image.dd.md5
sha256sum image.dd > image.dd.sha256
```

> ✅ مقارنة الـ hash لاحقًا تؤكد تطابق الصورة الأصلية مع نسخة التحليل.

✅ مثال واقعي:

```bash
sansforensics@as: ~/DF/HashFiles
cat MyImageExternalHash.md5 
915d6457aee3439b296e1dcd35021083  Hash_ExternalHD_Image.img
----------------------------------------------------------------------------------
sansforensics@as: ~/DF/Analysis
md5sum F1-ExternalHD-Image.dd 
915d6457aee3439b296e1dcd35021083  F1-ExternalHD-Image.dd
```

***

## 📂 **الخطوة 7: عمل Mount للصورة وتحليلها**

لتحليل المحتوى بدون استعادة الملف على قرص جديد:

1. إنشاء مجلد للمونت:

```bash
mkdir Mount_Point
```

2. ربط الصورة بجهاز وهمي:

```bash
sudo losetup -fP F1-ExternalHD-Image.dd
```

3. التأكد من ظهور البارتيشن:

```bash
ls /dev/loop*

# out :
/dev/loop0    /dev/loop1  /dev/loop3  /dev/loop5  /dev/loop7
/dev/loop0p1  /dev/loop2  /dev/loop4  /dev/loop6  /dev/loop-control
```

4. تنفيذ أمر الماونت (لـ NTFS مثلًا):

```bash
sudo mount -t ntfs-3g /dev/loop0p1 Mount_Point/
```

5. التحقق من نجاح التركيب:

```bash
ls Mount_Point/

out :
'$RECYCLE.BIN'  'System Volume Information'
```

> 🔎 سترى مجلدات مثل `$RECYCLE.BIN` و`System Volume Information`.

***

## 🧪 **تحليل إضافي: لو الصورة تحتوي جدول أقسام (Partition Table)**

1. استخراج البارتيشنات من صورة `.img`:

```bash
kpartx -av disk_image.img
```

2. ثم:

```bash
mount /dev/mapper/loop0p1 /mnt/image_mount
```

***

## 🔄 **أفضل ممارسات العمل الجنائي (Best Practices)**

| الإجراء                   | السبب                                 |
| ------------------------- | ------------------------------------- |
| استخدام Write Blocker     | منع الكتابة العرضية على القرص الأصلي. |
| العمل على نسخة وليس الأصل | للحفاظ على الدليل.                    |
| إنشاء Hash وتوثيقه        | ضمان عدم التلاعب.                     |
| توثيق الخطوات زمنياً      | لتقديمها كدليل أمام المحكمة.          |

***

## ⚙️ **تنظيف الجهاز بعد الانتهاء**

لإلغاء الربط بأمان:

```bash
sudo umount Mount_Point 

sudo losetup -d /dev/loop0
```

***

## ✅ **ملخص خطوات العمل**

| الخطوة        | الأداة                       | الوظيفة                |
| ------------- | ---------------------------- | ---------------------- |
| معرفة الأجهزة | `lsblk`, `fdisk -l`          | تحديد الأقراص          |
| أخذ صورة      | `dd`                         | إنشاء نسخة bit-by-bit  |
| معالجة أخطاء  | `conv=noerror,sync`          | تجاوز القطاعات التالفة |
| تجزئة الصورة  | `split`, `cat`               | التعامل مع حجم كبير    |
| التحقق        | `md5sum`, `sha256sum`        | التأكد من صحة البيانات |
| التحليل       | `losetup`, `mount`, `kpartx` | تحليل الصورة دون تعديل |

***

## 📋 **أفضل ممارسات التحليل الجنائي**

| الممارسة              | السبب                                  |
| --------------------- | -------------------------------------- |
| استخدام Write Blocker | منع أي تعديل على الدليل الأصلي.        |
| العمل على نسخة        | حماية الدليل الرقمي من التعديل العرضي. |
| توثيق الـ Hash        | يضمن سلامة الأدلة.                     |
| توثيق الخطوات (Log)   | لعرضها أمام المحكمة لاحقًا.            |

