---
uid: InitializeOniContext
title: Initialize the ONI Context
---

The [`CreateContext`](xref:OpenEphys.Onix1.CreateContext) operator initializes the acquisition context, and it should be the first node you add to your workflow as it provides access to the hardware device table for all other configuration operators. There are several different ways to find this node and add it to the workflow:

1. From the Bonsai editor, navigate to the toolbox on the left side of the screen and expand the **Source** section. Next, expand the **OpenEphys.Onix** section, and find the `CreateContext` line. The node can then be added by either double-clicking it, or dragging and dropping the node into the workflow.

    ![Search for CreateContext node manually](../../images/bonsai-editor-place-create-context-manually.png){width=700px}

2. Click on the textbox at the top of the toolbox on the left, or from Ctrl + E to focus on the textbox, and type `CreateContext` to search for the node. Same as (1), the node can be placed by double-clicking or dragging and dropping; additionally, if the `CreateContext` string is highlighted Enter can be pressed to place the node immediately.

    ![Search for CreateContext node from textbox](../../images/bonsai-editor-place-create-context-search.png){width=700px}

3. Hover over the image of the [`CreateContext`](xref:OpenEphys.Onix1.CreateContext) workflow below, and click on the clipboard icon in the top-right corner of the workflow image to copy the workflow to the clipboard. Navigate back to Bonsai, and paste the copied workflow into the active editor. Pasting can be done via Ctrl + V, or right-clicking in the editor and choosing **Paste**.

## CreateContext Workflow

This is a nominally functional workflow that provides access to the ONI context, from which all nodes can then be linked to and configured, while also demonstrating how a Breakout Board can be configured before finishing the configuration chain by placing a [`StartAcquisition`](xref:OpenEphys.Onix1.StartAcquisition) node:

:::workflow 
![CreateContext](../../workflows/operators/ConfigureBreakoutBoard.bonsai)
:::
