---
uid: np1e
title: Neuropixels V1e Headstage
---

These are the devices available on the Neuropixels V1e Headstage:

- Supports one [IMEC Neuropixels 1.0 probe](xref:np1e_np1):
    - A single 1cm long shank probe with a 70 x 24 µm shank cross-section.
    - 960-electrode low-impedance TiN electrodes total.
    - 384 parallel, dual-band (AP, LFP), low-noise recording channels.
        - AP band at 0.3-10 kHz, sampled at 30 kHz
        - LFP band at 0.5-500 Hz, sampled at 2.5 kHz
- [Bno055](xref:np1e_bno055): 9-axis IMU for real-time, 3D orientation tracking and easy automated commutation with Open Ephys commutators.

> [!TIP]
> Visit the [Neuropixels V1e Headstage Hardware Guide](https://open-ephys.github.io/onix-docs/Hardware%20Guide/Headstages/headstage-neuropix-1e.html) to learn more about the hardware such as weight, dimensions, and proper power voltages.

The example workflow below can by copy/pasted into the Bonsai editor using the clipboard icon in the top right. This workflow:
- Captures data from the Bno055 IMU and Neuropixels 1.0 probe and streams it to disk.
- Monitors the the Neuropixels V1e Headstage port status.
- Automatically commutates the tether if there is a proper commutator connection. 

::: workflow
![/workflows/hardware/np1e/np1e.bonsai workflow](../../../workflows/hardware/np1e/np1e.bonsai)
:::

The following pages in the Neuropixels V1e Headstage Guide provide a breakdown of the above example workflow<!-- and a Python script for loading data-->.

> [!TIP]
> Visit the <xref:GettingStarted> pages if you are unfamiliar with Bonsai.