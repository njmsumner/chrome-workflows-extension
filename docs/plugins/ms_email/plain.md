# Microsoft Outlook Email

## Overview

Use **Microsoft Outlook Email** to send an email or save it to your Outlook drafts. You can fill in the recipient, subject, and message yourself, or add information from earlier workflow steps. Messages can be plain text or HTML.

## Simple examples

- Send a workflow-generated summary to an email recipient.
- Save a prepared update as an Outlook draft so you can review it before sending.
- Use an email address or subject gathered earlier in the workflow.

## Set up Microsoft sign-in

Before using this step, add your Microsoft app registration's client ID under **Settings > Global Variables**. You can also add a tenant ID if your organization requires one; otherwise, the extension uses the default Microsoft sign-in option. The first time the workflow runs, sign in to Microsoft and approve the requested access.

## Add and configure the step

1. Add **Microsoft Outlook Email** to your workflow.
2. Under **Action**, choose **Send Email** or **Save as Draft**.
3. Enter one or more addresses under **Recipient (To)**. Separate multiple addresses with commas or semicolons.
4. Enter a **Subject** and **Email Body**. These fields are required.
5. Under **Body Content Type**, choose **Plain Text** or **HTML** to match your message.
6. If you want to use information from earlier workflow steps, insert it with the token picker in the recipient, subject, or message fields.

After saving a draft, choose **View Drafts** to open the Outlook drafts folder. For a send action, **Open Outlook** opens Outlook Mail.
