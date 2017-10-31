import React, {Component} from 'react';
import {ListView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {AvatarHelper, Avatar, Colors, Modal, View, Text, Constants, Typography} from 'react-native-ui-lib';
import { inject, observer } from 'mobx-react/native';
import {SCREENS} from "../../../utils/consts";

@inject('Account', 'Users') @observer
export default class PeopleScreen extends Component {

  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.day !== r2.day});

    this.state = {
      dataSource: dataSource.cloneWithRows(props.Users.getOtherUsers(props.Account.current.uid))
    };
  }

  openAgenda = (person) => {
    const {navigator} = this.props;
    navigator.push({
      screen: SCREENS.agendaview,
      title: 'Agenda - ' + person.firstname + ' ' + person.lastname,
      passProps: {
        user: person,
        readOnly: true,
        agendaId: person.agenda
      },
      navigatorButtons: {
      }
    });
  };

  renderRow = (item, sectionId, rowId) => {
    const name = item.firstname + ' ' + item.lastname;
    const initials = AvatarHelper.getInitials(name);
    return (
      <TouchableOpacity onPress={this.openAgenda.bind(this, item)} underlayColor={'rgba(0, 0, 0, 0.054)'}>
        <View style={styles.section}>
          <Text style={{...Typography.text70}}>{name}</Text>
          <Avatar containerStyle={{marginVertical: 5}} label={initials} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ListView style={styles.people} dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections
      />
    );
  }
}

const styles = StyleSheet.create({
  page: {
    width: Constants.screenWidth,
  },
  people: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});