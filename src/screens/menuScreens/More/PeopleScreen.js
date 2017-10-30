import React, {Component} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
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

    this.state = {
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

  render() {
    const {Users} = this.props;
    const people = Users.users;

    return (
      <ScrollView contentContainerStyle={styles.people}>
        {
          people.map((p, i) => {
            const name = p.firstname + ' ' + p.lastname;
            const initials = AvatarHelper.getInitials(name);
            return (
              <TouchableOpacity key={i}
                                  onPress={this.openAgenda.bind(this, p)}
                                  underlayColor={'rgba(0, 0, 0, 0.054)'}>
                <View style={styles.section}>
                  <Text style={{...Typography.text70}}>{name}</Text>
                  <Avatar containerStyle={{marginVertical: 5}} label={initials} />
                </View>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    width: Constants.screenWidth,
  },
  people: {
    flex: 1,
    padding: 25,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});