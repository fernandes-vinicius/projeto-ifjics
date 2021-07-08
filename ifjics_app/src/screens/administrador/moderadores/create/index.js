import React, { Component } from "react";
import { ListView, Alert, TouchableOpacity } from "react-native";
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
  View,
  Separator,
} from "native-base";
import styles from "./styles";
import { commonColor } from '../../../../theme';

import { LoaderComponent } from '../../../../components';

import { ApiService } from '../../../../services';

import DialogConfirmModerador from "../dialogConfirmModerador";

export default class Create extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: [],
      searchTerm: '',
      secId: null,
      rowId: null,
      rowMap: null,
      listViewData: [],
      loaderVisible: false,
      dialogRemoveVisible: false,
      modalDetailsVisible: false,
    };
  }

  onSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      this.setState({ loaderVisible: true });

      await ApiService.get('/users/user?s=' + searchTerm)
        .then((response) => { this.setState({ listViewData: response.data, loaderVisible: false }); })
        .catch((error) => {
          this.setState({ loaderVisible: false });
          Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
        });
    }
  }

  createModerador = async () => {
    var user = this.state.data;

    if (user) {
      await ApiService.put('/users/moderadores/' + user.id)
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

  render() {
    return (
      <Container>

        <LoaderComponent visible={this.state.loaderVisible} />

        <DialogConfirmModerador
          visible={this.state.modalDetailsVisible}
          onCancel={() => this.setState({ modalDetailsVisible: false })}
          OnConfirm={() => this.createModerador()}
          data={this.state.data} />

        <Header androidStatusBarColor={commonColor.statusBar} style={{ backgroundColor: commonColor.primary }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Criar Coordenador</Title>
          </Body>

        </Header>

        <Content padder>

          <Card>
            <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
              <Left>
                <Icon style={{ color: commonColor.tint }} name="search" />
              </Left>
              <Body>
                <Title>Buscar usuário</Title>
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
                  Busque os usuários por nome, email, usuário ou até mesmo telefone. Os usuários pesquisados irão aparecer abaixo.
                  Toque no usuário que deseja tornar coordenador. O resultado da busca trará apenas os usuários que ainda não são coordenadores.
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

          <Separator style={{ backgroundColor: 'transparent' }} />

          {!this.state.listViewData.length > 0 ? <Text note style={{ padding: 10 }}>Nenhum usuário encontrado</Text> :

            <ListView
              enableEmptySections
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={(data, secId, rowId) =>
                <TouchableOpacity onPress={() => this.setState({ modalDetailsVisible: true, data: data })}>
                  <Card style={styles.mb}>
                    <CardItem header bordered>
                      <Left>
                        <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='user' />
                        <Body>
                          <Text style={{ color: commonColor.primary }}> Usuário</Text>
                          <Text note> {data.username}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <Text note> {parseInt(rowId, 10) + 1} </Text>
                      </Right>
                    </CardItem>

                    <CardItem>
                      <Left>
                        <Body>
                          <Text style={{ color: commonColor.primary }}> Nome</Text>
                          <Text note> {data.nome}</Text>
                        </Body>
                      </Left>
                    </CardItem>

                    <CardItem>
                      <Left>
                        <Body>
                          <Text style={{ color: commonColor.primary }}> Email</Text>
                          <Text note> {data.email}</Text>
                        </Body>
                      </Left>
                    </CardItem>

                    <CardItem>
                      <Left>
                        <Body>
                          <Text style={{ color: commonColor.primary }}> Telefone</Text>
                          <Text note> {data.telefone}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              }
            />
          }

          <Separator style={{ backgroundColor: 'transparent' }} />

        </Content>

      </Container>
    );
  }
}