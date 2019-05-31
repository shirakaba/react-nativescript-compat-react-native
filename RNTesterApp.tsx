/**
 * Code below here ported to React NativeScript from React Native's RNTester app, whose licence is stored in this folder as React_Native_LICENCE.txt:
 * https://github.com/facebook/react-native/blob/3945f10561622a3e361190919d0a6d397f67ef8b/RNTester/js/RNTesterApp.ios.js
 * ... which carries the following copyright:
 * 
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO: port the Android version of RNTesterApp too and split this file up by platform.
import * as React from "react";
import RNTesterExampleList from "./components/RNTesterExampleList";
import RNTesterExampleContainer from "./components/RNTesterExampleContainer";
import RNTesterNavigationReducer from "./utils/RNTesterNavigationReducer";
import URIActionMap from "./utils/URIActionMap";
const RNTesterList = require('./utils/RNTesterList.ios').RNTesterList;
// import type {RNTesterExample} from './types/RNTesterTypes';
import { Back, ExampleAction, ExampleList, RNTesterAction } from './utils/RNTesterActions';
import {RNTesterNavigationState} from './utils/RNTesterNavigationReducer';

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
import { isAndroid } from "tns-core-modules/platform/platform";
import * as application from "tns-core-modules/application/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application/application";
import * as appSettings from "tns-core-modules/application-settings";

// const SnapshotViewIOS = require('./examples/Snapshot/SnapshotViewIOS.ios');

type Props = {
  exampleFromAppetizeParams: string,
};

// YellowBox.ignoreWarnings([
//   'Module RCTImagePickerManager requires main queue setup',
// ]);

const APP_STATE_KEY: string = 'RNTesterAppState.v2';

const Header = ({ onBack, title }: { onBack?: () => any, title: string }) => {
  console.log(`[RNTesterApp.Header] render() with title ${title} and onBack: ${onBack}`);
  return (
    // This outermost one is intended to be the SafeAreaView.
    <RCTStackLayout style={styles.headerContainer}>
      <RCTStackLayout style={styles.header}>
        <RCTStackLayout style={styles.headerCenter}>
          <RCTLabel style={styles.title}>{title}</RCTLabel>
        </RCTStackLayout>
        {onBack ? (
          <RCTStackLayout style={styles.headerLeft}>
            <RCTButton text="Back" onTap={onBack} />
          </RCTStackLayout>
        ) : (
          <RCTStackLayout style={styles.headerLeft}>
            <RCTButton text="Unavailable" />
          </RCTStackLayout>
        )}
      </RCTStackLayout>
    </RCTStackLayout>
  );
};

export class RNTesterApp extends React.Component<Props, RNTesterNavigationState> {
  private _mounted: boolean;

  UNSAFE_componentWillMount() {
    /* https://stackoverflow.com/questions/40603588/nativescript-handling-back-button-event#41278886 */
    if(isAndroid){
      application.android.on(
        AndroidApplication.activityBackPressedEvent,
        (data: AndroidActivityBackPressedEventData) => {
          this._handleBack();
        }
      );
    }
  }

  componentDidMount() {
    this._mounted = true;

    console.log(`[RNTesterApp.tsx] Reading app state.`);
    const lastSavedAppState: any = appSettings.getString(APP_STATE_KEY, "{}");
    console.log(`[RNTesterApp.tsx] Last saved app state is:`, JSON.parse(lastSavedAppState));

    /* TODO. Let's avoid thinking about deep-linking for now. */
    // Linking.getInitialURL().then(url => {
    //   AsyncStorage.getItem(APP_STATE_KEY, (err, storedString) => {
    //     if (!this._mounted) {
    //       return;
    //     }
    //     const exampleAction = URIActionMap(
    //       this.props.exampleFromAppetizeParams,
    //     );
    //     const urlAction = URIActionMap(url);
    //     const launchAction = exampleAction || urlAction;
    //     const initialAction = launchAction || {type: 'InitialAction'};
    //     this.setState(RNTesterNavigationReducer(undefined, initialAction));
    //   });
    // });

    // Linking.addEventListener('url', url => {
    //   this._handleAction(URIActionMap(url));
    // });

    const exampleAction: RNTesterAction|null = URIActionMap(
      this.props.exampleFromAppetizeParams,
    );

    const initialAction = exampleAction || {type: 'InitialAction'};
    console.log(`[RNTesterApp.tsx] Firing action ${JSON.stringify(initialAction)} on reducer.`);
    this.setState(RNTesterNavigationReducer(undefined, initialAction));
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _handleBack = () => {
    this._handleAction(Back());
  };

  _handleAction = (action: RNTesterAction) => {
    if (!action) {
      return;
    }
    const newState = RNTesterNavigationReducer(this.state, action);
    if (this.state !== newState) {
      this.setState(newState, () => {
        console.log(`Persisting app state.`);
        // appSettings.setString(APP_STATE_KEY, JSON.stringify(this.state));
      });
    }
  };

  render() {
    console.log(`[RNTesterApp] render().`);
    if (!this.state) {
      console.log(`[RNTesterApp] render(). this.state falsy, so returning null.`);
      return null;
    }
    if (this.state.openExample) {
      const Component = RNTesterList.Modules[this.state.openExample];
      if (Component && Component.external) {
        console.log(`[RNTesterApp] render(). this.state.openExample: ${this.state.openExample} (got component)`);
        return <Component onExampleExit={this._handleBack} />;
      } else {
        console.log(`[RNTesterApp] render(). this.state.openExample: ${this.state.openExample} (didn't get a component)`);
        // Takes this route
        return (
          <RCTFlexboxLayout style={styles.exampleContainer}>
            <Header onBack={this._handleBack} title={Component.title} />
            <RNTesterExampleContainer module={Component} />
          </RCTFlexboxLayout>
        );
      }
    }
    console.log(`[RNTesterApp] render(). this.state truthy yet this.state.openExample falsy, so opening example list.`);
    return (
      <RCTFlexboxLayout style={styles.exampleContainer}>
        <Header title="RNTester" />
        <RNTesterExampleList
          onNavigate={this._handleAction}
          list={RNTesterList}
        />
      </RCTFlexboxLayout>
    );
  }
}

const styles = {
  headerContainer: {
    flexDirection: 'column' as 'column', /* RN defaults to column. */
    borderBottomWidth: 1,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: new Color('#96969A'),
    backgroundColor: new Color('#F5F5F6'),
  },
  header: {
    // flexGrow: 1,
    height: 40,
    flexDirection: 'row' as 'row',
  },
  headerLeft: {
    flexDirection: 'column' as 'column', /* RN defaults to column. */
  },
  headerCenter: {
    flexDirection: 'column' as 'column', /* RN defaults to column. */
    flexGrow: 1,
    position: 'absolute' as 'absolute',
    top: 7,
    left: 0,
    right: 0,
    alignItems: 'center' as 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: FontWeight.semiBold,
    textAlign: 'center' as 'center',
  },
  exampleContainer: {
    flexDirection: 'column' as 'column', /* RN defaults to column. */
    flexGrow: 1,
    // width: { value: 100, unit: "%" as "%" },
    // height: { value: 100, unit: "%" as "%" },
  },
};

/* I think that registering all these components are only necessary for setting up
 * 'snapshot tests' which sounds like the app enters at a different entrypoint.
 * Not high on my wish-list to implement. */
// AppRegistry.registerComponent('SetPropertiesExampleApp', () =>
//   require('./examples/SetPropertiesExample/SetPropertiesExampleApp'),
// );
// AppRegistry.registerComponent('RootViewSizeFlexibilityExampleApp', () =>
//   require('./examples/RootViewSizeFlexibilityExample/RootViewSizeFlexibilityExampleApp'),
// );
// AppRegistry.registerComponent('RNTesterApp', () => RNTesterApp);

/* Register suitable examples for snapshot tests */
// RNTesterList.ComponentExamples.concat(RNTesterList.APIExamples).forEach(
//   (Example: RNTesterExample) => {
//     const ExampleModule = Example.module;
//     if (ExampleModule.displayName) {
//       class Snapshotter extends React.Component<{}> {
//         render() {
//           return (
//             <SnapshotViewIOS>
//               <RNTesterExampleContainer module={ExampleModule} />
//             </SnapshotViewIOS>
//           );
//         }
//       }

//       AppRegistry.registerComponent(
//         ExampleModule.displayName,
//         () => Snapshotter,
//       );
//     }
//   },
// );
