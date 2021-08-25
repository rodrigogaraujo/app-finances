import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/Auth";
import { ActivityIndicator, Alert } from "react-native";

export function SignIn() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      signInWithGoogle();
    } catch (er) {
      console.log(er);
      setIsLoading(false);
      Alert.alert("Atenção", "Nao foi possivel conectar a conta Google.");
    }
    setIsLoading(false);
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      signInWithApple();
    } catch (er) {
      console.log(er);
      setIsLoading(false);
      Alert.alert("Atenção", "Nao foi possivel conectar a conta Apple.");
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas{"\n"} finanças de forma{"\n"} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"}uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title="Entrar com a Apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator color={theme.colors.primary} size="large" />
        )}
      </Footer>
    </Container>
  );
}
