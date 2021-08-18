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

interface Props {
  title: string,
  amount: string,
  lastTransaction: string;
}

export function HighLigthCard({
  title,
  amount,
  lastTransaction,
}: Props) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <IconFeather name="arrow-up-circle" />
      </Header>
      <Footer>
        <Amount>{amount}</Amount>
        <LastTransaction>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  )
}