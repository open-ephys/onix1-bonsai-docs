---
uid: np1e-tut
tut: true
hub: NeuropixelsV1e Headstage
hubSnakeCase: neuropixelsv1e
configureOperator: NeuropixelsV1eHeadstage
overview: 
    workflowFunctions: 
        -   Configures the NeuropixelsV1e Headstage.
        -   Streams Neuropixels 1.0 and BNO055 data.
        -   Commutates the tether automatically if there is a proper commutator connection.
configure: 
    nonDefaultProperties: 
dataIOOperators: 
    -   operator: PortStatus
        data: Port Status
        graphDescription: This processing graph generates data about the communication status between the headstage and the ONIX data acquisition system, timestamps it, and writes it to a .csv file.
    -   operator: NeuropixelsV1eData
        data: Neuropixels 1.0
        graphDescription: This processing graph generates data from one of the headstage's Neuropixels 2.0 probes, and selects the <code>Clock</code> and <code>AmplifierData</code> data to write to .bin files.
        multiple: false
        bufferSize: 36
    -   operator: NeuropixelsV1eBno055Data
        data: BNO055
        graphDescription: This processing graph generates data from the headstage's BNO055, writes it to a .csv file, and selects <code>Quaternion</code> data to send to a node that commutates the tether automatically if there is a proper commutator connection. Because <code>CsvWriter</code> is a <code>Sink</code> operator, it emits the same item downstream as it receives from upstream. Therefore, Bno55DataFrame members can by selected by hovering over <code>Output</code> in the context menu that appears by right-clicking the <code>CsvWriter</code> node. 
---
