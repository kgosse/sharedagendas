import React, { Component } from 'react';
import {View, TextInput, Text, Button, Toast, Colors} from 'react-native-ui-lib';
import { Button as ADButton } from 'antd-mobile';
import firebase from 'firebase';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      showToast: false,
      error: null
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

  handleSignUp = () => {
    this.setState({isLoading: true});
    const firstname = this.firstname.state.value;
    const lastname = this.lastname.state.value;
    const email = this.email.state.value;
    const password = this.password.state.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      firebase.database().ref('users/' + user.uid).set({
        firstname,
        lastname,
        email,
        password
      }, error => {
        if (error) {
          this.setState({showToast: true, isLoading: false, error: error});
        } else {
          this.setState({showToast: true, isLoading: false, error: null});
        }
      });
    }, (error) => {
      this.setState({showToast: true, isLoading: false, error: error.message});
    });
  };

  render() {
    const bgColor = this.state.error ? Colors.red10 : Colors.blue10;
    const message = this.state.error || 'Thank you for your registration !';

    return (
      <View paddingH-25 paddingT-20>
        <Text blue50 text20>Registration</Text>
        <Toast
          visible={this.state.showToast}
          message={message}
          position="top"
          allowDismiss
          backgroundColor={bgColor}
          onDismiss={() => this.setState({showToast: false, error: null})}
        />
        <TextInput floatingPlaceholder text50 placeholder="First Name" dark10 ref={e => this.firstname = e}/>
        <TextInput floatingPlaceholder text50 placeholder="Last Name" dark10 ref={e => this.lastname = e}/>
        <TextInput floatingPlaceholder text50 placeholder="Email" dark10 ref={e => this.email = e}/>
        <TextInput floatingPlaceholder text50 placeholder="Password" secureTextEntry dark10 ref={e => this.password= e}/>
        <View marginT-20 center>
          <ADButton type="primary" onClick={this.handleSignUp}
                    loading={this.state.isLoading}
                    disabled={this.state.isLoading}>
            Sign Up
          </ADButton>
        </View>
      </View>
    );
  }
}
