/**
 * https://github.com/facebook/react-native/blob/7fd08e146184432731ec5d5ba210e352690dc569/Libraries/Utilities/Platform.android.js
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { device } from "tns-core-modules/platform";

export type PlatformSelectSpec<D, I> = {
  default?: D,
  android?: I,
};

interface AndroidConstants {
  isTesting: boolean,
  reactNativeVersion: {
      major: number,
      minor: number,
      patch: number,
      prerelease?: number,
  },
  Version: number,
  Release: string,
  Serial: string,
  Fingerprint: string,
  Model: string,
  ServerHost: string,
  uiMode: string,
};

const platformConstants: AndroidConstants = {
    isTesting: false,
    reactNativeVersion: {
        major: 0,
        minor: 0,
        patch: 0,
    },
    Version: 0,
    Release: "",
    Serial: "",
    Fingerprint: "",
    Model: device.model,
    ServerHost: "",
    uiMode: "",
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
    'android' in spec ? spec.android : spec.default,
};