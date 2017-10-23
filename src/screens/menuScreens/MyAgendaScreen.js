import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { inject, observer } from 'mobx-react/native';
import {SCREENS, TITLES} from "../../utils/consts";

@inject('App', 'Account') @observer
export default class MyAgendaScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Event',
        id: 'Event',
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      items: {}
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const {navigator, Account} = this.props;
    if (!Account.authorized) {
      navigator.resetTo({
        screen: SCREENS.signin,
        title: TITLES.signin,
        animated: false,
        backButtonHidden: true,
      });
    }
  }

  onNavigatorEvent(event) {
    const {navigator, Account} = this.props;
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'Event') {
        navigator.push({
          screen: SCREENS.event,
          title: TITLES.event,
        });
      }
    } else {
      switch(event.id) {
        case 'willAppear':
        case 'didAppear':
          if (!Account.authorized) {
            navigator.resetTo({
              screen: SCREENS.signin,
              title: TITLES.signin,
              animated: false,
              backButtonHidden: true,
            });
          }
          break;
        case 'willDisappear':
          if (!Account.authorized) {
            navigator.toggleTabs({
              to: 'hidden',
              animated: false
            });
          }
          break;
        case 'didDisappear':
          break;
      }
    }
  }

  render() {
    const {Account} = this.props;
    if (!Account.authorized) {
      return (<View></View>);
    }
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        // selected={'2017-05-16'}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        //markingType={'interactive'}
        //markedDates={{
        //  '2017-05-08': [{textColor: '#666'}],
        //  '2017-05-09': [{textColor: '#666'}],
        //  '2017-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
        //  '2017-05-21': [{startingDay: true, color: 'blue'}],
        //  '2017-05-22': [{endingDay: true, color: 'gray'}],
        //  '2017-05-24': [{startingDay: true, color: 'gray'}],
        //  '2017-05-25': [{color: 'gray'}],
        //  '2017-05-26': [{endingDay: true, color: 'gray'}]}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems = (day) => {
    if (!day)
      return;
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  };

  renderItem = (item) => {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
});