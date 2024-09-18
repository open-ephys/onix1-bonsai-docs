---
uid: breakout_configuration
title: Breakout Board Configuration
configuration: true
hardware: Breakout Board
operator: ConfigureBreakoutBoard
dataRate: 2.5
timeUntilFullBuffer: 800 μs
blockReadSize: 2048
videoCaption: This visualizes how properties are Breakout Board properties are changed in Bonsai. Specifically, the <code>AnalogIO Direction0</code> property is set to "Output", and the <code>MemoryMonitor Enable</code> property is set to "True".
workflowLocation: workflow
---

The `xref:OpenEphys.Onix1.ConfigureBreakoutBoard` operator properties are set to configure the Breakout Board to enable streaming digital IO and analog IO, accept ±10V analog inputs range, enable heartbeat and memory usage data at 10Hz, and set analog pin 0 as output. This is accomplished in the Breakout Board example workflow by changing the following properties from their default values:
- The `BreakoutBoard`'s `AnalogIO Direction0` property is set to `Output`.
- The `BreakoutBoard`'s `MemoryMonitor Enable` property is set to `True`.
