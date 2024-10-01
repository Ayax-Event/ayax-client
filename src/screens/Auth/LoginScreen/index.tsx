import React, { FC, useState } from "react";
import LoginScreenView from "./view";
import { Alert } from "react-native";
import { NavigationProps } from "../../../type";

const LoginScreen: FC<NavigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLogin = (): void => {
    console.log("Email:", email);
    console.log("Password:", password);
    Alert.alert("Logged In", `Email: ${email}\nPassword: ${password}`);
  };

  return (
    <LoginScreenView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      rememberMe={rememberMe}
      setRememberMe={setRememberMe}
      navigation={navigation}
    />
  );
};

export default LoginScreen;
