---
uid: onix1-breakout_configuration
title: Onix1 Breakout Configuration
hub: Onix1 Breakout
hubDirectory: onix1-breakout
deviceDirectory: configuration
configuration: true
operator: ConfigureBreakoutBoard
---

This above configuration graph creates a context (an object that interfaces with the hardware), configures the Onix1 breakout board through that context, starts acquisition, and timestamps/saves the Onix1 breakout configuration action. 


- The [`BreakoutBoard`](xref:OpenEphys.Onix1.ConfigureBreakoutBoard) operator is set to configure the Onix1 Breakout to:
    - stream digital IO and analog IO data 
    - set analog pin 0 as output and the rest as input
    - accept ±10V analog inputs range 
    - stream heartbeat and memory usage data at 10Hz
- The above bullet point is accomplished by changing the following properties from their default values:  
    - The `BreakoutBoard`'s `AnalogIO Direction0` property is set to `Output`.
    - The `BreakoutBoard`'s `MemoryMonitor Enable` property is set to `True`.
- The [`TimeStamp`](https://bonsai-rx.org/docs/api/Bonsai.Reactive.Timestamp.html) operator generates a sequence of timestamped items from its input sequence.
- The [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) operator writes a file containing `Timestamp` as well as `Clock`, `BlockReadSize`, `BlockWriteSize` members from <xref:OpenEphys.Onix1.ContextTask> with the following name format: `start-time_<timestamp>.csv`. 
<!--This is accomplished by changing the following [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) properties from their default values:
    -   The `CsvWriter`'s `FileName` property is set to "start-time_.csv". Without specifying a directory, Bonsai will save this file in the same directory containing this workflow.
    -   The `CsvWriter`'s `Selector` property is set to "`Timestamp`, `Value.AcquisitionClockHz`, `Value.BlockReadSize`, `Value.BlockWriteSize`". This writes those members from the <xref:OpenEphys.Onix1.ContextTask> to the Csv file.
    -   The `CsvWriter`'s `Suffix` property is set to "Timestamp". This appends timestamp data such that a unique filename is produced using global wall-clock timestamps every time the workflow is run.-->

    Timestamp,Value.Clock,Value.StatusCode,Value.SerdesLocked,Value.SerdesPass