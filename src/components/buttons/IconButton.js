import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight, StyleSheet, View } from 'react-native';
import * as color from '../../styles/color';

export default class NextArrowButton extends PureComponent {
  render() {
    const { disabled, onPressHandler, icon, iconColor } = this.props;

    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          style={styles.button}
          onPress={onPressHandler}
          disabled={disabled}
          underlayColor="transparent"
        >
          <Icon
            name={icon}
            color={iconColor || color.WHITE}
            size={20}
            style={styles.icon}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

NextArrowButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onPressHandler: PropTypes.func,
  iconColor: PropTypes.string,
};

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
    paddingLeft: 15,
  },
  icon: {},
});
