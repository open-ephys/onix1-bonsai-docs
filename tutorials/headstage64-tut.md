---
uid: hs64-tut
tut: true
hub: Headstage64
hubSnakeCase: headstage64
configureOperator: Headstage64
overview: 
    workflowFunctions: 
        -   Configures the Headstage64.
        -   Streams RHD2164, BNO055, and TS4231 data.
        -   Triggers electrical and optical stimulation.
---

<!-- configure: 
    nonDefaultProperties: 
dataIOOperators: 
    -   operator: PortStatus
        data: Port Status
        graphDescription: This processing graph generates data about the communication status between the headstage/miniscope and the ONIX data acquisition system, timestamps it, and writes it to a .csv file.
    -   operator: Rhd2164Data
        data: RHD2164
        graphDescription: This processing graph generates data from the headstage's Rhd2164Data, 
        bufferSize: 36
    -   operator: Bno055Data
        data: BNO055
        graphDescription: This processing graph generates data from the headstage's BNO055, writes it to a .csv file, and selects <code>Quaternion</code> data to send to an operator that automatically commutates the tether if there is a proper commutator connection.
    -   operator: Ts4231PositionData
        data: TS4231 Position
        graphDescription: This processing graph generates position data from the headstage's TS4231 data.
        additionalConfiguration: 
            -   <code>P</code> is set to (0, 0, 0)
            -   <code>Q</code> is set to (1, 0, 0)
    -   operator: Ts4231Data
        data: TS4231
        graphDescription: This processing graph data from the headstage's TS4231 data. -->