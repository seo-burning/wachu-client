import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import LogoTitle from '../../components/LogoTitle';
import IconButton from '../../components/buttons/IconButton';

import GalleryList from '../../components/GalleryList';

import ProfileSquare from '../../components/ProfileSquare';
import MyFavoriteTabScreen from './MyFavoriteTabScreen';
import MyFavoriteProductTabScreen from './MyFavoriteProductTabScreen';

import * as color from '../../styles/color';

// TODO Profile Section Scroll Reference
// https://stackoverflow.com/questions/54693590/tabs-with-flatlists-inside-scrollview-like-instagram-or-twitter-profile-pages
// https://snack.expo.io/@satya164/collapsible-header-with-tabview  // https://github.com/react-native-community/react-native-tab-view/issues/735
// https://github.com/react-native-community/react-native-tab-view

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
        { key: 'store', title: 'store' },
        { key: 'product', title: 'product' },
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
      case 'favoriteProduct':
        return (
          <MyFavoriteProductTabScreen navigation={this.props.navigation} />
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
