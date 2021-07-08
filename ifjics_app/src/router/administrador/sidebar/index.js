import React, { Component } from "react";
import { Image, ImageBackground } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Separator,
  Button,
} from "native-base";
import styles from "./styles";
import { images, commonColor } from '../../../theme';

const drawerCover = images.drawerCover;
const drawerImage = images.logo;
const menu = [
  {
    name: 'Início',
    route: 'Home',
    icon: 'home',
    type: 'FontAwesome',
  },
  {
    name: 'Evento',
    route: 'Eventos',
    icon: 'event-note',
    type: 'MaterialIcons',
  },
  {
    name: 'Modalidade',
    route: 'Competicoes',
    icon: 'trophy',
    type: 'FontAwesome',
  },
  {
    name: 'Jogos e Rodadas',
    route: 'Partidas',
    icon: 'medal',
    type: 'Entypo',
  },
  {
    name: 'Campi',
    route: 'Campi',
    icon: 'map',
    type: 'Entypo',
  },
  {
    name: 'Polos',
    route: 'Polos',
    icon: 'group',
    type: 'FontAwesome',
  },
  {
    name: 'Quadro de Pontuação',
    route: 'ScoreBoard',
    icon: 'blackboard',
    type: 'Entypo',
  },
  {
    name: 'Recordes',
    route: 'Recordes',
    icon: 'bar-graph',
    type: 'Entypo',
  },
  {
    name: 'Regulamentos',
    route: 'Regulamentos',
    icon: 'book',
    type: 'Entypo',
  },
  {
    name: 'Alertas',
    route: 'Alertas',
    icon: 'comment-alert',
    type: 'MaterialCommunityIcons',
  },
];

const menuAdministrativo = [
  {
    name: 'Coordenadores das Modalidades',
    route: 'Moderadores',
    icon: 'users',
    type: 'FontAwesome',
  },
  {
    name: 'Administradores do Evento',
    route: 'Administradores',
    icon: 'user-tie',
    type: 'FontAwesome',
  },
];

const menuPersonal = [
  {
    name: 'Perfil',
    route: 'Profile',
    icon: 'user-circle',
    type: 'FontAwesome',
  },
  {
    name: 'Sobre',
    route: 'About',
    icon: 'info-circle',
    type: 'FontAwesome',
  },
  {
    name: 'Sair',
    route: 'Logout',
    icon: 'sign-out',
    type: 'FontAwesome',
  },
];

class SideBar extends Component {

  state = {
    shadowOffsetWidth: 1,
    shadowRadius: 4
  }

  render() {
    return (
      <Container>

        <Content
          bounces={false}
          style={styles.content} >

          <ImageBackground source={drawerCover} style={styles.drawerCover} >
            <Button transparent onPress={() => this.props.navigation.closeDrawer()}>
              <Icon style={{ color: commonColor.tint }} name="arrow-back" />
            </Button>
          </ImageBackground>

          <Image square style={styles.drawerImage} source={drawerImage} />

          <Separator bordered ><Text>MENU PRINCIPAL</Text></Separator>

          <List
            dataArray={menu}
            renderRow={data =>
              <ListItem
                button
                selected
                onPress={() => this.props.navigation.navigate(data.route)} >

                <Left>
                  <Icon
                    style={{ color: commonColor.primary }}
                    type={data.type}
                    name={data.icon}
                    size={20} />

                  <Text style={[styles.text, { color: commonColor.dark }]}> {data.name} </Text>
                </Left>

                {/* <Right>
                  <Icon style={{ color: commonColor.themeColor }} name="ios-arrow-forward" />
                </Right> */}

              </ListItem>
            }
          />

          <Separator bordered ><Text>MENU ADMINISTRATIVO</Text></Separator>

          <List
            dataArray={menuAdministrativo}
            renderRow={data =>
              <ListItem
                button
                selected
                onPress={() => this.props.navigation.navigate(data.route)} >

                <Left>
                  <FontAwesome5
                    style={{ color: commonColor.primary }}
                    name={data.icon}
                    size={18} />

                  <Text style={[styles.text, { color: commonColor.dark }]}> {data.name} </Text>
                </Left>

                {/* <Right>
                  <Icon style={{ color: commonColor.themeColor }} name="ios-arrow-forward" />
                </Right> */}

              </ListItem>
            }
          />

          <Separator bordered ><Text>MENU PESSOAL</Text></Separator>

          <List
            dataArray={menuPersonal}
            renderRow={data =>
              <ListItem
                button
                selected
                onPress={() => this.props.navigation.navigate(data.route)} >

                <Left>
                  <Icon
                    style={{ color: commonColor.primary }}
                    type={data.type}
                    name={data.icon}
                    size={20} />

                  <Text style={[styles.text, { color: commonColor.dark }]}> {data.name} </Text>
                </Left>
                {/* 
                <Right>
                  <Icon style={{ color: commonColor.themeColor }} name="ios-arrow-forward" />
                </Right> */}

              </ListItem>
            }
          />

        </Content>
      </Container>
    );
  }
}

export default SideBar;