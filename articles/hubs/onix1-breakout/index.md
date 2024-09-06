---
uid: onix1-breakout
title: Onix1 Breakout
hub: Onix1 Breakout
hubDirectory: onix1-breakout
index: true
---

1. [Digital Input](xref:onix1-breakout_digital-input): 8 bits GPI and button state, 5V tolerant, 5 MHz/channel.
1. [Digital Output](xref:onix1-breakout_digital-output): 8 bits of GPO updated at 5 MHz/channel.
1. [Analog IO](xref:onix1-breakout_analog-io)
    - 12 channels, 100 kHz per channel, independently configurable as input or output.
    - [Input](xref:onix1-breakout_analog-io#analog-input): independently configurable as ±2.5V, ±5V, or ±10V input voltage range.
    - [Output](xref:onix1-breakout_analog-io#analog-output): fixed ±10V output voltage range.
1. [Heartbeat](xref:onix1-breakout_heartbeat)
    - Periodic signal from host with adjustable beat frequency.
1. [Memory Monitor](xref:onix1-breakout_memory-monitor)
    - Diagnostic device for monitoring hardware first-in, first-out memory use.
    - Used for tune real-time feedback loops for minimal latency.
    - Note: _disabled by default_.