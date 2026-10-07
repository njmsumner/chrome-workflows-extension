# Jira Comment (`jiraComment`)

The **Jira Comment** plugin posts a comment to a Jira issue using the Jira REST API. It supports Jira Cloud and Server/Data Center, with v3 rich-text or v2 plain-text comment formats and Basic or personal-access-token authentication.

<img src="../../img/Jira Comment.png" alt="Jira Comment Step" />

## Plugin Overview

| Property               | Value                                                |
| :--------------------- | :--------------------------------------------------- |
| **Plugin Label**       | `Jira Comment`                                       |
| **Step Type (`type`)** | `jiraComment`                                        |
| **Variable ID Prefix** | `jira` (e.g., `jira_1`, `jira_2`)                    |
| **Group / Category**   | Atlassian                                            |
| **Authentication**     | Basic (email and API token) or personal access token |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label                 | Type       | Required                         | Description & Token Examples                                                                                                                          |
| :--------------------- | :------------------------- | :--------- | :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domainUrl`            | **Jira Base URL**          | `url`      | **Yes**                          | Jira site base URL, such as `https://your-domain.atlassian.net`; trailing slashes are removed before the API request.                                 |
| `issueKey`             | **Issue Key**              | `text`     | **Yes**                          | Issue key or ID to comment on, such as `PROJ-123`.                                                                                                    |
| `email`                | **Email Address**          | `email`    | **Yes for Basic authentication** | Jira account email; shown and required at execution only when **Basic** authentication is selected. Supports tokens such as `{{globals.jira_email}}`. |
| `apiToken`             | **API Token / Secret Key** | `password` | **Yes**                          | API token for Basic authentication or a personal access token for Server/Data Center. Supports `{{globals.jira_api_token}}`.                          |
| `commentText`          | **Comment Text**           | `textarea` | **Yes**                          | Comment content. Supports workflow tokens, such as `{{llm_1}}`.                                                                                       |
| `apiVers`              | **API Version**            | `select`   | **Yes** (defaults to `v3`)       | `v3` uses Jira Cloud ADF rich text; `v2` uses Server/classic plain text.                                                                              |
| `authMethod`           | **Authentication**         | `select`   | No (defaults to `basic`)         | Choose Basic (email and API token) or a personal access token. Email is only needed for Basic authentication.                                         |

---

## Template Tokens & State Output

### Available Input Tokens

The workflow runner resolves template tokens before execution. The form exposes token insertion for **Email Address**, **API Token / Secret Key**, and **Comment Text**; for example, use `{{globals.jira_api_token}}` for the credential or `{{llm_1}}` in the comment.

### Output State

On success, the step returns the Jira API's parsed JSON response object directly when one is available. Downstream steps can reference returned properties, for example:

- `{{jira_1.id}}`: Comment ID, when included in the API response.
- `{{jira_1.author}}`: Author details, when included in the API response.
- `{{jira_1.created}}`: Creation timestamp, when included in the API response.
- `{{jira_1.status}}`: `success` when JSON parsing fails or the parsed value is `null` or a primitive.

## Sidebar UI Actions

- **View Issue**: Opens the Jira issue in the browser when both the base URL and issue key are configured and resolve without unresolved template tokens.

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "jira_1",
	"type": "jiraComment",
	"config": {
		"domainUrl": "https://your-domain.atlassian.net",
		"issueKey": "PROJ-123",
		"commentText": "Workflow update: {{llm_1}}",
		"apiVers": "v3",
		"authMethod": "basic",
		"email": "{{globals.jira_email}}",
		"apiToken": "{{globals.jira_api_token}}"
	}
}
```
