---
uid: onix-configurebno055
title: ConfigureBno055
---
<!---
> [!NOTE]
> This was not the best node to start with because the BNO is not a device in itself. Moreover, this page's content probably isn't all correct. In any case, I think it suffices to convey the overall gist for feedback.

## Introduction

The [`ConfigureBno055`](xref:OpenEphys.Onix.ConfigureBno055) node represents a sink operator that configures the BNO055 datastream. 
--->
This is the minimal workflow to enable a headstage's orientation datastream:

:::workflow 
![CreateContext](~/workflows/create-context.bonsai)
:::
<!---
The BNO055 is an IMU (inertial momentum unit) on many headstages or miniscopes that provides orientation data. The `ConfigureBno055` node is required when acquiring orientation data from a headstage or miniscope that has a BNO055. For more information on hardware, refer to the [Onix Hardware Documentation](https://open-ephys.github.io/onix-docs). 

#### Inputs/Outputs

| Input/Output | Type          | Description                                                                                                                      |    
| ------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------- |  
| Input        | `ContextTask` | This item is used in the top-level ONIX configuration chain to configure ONIX hardware and is sourced by a `CreateContext` node. |
| Output       | `ContextTask` | This item is used in the top-level ONIX configuration chain to configure ONIX hardware and is sunk by a `StartAcquisition` node. |

#### Properties

| Property Name | Type      |       Range     | Description                                                                             |    
| ------------- | --------- | --------------- | --------------------------------------------------------------------------------------- | 
| `Enable`      | `Boolean` | `False`, `True` | `False` disables the BNO055 on the device.<br>`True` enables the BNO055 on the  device. |

### Tutorial

For examples workflows, refer to the [BNO055 Tutorial](~/tutorials/rhs2116-tut.md).

*Technical Details* is probably a better title for the next section, but I think *Nerd Stuff* is more fun. Everything below the next header is auto-generated text.

## Nerd Stuff

--->