import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import Dialog from "react-native-dialog";
import {
    Content,
    Card,
    CardItem,
    Item,
    Text,
    Input,
    Body,
    Right,
    Icon,
    Left,
    Picker,
    Separator,
    Switch,
} from "native-base";
import styles from './styles';
import { commonColor } from "../../../../theme";

import { LoaderComponent } from '../../../../components';

import { ApiService } from '../../../../services';

export default class DialogAdd extends Component {

    state = {
        list: this.props.list,
        pontos: null,
        selectedPickerCompetidor: null,
        loaderVisible: false,
        isModalidadeInvididual: this.props.isModalidadeInvididual,
    };


    onPressAdd = () => {

        let pontos = this.state.pontos;
        let competidor = this.state.selectedPickerCompetidor;
        let cont = 0;
        let cont2 = 0;
        if (competidor == null)
            Alert.alert('Você não selecionou o competidor', 'Selecione o competidor para continuar.');
        else if (pontos == null)
            Alert.alert('Você não informou a pontuação do competidor', 'Informe a pontuação para continuar.');
        else if (this.props.pontuacoes.length > 0) {
            for (var i = 0; i < this.props.pontuacoes.length; i++) {
                if (!this.props.isModalidadeIndividual) {
                    if (this.props.pontuacoes[i].competidor.campus != null && competidor.campus != null) {
                        if ((this.props.pontuacoes[i].competidor.campus.id == competidor.campus.id))
                            cont++;
                    } else if (this.props.pontuacoes[i].competidor.polo != null && competidor.polo != null) {
                        if ((this.props.pontuacoes[i].competidor.polo.id == competidor.polo.id))
                            cont++;
                    }  
                } else {
                    if (this.props.pontuacoes[i].competidor != null) {
                        if (this.props.pontuacoes[i].competidor.id == competidor.id)
                            cont++;
                    }
                }

            }
        }
        else if (this.props.pontuacaoParcial.length > 0){
            for (var j = 0; j < this.props.pontuacaoParcial.length; j++) {
                if (!this.props.isModalidadeIndividual) {
                    if (this.props.pontuacaoParcial[j].campus != null && competidor.campus != null){
                        if(this.props.pontuacaoParcial[j].campus.id == competidor.campus.id && this.props.pontuacaoParcial[j].partida.id == this.props.partida.id)
                          cont2++;
                    } else if (this.props.pontuacaoParcial[j].polo != null && competidor.polo != null && this.props.pontuacaoParcial[j].partida.id == this.props.partida.id) {
                        if (this.props.pontuacaoParcial[j].polo.id == competidor.polo.id)
                            cont2++;
                      }
                }else {
                    if (this.props.pontuacaoParcial[j].user != null) {
                        if(this.props.pontuacaoParcial[j].user.id == competidor.id && this.props.pontuacaoParcial[j].partida.id == this.props.partida.id)
                            cont2++;
                    }
                }                  
            }
        }

        if (cont > 0 || cont2 > 0)
            Alert.alert('Já foi adicionada uma pontuação para esse competidor.', 'Selecione outro competidor ou exclua a pontuação já cadastrada.');
        else {
            if (competidor != null & pontos != null) {
                const pontuacao = {
                    competidor: competidor,
                    pontos: pontos,
                };

                this.props.onAdd(pontuacao);

                this.setState({
                    selectedPickerCompetidor: null,
                    selectedPickerColocacao: null,
                    loaderVisible: false,
                    pontos: null,
                });
            }
        }
    };

    render() {

        return (
            <View>

                <LoaderComponent visible={this.state.loaderVisible} />

                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Adicionar Pontuação</Dialog.Title>

                    <Content padder>

                        <Card style={styles.mb}>
                            <CardItem>
                                <Body>
                                    <Text note>
                                        Informe a pontuação do competidor.
                                </Text>
                                </Body>
                            </CardItem>

                            <CardItem>
                                <Body>
                                    <Item>
                                        <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='trophy' />
                                        <Input
                                            value={this.state.pontos}
                                            onChangeText={(pontos) => this.setState({ pontos })}
                                            autoCapitalize='none'
                                            keyboardType='phone-pad'
                                            maxLength={250}
                                            placeholder="Pontuação" />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>

                        <Card style={styles.mb}>
                            <CardItem>
                                <Body>
                                    <Text note>
                                        Selecione primeiro o competidor.
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem>
                                <Left>
                                    <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="map" />
                                    <Picker
                                        selectedValue={this.state.selectedPickerCompetidor}
                                        style={{ height: 50, width: '90%' }}
                                        onValueChange={(itemValue) => this.setState({ selectedPickerCompetidor: itemValue })}>
                                        <Picker.Item key={null} label={'Selecione o competidor'} value={null} />
                                        {
                                            (!this.props.list && !this.props.list.length) ? <Picker.Item note label={'Nenhum item encontrado'} /> :
                                                (!this.props.isModalidadeIndividual && this.props.isModalidadeIndividual == false) ? this.props.list.map((data) => {
                                                    if (data.campus != null) {
                                                        return <Picker.Item label={data.campus.nome} value={data} />
                                                    } else {
                                                        return <Picker.Item label={data.polo.nome} value={data} />
                                                    }
                                                }) : this.props.list.map((data) => {
                                                    return <Picker.Item label={data.nome + ' - Campus: ' + data.campus.nome} value={data} />
                                                })
                                        }
                                    </Picker>
                                </Left>
                            </CardItem>
                        </Card>

                        <Separator style={{ backgroundColor: 'transparent' }} />

                    </Content>

                    <Dialog.Button onPress={this.props.onCancel} label="Cancelar" />
                    <Dialog.Button onPress={this.onPressAdd} label="Adicionar" />
                </Dialog.Container>
            </View>
        );
    }
}
