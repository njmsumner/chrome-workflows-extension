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
