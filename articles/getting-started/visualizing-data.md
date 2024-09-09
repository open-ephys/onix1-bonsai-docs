---
uid: VisualizingData
title: Visualizing Data
---

To visualize data from any `*Data` operator, typically the variable that needs to be visualized must first be output from the operator. To do this, right-click on any `*Data` operator and select the first option; this will be something similar to `Output (OpenEphys.Onix1.*DataFrame)`. From the drop-down list, select the corresponding data variable to be visualized. Doing so will create a new operator in the workflow.

Select this new operator and right-click it, search for the **Select Visualizer** option and choose a visualizer from that drop-down menu. Note that some data types will require a secondary operator to be connected directly after it, such as a `RollingGraph` operator. If so, this secondary operator must be right-clicked and the appropriate visualizer must be selected here.

> [!Note]
> Some visualizers come as Bonsai operators and can be found in the `Bonsai.Design.Visualizers` package, which can be installed in the Bonsai package manager. These operators must be placed in the workflow and be linked to a data operator to visualize the data properly.
