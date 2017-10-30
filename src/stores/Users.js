import { observable, action, computed } from 'mobx';
import firebase from 'firebase';
import {SERVICE_STATES} from "../utils/consts";

class Store {
  @observable state = SERVICE_STATES.initial;
  @observable error = null;
  @observable users = null;

  @action getUsers = () => {
    this.state = SERVICE_STATES.pending;
    const database = firebase.database();
    database.ref('users').once('value').then((snapshot) => {
      this.fetchUsersSuccess(snapshot.val());
    }).catch(error => {
      this.fetchUsersError(error.message);
    });
  };

  @action.bound
  fetchUsersSuccess(data) {
    if (!data)
      return;
    const arr = Object.keys(data);
    let res = [];
    for (let i = 0; i < arr.length; ++i) {
      let user = data[arr[i]];
      user.uid = arr[i];

      res.push({...user});
    }

    this.state = SERVICE_STATES.done;
    this.error = null;
    this.users = [...res];
  }

  @action.bound
  fetchUsersError(error) {
    this.state = SERVICE_STATES.error;
    this.error = error;
    this.users = null;
    console.warn(error);
  }

  @action toggleUser = (user) => {
    this.users = this.users.map(u => {
      if (u.uid === user.uid) {
        return {
          ...u,
          share: !u.share
        }
      }
      return {...u};
    })
  };

  @computed get getUser() {
    return (id) => this.users.find(u => u.uid === id);
  }

  @computed get selectedUsers () {
    return this.users.filter(u => u.share)
  }

  @computed get getOtherUsers () {
    return (id) => this.users.filter(u => u.uid !== id)
  }
}

export default new Store();