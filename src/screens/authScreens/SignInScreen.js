import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import Btn from 'apsl-react-native-button'

export default class SignInScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  openSignUpScreen = () => {
    const {navigator} = this.props;
    navigator.push({
      screen: 'app.auth.SignUpScreen',
      title: 'Shared Agendas',
      // overrideBackPress: row.overrideBackPress,
      // backButtonTitle: '',
    });
  };

  toggleButtonState = () => {
    this.setState({isLoading: true, isDisabled: false});
    setTimeout(() => {
      this.setState({isLoading: false, isDisabled: false})
    }, 2000);

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
            onPress={this.toggleButtonState}
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
