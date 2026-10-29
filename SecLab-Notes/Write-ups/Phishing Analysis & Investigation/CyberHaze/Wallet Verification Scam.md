# Phishing Investigation: Wallet Verification Scam
You are a SOC analyst investigating a suspicious email reported by a user. Your task is to perform a complete phishing and email forensics analysis by examining email headers, identifying the real sender, tracing malicious redirects, checking SPF/DKIM/DMARC authentication results, analyzing IP and domain intelligence, and mapping the attack to the MITRE ATT&CK framework. Determine whether the email is a true positive phishing attempt and document your findings as a real incident responder.

Link :
	https://cyberhaze.io/challange-details/6a105d32090ca3132ba954dc

---
# Executive Summary

During a routine security operation, a suspicious email was reported by a user and escalated to the Security Operations Center (SOC) for investigation.

The message claimed to originate from Trust Wallet Support and warned recipients that unverified wallet accounts would be suspended unless immediate action was taken. The email encouraged users to click a verification button labeled **"Confirm my wallet"**.

A comprehensive forensic analysis was conducted, including:

- Email header examination
    
- Sender validation
    
- SPF, DKIM, and DMARC verification
    
- Infrastructure intelligence gathering
    
- URL and redirect chain analysis
    
- MITRE ATT&CK mapping
    

The investigation confirmed that the email was a **True Positive Phishing Attempt** designed to steal cryptocurrency wallet credentials and recovery phrases.

---
# Incident Overview

## Reported Email Subject

```text
FWD: All unverified accounts will be suspended on 10/30/2022. 2hwpexn64bmc7qrzvo0kyduajlgf3598
```

The subject immediately creates urgency and fear, pressuring recipients to act before their accounts are suspended.

The random string appended to the subject appears to be an anti-spam evasion technique intended to modify the email fingerprint and reduce detection by signature-based filtering systems.

---
# Email Header Analysis

## Displayed Sender

```text
Trustwallet-Support <7wq1vg3kn9woejk4@emails.gorgias.com>
```

At first glance, the sender appears legitimate and related to Trust Wallet support services.

---
## Return-Path Analysis

```text
bounce+31a2a2.6303d-emily.jenkins=potentialsecurity.net@gorgias.io
```

The Return-Path reveals the actual sending domain:

```text
gorgias.io
```

This immediately raises suspicion because the email claims to represent Trust Wallet while originating from an unrelated infrastructure.

---
# Sender Infrastructure Investigation

## Sending IP Address

```text
143.55.227.147
```

### Geolocation

```text
United States
```

### ASN

```text
AS396479
```

### Provider

```text
Mailgun Technologies Inc.
```

The email was transmitted through Mailgun's legitimate email delivery infrastructure.

This demonstrates a common phishing tactic where attackers abuse trusted email delivery services to improve deliverability and bypass reputation-based security controls.

---
# Authentication Analysis

## SPF Verification

```text
PASS
```

The sending IP address was authorized to send emails on behalf of the domain used in the SMTP transaction.

---
## DKIM Verification

```text
PASS
```

The DKIM signature was successfully validated, confirming that the email content was not modified during transit.

---
## DMARC Verification

```text
FAIL
```

DMARC failed because the domain alignment requirements were not met.

Although SPF and DKIM succeeded independently, the sender identity presented to the recipient did not properly align with the authenticated domain.

### Security Observation

One of the most important lessons from this investigation is:

> SPF PASS + DKIM PASS does NOT automatically mean an email is safe.

Threat actors frequently abuse legitimate platforms and cloud email services while still failing DMARC alignment checks.

---
# Domain Intelligence

## Domain

```text
gorgias.io
```

### Registration Date

```text
2014-11-20
```

### Expiration Date

```text
2030-11-20
```

### MX Record

```text
aspmx.l.google.com
```

The domain itself is legitimate and long-established.

No evidence suggests the use of typosquatting or a newly registered phishing domain.

Instead, the attacker appears to have leveraged a legitimate service account or misconfigured email infrastructure.

---
# URL Analysis

## Call-To-Action

The email contained a verification button:

```text
Confirm my wallet
```

---
## Redirect Chain

### Initial URL

```text
https://usertest.sciquest.com/apps/Router/ExternalSiteTransition?url=https://drop-coin-availablenow.site44.com/
```

### Final Destination

```text
https://drop-coin-availablenow.site44.com/
```

---
# Open Redirect Abuse

The attacker leveraged an Open Redirect mechanism through a trusted domain.

This technique provides several advantages:

- Increased user trust
    
- Bypassing URL reputation systems
    
- Evading security gateways
    
- Obscuring the true destination
    

When the victim clicks the link, they first visit a legitimate domain before being silently redirected to the phishing page.

---

# Attack Objective

The final landing page impersonated Trust Wallet.

The attacker's primary objective was credential theft through social engineering.

Potential targets included:

- Wallet Recovery Phrases (Seed Phrases)
    
- Private Keys
    
- Account Credentials
    
- Cryptocurrency Assets
    

Once a victim submits wallet recovery information, the attacker can immediately gain full control of the wallet and transfer all assets.

---
---
# Indicators of Compromise (IOCs)

## Domains

```text
gorgias.io
drop-coin-availablenow.site44.com
```

## Sender Email

```text
7wq1vg3kn9woejk4@emails.gorgias.com
```

## Return Path

```text
bounce+31a2a2.6303d-emily.jenkins=potentialsecurity.net@gorgias.io
```

## IP Address

```text
143.55.227.147
```

## ASN

```text
AS396479
Mailgun Technologies Inc.
```

---
---
# MITRE ATT&CK Mapping

## Initial Access

### T1566.002 – Phishing: Spearphishing Link

The victim receives an email containing a malicious hyperlink leading to a credential harvesting page.

## Credential Access

### T1056 – Input Capture

The phishing page is designed to capture sensitive wallet information entered by the victim.


## Defense Evasion

### T1553.003 – Subvert Trust Controls

The attacker abused trusted infrastructure and valid email authentication mechanisms to increase credibility and bypass security controls.

## Defense Evasion

### T1036 – Masquerading

The phishing email impersonated Trust Wallet Support to deceive recipients into believing the message was legitimate.

---
---
# Final Verdict

After reviewing the email headers, sender infrastructure, authentication results, domain intelligence, and redirect behavior, the message was conclusively identified as:

## TRUE POSITIVE PHISHING EMAIL

The attacker successfully leveraged legitimate infrastructure, valid SPF/DKIM signatures, and Open Redirect abuse to deliver a convincing phishing campaign targeting cryptocurrency wallet holders.

The ultimate objective was credential harvesting and cryptocurrency theft through a fake Trust Wallet verification portal.

---
---
# Key Takeaway

This case highlights an important reality in modern phishing campaigns:

Attackers no longer rely solely on obviously malicious infrastructure.

Instead, they increasingly abuse legitimate cloud services, trusted email providers, and valid authentication mechanisms to gain credibility and evade traditional defenses.

For SOC analysts, successful detection often depends on correlating multiple indicators rather than relying on a single security control.