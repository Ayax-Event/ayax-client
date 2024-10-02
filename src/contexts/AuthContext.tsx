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
  let token = null;
  const handleSecureStore = async () => {
    token = await SecureStore.getItemAsync("token");

    if (token) setIsLoggedIn(true);
    setIsLoading(false);
  };

  useEffect(() => {
    handleSecureStore();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
