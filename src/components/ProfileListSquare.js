import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import * as color from '../styles/color';
import ProfileImage from './ProfileImage';

export default class ProfileListSquare extends PureComponent {
  render() {
    const {
      listContainterStyle,
      contentContainerStyle,
      textContainerStyle,
      tagContainerStyle,
      RightContainerStyle,
    } = conatinerStyles;
    const { nameStyle, firstTagStyle, secondTagStyle } = contentStyle;
    const { data, onPressHandler, onLeft, onRight } = this.props;
    const {
      profile_image,
      insta_id,
      primary_style,
      secondary_style,
      age,
    } = data;

    return (
      <TouchableOpacity onPress={onPressHandler}>
        <View style={listContainterStyle}>
          {onLeft}
          <View style={contentContainerStyle}>
            <ProfileImage profileImage={profile_image} size={40} />
            <View style={textContainerStyle}>
              <Text style={nameStyle}>{insta_id}</Text>
              <View style={tagContainerStyle}>
                <Text style={firstTagStyle}>{age}</Text>
                <Text style={secondTagStyle}>
                  {primary_style}, {secondary_style}
                </Text>
              </View>
            </View>
          </View>
          <View style={RightContainerStyle}>{onRight}</View>
        </View>
      </TouchableOpacity>
    );
  }
}

const conatinerStyles = StyleSheet.create({
  listContainterStyle: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: color.SUPER_LIGHT_GRAY,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    padding: 12,
    flexWrap: 'wrap',
  },
  contentContainerStyle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  textContainerStyle: {
    paddingLeft: '8%',
  },
  tagContainerStyle: {
    paddingTop: '2%',
    flexDirection: 'row',
  },
  RightContainerStyle: {
    right: 0,
    position: 'absolute',
  },
});

const contentStyle = StyleSheet.create({
  nameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.MAIN_GRAY,
  },
  firstTagStyle: {
    backgroundColor: color.SUPER_LIGHT_GRAY,
    color: color.MAIN_GRAY,
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  secondTagStyle: {
    paddingLeft: 5,
    color: color.MAIN_GRAY,
  },
});
