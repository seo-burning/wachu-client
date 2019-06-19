import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class TextButton extends Component {
  render() {
    const {
      text,
      textColor,
      textSize,
      handleOnPress,
      textWeight,
      customStyle,
    } = this.props;
    const color = textColor || colors.black;
    const fontSize = textSize || 12;
    const fontWeight = textWeight || '300';
    const { wrapper } = styles;
    return (
      <TouchableOpacity onPress={handleOnPress}>
        <View style={[wrapper, customStyle]}>
          <Text style={[{ color, fontSize, fontWeight }]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  textWeight: PropTypes.string,
  textSize: PropTypes.number,
  handleOnPress: PropTypes.func.isRequired,
  customStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
});
