import React, { Component } from 'react';
import { Asset, AppLoading } from 'expo';

import { View, Text, Image } from 'react-native';
import LogoTitle from '../components/LogoTitle';
import ProfileListSquare from '../components/ProfileListSquare';

import { Rating } from 'react-native-ratings';
import * as color from '../styles/color';
class FavoriteScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerStyle: { backgroundColor: color.MAIN_COLOR },
      headerTitle: <LogoTitle />,

      headerTintColor: color.WHITE,
      headerBackTitle: null, //https://reactnavigation.org/docs/en/stack-navigator.html#headerbackimage
    };
  };

  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }

  render() {
    return (
      <View>
        <Rating />
      </View>
    );
  }
}

export default FavoriteScreen;
