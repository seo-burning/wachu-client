import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import LogoTitle from '../../components/LogoTitle';
import IconButton from '../../components/buttons/IconButton';

import GalleryList from '../../components/GalleryList';

import ProfileSquare from '../../components/ProfileSquare';
import MyFavoriteTabScreen from './MyFavoriteTabScreen';
import * as color from '../../styles/color';

// TODO Profile Section Scroll Reference
// https://stackoverflow.com/questions/54693590/tabs-with-flatlists-inside-scrollview-like-instagram-or-twitter-profile-pages
// https://snack.expo.io/@satya164/collapsible-header-with-tabview  // https://github.com/react-native-community/react-native-tab-view/issues/735
// https://github.com/react-native-community/react-native-tab-view

// TODO STAR RATING 모듈 쓰지 말고 새로 만들기 (너무 느림)
// TODO chu pick 위치에 필터 기능 넣기
const PICK_SAMPLE = [
  'https://scontent-icn1-1.cdninstagram.com/vp/29a73bd540aa21121dec26f34fa9e408/5D0C0194/t51.2885-15/e35/53034690_417206202349683_4617061372575683855_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/47ccb0f95655b210c25e20fe9d6133c4/5D27AD75/t51.2885-15/e35/52674618_389500268309212_8963132533735932701_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/a0d31cc6f78c39d8f2a66468318b351e/5D1CE269/t51.2885-15/e35/53058123_1267092183415735_900491892833202587_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/1a4aec637cd8272f7a71463c6c2143c0/5D222555/t51.2885-15/e35/52821525_144697239890094_6673751613686678446_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/6cea44f4981e92b859391b7d5ad3832e/5D0F53BE/t51.2885-15/e35/52544940_332444280711655_3168104246918629409_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/6a7d7c17ae0087bc7f2a02e16622daa3/5D021149/t51.2885-15/e35/51480010_295086514504222_2531320985995767564_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/29a73bd540aa21121dec26f34fa9e408/5D0C0194/t51.2885-15/e35/53034690_417206202349683_4617061372575683855_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/47ccb0f95655b210c25e20fe9d6133c4/5D27AD75/t51.2885-15/e35/52674618_389500268309212_8963132533735932701_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/a0d31cc6f78c39d8f2a66468318b351e/5D1CE269/t51.2885-15/e35/53058123_1267092183415735_900491892833202587_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/1a4aec637cd8272f7a71463c6c2143c0/5D222555/t51.2885-15/e35/52821525_144697239890094_6673751613686678446_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/6cea44f4981e92b859391b7d5ad3832e/5D0F53BE/t51.2885-15/e35/52544940_332444280711655_3168104246918629409_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
  'https://scontent-icn1-1.cdninstagram.com/vp/6a7d7c17ae0087bc7f2a02e16622daa3/5D021149/t51.2885-15/e35/51480010_295086514504222_2531320985995767564_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
];

const MyFavoriteRoute = navigation => (
  <MyFavoriteTabScreen navigation={navigation} />
);
const MyPickRoute = () => (
  <View>
    <View style={{ height: 40, backgroundColor: color.MAIN_GRAY }} />
    <GalleryList detail_images={PICK_SAMPLE} />
  </View>
);

class MyPageScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerStyle: { backgroundColor: color.MAIN_COLOR },
      headerTitle: <LogoTitle />,
      headerRight: <IconButton icon={'ellipsis-h'} />,
      headerTintColor: color.WHITE,
      headerBackTitle: null, //https://reactnavigation.org/docs/en/stack-navigator.html#headerbackimage
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'favorite', title: 'Favorite' },
        { key: 'pick', title: 'Pick' },
      ],
    };
  }
  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'favorite':
        return (
          <MyFavoriteTabScreen
            navigation={this.props.navigation}
            test={'haha'}
          />
        );
      case 'pick':
        return (
          <View>
            <View style={{ height: 40, backgroundColor: color.MAIN_GRAY }} />
            <GalleryList detail_images={PICK_SAMPLE} />
          </View>
        );
      default:
        return null;
    }
  };
  render() {
    const { container, headerContainerStyle, contentContainerStyle } = styles;
    return (
      <View style={container}>
        <View style={headerContainerStyle}>
          <ProfileSquare
            profile_image={
              'https://scontent-icn1-1.cdninstagram.com/vp/6c187ab7b48de52e462dfb60de5715bd/5D165F9A/t51.2885-19/s320x320/35534220_237404993520628_8967587308240896000_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com'
            }
            insta_id="Test User"
            age={['20s']}
            primary_style={['Chic']}
            secondary_style={['Simple']}
          />
        </View>
        <View style={contentContainerStyle}>
          <TabView
            navigationState={this.state}
            // renderScene={SceneMap({
            //   favorite: MyFavoriteRoute,
            //   pick: MyPickRoute,
            // })}
            renderScene={this._renderScene}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: color.MAIN_COLOR }}
                style={{ backgroundColor: color.WHITE }}
                activeColor={color.MAIN_COLOR}
                inactiveColor={color.MAIN_GRAY}
              />
            )}
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

export default connect(mapStateToProps)(MyPageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
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
  profileContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
  },
  contentContainerStyle: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  tabButtonStyle: {
    borderBottomWidth: 1,
    // borderBottomColor: color.SUPER_LIGHT_GRAY,
  },
});
