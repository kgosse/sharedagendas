import {Navigation} from 'react-native-navigation';
import React from 'react';
import {registerScreens} from './screens';
import Icon from 'react-native-vector-icons/Ionicons';
import {Assets} from 'react-native-ui-lib';
import {SCREENS} from "./utils/consts";

let agendaIcon;
let agendasIcon;
let optionsIcon;
let plusIcon;

registerScreens();


export default class App {
  constructor() {

    // Start app only if all icons are loaded
    this._populateIcons().then(() => {
      // Start app only if all icons are loaded
      this.startApp();
    }).catch((error) => {
      console.error(error);
    });
  }

  _populateIcons = function () {
    return new Promise(function (resolve, reject) {
      Promise.all(
        [
          Icon.getImageSource('md-calendar', 30),
          Icon.getImageSource('md-people', 30),
          Icon.getImageSource('ios-more', 30),
          Icon.getImageSource('md-add'),
        ]
      ).then((values) => {
        agendaIcon = values[0];
        agendasIcon = values[1];
        optionsIcon = values[2];
        plusIcon = values[3];
        Assets.loadAssetsGroup('icons', {
          calendar: values[0],
          people: values[1],
          options: values[2],
          plus: values[3],
        });
        resolve(true);
      }).catch((error) => {
        console.log(error);
        reject(error);
      }).done();
    });
  };

  startApp() {
// this will start our app
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Agenda',
          screen: SCREENS.agenda, // this is a registered name for a screen
          icon: Assets.icons.calendar,
          title: 'Agenda'
        },
        {
          label: 'Shared Agendas',
          screen: SCREENS.sharedAgendas, // this is a registered name for a screen
          icon: Assets.icons.people,
          title: 'Shared Agendas'
        },
        {
          label: 'More',
          screen: SCREENS.more, // this is a registered name for a screen
          icon: Assets.icons.options,
          title: 'Options'
        },
      ]
    });

  }
}


// start the app
