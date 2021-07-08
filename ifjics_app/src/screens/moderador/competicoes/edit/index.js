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
  Picker,
  Separator,
  Switch,
} from "native-base";
import styles from './styles';
import { commonColor } from "../../../../theme";

import { LoaderComponent } from '../../../../components';

import { ApiService } from '../../../../services';

export default class Edit extends Component {

  state = {
    competicao: [],
    modalidade: '',
    jogos: [],
    nome: '',
    dateInicio: '',
    dateFim: '',
    selectedPickerJogos: [],
    loaderVisible: false,
    unidadeMedida: '',
    isModalidadeColetiva: true,
    dataEventInicio: new Date(),
    dataEventFim: new Date(),
  };

  async componentDidMount() {
    this.setState({ loaderVisible: true });

    const data = this.props.navigation.getParam('data', '');

    this.setState({
      competicao: data,
      modalidade: data.nome,
      dateInicio: data.inicio,
      dateFim: data.fim,
      selectedPickerJogos: data.jogos,
      unidadeMedida: data.unidadeMedida,
    });
    if (data.modalidadeColetiva == 0)
      this.setState({ isModalidadeColetiva: false });
    else
      this.setState({ isModalidadeColetiva: true });

    await ApiService.get('/jogos')
      .then((response) => {
        this.setState({ jogos: response.data, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, selectedPickerJogos: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  async handleEdit() {
    if (!this.state.modalidade || !this.state.dateInicio || !this.state.dateFim || !this.state.unidadeMedida)
      Alert.alert('Por favor. Preencha todos os campos solicitados.', 'Preencha todos os campos solicitados para continuar.');
    else if (!this.state.selectedPickerJogos)
      Alert.alert('Você não selecionou o Evento.', 'Selecione o Evento para continuar.');
    else {
      this.setState({ loaderVisible: true });

      const id = this.state.competicao.id;
      if (this.state.isModalidadeColetiva) {
        await ApiService.put('/competicoes/' + id, {
          nome: this.state.modalidade,
          inicio: this.state.dateInicio,
          fim: this.state.dateFim,
          unidadeMedida: this.state.unidadeMedida,
          modalidadeColetiva: 1,
          jogos: this.state.selectedPickerJogos
        })
          .then(() => {
            this.props.navigation.state.params.onRefresh();;
            this.props.navigation.goBack();
          })
          .catch((error) => {
            this.setState({ loaderVisible: false });
            Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
          });
      } else {
        await ApiService.put('/competicoes/' + id, {
          nome: this.state.modalidade,
          inicio: this.state.dateInicio,
          fim: this.state.dateFim,
          unidadeMedida: this.state.unidadeMedida,
          modalidadeColetiva: 0,
          jogos: this.state.selectedPickerJogos
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
  }
  handleToggleSwitchModalidade = () => {
    this.setState({ isModalidadeColetiva: !this.state.isModalidadeColetiva });

  }
  onSelectedEvent = (itemValue) => {
    this.setState({ selectedPickerJogos: itemValue });
    if (itemValue) {
      var dataEventInicio = new Date(itemValue.inicio);
      dataEventInicio.setDate(dataEventInicio.getDate() + 1);
      var dataEventFim = new Date(itemValue.fim);
      dataEventFim.setDate(dataEventFim.getDate() + 1);
      this.setState({ dataEventInicio, dataEventFim });
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
            <Title>Modalidade</Title>
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
                  Informe o nome da modalidade. Por exemplo. Futsal
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='trophy' />
                  <Input
                    value={this.state.modalidade}
                    onChangeText={(modalidade) => this.setState({ modalidade })}
                    maxLength={50}
                    placeholder="Nome da modalidade" />
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Selecione os EVENTO na qual esta competição faz parte.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='MaterialIcons' name='event-note' />
                <Picker
                  selectedValue={this.state.selectedPickerJogos}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue) => this.onSelectedEvent(itemValue)}>

                  <Picker.Item key={null} label={'Selecione o Evento'} value={null} />
                  {
                    (!this.state.jogos && !this.state.jogos.length) ? <Picker.Item note label={'Nenhum item encontrado'} /> :
                      this.state.jogos.map((data) => {
                        return <Picker.Item key={data.id} label={data.nome} value={data} />
                      })
                  }
                </Picker>
              </Left>
            </CardItem>
          </Card>
          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Selecione a data de início da modalidade.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="calendar" />
                <DatePicker
                  defaultDate={this.state.dateInicio}
                  minimumDate={this.state.dataEventInicio}
                  maximumDate={this.state.dataEventFim}
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
                  Selecione a data de encerramento da modalidade.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="calendar" />
                <DatePicker
                  defaultDate={this.state.dateFim}
                  minimumDate={this.state.dataEventInicio}
                  maximumDate={this.state.dataEventFim}
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





          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Informe a unidade de Medida da Modalidade. Por exemplo. Gols ou Segundos
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='trophy' />
                  <Input
                    value={this.state.unidadeMedida}
                    onChangeText={(unidadeMedida) => this.setState({ unidadeMedida })}
                    maxLength={50}
                    placeholder="Unidade de Medida" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Left>
                <Body>
                  <Text>A modalidade é coletiva?</Text>
                </Body>
              </Left>
              <Right>
                <Switch
                  onValueChange={this.handleToggleSwitchModalidade}
                  value={this.state.isModalidadeColetiva}
                  trackColor='#FFF' />
              </Right>
            </CardItem>
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
            <Text>Editar Competição</Text>
          </Button>
        </Footer>


      </Container>

    );
  }
}