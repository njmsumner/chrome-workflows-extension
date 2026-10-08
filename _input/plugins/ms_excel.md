# Microsoft Excel

## Overview

Use **Microsoft Excel** to add a row to a table or read values from a worksheet in an Excel workbook stored in OneDrive or SharePoint.

## Simple examples

- Add a workflow result to a table, such as logging a completed task.
- Read a set of cells and use their contents in later workflow steps.
- Read a worksheet's used range when you want to work with its existing data.

## Set up Microsoft sign-in

Before using this step, add your Microsoft app registration's client ID under **Settings > Global Variables**. You can also add a tenant ID if your organization requires one; otherwise, the extension uses the default Microsoft sign-in option. The first time the workflow runs, sign in to Microsoft and approve the requested access.

## Add and configure the step

1. Add **Microsoft Excel** to your workflow.
2. Under **Action**, choose **Append Row** to add a row, or **Get Cell / Range Content** to read data.
3. Enter the workbook's file item ID in **Workbook Item ID**. This is the ID for the file in OneDrive or SharePoint. You can insert a saved value using the token picker.
4. Under **Sheet Name / Cell Range**, enter the worksheet name. To read specific cells, add `!` and the cell range, for example `Sheet1!A1:C5`. To read the worksheet's used range, enter only its name. The cell range applies when reading; new rows are added to a table.
5. For **Append Row**, enter the name of an existing table under **Table Name**. If you leave it blank, the step uses `Table1`. Enter the new row's values under **Row Values (JSON Array)**, in the same order as the table's columns. Keep the values in a valid list format, such as `["Task", "Complete"]`.
6. Use the token picker in the available fields to include information from earlier workflow steps.

Choose **View Excel File** to open the configured workbook in OneDrive.
