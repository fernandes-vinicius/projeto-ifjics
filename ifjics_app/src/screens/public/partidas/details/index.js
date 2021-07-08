import React, { Component } from 'react';
import { View } from 'react-native';

import Dialog from "react-native-dialog";
import { Container, Content, Header, Title, Card, CardItem, Text, Body, Left, Right, List, ListItem, Icon, Button, Item, Separator } from 'native-base';
import moment from "moment";
import { commonColor } from '../../../../theme';
import styles from './styles';

class ModalDetails extends Component {

    render() {

        const data = this.props.data;
        const campus = this.props.data.campi;
        const polos = this.props.data.polos;
        const user = this.props.data.user;

        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Detalhes</Dialog.Title>
                    <Dialog.Description>Jogos/Rodadas</Dialog.Description>

                    <Container>
                        <Content padder>

                            <Card style={styles.mb}>
                                <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
                                    <Body>
                                        <Title> Informações</Title>
                                    </Body>
                                </Header>

                                <CardItem>
                                    <Body>
                                        <Text>Nome</Text>
                                        <Text note>{(data.nome) ? data.nome : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>Data</Text>
                                        <Text note>{(data.data) ? moment(data.data).format("DD-MM-YYYY") : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>


                                <CardItem>
                                    <Body>
                                        <Text>Local</Text>
                                        <Text note>{(data.local) ? data.local : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>

                                <CardItem>
                                    <Body>
                                        <Text>Horário</Text>
                                        <Text note>{(data.hora) ? data.hora : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>

                                <CardItem>
                                    <Body>
                                        <Text>Modalidade</Text>
                                        <Text note>{(data.competicao) ? data.competicao.nome : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>

                                <CardItem>
                                    <Body>
                                        <Text>Status</Text>
                                        <Text note>{(data.status) ? data.status : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={styles.mb}>
                                <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
                                    <Body>
                                        <Title> Participantes</Title>
                                    </Body>
                                </Header>

                                <CardItem>

                                    <CardItem>
                                        <Body>
                                            <Text note>{((campus && campus.length > 0) || (polos && polos.length > 0)) ?
                                                campus.map((c) => c.nome + "\n") + "" + polos.map((p) => p.nome + "\n")
                                                :
                                                (user && user.length > 0) ? user.map((u) => u.nome + " - " + u.campus.nome + "\n\n") :
                                                    "INDEFINIDO"
                                            }</Text>
                                        </Body>
                                    </CardItem>
                                </CardItem>


                            </Card>

                            <Separator style={{ backgroundColor: 'transparent' }} />

                        </Content>
                    </Container>

                    <Dialog.Button onPress={this.props.onClose} label="Fechar" />
                </Dialog.Container >
            </View >
        );
    }
}

export default ModalDetails;
