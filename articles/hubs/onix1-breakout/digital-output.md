---
uid: onix1-breakout_digital-output
title: Onix1 Breakout Digital Output
hub: Onix1 Breakout
hubDirectory: onix1-breakout
device: digital output
deviceDirectory: digital-output
features: |
    <li>
        8 bit digital output port accessible via 8x2 male 0.1" pitch header
        <ul><li>3.3V logic level</li></ul>
    </li>
    <li>5 MHz sample frequency</li>
sinkOperator: BreakoutDigitalOutput
dataFrame: BreakoutDigitalOutputDataFrame
configureOperator: ConfigureBreakoutBoard
---

<!--
- use code tags where classes are hyperlinked?
-->

This graph computes a 10Hz binary digital counter and outputs that value at the digital output port.

-   The [`Timer`](https://bonsai-rx.org/docs/api/Bonsai.Shaders.Timer.html) operator generates a sequence of [`64-bit signed integer`](https://learn.microsoft.com/en-us/dotnet/api/system.int64?view=net-8.0) in 100ms intervals. 
-   The value of the integers produced by the `Timer` operator is unimportant. The [`Int`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.IntProperty.html) operator emits an integer (with a value of 1 in our case) upon receiving an item from the upstream sequence. 
-   The [`Accumulate`](https://bonsai-rx.org/docs/api/Bonsai.Reactive.Accumulate.html) operator generates a sequence of items whose values are incremented by the values of items in its input sequence. An item is emitted downstream when an item is received upstream. 
-   The <xref:OpenEphys.Onix1.BreakoutDigitalOutput> operator sends data in the sequence computed by the upstream operators to update the digital output port. The digital outputs are updated when an item is received from the upstream sequence. Although [`Accumulate`](https://bonsai-rx.org/docs/api/Bonsai.Reactive.Accumulate.html) produces a 32-bit integer that counts from 0 to 2147483647, the <xref:OpenEphys.Onix1.BreakoutDigitalOutput> operator only uses the lower 8-bits to update the digital output state. 
    -   Set the <xref:OpenEphys.Onix1.BreakoutDigitalOutput>'s `DeviceName` property to "BreakoutBoard/BreakoutDigitalOutput". This links the <xref:OpenEphys.Onix1.BreakoutDigitalOutput> operator to the corresponding configuration operator. 

<!-- content regarding setting operators commented out bc that's too much text I think -->

<!-- This is accomplished by changing the following [`Timer`](https://bonsai-rx.org/docs/api/Bonsai.Shaders.Timer.html) properties from their default values:
    -   The `Timer`'s `Period` property is set to "00:00:10". This corresponds to 100ms (10Hz) intervals. -->
<!-- This is accomplished by changing the following [`Int`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.IntProperty.html) properties from their default values:
    -   The `Int`'s `Value` property is set to "1". -->