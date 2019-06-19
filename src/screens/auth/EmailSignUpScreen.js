import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import { transparentHeaderStyle } from '../../styles/navigations';
import * as color from '../../styles/color';

import InputField from '../../components/form/InputField';
import NextArrowButton from '../../components/buttons/NextArrowButton';
import Notification from '../../components/Notification';
import NavBarButton from '../../components/buttons/NavBarButton';
// import AgreementField from '../../components/form/AgreementField';

import Loader from '../../components/Loader';

export default class EmailSignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      validEmail: false,
      emailAddress: '',
      password: '',
      validPassword: false,
      loadingVisible: false,
    };
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: color.WHITE,
  });

  handleNextButton() {
    this.setState({ loadingVisible: true });
    setTimeout(() => {
      const { emailAddress, password } = this.state;
      if (this.props.logIn(emailAddress, password)) {
        this.setState({ formValid: true, loadingVisible: false });
      } else {
        this.setState({ formValid: false, loadingVisible: false });
      }
    }, 2000);
  }

  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  handleEmailChange(email) {
    // eslint-disable-next-line
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validEmail } = this.state;
    this.setState({ emailAddress: email });

    if (!validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true });
      }
    } else if (!emailCheckRegex.test(email)) {
      this.setState({ validEmail: false });
    }
  }

  handlePasswordChange(password) {
    const { validPassword } = this.state;
    this.setState({ password });
    if (!validPassword) {
      if (password.length > 6) {
        // Password has to be at least 6 characters long
        this.setState({ validPassword: true });
      }
    } else if (password <= 6) {
      this.setState({ validPassword: false });
    }
  }

  toggleNextButtonState() {
    const { validEmail, validPassword } = this.state;
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  }

  render() {
    const { formValid, loadingVisible, validEmail, validPassword } = this.state;
    const showNotification = !formValid;
    const background = formValid ? color.MAIN_COLOR : color.MAIN_COLOR;
    const notificationMarginTop = showNotification ? 10 : 0;
    console.log(this.props.loggedInStatus);
    return (
      <KeyboardAvoidingView
        style={[styles.wrapper, { backgroundColor: background }]}
        behavior="padding"
      >
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>Sign Up</Text>
            <InputField
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              labelColor={color.WHITE}
              textColor={color.WHITE}
              borderBottomColor={color.WHITE}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handleEmailChange}
              showCheckmark={validEmail}
              autoFocus
            />
            <InputField
              labelText="PASSWORD"
              labelTextSize={14}
              labelColor={color.WHITE}
              textColor={color.WHITE}
              borderBottomColor={color.WHITE}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordChange}
              showCheckmark={validPassword}
            />
            {/* <AgreementField agreementTesxt="I agree with Privacy Policy and Nondiscrimination Policy." /> */}
          </ScrollView>
          <NextArrowButton
            handleNextButton={this.handleNextButton}
            disabled={this.toggleNextButtonState()}
          />
        </View>

        <View
          style={[
            styles.notificationWrapper,
            { marginTop: notificationMarginTop },
          ]}
        >
          <Notification
            showNotification={showNotification}
            handleCloseNotification={this.handleCloseNotification}
            type="Error"
            firstLine="Those credentials don't look right."
            secondLine="Please try again"
          />
        </View>
        {/* // TODO : Expo Loader 변경 필요. */}
        <Loader modalVisible={loadingVisible} animationType="fade" />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flex: 1,
  },
  loginHeader: {
    fontSize: 34,
    color: color.WHITE,
    fontWeight: '300',
    marginBottom: 40,
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 999,
  },
});
