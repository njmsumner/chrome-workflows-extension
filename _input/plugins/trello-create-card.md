# Trello Create Card (`trelloCreateCard`)

The **Trello Create Card** plugin creates a card in a configured Trello list through the Trello REST API. Workflows can populate the card title and description with values from earlier steps and choose whether to place it at the top or bottom of the list.

## Plugin Overview

| Property               | Value                                                     |
| :--------------------- | :-------------------------------------------------------- |
| **Plugin Label**       | `Trello Create Card`                                      |
| **Step Type (`type`)** | `trelloCreateCard`                                        |
| **Variable ID Prefix** | `trello_card` (e.g., `trello_card_1`)                     |
| **Group / Category**   | Atlassian                                                 |
| **Authentication**     | Trello API key and OAuth token, sent with the API request |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label                | Type       | Required | Description & Token Examples                                                                                  |
| :--------------------- | :------------------------ | :--------- | :------- | :------------------------------------------------------------------------------------------------------------ |
| `apiKey`               | **Trello API Key**        | `password` | **Yes**  | Trello API key. Supports tokens, for example `{{globals.trello_api_key}}`.                                    |
| `apiToken`             | **Trello Token / Secret** | `password` | **Yes**  | Trello OAuth token. Supports tokens, for example `{{globals.trello_oauth_token}}`.                            |
| `idList`               | **List ID (idList)**      | `string`   | **Yes**  | ID of the destination Trello list. Supports tokens, such as `{{globals.trello_list_id}}`.                     |
| `name`                 | **Card Name / Title**     | `string`   | **Yes**  | New card title. Supports tokens, for example `Research: {{extract_1.title}}`.                                 |
| `desc`                 | **Description**           | `textarea` | No       | Card description; defaults to an empty string. Supports tokens, such as `{{url.href}}` or `{{llm_1}}`.        |
| `pos`                  | **Position**              | `select`   | No       | Card position in the list: `top` or `bottom`. Defaults to `top`; this field is not token-enabled in the form. |

---

## Template Tokens & State Output

### Available Input Tokens

The API key, OAuth token, list ID, card name, and description fields accept workflow template tokens. The position selector does not.

### Output State

After a successful card creation, downstream steps can reference the returned Trello card data:

- `{{trello_card_1.id}}`: Card ID.
- `{{trello_card_1.name}}`: Card name.
- `{{trello_card_1.url}}`: Card URL.
- `{{trello_card_1.shortUrl}}`: Short card URL.
- `{{trello_card_1.idList}}`: ID of the list containing the card.
- `{{trello_card_1.idBoard}}`: ID of the board containing the card.

## Sidebar UI Actions

- **View Trello**: Opens `https://trello.com` when the list ID is configured and resolves without an unresolved template token. It does not open a list-specific URL.

---

## Example Workflow Configuration (JSON)

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
