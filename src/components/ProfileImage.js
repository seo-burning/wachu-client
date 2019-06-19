import React, { PureComponent } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

import * as color from '../styles/color';
export default class ProfileImage extends PureComponent {
  render() {
    return (
      <View>
        <Image
          style={[
            {
              width: this.props.size,
              height: this.props.size,
              borderRadius: this.props.size / 2,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: color.SUPER_LIGHT_GRAY,
            },
          ]}
          source={{ uri: this.props.profileImage }}
        />
      </View>
    );
  }
}
