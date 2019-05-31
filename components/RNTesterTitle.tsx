/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";
import {
    RCTContentView,
    RCTScrollView,
    RCTTextView,
    RCTTextField,
    RCTLabel,
    // StylePropContents,
    RCTDockLayout,
    RCTAbsoluteLayout,
    RCTStackLayout,
    RCTFlexboxLayout,
} from "react-nativescript/dist/index";
import { Color } from "tns-core-modules/color/color";
import { FontWeight } from "tns-core-modules/ui/enums/enums";

export default class RNTesterTitle extends React.Component<{ title: string }> {
  render() {
    return (
      <RCTFlexboxLayout style={styles.container}>
        <RCTLabel style={styles.text}>{this.props.title}</RCTLabel>
      </RCTFlexboxLayout>
    );
  }
}

const styles = {
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: new Color('#d6d7da'),
    margin: 10,
    marginBottom: 0,
    height: 45,
    padding: 10,
    backgroundColor: new Color('white'),
  },
  text: {
    fontSize: 19,
    fontWeight: FontWeight.medium,
  },
};