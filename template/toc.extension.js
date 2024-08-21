// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

/**
 * This method will be called at the start of exports.transform in toc.html.js and toc.json.js
 */
exports.preTransform = function (model) {
  if (model.items[0].name === 'OpenEphys.Onix1'){
    if (model.items[0].items){
      itemsItemsLength = model.items[0].items.length;
      let items = [{
        'name': 'Core Operators',
        'href' : 'core.html',
        'topicHref': 'core.html',
        'topicUid': 'core',
        'items': []}, {
        'name': 'Configuration Operators',
        'href' : 'configure.html',
        'topicHref': 'configure.html',
        'topicUid': 'configure',
        'items': []}, {
        'name': 'Data I/O Operators',
        'href' : 'dataio.html',
        'topicHref': 'dataio.html',
        'topicUid': 'dataio',
        'items': []}, {
        'name': 'Other',
        'items': [
          {
            'name': 'Device Configuration Operators',
            'href' : 'device-configure.html',
            'topicHref': 'device-configure.html',
            'topicUid': 'device-configure',
            'items': [],
          }
        ]
      }];
      for (let i = 0; i < itemsItemsLength; i++) {
        globalYml = '~/api/' + model.items[0].items[i].topicUid + '.yml';
        if (model.items[0].items[i].name.includes('Frame') || 
            model.items[0].items[i].name.includes('DeviceFactory') ||
            model.items[0].items[i].name.includes('ContextTask') ||
            model.items[0].items[i].name.includes('DeviceNameConverter') ||
            model.items[0].items[i].name.includes('ConfigureDS90UB9x') ||
            model.items[0].items[i].name.includes('ConfigureFmcLinkController') ||
            model.items[0].items[i].name.includes('DeviceContext') ||
            model.items[0].items[i].name.includes('NeuropixelsV2QuadShankElectrode') ||
            model.items[0].items[i].name.includes('NeuropixelsV2QuadShankProbeConfiguration') ||
            model.items[0].items[i].name.includes('NeuropixelsV1eAdc')){
          model.items[0].items[i].hide = true;
        }
        else if (model.__global._shared[globalYml] && model.__global._shared[globalYml].type === 'enum') {
          model.items[0].items[i].hide = true;
        }
        else {
          if (model.__global._shared[globalYml] && model.__global._shared[globalYml].type === 'class'){
            const inheritanceLength = model.__global._shared[globalYml].inheritance.length;
            device = false;
            hub = false;
            for (let j = 0; j < inheritanceLength; j++){
              if (model.__global._shared[globalYml].inheritance[j].uid === 'OpenEphys.Onix1.SingleDeviceFactory'){
                device = true;
              }
              else if (model.__global._shared[globalYml].inheritance[j].uid === 'OpenEphys.Onix1.MultiDeviceFactory'){
                hub = true;
              }
            }
            if (model.items[0].items[i].name.includes('CreateContext') || model.items[0].items[i].name.includes('StartAcquisition')){
              items[0].items.push(model.items[0].items[i]);
            }
            else if (device){
              items[3].items[0].items.push(model.items[0].items[i]);
            }
            else if (hub){
              items[1].items.push(model.items[0].items[i]);
            }
            else {
              items[2].items.push(model.items[0].items[i]);
            }
          }
        }
      }
      model.items[0].items = items;
    }
  }
  // if (model.items[1].name === 'OpenEphys.Onix1.Design'){
  //   model.items.splice(1, 1);
  // }
  return model;
}

/**
 * This method will be called at the end of exports.transform in toc.html.js and toc.json.js
 */
exports.postTransform = function (model) {
  return model;
}
