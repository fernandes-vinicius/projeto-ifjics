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
      secId: null,
      rowId: null,
      rowMap: null,
      competicoes: [],
      selectedPickerCompeticao: [],
      pontuacoes: [],
      loaderVisible: false,
      dialogAddPontuacaoVisible: false,
      campi: [],
    };
  }

  async componentDidMount() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/competicoes')
      .then((response) => {
        var competicoes = response.data;
        competicoes.sort(function (a, b) {
          return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
        });
        this.setState({ competicoes: competicoes, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, selectedPickerCompeticao: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  async handleCreate() {
    if (this.state.selectedPickerCompeticao == null)
      Alert.alert('Você não selecionou a competição', 'Selecione a competição na qual estas pontuações foram conquistadas.');
    else {
      this.setState({ loaderVisible: true });

      const competicao = this.state.selectedPickerCompeticao;

      await ApiService.put('/competicoes/' + competicao.id, {
        nome: competicao.nome,
        inicio: competicao.inicio,
        fim: competicao.fim,
        local: competicao.local,
        hora: competicao.hora,
        modalidade: competicao.modalidade,
        jogos: competicao.jogos,
        pontuacoes: this.state.pontuacoes,
        modalidadeColetiva: competicao.modalidadeColetiva,
        unidadeMedida: competicao.unidadeMedida,
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

  onSelectedCompeticao = (itemValue) => {
    this.setState({ selectedPickerCompeticao: itemValue });

    if (itemValue) {
      var jogos = itemValue.jogos;
      var campi = jogos.campi;
      this.setState({ campi });
    }
  }

  render() {
    return (
      <Container>

        <LoaderComponent visible={this.state.loaderVisible} />

        <DialogAddPontuacao
          visible={this.state.dialogAddPontuacaoVisible}
          onCancel={() => this.setState({ dialogAddPontuacaoVisible: false })}
          onAdd={this.handleAdd}
          data={this.state.data}
          pontuacoes={this.state.pontuacoes}
          campi={this.state.campi} />

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
                  Selecione primeiro a modalidade na qual estas pontuações foram conquistadas.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="trophy" />
                <Picker
                  selectedValue={this.state.selectedPickerCompeticao}
                  style={{ height: 50, width: '90%' }}
                  onValueChange={(itemValue) => this.onSelectedCompeticao(itemValue)}>

                  <Picker.Item key={null} label={'Selecione a modalidade'} value={null} />
                  {
                    (!this.state.competicoes && !this.state.competicoes.length) ? <Picker.Item note label={'Nenhum item encontrado'} /> :
                      this.state.competicoes.map((data) => {
                        return <Picker.Item key={data.id} label={data.nome} value={data} />
                      })
                  }
                </Picker>
              </Left>
            </CardItem>
          </Card>

          <Separator style={{ backgroundColor: 'transparent' }} />

          <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
            <Body>
              <Title> Pontuações</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.setState({ dialogAddPontuacaoVisible: true })}>
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
                          <Text style={{ color: commonColor.primary }}>Campus</Text>
                          <Text note>{(data.campus) ? data.campus.nome : ''}</Text>
                        </Body>
                      </CardItem>

                      <CardItem>
                        <Body>
                          <Text style={{ color: commonColor.primary }}>Colocação</Text>
                          <Text note>{(data.colocacao) ? (data.colocacao + 'º') : ''}</Text>
                        </Body>
                      </CardItem>

                      <CardItem>
                        <Body>
                          <Text style={{ color: commonColor.primary }}>Bônus</Text>
                          <Text note>{data.bonus}</Text>
                        </Body>
                      </CardItem>

                      <CardItem>
                        <Body>
                          <Text style={{ color: commonColor.primary }}>TOTAL</Text>
                          <Text note>{data.total} pontos</Text>
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