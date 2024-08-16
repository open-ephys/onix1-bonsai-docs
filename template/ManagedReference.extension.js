// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

// replace last instance of '<p' with '<p style="margin-bottom:0;"'
function removeBottomMargin(str) {
  return str
    .split('').reverse().join('')
    .replace('<p'.split('').reverse().join(''), '<p style="margin-bottom:0;"'.split('').reverse().join(''))
    .split('').reverse().join('');
}

function extractEnumData(model) {
  return model.children
    .filter(child => child.type === 'field')
    .map(child => ({
      'field&value': child.syntax.content[0].value,
      'enumDescription': removeBottomMargin([child.summary, child.remarks].join(''))
    }));
}

function sortPropertiesData(properties) {

  const propertyNames = properties.map(property => {
    return [property.name,
    /\D+\d+$/.test(property.name),
    String(property.name.match(/\D+/)),
    Number(property.name.match(/\d+$/))
    ]
  });

  let propertyNamesThatFitPattern = []
  propertyNames
    .filter(propertyName => propertyName[1])
    .forEach(propertyName => { if (!propertyNamesThatFitPattern.includes(propertyName[2])) { propertyNamesThatFitPattern.push(propertyName[2]); } });
  
  const propertiesLength = properties.length;
  const propertyNamesThatFitPatternLength = propertyNamesThatFitPattern.length;
  for (let i = 0; i < propertyNamesThatFitPatternLength; i++) {
    for (let j = 1; j < propertiesLength; j++) {
      for (let k = j; k > 0; k--) {
        if ((propertyNames[k][2] === propertyNamesThatFitPattern[i]) && (propertyNames[k - 1][2] === propertyNamesThatFitPattern[i])) {
          if (propertyNames[k][3] < propertyNames[k - 1][3]) {
            [properties[k], properties[k - 1]] = [properties[k - 1], properties[k]];
            [propertyNames[k], propertyNames[k - 1]] = [propertyNames[k - 1], propertyNames[k]];
          }
        }
      }
    }
  }
  return properties;
}

function processChildProperty(child, sharedModel) {
  const enumFields = sharedModel[`~/api/${child.syntax.return.type.uid}.yml`]?.type === 'enum' ?
    extractEnumData(sharedModel[`~/api/${child.syntax.return.type.uid}.yml`]) :
    [];
  return {
    'name': child.name[0].value,
    'type': child.syntax.return.type.specName[0].value,
    'propertyDescription': {
      'text': enumFields.length > 0
        ? [child.summary, child.remarks].join('')
        : removeBottomMargin([child.summary, child.remarks].join('')),
      'hasEnum': enumFields.length > 0,
      'enum': enumFields,
    }
  }
}

function extractPropertiesData(model, sharedModel) {
  return model?.children
    .filter(child => child.type === 'property' && child.syntax)
    .map(child => processChildProperty(child, sharedModel));
}

function extractPropertiesFromInheritedMembersData(model, sharedModel) {

  return model.inheritedMembers
    .filter(inheritedMember => inheritedMember.type === 'property')
    .map(inheritedMember => {
      return processChildProperty(
        sharedModel[`~/api/${inheritedMember.parent}.yml`].children.find(inheritedMemberChild => inheritedMemberChild.uid === inheritedMember.uid),
        sharedModel
      );
    });
}

function extractConstituentOperatorsData(model) {
  return model?.children
    .filter(child => child.type === 'property' && model.__global._shared?.[`~/api/${child.syntax.return.type.uid}.yml`].type === 'class')
    .map(child => {
      const deviceModel = model.__global._shared?.[`~/api/${child.syntax.return.type.uid}.yml`];
      const subProperties = sortPropertiesData(extractPropertiesData(deviceModel, model.__global._shared));
      return {
        'object': child.name[0].value,
        'type': child.syntax.return.type.specName[0].value,
        'constituentOperator': true,
        'hasSubProperties': subProperties === undefined || subProperties.length === 0 ? false : true,
        'subProperties': subProperties,
      };
    });
}

function extractOperatorData(model) {

  const checkForCategory = (category) => model.syntax?.content[0].value.includes(`[WorkflowElementCategory(ElementCategory.${category})]`);
  const checkInheritance = (inheritance) => model.inheritance?.some(inherited => inherited.uid.includes(inheritance));
  source = checkForCategory('Source') || checkInheritance('Bonsai.Source');
  sink = checkForCategory('Sink') || checkInheritance('Bonsai.Sink');
  combinator = checkForCategory('Combinator') || checkInheritance('Bonsai.Combinator');
  transform = checkForCategory('Transform') || checkInheritance('Bonsai.Transform');
  hub = checkInheritance('OpenEphys.Onix1.MultiDeviceFactory');
  configureDevice = checkInheritance('OpenEphys.Onix1.SingleDeviceFactory');
  type = model.uid.includes('DeviceFactory') ? false : sink ? 'sink' : combinator ? 'combinator' : source ? 'source' : transform ? 'transform' : false;

  if (hub) {
    model = model.__global._shared['~/api/OpenEphys.Onix1.MultiDeviceFactory.yml'];
  }

  overloads = model.children
    .filter(child => child.name[0].value.includes('Process') || child.name[0].value.includes('Generate'))
    .map(child => ({
      'overloadsDescription': [child.summary, child.remarks].join(''),
      'input': removeBottomMargin([child.syntax?.parameters[0].description, child.syntax?.parameters[0].remarks].join('')),
      'output': removeBottomMargin([child.syntax.return.description, child.syntax.return.remarks].join('')),
    }));

  return {
    'type': type,
    'hub': hub,
    'configureDevice': configureDevice,
    'workflow': type.length > 0,
    'overloads': overloads,
  }
}

/**
 * This method will be called at the start of exports.transform in ManagedReference.html.primary.js
 */
exports.preTransform = function (model) {
  if (model.type === 'class') {
    operator = extractOperatorData(model);
    if (operator.hub) {
      properties = extractConstituentOperatorsData(model);
      properties.push({
        'object': 'Misc',
        'constituentOperator': false,
        'hasSubProperties': true,
        'subProperties': sortPropertiesData([
          ...extractPropertiesData(model, model.__global._shared),
          ...extractPropertiesFromInheritedMembersData(model, model.__global._shared),
        ]).filter(modelProperty => !properties.map(property => property.object).includes(modelProperty.name))
      });
    }
    else {
      properties = sortPropertiesData([
        ...extractPropertiesData(model, model.__global._shared),
        ...extractPropertiesFromInheritedMembersData(model, model.__global._shared),
      ]);
    }
    model.oe = {
      'name': model.name[0].value,
      'uid': model.uid,
      'description': [model.summary, model.remarks].join(''),
      'operator': operator,
      'properties': properties
    };
  }
  else if (model.type === 'enum') {
    model.oe = {
      'name': model.name[0].value,
      'uid': model.uid,
      'description': [model.summary, model.remarks].join(''),
      'enum': extractEnumData(model),
    };
  }

  return model;
}

/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {
  return model;
}
