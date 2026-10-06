# Microsoft Teams (`microsoftTeams`)

The **Microsoft Teams** plugin sends a message through an incoming webhook or Microsoft Graph. Graph modes can post to a team channel or group/direct chat, with plain-text or HTML message content.

## Plugin Overview

| Property               | Value                                                                  |
| :--------------------- | :--------------------------------------------------------------------- |
| **Plugin Label**       | `Microsoft Teams`                                                      |
| **Step Type (`type`)** | `microsoftTeams`                                                       |
| **Variable ID Prefix** | `ms_teams` (e.g., `ms_teams_1`, `ms_teams_2`)                          |
| **Group / Category**   | Microsoft                                                              |
| **Authentication**     | Incoming Webhook for webhook mode; Microsoft OAuth 2.0 for Graph modes |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label           | Type       | Required                   | Description & Token Examples                                                                                                         |
| :--------------------- | :------------------- | :--------- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `sendMode`             | **Integration Mode** | `select`   | No (defaults to `webhook`) | Choose Incoming Webhook (`webhook`), Team Channel (`channel`), or Group / Direct Chat (`chat`).                                      |
| `webhookUrl`           | **Webhook URL**      | `url`      | **Yes for webhook mode**   | Incoming Webhook URL; required and shown only in webhook mode. Supports tokens such as `{{globals.teams_webhook_url}}`.              |
| `teamId`               | **Team ID**          | `text`     | **Yes for channel mode**   | Microsoft Teams team ID; required with `channelId` in channel mode. Supports workflow tokens.                                        |
| `channelId`            | **Channel ID**       | `text`     | **Yes for channel mode**   | Channel ID; required with `teamId` in channel mode. Supports workflow tokens.                                                        |
| `chatId`               | **Chat ID**          | `text`     | **Yes for chat mode**      | Microsoft Teams chat ID; required in chat mode. Supports workflow tokens.                                                            |
| `contentType`          | **Content Format**   | `select`   | No (defaults to `text`)    | Choose Plain Text (`text`) or HTML (`html`). Used for Graph channel/chat messages; webhook mode sends the message as `text`.         |
| `message`              | **Message Content**  | `textarea` | **Yes**                    | Message text or HTML, depending on mode and content format. Defaults to a template containing `{{llm_1}}`; supports workflow tokens. |

---

## Template Tokens & State Output

### Available Input Tokens

The form exposes token insertion for **Webhook URL**, **Team ID**, **Channel ID**, **Chat ID**, and **Message Content**. For example, use `{{globals.teams_webhook_url}}` for the webhook or `{{llm_1}}` in the message.

### Output State

On success, webhook mode returns:

- `{{ms_teams_1.status}}`: `success`.
- `{{ms_teams_1.sendMode}}`: `webhook`.
- `{{ms_teams_1.messageLength}}`: Message length in characters.
- `{{ms_teams_1.timestamp}}`: Completion time in ISO 8601 format.

Graph channel/chat modes return `status`, `sendMode`, `messageId` (if Graph returns a string ID), and `timestamp`.

## Sidebar UI Actions

- **Open Teams**: Opens the Microsoft Teams web app, regardless of the selected send mode.

---

## Example Workflow Configuration (JSON)

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
