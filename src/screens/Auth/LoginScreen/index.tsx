import { FC, useState } from "react";
import LoginScreenView from "./view";
import { NavigationProps } from "../../../type";
import { postLogin } from "../../../utils/api";
import * as SecureStore from "expo-secure-store";
import { AxiosError } from "axios";

const LoginScreen: FC<NavigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchLogin = async () => {
    setIsLoading(true);
    try {
      const res = await postLogin(email, password);

      if (res.status === 200) {
        await SecureStore.setItemAsync("token", res.data.accessToken);
        navigation.navigate("DashboardTab");
      }
    } catch (err: AxiosError | any) {
      console.log(err);
      if (err.response) {
        console.log("Error: ", err.response.data);
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
        console.log("Error: ", err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (): void => {
    console.log("Email:", email);
    console.log("Password:", password);
    if (email.length === 0 || password.length === 0)
      return setError("Email and Password is required");

    fetchLogin();
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
      error={error}
      isLoading={isLoading}
    />
  );
};

export default LoginScreen;
