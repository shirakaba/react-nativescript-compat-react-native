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
    const title = this.props.title ? (
      <RNTesterTitle title={this.props.title} />
      ) : null;
      const spacer = this.props.noSpacer ? null : <RCTContentView style={styles.spacer} />;

      const ToLayout = (
        <RCTFlexboxLayout style={styles.wrapper}>
          {this.props.children}
          {spacer}
        </RCTFlexboxLayout>
      );

      return (
      <RCTFlexboxLayout style={styles.container}>
        {title}
        {
          (
            this.props.noScroll ?
              ToLayout :
              (
                <RCTScrollView
                  // TODO
                  // automaticallyAdjustContentInsets = !this.props.title;
                  // keyboardShouldPersistTaps = 'handled';
                  // keyboardDismissMode = 'interactive';
                >
                  {ToLayout}
                </RCTScrollView>
              )
          )
        }
      </RCTFlexboxLayout>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'column' as 'column', /* RN defaults to column. */
    backgroundColor: new Color('#e9eaed'),
    flexGrow: 1,
    // width: { value: 100, unit: "%" as "%" },
    // height: { value: 100, unit: "%" as "%" },
  },
  spacer: {
    height: 270,
  },
  wrapper: {
    flexDirection: 'column' as 'column', /* RN defaults to column. */
    flexGrow: 1,
    paddingTop: 10,
  },
};