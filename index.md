> [!Warning]
> These docs are under active development, feel free to contribute by either [raising an issue](https://github.com/bonsai-rx/docs/issues) or following the links saying **Edit this page**.

# Getting Started

`OpenEphys.Onix` is a [Bonsai](https://bonsai-rx.org/) interface for [Open Neuro Interface](https://github.com/open-ephys/ONI)-compliant hardware. All device initialization, configuration, and streaming functionality is exposed via reactive operators.

To install `OpenEphys.Onix` use the Bonsai package manager and search for the **OpenEphys.Onix** package.

## Initialize the ONI Context
The [`CreateContext`](xref:OpenEphys.Onix.CreateContext) operator initializes the acquisition context, and it should be the first node you add to your workflow as it provides access to the hardware device table for all other configuration operators.

:::workflow
![CreateContext](~/workflows/create-context.bonsai)
:::