import React, { Component } from "react";
import { Alert, ActivityIndicator } from 'react-native';
import {
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Header,
  Title,
  Right,
  Footer,
  Button,
  Item,
  Input,
  Icon,
  Container,
  Left,
} from "native-base";
import styles from './styles';
import { commonColor } from "../../../../theme";

import { LoaderComponent } from '../../../../components';

import { ApiService } from '../../../../services';

export default class Edit extends Component {

  state = {
    modalidade: [],
    nome: '',
    loaderVisible: false,
  }

  async componentDidMount() {
    const data = this.props.navigation.getParam('data', '');
    this.setState({ modalidade: data, nome: data.nome});
  }

  async handleEdit() {
    if (!this.state.nome.trim())
      Alert.alert('Informe o nome da Modalidade');
    else {
      this.setState({ loaderVisible: true });

      const id = this.state.modalidade.id;

      await ApiService.put('/modalidades/' + id, {
        nome: this.state.nome,
      })
      .then( () => {
        this.props.navigation.state.params.onRefresh();;
        this.props.navigation.goBack();
      })
      .catch( (error) => {
        this.setState({ loaderVisible: false });
        Alert.alert('Ops! Algo deu errado', 'Falha ao acessar servidor. Verifique sua conexão com a internet e tente novamente.');
      });
    }

  }

  render() {
    return (
      <Container>

        <LoaderComponent visible={ this.state.loaderVisible } />

        <Header androidStatusBarColor={ commonColor.statusBar } style={{ backgroundColor: commonColor.primary }}>
          <Left>
            <Button transparent onPress={ () => this.props.navigation.goBack() }>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Modalidade</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Header androidStatusBarColor={ commonColor.statusBar } style={[{ backgroundColor: commonColor.primary }, styles.mb]}>
            <Body>
              <Title> Editar</Title>
            </Body>
            <Right />
          </Header>

          <Card style={ styles.mb }>
            <CardItem>
              <Body>
                <Text note>
                  Informe o nome da Modalidade.
                </Text>
              </Body>
            </CardItem>
        
            <CardItem>
              <Body>    
                <Item>
                    <Icon style={{ color: commonColor.secondary }} type='FontAwesome' name='th-large' />
                    <Input
                      autoFocus 
                      value={ this.state.nome }
                      onChangeText={ (nome) => this.setState({ nome })} 
                       maxLength={ 50 }
                      placeholder="Nome da modalidade" />
                </Item>
              </Body>
            </CardItem>
          </Card>
        </Content>

        <Footer style={{ backgroundColor: 'transparent' }}>
            <Button onPress={ _ => this.handleEdit() } style={{ backgroundColor: commonColor.badge }} iconLeft rounded block>
                {
                    (this.state.loaderVisible) ? 
                    <ActivityIndicator size="large" animating={ true } color={ commonColor.tint } /> :
                    <Icon type='MaterialIcons' name='done' />
                }
                <Text>Editar Modalidade</Text>
            </Button>
        </Footer>
        
      </Container>
      
    );
  }
}