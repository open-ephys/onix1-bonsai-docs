# Breakout Board Tutorial

:::workflow 
![BreakoutBoard](../workflows/examples/BreakoutBoard.bonsai)
:::

In this example, we explore the breakout board's functionality. 

- Analog data is passed through a 1 kHz low-pass Butterworth filter. 
- Digital input data is passed through `HasFlag` filters that can be used to determine if a certain digital input pin is logic-high or to check if a certain button has been depressed.
- A 10 Hz timer drives the digital output port with counter. The LEDs on the breakout board will show a binary count for 0 to 255 before the pattern repeats
- A 100 Hz timer is used to update analog output 0. If the value in the `ScalarBuffer` node is changed while the workflow is running, channel 0's voltage will be updated.