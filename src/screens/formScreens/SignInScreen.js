import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import Btn from 'apsl-react-native-button';
import {SCREENS, TITLES} from "../../utils/consts";

export default class SignInScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    const {navigator} = this.props;
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
        navigator.toggleTabs({
          to: 'hidden',
          animated: false
        });
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
    const {navigator} = this.props;
    navigator.resetTo({
      screen: SCREENS.agenda,
      title: TITLES.agenda,
    });
  };

  render() {
    return (
      <View paddingH-25 paddingT-60>
        <Text blue50 text20>Connection</Text>
        <TextInput floatingPlaceholder text50 placeholder="Email" dark10
        />
        <TextInput floatingPlaceholder text50 placeholder="Password"
                   secureTextEntry dark10 />
        <View marginT-100 center>
          {/*<Button text70 white background-orange30 label="Login" />*/}
          <Btn
            style={{backgroundColor: '#F27052', borderColor: '#F27052'}}
            textStyle={{color: '#FFFFFF'}}
            onPress={this.handleLogin}
            {...this.state}
          >
            Login
          </Btn>
          <Button link text70 orange30 label="Sign Up" marginT-20  onPress={this.openSignUpScreen} />
        </View>
      </View>
    );
  }
}
