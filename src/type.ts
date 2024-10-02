import {
  CompositeNavigationProp,
  NavigationProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "Login">,
  NavigationProp<Record<string, object | undefined>>
>;

export type NavigationProps = {
  navigation: LoginScreenNavigationProp;
};

export type AuthScreenViewProp = {
  name?: string;
  setName?: (value: string) => void;
  username?: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  handleLogin: () => void;
  handleRegister: () => void;
  navigation: LoginScreenNavigationProp;
  error: string;
  isLoading: boolean;
};

export type ProfileHeaderProps = {
  name: string;
  day: string;
  profilePicture: string;
};
