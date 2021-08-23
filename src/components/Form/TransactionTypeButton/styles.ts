import styled, {css} from 'styled-components/native'
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  flex-basis: 48%;
  align-items: center;
  flex-direction: row;

  border: 1px solid ${({theme}) => theme.colors.text};
  border-radius: ${RFValue(5)}px;
  margin-bottom: ${RFValue(8)}px;
  padding: ${RFValue(16)}px;
  justify-content: center;

  ${({isActive, type, theme}) => isActive && type === 'down' && css`
    background-color: ${theme.colors.attention_light};
    border: none;
  `}
  ${({isActive, type, theme}) => isActive && type === 'up' && css`
    background-color: ${theme.colors.success_light};
    border: none;
  `}
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