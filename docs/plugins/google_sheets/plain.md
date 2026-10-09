# Google Sheets

Use **Google Sheets** to add rows to a spreadsheet or read information from it in a workflow.

<img src="../../img/Google Sheets.png" alt="Google Sheets Step" />

## Overview

Choose **Append Row** to add a new row, or **Get Cell / Range Content** to read existing cells. When reading, you can optionally find rows containing an exact value.

## Simple examples

- Save a webpage title, link, and summary as a new row.
- Read a list of tasks from a sheet for use in a workflow.
- Find a row containing a particular project or issue name.

## Set up the spreadsheet

- **Action:** Choose **Append Row** or **Get Cell / Range Content**.
- **Spreadsheet ID:** Enter the ID from the spreadsheet’s web address.
- **Sheet Name / Cell Range:** Enter the sheet name and, if needed, the cells to use. For example, `Sheet1!A:C` selects columns A through C on a sheet named Sheet1.
- **Row Values (JSON Array):** For **Append Row**, enter the values in column order, such as `["Page title", "Page link", "Summary"]`.
- **Find Row Value:** When reading, enter a value to find. Only rows containing that exact value are returned.

## Google account access

When prompted, sign in to the Google account you want to use and allow access. That account must be able to edit the spreadsheet to add rows, or view it to read cells.

Use **View Sheet** to open the configured spreadsheet in Google Sheets.
