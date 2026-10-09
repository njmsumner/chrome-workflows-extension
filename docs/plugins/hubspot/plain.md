# HubSpot Blog Post

## Overview

Use **HubSpot Blog Post** to create a new post in your HubSpot blog. You can save it as a draft or publish it immediately. The post body accepts HTML formatting, such as paragraphs and links.

## Simple examples

- Save a workflow-generated article as a draft so you can review it in HubSpot.
- Publish a prepared announcement to your blog immediately.
- Add a featured image and a short description for search results.

## Set up HubSpot access

Create a HubSpot private app and enable its content access permission. Use the app's access token in **App Access Token**. You also need the **Blog ID** for the blog where the post should appear.

You can store the access token and Blog ID under **Settings > Global Variables**, then select them with the token picker. This keeps you from entering the same values in every workflow.

## Add and configure the step

1. Add **HubSpot Blog Post** to your workflow.
2. Enter the **App Access Token** and **Blog ID**.
3. Enter a **Post Title** and **Post Body**. Both are required. Format the body as HTML; you can use the token picker to include information from earlier workflow steps.
4. Under **Post State**, choose **Draft** (the default) or **Published Immediately**.
5. Optionally add a **Featured Image URL**, **Meta Description**, or **Author ID**.
6. Optionally enter a **Custom Slug** for the post's web address. HubSpot uses lowercase letters and hyphens between words.

Choose **View Blog** to open the HubSpot blog.
