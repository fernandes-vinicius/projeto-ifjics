import React, { Component } from "react";
import { Alert, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import ActionButton from 'react-native-action-button';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  Footer,
  Separator,
} from "native-base";
import styles from "./styles";
import { images, commonColor } from '../../../theme';

import { LoaderComponent } from '../../../components';

import { ApiService, StorageService } from '../../../services';

const foto = images.avatar;

export default class Profile extends Component {

  state = {
    user: [],
    campi: '',
    loaderVisible: false,
  }

  async componentDidMount() {
    this.refresh();
  }

  async refresh() {
    this.setState({ loaderVisible: true });
    var userLogged = await StorageService.getItem('user');
    this.setState({ user: userLogged, loaderVisible: false });
    var nomeCampus = "INDEFINIDO";
    if (this.state.user.campus != null)
      nomeCampus = this.state.user.campus.nome;
    this.setState({ campi: nomeCampus });

  }

  async onRefresh() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/users')
      .then((response) => {
        StorageService.setItem('users', response.data);
        this.setState({ loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  render() {
    return (
      <Container>

        <LoaderComponent visible={this.state.loaderVisible} />

        <Header androidStatusBarColor={commonColor.statusBar} style={{ backgroundColor: commonColor.primary }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Perfil</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
            <Left>
              <Icon type='MaterialCommunityIcons' style={{ color: commonColor.tint }} name="emoticon" />
            </Left>
            <Body>
              <Title>Olá, bem vindo!</Title>
            </Body>
            <Right />
          </Header>

          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Thumbnail source={foto} />
                <Body>
                  <Text>{this.state.user.nome}</Text>
                  <Text note>{this.state.user.username}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem bordered cardBody>
              <Image
                style={{
                  resizeMode: "cover",
                  width: null,
                  height: 200,
                  flex: 1
                }}
                source={foto}
              />
            </CardItem>

            <CardItem bordered style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' active name="envelope" />
                  <Text style={{ color: commonColor.primary }} uppercase={false}> {this.state.user.email}</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' active name="phone" />
                  <Text style={{ color: commonColor.primary }} uppercase={false}> {this.state.user.telefone}</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem bordered style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon style={{ color: commonColor.secondary }} type='MaterialIcons' active name="done" />
                  <Text style={{ color: commonColor.primary }} uppercase={false}>Status</Text>
                </Button>
              </Left>
              <Right>
                <Text note> {this.state.user.status}</Text>
              </Right>
            </CardItem>

            <CardItem bordered style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' active name="user-circle" />
                  <Text style={{ color: commonColor.primary }} uppercase={false}>Nome</Text>
                </Button>
              </Left>
              <Right>
                <Text note> {this.state.user.nome}</Text>
              </Right>
            </CardItem>

            <CardItem bordered style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' active name="user" />
                  <Text style={{ color: commonColor.primary }} uppercase={false}>Usuário</Text>
                </Button>
              </Left>
              <Right>
                <Text note> {this.state.user.username}</Text>
              </Right>
            </CardItem>

            <CardItem bordered style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' active name="envelope" />
                  <Text style={{ color: commonColor.primary }} uppercase={false}>E-mail</Text>
                </Button>
              </Left>
              <Right>
                <Text note> {this.state.user.email}</Text>
              </Right>
            </CardItem>

            <CardItem bordered style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' active name="phone" />
                  <Text style={{ color: commonColor.primary }} uppercase={false}>Telefone</Text>
                </Button>
              </Left>
              <Right>
                <Text note> {this.state.user.telefone}</Text>
              </Right>
            </CardItem>

            <CardItem bordered style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon style={{ color: commonColor.secondary }} type='Entypo' active name="map" />
                  <Text style={{ color: commonColor.primary }} uppercase={false}>Campus</Text>
                </Button>
              </Left>
              <Right>
                <Text note>{this.state.campi}</Text>
              </Right>
            </CardItem>
          </Card>

          <Separator style={{ backgroundColor: 'transparent' }} />

        </Content>

        {/* <Footer style={{ backgroundColor: 'transparent' }}>
          <Button
            onPress={() => Alert.alert('Ops! Recurso em manutenção', 'Este recurso está sendo desenvolvido. Nossa equipe está trabalhando duro nisto.')}
            style={{ backgroundColor: commonColor.badge }} iconLeft rounded block>
            {
              (this.state.loaderVisible) ?
                <ActivityIndicator size="large" animating={true} color={commonColor.tint} /> :
                <Icon type='FontAwesome' name='user' />
            }
            <Text>Editar Perfil</Text>
          </Button>
        </Footer> */}

      </Container>
    );
  }
}