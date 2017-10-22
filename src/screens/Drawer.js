import React from 'react';
import {StyleSheet, ListView, Alert} from 'react-native';
import {View, Avatar, AvatarHelper, Text, ListItem, Badge} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';


const items = [
  {
    id: 0,
    icon: 'calendar-check-o',
    text: 'My Agenda',
    badge: 1,
  },
  {
    id: 1,
    icon: 'calendar',
    text: 'My Family Agenda',
    badge: 1
  },
  {
    id: 2,
    icon: 'users',
    text: 'My Shared Agenda',
    badge: 1
  },
  {
    id: 3,
    icon: 'address-book',
    text: 'My Contacts'
  }
];

const items2 = [
  {
    id: 4,
    icon: 'user',
    text: 'My infos',
  },
  {
    id: 5,
    icon: 'sign-out',
    text: 'Log out',
  }
];

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

const ds2 = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});


export default class Drawer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(items),
      dataSource2: ds2.cloneWithRows(items2),
      selectedItem: 0
    };
  }

  selectItem = (id) => {
    this.props.navigator.toggleDrawer({
      side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
      animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      to: 'close' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
    });
    this.setState({
      selectedItem: id,
      dataSource: ds.cloneWithRows(items),
      dataSource2: ds2.cloneWithRows(items2),
    });
  };

  renderRow(row, id) {
    //const initials = AvatarHelper.getInitials(row.name);

    const current = this.state.selectedItem;

    return (
      <ListItem
        onPress={() => this.selectItem(row.id)}
        containerStyle={{backgroundColor: current == row.id ? '#ccc' : '#fff'}}
      >
        <ListItem.Part left paddingV-20>
          <View paddingL-15>
            <Icon name={row.icon} size={20} color="#3182C8" />
          </View>
        </ListItem.Part>
        <ListItem.Part middle containerStyle={styles.border}>
          <View paddingL-30>
            <Text text70>{row.text}</Text>
          </View>
        </ListItem.Part>
        {
          row.badge ?
            <ListItem.Part right>
              <View paddingR-10>
                <Badge label={'1'} />
              </View>
            </ListItem.Part> : null

        }
      </ListItem>
    );
  }

  render() {
    return (
      <View flex bg-white>
        <View padding-20 flex-1 bg-blue10 containerStyle={styles.header}>
          <Avatar containerStyle={{marginVertical: 10}}
                  label={AvatarHelper.getInitials('kévin gossé')} size={80}/>
          <Text blue50 text60>Kévin Gossé</Text>
        </View>
        <View flex-3>
          <View flex>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
            />
          </View>
          <View>
            <ListView
              dataSource={this.state.dataSource2}
              renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
    paddingVertical: 10
  },
  currentItem: {
    backgroundColor: '#ccc'
  }

});
