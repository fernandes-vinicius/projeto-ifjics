import { createStackNavigator } from 'react-navigation';

import Drawer from './drawer';

import ScoreboardIndex from '../../screens/public/scoreboard';
import ScoreboardGeral from '../../screens/public/scoreboard/scoreGeral';
import ScoreboardParciais from '../../screens/public/scoreboard/resultadosParciais';
import ScoreboardPorCompeticao from '../../screens/public/scoreboard/socrePorCompeticao';
import ProfileEdit from '../../screens/public/profile/edit';

const AppNavigator = createStackNavigator(
  {           
    Drawer: { screen: Drawer },

    ScoreboardIndex: { screen: ScoreboardIndex },
    ScoreboardGeral: { screen: ScoreboardGeral },
    ScoreboardParciais: { screen: ScoreboardParciais },
    ScoreboardPorCompeticao: { screen: ScoreboardPorCompeticao },
    ProfileEdit: { screen: ProfileEdit },
  },
  {
    initialRouteName: 'Drawer',
    headerMode: "none"
  }
);

export default AppNavigator;