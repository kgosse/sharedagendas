import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Text, Button, Toast, Colors} from 'react-native-ui-lib';
import {SCREENS, TITLES} from "../../utils/consts";
import { Button as ADButton } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import {SERVICE_STATES} from "../../utils/consts";

@inject('Account') @observer
export default class SignInScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  static navigatorStyle = {
    tabBarHidden: true
  };


  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null
    };

  }

  openSignUpScreen = () => {
    const {navigator} = this.props;
    navigator.push({
      screen: SCREENS.signup,
      title: TITLES.signup,
      navigatorStyle: {
        tabBarHidden: true
      }
    });
  };

  handleLogin = () => {
    const {navigator, Account} = this.props;
    const email = this.email.state.value;
    const password = this.password.state.value;
    Account.login(email, password, () => {
      navigator.resetTo({
        screen: SCREENS.agenda,
        title: TITLES.agenda,
        navigatorStyle: {
          tabBarHidden: false
        }
      });
    });
  };

  render() {
    const {Account} = this.props;

    return (
      <View paddingH-25 paddingT-60>
        <Text blue50 text20>Connection</Text>
        <TextInput floatingPlaceholder text50 placeholder="Email" dark10 ref={e => this.email = e}
        />
        <TextInput floatingPlaceholder text50 placeholder="Password" ref={e => this.password = e}
                   secureTextEntry dark10 />
        <View marginT-25 center>
          <ADButton type="primary" onClick={this.handleLogin}
                    disabled={Account.state === SERVICE_STATES.pending}
                    loading={Account.state === SERVICE_STATES.pending}>
            Login
          </ADButton>
          <Button link text70 orange30 label="Sign Up" marginT-20  onPress={this.openSignUpScreen} />
        </View>
        <Toast
          visible={Account.errorMessage && Account.state === SERVICE_STATES.error}
          message={Account.errorMessage}
          position="top"
          allowDismiss
          backgroundColor={Colors.red10}
          onDismiss={Account.cancelError}
        />
      </View>
    );
  }
}
