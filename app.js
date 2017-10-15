/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {Navigation} from 'react-native-navigation';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';

class shared_agendas extends Component {
  render() {
    return (
      <View paddingH-25 paddingT-60>
        <Text blue50 text20>Welcome</Text>
        <TextInput floatingPlaceholder text50 placeholder="email" dark10
        />
        <TextInput floatingPlaceholder text50 placeholder="password"
                   secureTextEntry dark10 />
        <View marginT-100 center>
          <Button text70 white background-orange30 label="Login" />
          <Button link text70 orange30 label="Sign Up" marginT-20 />
        </View>
      </View>
    );
  }
}

Navigation.registerComponent('shared-agendas', () => shared_agendas);
Navigation.startSingleScreenApp({
  screen: {
    screen: 'shared-agendas',
    title: 'Shared Agendas'
  }
});
