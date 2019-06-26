import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';

import ImageElement from './ImageElement';

export default class ImageGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getImage() {
    return this.state.modalImage;
  }
  _renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        this.props.navigation.navigate('Outlink', {
          outlink: item.post_url,
        });
      }}
    >
      <View style={styles.imageWrapStyle}>
        <ImageElement imgsource={item.post_image} style={{ borderRadius: 5 }} />
      </View>
    </TouchableWithoutFeedback>
  );

  _keyExtractor = (item, index) => item.post_image;

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            style={{ paddingBottom: 60 }}
            data={this.props.detail_images}
            renderItem={this._renderItem}
            numColumns={3}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
    paddingHorizontal: '3%',
  },
  imageWrapStyle: {
    paddingHorizontal: '0.5%',
    paddingVertical: '1%',
    height: Dimensions.get('window').height / 5,
    width: '33.333333333333%', //수정 필요.
  },
  text: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: '2%',
  },
});
