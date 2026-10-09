# Set Variable (`setGlobal`)

Use **Set Variable** to save a value that this and later workflows can reuse. The value is saved in extension storage and is available immediately to later steps in the current workflow.

<img src="../../img/Set Variable.png" alt="Set Variable Step" />

## Configure

- **Variable Key** (`key`): Required. Use only letters, numbers, and underscores, such as `workflow_title`.
- **Variable Value / Template** (`value`): Required in the form; accepts workflow tokens such as `{{extract_1.title}}`. Although the form requires a value, the step can save an empty string.

The value's tokens are resolved first, then the result is evaluated as a Jexl expression. If evaluation fails, the resolved text is saved as-is. Available Jexl functions: `substring`, `lower`, `upper`, `trim`, and `replace`.

## Use the saved value

For a step with ID `global_1`, use `{{global_1.key}}` and `{{global_1.value}}` to access its output. To reuse the saved value as a global variable, use `{{globals.workflow_title}}`, replacing `workflow_title` with your configured key.

## Example

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
