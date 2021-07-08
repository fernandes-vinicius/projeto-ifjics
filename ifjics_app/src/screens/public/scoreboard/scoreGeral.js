import React, { Component } from "react";
import { Alert, ScrollView, ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  Left,
  ListItem,
  Body,
  Card,
  CardItem,
  Separator,
  Grid,
  Col,
  Row,
  Text,
  Right,
  View,
} from "native-base";
import styles from "./styles";
import { commonColor } from '../../../theme';

import { LoaderComponent } from '../../../components';

import { ApiService } from '../../../services';

export default class Show extends Component {

    state = {
        pontuacoes: [],
        loaderVisible: false,
    };

    async componentDidMount() {
        this.refresh();
    }

    async refresh() {
        this.setState({ loaderVisible: true });
        var jogos = this.props.navigation.getParam('jogos', '');

        await ApiService.get('/pontuacoes/geral/' + jogos.id)
            .then((response) => { this.setState({ pontuacoes: response.data, loaderVisible: false }); })
            .catch((error) => {
                this.setState({ loaderVisible: false });
                Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
            });
    }

    render() {
        return (
            <Container>
                
                <LoaderComponent visible={ this.state.loaderVisible } />

                <Header androidStatusBarColor={ commonColor.primary } style={{ backgroundColor: commonColor.primary }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Pontuação Geral</Title>
                    </Body>
                    <Right>
                        <Button onPress={ _ => this.refresh() } transparent>
                            <Icon name="refresh" />
                        </Button>
                    </Right>
                </Header>

                <Content padder>

                    <Separator style={{ backgroundColor: 'transparent' }} /> 
                
                    <Card>
                        <Header androidStatusBarColor={ commonColor.primary } style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
                            <Left>
                                <Icon style={{ color: commonColor.tint }} type='Entypo' name="blackboard" />
                            </Left>
                            <Body>
                                <Title>Quadro de Pontuação</Title>
                            </Body>
                        </Header>

                        {
                            (this.state.loaderVisible) ? 
                                <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" animating={ true } />
                                </CardItem> 
                                
                            :

                            <View>

                                <CardItem>

                                    {
                                        (this.state.pontuacoes.length <= 0) ? <Text note>Nenhuma pontuação adicionada.</Text> :

                                        <ScrollView horizontal ={ true } showsHorizontalScrollIndicator= { true }>
                                
                                            <Grid>
                                            
                                                <Row>
                                                    <ListItem>
                                                        <Col style={ styles.col }>
                                                            <Left>
                                                                <Icon type='FontAwesome' name='trophy' />
                                                                <Body>
                                                                    <Text style={ styles.text } uppercase> Colocação </Text>
                                                                </Body>
                                                            </Left>
                                                        </Col>
                                                    </ListItem>
                                                    
                                                    <ListItem>
                                                        <Col style={ styles.col }>
                                                            <Left>
                                                                <Icon type='FontAwesome' name='map' />
                                                                <Body>
                                                                    <Text style={ styles.text } uppercase> Campus </Text>
                                                                </Body>
                                                            </Left>
                                                        </Col>
                                                    </ListItem>

                                                    <ListItem>
                                                        <Col style={ styles.col }>
                                                            <Left>
                                                                <Icon style={{ color: '#FFD700' }} type='Ionicons' name='medal' />
                                                                <Body>
                                                                    <Text style={ styles.text } uppercase> Ouro </Text>
                                                                </Body>
                                                            </Left>
                                                        </Col>
                                                    </ListItem>

                                                    <ListItem>
                                                        <Col style={ styles.col }>
                                                            <Left>
                                                                <Icon style={{ color: '#C0C0C0' }} type='Ionicons' name='medal' />
                                                                <Body>
                                                                    <Text style={ styles.text } uppercase> Prata </Text>
                                                                </Body>
                                                            </Left>
                                                        </Col>
                                                    </ListItem>

                                                    <ListItem>
                                                        <Col style={ styles.col }>
                                                            <Left>
                                                                <Icon style={{ color: '#CD7F32' }} type='Ionicons' name='medal' />
                                                                <Body>
                                                                    <Text style={ styles.text } uppercase> Bronze </Text>
                                                                </Body>
                                                            </Left>
                                                        </Col>
                                                    </ListItem>

                                                    <ListItem>
                                                        <Col style={ styles.col }>
                                                            <Left>
                                                                <Icon style={{ color: commonColor.danger }} type='Entypo' name='squared-plus' />
                                                                <Body>
                                                                    <Text style={ styles.text } uppercase> Bônus </Text>
                                                                </Body>
                                                            </Left>
                                                        </Col>
                                                    </ListItem>

                                                    <ListItem>
                                                        <Col style={ styles.col }>
                                                            <Left>
                                                                <Icon danger type='FontAwesome' name='flag-checkered' />
                                                                <Body>
                                                                    <Text style={ styles.text } uppercase> Total </Text>
                                                                </Body>
                                                            </Left>
                                                        </Col>
                                                    </ListItem>
                                                </Row>

                                                <List
                                                    dataArray={ this.state.pontuacoes }
                                                    renderRow={ (data, secId, rowId) =>

                                                        <Row>
                                                            <ListItem>
                                                                <Col style={ styles.col }>
                                                                    <Left>
                                                                        <Body>
                                                                            <Text note> { parseInt(rowId, 10) + 1 }º </Text>
                                                                        </Body>
                                                                    </Left>
                                                                </Col>
                                                            </ListItem>

                                                            <ListItem>
                                                                <Col style={ styles.col }>
                                                                    <Left>
                                                                        <Body>
                                                                            <Text note> { data.campus.nome } </Text>
                                                                        </Body>
                                                                    </Left>
                                                                </Col>
                                                            </ListItem>

                                                            <ListItem>
                                                                <Col style={ styles.col }>
                                                                    <Left>
                                                                        <Body>
                                                                            <Text note> { data.ouro } </Text>
                                                                        </Body>
                                                                    </Left>
                                                                </Col>
                                                            </ListItem>

                                                            <ListItem>
                                                                <Col style={ styles.col }>
                                                                    <Left>
                                                                        <Body>
                                                                            <Text note> { data.prata } </Text>
                                                                        </Body>
                                                                    </Left>
                                                                </Col>
                                                            </ListItem>

                                                            <ListItem>
                                                                <Col style={ styles.col }>
                                                                    <Left>
                                                                        <Body>
                                                                            <Text note> { data.bronze } </Text>
                                                                        </Body>
                                                                    </Left>
                                                                </Col>
                                                            </ListItem>
                                                            
                                                            <ListItem>
                                                                <Col style={ styles.col }>
                                                                    <Left>
                                                                        <Body>
                                                                            <Text note> { (data.bonus ? data.bonus : 0) } </Text>
                                                                        </Body>
                                                                    </Left>
                                                                </Col>
                                                            </ListItem>

                                                            <ListItem>
                                                                <Col style={ styles.col }>
                                                                    <Left>
                                                                        <Body>
                                                                            <Text> { data.total } pontos </Text>
                                                                        </Body>
                                                                    </Left>
                                                                </Col>
                                                            </ListItem>
                                                        </Row>
                                                    }
                                                />

                                            </Grid>

                                        </ScrollView>

                                    }
                                    
                                </CardItem>

                            </View>
                        }

                        </Card>

                    <Separator style={{ backgroundColor: 'transparent' }} /> 
                
                </Content>

            </Container>
        );
    }
}