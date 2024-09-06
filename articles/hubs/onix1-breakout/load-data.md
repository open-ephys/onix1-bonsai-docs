---
uid: onix1-breakout_load-data
title: Load Onix1 Breakout Data
hub: onix1-breakout
loadData: true
---

The following python script can be used to load and plot the data produced by the <xref:onix1-breakout>.

[!code-python[](../../../workflows/hubs/onix1-breakout/load-breakoutboard.py)]

> [!NOTE]
> This script will attempt to load entire files into arrays. For long recordings, data will need to
> be split into more manageable chunks by:
> - Modifying this script to partially load files
> - Modifying the workflow to cyclically create new files after a certain duration
