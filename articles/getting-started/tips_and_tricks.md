---
uid: TipsAndTricks
title: Tips and Tricks
---

## Bonsai Node Actions

When running a workflow in Bonsai, nodes are evaluated from left to right, and top to bottom, meaning that the order of the nodes becomes very important. Additionally, nodes that are linked together conceptually must be linked together explicitly in the editor. Below is a table with some methods for adding links, removing links, reordering nodes horizontally and vertically, as well as some shortcuts to aid in placing nodes more efficiently.

The order of nodes is also important for which actions can be taken. In the table below, the "first" node is always the one that is on the left side, or on the bottom for multiple rows of nodes. If the first node clicked is on the right side, or on the top, these actions do not work.

| Goal | Clicks / Keystrokes | Description |
| ---- | ------------------- | ----------- |
| Link two nodes | Click and hold the first node, drag the cursor to the second node, and release | While dragging the cursor, it will temporarily change to a red symbol until there is a valid target (e.g., the second node), where it will change to an up arrow |
| Link two nodes | Right-click the first node, and select **Create Connection**. Select the second node | While moving the cursor, it will change to an up arrow. A valid node target will change color when hovering over it |
| Link two nodes on placement | Click on a node in the editor to select it, then place a node using either method (1) or (2) above | If a node is currently selected in the editor when a new node is added, whether it is added by clicking and dragging, double-clicking, or pressing **Enter**, the newly placed node will be connected to the first node automatically |
| Unlink two nodes | Click the first node to select it, hold **Shift**, click and hold the first node, drag to the second node, and release | While dragging the cursor, it will temporarily change to a red symbol until there is a valid target (e.g., the second node), where it will change to an up arrow |
| Unlink two nodes | Right-click the first node, and select **Remove Connection**. Select the second node | While moving the cursor, it will change to an up arrow. A valid node target will change color when hovering over it |
| Move row of nodes up | Hold **Alt**, click and hold the first node, drag upwards to a node in another row, and release | This action does not require that the node be selected prior to performing the action. The second node that is highlighted when the button / mouse are released will now be under the first node |
| Change order of nodes in a row | Hold **Ctrl**, click and hold the first node, drag to the right to the second node, and release | This action does not require that the node be selected prior to performing the action. This can change the order of any two nodes that are a part of the same row; it is not constrained to adjacent nodes. Note that if the new placement of the nodes is not valid (such as giving a `Source` node an input), it will knock the node of the current row and remove any connections |

> [!Note]
> In the context of `OpenEphys.Onix1`, almost all workflows should have the top row containing a [`CreateContext`](xref:OpenEphys.Onix1.CreateContext) node connected to an arbitrary number of `Configure*` nodes, finished with a [`StartAcquisition`](xref:OpenEphys.Onix1.StartAcquisition) node. Subsequent rows can contain the corresponding `*Data` nodes configured above, and any processing / visualizing nodes needed.

<br>

## Accessing GUIs

Some nodes, specifically many of the `Configure*` nodes, can have a GUI attached to the node that allows for easy manipulation of **Configuration** properties in a graphical environment. These GUIs can be accessed by double-clicking on a node; if there is a GUI assigned to it, then it will be opened up in a new window. Please note that not all nodes have GUIs, but if you think that a node would benefit from having this functionality added please reach out to us.

> [!Note]
> GUIs are not part of the base `OpenEphys.Onix1` library. To take advantage of this added functionality, you must install the accompanying `OpenEphys.Onix1.Design` library using the Bonsai package manager.

A number of Bonsai nodes also come shipped with GUIs, but similar to `OpenEphys.Onix1`, the corresponding `*.Design` library must be installed before it can be leveraged.
