---
uid: onix1-breakout_digital-input
title: Onix1 Breakout Digital Input
hub: Onix1 Breakout
hubDirectory: onix1-breakout
device: digital input
deviceDirectory: digital-input
features: |
    <li>
        8 bit digital input port accessible via 8x2 male 0.1" pitch header on the breakout
        <ul><li>3.3V logic level, 5V tolerant</li></ul>
    </li>
    <li>
        12 bit digital input port accessible via buttons and switches on the breakout
        <ul><li>Gateware debounce</li></ul>
    </li> 
    <li>5 MHz sample frequency</li>
sourceOperator: BreakoutDigitalInput
dataFrame: BreakoutDigitalInputDataFrame
event: a pin, button, or switch is toggled
configureOperator: ConfigureBreakoutBoard
---

<!--
- put a link for sink operator. 
- use code tags where classes are hyperlinked?
-->

This graph generates digital input data, writes it to a file, selects `DigitalInputs` and `Buttons`  members from the digital input data frame, and checks if certain inputs are true. 

- The <xref:OpenEphys.Onix1.BreakoutDigitalInput> operator generates a sequence of <xref:OpenEphys.Onix1.BreakoutDigitalInputDataFrame>s.
    - The <xref:OpenEphys.Onix1.BreakoutDigitalInput>'s `DeviceName` property is set to "BreakoutBoard/BreakoutDigitalOutput". This links the <xref:OpenEphys.Onix1.BreakoutDigitalInput> operator to the corresponding configuration operator. 
- The [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) operator writes files containing `Clock`, `DigitalInputs`, and `Buttons` members from the <xref:OpenEphys.Onix1.BreakoutDigitalInputDataFrame> with the following name format: `digital-input_<timestamp>.csv`. Because [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) is a _sink_ operator, its output sequence is equivalent to its input sequence. In other words, its output is equivalent to <xref:OpenEphys.Onix1.BreakoutDigitalInput>'s output. Therefore, it's possible to use [`MemberSelector`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.MemberSelectorBuilder.html) operators on the [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) to select members from <xref:OpenEphys.Onix1.BreakoutDigitalInputDataFrame>.
- The members selected in the workflow, <xref:OpenEphys.Onix1.BreakoutDigitalPortState> and <xref:OpenEphys.Onix1.BreakoutButtonState>, are enumerators. Enumerators assign names to values. <xref:OpenEphys.Onix1.BreakoutDigitalPortState>'s and <xref:OpenEphys.Onix1.BreakoutButtonState>'s enumerated values correspond to bit positions of a bit field. Therefore, when <xref:OpenEphys.Onix1.BreakoutDigitalPortState> or <xref:OpenEphys.Onix1.BreakoutButtonState> are connected to a `HasFlags` operator, the names that appear in the `HasFlags`'s `Value` property's dropdown menu correspond to bit positions in the respective digital input port. In this workflow, the top `HasFlags` operator checks if `Triangle` or `X` are `True`. 

<!-- content regarding setting operators commented out bc that's too much text I think -->

<!--This is accomplished by changing the following [`CsvWriter`](https://bonsai-rx.org/docs/api/Bonsai.IO.CsvWriter.html) properties from their default values:
    -   The `CsvWriter`'s `Delimiter` property is set to ";". A semi-colon is used instead of the standard comma because commas are already used to delimit individual bits in the `DigitalInputs` and `Buttons` data.
    -   The `CsvWriter`'s `FileName` property is set to "digital-input_.csv". Without specifying a directory, Bonsai will save this file in the same directory containing this workflow.
    -   The `CsvWriter`'s `Selector` property is set to "`Clock`, `DigitalInputs`, `Buttons`".
    -   The `CsvWriter`'s `Suffix` property is set to "Timestamp". This appends timestamp data such that a unique filename is produced using global wall-clock timestamps every time the workflow is run.-->

<!--This is accomplished by changing the following [`HasFlags`](https://bonsai-rx.org/docs/api/Bonsai.Expressions.HasFlagBuilder.html) properties from their default values:
    -   The top `HasFlags`'s `Value` property is set to "`Pin0`, `Pin1`, `Pin2`, `Pin3`". Setting `Value` to these enumerated names creates a sequence of boolean elements which are `True` if `Pin0` or `Pin1` or `Pin2` or `Pin3` is `True`
    -   The bottom `HasFlags`'s `Value` property is set to "`Triangle`, `X`". Setting `Value` to these enumerated names creates a sequence of boolean elements which are `True` if  `Triangle` or `X` is `True`.-->