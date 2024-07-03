---
uid: PropertyCategories
---

# Property Categories

There are specific categories of properties that define when a node's properties can be modified. 

`Configuration` properties are only settable when the workflow is not running, and for ONIX devices define how to initialize the device. Examples would be setting the number of channels to record from, the frame rate of a camera, or defining filters to apply to recording channels. 

`Acquisition` properties can be manipulated when the workflow is running as well as when it is not running. An example would be a waveform to send as a stimulus, which can be modified in real-time and sent to the device multiple times with different parameters.
