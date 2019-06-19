import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Switch } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import * as color from '../../styles/color';

export default class AgreementField extends Component {
  state = {
    isSwitchOn: false,
  };

  render() {
    const { isSwitchOn } = this.state;
    const { agreementText } = this.props;
    const { wrapper, agreementTextStyle, agreementTextWrapper } = styles;
    return (
      <View style={wrapper}>
        <View style={agreementTextWrapper}>
          <Text style={agreementTextStyle}>{agreementText}</Text>
        </View>
        <Switch
          value={isSwitchOn}
          color="rgba(255,255,255,0.4)"
          onValueChange={() => {
            this.setState({ isSwitchOn: !isSwitchOn });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  agreementTextStyle: {
    color: color.white,
  },
  agreementTextWrapper: {
    width: '80%',
    flexWrap: 'wrap',
  },
});
