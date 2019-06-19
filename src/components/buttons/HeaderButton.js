import React, { PureComponent } from 'react';
import { Button, View, StyleSheet } from 'react-native';

import * as color from '../../styles/color';

export default class HeaderButton extends PureComponent {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          onPress={this.props.onPressHandler}
          title={this.props.title}
          color={color.BLACK}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
});
