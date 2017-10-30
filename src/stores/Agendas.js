import { observable, action } from 'mobx';
import firebase from 'firebase';
import {SERVICE_STATES} from "../utils/consts";
import moment from 'moment';


class Store {
  @observable userAgenda = null;
  @observable sharedAgendas = null;
  @observable agendas = {};
  @observable current = null;
  @observable state = SERVICE_STATES.pending;
  @observable error = null;
  @observable events = {};
  @observable saState = SERVICE_STATES.pending;
  @observable saError = null;

  @action createSharedAgenda = ({name, users, user}) => {
    this.state = SERVICE_STATES.pending;
    const database = firebase.database();
    const agendaKey = database.ref().child('agendas').push().key;
    let updates = {};
    const agendaData = {
      user: user.uid,
      title: name,
      type: 'shared',
      events: true,
      users: users.reduce(acc, val => {
        return {
          ...acc,
          [val]: true
        }
      }, {[user.uid]: true})
    };

    updates['/agendas/' + agendaKey] = agendaData;

    database.ref().update(updates, error => {
      if (error) {
        this.setState({showToast: true, isLoading: false, error: error});
      } else {
        this.setState({showToast: true, isLoading: false, error: null});
      }
    });

  };

  @action getUserAgenda = (agendaId) => {
    agendaId = agendaId || this.current;
    this.state = SERVICE_STATES.pending;
    const database = firebase.database();
    database.ref(`agendas/${agendaId}`).once('value').then((snapshot) => {
      this.fetchUserAgendaSuccess(snapshot.val(), agendaId);
    }).catch(error => {
      this.fetchUserAgendaError(error.message);
    });
  };

  @action.bound
  fetchUserAgendaSuccess(data, id) {
    this.state = SERVICE_STATES.done;
    this.userAgenda = {...data};
    this.agendas = {
      ...this.agendas,
      [id]: {
        ...data
      }
    };
    this.setCurrent(id);
  }

  @action.bound
  fetchUserAgendaError(error) {
    this.state = SERVICE_STATES.error;
    this.userAgenda = {};
    this.error = error;
  }

  @action getSharedAgendas = (userId) => {
    this.saState = SERVICE_STATES.pending;
    const database = firebase.database();
    database.ref('agendas').orderByChild('type').equalTo('shared').once('value').then((snapshot) => {
      this.fetchSharedAgendasSuccess(snapshot.val());
    }).catch(error => {
      this.fetchSharedAgendasError(error.message);
    });
  };

  @action.bound
  fetchSharedAgendasSuccess(data) {
    this.saState = SERVICE_STATES.done;
    this.saError = null;
    this.sharedAgendas = data ? {...data} : null;
    this.agendas = {
      ...this.agendas,
      ...data
    };
  }

  @action.bound
  fetchSharedAgendasError(error) {
    this.saState = SERVICE_STATES.error;
    this.sharedAgendas = {};
    this.saError = error;
    console.warn(error);
  }

  @action setCurrent = (id) => {
    this.current = id;
    this.events = {};
    this.addEvents(this.current);
  };

  @action addEvents = (id) => {
    const tasks = this.agendas[id].events;
    if (tasks && tasks !== true) {
      const arr = Object.keys(tasks);
      for (let i = 0; i < arr.length; ++i) {
        let event = {...tasks[arr[i]]};
        let day = moment(event.day).format('YYYY-MM-DD');
        let result = Array.isArray(this.events[day]) ? this.events[day] : [];
        this.events[day] = [event, ...result];
      }
    }
  };

  @action loadEvents = (data) => {
    /*    const val = this.events[day.dateString];
        if (val && !val.user)
          return;*/
    if (!data)
      return;
    let begin = moment(data.dateString).startOf('month');
    let end = moment(data.dateString).endOf('month');
    while (begin.isSameOrBefore(end)) {
      const day = begin.format('YYYY-MM-DD');
      let value = this.events[day];
      this.events[day] = Array.isArray(value) ? [...value] : [];
      begin.add(1, 'days');
    }
    // this.addEvents(this.current);
    // reset events by putting all the days of the month
    // boucler d'une date de début à une date de fin
    // date début: day - 30 et date fin: day + 30
    // for the selected agenda events
    //   add event
  }

}

export default new Store();