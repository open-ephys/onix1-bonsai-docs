// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

/**
 * This method will be called at the start of exports.transform in toc.html.js and toc.json.js
 */
exports.preTransform = function (model) {
  // if (model.items[0].items){
  //   itemsItemsLength = model.items[0].items.length;
  //   let items = [];
  //   for (let i = 0; i < itemsItemsLength; i++) {
  //     globalYml = '~/api/' + model.items[0].items[i].topicUid + '.yml';
  //     if (model.items[0].items[i].name.includes('DataFrame')){
  //       model.items[0].items[i].hide = true;
  //     }
  //     else if ( model.__global._shared[globalYml] && model.__global._shared[globalYml].type === 'enum') {
  //       model.items[0].items[i].hide = true;
  //     }
  //     else {
  //       items.push(model.items[0].items[i]);
  //     }
  //   }
  //   model.items[0].items = items;
  // }
  return model;
}

/**
 * This method will be called at the end of exports.transform in toc.html.js and toc.json.js
 */
exports.postTransform = function (model) {
  return model;
}
