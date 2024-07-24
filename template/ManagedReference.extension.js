// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

/**
 * This method will be called at the start of exports.transform in ManagedReference.html.primary.js
 */
exports.preTransform = function (model) {
  // Define source or sink in documentation by whether it has a generate or process method.
  // Defining whether a class corresponds to a source node or sink node depending on if it inherits 
  // Bonsai.Source or Bonsai.Sink causes a problem because CreateContext is a source node that doesn't inherit the Bonsai.Source class.  
  if (model.hasOwnProperty('children')){
    childrenLength = model.children.length;
    for (let i = 0; i < childrenLength; i++){
      if (model.children[i].uid.includes('Process')){
        model.sinkNode = true;
      }
      else if (model.children[i].uid.includes('Generate')) {
        model.sourceNode = true;
      }
      else if (model.children[i].uid.includes('Combinator')) {
        model.combinatorNode = true;
      }
      // const re = new RegExp("(<p sourcefile=\".* sourcestartlinenumber=\"1\">)|(<\/p>\\n)", "g");
      // if (model.children[i].hasOwnProperty('summary')){
      //   if (model.children[i].summary != null){
      //     model.children[i].summary = model.children[i].summary.replaceAll(re,"");
      //     console.log(model.children[i].summary);
      //   }
      // }
      // if (model.children[i].hasOwnProperty('remarks')){
      //   if (model.children[i].remarks != null){
      //     model.children[i].remarks = model.children[i].remarks.replaceAll(re,"");
      //     console.log(model.children[i].remarks);
      //   }
      // }
    }
  }
  return model;
}

/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {
  // Filter methods to include in documentation by name, specifically check if they are generate or process methods. 
  // The public keyword isn't an effective filter because the CreateContext class has other public functions. 
  childrenLength = model.children.length;
  for (let i = 0; i < childrenLength; i++){
    if (model.children[i].inMethod){
      childrenChildrenLength = model.children[i].children.length;
      for (let j = 0; j < childrenChildrenLength; j++){
        if (model.children[i].children[j].hasOwnProperty('syntax')){
          if (model.children[i].children[j].syntax.content[0].value.includes('Generate') || model.children[i].children[j].syntax.content[0].value.includes('Process')){
            model.children[i].nodeMethod = //model.oe.public[i]
              true;
            const re = new RegExp("(<a class=\"xref\" href=\"https:\/\/learn\.microsoft\.com\/dotnet\/api\/system\.iobservable-1\">IObservable<\/a>&lt;)|(&gt;)", "g");
            if (model.children[i].children[j].syntax.hasOwnProperty('parameters')){
              model.children[i].children[j].syntax.parameters[0].type.specName[0].value = //model.oe.input[i]
                model.children[i].children[j].syntax.parameters[0].type.specName[0].value.replaceAll(re, "");
              model.children[i].children[j].syntax.parameters[0].type.specName[0].value = //model.oe.input[i]
                model.children[i].children[j].syntax.parameters[0].type.specName[0].value.replace("TSource", "Any");
            }
            if (model.children[i].children[j].syntax.hasOwnProperty('return')){
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
