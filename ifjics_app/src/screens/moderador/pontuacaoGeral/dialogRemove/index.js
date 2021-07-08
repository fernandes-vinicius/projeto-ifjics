import React, { Component } from 'react';
import { View } from 'react-native';

import Dialog from "react-native-dialog";

class DialogRemove extends Component {

    render() {
        return (
            <View>
                <Dialog.Container visible={ this.props.visible }>
                    <Dialog.Title>Remover Pontuação</Dialog.Title>
                    <Dialog.Description>
                        Deseja remover esta pontuação da lista ? Clique em Remover.
                    </Dialog.Description>
                    <Dialog.Button onPress={ this.props.onCancel } label="Cancelar" />
                    <Dialog.Button onPress={ this.props.onRemove } label="Remover" />
                </Dialog.Container>
            </View>
        );
    }
}

export default DialogRemove;
