import * as React from "react";
import { PercentLength, FormattedString } from "tns-core-modules/ui/text-base/text-base";
import { Color } from "tns-core-modules/color";
import { Span } from "tns-core-modules/text/span";
import { ContentView, TextBase, ViewBase, StackLayout, Label, TabView, Page, ProxyViewContainer, Frame } from "react-nativescript/dist/client/ElementRegistry";
import { ViewProps, StylePropContents } from "react-nativescript/dist/shared/NativeScriptComponentTypings";
import { NavigationButton } from "tns-core-modules/ui/action-bar/action-bar";
import {
    RCTButton,
    RCTFrame,
    RCTContentView,
    RCTTextView,
    RCTLabel,
    // StylePropContents,
    RCTDockLayout,
    RCTAbsoluteLayout,
    RCTStackLayout,
    RCTFlexboxLayout,
    RCTListView,
    RCTActionBar,
    RCTTabView,
    RCTTabViewItem,
    RCTPage,
} from "react-nativescript/dist/index";
import * as ReactNativeScript from "react-nativescript/dist/index";
import { TabViewItem } from "tns-core-modules/ui/tab-view/tab-view";
import { PageComponentProps } from "react-nativescript/dist/components/Page";
import { FrameComponentProps } from "react-nativescript/dist/components/Frame";
import { RNTesterApp } from "../RNTesterApp";

export class RNTesterFramed extends React.Component<{ forwardedRef: React.RefObject<Frame> }, {}> {
    private readonly pageRef = React.createRef<Page>();

    componentDidMount(){
        const node: Frame|null = this.props.forwardedRef.current;
        if(node){
            console.log(`[RNTesterFramed] componentDidMount; shall navigate to page within.`);
            node.navigate({
                create: () => {
                    const page: Page|undefined = this.pageRef.current
                    console.log(`[RNTesterFramed] create(); shall return ref to page: ${page}`);
                    return page;
                }
            });
        } else {
            console.warn(`[RNTesterFramed] React ref to NativeScript View lost, so unable to update event listeners.`);
        }
    }

    componentWillUnmount(){
        console.log(`[RNTesterFramed] componentWillUnmount`);
    }

    render(){
        return (
            <RCTFrame ref={this.props.forwardedRef}>
                {(
                    ReactNativeScript.createPortal(
                        (
                            <RCTPage ref={this.pageRef}>
                                <RNTesterApp exampleFromAppetizeParams={`rntester://example/${"Button"}Example`}/>
                            </RCTPage>
                        ),
                        null,
                        `Portal('Navigation Hub')`
                    )
                )}
            </RCTFrame>
        );
    }
}