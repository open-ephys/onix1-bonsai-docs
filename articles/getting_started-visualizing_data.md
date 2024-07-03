---
uid: VisualizingData
---

# Visualizing Data

To visualize data from any `*Data` node, typically the variable that needs to be visualized must first be output from the node. To do this, right-click on any `*Data` node and select the first option; this will be something similar to `Output (OpenEphys.Onix.*DataFrame)`. From the drop-down list, select the corresponding data variable to be visualized. Doing so will create a new node in the workflow.

Select this new node and right-click it, search for the **Select Visualizer** option and choose a visualizer from that drop-down menu. Note that some data types will require a secondary node to be connected directly after it, such as a `RollingGraph` node. If so, this secondary node must be right-clicked and the appropriate visualizer must be selected here.

> [!Note]
> Some visualizers come as Bonsai nodes and can be found in the `Bonsai.Design.Visualizers` package, which can be installed in the Bonsai package manager. These nodes must be placed in the workflow and be linked to a data node to visualize the data properly.
