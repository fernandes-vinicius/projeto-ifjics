import React from 'react';
import { Root } from 'native-base';
import { createSwitchNavigator } from 'react-navigation';

import { NavigationService } from '../services';

import App from '../App';

import Login from '../screens/public/login';
import Register from '../screens/public/register';

import AppNavigator from './public';
import AppNavigatorMod from './moderador';
import AppNavigatorAdm from './administrador';

const RootSwitch = createSwitchNavigator(
  {
    App: { screen: App },

    Login: { screen: Login },
    Register: { screen: Register },

    AppNavigator: { screen: AppNavigator },
    AppNavigatorMod: { screen: AppNavigatorMod },
    AppNavigatorAdm: { screen: AppNavigatorAdm },
  },
  {
    initialRouteName: 'App',
  },
);

export default () =>
  <Root>
    <RootSwitch
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }} />
  </Root>;