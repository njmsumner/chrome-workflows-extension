# Create a Notion page

## Overview

This step creates a new page in a Notion database. It is useful when you want to save a title and optional notes from your workflow.

## Simple examples

- Save a page title and link in a research tracker.
- Add a short AI summary to a project database.
- Record details gathered by a workflow in a Notion database.

## Before you start

You need:

- A Notion internal integration secret
- Access to the database where the page should be added
- The database ID from the database's link in Notion

Your integration must be allowed to edit that database.

## What to fill in

- **Internal Integration Secret**: Paste the token from your Notion integration.
- **Database ID**: Copy the ID from the Notion database URL.
- **Page Title**: This is the title shown on the new page.
- **Page Content (optional)**: Add notes, a summary, or simple markdown text.

## What the workflow can use afterward

After the page is created, later steps can use details such as:

- The new page link
- The page ID
- The date and time it was created

## Sidebar action

- **View Notion DB**: Opens the target database in Notion so you can check where the new page was added.

This step works best when the database is already shared with your integration and you want to store a simple page entry from your workflow.
