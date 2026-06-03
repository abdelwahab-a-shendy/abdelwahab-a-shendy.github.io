
# 🧾 Linux Basic Commands Reference

## 📁 Display Files

| Command | Description                                                   | Example |
| ------- | ------------------------------------------------------------- | ------- |
| `ls`    | Lists file and folder names in the current directory.         | `ls`    |
| `ls -l` | Detailed view (permissions, owner, size, date).               | `ls -l` |
| `ls -a` | Shows all files, including hidden ones (starting with a dot). | `ls -a` |

💡 **Tip:** Hidden files always start with a dot.\
Example: `.filehidden.txt`

***

## 🧭 Navigating Between Directories

| Command     | Description                                      | Example          |
| ----------- | ------------------------------------------------ | ---------------- |
| `pwd`       | Displays the full path of the current directory. | `pwd`            |
| `mkdir CTF` | Creates a new folder named CTF.                  | `mkdir myfolder` |
| `cd CTF`    | Enters the folder named CTF.                     | `cd CTF`         |
| `cd ../`    | Goes back to the parent directory.               | —                |
| `cd ~`      | Goes to the user's home directory.               | —                |
| `cd -`      | Returns to the previous path.                    | —                |

***

## 📝 Creating and Editing Files

| Command             | Description                                                 | Notes                                                 |
| ------------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| `touch TEST.txt`    | Creates an empty file or updates its modification date.     | —                                                     |
| `nano TEXT.txt`     | Opens the file in a simple text editor inside the terminal. | 🔹 Save: `Ctrl + O`, then `Enter` 🔹 Exit: `Ctrl + X` |
| `mousepad TEXT.txt` | Opens the file in a graphical text editor.                  | Works in desktop environments.                        |

💡 Use the **TAB key** for filename autocompletion.

***

## 📖 Displaying File Contents

| Command              | Description                            | Example |
| -------------------- | -------------------------------------- | ------- |
| `cat TEXT.txt`       | Displays the entire content of a file. | —       |
| `head TEXT.txt`      | Displays the first 10 lines of a file. | —       |
| `head -n 5 TEXT.txt` | Displays the first 5 lines only.       | —       |
| `tail TEXT.txt`      | Displays the last 10 lines of a file.  | —       |
| `tail -n 3 TEXT.txt` | Displays the last 3 lines only.        | —       |

***

## 🔁 Text Redirection and Line Processing

| Command                                  | Description                                            | Example                                           |
| ---------------------------------------- | ------------------------------------------------------ | ------------------------------------------------- |
| `echo "Abdelwahab Shandy"`               | Prints text on the screen.                             | —                                                 |
| `echo "Abdelwahab Shandy" > Name.txt`    | Writes text to a file (replaces old content).          | —                                                 |
| `echo "AS-CYBER" >> Name.txt`            | Appends text to the file without deleting old content. | —                                                 |
| \`cat Name.txt                           | grep AS-CYBER\`                                        | Searches for lines containing the specified word. |
| `grep -i AS-CYBER Name.txt`              | Same as above but ignores letter case.                 | —                                                 |
| `grep -i --color=auto AS-CYBER Name.txt` | Highlights matches for easier reading.                 | —                                                 |

***

## ✂️ Field Splitting (`cut` command)

| Command        | Description       | Example                                              |
| -------------- | ----------------- | ---------------------------------------------------- |
| \`cat Name.txt | cut -d " " -f 1\` | Extracts the first field using space as a delimiter. |
| \`cat Name.txt | cut -d " " -f 2\` | Selects the second field.                            |

🔹 `-d " "` → Specifies the delimiter.\
🔹 `-f` → Specifies the field number.

***

## ⚙️ Command Chaining

| Command        | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `ls ; whoami`  | Runs both commands sequentially, regardless of result.                 |
| `ls & whoami`  | Runs the first command in the background, then the second immediately. |
| `ls && whoami` | Runs the second command **only if** the first succeeds.                |

***

## 🧹 Sorting and Removing Duplicates

| Command   | Description                         | Example        |
| --------- | ----------------------------------- | -------------- |
| `sort -u` | Sorts lines and removes duplicates. | \`cat TEST.txt |

***

## 💾 Saving and Reading Output

| Command | Description                                                                  | Example       |
| ------- | ---------------------------------------------------------------------------- | ------------- |
| `tee`   | Reads from input, writes to a file, and displays on screen at the same time. | \`echo "Abdo" |

***

## 🔍 Searching for Files

| Command                                | Description                                                        | Example                     |
| -------------------------------------- | ------------------------------------------------------------------ | --------------------------- |
| `locate passwd`                        | Quickly searches for files via a database.                         | —                           |
| `updatedb`                             | Updates the `locate` database.                                     | Use after adding new files. |
| `find /home/as/Desktop -name "*test*"` | Searches physically in the given path for files containing “test”. | —                           |

***

## 🌐 Networking and Downloads

| Command                                                                        | Description                          | Example                                      |
| ------------------------------------------------------------------------------ | ------------------------------------ | -------------------------------------------- |
| `curl `[`https://www.google.com/`](https://www.google.com/)                    | Fetches webpage content.             | —                                            |
| `curl -X POST `[`https://example.com/`](https://example.com/)` -d "key=value"` | Sends a POST request with data.      | —                                            |
| `wget `[`https://www.google.com/`](https://www.google.com/)                    | Downloads a file from the Internet.  | —                                            |
| `ifconfig`                                                                     | Displays network interface settings. | If missing: `sudo apt-get install net-tools` |

***

## 🧠 Process Management

| Command        | Description                                 | Example                          |
| -------------- | ------------------------------------------- | -------------------------------- |
| `ps aux`       | Displays all running processes.             | —                                |
| `kill -9 5000` | Forcefully kills the process with PID 5000. | ⚠️ Use `-9` only when necessary. |

***

## 🗑️ Removing Files and Directories

| Command          | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `rm file.txt`    | Deletes a file after confirmation.                                   |
| `rm -f file.txt` | Deletes without prompts or errors.                                   |
| `rm -r folder`   | Deletes a folder and its contents.                                   |
| `rm -rf folder`  | Forcefully deletes everything — ⚠️ very dangerous, use with caution. |

***

## 👤 Users and Permissions

| Command       | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `whoami`      | Displays the current username.                               |
| `id`          | Shows the UID, GID, and groups.                              |
| `sudo whoami` | Runs a command with sudo privileges (usually prints `root`). |

⚠️ **Warning:** The `root` user has full privileges.\
Avoid using it directly — use `sudo` when necessary.

***

## 🔧 System Updates and Package Installation (Debian / Ubuntu)

| Command                             | Description                                           |
| ----------------------------------- | ----------------------------------------------------- |
| `sudo apt-get update`               | Updates the package list (does not install anything). |
| `sudo apt-get upgrade`              | Upgrades installed packages.                          |
| `sudo apt-get install package-name` | Installs a new package.                               |
| `sudo apt-cache search 7z`          | Searches for packages containing “7z”.                |
| `sudo apt-get remove 7zip`          | Removes the package `7zip`.                           |

***

## 🧩 Repositories and Source Control

| Command            | Description                                | Example                                                                            |
| ------------------ | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `git clone <link>` | Clones a Git repository from the Internet. | `git clone `[`https://github.com/user/repo.git`](https://github.com/user/repo.git) |

***

## 💡 Extra Tips

* `man ls` → Displays the manual for the command in detail.

* `sort -u` → Removes duplicate lines.

* `echo "text" > file` → Replaces file content.

* `echo "text" >> file` → Appends text to the end of the file.

***

***

***

# 🧾 **مرجع أوامر Linux الأساسية**

***

## 📁 **عرض الملفات**

| الأمر   | الشرح                                                   | مثال    |
| ------- | ------------------------------------------------------- | ------- |
| `ls`    | يعرض أسماء الملفات والمجلدات في الدليل الحالي.          | `ls`    |
| `ls -l` | عرض مفصل (الأذونات، المالك، الحجم، التاريخ).            | `ls -l` |
| `ls -a` | يعرض جميع الملفات بما في ذلك المخفية (التي تبدأ بنقطة). | `ls -a` |

> 💡 **معلومة:** الملفات المخفية تبدأ دائمًا بنقطة.\
> مثال: `.filehidden.txt`

***

## 🧭 **التصفح والتنقل بين الأدلة**

| الأمر       | الشرح                             | مثال             |
| ----------- | --------------------------------- | ---------------- |
| `pwd`       | يعرض المسار الكامل للدليل الحالي. | `pwd`            |
| `mkdir CTF` | ينشئ مجلدًا جديدًا باسم CTF.      | `mkdir myfolder` |
| `cd CTF`    | يدخل إلى المجلد CTF.              | `cd CTF`         |
| `cd ../`    | يعود إلى المجلد الأب.             | —                |
| `cd ~`      | ينتقل إلى مجلد المستخدم (home).   | —                |
| `cd -`      | يعود إلى آخر مسار كنت فيه.        | —                |

***

## 📝 **إنشاء وتحرير الملفات**

| الأمر               | الشرح                                     | ملاحظات                                         |
| ------------------- | ----------------------------------------- | ----------------------------------------------- |
| `touch TEST.txt`    | ينشئ ملفًا فارغًا أو يحدّث تاريخ التعديل. | —                                               |
| `nano TEXT.txt`     | يفتح الملف في محرر نصي بسيط داخل الطرفية. | 🔹 حفظ: `Ctrl + O` ثم Enter 🔹 خروج: `Ctrl + X` |
| `mousepad TEXT.txt` | يفتح الملف في محرر نصي رسومي.             | يعمل في بيئة سطح مكتب.                          |

> 💡 استخدم **زر TAB** للإكمال التلقائي لأسماء الملفات.

***

## 📖 **عرض محتوى الملفات**

| الأمر                | الشرح                      | مثال |
| -------------------- | -------------------------- | ---- |
| `cat TEXT.txt`       | يعرض كامل محتوى الملف.     | —    |
| `head TEXT.txt`      | يعرض أول 10 أسطر من الملف. | —    |
| `head -n 5 TEXT.txt` | يعرض أول 5 أسطر فقط.       | —    |
| `tail TEXT.txt`      | يعرض آخر 10 أسطر من الملف. | —    |
| `tail -n 3 TEXT.txt` | يعرض آخر 3 أسطر فقط.       | —    |

***

## 🔁 **توجيه النصوص والتعامل مع الأسطر**

| الأمر                                    | الشرح                                          | مثال |
| ---------------------------------------- | ---------------------------------------------- | ---- |
| `echo "Abdelwahab Shandy"`               | يطبع النص على الشاشة.                          | —    |
| `echo "Abdelwahab Shandy" > Name.txt`    | يكتب النص داخل الملف (ويستبدل المحتوى القديم). | —    |
| `echo "AS-CYBER" >> Name.txt`            | يضيف النص إلى نهاية الملف دون حذف القديم.      | —    |
| `cat Name.txt \| grep AS-CYBER`          | يبحث عن الأسطر التي تحتوي على الكلمة المطلوبة. | —    |
| `grep -i AS-CYBER Name.txt`              | نفس الأمر مع تجاهل حالة الأحرف.                | —    |
| `grep -i --color=auto AS-CYBER Name.txt` | يلوّن النتائج لتسهيل قراءتها.                  | —    |

***

## ✂️ **تقسيم الحقول (cut command)**

| الأمر                             | الشرح                                    | مثال |
| --------------------------------- | ---------------------------------------- | ---- |
| `cat Name.txt \| cut -d " " -f 1` | يقطع الحقل الأول باستخدام المسافة كفاصل. | —    |
| `cat Name.txt \| cut -d " " -f 2` | يختار الحقل الثاني.                      | —    |

> 🔹 `-d " "` → يحدد الفاصل.\
> 🔹 `-f` → يحدد رقم الحقل المطلوب.

***

## ⚙️ **التحكم بتسلسل الأوامر**

| الأمر          | الشرح                                               |
| -------------- | --------------------------------------------------- |
| `ls ; whoami`  | ينفذ الأمرين واحدًا بعد الآخر بغض النظر عن النتيجة. |
| `ls & whoami`  | يشغّل الأول في الخلفية ويكمل الثاني مباشرة.         |
| `ls && whoami` | ينفّذ الثاني فقط إذا نجح الأول.                     |

***

## 🧹 **الفرز وإزالة التكرار**

| الأمر     | الشرح                          | مثال                      |
| --------- | ------------------------------ | ------------------------- |
| `sort -u` | يفرز الأسطر ويزيل المكرر منها. | `cat TEST.txt \| sort -u` |

***

## 💾 **حفظ الإخراج وقراءته**

| الأمر | الشرح                                                       | مثال                       |
| ----- | ----------------------------------------------------------- | -------------------------- |
| `tee` | يقرأ من الإدخال ويكتب في ملف ويعرض على الشاشة في نفس الوقت. | `echo "Abdo" \| tee A.txt` |

***

## 🔍 **البحث عن ملفات**

| الأمر                                  | الشرح                                                   | مثال                           |
| -------------------------------------- | ------------------------------------------------------- | ------------------------------ |
| `locate passwd`                        | يبحث بسرعة عن الملفات عبر قاعدة بيانات.                 | —                              |
| `updatedb`                             | يحدث قاعدة بيانات locate.                               | استخدمه بعد إضافة ملفات جديدة. |
| `find /home/as/Desktop -name "*test*"` | يبحث فعليًا في المسار المحدد عن ملفات تحتوي على "test". | —                              |

***

## 🌐 **الشبكات والتحميل**

| الأمر                                                                          | الشرح                       | مثال                                                |
| ------------------------------------------------------------------------------ | --------------------------- | --------------------------------------------------- |
| `curl `[`https://www.google.com/`](https://www.google.com/)                    | يجلب محتوى صفحة ويب.        | —                                                   |
| `curl -X POST `[`https://example.com/`](https://example.com/)` -d "key=value"` | يرسل طلب POST مع بيانات.    | —                                                   |
| `wget `[`https://www.google.com/`](https://www.google.com/)                    | يحمل ملف من الإنترنت.       | —                                                   |
| `ifconfig`                                                                     | يعرض إعدادات واجهات الشبكة. | إن لم يكن موجودًا: `sudo apt-get install net-tools` |

***

## 🧠 **العمليات وإدارتها**

| الأمر          | الشرح                             | مثال                            |
| -------------- | --------------------------------- | ------------------------------- |
| `ps aux`       | يعرض جميع العمليات الجارية.       | —                               |
| `kill -9 5000` | يقتل العملية ذات PID=5000 بالقوة. | ⚠️ استخدم `-9` فقط عند الضرورة. |

***

## 🗑️ **إزالة الملفات والمجلدات**

| الأمر            | الشرح                                       |
| ---------------- | ------------------------------------------- |
| `rm file.txt`    | يحذف ملفًا بعد تأكيد الإعدادات.             |
| `rm -f file.txt` | يحذف دون أي تنبيه أو خطأ.                   |
| `rm -r folder`   | يحذف المجلد ومحتوياته.                      |
| `rm -rf folder`  | حذف قسري وكامل — ⚠️ خطير جدًا، استخدم بحذر. |

***

## 👤 **المستخدمون والصلاحيات**

| الأمر         | الشرح                                          |
| ------------- | ---------------------------------------------- |
| `whoami`      | يعرض اسم المستخدم الحالي.                      |
| `id`          | يعرض الـ UID والـ GID والمجموعات.              |
| `sudo whoami` | ينفذ الأمر بصلاحيات `sudo` (عادة يطبع `root`). |

> ⚠️ **تحذير:** المستخدم `root` يملك صلاحيات كاملة.\
> لا يُنصح باستخدامه مباشرة لتجنب الأخطاء الخطيرة.\
> استخدم `sudo` عند الحاجة فقط.

***

## 🔧 **تحديث النظام وتثبيت الحزم (Debian / Ubuntu)**

| الأمر                               | الشرح                             |
| ----------------------------------- | --------------------------------- |
| `sudo apt-get update`               | يحدث قائمة الحزم (لا يثبت شيئًا). |
| `sudo apt-get upgrade`              | يحدّث الحزم المثبتة.              |
| `sudo apt-get install package-name` | يثبّت حزمة جديدة.                 |
| `sudo apt-cache search 7z`          | يبحث عن حزم تحتوي الكلمة “7z”.    |
| `sudo apt-get remove 7zip`          | يزيل الحزمة 7zip.                 |

***

## 🧩 **التحكم بالمستودعات والشيفرات**

| الأمر              | الشرح                        | مثال                                                                               |
| ------------------ | ---------------------------- | ---------------------------------------------------------------------------------- |
| `git clone <link>` | ينسخ مستودع Git من الإنترنت. | `git clone `[`https://github.com/user/repo.git`](https://github.com/user/repo.git) |

***

## 💡 **نصائح إضافية**

* `man ls` → لعرض دليل الأمر بالتفصيل.

* `sort -u` → لإزالة التكرار.

* `echo "text" > file` يستبدل الملف.

* `echo "text" >> file` يضيف في نهاية الملف.

