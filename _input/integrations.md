# Integration Steps

**[API/Webhook](../plugins/api.md)** (api) - Executes an HTTP request to an API endpoint or webhook
Properties: config
Config: method, url, headers, body

**[OpenAI/LLM](../plugins/openai.md)** (openai) - Send a prompt to an OpenAI-compatible API and return the completion text
Properties: config
Config: openaiApiKey, openaiBaseUrl, openaiModel, useDefaultSettings, prompt, context

**[Confluence Page](../plugins/confluence.md)** (confluence) - Updates Confluence page via the REST API
Properties: config
Config: baseUrl, pageId, titleTemplate, contentTemplate, authType, email, apiToken

**[Gmail](../plugins/gmail.md)** (gmail) - Sends emails or saves drafts to Gmail.
Properties: config
Config: action, to, subject, body, contentType

**[Google Docs](../plugins/google-docs.md)** (googleDocs) - Append text to or reads content from a Google Doc
Properties: config
Config: action, documentId, textTemplate

**[Google Sheets](../plugins/google-sheets.md)** (googleSheets) - Append a row to or reads content from a Google Sheet
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

**[Slack Notification](../plugins/slack.md)** (slack) - Sends webhook messages to Slack channels
Properties: config
Config: webhookUrl, channelUrl, message

**[Trello Create Card](../plugins/trello-create-card.md)** (trelloCreateCard) - Creates a new card on a Trello board list.
Properties: config
Config: apiKey, apiToken, idList, name, desc, pos
