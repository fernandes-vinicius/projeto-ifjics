import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import Dialog from "react-native-dialog";
import {
    Content,
    Card,
    CardItem,
    Text,
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
        campi: this.props.campi,
        selectedPickerCampus: null,
        selectedPickerColocacao: null,
        isRecorde: false,
        loaderVisible: false,
    };

    onPressAdd = () => {

        let campus = this.state.selectedPickerCampus;
        let colocacao = this.state.selectedPickerColocacao;
        let pontos = 0;
        let bonus = 0;
        let cont = 0;


        if (campus == null)
            Alert.alert('Você não selecionou o campus', 'Selecione o campus para continuar.');
        else if (colocacao == null)
            Alert.alert('Você não selecionou a colocação', 'Selecione a colocação deste campus na competição para continuar.');
        else if (this.props.pontuacoes.length > 0) {
            for (var i = 0; i < this.props.pontuacoes.length; i++) {
                if (this.props.pontuacoes[i].campus.id == campus.id)
                    cont++;
            }
        }
        if (cont > 0)
            Alert.alert('Já foi adicionada uma pontuação para esse campus.', 'Selecione outro campus ou exclua a pontuação já cadastrada.');
        else {
            if (campus != null & colocacao != null) {
                if (colocacao == 1 && this.state.isRecorde) {
                    pontos = 5;
                    bonus = pontos;
                } else if (colocacao == 1)
                    pontos = 5;
                else if (colocacao == 2)
                    pontos = 3;
                else if (colocacao == 3)
                    pontos = 1;

                var total = parseInt(pontos, 10) + parseInt(bonus, 10);

                const pontuacao = {
                    campus: campus,
                    colocacao: colocacao,
                    pontos: pontos,
                    bonus: bonus,
                    total: total,
                };

                this.props.onAdd(pontuacao);

                this.setState({
                    selectedPickerCampus: null,
                    selectedPickerColocacao: null,
                    isRecorde: false,
                    loaderVisible: false,
                });
            }
        }
    };

    handleToggleSwitchRecorde = () => {
        this.setState({ isRecorde: !this.state.isRecorde });
    }

    render() {
        return (
            <View>

                <LoaderComponent visible={this.state.loaderVisible} />

                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Adiconar Pontuação</Dialog.Title>

                    <Content padder>

                        <Card style={styles.mb}>
                            <CardItem>
                                <Body>
                                    <Text note>
                                        Selecione primeiro o campus.
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem>
                                <Left>
                                    <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="map" />
                                    <Picker
                                        selectedValue={this.state.selectedPickerCampus}
                                        style={{ height: 50, width: '90%' }}
                                        onValueChange={(itemValue) => this.setState({ selectedPickerCampus: itemValue })}>

                                        <Picker.Item key={null} label={'Selecione o campus'} value={null} />
                                        {
                                            (!this.props.campi && !this.props.campi.length) ? <Picker.Item note label={'Nenhum item encontrado'} /> :
                                                this.props.campi.map((data) => {
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
                                        Informe a colocação que este campus conquistou na competição.
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem>
                                <Left>
                                    <Icon style={{ color: commonColor.secondary }} type='Ionicons' name="medal" />
                                    <Picker
                                        selectedValue={this.state.selectedPickerColocacao}
                                        style={{ height: 50, width: '90%' }}
                                        onValueChange={(itemValue) => this.setState({ selectedPickerColocacao: itemValue })}>

                                        <Picker.Item key={null} label={'Selecione a colocação'} value={null} />
                                        {
                                            this.props.campi.map((data, index) => {
                                                { index += 1 }
                                                return <Picker.Item key={index} label={index + 'º'} value={index} />
                                            })
                                        }
                                    </Picker>
                                </Left>
                            </CardItem>
                        </Card>

                        <Card style={styles.mb}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text>Houve quebra de recorde? </Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Switch
                                        onValueChange={this.handleToggleSwitchRecorde}
                                        value={this.state.isRecorde}
                                        trackColor='#FFF' />
                                </Right>
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
