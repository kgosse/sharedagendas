import { observable, action } from 'mobx';
import firebase from 'firebase';
import {SERVICE_STATES} from "../utils/consts";


class Store {
  @observable state = SERVICE_STATES.initial;
  @observable error = null;

  @action addEvent = ({name, location, agenda, day, user}) => {
    this.state = SERVICE_STATES.pending;
    const database = firebase.database();

    const eventKey = database.ref(`agendas/${agenda}`).child('events').push().key;

    const eventData = {
      name,
      location,
      day,
      user
    };

    const updates = {};
    updates[`agendas/${agenda}/events/${eventKey}`] = eventData;

    database.ref().update(updates, error => {
      if (error) {
        this.addEventError(error.message);
      } else {
        this.addEventSuccess();
      }
    });

  };

  @action.bound
  addEventSuccess() {
    this.state = SERVICE_STATES.done;
  }

  @action.bound
  addEventError(error) {
    this.state = SERVICE_STATES.done;
    this.error = error;
  }

  @action initState = () => {
    this.error = null;
    this.state = SERVICE_STATES.initial;
  }

}

export default new Store();