---
uid: TipsAndTricks
title: Tips and Tricks
---

## Bonsai Operator Actions

When running a workflow in Bonsai, operators are evaluated from left to right, and top to bottom, meaning that the order of the operators becomes very important. Additionally, operators that are linked together conceptually must be linked together explicitly in the editor. Below is a table with some methods for adding links, removing links, reordering operators horizontally and vertically, as well as some shortcuts to aid in placing operators more efficiently.

The order of operators is also important for which actions can be taken. In the table below, the "first" operator is always the one that is on the left side, or on the bottom for multiple rows of operators. If the first operator clicked is on the right side, or on the top, these actions do not work.

| Goal | Clicks / Keystrokes | Description |
| ---- | ------------------- | ----------- |
| Link two operators | Click and hold the first operator, drag the cursor to the second operator, and release | While dragging the cursor, it will temporarily change to a red symbol until there is a valid target (e.g., the second operator), where it will change to an up arrow |
| Link two operators | Right-click the first operator, and select **Create Connection**. Select the second operator | While moving the cursor, it will change to an up arrow. A valid operator target will change color when hovering over it |
| Link two operators on placement | Click on an operator in the editor to select it, then place an operator using either method (1) or (2) above | If an operator is currently selected in the editor when a new operator is added, whether it is added by clicking and dragging, double-clicking, or pressing **Enter**, the newly placed operator will be connected to the first operator automatically |
| Unlink two operators | Click the first operator to select it, hold **Shift**, click and hold the first operator, drag to the second operator, and release | While dragging the cursor, it will temporarily change to a red symbol until there is a valid target (e.g., the second operator), where it will change to an up arrow |
| Unlink two operators | Right-click the first operator, and select **Remove Connection**. Select the second operator | While moving the cursor, it will change to an up arrow. A valid operator target will change color when hovering over it |
| Move row of operators up | Hold **Alt**, click and hold the first operator, drag upwards to an operator in another row, and release | This action does not require that the operator be selected prior to performing the action. The second operator that is highlighted when the button / mouse are released will now be under the first operator |
| Change order of operators in a row | Hold **Ctrl**, click and hold the first operator, drag to the right to the second operator, and release | This action does not require that the operator be selected prior to performing the action. This can change the order of any two operators that are a part of the same row; it is not constrained to adjacent operators. Note that if the new placement of the operators is not valid (such as giving a `Source` operator an input), it will knock the operator of the current row and remove any connections |

> [!Note]
> In the context of `OpenEphys.Onix1`, almost all workflows should have the top row containing a [`CreateContext`](xref:OpenEphys.Onix1.CreateContext) operator connected to an arbitrary number of `Configure*` operators, finished with a [`StartAcquisition`](xref:OpenEphys.Onix1.StartAcquisition) operator. Subsequent rows can contain the corresponding `*Data` operators configured above, and any processing / visualizing operators needed.

<br>

## Accessing GUIs

Some operators, specifically many of the `Configure*` operators, can have a GUI attached to the operator that allows for easy manipulation of **Configuration** properties in a graphical environment. These GUIs can be accessed by double-clicking on ab operator; if there is a GUI assigned to it, then it will be opened up in a new window. Please note that not all operators have GUIs, but if you think that an operator would benefit from having this functionality added please reach out to us.

> [!Note]
> GUIs are not part of the base `OpenEphys.Onix1` library. To take advantage of this added functionality, you must install the accompanying `OpenEphys.Onix1.Design` library using the Bonsai package manager.

A number of Bonsai operators also come shipped with GUIs, but similar to `OpenEphys.Onix1`, the corresponding `*.Design` library must be installed before it can be leveraged.
