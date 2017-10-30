import React, {Component} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {AvatarHelper, Avatar, Colors, Modal, View, Text, Constants, Typography} from 'react-native-ui-lib';
import { inject, observer } from 'mobx-react/native';

@inject('Account', 'Users') @observer
export default class AddPeopleScreen extends Component {

  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  toggleUser = (person) => {
  };

  render() {
    const {Users, Account} = this.props;
    const people = Users.getOtherUsers(Account.current.uid);

    return (
      <ScrollView style={styles.people}>
        {
          people.map((p, i) => {
            const name = p.firstname + ' ' + p.lastname;
            const initials = AvatarHelper.getInitials(name);
            const ribbon = p.share === true ? {ribbonLabel: 'Added'} : {};
            return (
              <TouchableOpacity key={i}
                                onPress={() => Users.toggleUser(p)}
                                underlayColor={'rgba(0, 0, 0, 0.054)'}>
                <View style={styles.section}>
                  <Text style={{...Typography.text70}}>{name}</Text>
                  <Avatar containerStyle={{marginVertical: 5}} label={initials} {...ribbon} />
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