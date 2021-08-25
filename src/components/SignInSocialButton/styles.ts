import styled from 'styled-components/native'
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;
  background-color: ${({theme}) => theme.colors.shape};
  align-items: center;
  flex-direction: row;
  margin-bottom: ${RFValue(16)}px;
  border-radius: ${RFValue(5)}px;
`;

export const ImageContainerButton = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding:  ${RFValue(16)}px;
  border-color: ${({theme}) => theme.colors.background};
  border-right-width: ${RFValue(1)}px;
`;

export const Text = styled.Text`
  text-align: center;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text_dark};
  font-size:  ${RFValue(14)}px;
  flex: 1;
`;
