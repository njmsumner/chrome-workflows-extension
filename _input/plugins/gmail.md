## Google Gmail Plugin (`gmail`)

The **Google Gmail** plugin allows automated browser workflows to dispatch emails or create draft messages using the official Gmail REST API (`https://gmail.googleapis.com/gmail/v1/users/me/`). Email payloads are formatted as RFC 2822 standard messages and converted to URL-safe base64 strings prior to transmission.

### Plugin Overview

| Property               | Value                                                                                                                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **Plugin Label**       | `Google Gmail` (UI Display: `Gmail`)                                                                                       |
| **Step Type (`type`)** | `gmail`                                                                                                                    |
| **Variable ID Prefix** | `gmail` (e.g., `gmail_1`, `gmail_2`)                                                                                       |
| **Group / Category**   | `Google`                                                                                                                   |
| **Authentication**     | OAuth2 Bearer Token (`chrome.identity.getAuthToken`)                                                                       |
| **API Endpoints**      | `https://gmail.googleapis.com/gmail/v1/users/me/messages/send`<br/>`https://gmail.googleapis.com/gmail/v1/users/me/drafts` |

### Configuration Fields

| Field Key (`config.*`) | Form Label         | Type                             | Required | Description & Token Examples                                                                                                        |
| :--------------------- | :----------------- | :------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `action`               | **Action**         | `select` (`'send'` \| `'draft'`) | **Yes**  | Specifies whether to dispatch the message immediately (`'send'`) or save it to Gmail Drafts (`'draft'`). Default: `'draft'`.        |
| `to`                   | **Recipient (To)** | `string`                         | **Yes**  | Destination email address. Supports dynamic tokens (e.g., `user@example.com` or `{{extract_1.email}}`). Line breaks are prohibited. |
| `subject`              | **Subject**        | `string`                         | **Yes**  | Email subject line template. Supports tokens (e.g., `Automated Update: {{extract_1.title}}`).                                       |
| `contentType`          | **Content Type**   | `select` (`'Text'` \| `'HTML'`)  | **Yes**  | Specifies body markup format. `'Text'` maps to `text/plain`, while `'HTML'` maps to `text/html`. Default: `'Text'`.                 |
| `body`                 | **Email Body**     | `string`                         | **Yes**  | Multiline body template. Supports dynamic tokens (e.g., `Hi,\n\nHere is the summary:\n{{llm_1}}\n\nBest regards`).                  |

### Template Tokens & State Output

#### Available Input Tokens

You can inject dynamic workflow values into `to`, `subject`, and `body` fields:

- **Workflow Outputs:** `{{extract_1.title}}`, `{{llm_1}}`, `{{extract_1.selection}}`
- **Global Variables:** `{{globals.recipient_email}}`
- **System Variables:** `{{url.href}}`, `{{userInput}}`, `{{datetime}}`

#### Output State

When executed, the step returns a JSON object stored under its step ID in the workflow state:

- **For Send Action (`action: 'send'`):**
    - `{{gmail_1.status}}`: `"success"`
    - `{{gmail_1.action}}`: `"send"`
    - `{{gmail_1.id}}`: Sent message ID string from Gmail API.
    - `{{gmail_1.threadId}}`: Gmail thread ID.
    - `{{gmail_1.to}}`: Resolved recipient email.
    - `{{gmail_1.subject}}`: Resolved subject header.

- **For Draft Action (`action: 'draft'`):**
    - `{{gmail_1.status}}`: `"success"`
    - `{{gmail_1.action}}`: `"draft"`
    - `{{gmail_1.draftId}}`: Created draft ID string.
    - `{{gmail_1.messageId}}`: Underlying message ID within the draft.
    - `{{gmail_1.to}}`: Resolved recipient email.
    - `{{gmail_1.subject}}`: Resolved subject header.

### Sidebar UI Actions

- **View Drafts / Open Gmail**: Displays an interactive button in the sidebar panel (`viewContentSection`).
    - If `action === 'draft'`, clicking **View Drafts** opens `https://mail.google.com/mail/u/0/#drafts` in a new browser tab.
    - If `action === 'send'`, clicking **Open Gmail** opens `https://mail.google.com/mail/u/0/#inbox` in a new tab.

### Example Workflow Configurations

#### Example 1: Save Email Draft with Page Details

```json
{
	"id": "gmail_1",
	"type": "gmail",
	"config": {
		"action": "draft",
		"to": "{{globals.recipient_email}}",
		"subject": "Research Summary: {{extract_1.title}}",
		"contentType": "Text",
		"body": "Hi Team,\n\nHere is the summary generated from {{url.href}}:\n\n{{llm_1}}\n\nBest regards,\nAutomated Workflow"
	}
}
```
