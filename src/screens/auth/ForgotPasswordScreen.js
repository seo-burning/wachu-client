import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import transparentHeaderStyle from '../../styles/navigations';

import * as color from '../../styles/color';
import InputField from '../../components/form/InputField';
import Notification from '../../components/Notification';
import NextArrowButton from '../../components/buttons/NextArrowButton';
import Loader from '../../components/Loader';

export default class ForgotPasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: color.WHITE,
  });

  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      loadingVisible: false,
      validEmail: false,
      emailAddress: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
  }

  handleEmailChange(email) {
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ emailAddress: email });

    if (!this.state.validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true });
      } else if (!emailCheckRegex.test(email)) {
        this.setState({ validEmail: false });
      }
    }
  }

  goToNextStep() {
    this.setState({ loadingVisible: true });
    setTimeout(() => {
      if (this.state.emailAddress === 'aa@aa.aa') {
        this.setState({
          loadingVisible: false,
          formValid: false,
        });
      } else {
        this.setState({
          loadingVisible: false,
          formValid: true,
        });
      }
    }, 2000);
  }

  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  render() {
    const { loadingVisible, formValid, validEmail } = this.state;
    const {
      wrapper,
      scrollView,
      scrollViewWrapper,
      forgotPasswordHeading,
      forgotPasswordSubHeading,
      notificationWrapper,
    } = styles;
    const background = formValid ? color.MAIN_COLOR : color.MAIN_COLOR;
    const showNotification = !formValid;
    return (
      <KeyboardAvoidingView
        style={[wrapper, { backgroundColor: background }]}
        behavior="padding"
      >
        <View style={scrollViewWrapper}>
          <ScrollView style={scrollView}>
            <Text style={forgotPasswordHeading}>Forgot your password</Text>
            <Text style={forgotPasswordSubHeading}>
              Enter your email to find your password.
            </Text>
            <InputField
              customStyle={{ marginBottom: 30 }}
              textColor={color.WHITE}
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              lableColor={color.WHITE}
              borderBottomColor={color.WHITE}
              inputType="email"
              onChangeText={this.handleEmailChange}
              showCheckmark={validEmail}
            />
          </ScrollView>
          <NextArrowButton
            handleNextButton={this.goToNextStep}
            disabled={!validEmail}
          />
        </View>
        <Loader modalVisible={loadingVisible} animationType="fade" />
        <View style={notificationWrapper}>
          <Notification
            showNotification={showNotification}
            handleCloseNotification={this.handleCloseNotification}
            type="Error"
            firstLine="No account exists for the requested"
            secondLine="email address"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  forgotPasswordHeading: {
    fontSize: 28,
    color: color.WHITE,
    fontWeight: '300',
  },
  forgotPasswordSubHeading: {
    color: color.WHITE,
    fontWeight: '600',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 60,
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1,
  },

  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
