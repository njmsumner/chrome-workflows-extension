# Microsoft Outlook Email (`microsoftEmail`)

The **Microsoft Outlook Email** plugin sends an email through Microsoft Graph or saves it as a draft. It supports dynamic recipients, subjects, and message bodies, with plain-text or HTML content.

## Plugin Overview

| Property               | Value                                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------------------- |
| **Plugin Label**       | `Microsoft Outlook Email`                                                                          |
| **Step Type (`type`)** | `microsoftEmail`                                                                                   |
| **Variable ID Prefix** | `ms_email` (e.g., `ms_email_1`, `ms_email_2`)                                                      |
| **Group / Category**   | Microsoft                                                                                          |
| **Authentication**     | Microsoft OAuth 2.0; uses global `ms_client_id` and optional `ms_tenant_id` (defaults to `common`) |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label            | Type       | Required                | Description & Token Examples                                                                                                            |
| :--------------------- | :-------------------- | :--------- | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `action`               | **Action**            | `select`   | No (defaults to `send`) | Choose **Send Email** (`send`) or **Save as Draft** (`draft`).                                                                          |
| `to`                   | **Recipient (To)**    | `text`     | **Yes**                 | Recipient email addresses, separated by commas or semicolons. Empty entries are ignored. Supports tokens such as `{{extract_1.email}}`. |
| `subject`              | **Subject**           | `text`     | **Yes**                 | Email subject; defaults to `Automated Update from AI Extension`. Supports tokens such as `{{extract_1.title}}`.                         |
| `contentType`          | **Body Content Type** | `select`   | No (defaults to `Text`) | Choose **Plain Text** (`Text`) or **HTML** (`HTML`).                                                                                    |
| `body`                 | **Email Body**        | `textarea` | **Yes**                 | Message content; defaults to a templated greeting containing `{{llm_1}}`. Supports workflow tokens.                                     |

---

## Template Tokens & State Output

### Available Input Tokens

The form exposes token insertion for **Recipient (To)**, **Subject**, and **Email Body**. For example, use `{{extract_1.email}}` for a recipient and `{{llm_1}}` in the message body.

### Output State

On success, both actions return `status`, `action`, `to`, and `subject`:

- `{{ms_email_1.status}}`: `success`.
- `{{ms_email_1.action}}`: `send` or `draft`.
- `{{ms_email_1.to}}`: Configured recipient string.
- `{{ms_email_1.subject}}`: Email subject.

Draft actions also return:

- `{{ms_email_1.messageId}}`: Draft message ID from Microsoft Graph.
- `{{ms_email_1.webLink}}`: Draft web link from Microsoft Graph, when returned.

## Sidebar UI Actions

- **Open Outlook**: Opens Outlook Web Mail when the action is `send` (or not `draft`).
- **View Drafts**: Opens the Outlook drafts folder when the action is `draft`.

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "ms_email_1",
	"type": "microsoftEmail",
	"config": {
		"action": "send",
		"to": "{{extract_1.email}}",
		"subject": "Workflow summary: {{extract_1.title}}",
		"body": "Hi,\n\n{{llm_1}}",
		"contentType": "Text"
	}
}
```
