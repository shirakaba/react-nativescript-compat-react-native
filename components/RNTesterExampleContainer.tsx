/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react";
import { device, Device } from "tns-core-modules/platform/platform";
import RNTesterExampleFilter from "./RNTesterExampleFilter";
import RNTesterBlock from "./RNTesterBlock";
import RNTesterPage from "./RNTesterPage";
import { RCTFlexboxLayout, RCTScrollView } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import RNTesterTitle from "./RNTesterTitle";

export default class RNTesterExampleContainer extends React.Component<
    {
        title?: string,
        module: {
            examples: any[]
        }
    }
> {
  renderExample(
      example: { title: string, description: string, platform: string, render: any },
      i: number
    ) {
    // Filter platform-specific examples
    const {description, platform} = example;
    let { title } = example;
    
    if (platform) {
      if (device.os !== platform) {
        return null;
      }
      title += ' (' + platform + ' only)';
    }
    return (
      <RNTesterBlock key={i} title={title} description={description}>
        {example.render()}
      </RNTesterBlock>
    );
  }

  render(): React.ReactElement<any> {
    console.log(`[RNTesterExampleContainer] render(). module.examples length was ${this.props.module.examples.length}.`);

    
    if (this.props.module.examples.length === 1) {
      return (
        <RNTesterPage title={this.props.title}>
          {this.renderExample(this.props.module.examples[0], 0)}
        </RNTesterPage>
      );
    }
    
    const filter = ({example, filterRegex}) => filterRegex.test(example.title);
    
    const sections = [
      {
        data: this.props.module.examples,
        title: 'EXAMPLES',
        key: 'e',
      },
    ];
    
    /* This is effectively what is being returned */
    // return (
    //   <RCTFlexboxLayout backgroundColor={new Color("green")} flexDirection={"column"} flexGrow={1}>
    //     <RNTesterTitle title={"stand-in"} />
    //     <RCTScrollView backgroundColor={new Color("red")}>
    //       <RCTFlexboxLayout backgroundColor={new Color("orange")} flexDirection={"column"} flexGrow={1} paddingTop={10}>
    //         <RNTesterExampleFilter
    //           testID="example_search"
    //           sections={sections}
    //           filter={filter}
    //           render={({filteredSections}) =>
    //             filteredSections[0].data.map(this.renderExample)
    //           }
    //         />
    //         <RCTFlexboxLayout flexDirection={"column"} height={{ value: 270, unit: "px" as "px" }} />
    //       </RCTFlexboxLayout>
    //     </RCTScrollView>
    //   </RCTFlexboxLayout>
    // );

    return (
      <RNTesterPage title={this.props.title}>
        <RNTesterExampleFilter
          testID="example_search"
          sections={sections}
          filter={filter}
          render={({filteredSections}) =>
            filteredSections[0].data.map(this.renderExample)
          }
        />
      </RNTesterPage>
    );
  }
}