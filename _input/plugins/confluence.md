# Update a Confluence page

Use **Confluence Page** to replace the content of an existing Confluence page with information from a workflow. You can also change the page title.

## Overview

Provide the address of your Confluence site and the ID of the page to update. The page body is replaced when the workflow runs. If **Page Title (Optional)** is left blank, the current title stays as it is.

## Simple examples

- Replace a project page with the latest summary created by a workflow.
- Update an existing page with information gathered from a webpage.
- Change a page’s title and replace its content with a workflow report.

## Set up the page

- **Confluence Base URL:** Enter your Confluence site address, such as `https://your-domain.atlassian.net/wiki`.
- **Page ID (Content ID):** Enter the ID of the existing page you want to update.
- **Page Title (Optional):** Enter a new title, or leave this blank to keep the current title.
- **Page Body (XHTML Storage Format):** Enter the new page content. Confluence requires its own format for page content; information from earlier workflow steps can be included.

## Set up authentication

Choose the method that matches your Confluence account:

- **Basic Auth (Cloud API Token):** Enter your account email or username and its API token or password.
- **Personal Access Token (PAT):** Choose this option and enter your Confluence personal access token. You do not need to enter an email address or username.

The token must be valid for the selected authentication method, and the account must be able to edit the page.

Once the site address and page ID are set, use **View Page** to open the page in Confluence.
