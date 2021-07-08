import React, { Component } from 'react';
import { View } from 'react-native';

import Dialog from "react-native-dialog";
import { Container, Content, Header, Title, Card, CardItem, Text, Body, Left, Right, List, ListItem, Icon, Button, Item, Separator, TouchableOpacity } from 'native-base';
import { LoaderComponent, DialogRemoveComponent } from '../../../../components';
import { commonColor } from '../../../../theme';
import styles from './styles';

class ModalDetails extends Component {

    render() {

        const data = this.props.data;

        return (
            <View>
                <Dialog.Container visible={this.props.visible}>
                    <Dialog.Title>Alertas</Dialog.Title>

                    <Container>
                        <Content padder>

                            {(data && data.length > 0) ? data.map((data) =>
                                <Card>
                                    <Header androidStatusBarColor={commonColor.statusBar} style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
                                        <Left>
                                            <Icon style={{ color: commonColor.tint }} name="comment-alert" type="MaterialCommunityIcons" />
                                        </Left>
                                        <Body>
                                            <Title style={{ fontSize: 14 }}>{data.nome}</Title>
                                        </Body>
                                    </Header>

                                    <CardItem>
                                        <Body>
                                            <Text note>{data.descricao}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            ) : <Text>Nenhum alerta cadastrado.</Text>}

                        </Content>
                    </Container>

                    <Dialog.Button onPress={this.props.onClose} label="Fechar" />
                </Dialog.Container>
            </View>
        );
    }
}

export default ModalDetails;
