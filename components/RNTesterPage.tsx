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
import RNTesterTitle from "./RNTesterTitle";

type Readonly<T> = {
    readonly [P in keyof T]: T[P]
};

type Props = Readonly<{
  children?: React.ReactNode,
  title?: string,
  noScroll?: boolean,
  noSpacer?: boolean,
}>;


export default class RNTesterPage extends React.Component<Props> {
  render() {
    let ContentWrapper;
    let wrapperProps = {};
    if (this.props.noScroll) {
      ContentWrapper = RCTStackLayout;
    } else {
      // FIXME: not sure if ScrollView can have multiple children
      ContentWrapper = RCTScrollView;
    // TODO
    //   wrapperProps.automaticallyAdjustContentInsets = !this.props.title;
    //   wrapperProps.keyboardShouldPersistTaps = 'handled';
    //   wrapperProps.keyboardDismissMode = 'interactive';
    }
    const title = this.props.title ? (
      <RNTesterTitle title={this.props.title} />
    ) : null;
    const spacer = this.props.noSpacer ? null : <RCTContentView style={styles.spacer} />;
    return (
      <RCTStackLayout style={styles.container}>
        {title}
        <ContentWrapper style={styles.wrapper} {...wrapperProps}>
          {this.props.children}
          {spacer}
        </ContentWrapper>
      </RCTStackLayout>
    );
  }
}

const styles = {
  container: {
    backgroundColor: new Color('#e9eaed'),
    // flex: 1,
    width: { value: 100, unit: "%" as "%" },
    height: { value: 100, unit: "%" as "%" },
  },
  spacer: {
    height: 270,
  },
  wrapper: {
    flex: 1,
    paddingTop: 10,
  },
};