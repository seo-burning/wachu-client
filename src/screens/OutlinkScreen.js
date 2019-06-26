import React, { Component } from 'react';
import { WebView } from 'react-native';

import WebViewPage from '../components/WebViewPage';
import IconButton from '../components/buttons/IconButton';

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
      headerRight: (
        <View>
          <IconButton
            icon={'shopping-bag'}
            onPressHandler={() => {
              navigation.navigate('Search');
            }}
            iconColor={'black'}
          />
        </View>
      ),
    };
  };
  render() {
    const { navigation } = this.props;
    const outlink = navigation.getParam('outlink', 'NO-name');
    return <WebViewPage source={{ uri: outlink }} />;
  }
}
