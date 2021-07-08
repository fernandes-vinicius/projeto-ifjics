import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import Dialog from "react-native-dialog";

import { Container, Content, Header, Title, Card, Grid, Row, Col, CardItem, Text, Body, Left, Right, List, ListItem, Icon, Button, Item, Separator } from 'native-base';
import { commonColor } from '../../../../../theme';
import styles from './styles';

class ModalDetails extends Component {

    render() {

        const data = this.props.data;
        const pontuacoes = this.props.pontuacoes;

        return (
            <View>

                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Resultados parciais</Dialog.Title>

                    <Container>
                        <Content padder>


                            <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
                                <Body>
                                    <Title> Informações</Title>
                                </Body>
                            </Header>

                            <CardItem>
                                <Body>
                                    <Text>Partida</Text>
                                    <Text note>{(data.nome) ? data.nome : 'INDEFINIDO'}</Text>
                                </Body>
                            </CardItem>

                            <CardItem>
                                <Body>
                                    <Text>Modalidade</Text>
                                    <Text note>{(data.competicao) ? data.competicao.nome : 'INDEFINIDO'}</Text>
                                </Body>
                            </CardItem>

                            <CardItem>

                                {

                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>

                                        {
                                            (this.props.pontuacoes == null || this.props.pontuacoes == 0) ? <Text note>Nenhuma pontuação adicionada</Text> :

                                                <Grid>

                                                    <Row>
                                                        <ListItem>
                                                            <Col style={styles.col}>
                                                                <Left>
                                                                    <Icon type='FontAwesome' name='map' />
                                                                    <Body>
                                                                        <Text style={styles.text} uppercase> Competidor </Text>
                                                                    </Body>
                                                                </Left>
                                                            </Col>
                                                        </ListItem>

                                                        <ListItem>
                                                            <Col style={styles.col}>
                                                                <Left>
                                                                    <Icon danger type='FontAwesome' name='flag-checkered' />
                                                                    <Body>
                                                                        <Text style={styles.text} uppercase> Pontuação </Text>
                                                                    </Body>
                                                                </Left>
                                                            </Col>
                                                        </ListItem>
                                                    </Row>

                                                    <List
                                                        dataArray={pontuacoes}
                                                        renderRow={(data, secId, rowId) =>

                                                            <Row>

                                                                <ListItem>
                                                                    <Col style={styles.col}>
                                                                        <Left>
                                                                            <Body>
                                                                                <Text note> {(data.campus != null) ? data.campus.nome : (data.polo != null) ? data.polo.nome :
                                                                                            (data.user != null) ? data.user.nome + ' - Campus: ' + data.user.campus.nome : "INDEFINIDO"
                                                                                }</Text>
                                                                            </Body>
                                                                        </Left>
                                                                    </Col>
                                                                </ListItem>

                                                                <ListItem>
                                                                    <Col style={styles.col}>
                                                                        <Left>
                                                                            <Body>
                                                                                <Text> {data.pontos + " " + data.partida.competicao.unidadeMedida}</Text>
                                                                            </Body>
                                                                        </Left>
                                                                    </Col>
                                                                </ListItem>
                                                            </Row>
                                                        }
                                                    />

                                                </Grid>
                                        }

                                    </ScrollView>

                                }

                            </CardItem>


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
