// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.



/**
 * This method will be called at the start of exports.transform in ManagedReference.html.primary.js
 */
exports.preTransform = function (model) {
  // Change css for html <p> elements that are used to populate tables. Specifically, remove the bottom margin. 
  // This is so that tables can look better
  if (model.children){
    const childrenLength = model.children.length;
    for (let i = 0; i < childrenLength; i++){
      if (model.children[i].summary && model.children[i].remarks){
        model.children[i].tableSummary = model.children[i].summary;
        model.children[i].tableRemarks = model.children[i].remarks.replace('<p ', '<p style="margin-bottom:0;"');
      }
      else if (model.children[i].summary){
        model.children[i].tableSummary = model.children[i].summary.replace('<p', '<p style="margin-bottom:0;"');
      }
      if (model.children[i].syntax && model.children[i].syntax.return && model.children[i].syntax.return.description){
        model.children[i].syntax.return.tableDescription = model.children[i].syntax.return.description.replace('<p', '<p style="margin-bottom:0;"');
      }
      if (model.children[i].syntax && model.children[i].syntax.parameters && model.children[i].syntax.parameters[0] && model.children[i].syntax.parameters[0].description){
        model.children[i].syntax.parameters[0].tableDescription = model.children[i].syntax.parameters[0].description.replace('<p', '<p style="margin-bottom:0;"');
      }
    }
  }
  // Define source or sink in documentation by checking for an explicit Category tag. If the class does not provide one,
  // check the inheritance tree of the class. If the class inherits Bonsai.Sink and Bonsai.Combinator, ignore the Bonsai.Sink
  // inheritance overrides the Bonsai.Combinator inheritance for determining whether a node is a source or a combinator. This 
  // is because maybe sink nodes inherit Bonsai.Combinator in addition to Bonsai.Sink.  
  if (model.inheritance){
    let operatorType = {"source": false, "sink": false, "combinator": false, "device": false, "hub": false};
    if (model.syntax){
      if (model.syntax.content[0].value.includes("[WorkflowElementCategory(ElementCategory.Source)]")){
        operatorType.source = true;
      }
      else if (model.syntax.content[0].value.includes("[WorkflowElementCategory(ElementCategory.Sink)]")){
        operatorType.sink = true;
      }
      else if (model.syntax.content[0].value.includes("[WorkflowElementCategory(ElementCategory.Combinator)]")){
        operatorType.combinator = true;
      }
    } 
    if (!(operatorType.source || operatorType.sink || operatorType.combinator)){
      const inheritanceLength = model.inheritance.length;
      for (let i = 0; i < inheritanceLength; i++){
        if (model.inheritance[i].uid.includes('Bonsai.Source')){
          operatorType.source = true;
        }
        else if (model.inheritance[i].uid.includes('Bonsai.Sink')){
          operatorType.sink = true;
        }
        else if (model.inheritance[i].uid.includes('Bonsai.Combinator')){
          operatorType.combinator = true;
        }
        else if (model.inheritance[i].uid.includes('HubDeviceFactory')){
          operatorType.hub = true;
        }
        else if (model.inheritance[i].uid.includes('DeviceFactory')){
          operatorType.device = true;
        }
      }
    }
    if (operatorType.source){
      model.sourceNode = true;
      model.showWorkflow = true;
    }
    else if (operatorType.sink){
      model.sinkNode = true;
      model.showWorkflow = true;
    }
    else if (operatorType.combinator){
      model.combinatorNode = true;
    }
    if (operatorType.hub){
      model.isHub = true;
      model.showWorkflow = true;
    }
    else if (operatorType.device){
      model.isDevice = true;
      model.showWorkflow = true;
    }
  }
  return model;
}

/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {
  // Strip IObservable and add helpful flags to the view model
  const childrenLength = model.children.length;
  for (let i = 0; i < childrenLength; i++){
    if (model.children[i].inMethod){
      const childrenChildrenLength = model.children[i].children.length;
      for (let j = 0; j < childrenChildrenLength; j++){
        if (model.children[i].children[j].syntax){
          if (model.children[i].children[j].syntax.content[0].value.includes('Generate') || model.children[i].children[j].syntax.content[0].value.includes('Process')){
            model.children[i].nodeMethod = //model.oe.public[i]
              true;
            const re = new RegExp("(<a class=\"xref\" href=\"https:\/\/learn\.microsoft\.com\/dotnet\/api\/system\.iobservable-1\">IObservable<\/a>&lt;)|(&gt;)", "g");
            if (model.children[i].children[j].syntax.parameters){
              model.children[i].children[j].syntax.parameters[0].type.specName[0].value = //model.oe.input[i]
                model.children[i].children[j].syntax.parameters[0].type.specName[0].value.replaceAll(re, "");
              model.children[i].children[j].syntax.parameters[0].type.specName[0].value = //model.oe.input[i]
                model.children[i].children[j].syntax.parameters[0].type.specName[0].value.replace("TSource", "Anything");
            }
            if (model.children[i].children[j].syntax.return){
              model.children[i].children[j].syntax.return.type.specName[0].value = //model.oe.output[i]
                model.children[i].children[j].syntax.return.type.specName[0].value.replaceAll(re, "");
            }
          }
        }
      }
    }
  }
  return model;
}
