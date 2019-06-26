import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import {
  StyleSheet,
  Modal,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  FlatList,
} from 'react-native';

import * as color from '../styles/color';
import ProfileListSquare from './ProfileListSquare';
import ImageElement from './ImageElement';

import HeartButton from '../components/buttons/HeartButton';
import * as actions from '../actions';

class ProductSectionGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalImage: '',
    };
  }
  setModalVisible(visible, image_uri) {
    this.setState({ modalImage: image_uri });
    this.setState({ modalVisible: visible });
  }

  _renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        this.setModalVisible(true, item);
      }}
    >
      <View style={styles.imageWrapStyle}>
        <Text>{item.post_url}</Text>

        <ImageElement imgsource={item.post_image} style={{ borderRadius: 5 }} />
      </View>
    </TouchableWithoutFeedback>
  );

  _keyExtractor = (item, index) => item.post_image;

  render() {
    const { container, sectionContainer, sectionTitleContainer } = styles;
    const { highlightText } = styles;
    const { title } = this.props;
    return (
      <View style={{ flex: 1 }}>
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
                  onLeft={
                    <View style={{ backgroundColor: 'red' }}>
                      <HeartButton
                        color={color.LIGHT_GRAY}
                        size={25}
                        selected={this.state.isFavorite}
                        selectedColor={color.MAIN_COLOR}
                        togglePress={{
                          on: () => this.props.addFavoriteProduct(insta_id),
                          off: () => this.props.delFavoriteProduct(insta_id),
                        }}
                      />
                      <Text>111</Text>
                    </View>
                  }
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
          <View style={sectionTitleContainer}>
            <Text>
              {title.head}
              <Text style={highlightText}> {title.key} </Text>
              {title.foot}
            </Text>
          </View>
          <View style={sectionContainer}>
            <FlatList
              data={this.props.detail_images}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ favorite }) {
  return {
    favoritesProduct: favorite.favoritesProdoct,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(ProductSectionGallery);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '3%',
  },
  imageWrapStyle: {
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    height: Dimensions.get('window').width / 3.5,
    width: Dimensions.get('window').width / 3.5,
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
  sectionTitleContainer: {
    paddingTop: 15,
  },
  sectionContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  highlightText: {
    color: color.MAIN_COLOR,
  },
});
