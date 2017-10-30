import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Button, TextInput, Text, Toast, Colors} from 'react-native-ui-lib';
import { inject, observer } from 'mobx-react/native';
import { Button as ADButton } from 'antd-mobile';
import {SERVICE_STATES} from "../../utils/consts";
import {SCREENS, TITLES} from "../../utils/consts";

@inject('SharedAgendas', 'Users', 'Account') @observer
export default class SharedAgendaFormScreen extends Component {

  static navigatorStyle = {
    tabBarHidden: true
  };

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      showToast: false,
      selectedUsers: []
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    const {SharedAgendas} = this.props;
    switch(event.id) {
      case 'willAppear':
      case 'didAppear':
      case 'willDisappear':
        break;
      case 'didDisappear':
        SharedAgendas.clearCreateShareAgendaRequest();
        break;
    }
  }

  handleNewSharedAgenda = () => {
    const {SharedAgendas, Account, Users} = this.props;
    const name = this.agendaName.state.value;
    const users = Users.selectedUsers;
    SharedAgendas.createSharedAgenda({
      name,
      users,
      user: Account.current.uid
    })
  };

  handleAddPeople = () => {
    const {navigator} = this.props;
    navigator.push({
      screen: SCREENS.addpeople,
      title: TITLES.addpeople,
    });
  };

  render() {
    const {SharedAgendas} = this.props;

    const bgColor = SharedAgendas.createShareAgendaRequest.error ? Colors.red10 : Colors.blue10;
    const message = SharedAgendas.createShareAgendaRequest.error || 'Agenda created !';

    return (
      <View paddingH-25 paddingT-25>
        <Text blue50 text40 center>New Shared Agenda</Text>
        <TextInput floatingPlaceholder text50 placeholder="Agenda Name"
                   dark10 ref={e => this.agendaName = e}/>
        <View center>
          <Button link text70 orange30 label="Add people" marginT-20  onPress={this.handleAddPeople} />
        </View>

        <View marginT-25 center>
          <ADButton type="primary" loading={SharedAgendas.createShareAgendaRequest.state === SERVICE_STATES.pending}
                  disabled={SharedAgendas.createShareAgendaRequest.state === SERVICE_STATES.pending}
                  onClick={this.handleNewSharedAgenda}>
            Create Agenda
          </ADButton>
        </View>
        <Toast
          visible={SharedAgendas.createShareAgendaRequest.state === SERVICE_STATES.done}
          message={message}
          position="top"
          allowDismiss
          backgroundColor={bgColor}
          onDismiss={SharedAgendas.clearCreateShareAgendaRequest}
        />
      </View>
    );
  }
}
