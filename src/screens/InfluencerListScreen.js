import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../actions';

import IconButton from '../components/buttons/IconButton';
import LogoTitle from '../components/LogoTitle';
import * as color from '../styles/color';

import RankingList from '../components/RankingList';

const getStoreAPIURL = 'https://www.wachu.shop/api/store/stores/';

class InfluencerListScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerStyle: { backgroundColor: color.MAIN_COLOR },
      headerTitle: <LogoTitle />,

      headerTintColor: color.WHITE,
      headerLeft: (
        <IconButton
          icon={'filter'}
          onPressHandler={() => {
            navigation.navigate('FilterModal');
          }}
        />
      ),
      headerRight: (
        <IconButton
          icon={'search'}
          onPressHandler={() => {
            navigation.navigate('Search');
          }}
        />
      ),
      headerBackTitle: null, //https://reactnavigation.org/docs/en/stack-navigator.html#headerbackimage
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      full_data: [],
      error: null,
      query: '',
    };
  }

  async componentDidMount() {
    // const token = await AsyncStorage.getItem('fb_token');
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
    fetch(getStoreAPIURL, options)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          data: responseJson,
          full_data: responseJson,
        });
        this.props.loadStoreData(this.state.data);
      });

    this.props.navigation.addListener('willFocus', () => {
      const { _getFilteredStores } = this;
      const {
        filter_style,
        filter_age,
        filter_region,
        filter_TPO,
      } = this.props;

      this.setState({ isLoading: true });
      _getFilteredStores(
        500,
        filter_age,
        filter_style,
        filter_TPO,
        filter_region,
      )
        .then(stores => {
          this.setState({ isLoading: false, data: stores });
        })
        .catch(error => {
          this.setState({ error, isLoading: false });
        });
    });
  }

  _getFilteredStores = (limit, ageQuery, styleQuery, TPOQuery, regionQuery) => {
    return new Promise((resolve, reject) => {
      TPO_filtered = this._filterTPO(this.state.full_data, TPOQuery);
      style_filtered = this._filterStyle(TPO_filtered, styleQuery);
      age_filtered = this._filterAge(style_filtered, ageQuery);
      region_filtered = this._filterRegion(age_filtered, regionQuery);

      resolve(_.take(region_filtered, limit));
    });
  };

  _contains = (query = [], tag) => {
    if (query.includes(tag)) {
      return true;
    }
    return false;
  };

  _listContains = (query = [], store_tags = []) => {
    let is_contain = false;
    store_tags.map(tag => {
      if (query.includes(tag)) {
        is_contain = true;
      }
    });
    return is_contain;
  };

  _filterStyle = (store_list, query = []) => {
    if (query.length === 0) {
      return store_list;
    } else {
      return _.filter(store_list, store => {
        return this._listContains(query, [
          store.primary_style,
          store.secondary_style,
        ]);
      });
    }
  };

  _filterAge = (store_list, query = []) => {
    if (query.length === 0) {
      return store_list;
    } else {
      let age_tag_match_dic = {
        '10s, 20s': ['10m', '10l', '20e'],
        '20s': ['20e', '20m', '20l'],
        '20s, 30s': ['20l', '30e', '30m'],
      };
      return _.filter(store_list, store => {
        return this._listContains(query, age_tag_match_dic[store.age]);
      });
    }
  };

  _filterTPO = (store_list, query = []) => {
    if (query.length === 0) {
      return store_list;
    } else {
      return _.filter(store_list, store => {
        return this._contains(query, store.tpo);
      });
    }
  };

  _filterRegion = (store_list, query = []) => {
    if (query.length === 0) {
      return store_list;
    } else {
      return _.filter(store_list, store => {
        return this._listContains(query, store.region);
      });
    }
  };

  render() {
    const { container, contentContainerStyle } = styles;

    return (
      <View style={container}>
        <View style={contentContainerStyle}>
          <RankingList
            updatedInfo
            rankingRender
            data={this.state.data}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}
function mapStateToProps({ filter, store }) {
  return {
    filter_style: filter.filter_style,
    filter_age: filter.filter_age,
    filter_TPO: filter.filter_TPO,
    filter_region: filter.filter_region,
    store_data: store.data,
  };
  // check reducers/index.js
}
export default connect(
  mapStateToProps,
  actions,
)(InfluencerListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
  },
  rankingContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '3%',
  },
  rankingTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.LIGHT_GRAY,
  },
  ranikingChangedContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
});
