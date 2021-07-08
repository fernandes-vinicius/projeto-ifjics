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
    competicao: [],
    nome: '',
    descricao: '',
    selectedPickercompeticao: [],
    selectedCampi: [],
    loaderVisible: false,
  };

  async componentDidMount() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/competicoes')
      .then((response) => {
        var competicoes = response.data;
        this.setState({ competicao: competicoes, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, selectedPickercompeticao: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });

    this.setState({ loaderVisible: true });
    await ApiService.get('/campi')
      .then((response) => {
        var campi = response.data;
        this.setState({ campi: campi, loaderVisible: false });
      })
      .catch((error) => {
        this.setState({ loaderVisible: false, campi: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });

  }

  async handleAdd() {
    if (!this.state.descricao.trim() || !this.state.nome.trim())
      Alert.alert('Por favor. Preencha todos os campos solicitados.', 'Preencha todos os campos solicitados para continuar.');
    else if (this.state.selectedPickercompeticao == null)
      Alert.alert('Você não selecionou a competicao!', 'Selecione uma competicao para continuar.');
    else if (this.state.selectedCampi.length == 0)
      Alert.alert('Você não selecionou os campus!', 'Selecione os campus para continuar.');
    else {
      this.setState({ loaderVisible: true });
      var campi = this.state.selectedCampi.map((obj) => { return obj.value; });

      await ApiService.post('/polos', {
        nome: this.state.nome,
        descricao: this.state.descricao,
        competicao: this.state.selectedPickercompeticao,
        campi: campi,
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
  }

  onSelectionsChangeCampi = (selectedCampi) => {
    this.setState({ selectedCampi });
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
            <Title>Polos</Title>
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
                  Informe o nome do polo.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='group' />
                  <Input
                    value={this.state.nome}
                    onChangeText={(nome) => this.setState({ nome })}
                    maxLength={100}
                    placeholder="Nome do polo" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Informe a descrição do polo.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Item>
                  <Icon style={{ color: commonColor.secondary }} type='MaterialIcons' name='description' />
                  <Input
                    value={this.state.descricao}
                    onChangeText={(descricao) => this.setState({ descricao })}
                    maxLength={250}
                    placeholder="Descrição do polo" />
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <Text note>
                  Selecione a modalidade na qual o polo faz parte.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='trophy' />
                <Picker
                  selectedValue={this.state.selectedPickercompeticao}
                  style={{ height: 50, width: '90%' }}
                  onValueChange={(itemValue) => this.setState({ selectedPickercompeticao: itemValue })}>

                  <Picker.Item key={null} label={'Selecione a modalidade'} value={null} />
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
                  Selecione todos os campi participantes do polo.
                </Text>
              </Body>
            </CardItem>

            <SelectMultipleComponent
              enableEmptySections
              items={this.state.campi.map(c => ({
                label: c.nome,
                value: c,
              }))
              }
              selectedItems={this.state.selectedCampi}
              onSelectionsChange={this.onSelectionsChangeCampi} />
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
            <Text>Cadastrar Polos</Text>
          </Button>
        </Footer>


      </Container>

    );
  }
}
