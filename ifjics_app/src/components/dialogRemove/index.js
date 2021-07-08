import React, { Component } from 'react';
import { View } from 'react-native';

import Dialog from "react-native-dialog";

class DialogRemove extends Component {

    render() {
        return (
            <View>
                <Dialog.Container visible={ this.props.visible }>
                    <Dialog.Title>Exclusão de registro</Dialog.Title>
                    <Dialog.Description>
                        Deseja excluir este registro ? Você não pode desfazer essa ação.
                    </Dialog.Description>
                    <Dialog.Button onPress={ this.props.onCancel } label="Cancelar" />
                    <Dialog.Button onPress={ this.props.onDelete } label="Excluir" />
                </Dialog.Container>
            </View>
        );
    }
}

export default DialogRemove;
