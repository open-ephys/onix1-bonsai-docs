---
uid: np2e_port-status
title: Neuropixels V2e Headstage Port Status
hub: Neuropixels V2e Headstage
hubDirectory: np2e
device: port status
deviceDirectory: port-status
features: |
    <li>Provides information about the status of the port.</li>
sourceOperator: PortStatus
dataFrame: PortStatusFrame
event: the headstage becomes disconnected, a packet fails a CRC check, etc.
noVideo: true
---

This graph generates port status data, timestamps it, and writes the timestamped port status data to a file.

- The [`PortStatus`](xref:OpenEphys.Onix1.PortStatus) operator generates <xref:OpenEphys.Onix1.PortStatusFrame>s. Events that cause the [`PortStatus`](xref:OpenEphys.Onix1.PortStatus) to emit an item when: the SERDES loses or gains lock, SERDES fails or passes parity check, or the [port status code](xref:OpenEphys.Onix1.PortStatusCode) changes value. 
    - The <xref:OpenEphys.Onix1.PortStatus>'s `DeviceName` property is set to "NeuropixelsV2eHeadstage/PortController". This links the <xref:OpenEphys.Onix1.PortStatus> operator to the corresponding hub's port controller. 
- The [`TimeStamp`](https://bonsai-rx.org/docs/api/Bonsai.Reactive.Timestamp.html) operator generates a sequence of timestamped items from its input sequence.
- The [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) operator writes a file containing `Timestamp` as well as `Clock`, `StatusCode`, `SerdesLocked`, and `SerdesPass` members from <xref:OpenEphys.Onix1.PortStatusFrame> with the following name format: `port-status_<timestamp>.csv`.