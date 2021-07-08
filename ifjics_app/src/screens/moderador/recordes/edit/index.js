import React, { Component } from "react";
import { Alert, ActivityIndicator } from 'react-native';
import {
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Header,
  Title,
  Right,
  Footer,
  Button,
  Item,
  Input,
  Icon,
  Container,
  Left,
} from "native-base";
import styles from './styles';
import { commonColor } from "../../../../theme";

import { LoaderComponent } from '../../../../components';

import { ApiService } from '../../../../services';

export default class Edit extends Component {

  state = {
    recorde: [],
    nome: '',
    link: '',
    loaderVisible: false,
  }

  async componentDidMount() {
    const data = this.props.navigation.getParam('data', '');
    this.setState({ recorde: data, nome: data.nome, link: data.link });
  }

  async handleEdit() {
    if (!this.state.nome.trim() || !this.state.link.trim())
      Alert.alert('Por favor. Preencha todos os campos solicitados.', 'Preencha todos os campos solicitados para continuar.');
    else {
      this.setState({ loaderVisible: true });

      const id = this.state.recorde.id;

      await ApiService.put('/recordes/' + id, {
        nome: this.state.nome,
        link: this.state.link,
      })
        .then(() => {
          this.props.navigation.state.params.onRefresh();;
          this.props.navigation.goBack();
        })
        .catch((error) => {
          this.setState({ loaderVisible: false });
          Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
        });
    }

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
            <Title>Recordes</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
            <Body>
              <Title> Editar</Title>
            </Body>
            <Right />
          </Header>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Informe o nome do recorde.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='Entypo' name='bar-graph' />
                  <Input
                    autoFocus
                    value={this.state.nome}
                    onChangeText={(nome) => this.setState({ nome })}
                    maxLength={100}
                    placeholder="Nome do recorde" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>Informe o link do arquivo.</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} name='external-link' type='Feather' />
                  <Input
                    value={this.state.link}
                    onChangeText={(link) => this.setState({ link })}
                    maxLength={250}
                    placeholder='Link'
                  />
                </Item>
              </Body>
            </CardItem>
          </Card>
        </Content>

        <Footer style={{ backgroundColor: 'transparent' }}>
          <Button onPress={_ => this.handleEdit()} style={{ backgroundColor: commonColor.badge }} iconLeft rounded block>
            {
              (this.state.loaderVisible) ?
                <ActivityIndicator size="large" animating={true} color={commonColor.tint} /> :
                <Icon type='MaterialIcons' name='done' />
            }
            <Text>Editar recorde</Text>
          </Button>
        </Footer>

      </Container>

    );
  }
}