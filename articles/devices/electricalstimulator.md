---
uid: device-electricalstimulator
title: Headstage64ElectricalStimulator
isGuide: true
isDevice: true
device: ElectricalStimulator
headstage: Headstage64
workflow: true
workflow_file: ~/workflows/devices/ElectricalStimulator.bonsai
---

<br>

## Send Trigger

In the workflow, pressing the middle button on the mouse will send a trigger, delivering the stimulation waveform that is configured. The `MouseButtonDown` node can be found in the `Bonsai.Windows.Input` package.