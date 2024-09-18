// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

/**
 * This method will be called at the start of exports.transform in conceptual.html.primary.js
 */
exports.preTransform = function (model) {
  model.oe = 
    {
      "path": model._key.split(".").slice(null,-1).join().split("/").slice(1).join("/"),
      "hardwareDirectory": model._key.split("/")[2]
    };
  return model;
}

/**
 * This method will be called at the end of exports.transform in conceptual.html.primary.js
 */
exports.postTransform = function (model) {
  return model;
}
