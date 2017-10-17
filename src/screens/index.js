import { Navigation } from 'react-native-navigation';
import SignInScreen from './authScreens/SignInScreen';
import SignUpScreen from './authScreens/SignUpScreen';
import MyAgendaScreen from './menuScreens/MyAgendaScreen';
import Drawer from './Drawer';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.auth.SignInScreen', () => SignInScreen, store, Provider);
  Navigation.registerComponent('app.auth.SignUpScreen', () => SignUpScreen, store, Provider);
  Navigation.registerComponent('app.menu.MyAgendaScreen', () => MyAgendaScreen, store, Provider);
  Navigation.registerComponent('app.drawer', () => Drawer, store, Provider);
}

