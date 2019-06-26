import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as color from '../../styles/color';

export default class RoundedButton extends Component {
  render() {
    const { text, textColor, background, icon, handleOnPress } = this.props;
    const backgroundColor = background || 'transparent';
    const color = textColor || 'black';
    return (
      <TouchableOpacity
        style={[{ backgroundColor }, styles.iosWrapper]}
        onPress={handleOnPress}
      >
        <View style={styles.buttonTextWrapper}>
          {icon}
          <Text style={[{ color }, styles.buttonText]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

RoundedButton.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  background: PropTypes.string,
  icon: PropTypes.object,
  handleOnPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  iosWrapper: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.WHITE,
    marginBottom: 15,
    alignItems: 'center',
  },
  androidWrapper: {
    overflow: 'hidden',
    borderRadius: 40,
    borderWidth: 1,
    marginBottom: 15,
  },
  androidButtonText: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    padding: 12,
    paddingBottom: 12,
    alignItems: 'center',
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
  loaderContainer: {
    width: 90,
    height: 90,
    borderRadius: 15,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -45,
    marginTop: -45,
  },
  loaderImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    position: 'absolute',
    left: '50%',
    marginLeft: -20,
    top: '50%',
    marginTop: -20,
  },
});
