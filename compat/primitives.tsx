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
export const View: React.SFC<PermissiveFlexboxLayoutComponentProps> = (props: PermissiveFlexboxLayoutComponentProps) => {
    const { style, onPress, ...rest } = props;
    return (<RCTFlexboxLayout
                flexDirection={'column'}
                {...assembleProps(style, { onPress, })}
                {...rest}
            />);
};

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
export const Text: React.SFC<PermissiveTextViewComponentProps> = (props: PermissiveTextViewComponentProps) => {
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

        ...rest
    } = props;
    
    return (<RCTTextView
                {...assembleProps(style, { onPress, })}
                {...rest}
            />);
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
export const TextInput: React.SFC<PermissiveTextFieldComponentProps> = (props: PermissiveTextFieldComponentProps) => {
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

        ...rest
    } = props;
    
    return (<RCTTextField
                {...assembleProps(style, { onPress, })}
                {...rest}
            />);
};

type PermissiveButtonComponentProps = PermissiveComponentProps<ButtonComponentProps> & { title?: string };
export const Button: React.SFC<PermissiveButtonComponentProps> = (props: PermissiveButtonComponentProps) => {
    const { style, onPress, title, ...rest } = props;
    return (<RCTButton
                text={title}
                {...assembleProps(style, { onPress, })}
                {...rest}
            />);
};