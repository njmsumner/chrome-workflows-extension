# Chrome Workflows Extension Documentation

## Contents

- [Overview](#overview)
- [Get Started](#get-started)
- [What is a Workflow](#what-is-a-workflow)
- [Steps](#steps)

## Overview

The Chrome Workflows Extension allows you to automate repetitive tasks within your browser by creating workflows composed of various steps.
These workflows can interact with web pages, APIs, and popular services like Google Workspace, Microsoft Office, Slack, and more.

## Get Started

To get started with the Chrome Workflows Extension:

1. Install the extension from the Chrome Web Store.
2. Click on the extension icon in the Chrome toolbar to open the extension sidebar.
3. A default workflow will be displayed, and you can start configuring it according to your needs.
4. You can also use any of the sample template Workflows by clicking 'Create' in the top menu.

## What is a Workflow

A workflow is a sequence of steps that automate tasks within the Chrome Workflows Extension.
Each step performs a specific action, such as updating fields or clicking elements in the current tab, making an API or LLM request, updating a Google Doc or sending an email.
Workflows allow you to streamline repetitive tasks and integrate various services seamlessly.

## Steps

### Standard Steps

The following are the types of steps you can include in a workflow:

**Action** - Perform an action on the current browser page.

- Show in Sidebar
- Append Content
- Switch Tab
- Navigate URL
- Update Field
- Update Fields
- Click Element
- Wait
- Wait For Selector
- Key Press
- Refresh Tab

**Extract** - Extracts data from the current browser page, such as text content or attribute values.

**Condition** - Evaluates the specified value against a chosen operator and halts the workflow if the condition is not met.

**[Set Variable](plugins/set-global.md)** - Set a global variable that can be accessed across workflows using the syntax {{globals.key}}.

**Run Workflow** - Executes another saved workflow and merges its results into the current pipeline.

### Integration Steps

**[API/Webhook](plugins/api.md)** (api) - Executes an HTTP request to an API endpoint or webhook
Properties: config
Config: method, url, headers, body

**OpenAI/LLM** (openai) - Send a prompt to an OpenAI-compatible API and return the completion text
Properties: config
Config: openaiApiKey, openaiBaseUrl, openaiModel, useDefaultSettings, prompt, context

**[Confluence Page](plugins/confluence.md)** (confluence) - Updates Confluence page via the REST API
Properties: config
Config: baseUrl, pageId, titleTemplate, contentTemplate, authType, email, apiToken

**[Gmail](plugins/gmail.md)** (gmail) - Sends emails or saves drafts to Gmail.
Properties: config
Config: action, to, subject, body, contentType

**[Google Docs](plugins/google-docs.md)** (googleDocs) - Append text to or reads content from a Google Doc
Properties: config
Config: action, documentId, textTemplate

**[Google Sheets](plugins/google-sheets.md)** (googleSheets) - Append a row to or reads content from a Google Sheet
Properties: config
Config: action, spreadsheetId, sheetRange, rowValues, filter

**HubSpot Blog Post** (hubspotBlog) - Update HubSpot CMS blog posts via the CMS API
Properties: config
Config: accessToken, blogId, authorId, postName, postBody, postState, featuredImage, metaDescription, slug

**Jira Comment** (jiraComment) - Adds a comment to the Jira issue.
Properties: config
Config: domainUrl, issueKey, commentText, apiVers, authMethod, email, apiToken

**Jira Create Issue** (jiraIssue) - Creates a new issue in Jira (e.g. Task, Bug, Story).
Properties: config
Config: domainUrl, projectKey, summary, issueType, description, apiVers, authMethod, email, apiToken

**Microsoft Outlook Email** (microsoftEmail) - Sends an email or saves a draft using Microsoft Outlook.
Properties: config
Config: action, to, subject, body, contentType

**Microsoft Excel** (microsoftExcel) - Append rows to an Excel table/worksheet and retrieve cell/range content.
Properties: config
Config: action, workbookId, sheetRange, tableName, rowValues

**Microsoft Teams** (microsoftTeams) - Send messages to Microsoft Teams.
Properties: config
Config: sendMode, webhookUrl, teamId, channelId, chatId, message, contentType

**Microsoft Word** (microsoftWord) - Append or read content from a Microsoft Word document.
Properties: config
Config: action, documentId, textTemplate

**[Slack Notification](plugins/slack.md)** (slack) - Sends webhook messages to Slack channels
Properties: config
Config: webhookUrl, channelUrl, message

**[Trello Create Card](plugins/trello-create-card.md)** (trelloCreateCard) - Creates a new card on a Trello board list.
Properties: config
Config: apiKey, apiToken, idList, name, desc, pos
