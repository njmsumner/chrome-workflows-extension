# Confluence Page (`confluence`)

The **Confluence Page** plugin updates an existing Confluence page through the Confluence REST API. Workflows can set a page title and XHTML storage-format body using values from earlier steps.

## Plugin Overview

| Property               | Value                                                                    |
| :--------------------- | :----------------------------------------------------------------------- |
| **Plugin Label**       | `Confluence Page`                                                        |
| **Step Type (`type`)** | `confluence`                                                             |
| **Variable ID Prefix** | `confluence` (e.g., `confluence_1`)                                      |
| **Group / Category**   | Atlassian                                                                |
| **Authentication**     | Basic Auth (email/username and API token/password) or bearer token (PAT) |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label                           | Type       | Required               | Description & Token Examples                                                                                                                                       |
| :--------------------- | :----------------------------------- | :--------- | :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseUrl`              | **Confluence Base URL**              | `url`      | **Yes**                | Base URL of the Confluence instance, such as `https://your-domain.atlassian.net/wiki`. Trailing slashes are removed before API requests.                           |
| `pageId`               | **Page ID (Content ID)**             | `string`   | **Yes**                | Content ID of the existing Confluence page to update.                                                                                                              |
| `titleTemplate`        | **Page Title (Optional)**            | `string`   | No                     | Optional replacement title. When blank, the current page title is retained. Supports template tokens, such as `{{llm_1}}`.                                         |
| `contentTemplate`      | **Page Body (XHTML Storage Format)** | `textarea` | No                     | Page body in Confluence XHTML storage format. Defaults to `<p>Updated content: {{llm_1}}</p>` and supports template tokens.                                        |
| `authType`             | **Authentication Type**              | `select`   | **Yes**                | Choose `basic` (Basic Auth (Cloud API Token)) or `bearer` (Personal Access Token / PAT). Defaults to `basic`.                                                      |
| `email`                | **Email Address / Username**         | `email`    | **Yes for Basic Auth** | Account email or username used with Basic authentication. Not required for bearer authentication.                                                                  |
| `apiToken`             | **API Token / Password** or **PAT**  | `password` | **Yes**                | API token/password for Basic authentication or personal access token for bearer authentication. Supports template tokens, e.g. `{{globals.confluence_api_token}}`. |

---

## Template Tokens & State Output

### Available Input Tokens

The title, page body, and credential fields are marked as token-enabled in the configuration form.

Use `titleTemplate` to provide a dynamic page title and `contentTemplate` to include dynamic values in the XHTML body.
The API token field can reference a secret stored as a global variable.

### Output State

After a successful update, downstream steps can reference the returned page metadata:

- `{{confluence_1.id}}`: Updated page content ID.
- `{{confluence_1.title}}`: Updated page title.
- `{{confluence_1.version}}`: Updated page version number.
- `{{confluence_1.url}}`: Confluence page URL when returned by the API; otherwise `null`.

---

## Sidebar UI Actions

- **View Page**: Opens the Confluence page when both the base URL and page ID are configured and resolve to complete values.

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "confluence_1",
	"type": "confluence",
	"config": {
		"baseUrl": "https://your-domain.atlassian.net/wiki",
		"pageId": "123456789",
		"titleTemplate": "Workflow summary: {{llm_1}}",
		"contentTemplate": "<p>Summary: {{llm_1}}</p>",
		"authType": "bearer",
		"email": "",
		"apiToken": "{{globals.confluence_api_token}}"
	}
}
```
