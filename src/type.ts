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

export type LoginScreenViewProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  handleLogin: () => void;
  navigation: LoginScreenNavigationProp;
};
