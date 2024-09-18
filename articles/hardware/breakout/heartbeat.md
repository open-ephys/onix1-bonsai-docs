---
uid: breakout_heartbeat
title: Breakout Board Heartbeat
hardware: true
device: heartbeat
---

The following excerpt from the [Breakout Board example workflow](xref:breakout_workflow) demonstrates heartbeat functionality.

::: workflow
![/workflows/hardware/breakout/heartbeat.bonsai workflow](../../../workflows/hardware/breakout/heartbeat.bonsai)
:::

The <xref:OpenEphys.Onix1.HeartbeatData> operator generates a sequence of <xref:OpenEphys.Onix1.HeartbeatDataFrame>s. `HeartbeatData` emits `HeartbeatDataFrame`s at a regular interval defined during <xref:breakout_configuration> using the <xref:OpenEphys.Onix1.ConfigureBreakoutBoard>'s `Heartbeat BeatsPerSecond` property (in our case 10 Hz). In the Breakout Board example workflow, the `HeartbeatData`'s `DeviceName` property is set to "BreakoutBoard/Heartbeat". This links the `HeartbeatData` operator to the corresponding configuration operator. The [MemberSelector](https://bonsai-rx.org/docs/api/Bonsai.Expressions.MemberSelectorBuilder.html) operator selects the `Clock` member from the `HeartbeatDataFrame` so the user can visualize `Clock` data from the `HeartbeatDataFrame`.