import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import ImageElement from '../ImageElement';
import ProfileImage from '../ProfileImage';
import CustomButton from '../buttons/CustomButton';
import * as color from '../../styles/color';

export default class ChuCard extends Component {
  render() {
    const { store, outlink, pick_image } = this.props;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: Dimensions.get('window').width / 2.1,
            height: Dimensions.get('window').height / 2,
            paddingBottom: 10,
          }}
        >
          <ImageElement imgsource={pick_image} style={{ borderRadius: 5 }} />
        </View>
        {store ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ProfileImage profileImage={store.profile_image} size={30} />
            <Text style={{ color: color.MAIN_GRAY }}>{store.insta_id}</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              height: 30,
            }}
          >
            <CustomButton
              title="Link"
              buttonColor={color.MAIN_COLOR}
              onPress={() => {}}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
  },
});
