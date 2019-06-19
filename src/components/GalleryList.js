import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
} from 'react-native';

import ImageElement from './ImageElement';

export default class ImageGallery extends PureComponent {
  state = {
    modalVisible: false,
    modalImage: { uri: this.props.detail_images[0] },
  };

  setModalVisible(visible, imageKey) {
    this.setState({ modalImage: this.props.detail_images[imageKey] });
    this.setState({ modalVisible: visible });
  }

  getImage() {
    return this.state.modalImage;
  }

  render() {
    const images = this.props.detail_images.map((val, key) => {
      return (
        <TouchableWithoutFeedback
          key={key}
          onPress={() => {
            this.setModalVisible(true, key);
          }}
        >
          <View style={styles.imageWrapStyle}>
            <ImageElement imgsource={val} />
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <ScrollView>
        <View style={styles.container}>
          <Modal
            style={styles.modal}
            animationType="fade"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modal}>
              <Text
                style={styles.text}
                onPress={() => {
                  this.setModalVisible(false);
                }}
              >
                X
              </Text>
              <ImageElement imgsource={this.state.modalImage} />
            </View>
          </Modal>
          {images}
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
    paddingTop: '2%',
  },
  imageWrapStyle: {
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingTop: '1%',
    paddingBottom: '1%',

    height: Dimensions.get('window').height / 5,
    width: '30%',
    // backgroundColor: "#000000"
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: '2%',
  },
});
