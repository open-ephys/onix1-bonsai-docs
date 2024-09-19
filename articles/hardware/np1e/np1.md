---
uid: np1e_np1
title: Neuropixels V1e Headstage Probe
hardware: Neuropixels V1e Headstage
device: true
---

The following excerpt from the [Neuropixels V1e Headstage example workflow](xref:np1e) demonstrates Neuropixels 1.0 probe functionality by streaming data and saves Neuropixels 1.0 probe data.

::: workflow
![/workflows/hardware/breakout/np1.bonsai workflow](../../../workflows/hardware/np1e/np1.bonsai)
:::

The <xref:OpenEphys.Onix1.NeuropixelsV1eData> operator generates a sequence of <xref:OpenEphys.Onix1.NeuropixelsV1eDataFrame>s. In the Neuropixels V1e Headstage example workflow,
- The `NeuropixelsV1eData`'s `BufferSize` is set to 36. Therefore, each frame will contain a 36-element `Clock` vector, a 384-channel x
  36-sample `SpikeData` matrix, and a 384-channel x 3-sample `LfpData` matrix. `LfpData` has less samples than `Clock` and `SpikeData` because `LfpData` is sampled at a lower sample rate; the AP band is sampled at 30 kHz and the LFP band is sampled at 2.5 kHz. This corresponds to 1.2 ms of data. <!--That's lower than the minimal latency introduced by the `BlockReadSize` setting. Therefore, the chosen value for  `BufferSize` will not impose a significant effect on processing latency. The buffer will be filled essentially every time hardware is accessed and propagated instantly.
  -->
- The `NeuropixelsV1eData`'s `DeviceName` property is set to "NeuropixelsV1eHeadstage/NeuropixelsV1e". This links the <xref:OpenEphys.Onix1.NeuropixelsV1eData> operator to the corresponding configuration operator. 

The [`MemberSelector`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.MemberSelectorBuilder.html) operators each select a member from the <xref:OpenEphys.Onix1.NeuropixelsV1eDataFrame>: `Clock`, `SpikeData`, and `LfpData`. The [`MatrixWriter`](https://bonsai-rx.org/docs/api/Bonsai.Dsp.MatrixWriter.html) operators saves the selected members to files with the following format: `np1-clock_<timestamp>.raw`, `np1-spike_<timestamp>.raw`, and `np1-lfp_<timestamp>.raw`, respectively. 