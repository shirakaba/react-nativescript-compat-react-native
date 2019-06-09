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
import { LengthPxUnit, Length } from "tns-core-modules/ui/styling/style-properties";
import { FlexboxLayoutComponentProps } from "react-nativescript/dist/components/FlexboxLayout";
import { TextViewComponentProps } from "react-nativescript/dist/components/TextView";
import { StylePropContents } from "react-nativescript/dist/shared/NativeScriptComponentTypings";
import { flattenStyle, PermissiveStyle, convertStyleRN2NS, PermissiveComponentProps, assembleProps } from "./styles";
import { ButtonComponentProps } from "react-nativescript/dist/components/Button";
import { TextFieldComponentProps } from "react-nativescript/dist/components/TextField";

type PermissiveFlexboxLayoutComponentProps = PermissiveComponentProps<FlexboxLayoutComponentProps>;
export const View: React.FunctionComponent<PermissiveFlexboxLayoutComponentProps> = (props: PermissiveFlexboxLayoutComponentProps) => {
    const { style, onPress, ...rest } = props;
    return (<RCTFlexboxLayout
                flexDirection={'column'}
                {...assembleProps(style, { onPress, })}
                {...rest}
            />);
};

function nestTextChildren(children: React.ReactNode, parentProps): React.ReactNode {
    return React.Children.map(children, function(child: React.ReactNode, i: number){
        if(typeof child === "string" || typeof child === "number"){
            console.log(`[nestTextChildren] ReactText case`);
            // ReactText case.
            return (<Text>{child}</Text>);
        } else if(typeof child === "undefined" || typeof child === "boolean" || child === null){
            console.log(`[nestTextChildren] falsy or boolean case`);
            return child;
        } else if(Array.isArray(child)){
            console.log(`[nestTextChildren] array case`);
            // ReactFragment case.
            // I'm not motivated to figure out the recursion for supporting ReactFragment, sorry...
            return null;
        } else {
            const { children, ...rest } = (child as React.ReactElement).props;
            console.log(`[nestTextChildren] default (ReactElement) case, with props`, { ...rest });
            /* I'm assuming it's ReactElement at this point, but it could still be a ReactPortal | ReactFragment.
             * May break in such case. */
            // if((child as React.ReactElement).props){
            //     Object.assign({}, (child as React.ReactElement).props, { ...parentProps });
            // }
            return child;
        }
    })
}

type PermissiveTextViewComponentProps = PermissiveComponentProps<TextViewComponentProps> & {
    onTextLayout?: (...args: any[]) => void, // Instant for {N}?
    suppressHighlighting?: boolean,
    allowFontScaling?: boolean,
    multiline?: boolean,
    adjustsFontSizeToFit?: boolean,
    selectable?: boolean,
    ellipsizeMode?: "tail"|"middle"|"head"|"clip",
    numberOfLines?: number,
};
export const Text: React.FunctionComponent<PermissiveTextViewComponentProps> = (props: React.PropsWithChildren<PermissiveTextViewComponentProps>) => {
    const {
        style,
        onPress,
        onTextLayout,

        /* Not supported in {N}? */
        multiline,
        suppressHighlighting,
        allowFontScaling,
        adjustsFontSizeToFit,
        selectable,
        ellipsizeMode,
        numberOfLines,

        children,
        ...rest
    } = props;

    /* Here's my very limited support for nesting children inside Text (which I don't like as a pattern anyway...) */
    if(React.Children.count(children) > 1){
        return (
            // RNTester seems to default to row direction in nested texts.
            <View flexDirection={'row'}>{nestTextChildren(children, { ...rest })}</View>
        );
    } else {
        return (<RCTTextView
            {...assembleProps(style, { onPress, })}
            {...rest}
        >
            {children}
        </RCTTextView>);
    }
};

type PermissiveTextFieldComponentProps = PermissiveComponentProps<TextFieldComponentProps> & {
    onTextLayout?: (...args: any[]) => void,
    suppressHighlighting?: boolean,
    allowFontScaling?: boolean,
    multiline?: boolean,
    adjustsFontSizeToFit?: boolean,
    selectable?: boolean,
    ellipsizeMode?: "tail"|"middle"|"head"|"clip",
    numberOfLines?: number,
};
export const TextInput: React.FunctionComponent<PermissiveTextFieldComponentProps> = (props: React.PropsWithChildren<PermissiveTextFieldComponentProps>) => {
    const {
        style,
        onPress,
        onTextLayout,

        /* Not supported in {N}? */
        multiline,
        suppressHighlighting,
        allowFontScaling,
        adjustsFontSizeToFit,
        selectable,
        ellipsizeMode,
        numberOfLines,

        children,
        ...rest
    } = props;

    /* Here's my very limited support for nesting children inside Text (which I don't like as a pattern anyway...) */
    if(React.Children.count(children) > 1){
        return (
            // RNTester seems to default to row direction in nested texts.
            <View flexDirection={'row'}>{nestTextChildren(children, { ...rest })}</View>
        );
    } else {
        return (<RCTTextField
            {...assembleProps(style, { onPress, })}
            {...rest}
        >
            {children}
        </RCTTextField>);
    }
};

type PermissiveButtonComponentProps = PermissiveComponentProps<ButtonComponentProps> & { title?: string };
export const Button: React.FunctionComponent<PermissiveButtonComponentProps> = (props: React.PropsWithChildren<PermissiveButtonComponentProps>) => {
    const { style, onPress, title, ...rest } = props;
    return (<RCTButton
                text={title}
                {...assembleProps(style, { onPress, })}
                {...rest}
            />);
};