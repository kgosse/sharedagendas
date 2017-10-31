import React, { Component } from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, View, LoaderScreen, Colors, Typography} from 'react-native-ui-lib';
import Row from '../../components/ui/Row';
import { inject, observer } from 'mobx-react/native';
import { SCREENS, SERVICE_STATES, TITLES } from "../../../utils/consts";

@inject('Account', 'SharedAgendas') @observer
export default class SharedAgendasScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Create',
        id: 'Create',
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    const {navigator, Account, SharedAgendas} = this.props;
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'Create') {
        navigator.push({
          screen: SCREENS.newagenda,
          title: TITLES.newagenda,
          passProps: {}
        });
      }
    } else {
      switch(event.id) {
        case 'willAppear':
          break;
        case 'didAppear':
            SharedAgendas.getSharedAgendas();
          break;
        case 'willDisappear':
        case 'didDisappear':
          break;
      }
    }
  }

  handleAgendaClick = (agenda) => {
    const {navigator} = this.props;
    navigator.push({
      screen: SCREENS.agendaOptions,
      title: 'Shared Agenda - ' + agenda.title,
      passProps: {
        agenda
      }
    });
  };

  render() {
    const {SharedAgendas, Account} = this.props;

    if (SharedAgendas.getShareAgendaRequest.state === SERVICE_STATES.pending) {
      return (
        <View flex center>
          <LoaderScreen
            color={Colors.blue60}
            message='Loading...'
            overlay
          />
        </View>
      );
    }

    if (SharedAgendas.getShareAgendaRequest.state === SERVICE_STATES.done
      && SharedAgendas.userSharedAgendasLength(Account.current.uid) === 0) {
      return (
        <View center>
          <Text blue50 text20 center>No Shared Agenda !</Text>
        </View>
      );
    }

    const agendas = SharedAgendas.getUserSharedAgendas(Account.current.uid);

    return (
      <ScrollView style={styles.agendas}>
        {
          agendas.map((a, i) => {
            return (
                <Row title={a.title} key={i} onPress={() => this.handleAgendaClick(a)}/>
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  agendas: {
    flex: 1,
  },
});
