import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as color from '../styles/color';
import ProfileListSquare from '../components/ProfileListSquare';

export default class RankingList extends React.PureComponent {
  _rankingChangedRender(ranking_changed) {
    ranking_changed_number = Number(ranking_changed);
    if (ranking_changed_number == 99999) {
      return (
        <Text style={{ color: color.FACEBOOK, fontWeight: 'bold' }}>new</Text>
      );
    } else if (ranking_changed_number > 0) {
      return (
        <Text style={{ color: color.MAIN_COLOR, fontWeight: 'bold' }}>
          +{ranking_changed}
        </Text>
      );
    } else if (ranking_changed_number < 0) {
      return (
        <Text style={{ color: color.FACEBOOK, fontWeight: 'bold' }}>
          {ranking_changed}
        </Text>
      );
    } else {
      return <Text style={{ color: color.BLACK, fontWeight: 'bold' }}>-</Text>;
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
          this.props.navigation.navigate('InfluencerDetail', {
            profile_image: profile_image,
            insta_id: insta_id,
            age: age,
            primary_style: primary_style,
            secondary_style: secondary_style,
            facebook_url: facebook_url,
            insta_url: insta_url,
          });
        }}
        onLeft={
          this.props.rankingRender ? (
            <View style={rankingContainerStyle}>
              <Text style={rankingTextStyle}>{current_ranking}</Text>
            </View>
          ) : null
        }
        onRight={
          this.props.rankingRender ? (
            <View style={ranikingChangedContainerStyle}>
              {this._rankingChangedRender(current_ranking_changed)}
            </View>
          ) : null
        }
      />
    );
  };

  _renderHeader = () => {
    const { updatedContainerStyle, updateTitleStyle, updateTextStyle } = styles;

    return (
      <View style={updatedContainerStyle}>
        <Text style={updateTitleStyle}>
          last updated<Text style={updateTextStyle}> 19.02.16</Text>
        </Text>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        style={{ backgroundColor: color.SUPER_LIGHT_GRAY }}
        data={this.props.data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={this.props.updatedInfo ? this._renderHeader : null}
        directionalLockEnabled
      />
    );
  }
}
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
