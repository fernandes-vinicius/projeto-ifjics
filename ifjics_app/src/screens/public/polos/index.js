import React, { Component } from "react";
import { ListView, Alert, TouchableOpacity } from "react-native";
import ActionButton from 'react-native-action-button';
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

export default class Polos extends Component {

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
      modalDetailsVisible: false,
    };
  }

  async componentDidMount() {
    this.setState({ loaderVisible: true });
    var polos = await StorageService.getItem('polos');

    if (polos)
      this.setState({ listViewData: polos, loaderVisible: false });
    else
      this.refresh();

  }

  async refresh() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/polos')

      .then((response) => {
        StorageService.setItem('polos', response.data);
        this.setState({ listViewData: response.data, loaderVisible: false });
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
            <Title>Polos</Title>
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
                  Aqui você tem acesso a lista de todas os polos cadastrados no sistema.
                </Text>
              </Body>
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
                        <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='group' />
                        <Body>
                          <Text style={{ color: commonColor.primary }}>{data.nome}</Text>

                          <Text note>Polo</Text>
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
      </Container>
    );
  }
}