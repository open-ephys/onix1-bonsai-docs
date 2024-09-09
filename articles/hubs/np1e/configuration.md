---
uid: np1e_configuration
title: Neuropixels 1.0 Headstage Configuration
hub: NeuropixelsV1e Headstage
hubDirectory: np1e
deviceDirectory: configuration
configuration: true
operator: ConfigureNeuropixelsV1eHeadstage
noVideo: true
---

This graph creates a context (an object that interfaces with the hardware), configures the NeuropixelsV1e Headstage through that context, starts acquisition, and timestamps/saves the Onix1 breakout configuration action.

- The [`NeuropixelsV1eHeadstage`](xref:OpenEphys.Onix1.ConfigureNeuropixelsV1eHeadstage) operator is set to configure the NeuropixelsV2e Headstage to:
    - stream and save electrophysiology data from a Neuropixels 1.0 probe
    - stream and save orientation data from a Bno055
- The [`TimeStamp`](https://bonsai-rx.org/docs/api/Bonsai.Reactive.Timestamp.html) operator generates a sequence of timestamped items from its input sequence.
- The [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) operator writes a file containing `Timestamp` as well as `AcquisitionClockHz`, `BlockReadSize`, `BlockWriteSize` members from <xref:OpenEphys.Onix1.ContextTask> with the following name format: `start-time_<timestamp>.csv`. 


<!-- - The above bullet point is accomplished by changing the following properties from their default values:  
    - The `NeuropixelsV2eHeadstage`'s `AnalogIO Direction0` property is set to `Output`.
    - The `NeuropixelsV2eHeadstage`'s `MemoryMonitor Enable` property is set to `True`. -->