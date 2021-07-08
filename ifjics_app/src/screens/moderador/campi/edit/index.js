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
    campus: [],
    nome: '',
    descricao: '',
    localizacao: '',
    loaderVisible: false,
  }

  async componentDidMount() {
    const data = this.props.navigation.getParam('data', '');
    this.setState({ campus: data, nome: data.nome, descricao: data.descricao, localizacao: data.localizacao });
  }

  async handleEdit() {
    if (!this.state.nome.trim() || !this.state.descricao.trim() || !this.state.localizacao.trim())
    Alert.alert('Por favor. Preencha todos os campos solicitados.', 'Preencha todos os campos solicitados para continuar.');
    else {
      this.setState({ loaderVisible: true });

      const id = this.state.campus.id;

      await ApiService.put('/campi/' + id, {
        nome: this.state.nome,
        descricao: this.state.descricao,
        localizacao: this.state.localizacao,
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
            <Title>Campus</Title>
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
                  Informe o nome do campus.
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
                    maxLength={50}
                    placeholder="Nome do campus" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body><Text note>Informe características sobre o campus.</Text></Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} name='description' type='MaterialIcons' />
                  <Input
                    value={this.state.descricao}
                    onChangeText={(descricao) => this.setState({ descricao })}
                    maxLength={250}
                    placeholder='Descrição'
                  />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>Informe a localização do campus.</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} name='location' type='Entypo' />
                  <Input
                    value={this.state.localizacao}
                    onChangeText={(localizacao) => this.setState({ localizacao })}
                    maxLength={60}
                    placeholder='Localização'
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
            <Text>Editar Campus</Text>
          </Button>
        </Footer>

      </Container>

    );
  }
}