import React, { PureComponent } from 'react';
import { StyleSheet, Image, View } from 'react-native';

export default class ImageElement extends PureComponent {
  render() {
    return (
      <View style={[{ flex: 1, overflow: 'hidden' }, this.props.style]}>
        <Image
          source={{ uri: this.props.imgsource }}
          style={[styles.imageStyle, this.props.style]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
  },
});
