# Slack Notification (`slack`)

Send messages to Slack using an Incoming Webhook. The plugin can use dynamic template tokens in its configuration.

## Simple Examples

- Send a simple message to a Slack channel using an Incoming Webhook.
- Share a webpage summary with its title and URL.
- Notify a team when a monitored value is found, such as `Price found: {{extract_1.price}}`.

## Configuration

| Field        | Required | Description                                                                                                                                         |
| :----------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `webhookUrl` | Yes      | Slack Incoming Webhook URL, such as `https://hooks.slack.com/services/...`. Can use a global variable, for example `{{globals.slack_webhook_url}}`. |
| `message`    | Yes      | Message body. Supports multiline text and template tokens.                                                                                          |
| `channelUrl` | No       | Slack channel link. When provided, displays an **Open Slack Channel** button in the sidebar.                                                        |

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
