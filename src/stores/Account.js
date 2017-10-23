import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

import Models from './models';

class Store {
  @persist('object', Models.Account) @observable current = new Models.Account;
  @persist @observable authorized = false;

  @action login = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      if (username && password) {
        this.authorized = true;
        this.current = { username, password };
        resolve({ message: 'success' });
      } else {
        reject({ message: 'Something is wrong with input data :(' });
      }
    });
  };

  @action setAuthorized = (val) => {
    this.authorized = val;
  };

  @action updateAccount = (val) => {
    this.current.firstname = val.firstname;
    this.current.lastname = val.lastname;
    this.current.uid = val.uid;
  };

  @action logout = () => {
    return new Promise((resolve, reject) => {
      this.authorized = false;
      this.current = {};

      resolve();
    });
  }
}

export default new Store();