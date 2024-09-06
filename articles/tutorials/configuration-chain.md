---
uid: configuration-chain
title: Configuration Chain Tutorial
---

### CreateContext
The <xref:OpenEphys.Onix1.CreateContext> operator creates a "context" that determines the device
driver, physical interface type, and host-computer index that the system communicates through. The
`Driver` property is set to "riffa", which is the name of the PCIe device used by ONIX. In our case,
because we are using a single ONIX system, the `Index` property is set to 0. If a second system is
used on the same computer, a second <xref:OpenEphys.Onix1.CreateContext> operator would be required
and its `Index` property set to 1.

### StartAcquisition
The <xref:OpenEphys.Onix1.StartAcquisition> operator begins acquisition after the hardware has been
configured. In this example, we are going to be capturing data from the breakout board only, so the
rate of data being produced by the hardware will be relatively modest (~2.5 MB/s), and dominated by
the analog input. We are using a `BlockReadSize` of 2048 bytes. This means that the data reading
thread will block until 2048 bytes of data have been produced by the hardware. At 2.5 MB/s the
hardware will produce 2048 bytes every 800 microseconds or so. This is a hard bound on the latency
of the system. If lower latencies were required, the hardware would need to produce data more
quickly or the `BlockReadSize` would need to be reduced. The `BlockWriteSize` is also set to 2048
bytes. This determines the amount of memory that is preallocated for temporarily holding data before
it is sent to hardware. It is less critical to performance unless the rate that data be written to
the hardware is comparable to the rate that the hardware produces data, which is not a common
scenario.