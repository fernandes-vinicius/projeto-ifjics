/**
 * Margens, paddings, tamanhos configurados pela plataforma 
 * Border Radius, etc. Tudo que está ligado diretamente com
 * espaçamento e ocupação de um componente em tela vai nesse arquivo.
 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  smallMargin: 5,
  smallPadding: 5,

  baseMargin: 10,
  basePadding: 10,

  doubleBaseMargin: 20,
  doubleBasePadding: 20,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,

  baseRadius: 5,
  baseWidth: 1,

  statusBarHeight: (Platform.OS === 'ios') ? 20 : 0,
};

export default metrics;