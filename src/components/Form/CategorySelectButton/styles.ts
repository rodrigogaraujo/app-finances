import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: ${RFValue(5)}px;
  margin-bottom: ${RFValue(8)}px;
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Category  = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Icon  = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text};
`;