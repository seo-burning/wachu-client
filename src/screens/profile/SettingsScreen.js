import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: null,
      headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
      },

      headerTintColor: '#000000',
      headerTitleStyle: 'bold',
    };
  };

  render() {
    return (
      <View>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
        <Text> This is SettingScreen </Text>
      </View>
    );
  }
}

export default SettingsScreen;
