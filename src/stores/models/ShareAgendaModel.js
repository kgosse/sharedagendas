import { observable, computed } from 'mobx';
import { persist } from 'mobx-persist';

class ShareAgendaModel {
  @observable events = true;
  @observable type = '';
  @observable user = null;
  @observable users = null;
  @observable title = null;
  @observable id = null;

  constructor(data, id) {
    this.events = data.events;
    this.title = data.title;
    this.type = data.type;
    this.user = data.user;
    this.users = data.users;
    this.id = id;
  }
}

export default ShareAgendaModel;