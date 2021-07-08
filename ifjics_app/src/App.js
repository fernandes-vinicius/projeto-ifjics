import React, { Component } from "react";
import { Alert } from "react-native";

import { LoaderComponent } from './components';

import { StorageService } from './services';

const ROLE_ADM = 'ROLE_ADM';
const ROLE_MOD = 'ROLE_MOD';
const ROLE_ROOT = 'ROLE_ROOT';

export default class App extends Component {

    state = { loadVisible: false };

    isAdm(user) {
        for (let role of user.roles)
            if (role.authority == ROLE_ADM) return true;
        return false;
    };

    isMod(user) {
        for (let role of user.roles)
            if (role.authority == ROLE_MOD) return true;
        return false;
    };

    async componentDidMount() {
        this.setState({ dialogVisible: true });
        var user = await StorageService.getItem('user');

        if (user) {
            if (this.isAdm(user))
                this.props.navigation.navigate('AppNavigatorAdm');
            else if (this.isMod(user))
                this.props.navigation.navigate('AppNavigatorMod');
            else
                this.props.navigation.navigate('AppNavigator');
        } else
            this.props.navigation.navigate('Login');
    }

    render() {

        return <LoaderComponent visible={this.state.dialogVisible} />;
    }
}