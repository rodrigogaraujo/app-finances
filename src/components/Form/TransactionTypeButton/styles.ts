import styled, {css} from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled.View<ContainerProps>`
  flex-basis: 48%;
  
  border: 1px solid ${({theme}) => theme.colors.text};
  border-radius: ${RFValue(5)}px;
  margin-bottom: ${RFValue(8)}px;

  ${({isActive, type, theme}) => isActive && type === 'down' && css`
    background-color: ${theme.colors.attention_light};
    border: none;
  `}
  ${({isActive, type, theme}) => isActive && type === 'up' && css`
    background-color: ${theme.colors.success_light};
    border: none;
  `}
`;

export const Button = styled(RectButton)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: ${RFValue(16)}px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: ${RFValue(12)}px;
  color: ${({theme, type}) => type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) =>  theme.colors.text_dark};
`