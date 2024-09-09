---
uid: np1e_np1
title: Neuropixels V1e Headstage Probe
hub: Neuropixels V1e Headstage
hubDirectory: np1e
device: Neuropixels 1.0 Probe
deviceDirectory: np1
features: |
    <li>960 electrodes multiplex-able into 384 channels</li>
    <li>30kHz sample rate</li>
sourceOperator: NeuropixelsV1eData
dataFrame: NeuropixelsV1eDataFrame
configureOperator: ConfigureNeuropixelsV1eHeadstage
noVideo: true
---

This graph generates Neuropixels 1.0 data, selects the `Clock`, `SpikeData`, and `LfpData` members from the Neuropixels 1.0 data frame, and writes those members to various files.

- The <xref:OpenEphys.Onix1.NeuropixelsV1eData> operator generates a sequence of <xref:OpenEphys.Onix1.NeuropixelsV1eDataFrame>s. This is accomplished by changing the following <xref:OpenEphys.Onix1.NeuropixelsV1eData> properties from their default values:
    - The `DeviceName` is set to "NeuropixelsV1eHeadstage/NeuropixelsV1e". This links the <xref:OpenEphys.Onix1.NeuropixelsV1eData> operator to the corresponding configuration operator. 
    - To learn about considerations setting the `Buffer` property, visit the <xref:buffers-memory-usage>.
- The [`MemberSelector`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.MemberSelectorBuilder.html) operators each select a member from the <xref:OpenEphys.Onix1.NeuropixelsV1eDataFrame>, `Clock`, `SpikeData`, and `LfpData`. 
- The [`MatrixWriter`](https://bonsai-rx.org/docs/api/Bonsai.Dsp.MatrixWriter.html) operators saves the selected members to files with the following format: `np1-clock_<timestamp>.raw`, `np1-spike_<timestamp>.raw`, and `np1-lfp_<timestamp>.raw`, respectively. 