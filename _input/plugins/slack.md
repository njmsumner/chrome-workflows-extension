# Slack Notification (`slack`)

The **Slack Notification** plugin posts automated messages to Slack channels using Slack Incoming Webhooks. It enables workflows to send extracted webpage content, LLM summaries, or custom alert payloads directly into your Slack workspace.

## Plugin Overview

| Property               | Value                                                 |
| :--------------------- | :---------------------------------------------------- |
| **Plugin Label**       | `Slack Notification`                                  |
| **Step Type (`type`)** | `slack`                                               |
| **Variable ID Prefix** | `slack` (e.g., `slack_1`, `slack_2`)                  |
| **Group / Category**   | Integration Plugins                                   |
| **Authentication**     | Webhook URL (stored directly or via Global Variables) |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label                     | Type     | Required | Description & Token Examples                                                                                                                                        |
| :--------------------- | :----------------------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `webhookUrl`           | **Slack Incoming Webhook URL** | `string` | **Yes**  | The Incoming Webhook URL generated in Slack App settings (e.g., `https://hooks.slack.com/services/...` or `{{globals.slack_webhook_url}}`).                         |
| `channelUrl`           | **Slack Channel URL**          | `string` | No       | Optional browser or deep-link URL to the target channel (e.g., `https://app.slack.com/client/...`). Used to power the **Open Slack Channel** button in the sidebar. |
| `message`              | **Message Payload**            | `string` | **Yes**  | The text message body sent to Slack. Supports multiline formatting and dynamic template tokens (e.g., `Hello, summary: {{llm_1}}`).                                 |

---

## Template Tokens & State Output

### Available Input Tokens

You can inject dynamic variables into the `message`, `webhookUrl`, or `channelUrl` fields using double-bracket syntax.

### Output State

When executed, the step records its execution status in the pipeline state for downstream steps:

- `{{slack_1.status}}`: String result (`"sent"` upon success).
- `{{slack_1.timestamp}}`: Epoch timestamp (in milliseconds) when the message was dispatched.

---

## Sidebar UI Actions

- **Open Slack Channel**: Displays a action button in the extension sidebar if `channelUrl` is provided, allowing users to jump directly to the target Slack channel.

---

## Example Workflow Configuration (JSON)

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
