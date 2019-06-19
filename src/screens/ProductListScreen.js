import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import LogoTitle from '../components/LogoTitle';
import ProductGallery from '../components/ProductGallery';
import ProductSectionGallery from '../components/ProductSectionGallery';
import * as color from '../styles/color';

const getSlidingBannerSectionAPIURL =
  'http://www.wachu.shop/api/product/sliding-banner-section/';
const getMainSectionAPIURL = 'http://www.wachu.shop/api/product/main-section/';

class ProductListScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerStyle: { backgroundColor: color.MAIN_COLOR },
      headerTitle: <LogoTitle />,

      headerTintColor: color.WHITE,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      slidingBannerTitle: { head: '', keyword: '', foot: '' },
      slidingBannerData: [],
      mainSectionData: [],
    };
  }
  componentDidMount() {
    let token = '041cfee27b7087f32d140d2195cfbfca550237a2';
    let options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'token ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    fetch(getMainSectionAPIURL, options)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          mainSectionData: responseJson[0].main_banner_post_set,
        });
      });
    fetch(getSlidingBannerSectionAPIURL, options)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          slidingBannerData: responseJson[0].sliding_banner_post_set,
          slidingBannerTitle: {
            head: responseJson[0].title_head,
            key: responseJson[0].title_colored_keyword,
            foot: responseJson[0].title_foot,
          },
        });
      });
  }

  render() {
    const { container, contentContainer } = styles;

    return (
      <ScrollView style={container}>
        <ProductSectionGallery
          title={this.state.slidingBannerTitle}
          detail_images={this.state.slidingBannerData}
          navigation={this.props.navigation}
        />
        <View style={contentContainer}>
          <ProductGallery
            detail_images={this.state.mainSectionData}
            navigation={this.props.navigation}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  highlightText: {
    color: color.MAIN_COLOR,
  },
});

export default ProductListScreen;
