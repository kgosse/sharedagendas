import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import firebase from 'firebase';
import {SERVICE_STATES} from "../utils/consts";

import Models from './models';

class Store {
  @persist('object', Models.Account) @observable current = new Models.Account;
  @persist @observable authorized = false;
  @persist @observable state = SERVICE_STATES.done;
  @persist @observable errorMessage = null;

  @action login = (email, password, cb) => {
    this.state = SERVICE_STATES.pending;
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref(`users/${userId}`).once('value').then((snapshot) => {
          this.updateAccount(snapshot.val(), userId);
          this.loginSuccess(cb);
        }).catch(error => {
          this.loginError(error.message);
        });
      })
      .catch((error) => {
        this.loginError(error.message);
      });
  };

  @action.bound
  loginSuccess(cb) {
    this.authorized = true;
    this.state = SERVICE_STATES.done;
    this.errorMessage = null;
    cb && cb();
  }

  @action.bound
  loginError(error) {
    this.authorized = false;
    this.state = SERVICE_STATES.error;
    this.errorMessage = error;
  }

  @action setAuthorized = (val) => {
    this.authorized = val;
  };

  @action updateAccount = (val, uid) => {
    this.current.firstname = val.firstname;
    this.current.lastname = val.lastname;
    this.current.uid = val.uid || uid;
    this.current.agenda = val.agenda;
  };

  @action logout = () => {
    return new Promise((resolve, reject) => {
      this.authorized = false;
      this.current = {};

      resolve();
    });
  };

  @action cancelError = () => {
    this.errorMessage = null;
    this.state = SERVICE_STATES.done;
  }
}

export default new Store();