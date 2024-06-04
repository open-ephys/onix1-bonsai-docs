# Getting Started

## Initialize the ONI Context
The [`CreateContext`](xref:OpenEphys.Onix.CreateContext) operator initializes the acquisition context, and it should be the first node you add to your workflow as it provides access to the hardware device table for all other configuration operators.

:::workflow
![CreateContext](~/workflows/create-context.bonsai)
:::