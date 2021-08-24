import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { DataListProps } from '.';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`; 

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: flex-start;
  align-items: center;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(8)}px;
`;

export const User = styled.View`
  margin-left: ${RFValue(17)}px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const IconFeather = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true, 
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {paddingHorizontal: RFValue(24) }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  margin-top: ${RFPercentage(12)}px;
  padding: 0 ${RFValue(24)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: ${RFValue(24)}px;
`;

export const TransactionsList = styled(
  FlatList as new () => FlatList<DataListProps>
).attrs({
  contentContainerStyle:{
    paddingBottom: getBottomSpace(),
  },
  showsVerticalScrollIndicator: false
})``;

export const LogoutButton = styled(BorderlessButton)`

`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
