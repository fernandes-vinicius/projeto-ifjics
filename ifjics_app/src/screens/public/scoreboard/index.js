import React, { Component } from "react";
import { Alert, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Body,
  Card,
  CardItem,
  Picker,
  Separator,
  Right,
  Item,
} from "native-base";
import styles from "./styles";
import { commonColor } from '../../../theme';
import { LoaderComponent } from '../../../components';
import { ApiService } from '../../../services';

export default class ScoreBoard extends Component {

  state = {
    jogos: [],
    selectedPickerJogos: [],
    loaderVisible: false,
  };

  async componentDidMount() {
    this.setState({ loaderVisible: true });

    await ApiService.get('/jogos')
      .then((response) => { this.setState({ jogos: response.data, loaderVisible: false }); })
      .catch((error) => {
        this.setState({ loaderVisible: false, selectedPickerJogos: null });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
  }

  handlePontuacaoGeral() {
    if (this.state.selectedPickerJogos == null)
      Alert.alert('Você não selecionou os jogos', 'Selecione os Jogos no qual deseja ver o quadro.');
    else {
      this.props.navigation.navigate('ScoreboardGeral', { jogos: this.state.selectedPickerJogos });
    }
  }

  handlePontuacaoPorCompeticao() {
    if (this.state.selectedPickerJogos == null)
      Alert.alert('Você não selecionou os jogos', 'Selecione os Jogos no qual deseja ver o quadro.');
    else {
      this.props.navigation.navigate('ScoreboardPorCompeticao', { jogos: this.state.selectedPickerJogos });
    }
  }

  handleResultadosParciais() {
    if (this.state.selectedPickerJogos == null)
      Alert.alert('Você não selecionou os jogos', 'Selecione os Jogos no qual deseja ver o quadro.');
    else {
      this.props.navigation.navigate('ScoreboardParciais', { jogos: this.state.selectedPickerJogos });
    }
  }
  render() {



    return (
      <Container>

        <LoaderComponent visible={this.state.loaderVisible} />

        <Header androidStatusBarColor={commonColor.primary} style={{ backgroundColor: commonColor.primary }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Quadro de Pontuações</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Card>
            <Header androidStatusBarColor={commonColor.primary} style={[{ backgroundColor: '#043B35' }, styles.mb]}>
              <Left>
                <Icon style={{ color: commonColor.tint }} type='MaterialIcons' name='event-note' />
              </Left>
              <Body>
                <Title>Selecione o Evento </Title>
              </Body>
            </Header>

            <CardItem>
              <Body>
                <Text note>
                  Selecione o Evento que deseja acompanhar o quadro de pontuação.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Left>
                <Icon style={{ color: commonColor.secondary }} type='MaterialIcons' name='event-note' />
                <Picker
                  selectedValue={this.state.selectedPickerJogos}
                  style={{ height: 50, width: '90%' }}
                  onValueChange={(itemValue) => this.setState({ selectedPickerJogos: itemValue })}>

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

          <Separator style={{ backgroundColor: 'transparent' }} />

          <TouchableOpacity onPress={_ => this.handlePontuacaoGeral()}>
            <Card>
              <Header androidStatusBarColor={commonColor.primary} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
                <Left>
                  <Icon style={{ color: commonColor.tint }} type='Ionicons' name="medal" />
                </Left>
                <Body>
                  <Title>Pontuação Geral</Title>
                </Body>
              </Header>

              <CardItem>
                <Body>
                  <Text note>
                    Clique para acessar o quadro de pontuação geral do evento. Este é o quadro de pontuação geral para determinação do Campeão Geral do evento.
                  </Text>
                </Body>
              </CardItem>

              <CardItem>
                <Left />
                <Body />
                <Right>
                  <Icon style={{ color: commonColor.dark }} type='MaterialIcons' name="done" />
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>

          <Separator style={{ backgroundColor: 'transparent' }} />

          <TouchableOpacity onPress={_ => this.handlePontuacaoPorCompeticao()}>
            <Card>
              <Header androidStatusBarColor={commonColor.primary} style={[{ backgroundColor: commonColor.fourth }, styles.mb]}>
                <Left>
                  <Icon style={{ color: commonColor.tint }} type='Ionicons' name="medal" />
                </Left>
                <Body>
                  <Title>Por Modalidade</Title>
                </Body>
              </Header>

              <CardItem>
                <Body>
                  <Text note>
                    Clique para acessar o quadro de pontuação por modalidade. Você verá como foi ou está sendo a performance de cada campus em cada competição.
                  </Text>
                </Body>
              </CardItem>

              <CardItem>
                <Left />
                <Body />
                <Right>
                  <Icon style={{ color: commonColor.dark }} type='MaterialIcons' name="done" />
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>

          <Separator style={{ backgroundColor: 'transparent' }} />

          <TouchableOpacity onPress={_ => this.handleResultadosParciais()}>
            <Card>
              <Header androidStatusBarColor={commonColor.primary} style={[{ backgroundColor: commonColor.fifth }, styles.mb]}>
                <Left>
                  <Icon style={{ color: commonColor.tint }} type='Ionicons' name="medal" />
                </Left>
                <Body>
                  <Title>Resultados parciais</Title>
                </Body>
              </Header>

              <CardItem>
                <Body>
                  <Text note>
                    Clique para acessar o quadro de pontuações parciais. Você verá como foi ou está sendo a performance de cada campus ou atletas nas partidas.
                  </Text>
                </Body>
              </CardItem>

              <CardItem>
                <Left />
                <Body />
                <Right>
                  <Icon style={{ color: commonColor.dark }} type='MaterialIcons' name="done" />
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>

          <Separator style={{ backgroundColor: 'transparent' }} />

        </Content>

      </Container>
    );
  }
}