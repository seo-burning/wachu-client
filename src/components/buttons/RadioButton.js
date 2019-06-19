import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

import * as colors from '../../styles/color';

export default class RadioButton extends PureComponent {
  static defaultProps = {
    text: 'untextd',
    inactiveColor: colors.SUPER_LIGHT_GRAY,
    activeColor: 'blue',
    inactiveTextColor: colors.MAIN_GRAY,
    activeTextColor: colors.WHITE,
    selected: false,
    onPress: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isClicked: this.props.selected,
    };
    this.select = this.select.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selected !== state.isClicked) {
      return {
        isClicked: props.selected,
      };
    }
    return null;
  }

  select() {
    this.setState({ isClicked: !this.state.isClicked }, () => {
      this.props.onPress();
    });
  }

  render() {
    const { isClicked } = this.state;
    const {
      text,
      inactiveColor,
      activeColor,
      activeTextColor,
      inactiveTextColor,
      onPress,
    } = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isClicked ? activeColor : inactiveColor,
          },
        ]}
        onPress={() => {
          onPress;
          this.select();
        }}
      >
        <Text
          style={[
            styles.text,
            {
              color: isClicked ? activeTextColor : inactiveTextColor,
            },
          ]}
        >
          {text}
          {/* {this.state.isClicked ? 'Clicked' : 'Not Clicked'} */}
        </Text>
      </TouchableOpacity>
    );
  }
}

RadioButton.propTypes = {
  text: PropTypes.string,
  inactiveColor: PropTypes.string,
  activeColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingVertical: 6,
    marginHorizontal: '1%',
    borderRadius: 10,
    width: '23%',
  },
  text: {
    fontSize: 15,
  },
});
