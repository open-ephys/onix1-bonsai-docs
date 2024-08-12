---
uid: headstage-breakoutboard
title: BreakoutBoard
isGuide: true
isHeadstage: true
headstage: BreakoutBoard
devices: [  { id: AnalogIO, file: ~/articles/devices/breakoutanalogio }, { id: DigitalIO, file: ~/articles/devices/breakoutdigitalio }, { id: Heartbeat, file: ~/articles/devices/heartbeat },{ id: MemoryMonitor, file: ~/articles/devices/memorymonitor } ]
workflow: true
workflow_file: ~/workflows/hubs/BreakoutBoard.bonsai
---

## Description
The ONIX breakout board provides the following functions:

1. [Analog IO](xref:device-breakoutanalogio)
    - 12 channels, 100 kHz per channel
    - ±10V tolerant
    - Each channel configurable as input or output
    - [Inputs](xref:OpenEphys.Onix1.BreakoutAnalogInput): 14-bit with adjustable voltage range
    - [Outputs](xref:OpenEphys.Onix1.BreakoutAnalogOutput): 16-bit with fixed ±10V range
1. [Digital IO](xref:device-breakoutdigitalio)
    - [Inputs](xref:OpenEphys.Onix1.BreakoutDigitalInput): 8 bits GPI and button state, 5V tolerant, 5 MHz/channel
    - [Outputs](xref:OpenEphys.Onix1.BreakoutDigitalOutput): 8 bits of GPO updated at 5 MHz/channel
1. [Heatbeat](xref:device-heartbeat)
    - Periodic signal from host with adjustable beat frequency
1. [Memory Monitor](xref:device-memorymonitor)
    - Diagnostic device for monitoring hardware first-in, first-out memory use
    - Used for tune real-time feedback loops for minimal latency
    - Note: _disabled by default_

This workflow configures an ONIX breakout board using <xref:OpenEphys.Onix1.ConfigureBreakoutBoard> and captures its resulting data streams. The breakout board is configured to capture data from its analog and digital inputs, and is used to monitor the control board's heartbeat and hardware memory usage. You can copy and paste the workflow into the Bonsai editor to try it out.

[!TIP]
> You can right-click each of the source operators on the second line of the workflow and select `Output` to examine and expand their output types.