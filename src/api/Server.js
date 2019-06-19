import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet } from 'react-native';

const getTokenAPIURL = 'https://www.wachu.shop/api/user/token/';
const getStoreAPIURL = 'https://www.wachu.shop/api/store/stores/';

async function getTokenFromServer() {
  let options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      email: 'su.seo@burningb.com',
      password: 'sso410731',
    }),
  };
  try {
    let response = await fetch(getTokenAPIURL, options);
    let responseJson = await response.json();
    console.log(responseJson.token);
    return responseJson.token;
  } catch (error) {
    console.error('Error is : ${error}');
  }
}

async function getStoresFromServer() {
  let token = '639ebd56c75936812fe73392378f22ea28c1f4c6';
  let options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: 'token ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  try {
    let response = await fetch(getStoreAPIURL, options);
    let responseJson = await response.json();

    console.log(responseJson);
    return responseJson.data; // List of stores
  } catch (error) {
    console.error('Error is : ${error}');
  }
}

export { getStoresFromServer };
