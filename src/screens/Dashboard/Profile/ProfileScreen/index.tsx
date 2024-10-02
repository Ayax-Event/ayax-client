import React, { useContext, useState } from "react";
import ProfileScreenView from "./view";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../../../contexts/AuthContext";

const ProfileScreen = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return <ProfileScreenView handleLogout={handleLogout} />;
};

export default ProfileScreen;
