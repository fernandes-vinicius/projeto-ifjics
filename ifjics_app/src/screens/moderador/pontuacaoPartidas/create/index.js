import React, { Component } from "react";
import { Alert, ListView, ActivityIndicator } from "react-native";
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
  List,
  Icon,
  Container,
  Left,
  Picker,
  Separator,
  Badge,
} from "native-base";
import styles from './styles';
import { commonColor } from "../../../../theme";

import { LoaderComponent } from '../../../../components';

import { ApiService } from '../../../../services';

import DialogAddPontuacao from '../dialogAdd';

import DialogRemove from '../dialogRemove';

export default class Create extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: [],
      list: [],
      listPartidas: [],
      secId: null,
      rowId: null,
      rowMap: null,
      competicao: [],
      partidas: [],
      selectedPickerPartida: [],
      jogos: [],
      pontuacaoParcial: [],
      selectedPickerJogos: [],
      pontuacoes: [],
      loaderVisible: false,
      dialogAddPontuacaoVisible: false,
      isModalidadeIndividual: false,
    };
  }

  async componentDidMount() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/partida')
      .then((response) => {
        var partidas = response.data;
        partidas.sort(function (a, b) {
          return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
        });
        this.setState({ partidas: partidas, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, selectedPickerPartida: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });

    this.setState({ loaderVisible: true });

    await ApiService.get('/jogos')
      .then((response) => { this.setState({ jogos: response.data, loaderVisible: false }); })
      .catch((error) => {
        this.setState({ loaderVisible: false, selectedPickerJogos: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });

    this.setState({ loaderVisible: true });

    await ApiService.get('/pontuacaoparcial')
      .then((response) => { this.setState({ pontuacaoParcial: response.data, loaderVisible: false }); })
      .catch((error) => {
        this.setState({ loaderVisible: false });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  async handleCreate() {
    if (this.state.selectedPickerPartida == null)
      Alert.alert('Você não selecionou a partida', 'Selecione a partida na qual estas pontuações foram conquistadas.');
    else {
      this.setState({ loaderVisible: true });

      const Partida = this.state.selectedPickerPartida;

      if (this.state.competicao.modalidadeColetiva == 1) {
        for (var i = 0; i < this.state.pontuacoes.length; i++) {
          const campus = null;
          const polo = null;
          if (this.state.pontuacoes[i].competidor.campus != null) {
            campus = this.state.pontuacoes[i].competidor.campus;
          } else {
            polo = this.state.pontuacoes[i].competidor.polo;
          }

          await ApiService.post('/pontuacaoparcial', {
            pontos: this.state.pontuacoes[i].pontos,
            partida: Partida,
            campus: campus,
            polo: polo,
            user: null,
          })
            .then(() => {
              this.props.navigation.state.params.onRefresh();
              this.props.navigation.goBack();
            })
            .catch((error) => {
              this.setState({ loaderVisible: false });
              Alert.alert(error);
            });
        }

      } else if (this.state.competicao.modalidadeColetiva == 0) {

        for (var i = 0; i < this.state.pontuacoes.length; i++) {

          await ApiService.post('/pontuacaoparcial', {
            pontos: this.state.pontuacoes[i].pontos,
            partida: Partida,
            campus: null,
            polo: null,
            user: this.state.pontuacoes[i].competidor,
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
  }

  handleAdd = (pontuacao) => {
    const pontuacoes = [...this.state.pontuacoes];
    pontuacoes.push(pontuacao);
    this.setState({ pontuacoes: pontuacoes, loaderVisible: false, dialogAddPontuacaoVisible: false });
  }

  handleRemove = async () => {
    this.setState({ dialogRemoveVisible: false, loaderVisible: true });

    var secId = this.state.secId;
    var rowId = this.state.rowId;
    var rowMap = this.state.rowMap;

    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.pontuacoes];
    newData.splice(rowId, 1);
    this.setState({ pontuacoes: newData, loaderVisible: false });
  }

  onValueChangePickerJogos = async (jogo) => {
    this.setState({ selectedPickerJogos: jogo })
    if (jogo) {
      this.state.listPartidas = [];
      for (var i = 0; i < this.state.partidas.length; i++) {
        if (jogo.id == this.state.partidas[i].competicao.jogos.id) {
          const partidas = this.state.listPartidas;
          partidas.push(this.state.partidas[i]);
          this.setState({ listPartidas: partidas });
        }
      }
    }
  }

  onValueChangePickerPartida = async (partida) => {
    this.setState({ selectedPickerPartida: partida });

    if (partida) {
      this.setState({ competicao: partida.competicao });
      if (partida.competicao.modalidadeColetiva == 0) {
        this.setState({ list: partida.user, isModalidadeIndividual: true });
      } else if (partida.competicao.modalidadeColetiva == 1) {
        this.modalidadeColetiva(partida);
      }
    }
  }

  modalidadeColetiva = (partida) => {
    var competidor = { polo: {}, campus: {} };
    for (var i = 0; i < partida.campi.length; i++) {
      const competidores = this.state.list;
      competidores.push(competidor = { polo: null, campus: partida.campi[i] });
      this.setState({ list: competidores });
    }
    for (var i = 0; i < partida.polos.length; i++) {
      const competidores = this.state.list;
      competidores.push(competidor = { polo: partida.polos[i], campus: null });
      this.setState({ list: competidores });
    }
  }

  onSelectedAdd = () => {
    if (this.state.selectedPickerPartida == null)
      Alert.alert('Você não selecionou a partida', 'Selecione a partida na qual estas pontuações foram conquistadas.');
    else {
      this.setState({ dialogAddPontuacaoVisible: true })
    }
    //Alert.alert(this.state.pontuacaoParcial[0].campus.id + '' );
  }

  render() {
    return (
      <Container>

        <LoaderComponent visible={this.state.loaderVisible} />

        <DialogAddPontuacao
          visible={this.state.dialogAddPontuacaoVisible}
          onCancel={() => this.setState({ dialogAddPontuacaoVisible: false })}
          onAdd={this.handleAdd}
          data={this.state.selectedPickerPartida}
          list={this.state.list}
          isModalidadeIndividual={this.state.isModalidadeIndividual}
          pontuacoes={this.state.pontuacoes}
          pontuacaoParcial={this.state.pontuacaoParcial}
          partida={this.state.selectedPickerPartida} />

        <DialogRemove
          visible={this.state.dialogRemoveVisible}
          onCancel={() => this.setState({ dialogRemoveVisible: false })}
          onRemove={this.handleRemove} />

        <Header androidStatusBarColor={commonColor.statusBar} style={{ backgroundColor: commonColor.primary }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title> Pontuações</Title>
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
                  Selecione primeiro o evento referente à pontuação.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='MaterialIcons' name='event-note' />
                <Picker
                  selectedValue={this.state.selectedPickerJogos}
                  style={{ height: 50, width: '90%' }}
                  onValueChange={(itemValue) => this.onValueChangePickerJogos(itemValue)}>

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
                  Selecione a partida na qual estas pontuações foram conquistadas.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="trophy" />
                <Picker
                  selectedValue={this.state.selectedPickerPartida}
                  style={{ height: 50, width: '90%' }}
                  onValueChange={(itemValue) => this.onValueChangePickerPartida(itemValue)}>

                  <Picker.Item key={null} label={'Selecione a partida'} value={null} />
                  {
                    (!this.state.listPartidas && !this.state.listPartidas.length) ? <Picker.Item note label={'Nenhum item encontrado'} /> :
                      this.state.listPartidas.map((data) => {
                        return <Picker.Item key={data.id} label={data.nome} value={data} />
                      })
                  }
                </Picker>
              </Left>
            </CardItem>
          </Card>

          <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
            <Body>
              <Title> Pontuações</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.onSelectedAdd()}>
                <Icon active name="add" />
              </Button>
            </Right>
          </Header>

          <Card style={styles.mb}>

            <Badge style={{ backgroundColor: commonColor.dark, margin: 10 }}>
              <Text>{(this.state.pontuacoes.length == 1) ? this.state.pontuacoes.length + ' pontuação' :
                this.state.pontuacoes.length + ' pontuações'}</Text>
            </Badge>

            <CardItem header>

              {!this.state.pontuacoes.length > 0 ? <Text note style={{ padding: 10 }}>Nenhuma pontuação cadastrada. Clique no ícone acima para adicionar pontuações aqui.</Text> :

                <List
                  dataSource={this.ds.cloneWithRows(this.state.pontuacoes)}
                  renderRow={(data, secId, rowId) =>
                    <Card style={styles.mb}>

                      <CardItem bordered header>
                        <Left>
                          <Button transparent>
                            <Icon style={{ color: commonColor.secondary }} type='Ionicons' name='medal' />
                            <Text style={{ color: commonColor.primary }} uppercase={false}>Pontuação</Text>
                          </Button>
                        </Left>
                        <Right>
                          <Text note> {parseInt(rowId, 10) + 1} </Text>
                        </Right>
                      </CardItem>

                      <CardItem>
                        <Body>
                          <Text style={{ color: commonColor.primary }}>Competidor</Text>
                          <Text note>{(!this.state.isModalidadeIndividual && data.competidor.campus != null) ? data.competidor.campus.nome :
                            (data.competidor.polo != null) ? data.competidor.polo.nome : data.competidor.nome + " - Campus: " + data.competidor.campus.nome
                          }</Text>
                        </Body>
                      </CardItem>

                      <CardItem>
                        <Body>
                          <Text style={{ color: commonColor.primary }}>Pontos</Text>
                          <Text note>{data.pontos}</Text>
                        </Body>
                      </CardItem>

                    </Card>
                  }

                  renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button
                      full
                      danger
                      onPress={() => this.setState({ data: data, secId: secId, rowId: rowId, rowMap: rowMap, dialogRemoveVisible: true })}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                      }} >
                      <Icon active name="trash" />
                    </Button>
                  }

                  rightOpenValue={-75}
                />
              }
            </CardItem>
          </Card>

          <Separator style={{ backgroundColor: 'transparent' }} />

        </Content>

        <Footer style={{ backgroundColor: 'transparent' }}>
          <Button onPress={_ => this.handleCreate()} style={{ backgroundColor: commonColor.badge }} iconLeft rounded block>
            {
              (this.state.loaderVisible) ?
                <ActivityIndicator size="large" animating={true} color={commonColor.tint} /> :
                <Icon type='MaterialIcons' name='done' />
            }
            <Text>Cadastrar Pontuações</Text>
          </Button>
        </Footer>

      </Container>

    );
  }
}