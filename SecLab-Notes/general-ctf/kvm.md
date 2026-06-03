---
id: "69291ab420ffa84249245f55"
title: "KVM"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/general-ctf/kvm"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-11-28T03:44:52.491Z"
updatedAt: "2026-01-25T15:35:47.033Z"
---

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1764301533286/40432a8e-d124-4c5e-8342-dbd3c9cb207e.png" alt="" align="center" fullwidth="true" />

## 🔹 **KVM (Kernel-based Virtual Machine)**

* تقنية **Virtualization** مبنية داخل نواة لينكس.

* بتحتاج معالج يدعم **Intel VT-x (vmx)** أو **AMD-V (svm)**.

* تقدر تتحقق من دعم المعالج:

```bash
cat /proc/cpuinfo | egrep "vmx|svm"
```

* لازم يكون عندك نواة **64-bit** عشان تقدر تشغل KVM:

```bash
arch
```

***

## 🔹 **التأكد من وجود KVM والـ Libvirt**

* تحميل الموديول الخاص بـ KVM:

```bash
lsmod | grep kvm
```

* التأكد من أن خدمة **libvirtd** شغالة:

```bash
systemctl status libvirtd
```

* وجود **virbr0** (Bridge افتراضي) دليل إن الشبكات الافتراضية جهزة:

```bash
ip link show
```

***

## 🔹 **أدوات إدارة KVM**

### 1) **Virtual Machine Manager (virt-manager - GUI)**

* أداة رسومية سهلة الاستخدام.

* تثبيت الحزم:

```bash
yum -y install kvm libvirt virt-manager qemu-kvm
```

* تشغيل الأداة:

```bash
virt-manager
```

أو من خلال:

`Applications > System Tools > Virtual Machine Manager`

* إنشاء ISO من CD/DVD لتثبيت نظام تشغيل:

```bash
dd if=/dev/cdrom of=/root/RHEL7.iso
```

***

### 2) **virsh (CLI - سطر أوامر)**

* أداة قوية للتحكم الكامل في الـ VMs.

* تشغيلها:

```bash
virsh
```

ثم تكتب `help` عشان تشوف الأوامر المتاحة.

* أهم أوامر **virsh**:

```bash
virsh list               # عرض الـ VMs شغالة حاليًا
virsh list --all         # عرض كل الـ VMs حتى اللي مطفية
virsh start rhel7.1      # تشغيل VM اسمها rhel7.1
virsh destroy rhel7.1    # إيقاف VM بشكل إجباري (زي power off)
virsh shutdown rhel7.1   # إيقاف VM بشكل طبيعي (زي shutdown من داخلها)
virsh suspend rhel7.1    # تعليق VM (freeze)
virsh resume rhel7.1     # إعادة تشغيل VM معلقة
virsh undefine rhel7.1   # حذف تعريف VM (لكن ملفاتها تظل موجودة)
```

***

📌 **مقارنة سريعة بين Virt-Manager و Virsh**:

* **virt-manager**: سهل، رسومي، مناسب للمبتدئين.

* **virsh**: احترافي، آلي (تقدر تستخدمه مع سكربتات)، مناسب للسيرفرات بدون واجهة رسومية.

***

***

***

# 🔹 **KVM (Kernel-based Virtual Machine)**

A virtualization technology integrated into the Linux kernel.

Requires a CPU that supports Intel VT-x (`vmx`) or AMD-V (`svm`).

You can check CPU support using:

```bash
cat /proc/cpuinfo | egrep "vmx|svm"
```

A 64-bit kernel is required to run KVM:

```bash
arch
```

***

## 🔹 **Verifying KVM and Libvirt**

Load the KVM module:

```bash
lsmod | grep kvm
```

Check if the `libvirtd` service is running:

```bash
systemctl status libvirtd
```

The presence of `virbr0` (a virtual bridge) indicates that virtual networking is ready:

```bash
ip link show
```

***

## 🔹 **KVM Management Tools**

### **1) Virtual Machine Manager (virt-manager - GUI)**

A user-friendly graphical tool.

Install required packages:

```bash
yum -y install kvm libvirt virt-manager qemu-kvm
```

Launch the tool:

```bash
virt-manager
```

Or via menu:\
`Applications > System Tools > Virtual Machine Manager`

Create an ISO from a CD/DVD to install an OS:

```bash
dd if=/dev/cdrom of=/root/RHEL7.iso
```

***

### **2) virsh (CLI - Command Line)**

A powerful command-line tool for full VM control.

Start it:

```bash
virsh
```

Then type `help` to see available commands.

Key `virsh` commands:

```bash
virsh list               # Show currently running VMs
virsh list --all         # Show all VMs, including powered-off
virsh start rhel7.1      # Start VM named rhel7.1
virsh destroy rhel7.1    # Force stop VM (like power off)
virsh shutdown rhel7.1   # Gracefully shut down VM (like OS shutdown)
virsh suspend rhel7.1    # Pause VM (freeze)
virsh resume rhel7.1     # Resume paused VM
virsh undefine rhel7.1   # Delete VM definition (files remain)
```

***

## 📌 **Quick Comparison: Virt-Manager vs Virsh**

* `virt-manager`: Easy, graphical, beginner-friendly.

* `virsh`: Professional, scriptable, ideal for servers without GUI.

***

