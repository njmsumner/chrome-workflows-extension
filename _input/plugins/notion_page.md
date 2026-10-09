# Create a Notion page

## Overview

Use this step to add a page to a Notion database. The page title is required; you can also add optional body text.

## Simple examples

- Save a webpage title and link in a research database.
- Add an AI-generated summary to a new page for later review.
- Save details gathered by a workflow in a Notion database.

## Before you start

You need a Notion internal integration secret and the ID of the database where the page should be created. Make sure the integration has access to that database; you can find the database ID in its URL.

---

## Page details

| Field Key (`config.*`) | Form Label                      | Type     | Required | Description & Token Examples                                                                                                               |
| :--------------------- | :------------------------------ | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `apiToken`             | **Internal Integration Secret** | `string` | **Yes**  | Notion Internal Integration Token starting with `ntn_...` or `secret_...` (e.g., `{{globals.notion_api_token}}`).                          |
| `databaseId`           | **Database ID**                 | `string` | **Yes**  | The 32-character ID of your target Notion database (e.g., `a1b2c3d4e5f678901234567890abcdef` or `{{globals.notion_database_id}}`).         |
| `title`                | **Page Title**                  | `string` | **Yes**  | The title string for the newly created page (e.g., `Research: {{extract_1.title}}`). Maps to the database's primary `Name` title property. |
| `content`              | **Page Content (Body)**         | `string` | No       | Body text or markdown content inserted into the page as a paragraph block (e.g., `URL: {{url.href}}\n\nSummary:\n{{llm_1}}`).              |

---

## Template Tokens & State Output

### Available Input Tokens

Dynamic workflow variables can be injected into any configuration field using double-bracket token syntax:

- **Workflow Outputs:** `{{extract_1.title}}`, `{{llm_1}}`
- **Global Variables & Secrets:** `{{globals.notion_api_token}}`, `{{globals.notion_database_id}}`
- **System Metadata:** `{{url.href}}`, `{{userInput}}`, `{{datetime}}`

### Output State (`{{notion_page_1.*}}`)

When executed successfully, downstream steps can reference properties of the created page:

- `{{notion_page_1.id}}`: The unique Notion page ID (e.g., `page_1234567890`).
- `{{notion_page_1.url}}`: The direct web link to open the created page in Notion.
- `{{notion_page_1.createdTime}}`: ISO 8601 creation timestamp.

---

## Sidebar UI Actions

- **View Notion DB**: Displays an action button in the sidebar panel that opens the target database in your browser (`https://notion.so/${cleanDatabaseId}`).

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "notion_page_1",
	"type": "notionCreatePage",
	"config": {
		"apiToken": "{{globals.notion_api_token}}",
		"databaseId": "{{globals.notion_database_id}}",
		"title": "Article: {{extract_1.title}}",
		"content": "Source URL: {{url.href}}\nCaptured: {{datetime}}\n\nAI Executive Summary:\n{{llm_1}}"
	}
}
```
