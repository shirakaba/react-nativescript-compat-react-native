/**
 * Code below here ported to React NativeScript from React Native's RNTester app, whose licence is stored in this folder as React_Native_LICENCE.txt,
 * ... which carries the following copyright:
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict
 */

export type RNTesterBackAction = {
  type: 'RNTesterBackAction',
};

export type RNTesterListAction = {
  type: 'RNTesterListAction',
};

export type RNTesterExampleAction = {
  type: 'RNTesterExampleAction',
  openExample: string,
};

export type RNTesterAction =
  | RNTesterBackAction
  | RNTesterListAction
  | RNTesterExampleAction;

export function Back(): RNTesterBackAction {
  return {
    type: 'RNTesterBackAction',
  };
}

export function ExampleList(): RNTesterListAction {
  return {
    type: 'RNTesterListAction',
  };
}

export function ExampleAction(openExample: string): RNTesterExampleAction {
  return {
    type: 'RNTesterExampleAction',
    openExample,
  };
}