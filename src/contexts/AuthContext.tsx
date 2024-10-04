import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoading: false,
  setUser: () => {},
  setIsLoading: () => {},
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  let token = null;
  let currUser = null;
  const handleSecureStore = async () => {
    token = await SecureStore.getItemAsync("token");
    currUser = await SecureStore.getItemAsync("user");
    if (token) setIsLoggedIn(true);
    if (currUser) setUser(JSON.parse(currUser));
    setIsLoading(false);
  };

  useEffect(() => {
    handleSecureStore();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, isLoggedIn, setIsLoggedIn, setUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
