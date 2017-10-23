import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Text, Button, Toast, Colors} from 'react-native-ui-lib';
import {SCREENS, TITLES} from "../../utils/consts";
import { Button as ADButton } from 'antd-mobile';
import { inject, observer } from 'mobx-react/native';
import firebase from 'firebase';

@inject('Account') @observer
export default class SignInScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    const {navigator, Account} = this.props;
    switch(event.id) {
      case 'willAppear':
        navigator.toggleTabs({
          to: 'hidden',
          animated: false
        });
        break;
      case 'didAppear':
        break;
      case 'willDisappear':
        if (!Account.authorized) {
          navigator.toggleTabs({
            to: 'hidden',
            animated: false
          });
        }
        break;
      case 'didDisappear':
        break;
    }
  }

  openSignUpScreen = () => {
    const {navigator} = this.props;
    navigator.push({
      screen: SCREENS.signup,
      title: TITLES.signup,
    });
  };

  handleLogin = () => {
    const {navigator, Account} = this.props;
    const email = this.email.state.value;
    const password = this.password.state.value;
    this.setState({error: null, isLoading: true});
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({error: null, isLoading: false});
        Account.setAuthorized(true);
        Account.updateAccount(firebase.auth().currentUser);
        navigator.resetTo({
          screen: SCREENS.agenda,
          title: TITLES.agenda,
        });
      })
      .catch(function(error) {
        this.setState({error: error.message, isLoading: false});
      });
  };

  render() {

    return (
      <View paddingH-25 paddingT-60>
        <Text blue50 text20>Connection</Text>
        <TextInput floatingPlaceholder text50 placeholder="Email" dark10 ref={e => this.email = e}
        />
        <TextInput floatingPlaceholder text50 placeholder="Password" ref={e => this.password = e}
                   secureTextEntry dark10 />
        <View marginT-25 center>
          <ADButton type="primary" onClick={this.handleLogin}
                    disabled={this.state.isLoading}
                    loading={this.state.isLoading}>
            Login
          </ADButton>
          <Button link text70 orange30 label="Sign Up" marginT-20  onPress={this.openSignUpScreen} />
        </View>
        <Toast
          visible={!!this.state.error}
          message={this.state.error}
          position="top"
          allowDismiss
          backgroundColor={Colors.red10}
          onDismiss={() => this.setState({error: null})}
        />
      </View>
    );
  }
}
