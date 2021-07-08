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
  Picker,
  Container,
  Left,
} from "native-base";
import styles from './styles';
import { commonColor } from "../../../../theme";

import { LoaderComponent } from '../../../../components';

import { ApiService } from '../../../../services';

export default class Edit extends Component {

  state = {
    user: [],
    nome: '',
    telefone: '',
    password: '',
    confirmPassword: '',
    campi: [],
    selectedCampus: [],
    loaderVisible: false,
  }

  async componentDidMount() {
    const data = this.props.navigation.getParam('data', '');
    this.setState({
      user: data,
      nome: data.nome,
      telefone: data.telefone,
      password: data.password,
    });

    this.setState({ loaderVisible: true });
    await ApiService.get('/campi')
      .then((response) => {
        var campi = response.data;
        this.setState({ campi: campi, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, campi: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });

  }

  async handleEdit() {
    if (!this.state.nome.trim() || !this.state.telefone.trim())
      Alert.alert('Por favor. Preencha todos os campos solicitados.', 'Preencha todos os campos solicitados para continuar.');
    else {
      this.setState({ loaderVisible: true });

      const id = this.state.user.id;

      await ApiService.put('/users/' + id, {
        nome: this.state.nome,
        telefone: this.state.telefone,
        // username: this.state.nome,
        // email: "a@gmail.com",
        // password: '123',
      })
        .then(() => {
          this.props.navigation.state.params.onRefresh();
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
            <Title>User</Title>
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
                  Informe o seu nome.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='user-circle' />
                  <Input
                    autoFocus
                    value={this.state.nome}
                    onChangeText={(nome) => this.setState({ nome })}
                    maxLength={150}
                    placeholder="Nome" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Informe o seu telefone.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='phone' />
                  <Input
                    autoFocus
                    value={this.state.telefone}
                    autoCapitalize='none'
                    keyboardType='phone-pad'
                    onChangeText={(telefone) => this.setState({ telefone })}
                    maxLength={11}
                    placeholder="Telefone" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>Selecione o Campus que você pertence.</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='Entypo' active name="map" />
                <Picker
                  selectedValue={this.state.selectedCampus}
                  style={{ height: 50, width: '90%' }}
                  onValueChange={(itemValue) => this.setState({ selectedCampus: itemValue })}>

                  <Picker.Item key={null} label={'Selecione o Campus'} value={null} />
                  {
                    (!this.state.campi && !this.state.campi.length) ?
                      <Picker.Item note label={'Nenhum item encontrado'} /> :
                      this.state.campi.map((data) => {
                        return <Picker.Item key={data.id} label={data.nome} value={data} />
                      })
                  }
                </Picker>
              </Left>
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
            <Text>Editar user</Text>
          </Button>
        </Footer>

      </Container>

    );
  }
}