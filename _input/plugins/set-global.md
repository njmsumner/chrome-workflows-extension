# Set Variable (`setGlobal`)

The **Set Variable** plugin creates or updates a global variable that workflows can reuse. It stores the value in extension storage and updates the current workflow state so later steps can access it immediately.

## Plugin Overview

| Property               | Value                                              |
| :--------------------- | :------------------------------------------------- |
| **Plugin Label**       | `Set Variable`                                     |
| **Step Type (`type`)** | `setGlobal`                                        |
| **Variable ID Prefix** | `global` (e.g., `global_1`)                        |
| **Group / Category**   | Not specified                                      |
| **Authentication**     | None; uses the extension's global-variable storage |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label                    | Type       | Required       | Description & Token Examples                                                                                                                                                 |
| :--------------------- | :---------------------------- | :--------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`                  | **Variable Key**              | `text`     | **Yes**        | Global variable name. Must contain only letters, numbers, and underscores (for example, `workflow_title`).                                                                   |
| `value`                | **Variable Value / Template** | `textarea` | **Yes (form)** | Value to store; defaults to an empty string. Supports workflow tokens, such as `{{extract_1.title}}`. The form requires a value, though execution can store an empty string. |

---

## Template Tokens & State Output

### Available Input Tokens

The **Variable Value / Template** field supports workflow tokens. The plugin resolves tokens before evaluating the resulting text as a Jexl expression. If expression evaluation fails, it stores the resolved text as-is. The plugin also registers the `substring`, `lower`, `upper`, `trim`, and `replace` Jexl functions.

### Output State

After execution, the step returns an object containing:

- `{{global_1.key}}`: The trimmed variable key.
- `{{global_1.value}}`: The value stored as a string.

The same value is also available to this and later workflows through the global token `{{globals.workflow_title}}` (replace `workflow_title` with the configured key).

## Sidebar UI Actions

No sidebar action is provided.

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "global_1",
	"type": "setGlobal",
	"config": {
		"key": "workflow_title",
		"value": "{{extract_1.title}}"
	}
}
```
