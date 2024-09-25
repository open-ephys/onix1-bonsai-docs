---
uid: np2e
title: Neuropixels V2e Headstage
---

These are the devices available on the Neuropixels V1e Headstage:

- Supports up to two [IMEC Neuropixels 2.0 probes](xref:np2e_np2):
    - Either 1x or 4x silicon shanks with a 70 x 24 µm cross-section.
    - 1280 electrodes low-impedance TiN electrodes per shank (5120 total).
    - 384 parallel, full-band (AP, LFP), low-noise recording channels.
        - Bandwidth of 0.3-10 kHz, sampled at 30 kHz
- [Bno055](xref:np2e_bno055): 9-axis IMU for real-time, 3D orientation tracking and easy automated commutation with Open Ephys commutators.

> [!TIP]
> Visit the [Neuropixels V2e Headstage Hardware Guide](https://open-ephys.github.io/onix-docs/Hardware%20Guide/Headstages/headstage-neuropix-2e.html) to learn more about the hardware such as weight, dimensions, and proper power voltages.

The example workflow below can by copy/pasted into the Bonsai editor using the clipboard icon in the top right. This workflow:
- Captures data from the Bno055 IMU and Neuropixels 2.0 probe(s) and streams it to disk.
- Monitors the the Neuropixels V2e Headstage port status
- Automatically commutates the tether if there is a proper commutator connection. 

::: workflow
![/workflows/hardware/np2e/np2e.bonsai workflow](../../../workflows/hardware/np2e/np2e.bonsai)
:::

The following pages in the Neuropixels V2e Headstage Guide provide a breakdown of the above example workflow<!-- and a Python script for loading data-->.

> [!NOTE]
> The Neuropixels V2e Beta Headstage example workflow (<a href="~/workflows/hardware/np2ebeta.bonsai" download>download</a>) is nearly identical to the Neuropixels V2e Headstage example workflow. Follow the pages in the Neuropixels V2e Headstage Guide to learn how it works.

> [!TIP]
> Visit the <xref:GettingStarted> pages if you are unfamiliar with using Onix hardware in Bonsai.