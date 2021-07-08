import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import { commonColor } from '../../../theme';

import SideBar from '../sidebar';

import Home from '../../../screens/public/home';
import ScoreBoard from '../../../screens/public/scoreboard';
import Profile from '../../../screens/public/profile';
import About from '../../../screens/public/about';
import Logout from '../../../screens/public/logout';

import Jogos from '../../../screens/moderador/jogos';
import Competicoes from '../../../screens/moderador/competicoes';
import Modalidades from '../../../screens/moderador/modalidades';
import Campi from '../../../screens/moderador/campi';

import Recordes from '../../../screens/moderador/recordes';
import Regulamentos from '../../../screens/moderador/regulamentos';
import Partidas from '../../../screens/moderador/partidas';
import Alertas from '../../../screens/moderador/alertas';
import Polos from '../../../screens/moderador/polos';

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },

    Eventos: { screen: Jogos },
    Competicoes: { screen: Competicoes },
    Modalidades: { screen: Modalidades },
    Campi: { screen: Campi },
    Polos: { screen: Polos },
    Recordes: { screen: Recordes },
    Regulamentos: { screen: Regulamentos },
    Partidas: { screen: Partidas },

    ScoreBoard: { screen: ScoreBoard },
    Alertas: { screen: Alertas },
    Profile: { screen: Profile },
    About: { screen: About },
    Logout: { screen: Logout },
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