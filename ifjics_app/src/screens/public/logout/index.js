import React, { Component } from "react";

import { LoaderComponent } from '../../../components';

import { StorageService } from '../../../services';

class Logout extends Component {

    state = { dialogVisible: false }

    async componentDidMount() {
        this.setState({ dialogVisible: true });
        
        await StorageService.removeItem('user');
        this.props.navigation.navigate('Login');
    }

    render() { 
        return <LoaderComponent dialogVisible={ this.state.dialogVisible } />
    }
}

export default Logout;