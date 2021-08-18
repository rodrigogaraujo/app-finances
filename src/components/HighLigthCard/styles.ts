import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  width: ${RFValue(300)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: ${RFValue(5)}px;
  padding: ${RFValue(19)}px ${RFValue(23)}px ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`; 

export const IconFeather = styled(Feather)`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${RFValue(40)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Footer = styled.View`
  justify-content: center;
`

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-top: ${RFValue(38)}px;
`

export const LastTransaction = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`
