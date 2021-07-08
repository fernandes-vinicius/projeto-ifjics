import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import { commonColor } from '../../../theme';

import SideBar from '../sidebar';

import Home from '../../../screens/public/home';
import ScoreBoard from '../../../screens/public/scoreboard';
import Profile from '../../../screens/public/profile';
import About from '../../../screens/public/about';
import Logout from '../../../screens/public/logout';
import Eventos from '../../../screens/public/jogos';
import Competicoes from '../../../screens/public/competicoes';
import Recordes from '../../../screens/public/recordes';
import Regulamentos from '../../../screens/public/regulamentos';
import Partidas from '../../../screens/public/partidas';

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    ScoreBoard: { screen: ScoreBoard },
    Profile: { screen: Profile },
    About: { screen: About },
    Logout: { screen: Logout },
    EventosPublic: { screen: Eventos },
    CompeticoesPublic: { screen: Competicoes },
    Recordes: { screen: Recordes },
    Regulamentos: { screen: Regulamentos },
    PartidasPublic: { screen: Partidas },
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: commonColor.themeColor
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default Drawer;