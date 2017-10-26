import { observable, computed } from 'mobx';
import { persist } from 'mobx-persist';

class Agenda {
  @persist @observable firstname = null;
  @persist @observable lastname = null;
  @persist @observable uid = null;
  @persist @observable agenda = null;
}

export default Agenda;