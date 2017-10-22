import { Platform } from 'react-native';
import { observable, action } from 'mobx';

class Store {
  @observable isAndroid = Platform.OS === 'android';
  @observable isIOS     = Platform.OS === 'ios';
}

export default new Store();