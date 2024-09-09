---
uid: onix1-breakout_heartbeat
title: Onix1 Breakout Heartbeat
hub: Onix1 Breakout
hubDirectory: onix1-breakout
device: heartbeat
deviceDirectory: heartbeat
sourceOperator: HeartbeatData
dataFrame: HeartbeatDataFrame
configureOperator: ConfigureBreakoutBoard
---

This graph generates a sequence of heart beat data frames and selects the `Clock` member from that data frame for the user to visualize.

- The <xref:OpenEphys.Onix1.HeartbeatData> operator generates a sequence of <xref:OpenEphys.Onix1.HeartbeatDataFrame>s. This is accomplished by changing the following <xref:OpenEphys.Onix1.HeartbeatData> properties from their default values:
    - The `DeviceName` is set to `BreakoutBoard/Heartbeat`. This links the <xref:OpenEphys.Onix1.HeartbeatData> operator to the corresponding configuration operator. 
- The [`MemberSelector`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.MemberSelectorBuilder.html) operator selects the `Clock` member from the <xref:OpenEphys.Onix1.HeartbeatDataFrame> so the user can visualize `Clock` data from the <xref:OpenEphys.Onix1.HeartbeatDataFrame>.

