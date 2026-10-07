## Google Sheets Plugin (`googleSheets`)

The **Google Sheets** plugin integrates with Google Sheets REST API v4 (`https://sheets.googleapis.com/v4/spreadsheets/`). It provides bidirectional capabilities: appending structured rows of data to a spreadsheet or reading cell range values with optional exact row filtering.

<img src="../../img/Google Sheets.png" alt="Google Sheets Step" />

### Plugin Overview

| Property               | Value                                                                                                                                                                                                            |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plugin Label**       | `Google Sheets`                                                                                                                                                                                                  |
| **Step Type (`type`)** | `googleSheets`                                                                                                                                                                                                   |
| **Variable ID Prefix** | `google_sheets` (e.g., `google_sheets_1`, `google_sheets_2`)                                                                                                                                                     |
| **Group / Category**   | `Google`                                                                                                                                                                                                         |
| **Authentication**     | OAuth2 Bearer Token (`chrome.identity.getAuthToken`)                                                                                                                                                             |
| **API Endpoints**      | `https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{sheetRange}`<br/>`https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{sheetRange}:append?valueInputOption=USER_ENTERED` |

### Configuration Fields

| Field Key (`config.*`) | Form Label                  | Type                              | Required                          | Description & Token Examples                                                                                                            |
| :--------------------- | :-------------------------- | :-------------------------------- | :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `action`               | **Action**                  | `select` (`'append'` \| `'read'`) | **Yes**                           | Specifies whether to append a row (`'append'`) or read cell/range content (`'read'`). Default: `'append'`.                              |
| `spreadsheetId`        | **Spreadsheet ID**          | `string`                          | **Yes**                           | ID string from Google Sheets URL (`docs.google.com/spreadsheets/d/[ID]/edit`). Supports tokens (e.g., `{{globals.google_sheet_id}}`).   |
| `sheetRange`           | **Sheet Name / Cell Range** | `string`                          | **Yes**                           | Target worksheet and range (e.g., `Sheet1!A1`, `Sheet1!A:E`, or `Sheet1`). Default: `Sheet1!A1`.                                        |
| `rowValues`            | **Row Values (JSON Array)** | `string`                          | **Yes** (when `action: 'append'`) | JSON array string representing column cell values. Scalar strings are auto-wrapped. Example: `["{{extract_1.title}}", "{{url.href}}"]`. |
| `filter`               | **Find Row Value**          | `string`                          | No (when `action: 'read'`)        | Exact string filter. When set, only rows where at least one cell matches this exact string are returned.                                |

### Template Tokens & State Output

#### Available Input Tokens

All input fields support token replacement, e.g.:

- **Workflow Outputs:** `{{id_1}}`, `{{extract_1.title}}`, `{{llm_1}}`, `{{extract_1.heading}}`
- **Global Variables:** `{{globals.google_sheet_id}}`
- **System Variables:** `{{url.href}}`, `{{datetime}}`, `{{userInput}}`

#### Output State

- **For Read Action (`action: 'read'`):**
    - `{{google_sheets_1.status}}`: `"success"`
    - `{{google_sheets_1.spreadsheetId}}`: Target spreadsheet ID.
    - `{{google_sheets_1.range}}`: Resolved sheet range.
    - `{{google_sheets_1.data}}`: Formatted text representation (single cell scalar or tab-delimited multiline rows).
    - `{{google_sheets_1.values}}`: Raw 2D array of row cells (`string[][]`).
    - `{{google_sheets_1.matchedRow}}`: Array of cells for the filtered row (`string[] | null`), if `filter` was provided.

- **For Append Action (`action: 'append'`):**
    - `{{google_sheets_1.status}}`: `"success"`
    - `{{google_sheets_1.updatedRange}}`: Range updated by Google Sheets API (e.g., `'Sheet1!A5:E5'`).
    - `{{google_sheets_1.updatedRows}}`: Count of appended rows (typically `1`).
    - `{{google_sheets_1.timestamp}}`: ISO 8601 execution timestamp.

### Sidebar UI Actions

- **View Sheet**: Renders an action button in the sidebar panel. Clicking it opens `https://docs.google.com/spreadsheets/d/{resolvedSpreadsheetId}/edit` in a new browser tab.

### Example Workflow Configurations

#### Example 1: Save Extracted Web Metadata to Google Sheet

```json
{
	"id": "google_sheets_1",
	"type": "googleSheets",
	"config": {
		"action": "append",
		"spreadsheetId": "{{globals.google_sheet_id}}",
		"sheetRange": "Sheet1!A:C",
		"rowValues": "[\"{{extract_1.title}}\", \"{{url.href}}\", \"{{extract_1.heading}}\"]"
	}
}
```

#### Example 2: Read Google Sheet Row Matching Jira Issue Key

```json
{
	"id": "google_sheets_1",
	"type": "googleSheets",
	"config": {
		"action": "read",
		"spreadsheetId": "{{globals.google_sheet_id}}",
		"sheetRange": "Sheet1!A1:F50",
		"filter": "{{id_1}}"
	}
}
```
