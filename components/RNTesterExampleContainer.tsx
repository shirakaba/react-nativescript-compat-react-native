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

export default class RNTesterExampleContainer extends React.Component<
    {
        title: string,
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