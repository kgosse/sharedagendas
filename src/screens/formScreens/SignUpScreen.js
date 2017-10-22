import React, { Component } from 'react';
import {View, TextInput, Text, Button, Toast} from 'react-native-ui-lib';
import Btn from 'apsl-react-native-button';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      showToast: false
    };

    props.navigator.setDrawerEnabled({
      side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
      enabled: false // should the drawer be enabled or disabled (locked closed)
    });

  }

  toggleButtonState = () => {
    this.setState({isLoading: true});
    setTimeout(() => {
      this.setState({isLoading: false, showToast: true});
    }, 3000);

  };

  render() {
    return (
      <View paddingH-25 paddingT-20>
        <Text blue50 text20>Registration</Text>
        <Toast
          visible={this.state.showToast}
          message="Thank you for your registration !"
          position="top"
          allowDismiss
          onDismiss={() => this.setState({showToast: false})}
        />
        <TextInput floatingPlaceholder text50 placeholder="First Name" dark10 />
        <TextInput floatingPlaceholder text50 placeholder="Last Name" dark10 />
        <TextInput floatingPlaceholder text50 placeholder="Email" dark10 />
        <TextInput floatingPlaceholder text50 placeholder="Password" secureTextEntry dark10 />
        <View marginT-20 center>
          <Btn
            style={{backgroundColor: '#F27052', borderColor: '#F27052'}}
            textStyle={{color: '#FFFFFF'}}
            onPress={this.toggleButtonState}
            {...this.state}
          >
            Sign Up
          </Btn>
        </View>
      </View>
    );
  }
}
