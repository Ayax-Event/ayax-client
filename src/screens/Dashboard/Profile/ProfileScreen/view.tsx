import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const ProfileScreenView = ({ handleLogout }) => {
  return (
    <View>
      <Text>Profile Edit Screen</Text>
      <Text onPress={handleLogout}>Logout</Text>
    </View>
  );
};

export default ProfileScreenView;
