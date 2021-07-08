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
  ListItem,
  CheckBox,
} from "native-base";
import styles from './styles';
import { commonColor } from "../../../../theme";

import { LoaderComponent, SelectMultipleComponent } from '../../../../components';

import { ApiService } from '../../../../services';

export default class Create extends Component {

  state = {
    campi: [],
    polos: [],
    competicao: [],
    players: [],
    descricao: '',
    data: '',
    polo: [],
    campus: [],
    competidor: [],
    local: '',
    hora: '',
    selectedPickerCompeticao: [],
    list: [],
    selectedList: [],
    loaderVisible: false,
    isModalidadeIndividual: true,
    dataCompeticaoInicio: new Date(),
    dataCompeticaoFim: new Date(),
  };

  async componentDidMount() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/competicoes')
      .then((response) => {
        var competicao = response.data;
        this.setState({ competicao: competicao, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, selectedPickerCompeticao: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });

    // this.setState({ loaderVisible: true });
    // await ApiService.get('/campi')
    //   .then((response) => {
    //     var campi = response.data;
    //     this.setState({ campi, loaderVisible: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ loaderVisible: false, campus: null });
    //     Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
    //   });

    this.setState({ loaderVisible: true });
    await ApiService.get('/polos')
      .then((response) => {
        var polos = response.data;
        this.setState({ polos, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, polos: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });

    this.setState({ loaderVisible: true });
    await ApiService.get('/users/usuarios')
      .then((response) => {
        var players = response.data;
        players.map((data) =>
          data.nome = data.nome + " - Campus: " + data.campus.nome);
        this.setState({ players, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, players: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  async handleAdd() {
    if (!this.state.descricao.trim() || !this.state.data || !this.state.local.trim() || !this.state.hora.trim())
      Alert.alert('Por favor. Preencha todos os campos solicitados.', 'Preencha todos os campos solicitados para continuar.');
    else if (this.state.selectedPickerCompeticao == null)
      Alert.alert('Você não selecionou a Modalidade.', 'Selecione uma modalidade para continuar.');
    else if (this.state.selectedList.length == 0)
      Alert.alert('Você não selecionou os competidores.', 'Selecione os competidores para continuar.');
    else {
      this.setState({ loaderVisible: true });
      var players = this.state.selectedList.map((obj) => { return obj.value; });
      const campi = [];
      const polos = [];
      if (this.state.selectedPickerCompeticao.modalidadeColetiva == 1) {
        for (var i = 0; i < players.length; i++) {
          if (players[i].campus != null) {
            campi.push(players[i].campus);
          } else {
            polos.push(players[i].polo);
          }
        }
        await ApiService.post('/partida', {
          nome: this.state.descricao,
          data: this.state.data,
          local: this.state.local,
          hora: this.state.hora,
          competicao: this.state.selectedPickerCompeticao,
          campi: campi,
          user: null,
          polos: polos,
        })
          .then(() => {
            this.props.navigation.state.params.onRefresh();
            this.props.navigation.goBack();
          })
          .catch((error) => {
            this.setState({ loaderVisible: false });
            Alert.alert(error);
          });
      } else if (this.state.selectedPickerCompeticao.modalidadeColetiva == 0) {

        await ApiService.post('/partida', {
          nome: this.state.descricao,
          data: this.state.data,
          local: this.state.local,
          hora: this.state.hora,
          competicao: this.state.selectedPickerCompeticao,
          user: players,
          campi: null,
          polos: null,
        })
          .then(() => {
            this.props.navigation.state.params.onRefresh();
            this.props.navigation.goBack();
          })
          .catch((error) => {
            this.setState({ loaderVisible: false });
            Alert.alert(error);
          })
      }
    }

  }

  onSelectionsChangePlayers = (selectedList) => {
    this.setState({ selectedList });
  }
  onSelectedCompeticao = (itemValue) => {

    if (itemValue) {

      this.setState({ selectedPickerCompeticao: itemValue });
      var jogos = itemValue.jogos;
      var campi = jogos.campi;
      this.setState({ campi });

      var dataCompeticaoInicio = new Date(itemValue.inicio);
      dataCompeticaoInicio.setDate(dataCompeticaoInicio.getDate() + 1);
      var dataCompeticaoFim = new Date(itemValue.fim);
      dataCompeticaoFim.setDate(dataCompeticaoFim.getDate() + 1);
      this.setState({ dataCompeticaoInicio, dataCompeticaoFim });

      if (this.state.list && this.state.list.length > 0)
        this.state.list = [];

      if (itemValue && itemValue.modalidadeColetiva == 0) {
        this.setState({ list: this.state.players, isModalidadeIndividual: true });
      }
      else if (itemValue && itemValue.modalidadeColetiva == 1) {
        var competidor = { polo: {}, campus: {} };
        for (var i = 0; i < campi.length; i++) {
          const competidores = this.state.list;
          competidores.push(competidor = { polo: null, campus: campi[i] });
          this.setState({ list: competidores, isModalidadeIndividual: false });
        }
        for (var i = 0; i < this.state.polos.length; i++) {
          const competidores = this.state.list;
          competidores.push(competidor = { polo: this.state.polos[i], campus: null });
          this.setState({ list: competidores, isModalidadeIndividual: false });
        }
      }
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
            <Title>Jogo/Rodada</Title>
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
                  Informe a descrição do(a) jogo/rodada.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='Entypo' name='medal' />
                  <Input
                    value={this.state.descricao}
                    onChangeText={(descricao) => this.setState({ descricao })}
                    maxLength={250}
                    placeholder="Descrição" />
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Selecione a modalidade na qual o(a) jogo/rodada faz parte.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='trophy' />
                <Picker
                  selectedValue={this.state.selectedPickerCompeticao}
                  style={{ height: 50, width: '90%' }}
                  onValueChange={(itemValue) => this.onSelectedCompeticao(itemValue)}>

                  <Picker.Item key={null} label={'Selecione a Modalidade'} value={null} />
                  {
                    (!this.state.competicao && !this.state.competicao.length) ? <Picker.Item note label={'Nenhum item encontrado'} /> :
                      this.state.competicao.map((data) => {
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
                  Selecione a data do(a) jogo/rodada.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="calendar" />
                <DatePicker
                  format="YYYY-DD-MM"
                  defaultDate={new Date()}
                  minimumDate={this.state.dataCompeticaoInicio}
                  maximumDate={this.state.dataCompeticaoFim}
                  locale={'pt-BR'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="dd/MM/yyyy"
                  placeHolderTextStyle={styles.textMuted}
                  onDateChange={(date) => this.setState({ data: date })}
                />
              </Left>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Descreva sucintamente o local que ocorrerá o(a) jogo/rodada.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='map-marker' />
                  <Input
                    value={this.state.local}
                    onChangeText={(local) => this.setState({ local })}
                    maxLength={100}
                    placeholder="Descrição do local" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Informe o horário que ocorrerá o(a) jogo/rodada.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='clock-o' />
                  <Input
                    value={this.state.hora}
                    onChangeText={(hora) => this.setState({ hora })}
                    autoCapitalize='none'
                    keyboardType='visible-password'
                    maxLength={5}
                    placeholder="00:00" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Selecione todos os campi ou jogadores do(a) jogo/rodada.
                </Text>
              </Body>
            </CardItem>

            <SelectMultipleComponent
              enableEmptySections
              items={this.state.list.map(c => ({ label: ((c.campus != null && !this.state.isModalidadeIndividual) ? c.campus.nome : (c.polo != null) ? "Polo: " + c.polo.nome : c.nome), value: c, }))}
              selectedItems={this.state.selectedList}
              onSelectionsChange={this.onSelectionsChangePlayers} />
          </Card>


          <Separator style={{ backgroundColor: 'transparent' }} />


        </Content>

        <Footer style={{ backgroundColor: 'transparent' }}>
          <Button onPress={_ => this.handleAdd()} style={{ backgroundColor: commonColor.badge }} iconLeft rounded block>
            {
              (this.state.loaderVisible) ?
                <ActivityIndicator size="large" animating={true} color={commonColor.tint} /> :
                <Icon type='MaterialIcons' name='done' />
            }
            <Text>Cadastrar Jogos/Rodadas</Text>
          </Button>
        </Footer>


      </Container>

    );
  }
}
