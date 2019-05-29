/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";
import {
    RCTButton,
    RCTContentView,
    RCTTextView,
    RCTTextField,
    RCTLabel,
    RCTImage,
    // StylePropContents,
    RCTDockLayout,
    RCTAbsoluteLayout,
    RCTStackLayout,
    RCTFlexboxLayout,
    RCTGridLayout,
    RCTListView,
    RCTActionBar,
    RCTTabView,
    RCTTabViewItem,
    RCTPage,
} from "react-nativescript/dist/index";
import { Color } from "tns-core-modules/color/color";
import { FontWeight } from "tns-core-modules/ui/enums/enums";
import { alert, AlertOptions } from "tns-core-modules/ui/dialogs";

// const {Alert, Button, View, StyleSheet} = require('react-native');

function onButtonTap(buttonName) {
  alert(`${buttonName} has been tapped!`);
}

exports.displayName = 'ButtonExample';
exports.framework = 'React';
exports.title = '<Button>';
exports.description = 'Simple React Native button component.';

exports.examples = [
  {
    title: 'Simple Button',
    description:
      'The title and onTap handler are required. It is ' +
      'recommended to set accessibilityLabel to help make your app usable by ' +
      'everyone.',
    render: function() {
      return (
        <RCTButton
          onTap={() => onButtonTap('Simple')}
          // testID="simple_button"
          text="Press Me"
          // accessibilityLabel="See an informative alert"
        />
      );
    },
  },
  {
    title: 'Adjusted color',
    description:
      'Adjusts the color in a way that looks standard on each ' +
      'platform. On iOS, the color prop controls the color of the text. On ' +
      'Android, the color adjusts the background color of the button.',
    render: function() {
      return (
        <RCTButton
          onTap={() => onButtonTap('Purple')}
          // testID="purple_button"
          text="Press Purple"
          color={new Color("#841584")}
          // accessibilityLabel="Learn more about purple"
        />
      );
    },
  },
  {
    title: 'Fit to text layout',
    description:
      'This layout strategy lets the title define the width of ' + 'the button',
    render: function() {
      return (
        <RCTFlexboxLayout style={styles.container}>
          <RCTButton
            onTap={() => onButtonTap('Left')}
            // testID="left_button"
            text="This looks great!"
            // accessibilityLabel="This sounds great!"
          />
          <RCTButton
            onTap={() => onButtonTap('Right')}
            // testID="right_button"
            text="Ok!"
            color={new Color("#841584")}
            // accessibilityLabel="Ok, Great!"
          />
        </RCTFlexboxLayout>
      );
    },
  },
  {
    title: 'Disabled Button',
    description: 'All interactions for the component are disabled.',
    render: function() {
      return (
        <RCTButton
          isEnabled={false}
          onTap={() => onButtonTap('Disabled')}
          // testID="disabled_button"
          text="I Am Disabled"
          // accessibilityLabel="See an informative alert"
        />
      );
    },
  },
];

const styles = {
  container: {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
  },
};