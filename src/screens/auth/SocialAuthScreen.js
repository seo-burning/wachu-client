import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as actions from '../../actions';

import RoundedButton from '../../components/buttons/RoundedButton';
import * as color from '../../styles/color';

class SocialAuthScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  componentWillReceiveProps(props) {
    if (props.token) {
      this.props.navigation.navigate('main');
    }
  }

  render() {
    const {
      container,
      headerContainer,
      contentContainer,
      buttonContainer,
      titleStyle,
    } = styles;
    return (
      <View style={container}>
        <View style={headerContainer} />
        <View style={contentContainer}>
          <Text style={titleStyle}> {this.props.token}</Text>
          <Text style={titleStyle}>
            Fashion Playground,
            {'\n'}
            wachu
          </Text>
        </View>
        <View style={buttonContainer}>
          <RoundedButton
            text="Continue with Facebook"
            textColor={color.MAIN_COLOR}
            background={color.WHITE}
            icon={
              <Icon
                name="facebook"
                size={20}
                style={styles.facebookButtonIcon}
              />
            }
            handleOnPress={this.props.facebookLogin}
          />
          <RoundedButton
            text="Continue with Email"
            textColor={color.WHITE}
            handleOnPress={() => this.props.navigation.navigate('emaiLogin')}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(
  mapStateToProps,
  actions,
)(SocialAuthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: color.MAIN_COLOR,
  },
  headerContainer: {
    width: '100%',
    height: '9%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    height: '30%',
  },
  titleStyle: {
    fontSize: 35,
    color: color.WHITE,
    paddingBottom: '2%',
  },
  facebookButtonIcon: {
    color: color.MAIN_COLOR,
    position: 'relative',
    left: 20,
    zIndex: 8,
  },
  moreOptionsButton: {
    marginBottom: 10,
  },
  moreOptionsButtonText: {
    color: color.WHITE,
    fontSize: 16,
  },
});
