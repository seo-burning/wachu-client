import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, TextInput, ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import RankingList from '../components/RankingList';
import _ from 'lodash';
import * as color from '../styles/color';
import IconButton from '../components/buttons/IconButton';

class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      query: '',
      fullData: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  _contains = ({ insta_id }, query) => {
    if (insta_id.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  _getStores = (store_list, limit = 30, query = '') => {
    return new Promise((resolve, reject) => {
      if (query.length === 0) {
        resolve(_.take(store_list, 0));
      } else {
        const formattedQuery = query.toLowerCase();
        const results = _.filter(store_list, store => {
          return this._contains(store, formattedQuery);
        });
        resolve(_.take(results, limit));
      }
    });
  };

  makeRemoteRequest = _.debounce(() => {
    this.setState({ loading: true });
    this._getStores(this.props.store_data, 30, this.state.query)
      .then(stores => {
        this.setState({ loading: false, data: stores, fullData: stores });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }, 100);

  handleSearch = text => {
    const formatQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData, store => {
      return this._contains(store, formatQuery);
    });
    this.setState({ query: formatQuery, data }, () => this.makeRemoteRequest());
  };

  renderLoadingIndicator = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            backgroundColor: color.WHITE,
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20,
            paddingBottom: 5,
          }}
        >
          <IconButton
            icon={'chevron-left'}
            iconColor={color.BLACK}
            onPressHandler={() => {
              this.props.navigation.goBack();
            }}
          />
          <View
            style={{
              backgroundColor: color.SUPER_LIGHT_GRAY,
              flexDirection: 'row',

              flex: 1,
              height: 40,
              paddingVertical: 5,
              paddingHorizontal: 5,
              alignItems: 'center',
              borderRadius: 2,
            }}
          >
            <Icon
              name={'search'}
              size={15}
              color={color.MAIN_GRAY}
              style={{ paddingHorizontal: 5 }}
            />
            <TextInput
              maxLength={40}
              onChangeText={this.handleSearch}
              placeholder={
                'please type store name                              '
              }
              style={{ color: color.MAIN_GRAY, fontSize: 15 }}
            />
          </View>
        </View>
        <View style={{ backgroundColor: color.SUPER_LIGHT_GRAY }}>
          <RankingList
            data={this.state.data}
            navigation={this.props.navigation}
            rankingRender={false}
          />
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps({ store }) {
  return {
    store_data: store.data,
  };
}

export default connect(mapStateToProps)(SearchScreen);
