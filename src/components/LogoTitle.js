import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class LogoTitle extends PureComponent {
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo-white.png')}
          style={styles.logoStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoStyle: {
    width: 325,
    height: 16,
    resizeMode: 'contain',
  },
});
