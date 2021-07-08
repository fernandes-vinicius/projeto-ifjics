import React, { Component } from 'react';
import { View } from 'react-native';

import Dialog from "react-native-dialog";
import { Container, Content, Header, Title, Card, CardItem, Text, Body, Left, Right, List, ListItem, Icon, Button, Item, Separator } from 'native-base';
import moment from "moment";
import { commonColor } from '../../../../theme';
import styles from './styles';

class ModalDetails extends Component {

    render() {

        const jogos = this.props.data;
        const campi = this.props.data.campi;
        const modalidades = this.props.data.modalidades;

        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Detalhes</Dialog.Title>
                    <Dialog.Description>Jogos</Dialog.Description>

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
                                        <Text note>{(jogos.nome) ? jogos.nome : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>

                                <CardItem>
                                    <Body>
                                        <Text>Data de Início</Text>
                                        <Text note>{(jogos.inicio) ? moment(jogos.inicio).format("DD-MM-YYYY") : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>

                                <CardItem>
                                    <Body>
                                        <Text>Data de Encerramento</Text>
                                        <Text note>{(jogos.fim) ? moment(jogos.fim).format("DD-MM-YYYY") : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={styles.mb}>
                                <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
                                    <Body>
                                        <Title> Campi</Title>
                                    </Body>
                                </Header>

                                <List
                                    dataArray={campi}
                                    renderRow={data =>
                                        <CardItem>
                                            <Body>
                                                <Text note>{data.nome}</Text>
                                            </Body>
                                        </CardItem>
                                    }
                                />

                            </Card>

                            <Separator style={{ backgroundColor: 'transparent' }} />

                        </Content>
                    </Container>

                    <Dialog.Button onPress={this.props.onClose} label="Fechar" />
                </Dialog.Container>
            </View>
        );
    }
}

export default ModalDetails;
