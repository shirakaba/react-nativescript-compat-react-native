/**
 * https://github.com/facebook/react-native/blob/7fd08e146184432731ec5d5ba210e352690dc569/Libraries/Utilities/Platform.ios.js
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import NativePlatformConstantsIOS from './NativePlatformConstantsIOS';
import { isIOS, isAndroid, device } from "tns-core-modules/platform";

export type PlatformSelectSpec<D, I> = {
  default?: D,
  ios?: I,
};

interface IosConstants {
    isTesting: boolean,
    reactNativeVersion: {
        major: number,
        minor: number,
        patch: number,
        prerelease?: number,
    },
    forceTouchAvailable: boolean,
    osVersion: string,
    systemName: string,
    interfaceIdiom: "Phone" | "Tablet",
};

const platformConstants: IosConstants = {
    isTesting: false,
    reactNativeVersion: {
        major: 0,
        minor: 0,
        patch: 0,
    },
    forceTouchAvailable: false,
    osVersion: device.osVersion,
    systemName: device.os,
    interfaceIdiom: device.deviceType,
};

declare const __DEV__: boolean;
export const Platform = {
  OS: 'ios',
  get Version() {
    return device.osVersion;
  },
  get constants() {
    return platformConstants;
  },
  get isPad() {
    return platformConstants.interfaceIdiom === 'Tablet';
  },
  /**
   * Deprecated, use `isTV` instead.
   */
  get isTVOS() {
    return Platform.isTV;
  },
  get isTV() {
    return false;
  },
  get isTesting(): boolean {
    if (__DEV__) {
      return platformConstants.isTesting;
    }
    return false;
  },
  select: <D, I>(spec: PlatformSelectSpec<D, I>): D | I =>
    'ios' in spec ? spec.ios : spec.default,
};