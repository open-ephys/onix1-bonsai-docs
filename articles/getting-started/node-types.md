---
uid: NodeTypes
title: Node Types
---

In Bonsai, all objects are called "nodes", and have a specific function associated with them depending on what they do; this can be `Source`, `Sink`, `Combinator`, `Transform`, or `Condition`. For ONIX nodes, they are all classified as either `Source`, `Sink`, or `Combinator`. 

| Node Type | Description | Example ONIX nodes |
| --------- | ----------- | ------------------ |
| Source    | Generate event streams from devices or files | [`CreateContext`](xref:OpenEphys.Onix1.CreateContext), [`Bno055Data`](xref:OpenEphys.Onix1.Bno055Data), [`NeuropixelsV1eData`](xref:OpenEphys.Onix1.NeuropixelsV1eData) |
| Sink      | Save data or trigger external outputs | [`ConfigureHeadstage64`](xref:OpenEphys.Onix1.ConfigureHeadstage64), [`ConfigureNeuropixelsV1eHeadstage`](xref:OpenEphys.Onix1.ConfigureNeuropixelsV1eHeadstage) |
| Combinator | Manage control flow or synchronize parallel inputs | [`StartAcquisition`](xref:OpenEphys.Onix1.StartAcquisition) |

Nodes are placed in the Bonsai editor and can be saved into a "workflow", which is a grouping of nodes and saved settings. This workflow can then be run to perform some task, depending on what nodes are placed.
