/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { alert, AlertOptions } from "tns-core-modules/ui/dialogs";
import { ExampleAction, RNTesterAction } from "./RNTesterActions";
// $FlowFixMe : This is a platform-forked component, and flow seems to only run on iOS?
const RNTesterList = require('./RNTesterList').RNTesterList;

function PathActionMap(path: string): RNTesterAction|undefined {
  // Warning! Hacky parsing for example code. Use a library for this!
  const exampleParts = path.split('/example/');
  const exampleKey = exampleParts[1];
  if (exampleKey) {
    console.log(`[URIActionMap.PathActionMap] examining RNTesterList.Modules["${exampleKey}"] out of:`, RNTesterList.Modules);
    if (!RNTesterList.Modules[exampleKey]) {
      alert(`${exampleKey} example could not be found!`);
      return null;
    }
    return ExampleAction(exampleKey);
  }
  return null;
}

export default function URIActionMap(uri?: string): RNTesterAction|null {
  if (!uri) {
    return null;
  }
  // Warning! Hacky parsing for example code. Use a library for this!
  const parts = uri.split('rntester:/');
  if (!parts[1]) {
    return null;
  }
  const path = parts[1];
  return PathActionMap(path);
}