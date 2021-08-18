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
        <HighLigthCard />
        <HighLigthCard />
        <HighLigthCard />
      </HighlightCards>
    </Container>
  )
}