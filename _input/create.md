# Create Workflow Screen

The **Create Workflow** screen (also known as the **Agent UI**) serves as the primary creation hub for the AI Workflow Chrome Extension. It bridges natural language user intent with structured browser automation, enabling users to generate multi-step workflows using generative AI models, pick from pre-built sample templates, or configure custom workflows from scratch.

<img src="../img/Create Workflow.png" alt="Create Workflow" />

## Page Contents

- [1. Overview & Architecture](#1-overview-architecture)
- [2. Header & Navigation Controls](#2-header-navigation-controls)
- [3. Manual Configuration & Sample Template Library](#3-manual-configuration-sample-template-library)
- [4. AI-Powered Workflow Generation Panel](#4-ai-powered-workflow-generation-panel)
- [5. Example Natural Language Prompt & Generated Payload](#6-example-natural-language-prompt-generated-payload)
- [6. Troubleshooting & Error States](#7-troubleshooting-error-states)

---

## 1. Overview & Architecture

The Create Workflow interface offers three distinct creation pathways:

1. **AI-Powered Agentic Workflow Generation**: Transforms plain-English instructions into fully configured, multi-step browser workflows using Large Language Models (LLMs) and active page context.
2. **Pre-built Sample Templates**: Provides ready-to-use workflow templates for common automation scenarios (such as scraping page content to Google Docs, Sheets, Trello, or Gmail).
3. **Manual Configuration**: Skips automated setup and opens the interactive Step Editor with an empty workflow canvas.

---

## 2. Header & Navigation Controls

The top navigation header provides immediate access to list management and global extension configurations.

| Header Control       | Function & Behavior                                                                               |
| :------------------- | :------------------------------------------------------------------------------------------------ |
| **Workflows Button** | Navigates to the **Workflow List** panel, displaying all saved workflows.                         |
| **Settings Button**  | Opens the **Settings** panel to configure Default LLM API credentials or manage Global Variables. |
| **Back Button**      | Returns to the previous view (hidden by default when accessed from the primary menu).             |
| **Error Banner**     | Displays real-time error notifications, such as unconfigured LLM settings or API errors.          |

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

| Template Name                            | Description                                                                       |
| :--------------------------------------- | :-------------------------------------------------------------------------------- |
| **Basic LLM Workflow**                   | Analyzes the current page text and answers questions in the sidebar.              |
| **Collect Snippets to Google Doc**       | Extracts page title, URL, and text selection, then appends them to a Google Doc.  |
| **Read Prompt from Google Doc**          | Fetches prompt instructions from a Google Doc and passes them to the LLM.         |
| **Save Extracted Data to Google Sheets** | Scrapes page details and appends them as a new row in a Google Sheet.             |
| **Save Gmail Draft with Page Details**   | Creates a formatted email draft in Gmail containing page metadata and user input. |
| **Save Web Page Summary to Trello**      | Creates a new Trello card on a board list with page title and summary.            |
| **Show Extracted Data on Page Load**     | Automatically extracts page content on load and displays it in the sidebar.       |

---

## 4. AI-Powered Workflow Generation Panel

The core feature of the Create screen is the natural language generation panel, which converts high-level user instructions into precise browser automation routines.

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

## 5. Example Natural Language Prompt & Generated Payload

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

## 6. Troubleshooting & Error States

| Error Message in UI                                                                      | Root Cause                                              | Resolution Step                                                              |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------ | :--------------------------------------------------------------------------- |
| **"Set up your Default LLM endpoint and API key in Settings to use AI features."**       | No API key is stored in Default LLM settings.           | Click **Settings** in the header and enter your OpenAI API key and endpoint. |
| **"Please enter some instructions first."**                                              | Generate was clicked with an empty text area.           | Type a description into the Instructions box before clicking Generate.       |
| **"Import error: Response payload is not a valid workflow. Try refining your prompt."**  | The LLM returned incomplete JSON or invalid step types. | Refine the prompt instructions with more specific step descriptions.         |
| **"Could not communicate with the webpage. Please refresh the web page and try again."** | Content script is disconnected on the active tab.       | Refresh the active web page (`F5`) to re-inject the content script listener. |
