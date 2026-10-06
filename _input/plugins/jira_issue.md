# Jira Create Issue (`jiraIssue`)

The **Jira Create Issue** plugin creates a Jira issue in a selected project. It supports Jira Cloud and Server/Data Center, using the v3 ADF or v2 classic description format and Basic or personal-access-token authentication.

## Plugin Overview

| Property               | Value                                                |
| :--------------------- | :--------------------------------------------------- |
| **Plugin Label**       | `Jira Create Issue`                                  |
| **Step Type (`type`)** | `jiraIssue`                                          |
| **Variable ID Prefix** | `jira_issue` (e.g., `jira_issue_1`, `jira_issue_2`)  |
| **Group / Category**   | Atlassian                                            |
| **Authentication**     | Basic (email and API token) or personal access token |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label                 | Type       | Required                         | Description & Token Examples                                                                                               |
| :--------------------- | :------------------------- | :--------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `domainUrl`            | **Jira Base URL**          | `url`      | **Yes**                          | Jira site base URL, such as `https://your-domain.atlassian.net`; trailing slashes are removed before the request.          |
| `projectKey`           | **Project Key**            | `text`     | **Yes**                          | Project key where the issue will be created, such as `PROJ`; execution trims and uppercases it.                            |
| `issueType`            | **Issue Type**             | `text`     | **Yes** (defaults to `Task`)     | Issue type name, such as `Task`, `Bug`, or `Story`. Execution uses `Task` if blank.                                        |
| `summary`              | **Summary / Title**        | `text`     | **Yes**                          | Issue summary. Supports tokens, such as `{{extract_1.title}}`.                                                             |
| `description`          | **Description**            | `textarea` | No                               | Optional issue details. Supports tokens, such as `{{llm_1}}`; v3 converts the text to ADF, while v2 sends it as text.      |
| `email`                | **Email Address**          | `email`    | **Yes for Basic authentication** | Jira account email; shown and required at execution only for Basic authentication. Supports `{{globals.jira_email}}`.      |
| `apiToken`             | **API Token / Secret Key** | `password` | **Yes**                          | API token for Basic authentication or personal access token for Server/Data Center. Supports `{{globals.jira_api_token}}`. |
| `apiVers`              | **API Version**            | `select`   | **Yes** (defaults to `v3`)       | Choose `v3` (Jira Cloud, ADF) or `v2` (Server/classic text).                                                               |
| `authMethod`           | **Authentication**         | `select`   | No (defaults to `basic`)         | Choose Basic authentication (email and API token) or personal access token.                                                |

---

## Template Tokens & State Output

### Available Input Tokens

The form exposes token insertion for **Summary / Title**, **Description**, **Email Address**, and **API Token / Secret Key**. The workflow runner resolves tokens before execution; for example, use `{{extract_1.title}}` in a summary and `{{llm_1}}` in a description.

### Output State

On success, the plugin returns an object with these properties:

- `{{jira_issue_1.id}}`: Jira issue ID from the API response.
- `{{jira_issue_1.key}}`: Jira issue key. The plugin requires this value in the API response.
- `{{jira_issue_1.self}}`: Jira API URL from the response.
- `{{jira_issue_1.issueUrl}}`: Browser URL for the created issue, built from the configured Jira base URL and returned issue key.

## Sidebar UI Actions

- **View Project**: Opens the Jira project page when the configured base URL and project key resolve without unresolved template tokens.

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "jira_issue_1",
	"type": "jiraIssue",
	"config": {
		"domainUrl": "https://your-domain.atlassian.net",
		"projectKey": "PROJ",
		"issueType": "Task",
		"summary": "[AI] {{extract_1.title}}",
		"description": "{{llm_1}}",
		"apiVers": "v3",
		"authMethod": "basic",
		"email": "{{globals.jira_email}}",
		"apiToken": "{{globals.jira_api_token}}"
	}
}
```
