---
id: "68ee634734b9b7534e9d470a"
title: "Leviathan Level 0 → Level 1"
description: "OverTheWire\nThere is no information for this level, intentionally."
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/general-ctf/linux-labs-review/leviathan-linux/leviathan-level-0-level-1"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-14T14:50:47.177Z"
updatedAt: "2026-01-25T15:35:47.042Z"
---

> *ssh -p 2223 leviathan1\@leviathan.labs.overthewire.org\
> Password:* PPIfmI1qsA

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455009941/32e41295-07f2-4359-bc9e-9eb4f8c4c657.png" alt="" align="left" fullwidth="false" />

When you look at the permissions on this file, you will find that we are now in group :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455011277/f1575eb7-cd28-4603-b66c-85177e246d20.png" alt="" align="left" fullwidth="false" />

The command `**ltrace ./check**` is used to dynamically trace the library calls made by the program `**./check**`. It provides information about each library function call, including:

* Function name: The name of the library function being called.

* Arguments: The arguments that are being passed to the function.

* Return value: The return value of the function.

* Error status: Any error status that was returned by the function.

* Time: The time it took for the function to execute.

Ltrace can be a useful tool for debugging programs, as it can help you to identify which library functions are being called and what arguments are being passed to them. It can also be used to measure the performance of programs, as it can show you how long each library function is taking to execute.

Here are some additional details about ltrace:

* It only traces library calls, not system calls. For tracing system calls, you can use the `strace` command.

* It can be used to trace both statically and dynamically linked libraries.

* It can be used to trace specific libraries or functions.

* It can be used to filter the output based on various criteria.

Here are some examples of how to use ltrace:

* To trace all library calls made by `./check`:

* To trace only library calls made to the `printf` function:

So it seems that he provided the password for us to use this file :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455012518/4baac63b-2679-407c-b29e-1aaef8c9c71d.png" alt="" align="left" fullwidth="false" />

Here, after searching the files, I found the password here :

* `**cat**` is a command-line utility used to display the contents of a file.

* `**/etc/leviathan_pass/leviathan2**` is a specific file path.

* Executing this command would display the contents of the file `**/etc/leviathan_pass/leviathan2**` on the terminal.

pass : mEh5PNl10e

> ***See you soon in other reports….!!***

> *Abdelwahab\_Shandy*

> *AS\_Cyber*

