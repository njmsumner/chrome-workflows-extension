# Create Workflow Screen Documentation

The **Create Workflow** screen (also known as the **Agent UI**) serves as the primary creation hub for the AI Workflow Chrome Extension. It bridges natural language user intent with structured browser automation, enabling users to generate multi-step workflows using generative AI models, pick from pre-built sample templates, or configure custom workflows from scratch.

## Page Contents

- [1. Overview & Architecture](#1-overview-architecture)
- [2. Header & Navigation Controls](#2-header-navigation-controls)
- [3. Manual Configuration & Sample Template Library](#3-manual-configuration-sample-template-library)
- [4. AI-Powered Workflow Generation Panel](#4-ai-powered-workflow-generation-panel)
- [5. Background AI Generation Architecture](#5-background-ai-generation-architecture)
- [6. Example Natural Language Prompt & Generated Payload](#6-example-natural-language-prompt-generated-payload)
- [7. Troubleshooting & Error States](#7-troubleshooting-error-states)

---

## 1. Overview & Architecture

The Create Workflow interface offers three distinct creation pathways:

1. **AI-Powered Agentic Workflow Generation**: Transforms plain-English instructions into fully configured, multi-step browser workflows using Large Language Models (LLMs) and active page context.
2. **Pre-built Sample Templates**: Provides ready-to-use workflow templates for common automation scenarios (such as scraping page content to Google Docs, Sheets, Trello, or Gmail).
3. **Manual Configuration**: Skips automated setup and opens the interactive Step Editor with an empty workflow canvas.

```
                    ┌─────────────────────────────────────────┐
                    │          Create Workflow Screen         │
                    └────────────────────┬────────────────────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         │                               │                               │
         ▼                               ▼                               ▼
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│  AI Instructions │           │  Sample Template │           │  Manual Creation │
│  (Prompt Engine) │           │    Library       │           │   (Empty Editor) │
└────────┬─────────┘           └────────┬─────────┘           └────────┬─────────┘
         │                               │                               │
         ▼                               ▼                               ▼
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│ Background Agent │           │ Clone Template   │           │ Open Blank Card  │
│ (Default LLM)    │           │ Data Object      │           │ Editor           │
└────────┬─────────┘           └────────┬─────────┘           └────────┬─────────┘
         │                               │                               │
         └───────────────────────────────┼───────────────────────────────┘
                                         │
                                         ▼
                       ┌───────────────────────────────────┐
                       │     Workflow Editor Section       │
                       └───────────────────────────────────┘
```

---

## 2. Header & Navigation Controls

The top navigation header provides immediate access to list management and global extension configurations.

| Header Control       | DOM Element ID           | Function & Behavior                                                                               |
| :------------------- | :----------------------- | :------------------------------------------------------------------------------------------------ |
| **Workflows Button** | `#openAgentWorkflowList` | Navigates to the **Workflow List** panel, displaying all saved workflows.                         |
| **Settings Button**  | `#openAgentSettings`     | Opens the **Settings** panel to configure Default LLM API credentials or manage Global Variables. |
| **Back Button**      | `#closeAgentsBtn`        | Returns to the previous view (hidden by default when accessed from the primary menu).             |
| **Error Banner**     | `#agentErrorMessage`     | Displays real-time error notifications, such as unconfigured LLM settings or API errors.          |

---

## 3. Manual Configuration & Sample Template Library

Located at the top of the detail panel, these controls allow instant setup without calling external AI endpoints.

### Manual Setup (`Configure`)

- **Button**: `#createWorkflowBtn` ("Configure")
- **Action**: Immediately opens the **Workflow Editor** with a clean slate (`null` workflow object), letting users manually add steps, define CSS selectors, and construct custom pipelines step-by-step.

### Sample Template Library (`Use Sample`)

- **Dropdown**: `#sampleWorkflowTemplate`
- **Button**: `#sampleWorkflowBtn` ("Use Sample")
- **Action**: Clones the selected pre-built template, assigns a unique instance name, saves it to Chrome local storage (`aiWorkflows`), and opens the main workflow view ready for execution.

#### Standard Included Sample Templates

| Template Name                            | Description                                                                       | Key Included Steps                                                                 |
| :--------------------------------------- | :-------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **Basic LLM Workflow**                   | Analyzes the current page text and answers questions in the sidebar.              | `extract` $\rightarrow$ `openai` $\rightarrow$ `updatePage` (Sidebar)              |
| **Collect Snippets to Google Doc**       | Extracts page title, URL, and text selection, then appends them to a Google Doc.  | `extract` $\rightarrow$ `googleDocs` (Append) $\rightarrow$ `updatePage` (Sidebar) |
| **Read Prompt from Google Doc**          | Fetches prompt instructions from a Google Doc and passes them to the LLM.         | `googleDocs` (Read) $\rightarrow$ `openai` $\rightarrow$ `updatePage` (Sidebar)    |
| **Save Extracted Data to Google Sheets** | Scrapes page details and appends them as a new row in a Google Sheet.             | `extract` $\rightarrow$ `googleSheets` (Append)                                    |
| **Save Gmail Draft with Page Details**   | Creates a formatted email draft in Gmail containing page metadata and user input. | `extract` $\rightarrow$ `gmail` (Save Draft)                                       |
| **Save Web Page Summary to Trello**      | Creates a new Trello card on a board list with page title and summary.            | `extract` $\rightarrow$ `trelloCreateCard`                                         |
| **Show Extracted Data on Page Load**     | Automatically extracts page content on load and displays it in the sidebar.       | `trigger` (Page Load) $\rightarrow$ `extract` $\rightarrow$ `updatePage`           |

---

## 4. AI-Powered Workflow Generation Panel

The core feature of the Create screen is the natural language generation panel, which converts high-level user instructions into precise browser automation routines.

```
┌────────────────────────────────────────────────────────────────────────┐
│ Instructions  [?]                                                      │
├────────────────────────────────────────────────────────────────────────┤
│ Enter instructions to create a workflow or automate the browser       │
│                                                                        │
│ Example: "Search for wireless mouse. Extract top 3 results and post   │
│ to Slack"                                                              │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│ [ Generate ]   (sync_spinner.svg)                                      │
└────────────────────────────────────────────────────────────────────────┘
```

### UI Controls & Components

- **Instructions Textarea** (`#agentPromptInput`): The text input field where users enter their natural language requirements or automation goals.
- **Tooltip Guidance**: Hovering over the info icon provides key prompt engineering recommendations:
    > _To create a workflow, first open the web page where the workflow will run._
    > _Enter a simple description of the workflow steps._
    > _Example: "Search for batteries. Add the first product to the basket. Click the basket link/button"_
    > _Start with a simple workflow and add steps later._
- **Generate Button** (`#agentGenerateBtn`): Initiates background context gathering and dispatches the AI generation request.
- **Progress Spinner** (`#agentSpinner`): Visual loading indicator active while the LLM processes the request.

---

## 5. Background AI Generation Architecture

When the user clicks **Generate**, the extension executes a multi-stage background process that constructs a rich prompt payload, queries the configured LLM provider, enforces strict JSON schema validation, and instantiates the resulting workflow.

```
┌────────────────────────┐
│  Active Browser Tab    │
│  (DOM Context)         │
└───────────┬────────────┘
            │ 1. Extract Form Fields & Clickable Buttons
            ▼
┌────────────────────────┐
│  Agent UI Controller   │
│  (agent-ui.ts)         │
└───────────┬────────────┘
            │ 2. Compose APP_INTEL_GENERATE Runtime Message
            ▼
┌────────────────────────┐
│ Background Worker      │
│ (background-agent.ts)  │
└───────────┬────────────┘
            │ 3. Fetch Global Vars & Plugin Config Schemas
            │ 4. Build Structured System & User Prompts
            ▼
┌────────────────────────┐
│  Default LLM Endpoint  │
│  (OpenAI / Compatible) │
└───────────┬────────────┘
            │ 5. Return Validated JSON Workflow (Structured Output)
            ▼
┌────────────────────────┐
│  Workflow Manager      │
│  (Save & Open Editor)  │
└────────────────────────┘
```

### Step 1: Active Tab Context Gathering

The `AgentUi` class queries the active browser tab via `context-provider.ts` to extract structural DOM details:

- **Page Metadata**: `contextTitle` and `contextUrl`.
- **Available Form Fields (`pageInputs`)**: CSS selectors, labels, placeholders, and field types.
- **Available Clickable Buttons (`pageButtons`)**: CSS selectors and button text/values.

### Step 2: System Prompt & Schema Injection

The background listener (`background-agent-listener.ts`) constructs the full prompt by combining:

1. **System Prompt (`GENERAL_AGENT_PROMPT`)**: Outlines rules for step ordering, state token passing (`{{extract_1.title}}`), and DOM actions.
2. **Current Tab Context**: Injects extracted inputs and buttons so the LLM uses exact CSS selectors from the active page.
3. **Global Variables**: Injects available secret tokens (e.g. `{{globals.slack_webhook_url}}`, `{{globals.trello_api_key}}`).
4. **Plugin Registry Schemas**: Injects descriptions and config requirements for registered plugins (Slack, Jira, Google Docs, Sheets, Microsoft 365, etc.).
5. **JSON Schema Enforcement (`WORKFLOW_JSON_SCHEMA`)**: Passed as `response_format` to enforce strict schema adherence from OpenAI Structured Outputs or compatible endpoints.

### Step 3: Execution & Auto-Transition

1. The background worker dispatches a `POST` request to the configured **Default LLM Endpoint** (e.g. `https://api.openai.com/v1/chat/completions`).
2. Upon receiving the JSON completion, `normalizeGeneratedWorkflow()` validates that all step IDs are unique, step types exist in `PluginRegistry`, and required parameters are present.
3. The new workflow is appended to `state.workflows` and persisted in Chrome storage.
4. The sidebar automatically hides the Create screen, opens the **Workflow Editor**, and alerts the user:
    > _"Successfully created workflow: [Workflow Name]"_

---

## 6. Example Natural Language Prompt & Generated Payload

### User Prompt Input

> _"Extract the product title and price from this page, generate an executive summary using LLM, and post the summary to Slack"_

### Dispatched Context Payload (Sent to LLM)

```
[Current Tab Context]
- Page Title: Wireless Ergonomic Mouse - Tech Store
- Page URL: https://example-store.com/products/mouse-123

[Available Form Fields / Inputs]
Selector: "input#qty", Label: "Quantity", Placeholder: "1"

[Available Clickable Buttons]
Selector: "button#add-to-cart", Text/Value: "Add to Cart"

[Available Global Variables]
- {{globals.slack_webhook_url}}

[User Goal / Request]
Extract the product title and price from this page, generate an executive summary using LLM, and post the summary to Slack
```

### Generated JSON Workflow Payload

```json
{
	"name": "Product Summary to Slack",
	"description": "Extracts product details, summarizes them with LLM, and dispatches a Slack alert.",
	"displayDescription": true,
	"enabled": true,
	"urlRegex": "",
	"steps": [
		{
			"id": "extract_1",
			"type": "extract",
			"options": {
				"includeTitle": true,
				"includePageText": true,
				"includeCleanHtml": false,
				"includeSelection": false
			},
			"config": {}
		},
		{
			"id": "openai_1",
			"type": "openai",
			"config": {
				"useDefaultSettings": true,
				"prompt": "You are a product research assistant. Create a concise summary including key features and price.",
				"context": "Title: {{extract_1.title}}\n\nFull Text:\n{{extract_1.content}}"
			}
		},
		{
			"id": "slack_1",
			"type": "slack",
			"config": {
				"webhookUrl": "{{globals.slack_webhook_url}}",
				"message": "🛍️ *New Product Research Summary*\n\n*Product:* {{extract_1.title}}\n*URL:* {{url.href}}\n\n*AI Summary:*\n{{openai_1}}"
			}
		}
	]
}
```

---

## 7. Troubleshooting & Error States

| Error Message in UI                                                                      | Root Cause                                              | Resolution Step                                                              |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------ | :--------------------------------------------------------------------------- |
| **"Set up your Default LLM endpoint and API key in Settings to use AI features."**       | No API key is stored in Default LLM settings.           | Click **Settings** in the header and enter your OpenAI API key and endpoint. |
| **"Please enter some instructions first."**                                              | Generate was clicked with an empty text area.           | Type a description into the Instructions box before clicking Generate.       |
| **"Import error: Response payload is not a valid workflow. Try refining your prompt."**  | The LLM returned incomplete JSON or invalid step types. | Refine the prompt instructions with more specific step descriptions.         |
| **"Could not communicate with the webpage. Please refresh the web page and try again."** | Content script is disconnected on the active tab.       | Refresh the active web page (`F5`) to re-inject the content script listener. |
