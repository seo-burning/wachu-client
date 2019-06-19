import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo';

import { connect } from 'react-redux';

import ImageGallery from '../components/ImageGallery';

import ProfileSquare from '../components/ProfileSquare';
import HeartButton from '../components/buttons/HeartButton';
import CustomButton from '../components/buttons/CustomButton';

import * as color from '../styles/color';
import * as actions from '../actions';
const getStoreAPIURL = 'https://www.wachu.shop/api/store/stores/';

class InfluencerDetailScreen extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.favorites.includes(
        this.props.navigation.getParam('insta_id', 'NO-insta_id'),
      )
        ? true
        : false,
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
    let insta_id = this.props.navigation.getParam('insta_id', 'NO-insta_id');
    const getPostAPIURL = getStoreAPIURL + insta_id + '/';
    fetch(getPostAPIURL, options)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          data: responseJson.map(item => ({ post_image: item.post_image })),
        });
      });
  }

  render() {
    const { navigation } = this.props;
    const insta_id = navigation.getParam('insta_id', 'NO-insta_id');
    const profile_image = navigation.getParam(
      'profile_image',
      'NO-profile_image',
    );
    const age = navigation.getParam('age', 'NO-tags');
    const primary_style = navigation.getParam('primary_style', 'NO-styles');
    const secondary_style = navigation.getParam('secondary_style', 'NO-styles');
    const facebook_url = navigation.getParam('facebook_url', 'NO-facebook_url');
    const insta_url = navigation.getParam('insta_url', 'NO-insta_url');

    const {
      container,
      headerContainerStyle,
      headerTagButtonConatinerStyle,
      headerHeartButtonConatinerStyle,
      contentContainerStyle,
      buttonConatinerStyle,
      gradientStyle,
    } = styles;

    return (
      <View style={container}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)']}
          style={gradientStyle}
        />
        <View style={headerContainerStyle}>
          <View style={headerTagButtonConatinerStyle} />
          <ProfileSquare
            profile_image={profile_image}
            insta_id={insta_id}
            age={age}
            primary_style={primary_style}
            secondary_style={secondary_style}
          />
          <View style={headerHeartButtonConatinerStyle}>
            <HeartButton
              color={color.LIGHT_GRAY}
              size={25}
              selected={this.state.isFavorite}
              selectedColor={color.MAIN_COLOR}
              togglePress={{
                on: () => this.props.addFavorite(insta_id),
                off: () => this.props.delFavorite(insta_id),
              }}
            />
          </View>
        </View>
        <View style={contentContainerStyle}>
          <ImageGallery detail_images={this.state.data} />
        </View>
        <View style={buttonConatinerStyle}>
          <CustomButton
            buttonColor={color.MAIN_COLOR}
            borderRadius={0}
            title={'Instagram'}
            onPress={() => {
              this.props.navigation.navigate('Outlink', {
                outlink: insta_url,
              });
            }}
          />
          <View style={{ width: '1%' }} />
          <CustomButton
            buttonColor={color.FACEBOOK}
            borderRadius={0}
            title={'Facebook'}
            onPress={() => {
              this.props.navigation.navigate('Outlink', {
                outlink: facebook_url,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps({ favorite }) {
  return {
    favorites: favorite.favorites,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(InfluencerDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingBottom: '3%',
  },
  headerTagButtonConatinerStyle: {
    width: '10%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerHeartButtonConatinerStyle: {
    width: '10%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.SUPER_LIGHT_GRAY,
    zIndex: 1,
  },
  buttonConatinerStyle: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    height: '10%',
    zIndex: 10,
    paddingRight: '10%',
    paddingLeft: '10%',
  },
  gradientStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '10%',
    zIndex: 5,
  },
});
