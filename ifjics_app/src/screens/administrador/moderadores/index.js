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

import { LoaderComponent } from '../../../components';

import DialogRemove from './dialogRemove';

import ModalDetails from './details';

import { ApiService, StorageService } from '../../../services';

export default class Moderadores extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: [],
      secId: null,
      rowId: null,
      rowMap: null,
      listViewData: [],
      loaderVisible: false,
      dialogRemoveVisible: false,
      modalDetailsVisible: false,
    };
  }

  async componentDidMount() {
    this.refresh();
  }

  async refresh() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/users/moderadores')
      .then((response) => { this.setState({ listViewData: response.data, loaderVisible: false }); })
      .catch((error) => {
        this.setState({ loaderVisible: false });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  handleRemove = async () => {
    this.setState({ dialogRemoveVisible: false, loaderVisible: true });

    var data = this.state.data;
    var secId = this.state.secId;
    var rowId = this.state.rowId;
    var rowMap = this.state.rowMap;

    await ApiService.delete('/users/moderadores/' + data.id)
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

        <DialogRemove
          visible={this.state.dialogRemoveVisible}
          onCancel={() => this.setState({ dialogRemoveVisible: false })}
          onRemove={this.handleRemove} />

        <ModalDetails
          visible={this.state.modalDetailsVisible}
          onClose={() => this.setState({ modalDetailsVisible: false })}
          data={this.state.data} />

        <Header androidStatusBarColor={commonColor.secondary} style={{ backgroundColor: commonColor.primary }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Coordenadores</Title>
          </Body>
          <Right>
            <Button onPress={_ => this.refresh()} transparent>
              <Icon name="refresh" />
            </Button>
          </Right>
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
                  Aqui você tem acesso a lista de todos os coordenadores cadastrados.
                  Você pode remover o papel de coordenador de um usuário apenas deletando ele da lista abaixo.
                </Text>
              </Body>
            </CardItem>

          </Card>

          {!this.state.listViewData.length > 0 ? <Text note style={{ padding: 10 }}>Nenhum coordenador encontrado</Text> :

            <List
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={(data, secId, rowId) =>
                <TouchableOpacity onPress={() => this.setState({ modalDetailsVisible: true, data: data })}>
                  <Card style={styles.mb}>
                    <CardItem header bordered>
                      <Left>
                        <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='user' />
                        <Body>
                          <Text style={{ color: commonColor.primary }}>Coordenador</Text>
                          <Text note> {data.nome}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Body>
                          <Text style={{ color: commonColor.primary }}> Nome</Text>
                          <Text note> {data.nome}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <Text note> {parseInt(rowId, 10) + 1} </Text>
                      </Right>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
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

        </Content>

        <ActionButton buttonColor={commonColor.secondary}>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Criar novo coordenador"
            onPress={() => this.props.navigation.navigate('ModeradoresCreate', { onRefresh: this.refresh.bind(this) })}>
            <Icon name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </Container>
    );
  }
}