import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import * as color from '../../styles/color';

import ProfileListSquare from '../../components/ProfileListSquare';
import _ from 'lodash';

class MyFavoriteProductTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      query: '',
      data: [],
    };
  }

  _getStores = (store_list, limit = 30, favorites = []) => {
    return new Promise((resolve, reject) => {
      if (favorites.length === 0) {
        resolve(_.take(store_list, 0));
      } else {
        const results = _.filter(store_list, store => {
          return favorites.includes(store.insta_id);
        });
        resolve(_.take(results, limit));
      }
    });
  };

  _makeRemoteRequest = () => {
    this.setState({ loading: true });
    this._getStores(this.props.store_data, 30, this.props.favorites)
      .then(stores => {
        this.setState({ loading: false, data: stores });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  componentDidMount() {
    this._makeRemoteRequest();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.favorites !== this.props.favorites) {
      this._makeRemoteRequest();
    }
  }
  _keyExtractor = item => item.insta_id;
  _renderItem = ({ item }) => {
    const {
      rankingContainerStyle,
      rankingTextStyle,
      ranikingChangedContainerStyle,
    } = styles;
    const {
      insta_id,
      insta_url,
      profile_image,
      current_ranking,
      current_ranking_changed,
      facebook_url,
      primary_style,
      secondary_style,
      age,
    } = item;

    return (
      <ProfileListSquare
        data={item}
        onPressHandler={() => {
          this.props.navigation.navigate('FavoriteInfluencerDetail', {
            profile_image: profile_image,
            insta_id: insta_id,
            age: age,
            primary_style: primary_style,
            secondary_style: secondary_style,
            facebook_url: facebook_url,
            insta_url: insta_url,
          });
        }}
        // onRight={
        // } 하트 넣어야함.
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          style={{ backgroundColor: color.SUPER_LIGHT_GRAY }}
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          directionalLockEnabled
        />
      </View>
    );
  }
}

function mapStateToProps({ favorite, store }) {
  return {
    favorites: favorite.favorites,
    store_data: store.data,
  };
}

export default connect(mapStateToProps)(MyFavoriteProductTabScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.SUPER_LIGHT_GRAY,
  },
  contentContainerStyle: {
    flex: 1,
  },
  updatedContainerStyle: {
    alignItems: 'flex-end',
    width: '100%',
    padding: 8,
    backgroundColor: color.SUPER_LIGHT_GRAY,
  },
  updateTitleStyle: {
    color: color.MAIN_GRAY,
    fontWeight: '100',
  },
  updateTextStyle: {
    color: color.LIGHT_GRAY,
    fontWeight: '100',
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
