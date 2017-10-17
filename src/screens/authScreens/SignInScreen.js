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

    props.navigator.setDrawerEnabled({
      side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
      enabled: false // should the drawer be enabled or disabled (locked closed)
    });

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

  handleLogin = () => {
    const {navigator} = this.props;
    navigator.resetTo({
      screen: 'app.menu.MyAgendaScreen',
      title: 'My Agenda',
      navigatorButtons: {
        leftButtons: [{
          id: 'sideMenu'
        }]
      }
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
