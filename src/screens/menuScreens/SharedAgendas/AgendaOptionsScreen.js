import React, { Component } from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {View, Text, Toast, Colors} from 'react-native-ui-lib';
import Row from '../../ui/Row';
import { inject, observer } from 'mobx-react/native';
import firebase from 'firebase';
import {SCREENS, TITLES} from "../../../utils/consts";

@inject('Account', 'SharedAgendas') @observer
export default class AgendaOptionsScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object,
    agenda: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      logoutError: null
    }

  }

  onOpenAgendaClick = () => {
    const {navigator, agenda} = this.props;
    navigator.push({
      screen: SCREENS.agendaview,
      title: 'Shared Agenda - ' + agenda.title,
      passProps: {
        agendaId: agenda.id
      }
    });
  };

  onModifyAgendaClick = () => {

  };

  onDeleteAgendaClick = () => {
    const {SharedAgendas, agenda, navigator} = this.props;
    Alert.alert(
      this.props.agenda.title + ' shared agenda',
      'Do you really want to delete the agenda ?',
      [
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {text: 'Yes', onPress: () => SharedAgendas.deleteShareAgenda(agenda.id, () => {
          navigator.pop({animated: true});
        })},
      ]
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Row title={'Open Agenda'} onPress={this.onOpenAgendaClick}/>
        {/*<Row title={'Modify Agenda'} onPress={this.onModifyAgendaClick}/>*/}
        <Row title={'Delete Agenda'} onPress={this.onDeleteAgendaClick}/>
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
