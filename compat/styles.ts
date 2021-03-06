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

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Point = { top?: number, left?: number, right?: number, bottom?: number };
type ComponentPropsWithPermissiveStyle<T extends ObservableComponentProps> = (Omit<T, "style"> & { style?: Partial<PermissiveStyle>|Partial<PermissiveStyle>[] }); // & Point;
type RNGestureHandlerProps = {
    onPress?: (...args: any[]) => void;
};
export type PermissiveComponentProps<T extends ObservableComponentProps> = ComponentPropsWithPermissiveStyle<T> & RNGestureHandlerProps;

export function assembleProps(
    style: Partial<PermissiveStyle>|Partial<PermissiveStyle>[]|undefined,
    gestureHandlers: RNGestureHandlerProps,
){
    const { top, left, bottom, right, ...trueStyles } = convertStyleRN2NS(style || {});

    const point: Point = {};
    if(typeof top !== "undefined") point.top = top;
    if(typeof left !== "undefined") point.left = left;
    if(typeof bottom !== "undefined") point.bottom = bottom;
    if(typeof right !== "undefined") point.right = right;

    return {
        ...point,
        ...trueStyles,
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
        case "onTextLayout":
            // Not supported
            return {};
        default:
            return { [name]: value };
    }
}

export function convertStyleRN2NS(styles: Partial<PermissiveStyle>|Partial<PermissiveStyle>[]): Partial<StylePropContents> & Point {
    const flattenedStyle: Partial<PermissiveStyle> = flattenStyle(styles);
    const style: Partial<PermissiveStyle> = flattenedStyle;

    /* Here we shallow-clone the flattened style to avoid any objects sharing the same instance of e.g. FontWeight and Color. */
    // const style: Partial<PermissiveStyle> = { ...flattenedStyle };

    Object.keys(style).forEach((name: string) => {
        const mapping = mapStyleRN2NS(name, style[name]);
        delete style[name];
        if(mapping === null) return; // Explicitly not supported.

        Object.keys(mapping).forEach((key: string) => {
            style[key] = mapping[key];
        });
    });

    return style as Partial<StylePropContents>;
}

export function flattenStyle(styles: Partial<PermissiveStyle>|Partial<PermissiveStyle>[]): Partial<PermissiveStyle> {
    if(!Array.isArray(styles)) return styles;
    return Object.assign({}, ...styles);
}

export function mapStyleRN2NS(name: string, value: string): Record<string, any>|null {
    switch(name){
        case "textShadowColor":
        case "textShadowRadius":
        case "textShadowOffset":
        case "fontVariant":
            return null;
        // Only available on as a LayoutBase prop.
        case "position":
            return null;
        // https://facebook.github.io/react-native/docs/layout-props#direction
        // Not sure what this would map to in NS.
        case "direction":
            return null;
        case "fontWeight":
            let fontWeight;
            switch(value){
                case "100":
                case "thin":
                    fontWeight = FontWeight.thin; // 100
                case "200":
                case "extraLight":
                    fontWeight = FontWeight.extraLight; // 200
                case "300":
                case "light":
                    fontWeight = FontWeight.light; // 300
                case "400":
                case "normal":
                    fontWeight = FontWeight.normal; // 400
                case "500":
                case "medium":
                    fontWeight = FontWeight.medium; // 500
                case "600":
                case "semiBold":
                    fontWeight = FontWeight.semiBold; // 600
                case "700":
                case "bold":
                    fontWeight = FontWeight.bold; // 700
                case "800":
                case "extraBold":
                    fontWeight = FontWeight.extraBold; // 800
                case "900":
                case "black":
                    fontWeight = FontWeight.black; // 900
                default:
                    fontWeight = FontWeight.normal; // I don't have the motivation to support in-between values.
            }
            return { [name]: fontWeight };
        case "textAlign":
            return (value === "justify" || value === "auto") ? null : { "textAlignment": value }; // "auto" and "justify" not supported.
        case "textDecorationLine":
            return { "textDecoration": value };
        // NativeScript text decorations can't be coloured nor styled, as far as I understand.
        case "textDecorationStyle":
        case "textDecorationColor":
            return null;
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
            return { [name]: mapColorRN2NS(name, value) };
        case "width":
        case "height":
        case "marginLeft":
        case "marginTop":
        case "marginRight":
        case "marginBottom":
            return { [name]: mapLengthRN2NS(name, value, true) };
        case "marginVertical":
        case "marginHorizontal":
            const mapped = mapLengthRN2NS(name, value, true);
            return name === "marginVertical" ? 
            {
                "marginTop": mapped,
                "marginBottom": mapped,
            } : 
            {
                "marginLeft": mapped,
                "marginRight": mapped,
            };
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

        case "top":
        case "left":
        case "right":
        case "bottom":
            return { [name]: mapLengthRN2NS(name, value, false) };
        /* strings allowed */
        case "padding":
        case "margin":
        case "borderColor":
        case "borderWidth":
            return { [name]: value };
        default:
            /* We'll see how this goes... */
            return { [name]: value };
    }
}

// https://facebook.github.io/react-native/docs/colors
export function mapColorRN2NS(name: string, color: string): Color {
    // console.log(`[mapColorRN2NS] mapping Color: { "${name}": "${color}" }`);
    /* Returning new Color(color) DOES work, as long as you don't do this pattern:

        render(){
            const marker = (<View style={{width: 20, height: 20, backgroundColor: 'gray' }} />);
            return (
                <View>
                    {marker}
                    {marker}
                </View>
            );
        }

        Re-using the 'marker' instance causes the Color instance to be shared, which leads to a crash.
        NativeScript can actually take string colours directly if you ignore typings, which should also
        generate unique underlying Color instances for each component, so we'll just use this method to
        assert the typings.
    */
    // return new Color(color);
    return color as any as Color;
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
interface RNOnlyStyles {
    textShadowOffset: { width: number, height: number },
    textShadowRadius: number,
    textShadowColor: string,
    fontVariant: string[],

    /* These are all properties rather than styles in {N} */
    top: number,
    left: number,
    right: number,
    bottom: number,

    position: "absolute"|"relative",
    direction: "inherit" | "ltr" | "rtl", // Technically ios-only, according to @types/react-native
    marginVertical: number,
    marginHorizontal: number,
    textAlign: "auto"|"initial" | "left" | "center" | "right" | "justify",
    textDecorationLine: "none" | "underline" | "line-through" | "underline line-through",
    textDecorationStyle: "solid" | "double" | "dashed" | "dotted",
    textDecorationColor: string,
}
export type PermissiveStyle = StylePropContents | StringyColors | StringyLengths | RNOnlyStyles | { fontWeight: string };