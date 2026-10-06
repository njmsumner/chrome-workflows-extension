# Condition (`condition`)

The **Condition** plugin compares a configured value with a selected condition. If the condition is not met, execution throws an error and the workflow stops.

## Plugin Overview

| Property               | Value                             |
| :--------------------- | :-------------------------------- |
| **Plugin Label**       | `Condition`                       |
| **Step Type (`type`)** | `condition`                       |
| **Variable ID Prefix** | `condition` (e.g., `condition_1`) |
| **Group / Category**   | Not specified                     |
| **Authentication**     | None                              |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label           | Type     | Required                         | Description & Token Examples                                                                                                                                                               |
| :--------------------- | :------------------- | :------- | :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                | **Value**            | `text`   | **Yes**                          | Value to test; defaults to an empty string. Supports workflow tokens, such as `{{extract_1.title}}`.                                                                                       |
| `operator`             | **Condition**        | `select` | **Yes**                          | Comparison to apply: Is empty, Is not empty, Contains, Does not contain, Equals, Does not equal, Starts with, Ends with.                                                                   |
| `comparisonValue`      | **Comparison value** | `text`   | **Yes for comparison operators** | Value compared with `value`; supports workflow tokens, such as `{{globals.expected_status}}`. Required for Contains, Does not contain, Equals, Does not equal, Starts with, and Ends with. |

---

## Template Tokens & State Output

### Available Input Tokens

The **Value** and **Comparison value** fields support workflow tokens, which the runner resolves before this step executes. For example, compare `{{extract_1.title}}` with a configured string using **Contains**.

### Output State

When the condition passes, the step returns an object containing:

- `{{condition_1.passed}}`: Boolean `true`.

If the condition fails or its configuration is missing, execution throws `Condition was not met.` and no success output is returned.

## Sidebar UI Actions

No sidebar action is provided.

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "condition_1",
	"type": "condition",
	"config": {
		"value": "{{extract_1.title}}",
		"operator": "contains",
		"comparisonValue": "Release notes"
	}
}
```
