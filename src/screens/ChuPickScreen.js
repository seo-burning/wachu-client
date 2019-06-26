import React, { Component } from 'react';

import { View, Text } from 'react-native';
import LogoTitle from '../components/LogoTitle';

import * as color from '../styles/color';
import ChuABSection from '../components/chu/ChuABSection';

const getChuAPIURL = 'https://www.wachu.shop/api/chu/chu-pick-set/';

class ChuPickScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerStyle: { backgroundColor: color.MAIN_COLOR },
      headerTitle: <LogoTitle />,

      headerTintColor: color.WHITE,
      headerBackTitle: null, //https://reactnavigation.org/docs/en/stack-navigator.html#headerbackimage
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      full_data: [],
      error: null,
      query: '',
      index: 0,
    };
  }

  componentDidMount() {
    let token = '041cfee27b7087f32d140d2195cfbfca550237a2';
    let options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'token ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    fetch(getChuAPIURL, options)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          data: responseJson[0].chu_pick_AB_set,
        });
      });
  }

  renderCards() {
    return this.state.data
      .map((item, index) => {
        if (this.state.index > index) {
          return null;
        } else {
          return (
            <View key={index} style={{ position: 'absolute' }}>
              <ChuABSection
                data={item}
                onPressHandler={() => {
                  this.setState({ index: this.state.index + 1 });
                }}
              />
            </View>
          );
        }
      })
      .reverse();
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

export default ChuPickScreen;
