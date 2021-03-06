/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// import type {RNTesterExample} from '../types/RNTesterTypes';

type RNTesterExample = any;

const ComponentExamples: Array<RNTesterExample> = [
//   {
//     key: 'ActivityIndicatorExample',
//     module: require('../examples/ActivityIndicator/ActivityIndicatorExample'),
//   },
  {
    key: 'ButtonExample',
    module: require('../examples/Button/ButtonExample'),
  },
//   {
//     key: 'CheckBoxExample',
//     module: require('../examples/CheckBox/CheckBoxExample'),
//   },
//   {
//     key: 'FlatListExample',
//     module: require('../examples/FlatList/FlatListExample'),
//   },
//   {
//     key: 'ImageExample',
//     module: require('../examples/Image/ImageExample'),
//   },
//   {
//     key: 'KeyboardAvoidingViewExample',
//     module: require('../examples/KeyboardAvoidingView/KeyboardAvoidingViewExample'),
//   },
//   {
//     key: 'ModalExample',
//     module: require('../examples/Modal/ModalExample'),
//   },
//   {
//     key: 'MultiColumnExample',
//     module: require('../examples/MultiColumn/MultiColumnExample'),
//   },
//   {
//     key: 'NewAppScreenExample',
//     module: require('../examples/NewAppScreen/NewAppScreenExample'),
//   },
//   {
//     key: 'PickerExample',
//     module: require('../examples/Picker/PickerExample'),
//   },
//   {
//     key: 'ProgressBarAndroidExample',
//     /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
//      * when making Flow check .android.js files. */
//     module: require('../examples/ProgressBarAndroid/ProgressBarAndroidExample'),
//   },
//   {
//     key: 'RefreshControlExample',
//     module: require('../examples/RefreshControl/RefreshControlExample'),
//   },
//   {
//     key: 'ScrollViewSimpleExample',
//     module: require('../examples/ScrollView/ScrollViewSimpleExample'),
//   },
//   {
//     key: 'SectionListExample',
//     module: require('../examples/SectionList/SectionListExample'),
//   },
//   {
//     key: 'SliderExample',
//     module: require('../examples/Slider/SliderExample'),
//   },
//   {
//     key: 'StatusBarExample',
//     module: require('../examples/StatusBar/StatusBarExample'),
//   },
//   {
//     key: 'SwitchExample',
//     module: require('../examples/Switch/SwitchExample'),
//   },
  {
    key: 'TextExample',
    /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
     * when making Flow check .android.js files. */
    module: require('../examples/Text/TextExample'),
  },
//   {
//     key: 'TextInputExample',
//     /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
//      * when making Flow check .android.js files. */
//     module: require('../examples/TextInput/TextInputExample'),
//   },
//   {
//     key: 'TouchableExample',
//     module: require('../examples/Touchable/TouchableExample'),
//   },
  {
    key: 'ViewExample',
    module: require('../examples/View/ViewExample'),
  },
//   {
//     key: 'ViewPagerAndroidExample',
//     /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
//      * when making Flow check .android.js files. */
//     module: require('../examples/ViewPagerAndroid/ViewPagerAndroidExample'),
//   },
];

const APIExamples: Array<RNTesterExample> = [
//   {
//     key: 'AccessibilityExample',
//     module: require('../examples/Accessibility/AccessibilityExample'),
//   },
//   {
//     key: 'AccessibilityAndroidExample',
//     /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
//      * when making Flow check .android.js files. */
//     module: require('../examples/Accessibility/AccessibilityAndroidExample'),
//   },
//   {
//     key: 'AlertExample',
//     module: require('../examples/Alert/AlertExample').AlertExample,
//   },
//   {
//     key: 'AnimatedExample',
//     module: require('../examples/Animated/AnimatedExample'),
//   },
//   {
//     key: 'AppStateExample',
//     module: require('../examples/AppState/AppStateExample'),
//   },
//   {
//     key: 'BorderExample',
//     module: require('../examples/Border/BorderExample'),
//   },
//   {
//     key: 'ClipboardExample',
//     module: require('../examples/Clipboard/ClipboardExample'),
//   },
//   {
//     key: 'CrashExample',
//     module: require('../examples/Crash/CrashExample'),
//   },
//   {
//     key: 'DatePickerAndroidExample',
//     module: require('../examples/DatePicker/DatePickerAndroidExample'),
//   },
//   {
//     key: 'Dimensions',
//     module: require('../examples/Dimensions/DimensionsExample'),
//   },
//   {
//     key: 'LayoutEventsExample',
//     module: require('../examples/Layout/LayoutEventsExample'),
//   },
//   {
//     key: 'LinkingExample',
//     module: require('../examples/Linking/LinkingExample'),
//   },
//   {
//     key: 'LayoutAnimationExample',
//     module: require('../examples/Layout/LayoutAnimationExample'),
//   },
//   {
//     key: 'LayoutExample',
//     module: require('../examples/Layout/LayoutExample'),
//   },
//   {
//     key: 'NativeAnimationsExample',
//     module: require('../examples/NativeAnimation/NativeAnimationsExample'),
//   },
//   {
//     key: 'OrientationChangeExample',
//     module: require('../examples/OrientationChange/OrientationChangeExample'),
//   },
//   {
//     key: 'PanResponderExample',
//     module: require('../examples/PanResponder/PanResponderExample'),
//   },
//   {
//     key: 'PermissionsExampleAndroid',
//     /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
//      * when making Flow check .android.js files. */
//     module: require('../examples/PermissionsAndroid/PermissionsExample'),
//   },
//   {
//     key: 'PointerEventsExample',
//     module: require('../examples/PointerEvents/PointerEventsExample'),
//   },
//   {
//     key: 'RTLExample',
//     module: require('../examples/RTL/RTLExample'),
//   },
//   {
//     key: 'ShareExample',
//     module: require('../examples/Share/ShareExample'),
//   },
//   {
//     key: 'TimePickerAndroidExample',
//     module: require('../examples/TimePicker/TimePickerAndroidExample'),
//   },
//   {
//     key: 'TimerExample',
//     module: require('../examples/Timer/TimerExample'),
//   },
//   {
//     key: 'ToastAndroidExample',
//     /* $FlowFixMe(>=0.78.0 site=react_native_android_fb) This issue was found
//      * when making Flow check .android.js files. */
//     module: require('../examples/ToastAndroid/ToastAndroidExample'),
//   },
//   {
//     key: 'TransformExample',
//     module: require('../examples/Transform/TransformExample'),
//   },
//   {
//     key: 'VibrationExample',
//     module: require('../examples/Vibration/VibrationExample'),
//   },
//   {
//     key: 'WebSocketExample',
//     module: require('../examples/WebSocket/WebSocketExample'),
//   },
//   {
//     key: 'XHRExample',
//     module: require('../examples/XHR/XHRExample'),
//   },
];

const Modules = {};

APIExamples.concat(ComponentExamples).forEach(Example => {
  console.log(`[android] Iterating example: ${Example.key}. Its module:`, Example.module);
  Modules[Example.key] = Example.module;
});

export const RNTesterList = {
  APIExamples,
  ComponentExamples,
  Modules,
};