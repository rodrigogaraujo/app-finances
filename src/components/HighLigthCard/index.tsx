import React from 'react';

import { 
  Container, 
  Header,
  Title,
  Footer,
  Amount,
  LastTransaction,
  IconFeather
} from './styles';

export function HighLigthCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <IconFeather name="arrow-up-circle" />
      </Header>
      <Footer>
        <Amount>R$ 17.400,00</Amount>
        <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
      </Footer>
    </Container>
  )
}