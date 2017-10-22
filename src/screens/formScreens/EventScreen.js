import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Text, Toast} from 'react-native-ui-lib';
import Btn from 'apsl-react-native-button';
import { Button } from 'antd-mobile';
import {SCREENS, TITLES} from "../../utils/consts";

export default class EventScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  handleNewEvent = () => {
    this.setState({isLoading: true});
    setTimeout(() => {
      this.setState({isLoading: false, showToast: true});
    }, 3000);
  };

  render() {
    return (
      <View paddingH-25 paddingT-25>
        <Text blue50 text20>New Event</Text>
        <Toast
          visible={this.state.showToast}
          message="Event created !"
          position="top"
          allowDismiss
          onDismiss={() => this.setState({showToast: false})}
        />
        <TextInput floatingPlaceholder text50 placeholder="Event Name" dark10
        />
        <TextInput floatingPlaceholder text50 placeholder="Event Location"
                   dark10 />
        <TextInput floatingPlaceholder text50 placeholder="Event Date"
                   dark10 />
        <View marginT-25 center>
          {/*<Button text70 white background-orange30 label="Login" />*/}
          <Button type="primary" loading={this.state.isLoading} onClick={this.handleNewEvent}>Create Event</Button>
{/*          <Btn
            style={{backgroundColor: '#F27052', borderColor: '#F27052'}}
            textStyle={{color: '#FFFFFF'}}
            onPress={this.handleNewEvent}
            {...this.state}
          >
            Create Event
          </Btn>*/}
        </View>
      </View>
    );
  }
}
