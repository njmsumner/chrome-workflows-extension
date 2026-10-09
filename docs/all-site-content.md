Page: [/](/)  
Title: AI Workflows Chrome Extension

[AI Workflows Chrome Extension](/chrome-workflows-extension/)

# AI Workflows Chrome Extension Documentation

## Contents

- [Overview](#overview)
- [What is a Workflow](#what-is-a-workflow)
- [Get Started](#get-started)
- [Steps](steps)
- [Integrations](integrations)
- [Settings](settings)
- [Create a new Workflow](create)

## Overview

The Chrome Workflows Extension allows you to automate repetitive tasks within your browser by creating workflows composed of various steps. These workflows can interact with web pages, LLMs, APIs, and popular services like Google Workspace, Microsoft Office, Slack, and more.

## What is a Workflow

A workflow is a sequence of steps that automate tasks within the Chrome Workflows Extension. Each step performs a specific action, such as updating fields or clicking elements in the current tab, making an API or LLM request, updating a Google Doc or sending an email. Workflows allow you to streamline repetitive tasks and integrate various services seamlessly.

## Get Started

To get started with the AI Workflows Chrome Extension:

1.  Install the extension from the Chrome Web Store.
2.  Click on the extension icon in the Chrome toolbar to open the extension sidebar.
3.  A default workflow will be displayed, and you can start configuring it according to your needs.
4.  You can use sample Workflow templates by clicking 'Create' in the top menu.

---

# Create a workflow

Use the **Create Workflow** screen to make a workflow that automates tasks in your browser. You can describe what you want, start from a sample, or build one yourself.

<img src="../img/Create Workflow.png" alt="Create Workflow" />

## Overview

There are three ways to get started:

- Describe the task and let AI prepare a workflow. Open the webpage where you want to use it first.
- Choose a sample workflow and adjust it to suit your needs.
- Start with a blank workflow and add steps yourself.

## Simple examples

- Summarize a webpage and send the summary to Slack.
- Save selected webpage details to a Google Doc or Google Sheet.
- Create a Gmail draft with details from the current webpage.
- Show information from a webpage in the sidebar when the page opens.

---

## Header buttons

- **Workflows** opens your saved workflows.
- **Settings** lets you set up AI services and manage information reused by workflows.
- **Back** returns to the previous screen when available.

If something goes wrong, an error message appears at the top of the screen.

---

## Choose a starting point

### Start from a blank workflow

Select **Configure** to open the workflow editor and add the steps you need.

### Use a sample workflow

Choose a sample from the list, then select **Use Sample**. The workflow opens so you can review it, make changes, or run it. Samples include workflows for answering questions about a webpage, saving details to Google Docs or Sheets, drafting an email in Gmail, and sending a summary to Trello.

---

## Ask AI to create a workflow

1. Open the webpage where you want the workflow to run.
2. Enter a short description of what you want to do in the instructions box. For example: “Find a product, add it to the basket, and open the basket.”
3. Select **Generate** and wait for the workflow to appear.

Start with a simple task. You can add more steps or adjust the workflow afterward. AI features require an AI service to be configured in **Settings**.

---

## Example prompt

> Find the product title and price on this page, summarize the product, and send the summary to Slack.

The generated workflow can use details from the open webpage, create a summary, and send it to Slack. You can review and adjust the workflow before running it.

---

## If something goes wrong

- **AI setup message:** Set up an AI service in **Settings** before using AI features.
- **Instructions are missing:** Enter a description before selecting **Generate**.
- **The workflow could not be created:** Make your instructions clearer or break the task into smaller steps.
- **The extension cannot reach the webpage:** Refresh the webpage and try again.

---

Page: [/integrations](/integrations)  
Title: AI Workflows Chrome Extension

[AI Workflows Chrome Extension](/chrome-workflows-extension/)

# Integration Steps

The integrations listed below are built-in to the extension and have their own UI for editing steps.

**[API/Webhook](../plugins/api)**

Executes an HTTP request to an API endpoint or webhooks (api)

**[OpenAI/LLM](../plugins/openai)**

Send a prompt to an OpenAI-compatible API and return the completion text (openai)

**[Trello Create Card](../plugins/trello_card)**

Creates a new card on a Trello board list. (trello\_card)

**[Confluence Page](../plugins/confluence)**

Updates Confluence page via the REST API (confluence)

**[Gmail](../plugins/gmail)**

Sends emails or saves drafts to Gmail. (gmail)

**[Google Docs](../plugins/google_docs)**

Append text to or reads content from a Google Doc (google\_docs)

**[Google Sheets](../plugins/google_sheets)**

Append a row to or reads content from a Google Sheet (google\_sheets)

**[HubSpot Blog Post](../plugins/hubspot)**

Update HubSpot CMS blog posts via the CMS API (hubspot)

**[Jira Comment](../plugins/jira_comment)**

Adds a comment to the Jira issue. (jira\_comment)

**[Jira Create Issue](../plugins/jira_issue)**

Creates a new issue in Jira (e.g. Task, Bug, Story). (jira\_issue)

**[Microsoft Excel](../plugins/ms_excel)**

Append rows to an Excel table/worksheet and retrieve cell/range content. (ms\_excel)

**[Microsoft Outlook Email](../plugins/ms_email)**

Sends an email or saves a draft using Microsoft Outlook. (ms\_email)

**[Microsoft Teams](../plugins/ms_teams)**

Send messages to Microsoft Teams. (ms\_teams)

**[Microsoft Word](../plugins/ms_word)**

Append or read content from a Microsoft Word document. (ms\_word)

**[Slack Notification](../plugins/slack)**

Sends webhook messages to Slack channels (slack)

---

# API/Webhook

Use **API/Webhook** to send information from a workflow to another online service, or to retrieve information from one. You can start with a ready-made template or enter the service details yourself.

## Overview

Choose the service and information you want to send. The step contacts that service and makes its reply available to later steps in your workflow. Some services require an address or access details that you provide.

## Simple examples

- Send an AI-generated summary of a webpage to a Discord channel.
- Create a GitHub issue using a webpage’s title and summary.
- Add a Todoist task with a webpage link and a short description.

## Get started

<img src="../../img/Api.png" alt="API/Webhook Step" />

1. Choose a ready-made option from **Use Template**, or set up the connection yourself.
2. Enter the service’s address in **API Endpoint**. The address must begin with `http://` or `https://`.
3. Choose a **Method**. For example, **GET** retrieves information, while **POST** usually sends information or creates something. **PUT** and **PATCH** update information; **DELETE** removes it.
4. If the service requires access details, add them under **HTTP Headers (JSON)**. This step does not sign in to services for you.
5. Use **Payload Body (JSON)** to choose what information to send. You can include results from earlier workflow steps. Leave it empty to send the previous step’s result automatically.

Templates fill in example settings for services such as Discord, GitHub, Notion, Todoist, Telegram, ClickUp, and n8n. Review the settings and supply any service-specific address or access details before running the workflow.

---

# Condition

Use **Condition** to check information in a workflow before it continues. By default, the workflow stops when the check does not pass. Turn off **Stop Workflow** if it should continue instead.

## Overview

Choose a value to check and select what should be true about it. For many checks, you can also enter text to compare it with.

## Simple examples

- Continue only when a page title contains “Release notes.”
- Check that a status matches “Published” before continuing.
- Make sure a required detail is present before sending a message.

## Set up a condition

- **Value:** Choose the information to check. It can come from an earlier step in the workflow.
- **Condition:** Choose **Is empty**, **Is not empty**, **Contains**, **Does not contain**, **Equals**, **Does not equal**, **Starts with**, or **Ends with**.
- **Comparison value:** For most conditions, enter the text to check for. You do not need this for **Is empty** or **Is not empty**.
- **Stop Workflow:** Checked by default. When checked, a failed condition stops the workflow. When unchecked, the workflow continues after a failed condition.

A value is always required. If you choose a condition that compares text, the comparison value is required too.

<img src="../../img/Condition.png" alt="Condition Step" />

---

# Update a Confluence page

Use **Confluence Page** to replace the content of an existing Confluence page with information from a workflow. You can also change the page title.

## Overview

Provide the address of your Confluence site and the ID of the page to update. The page body is replaced when the workflow runs. If **Page Title (Optional)** is left blank, the current title stays as it is.

## Simple examples

- Replace a project page with the latest summary created by a workflow.
- Update an existing page with information gathered from a webpage.
- Change a page’s title and replace its content with a workflow report.

## Set up the page

- **Confluence Base URL:** Enter your Confluence site address, such as `https://your-domain.atlassian.net/wiki`.
- **Page ID (Content ID):** Enter the ID of the existing page you want to update.
- **Page Title (Optional):** Enter a new title, or leave this blank to keep the current title.
- **Page Body (XHTML Storage Format):** Enter the new page content. Confluence requires its own format for page content; information from earlier workflow steps can be included.

## Set up authentication

Choose the method that matches your Confluence account:

- **Basic Auth (Cloud API Token):** Enter your account email or username and its API token or password.
- **Personal Access Token (PAT):** Choose this option and enter your Confluence personal access token. You do not need to enter an email address or username.

The token must be valid for the selected authentication method, and the account must be able to edit the page.

Once the site address and page ID are set, use **View Page** to open the page in Confluence.

---

# Extract

## Overview

Use **Extract** to collect information from the webpage in your active browser tab. You can use the page title, headings, links, buttons, form fields, highlighted text, or page content in later workflow steps. No separate sign-in is needed. Only regular websites can be read; built-in browser pages and local files are not supported.

<img src="../../img/Extract.png" alt="Extract Step" />

## Simple examples

- Collect an article's visible text so a later step can summarize it.
- Use text you highlighted on the page as input for another step.
- Pick a particular page element to capture its text, a form value, or a link or image address.

## Add and configure the step

1. Open the webpage you want to use and make its tab active.
2. Add **Extract** to your workflow.
3. Under **Extract content**, choose what you need:
   - **Selection** uses text you highlighted on the page.
   - **Full Text** collects visible text from across the page.
   - **Clean HTML** collects page content with scripts and styles removed.
   - **Element Content** collects information from one part of the page.
4. For **Element Content**, click **Pick / View Element**, then click the item on the webpage. Under **Value source**, choose what to collect:
   - **Text content** collects the visible text in the selected item.
   - **Value** collects the current value of a form field.
   - **Attribute** collects a detail such as a link or image address. Enter the detail's name under **Attribute name**.
5. In a later workflow step, use the token picker to insert the Extract information you need, such as the page title, links, or selected content.

---

# Gmail

Use **Gmail** to send an email from a workflow or save it as a draft.

## Overview

Choose **Send Email** to send the message right away, or **Save as Draft** to review it before sending. Messages are sent from the Google account you authorize.

## Simple examples

- Save a webpage summary as a draft so you can review it before sending.
- Email a webpage title and summary to a colleague.
- Send a notification when a workflow finishes a task.

## Set up the message

- **Action:** Choose **Send Email** or **Save as Draft**. Draft is selected by default.
- **Recipient (To):** Enter the recipient’s email address.
- **Subject:** Enter a subject for the message.
- **Content Type:** Choose **Plain Text** for a simple message or **HTML** for formatted content.
- **Email Body:** Write the message. You can include information from earlier workflow steps.

## Google account access

When prompted, sign in to the Google account that should send the email and allow Gmail access. The workflow uses this account to send messages or save drafts.

Use **View Drafts** to open your drafts or **Open Gmail** to view your inbox.

---

# Google Docs

Use **Google Docs** to add information to an existing document or read its text in a workflow.

<img src="../../img/Google Docs.png" alt="Google Docs Step" />

## Overview

Choose **Append Text** to add content to the end of a document, or **Get Document Content** to read its text for use in later workflow steps. Appending does not replace the existing content.

## Simple examples

- Add a webpage title and link to the end of a research document.
- Read instructions from a Google Doc and use them in a workflow.
- Add an AI-generated summary to an existing document.

## Set up the document

- **Action:** Choose **Append Text** or **Get Document Content**.
- **Google Document ID:** Enter the document’s ID. You can find it in the document’s web address.
- **Text to Append:** For **Append Text**, enter the content to add. You can include information from earlier workflow steps.

## Google account access

When prompted, sign in to the Google account you want to use and allow access. That account must be able to view the document to read it, or edit it to append text.

Use **View Doc** to open the configured document in Google Docs.

---

# Google Sheets

Use **Google Sheets** to add rows to a spreadsheet or read information from it in a workflow.

<img src="../../img/Google Sheets.png" alt="Google Sheets Step" />

## Overview

Choose **Append Row** to add a new row, or **Get Cell / Range Content** to read existing cells. When reading, you can optionally find rows containing an exact value.

## Simple examples

- Save a webpage title, link, and summary as a new row.
- Read a list of tasks from a sheet for use in a workflow.
- Find a row containing a particular project or issue name.

## Set up the spreadsheet

- **Action:** Choose **Append Row** or **Get Cell / Range Content**.
- **Spreadsheet ID:** Enter the ID from the spreadsheet’s web address.
- **Sheet Name / Cell Range:** Enter the sheet name and, if needed, the cells to use. For example, `Sheet1!A:C` selects columns A through C on a sheet named Sheet1.
- **Row Values (JSON Array):** For **Append Row**, enter the values in column order, such as `["Page title", "Page link", "Summary"]`.
- **Find Row Value:** When reading, enter a value to find. Only rows containing that exact value are returned.

## Google account access

When prompted, sign in to the Google account you want to use and allow access. That account must be able to edit the spreadsheet to add rows, or view it to read cells.

Use **View Sheet** to open the configured spreadsheet in Google Sheets.

---

# HubSpot Blog Post

## Overview

Use **HubSpot Blog Post** to create a new post in your HubSpot blog. You can save it as a draft or publish it immediately. The post body accepts HTML formatting, such as paragraphs and links.

## Simple examples

- Save a workflow-generated article as a draft so you can review it in HubSpot.
- Publish a prepared announcement to your blog immediately.
- Add a featured image and a short description for search results.

## Set up HubSpot access

Create a HubSpot private app and enable its content access permission. Use the app's access token in **App Access Token**. You also need the **Blog ID** for the blog where the post should appear.

You can store the access token and Blog ID under **Settings > Global Variables**, then select them with the token picker. This keeps you from entering the same values in every workflow.

## Add and configure the step

1. Add **HubSpot Blog Post** to your workflow.
2. Enter the **App Access Token** and **Blog ID**.
3. Enter a **Post Title** and **Post Body**. Both are required. Format the body as HTML; you can use the token picker to include information from earlier workflow steps.
4. Under **Post State**, choose **Draft** (the default) or **Published Immediately**.
5. Optionally add a **Featured Image URL**, **Meta Description**, or **Author ID**.
6. Optionally enter a **Custom Slug** for the post's web address. HubSpot uses lowercase letters and hyphens between words.

Choose **View Blog** to open the HubSpot blog.

---

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

---

# Jira Create Issue

## Overview

Use **Jira Create Issue** to create a new issue in a Jira project. It works with Jira Cloud and Jira Server/Data Center. You can write the issue details yourself or use information from earlier workflow steps.

## Simple examples

- Create a task with a summary and details generated by a workflow.
- Create a bug report using information collected from a webpage.

## Set up Jira access

You need your Jira site address, the project key, and credentials that can create issues in that project.

- For **Jira Cloud**, you need your Jira account email and an API token.
- For **Jira Server/Data Center**, you need a personal access token.

You can save credentials under **Settings > Global Variables** and select them with the token picker. This avoids entering them again in each workflow.

## Add and configure the step

1. Add **Jira Create Issue** to your workflow.
2. Enter the **Jira Base URL** and **Project Key**.
3. Enter an **Issue Type**, such as Task or Bug. The default is **Task**.
4. Enter the required **Summary / Title**. Add a **Description** if you want to include more details. Use the token picker to include information from earlier workflow steps.
5. Under **Advanced**, set **Authentication** to **Basic (Email & API Token - Cloud)** for Jira Cloud or **Personal Access Token - Server** for Server/Data Center.
6. Under **API Version**, choose **v3** for Jira Cloud or **v2** for Server/Data Center.

Choose **View Project** to open the configured project in Jira.

---

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

---

# Microsoft Excel

## Overview

Use **Microsoft Excel** to add a row to a table or read values from a worksheet in an Excel workbook stored in OneDrive or SharePoint.

## Use Cases

- Add a workflow result to a table, such as logging a completed task.
- Read a set of cells and use their contents in later workflow steps.
- Read a worksheet's used range when you want to work with its existing data.

## Set up Microsoft sign-in

Add your Microsoft app registration's client ID under **Settings > Global Variables**. Add a tenant ID if your organization requires one. The first time the workflow runs, sign in and approve access.

## Configure the step

1. Add **Microsoft Excel** to your workflow and choose **Append Row** or **Get Cell / Range Content**.
2. Enter the workbook's file item ID in **Workbook Item ID**.
3. Under **Sheet Name / Cell Range**, enter a worksheet name. To read specific cells, add `!` and a range, such as `Sheet1!A1:C5`. Enter only the worksheet name to read its used range.
4. For **Append Row**, enter an existing table name under **Table Name** (defaults to `Table1`) and provide **Row Values (JSON Array)** in the table's column order, such as `["Task", "Complete"]`.
5. Use the token picker to include values from earlier workflow steps.

Choose **View Excel File** to open the workbook in OneDrive.

---

# Microsoft Teams (`microsoftTeams`)

Send a message to Microsoft Teams using an incoming webhook, a team channel, or a group/direct chat.

## Use Cases

- Send a message to a Microsoft Teams channel using a webhook.
- Post a message to a team channel with a web page analysis.
- Add a message to a group chat when the web page issue is high-priority.

## Configuration

- **Integration Mode** (`sendMode`): `webhook` (default), `channel`, or `chat`.
- **Webhook URL** (`webhookUrl`): Required for webhook mode. Supports workflow tokens, such as `{{globals.teams_webhook_url}}`.
- **Team ID** (`teamId`) and **Channel ID** (`channelId`): Both required for channel mode.
- **Chat ID** (`chatId`): Required for chat mode.
- **Content Format** (`contentType`): `text` (default) or `html`. Applies to Graph channel and chat messages. Webhook messages are sent as text.
- **Message Content** (`message`): Required. Supports workflow tokens, such as `{{llm_1}}`.

## Output

On success, the step returns a `status`, `sendMode`, and `timestamp`. Webhook mode also returns `messageLength`; Graph modes may return `messageId`.

For example, use `{{ms_teams_1.status}}` to access the status of the first Microsoft Teams step.

## Example

```json
{
  "id": "ms_teams_1",
  "type": "microsoftTeams",
  "config": {
    "sendMode": "webhook",
    "webhookUrl": "{{globals.teams_webhook_url}}",
    "message": "Automated update: {{llm_1}}",
    "contentType": "text"
  }
}
```

**Open Teams** opens the Microsoft Teams web app.

---

# Microsoft Word (`microsoftWord`)

Use **Microsoft Word** to read text from a Word document or append templated text to an existing document stored in OneDrive or SharePoint.

## Use Cases

- Append a workflow result to a Word document.
- Read the content of a Word document for further processing in the workflow.

## Configuration

- **Action** (`action`): `append` (default) or `read`.
- **Document ID** (`documentId`): Required OneDrive or SharePoint item ID. Supports workflow tokens, such as `{{globals.word_document_id}}`.
- **Text to Append** (`textTemplate`): Required for `append`; supports workflow tokens such as `{{llm_1}}`. Hidden and disabled for `read`.

## Output

For **Get Document Content** (`read`):

- `{{ms_word_1.status}}`: `success`
- `{{ms_word_1.documentId}}`: Configured document ID
- `{{ms_word_1.text}}`: Document content as text

For **Append Text** (`append`):

- `{{ms_word_1.status}}`: `success`
- `{{ms_word_1.documentId}}`: Configured document ID
- `{{ms_word_1.appendedTextLength}}`: Length of the appended text
- `{{ms_word_1.result}}`: Parsed Microsoft Graph response, or an empty object if the response is not valid JSON

**View Doc** opens the document in OneDrive when the configured ID contains no unresolved template tokens.

## Example

```json
{
  "id": "ms_word_1",
  "type": "microsoftWord",
  "config": {
    "action": "append",
    "documentId": "{{globals.word_document_id}}",
    "textTemplate": "Document entry generated by AI:\n{{llm_1}}\n\n"
  }
}
```

---

# OpenAI/LLM

## Overview

Use **OpenAI/LLM** to send instructions and context to an AI provider and make its response available to later workflow steps. You can use the default provider settings or enter different settings for this step.

<img src="../../img/OpenAI.png" alt="OpenAI/LLM Step" />

## Simple examples

- Summarize text collected from a webpage.
- Draft a response using information someone enters when the workflow runs.
- Rewrite or organize information from earlier workflow steps.

## Set up an AI provider

You need an API key for the provider you want to use.

- To use saved default settings, open **Settings > General > Default LLM**, choose a **Provider**, enter its **OpenAI endpoint**, **API Key**, and **Model**, then save. In the workflow step, leave **Use Default LLM Config** selected.
- To use different settings for this step, clear **Use Default LLM Config**, then choose a **Provider** and enter its endpoint, API key, and model in the step.

The provider menu includes presets and an option for a custom endpoint.

## Add and configure the step

1. Add **OpenAI/LLM** to your workflow.
2. Under **Input/Context**, enter the information you want the AI to use. By default, this includes workflow user input and content from an earlier **Extract** step.
3. Under **System prompt**, give optional instructions for how the AI should respond.
4. Use the token picker in these fields to include information from earlier workflow steps.
5. To let someone enter information each time the workflow runs, add the user-input value from the token picker to **Input/Context**. A text field then appears on the workflow's run page.
6. Use the AI response in later steps by selecting it with the token picker.

---

# Page Action

## Overview

Use **Action** to control a webpage, manage browser tabs, or display and save workflow results. Some actions work with the active webpage; others work with browser tabs or the extension sidebar.

<img src="../../img/Action.png" alt="Page Action Step" />

## Simple examples

- Fill a webpage's search box and press Enter.
- Wait for search results to appear, then save a summary in **View Content**.
- Show a workflow result in the sidebar.

## Before you start

Actions that interact with webpage content need an active website tab. Chrome's built-in pages and blank tabs cannot be controlled this way. For **Click Element**, **Update Field**, **Wait for Selector**, or **Key Press**, click **View Element** and select the page item instead of typing its CSS selector yourself.

## Choose an action

Select an action from the **Action** menu:

- **Show in Sidebar** displays text or workflow results in the sidebar's **Result** area.
- **Append Content** saves text in **View Content**, where you can review, copy, or download saved clippings.
- **Navigate to URL** opens a web address in the active tab. Only HTTP or HTTPS addresses are supported; a path can be relative to the current website.
- **Switch to Tab** activates a tab by its web address or title. If you provide a web address that is not already open, it opens in a new tab.
- **Close Tab** closes a tab that matches the address or title you enter.
- **Refresh Tab** reloads the active tab.
- **Click Element** clicks a selected page item, such as a button or link.
- **Update Field** enters text into one page field.
- **Update Multiple Fields** enters text into several fields at once. This option requires a structured list of fields and values.
- **Wait/Delay** pauses the workflow for the number of seconds you enter.
- **Wait for Selector** waits up to 10 seconds for a page element to appear.
- **Key Press** sends a supported key, such as Enter or Tab, to the active field or selected page item.

**Auto** is also listed in the menu, but it does not currently perform an action.

## Configure the selected action

1. Choose the action you want to perform.
2. If the form shows **CSS Selector**, use **View Element** to select the page item. This is needed for actions such as clicking an item, updating a field, or waiting for an item to appear.
3. If the form shows **Value Template**, enter the text, web address, delay, or key required by that action. You can include results from earlier workflow steps.

When you use **Append Content**, choose **View Content** to open the saved clippings.

---

# Run Workflow (`runWorkflow`)

Run another saved workflow as a step in the current workflow. The selected workflow receives the current state, and its results are merged back into the current workflow. Workflows can be nested up to three levels.

<img src="../../img/Sub Workflow.png" alt="Run Sub-Workflow Step" />

## Use Cases

- When a workflow completes successfully, run another workflow.
- Use a re-usable workflow in other workflows.
- Conditionally decide which workflow to run

## Configuration

| Field | Required | Description |
| :-- | :-- | :-- |
| **Sub-Workflow** (`targetWorkflowName`) | Yes | Select another saved workflow. The name must exist at runtime. Template tokens are resolved before execution, so a token can provide the workflow name. |

## State and Output

The selected workflow starts with the current workflow state, including outputs from earlier steps. On success, its state is merged into the current workflow, and its step outputs can be referenced downstream by step ID (for example, `{{extract_1.title}}`).

The `run_workflow_1` state entry contains the final step’s output and has no plugin-defined properties. If the selected workflow has no steps, the output is `undefined`. Internal nesting-depth metadata is not merged into the parent state.

No sidebar action is provided.

## Example

```json
{
  "id": "run_workflow_1",
  "type": "runWorkflow",
  "config": {
    "targetWorkflowName": "Summarize page"
  }
}
```

`Summarize page` must be the exact name of another saved workflow.

---

# Set Variable (`setGlobal`)

Use **Set Variable** to save a value that this and later workflows can reuse. The value is saved in extension storage and is available immediately to later steps in the current workflow.

<img src="../../img/Set Variable.png" alt="Set Variable Step" />

## Configure

- **Variable Key** (`key`): Required. Use only letters, numbers, and underscores, such as `workflow_title`.
- **Variable Value / Template** (`value`): Required in the form; accepts workflow tokens such as `{{extract_1.title}}`. Although the form requires a value, the step can save an empty string.

The value's tokens are resolved first, then the result is evaluated as a Jexl expression. If evaluation fails, the resolved text is saved as-is. Available Jexl functions: `substring`, `lower`, `upper`, `trim`, and `replace`.

## Use the saved value

For a step with ID `global_1`, use `{{global_1.key}}` and `{{global_1.value}}` to access its output. To reuse the saved value as a global variable, use `{{globals.workflow_title}}`, replacing `workflow_title` with your configured key.

## Example

```json
{
  "id": "global_1",
  "type": "setGlobal",
  "config": {
    "key": "workflow_title",
    "value": "{{extract_1.title}}"
  }
}
```

---

# Slack Notification (`slack`)

Send messages to Slack using an Incoming Webhook. The plugin can use dynamic template tokens in its configuration.

## Simple Examples

- Send a simple message to a Slack channel using an Incoming Webhook.
- Share a webpage summary with its title and URL.
- Notify a team when a monitored value is found, such as `Price found: {{extract_1.price}}`.

## Configuration

| Field | Required | Description |
| :-- | :-- | :-- |
| `webhookUrl` | Yes | Slack Incoming Webhook URL, such as `https://hooks.slack.com/services/...`. Can use a global variable, for example `{{globals.slack_webhook_url}}`. |
| `message` | Yes | Message body. Supports multiline text and template tokens. |
| `channelUrl` | No | Slack channel link. When provided, displays an **Open Slack Channel** button in the sidebar. |

Use double-bracket tokens in `webhookUrl`, `message`, and `channelUrl`, such as `{{llm_1}}`.

After execution, the step records:

- `{{slack_1.status}}`: `"sent"` on success.
- `{{slack_1.timestamp}}`: Dispatch time in milliseconds.

## Example

```json
{
  "id": "slack_1",
  "type": "slack",
  "config": {
    "webhookUrl": "{{globals.slack_webhook_url}}",
    "channelUrl": "https://app.slack.com/client/T00000000/C00000000",
    "message": "🤖 *AI Web Summary*\n\n*Page:* {{extract_1.title}}\n*URL:* {{url.href}}\n\n*Summary:*\n{{llm_1}}"
  }
}
```

---

# Trello Create Card (`trelloCreateCard`)

Creates a card in a Trello list using the Trello REST API.

## Overview

The Trello Create Card plugin allows you to create a new card in a specified Trello list. You need to provide your Trello API key, OAuth token, and the destination list ID. You can also specify the card's title, description, and position within the list.

## Use Cases

- Automate the creation of Trello cards from extracted research data.
- Quickly add new tasks or ideas to a Trello list without leaving your workflow.
- Maintain a structured project management system by programmatically adding cards with relevant details.

## Configuration

| Field      | Required | Description                                                                    |
| :--------- | :------- | :----------------------------------------------------------------------------- |
| `apiKey`   | Yes      | Trello API key. Supports tokens, such as `{{globals.trello_api_key}}`.         |
| `apiToken` | Yes      | Trello OAuth token. Supports tokens, such as `{{globals.trello_oauth_token}}`. |
| `idList`   | Yes      | Destination list ID. Supports tokens, such as `{{globals.trello_list_id}}`.    |
| `name`     | Yes      | Card title. Supports tokens, such as `Research: {{extract_1.title}}`.          |
| `desc`     | No       | Card description. Defaults to an empty string and supports tokens.             |
| `pos`      | No       | Card position: `top` or `bottom`. Defaults to `top`; does not support tokens.  |

## Output

After the card is created, its data is available to downstream steps. For example:

- `{{trello_card_1.id}}`
- `{{trello_card_1.name}}`
- `{{trello_card_1.url}}`
- `{{trello_card_1.shortUrl}}`
- `{{trello_card_1.idList}}`
- `{{trello_card_1.idBoard}}`

## Sidebar Action

**View Trello** opens `https://trello.com` when the list ID is configured and contains no unresolved template token.

## Example

```json
{
  "id": "trello_card_1",
  "type": "trelloCreateCard",
  "config": {
    "apiKey": "{{globals.trello_api_key}}",
    "apiToken": "{{globals.trello_oauth_token}}",
    "idList": "{{globals.trello_list_id}}",
    "name": "Research: {{extract_1.title}}",
    "desc": "Source URL: {{url.href}}\n\nAI summary: {{llm_1}}",
    "pos": "top"
  }
}
```

---

# Settings

Use Settings to choose your default AI service, adjust the sidebar, and manage reusable values for your workflows.

<img src="../img/Settings General.png" alt="Settings - General" />

---

## Overview

Open **Settings** from the sidebar header, workflow list, or agent creation panel. Use it to choose your default AI service, adjust text size, and manage reusable workflow values. Choose **Save** to keep your changes or **Cancel** to discard them.

## Simple examples

- Set up your AI service once, then use it for workflow steps that are set to use the default AI settings.
- Save a webhook address or API key as a reusable value instead of entering it in every workflow.
- Make the sidebar text larger or smaller to suit your screen.
- Review or export text saved by an **Append Content** action in the Content Viewer.

---

## Default AI settings

In the **General** tab, choose a provider and enter the connection details it requires:

- **Provider**: Choose your AI service. The endpoint is filled in for supported providers; choose a custom endpoint if needed.
- **OpenAI Endpoint**: The service address. Check your provider's instructions if you use a custom endpoint.
- **API Key**: Enter the key supplied by your AI service. You may need to create an account with that service to get a key.
- **Model**: Enter the model name provided by your service.

These settings power the extension's AI helper features. Workflow AI steps can also use them when **Use Default LLM Config** is selected, so you do not have to enter the same connection details in each step.

---

## General settings

- **Sidebar text size**: Use the size slider to make text in the sidebar smaller or larger. Changes take effect as you move the slider.
- **View Content**: Open the Content Viewer in a browser tab to inspect, copy, export, or clear text saved by **Append Content** actions.

---

## Global Variables

Use this tab to save values you reuse in workflows, such as API keys, webhook addresses, and document IDs. You can add, edit, or delete saved values. Values are hidden when displayed to help protect them from being seen on screen.

<img src="../img/Settings Global.png" alt="Settings - Global Variables" />

(Bearer Token in API/Webhook headers)

To add a value, enter a name and its value, then save it. Names can contain letters, numbers, and underscores. In a workflow, choose a saved value from the **Insert workflow token** menu in a supported field.

---

# Standard Steps

The following are the types of steps you can include in a workflow:

**[Action](../plugins/page_action.md)** - Perform an action on the current browser page.

**[Extract](../plugins/extract.md)** - Extracts data from the current browser page, such as text content or attribute values.

**[Condition](../plugins/condition.md)** - Evaluates the specified value against a chosen operator and halts the workflow if the condition is not met.

**[Set Variable](../plugins/set_global.md)** - Set a global variable that can be accessed across workflows using the syntax {{globals.key}}.

**[Run Workflow](../plugins/run_workflow.md)** - Executes another saved workflow and merges its results into the current pipeline.

### Integrations and API Steps

See the [Integrations](../integrations.md) documentation for details on available integrations and how to configure them.

### New Step Screen

<img src="../img/New Step.png" alt="New Step" />
<br />
