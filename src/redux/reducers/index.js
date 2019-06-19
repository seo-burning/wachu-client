import { combineReducers } from 'redux';
import * as LoggedOut from './logged_out';

export default combineReducers({
  // auth: auth ES6
  LoggedOut,
});

// Dummy BoilerPlate
// export default combineReducers({
//     auth: () => { return {} }
// })
