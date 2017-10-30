import { Navigation } from 'react-native-navigation';
import SignInScreen from './formScreens/SignInScreen';
import SignUpScreen from './formScreens/SignUpScreen';
import EventScreen from './formScreens/EventScreen';
import AddPeopleScreen from './menuScreens/SharedAgendas/AddPeopleScreen';
import ShareAgendaFormScreen from './formScreens/SharedAgendaFormScreen';
import MyAgendaScreen from './menuScreens/MyAgenda/MyAgendaScreen';
import SharedAgendasScreen from './menuScreens/SharedAgendas/SharedAgendasScreen';
import AgendaOptionsScreen from './menuScreens/SharedAgendas/AgendaOptionsScreen';
import MoreScreen from './menuScreens/More/MoreScreen';
import AgendaScreen from './components/AgendaScreen';
import PeopleScreen from './menuScreens/More/PeopleScreen';
import Drawer from './Drawer';
import {SCREENS} from '../utils/consts';

export function registerScreens(store, Provider) {
  Navigation.registerComponent(SCREENS.signin, () => SignInScreen, store, Provider);
  Navigation.registerComponent(SCREENS.signup, () => SignUpScreen, store, Provider);
  Navigation.registerComponent(SCREENS.event, () => EventScreen, store, Provider);
  Navigation.registerComponent(SCREENS.addpeople, () => AddPeopleScreen, store, Provider);
  Navigation.registerComponent(SCREENS.newagenda, () => ShareAgendaFormScreen, store, Provider);
  Navigation.registerComponent(SCREENS.agenda, () => MyAgendaScreen, store, Provider);
  Navigation.registerComponent(SCREENS.sharedAgendas, () => SharedAgendasScreen, store, Provider);
  Navigation.registerComponent(SCREENS.agendaOptions, () => AgendaOptionsScreen, store, Provider);
  Navigation.registerComponent(SCREENS.more, () => MoreScreen, store, Provider);
  Navigation.registerComponent(SCREENS.drawer, () => Drawer, store, Provider);
  Navigation.registerComponent(SCREENS.agendaview, () => AgendaScreen, store, Provider);
  Navigation.registerComponent(SCREENS.people, () => PeopleScreen, store, Provider);
}

