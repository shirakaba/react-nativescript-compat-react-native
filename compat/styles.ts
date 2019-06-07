// import * as React from "react";
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
import { LengthPxUnit, Length, PercentLength } from "tns-core-modules/ui/styling/style-properties";
import { FlexboxLayoutComponentProps } from "react-nativescript/dist/components/FlexboxLayout";
import { TextViewComponentProps } from "react-nativescript/dist/components/TextView";
import { StylePropContents } from "react-nativescript/dist/shared/NativeScriptComponentTypings";
import { ObservableComponentProps } from "react-nativescript/dist/components/Observable";
import { ViewBaseComponentProps } from "react-nativescript/dist/components/ViewBase";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";

type ComponentPropsWithPermissiveStyle<T extends ObservableComponentProps> = Omit<T, "style"> & { style?: Partial<PermissiveStyle> };
type RNGestureHandlerProps = {
    onPress?: (...args: any[]) => void;
};
export type PermissiveComponentProps<T extends ObservableComponentProps> = ComponentPropsWithPermissiveStyle<T> & RNGestureHandlerProps;

export function assembleProps(
    style: Partial<PermissiveStyle>|Partial<PermissiveStyle>[]|undefined,
    gestureHandlers: RNGestureHandlerProps
){
    return {
        ...(style ? convertStyleRN2NS(style) : {}),
        ...gestureHandlers,
    }
}

export function convertGestureHandlerRN2NS(handlers: RNGestureHandlerProps): Record<string, (args: GestureEventData) => void> {
    Object.keys(handlers).forEach((name: string) => {
        handlers[name] = mapGestureHandlerRN2NS(name, handlers[name]);
    });

    return handlers as Record<string, (args: GestureEventData) => void>;
}

export function mapGestureHandlerRN2NS(name: string, value: (...args: any[]) => void): Record<string, (args: GestureEventData) => void> {
    switch(name){
        case "onPress":
            return { onTap: value as (args: GestureEventData) => void };
        default:
            return { [name]: value };
    }
}

export function convertStyleRN2NS(styles: Partial<PermissiveStyle>|Partial<PermissiveStyle>[]): Partial<StylePropContents> {
    const style: Partial<PermissiveStyle> = flattenStyle(styles);

    Object.keys(style).forEach((name: string) => {
        style[name] = mapStyleRN2NS(name, style[name]);
    });

    return style as Partial<StylePropContents>;
}

export function flattenStyle(styles: Partial<PermissiveStyle>|Partial<PermissiveStyle>[]): Partial<PermissiveStyle> {
    if(!Array.isArray(styles)) return styles;
    return Object.assign({}, ...styles);
}

export function mapStyleRN2NS(name: string, value: string): Color|Length|PercentLength {
    switch(name){
        case "color":
        case "tintColor":
        case "placeholderColor":
        case "backgroundColor":
        case "borderTopColor":
        case "borderRightColor":
        case "borderBottomColor":
        case "borderLeftColor":
        case "tabTextColor":
        case "tabBackgroundColor":
        case "selectedTabTextColor":
        case "androidSelectedTabHighlightColor":
        case "separatorColor":
        case "selectedBackgroundColor":
        case "androidStatusBarBackground":
            return mapColorRN2NS(value);            
        case "width":
        case "height":
        case "marginLeft":
        case "marginTop":
        case "marginRight":
        case "marginBottom":
            return mapLengthRN2NS(name, value, true);
        case "borderWidth":
        case "borderTopWidth":
        case "borderRightWidth":
        case "borderBottomWidth":
        case "borderLeftWidth":
        case "borderRadius":
        case "borderTopLeftRadius":
        case "borderTopRightRadius":
        case "borderBottomRightRadius":
        case "borderBottomLeftRadius":
        case "minWidth":
        case "minHeight":
        case "paddingLeft":
        case "paddingTop":
        case "paddingRight":
        case "paddingBottom":
            return mapLengthRN2NS(name, value, false);
        /* strings allowed */
        case "padding":
        case "margin":
        case "borderColor":
        case "borderWidth":
        default:
            return value as any;
    }
}

// https://facebook.github.io/react-native/docs/colors
export function mapColorRN2NS(color: string): Color {
    return new Color(color);
}

// https://facebook.github.io/react-native/docs/height-and-width.html
export function mapLengthRN2NS(name: string, length: number|string, expectsPercent: boolean|null): Length|PercentLength {
    if(typeof length === "string"){
        if(length.slice(-1) === "%"){
            if(!expectsPercent){
                throw new Error(`Percent length not allowed for property '${name}'`);
            }
            return { value: parseFloat(length), unit: "%" };
        } else {
            if(expectsPercent){
                throw new Error(`Percent length expected for property '${name}'`);
            }
            return { value: parseFloat(length), unit: "dip" };
        }
    } else {
        return { value: length, unit: "dip" };
    }
    // return typeof length === "string" ? 
    //     { value: parseFloat(length), unit: length.slice(-1) === "%" ? "%" : "dip" } :
    //     { value: length, unit: "dip" };
}

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface StringyColors {
    color: string;
    tintColor: string;
    placeholderColor: string;
    backgroundColor: string;
    borderTopColor: string;
    borderRightColor: string;
    borderBottomColor: string;
    borderLeftColor: string;
    tabTextColor: string;
    tabBackgroundColor: string;
    selectedTabTextColor: string;
    androidSelectedTabHighlightColor: string;
    separatorColor: string;
    selectedBackgroundColor: string;
    androidStatusBarBackground: string;
}
interface StringyLengths {
    borderWidth: string;
    borderTopWidth: string;
    borderRightWidth: string;
    borderBottomWidth: string;
    borderLeftWidth: string;
    borderRadius: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    borderBottomRightRadius: string;
    borderBottomLeftRadius: string;
    minWidth: string;
    minHeight: string;
    width: string;
    height: string;
    margin: string;
    marginLeft: string;
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    padding: string;
    paddingLeft: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
}
export type PermissiveStyle = StylePropContents | StringyColors | StringyLengths;