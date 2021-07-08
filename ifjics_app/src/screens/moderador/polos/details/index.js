import React, { Component } from 'react';
import { View } from 'react-native';

import Dialog from "react-native-dialog";
import { Container, Content, Header, Title, Card, CardItem, Text, Body, Left, Right, List, ListItem, Icon, Button, Item, Separator } from 'native-base';

import { commonColor } from '../../../../theme';
import styles from './styles';

class ModalDetails extends Component {

    render() {

        const data = this.props.data;
        const campus = this.props.data.campi;

        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Detalhes</Dialog.Title>
                    <Dialog.Description>Polo</Dialog.Description>

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
                                        <Text>Descrição</Text>
                                        <Text note>{(data.descricao) ? data.descricao : 'INDEFINIDO'}</Text>
                                    </Body>
                                </CardItem>

                                <CardItem>
                                    <Body>
                                        <Text>Modalidade</Text>
                                        <Text note>{(data.competicao) ? data.competicao.nome : 'INDEFINIDO'}</Text>
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
                                    dataArray={campus}
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
