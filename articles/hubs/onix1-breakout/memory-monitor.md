---
uid: onix1-breakout_memory-monitor
title: Onix1 Breakout Memory Monitor
hub: Onix1 Breakout
hubDirectory: onix1-breakout
device: memory monitor
deviceDirectory: memory-monitor
sourceOperator: MemoryMonitorData
dataFrame: MemoryMonitorDataFrame
configureOperator: ConfigureBreakoutBoard
graphDescription: This graph generates a sequence of memory usage data frames, write to a csv file, and selects the <code>PercentUsed</code> member from that data frame for the user to visualize.
source: true
---

- The <xref:OpenEphys.Onix1.MemoryMonitorData> operator generates a sequence of <xref:OpenEphys.Onix1.MemoryMonitorDataFrame>s. This is accomplished by changing the following <xref:OpenEphys.Onix1.MemoryMonitorData> properties from their default values:
    - The `DeviceName` is set to `BreakoutBoard/MemoryMonitor`. This links the <xref:OpenEphys.Onix1.MemoryMonitorData> operator to the corresponding configuration operator. 
- The [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) operator saves the `Clock`, `BytesUsed`, and `PercentUsed` mmebers to a file with the following format: `memory-use_<timestamp>.csv`. Because [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) is a <em>sink</em> operator, its output sequence is equivalent to its input sequence. In other words, its output is equivalent to <xref:OpenEphys.Onix1.MemoryMonitorDataFrame>'s output. In other words, its output is equivalent to <xref:OpenEphys.Onix1.MemoryMonitorData>'s output. Therefore, it's possible to use a [`MemberSelector`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.MemberSelectorBuilder.html) operator on the [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) to select members from <xref:OpenEphys.Onix1.MemoryMonitorDataFrame>
- The [`MemberSelector`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.MemberSelectorBuilder.html) operator selects the `PercentUsed` member from the <xref:OpenEphys.Onix1.MemoryMonitorDataFrame> so the user can visualize `PercentUsed` data from the <xref:OpenEphys.Onix1.MemoryMonitorDataFrame>.