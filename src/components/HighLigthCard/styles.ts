import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TypeProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
  width: ${RFValue(330)}px;
  background-color: 
    ${({ theme, type }) => type === 'total' ? theme.colors.secondary : theme.colors.shape};
  border-radius: ${RFValue(5)}px;
  padding: ${RFValue(19)}px ${RFValue(23)}px ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`; 

export const IconFeather = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) => type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};
  `}
  ${({ type }) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};
  `}
  ${({ type }) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text<TypeProps>`
  color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Footer = styled.View`
  justify-content: center;
`

export const Amount = styled.Text<TypeProps>`
  color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-top: ${RFValue(38)}px;
`

export const LastTransaction = styled.Text<TypeProps>`
  color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`
