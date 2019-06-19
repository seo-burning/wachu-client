import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';

import RadioButton from '../components/buttons/RadioButton';
import IconButton from '../components/buttons/IconButton';
import CustomButton from '../components/buttons/CustomButton';

import * as color from '../styles/color';
import * as actions from '../actions';

class FilterModalScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: color.WHITE, borderBottomWidth: 0 },
      headerTintColor: color.MAIN_COLOR,
      headerLeft: (
        <IconButton
          icon={'times'}
          iconColor={color.BLACK}
          onPressHandler={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <IconButton
          icon={'refresh'}
          iconColor={color.BLACK}
          onPressHandler={navigation.getParam('_removeAll')}
        />
      ),
      //https://reactnavigation.org/docs/en/stack-navigator.html#headerbackimage
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      ageTags: [
        { description: '10대 중반', key: '10m' },
        { description: '10대 후반', key: '10l' },
        { description: '20대 초반', key: '20e' },
        { description: '20대 중반', key: '20m' },
        { description: '20대 후반', key: '20l' },
        { description: '30대 초반', key: '30e' },
        { description: '30대 중반', key: '30m' },
      ],
      styleTags: [
        { description: 'chic', key: 'chic' },
        { description: 'simple', key: 'simple' },
        { description: 'sexy', key: 'sexy' },
        { description: 'lovely', key: 'lovely' },
        { description: 'feminine', key: 'feminine' },
        { description: 'street', key: 'street' },
      ],
      TPOTags: [
        { description: 'campus', key: 'campus' },
        { description: 'date', key: 'date' },
        { description: 'school', key: 'school' },
        { description: 'party', key: 'party' },
        { description: 'office', key: 'office' },
        { description: 'vacation', key: 'vacation' },
        { description: 'club', key: 'club' },
      ],
      regionTags: [
        { description: 'saigon', key: 'saigon' },
        { description: 'hanoi', key: 'hanoi' },
        { description: 'dalat', key: 'dalat' },
        { description: 'danang', key: 'danang' },
        { description: 'natrang', key: 'natrang' },
        { description: 'seoul', key: 'seoul' },
      ],
      clickedStyle: props.filter_style,
      clickedAge: props.filter_age,
      clickedTPO: props.filter_TPO,
      clickedRegion: props.filter_region,
      // about lifecycle method https://velopert.com/3631
      fake: 'fake',
    };
    this._removeAll = this._removeAll.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ _removeAll: this._removeAll });
  }

  _removeAll = () => {
    this.setState({
      clickedStyle: [],
      clickedAge: [],
      clickedTPO: [],
      clickedRegion: [],
    });
  };

  addToTPOFilterList = tag => {
    if (this.state.clickedTPO.includes(tag)) {
      this.setState({
        clickedTPO: this.state.clickedTPO.filter(item => item !== tag),
      });
    } else {
      this.setState({ clickedTPO: [...this.state.clickedTPO, tag] });
    }
  };

  addToStyleFilterList = tag => {
    if (this.state.clickedStyle.includes(tag)) {
      this.setState({
        clickedStyle: this.state.clickedStyle.filter(item => item !== tag),
      });
    } else {
      this.setState({ clickedStyle: [...this.state.clickedStyle, tag] });
    }
  };

  addToAgeFilterList = tag => {
    if (this.state.clickedAge.includes(tag)) {
      this.setState({
        clickedAge: this.state.clickedAge.filter(item => item !== tag),
      });
    } else {
      this.setState({ clickedAge: [...this.state.clickedAge, tag] });
    }
  };

  addToRegionFilterList = tag => {
    if (this.state.clickedRegion.includes(tag)) {
      this.setState({
        clickedRegion: this.state.clickedRegion.filter(item => item !== tag),
      });
    } else {
      this.setState({ clickedRegion: [...this.state.clickedRegion, tag] });
    }
  };

  renderRadionButton(name, onPress, selected) {
    return (
      <RadioButton
        text={name}
        activeColor={color.MAIN_COLOR}
        inactiveTextColor={color.MAIN_GRAY}
        onPress={onPress}
        selected={selected}
        key={name}
      />
    );
  }

  render() {
    const { renderRadionButton } = this;
    const { sectionTitle, iconRowContainer, gradientStyle } = styles;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)']}
          style={gradientStyle}
        />
        <ScrollView style={{ paddingHorizontal: 10, marginBottom: 60 }}>
          <Text style={sectionTitle}>연령</Text>
          <View style={iconRowContainer}>
            {this.state.ageTags.map(age =>
              renderRadionButton(
                age.description,
                () => this.addToAgeFilterList(age.key),
                this.state.clickedAge.includes(age.key),
              ),
            )}
          </View>
          <Text style={sectionTitle}>스타일</Text>
          <View style={iconRowContainer}>
            {this.state.styleTags.map(style =>
              renderRadionButton(
                style.description,
                () => this.addToStyleFilterList(style.key),
                this.state.clickedStyle.includes(style.key),
              ),
            )}
          </View>
          <Text style={sectionTitle}>TPO</Text>
          <View style={iconRowContainer}>
            {this.state.TPOTags.map(TPO =>
              renderRadionButton(
                TPO.description,
                () => this.addToTPOFilterList(TPO.key),
                this.state.clickedTPO.includes(TPO.key),
              ),
            )}
          </View>
          <Text style={sectionTitle}>지역</Text>
          <View style={iconRowContainer}>
            {this.state.regionTags.map(region =>
              renderRadionButton(
                region.description,
                () => this.addToRegionFilterList(region.key),
                this.state.clickedRegion.includes(region.key),
              ),
            )}
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            paddingHorizontal: 10,
            zIndex: 10,
          }}
        >
          <CustomButton
            title="적용하기"
            buttonColor={color.MAIN_COLOR}
            titleColor={color.WHITE}
            onPress={() => {
              this.props.filterByTags({
                style: this.state.clickedStyle,
                age: this.state.clickedAge,
                TPO: this.state.clickedTPO,
                region: this.state.clickedRegion,
              }),
                this.props.navigation.goBack();
            }}
            // onPress={}
          />
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps({ filter }) {
  return {
    filter_style: filter.filter_style,
    filter_age: filter.filter_age,
    filter_TPO: filter.filter_TPO,
    filter_region: filter.filter_region,
  };
  // check reducers/index.js
}
export default connect(
  mapStateToProps,
  actions,
)(FilterModalScreen);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    color: color.LIGHT_GRAY,
    paddingHorizontal: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  gradientStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '10%',
    zIndex: 5,
  },
  iconRowContainer: { flexDirection: 'row', flexWrap: 'wrap' },
});
