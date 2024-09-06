---
uid: onix1-breakout_analog-io
title: Onix1 Breakout Analog IO
hub: Onix1 Breakout
hubDirectory: onix1-breakout
device: analog IO
deviceDirectory: analog-io
features: |
    <li>
      12 channel analog input port accessible via a shared 12x2 male 0.1" pitch header on the breakout
      <ul><li>adjustable voltage range: 2.5V, 5V, & 10V</li></ul>
    </li>
    <li>
      12 channel analog output port accessible via a shared 12x2 male 0.1" pitch header on the breakout
      <ul><li>fixed ±10V voltage range</li></ul>
    </li>
    <li>Because analog ports are shared, it is possible to loop back and record analog output data in real-time.</li>
    <li>100kHz sample frequency</li>
sinkOperator: BreakoutAnalogInput
sourceOperator: BreakoutAnalogOutput
dataFrame: BreakoutAnalogInputDataFrame
configureOperator: ConfigureBreakoutBoard
graphDescription: This graph computes a 1Hz sawtooth pattern and outputs it from the analog output port. It is also generates analog input data, selects specific members from the analog input data frame, and writes those members to two separate files. Though this graph comprises of two smaller discrete graphs, they are combined on this page because the easiest way to demonstrate the analog input is to read back analog output data.
source: true
---

<!--
- use code tags where classes are hyperlinked?
- reverse the order of analog output and analog input in the quick-start and on the excerpt
-->

### Analog output

:::workflow
![/workflows/hubs/onix1-breakout/analog-output.bonsai workflow](../../../workflows/hubs/onix1-breakout/analog-output.bonsai)
:::

-   The `RampGenerator` operator generates a sequence of values which comprises ~1Hz sawtooth waveform from -10 to 10. 
-   The <xref:OpenEphys.Onix1.BreakoutAnalogOutput> updates the analog output port upon receiving a value in the upstream sequence. This is accomplished by changing the following <xref:OpenEphys.Onix1.BreakoutAnalogOutput> properties from their default values:
    - The <xref:OpenEphys.Onix1.BreakoutAnalogOutput>'s `DataType` property is set to "Volts". The `RampGenerator` operator computes a sawtooth pattern in units of volts, so <xref:OpenEphys.Onix1.BreakoutAnalogOutput> should be set accordingly.
    - The <xref:OpenEphys.Onix1.BreakoutAnalogOutput>'s `DeviceName` property is set to "BreakoutBoard/AnalogIO". This links the <xref:OpenEphys.Onix1.BreakoutAnalogOutput> operator to the corresponding configuration operator. 

Although a voltage ramp is sent to all the channels, only channel 0
was selected to be a output, so this is the only channel that will be affected. If other channels
are configured as output (see [ConfigureBreakoutBoard](xref:onix1-breakout_configuration)), then they will
also ramp their voltage.

The `RampGenerator` is a
[`GroupWorkflow`](https://bonsai-rx.org/docs/articles/editor.html#workflow) that contains multiple Bonsai operators. 
Examine `RampGenerator`'s internals by pressing <kbd>Ctrl</kbd> + <kbd>Enter</kbd> when its node is selected:

:::workflow
![/workflows/hubs/onix1-breakout/ramp-generator.bonsai workflow](../../../workflows/hubs/onix1-breakout/ramp-generator.bonsai)
:::

<!-- content regarding setting operators commented out bc that's too much text I think -->

<!--
- The [`Timer`](https://bonsai-rx.org/docs/api/Bonsai.Shaders.Timer.html) operator generates a sequence of [`64-bit signed integer`](https://learn.microsoft.com/en-us/dotnet/api/system.int64?view=net-8.0) in 100ms intervals. This is accomplished by changing the following [`Timer`](https://bonsai-rx.org/docs/api/Bonsai.Shaders.Timer.html) properties from their default values:
  - The `Timer`'s `Period` property is set to "00:00:01". This corresponds to 10ms (100Hz) intervals.
- The value of the integers produced by the `Timer` operator is unimportant. The [`float`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.FloatProperty.html) operator emits a float (with a value of 0.2 in our case) upon receiving an item from the upstream sequence. This is accomplished by changing the following [`Int`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.IntProperty.html) properties from their default values:
  - The `Float`'s `Value` property is set to "0.2".
- The [`Accumulate`](https://bonsai-rx.org/docs/api/Bonsai.Reactive.Accumulate.html) operator generates a sequence of items whose values are incremented by the values of items in its input sequence. An item is emitted downstream when an item is received upstream.
- The [`Mod`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.ModBuilder.html) operator generates a sequence of items whose values are equivalent to the values of the input sequence modulo 20. An item is emitted downstream when an item is received upstream. This is accomplished by changing the following [`Mod`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.ModBuilder.html) properties from their default values:
  - The `Mod`'s `Value` property is set to "20".
- The [`Add`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.AddBuilder.html) operator generates a sequence of items whose values are equivalent to the values of its input sequence minus 10. An item is emitted downstream when an item is received upstream. This is accomplished by changing the following [`Mod`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.ModBuilder.html) properties from their default values:
  - The `Add`'s `Value` property is set to "-10".
- The [`BufferCount`](https://bonsai-rx.org/docs/api/Bonsai.Reactive.BufferCount.html) operator generates a sequence of buffers hold the values of the last 12 values of the input sequence. An item is emitted downstream when an item is received upstream. This is accomplished by changing the following [`BufferCount`](https://bonsai-rx.org/docs/api/Bonsai.Reactive.BufferCount.html) properties from their default values:
  - The `BufferCount`'s `Count` property is set to "12".
  - The `BufferCount`'s `Skip` value is set to "1". This sets the condition in which every new item in the input sequence generates a new buffer in the output sequence.
- The [`ConvertToArray`](https://bonsai-rx.org/docs/api/Bonsai.Dsp.ConvertToArray.html) operator generates a sequence of arrays converted from its input sequence of buffers. An item is emitted downstream when an item is received upstream.
- The [`WorkflowOutput`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.WorkflowOutputBuilder.html) operator passes its input sequence to the `RampGenerator` operator in the parent workflow.
-->

### Analog input

Even if a analog IO channel is set as output, its output voltage is looped back to the analog input because they share a port and can be recorded. This is demonstrated in this graph 

:::workflow
![/workflows/hubs/onix1-breakout/analog-input.bonsai workflow](../../../workflows/hubs/onix1-breakout/analog-input.bonsai)
:::

- The <xref:OpenEphys.Onix1.BreakoutAnalogInput> operator generates a sequence of <xref:OpenEphys.Onix1.BreakoutAnalogInputDataFrame>s. This is accomplished by changing the following <xref:OpenEphys.Onix1.BreakoutAnalogInput> properties from their default values:
  - The `DeviceName` is set to `BreakoutBoard/AnalogIO`. This links the <xref:OpenEphys.Onix1.BreakoutAnalogInput> operator to the corresponding configuration operator. 
  - The `DataType` is set to `Volts`. This means that samples will be represented as units of units of voltage in a single-precision
    floating point type.
- The [`MemberSelector`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.MemberSelectorBuilder.html) operators each select a member from the <xref:OpenEphys.Onix1.BreakoutAnalogInputDataFrame>. Selected members in the workflow, `Clock` and `AnalogData` are unsigned integers and an array, respectively. 
- The [`MatrixWriter`](https://bonsai-rx.org/docs/api/Bonsai.Dsp.MatrixWriter.html) operators save `Clock` and `AnalogData` to files with the following format: `analog-clock_<timestamp>.raw` and `analog-data_<timestamp>.raw`, respectively. 

<!-- content regarding setting operators commented out bc that's too much text I think -->

<!--This is accomplished by changing the following `MatrixWriter` properties from their default properties:
  - The top [`MatrixWriter`](https://bonsai-rx.org/docs/api/Bonsai.Dsp.MatrixWriter.html)'s `Path` property is set to "analog-clock_.raw".
  - The top [`MatrixWriter`](https://bonsai-rx.org/docs/api/Bonsai.Dsp.MatrixWriter.html)'s `Path` property is set to "analog-data_.raw".
  - Both [`MatrixWriter`](https://bonsai-rx.org/docs/api/Bonsai.Dsp.MatrixWriter.html)'s `Suffix` property is set to "timestamp". -->
