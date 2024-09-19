---
uid: np2e_configuration
title: Neuropixels 2.0 Headstage Configuration
hardware: NeuropixelsV2e Headstage
configuration: true
operator: ConfigureNeuropixelsV2eHeadstage
dataRate: 18.1
timeUntilFullBuffer: 220 μs
blockReadSize: 4096
workflowLocation: overview
---

The `NeuropixelsV2eHeadstage` operator is set to configure the Neuropixels V2e Headstage to enable streaming electrophysiology data from a Neuropixels 2.0 probe and orientation data from a Bno055 IMU. This is accomplished in the Neuropixels V2e Headstage example workflow by leaving all of the `NeuropixelsV2eHeadstage` properties set to their default values.

> [!TODO]
> Add content about GUI

> [!NOTE]
> The Neuropixels V2e Beta Headstage functions nearly identically to the Neuropixels V2e Headstage. Simply replace `ConfigureNeuropixelsV2eHeadstage` with `ConfigureNeuropixelsV2eBetaHeadstage`.