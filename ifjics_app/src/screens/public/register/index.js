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
    Switch,
    Picker,
    Card,
    CardItem,
    Body,
    Left,
} from "native-base";

import styles from "./styles";
import { images, commonColor } from '../../../theme';

import { LoaderComponent } from '../../../components';

import { ApiService } from '../../../services';

const launchscreenLogo = images.logo;
const launchscreenBg = [
    images.launchscreenBgVoley,
    images.launchscreenBgAtletismo,
    images.launchscreenBgBasquete,
    images.launchscreenBgNatacao,
];

class Register extends Component {

    state = {
        nome: '',
        username: '',
        email: '',
        telefone: '',
        password: '',
        confirmPassword: '',
        campi: [],
        selectedCampus: [],
        securityPassword: true,
        launchscreenBgPosition: 0,
        loaderVisible: false,
    }

    async componentDidMount() {
        this.setState({ loaderVisible: true });

        await ApiService.get('/campi')
            .then((response) => {
                var campi = response.data;
                this.setState({ campi: campi, loaderVisible: false });
            })
            .catch((error) => {
                this.setState({ loaderVisible: false, campi: null });
                Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
            });


    }



    handleToggleSwitch = () => {
        this.setState({ securityPassword: !this.state.securityPassword });
    }

    handleRegister = async () => {
        if (!this.state.nome.trim() || !this.state.username.trim() || !this.state.email || !this.state.telefone
            || !this.state.password || !this.state.confirmPassword || this.state.selectedCampus == null) {

            Alert.alert('Preencha todos os campos solicitados', 'Para continuar com o cadastro preencha todos os campos.');

        } else if (this.state.password != this.state.confirmPassword)
            Alert.alert('Ops! Senhas diferentes', 'Verifique se a senha informada no campo de confirmação de senha é idêntica a do campo senha.');
        else {
            this.setState({ loaderVisible: true });

            await ApiService.post('/users', {
                nome: this.state.nome,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                telefone: this.state.telefone,
                campus: this.state.selectedCampus
            })

                .then(() => {
                    Alert.alert('Cadastro realizado com successo.', 'Bem vindo, ' + this.state.nome + '!\nEntre e acompanhe os JOGOS.');
                    this.props.navigation.navigate('Login');
                })
                .catch((error) => {
                    this.setState({ loaderVisible: false });
                    Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
                });
        }
    }

    render() {
        return (
            <Container>

                <LoaderComponent visible={this.state.loaderVisible} />
                <StatusBar translucent={true} backgroundColor={'transparent'} />

                <ImageBackground source={launchscreenBg[this.props.navigation.getParam('launchscreenBgPosition', '0')]} style={styles.imageContainer}>

                    <View style={styles.logoContainer}>
                        <ImageBackground source={launchscreenLogo} style={styles.logo} />
                    </View>

                    <Content padder>
                        <Form style={styles.form}>

                            <Item style={styles.item}>
                                <Icon type='FontAwesome' name='user-circle' style={{ color: '#fff' }} />
                                <Input style={{ color: '#fff' }}
                                    value={this.state.nome}
                                    autoCapitalize='sentences'
                                    onChangeText={(nome) => this.setState({ nome })}
                                    placeholderTextColor='#FFF'
                                    maxLength={50}
                                    placeholder="Seu nome" />
                            </Item>

                            <Item style={styles.item}>
                                <Icon type='FontAwesome' name='user' style={{ color: '#fff' }} />
                                <Input style={{ color: '#fff' }}
                                    value={this.state.username}
                                    autoCapitalize='none'
                                    onChangeText={(username) => this.setState({ username })}
                                    placeholderTextColor='#FFF'
                                    maxLength={20}
                                    placeholder="Seu usuário" />
                            </Item>

                            <Item style={styles.item}>
                                <Icon type='FontAwesome' name='envelope' style={{ color: '#fff' }} />
                                <Input style={{ color: '#fff' }}
                                    value={this.state.email}
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    onChangeText={(email) => this.setState({ email })}
                                    placeholderTextColor='#FFF'
                                    maxLength={50}
                                    placeholder="Seu e-mail" />
                            </Item>

                            <Item style={styles.item}>
                                <Icon type='FontAwesome' name='phone' style={{ color: '#fff' }} />
                                <Input style={{ color: '#fff' }}
                                    value={this.state.telefone}
                                    autoCapitalize='none'
                                    keyboardType='phone-pad'
                                    onChangeText={(telefone) => this.setState({ telefone })}
                                    placeholderTextColor='#FFF'
                                    maxLength={11}
                                    placeholder="Seu telefone" />
                            </Item>

                            <Item style={styles.item}>
                                <Icon type='FontAwesome' name='lock' style={{ color: '#fff' }} />
                                <Input style={{ color: '#fff' }}
                                    value={this.state.password}
                                    autoCapitalize='none'
                                    onChangeText={(password) => this.setState({ password })}
                                    secureTextEntry={this.state.securityPassword}
                                    placeholderTextColor='#FFF'
                                    maxLength={20}
                                    placeholder="Sua senha" />
                            </Item>

                            <Item style={styles.item}>
                                <Icon type='FontAwesome' name='lock' style={{ color: '#fff' }} />
                                <Input style={{ color: '#fff' }}
                                    value={this.state.confirmPassword}
                                    autoCapitalize='none'
                                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                    secureTextEntry={this.state.securityPassword}
                                    placeholderTextColor='#FFF'
                                    maxLength={20}
                                    placeholder="Confirme sua senha" />
                            </Item>


                            <Item style={styles.item}>
                                <Icon style={{ color: '#fff' }} type='Entypo' name='map' />
                                <Picker
                                    selectedValue={this.state.selectedCampus}
                                    style={{ height: 50, width: '100%', color: '#fff' }}
                                    onValueChange={(itemValue) => this.setState({ selectedCampus: itemValue })}>

                                    <Picker.Item key={null} label={'Selecione o seu campus'} value={null} />
                                    {
                                        (!this.state.campi && !this.state.campi.length) ?
                                            <Picker.Item note label={'Nenhum item encontrado'} /> :
                                            this.state.campi.map((data) => {
                                                return <Picker.Item key={data.id} label={data.nome} value={data} />
                                            })
                                    }
                                </Picker>
                            </Item>


                            <Switch
                                onValueChange={this.handleToggleSwitch}
                                value={!this.state.securityPassword}

                                trackColor={{ false: "#C2C5B7", true: commonColor.tint }} />

                            <Button iconLeft onPress={this.handleRegister} rounded style={styles.btn} block>
                                {
                                    (this.state.loaderVisible) ?
                                        <ActivityIndicator size="large" animating={true} color={commonColor.tint} /> :
                                        <Icon type='MaterialIcons' name='done' />
                                }
                                <Text>Cadastrar</Text>
                            </Button>

                        </Form>
                    </Content>

                    <Footer style={{ backgroundColor: 'transparent', borderTopColor: '#fff' }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('Login')} transparent>
                            <Text uppercase={false} style={{ color: '#fff' }}>Já tem uma conta?</Text>
                            <Text style={styles.link}>Faça login</Text>
                        </Button>
                    </Footer>

                </ImageBackground>

            </Container >
        );
    }
}

export default Register;
