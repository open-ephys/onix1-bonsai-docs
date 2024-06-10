---
uid: GettingStarted
---

# Getting Started

## Install

To install `OpenEphys.Onix`, first install Bonsai [here](https://bonsai-rx.org/). Once Bonsai is installed, run Bonsai and use the Bonsai package manager to search for **OpenEphys.Onix**.

> [!Note]
> Pull from [here](https://open-ephys.github.io/miniscope-docs/ucla-miniscope-v4/quick/software.html#bonsai-installation-and-configuration)

## General Usage

### Node Type

In Bonsai, all objects are called "nodes", and have a specific function associated with them depending on what they do; this can be `Source`, `Sink`, `Combinator`, `Transform`, or `Condition`. For ONIX nodes, they are all classified as either `Source`, `Sink`, or `Combinator`. 

| Node Type | Description | Example ONIX nodes |
| --------- | ----------- | ------------------ |
| Source    | Generate event streams from devices or files | [`CreateContext`](xref:OpenEphys.Onix.CreateContext), [`Bno055Data`](xref:OpenEphys.Onix.Bno055Data), [`NeuropixelsV1eData`](xref:OpenEphys.Onix.NeuropixelsV1eData) |
| Sink      | Save data or trigger external outputs | [`ConfigureHeadstage64`](xref:OpenEphys.Onix.ConfigureHeadstage64), [`ConfigureNeuropixelsV1eHeadstage`](xref:OpenEphys.Onix.ConfigureNeuropixelsV1eHeadstage) |
| Combinator | Manage control flow or synchronize parallel inputs | [`StartAcquisition`](xref:OpenEphys.Onix.StartAcquisition) |

Nodes are placed in the Bonsai editor and can be saved into a "workflow", which is a grouping of nodes and saved settings. This workflow can then be run to perform some task, depending on what nodes are placed.

### Property Categories

There are specific categories of properties that define when a node's properties can be modified. `Configuration` properties are only settable when the workflow is not running, and for ONIX devices define how to initialize the device. Examples would be setting the number of channels to record from, the frame rate of a camera, or defining filters to apply to recording channels. `Acquisition` properties can be manipulated when the workflow is running as well as when it is not running. An example would be a waveform to send as a stimulus, which can be modified in real-time and sent to the device multiple times with different parameters.


## Initialize the ONI Context
The [`CreateContext`](xref:OpenEphys.Onix.CreateContext) operator initializes the acquisition context, and it should be the first node you add to your workflow as it provides access to the hardware device table for all other configuration operators.

:::workflow
![CreateContext](~/workflows/create-context.bonsai)
:::