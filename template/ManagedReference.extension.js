// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

function removeBottomMargin(str){
  return str.split('').reverse().join('')
            .replace( '<p'.split('').reverse().join(''),
                      '<p style="margin-bottom:0;"'.split('').reverse().join('')
                    )
            .split('').reverse().join('');
}

// Strip IObservable and replace 'TSource' with 'Anything' 
function replaceIObservableAndTSource(str){
  if (str.includes('IObservable')){
    const re = new RegExp('(<a class=\"xref\" href=\"https:\/\/learn\.microsoft\.com\/dotnet\/api\/system\.iobservable-1\">IObservable<\/a>&lt;)');
    str = str.replace(re, '').replace('&gt;','').replace('TSource', 'Anything');
    // can't combine re and '&gt;' into the same regex and do replaceAll because some classes have have two '&gt' in which case one of them is necessary
  }
  return str;
}

// compile list of data for input --> o --> output diagrams
function defineInputsAndOutputs(model){
  operators = [];
  if (model.children){
    const childrenLength = model.children.length;
    for (let i = 0; i < childrenLength; i++){
      if (model.children[i].uid.includes('Generate') || model.children[i].uid.includes('Process')){
        description = [model.children[i].summary, model.children[i].remarks].join('');
        input = {};
        if (model.children[i].syntax.parameters && model.children[i].syntax.parameters[0]){
          input = {
            'name': replaceIObservableAndTSource(model.children[i].syntax.parameters[0].type.specName[0].value),
            'nameWithoutExtraHtml': model.children[i].syntax.parameters[0].type.name[0].value.replaceAll(/(IObservable<)|(>)/g, ''),
            'description': removeBottomMargin([model.children[i].syntax.parameters[0].description, model.children[i].syntax.parameters[0].remarks].join(''))};
        }
        if (model.children[i].syntax.return){
          output = {};
          if (model.children[i].syntax.return.type.uid.includes('DataFrame')){
            output = {
              'name': replaceIObservableAndTSource(model.children[i].syntax.return.type.specName[0].value), 
              'nameWithoutExtraHtml': model.children[i].syntax.return.type.name[0].value.replaceAll(/(IObservable<)|(>)/g, ''),
              'description': ''};
          }
          else {
            output = {
              'name': replaceIObservableAndTSource(model.children[i].syntax.return.type.specName[0].value),
              'nameWithoutExtraHtml': model.children[i].syntax.return.type.name[0].value.replaceAll(/(IObservable<)|(>)/g, ''),
              'description': removeBottomMargin([model.children[i].syntax.return.description, model.children[i].syntax.return.remarks].join(''))};
          }
          dataFrame = [];
          outputYml = [ '~/api/', 
                        model.children[i].syntax.return.type.uid.replaceAll(/(\D*{)|(}$)/g, ''),  
                        '.yml'].join('');
          if (model['__global']['_shared'][outputYml] && model['__global']['_shared'][outputYml]['children']){
            const outputYmlChildrenLength = model['__global']['_shared'][outputYml]['children'].length;
            for (let j = 0; j < outputYmlChildrenLength; j++){
              if (model['__global']['_shared'][outputYml]['children'][j].type === 'property'){
                potentialEnumYml = '~/api/' + model['__global']['_shared'][outputYml]['children'][j].syntax.return.type.uid + '.yml';
                let enumFields = [];
                if (model['__global']['_shared'][potentialEnumYml] && (model['__global']['_shared'][potentialEnumYml]['type'] === 'enum')){
                  enumChildrenLength = model['__global']['_shared'][potentialEnumYml]['children'].length;
                  for (let k = 0; k < enumChildrenLength; k++){
                    if (model['__global']['_shared'][potentialEnumYml]['children'][k].type === 'field'){
                      enumFields.push({
                        'field&value': model['__global']['_shared'][potentialEnumYml]['children'][k].syntax.content[0].value,
                        'description': removeBottomMargin([model['__global']['_shared'][potentialEnumYml]['children'][k].summary, 
                                        model['__global']['_shared'][potentialEnumYml]['children'][k].remarks].join(''))
                      });
                    }
                  }
                }
                if (enumFields.length > 0){
                  dataFrame.push({
                    'name': model['__global']['_shared'][outputYml]['children'][j].name[0].value, 
                    'type': model['__global']['_shared'][outputYml]['children'][j].syntax.return.type.specName[0].value, 
                    'description': removeBottomMargin( [model['__global']['_shared'][outputYml]['children'][j].summary, 
                                                        model['__global']['_shared'][outputYml]['children'][j].remarks].join('')),
                    'enumFields': enumFields,
                    'hasEnum': true
                  });
                }
                else{
                  dataFrame.push({
                    'name': model['__global']['_shared'][outputYml]['children'][j].name[0].value, 
                    'type': model['__global']['_shared'][outputYml]['children'][j].syntax.return.type.specName[0].value, 
                    'description': removeBottomMargin( [model['__global']['_shared'][outputYml]['children'][j].summary, 
                                                        model['__global']['_shared'][outputYml]['children'][j].remarks].join('')),
                  });                  
                }
              }
            }
          }
          if (model['__global']['_shared'][outputYml] && model['__global']['_shared'][outputYml]['inheritedMembers']){
            const inheritedMembersLength = model['__global']['_shared'][outputYml]['inheritedMembers'].length;
            for (let j = 0; j < inheritedMembersLength; j++){
              if (model['__global']['_shared'][outputYml]['inheritedMembers'][j].type === 'property'){
                let inheritedMemberYml = '~/api/' + model['__global']['_shared'][outputYml]['inheritedMembers'][j].parent + '.yml';
                if (model['__global']['_shared'][inheritedMemberYml]['children']){
                  let inheritedMemberChildrenLength = model['__global']['_shared'][inheritedMemberYml]['children'].length;
                  for (let k =  0; k < inheritedMemberChildrenLength; k++){
                    if (model['__global']['_shared'][outputYml]['inheritedMembers'][j].uid === model['__global']['_shared'][inheritedMemberYml]['children'][k].uid){
                      dataFrame.push({
                        'name': model['__global']['_shared'][outputYml]['inheritedMembers'][j].name[0].value, 
                        'type': model['__global']['_shared'][inheritedMemberYml]['children'][k].syntax.return.type.specName[0].value, 
                        'description':  removeBottomMargin([model['__global']['_shared'][inheritedMemberYml]['children'][k].summary, 
                                                            model['__global']['_shared'][inheritedMemberYml]['children'][k].remarks].join(''))
                      });
                    }
                  }
                }
              }
            }
          }
        }
        if (Object.keys(input).length && Object.keys(dataFrame).length){
          operators.push({'hasInput': true, 'hasDataFrame': true, 'description': description, 'input': input, 'output': output, 'dataFrame': dataFrame});
        }
        else if (Object.keys(input).length){
          operators.push({'hasInput': true, 'description': description, 'input': input, 'output': output, 'dataFrame': dataFrame});
        }
        else if (Object.keys(dataFrame).length){
          operators.push({'hasDataFrame': true, 'description': description, 'input': input, 'output': output, 'dataFrame': dataFrame});
        }
        else{
          operators.push({'description': description, 'input': input, 'output': output, 'dataFrame': dataFrame});
        }
      }
    }
  }
  return operators;
}

// Define source or sink in documentation by checking for an explicit Category tag. If the class does not provide one,
// check the inheritance tree of the class. If the class inherits Bonsai.Sink and Bonsai.Combinator, ignore the Bonsai.Sink
// inheritance overrides the Bonsai.Combinator inheritance for determining whether a node is a source or a combinator. This
// is because maybe sink nodes inherit Bonsai.Combinator in addition to Bonsai.Sink.
function defineOperatorType(model){
  let operatorType = {'source': false, 'sink': false, 'combinator': false};
  if (model.syntax && model.syntax.content[0].value){
    if (model.syntax.content[0].value.includes('[WorkflowElementCategory(ElementCategory.Source)]')){
      operatorType.source = true;
    }
    else if (model.syntax.content[0].value.includes('[WorkflowElementCategory(ElementCategory.Sink)]')){
      operatorType.sink = true;
    }
    else if (model.syntax.content[0].value.includes('[WorkflowElementCategory(ElementCategory.Combinator)]')){
      operatorType.combinator = true;
    }
  }
  if (!(operatorType.source || operatorType.sink || operatorType.combinator)){
    if (model.inheritance){
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
  }
  return operatorType;
}

function defineSubOperators(model){
  let subOperators = []
  if (model.children){
    const childrenLength = model.children.length;
    for (let i = 0; i < childrenLength; i++){
      if (model.children[i].type === 'property'){
        potentialSubOperatorYml = '~/api/' + model.children[i].syntax.return.type.uid + '.yml';
        if (model['__global']['_shared'][potentialSubOperatorYml]){
          subOperatorChildrenLength = model['__global']['_shared'][potentialSubOperatorYml]['children'].length;
          let subProperties = [];
          for (let j = 0; j < subOperatorChildrenLength; j++){
            if (model['__global']['_shared'][potentialSubOperatorYml]['children'][j].type === 'property'){
              let enumFields = [];
              potentialEnumYml = '~/api/' + model['__global']['_shared'][potentialSubOperatorYml]['children'][j].syntax.return.type.uid + '.yml';
              if (model['__global']['_shared'][potentialEnumYml] && (model['__global']['_shared'][potentialEnumYml]['type'] === 'enum')){
                enumChildrenLength = model['__global']['_shared'][potentialEnumYml]['children'].length;
                for (let k = 0; k < enumChildrenLength; k++){
                  if (model['__global']['_shared'][potentialEnumYml]['children'][k].type === 'field'){
                    enumFields.push({
                      'field&value': model['__global']['_shared'][potentialEnumYml]['children'][k].syntax.content[0].value,
                      'description': removeBottomMargin( [model['__global']['_shared'][potentialEnumYml]['children'][k].summary, 
                                                          model['__global']['_shared'][potentialEnumYml]['children'][k].remarks].join(''))
                    });
                  }
                }
              }
              if (enumFields.length > 0){
                subProperties.push({'name': model['__global']['_shared'][potentialSubOperatorYml]['children'][j].name[0].value,
                                    'description': removeBottomMargin( [model['__global']['_shared'][potentialSubOperatorYml]['children'][j].summary, 
                                                                        model['__global']['_shared'][potentialSubOperatorYml]['children'][j].remarks].join('')),
                                    'enum': enumFields,
                                    'hasEnum': true});
              }
              else{
                subProperties.push({'name': model['__global']['_shared'][potentialSubOperatorYml]['children'][j].name[0].value,
                                    'description': removeBottomMargin( [model['__global']['_shared'][potentialSubOperatorYml]['children'][j].summary, 
                                                                        model['__global']['_shared'][potentialSubOperatorYml]['children'][j].remarks].join(''))
                });
              }
            }
          }
          if (subProperties.length > 0){
            subOperators.push({
              'object': model.children[i].name[0].value,
              'subProperties': subProperties,
              'hasSubProperties': true});
          }
          else if (model.__global._shared['~/api/' + model.children[i].name[0].value + '.yml']){
            subOperators.push({
              'object': model.children[i].name[0].value});
          }
        }
      }
    }
  }
  return subOperators
}

// compile list of properties
function defineProperties(model){
  properties = [];
  if (model.children){
    const childrenLength = model.children.length;
    for (let i = 0; i < childrenLength; i++){
      if (model.children[i].type === 'property'){
        potentialEnumYml = '~/api/' + model['children'][i].syntax.return.type.uid + '.yml';
        let enumFields = [];
        if (model['__global']['_shared'][potentialEnumYml] && (model['__global']['_shared'][potentialEnumYml]['type'] === 'enum')){
          enumChildrenLength = model['__global']['_shared'][potentialEnumYml]['children'].length;
          for (let j = 0; j < enumChildrenLength; j++){
            if (model['__global']['_shared'][potentialEnumYml]['children'][j].type === 'field'){
              enumFields.push({
                'field&value': model['__global']['_shared'][potentialEnumYml]['children'][j].syntax.content[0].value,
                'description': removeBottomMargin( [model['__global']['_shared'][potentialEnumYml]['children'][j].summary, 
                                                    model['__global']['_shared'][potentialEnumYml]['children'][j].remarks].join(''))
              });
            }
          }
        }
        if (enumFields.length > 0){
          properties.push({
            'name': model.children[i].name[0].value, 
            'type': model.children[i].syntax.return.type.specName[0].value, 
            'description': removeBottomMargin([model.children[i].summary, model.children[i].remarks].join('')),
            'enum': enumFields,
            'hasEnum': true
          });
        }
        else { 
          properties.push({
            'name': model.children[i].name[0].value, 
            'type': model.children[i].syntax.return.type.specName[0].value, 
            'description': removeBottomMargin([model.children[i].summary, model.children[i].remarks].join(''))
          });
        }
      }
    }
  }
  if (model.inheritedMembers){
    const inheritedMembersLength = model.inheritedMembers.length;
    for (let i = 0; i < inheritedMembersLength; i++){
      if (model.inheritedMembers[i].type && (model.inheritedMembers[i].type === 'property')){
        let inheritedMemberYml = '~/api/' + model.inheritedMembers[i].parent + '.yml';
        if (model['__global']['_shared'][inheritedMemberYml]['children']){
          let inheritedMemberChildrenLength = model['__global']['_shared'][inheritedMemberYml]['children'].length;
          for (let j =  0; j < inheritedMemberChildrenLength; j++){
            if (model.inheritedMembers[i].uid === model['__global']['_shared'][inheritedMemberYml]['children'][j].uid){
              properties.push(
                {'name': model.inheritedMembers[i].name[0].value, 
                'type': model['__global']['_shared'][inheritedMemberYml]['children'][j].syntax.return.type.specName[0].value, 
                'description':  removeBottomMargin([model['__global']['_shared'][inheritedMemberYml]['children'][j].summary, 
                                                    model['__global']['_shared'][inheritedMemberYml]['children'][j].remarks].join(''))
              });
            }
          }
        }
      }
    }
  }
  return properties;
}

function sortProperties(properties){
  let propertyNames = [];
  let propertyNamesThatFitPattern = [];
  const propertiesLength = properties.length;
  for (let i = 0; i < propertiesLength; i++){
    propertyNames.push([properties[i].name, 
                        /\D+\d+$/.test(properties[i].name), 
                        String(properties[i].name.match(/\D+/)), 
                        Number(properties[i].name.match(/\d+$/))]);
  }
  for (let i = 0; i < propertiesLength; i++){
    if (propertyNames[i][1]){
      if (!propertyNamesThatFitPattern.includes(propertyNames[i][2])){
        propertyNamesThatFitPattern.push(propertyNames[i][2]);
      }
    }
  }
  const propertyNamesThatFitPatternLength = propertyNamesThatFitPattern.length;
  for (let j = 0; j < propertyNamesThatFitPatternLength; j++){
    for (let i = 1; i < propertiesLength; i++){
      for (let k = i; k > 0; k--){
        if ((propertyNames[k][2] === propertyNamesThatFitPattern[j]) && (propertyNames[k - 1][2] === propertyNamesThatFitPattern[j])){
          if (propertyNames[k][3] < propertyNames[k - 1][3]){
            swapElements(properties, k, k - 1);
            swapElements(propertyNames, k, k - 1); // why does this need to be here for this sortProperties function to work?
          }
        }
      }
    }
  }
  return properties;
}

const swapElements = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

/**
 * This method will be called at the start of exports.transform in ManagedReference.html.primary.js
 */
exports.preTransform = function (model) {
  
  model.oe = {};
  
  model.oe.description = [model.summary, model.remarks].join('');
  
  operators = defineInputsAndOutputs(model);
  if (operators.length > 0){
    model.oe.operators = operators;
  }

  operatorType = defineOperatorType(model);
  if (operatorType.source){
    model.oe.operatorType = 'source';
  }
  else if (operatorType.sink){
    model.oe.operatorType = 'sink';
  }
  else if (operatorType.combinator){
    model.oe.operatorType = 'combinator';
  }

  properties = defineProperties(model);
  if (properties.length > 0){
    model.oe.hasProperties = true;
    model.oe.properties = sortProperties(properties);
  }
  
  subOperators = defineSubOperators(model);
  if (subOperators.length > 0){
    model.oe.hasSubOperators = true;
    model.oe.subOperators = subOperators;
  }

  return model;
}

/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {
  return model;
}
