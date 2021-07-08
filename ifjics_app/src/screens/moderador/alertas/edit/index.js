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
    alerta: [],
    nome: '',
    descricao: '',
    loaderVisible: false,
  }

  async componentDidMount() {
    const data = this.props.navigation.getParam('data', '');
    this.setState({ alerta: data, nome: data.nome, descricao: data.descricao });
  }

  async handleEdit() {
    if (!this.state.nome.trim() || !this.state.descricao.trim())
      Alert.alert('Por favor. Preencha todos os campos solicitados.', 'Preencha todos os campos solicitados para continuar.');
    else {
      this.setState({ loaderVisible: true });

      const id = this.state.alerta.id;

      await ApiService.put('/alertas/' + id, {
        nome: this.state.nome,
        descricao: this.state.descricao,
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
            <Title>Alerta</Title>
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
                  Informe o título do alerta.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='Entypo' name='map' />
                  <Input
                    autoFocus
                    value={this.state.nome}
                    onChangeText={(nome) => this.setState({ nome })}
                    maxLength={200}
                    placeholder="Título da alerta" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body><Text note>Informe a descrição do alerta.</Text></Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} name='description' type='MaterialIcons' />
                  <Input
                    value={this.state.descricao}
                    onChangeText={(descricao) => this.setState({ descricao })}
                    maxLength={500}
                    placeholder='Descrição'
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
            <Text>Editar alerta</Text>
          </Button>
        </Footer>

      </Container>

    );
  }
}