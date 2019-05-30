/**
 * Code below here ported to React NativeScript from React Native's RNTester app, whose licence is stored in this folder as React_Native_LICENCE.txt:
 * https://github.com/facebook/react-native/blob/3945f10561622a3e361190919d0a6d397f67ef8b/RNTester/js/components/RNTesterExampleList.js
 * ... which carries the following copyright:
 * 
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
import * as RNTesterActions from "../utils/RNTesterActions";
import { RNTesterExampleAction, RNTesterListAction, RNTesterAction } from "../utils/RNTesterActions";
import RNTesterExampleFilter from "./RNTesterExampleFilter";
import { ContentView } from "react-nativescript/dist/client/ElementRegistry";

class RowComponent extends React.PureComponent<
    {
        // Not clear what the actual schema is. May just be 'any'.
        item: {
            key?: string,
            module: {
                title: string,
                description: string,
                supportsTVOS?: boolean
            }
        },
        onNavigate: (action: RNTesterAction) => void,
        onPress?: () => void,
        onShowUnderlay?: () => void,
        onHideUnderlay?: () => void,
    }
> {
    private readonly _onPress = () => {
        if (this.props.onPress) {
          this.props.onPress();
          return;
        }
        const action = RNTesterActions.ExampleAction(this.props.item.key);

        console.log(`[RNTesterExampleList.RowComponent] Triggering onNavigate(${JSON.stringify(action)}).`);

        this.props.onNavigate(action);
    };

    render() {
        const { item } = this.props;

        console.log(`[RNTesterExampleList.RowComponent] render() with item from module ${item.module} entitled: ${item.module.title}`);

        return (
            <RCTFlexboxLayout
                style={styles.row}
                onTap={this._onPress}
            >
                <RCTLabel style={styles.rowTitleText}>{item.module.title}</RCTLabel>
                <RCTLabel style={styles.rowDetailText}>{item.module.description}</RCTLabel>
            </RCTFlexboxLayout>
        )
    }
}

const renderSectionHeader = ({section}) => (
    <RCTLabel style={styles.sectionHeader}>{section.title}</RCTLabel>
);

export default class RNTesterExampleList extends React.Component<
    {
        onNavigate: (action: RNTesterAction) => void,
        list: {
            // ComponentExamples: RNTesterExample[],
            ComponentExamples: any[],
            // APIExamples: RNTesterExample[],
            APIExamples: any[],
        },
        style?: any,
        displayTitleRow?: boolean,
    },
    {}
>
{
    render(){
        console.log(`[RNTesterExampleList.RNTesterExampleList] render().`);

        const filter = ({example, filterRegex}) =>
        filterRegex.test(example.module.title)
        // && (!Platform.isTV || example.supportsTVOS);

        // TODO: support sections
        const sections = [
            {
                data: this.props.list.ComponentExamples,
                title: 'COMPONENTS',
                key: 'c',
            },
            {
                data: this.props.list.APIExamples,
                title: 'APIS',
                key: 'a',
            },
        ];

        return (
            <RCTFlexboxLayout
                style={{
                    ...styles.listContainer,
                    ...this.props.style,
                }}
                >
                {this._renderTitleRow()}
                <RNTesterExampleFilter
                    testID="explorer_search"
                    sections={sections}
                    filter={filter}
                    render={({filteredSections}) => (
                        <RCTListView
                            style={styles.list}
                            items={this.props.list.ComponentExamples.concat(this.props.list.APIExamples)}
                            cellFactory={(item: { key: string, module: any, supportsTVOS?: boolean }, container: ContentView) => {
                                console.log(`[RNTesterExampleList.RNTesterExampleList.RCTListView] rendering item with key: ${item.key} and module: ${item.module}`);

                                return this._renderItem({
                                    item,
                                    // separators: {
                                    //     highlight: () => {},
                                    //     unhighlight: () => {},
                                    // }
                                });
                            }}
                        />
                        // TODO: support sectioned list
                        // <SectionList
                        //     ItemSeparatorComponent={ItemSeparator}
                        //     contentContainerStyle={styles.sectionListContentContainer}
                        //     style={styles.list}
                        //     sections={filteredSections}
                        //     renderItem={this._renderItem}
                        //     enableEmptySections={true}
                        //     itemShouldUpdate={this._itemShouldUpdate}
                        //     keyboardShouldPersistTaps="handled"
                        //     automaticallyAdjustContentInsets={false}
                        //     keyboardDismissMode="on-drag"
                        //     renderSectionHeader={renderSectionHeader}
                        // />
                    )}
                />
            </RCTFlexboxLayout>
        );
    }

    _itemShouldUpdate(curr, prev) {
        return curr.item !== prev.item;
    }

    _renderItem = ({
        item,
        // separators
    }) => {
        
        return (
            <RowComponent
                item={item}
                onNavigate={this.props.onNavigate}
                // onShowUnderlay={separators.highlight}
                // onHideUnderlay={separators.unhighlight}
            />
        );
    };

    _renderTitleRow(): React.ReactElement<any> {
        if(!this.props.displayTitleRow){
            return null;
        }
        return (
            <RowComponent
                item={{
                    module: {
                        title: 'RNTester',
                        description: 'React Native Examples',
                    },
                }}
                onNavigate={this.props.onNavigate}
                onPress={() => {
                    this.props.onNavigate(RNTesterActions.ExampleList());
                }}
            />
        );
    }

    _handleRowPress(exampleKey: string): void {
        this.props.onNavigate(RNTesterActions.ExampleAction(exampleKey));
    }
}

const styles = {
    listContainer: {
        flexGrow: 1,

        // width: { value: 100, unit: "%" as "%" },
        // height: { value: 100, unit: "%" as "%" },
    },
    list: {
        backgroundColor: new Color('#eeeeee'),
    },
    sectionHeader: {
        backgroundColor: new Color('#eeeeee'),
        padding: 5,
        fontWeight: FontWeight.medium,
        fontSize: 11,
    },
    row: {
        flexDirection: 'column' as 'column', /* RN defaults to column. */
        flexGrow: 1, // NOTE: Not specified by RN
        // width: { value: 100, unit: "%" as "%" },
        // height: { value: 100, unit: "%" as "%" },
        backgroundColor: new Color('white'),
        justifyContent: 'center' as 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    separator: {
        // height: StyleSheet.hairlineWidth,
        height: 1,
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
    },
    separatorHighlighted: {
        // height: StyleSheet.hairlineWidth,
        height: 1,
        backgroundColor: 'rgb(217, 217, 217)',
    },
    sectionListContentContainer: {
        backgroundColor: 'white',
    },
    rowTitleText: {
        fontSize: 17,
        fontWeight: FontWeight.medium
    },
    rowDetailText: {
        fontSize: 15,
        color: new Color('#888888'),
        lineHeight: 20,
    },
}