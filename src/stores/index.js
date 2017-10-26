import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';

import App     from './App';
import Account from './Account';
import Agendas from './Agendas';
import Events from './Events';

// AsyncStorage.clear();

const hydrate = create({ storage: AsyncStorage });

const stores = {
  App,
  Account,
  Agendas,
  Events
};

// you can hydrate stores here with mobx-persist
hydrate('Account', stores.Account);

export default {
  ...stores
};