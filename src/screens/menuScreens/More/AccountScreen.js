import React, {Component} from 'react';
import {StyleSheet,
  Text,
  View,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import {AvatarHelper, Avatar, Colors, Constants, Typography} from 'react-native-ui-lib';

@inject('Account', 'Users') @observer
export default class AccountScreen extends Component {

  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {Account} = this.props;
    const item = Account.current;
    const name = item.firstname + ' ' + item.lastname;
    const initials = AvatarHelper.getInitials(name);
    const settings =  {
      "Firstname": item.firstname,
      "Lastname": item.lastname,
      "Email": item.email,
    };
    return (
      <View style={styles.container}>
        <Avatar containerStyle={{alignSelf:'center', marginBottom:20}} label={initials} />
{/*        <View style={{alignSelf:'center', backgroundColor:'gray', width:120, height:120, borderRadius:90, marginBottom:20}}>
        </View>*/}
        <Text style={{alignSelf:'center', marginBottom:30, fontSize:26, fontWeight:'100'}}>
          {name}
        </Text>
        {
          Object.keys(settings).map((key)=>{
            return <View key={key} style={styles.setting}>
              <Text style={styles.settingProp}>
                {key}
              </Text>
              <Text style={styles.settingVal}>
                {settings[key]}
              </Text>
            </View>
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  setting:{
    padding:20,
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'#d8d8d8',
  },
  settingProp:{
    color:'#888',
    marginRight:10,
    width:70,
  },
  container: {
    flex:1,
    marginTop: 30,
    backgroundColor: 'white',
  },
});