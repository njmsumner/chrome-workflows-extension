# Settings Screen Documentation

The **Settings Screen** in the AI Workflow Sidebar provides a centralized control panel for configuring global application behavior, default Large Language Model (LLM) credentials, extension display settings, and reusable global variable tokens.

Settings can be accessed from anywhere in the sidebar interface by clicking the **Settings** button in the main header, workflow list header, or agent creation panel.

---

## Overview & Interface Layout

| Component / Tab          | Primary Function                                                                            | Primary DOM ID / Storage Key     |
| :----------------------- | :------------------------------------------------------------------------------------------ | :------------------------------- |
| **Save Button**          | Persists all updated LLM configs, global variables, and zoom preferences to Chrome storage. | `#saveSettingsBtn`               |
| **Cancel Button**        | Discards unsaved changes and reverts form fields to stored values.                          | `#cancelSettingsBtn`             |
| **General Tab**          | Configures Default LLM credentials, extension UI zoom level, and content viewer navigation. | `generalSettingsContent`         |
| **Global Variables Tab** | Manages reusable secret tokens, API keys, and workspace IDs across all extension workflows. | `globalVariablesSettingsContent` |

---

## 1. Default LLM Settings

The **Default LLM** section (located under the **General** tab) defines the system-wide AI credentials used by background automation helpers and serves as a fallback provider for workflow steps.

```
+-----------------------------------------------------------------------+
| Default LLM                                                           |
| Credentials for background AI helpers like workflow generator         |
| agents, and also can be used in workflows                             |
|                                                                       |
| Provider:       [ OpenRouter                             v ]          |
| OpenAI endpoint:[ https://openrouter.ai/api/v1                     ]  |
| API Key:        [ ************************************************ ]  |
| Model:          [ gpt-4o-mini                                      ]  |
+-----------------------------------------------------------------------+
```

### Purpose & Capabilities

- **Background Agent Helpers**: Powers natural language workflow generation (`AgentUi.generateWorkflow`) and single-step prompt generation (`generateSingleStep`).
- **Workflow Step Fallback**: When an **OpenAI/LLM** step enables the **"Use Default LLM Config"** (`useDefaultSettings: true`) checkbox, it automatically uses these central credentials without requiring manual API keys in every step card.

### Form Configuration Fields

| Field Name          | DOM Element ID        | Description & Example Values                                                                                                                                                                                                                                                                                                                                                                                        |
| :------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Provider**        | `#app-intel-provider` | Select dropdown with presets for major OpenAI-compatible providers (**OpenAI**, **Google Gemini**, **Azure OpenAI**, **OpenRouter**, **Ollama**, **Groq**, **Together AI**, **Fireworks AI**, **DeepInfra**, **Cerebras**, **Mistral**, **DeepSeek**, **xAI**, **Perplexity**, **SambaNova**, **Cohere**, **Hugging Face**, or **Custom endpoint**). Selecting a provider automatically populates the endpoint URL. |
| **OpenAI Endpoint** | `#app-intel-base-url` | The base HTTP/HTTPS URL for the API endpoint (e.g. `https://api.openai.com/v1`, `https://openrouter.ai/api/v1`, `http://localhost:11434/v1`).                                                                                                                                                                                                                                                                       |
| **API Key**         | `#app-intel-api-key`  | Password-masked text input for the secret API key (e.g. `sk-proj-...`).                                                                                                                                                                                                                                                                                                                                             |
| **Model**           | `#app-intel-model`    | The model identifier string passed in request payloads (e.g. `gpt-4o`, `gpt-4o-mini`, `gemini-1.5-flash`, `claude-3-5-sonnet`).                                                                                                                                                                                                                                                                                     |

### Storage Persistence

Default LLM settings are saved in Chrome local storage under the `appIntelligenceConfig` object key:

```json
{
	"appIntelligenceConfig": {
		"apiKey": "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx",
		"baseUrl": "https://api.openai.com/v1",
		"model": "gpt-4o-mini"
	}
}
```

---

## 2. General Settings

The **General Settings** pane controls UI customization and content viewer access.

```
+-----------------------------------------------------------------------+
| General Settings                                                      |
| Zoom:           [=====o==================] (1.0x)                     |
+-----------------------------------------------------------------------+
| [ View Content ]  View collected content                              |
+-----------------------------------------------------------------------+
```

### Controls & Options

- **Zoom Slider (`#sidebarZoom`)**:
    - **Type**: Interactive range input (`<input type="range">`).
    - **Range**: Scale from `0.75x` (75%) to `1.50x` (150%) in `0.05` step increments (default: `1.0`).
    - **Behavior**: Adjusts the base font size of the extension sidebar in real time (`document.documentElement.style.fontSize = 16 * zoom`).
    - **Storage Key**: Saved under `sidebarZoom` in Chrome local storage.

- **View Content (`#openSettingsViewerBtn`)**:
    - **Type**: Navigation action button.
    - **Behavior**: Opens the packaged **Content Viewer** page (`viewer.html`) in a full browser tab.
    - **Function**: Allows users to inspect, copy, export, or clear clipping snippets aggregated by **Append Content** page actions.

---

## 3. Global Variables Settings

The **Global Variables** tab centralizes reusable configuration data—such as API keys, OAuth tokens, Webhook URLs, and document IDs—so they can be updated in one location and referenced across all extension workflows.

```
+-----------------------------------------------------------------------+
| Global Variables                                                      |
| Define reusable tokens that can be inserted into any workflow.        |
|                                                                       |
| google_doc_id      [ ******************** ]  [Edit] [Delete]          |
| slack_webhook_url  [ ******************** ]  [Edit] [Delete]          |
| trello_api_key     [ ******************** ]  [Edit] [Delete]          |
|                                                                       |
| Key:   [ github_pat                                              ]    |
| Value: [ ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                ]    |
| [ Save ]                                                              |
+-----------------------------------------------------------------------+
```

### Token Syntax & Usage

Global variables are referenced in workflow step configurations using double-bracket token syntax:

- **Token Syntax**: `{{globals.variable_name}}`
- **Examples**:
    - `{{globals.slack_webhook_url}}` (Webhook URL in Slack plugin)
    - `{{globals.google_sheet_id}}` (Spreadsheet ID in Google Sheets plugin)
    - `{{globals.github_pat}}` (Bearer Token in API/Webhook headers)
    - `{{globals.trello_api_key}}` (API key in Trello plugin)

### Management UI & Features

1. **Variable List (`#globalVariablesList`)**:
    - Displays all active global variables in alphabetical order.
    - Values are masked using password inputs (`type="password"`) to protect sensitive credentials from screen exposure.
    - Includes **Edit** and **Delete** action icons for each entry.

2. **Management Form**:
    - **Key Input (`#globalVariableKey`)**: Name identifier for the variable. Must contain only letters, numbers, and underscores (e.g. `slack_webhook_url`).
    - **Value Input (`#globalVariableValue`)**: Secret key, URL, or string value.
    - **Save Button (`#globalVariableSaveBtn`)**: Saves or updates the key-value pair in storage.

3. **Inline Creation in Workflow Editor**:
    - Users can also create global variables directly while editing a workflow inside the **New Step/Variable** card (`#editorGlobalVariableKey`, `#editorGlobalVariableValue`, `#editorGlobalVariableSaveBtn`).
    - If a step configuration contains an unrecognized token like `{{globals.missing_key}}`, the editor automatically pre-fills the key input for instant creation.

4. **Token Selector Integration**:
    - All saved global variables automatically populate in the **Insert workflow token** dropdown menu (`tokenSelector`) attached to tokenizable fields across all plugin forms.

### Storage Persistence

Global variables are stored under the `aiGlobalVariables` dictionary key in Chrome local storage:

```json
{
	"aiGlobalVariables": {
		"google_doc_id": "1aBc_example_doc_id_999",
		"google_sheet_id": "1sXv_example_sheet_id_888",
		"slack_webhook_url": "https://hooks.slack.com/services/T0000/B0000/XXXXX",
		"trello_api_key": "3a7b9c1d2e...",
		"trello_oauth_token": "ATTA123456789..."
	}
}
```

---

## Technical & Storage Key Reference

| Setting Category     | Chrome Storage Key (`chrome.storage.local`) | Data Type                |
| :------------------- | :------------------------------------------ | :----------------------- |
| **Default LLM**      | `appIntelligenceConfig`                     | `Object`                 |
| **Global Variables** | `aiGlobalVariables`                         | `Record<string, string>` |
| **Sidebar Zoom**     | `sidebarZoom`                               | `number`                 |
| **Active Workflow**  | `selectedWorkflow`                          | `string`                 |
