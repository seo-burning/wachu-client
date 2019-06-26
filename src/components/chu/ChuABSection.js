import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import ChuCard from './ChuCard';
import * as color from '../../styles/color';

export default class ChuABSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0,
    };
  }
  _handleSelect(key) {
    this.setState({ clicked: key });
  }
  render() {
    const {
      title,
      pick_image_a,
      pick_image_b,
      store_a,
      store_b,
      outlink_a,
      outlink_b,
    } = this.props.data;
    return (
      <View style={{ paddingVertical: 30, backgroundColor: 'white' }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '300',
            paddingLeft: 5,
            color: color.MAIN_COLOR,
          }}
        >
          Pick #
          <Text
            style={{
              fontSize: 13,
              fontWeight: '300',
              paddingLeft: 5,
              color: color.MAIN_COLOR,
            }}
          >
            19년 6월 20일
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
            paddingBottom: 20,
            paddingLeft: 5,
            color: color.MAIN_GRAY,
          }}
        >
          {title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width,
            justifyContent: 'space-around',
          }}
        >
          {this.state.clicked == 2 ? null : (
            <TouchableOpacity
              onPress={() => {
                this._handleSelect(1);
                setTimeout(() => {
                  this.props.onPressHandler();
                }, 1000);
              }}
            >
              <ChuCard
                store={store_a}
                outlink={outlink_a}
                pick_image={pick_image_a}
              />
            </TouchableOpacity>
          )}
          {this.state.clicked == 1 ? null : (
            <TouchableOpacity
              onPress={() => {
                this._handleSelect(2);
                setTimeout(() => {
                  this.props.onPressHandler();
                }, 1000);
              }}
            >
              <ChuCard
                store={store_b}
                outlink={outlink_b}
                pick_image={pick_image_b}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
