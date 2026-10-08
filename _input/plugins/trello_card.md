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
