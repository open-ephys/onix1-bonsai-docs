---
uid: device-electricalstimulator
title: Headstage64ElectricalStimulator
isGuide: true
isDevice: true
isHeadstage: false
device: ElectricalStimulator
headstage: Headstage64
workflow: true
workflow_file: ~/workflows/devices/ElectricalStimulator.bonsai
visualize: false
visualize_rollinggraph: false
visualize_timeseries: false
visualize_mat: false
visualize_text: false
---

<br>

## Send Trigger

In the workflow, pressing the middle button on the mouse will send a trigger, delivering the stimulation waveform that is configured. The `MouseButtonDown` node can be found in the `Bonsai.Windows.Input` package.