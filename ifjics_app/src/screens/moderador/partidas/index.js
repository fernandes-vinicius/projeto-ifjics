import React, { Component } from "react";
import { ListView, Alert, TouchableOpacity, View } from "react-native";
import ActionButton from 'react-native-action-button';
import Search from 'react-native-search-box';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  Text,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  Badge,
} from "native-base";
import styles from "./styles";
import { commonColor } from '../../../theme';

import { LoaderComponent, DialogRemoveComponent } from '../../../components';

import { ApiService, StorageService } from '../../../services';

import ModalDetails from './details';

export default class partida extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: [],
      secId: null,
      rowId: null,
      rowMap: null,
      listViewData: [],
      activeFab: false,
      loaderVisible: false,
      dialogRemoveVisible: false,
      modalDetailsVisible: false,
    };
  }

  async componentDidMount() {
    this.setState({ loaderVisible: true });
    var partida = await StorageService.getItem('partida');

    if (partida)
      this.setState({ listViewData: partida, loaderVisible: false });
    else
      this.refresh();

  }

  async refresh() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/partida')

      .then((response) => {
        StorageService.setItem('partida', response.data);
        this.setState({ listViewData: response.data, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }
  onSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      this.setState({ loaderVisible: true });

      await ApiService.get('/partida/partida?s=' + searchTerm)
        .then((response) => { this.setState({ listViewData: response.data, loaderVisible: false }); })
        .catch((error) => {
          this.setState({ loaderVisible: false });
          Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
        });
    }
  }

  handleDelete = async () => {
    this.setState({ dialogRemoveVisible: false, loaderVisible: true });

    var data = this.state.data;
    var secId = this.state.secId;
    var rowId = this.state.rowId;
    var rowMap = this.state.rowMap;

    await ApiService.delete('/partida/' + data.id)
      .then(() => {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData, loaderVisible: false });
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

        <DialogRemoveComponent
          visible={this.state.dialogRemoveVisible}
          onCancel={() => this.setState({ dialogRemoveVisible: false })}
          onDelete={this.handleDelete} />

        <ModalDetails
          visible={this.state.modalDetailsVisible}
          onClose={() => this.setState({ modalDetailsVisible: false })}
          data={this.state.data} />

        <Header androidStatusBarColor={commonColor.statusBar} style={{ backgroundColor: commonColor.primary }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Jogos e Rodadas</Title>
          </Body>
          <Button onPress={_ => this.refresh()} transparent>
            <Icon name="refresh" />
          </Button>
        </Header>


        <Content padder>

          <Card>
            <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
              <Left>
                <Icon style={{ color: commonColor.tint }} name="list" />
              </Left>
              <Body>
                <Title>Lista</Title>
              </Body>
              <Right>
                <Badge style={{ backgroundColor: commonColor.badge }}>
                  <Text>{this.state.listViewData.length}</Text>
                </Badge>
              </Right>
            </Header>

            <CardItem>
              <Body>
                <Text note>
                  Aqui você tem acesso à lista de todos os jogos e as rodadas cadastrados.
                </Text>
                <Text note>
                  Busque-os pelo nome ou pela Modalidade.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <View style={{ flex: 1 }}>
                <Search
                  ref="search_box"
                  onSearch={() => this.onSearch(this.state.searchTerm)}
                  placeholder=' Buscar...'
                  cancelTitle='Cancelar'
                  cancelButtonWidth={80}
                  positionRightDelete={80}
                  onChangeText={(searchTerm) => this.setState({ searchTerm })}
                  backgroundColor={'transparent'}
                  titleCancelColor={'grey'}
                  tintColorDelete={commonColor.secondary}
                />
              </View>
            </CardItem>
          </Card>

          {!this.state.listViewData.length > 0 ? <Text note style={{ padding: 10 }}>Nenhum item encontrado</Text> :

            <List
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={(data, secId, rowId) =>
                <TouchableOpacity onPress={() => this.setState({ modalDetailsVisible: true, data: data })}>
                  <Card style={styles.mb}>
                    <CardItem header bordered>
                      <Left>
                        <Icon style={{ color: commonColor.secondary }} type='Entypo' name='medal' />
                        <Body>
                          <Text style={{ color: commonColor.primary }}> {(data.nome)}</Text>
                          <Text note>Jogo/Rodada</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Left />
                      <Right>
                        <Text note> {parseInt(rowId, 10) + 1} </Text>
                      </Right>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              }

              renderLeftHiddenRow={data =>
                <Button
                  backgroundColor={commonColor.secondary}
                  primary
                  full
                  onPress={() => this.props.navigation.navigate('PartidaEdit', { data: data, onRefresh: this.refresh.bind(this) })}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}  >
                  <Icon active type='FontAwesome' name="edit" />
                </Button>
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

              leftOpenValue={75}
              rightOpenValue={-75}
            />
          }
        </Content>

        <ActionButton buttonColor={commonColor.secondary}>
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Cadastrar pontuações"
            onPress={() => this.props.navigation.navigate('PontuacaoPartidasCreate', { onRefresh: this.refresh.bind(this) })}>
            <Icon type='Ionicons' name="medal" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Criar novos(as) jogos/rodadas"
            onPress={() => this.props.navigation.navigate('PartidaCreate', { onRefresh: this.refresh.bind(this) })}>
            <Icon name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </Container >
    );
  }
}