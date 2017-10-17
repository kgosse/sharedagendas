import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.auth.SignInScreen',
    title: 'Shared Agendas'
  },
  drawer: {
    left: {
      screen: 'app.drawer',
    },
    disableOpenGesture: false
  }
});
