import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Text, Toast, Colors} from 'react-native-ui-lib';
import { inject, observer } from 'mobx-react/native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'antd-mobile';
import {SERVICE_STATES} from "../../utils/consts";

@inject('Events') @observer
export default class EventScreen extends Component {

  static navigatorStyle = {
    tabBarHidden: true
  };

  static propTypes = {
    navigator: PropTypes.object,
    selectedDate: PropTypes.object,
    user: PropTypes.string,
    agenda: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      datetime: props.selectedDate ? props.selectedDate.dateString + ' 15:00' : Date.now(),
      eventError: null,
      showToast: false
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    const {Events} = this.props;
    switch(event.id) {
      case 'willAppear':
      case 'didAppear':
      case 'willDisappear':
        break;
      case 'didDisappear':
        Events.initState();
        break;
    }
  }


  handleNewEvent = () => {
    const {Events, user, agenda} = this.props;
    const name = this.eventName.state.value;
    const location = this.eventLocation.state.value;
    const day = this.state.datetime;
    Events.addEvent({
      name,
      location,
      day,
      user,
      agenda
    });

  };

  render() {
    const {Events} = this.props;

    const bgColor = Events.error ? Colors.red10 : Colors.blue10;
    const message = Events.error || 'Event created !';

    return (
      <View paddingH-25 paddingT-25>
        <Text blue50 text20>New Event</Text>
        <TextInput floatingPlaceholder text50 placeholder="Event Name"
                   dark10 ref={e => this.eventName = e}/>
        <TextInput floatingPlaceholder text50 placeholder="Event Location"
                   dark10 ref={e => this.eventLocation = e} />

        <View center>
          <DatePicker
            style={{width: 300}}
            date={this.state.datetime}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={true}
            onDateChange={(datetime) => {this.setState({datetime: datetime});}}
          />
        </View>
        <View marginT-25 center>
          <Button type="primary" loading={Events.state === SERVICE_STATES.pending}
                  disabled={Events.state === SERVICE_STATES.pending}
                  onClick={this.handleNewEvent}>
            Create Event
          </Button>
        </View>
        <Toast
          visible={Events.state === SERVICE_STATES.done}
          message={message}
          position="top"
          allowDismiss
          backgroundColor={bgColor}
          onDismiss={Events.initState}
        />
      </View>
    );
  }
}
