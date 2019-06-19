import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileImage from './ProfileImage';

import * as color from '../styles/color';

export default class ProfileSquare extends PureComponent {
  render() {
    const { profile_image, insta_id, primary_style, secondary_style, age  } = this.props;
    const {
      profileContainerStyle,
      nameTextStyle,
      tagContainerStyle,
      ageTextStyle,
      styleTextStyle,
    } = styles;
    return (
      <View style={profileContainerStyle}>
        <ProfileImage profileImage={profile_image} size={70} />
        <Text style={nameTextStyle}>{insta_id}</Text>

        <View style={tagContainerStyle}>
          <Text style={ageTextStyle}>
          {age}
          </Text>
          <Text style={styleTextStyle}>
          {primary_style}, {secondary_style}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
  },
  nameTextStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.MAIN_GRAY,
    paddingTop: '1%',
  },
  tagContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '1%',
  },
  ageTextStyle: {
    backgroundColor: color.SUPER_LIGHT_GRAY,
    color: color.MAIN_GRAY,
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  styleTextStyle: {
    paddingLeft: 5,
    color: color.MAIN_GRAY,
  },
});
