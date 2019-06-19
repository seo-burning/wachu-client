import { NavigationActions } from 'react-navigation';
import { StatusBar } from 'react-native';
import createReducer from '../helpers/createReducer';
import { AppNavigator } from '../../navigators/AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('auth');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export const nav = (state = initialNavState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // if (action.routeName === 'LoggedIn') {
  //   StatusBar.setBarStyle('dark-content', true);
  // }

  return nextState || state;
};
