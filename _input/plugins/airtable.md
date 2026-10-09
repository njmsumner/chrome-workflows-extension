# Add a record to Airtable

## Overview

Use this step to add information from a workflow to a table in Airtable. It can save details such as a webpage title, link, or AI-generated summary.

## Simple examples

- Save a webpage title, link, and summary in an Airtable research table.
- Store details gathered during a workflow in Airtable so they are easy to review later.

## Before you start

You need an Airtable Personal Access Token, the ID of your base, and the name or ID of the table where the record should be added. Make sure your token can access that base.

---

## Record details

Enter the following details:

- **Personal Access Token**: Paste a token from Airtable. Keep it private, and make sure it can access the base you want to use.
- **Base ID**: Enter the ID of the Airtable base that should receive the record.
- **Table Name or ID**: Enter the name or ID of the destination table.
- **Record Fields (JSON)**: List the Airtable column names and the values to save in valid JSON format. In supported fields, use **Insert workflow token** to add information from earlier steps, such as a page title or summary.

---

## After the record is added

Later workflow steps can use the new record's ID, creation time, Airtable link, and saved values.

---

## View the Airtable base

When a valid base ID is provided, the step shows a **View Airtable Base** button in the sidebar. Select it to open the base in your browser.
