import React, { Component } from "react";
import { ImageBackground } from 'react-native';

import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  View,
  Text,
} from "native-base";

import styles from "./styles";
import { images, commonColor } from '../../../theme';

const launchscreenLogo = images.homeLogo;

class About extends Component {

  render() {
    return (
      <Container>

        <Header androidStatusBarColor={commonColor.statusBar} style={{ backgroundColor: commonColor.primary }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Sobre</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.logoContainer}>
          <ImageBackground source={launchscreenLogo} style={styles.logo} />
        </View>

        <View style={styles.container}>
          <Text style={styles.welcome}>©IFJICS - Todos os direitos reservados.</Text>
          <Text style={styles.welcome}>Desenvolvido por Vinícius Fernandes, Flávia Rafaela Diógenes,</Text>
          <Text style={styles.welcome}>Gabriele Rêgo, Elenilson Vieira e Maikon Maia.</Text>
          <Text style={styles.welcome}>Instituto Federal do Rio Grande do Norte.</Text>
          <Text note style={styles.welcome}>
            @Versão 2020101001 {/* ANO-MES-DIA-BUILD */}
          </Text>
        </View>

      </Container>
    );
  }
}

export default About;