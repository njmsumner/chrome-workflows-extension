# Run Workflow (`runWorkflow`)

Run another saved workflow as a step in the current workflow. The selected workflow receives the current state, and its results are merged back into the current workflow. Workflows can be nested up to three levels.

<img src="../../img/Sub Workflow.png" alt="Run Sub-Workflow Step" />

## Use Cases

- When a workflow completes successfully, run another workflow.
- Use a re-usable workflow in other workflows.
- Conditionally decide which workflow to run

## Configuration

| Field                                   | Required | Description                                                                                                                                             |
| :-------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Sub-Workflow** (`targetWorkflowName`) | Yes      | Select another saved workflow. The name must exist at runtime. Template tokens are resolved before execution, so a token can provide the workflow name. |

## State and Output

The selected workflow starts with the current workflow state, including outputs from earlier steps. On success, its state is merged into the current workflow, and its step outputs can be referenced downstream by step ID (for example, `{{extract_1.title}}`).

The `run_workflow_1` state entry contains the final step’s output and has no plugin-defined properties. If the selected workflow has no steps, the output is `undefined`. Internal nesting-depth metadata is not merged into the parent state.

No sidebar action is provided.

## Example

```json
{
	"id": "run_workflow_1",
	"type": "runWorkflow",
	"config": {
		"targetWorkflowName": "Summarize page"
	}
}
```

`Summarize page` must be the exact name of another saved workflow.
