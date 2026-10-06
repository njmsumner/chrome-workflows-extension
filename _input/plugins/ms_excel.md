# Microsoft Excel (`microsoftExcel`)

The **Microsoft Excel** plugin appends a row to an Excel table or reads cell and range content through Microsoft Graph. It supports workbooks in OneDrive or SharePoint and uses Microsoft OAuth authentication.

## Plugin Overview

| Property               | Value                                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------------------- |
| **Plugin Label**       | `Microsoft Excel`                                                                                  |
| **Step Type (`type`)** | `microsoftExcel`                                                                                   |
| **Variable ID Prefix** | `ms_excel` (e.g., `ms_excel_1`, `ms_excel_2`)                                                      |
| **Group / Category**   | Microsoft                                                                                          |
| **Authentication**     | Microsoft OAuth 2.0; uses global `ms_client_id` and optional `ms_tenant_id` (defaults to `common`) |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label                           | Type       | Required                          | Description & Token Examples                                                                                                                                                                                      |
| :--------------------- | :----------------------------------- | :--------- | :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`               | **Action**                           | `select`   | No (defaults to `append`)         | Choose **Append Row** (`append`) or **Get Cell / Range Content** (`read`).                                                                                                                                        |
| `workbookId`           | **Workbook Item ID**                 | `text`     | **Yes**                           | OneDrive file ID or SharePoint document item ID. Supports tokens such as `{{globals.excel_workbook_id}}`.                                                                                                         |
| `sheetRange`           | **Sheet Name / Cell Range**          | `text`     | **Yes** (defaults to `Sheet1!A1`) | Worksheet name, optionally followed by `!` and a range address, such as `Sheet1!A1:C5`. Supports workflow tokens. In read mode, a worksheet without a range reads its used range; append uses the worksheet name. |
| `tableName`            | **Table Name (Optional for Append)** | `text`     | No (defaults to `Table1`)         | Table to append to. If blank, execution uses `Table1`; this field is not used in read mode. Supports tokens.                                                                                                      |
| `rowValues`            | **Row Values (JSON Array)**          | `textarea` | **Yes for append**                | JSON array of cell values for one row, such as `["{{extract_1.title}}", "{{llm_1}}"]`. Defaults to `[]`; hidden and disabled in read mode. Supports tokens.                                                       |

---

## Template Tokens & State Output

### Available Input Tokens

The form exposes token insertion for **Workbook Item ID**, **Sheet Name / Cell Range**, **Table Name**, and **Row Values**. The row-values field must remain valid JSON in the form; for example, use `"[\"{{extract_1.title}}\", \"{{llm_1}}\"]"` in the workflow configuration.

### Output State

Both actions return `status` (`success`) and `workbookId`.

For **Get Cell / Range Content**, the step also returns:

- `{{ms_excel_1.range}}`: Address reported by Graph, or the configured sheet/range if none is returned.
- `{{ms_excel_1.data}}`: Empty string when no values are returned; the cell value for a single cell; otherwise values as tab-separated columns and newline-separated rows.
- `{{ms_excel_1.values}}`: Raw two-dimensional array of cell values.

For **Append Row**, the step also returns:

- `{{ms_excel_1.updatedRange}}`: `Row index N` when Graph returns an index, otherwise the configured sheet/range.
- `{{ms_excel_1.values}}`: Values returned by Graph, or the submitted row wrapped in an array.
- `{{ms_excel_1.timestamp}}`: Completion time in ISO 8601 format.

## Sidebar UI Actions

- **View Excel File**: Opens the workbook in OneDrive when `workbookId` resolves to a value without an unresolved template token.

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "ms_excel_1",
	"type": "microsoftExcel",
	"config": {
		"action": "append",
		"workbookId": "{{globals.excel_workbook_id}}",
		"sheetRange": "Sheet1!A1",
		"tableName": "Table1",
		"rowValues": "[\"{{extract_1.title}}\", \"{{llm_1}}\"]"
	}
}
```
