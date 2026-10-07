# Run Workflow (`runWorkflow`)

The **Run Workflow** step executes another saved workflow, passing the current workflow state into it and merging the sub-workflow's results back into the current pipeline. Use it to compose workflows; nested execution is limited to three levels.

<img src="../../img/Sub Workflow.png" alt="Run Sub-Workflow Step" />

## Plugin Overview

| Property               | Value                                   |
| :--------------------- | :-------------------------------------- |
| **Plugin Label**       | `Run Workflow`                          |
| **Step Type (`type`)** | `runWorkflow`                           |
| **Variable ID Prefix** | `run_workflow` (e.g., `run_workflow_1`) |
| **Group / Category**   | `system`                                |
| **Authentication**     | None                                    |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label       | Type     | Required | Description & Token Examples                                                                                                                                                                                                                     |
| :--------------------- | :--------------- | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `targetWorkflowName`   | **Sub-Workflow** | `select` | **Yes**  | Select a saved workflow other than the one currently being edited. The selected name must still exist at runtime. The workflow runner resolves template tokens before execution, so a token resolving to a saved workflow name can also be used. |

---

## Template Tokens & State Output

### Available Input Tokens

The workflow runner resolves template tokens throughout the step configuration before execution. `targetWorkflowName` must resolve to the exact name of a saved workflow. The selector lists other saved workflows; it does not provide token suggestions.

The selected workflow receives the current workflow state, including values from earlier steps, as its initial state.

### Output State

On success, the sub-workflow's state is merged into the current workflow state, so its step outputs can be referenced downstream by their step IDs (for example, `{{extract_1.title}}`). The `run_workflow_1` state entry contains the output of the sub-workflow's final step; it has no plugin-defined properties. Internal nesting-depth metadata is not merged into the parent state. If the sub-workflow has no steps, the step output is `undefined`.

---

## Sidebar UI Actions

No sidebar action is provided.

---

## Example Workflow Configuration (JSON)

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
