import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import * as AppleAuthentication from "expo-apple-authentication";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  loading: boolean;
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const resp = await AsyncStorage.getItem("@gofinances:user");
      if (resp) {
        setUser(JSON.parse(resp));
      }
      setIsLoading(false);
    }
    loadUser();
  }, []);

  async function signOut() {
    if (Platform.OS === "ios") {
      AppleAuthentication.signOutAsync({ user: user.id });
    }
    await AsyncStorage.removeItem("@gofinances:user");
    setUser({} as User);
  }

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as unknown as AuthorizationResponse;
      if (type === "success") {
        const resp = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await resp.json();
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };
        setUser(userLogged);
        await AsyncStorage.setItem(
          "@gofinances:user",
          JSON.stringify(userLogged)
        );
      }
    } catch (er) {
      console.log(er);
      throw new Error(er);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined,
        };
        setUser(userLogged);
        await AsyncStorage.setItem(
          "@gofinances:user",
          JSON.stringify(userLogged)
        );
      }
    } catch (er) {
      console.log(er);
      throw new Error(er);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        loading: isLoading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
