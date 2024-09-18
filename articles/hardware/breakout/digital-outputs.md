---
uid: breakout_digital-outputs
title: Breakout Board Digital Outputs
hardware: true
device: digital outputs
videoCaption: This visualizes digital output data using Bonsai visualizers. The "Accumulate" window shows a graph of the value of the integer being emitted by the <code>Accumulate</code> operator over time. The "BreakoutDigitalOutput" window shows the values that are being used by the <code>BreakoutDigitalOutput</code> operator to update the digital output port. Specifically, each pin shown in that window corresponds to a pin whose state is HIGH. These visualizers correspond to changes in the digital output port status which are demonstrated in the bottom-right breakout board inset - each LED indicates the status of the corresponding digital output pin.
---

The following excerpt from the [Breakout Board example workflow](xref:breakout_workflow) demonstrates digital outputs functionality by computing a ~10Hz binary digital counter and outputting that counter to the digital output port.

::: workflow
![/workflows/hardware/breakout/digital-outputs.bonsai workflow](../../../workflows/hardware/breakout/digital-outputs.bonsai)
:::

The [Timer](https://bonsai-rx.org/docs/api/Bonsai.Shaders.Timer.html) operator generates a sequence of [64-bit signed integer](https://learn.microsoft.com/en-us/dotnet/api/system.int64?view=net-8.0)s in ~100ms intervals. The [Int](https://bonsai-rx.org/docs/api/Bonsai.Expressions.IntProperty.html) operator emits an integer (with a value of 1 in our case) when an item is received from the upstream sequence. The [Accumulate](https://bonsai-rx.org/docs/api/Bonsai.Reactive.Accumulate.html) operator increments a value by the values of items in its upstream sequence. The `Accumulate` operator emits this value when an item is received from the upstream sequence. 

The <xref:OpenEphys.Onix1.BreakoutDigitalOutput> operator updates the digital output part when sends data in the sequence computed by the upstream operators to update the digital output port. The digital outputs are updated when an item is received from the upstream sequence. Although `Accumulate` produces a 32-bit integer that counts from 0 to 2147483647, the `BreakoutDigitalOutput` operator only uses the lower 8-bits to update the digital output state. In the Breakout Board example workflow, the `BreakoutDigitalOutput`'s `DeviceName` property to "BreakoutBoard/BreakoutDigitalOutput". This links the `BreakoutDigitalOutput` operator to the corresponding configuration operator. 