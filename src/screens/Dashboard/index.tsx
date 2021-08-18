import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { HighLigthCard } from '../../components/HighLigthCard';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  IconFeather,
  HighlightCards
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
              source={
                {uri: 'https://avatars.githubusercontent.com/u/3254949?v=4'}
              } />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Rodrigo</UserName>
            </User>
          </UserInfo>
          <IconFeather name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighLigthCard 
          title="Entradas" 
          amount="R$ 17.400,00" 
          lastTransaction="Última entrada dia 13 de abril" />
        <HighLigthCard 
          title="Saídas" 
          amount="R$ 1.259,00" 
          lastTransaction="Última saída dia 03 de abril" />
        <HighLigthCard 
          title="Total" 
          amount="R$ 16.141,00" 
          lastTransaction="01 à 16 de abril"/>
      </HighlightCards>
    </Container>
  )
}