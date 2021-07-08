import React, { Component } from "react";
import { ImageBackground, TouchableOpacity } from 'react-native';
import ModalDetails from './detailsAlert/index';
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
  Card,
  CardItem,
  Content,

} from "native-base";

import styles from "./styles";
import { images, commonColor } from '../../../theme';
import { ApiService, StorageService } from '../../../services';

const launchscreenLogo = images.homeLogo;
const ROLE_ADM = 'ROLE_ADM';
const ROLE_MOD = 'ROLE_MOD';
export default class Home extends Component {


  state = {
    modalDetailsVisible: false,
    alertas: [],
    loaderVisible: false,
    user: [],
  }

  async componentDidMount() {
    this.setState({ loaderVisible: true });
    var user = await StorageService.getItem('user');
    this.setState({ user });
    await ApiService.get('/alertas')
      .then((response) => {

        console.log("RESPONSE", response);

        this.setState({ alertas: response.data, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  isAdm(user) {
    for (let role of user.roles)
      if (role.authority == ROLE_ADM) return true;
    return false;
  }

  isMod(user) {
    for (let role of user.roles)
      if (role.authority == ROLE_MOD) return true;
    return false;
  }

  handleResultados() {
    this.props.navigation.navigate('ScoreboardIndex');
  }

  handleEvent() {
    if (this.isAdm(this.state.user) || this.isMod(this.state.user))
      this.props.navigation.navigate('Eventos');
    else
      this.props.navigation.navigate('EventosPublic');
  }

  handleCompeticoes() {
    if (this.isAdm(this.state.user) || this.isMod(this.state.user))
      this.props.navigation.navigate('Competicoes');
    else
      this.props.navigation.navigate('CompeticoesPublic');
  }

  handlePartidas() {
    if (this.isAdm(this.state.user) || this.isMod(this.state.user))
      this.props.navigation.navigate('Partidas');
    else
      this.props.navigation.navigate('PartidasPublic');
  }

  render() {
    return (

      <Container style={{ backgroundColor: commonColor.sixth }}>
        <ModalDetails
          visible={this.state.modalDetailsVisible}
          onClose={() => this.setState({ modalDetailsVisible: false })}
          data={this.state.alertas}
        />

        <Header androidStatusBarColor={commonColor.statusBar} style={{ backgroundColor: commonColor.sixth }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()} >

              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Início</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.setState({ modalDetailsVisible: true })} >

              <Icon name="comment-alert" type="MaterialCommunityIcons" />
            </Button>
          </Right>
        </Header>


        <View style={styles.container}>

          <View style={styles.viewText}>
            <Text style={{ fontSize: 25, color: commonColor.tint }}>Bem vindo(a) ao IF JICS!</Text>
          </View>

          <View style={styles.viewCard}>
            <View style={styles.view}>
              <TouchableOpacity onPress={() => this.handleEvent()} >
                <CardItem style={styles.cardItem}>
                  <Card style={styles.card}>
                    <Icon style={{ color: commonColor.fifth, fontSize: 55, paddingBottom: 50 }} type='MaterialIcons' name="event" />

                  </Card>
                  <Text style={{ color: commonColor.tint, fontSize: 12.7 }}>Eventos</Text>
                </CardItem>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => this.handleCompeticoes()}>
                <CardItem style={styles.cardItem}>
                  <Card style={styles.card}>
                    <Icon style={{ color: commonColor.fifth, fontSize: 55, paddingBottom: 50 }} type='Entypo' name="trophy" />
                  </Card>
                  <Text style={{ color: commonColor.tint, fontSize: 12.7 }}>Modalidades</Text>
                </CardItem>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.handlePartidas()}>
                <CardItem style={styles.cardItem}>
                  <Card style={styles.card}>
                    <Icon style={{ color: commonColor.fifth, fontSize: 55, paddingBottom: 50 }} type='Entypo' name="medal" />

                  </Card>
                  <Text style={{ color: commonColor.tint, fontSize: 12.7 }}>Jogos e Rodadas</Text>
                </CardItem>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.handleResultados()}>
                <CardItem style={styles.cardItem}>
                  <Card style={styles.card}>
                    <Icon style={{ color: commonColor.fifth, fontSize: 55, paddingBottom: 50 }} type='Entypo' name="blackboard" />

                  </Card>
                  <Text style={{ color: commonColor.tint, fontSize: 12.7 }}>Quadro de Pontuação</Text>
                </CardItem>
              </TouchableOpacity>

            </View>
          </View>
        </View >


      </Container >
    );
  }
}
