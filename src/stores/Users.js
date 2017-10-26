import { observable, action } from 'mobx';
import firebase from 'firebase';
import {SERVICE_STATES} from "../utils/consts";


class Store {
  @observable state = SERVICE_STATES.initial;
  @observable error = null;


}

export default new Store();