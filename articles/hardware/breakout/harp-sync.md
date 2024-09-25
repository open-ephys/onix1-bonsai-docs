---
uid: breakout_harp-sync
title: Breakout Board Harp Sync
hardware: true
device: harp sync
---

[Harp](https://harp-tech.org/) is a standard for asynchronous real-time data
acquisition and experimental control in neuroscience. It includes a clock
synchronization protocol which allows Harp devices to be connected to a shared
clock line and continuously self-synchronize their clocks to a precision of tens
of microseconds. The Harp clock signal is transmitted over a serial line every
second. Every time the Harp sync input device in the ONIX breakout board detects
a full Harp synchronization packet, a new data frame is emitted pairing the
current value of the Harp clock with the local ONIX acquisition clock.

Harp is typically used in behavioral equipment such as audio generation devices,
nose-poke loggers, servos, rotary encoders and cameras. The breakout board's
harp input allows complete, hardware level synchronization of the Harp and Onix
ecosystems. This means that all experimental events are timestamped on the same
clock and no post-hoc alignment of timing is necessary.

The following excerpt from the Breakout Board [example
workflow](xref:breakout_workflow) demonstrates the Harp sync functionality
configuring a saving data from the Harp input port on the breakout board.

::: workflow
![/workflows/hardware/breakout/harp-sync.bonsai workflow](../../../workflows/hardware/breakout/harp-sync.bonsai)
:::