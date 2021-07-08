import { createStackNavigator } from 'react-navigation';

import Drawer from './drawer';

import JogosEdit from '../../screens/moderador/jogos/edit';
import JogosCreate from '../../screens/moderador/jogos/create';

import CompeticaoEdit from '../../screens/moderador/competicoes/edit';
import CompeticaoCreate from '../../screens/moderador/competicoes/create';

import PartidaEdit from '../../screens/moderador/partidas/edit';
import PartidaCreate from '../../screens/moderador/partidas/create';

import PontuacaoGeralCreate from '../../screens/moderador/pontuacaoGeral/create';

import PontuacaoPartidasCreate from '../../screens/moderador/pontuacaoPartidas/create';

import ModalidadeEdit from '../../screens/moderador/modalidades/edit';
import ModalidadeCreate from '../../screens/moderador/modalidades/create';

import CampiEdit from '../../screens/moderador/campi/edit';
import CampiCreate from '../../screens/moderador/campi/create';

import AlertasEdit from '../../screens/moderador/alertas/edit';
import AlertasCreate from '../../screens/moderador/alertas/create';

import RegulamentoEdit from '../../screens/moderador/regulamentos/edit';
import RegulamentoCreate from '../../screens/moderador/regulamentos/create';

import RecordeEdit from '../../screens/moderador/recordes/edit';
import RecordeCreate from '../../screens/moderador/recordes/create';

import PoloEdit from '../../screens/moderador/polos/edit';
import PoloCreate from '../../screens/moderador/polos/create';

import ModeradoresCreate from '../../screens/administrador/moderadores/create';
import AdministradoresCreate from '../../screens/administrador/administradores/create';

import ScoreboardIndex from '../../screens/public/scoreboard';
import ScoreboardGeral from '../../screens/public/scoreboard/scoreGeral';
import ScoreboardPorCompeticao from '../../screens/public/scoreboard/socrePorCompeticao';
import ScoreboardParciais from '../../screens/public/scoreboard/resultadosParciais';

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },

    JogosEdit: { screen: JogosEdit },
    JogosCreate: { screen: JogosCreate },

    CompeticaoEdit: { screen: CompeticaoEdit },
    CompeticaoCreate: { screen: CompeticaoCreate },

    PartidaEdit: { screen: PartidaEdit },
    PartidaCreate: { screen: PartidaCreate },

    PontuacaoGeralCreate: { screen: PontuacaoGeralCreate },

    PontuacaoPartidasCreate: { screen: PontuacaoPartidasCreate },

    ModalidadeEdit: { screen: ModalidadeEdit },
    ModalidadeCreate: { screen: ModalidadeCreate },

    CampiEdit: { screen: CampiEdit },
    CampiCreate: { screen: CampiCreate },

    AlertasEdit: { screen: AlertasEdit },
    AlertasCreate: { screen: AlertasCreate },

    PoloEdit: { screen: PoloEdit },
    PoloCreate: { screen: PoloCreate },

    RegulamentoEdit: { screen: RegulamentoEdit },
    RegulamentoCreate: { screen: RegulamentoCreate },

    RecordeEdit: { screen: RecordeEdit },
    RecordeCreate: { screen: RecordeCreate },

    ModeradoresCreate: { screen: ModeradoresCreate },
    AdministradoresCreate: { screen: AdministradoresCreate },

    ScoreboardIndex: { screen: ScoreboardIndex },
    ScoreboardGeral: { screen: ScoreboardGeral },
    ScoreboardPorCompeticao: { screen: ScoreboardPorCompeticao },
    ScoreboardParciais: { screen: ScoreboardParciais },
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
);

export default AppNavigator;