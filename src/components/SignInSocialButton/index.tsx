import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Button, ImageContainerButton, Text } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({ title, svg: Svg, ...rest }: Props) {
  return (
    <Button {...rest}>
      <ImageContainerButton>
        <Svg />
      </ImageContainerButton>
      <Text>{title}</Text>
    </Button>
  );
}
