import { observable, action, computed } from 'mobx';
import firebase from 'firebase';
import {SERVICE_STATES} from "../utils/consts";
import ShareAgendaModel from './models/ShareAgendaModel';
import {remove, clone} from 'lodash';

class sharedAgendasStore {
  @observable agendas = [];
  @observable createShareAgendaRequest = {
    state: SERVICE_STATES.initial,
    error: null
  };
  @observable getShareAgendaRequest = {
    state: SERVICE_STATES.pending,
    error: null
  };
  @observable deleteShareAgendaRequest = {
    state: SERVICE_STATES.pending,
    message: null
  };

  @action deleteShareAgenda = (id, cb) => {
    this.deleteShareAgendaRequest.state = SERVICE_STATES.pending;
    const database = firebase.database();
    database.ref('agendas').child(id).remove((error) => {
      if (error) {
        this.deleteShareAgendaError(error.message);
      } else {
        this.deleteShareAgendaSuccess(id, cb);
      }
    });
  };

  @action.bound
  deleteShareAgendaSuccess(id, cb) {
    this.deleteShareAgendaRequest.state = SERVICE_STATES.done;
    this.deleteShareAgendaRequest.message = '';
    this.agendas = this.agendas.filter(a => a.id != id);
    cb && cb();
  }

  @action.bound
  deleteShareAgendaError(error) {
    this.deleteShareAgendaRequest.state = SERVICE_STATES.error;
    this.deleteShareAgendaRequest.message = error;
    console.warn(error);
  }

  @action createSharedAgenda = ({name, users, user}) => {
    this.createShareAgendaRequest.state = SERVICE_STATES.pending;
    const database = firebase.database();
    const agendaKey = database.ref().child('agendas').push().key;
    let updates = {};
    const agendaData = {
      user: user,
      title: name,
      type: 'shared',
      events: true,
      users: users.reduce((acc, val) => {
        return {
          ...acc,
          [val.uid]: true
        }
      }, {[user]: true})
    };

    updates['/agendas/' + agendaKey] = agendaData;

    database.ref().update(updates, error => {
      if (error) {
        this.createShareAgendaError(error.message);
      } else {
        this.createShareAgendaSuccess(agendaData, agendaKey);
      }
    });

  };

  @action.bound
  createShareAgendaSuccess(data, id) {
    const agenda = new ShareAgendaModel(data, id);
    this.agendas.push(agenda);
    this.createShareAgendaRequest.state = SERVICE_STATES.done;
    this.createShareAgendaRequest.eror = null;
  }

  @action.bound
  createShareAgendaError(error) {
    this.createShareAgendaRequest.error = error;
    this.createShareAgendaRequest.state = SERVICE_STATES.error;
  }

  @action clearCreateShareAgendaRequest = () => {
    this.createShareAgendaRequest.error = null;
    this.createShareAgendaRequest.state = SERVICE_STATES.initial;
  };

  @action getSharedAgendas = (userId) => {
    this.getShareAgendaRequest.state = SERVICE_STATES.pending;
    const database = firebase.database();
    database.ref('agendas').orderByChild('type').equalTo('shared').once('value').then((snapshot) => {
      this.getSharedAgendasSuccess(snapshot.val());
    }).catch(error => {
      this.getSharedAgendasError(error.message);
    });
  };

  @action.bound
  getSharedAgendasSuccess(data) {
    this.getShareAgendaRequest.state = SERVICE_STATES.done;
    this.getShareAgendaRequest.error = null;
    if (data) {
      const dataArr = Object.keys(data);
      this.agendas = dataArr.map(k => {
        return new ShareAgendaModel(data[k], k);
      })
    }
  }

  @action.bound
  getSharedAgendasError(error) {
    this.getShareAgendaRequest.state = SERVICE_STATES.error;
    this.getShareAgendaRequest.error = error;
  }

  get userSharedAgendasLength() {
    return (id) => this.agendas.filter(a => a.users[id]).length;
  }

  get getUserSharedAgendas() {
    return (id) => this.agendas.filter(a => a.users[id]);
  }
}

export default new sharedAgendasStore();