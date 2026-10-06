# HubSpot Blog Post (`hubspotBlog`)

The **HubSpot Blog Post** plugin creates a HubSpot CMS blog post as a draft or publishes it immediately. It sends the configured title, HTML body, and optional metadata to the HubSpot CMS Blogs API.

## Plugin Overview

| Property               | Value                                                       |
| :--------------------- | :---------------------------------------------------------- |
| **Plugin Label**       | `HubSpot Blog Post`                                         |
| **Step Type (`type`)** | `hubspotBlog`                                               |
| **Variable ID Prefix** | `hubspot` (e.g., `hubspot_1`, `hubspot_2`)                  |
| **Group / Category**   | Not specified                                               |
| **Authentication**     | HubSpot Private App access token with content scope enabled |

---

## Configuration Fields

| Field Key (`config.*`) | Form Label                        | Type       | Required                 | Description & Token Examples                                                                                                                |
| :--------------------- | :-------------------------------- | :--------- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `accessToken`          | **App Access Token**              | `password` | **Yes**                  | HubSpot Private App credential used to authenticate CMS API requests. Supports workflow tokens, such as `{{globals.hubspot_access_token}}`. |
| `blogId`               | **Blog ID (contentGroupId)**      | `text`     | **Yes**                  | HubSpot blog ID sent as `contentGroupId`. Supports workflow tokens, such as `{{globals.hubspot_blog_id}}`.                                  |
| `authorId`             | **Author ID (Optional)**          | `text`     | No                       | Optional HubSpot blog author ID.                                                                                                            |
| `postName`             | **Post Title**                    | `text`     | **Yes**                  | Title for the blog post. Supports tokens, such as `{{extract_1.title}}`.                                                                    |
| `postBody`             | **Post Body (HTML template)**     | `textarea` | **Yes**                  | HTML content for the post. Supports workflow tokens, such as `{{extract_1.title}}` or `{{llm_1}}`.                                          |
| `postState`            | **Post State**                    | `select`   | No (defaults to `DRAFT`) | Choose **Draft** (`DRAFT`) or **Published Immediately** (`PUBLISHED`).                                                                      |
| `featuredImage`        | **Featured Image URL (Optional)** | `text`     | No                       | Optional featured-image URL. When set, the request enables the featured image.                                                              |
| `metaDescription`      | **Meta Description (Optional)**   | `text`     | No                       | Optional SEO meta description.                                                                                                              |
| `slug`                 | **Custom Slug (Optional)**        | `text`     | No                       | Optional post slug; execution trims it, lowercases it, and replaces whitespace with hyphens.                                                |

---

## Template Tokens & State Output

### Available Input Tokens

The form marks **App Access Token**, **Blog ID**, **Author ID**, **Post Title**, and **Post Body** as tokenizable. The workflow runner resolves template tokens before the plugin executes; for example, use `{{extract_1.title}}` in the post title or `{{globals.hubspot_access_token}}` for the access token.

### Output State

On success, the step returns the parsed HubSpot API response object directly. Downstream steps can reference properties returned by that response, including:

- `{{hubspot_1.id}}`: HubSpot post ID.
- `{{hubspot_1.slug}}`: Post slug.
- `{{hubspot_1.url}}`: Post URL.

The available properties depend on the API response.

## Sidebar UI Actions

- **View Blog**: Opens the HubSpot blog page for the configured `blogId`. The action is shown only when the blog ID resolves to a value without an unresolved template token.

---

## Example Workflow Configuration (JSON)

```json
{
	"id": "hubspot_1",
	"type": "hubspotBlog",
	"config": {
		"accessToken": "{{globals.hubspot_access_token}}",
		"blogId": "{{globals.hubspot_blog_id}}",
		"postName": "{{extract_1.title}}",
		"postBody": "<p>{{extract_1.title}}</p>",
		"postState": "DRAFT"
	}
}
```
