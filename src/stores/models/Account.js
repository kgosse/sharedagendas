import { observable, computed } from 'mobx';
import { persist } from 'mobx-persist';

class Account {
  @persist @observable firstname = null;
  @persist @observable lastname = null;
  @persist @observable uid = null;
  @persist @observable agenda = null;
  @persist @observable email = null;
}

export default Account;