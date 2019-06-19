import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class CustomButton extends PureComponent {
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#000',
    titleColor: '#fff',
    onPress: () => null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: this.props.buttonColor,
            borderRadius: this.props.borderRadius,
          },
        ]}
        onPress={this.props.onPress}
      >
        {this.props.icon}
        <Text style={[styles.title, { color: this.props.titleColor }]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
  },
});
