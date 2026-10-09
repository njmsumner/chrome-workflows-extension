# Microsoft Excel

## Overview

Use **Microsoft Excel** to add a row to a table or read values from a worksheet in an Excel workbook stored in OneDrive or SharePoint.

## Use Cases

- Add a workflow result to a table, such as logging a completed task.
- Read a set of cells and use their contents in later workflow steps.
- Read a worksheet's used range when you want to work with its existing data.

## Set up Microsoft sign-in

Add your Microsoft app registration's client ID under **Settings > Global Variables**. Add a tenant ID if your organization requires one. The first time the workflow runs, sign in and approve access.

## Configure the step

1. Add **Microsoft Excel** to your workflow and choose **Append Row** or **Get Cell / Range Content**.
2. Enter the workbook's file item ID in **Workbook Item ID**.
3. Under **Sheet Name / Cell Range**, enter a worksheet name. To read specific cells, add `!` and a range, such as `Sheet1!A1:C5`. Enter only the worksheet name to read its used range.
4. For **Append Row**, enter an existing table name under **Table Name** (defaults to `Table1`) and provide **Row Values (JSON Array)** in the table's column order, such as `["Task", "Complete"]`.
5. Use the token picker to include values from earlier workflow steps.

Choose **View Excel File** to open the workbook in OneDrive.
