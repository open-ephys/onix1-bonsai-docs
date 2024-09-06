---
uid: buffers-memory-usage
title: Buffers & Memory Usage Tutorial
---
<!--
### Memory monitor

![Breakout board memory monitor processing graph](/images/breakout-tut_mem-monitor-graph.svg)

The hardware first-in-first-out (FIFO) memory use is monitored using 8-bit digital output port is
updated using a <xref:OpenEphys.Onix1.MemoryMonitorData> operator. A snapshot of the hardware FIFO's
use is taken at regular intervals at a rate determined in the configuration [breakout board
configuration](#configurebreakoutboard). The <xref:OpenEphys.Onix1.MemoryMonitorDataFrame>s are
saved and re-emitted by a `CsvWriter`. They can then be expanded by right-clicking the node and
hovering over `Output` in the resulting context menu, in this case to access the `PercentUsed`,
which shows the amount of the percent of hardware FIFO that occupied by data. This is a diagnostic
data stream that is most useful in the context of closed-loop performance. It tells the user if data
is being consumed rapidly enough by the host PC to keep up with data production by the hardware. The
hardware FIFO is a buffer that is required to deal with the fact that computers with normal
operating systems cannot perform operations with strict regularity. When there are hiccups in
acquisition, the hardware FIFO picks up the slack, but should then be cleared immediately. To get
the lowest latencies, the `BlockReadSize` should be as small as possible *while the memory use
percentage remains around 0%*.

> [!WARNING]
> If the hardware FIFO's `PercentUsed` is non-zero for long time periods, or is increasing, the
> `BlockReadSize` setting is too small (see [StartAcquisition](#startacquisition)). A small
> `BlockReadSize` will mean that the host computer does not have to wait long for enough data to
> become available to propagate it forward, but will reduce overall bandwidth by increasing the
> frequency at which the host computer checks if data is available and performs hardware reads.

- The `BufferSize` is set to 50. This means that 50 samples will be collected from each of the 12
  analog input and packed into a <xref:OpenEphys.Onix1.BreakoutAnalogInputDataFrame> that is
  propagated downstream (each frame will contain a 50-element `Clock` vector and a 12-channel x
  50-sample `AnalogData` matrix). The analog input are sampled at 100 kHz per channel so this
  corresponds to 500 microseconds of data. That's lower than the minimal latency introduced by the
  `BlockReadSize` setting. Therefore, our chosen `BufferSize` will not impose a significant effect on
  processing latency: the buffer will be filled essentially every time hardware is accessed and
  propagated instantly.

  -->