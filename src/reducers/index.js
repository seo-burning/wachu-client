import { combineReducers } from 'redux';

import auth from './auth_reducer';
import filter from './filter_reducer';
import favorite from './favorite_reducer';
import store from './store_data_reducer';

export default combineReducers({
  auth,
  filter,
  favorite,
  store,
});
