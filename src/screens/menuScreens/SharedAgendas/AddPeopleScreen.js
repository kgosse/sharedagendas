import React, {Component} from 'react';
import {ListView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {AvatarHelper, Avatar, Colors, Modal, View, Text, Constants, Typography} from 'react-native-ui-lib';
import { inject, observer } from 'mobx-react/native';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.share !== r2.share});

@inject('Account', 'Users') @observer
export default class AddPeopleScreen extends Component {

  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);


    this.state = {
      dataSource: dataSource.cloneWithRows(props.Users.getOtherUsers(props.Account.current.uid))
    };
  }

  toggleUser = (person) => {
    const {Users, Account} = this.props;
    Users.toggleUser(person, () => {
      this.setState({
        dataSource: dataSource.cloneWithRows(Users.getOtherUsers(Account.current.uid))
      });
    });
  };

  renderRow = (item, sectionId, rowId) => {
    const {Users} = this.props;
    const name = item.firstname + ' ' + item.lastname;
    const initials = AvatarHelper.getInitials(name);
    const ribbon = item.share === true ? {ribbonLabel: 'Added'} : {};
    return (
      <TouchableOpacity onPress={this.toggleUser.bind(this, item)} underlayColor={'rgba(0, 0, 0, 0.054)'}>
        <View style={styles.section}>
          <Text style={{...Typography.text70}}>{name}</Text>
          <Avatar containerStyle={{marginVertical: 5}} label={initials} {...ribbon} />
        </View>
      </TouchableOpacity>
    );
  };


  render() {
    return (
      <ListView style={styles.people} dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections
      />);
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