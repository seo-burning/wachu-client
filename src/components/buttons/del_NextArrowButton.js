import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

// fontawesome.com
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import * as color from '../../styles/color';

export default class NextArrowButton extends Component {
  render() {
    const { disabled, handleNextButton } = this.props;
    const opacityStyle = disabled
      ? { backgroundColor: 'rgba(255,255,255,0.2)' }
      : { backgroundColor: 'rgba(255,255,255,0.6)' };
    return (
      <View style={styles.nextButtonWrapper}>
        <TouchableHighlight
          style={[styles.button, opacityStyle]}
          onPress={handleNextButton}
          disabled={disabled}
        >
          <Icon
            name="angle-right"
            color={color.MAIN_COLOR}
            size={32}
            style={styles.icon}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

NextArrowButton.propTypes = {
  disabled: PropTypes.bool,
  handleNextButton: PropTypes.fuc,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  icon: {
    marginRight: -2,
    marginTop: -2,
  },
  nextButtonWrapper: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 20,
  },
});
