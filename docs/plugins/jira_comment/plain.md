# Jira Comment

## Overview

Use **Jira Comment** to add a comment to an existing Jira issue in Jira Cloud or Jira Server/Data Center. You can include information from earlier workflow steps in the comment.

<img src="../../img/Jira Comment.png" alt="Jira Comment Step" />

## Simple examples

- Post a workflow-generated progress update to a Jira issue.
- Add a note with details collected from a webpage or another workflow step.

## Set up Jira access

You need your Jira site address, the issue key, and credentials with permission to comment on that issue.

- For **Jira Cloud**, you need your Jira account email and an API token.
- For **Jira Server/Data Center**, you need a personal access token.

You can save credentials under **Settings > Global Variables** and select them with the token picker. This avoids entering them again in each workflow.

## Add and configure the step

1. Add **Jira Comment** to your workflow.
2. Enter the Jira site address under **Jira Base URL** and the target issue under **Issue Key**.
3. Enter the required message under **Comment Text**. Use the token picker to include information from earlier steps.
4. Under **Advanced**, set **Authentication** to **Basic (Email & API Token - Cloud)** for Jira Cloud or **Personal Access Token - Server** for Server/Data Center.
5. Under **API Version**, choose **v3** for Jira Cloud or **v2** for Server/Data Center.

Choose **View Issue** to open the configured issue in Jira.
