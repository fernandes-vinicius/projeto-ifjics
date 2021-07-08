import React, { Component } from "react";
import { ListView, Alert, TouchableOpacity, View } from "react-native";
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
      list: [],
      listViewData: [],
      activeFab: false,
      loaderVisible: false,
      searchTerm: '',
      modalDetailsVisible: false,
    };
  }

  async componentDidMount() {
    this.setState({ loaderVisible: true });
    var partida = await StorageService.getItem('partida');

    if (partida) {
      this.setState({ listViewData: partida });
      this.validateDate(this.state.listViewData);
      this.setState({ loaderVisible: false });
    }
    else
      this.refresh();

  }
  validateDate = (list) => {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.state.list = [];
    for (let index = 0; index < list.length; index++) {
      var monthData = new Date(list[index].data).getMonth() + 1;
      var yearData = new Date(list[index].data).getFullYear();

      if ((month - monthData) < 2 || (year - yearData) == 0) {
        this.state.list = [...this.state.list, list[index]];
      } this.setState({ listViewData: this.state.list });
    }
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
    } this.validateDate(this.state.listViewData);
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

    this.validateDate(this.state.listViewData);
  }

  render() {
    return (
      <Container>

        <LoaderComponent visible={this.state.loaderVisible} />

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
                  Aqui você tem acesso a todos o(s) Jogo(s)/Rodada(s) cadastrados.
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

            <ListView
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
            />
          }
        </Content>
      </Container >
    );
  }
}