---
uid: np1e_configuration
title: Neuropixels 1.0 Headstage Configuration
hardware: NeuropixelsV1e Headstage
configuration: true
operator: ConfigureNeuropixelsV1eHeadstage
dataRate: 20.6
timeUntilFullBuffer: 200 μs
blockReadSize: 4096
workflowLocation: overview
---

## Configuring the NeuropixelsV1e headstage
The `NeuropixelsV1eHeadstage` operator is used to configure the Neuropixels V1e Headstage; this can enable streaming of electrophysiology data from a Neuropixels 1.0 probe and orientation data from a Bno055 IMU. This is accomplished in the example workflow by leaving all of the `NeuropixelsV1eHeadstage` properties set to their default values.

Default values for the headstage are:
- Enabling the first 384 electrodes for streaming (electrodes 0 through 383)
    - This is also known as the **Bank A** `Channel Preset`
- Setting `AP Gain` to 1000x
- Setting `LFP gain` to 50x
- Enabling the `Spike Filter`
- Setting the `Reference` to *External*

> [!WARNING]
> While the settings are left at the default values, the workflow will not run unless the gain calibration file and ADC calibration file are provided to the `NeuropixelsV1e`. To select these files, click on the `NeuropixelsV1eHeadstage` operator, expand the `NeuropixelsV1e` menu in the property pane on the right, then choose the appropriate file by selecting either `GainCalibrationFile` or `AdcCalibrationFile` and clicking the <kbd>...</kbd> button.

> [!TIP]
> For additional details on how to manually configure the headstage, such as enabling specific electrodes for recording, or modify AP / LFP gain, check out the xref:np1e_gui page.
