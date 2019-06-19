import React, { Component } from 'react';

import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as color from '../../styles/color';

export default class TermsAndConditions extends Component {
  render() {
    return (
      <View style={styles.termsAndConditons}>
        <Text style={styles.termsText}>
          By tapping Continue, I agree to wachu's
        </Text>
        <TouchableHighlight style={styles.linkButton}>
          <Text style={styles.termsText}>Terms of Services</Text>
        </TouchableHighlight>
        <Text style={styles.termsText}>, </Text>
        <TouchableHighlight style={styles.linkButton}>
          <Text style={styles.termsText}>Privacy Policy</Text>
        </TouchableHighlight>
        <Text style={styles.termsText}> and </Text>
        <TouchableHighlight style={styles.linkButton}>
          <Text style={styles.termsText}>Nondiscrimination Policy</Text>
        </TouchableHighlight>
        <Text style={styles.termsText}>.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  termsAndConditons: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 20,
  },
  termsText: {
    color: color.white,
    fontWeight: '300',
    fontSize: 12,
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: color.white,
  },
});
