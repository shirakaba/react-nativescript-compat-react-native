/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";
import {
    RCTContentView,
    RCTTextView,
    RCTTextField,
    RCTLabel,
    // StylePropContents,
    RCTDockLayout,
    RCTAbsoluteLayout,
    RCTStackLayout,
    RCTFlexboxLayout,
} from "react-nativescript/dist/index";
import { FontWeight } from "tns-core-modules/ui/enums/enums";
import { Color } from "tns-core-modules/color/color";

type Readonly<T> = {
    readonly [P in keyof T]: T[P]
};

type Props = Readonly<{
  children?: React.ReactNode,
  title?: string,
  description?: string,
}>;

type State = {
  description?: string,
};

export default class RNTesterBlock extends React.Component<Props, State> {
  state = {description: null};

  render() {
    const description = this.props.description ? (
      <RCTLabel style={styles.descriptionText}>{this.props.description}</RCTLabel>
    ) : null;

    return (
      // TODO: Could probably collapse the ContentView down to the StackLayout
      <RCTContentView style={styles.container}>
        <RCTStackLayout>
          <RCTContentView style={styles.titleContainer}>
            <RCTLabel style={styles.titleText}>{this.props.title}</RCTLabel>
            {description}
          </RCTContentView>
          <RCTContentView style={styles.children}>{this.props.children}</RCTContentView>
        </RCTStackLayout>
      </RCTContentView>
    );
  }
}

const styles = {
  container: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: new Color('#d6d7da'),
    backgroundColor: new Color('#ffffff'),
    margin: 10,
    marginVertical: 5,
    overflow: 'hidden',
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    borderBottomColor: new Color('#d6d7da'),
    backgroundColor: new Color('#f6f7f8'),
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: FontWeight.medium,
  },
  descriptionText: {
    fontSize: 14,
  },
  children: {
    margin: 10,
  },
};