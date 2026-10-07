# OpenAI/LLM (`openai`)

The **OpenAI/LLM** plugin is designed to send context and a system prompt to an OpenAI-compatible provider, then return response text, raw response data, and token usage. It supports saved default LLM settings or a per-step endpoint, model, and API key.

<img src="../../img/OpenAI.png" alt="OpenAI/LLM Step" />

## Plugin Overview

| Property               | Value                                                           |
| :--------------------- | :-------------------------------------------------------------- |
| **Plugin Label**       | `OpenAI/LLM`                                                    |
| **Step Type (`type`)** | `openai`                                                        |
| **Variable ID Prefix** | `openai` (e.g., `openai_1`, `openai_2`)                         |
| **Group / Category**   | Not specified                                                   |
| **Authentication**     | API key from the default LLM settings or per-step configuration |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label                     | Type                         | Required                                                         | Description & Token Examples                                                                                                                                                |
| :--------------------- | :----------------------------- | :--------------------------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useDefaultSettings`   | **Use Default LLM Config**     | `checkbox`                   | No (defaults to `true`)                                          | Uses the application’s saved LLM settings. Validation requires a default API key when enabled.                                                                              |
| `openaiBaseUrl`        | **Provider / OpenAI endpoint** | `provider select + url`      | **Yes when defaults are disabled**                               | Endpoint URL; defaults to `https://api.openai.com/v1`. The provider selector offers presets and a custom endpoint. Must be a valid HTTP or HTTPS URL for per-step settings. |
| `openaiApiKey`         | **API Key**                    | `password` (text for tokens) | **Yes when defaults are disabled**                               | API key for the selected endpoint. Supports workflow tokens, such as `{{globals.openai_api_key}}`.                                                                          |
| `openaiModel`          | **Model**                      | `text`                       | **Yes when defaults are disabled**                               | Model name; defaults to `gpt-4o-mini`.                                                                                                                                      |
| `context`              | **Input/Context**              | `textarea`                   | No (defaults to `{{userInput}}\nContext: {{extract_1.content}}`) | Context sent as user input. If it is a JSON object, its properties become request input fields; otherwise it is sent as the `input` text. Supports tokens.                  |
| `prompt`               | **System prompt**              | `textarea`                   | No                                                               | Optional system instructions. Supports workflow tokens.                                                                                                                     |

---

## Template Tokens & State Output

### Available Input Tokens

The form exposes token insertion for **API Key**, **Input/Context**, and **System prompt**. The runner resolves templates before execution. The default context includes `{{userInput}}` and `{{extract_1.content}}`; including `{{userInput}}` makes a user-input field available on the Run Workflow page.

### Output State

When a real provider response is parsed, the step returns:

- `{{openai_1.text}}`: Extracted response text.
- `{{openai_1.raw}}`: Raw JSON response from the provider.
- `{{openai_1.usage.inputTokens}}`: Input token usage, or `0` if not provided.
- `{{openai_1.usage.outputTokens}}`: Output token usage, or `0` if not provided.

**Current implementation note:** `stubEnabled` is set to `true`, so outside Vitest the plugin returns a fixed stub response instead of making the provider request. The stub has a `text` string, an empty `raw` object, and usage values of `1` input token and `2` output tokens.

## Sidebar UI Actions

No sidebar action is provided.

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "openai_1",
	"type": "openai",
	"config": {
		"useDefaultSettings": false,
		"openaiBaseUrl": "https://api.openai.com/v1",
		"openaiApiKey": "{{globals.openai_api_key}}",
		"openaiModel": "gpt-4o-mini",
		"context": "{{userInput}}\nContext: {{extract_1.content}}",
		"prompt": "Summarize the supplied context concisely."
	}
}
```
