---
uid: breakout_analog-io
title: Breakout Board Analog IO
hardware: true
device: analog io
videoCaption: This visualizes analog IO data using Bonsai visualizers. The "BreakoutAnalogOutput" window shows the values that are being used by the <code>BreakoutAnalogOutput</code> operator to update the analog IO port. However, only analog channel 0 is actually updated because it's the only channel configured as output by the <code>BreakoutBoard</code> operator. The "AnalogData" window shows the voltages at the various pins of the analog IO port. They are being read by the the ADCs on the breakout board and produced in Bonsai by the <code>BreakoutAnalogInput</code> operator. This confirms that only analog channel 0 is outputting the sawtooth waveform.
---

The following excerpt from the [Breakout Board example workflow](xref:breakout) demonstrates analog IO functionality by computing a ~1Hz sawtooth pattern, outputting it to the analog IO port, and reading it back from the analog IO port. It also saves analog inputs data. Though this excerpt comprises of two smaller discrete graphs, they are combined on this page because the easiest way to demonstrate the analog input is to read back analog output data.

::: workflow
![/workflows/hardware/breakout/analog-io.bonsai workflow](../../../workflows/hardware/breakout/analog-io.bonsai)
:::

## Analog outputs

:::workflow
![/workflows/hardware/breakout/analog-outputs.bonsai workflow](../../../workflows/hardware/breakout/analog-outputs.bonsai)
:::

The `RampGenerator` operator generates a sequence of values which comprises ~1Hz sawtooth waveform from -10 to 10. The <xref:OpenEphys.Onix1.BreakoutAnalogOutput> updates the analog output port upon receiving a value in the upstream sequence. In the Breakout Board example workflow:
- The `BreakoutAnalogOutput`'s `DataType` property is set to "Volts". The `RampGenerator` operator computes a sawtooth pattern that consists of float types in units of volts, so `BreakoutAnalogOutput` should be set accordingly.
- The `BreakoutAnalogOutput`'s `DeviceName` property is set to "BreakoutBoard/AnalogIO". This links the `BreakoutAnalogOutput` operator to the corresponding configuration operator. 

Although a voltage ramp is sent to all the channels, only channel 0
was selected to be a output, so this is the only channel that will be affected. If other channels
are configured as output (see <xref:breakout_configuration>), they will
also ramp their voltage. The `RampGenerator` is a
[GroupWorkflow](https://bonsai-rx.org/docs/articles/editor.html#workflow) that contains multiple Bonsai operators. 
Examine `RampGenerator`'s internals by pressing <kbd>Ctrl</kbd> + <kbd>Enter</kbd> when its node is selected:

:::workflow
![/workflows/hardware/breakout/ramp-generator.bonsai workflow](../../../workflows/hardware/breakout/ramp-generator.bonsai)
:::

## Analog inputs

Analog input data can be produced from an analog IO channel that is configured as an output. Because analog inputs and analog outputs share pins on the breakout board, this enables loopback recordings of signals from the analog output port through the analog input port. The Breakout Board example workflow does exactly this on analog IO channel 0.

:::workflow
![/workflows/hardware/breakout/analog-inputs.bonsai workflow](../../../workflows/hardware/breakout/analog-inputs.bonsai)
:::

The <xref:OpenEphys.Onix1.BreakoutAnalogInput> operator generates a sequence of <xref:OpenEphys.Onix1.BreakoutAnalogInputDataFrame>s. In the Breakout Board example workflow:
- The `BreakoutAnalogInput`'s `BufferSize` is set to 50. Therefore, each frame will contain a 50-element `Clock` vector and a 12-channel x
  50-sample `AnalogData` matrix. The analog inputs are sampled at 100 kHz per channel so this
  corresponds to 500 µs of data. That's lower than the minimal latency introduced by the `BlockReadSize` setting. Therefore, the chosen value for  `BufferSize` will not impose a significant effect on processing latency. The buffer will be filled essentially every time hardware is accessed and propagated instantly.
- The `BreakoutAnalogInput`'s `DataType` is set to `Volts`. This means that samples will be represented as units of units of voltage in a single-precision floating point type.
- The `BreakoutAnalogInput`'s `DeviceName` is set to "BreakoutBoard/AnalogIO". This links the `BreakoutAnalogInput` operator to the corresponding configuration operator. 

The [MemberSelector](https://bonsai-rx.org/docs/api/Bonsai.Expressions.MemberSelectorBuilder.html) operators each select a member from the `BreakoutAnalogInputDataFrame`, `Clock` and `AnalogData` which contain the <xref:OpenEphys.Onix1.ContextTask.AcquisitionClockHz>-based sample times and sample values,
respectively. The [MatrixWriter](https://bonsai-rx.org/docs/api/Bonsai.Dsp.MatrixWriter.html) operators saves the selected members to files with the following format: `analog-clock_<timestamp>.raw` and `analog-data_<timestamp>.raw`, respectively. 