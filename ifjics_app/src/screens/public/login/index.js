import React, { Component } from "react";
import { ImageBackground, StatusBar, View, Alert, ActivityIndicator } from "react-native";
import {
    Container,
    Content,
    Text,
    Button,
    Icon,
    Footer,
    Form,
    Item,
    Input,
    H1,
    Switch
} from "native-base";

import styles from "./styles";
import { images, commonColor } from '../../../theme';

import { LoaderComponent } from '../../../components';

import { ApiService, StorageService } from '../../../services';

const launchscreenLogo = images.logo;
const launchscreenBg = [
    images.launchscreenBgVoley,
    images.launchscreenBgAtletismo,
    images.launchscreenBgBasquete,
    images.launchscreenBgNatacao,
];

const ROLE_ADM = 'ROLE_ADM';
const ROLE_MOD = 'ROLE_MOD';

class Login extends Component {

    state = {
        login: '',
        password: '',
        launchscreenBgPosition: 0,
        loaderVisible: false,
        securityPassword: true,
    }

    componentDidMount() {
        this.setState({ launchscreenBgPosition: Math.floor(Math.random() * ((launchscreenBg.length - 1) + 1)) });
    }

    handleToggleSwitch = () => {
        this.setState({ securityPassword: !this.state.securityPassword });
    }

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

    handleLogin = async () => {
        if (!this.state.login.trim() || !this.state.password.trim()) {
            Alert.alert('Preencha todos os campos solicitados', 'Para continuar com o login informe seu nome de usuário ou email e a sua senha.');
        } else {
            this.setState({ loaderVisible: true });

            await ApiService.post('/login', {
                login: this.state.login,
                password: this.state.password
            })
                .then((response) => {
                    this.setState({ loaderVisible: false });
                    var user = response.data;

                    if (user) {
                        StorageService.setItem('user', user);

                        if (this.isAdm(user))
                            this.props.navigation.navigate('AppNavigatorAdm');
                        else if (this.isMod(user))
                            this.props.navigation.navigate('AppNavigatorMod');
                        else
                            this.props.navigation.navigate('AppNavigator');
                    } else
                        this.props.navigation.navigate('Login');


                })
                .catch((error) => {
                    this.setState({ loaderVisible: false });

                    if (error.response != undefined) {
                        if (error.response.status == 404)
                            return Alert.alert('Ops! Algo deu errado.', 'Verifique seu login e/ou senha e tente novamente.');
                    }

                    Alert.alert('Ops! Algo deu errado.', 'Verifique sua conexão com a internet.');
                });
        }
    }

    render() {
        return (
            <Container>

                <LoaderComponent visible={this.state.loaderVisible} />
                <StatusBar translucent={true} backgroundColor={'transparent'} />

                <ImageBackground source={launchscreenBg[this.state.launchscreenBgPosition]} style={styles.imageContainer}>

                    <View style={styles.logoContainer}>
                        <ImageBackground source={launchscreenLogo} style={styles.logo} />
                    </View>

                    <Content padder>
                        <Form style={styles.form}>

                            <H1 style={styles.h1}>Entrar</H1>

                            <Item style={styles.item}>
                                <Icon type='FontAwesome' name='user' style={{ color: commonColor.tint }} />
                                <Input style={{ color: commonColor.tint }}
                                    value={this.state.login}
                                    onChangeText={(login) => this.setState({ login })} autoFocus
                                    autoCapitalize='none'
                                    placeholderTextColor={commonColor.tint}
                                    maxLength={50}
                                    placeholder="Seu usuário ou email" />
                            </Item>

                            <Item style={styles.item}>
                                <Icon type='FontAwesome' name='lock' style={{ color: commonColor.tint }} />
                                <Input style={{ color: commonColor.tint }}
                                    value={this.state.password}
                                    onChangeText={(password) => this.setState({ password })}
                                    secureTextEntry={this.state.securityPassword}
                                    placeholderTextColor={commonColor.tint}
                                    autoCapitalize='none'
                                    maxLength={20}
                                    placeholder="Sua senha" />
                            </Item>

                            <Switch
                                onValueChange={this.handleToggleSwitch}
                                value={!this.state.securityPassword}
                                trackColor={{ false: "#C2C5B7", true: commonColor.tint }}

                            />

                            <Button iconLeft rounded onPress={this.handleLogin} style={styles.btn} block>
                                {
                                    (this.state.loaderVisible) ?
                                        <ActivityIndicator size="large" animating={true} color={commonColor.tint} /> :
                                        <Icon type='FontAwesome' active name="sign-in" />
                                }
                                <Text>Entrar</Text>
                            </Button>

                        </Form>
                    </Content>

                    <Footer style={{ backgroundColor: 'transparent' }}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Register', { launchscreenBgPosition: this.state.launchscreenBgPosition })}>
                            <Text uppercase={false} style={{ color: commonColor.tint }}>Não tem uma conta?</Text>
                            <Text style={styles.link}>Cadastre-se</Text>
                        </Button>
                    </Footer>

                </ImageBackground>
            </Container>
        );
    }
}

export default Login;