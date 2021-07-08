import React, { Component } from "react";
import { ListView, Alert, Linking, TouchableOpacity } from "react-native";
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

export default class Regulamentos extends Component {

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
    };
  }

  async componentDidMount() {
    this.setState({ loaderVisible: true });
    var regulamento = await StorageService.getItem('regulamentos');

    if (regulamento)
      this.setState({ listViewData: regulamento, loaderVisible: false });
    else
      this.refresh();
  }

  async refresh() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/regulamentos')
      .then((response) => {

        console.log("RESPONSE", response);

        StorageService.setItem('regulamentos', response.data);
        this.setState({ listViewData: response.data, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false });
        console.log("DEU ERRO", error);
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  handleDelete = async () => {
    this.setState({ dialogRemoveVisible: false, loaderVisible: true });

    var data = this.state.data;
    var secId = this.state.secId;
    var rowId = this.state.rowId;
    var rowMap = this.state.rowMap;

    await ApiService.delete('/regulamentos/' + data.id)
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

        <Header androidStatusBarColor={commonColor.statusBar} style={{ backgroundColor: commonColor.primary }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Regulamentos</Title>
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
                  Aqui você tem acesso a lista de todos os regulamentos cadastrados no sistema. Um arquivo será baixado ao clicar em alguma opção.
                </Text>
              </Body>
            </CardItem>
          </Card>

          {!this.state.listViewData.length > 0 ? <Text note style={{ padding: 10 }}>Nenhum item encontrado</Text> :

            <List
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={(data, secId, rowId) =>
                <TouchableOpacity onPress={() => Linking.openURL(data.link)}>
                  <Card style={styles.mb}>
                    <CardItem header bordered>
                      <Left>
                        <Icon style={{ color: commonColor.secondary }} type='Entypo' name='book' />
                        <Body>
                          <Text style={{ color: commonColor.primary }}> {data.nome}</Text>
                          <Text note>Regulamento</Text>
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
                  onPress={() => this.props.navigation.navigate('RegulamentoEdit', { data: data, onRefresh: this.refresh.bind(this) })}
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
                  <Icon active name="trash" type="Entypo" />
                </Button>
              }

              leftOpenValue={75}
              rightOpenValue={-75}
            />
          }
        </Content>

        <ActionButton buttonColor={commonColor.secondary}>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Criar novo regulamento"
            onPress={() => this.props.navigation.navigate('RegulamentoCreate', { onRefresh: this.refresh.bind(this) })}>
            <Icon name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </Container>
    );
  }
}