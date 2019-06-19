import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import { getFacebookTokenAPIURL } from '../api';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

// How to use AsyncStorage:     <====
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token);
// Local Physical Device과의 호출이기 때문에 return "promises"
// We have to wait for actual data from promises
// https://velog.io/@rohkorea86/Promiseis-%EB%B9%84%EB%8F%99%EA%B8%B0%EB%8F%99%EA%B8%B0%EC%97%90%EC%84%9C-Promise%EA%B9%8C%EC%A7%80

export const facebookLogin = () => async dispatch => {
  AsyncStorage.clear();
  const token = await AsyncStorage.getItem('fb_token');
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB Login process
    console.log('do facebook login');
    _doFacebookLogin(dispatch);
  }
};

export const _doFacebookLogin = async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '814031062293477',
    {
      permissions: [
        'public_profile',
        'email',
        'user_gender',
        'user_age_range',
        // 'picture',
      ],
      // other permissions can be found in expo api or facebook dev documents
    },
  );
  console.log(type);
  console.log('first token');
  console.log(token);

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  // REACT NATIVE > FACEBOOK > REACT NATIVE TOKEN
  let options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      access_token: token,
    }),
  };

  // REACT NATIVE TOKEN > SERVER > SERVER TOKEN
  fetch(getFacebookTokenAPIURL, options)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);

      AsyncStorage.setItem('fb_token', responseJson.key);
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: responseJson.key });
    })
    .catch(dispatch({ type: FACEBOOK_LOGIN_FAIL }));
};
// TODO Fetch Error 처리를 해야하는데
