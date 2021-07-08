import React, { Component } from "react";
import { Alert, ListView, TouchableOpacity, ActivityIndicator } from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    Left,
    Right,
    ListItem,
    Body,
    Card,
    CardItem,
    Picker,
    Separator,
    Grid,
    Col,
    Row,
    Text,
    View,
} from "native-base";
import styles from "./styles";
import { commonColor } from '../../../../theme';

import { LoaderComponent } from '../../../../components';

import { ApiService } from '../../../../services';

import ModalDetails from './details';

export default class ResultadosParciais extends Component {

    state = {
        competicoes: [],
        partidas: [],
        partida: [],
        selectedPickerCompeticao: [],
        pontuacoes: [],
        loaderVisible: false,
        modalDetailsVisible: false,
    };

    async componentDidMount() {
        this.refresh();
    }

    async refresh() {
        this.setState({ loaderVisible: true });

        var jogos = this.props.navigation.getParam('jogos', '');

        await ApiService.get('/competicoes/jogos/' + jogos.id)
            .then((response) => { this.setState({ competicoes: response.data, loaderVisible: false }); })
            .catch((error) => {
                this.setState({ loaderVisible: false, selectedPickerCompeticao: null });
                Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
            });
    }

    onValueChangePickerCompeticao = async (competicao) => {
        this.setState({ selectedPickerCompeticao: competicao });

        if (competicao) {
            this.setState({ loaderVisible: true });

            await ApiService.get('/partida/competicao/' + competicao.id)
                .then((response) => {
                    var partida = response.data;
                    this.setState({ partidas: partida, loaderVisible: false });
                })
                .catch((error) => {
                    this.setState({ loaderVisible: false, partidas: null });
                    Alert.alert('Ops! Algo deu errado!', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
                });

        }
    }

    onSelectedPartida = async (partida) => {
        this.setState({ loaderVisible: true });

        if (partida) {
            await ApiService.get('/pontuacaoparcial/partida/' + partida.id)
                .then((response) => {
                    var pontuacaoparcial = response.data;
                    this.setState({
                        pontuacoes: pontuacaoparcial, partida: partida,
                        loaderVisible: false, modalDetailsVisible: true
                    });
                })
                .catch((error) => {
                    this.setState({ loaderVisible: false, pontuacoes: null });
                    Alert.alert('Ainda não há pontuações cadastradas para essa partida.');
                });

            this.setState({ loaderVisible: true });

            var pontuacoes = this.state.pontuacoes;
            if (pontuacoes.length) {
                var array = [...pontuacoes];

                array.sort(function (a, b) {
                    return a.pontos > b.pontos ? -1 : a.pontos < b.pontos ? 1 : 0;
                });

                this.setState({ pontuacoes: array });
            }
            this.setState({ loaderVisible: false });
        }
    }

    onCloseDetails = () => { }

    render() {
        return (
            <Container>

                <LoaderComponent visible={this.state.loaderVisible} />

                <ModalDetails
                    visible={this.state.modalDetailsVisible}
                    onClose={() => this.setState({ modalDetailsVisible: false })}
                    data={this.state.partida}
                    pontuacoes={this.state.pontuacoes}
                />

                <Header androidStatusBarColor={commonColor.fifth} style={{ backgroundColor: commonColor.fifth }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.title}>Resultados Parciais</Title>
                    </Body>
                    <Right>
                        <Button onPress={_ => this.refresh()} transparent>
                            <Icon name="refresh" />
                        </Button>
                    </Right>
                </Header>

                <Content padder>

                    <Separator style={{ backgroundColor: 'transparent' }} />

                    <Card>
                        <Header androidStatusBarColor={commonColor.fifth} style={[{ backgroundColor: commonColor.fifth }, styles.mb]}>
                            <Left>
                                <Icon style={{ color: commonColor.tint }} type='Ionicons' name="medal" />
                            </Left>
                            <Body>
                                <Title>Modalidade</Title>
                            </Body>
                        </Header>

                        <CardItem>
                            <Body>
                                <Text note>
                                    Selecione a Modalidade para visualizar os(as) jogos/partidas desta Modalidade específica.
                                </Text>
                            </Body>
                        </CardItem>

                        <CardItem>
                            <Left>
                                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="trophy" />
                                <Picker
                                    selectedValue={this.state.selectedPickerCompeticao}
                                    style={{ height: 50, width: '90%' }}
                                    onValueChange={(itemValue) => this.onValueChangePickerCompeticao(itemValue)}>

                                    <Picker.Item key={null} label={'Selecione a Modalidade'} value={null} />
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


                    <Card style={styles.mb}>

                        <Header androidStatusBarColor={commonColor.fifth} style={[{ backgroundColor: commonColor.fifth }, styles.mb]}>
                            <Left>
                                <Icon style={{ color: commonColor.tint }} type='Entypo' name="blackboard" />
                            </Left>
                            <Body>
                                <Title>Jogos/Rodadas</Title>
                            </Body>
                        </Header>

                        {

                            (this.state.loaderVisible) ?
                                <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" animating={true} />
                                </CardItem>

                                :

                                <View>

                                    <CardItem>

                                        {
                                            (this.state.partidas.length == 0) ? <Text note>Nenhuma partida adicionada</Text> :
                                                <List
                                                    dataArray={this.state.partidas}
                                                    renderRow={(data, secId, rowId) =>

                                                        <TouchableOpacity onPress={() => this.onSelectedPartida(data)}>

                                                            <CardItem header bordered>
                                                                <Left>
                                                                    <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='trophy' />
                                                                    <Body>
                                                                        <Text style={{ color: commonColor.fifth }}> {
                                                                            (data.nome) ? data.nome : "INDEFINIDO"
                                                                        }</Text>
                                                                        <Text style={{ fontSize: 9, color: 'grey' }}>Clique para visualizar as pontuações.</Text>
                                                                    </Body>
                                                                </Left>
                                                            </CardItem>
                                                        </TouchableOpacity>
                                                    } />
                                        }

                                    </CardItem>

                                </View>
                        }

                    </Card>
                </Content>

            </Container>
        );
    }
}