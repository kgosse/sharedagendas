import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { inject, observer } from 'mobx-react/native';
import {Text, LoaderScreen, Colors, Avatar, AvatarHelper} from 'react-native-ui-lib';
import {SERVICE_STATES, SCREENS, TITLES} from "../../utils/consts";
import moment from 'moment';

@inject('Agendas', 'Account', 'Users') @observer
export default class AgendaScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Event',
        id: 'Event',
      }
    ]
  };

  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: null,
      requestAgenda: true
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    const {navigator, Account, Agendas, agendaId} = this.props;

    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'Event') {
        navigator.push({
          screen: SCREENS.event,
          title: TITLES.event,
          passProps: {
            selectedDate: this.state.selectedDate,
            user: Account.current.uid,
            agenda: agendaId
          }
        });
      }
    } else {
      switch(event.id) {
        case 'willAppear':
          break;
        case 'didAppear':
          Agendas.getUserAgenda(agendaId);
          break;
        case 'willDisappear':
        case 'didDisappear':
          break;
      }
    }
  }

  render() {
    const {Account, Agendas} = this.props;

    if (Agendas.state === SERVICE_STATES.pending) {
      return (
        <View style={styles.loader}>
          <LoaderScreen
            color={Colors.blue60}
            message='Loading...'
            overlay
          />
        </View>
      );
    }
    return (
      <Agenda
        items={Agendas.events}
        loadItemsForMonth={this.loadItems}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
      />
    );
  }

  loadItems = (day) => {
    this.setState({selectedDate: day});
    this.props.Agendas.loadEvents(day);
  };

  renderItem = (item) => {
    const {Users} = this.props;
    const user = Users.getUser(item.user);
    const name = user.firstname + ' ' + user.lastname;
    return (
      <View style={[styles.item]}>
        <View>
          <View><Text>{moment(item.day).format('HH:mm')}</Text></View>
          <View><Text>{item.name}</Text></View>
          <View><Text>{item.location}</Text></View>
        </View>
        <View style={styles.avatarContainer}>
          <Avatar label={AvatarHelper.getInitials(name)}
                  size={40}
                  containerStyle={styles.avatar}
          />
        </View>
      </View>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}></View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return (r1.day !== r2.day || r1.location !== r2.location || r1.name !== r2.name || r1.user !== r2.user);
  };

}

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  avatar: {
    backgroundColor: '#c9ffc1',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    marginTop: 45,
    marginRight: 10,
    borderTopWidth: 2,
    borderTopColor: '#dddddd',
    height: 5,
  },
});