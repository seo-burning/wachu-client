import React, { Component } from 'react';
import { WebView } from 'react-native';

import WebViewPage from '../components/WebViewPage';

export default class OutlinkScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: null,
      headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
      },
      headerTintColor: '#000000',
      headerTitleStyle: 'bold',
      // gesturesEnabled: false,
    };
  };
  render() {
    const { navigation } = this.props;
    const outlink = navigation.getParam('outlink', 'NO-name');
    return <WebViewPage source={{ uri: outlink }} />;
  }
}
