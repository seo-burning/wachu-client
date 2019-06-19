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

import * as color from '../styles/color';

import ProfileListSquare from './ProfileListSquare';
import ImageElement from './ImageElement';
export default class ProductGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalImage: '',
    };
  }

  setModalVisible(visible, image_uri) {
    this.setState({ modalVisible: visible });
    this.setState({ modalImage: image_uri });
  }

  _renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        this.setModalVisible(true, item);
      }}
    >
      <View style={styles.imageWrapStyle}>
        <ImageElement imgsource={item.post_image} style={{ borderRadius: 5 }} />
        <Text style={contentStyle.nameStyle}>{item.name}</Text>
        <View style={styles.tagContainerStyle}>
          <Text style={contentStyle.firstTagStyle}>{item.store.age}</Text>
          <Text style={contentStyle.secondTagStyle}>
            {item.store.primary_style}, {item.store.secondary_style}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  _keyExtractor = (item, index) => item.post_image;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Modal
            animationType="fade"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modal}>
              <Text
                style={styles.text}
                onPress={() => {
                  this.setModalVisible(false, this.state.modalImage);
                }}
              >
                X
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: color.WHITE,
                  backgroundColor: color.WHITE,
                  alignItems: 'center',
                  overflow: 'hidden',
                  borderTopStartRadius: 5,
                  borderTopEndRadius: 5,
                }}
              >
                <ProfileListSquare
                  data={this.state.modalImage.store}
                  onPressHandler={() => {
                    this.props.navigation.navigate('InfluencerDetail', {
                      profile_image: this.state.modalImage.store.profile_image,
                      insta_id: this.state.modalImage.store.insta_id,
                      age: this.state.modalImage.store.age,
                      primary_style: this.state.modalImage.store.primary_style,
                      secondary_style: this.state.modalImage.store
                        .secondary_style,
                      facebook_url: this.state.modalImage.store.facebook_url,
                      insta_url: this.state.modalImage.store.insta_url,
                    });
                    this.setModalVisible(false, this.state.modalImage);
                  }}
                />
              </View>
              <ImageElement
                imgsource={this.state.modalImage.post_image}
                style={{
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              />
            </View>
          </Modal>
          <FlatList
            style={{ paddingBottom: 60 }}
            data={this.props.detail_images}
            renderItem={this._renderItem}
            numColumns={3}
            keyExtractor={this._keyExtractor}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapStyle: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    height: Dimensions.get('window').height / 3,
    width: '50%', //수정 필요.
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  text: {
    color: color.MAIN_GRAY,
    fontSize: 30,
    paddingBottom: '2%',
  },
  textContainerStyle: {
    paddingLeft: '8%',
  },
  tagContainerStyle: {
    paddingTop: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const contentStyle = StyleSheet.create({
  nameStyle: {
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 6,
    color: color.MAIN_GRAY,
  },
  firstTagStyle: {
    fontSize: 10,
    backgroundColor: color.SUPER_LIGHT_GRAY,
    color: color.LIGHT_GRAY,
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  secondTagStyle: { fontSize: 10, paddingLeft: 5, color: color.LIGHT_GRAY },
});
