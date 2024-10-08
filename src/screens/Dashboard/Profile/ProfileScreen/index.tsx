import React, { useContext, useState } from "react";
import ProfileScreenView from "./view";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../../../contexts/AuthContext";

const ProfileScreen = () => {
  const { setIsLoggedIn, setUser, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      setIsLoggedIn(false);
      setUser({});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return <ProfileScreenView user={user} handleLogout={handleLogout} />;
};

export default ProfileScreen;
