import { Navigation } from 'react-native-navigation';
import SignInScreen from './authScreens/SignInScreen';
import SignUpScreen from './authScreens/SignUpScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.auth.SignInScreen', () => SignInScreen, store, Provider);
  Navigation.registerComponent('app.auth.SignUpScreen', () => SignUpScreen, store, Provider);
}

