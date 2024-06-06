---
uid: onix-configurebno055
title: ConfigureBno055
---

> [!NOTE]
> This was not the best node to start with because the BNO is not a device in itself. Moreover, this page's content probably isn't all correct. In any case, I think it suffices to convey the overall gist for feedback.

## Introduction

The [`ConfigureBno055`](xref:OpenEphys.Onix.ConfigureBno055) node represents a source operator that enables or disables the orientation datastream. 

:::workflow 
![ConfigureBno055](~/workflows/onix-configurebno055.bonsai)
:::

This is the minimal workflow to enable a headstage's orientation datastream. I know the above workflow doesn't actually do that - it's a placeholder.

### Description

The BNO055 is the IMU (inertial momentum unit) on the headstage or miniscope that senses orientation. The `ConfigureBno055` node is required when acquiring orientation data from a headstage or miniscope that has a BNO055. For more information on hardware, refer to the [Onix Hardware Documentation](https://open-ephys.github.io/onix-docs). 

#### Inputs/Outputs

| Input/Output | Type          | Description                                                                                                                                 |    
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |  
| Input        | `ContextTask` | This item is used in the top-level ONIX configuration chain to configure ONIX hardware and is originally sourced by a `CreateContext` node. |
| Output       | `ContextTask` | This item is used in the top-level ONIX configuration chain to configure ONIX hardware and is ultimately sunk by a `StartAcquisition` node. |

#### Properties

| Property Name | Type      | Value Range    | Description                                                                             |    
| ------------- | --------- | -------------- | --------------------------------------------------------------------------------------- | 
| `Enable`      | `Boolean` | `False`/`True` | `False` disables the BNO055 on the device.<br>`True` enables the BNO055 on the  device. |

### Tutorial

For examples workflows, refer to the [BNO055 Tutorial](~/tutorials/rhs2116-tut.md).

*Technical Details* is probably a better title for the next section, but I think *Nerd Stuff* is more fun. Everything below the next header is auto-generated text.

## Nerd Stuff

