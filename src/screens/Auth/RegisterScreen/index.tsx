import React, { FC, useState } from "react";
import RegisterScreenView from "./view";
import { useNavigation } from "@react-navigation/native";
import { postRegister } from "../../../utils/api";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");

  const fetchRegister = async () => {
    setIsLoading(true);
    try {
      const res = await postRegister(email, password, name, username);

      if (res.status === 200) {
        navigation.navigate("SignIn");
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

  const handleRegister = () => {
    console.log({ username, name, email, password });
    fetchRegister();
  };
  return (
    <RegisterScreenView
      navigation={navigation}
      name={name}
      setName={setName}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      rememberMe={rememberMe}
      setRememberMe={setRememberMe}
      error={error}
      isLoading={isLoading}
      handleRegister={handleRegister}
    />
  );
};

export default RegisterScreen;
