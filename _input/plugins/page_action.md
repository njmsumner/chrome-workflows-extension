# Page Action Plugin (`updatePage`)

The **Page Action** plugin (`updatePage`) provides essential browser automation capabilities within the AI Workflows extension. It enables workflows to interact directly with active browser tabs—clicking buttons, populating input fields, waiting for dynamic DOM elements, controlling tab navigation, displaying extraction or LLM results in the sidebar, and persisting snippets to local memory.

---

## Plugin Overview

| Property               | Value                                                                                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plugin Label**       | `Action`                                                                                                                                           |
| **Step Type (`type`)** | `updatePage`                                                                                                                                       |
| **Variable ID Prefix** | `action` (e.g., `action_1`, `action_2`)                                                                                                            |
| **Group / Category**   | System (`system`)                                                                                                                                  |
| **Tab Requirements**   | Requires an injectable web page tab (`http://` or `https://`). Restricted browser URLs (`chrome://`, `about:blank`, Chrome Web Store) are guarded. |

---

## Configuration Fields

The Page Action step dynamically adapts its visible form controls based on the selected browser action.

| Field Key (`config.*`) | Form Label         | Control Type                      | Required        | Description & Usage                                                                                                                  |
| :--------------------- | :----------------- | :-------------------------------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `action`               | **Action**         | Dropdown (`<select>`)             | **Yes**         | Selects the browser automation command to execute (e.g., `clickElement`, `updateField`, `sidebar`).                                  |
| `selector`             | **CSS Selector**   | Text Input (`<input>`)            | **Conditional** | Required for element-targeted actions (`clickElement`, `updateField`, `waitForSelector`). Specifies the DOM element query.           |
| `value`                | **Value Template** | Multiline Textarea (`<textarea>`) | **Conditional** | Required for actions accepting text, URLs, JSON arrays, or key names. Supports template tokens (`{{llm_1}}`, `{{extract_1.title}}`). |

---

## Action Reference

### 1. Show in Sidebar (`sidebar`)

- **Purpose**: Displays formatted text, Markdown, or JSON output directly inside the sidebar's **Result** panel.
- **Target Field**: `config.value`
- **Selector Needed**: No (`config.selector` is ignored).
- **Mechanics**: Extracts `text` or `value` properties from JSON objects, or prints raw text payloads. Sanitizes and cleans JSON formatting for display.
- **Example Usage**: Rendering an LLM summary (`{{openai_1}}`) or structured page metadata (`{{extract_1.title}}`).

### 2. Append Content (`appendContent`)

- **Purpose**: Saves text clippings, page excerpts, or AI summaries to local extension storage (`chrome.storage.local`).
- **Target Field**: `config.value`
- **Selector Needed**: No.
- **Mechanics**: Constructs a metadata-rich clipping record containing a unique UUID, timestamp, text content, active tab URL (`sourceUrl`), and page title (`sourceTitle`). Accumulated clippings can be reviewed, copied, or exported as text files via the **View Content** viewer panel.
- **Example Usage**: Collecting research snippets across multiple tabs (`{{extract_1.selection}}`).

### 3. Switch Tab (`switchTab`)

- **Purpose**: Changes active focus to an existing browser tab matching a target URL or title substring.
- **Target Field**: `config.value`
- **Selector Needed**: No.
- **Mechanics**: Searches open browser tabs in the current window for a tab whose URL or document title contains the string provided in `config.value`. Activates the matching tab window.
- **Example Usage**: Focusing an open web application tab (`https://app.slack.com` or `Jira`).

### 4. Navigate URL (`navigateUrl`)

- **Purpose**: Navigates the current browser tab (or opens a new tab) to a specified web address.
- **Target Field**: `config.value`
- **Selector Needed**: No.
- **Mechanics**: Validates the input URL. Supports absolute HTTP/HTTPS addresses (`https://example.com`) as well as domain-relative paths (`/dashboard`), resolving relative paths against the active tab's origin. Suspends step execution until tab navigation completes (`status === 'complete'`).
- **Example Usage**: Redirecting the browser to a search results page (`https://google.com/search?q={{userInput}}`).

### 5. Update Field (`updateField`)

- **Purpose**: Sets the value or text content of a single target form field or editable element on the active web page.
- **Target Field**: `config.selector` and `config.value`
- **Selector Needed**: **Yes** (Valid CSS selector required, e.g., `input#username` or `[data-testid="search-input"]`).
- **Mechanics**: Locates the DOM element, retrieves native property descriptors to update input values (compatible with React, Vue, and Angular controlled inputs), and dispatches synthetic `input` and `change` DOM events. Fallback handling updates `textContent` for `contenteditable` elements.
- **Example Usage**: Filling a form search box with an AI query (`selector: "#search"`, `value: "{{userInput}}"`).

### 6. Update Fields (`updateFields`)

- **Purpose**: Programmatically updates multiple web page fields in a single step using a JSON array of selector/value pairs.
- **Target Field**: `config.value`
- **Selector Needed**: No (Selectors are defined inside the JSON payload).
- **Mechanics**: Parses a JSON object formatted with an `updates` array:
    ```json
    {
    	"updates": [
    		{ "selector": "#firstName", "value": "Alice" },
    		{ "selector": "#lastName", "value": "Smith" }
    	]
    }
    ```
    Iterates through each selector, sets field values via native prototypes, and dispatches change events for all modified elements.
- **Example Usage**: Batch-filling an entire registration or checkout form from structured JSON outputs.

### 7. Click Element (`clickElement`)

- **Purpose**: Simulates a user click on a button, link, or interactive element in the webpage DOM.
- **Target Field**: `config.selector`
- **Selector Needed**: **Yes** (Valid CSS selector required, e.g., `button[type="submit"]`).
- **Mechanics**: Locates the element using `document.querySelector`, verifies element existence and clickability, and triggers `element.click()`. Waits for subsequent page loads if the click initiates navigation.
- **Example Usage**: Submitting a form or opening a modal dialog (`selector: "button.submit-btn"`).

### 8. Wait (`wait` / `waitForDelay`)

- **Purpose**: Pauses workflow pipeline execution for a specified duration in seconds.
- **Target Field**: `config.value`
- **Selector Needed**: No.
- **Mechanics**: Converts the input string into a floating-point number of seconds and calls an asynchronous non-blocking delay. Useful for allowing animations, redirects, or background API requests on the page to settle.
- **Example Usage**: Delaying execution for 3 seconds (`value: "3"`).

### 9. Wait For Selector (`waitForSelector`)

- **Purpose**: Pauses pipeline execution until a specific element appears in the web page DOM.
- **Target Field**: `config.selector`
- **Selector Needed**: **Yes** (Valid CSS selector required, e.g., `.results-loaded`).
- **Mechanics**: Checks if the element exists immediately. If not present, attaches a `MutationObserver` to `document.documentElement` to watch dynamic DOM insertions. Resolves instantly when detected or times out after 10 seconds.
- **Example Usage**: Waiting for dynamic search results or single-page app (SPA) route renders (`selector: ".search-results"`).

### 10. Key Press (`keyPress`)

- **Purpose**: Dispatches synthetic keyboard events (`keydown`, `keypress`, `keyup`) to the active element or target selector.
- **Target Field**: `config.value` and optional `config.selector`
- **Selector Needed**: Optional (Defaults to `document.activeElement` or `document.body` if omitted).
- **Mechanics**: Dispatches `KeyboardEvent` sequences. Supported keys include `Enter`, `Escape`, `Tab`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Backspace`, `Delete`, `Space`, `Home`, `End`, `PageUp`, and `PageDown`. Single-character keys automatically modify input field values and trigger `input` events.
- **Example Usage**: Pressing `Enter` after populating a search bar (`selector: "#search"`, `value: "Enter"`).

### 11. Refresh Tab (`refreshTab`)

- **Purpose**: Reloads the current browser tab and waits for page re-loading to complete.
- **Target Field**: None.
- **Selector Needed**: No.
- **Mechanics**: Calls `chrome.tabs.reload()` on the active tab and listens for `chrome.tabs.onUpdated` until tab status reaches `'complete'`.
- **Example Usage**: Refreshing a dashboard after executing an API post step.

---

## Template Tokens & Pipeline State

All string-based fields (`config.value`, `config.selector`) support token resolution using double-bracket notation:

- **Preceding Step Outputs**: `{{extract_1.title}}`, `{{openai_1}}`, `{{sheets_1.data}}`
- **Global Variables**: `{{globals.search_query}}`
- **Tab & User Context**: `{{url.href}}`, `{{url.hostname}}`, `{{userInput}}`, `{{datetime}}`

### Step Output State (`{{action_1.*}}`)

When a Page Action step completes, its execution payload is stored in the pipeline state:

- `{{action_1.value}}`: The resolved text value or payload.
- `{{action_1.selector}}`: The CSS selector evaluated during execution.
- `{{action_1.updates}}`: Array of updated field records (when using `updateFields`).

---

## Sidebar Panel Actions

When a Page Action step is configured with the `appendContent` action, the step contributes a dynamic action button to the sidebar footer:

- **View Content Button**: Clicking **View Content** opens the extension's dedicated content viewer (`viewer.html`), where all accumulated clippings can be inspected, copied, or downloaded.

---

## Example Workflow Configurations (JSON)

### Example A: Fill Search Field and Press Enter

```json
[
	{
		"id": "action_fill",
		"type": "updatePage",
		"config": {
			"action": "updateField",
			"selector": "input[name='q']",
			"value": "{{userInput}}"
		}
	},
	{
		"id": "action_press_enter",
		"type": "updatePage",
		"config": {
			"action": "keyPress",
			"selector": "input[name='q']",
			"value": "Enter"
		}
	}
]
```

### Example B: Wait for Results & Append Snippet to Local Storage

```json
[
	{
		"id": "action_wait",
		"type": "updatePage",
		"config": {
			"action": "waitForSelector",
			"selector": ".search-results-list",
			"value": ""
		}
	},
	{
		"id": "action_save_clipping",
		"type": "updatePage",
		"config": {
			"action": "appendContent",
			"selector": "",
			"value": "Title: {{extract_1.title}}\nURL: {{url.href}}\n\nSummary:\n{{openai_1}}"
		}
	}
]
```
