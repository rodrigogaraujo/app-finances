import { Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  width: 100%;
  height: 70%;
  background-color: ${({theme}) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
  padding-top: ${RFValue(60)}px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  color: ${({theme}) => theme.colors.shape};
  text-align: center;
  margin-top: ${RFValue(45)}px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.shape};
  text-align: center;
  margin-top: ${RFValue(60)}px;
  margin-bottom: ${RFValue(67)}px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;
  background-color: ${({theme}) => theme.colors.secondary};
  align-items: center;
  justify-content: center;
`;

export const FooterWrapper = styled.View`
width: 100%;
  padding: 0 ${RFValue(32)}px;
  margin-top: ${RFPercentage(Platform.OS === 'android' ? -25 : -14)}px;
`;
