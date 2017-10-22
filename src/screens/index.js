import { Navigation } from 'react-native-navigation';
import SignInScreen from './formScreens/SignInScreen';
import SignUpScreen from './formScreens/SignUpScreen';
import EventScreen from './formScreens/EventScreen';
import MyAgendaScreen from './menuScreens/MyAgendaScreen';
import SharedAgendasScreen from './menuScreens/SharedAgendasScreen';
import MoreScreen from './menuScreens/MoreScreen';
import Drawer from './Drawer';
import {SCREENS} from '../utils/consts';

export function registerScreens(store, Provider) {
  Navigation.registerComponent(SCREENS.signin, () => SignInScreen, store, Provider);
  Navigation.registerComponent(SCREENS.signup, () => SignUpScreen, store, Provider);
  Navigation.registerComponent(SCREENS.event, () => EventScreen, store, Provider);
  Navigation.registerComponent(SCREENS.agenda, () => MyAgendaScreen, store, Provider);
  Navigation.registerComponent(SCREENS.sharedAgendas, () => SharedAgendasScreen, store, Provider);
  Navigation.registerComponent(SCREENS.more, () => MoreScreen, store, Provider);
  Navigation.registerComponent(SCREENS.drawer, () => Drawer, store, Provider);
}

