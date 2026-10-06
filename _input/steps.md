# Standard Steps

The following are the types of steps you can include in a workflow:

**Action** - Perform an action on the current browser page.

- Show in Sidebar
- Append Content
- Switch Tab
- Navigate URL
- Update Field
- Update Fields
- Click Element
- Wait
- Wait For Selector
- Key Press
- Refresh Tab

**Extract** - Extracts data from the current browser page, such as text content or attribute values.

**Condition** - Evaluates the specified value against a chosen operator and halts the workflow if the condition is not met.

**[Set Variable](plugins/set-global.md)** - Set a global variable that can be accessed across workflows using the syntax {{globals.key}}.

**Run Workflow** - Executes another saved workflow and merges its results into the current pipeline.
