import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import ProductListScreen from '../screens/ProductListScreen';

import SocialAuthScreen from '../screens/auth/SocialAuthScreen';
import EmailLoginScreen from '../screens/auth/EmailLoginScreen';
import EmailSignUpScreen from '../screens/auth/EmailSignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

import InfluencerListScreen from '../screens/InfluencerListScreen';
import InfluencerDetailScreen from '../screens/InfluencerDetailScreen';
import OutlinkScreen from '../screens/OutlinkScreen';

import ChuPickScreen from '../screens/ChuPickScreen';
import MyPageScreen from '../screens/profile/MyPageScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

import FilterModalScreen from '../screens/FilterModalScreen';
import SearchScreen from '../screens/SearchScreen';

import LogoTitle from '../components/LogoTitle';
import * as color from '../styles/color';

const ProductNavigation = createStackNavigator({
  ProductList: {
    screen: ProductListScreen,
  },
  InfluencerDetail: {
    screen: InfluencerDetailScreen,
  },
  Outlink: {
    screen: OutlinkScreen,
  },
});
ProductNavigation.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Outlink') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const RankingNavigation = createStackNavigator(
  {
    InfluencerList: {
      screen: InfluencerListScreen,
    },
    InfluencerDetail: {
      screen: InfluencerDetailScreen,
    },
    Outlink: {
      screen: OutlinkScreen,
    },
    FilterModal: {
      screen: FilterModalScreen,
      mode: 'modal',
    },
    Search: {
      screen: SearchScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

RankingNavigation.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'FilterModal') {
        tabBarVisible = false;
      } else if (route.routeName === 'Search') {
        tabBarVisible = false;
      } else if (route.routeName === 'Outlink') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const ProfileNavigation = createStackNavigator(
  {
    mypage: {
      screen: MyPageScreen,
    },
    setting: {
      screen: SettingsScreen,
    },
    FavoriteInfluencerDetail: {
      screen: InfluencerDetailScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const ChupickNavigation = createStackNavigator(
  {
    favorite: {
      screen: ChuPickScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const MainNavigator = createBottomTabNavigator(
  {
    product: {
      screen: ProductNavigation,
      navigationOptions: {
        tabBarLabel: 'Product',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-search" size={24} style={{ color: tintColor }} />
        ),
      },
    },
    ranking: {
      screen: RankingNavigation,
      navigationOptions: {
        tabBarLabel: 'Rank',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-home" size={24} style={{ color: tintColor }} />
        ),
      },
    },
    chupick: {
      screen: ChupickNavigation,
      navigationOptions: {
        title: 'Favorite',
        tabBarLabel: 'Pick',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-heart" size={24} style={{ color: tintColor }} />
        ),
      },
    },
    profile: {
      screen: ProfileNavigation,
      navigationOptions: {
        tabBarLabel: 'MY',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-person" size={24} style={{ color: tintColor }} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: color.MAIN_COLOR,
      inactiveTintColor: color.LIGHT_GRAY,
      style: { backgroundColor: 'white' },
    },
  },
);

const AuthNavigator = createStackNavigator({
  socialAuth: SocialAuthScreen,
  emaiLogin: EmailLoginScreen,
  emaiSignUp: EmailSignUpScreen,
  forgotPassword: ForgotPasswordScreen,
});

const AppNavigator = createSwitchNavigator({
  // auth: AuthNavigator,
  main: MainNavigator,
});
export default createAppContainer(AppNavigator);
