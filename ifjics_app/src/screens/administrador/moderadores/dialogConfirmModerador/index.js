import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Dialog from "react-native-dialog";

class DialogConfirmModerador extends Component {

    render() {

        const data = this.props.data;

        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Tornar coordenador</Dialog.Title>
                    <Dialog.Description>
                        Deseja realmente tornar este usuário um coordenador ?
                    </Dialog.Description>

                    <Text note style={{ marginLeft: 10, marginRight: 10 }}>
                        Clique em Ok para tornar<Text style={{ fontWeight: 'bold' }}> {data.nome} </Text>um coordenador.
                    </Text>

                    <Dialog.Button onPress={this.props.onCancel} label="Cancelar" />
                    <Dialog.Button onPress={this.props.OnConfirm} label="Ok" />
                </Dialog.Container>
            </View>
        );
    }
}

export default DialogConfirmModerador;
