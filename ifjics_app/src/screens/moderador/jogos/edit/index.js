import React, { Component } from "react";
import { Alert, ActivityIndicator } from "react-native";
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
  DatePicker,
  Separator,
} from "native-base";
import styles from './styles';
import { commonColor } from "../../../../theme";

import { LoaderComponent, SelectMultipleComponent } from '../../../../components';

import { ApiService } from '../../../../services';

export default class Edit extends Component {

  state = {
    jogos: [],
    campi: [],
    nome: '',
    dateInicio: '',
    dateFim: '',
    selectedCampi: [],
    loaderVisible: false,
  };

  async componentDidMount() {
    this.setState({ loaderVisible: true });

    const data = this.props.navigation.getParam('data', '');

    this.setState({
      jogos: data,
      nome: data.nome,
      dateInicio: data.inicio,
      dateFim: data.fim,
    });

    await ApiService.get('/campi')
      .then((response) => {
        this.setState({ campi: response.data, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, selectedCampi: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });

    this.setState({ loaderVisible: true });
    await ApiService.get('/modalidades')
      .then((response) => {
        this.setState({ modalidades: response.data, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, selectedModalidades: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  async handleEdit() {
    if (!this.state.nome.trim() || !this.state.dateInicio || !this.state.dateFim)
      Alert.alert('Por favor. Preencha todos campos', 'Preencha todos os campos solicitados para continuar.');
    else if (this.state.selectedCampi == null || this.state.selectedCampi.length == 0)
      Alert.alert('Por favor. Preencha todos campos', 'Preencha todos os campos solicitados para continuar.');
    else if (this.state.selectedCampi == null)
      Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
    else {
      this.setState({ loaderVisible: true });

      const id = this.state.jogos.id;
      var campi = this.state.selectedCampi.map((obj) => { return obj.value; });


      await ApiService.put('/jogos/' + id, {
        nome: this.state.nome,
        inicio: this.state.dateInicio,
        fim: this.state.dateFim,
        campi: campi,
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

  onSelectionsChangeCampi = (selectedCampi) => {
    this.setState({ selectedCampi });
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
            <Title>Evento</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
            <Body>
              <Title> Cadastrar</Title>
            </Body>
            <Right />
          </Header>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Informe o nome do evento que deseja cadastrar. Por exemplo. JICS 2018
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='MaterialIcons' name='event-note' />
                  <Input
                    autoFocus
                    value={this.state.nome}
                    onChangeText={(nome) => this.setState({ nome })}
                    maxLength={50}
                    placeholder="Nome do evento" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Selecione a data de início do evento.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="calendar" />
                <DatePicker
                  defaultDate={this.state.dateInicio}
                  minimumDate={new Date()}
                  maximumDate={new Date(2019, 12, 31)}
                  locale={'pt-BR'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={(this.state.dateInicio) ? this.state.dateInicio : 'dd/MM/yyyy'}
                  onDateChange={(date) => this.setState({ dateInicio: date })}
                />
              </Left>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Selecione a data de encerramento do evento.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="calendar" />
                <DatePicker
                  defaultDate={this.state.dateFim}
                  minimumDate={new Date()}
                  maximumDate={new Date(2019, 12, 31)}
                  locale={'pt-BR'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={(this.state.dateFim) ? this.state.dateFim : 'dd/MM/yyyy'}
                  onDateChange={(date) => this.setState({ dateFim: date })}
                />
              </Left>
            </CardItem>
          </Card>

          <Separator style={{ backgroundColor: 'transparent' }} />

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Selecione todos os campi participantes do evento.
                </Text>
              </Body>
            </CardItem>

            <SelectMultipleComponent
              enableEmptySections
              items={this.state.campi.map(c => ({
                label: c.nome,
                value: c,
              }))
              }
              selectedItems={this.state.selectedCampi}
              onSelectionsChange={this.onSelectionsChangeCampi} />
          </Card>

          <Separator style={{ backgroundColor: 'transparent' }} />

        </Content>

        <Footer style={{ backgroundColor: 'transparent' }}>
          <Button onPress={_ => this.handleEdit()} style={{ backgroundColor: commonColor.badge }} iconLeft rounded block>
            {
              (this.state.loaderVisible) ?
                <ActivityIndicator size="large" animating={true} color={commonColor.tint} /> :
                <Icon type='MaterialIcons' name='done' />
            }
            <Text>Editar Evento</Text>
          </Button>
        </Footer>


      </Container>

    );
  }
}