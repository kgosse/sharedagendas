import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { inject, observer } from 'mobx-react/native';
import {SCREENS, TITLES} from "../../../utils/consts";
import {Text, LoaderScreen, Colors, Avatar, AvatarHelper} from 'react-native-ui-lib';
import {SERVICE_STATES} from "../../../utils/consts";
import moment from 'moment';

@inject('Agendas', 'Account', 'Users') @observer
export default class MyAgendaScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Event',
        id: 'Event',
      }
    ]
  };

  static navigatorStyle = {
    tabBarHidden: false
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: null,
      requestAgenda: true
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const {navigator, Account, Agendas, Users} = this.props;
    if (!Account.authorized) {
      navigator.resetTo({
        screen: SCREENS.signin,
        title: TITLES.signin,
        animated: false,
        backButtonHidden: true,
      });
    } else{
      if (!Agendas.userAgenda) {
        this.setState({requestAgenda: false});
        Agendas.getUserAgenda(Account.current.agenda);
      }
      if (Users.state !== SERVICE_STATES.done) {
        Users.getUsers();
      }
    }
  }

  onNavigatorEvent(event) {
    const {navigator, Account, Agendas} = this.props;
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'Event') {
        navigator.push({
          screen: SCREENS.event,
          title: TITLES.event,
          passProps: {
            selectedDate: this.state.selectedDate,
            user: Account.current.uid,
            agenda: Agendas.current
          }
        });
      }
    } else {
      switch(event.id) {
        case 'willAppear':
          break;
        case 'didAppear':
          if (!Account.authorized) {
            navigator.resetTo({
              screen: SCREENS.signin,
              title: TITLES.signin,
              animated: false,
              backButtonHidden: true,
            });
          } else {
            Agendas.getUserAgenda(Account.current.agenda);
          }
          break;
        case 'willDisappear':
        case 'didDisappear':
          break;
      }
    }
  }

  render() {
    const {Account, Agendas} = this.props;
    if (!Account.authorized) {
      return ( <View></View> );
    }
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
    const {Account} = this.props;
    const name = Account.current.firstname + ' ' + Account.current.lastname;
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

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
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