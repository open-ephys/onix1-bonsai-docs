> [!Warning]
> These docs are under active development, feel free to contribute by either [raising an issue](https://github.com/bonsai-rx/docs/issues) or following the links saying **Edit this page**.

# Getting Started

`OpenEphys.Onix` is a library that can be used in [Bonsai](https://bonsai-rx.org/) to acquire data from ONIX devices, such as the [Open Ephys Acquisition Board](https://open-ephys.github.io/acq-board-docs/). For more details on ONIX devices and their implemention of ONI, click [here](https://open-ephys.github.io/onix-docs/).

## Goals

While data can be acquired using programs other than Bonsai, there are a number of advantages that come from building `OpenEphys.Onix` as a Bonsai library. A major advantage is that it maintains maximal compatibility with open source programs, including [OpenCV](https://opencv.org/), [DeepLabCut](https://www.mackenziemathislab.org/deeplabcut), and many more.

Other major advantages include:
* Visual interface provided by building on top of Bonsai's foundation
* Time-stamped synchronization across multiple devices
* Combine data streams for real-time processing

## Install

To install `OpenEphys.Onix` use the Bonsai package manager and search for **OpenEphys.Onix**.

## General Usage

### Node Type

In Bonsai, all objects are called "nodes", and have a specific function associated with them depending on what they do; this can be `Source`, `Sink`, `Combinator`, `Transform`, or `Condition`. For ONIX nodes, they are all classified as either `Source`, `Sink`, or `Combinator`. 

| Node Type | Description |
| --------- | ----------- |
| Source    | Generate event streams from devices or files | <!--- Testing comments. This is pulled from the Bonsai docs, need to change for our needs -->
| Sink      | Save data or trigger external outputs |
| Combinator | Manage control flow or synchronize parallel inputs |

Nodes are placed in the Bonsai editor and can be saved into a "workflow", which is a grouping of nodes and saved settings. This workflow can then be run to perform some task, depending on what nodes are placed.

### Property Categories

There are specific categories of properties that define when a node's properties can be modified. `Configuration` properties are only settable when the workflow is not running, and for ONIX devices define how to initialize the device. Examples would be setting the number of channels to record from, the frame rate of a camera, or defining filters to apply to recording channels. `Acquisition` properties can be manipulated when the workflow is running as well as when it is not running. An example would be a waveform to send as a stimulus, which can be modified in real-time and sent to the device multiple times with different parameters.
