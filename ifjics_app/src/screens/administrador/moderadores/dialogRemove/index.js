import React, { Component } from 'react';
import { View } from 'react-native';

import Dialog from "react-native-dialog";

class DialogRemove extends Component {

    render() {
        return (
            <View>
                <Dialog.Container visible={ this.props.visible }>
                    <Dialog.Title>Remover coordenador</Dialog.Title>
                    <Dialog.Description>
                        Deseja remover o papel de coordenador deste usuário ?
                        Ao clicar em remover este usuário não poderá mais efetuar alterações como coordenador.
                    </Dialog.Description>
                    <Dialog.Button onPress={ this.props.onCancel } label="Cancelar" />
                    <Dialog.Button onPress={ this.props.onRemove } label="Remover" />
                </Dialog.Container>
            </View>
        );
    }
}

export default DialogRemove;
