
# **SIEM : Implement a Manual Data Retention Policy with n8n and Elasticsearch :**

> **Objective:**
>
> * Create an automated workflow using **n8n** to monitor and manage the size of indices in an **Elasticsearch** cluster. The workflow should automatically delete old data from indices that exceed a defined size threshold, helping to maintain disk space and ensure system efficiency.
>
> * **Key Steps:**
>
>   1. **Scheduled Trigger:** Run the workflow automatically on a fixed schedule (e.g., every 5 minutes for testing).
>
>   2. **Get Index Statistics:** Connect to Elasticsearch and fetch statistics for all indices, ignoring system indices (names starting with `.`)
>
>   3. **Check Size Threshold:** Compare each index’s primary store size against a defined threshold (e.g., 10MB for testing).
>
>   4. **Delete Old Data:** If an index exceeds the threshold, delete documents older than a defined period (e.g., 7 days).
>
> * **Optional Enhancements:**
>
>   * Send an **email report** summarizing index names and current sizes.
>
>   * Perform **hard deletes** to immediately reclaim disk space (resource-intensive, optional for large indices).
>
> * **Outcome:**
>
>   * A fully automated workflow that monitors Elasticsearch indices, deletes old data when needed, and optionally reports the results, ensuring efficient disk usage and easier data management.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761960294694/7009f038-8ab7-473b-a9b2-c401a2be1b45.png" align="center" fullwidth="false" />

***

***

# EDR : **Security Awareness Email Automation Workflow :**

### **Objective:**

* Create an **n8n Workflow** that performs the following automated process:         

* Fetching **security alerts (detections)** from **CrowdStrike EDR**.             

* Converting the technical alerts into **simple, understandable language** using **Artificial Intelligence (AI)**.             

* Sending **personalized awareness emails** to users explaining the error and how to avoid it.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1761960373311/e586daf2-309e-4787-af43-979e2a872517.png" align="center" fullwidth="false" />

***

***

***

