import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native-ui-lib';

export default class SharedAgendasScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View paddingH-25 paddingT-60>
        <Text blue50 text20>Shared Agendas</Text>
      </View>
    );
  }
}
