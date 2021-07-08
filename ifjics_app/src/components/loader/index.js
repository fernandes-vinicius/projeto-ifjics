import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { commonColor } from '../../theme';

import Dialog from "react-native-dialog";

class Loader extends Component {
    
    render() {
        return (
            <View>
                <Dialog.Container visible={ this.props.visible }>
                    <Dialog.Title>Carregando... </Dialog.Title>
                    <ActivityIndicator color={ commonColor.primary } size="large" animating={ true } />
                </Dialog.Container>
            </View>
        );
    }
}

export default Loader;
