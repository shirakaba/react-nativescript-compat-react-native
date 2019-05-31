/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

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
import { autocapitalizationTypeProperty, EventData } from "tns-core-modules/ui/editable-text-base/editable-text-base";

// const {StyleSheet, TextInput, View} = require('react-native');

type Props = {
  filter: Function,
  render: Function,
  sections: any[],
  disableSearch?: boolean,
  testID?: string,
};

type State = {
  filter: string,
};

export default class RNTesterExampleFilter extends React.Component<Props, State> {
  state = {filter: ''};

  render() {
    const filterText = this.state.filter;
    let filterRegex = /.*/;

    try {
      filterRegex = new RegExp(String(filterText), 'i');
    } catch (error) {
      console.warn(
        'Failed to create RegExp: %s\n%s',
        filterText,
        error.message,
      );
    }

    const filter = example =>
      this.props.disableSearch || this.props.filter({example, filterRegex});

    const filteredSections = this.props.sections.map(section => ({
      ...section,
      data: section.data.filter(filter),
    }));

    return (
      <RCTStackLayout style={styles.container}>
        {this._renderTextInput()}
        {this.props.render({filteredSections})}
      </RCTStackLayout>
    );
  }

  _renderTextInput(): React.ReactElement<any> {
    if (this.props.disableSearch) {
      return null;
    }
    return (
      <RCTStackLayout style={styles.searchRow}>
        <RCTTextView
          autocapitalizationType={"none"}
          autocorrect={false}
        //   clearButtonMode="always"
          onPropertyChange={(data: EventData) => {
              // TODO: try to catch text change event.
              console.log(`TextView property change`, data);
              // this.setState(() => ({filter: text}));
          }}
        //   onChangeText={text => {
        //     this.setState(() => ({filter: text}));
        //   }}
        //   placeholder="Search..."
        //   underlineColorAndroid="transparent"
          style={styles.searchTextInput}
        //   testID={this.props.testID}
          text={this.state.filter}
        />
      </RCTStackLayout>
    );
  }
}

const styles = {
  searchRow: {
    flexDirection: 'column' as 'column', /* RN defaults to column. */
    backgroundColor: new Color('#eeeeee'),
    padding: 10,
  },
  searchTextInput: {
    backgroundColor: new Color('white'),
    borderColor: new Color('#cccccc'),
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    paddingVertical: 0,
    height: { value: 35, unit: "px" as "px" },
  },
  container: {
    flexGrow: 1,
    // width: { value: 100, unit: "%" as "%" },
    // height: { value: 100, unit: "%" as "%" },
  },
};