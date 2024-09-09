---
uid: np2ebeta_configuration
title: Neuropixels 2.0 Headstage Configuration
hub: NeuropixelsV2e Beta Headstage
hubDirectory: np2ebeta
deviceDirectory: configuration
configuration: true
operator: ConfigureNeuropixelsV2eBetaHeadstage
noVideo: true
---

This graph creates a context (an object that interfaces with the hardware), configures the NeuropixelsV2e Beta Headstage through that context, starts acquisition, and timestamps/saves the Onix1 breakout configuration action.

- The [`NeuropixelsV2eBetaHeadstage`](xref:OpenEphys.Onix1.ConfigureNeuropixelsV2eBetaHeadstage) operator is set to configure the NeuropixelsV2eBeta Headstage to:
    - stream and save electrophysiology data from a Neuropixels 2.0 probe
    - stream and save orientation data from a Bno055
- The [`TimeStamp`](https://bonsai-rx.org/docs/api/Bonsai.Reactive.Timestamp.html) operator generates a sequence of timestamped items from its input sequence.
- The [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) operator writes a file containing `Timestamp` as well as `AcquisitionClockHz`, `BlockReadSize`, `BlockWriteSize` members from <xref:OpenEphys.Onix1.ContextTask> with the following name format: `start-time_<timestamp>.csv`. 


<!-- - The above bullet point is accomplished by changing the following properties from their default values:  
    - The `NeuropixelsV2eBetaHeadstage`'s `AnalogIO Direction0` property is set to `Output`.
    - The `NeuropixelsV2eBetaHeadstage`'s `MemoryMonitor Enable` property is set to `True`. -->