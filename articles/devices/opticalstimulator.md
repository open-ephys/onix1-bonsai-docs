---
uid: device-opticalstimulator
title: Headstage64OpticalStimulator
isGuide: true
isDevice: true
device: OpticalStimulator
headstage: Headstage64
workflow: true
workflow_file: ~/workflows/devices/OpticalStimulator.bonsai
---

<br>

## Send Trigger

While the workflow is running, pressing the middle button on the mouse will send a trigger delivering the stimulation waveform that is configured. The `MouseButtonDown` node can be found in the `Bonsai.Windows.Input` package.