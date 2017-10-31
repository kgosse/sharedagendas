import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

export default class DegreeComponent extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  render() {
    return (
      <View style={[styles.degree, this.props.style]}></View>
    );
  }
}

const styles = StyleSheet.create({
  degree: {
    borderColor: 'black',
    backgroundColor: 'transparent',
    borderWidth: 1
  }
});
