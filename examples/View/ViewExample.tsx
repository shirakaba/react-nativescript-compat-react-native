/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
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
import { FontWeight } from "tns-core-modules/ui/enums/enums";
import { alert, AlertOptions } from "tns-core-modules/ui/dialogs";
import { LengthPxUnit, Length } from "tns-core-modules/ui/styling/style-properties";
import { FlexboxLayoutComponentProps } from "react-nativescript/dist/components/FlexboxLayout";

/*
Differences seen in here:

- Style can be an array in RN
- Style is made by StyleSheet
- StyleSheet.hairlineWidth
- TouchableWithoutFeedback doesn't exist in NS
- needsOffscreenAlphaCompositing doesn't exist in NS
- overflow doesn't exist in NS
- left, top, (right?), (bottom?) can be set through Style in RN, but not NS
- left, top, (right?), (bottom?) only exist on main props rather than Styles
- StyleSheet.absoluteFill may be impossible to achieve on RCTFlexboxLayout, as it's an absolute layout concept..?
- lengths are specified as Length objects in NS rather than simply as strings (if abiding by typings)
- colors are specified as Color objects in NS rather than simply as strings (if abiding by typings)
- View -> RCTFlexboxLayout (but with flexDirection 'column' as default)
- Text -> RCTLabel or RCTTextView
*/

const RCTFlexboxLayoutCol: React.SFC<FlexboxLayoutComponentProps> = (props: FlexboxLayoutComponentProps) => <RCTFlexboxLayout flexDirection={'column'} {...props} />

export const title: string = '<View>';
export const description: string =
  'Basic building block of all UI, examples that ' +
  'demonstrate some of the many styles available.';

export const displayName: string = 'ViewExample';
type Example = { title: string, description?: string, render: () => any };

export const examples: Example[] = [
  {
    title: 'Background Color',
    render() {
      return (
        <RCTFlexboxLayoutCol style={{backgroundColor: new Color('#527FE4'), padding: 5}}>
          <RCTLabel style={{fontSize: 11}}>Blue background</RCTLabel>
        </RCTFlexboxLayoutCol>
      );
    },
  },
  {
    title: 'Border',
    render() {
      return (
        <RCTFlexboxLayoutCol style={{borderColor: new Color('#527FE4'), borderWidth: 5, padding: 10}}>
          <RCTLabel style={{fontSize: 11}}>5px blue border</RCTLabel>
        </RCTFlexboxLayoutCol>
      );
    },
  },
  {
    title: 'Padding/Margin',
    render() {
      const styles = {
        box: {
          backgroundColor: new Color('#527FE4'),
          borderColor: new Color('#000033'),
          borderWidth: 1,
        },
      };
      return (
        <RCTFlexboxLayoutCol style={{borderColor: new Color('#bb0000'), borderWidth: 0.5}}>
          <RCTFlexboxLayoutCol style={{ ...styles.box, padding: 5}}>
            <RCTLabel style={{fontSize: 11}}>5px padding</RCTLabel>
          </RCTFlexboxLayoutCol>
          <RCTFlexboxLayoutCol style={{ ...styles.box, margin: 5}}>
            <RCTLabel style={{fontSize: 11}}>5px margin</RCTLabel>
          </RCTFlexboxLayoutCol>
          <RCTFlexboxLayoutCol
            style={
              { ...styles.box, margin: 5, padding: 5, alignSelf: 'flex-start'}
            }>
            <RCTLabel style={{fontSize: 11}}>5px margin and padding,</RCTLabel>
            <RCTLabel style={{fontSize: 11}}>widthAutonomous=true</RCTLabel>
          </RCTFlexboxLayoutCol>
        </RCTFlexboxLayoutCol>
      );
    },
  },
  {
    title: 'Border Radius',
    render() {
      return (
        <RCTFlexboxLayoutCol style={{borderWidth: 0.5, borderRadius: 5, padding: 5}}>
          <RCTLabel style={{fontSize: 11}}>
            Too much use of `borderRadius` (especially large radii) on anything
            which is scrolling may result in dropped frames. Use sparingly.
          </RCTLabel>
        </RCTFlexboxLayoutCol>
      );
    },
  },
  {
    title: 'Border Style',
    render() {
      type Props = {};
      type State = {
        showBorder: boolean,
      };

      class ViewBorderStyleExample extends React.Component<Props, State> {
        state = {
          showBorder: true,
        };

        render() {
          return (
            <RCTFlexboxLayoutCol onTap={this._handlePress}>
              <RCTFlexboxLayoutCol>
                <RCTFlexboxLayoutCol
                  style={
                    {
                      borderWidth: 1,
                      padding: 5,
                        ...(this.state.showBorder
                        ? {
                            borderStyle: 'dashed',
                          }
                        : {})
                    }}>
                  <RCTLabel style={{fontSize: 11}}>Dashed border style</RCTLabel>
                </RCTFlexboxLayoutCol>
                <RCTFlexboxLayoutCol
                  style={{
                      marginTop: 5,
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 5,
                      ...(this.state.showBorder
                        ? {
                            borderStyle: 'dotted',
                          }
                        : {})
                    }}>
                  <RCTLabel style={{fontSize: 11}}>Dotted border style</RCTLabel>
                </RCTFlexboxLayoutCol>
              </RCTFlexboxLayoutCol>
            </RCTFlexboxLayoutCol>
          );
        }

        _handlePress = () => {
          this.setState({showBorder: !this.state.showBorder});
        };
      }
      return <ViewBorderStyleExample />;
    },
  },
  {
    title: 'Circle with Border Radius',
    render() {
      return (
        <RCTFlexboxLayoutCol
          style={{borderRadius: 10, borderWidth: 1, width: 20, height: 20}}
        />
      );
    },
  },
  /* Doesn't translate well to NativeScript */
//   {
//     title: 'Overflow',
//     render() {
//       const StyleSheet = {
//           absoluteFill: {
//               // position: 'absolute' as 'absolute',
//               left: { value: 0, unit: "px" as "px" } as Length,
//               // right: { value: 0, unit: "px" as "px" } as Length,
//               top: { value: 0, unit: "px" as "px" } as Length,
//               // bottom: { value: 0, unit: "px" as "px" } as Length,
//           }
//       };
//       const styles = {
//         container: {
//           // borderWidth: StyleSheet.hairlineWidth,
//           borderWidth: 1,
//           height: { value: 12, unit: "px" as "px" },
//           marginBottom: 8,
//           marginEnd: 16,
//           width: { value: 95, unit: "px" as "px" },
//         },
//         content: {
//           height: { value: 20, unit: "px" as "px" },
//           width: { value: 200, unit: "px" as "px" },
//         },
//       };

//       // NOTE: The <View> that sets `overflow` should only have other layout
//       // styles so that we can accurately test view flattening optimizations.
//       return (
//         <RCTFlexboxLayoutCol style={{flexDirection: 'row'}}>
//           <RCTFlexboxLayoutCol style={styles.container}>
//             <RCTFlexboxLayoutCol {...StyleSheet.absoluteFill}>
//               <RCTLabel style={styles.content}>undefined</RCTLabel>
//             </RCTFlexboxLayoutCol>
//           </RCTFlexboxLayoutCol>
//           <RCTFlexboxLayoutCol style={styles.container}>
//             <RCTFlexboxLayoutCol {...StyleSheet.absoluteFill} style={{ overflow: 'hidden'}}>
//               <RCTLabel style={styles.content}>hidden</RCTLabel>
//             </RCTFlexboxLayoutCol>
//           </RCTFlexboxLayoutCol>
//           <RCTFlexboxLayoutCol style={styles.container}>
//             <RCTFlexboxLayoutCol {...StyleSheet.absoluteFill} style={{ overflow: 'visible'}}>
//               <RCTLabel style={styles.content}>visible</RCTLabel>
//             </RCTFlexboxLayoutCol>
//           </RCTFlexboxLayoutCol>
//         </RCTFlexboxLayoutCol>
//       );
//     },
//   },
  {
    title: 'Opacity',
    render() {
      return (
        <RCTFlexboxLayoutCol>
          <RCTFlexboxLayoutCol style={{opacity: 0}}>
            <RCTLabel>Opacity 0</RCTLabel>
          </RCTFlexboxLayoutCol>
          <RCTFlexboxLayoutCol style={{opacity: 0.1}}>
            <RCTLabel>Opacity 0.1</RCTLabel>
          </RCTFlexboxLayoutCol>
          <RCTFlexboxLayoutCol style={{opacity: 0.3}}>
            <RCTLabel>Opacity 0.3</RCTLabel>
          </RCTFlexboxLayoutCol>
          <RCTFlexboxLayoutCol style={{opacity: 0.5}}>
            <RCTLabel>Opacity 0.5</RCTLabel>
          </RCTFlexboxLayoutCol>
          <RCTFlexboxLayoutCol style={{opacity: 0.7}}>
            <RCTLabel>Opacity 0.7</RCTLabel>
          </RCTFlexboxLayoutCol>
          <RCTFlexboxLayoutCol style={{opacity: 0.9}}>
            <RCTLabel>Opacity 0.9</RCTLabel>
          </RCTFlexboxLayoutCol>
          <RCTFlexboxLayoutCol style={{opacity: 1}}>
            <RCTLabel>Opacity 1</RCTLabel>
          </RCTFlexboxLayoutCol>
        </RCTFlexboxLayoutCol>
      );
    },
  },
  {
    title: 'Offscreen Alpha Compositing',
    render() {
      type Props = {};
      type State = {
        active: boolean,
      };

      const styles = {
        alphaCompositing: {
          justifyContent: 'space-around' as 'space-around',
          width: { value: 100, unit: "px" as "px" },
          height: { value: 50, unit: "px" as "px" },
          borderRadius: 100,
        },
      };

      class OffscreenAlphaCompositing extends React.Component<Props, State> {
        state = {
          active: false,
        };

        render() {
          return (
            /* TouchableWithoutFeedback */
            <RCTFlexboxLayoutCol onTap={this._handlePress}>
              <RCTFlexboxLayoutCol>
                <RCTLabel style={{paddingBottom: 10}}>Blobs</RCTLabel>
                <RCTFlexboxLayoutCol
                  style={{opacity: 1.0, paddingBottom: 30}}
                  /* Doesn't exist in NativeScript */
                  // needsOffscreenAlphaCompositing={this.state.active}
                  >
                  <RCTFlexboxLayoutCol
                    style={{
                      marginTop: 0, marginLeft: 0, backgroundColor: new Color('#FF6F59'), ...styles.alphaCompositing,
                    }}
                  />
                  <RCTFlexboxLayoutCol
                    style={
                      {
                        ...styles.alphaCompositing,
                        marginTop: -50,
                        marginLeft: 50,
                        backgroundColor: new Color('#F7CB15'),
                      }}
                  />
                </RCTFlexboxLayoutCol>
                <RCTLabel style={{paddingBottom: 10}}>
                  Same blobs, but their shared container have 0.5 opacity
                </RCTLabel>
                <RCTLabel style={{paddingBottom: 10}}>
                  Tap to {this.state.active ? 'activate' : 'deactivate'}{' '}
                  needsOffscreenAlphaCompositing
                </RCTLabel>
                <RCTFlexboxLayoutCol
                  style={{opacity: 0.8}}
                  /* Doesn't exist in NativeScript */
                  // needsOffscreenAlphaCompositing={this.state.active}
                >
                  <RCTFlexboxLayoutCol
                    style={
                      { marginTop: 0, marginLeft: 0, backgroundColor: new Color('#FF6F59'), ...styles.alphaCompositing, }
                    }
                  />
                  <RCTFlexboxLayoutCol
                    style={
                      {
                        marginTop: -50,
                        marginLeft: 50,
                        backgroundColor: new Color('#F7CB15'),
                        ...styles.alphaCompositing,
                      }
                    }
                  />
                </RCTFlexboxLayoutCol>
              </RCTFlexboxLayoutCol>
            </RCTFlexboxLayoutCol>
          );
        }

        _handlePress = () => {
          this.setState({active: !this.state.active});
        };
      }

      return <OffscreenAlphaCompositing />;
    },
  },
  {
    title: 'ZIndex',
    render() {
      type Props = {};
      type State = {
        flipped: boolean,
      };

      const styles = {
        zIndex: {
          justifyContent: 'space-around' as 'space-around',
          width: { value: 100, unit: "px" as "px" },
          height: { value: 50, unit: "px" as "px" },
          marginTop: -10,
        },
      };

      class ZIndexExample extends React.Component<Props, State> {
        state = {
          flipped: false,
        };

        render() {
          const indices = this.state.flipped ? [-1, 0, 1, 2] : [2, 1, 0, -1];
          return (
            /* TouchableWithoutFeedback */
            <RCTFlexboxLayoutCol onTap={this._handlePress}>
              <RCTFlexboxLayoutCol>
                <RCTLabel style={{paddingBottom: 10}}>
                  Tap to flip sorting order
                </RCTLabel>
                <RCTFlexboxLayoutCol
                  style={
                    {
                      marginTop: 0,
                      backgroundColor: new Color('#E57373'),
                      zIndex: indices[0],
                      ...styles.zIndex,
                    }
                  }>
                  <RCTLabel>ZIndex {indices[0]}</RCTLabel>
                </RCTFlexboxLayoutCol>
                <RCTFlexboxLayoutCol
                  style={
                    {
                      marginLeft: 50,
                      backgroundColor: new Color('#FFF176'),
                      zIndex: indices[1],
                      ...styles.zIndex,
                    }
                  }>
                  <RCTLabel>ZIndex {indices[1]}</RCTLabel>
                </RCTFlexboxLayoutCol>
                <RCTFlexboxLayoutCol
                  style={
                    {
                      marginLeft: 100,
                      backgroundColor: new Color('#81C784'),
                      zIndex: indices[2],
                      ...styles.zIndex,
                    }
                  }>
                  <RCTLabel>ZIndex {indices[2]}</RCTLabel>
                </RCTFlexboxLayoutCol>
                <RCTFlexboxLayoutCol
                  style={
                    {
                      marginLeft: 150,
                      backgroundColor: new Color('#64B5F6'),
                      zIndex: indices[3],
                      ...styles.zIndex,
                    }
                  }>
                  <RCTLabel>ZIndex {indices[3]}</RCTLabel>
                </RCTFlexboxLayoutCol>
              </RCTFlexboxLayoutCol>
            </RCTFlexboxLayoutCol>
          );
        }

        _handlePress = () => {
          this.setState({flipped: !this.state.flipped});
        };
      }
      return <ZIndexExample />;
    },
  },
  /* BackfaceVisibility Doesn't exist in NS! */
//   {
//     title: 'BackfaceVisibility',
//     render: function() {
//       return (
//         <>
//           <RCTLabel style={{paddingBottom: 10}}>
//             View #1, front is visible, back is hidden.
//           </RCTLabel>
//           <RCTFlexboxLayoutCol style={{justifyContent: 'center', alignItems: 'center'}}>
//             <RCTFlexboxLayoutCol
//               style={{
//                 height: 200,
//                 width: 200,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: new Color('blue'),
//                 backfaceVisibility: 'hidden',
//               }}>
//               <RCTLabel>Front</RCTLabel>
//             </RCTFlexboxLayoutCol>
//             <RCTFlexboxLayoutCol
//               style={{
//                 height: 200,
//                 width: 200,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: new Color('red'),
//                 backfaceVisibility: 'hidden',
//                 transform: [{rotateY: '180deg'}],
//                 position: 'absolute',
//                 top: 0,
//               }}>
//               <RCTLabel>Back (You should not see this)</RCTLabel>
//             </RCTFlexboxLayoutCol>
//           </RCTFlexboxLayoutCol>
//           <RCTLabel style={{paddingTop: 10, paddingBottom: 10}}>
//             RCTFlexboxLayoutCol #2, front is hidden, back is visible.
//           </RCTLabel>
//           <RCTFlexboxLayoutCol style={{justifyContent: 'center', alignItems: 'center'}}>
//             <RCTFlexboxLayoutCol
//               style={{
//                 height: 200,
//                 width: 200,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: new Color('blue'),
//                 backfaceVisibility: 'hidden',
//               }}>
//               <RCTLabel>Front (You should not see this)</RCTLabel>
//             </RCTFlexboxLayoutCol>
//             <RCTFlexboxLayoutCol
//               style={{
//                 height: 200,
//                 width: 200,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: new Color('red'),
//                 backfaceVisibility: 'hidden',
//                 position: 'absolute',
//                 top: 0,
//               }}>
//               <RCTLabel>Back</RCTLabel>
//             </RCTFlexboxLayoutCol>
//           </RCTFlexboxLayoutCol>
//         </>
//       );
//     },
//   },
];
