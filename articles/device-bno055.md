---
uid: device-bno055
title: Bno055
---

## Stream Data

This is a fully functional workflow that configures and streams BNO055 data from a Headstage64.

:::workflow
![Bno055](~/workflows/device-bno055_headstage64.bonsai)
:::

## Visualize Data

In this example, the `RollingGraph` visualizer is used to combine data for plotting data types with multiple axes (i.e., **EulerAngle**, **Quaternion**, etc.), while **Temperature** can be plotted using a `TimeSeriesVisualizer`. To enable visualization of the **Temperature** data, right-click on the node and choose `Bonsai.Design.Visualizers.TimeSeriesVisualizer`.

If the `TimeSeriesVisualizer` is not listed as an option for the **Temperature** data, make sure to download the `Bonsai.Design.Visualizers` library. Refer to <xref:VisualizingData> for more information on visualizers and how to download them.

Data will not be shown until a workflow is running. Please refer to <xref:RunningAWorkflow> to see how to run a workflow.
