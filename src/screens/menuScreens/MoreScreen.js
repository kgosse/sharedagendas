import React, { Component } from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {View, Text, Toast, Colors} from 'react-native-ui-lib';
import Row from '../../components/Row';
import { inject, observer } from 'mobx-react/native';
import firebase from 'firebase';

@inject('Account') @observer
export default class MoreScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      logoutError: null
    }

  }

  handleLogout = () => {
    const {navigator, Account} = this.props;
    firebase.auth().signOut().then(() => {
      this.setState({logoutError: null});
      Account.setAuthorized(false);
      Account.updateAccount({});
      navigator.switchToTab({
        tabIndex: 0
      });
    }).catch((error) => {
      this.setState({logoutError: error.message});
    });
  };

  nothing = () => {};

  render() {
    return (
      <ScrollView style={styles.container}>
        <Row title={'Meteo'} onPress={this.nothing}/>
        <Row title={'Sync with google calendar'} onPress={this.nothing}/>
        <Row title={'Account'} onPress={this.nothing}/>
        <Row title={'Log out'} onPress={this.handleLogout}/>
        <Toast
          visible={!!this.state.logoutError}
          message={this.state.logoutError}
          position="top"
          allowDismiss
          backgroundColor={Colors.red10}
          onDismiss={() => this.setState({logoutError: null})}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.054)',
  },
  text: {
    fontSize: 16,
  },
});
