# Phishing Analysis – Blue Team Labs Online

## Scenario

A user reported a suspicious email to the SOC team. The objective was to analyze the email and its attachment to identify Indicators of Compromise (IOCs) and extract useful forensic artifacts.

Link :
	  https://blueteamlabs.online/home/challenge/phishing-analysis-f92ef500ce

---

# Investigation Steps

## Step 1 – Analyze the Email Headers

The first step was examining the email headers to identify:

- Primary Recipient
- Subject
- Date & Time
- Originating IP Address

### Findings

|Artifact|Value|
|---|---|
|Primary Recipient|`kinnar1975@yahoo.co.uk`|
|Subject|`Undeliverable: Website contact form submission`|
|Date|`18 March 2021 04:14`|
|Originating IP|`103.9.171.10`|

---

## Step 2 – Perform Reverse DNS Lookup

Using the originating IP address:

```
103.9.171.10
```

A Reverse DNS lookup was performed.

### Result

```
c5s2-1e-syd.hosting-services.net.au
```

This identifies the mail server that originated the message.

---

## Step 3 – Inspect the Email Attachment

The phishing email contained an attached email file.

### Attachment Name

```
Website contact form submission.eml
```

---

## Step 4 – Analyze the Attachment

After opening the attached `.eml` file, the email body contained promotional phishing content with a malicious-looking URL.

### Extracted URL

```
https://35000usdperwwekpodf.blogspot.sg?p=9swghttps://35000usdperwwekpodf.blogspot.co.il?o=0hnd
```

The message attempted to lure victims with:

> Good earnings from $6500 per day

which is a common social engineering tactic.

---

## Step 5 – Identify the Hosting Service

From the extracted URL, the domain was identified as:

```
blogspot
```

Therefore, the webpage was hosted using:

- **Service:** Blogspot

---

## Step 6 – Capture the Webpage

Using **URL2PNG**, a snapshot of the webpage was retrieved.

### Heading Text

```
Blog has been removed
```

Even though the phishing page was no longer active, the archived screenshot allowed identification of its final state.

---

# Indicators of Compromise (IOCs)

|Type|Value|
|---|---|
|Recipient|`kinnar1975@yahoo.co.uk`|
|Subject|`Undeliverable: Website contact form submission`|
|Originating IP|`103.9.171.10`|
|Reverse DNS|`c5s2-1e-syd.hosting-services.net.au`|
|Attachment|`Website contact form submission.eml`|
|URL|`https://35000usdperwwekpodf.blogspot.sg?p=9swg`|
|URL|`https://35000usdperwwekpodf.blogspot.co.il?o=0hnd`|
|Hosting Service|`Blogspot`|

---

# Conclusion

During this investigation, the email headers and attachment were analyzed to extract key artifacts. The analysis revealed the originating IP address, resolved host, malicious Blogspot URLs, and attachment details. The phishing content relied on a fake high-income advertisement to entice victims, demonstrating a typical social engineering campaign while providing valuable IOCs for detection and threat hunting.