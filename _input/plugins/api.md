# API/Webhook

Use **API/Webhook** to send information from a workflow to another online service, or to retrieve information from one. You can start with a ready-made template or enter the service details yourself.

## Overview

Choose the service and information you want to send. The step contacts that service and makes its reply available to later steps in your workflow. Some services require an address or access details that you provide.

## Simple examples

- Send an AI-generated summary of a webpage to a Discord channel.
- Create a GitHub issue using a webpage’s title and summary.
- Add a Todoist task with a webpage link and a short description.

## Get started

<img src="../../img/Api.png" alt="API/Webhook Step" />

1. Choose a ready-made option from **Use Template**, or set up the connection yourself.
2. Enter the service’s address in **API Endpoint**. The address must begin with `http://` or `https://`.
3. Choose a **Method**. For example, **GET** retrieves information, while **POST** usually sends information or creates something. **PUT** and **PATCH** update information; **DELETE** removes it.
4. If the service requires access details, add them under **HTTP Headers (JSON)**. This step does not sign in to services for you.
5. Use **Payload Body (JSON)** to choose what information to send. You can include results from earlier workflow steps. Leave it empty to send the previous step’s result automatically.

Templates fill in example settings for services such as Discord, GitHub, Notion, Todoist, Telegram, ClickUp, and n8n. Review the settings and supply any service-specific address or access details before running the workflow.
