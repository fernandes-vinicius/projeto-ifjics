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
  Right,
  ListItem,
  Body,
  Card,
  CardItem,
  Picker,
  Separator,
  Grid,
  Col,
  Row,
  Text,
  View,
} from "native-base";
import styles from "./styles";
import { commonColor } from '../../../theme';

import { LoaderComponent } from '../../../components';

import { ApiService } from '../../../services';

export default class PontuacaoPorCompeticao extends Component {

    state = {
        competicoes: [],
        selectedPickerCompeticao: [],
        pontuacoes: [],
        loaderVisible: false,
    };

    async componentDidMount() {
        this.refresh();
    }

    async refresh() {
        this.setState({ loaderVisible: true });

        var jogos = this.props.navigation.getParam('jogos', '');

        await ApiService.get('/competicoes/jogos/' + jogos.id)
            .then((response) => { this.setState({ competicoes: response.data, loaderVisible: false }); })
            .catch((error) => {
                this.setState({ loaderVisible: false, selectedPickerCompeticao: null });
                Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
            });
    }

    onValueChangePickerCompeticao = async (competicao) => {
        this.setState({ selectedPickerCompeticao: competicao });

        if (competicao) {
            this.setState({ loaderVisible: true });

            var pontuacoes = competicao.pontuacoes;
            if (pontuacoes.length) {
                var array = [...pontuacoes];
                
                array.sort(function (a, b) {
                    return a.total > b.total ? -1 : a.total < b.total ? 1 : 0;
                });

                this.setState({ pontuacoes: array });
            }
            this.setState({ loaderVisible: false });
        }
    }

    render() {
        return (
            <Container>
                
                <LoaderComponent visible={ this.state.loaderVisible } />

                <Header androidStatusBarColor={ commonColor.fourth} style={{ backgroundColor: commonColor.fourth}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Por Modalidade</Title>
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
                        <Header androidStatusBarColor={ commonColor.fourth }  style={[{ backgroundColor: commonColor.fourth }, styles.mb]}>
                            <Left>
                                <Icon style={{ color: commonColor.tint }} type='Ionicons' name="medal" />
                            </Left>
                            <Body>
                                <Title>Modalidade</Title>
                            </Body>
                        </Header>

                        <CardItem>
                            <Body>
                                <Text note>
                                    Selecione a Modalidade para visualizar o quadro de pontuação desta Modalidade específica.
                                </Text>
                            </Body>
                        </CardItem>

                        <CardItem>
                            <Left>
                                <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name="trophy" />
                                <Picker
                                    selectedValue={ this.state.selectedPickerCompeticao }
                                    style={{ height: 50, width: '90%' }}
                                    onValueChange={(itemValue) => this.onValueChangePickerCompeticao(itemValue) }>

                                    <Picker.Item key={ null } label={ 'Selecione a Modalidade' } value={ null } />
                                    {
                                        (!this.state.competicoes && !this.state.competicoes.length) ? <Picker.Item note label={'Nenhum item encontrado'} /> :
                                        this.state.competicoes.map((data) => {
                                        return <Picker.Item key={ data.id } label={ data.nome } value={ data } />
                                        })
                                    }
                                </Picker>
                            </Left>
                        </CardItem>
                    </Card>

                    <Separator style={{ backgroundColor: 'transparent' }} /> 

                    <Card style={ styles.mb }>

                        <Header androidStatusBarColor={ commonColor.fourth } style={[{ backgroundColor: commonColor.fourth }, styles.mb]}>
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
                                        (this.state.selectedPickerCompeticao == null) ? <Text note>Selecione uma competição acima para visualizar o quadro de pontuações.</Text> :

                                        <ScrollView horizontal ={ true } showsHorizontalScrollIndicator= { true }>

                                            {
                                                (!this.state.pontuacoes.length) ? <Text note>Nenhuma pontuação adicionada</Text> :

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
                                                                                <Text> { data.total } pontos</Text>
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
                   
                            </View>
                        }

                        </Card>

                    <Separator style={{ backgroundColor: 'transparent' }} /> 
  
                </Content>

            </Container>
        );
    }
}