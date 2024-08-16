---
uid: device-configure
title: Device Configuration Operators
---

> [!CAUTION]
>  Device configuration operators are not recommended for interfacing with off-the-shelf ONIX hardware. Use [aggregate configuration operators](xref:configure) to do that instead. Aggregate operators confer the following benefits:
> - The `address` properties of aggregate configuration operators are automatically configured whereas a device configuration operators requires manual configuration of its `address` property. This improves ease of using Open Ephys hardware.
> - The workflow is less cluttered with configuration operators as one aggregate configuration operator can correspond to multiple device operators. This improves workflow legibility and expedites the workflow creation process.

Device configuration operators belong in a top-level chain of operators between `CreateContext` and `StartAcquisition` for configuring devices on ONIX hardware.