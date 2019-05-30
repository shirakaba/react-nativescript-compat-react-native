/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

// $FlowFixMe : This is a platform-forked component, and flow seems to only run on iOS?
const RNTesterList = require('./RNTesterList').RNTesterList;

export type RNTesterNavigationState = {
  openExample?: string,
};

export default function RNTesterNavigationReducer(
  state: RNTesterNavigationState|undefined|null|false,
  action: any,
): RNTesterNavigationState {
  console.log(`[RNTesterNavigationReducer.RNTesterExampleAction] entered reducer.`);
  if (
    // Default value is to see example list
    !state ||
    // Handle the explicit list action
    action.type === 'RNTesterListAction' ||
    // Handle requests to go back to the list when an example is open
    (state.openExample && action.type === 'RNTesterBackAction')
  ) {
    console.log(`[RNTesterNavigationReducer.RNTesterExampleAction] Returning null.`);
    return {
      // A null openExample will cause the views to display the RNTester example list
      openExample: null,
    };
  }

  if (action.type === 'RNTesterExampleAction') {
    // Make sure we see the module before returning the new state
    console.log(`[RNTesterNavigationReducer.RNTesterExampleAction] examining RNTesterList.Modules[${action.openExample}]`);
    const ExampleModule = RNTesterList.Modules[action.openExample];

    if (ExampleModule) {
      return {
        openExample: action.openExample,
      };
    }
  }

  return state;
}